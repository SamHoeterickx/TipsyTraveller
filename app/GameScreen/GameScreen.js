import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import ChallengePopup from './components/ChallengePopup';
import GameHud from './components/GameHud';
import GameScene from './components/GameScene';
import TourControl from './components/TourControl';
import { getChallengeForStop } from './constants/challenges';
import { createInitialTeamProgress, getGamePiecesForGame } from './constants/gamePieces';
import { getDefaultModelOption, getModelOption } from './constants/modelOptions';
import { DRIVE_LEGS, ROUTE, STOP_NAMES } from './constants/route';

const getFocusedPiece = (gamePieces, teamProgress) => (
  gamePieces.find((piece) => !teamProgress[piece.id]?.isDone) || gamePieces[0]
);

const getNextActiveTeamIndex = (gamePieces, teamProgress, currentIndex) => {
  if (gamePieces.length === 0) return null;

  for (let offset = 1; offset <= gamePieces.length; offset += 1) {
    const nextIndex = (currentIndex + offset) % gamePieces.length;
    const nextPiece = gamePieces[nextIndex];

    if (!teamProgress[nextPiece.id]?.isDone) {
      return nextIndex;
    }
  }

  return null;
};

const rollDice = () => Math.floor(Math.random() * 6) + 1;

const GameScreen = ({ route }) => {
  const gameData = route?.params?.gameData;
  const [state, setState] = useState('waiting');
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [lastRoll, setLastRoll] = useState(null);
  const [remainingMoves, setRemainingMoves] = useState(0);
  const [movingPieceId, setMovingPieceId] = useState(null);
  const [moveTargets, setMoveTargets] = useState({});
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const baseGamePieces = useMemo(() => getGamePiecesForGame(gameData), [gameData?.nrOfPlayers]);
  const gamePieces = useMemo(() => (
    baseGamePieces.map((piece, index) => ({
      ...piece,
      startDelay: 0,
      model: gameData?.teamModels?.[piece.id]
        ? getModelOption(gameData.teamModels[piece.id])
        : getDefaultModelOption(index),
    }))
  ), [baseGamePieces, gameData?.teamModels]);
  const [teamProgress, setTeamProgress] = useState(() => (
    createInitialTeamProgress(getGamePiecesForGame(gameData))
  ));
  const pieceRefs = useRef({});

  gamePieces.forEach((piece) => {
    if (!pieceRefs.current[piece.id]) {
      pieceRefs.current[piece.id] = React.createRef();
    }
  });

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => ScreenOrientation.unlockAsync();
  }, []);

  useEffect(() => {
    setState('waiting');
    setActiveTeamIndex(0);
    setLastRoll(null);
    setRemainingMoves(0);
    setMovingPieceId(null);
    setMoveTargets({});
    setCurrentChallenge(null);
    setTeamProgress(createInitialTeamProgress(baseGamePieces));
  }, [baseGamePieces]);

  const activePiece = gamePieces[activeTeamIndex] || gamePieces[0];
  const activeProgress = teamProgress[activePiece?.id] || { currentLeg: 0, isDone: false };

  const handleRestart = () => {
    setState('waiting');
    setActiveTeamIndex(0);
    setLastRoll(null);
    setRemainingMoves(0);
    setMovingPieceId(null);
    setMoveTargets({});
    setCurrentChallenge(null);
    setTeamProgress(createInitialTeamProgress(gamePieces));
  };

  const handleChallengeComplete = () => {
    const nextActiveTeamIndex = getNextActiveTeamIndex(gamePieces, teamProgress, activeTeamIndex);

    setCurrentChallenge(null);

    if (nextActiveTeamIndex === null) {
      setState('done');
      return;
    }

    setLastRoll(null);
    setActiveTeamIndex(nextActiveTeamIndex);
    setState('waiting');
  };

  const handleDiceRollStart = () => {
    if (state === 'waiting') {
      setState('rolling');
    }
  };

  const handleRoll = (value = rollDice()) => {
    if (!['waiting', 'rolling'].includes(state) || !activePiece || activeProgress.isDone) return;

    const targetLeg = Math.min(activeProgress.currentLeg + value, DRIVE_LEGS.length);

    setLastRoll(value);
    setRemainingMoves(targetLeg - activeProgress.currentLeg);
    setMovingPieceId(activePiece.id);
    setMoveTargets((previousTargets) => ({
      ...previousTargets,
      [activePiece.id]: targetLeg,
    }));
    setState('moving');
  };

  const handleMoveComplete = (pieceId, landedLeg) => {
    const hasFinishedRoute = landedLeg >= DRIVE_LEGS.length;
    const nextTeamProgress = {
      ...teamProgress,
      [pieceId]: hasFinishedRoute
        ? { currentLeg: DRIVE_LEGS.length, isDone: true }
        : { currentLeg: landedLeg, isDone: false },
    };
    const nextActiveTeamIndex = getNextActiveTeamIndex(gamePieces, nextTeamProgress, activeTeamIndex);

    setTeamProgress((previousProgress) => {
      return {
        ...previousProgress,
        [pieceId]: nextTeamProgress[pieceId],
      };
    });
    setMovingPieceId(null);
    setRemainingMoves(0);

    if (hasFinishedRoute) {
      if (nextActiveTeamIndex === null) {
        setState('done');
        return;
      }

      setLastRoll(null);
      setActiveTeamIndex(nextActiveTeamIndex);
      setState('waiting');
      return;
    }

    setCurrentChallenge(getChallengeForStop(landedLeg));
    setState('challenge');
  };

  const focusedPiece = activePiece || getFocusedPiece(gamePieces, teamProgress);
  const focusedProgress = teamProgress[focusedPiece?.id] || { currentLeg: 0, isDone: false };
  const currentLeg = focusedProgress.currentLeg;
  const cameraMode = state === 'moving' ? 'follow' : 'done';
  const targetRef = pieceRefs.current[focusedPiece?.id];
  const fromName = STOP_NAMES[currentLeg];
  const toName = STOP_NAMES[Math.min(currentLeg + 1, STOP_NAMES.length - 1)];
  const progress = `${currentLeg + 1} / ${ROUTE.length - 1}`;
  const canRoll = state === 'waiting' && !activeProgress.isDone;

  return (
    <View style={styles.container}>
      <GameScene
        cameraMode={cameraMode}
        canvasStyle={styles.canvas}
        currentLeg={currentLeg}
        diceEnabled={canRoll}
        driving={state === 'moving'}
        gamePieces={gamePieces}
        movingPieceId={movingPieceId}
        moveTargets={moveTargets}
        onDiceRollStart={handleDiceRollStart}
        onDiceRoll={handleRoll}
        onMoveComplete={handleMoveComplete}
        pieceRefs={pieceRefs.current}
        targetRef={targetRef}
        teamProgress={teamProgress}
      />

      <GameHud
        activeTeamLabel={activePiece?.label}
        fromName={fromName}
        lastRoll={lastRoll}
        progress={progress}
        remainingMoves={remainingMoves}
        state={state}
        toName={toName}
      />
      <TourControl
        activeTeamLabel={activePiece?.label}
        canRoll={canRoll}
        lastRoll={lastRoll}
        onRestart={handleRestart}
        onRoll={() => handleRoll()}
        state={state}
      />
      <ChallengePopup
        challenge={currentChallenge}
        teamLabel={activePiece?.label}
        visible={state === 'challenge'}
        onComplete={handleChallengeComplete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#223144' },
  canvas: { flex: 1, backgroundColor: 'transparent' },
});

export default GameScreen;

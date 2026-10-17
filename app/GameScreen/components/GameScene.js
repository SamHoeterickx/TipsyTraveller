import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber/native';
import { DONE_POS } from '../constants/camera';
import CameraController from './CameraController';
import BoardDice from './BoardDice';
import CountryMarkers from './CountryMarkers';
import DottedRouteLine from './DottedRouteLine';
import GamePieces from './GamePieces';
import MapPlane from './MapPlane';

const GameScene = ({
  cameraMode,
  canvasStyle,
  currentLeg,
  diceEnabled,
  driving,
  gamePieces,
  movingPieceId,
  moveTargets,
  onDiceRoll,
  onDiceRollStart,
  onMoveComplete,
  pieceRefs,
  targetRef,
  teamProgress,
}) => (
  <Canvas
    legacy={true}
    style={canvasStyle}
    camera={{ position: DONE_POS.toArray(), fov: 50 }}
    gl={{ antialias: true, powerPreference: 'high-performance', premultipliedAlpha: false }}
  >
    <ambientLight intensity={0.72} />
    <hemisphereLight args={['#fff1cd', '#223144', 0.42]} />
    <directionalLight position={[8, -7, 9]} intensity={1.25} />
    <directionalLight position={[-6, 5, 4]} intensity={0.32} color="#8fd8ff" />

    <CameraController mode={cameraMode} targetRef={targetRef} />

    <Suspense fallback={null}>
      <MapPlane />
      <GamePieces
        driving={driving}
        gamePieces={gamePieces}
        teamProgress={teamProgress}
        pieceRefs={pieceRefs}
        movingPieceId={movingPieceId}
        moveTargets={moveTargets}
        onMoveComplete={onMoveComplete}
      />
      <DottedRouteLine />
      <CountryMarkers currentLeg={currentLeg} />
      <BoardDice enabled={diceEnabled} onRollComplete={onDiceRoll} onRollStart={onDiceRollStart} />
    </Suspense>
  </Canvas>
);

export default GameScene;

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { off, onValue, ref, set } from "firebase/database";
import { db } from "../../firebaseConfig";
import Game3DScene from "../../components/Game3DScene";

// ─── Challenges per country ────────────────────────────────────────────────────
const CHALLENGES = {
  Portugal:    { text: "Do your best Portuguese accent. Everyone votes — loser drinks 2 sips.", emoji: "🇵🇹" },
  Spain:       { text: "Name 3 Spanish foods in 5 seconds or drink 2 sips.", emoji: "🇪🇸" },
  France:      { text: "Say something romantic in French. Group votes best delivery.", emoji: "🇫🇷" },
  Belgium:     { text: "Finish your drink or do 10 push-ups. Your choice.", emoji: "🇧🇪" },
  Netherlands: { text: "Truth: most embarrassing thing you've done abroad.", emoji: "🇳🇱" },
  Germany:     { text: "Everyone chug for 3 seconds. Prost! 🍺", emoji: "🇩🇪" },
  Poland:      { text: "Dare: swap drinks with the person on your left for this round.", emoji: "🇵🇱" },
  Czechia:     { text: "Quiz: What is the capital of Czech Republic? Wrong = 2 sips.", emoji: "🇨🇿" },
  Austria:     { text: "Do your best yodel. Group votes — worst yodeller drinks.", emoji: "🇦🇹" },
  Switzerland: { text: "You're in neutral territory. Make peace with someone — or both drink.", emoji: "🇨🇭" },
  Italy:       { text: "Speak only in an Italian accent for the next 2 minutes or drink.", emoji: "🇮🇹" },
  Slovenia:    { text: "Name a famous Slovenian. Can't? Drink 3 sips.", emoji: "🇸🇮" },
  Croatia:     { text: "Best impression of someone at the table. Group votes — loser drinks.", emoji: "🇭🇷" },
  Greece:      { text: "🏆 You made it to Greece! Everyone drinks to celebrate!", emoji: "🇬🇷" },
};

// ─── Dice roll helper ──────────────────────────────────────────────────────────
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

export default function GameScreen({ navigation, route }) {
  const gameID = route.params?.gameID;
  const localTeamId = route.params?.teamId || "team_demo";

  const diceAnim = useRef(new Animated.Value(1)).current;
  const challengeAnim = useRef(new Animated.Value(0)).current;

  const [gameState, setGameState] = useState(null);
  const [diceValue, setDiceValue] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [challenge, setChallenge] = useState(null); // { country, text, emoji }
  const [mapReady, setMapReady] = useState(true);

  // ─── Firebase listener ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!gameID) return;
    const gameRef = ref(db, `games/${gameID}`);

    onValue(gameRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      setGameState(data);

      // Determine if it's this device's turn
      const teams = data.teams ? Object.keys(data.teams) : [];
      const currentTeam = teams[data.currentTurn % teams.length];
      setIsMyTurn(currentTeam === localTeamId);
    });

    return () => off(gameRef);
  }, [gameID, localTeamId]);

  // ─── Dice roll ───────────────────────────────────────────────────────────────
  const handleRollDice = useCallback(async () => {
    if (!isMyTurn || isRolling) return;

    setIsRolling(true);
    setDiceValue(null);

    // Shake animation
    Animated.sequence([
      Animated.timing(diceAnim, { toValue: 1.25, duration: 80, useNativeDriver: true }),
      Animated.timing(diceAnim, { toValue: 0.85, duration: 80, useNativeDriver: true }),
      Animated.timing(diceAnim, { toValue: 1.15, duration: 80, useNativeDriver: true }),
      Animated.timing(diceAnim, { toValue: 0.9,  duration: 80, useNativeDriver: true }),
      Animated.timing(diceAnim, { toValue: 1.0,  duration: 80, useNativeDriver: true }),
    ]).start();

    const rolled = rollDice();
    setDiceValue(rolled);

    // Write dice roll to Firebase
    if (gameID) {
      await set(ref(db, `games/${gameID}/lastRoll`), {
        teamId: localTeamId,
        value: rolled,
        timestamp: Date.now(),
      });

      // Update route index in Firebase
      const currentIndex = gameState?.teams?.[localTeamId]?.routeIndex || 0;
      const newIndex = Math.min(currentIndex + rolled, 10); // 11 waypoints (0–10)
      await set(ref(db, `games/${gameID}/teams/${localTeamId}/routeIndex`), newIndex);
    }

    setIsRolling(false);
  }, [isMyTurn, isRolling, diceAnim, gameID, localTeamId, gameState]);

  // ─── Dismiss challenge & advance turn ────────────────────────────────────────
  const handleChallengeComplete = useCallback(async () => {
    Animated.timing(challengeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setChallenge(null));

    setDiceValue(null);

    // Advance turn in Firebase
    if (gameID && gameState) {
      const teams = Object.keys(gameState.teams || {});
      const nextTurn = ((gameState.currentTurn || 0) + 1) % teams.length;
      await set(ref(db, `games/${gameID}/currentTurn`), nextTurn);
    }
  }, [challengeAnim, gameID, gameState]);

  // ─── Handle map message ────────────────────────────────────────────────────
  const handleMapMessage = useCallback((message) => {
    // Placeholder for future map interaction handling
  }, []);

  // ─── Dice face emoji ─────────────────────────────────────────────────────────
  const DICE_FACES = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

  // ─── Current active team label ───────────────────────────────────────────────
  const teams = gameState?.teams ? Object.keys(gameState.teams) : [];
  const currentTeamIndex = (gameState?.currentTurn || 0) % (teams.length || 1);
  const activeTeam = teams[currentTeamIndex] || "";
  const activeTeamName = gameState?.teams?.[activeTeam]?.name || activeTeam;

  return (
    <View style={styles.container}>

      {/* ── 3D GAME SCENE ── */}
      <Game3DScene
        teams={Object.values(gameState?.teams || {})}
        teamPositions={Object.entries(gameState?.teams || {}).reduce((acc, [teamId, team]) => {
          acc[teamId] = team.routeIndex || 0;
          return acc;
        }, {})}
        onMapMessage={handleMapMessage}
      />

      {/* ── OVERLAYS ── */}
      <SafeAreaView pointerEvents="box-none" style={styles.overlay}>

        {/* Top bar — matches your existing style exactly */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.label}>GAME</Text>
            <Text style={styles.gameId}>{gameID || "TRIP"}</Text>
          </View>

          <Pressable style={styles.exitButton} onPress={() => navigation.goBack()}>
            <Text style={styles.exitButtonText}>EXIT</Text>
          </Pressable>
        </View>

        {/* Turn indicator */}
        {gameState && (
          <View style={styles.turnBanner}>
            <Text style={styles.turnLabel}>NOW PLAYING</Text>
            <Text style={styles.turnTeam}>
              {isMyTurn ? "🎲 YOUR TURN!" : `${activeTeamName}'s turn`}
            </Text>
          </View>
        )}

        {/* Bottom dice area */}
        <View style={styles.bottomArea} pointerEvents="box-none">

          {/* Last dice roll display */}
          {diceValue && (
            <Animated.Text style={[styles.diceFace, { transform: [{ scale: diceAnim }] }]}>
              {DICE_FACES[diceValue]}
            </Animated.Text>
          )}

          {/* Roll button — only shown on your turn */}
          {isMyTurn && !challenge && (
            <Pressable
              style={[styles.rollButton, (isRolling || !mapReady) && styles.rollButtonDisabled]}
              onPress={handleRollDice}
              disabled={isRolling || !mapReady}
            >
              <Text style={styles.rollButtonText}>
                {isRolling ? "ROLLING..." : "ROLL DICE 🎲"}
              </Text>
            </Pressable>
          )}

          {/* Waiting indicator */}
          {!isMyTurn && !challenge && gameState && (
            <View style={styles.waitingBadge}>
              <Text style={styles.waitingText}>waiting for {activeTeamName}...</Text>
            </View>
          )}
        </View>
      </SafeAreaView>

      {/* ── CHALLENGE MODAL ── */}
      {challenge && (
        <Animated.View
          style={[
            styles.challengeContainer,
            {
              opacity: challengeAnim,
              transform: [{ scale: challengeAnim.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] }) }],
            },
          ]}
        >
          <View style={styles.challengeCard}>
            <Text style={styles.challengeEmoji}>{challenge.emoji}</Text>
            <Text style={styles.challengeCountry}>{challenge.country.toUpperCase()}</Text>
            <Text style={styles.challengeLabel}>CHALLENGE</Text>
            <Text style={styles.challengeText}>{challenge.text}</Text>

            <Pressable style={styles.doneButton} onPress={handleChallengeComplete}>
              <Text style={styles.doneButtonText}>DONE ✓</Text>
            </Pressable>
          </View>
        </Animated.View>
      )}

      {/* Map not ready — loading overlay */}
      {!mapReady && (
        <View style={styles.mapLoading}>
          <ActivityIndicator size="large" color="#FFF1CD" />
          <Text style={styles.loadingText}>Loading map...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070707",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    paddingHorizontal: 20,
  },

  // ── Top bar (your exact existing styles) ──
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  label: {
    color: "#FFF1CD",
    fontFamily: "dogicapixel",
    fontSize: 12,
    marginBottom: 6,
  },
  gameId: {
    color: "#FFFFFF",
    fontFamily: "dogicapixelbold",
    fontSize: 20,
  },
  exitButton: {
    alignItems: "center",
    backgroundColor: "#FFF1CD",
    borderColor: "#2C3E50",
    borderRadius: 28,
    borderWidth: 4,
    height: 48,
    justifyContent: "center",
    minWidth: 104,
    paddingHorizontal: 18,
  },
  exitButtonText: {
    color: "#111111",
    fontFamily: "dogicapixelbold",
    fontSize: 14,
  },

  // ── Turn banner ──
  turnBanner: {
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.55)",
    borderColor: "#FFF1CD",
    borderRadius: 20,
    borderWidth: 1.5,
    marginTop: 10,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  turnLabel: {
    color: "#FFF1CD",
    fontFamily: "dogicapixel",
    fontSize: 10,
    textAlign: "center",
    marginBottom: 2,
  },
  turnTeam: {
    color: "#FFFFFF",
    fontFamily: "dogicapixelbold",
    fontSize: 14,
    textAlign: "center",
  },

  // ── Bottom area ──
  bottomArea: {
    alignItems: "center",
    bottom: 36,
    left: 0,
    position: "absolute",
    right: 0,
  },
  diceFace: {
    fontSize: 72,
    marginBottom: 12,
  },
  rollButton: {
    alignItems: "center",
    backgroundColor: "#FFF1CD",
    borderColor: "#2C3E50",
    borderRadius: 32,
    borderWidth: 4,
    height: 60,
    justifyContent: "center",
    minWidth: 200,
    paddingHorizontal: 28,
  },
  rollButtonDisabled: {
    opacity: 0.5,
  },
  rollButtonText: {
    color: "#111111",
    fontFamily: "dogicapixelbold",
    fontSize: 16,
  },
  waitingBadge: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  waitingText: {
    color: "#FFF1CD",
    fontFamily: "dogicapixel",
    fontSize: 12,
    opacity: 0.8,
  },

  // ── Challenge card ──
  challengeContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    zIndex: 50,
  },
  challengeCard: {
    alignItems: "center",
    backgroundColor: "#FFF1CD",
    borderColor: "#2C3E50",
    borderRadius: 24,
    borderWidth: 4,
    marginHorizontal: 24,
    paddingHorizontal: 28,
    paddingVertical: 32,
    width: "88%",
  },
  challengeEmoji: {
    fontSize: 56,
    marginBottom: 8,
  },
  challengeCountry: {
    color: "#111111",
    fontFamily: "dogicapixelbold",
    fontSize: 18,
    marginBottom: 4,
  },
  challengeLabel: {
    color: "#555",
    fontFamily: "dogicapixel",
    fontSize: 11,
    marginBottom: 16,
  },
  challengeText: {
    color: "#222222",
    fontFamily: "dogicapixel",
    fontSize: 13,
    lineHeight: 22,
    marginBottom: 28,
    textAlign: "center",
  },
  doneButton: {
    alignItems: "center",
    backgroundColor: "#2C3E50",
    borderRadius: 28,
    height: 52,
    justifyContent: "center",
    minWidth: 160,
    paddingHorizontal: 24,
  },
  doneButtonText: {
    color: "#FFF1CD",
    fontFamily: "dogicapixelbold",
    fontSize: 15,
  },

  // ── Loading ──
  mapLoading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    backgroundColor: "#070707",
    justifyContent: "center",
    zIndex: 99,
  },
  loadingText: {
    color: "#FFF1CD",
    fontFamily: "dogicapixel",
    fontSize: 13,
    marginTop: 16,
  },
});
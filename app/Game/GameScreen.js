import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThreeScene from "../../components/ThreeScene";

export default function GameScreen({ navigation, route }) {
  const gameID = route.params?.gameID;

  return (
    <View style={styles.container}>
      <ThreeScene />

      <SafeAreaView pointerEvents="box-none" style={styles.overlay}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.label}>GAME</Text>
            <Text style={styles.gameId}>{gameID || "TRIP"}</Text>
          </View>

          <Pressable style={styles.exitButton} onPress={() => navigation.goBack()}>
            <Text style={styles.exitButtonText}>EXIT</Text>
          </Pressable>
        </View>
      </SafeAreaView>
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
});

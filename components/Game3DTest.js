import React, { useState } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import Game3DScene from "../Game3DScene";

// Simple demo to test the 3D scene
export default function Game3DTest() {
  const [teamPositions, setTeamPositions] = useState({
    team_1: 0,
    team_2: 0,
    team_3: 0,
  });

  const teams = [
    { id: "team_1", name: "Red Team" },
    { id: "team_2", name: "Teal Team" },
    { id: "team_3", name: "Yellow Team" },
  ];

  const handleMoveTeam = (teamId) => {
    setTeamPositions(prev => ({
      ...prev,
      [teamId]: (prev[teamId] + 1) % 11, // 11 waypoints total
    }));
  };

  return (
    <View style={styles.container}>
      {/* 3D Scene */}
      <View style={styles.sceneContainer}>
        <Game3DScene 
          teams={teams}
          teamPositions={teamPositions}
          onMapMessage={(msg) => console.log("Map message:", msg)}
        />
      </View>

      {/* Control buttons */}
      <View style={styles.controlPanel}>
        {teams.map(team => (
          <Pressable
            key={team.id}
            style={styles.button}
            onPress={() => handleMoveTeam(team.id)}
          >
            <Text style={styles.buttonText}>{team.name}</Text>
            <Text style={styles.waypointText}>
              Waypoint {teamPositions[team.id] + 1}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070707",
  },
  sceneContainer: {
    flex: 1,
  },
  controlPanel: {
    backgroundColor: "#111111",
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: "row",
    gap: 8,
    borderTopColor: "#FFF1CD",
    borderTopWidth: 2,
  },
  button: {
    flex: 1,
    backgroundColor: "#FFF1CD",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111111",
    marginBottom: 4,
  },
  waypointText: {
    fontSize: 10,
    color: "#555555",
  },
});

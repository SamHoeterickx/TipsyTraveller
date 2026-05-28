import React, { useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

// ─── SVG Map import ───────────────────────────────────────────────────────────
import MapSVG from "../assets/map.svg";

// ─── Simple route through Europe (for testing) ───────────────────────────────
// These are normalized 2D coordinates (0-1) that map to the map dimensions
const WAYPOINTS = [
  { id: 1, country: "Portugal", x: 0.15, y: 0.7 },
  { id: 2, country: "Spain", x: 0.2, y: 0.65 },
  { id: 3, country: "France", x: 0.35, y: 0.6 },
  { id: 4, country: "Belgium", x: 0.4, y: 0.55 },
  { id: 5, country: "Netherlands", x: 0.42, y: 0.5 },
  { id: 6, country: "Germany", x: 0.5, y: 0.48 },
  { id: 7, country: "Poland", x: 0.65, y: 0.45 },
  { id: 8, country: "Czechia", x: 0.55, y: 0.5 },
  { id: 9, country: "Austria", x: 0.6, y: 0.52 },
  { id: 10, country: "Italy", x: 0.55, y: 0.65 },
  { id: 11, country: "Greece", x: 0.62, y: 0.75 },
];

const TEAM_COLORS = ["#FF6B6B", "#4ECDC4", "#FFE66D"];

// ─── Waypoint overlay on map ──────────────────────────────────────────────────
function WaypointOverlay() {
  const mapWidth = 400; // estimated container width
  const mapHeight = 600; // estimated container height

  return (
    <>
      {WAYPOINTS.map((waypoint, idx) => (
        <View
          key={`waypoint-${idx}`}
          style={[
            styles.waypointMarker,
            {
              left: `${waypoint.x * 100}%`,
              top: `${waypoint.y * 100}%`,
            },
          ]}
        />
      ))}
    </>
  );
}

// ─── Team markers on map ─────────────────────────────────────────────────────
function TeamMarkers({ teams, teamPositions }) {
  return (
    <>
      {teams.map((team, index) => {
        const routeIndex = teamPositions?.[team.id] ?? 0;
        const waypoint = WAYPOINTS[Math.min(routeIndex, WAYPOINTS.length - 1)];
        const color = TEAM_COLORS[index % TEAM_COLORS.length];

        return (
          <View
            key={`team-${team.id}`}
            style={[
              styles.teamMarker,
              {
                left: `${waypoint.x * 100}%`,
                top: `${waypoint.y * 100}%`,
                backgroundColor: color,
              },
            ]}
          >
            <Text style={styles.teamLabel}>{index + 1}</Text>
          </View>
        );
      })}
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Game3DScene({ 
  teams = [], 
  teamPositions = {}, 
  onMapMessage 
}) {
  return (
    <View style={styles.container}>
      {/* SVG MAP as background layer */}
      <View style={StyleSheet.absoluteFillObject}>
        <MapSVG width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
      </View>

      {/* Overlay container for markers */}
      <View style={styles.overlayContainer}>
        {/* Waypoint markers overlay */}
        <WaypointOverlay />

        {/* Team markers overlay */}
        <TeamMarkers teams={teams} teamPositions={teamPositions} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070707",
  },
  mapImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  waypointMarker: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#1BA39C",
    opacity: 0.8,
    marginLeft: -8,
    marginTop: -8,
    borderWidth: 2,
    borderColor: "#0a7a6f",
  },
  teamMarker: {
    position: "absolute",
    width: 28,
    height: 28,
    borderRadius: 14,
    marginLeft: -14,
    marginTop: -14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    opacity: 0.95,
  },
  teamLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

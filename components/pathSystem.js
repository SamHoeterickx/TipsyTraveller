// ─── Path system for smooth movement between waypoints ─────────────────────────

import * as THREE from "three";

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

// ─── Convert normalized map coordinates to 3D world space ──────────────────────
export function normalizedToWorld(x, y) {
  return {
    worldX: (x - 0.5) * 20,  // Range: -10 to 10
    worldZ: (y - 0.5) * 16,  // Range: -8 to 8
  };
}

// ─── Get waypoint by index ────────────────────────────────────────────────────
export function getWaypoint(index) {
  if (index < 0 || index >= WAYPOINTS.length) return null;
  return WAYPOINTS[index];
}

// ─── Get all waypoints ───────────────────────────────────────────────────────
export function getAllWaypoints() {
  return WAYPOINTS;
}

// ─── Create a Catmull-Rom curve through waypoints for smooth interpolation ─────
export function createRouteCurve() {
  const points = WAYPOINTS.map(w => {
    const { worldX, worldZ } = normalizedToWorld(w.x, w.y);
    return new THREE.Vector3(worldX, 0.5, worldZ);
  });

  // Add start and end points for curve continuity
  const start = points[0].clone().sub(
    points[1].clone().sub(points[0])
  );
  const end = points[points.length - 1].clone().add(
    points[points.length - 1].clone().sub(points[points.length - 2])
  );

  const allPoints = [start, ...points, end];
  const curve = new THREE.CatmullRomCurve3(allPoints);
  curve.curveType = "catmullrom";
  curve.tension = 0.4;

  return curve;
}

// ─── Get position along path (t: 0-1) ──────────────────────────────────────────
export function getPositionOnCurve(curve, t) {
  return curve.getPoint(Math.max(0, Math.min(1, t)));
}

// ─── Get direction/tangent along path ──────────────────────────────────────────
export function getTangentOnCurve(curve, t) {
  return curve.getTangent(Math.max(0, Math.min(1, t))).normalize();
}

// ─── Total number of waypoints ────────────────────────────────────────────────
export function getTotalWaypoints() {
  return WAYPOINTS.length;
}

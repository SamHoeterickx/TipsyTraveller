import * as THREE from 'three';

export const MAP_W = 20;
export const MAP_H = 15;
export const MAP_CY = 0.5;
export const MAP_Z = -1;
export const ABOVE = 0.08;

export const uv = (u, v) => new THREE.Vector3(
  (u - 0.5) * MAP_W,
  (0.5 - v) * MAP_H + MAP_CY,
  MAP_Z + ABOVE
);

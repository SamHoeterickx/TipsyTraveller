import * as THREE from 'three';
import { MAP_Z } from './mapCoordinates';

export const DONE_POS = new THREE.Vector3(-0.55, -4.6, 2.25);
export const DONE_LOOK = new THREE.Vector3(-0.5, -0.5, MAP_Z);
export const FOLLOW_OFFSET = DONE_POS.clone().sub(DONE_LOOK).multiplyScalar(0.32);

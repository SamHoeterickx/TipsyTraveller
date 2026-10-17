import * as THREE from 'three';
import { uv } from './mapCoordinates';

export const BELGIUM = uv(0.429, 0.552);
export const FRANCE = uv(0.416, 0.600);
export const SPAIN_TOP = uv(0.352, 0.642);
export const PORTUGAL = uv(0.348, 0.690);
export const SPAIN_R = uv(0.412, 0.651);
export const ITALY = uv(0.464, 0.619);
export const GERMANY = uv(0.461, 0.548);

export const ROUTE = [BELGIUM, FRANCE, SPAIN_TOP, PORTUGAL, SPAIN_R, ITALY, GERMANY, BELGIUM];
export const MARKERS = ROUTE.slice(0, -1);

export const DRIVE_LEGS = [
  [BELGIUM, uv(0.429, 0.569), uv(0.424, 0.588), FRANCE],
  [FRANCE, uv(0.410, 0.620), uv(0.395, 0.650), uv(0.370, 0.645), SPAIN_TOP],
  [SPAIN_TOP, uv(0.354, 0.664), uv(0.353, 0.680), PORTUGAL],
  [PORTUGAL, uv(0.365, 0.710), uv(0.391, 0.700), uv(0.400, 0.670), SPAIN_R],
  [SPAIN_R, uv(0.422, 0.638), uv(0.435, 0.638), uv(0.448, 0.627), ITALY],
  [ITALY, uv(0.466, 0.596), uv(0.465, 0.575), GERMANY],
  [GERMANY, uv(0.452, 0.546), uv(0.441, 0.548), BELGIUM],
];

export const DRIVE_CURVES = DRIVE_LEGS.map(
  (points) => new THREE.CatmullRomCurve3(points, false, 'centripetal', 0.2)
);
export const DRIVE_LENGTHS = DRIVE_CURVES.map((curve) => curve.getLength());

export const DRIVE_PATH_POINTS = DRIVE_LEGS.reduce((points, leg, legIndex) => {
  if (legIndex === 0) {
    return [...leg];
  }

  return [...points, ...leg.slice(1)];
}, []);
export const DRIVE_CURVE = new THREE.CatmullRomCurve3(DRIVE_PATH_POINTS, false, 'centripetal', 0.2);
export const DRIVE_LENGTH = DRIVE_CURVE.getLength();

const findStopProgress = (stop, startProgress) => {
  const sampleCount = 1200;
  let closestProgress = startProgress;
  let closestDistance = Infinity;

  for (let index = 0; index <= sampleCount; index += 1) {
    const progress = startProgress + ((1 - startProgress) * index) / sampleCount;
    const point = DRIVE_CURVE.getPointAt(progress);
    const distance = point.distanceToSquared(stop);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestProgress = progress;
    }
  }

  return closestProgress;
};

export const STOP_PROGRESS = ROUTE.reduce((progressStops, stop, index) => {
  if (index === 0) return [0];
  if (index === ROUTE.length - 1) return [...progressStops, 1];

  return [...progressStops, findStopProgress(stop, progressStops[index - 1] + 0.001)];
}, []);
export const STOP_DISTANCES = STOP_PROGRESS.map((progress) => progress * DRIVE_LENGTH);

export const STOP_NAMES = ['Belgium', 'France', 'Spain', 'Portugal', 'Spain', 'Italy', 'Germany', 'Belgium'];

import { useMemo } from 'react';
import * as THREE from 'three';
import { MAP_Z } from '../constants/mapCoordinates';
import { DRIVE_CURVE, DRIVE_LENGTH } from '../constants/route';

const DOT_SPACING = 0.19;
const DOT_RADIUS = 0.022;
const DOT_Z = MAP_Z + 0.006;

const DottedRouteLine = () => {
  const routeDots = useMemo(() => (
    (() => {
      const dotCount = Math.max(Math.ceil(DRIVE_LENGTH / DOT_SPACING), 1);

      return Array.from({ length: dotCount + 1 }, (_value, dotIndex) => {
        const progress = dotIndex / dotCount;
        const point = DRIVE_CURVE.getPointAt(progress);

        return {
          key: `route-${dotIndex}`,
          isAccent: dotIndex % 6 === 0,
          position: [point.x, point.y, DOT_Z],
        };
      });
    })()
  ), []);

  return (
    <>
      {routeDots.map((dot) => (
        <group key={dot.key} position={dot.position}>
          <mesh position={[0, 0, -0.002]}>
            <circleGeometry args={[DOT_RADIUS * 1.75, 16]} />
            <meshBasicMaterial
              color="#111111"
              opacity={0.32}
              polygonOffset={true}
              polygonOffsetFactor={-2}
              polygonOffsetUnits={-2}
              side={THREE.DoubleSide}
              transparent={true}
            />
          </mesh>
          <mesh position={[0, 0, 0.001]}>
            <circleGeometry args={[DOT_RADIUS * 1.38, 16]} />
            <meshBasicMaterial
              color="#FFF1CD"
              polygonOffset={true}
              polygonOffsetFactor={-3}
              polygonOffsetUnits={-3}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0, 0, 0.004]}>
            <circleGeometry args={[DOT_RADIUS, 16]} />
            <meshBasicMaterial
              color="#d71920"
              polygonOffset={true}
              polygonOffsetFactor={-4}
              polygonOffsetUnits={-4}
              side={THREE.DoubleSide}
            />
          </mesh>
          {dot.isAccent && (
            <mesh position={[0, 0, 0.008]} rotation={[0, 0, Math.PI / 4]}>
              <planeGeometry args={[DOT_RADIUS * 1.12, DOT_RADIUS * 1.12]} />
              <meshBasicMaterial
                color="#FFD700"
                opacity={0.88}
                polygonOffset={true}
                polygonOffsetFactor={-5}
                polygonOffsetUnits={-5}
                side={THREE.DoubleSide}
                transparent={true}
              />
            </mesh>
          )}
        </group>
      ))}
    </>
  );
};

export default DottedRouteLine;

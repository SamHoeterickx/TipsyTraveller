import { useTexture } from '@react-three/drei/native';
import { MAP_CY, MAP_H, MAP_W, MAP_Z } from '../constants/mapCoordinates';
import { Asset } from 'expo-asset';

const FRAME_PAD_OUTER = 0.54;
const FRAME_PAD_INNER = 0.24;
const EDGE_THICKNESS = 0.18;
const CORNER_OFFSET_X = MAP_W / 2 - 0.3;
const CORNER_OFFSET_Y = MAP_H / 2 - 0.3;

const BoardInnerEdge = () => (
  <>
    <mesh position={[0, MAP_CY + MAP_H / 2 - EDGE_THICKNESS / 2, MAP_Z + 0.018]}>
      <planeGeometry args={[MAP_W, EDGE_THICKNESS]} />
      <meshBasicMaterial color="#111111" opacity={0.62} transparent={true} />
    </mesh>
    <mesh position={[0, MAP_CY - MAP_H / 2 + EDGE_THICKNESS / 2, MAP_Z + 0.018]}>
      <planeGeometry args={[MAP_W, EDGE_THICKNESS]} />
      <meshBasicMaterial color="#111111" opacity={0.62} transparent={true} />
    </mesh>
    <mesh position={[-MAP_W / 2 + EDGE_THICKNESS / 2, MAP_CY, MAP_Z + 0.018]}>
      <planeGeometry args={[EDGE_THICKNESS, MAP_H]} />
      <meshBasicMaterial color="#111111" opacity={0.62} transparent={true} />
    </mesh>
    <mesh position={[MAP_W / 2 - EDGE_THICKNESS / 2, MAP_CY, MAP_Z + 0.018]}>
      <planeGeometry args={[EDGE_THICKNESS, MAP_H]} />
      <meshBasicMaterial color="#111111" opacity={0.62} transparent={true} />
    </mesh>
  </>
);

const BoardCornerStuds = () => (
  <>
    {[
      [-CORNER_OFFSET_X, MAP_CY - CORNER_OFFSET_Y],
      [CORNER_OFFSET_X, MAP_CY - CORNER_OFFSET_Y],
      [-CORNER_OFFSET_X, MAP_CY + CORNER_OFFSET_Y],
      [CORNER_OFFSET_X, MAP_CY + CORNER_OFFSET_Y],
    ].map(([x, y]) => (
      <group key={`${x}-${y}`} position={[x, y, MAP_Z + 0.014]}>
        <mesh>
          <circleGeometry args={[0.09, 18]} />
          <meshBasicMaterial color="#111111" opacity={0.28} transparent={true} />
        </mesh>
        <mesh position={[0, 0, 0.004]}>
          <circleGeometry args={[0.06, 18]} />
          <meshStandardMaterial color="#1BA39C" roughness={0.5} metalness={0.08} />
        </mesh>
      </group>
    ))}
  </>
);

const MapPlane = () => {
  const mapTexture = useTexture(Asset.fromModule(require('../../../assets/europe-map4.png')).uri);

  return (
    <group>
      <mesh position={[0, MAP_CY, MAP_Z - 0.045]}>
        <planeGeometry args={[MAP_W + FRAME_PAD_OUTER, MAP_H + FRAME_PAD_OUTER]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.86} metalness={0.02} />
      </mesh>

      <mesh position={[0, MAP_CY, MAP_Z - 0.025]}>
        <planeGeometry args={[MAP_W + FRAME_PAD_INNER, MAP_H + FRAME_PAD_INNER]} />
        <meshStandardMaterial color="#FFF1CD" roughness={0.72} metalness={0.03} />
      </mesh>

      <mesh position={[0.16, MAP_CY - 0.18, MAP_Z - 0.012]}>
        <planeGeometry args={[MAP_W, MAP_H]} />
        <meshBasicMaterial color="#111111" opacity={0.22} transparent={true} />
      </mesh>

      <mesh position={[0, MAP_CY, MAP_Z]}>
        <planeGeometry args={[MAP_W, MAP_H]} />
        <meshBasicMaterial map={mapTexture} />
      </mesh>

      <mesh position={[0, MAP_CY, MAP_Z + 0.004]}>
        <planeGeometry args={[MAP_W, MAP_H]} />
        <meshBasicMaterial color="#fff1cd" opacity={0.1} transparent={true} />
      </mesh>

      <mesh position={[0, MAP_CY, MAP_Z + 0.008]}>
        <planeGeometry args={[MAP_W, MAP_H]} />
        <meshBasicMaterial color="#2C3E50" opacity={0.035} transparent={true} />
      </mesh>

      <BoardInnerEdge />
      <BoardCornerStuds />
    </group>
  );
};

export default MapPlane;

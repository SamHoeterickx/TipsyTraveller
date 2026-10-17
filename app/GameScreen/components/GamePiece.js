import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber/native';
import { useGLTF } from '@react-three/drei/native';
import * as THREE from 'three';
import { MAP_Z } from '../constants/mapCoordinates';
import { DRIVE_CURVE, DRIVE_LENGTH, STOP_DISTANCES, ROUTE } from '../constants/route';

const DRIVE_SPEED = 0.44;
const CAR_ROTATION_OFFSET = Math.PI / 2;
const CAR_MAP_CLEARANCE = 0.08;
const CAR_BASE_Z = MAP_Z + CAR_MAP_CLEARANCE;
const CAR_BOUNCE_HEIGHT = 0.01;
const CAR_BOUNCE_SPEED = 9;
const ROTATION_DAMPING = 18;

const lerpAngle = (from, to, amount) => {
  const diff = Math.atan2(Math.sin(to - from), Math.cos(to - from));
  return from + diff * amount;
};

const setCarMapPosition = (target, point, bounce = 0) => {
  target.set(
    point.x,
    point.y,
    CAR_BASE_Z + bounce
  );
};

const getTangentAngle = (curve, progress) => {
  const tangentProgress = THREE.MathUtils.clamp(progress, 0.001, 0.999);
  const tangent = curve.getTangentAt(tangentProgress);

  return Math.atan2(tangent.y, tangent.x) + CAR_ROTATION_OFFSET;
};

const setCarPose = (pieceRef, progress, targetPosition, clock, delta, rotationRef) => {
  DRIVE_CURVE.getPointAt(progress, targetPosition);
  setCarMapPosition(
    pieceRef.current.position,
    targetPosition,
    Math.abs(Math.sin(clock.elapsedTime * CAR_BOUNCE_SPEED)) * CAR_BOUNCE_HEIGHT
  );

  const targetRotation = getTangentAngle(DRIVE_CURVE, progress);
  const turnSpeed = 1 - Math.exp(-ROTATION_DAMPING * delta);

  rotationRef.current = lerpAngle(rotationRef.current, targetRotation, turnSpeed);
  pieceRef.current.rotation.set(0, 0, rotationRef.current);
};

const buildCarMaterials = (color) => ({
  paint: new THREE.MeshStandardMaterial({
    color,
    roughness: 0.42,
    metalness: 0.18,
  }),
  black: new THREE.MeshStandardMaterial({
    color: 0x070707,
    roughness: 0.72,
    metalness: 0.1,
  }),
  glass: new THREE.MeshPhysicalMaterial({
    color: 0x8fd8ff,
    roughness: 0.16,
    metalness: 0,
    clearcoat: 0.8,
    clearcoatRoughness: 0.08,
  }),
  light: new THREE.MeshStandardMaterial({
    color: 0xf5f1dc,
    roughness: 0.25,
    metalness: 0.05,
  }),
});

const getCarMaterial = (child, materials) => {
  const name = child.name.toLowerCase();

  if (
    name.includes('wheel') ||
    name.includes('bullbar') ||
    name.includes('rollbar') ||
    name.includes('skid') ||
    name.includes('ariel')
  ) {
    return materials.black;
  }

  if (name.includes('spot') || name.includes('decal')) {
    return materials.light;
  }

  return materials.paint;
};

const cloneMaterial = (material) => {
  if (!material) return material;

  const visibleMap = material.map || material.metalnessMap || material.roughnessMap;
  const clonedMap = visibleMap?.clone?.();

  if (clonedMap) {
    clonedMap.colorSpace = THREE.SRGBColorSpace;
    clonedMap.flipY = false;
    clonedMap.needsUpdate = true;
  }

  return new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: clonedMap,
    side: THREE.DoubleSide,
    transparent: false,
    opacity: 1,
  });
};

const cloneCarScene = (scene, color, model) => {
  const clone = scene.clone(true);
  const materials = model.preserveMaterials ? null : buildCarMaterials(color);

  clone.traverse((child) => {
    if (!child.isMesh) return;
    child.frustumCulled = false;

    if (model.preserveMaterials) {
      child.material = Array.isArray(child.material)
        ? child.material.map(cloneMaterial)
        : cloneMaterial(child.material);
      return;
    }

    if (Array.isArray(child.material)) {
      child.material = child.material.map((material) => {
        const materialName = material?.name?.toLowerCase?.() || '';

        if (materialName.includes('glass')) return materials.glass;
        if (materialName.includes('emmisive') || materialName.includes('emissive')) return materials.light;

        return materials.paint;
      });
      return;
    }

    child.material = getCarMaterial(child, materials);
  });

  if (model.normalizeOrigin) {
    clone.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    clone.position.sub(center);
  }

  return clone;
};

const GamePiece = ({ driving, currentLeg, onMoveComplete, piece, pieceRef, targetLeg }) => {
  const { scene } = useGLTF(piece.model.source);
  const distanceRef = useRef(STOP_DISTANCES[currentLeg] || 0);
  const rotationRef = useRef(getTangentAngle(DRIVE_CURVE, 0));
  const carPosRef = useRef(new THREE.Vector3());
  const glowRef = useRef();
  const drivingRef = useRef(driving);
  const targetLegRef = useRef(targetLeg);
  const waitingForNextLegRef = useRef(false);
  const delayElapsedRef = useRef(0);
  const hasStartedDrivingRef = useRef(false);

  const carScene = useMemo(
    () => cloneCarScene(scene, piece.color, piece.model),
    [scene, piece.color, piece.model]
  );
  const modelTransform = piece.model.transform;

  useEffect(() => {
    drivingRef.current = driving;

    if (!driving) {
      delayElapsedRef.current = 0;
      hasStartedDrivingRef.current = false;
    }
  }, [driving]);

  useEffect(() => {
    targetLegRef.current = targetLeg;
  }, [targetLeg]);

  useEffect(() => {
    distanceRef.current = STOP_DISTANCES[currentLeg] || 0;
    waitingForNextLegRef.current = false;
  }, [currentLeg]);

  useEffect(() => {
    if (pieceRef.current) {
      setCarMapPosition(pieceRef.current.position, ROUTE[0]);
      pieceRef.current.rotation.set(0, 0, rotationRef.current);
    }
  }, [pieceRef]);

  useFrame(({ clock }, delta) => {
    if (glowRef.current) {
      glowRef.current.visible = drivingRef.current;
      glowRef.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 5) * 0.08);
      glowRef.current.material.opacity = 0.22 + Math.sin(clock.elapsedTime * 5) * 0.06;
    }

    if (!pieceRef.current || !drivingRef.current) return;
    if (waitingForNextLegRef.current) return;

    if (!hasStartedDrivingRef.current) {
      delayElapsedRef.current += delta;

      if (delayElapsedRef.current < (piece.startDelay || 0)) {
        return;
      }

      hasStartedDrivingRef.current = true;
    }

    const target = targetLegRef.current;
    const targetDistance = STOP_DISTANCES[target] ?? DRIVE_LENGTH;

    distanceRef.current = Math.min(distanceRef.current + delta * DRIVE_SPEED, targetDistance);
    setCarPose(
      pieceRef,
      THREE.MathUtils.clamp(distanceRef.current / DRIVE_LENGTH, 0, 1),
      carPosRef.current,
      clock,
      delta,
      rotationRef
    );

    if (distanceRef.current >= targetDistance) {
      waitingForNextLegRef.current = true;
      onMoveComplete(piece.id, target);
    }
  });

  return (
    <group ref={pieceRef} position={[ROUTE[0].x, ROUTE[0].y, CAR_BASE_Z]}>
      <mesh ref={glowRef} position={[0, 0, -0.072]} visible={false}>
        <circleGeometry args={[0.42, 32]} />
        <meshBasicMaterial color={piece.color} opacity={0.22} transparent={true} side={THREE.DoubleSide} />
      </mesh>
      <primitive
        object={carScene}
        scale={modelTransform.scale}
        position={modelTransform.position}
        rotation={modelTransform.rotation}
      />
    </group>
  );
};

export default GamePiece;

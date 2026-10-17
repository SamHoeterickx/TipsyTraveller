import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber/native';
import * as THREE from 'three';
import { DONE_LOOK, DONE_POS, FOLLOW_OFFSET } from '../constants/camera';

const CameraController = ({ mode, targetRef }) => {
  const { camera } = useThree();
  const lookAt = useRef(new THREE.Vector3(1.17, 0.13, 0));

  useFrame((_state, delta) => {
    const speed = Math.min(delta * 3.0, 1);

    if (mode === 'follow' && targetRef?.current) {
      const targetPosition = targetRef.current.position;
      const cameraPosition = targetPosition.clone().add(FOLLOW_OFFSET);

      camera.position.lerp(cameraPosition, speed);
      lookAt.current.lerp(targetPosition.clone(), speed);
    } else {
      camera.position.lerp(DONE_POS, speed);
      lookAt.current.lerp(DONE_LOOK, speed);
    }

    camera.lookAt(lookAt.current);
  });

  return null;
};

export default CameraController;

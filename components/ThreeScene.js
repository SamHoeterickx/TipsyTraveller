import React, { useCallback, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import * as THREE from "three";

const ROUTE_POINTS = [
  new THREE.Vector3(-8, 0, -4),
  new THREE.Vector3(-4, 0, 0),
  new THREE.Vector3(0, 0, 2),
  new THREE.Vector3(4, 0, 0),
  new THREE.Vector3(8, 0, -3),
];

const easeInOutQuad = (x) => {
  if (x < 0.5) {
    return 2 * x * x;
  }

  return 1 - Math.pow(-2 * x + 2, 2) / 2;
};

export default function ThreeScene() {
  const animationFrameRef = useRef(null);
  const isMountedRef = useRef(true);
  const progressRef = useRef({ t: 0 });
  const cleanupSceneRef = useRef(null);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (cleanupSceneRef.current) {
        cleanupSceneRef.current();
        cleanupSceneRef.current = null;
      }
    };
  }, []);

  const onContextCreate = useCallback((gl) => {
    progressRef.current.t = 0;

    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    renderer.setClearColor("#070707");

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog("#070707", 16, 38);

    const camera = new THREE.PerspectiveCamera(
      60,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 12);

    const ambientLight = new THREE.AmbientLight("#ffffff", 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight("#ffffff", 0.6);
    directionalLight.position.set(6, 10, 8);
    scene.add(directionalLight);

    const ground = createGround();
    scene.add(ground);

    const curve = new THREE.CatmullRomCurve3(ROUTE_POINTS);
    curve.curveType = "catmullrom";
    curve.tension = 0.45;

    const routeLine = createRouteLine(curve);
    scene.add(routeLine);

    const vehicle = createVehicle();
    scene.add(vehicle);

    const forward = new THREE.Vector3(0, 0, 1);
    const cameraOffset = new THREE.Vector3(0, 4, 8);
    const cameraTarget = new THREE.Vector3();
    const routePoint = new THREE.Vector3();
    const tangent = new THREE.Vector3();
    const rotatedOffset = new THREE.Vector3();
    cleanupSceneRef.current = () => disposeScene(scene, renderer);

    const animate = () => {
      if (!isMountedRef.current) {
        return;
      }

      progressRef.current.t += 0.0015;

      if (progressRef.current.t > 1) {
        progressRef.current.t = 0;
      }

      const easedT = easeInOutQuad(progressRef.current.t);
      routePoint.copy(curve.getPoint(easedT));
      tangent.copy(curve.getTangent(easedT)).normalize();

      vehicle.position.set(routePoint.x, routePoint.y + 0.35, routePoint.z);
      vehicle.quaternion.setFromUnitVectors(forward, tangent);

      rotatedOffset.copy(cameraOffset).applyQuaternion(vehicle.quaternion);
      cameraTarget.copy(vehicle.position).add(rotatedOffset);
      camera.position.lerp(cameraTarget, 0.1);
      camera.lookAt(vehicle.position);

      renderer.render(scene, camera);
      gl.endFrameEXP();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <View style={styles.container}>
      <GLView style={styles.glView} onContextCreate={onContextCreate} />
    </View>
  );
}

function createGround() {
  const geometry = new THREE.PlaneGeometry(50, 50);
  const material = new THREE.MeshStandardMaterial({
    color: "#111111",
    roughness: 0.9,
    metalness: 0.05,
  });
  const ground = new THREE.Mesh(geometry, material);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;

  return ground;
}

function createRouteLine(curve) {
  const points = curve.getPoints(160).map((point) => {
    return new THREE.Vector3(point.x, point.y + 0.04, point.z);
  });
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: "#1BA39C",
    linewidth: 3,
  });

  return new THREE.Line(geometry, material);
}

function createVehicle() {
  const geometry = new THREE.BoxGeometry(0.7, 0.7, 1.4);
  const material = new THREE.MeshStandardMaterial({
    color: "#FFF1CD",
    roughness: 0.35,
    metalness: 0.2,
  });
  const vehicle = new THREE.Mesh(geometry, material);

  // A small nose makes the forward direction obvious while debugging routes.
  const noseGeometry = new THREE.BoxGeometry(0.35, 0.25, 0.25);
  const noseMaterial = new THREE.MeshStandardMaterial({ color: "#E85D75" });
  const nose = new THREE.Mesh(noseGeometry, noseMaterial);
  nose.position.set(0, 0.05, 0.78);
  vehicle.add(nose);

  return vehicle;
}

function disposeScene(scene, renderer) {
  scene.traverse((object) => {
    if (object.geometry) {
      object.geometry.dispose();
    }

    if (object.material) {
      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];

      materials.forEach((material) => material.dispose());
    }
  });

  renderer.dispose();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070707",
  },
  glView: {
    flex: 1,
  },
});

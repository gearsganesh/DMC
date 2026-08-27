import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function ChromeBlob({ scrollRef }) {
  const mesh = useRef();

  useFrame((state, delta) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.y += delta * 0.12;
    mesh.current.rotation.z = Math.sin(t * 0.2) * 0.12;
    const targetX = state.pointer.y * 0.5;
    const targetY2 = state.pointer.x * 0.5;
    mesh.current.rotation.x += (targetX - mesh.current.rotation.x) * 0.04;
    mesh.current.position.x += (targetY2 - mesh.current.position.x) * 0.04;
    const scroll = scrollRef?.current || 0;
    const target = 2.4 - scroll * 0.9;
    mesh.current.scale.setScalar(
      THREE.MathUtils.lerp(mesh.current.scale.x, Math.max(target, 1.2), 0.05)
    );
  });

  return (
    <mesh ref={mesh} scale={2.4}>
      <icosahedronGeometry args={[1, 64]} />
      <MeshDistortMaterial
        color="#3a2c12"
        metalness={1}
        roughness={0.16}
        clearcoat={1}
        clearcoatRoughness={0.1}
        distort={0.42}
        speed={1.4}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

export default function ChromeBackground({ scrollRef }) {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.75]}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} color="#f1d28b" />
      <directionalLight position={[-5, -2, 2]} intensity={0.7} color="#c69a43" />
      <ChromeBlob scrollRef={scrollRef} />
      <Environment preset="night" />
    </Canvas>
  );
}

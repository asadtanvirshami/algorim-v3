// components/hero/SceneOrb.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function FloatingOrb() {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!mesh.current) return;
    mesh.current.rotation.y = t * 0.2;
    mesh.current.position.y = Math.sin(t * 0.8) * 0.25;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.3, 1]} />
      <meshStandardMaterial
        metalness={0.9}
        roughness={0.15}
        emissive={"#7f5dff"}
        emissiveIntensity={1.3}
      />
    </mesh>
  );
}

export function HeroCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <FloatingOrb />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}

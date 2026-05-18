"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Monolith3D — procedural 3D hero scene.
 *
 * Brighter, more visible materials. Camera is animated via state.camera
 * inside useFrame (the previous version added a bogus inner camera that
 * never became active). Driven by progressRef from the parent.
 */

type MonolithSceneProps = {
  progressRef: React.MutableRefObject<number>;
};

const MonolithScene: React.FC<MonolithSceneProps> = ({ progressRef }) => {
  const leftHalfRef = useRef<THREE.Mesh>(null);
  const rightHalfRef = useRef<THREE.Mesh>(null);
  const seamRef = useRef<THREE.Mesh>(null);
  const seamMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const seamGlowRef = useRef<THREE.Mesh>(null);
  const seamGlowMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);

  // Slab material — visible against the dark bg, with subtle metalness so
  // the rim light catches the edges (gives the "machined slab" feel).
  const slabMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1f2329",
        roughness: 0.55,
        metalness: 0.4,
      }),
    []
  );

  useFrame((state) => {
    const p = progressRef.current;

    const gapPhase = THREE.MathUtils.smoothstep(p, 0.3, 0.75);
    const gap = gapPhase * 1.6;
    if (leftHalfRef.current) leftHalfRef.current.position.x = -0.5 - gap;
    if (rightHalfRef.current) rightHalfRef.current.position.x = 0.5 + gap;

    // Dive phase
    const dive = THREE.MathUtils.smoothstep(p, 0.75, 1);

    // Seam — thin hairline at closed, opens with gap. Brightness stays
    // moderate until the dive (no premature bloom).
    if (seamRef.current && seamMatRef.current) {
      seamRef.current.scale.x = 0.02 + gap * 1.0;
      // Emission: 0.5 closed, 0.7 at full gap, ramps to 4 only mid-dive.
      const emission = 0.5 + gapPhase * 0.2 + dive * 3.5;
      seamMatRef.current.color.setRGB(
        0.4 * emission,
        0.91 * emission,
        0.97 * emission
      );
    }

    // Glow halo — quiet at closed AND open. Only blooms during the dive.
    if (seamGlowRef.current && seamGlowMatRef.current) {
      seamGlowRef.current.scale.x = 0.12 + gap * 0.5;
      seamGlowRef.current.scale.y = 1 + gapPhase * 0.2;
      seamGlowMatRef.current.opacity = 0.03 + gapPhase * 0.05 + dive * 0.45;
    }

    // Point light — subtle until the dive.
    if (pointLightRef.current) {
      pointLightRef.current.intensity = 0.5 + gapPhase * 0.5 + dive * 5;
    }

    // Camera dolly forward through the gap during Phase 3
    state.camera.position.z = 6 - dive * 8;
    state.camera.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[3, 4, 6]}
        intensity={1.2}
        color="#cfe7ff"
      />
      <directionalLight
        position={[-3, 2, 4]}
        intensity={0.5}
        color="#67E8F9"
      />
      <pointLight
        ref={pointLightRef}
        position={[0, 0, 0.2]}
        intensity={1.5}
        color="#67E8F9"
        distance={8}
        decay={1.2}
      />

      {/* Left half */}
      <mesh
        ref={leftHalfRef}
        position={[-0.5, 0, 0]}
        material={slabMaterial}
      >
        <boxGeometry args={[1, 4, 0.6]} />
      </mesh>

      {/* Right half */}
      <mesh
        ref={rightHalfRef}
        position={[0.5, 0, 0]}
        material={slabMaterial}
      >
        <boxGeometry args={[1, 4, 0.6]} />
      </mesh>

      {/* Cyan seam — emissive, unlit */}
      <mesh ref={seamRef} position={[0, 0, 0.31]}>
        <planeGeometry args={[1, 4]} />
        <meshBasicMaterial
          ref={seamMatRef}
          color="#67E8F9"
          transparent
          opacity={1}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* Glow halo around seam — additive */}
      <mesh ref={seamGlowRef} position={[0, 0, 0.2]}>
        <planeGeometry args={[1, 4.4]} />
        <meshBasicMaterial
          ref={seamGlowMatRef}
          color="#67E8F9"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* (no wider soft glow plane — was flooding the composition) */}

      {/* Floor */}
      <mesh
        position={[0, -2.05, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#06080c"
          roughness={0.95}
          metalness={0.1}
        />
      </mesh>

      {/* Background + scene fog */}
      <color attach="background" args={["#040408"]} />
      <fog attach="fog" args={["#040408", 6, 18]} />
    </>
  );
};

type Monolith3DProps = {
  progressRef: React.MutableRefObject<number>;
};

export const Monolith3D: React.FC<Monolith3DProps> = ({ progressRef }) => {
  return (
    <Canvas
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: false,
      }}
      dpr={[1, 2]}
      camera={{
        position: [0, 0, 6],
        fov: 42,
        near: 0.1,
        far: 50,
      }}
      style={{
        background: "#040408",
        width: "100%",
        height: "100%",
        display: "block",
      }}
    >
      <MonolithScene progressRef={progressRef} />
    </Canvas>
  );
};

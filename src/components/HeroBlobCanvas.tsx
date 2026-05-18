"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

/**
 * HeroBlobCanvas — the actual R3F scene.
 *
 * Recipe:
 *   • One sphere, high subdivision (128×128) so the displacement reads smooth
 *   • drei MeshDistortMaterial — Perlin-like noise displacement, slow speed
 *   • Material: near-black albedo, mid-low roughness, high metalness +
 *     subtle clearcoat → matte body with a chrome-y outer skin that catches
 *     light only on the rolling curves
 *   • Lighting: one strong key from upper-left (the rim light), tiny fill
 *     from below to keep shadow side from pure black
 *   • Environment: drei "warehouse" preset at low intensity for ambient
 *     micro-highlights — gives the surface "rolling chrome" depth without
 *     blowing out the matte feel
 *   • Mouse parallax via state.mouse → eased rotation
 *   • Slow Y-axis ambient rotation so it never feels frozen
 *
 * Uses ~10ms of GPU per frame on mid-tier laptops at the capped DPR.
 */

const Blob: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const target = useRef(new THREE.Vector2(0, 0));
  const eased = useRef(new THREE.Vector2(0, 0));

  useFrame((state) => {
    if (!meshRef.current) return;

    // Cursor → target rotation. Damped via lerp for the elastic-eye feel.
    target.current.set(state.mouse.x * 0.55, state.mouse.y * 0.4);
    eased.current.lerp(target.current, 0.045);

    meshRef.current.rotation.y =
      eased.current.x + state.clock.elapsedTime * 0.06;
    meshRef.current.rotation.x = -eased.current.y * 0.7;

    // Subtle vertical bob — keeps the form breathing.
    meshRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.45) * 0.04;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.6, 128, 128]} />
      <MeshDistortMaterial
        color="#0A0A0C"
        roughness={0.28}
        metalness={0.85}
        clearcoat={0.85}
        clearcoatRoughness={0.12}
        distort={0.42}
        speed={1.1}
        envMapIntensity={0.7}
      />
    </mesh>
  );
};

const HeroBlobCanvas: React.FC = () => {
  return (
    <Canvas
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
      }}
      // Capped DPR so 4K screens don't melt the GPU.
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 30 }}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      {/* Lights — single strong key from upper-left creates the rolling rim
          highlight that defines the blob. Almost no fill — the matte page
          fills in for shadow. */}
      <ambientLight intensity={0.06} />
      <directionalLight
        position={[-4, 4, 4]}
        intensity={2.4}
        color="#FFFFFF"
      />
      <directionalLight
        position={[3, -2, 2]}
        intensity={0.18}
        color="#FFFFFF"
      />
      {/* A second sharp light from upper-right at lower intensity gives the
          edge a secondary catch — adds dimensionality without breaking the
          main rim. */}
      <pointLight
        position={[3, 2, 4]}
        intensity={0.6}
        color="#FFFFFF"
        distance={10}
      />

      {/* Custom in-scene environment — three Lightformers act as virtual
          studio lights that the chrome surface reflects. No HDR fetch, no
          CDN dependency, fully local. Their positions create rolling
          highlights on the curved blob surface as it rotates and morphs. */}
      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={2.2}
          color="#FFFFFF"
          position={[-4, 3, 4]}
          scale={[5, 3, 1]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={1.0}
          color="#FFFFFF"
          position={[4, -1, 3]}
          scale={[3, 4, 1]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="ring"
          intensity={1.5}
          color="#FFFFFF"
          position={[0, 4, 2]}
          scale={[2, 2, 1]}
          target={[0, 0, 0]}
        />
      </Environment>

      <Blob />
    </Canvas>
  );
};

export default HeroBlobCanvas;

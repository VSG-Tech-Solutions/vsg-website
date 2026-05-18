"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";

/**
 * MonolithCanvas — the actual R3F scene.
 *
 * One tall matte-black slab, slow Y-axis rotation, mouse-parallax tilt on X
 * + Y. White edge lines (drei <Edges>) catch the silhouette so the slab is
 * always readable against the matte background.
 *
 * Lighting: one warm-white directional from upper-left, one fill from below
 * at low intensity. Pure white lights only — no colour cast in monochrome.
 */

const Slab: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Vector2(0, 0));
  const eased = useRef(new THREE.Vector2(0, 0));

  // Carbon-black PBR material — the M5 recipe.
  //   • near-black albedo (charcoal, not gray)
  //   • high roughness (0.78) so it reads MATTE, not chrome
  //   • low metalness (0.15) — just enough that the rim light catches the
  //     bevels but nothing reflects back
  //   • slight env intensity boost so the directional rim still pops on
  //     the upper edges
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0E0E11",
        roughness: 0.78,
        metalness: 0.15,
        envMapIntensity: 0.4,
      }),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;

    // Mouse parallax — tilt the slab toward the cursor.
    target.current.set(state.mouse.x * 0.18, state.mouse.y * 0.12);
    eased.current.lerp(target.current, 0.05);

    groupRef.current.rotation.x = -eased.current.y;
    groupRef.current.rotation.y =
      eased.current.x + state.clock.elapsedTime * 0.08;

    // Park the slab in the UPPER half of the hero so it anchors above the
    // headline rather than slicing through it. Subtle bob keeps it alive.
    groupRef.current.position.y =
      0.95 + Math.sin(state.clock.elapsedTime * 0.4) * 0.03;
  });

  return (
    <group ref={groupRef}>
      <mesh material={material} castShadow receiveShadow>
        <boxGeometry args={[1.2, 2.2, 0.5]} />
        {/* Drei <Edges> — sharp white lines along sharp edges, threshold
            in degrees. Gives the slab a geometric "etched" outline without
            needing a separate wireframe pass. */}
        <Edges threshold={15} color="#FFFFFF" />
      </mesh>

      {/* Face panels — etched darker rectangles on the front. Slightly
          recessed in colour so they read as inset shadows, not bright tiles. */}
      <mesh position={[0, 0.45, 0.251]}>
        <boxGeometry args={[0.88, 0.55, 0.004]} />
        <meshStandardMaterial color="#070708" roughness={0.85} metalness={0.1} />
      </mesh>
      <mesh position={[0, -0.45, 0.251]}>
        <boxGeometry args={[0.88, 0.55, 0.004]} />
        <meshStandardMaterial color="#070708" roughness={0.85} metalness={0.1} />
      </mesh>
    </group>
  );
};

const MonolithCanvas: React.FC = () => {
  return (
    <Canvas
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
      }}
      // Capped DPR — high pixel densities don't add much for a single
      // matte slab and cost real GPU on 4K screens.
      dpr={[1, 1.5]}
      // Camera pulled back so the slab feels architectural / distant rather
      // than a hero prop. Shifting the slab up via group.position.y in <Slab/>
      // keeps the type column in the lower half of the hero.
      camera={{ position: [0, 0, 6.2], fov: 32 }}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      {/* Lighting — M5 recipe.
          One strong key from upper-RIGHT (creates the dramatic rim line down
          the right edge of the slab). Very low ambient so the unlit side
          stays in deep shadow. No fill light from the back — we want hard
          contrast between "lit edge" and "carbon shadow". */}
      <ambientLight intensity={0.08} />
      <directionalLight
        position={[4, 5, 3]}
        intensity={2.2}
        color="#FFFFFF"
      />
      {/* A tiny secondary from below-left just to keep the unlit face from
          going pure black. Barely there. */}
      <directionalLight
        position={[-2, -3, 1]}
        intensity={0.12}
        color="#FFFFFF"
      />

      <Slab />
    </Canvas>
  );
};

export default MonolithCanvas;

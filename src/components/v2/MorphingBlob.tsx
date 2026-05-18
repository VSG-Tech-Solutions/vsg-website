"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

/**
 * MorphingBlob — Bluneo.ai-school stacked chrome sculpture.
 *
 * A vertical stack of flat chrome disks at tilted angles + a small
 * floating chrome sphere above. All in PBR chrome material (high
 * metalness, low roughness) with HDR environment reflections so the
 * mirror-finish actually reflects something.
 *
 * Mouse-tracking on the whole rig — the sculpture rotates toward
 * the cursor + drifts with parallax. Slow continuous Y-rotation
 * underneath. Float wrapper adds gentle bob.
 *
 * Replaces the old matte-grey blob. Reads as a sculpted product
 * artifact: chrome, sharp, reflective, premium.
 */

function StackedSculpture() {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Continuous slow rotation on Y
    groupRef.current.rotation.y += delta * 0.18;

    // Cursor parallax — whole sculpture tilts toward cursor
    const targetRX = mouse.y * 0.25;
    const targetRZ = -mouse.x * 0.15;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRX,
      0.06,
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRZ,
      0.06,
    );

    // Cursor parallax position
    const tx = mouse.x * viewport.width * 0.05;
    const ty = mouse.y * viewport.height * 0.05;
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      tx,
      0.06,
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      ty,
      0.06,
    );

    // Small sphere wobbles independently
    if (sphereRef.current) {
      sphereRef.current.position.x = 0.4 + Math.sin(performance.now() * 0.001) * 0.1;
      sphereRef.current.position.y = 1.55 + Math.sin(performance.now() * 0.0014) * 0.08;
    }
  });

  // Shared chrome material props — all parts use the same PBR setup
  // for visual cohesion, with subtle colour variation per disk.
  const chromeBase = {
    metalness: 0.95,
    roughness: 0.08,
    envMapIntensity: 1.4,
  };

  return (
    <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.5}>
      <group ref={groupRef} rotation={[0.15, 0, -0.12]}>
        {/* Disk 1 — biggest, bottom, most tilted */}
        <mesh position={[0, -0.85, 0]} rotation={[Math.PI / 2 - 0.15, 0, 0.18]} castShadow>
          <cylinderGeometry args={[1.55, 1.55, 0.12, 96]} />
          <meshStandardMaterial color="#FF7A3A" {...chromeBase} />
        </mesh>

        {/* Disk 2 — slightly smaller, mid-low */}
        <mesh position={[-0.08, -0.30, 0.05]} rotation={[Math.PI / 2 - 0.05, 0, 0.05]} castShadow>
          <cylinderGeometry args={[1.30, 1.30, 0.10, 96]} />
          <meshStandardMaterial color="#FF8F4F" {...chromeBase} />
        </mesh>

        {/* Disk 3 — middle, almost flat */}
        <mesh position={[0.05, 0.20, -0.05]} rotation={[Math.PI / 2 + 0.10, 0, -0.10]} castShadow>
          <cylinderGeometry args={[1.05, 1.05, 0.09, 96]} />
          <meshStandardMaterial color="#FFA060" {...chromeBase} />
        </mesh>

        {/* Disk 4 — smaller, upper */}
        <mesh position={[-0.10, 0.65, 0.02]} rotation={[Math.PI / 2 + 0.20, 0, 0.20]} castShadow>
          <cylinderGeometry args={[0.78, 0.78, 0.08, 96]} />
          <meshStandardMaterial color="#FFB073" {...chromeBase} />
        </mesh>

        {/* Disk 5 — smallest, top */}
        <mesh position={[0.10, 1.05, -0.05]} rotation={[Math.PI / 2 + 0.05, 0, -0.20]} castShadow>
          <cylinderGeometry args={[0.55, 0.55, 0.07, 96]} />
          <meshStandardMaterial color="#FFC080" {...chromeBase} />
        </mesh>

        {/* Floating sphere — small, off-axis above the stack */}
        <mesh ref={sphereRef} position={[0.4, 1.55, 0]} castShadow>
          <sphereGeometry args={[0.32, 64, 64]} />
          <meshStandardMaterial color="#FFD8A0" {...chromeBase} roughness={0.05} />
        </mesh>
      </group>
    </Float>
  );
}

export const MorphingBlob: React.FC = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ contain: "layout paint" }}
    >
      {/* Atmospheric warm halo behind the canvas — anchors the
          sculpture even before WebGL hydrates and enriches the
          reflections in the chrome surfaces. */}
      <div
        className="absolute inset-[-15%]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,107,44,0.18) 0%, rgba(255,107,44,0.05) 40%, rgba(0,0,0,0) 70%)",
          filter: "blur(40px)",
        }}
      />

      <Canvas
        className="absolute inset-0 pointer-events-auto"
        camera={{ position: [0, 0.2, 4.0], fov: 42 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {/* HDR environment — the chrome NEEDS something to reflect.
              "studio" preset gives clean bright highlights. */}
          <Environment preset="studio" />

          {/* Direct lights add hot specular hits over the env reflections */}
          <ambientLight intensity={0.25} />
          <directionalLight position={[3, 4, 3]} intensity={1.4} color="#FFE4C4" />
          <directionalLight position={[-3, 2, -2]} intensity={0.8} color="#FF6B2C" />
          <pointLight position={[0, -3, 2]} intensity={0.6} color="#FFA060" />

          <StackedSculpture />
        </Suspense>
      </Canvas>
    </div>
  );
};

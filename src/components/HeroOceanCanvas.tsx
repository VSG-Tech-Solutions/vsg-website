"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * HeroOceanCanvas — the actual R3F scene rendering the wave.
 *
 * One tilted plane, dense subdivision (256×256), driven by a vertex shader
 * that sums four sine waves at different frequencies + time offsets. A
 * fragment shader paints the plane near-black at troughs, with a faint
 * white highlight on wave crests where the surface tips toward the camera.
 * A radial-vignette fog mask fades the far edges to pure black so the
 * horizon dissolves rather than ending hard.
 *
 * Mouse parallax: cursor X / Y nudges the plane's tilt and yaw a few
 * degrees so the ocean feels "looked at" without being interactive in a
 * heavy way.
 */

const Wave: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const target = useRef(new THREE.Vector2(0, 0));
  const eased = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      target.current.set(state.mouse.x, state.mouse.y);
      eased.current.lerp(target.current, 0.04);
      // Base tilt = -PI/2.4 (looking down at the plane). Add subtle mouse-y
      // nudge for parallax; mouse-x rotates the whole plane on Z so the
      // horizon "sways".
      meshRef.current.rotation.x = -Math.PI / 2.4 + eased.current.y * 0.04;
      meshRef.current.rotation.z = eased.current.x * 0.04;
    }
  });

  const vertexShader = /* glsl */ `
    uniform float uTime;
    varying vec2 vUv;
    varying float vEl;

    // Sum-of-sines wave function — cheap, smooth, no noise lookup.
    float waves(vec2 p) {
      float w = 0.0;
      w += sin(p.x * 0.45 + uTime * 0.40) * 0.40;
      w += sin(p.y * 0.65 - uTime * 0.30) * 0.30;
      w += sin((p.x + p.y) * 0.28 + uTime * 0.22) * 0.22;
      w += sin((p.x - p.y * 1.4) * 0.40 - uTime * 0.50) * 0.16;
      w += sin(p.x * 1.2 + uTime * 0.7) * 0.05;
      return w;
    }

    void main() {
      vUv = uv;
      vec3 pos = position;
      float h = waves(pos.xy);
      pos.z += h;
      vEl = h;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = /* glsl */ `
    varying vec2 vUv;
    varying float vEl;

    void main() {
      // Base near-black.
      vec3 col = vec3(0.018, 0.018, 0.022);

      // Wave-crest highlight — much subtler now. User feedback: too much
      // glare. Crests still pick up light but stay matte rather than chrome.
      float crest = smoothstep(0.22, 0.55, vEl);
      col += vec3(0.55, 0.58, 0.62) * crest * 0.20;

      // Edge sheen — very tight, very subtle. Just enough to define the
      // peak of each crest without flashing.
      float edge = smoothstep(0.46, 0.55, vEl);
      col += vec3(0.92) * edge * 0.16;

      // Radial vignette — fade far edges of the plane to black so the
      // horizon dissolves rather than ending in a hard line.
      vec2 c = vUv - 0.5;
      float dist = length(c);
      float fog = smoothstep(0.55, 0.10, dist);
      col *= mix(0.0, 1.0, fog);

      // Subtle bottom-heavy darken so the foreground reads as deep.
      col *= mix(0.6, 1.0, vUv.y);

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2.4, 0, 0]}
      position={[0, -1.6, 0]}
    >
      <planeGeometry args={[36, 36, 220, 220]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const HeroOceanCanvas: React.FC = () => {
  return (
    <Canvas
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
      }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.2, 4.4], fov: 48 }}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <Wave />
    </Canvas>
  );
};

export default HeroOceanCanvas;

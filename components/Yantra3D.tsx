"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const GOLD = new THREE.Color("#C8912F");
const GOLD_LIGHT = new THREE.Color("#F2C766");

function triangle(r: number, up: boolean) {
  const pts = [0, 1, 2, 3].map((i) => {
    const a = (up ? Math.PI / 2 : -Math.PI / 2) + (i * 2 * Math.PI) / 3;
    return new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0);
  });
  return new THREE.BufferGeometry().setFromPoints(pts);
}

function Yantra({ particles }: { particles: number }) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const dust = useRef<THREE.Points>(null);

  const triangles = useMemo(() => [
    ...[1.9, 1.5, 1.1, 0.75].map((r) => ({ g: triangle(r, true), z: 0.02 })),
    ...[1.75, 1.3, 0.9].map((r) => ({ g: triangle(r, false), z: -0.02 })),
  ], []);

  const petals = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0); shape.bezierCurveTo(0.18, 0.15, 0.14, 0.42, 0, 0.55); shape.bezierCurveTo(-0.14, 0.42, -0.18, 0.15, 0, 0);
    return new THREE.ShapeGeometry(shape, 12);
  }, []);

  const dustGeo = useMemo(() => {
    const pos = new Float32Array(particles * 3);
    for (let i = 0; i < particles; i++) {
      const r = 2.6 + Math.random() * 2.2, t = Math.random() * Math.PI * 2;
      pos.set([Math.cos(t) * r, Math.sin(t) * r, (Math.random() - 0.5) * 2.5], i * 3);
    }
    const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(pos, 3)); return g;
  }, [particles]);

  useFrame(({ pointer, clock }, dt) => {
    if (!group.current || !inner.current) return;
    group.current.rotation.z += dt * 0.04;
    inner.current.rotation.z -= dt * 0.09;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.35 + 0.15, 0.04);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.45, 0.04);
    if (dust.current) { dust.current.rotation.z = clock.elapsedTime * 0.015; }
  });

  return (
    <group ref={group}>
      {[2.55, 2.42, 2.05].map((r, i) => (
        <mesh key={r}>
          <torusGeometry args={[r, i === 0 ? 0.022 : 0.01, 16, 180]} />
          <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.28} emissive={GOLD} emissiveIntensity={0.08} />
        </mesh>
      ))}
      {Array.from({ length: 16 }, (_, i) => (
        <group key={i} rotation={[0, 0, (i * Math.PI) / 8]}>
          <mesh geometry={petals} position={[0, 2.05, -0.04]}>
            <meshBasicMaterial color={GOLD} transparent opacity={0.16} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
      <group ref={inner}>
        {triangles.map((t, i) => (
          // @ts-expect-error – r3f <line> maps to THREE.Line
          <line key={i} geometry={t.g} position={[0, 0, t.z]}>
            <lineBasicMaterial color={i % 2 ? GOLD : GOLD_LIGHT} transparent opacity={0.9} />
          </line>
        ))}
      </group>
      <mesh><sphereGeometry args={[0.07, 24, 24]} /><meshStandardMaterial color={GOLD_LIGHT} emissive={GOLD_LIGHT} emissiveIntensity={0.9} /></mesh>
      <points ref={dust} geometry={dustGeo}>
        <pointsMaterial color={GOLD_LIGHT} size={0.025} sizeAttenuation transparent opacity={0.75} depthWrite={false} />
      </points>
    </group>
  );
}

export default function Yantra3D({ particles = 600 }: { particles?: number }) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 7.2], fov: 45 }} gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} color="#FFF3D6" />
      <pointLight position={[-4, -2, 3]} intensity={6} color="#F2C766" />
      <Yantra particles={particles} />
    </Canvas>
  );
}

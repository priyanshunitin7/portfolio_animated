"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = () => {
  const ref = useRef<any>(null);
  const count = 4000;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        // Create a sprawling galaxy/neural field structure
        const r = 25 * Math.sqrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const x = r * Math.cos(theta);
        const y = (Math.random() - 0.5) * 4; // vertical spread
        const z = r * Math.sin(theta);
        positions.set([x, y, z], i * 3);
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    
    // Slow planetary rotation
    const time = state.clock.getElapsedTime();
    ref.current.rotation.y = time * 0.05;
    
    // Complex Sine/Cosine Neural Wave motion
    const positions = ref.current.geometry.attributes.position.array;
    for(let i = 0; i < count; i++) {
       const i3 = i * 3;
       const x = positions[i3];
       const z = positions[i3 + 2];
       // Creates an undulating data-stream effect
       positions[i3 + 1] = Math.sin(time * 0.5 + x * 0.3) * Math.cos(time * 0.5 + z * 0.3) * 1.5;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a855f7" // Deep purple/cyan hint
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

export default function NeuralField() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full bg-transparent overflow-hidden pointer-events-none">
      <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
        <fog attach="fog" args={['#0a0a0a', 5, 25]} />
        <ParticleField />
      </Canvas>
    </div>
  );
}

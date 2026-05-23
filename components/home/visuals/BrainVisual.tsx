'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function BrainParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  // Procedurally generate a point cloud resembling a brain shape
  const [positions, colors] = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    let i = 0;
    while (i < count) {
      // Generate random point in a sphere
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 2.5; // Radius
      
      let x = r * Math.sin(phi) * Math.cos(theta);
      let y = r * Math.sin(phi) * Math.sin(theta);
      let z = r * Math.cos(phi);

      // Shape it roughly like a brain (flatten bottom, elongate front/back)
      y *= 0.8; 
      z *= 1.2;
      
      // Create a slight gap for hemispheres
      if (Math.abs(x) < 0.1) continue; 

      positions[i * 3] = x;
      positions[i * 3 + 1] = y + 0.5;
      positions[i * 3 + 2] = z;

      // Color based on position (cyan/blue neural glow)
      colors[i * 3] = 0.2; // R
      colors[i * 3 + 1] = 0.8 + (Math.random() * 0.2); // G
      colors[i * 3 + 2] = 1.0; // B

      i++;
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial transparent vertexColors size={0.03} sizeAttenuation={true} depthWrite={false} opacity={0.4} />
    </Points>
  );
}

function TumorRegions() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Counter-rotate slightly with the brain to keep it roughly centered but dynamic
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0.5, 0.5, -0.2]}>
      {/* Whole Tumor (Cyan) */}
      <Sphere args={[0.8, 32, 32]}>
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.15} wireframe />
      </Sphere>
      
      {/* Tumor Core (Orange) */}
      <Sphere args={[0.5, 32, 32]}>
        <meshBasicMaterial color="#f97316" transparent opacity={0.4} />
      </Sphere>

      {/* Enhancing Tumor (Red) */}
      <Sphere args={[0.25, 32, 32]}>
        <meshBasicMaterial color="#ef4444" transparent opacity={0.8} />
      </Sphere>
    </group>
  );
}

export default function BrainVisual() {
  return (
    <div className="relative w-full h-full bg-[var(--color-bg-base)] overflow-hidden rounded-3xl cursor-grab active:cursor-grabbing transition-colors duration-300">
      
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <BrainParticles />
          <TumorRegions />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate={false}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </div>

      {/* Overlay UI (Medical Scan Vibe) */}
      <div className="absolute top-6 left-6 pointer-events-none">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] text-white/80 font-mono tracking-widest">LIVE SCAN</span>
        </div>
        <p className="text-[12px] text-slate-400 font-mono">AXIAL / CORONAL / SAGITTAL</p>
      </div>

      <div className="absolute bottom-6 right-6 pointer-events-none flex flex-col gap-2 font-mono text-[10px]">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 border border-cyan-500/50 bg-cyan-500/20" />
          <span className="text-cyan-400">WT (Whole Tumor)</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 border border-orange-500/50 bg-orange-500/20" />
          <span className="text-orange-400">TC (Tumor Core)</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 border border-red-500/50 bg-red-500/20" />
          <span className="text-red-400">ET (Enhancing)</span>
        </div>
      </div>

      {/* Crosshairs & Scanning Line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5 pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/5 pointer-events-none" />
      
    </div>
  );
}

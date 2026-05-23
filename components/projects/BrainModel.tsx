'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Stage } from '@react-three/drei';
import * as THREE from 'three';

// Procedurally generate a segmented "brain-like" shape using layered spheres/noise 
// to simulate the tumor segmentation visual from the screenshot.
function SegmentedBrain() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Slowly rotate the brain slightly for ambient movement
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* Outer Brain (Gray/Black) */}
      <mesh scale={1.2}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          color="#333333" 
          roughness={0.7} 
          metalness={0.1}
          wireframe={true}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Whole Tumor (Green - WT) */}
      <mesh scale={0.7} position={[0.2, 0, 0.1]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#22c55e" roughness={0.4} />
      </mesh>

      {/* Edema (Blue - WT) */}
      <mesh scale={0.55} position={[0.22, 0, 0.12]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.4} />
      </mesh>

      {/* Enhancing Tumor (Orange - ET) */}
      <mesh scale={0.4} position={[0.24, 0, 0.15]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#f97316" roughness={0.4} />
      </mesh>

      {/* Tumor Core (Red - TC) */}
      <mesh scale={0.25} position={[0.26, 0, 0.18]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#ef4444" roughness={0.4} />
      </mesh>
    </group>
  );
}

export default function BrainModel() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing bg-[#0a0f1c] rounded-2xl border border-white/[0.05] overflow-hidden">
      {/* Overlay UI elements */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h3 className="text-[13px] font-bold text-white mb-0.5">3D Brain Segmentation</h3>
        <p className="text-[11px] text-slate-500">BraTS 2020</p>
      </div>

      <div className="absolute top-6 right-6 z-10">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/[0.03] border border-white/[0.08] text-[11px] font-medium text-slate-300 hover:text-white transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Rotate
        </button>
      </div>

      <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
        <div className="flex flex-col gap-2">
          <LegendItem color="bg-[#ef4444]" label="Tumor Core (TC)" />
          <LegendItem color="bg-[#f97316]" label="Enhancing Tumor (ET)" />
          <LegendItem color="bg-[#3b82f6]" label="Edema (WT)" />
          <LegendItem color="bg-[#22c55e]" label="Whole Tumor (WT)" />
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        
        <React.Suspense fallback={null}>
          <SegmentedBrain />
          <Environment preset="city" />
        </React.Suspense>
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          minDistance={1.5}
          maxDistance={5}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}

function LegendItem({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
      <span className="text-[11px] font-medium text-slate-300">{label}</span>
    </div>
  );
}

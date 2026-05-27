'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { RotateCcw, ZoomIn, Hand, RotateCw, Eye, MousePointer2 } from 'lucide-react';

// Procedural proxy for the realistic brain. In a real medical app,
// this would be a highly detailed GLTF/OBJ model loaded via useGLTF.
function SegmentedBrain() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Ambient breathing/floating motion
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      
      {/* Brain Mass Proxy */}
      <mesh scale={[1.4, 1.1, 1.5]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          color="#1a202c"
          roughness={0.3} 
          metalness={0.5}
          bumpScale={0.02}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Internal volumetric glow to simulate subsurface scattering */}
      <mesh scale={[1.35, 1.05, 1.45]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#0f172a" transparent opacity={0.5} wireframe />
      </mesh>

      {/* Tumor Region - Placed embedded on the right side */}
      <group position={[0.7, 0, 0.2]}>
        
        {/* WT (Whole Tumor / Edema) - Cyan/Blue */}
        <mesh scale={0.65}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            color="#0ea5e9" 
            transparent 
            opacity={0.3} 
            roughness={0.2}
            emissive="#0ea5e9"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* TC (Tumor Core) - Orange */}
        <mesh scale={0.45}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            color="#f97316" 
            transparent 
            opacity={0.6} 
            roughness={0.3}
            emissive="#f97316"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* ET (Enhancing Tumor) - Red */}
        <mesh scale={0.25}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            color="#ef4444" 
            roughness={0.4}
            emissive="#ef4444"
            emissiveIntensity={0.8}
          />
        </mesh>
        
      </group>
    </group>
  );
}

export default function BrainModel() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing bg-[#030814] rounded-3xl border border-teal-500/20 overflow-hidden shadow-[inset_0_0_100px_rgba(20,184,166,0.05)]">
      
      {/* Decorative Grid Lines / Rings (2D Overlay) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
        <div className="w-[80%] h-[80%] border border-teal-500/20 rounded-full scale-x-[1.5]" />
        <div className="absolute w-[60%] h-[60%] border border-teal-500/20 rounded-full scale-x-[1.5]" />
      </div>

      {/* Top Left: LIVE SCAN */}
      <div className="absolute top-8 left-8 z-10 pointer-events-none">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
          <span className="text-[11px] font-bold text-white tracking-[0.2em] uppercase">LIVE SCAN</span>
        </div>
        <div className="text-[11px] font-bold tracking-[0.15em] text-slate-500 uppercase mt-2">
          <span className="text-emerald-400">AXIAL</span> <span className="mx-1">/</span> CORONAL <span className="mx-1">/</span> SAGITTAL
        </div>
      </div>

      {/* Left Vertical Toolbar */}
      <div className="absolute top-1/2 -translate-y-1/2 left-8 z-10 flex flex-col gap-3">
        <button className="flex flex-col items-center justify-center gap-1.5 w-16 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.1)] transition-colors">
          <RotateCcw className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Rotate</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-1.5 w-16 h-20 rounded-2xl bg-transparent border border-transparent text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
          <ZoomIn className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Zoom</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-1.5 w-16 h-20 rounded-2xl bg-transparent border border-transparent text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
          <Hand className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Pan</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-1.5 w-16 h-20 rounded-2xl bg-transparent border border-transparent text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
          <RotateCw className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Reset</span>
        </button>
      </div>

      {/* Right Vertical View Mode Box */}
      <div className="absolute top-10 right-8 z-10 flex flex-col items-center">
        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-4">VIEW MODE</span>
        <div className="flex flex-col gap-3">
          {/* Axial */}
          <button className="flex flex-col items-center gap-2 p-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 transition-colors">
            <div className="w-14 h-14 rounded-xl bg-black/60 border border-emerald-500/20 flex items-center justify-center relative overflow-hidden">
               <div className="w-8 h-10 rounded-[40%] bg-slate-600 blur-[2px]" />
            </div>
            <span className="text-[10px] font-bold text-emerald-400">Axial</span>
          </button>
          {/* Coronal */}
          <button className="flex flex-col items-center gap-2 p-2.5 rounded-2xl border border-transparent hover:bg-white/[0.02] transition-colors">
            <div className="w-14 h-14 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center relative overflow-hidden">
               <div className="w-10 h-8 rounded-[40%] bg-slate-700 blur-[2px]" />
            </div>
            <span className="text-[10px] font-semibold text-slate-500">Coronal</span>
          </button>
          {/* Sagittal */}
          <button className="flex flex-col items-center gap-2 p-2.5 rounded-2xl border border-transparent hover:bg-white/[0.02] transition-colors">
            <div className="w-14 h-14 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center relative overflow-hidden">
               <div className="w-10 h-8 rounded-[40%] bg-slate-700 blur-[2px]" />
            </div>
            <span className="text-[10px] font-semibold text-slate-500">Sagittal</span>
          </button>
        </div>
      </div>

      {/* Bottom Right Layers Box */}
      <div className="absolute bottom-8 right-8 z-10 p-5 rounded-2xl bg-[#030814]/80 border border-teal-500/20 backdrop-blur-md min-w-[200px]">
        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-5 block">LAYERS</span>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-1 -mx-1 rounded transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#0ea5e9] shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
              <span className="text-[11px] font-bold text-[#0ea5e9] tracking-wide">WT (Edema)</span>
            </div>
            <Eye className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-1 -mx-1 rounded transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#f97316] shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
              <span className="text-[11px] font-bold text-[#f97316] tracking-wide">TC (Tumor Core)</span>
            </div>
            <Eye className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-1 -mx-1 rounded transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
              <span className="text-[11px] font-bold text-[#ef4444] tracking-wide">ET (Enhancing)</span>
            </div>
            <Eye className="w-4 h-4 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Bottom Left Status/Help Text */}
      <div className="absolute bottom-8 left-8 z-10 flex items-center gap-2 text-slate-500">
        <MousePointer2 className="w-4 h-4" />
        <span className="text-[11px] font-medium tracking-wide">Drag to rotate • Scroll to zoom • Hold right click to pan</span>
      </div>

      {/* Coordinate Markers (S, I, A, P, R, L) */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-teal-500/60 text-[13px] font-bold z-10">S</div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-teal-500/60 text-[13px] font-bold z-10">I</div>
      <div className="absolute top-1/2 -translate-y-1/2 left-[25%] text-teal-500/60 text-[13px] font-bold z-10">A</div>
      <div className="absolute top-1/2 -translate-y-1/2 right-[25%] text-teal-500/60 text-[13px] font-bold z-10">P</div>
      <div className="absolute bottom-24 left-[30%] text-teal-500/60 text-[13px] font-bold z-10">L</div>
      <div className="absolute bottom-24 right-[30%] text-teal-500/60 text-[13px] font-bold z-10">R</div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} className="w-full h-full">
        <ambientLight intensity={0.4} />
        
        {/* Cinematic volumetric lighting */}
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} color="#0ea5e9" />
        <pointLight position={[0, 0, 5]} intensity={0.5} color="#34d399" />
        
        <React.Suspense fallback={null}>
          <SegmentedBrain />
          <Environment preset="city" />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} color="#000000" />
        </React.Suspense>
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={true}
          minDistance={2}
          maxDistance={8}
          autoRotate={false}
          makeDefault
        />
      </Canvas>
    </div>
  );
}

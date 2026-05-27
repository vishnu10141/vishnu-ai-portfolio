'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

const TumorMesh = ({ radius, color, wireframe, opacity, isCore = false }: any) => {
  const geometry = useMemo(() => {
    // High detail for solid core (16), medium detail for wireframe (6) so it doesn't look completely opaque
    const detail = wireframe ? 6 : 16;
    const geo = new THREE.IcosahedronGeometry(radius, detail);
    const posAttribute = geo.getAttribute('position');
    const vertex = new THREE.Vector3();
    
    for (let i = 0; i < posAttribute.count; i++) {
      vertex.fromBufferAttribute(posAttribute, i);
      // Two octaves of noise for a very organic, lumpy, irregular tumor mass
      const noise1 = (Math.sin(vertex.x * 4) * Math.cos(vertex.y * 4) * Math.sin(vertex.z * 4)) * 0.15;
      const noise2 = (Math.sin(vertex.x * 9) * Math.cos(vertex.y * 9) * Math.sin(vertex.z * 9)) * 0.05;
      vertex.normalize().multiplyScalar(radius + noise1 + noise2);
      posAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, [radius, wireframe]);

  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * (isCore ? -0.15 : 0.08);
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.03;
      if (isCore) {
         const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.03;
         meshRef.current.scale.set(scale, scale, scale);
      }
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      {wireframe ? (
        <meshBasicMaterial color={color} wireframe={true} transparent opacity={opacity} />
      ) : (
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.5} />
      )}
    </mesh>
  );
};

const ParticleBrain = () => {
  const points = useMemo(() => {
    const pts = [];
    // Increase to 15,000 for ultra high-definition point cloud
    for (let i = 0; i < 15000; i++) {
      const r_base = Math.pow(Math.random(), 0.15) * 5.5; 
      const theta = Math.random() * 2 * Math.PI; 
      const phi = Math.acos(2 * Math.random() - 1); 
      
      let x = r_base * Math.sin(phi) * Math.cos(theta);
      let z = r_base * Math.sin(phi) * Math.sin(theta);
      let y = r_base * Math.cos(phi);

      // Base proportions
      z *= 1.4; 
      x *= 1.1;

      // Frontal Taper
      if (z > 0) {
        x *= (1 - 0.12 * (z / 7.7)); 
      } else {
        x *= (1 + 0.08 * (-z / 7.7)); 
      }

      // Longitudinal Fissure: Create a literal physical gap dividing left and right hemispheres
      const fissurePinch = Math.exp(-Math.pow(x, 2) / 0.8);
      x += Math.sign(x) * fissurePinch * 0.7; // Push points away from x=0
      if (y > 0) {
        y -= fissurePinch * 1.5; // Dip the top middle
      }

      // Temporal Lobes: Bulge the lower sides outwards
      if (y > -2 && y < 2 && Math.abs(x) > 1.5 && z > -2 && z < 4) {
         x *= 1.15;
      }

      // Base Flattening (Brain stem area)
      if (y < -2.0) {
        y = -2.0 + (y + 2.0) * 0.3;
      }

      // High-Frequency Cortical Folds (Gyri/Sulci)
      if (r_base > 4.5) {
        const noise = (Math.sin(x * 3.5) * Math.cos(y * 3.5) * Math.sin(z * 3.5)) * 0.22;
        x += noise * Math.sign(x);
        y += noise * Math.sign(y);
        z += noise * Math.sign(z);
      }

      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, []);

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Brain Point Cloud */}
      <points geometry={geometry}>
        {/* Made the points slightly brighter and more cyan-tinted */}
        <pointsMaterial color="#38bdf8" size={0.06} sizeAttenuation={true} transparent opacity={0.5} />
      </points>

      {/* WT: Whole Tumor Outer Wireframe */}
      <TumorMesh radius={2.2} color="#0ea5e9" wireframe={true} opacity={0.3} />

      {/* TC: Tumor Core Solid Mass */}
      <TumorMesh radius={1.4} color="#f97316" wireframe={false} opacity={1} isCore={true} />

      {/* ET: Enhancing Tumor Glowing Core */}
      <mesh>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
    </group>
  );
};

export default function BrainVisual() {
  return (
    <div className="w-full h-full relative bg-[#020611] rounded-[24px] overflow-hidden font-sans select-none border border-white/5">
      
      {/* Subtle Background Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.1] z-0"
        style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      {/* Crosshairs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-800/70" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-800/70" />
      </div>

      {/* Top Left: Status Indicator */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5 pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-30" />
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          </div>
          <span className="text-white font-mono text-[13px] font-bold tracking-[0.2em] uppercase drop-shadow-md">LIVE SCAN</span>
        </div>
        <div className="text-slate-400 font-mono text-[11px] tracking-widest uppercase mt-0.5">
          AXIAL / CORONAL / SAGITTAL
        </div>
      </div>

      {/* Bottom Right: Legend */}
      <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-4 pointer-events-none bg-[#020611]/40 backdrop-blur-sm p-4 rounded-xl border border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-3.5 h-3.5 rounded-full border-2 border-[#0ea5e9]" />
          <span className="text-[#0ea5e9] font-mono text-[12px] font-bold tracking-wider">WT (Whole Tumor)</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-3.5 h-3.5 rounded-full border-2 border-[#f97316]" />
          <span className="text-[#f97316] font-mono text-[12px] font-bold tracking-wider">TC (Tumor Core)</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-3.5 h-3.5 rounded-full border-2 border-[#ef4444]" />
          <span className="text-[#ef4444] font-mono text-[12px] font-bold tracking-wider">ET (Enhancing)</span>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 2, 16], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2.0} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#0ea5e9" />
          
          <React.Suspense fallback={null}>
            <ParticleBrain />
            <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
          </React.Suspense>
          
          <OrbitControls 
            enableZoom={true} 
            enablePan={false} 
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>
    </div>
  );
}

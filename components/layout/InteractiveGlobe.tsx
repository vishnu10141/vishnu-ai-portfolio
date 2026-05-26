'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// Parse hex to THREE.Color
function hexToColor(hex: string, fallback = '#10b981'): THREE.Color {
  const cleanHex = hex.trim();
  if (/^#([0-9A-F]{3}){1,2}$/i.test(cleanHex)) {
    return new THREE.Color(cleanHex);
  }
  return new THREE.Color(fallback);
}

function HologramEarth({ themeColor }: { themeColor: THREE.Color }) {
  const earthRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  
  // Mouse tracking setup
  useFrame((state, delta) => {
    if (earthRef.current) {
      // Base auto-rotation
      earthRef.current.rotation.y += delta * 0.05;
      
      // Cursor reactiveness (smooth interpolation)
      const targetX = (mouse.x * Math.PI) / 6;
      const targetY = (mouse.y * Math.PI) / 6;
      
      earthRef.current.rotation.x += 0.05 * (targetY - earthRef.current.rotation.x);
      earthRef.current.rotation.z += 0.05 * (-targetX - earthRef.current.rotation.z);
    }
  });

  return (
    <group ref={earthRef}>
      {/* Atmosphere Glow */}
      <mesh>
        <sphereGeometry args={[2.02, 32, 32]} />
        <meshBasicMaterial 
          color={themeColor} 
          transparent 
          opacity={0.03} 
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Wireframe Core - high detail icosahedron gives a great sci-fi web look */}
      <mesh>
        <icosahedronGeometry args={[2, 10]} />
        <meshBasicMaterial 
          color={themeColor} 
          wireframe 
          transparent 
          opacity={0.08} 
          blending={THREE.AdditiveBlending} 
        />
      </mesh>
    </group>
  );
}

function ParticleSystem({ count = 2000, themeColor }: { count?: number, themeColor: THREE.Color }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Concentrate some points near the equator and spread others
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      // biased towards equator
      const phi = Math.acos(2 * v - 1) * (0.8 + Math.random() * 0.4); 
      
      const r = 2.01 + Math.random() * 0.05;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      // Variable sizing for the dot matrix effect
      size[i] = Math.random() * 1.5;
    }
    return [pos, size];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.06; // Rotate slightly faster than wireframe
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={themeColor}
        transparent
        opacity={0.9}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function OrbitRings({ themeColor }: { themeColor: THREE.Color }) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  
  useFrame((state, delta) => {
    if (ring1.current) ring1.current.rotation.z -= delta * 0.15;
    if (ring2.current) ring2.current.rotation.y += delta * 0.12;
    if (ring3.current) {
       ring3.current.rotation.x += delta * 0.08;
       ring3.current.rotation.y -= delta * 0.05;
    }
    
    // Slight bend towards cursor
    if (groupRef.current) {
      const targetX = (mouse.x * Math.PI) / 12;
      const targetY = (mouse.y * Math.PI) / 12;
      groupRef.current.rotation.x += 0.02 * (targetY - groupRef.current.rotation.x);
      groupRef.current.rotation.y += 0.02 * (targetX - groupRef.current.rotation.y);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={ring1} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.5, 0.002, 16, 100]} />
        <meshBasicMaterial color={themeColor} transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </mesh>
      
      <mesh ref={ring2} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[2.8, 0.003, 16, 100]} />
        <meshBasicMaterial color={themeColor} transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </mesh>

      <mesh ref={ring3} rotation={[-Math.PI / 6, 0, Math.PI / 2]}>
        <torusGeometry args={[3.2, 0.001, 16, 100]} />
        <meshBasicMaterial color={themeColor} transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function FloatingSatellites({ themeColor }: { themeColor: THREE.Color }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[2.5, 0, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color={themeColor} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[-1.5, 1.8, 2]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color={themeColor} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[0, -2.8, -1.5]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color={themeColor} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[2, -1.8, 1.5]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color={themeColor} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

export function InteractiveGlobe() {
  const [themeColor, setThemeColor] = useState(new THREE.Color('#10b981'));

  useEffect(() => {
    const updateColors = () => {
      const computed = getComputedStyle(document.documentElement);
      const primaryHex = computed.getPropertyValue('--accent-500').trim();
      if (primaryHex) {
        setThemeColor(hexToColor(primaryHex));
      }
    };
    updateColors();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') updateColors();
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full h-[400px] lg:h-[500px] min-h-[400px] flex items-center justify-center pointer-events-auto overflow-visible">
      {/* Sci-Fi Base Pedestal matching the exact design */}
      <div className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-[350px] h-[120px] z-0 pointer-events-none opacity-60">
        <div className="w-full h-full rounded-full border-[2px] border-primary-500/10 shadow-[0_0_20px_var(--accent-glow-base)]" style={{ transform: 'rotateX(75deg)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[80px] rounded-full border-[1px] border-primary-500/20 shadow-[0_0_30px_var(--accent-glow-base)_inset]" style={{ transform: 'rotateX(75deg)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[40px] rounded-full bg-primary-500/5 blur-xl" style={{ transform: 'rotateX(75deg)' }} />
        {/* Radar pulses */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[25px] rounded-full border-[2px] border-primary-500/30 animate-[ping_3s_linear_infinite]" style={{ transform: 'rotateX(75deg)' }} />
        {/* Core beam */}
        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-[60px] h-[250px] bg-gradient-to-t from-primary-500/10 to-transparent blur-2xl pointer-events-none" />
      </div>

      <div className="absolute inset-0 z-10 w-[120%] h-[120%] left-[-10%] top-[-10%]">
        <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} color={themeColor} />
          <pointLight position={[-10, -10, -5]} intensity={0.4} color={themeColor} />

          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
            <HologramEarth themeColor={themeColor} />
            <ParticleSystem themeColor={themeColor} count={2500} />
            <OrbitRings themeColor={themeColor} />
            <FloatingSatellites themeColor={themeColor} />
          </Float>

          <EffectComposer>
            <Bloom 
              luminanceThreshold={0.2} 
              mipmapBlur 
              intensity={1.2} 
              radius={0.5}
            />
          </EffectComposer>
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            enableRotate={false} 
          />
        </Canvas>
      </div>
      
      {/* Gradient mask to blend edges smoothly into the page background */}
      <div className="absolute inset-0 pointer-events-none rounded-[32px] z-20 shadow-[inset_0_0_120px_40px_rgba(0,0,0,0.6)] opacity-50" />
    </div>
  );
}

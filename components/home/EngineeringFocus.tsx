'use client';

import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import {
  Activity, Zap, Target, Bug, Database, Layers,
  Hexagon, Circle, Triangle, Code2, Terminal
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// 4 categories based on the first image reference
const focusAreasLeft = [
  {
    title: 'AI & ML SOLUTIONS',
    items: [
      { name: 'TensorFlow', subtext: 'Deep Learning', icon: Hexagon, color: 'text-orange-500' },
      { name: 'OpenCV', subtext: 'Computer Vision', icon: Target, color: 'text-green-500' },
      { name: 'Scikit-learn', subtext: 'ML Libraries', icon: Hexagon, color: 'text-orange-400' },
      { name: 'MONAI', subtext: 'Medical AI', icon: Activity, color: 'text-green-400' },
    ]
  },
  {
    title: 'DATA SCIENCE',
    items: [
      { name: 'Python', subtext: 'Programming', icon: Terminal, color: 'text-blue-500' },
      { name: 'Pandas', subtext: 'Data Analysis', icon: Database, color: 'text-purple-500' },
      { name: 'NumPy', subtext: 'Numerical Computing', icon: Hexagon, color: 'text-blue-400' },
      { name: 'Matplotlib', subtext: 'Visualization', icon: Activity, color: 'text-yellow-500' },
      { name: 'Seaborn', subtext: 'Statistical Data Viz', icon: Layers, color: 'text-cyan-400' },
    ]
  }
];

const focusAreasRight = [
  {
    title: 'FULL STACK DEVELOPMENT',
    items: [
      { name: 'Next.js', subtext: 'React Framework', icon: Triangle, color: 'text-slate-200' },
      { name: 'React', subtext: 'UI Library', icon: Circle, color: 'text-cyan-400' },
      { name: 'Node.js', subtext: 'Runtime', icon: Hexagon, color: 'text-green-500' },
      { name: 'TypeScript', subtext: 'Typed JavaScript', icon: Code2, color: 'text-blue-500' },
      { name: 'Tailwind CSS', subtext: 'Styling Framework', icon: Zap, color: 'text-cyan-300' },
    ]
  },
  {
    title: 'PROBLEM SOLVING',
    items: [
      { name: 'Data Structures', subtext: 'Efficient Storage', icon: Database, color: 'text-green-400' },
      { name: 'Optimization', subtext: 'Performance Tuning', icon: Target, color: 'text-green-500' },
      { name: 'System Design', subtext: 'Architecture', icon: Layers, color: 'text-blue-400' },
      { name: 'Debugging', subtext: 'Issue Resolution', icon: Bug, color: 'text-red-500' },
    ]
  }
];

function InteractiveCard({ area, align, themeHex }: { area: any, align: 'left' | 'right', themeHex: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03, zIndex: 30, y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`relative group rounded-[24px] border backdrop-blur-2xl p-7 lg:p-9 overflow-hidden flex flex-col transition-all duration-500 bg-black/40`}
      style={{ 
        borderColor: `${themeHex}33`, 
        boxShadow: isHovered 
          ? `0 20px 60px -15px ${themeHex}40, inset 0 0 40px ${themeHex}10` 
          : `0 10px 40px -10px rgba(0,0,0,0.8), inset 0 0 20px ${themeHex}05`
      }}
    >
      {/* Subtle Inner Glow */}
      <div className="absolute inset-0 rounded-[24px] pointer-events-none mix-blend-overlay z-10" style={{ border: `1px solid ${themeHex}20` }} />

      {/* Dynamic Hover Glow Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition duration-500 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${smoothX}px ${smoothY}px,
              ${themeHex}22,
              transparent 80%
            )
          `,
        }}
      />
      
      <div className={`relative z-10 w-full flex flex-col`}>
        <h3 className={`text-[14px] font-extrabold tracking-[0.3em] uppercase mb-8 flex items-center gap-4 ${align === 'right' ? 'justify-end flex-row-reverse' : ''}`} style={{ color: themeHex }}>
          <span className={`w-12 h-[2px] ${align === 'left' ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-transparent`} style={{ backgroundImage: `linear-gradient(to ${align === 'left' ? 'right' : 'left'}, transparent, ${themeHex}80)` }} />
          <span className="drop-shadow-[0_0_8px_currentColor]">{area.title}</span>
        </h3>
        
        <div className={`grid grid-cols-2 gap-y-6 gap-x-5 w-full`}>
          {area.items.map((item: any, i: number) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05, x: align === 'left' ? 5 : -5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`flex items-center gap-4 p-3 rounded-2xl border transition-all cursor-pointer ${align === 'right' ? 'flex-row-reverse text-right' : 'text-left'}`}
                style={{ 
                  borderColor: 'transparent', 
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${themeHex}0f`;
                  e.currentTarget.style.borderColor = `${themeHex}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div className="relative shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-black/50 border shadow-inner transition-colors duration-300"
                     style={{ borderColor: isHovered ? `${themeHex}55` : `${themeHex}22` }}>
                  <Icon className={`w-6 h-6 relative z-10`} style={{ color: themeHex }} />
                  <div className={`absolute inset-0 blur-[12px] opacity-0 group-hover:opacity-50 transition-opacity duration-500`} style={{ backgroundColor: themeHex }} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[15px] text-white font-bold whitespace-nowrap tracking-wide drop-shadow-sm group-hover:drop-shadow-[0_0_8px_currentColor] transition-all" style={{ textShadow: isHovered ? `0 0 10px ${themeHex}50` : 'none' }}>
                    {item.name}
                  </span>
                  <span className="text-[12px] text-slate-400 font-medium whitespace-nowrap">
                    {item.subtext}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
    </motion.div>
  );
}

function FloatingParticles({ count = 40, themeColor }: { count?: number, themeColor: THREE.Color }) {
  const pointsRef = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  });

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color={themeColor} transparent opacity={0.15} blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  );
}

function HolographicCube({ themeColor }: { themeColor: THREE.Color }) {
  const cubeRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    if (cubeRef.current) {
      cubeRef.current.rotation.x = time * 0.1;
      cubeRef.current.rotation.y = time * 0.15;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z = time * 0.03;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
        {/* Core very subtle solid glow */}
        <mesh>
          <boxGeometry args={[0.9, 0.9, 0.9]} />
          <meshBasicMaterial color={themeColor} transparent opacity={0.02} blending={THREE.AdditiveBlending} />
        </mesh>
        
        {/* Outer subtle wireframe */}
        <mesh ref={cubeRef}>
          <boxGeometry args={[1.1, 1.1, 1.1]} />
          <meshBasicMaterial color={themeColor} wireframe transparent opacity={0.15} blending={THREE.AdditiveBlending} />
        </mesh>
      </Float>
      
      {/* Concentric rings under the cube - highly transparent */}
      <group position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]} ref={ringsRef}>
        {[1.0, 1.8, 2.6, 3.4].map((radius, i) => (
          <mesh key={i}>
            <ringGeometry args={[radius, radius + 0.005, 64]} />
            <meshBasicMaterial color={themeColor} transparent opacity={0.05 - (i * 0.01)} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function EngineeringFocus() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [themeHex, setThemeHex] = useState('#10b981'); // Default green
  const [themeColor3D, setThemeColor3D] = useState(new THREE.Color('#10b981'));

  useEffect(() => {
    const handleGlobalMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleGlobalMouse);
    return () => window.removeEventListener('mousemove', handleGlobalMouse);
  }, [mouseX, mouseY]);

  useEffect(() => {
    // Sync with global theme CSS variable
    const updateThemeColor = () => {
      const root = document.documentElement;
      const primaryVar = getComputedStyle(root).getPropertyValue('--accent-500').trim();
      
      if (primaryVar) {
        // Handle hsl, rgb, or hex
        setThemeHex(primaryVar);
        setThemeColor3D(new THREE.Color(primaryVar));
      }
    };

    updateThemeColor();
    const observer = new MutationObserver(updateThemeColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class', 'data-theme'] });
    
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="w-full relative z-20 py-32 bg-transparent overflow-hidden">
      
      {/* Minimal Ambient Background blending with theme */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, ${themeHex}05 1px, transparent 1px), linear-gradient(to bottom, ${themeHex}05 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,transparent_0%,var(--color-bg-base,transparent)_90%)] opacity-100" />
      </div>

      {/* Very Soft Cursor Tracking Parallax Element */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-20 z-0 mix-blend-screen"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              ${themeHex}0a,
              transparent 80%
            )
          `,
        }}
      />

      <div className="container-width max-w-[1500px] relative z-10 mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 relative">
          
          {/* Subtle Circuit Traces SVG connecting cards to center */}
          <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block overflow-visible">
            <svg className="w-full h-full opacity-30">
              {/* Left to Center paths */}
              <path d="M 30% 25% C 40% 25%, 45% 45%, 50% 50%" fill="none" stroke={themeHex} strokeWidth="0.5" strokeDasharray="2 8" className="animate-[dash_30s_linear_infinite]" opacity="0.1" />
              <path d="M 30% 75% C 40% 75%, 45% 55%, 50% 50%" fill="none" stroke={themeHex} strokeWidth="0.5" strokeDasharray="2 8" className="animate-[dash_35s_linear_infinite]" opacity="0.1" />
              
              {/* Right to Center paths */}
              <path d="M 70% 25% C 60% 25%, 55% 45%, 50% 50%" fill="none" stroke={themeHex} strokeWidth="0.5" strokeDasharray="2 8" className="animate-[dash_32s_linear_infinite]" opacity="0.1" />
              <path d="M 70% 75% C 60% 75%, 55% 55%, 50% 50%" fill="none" stroke={themeHex} strokeWidth="0.5" strokeDasharray="2 8" className="animate-[dash_34s_linear_infinite]" opacity="0.1" />
            </svg>
          </div>

          {/* Left Cards */}
          <div className="w-full lg:w-[35%] flex flex-col gap-10 lg:gap-20 relative z-20 perspective-1000">
            {focusAreasLeft.map((area, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: 'easeOut' }}
              >
                <InteractiveCard area={area} align="left" themeHex={themeHex} />
              </motion.div>
            ))}
          </div>

          {/* Center 3D Hologram Area - Significantly reduced visual dominance */}
          <div className="w-full lg:w-[30%] h-[300px] lg:h-[500px] relative flex items-center justify-center -my-8 lg:my-0 z-0">
            <Canvas camera={{ position: [0, 1.5, 6], fov: 35 }} className="w-full h-full cursor-crosshair">
              <ambientLight intensity={0.1} />
              <pointLight position={[0, 0, 0]} intensity={1.5} color={themeColor3D} />
              
              <HolographicCube themeColor={themeColor3D} />
              <FloatingParticles count={30} themeColor={themeColor3D} />
              <EffectComposer>
                <Bloom luminanceThreshold={0.5} mipmapBlur intensity={0.5} radius={0.4} />
              </EffectComposer>
            </Canvas>
          </div>

          {/* Right Cards */}
          <div className="w-full lg:w-[35%] flex flex-col gap-10 lg:gap-20 relative z-20 perspective-1000">
            {focusAreasRight.map((area, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: 'easeOut' }}
              >
                <InteractiveCard area={area} align="right" themeHex={themeHex} />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

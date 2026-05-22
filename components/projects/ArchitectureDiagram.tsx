'use client';

import { motion } from 'framer-motion';

interface Props {
  type: string;
}

export function ArchitectureDiagram({ type }: Props) {
  const cleanType = type.trim().toLowerCase();

  if (cleanType === 'unet' || cleanType === 'brain-tumor-unet') {
    return <UNetDiagram />;
  }
  
  if (cleanType === 'radar' || cleanType === 'drdo') {
    return <RadarPipeline />;
  }

  return (
    <div className="p-8 border border-dashed border-[var(--color-border)] rounded-xl flex items-center justify-center text-text-muted glass">
      Diagram type '{type}' not found.
    </div>
  );
}

function UNetDiagram() {
  return (
    <div className="my-8 p-6 glass-strong rounded-2xl border border-[var(--color-border)] overflow-hidden">
      <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6 font-display">3D U-Net Architecture</h3>
      
      <div className="relative h-64 flex items-center justify-center gap-4">
        {/* Input */}
        <Node label="Input MRI" delay={0} y={0} color="var(--color-blue-500)" />
        
        {/* Encoder Path */}
        <div className="flex flex-col gap-4">
          <Node label="Conv Block 1" delay={0.2} y={20} color="var(--color-cyan-500)" />
          <Node label="Conv Block 2" delay={0.4} y={40} color="var(--color-cyan-500)" />
        </div>

        {/* Bottleneck */}
        <Node label="Bottleneck" delay={0.6} y={60} color="var(--color-violet-500)" />

        {/* Decoder Path */}
        <div className="flex flex-col gap-4">
          <Node label="UpConv 1" delay={0.8} y={40} color="var(--color-cyan-500)" />
          <Node label="UpConv 2" delay={1.0} y={20} color="var(--color-cyan-500)" />
        </div>

        {/* Output */}
        <Node label="Segmentation" delay={1.2} y={0} color="var(--color-blue-500)" />
      </div>
    </div>
  );
}

function RadarPipeline() {
  return (
    <div className="my-8 p-6 glass-strong rounded-2xl border border-[var(--color-border)] overflow-hidden">
      <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6 font-display">Radar Anomaly Pipeline</h3>
      <div className="relative h-48 flex items-center justify-center gap-6">
        <Node label="Raw IQ Data" delay={0} color="var(--color-blue-500)" />
        <Node label="Clutter Filter (MTI)" delay={0.3} color="var(--color-cyan-500)" />
        <Node label="CFAR Detection" delay={0.6} color="var(--color-violet-500)" />
        <Node label="Anomaly Tracking" delay={0.9} color="var(--accent-500)" />
      </div>
    </div>
  );
}

function Node({ label, delay, y = 0, color }: { label: string; delay: number; y?: number; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: y + 20 }}
      whileInView={{ opacity: 1, scale: 1, y }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5, type: 'spring' }}
      className="relative flex flex-col items-center justify-center w-28 h-16 rounded-xl border-2 backdrop-blur-md z-10"
      style={{ borderColor: color, backgroundColor: 'var(--color-bg-elevated)', boxShadow: `0 0 20px ${color}33` }}
    >
      <span className="text-xs font-medium text-center text-[var(--color-text-primary)] leading-tight px-2">
        {label}
      </span>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import React from 'react';

const projects = [
  {
    id: '01',
    title: 'Radar Anomaly Detection',
    description: 'ML system for signal segmentation and false-positive reduction in clutter-heavy radar environments.',
    bullets: [
      'Engineered a robust segmentation pipeline reducing false positives by 25%.',
      'Deployed optimized XGBoost and SVM models for real-time inference.',
      'Developed at DRDO under restricted defense environments.'
    ],
    tags: ['XGBoost', 'Random Forest', 'SVM', 'NumPy', 'Pandas', 'Scikit-learn'],
    image: '/images/radar_ui.png',
    link: '#',
    align: 'left' // Image Left, Text Right
  },
  {
    id: '02',
    title: 'Brain Tumor Segmentation',
    description: 'End-to-end medical imaging system using Residual Attention U-Net on BraTS 2020 with Streamlit visualization.',
    bullets: [
      'Achieved Dice score of 0.87 → outperforming baselines.',
      'Integrated MONAI for scalable distributed training.',
      'Developed Streamlit dashboard (2D/3D visualization, tumor volume, explainability maps).'
    ],
    tags: ['PyTorch', 'MONAI', 'U-Net', 'Streamlit', 'NumPy', 'Nibabel'],
    image: '/images/brain_3d.png',
    link: '#',
    align: 'right' // Text Left, Image Right
  },
  {
    id: '03',
    title: 'Multilingual NLP Pipeline',
    description: 'Built automated NLP pipeline for Telugu and English text classification with 12% performance improvement.',
    bullets: [
      'Built 100K+ annotated dataset → improved model generalization.',
      'Reduced dataset noise by 40% using automated cleaning and validation.',
      'Collaborated with research team on multilingual NLP models.'
    ],
    tags: ['Python', 'Transformers', 'PyTorch', 'Pandas', 'FastAPI', 'PostgreSQL'],
    image: '/images/nlp_dashboard.png',
    link: '#',
    align: 'left' // Image Left, Text Right
  }
];

// Helper to provide realistic 3D tilt
function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -5; // max 5 deg tilt
    const rotateYValue = ((x - centerX) / centerX) * 5;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
        style={{ transformStyle: "preserve-3d" }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  return (
    <section id="projects" className="w-full pt-32 pb-20 relative z-20">
      
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-500 block mb-3">FEATURED PROJECTS</span>
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Projects That Solve Real Problems</h2>
          <p className="text-slate-400 text-[15px] max-w-xl leading-relaxed">
            A selection of AI systems I've designed, built, and deployed. Each project addresses a real-world problem with measurable impact.
          </p>
        </div>
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-slate-300 border border-white/10 hover:border-white/20 hover:bg-white/[0.02] transition-colors whitespace-nowrap"
        >
          View all projects
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Projects List */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {projects.map((project, idx) => (
          <TiltCard key={project.id}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#020611] border border-white/5 rounded-2xl overflow-hidden group hover:border-blue-500/20 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] relative"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${project.align === 'right' ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Content Side */}
                <div className={`p-8 lg:p-12 flex flex-col justify-center ${project.align === 'right' ? 'lg:order-1' : 'lg:order-2'}`}>
                  <span className="text-blue-500 font-mono text-sm mb-4">{project.id}</span>
                  <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{project.title}</h3>
                  <p className="text-[15px] text-slate-400 mb-8 leading-relaxed max-w-lg">
                    {project.description}
                  </p>
                  
                  <ul className="space-y-4 mb-10">
                    {project.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-[14px] text-slate-300">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                    <div className="flex flex-wrap gap-2 max-w-[400px]">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 rounded-md bg-white/[0.02] border border-white/5 text-[11px] font-medium text-slate-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link 
                      href={project.link}
                      className="inline-flex items-center gap-2 text-[13px] font-bold text-blue-500 hover:text-blue-400 transition-colors whitespace-nowrap"
                    >
                      View Project
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Image Side */}
                <div className={`relative h-[300px] sm:h-[400px] lg:h-auto bg-[#040812]/50 border-white/5 ${project.align === 'right' ? 'lg:order-2 lg:border-l' : 'lg:order-1 lg:border-r'} overflow-hidden flex items-center justify-center p-8`}>
                  {/* Subtle glow behind image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <motion.div 
                    style={{ transformStyle: "preserve-3d" }}
                    className="relative w-full max-w-[500px] aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </div>

              </div>
            </motion.div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ProjectCard, { type ProjectCardData } from '@/components/projects/ProjectCard';

const AUTHENTIC_PROJECTS = [
  {
    id: '1',
    slug: 'radar-anomaly-detection',
    title: 'Radar Anomaly Detection',
    shortDescription: 'Machine learning system for signal segmentation and false-positive reduction in clutter-heavy radar environments.',
    category: 'Anomaly Detection',
    technologies: ['XGBoost', 'Random Forest', 'SVM', 'NumPy'],
    featured: true
  },
  {
    id: '2',
    slug: 'telugu-llm-pipeline',
    title: 'Telugu LLM Pipeline',
    shortDescription: 'Large-scale automated NLP data pipeline preparing 100K+ high-quality annotated Telugu datasets for model training.',
    category: 'NLP',
    technologies: ['Python', 'Data Engineering', 'LLMs'],
    featured: true
  },
  {
    id: '3',
    slug: 'brain-tumor-segmentation',
    title: 'Brain Tumor Segmentation',
    shortDescription: 'End-to-end medical imaging system using Residual Attention U-Net on the BraTS dataset with Streamlit visualization.',
    category: 'Computer Vision',
    technologies: ['PyTorch', 'MONAI', 'U-Net', 'Streamlit'],
    featured: true
  },
  {
    id: '4',
    slug: 'credit-card-fraud',
    title: 'Credit Card Fraud Detection',
    shortDescription: 'Fraud detection pipeline processing 284K+ transactions using ensemble learning and SMOTE for extreme class imbalance.',
    category: 'Machine Learning',
    technologies: ['Scikit-learn', 'SMOTE', 'XGBoost'],
    featured: true
  }
] as ProjectCardData[];

export default function FeaturedProjects() {
  const projects = AUTHENTIC_PROJECTS;
  return (
    <section id="projects" className="relative overflow-hidden" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="absolute inset-0 bg-bg-elevated" />
      <div className="absolute inset-0 bg-dots opacity-25" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* Left glow */}
      <div
        className="absolute -left-40 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none animate-glow-pulse"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', animationDuration: '7s' }}
      />

      <div className="relative container-width">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label"
            >
              Featured Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Selected <span className="gradient-text">Projects</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-cyan-400 transition-colors group"
            >
              View all projects
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.length === 0 ? (
            <div className="col-span-full py-12 text-center text-white/50">
              No featured projects available.
            </div>
          ) : (
            projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))
          )}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/projects" className="btn-ghost inline-flex">
            Browse All Research Projects
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

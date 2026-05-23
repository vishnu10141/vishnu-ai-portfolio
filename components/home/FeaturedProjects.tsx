'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ProjectCard, { type ProjectCardData } from '@/components/projects/ProjectCard';

const PROJECTS: ProjectCardData[] = [
  {
    id: '1',
    slug: 'radar-anomaly-detection',
    title: 'Radar Anomaly Detection',
    shortDescription: 'Machine learning system for signal segmentation and false-positive reduction in clutter-heavy radar environments.',
    achievements: [
      'Engineered a robust segmentation pipeline reducing false positives by 25%.',
      'Deployed optimized XGBoost and SVM models for real-time inference.',
      'Developed at DRDO under restricted defense environments.',
    ],
    category: 'Anomaly Detection',
    technologies: ['XGBoost', 'Random Forest', 'SVM', 'NumPy'],
    githubUrl: 'https://github.com/nvishnu1014',
    featured: true,
  },
  {
    id: '2',
    slug: 'telugu-llm-pipeline',
    title: 'Telugu LLM Pipeline',
    shortDescription: 'Large-scale automated NLP data pipeline processing 100K+ high-quality annotated Telugu datasets for model training.',
    achievements: [
      'Architected distributed text scraping & cleaning system for native Telugu.',
      'Boosted annotation throughput by 200% via automated pre-labeling.',
      'Supported research at IIIT Hyderabad applied NLP lab.',
    ],
    category: 'NLP',
    technologies: ['Python', 'Data Engineering', 'LLMs', 'PyTorch'],
    githubUrl: 'https://github.com/nvishnu1014',
    featured: true,
  },
  {
    id: '3',
    slug: 'brain-tumor-segmentation',
    title: 'Brain Tumor Segmentation',
    shortDescription: 'End-to-end medical imaging system using Residual Attention U-Net on BraTS 2020 with Streamlit visualization.',
    achievements: [
      'Achieved Dice score of 0.87 → outperforming baselines.',
      'Integrated MONAI for scalable distributed training.',
      'Developed Streamlit dashboard (2D/3D visualization, tumor volume, explainability maps).',
    ],
    category: 'Computer Vision',
    technologies: ['PyTorch', 'MONAI', 'U-Net', 'Streamlit'],
    githubUrl: 'https://github.com/nvishnu1014',
    featured: true,
  },
  {
    id: '4',
    slug: 'credit-card-fraud',
    title: 'Credit Card Fraud Detection',
    shortDescription: 'Fraud detection pipeline processing 284K+ transactions using ensemble learning and SMOTE for extreme class imbalance.',
    achievements: [
      'Handled 99.8% class imbalance via advanced SMOTE sampling.',
      'Achieved 99.2% AUC, 95% precision on fraud class.',
      'Applied SMOTE, feature engineering, cross-validation, and hyperparameter tuning.',
    ],
    category: 'Machine Learning',
    technologies: ['Scikit-learn', 'SMOTE', 'XGBoost', 'Pandas'],
    githubUrl: 'https://github.com/nvishnu1014',
    featured: true,
  },
];

export default function FeaturedProjects() {
  return (
    <section id="projects" className="relative py-28 bg-[#060d1b]">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="container-width">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <h2
            className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Featured Projects
          </h2>
          <Link
            href="/projects"
            className="text-[13px] font-medium text-blue-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            View all projects
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Project stack */}
        <div className="flex flex-col gap-24 lg:gap-32">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { 
  Brain, Code2, Database, Box, Cloud, Terminal, 
  Server, Zap, LineChart, Shield, Search, Puzzle, Camera, Download
} from 'lucide-react';

const skillCategories = [
  {
    col: 1,
    categories: [
      {
        title: 'AI / ML',
        icon: Brain,
        skills: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'Natural Language Processing', 'Reinforcement Learning', 'Anomaly Detection', 'Time Series Analysis', 'Model Evaluation & Tuning']
      },
      {
        title: 'Dev Tools',
        icon: Terminal,
        skills: ['Git & GitHub', 'VS Code', 'Jupyter Notebook', 'Postman', 'Linux / Ubuntu', 'Conda / Virtualenv']
      }
    ]
  },
  {
    col: 2,
    categories: [
      {
        title: 'Languages',
        icon: Code2,
        skills: ['Python', 'C / C++', 'JavaScript (ES6+)', 'TypeScript', 'SQL', 'Bash']
      },
      {
        title: 'Databases',
        icon: Database,
        skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase']
      }
    ]
  },
  {
    col: 3,
    categories: [
      {
        title: 'Data & Analytics',
        icon: Server,
        skills: ['NumPy', 'Pandas', 'SciPy', 'Matplotlib', 'Seaborn', 'OpenCV', 'Scikit-learn', 'Statsmodels']
      },
      {
        title: 'MLOps',
        icon: Zap,
        skills: ['DVC', 'Weights & Biases', 'MLflow', 'Airflow', 'Docker']
      }
    ]
  },
  {
    col: 4,
    categories: [
      {
        title: 'Deep Learning Frameworks',
        icon: Box,
        skills: ['PyTorch', 'TensorFlow', 'Keras', 'Hugging Face Transformers', 'PyTorch Lightning', 'ONNX']
      },
      {
        title: 'Visualization',
        icon: LineChart,
        skills: ['Matplotlib', 'Seaborn', 'Plotly', 'Streamlit', 'Power BI']
      }
    ]
  },
  {
    col: 5,
    categories: [
      {
        title: 'Cloud & Deployment',
        icon: Cloud,
        skills: ['AWS (S3, EC2, SageMaker)', 'Docker', 'Kubernetes', 'GitHub Actions', 'MLflow', 'Streamlit', 'FastAPI']
      },
      {
        title: 'Other Skills',
        icon: Shield,
        skills: ['REST APIs', 'GraphQL', 'Agile Methodologies', 'Data Structures', 'Algorithms', 'Problem Solving']
      }
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="w-full pt-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-500 block mb-3">SKILLS</span>
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Skills & Technologies</h2>
          <p className="text-slate-400 text-[15px] max-w-xl leading-relaxed">
            A comprehensive set of technical skills and tools I use to design, build, and deploy intelligent systems.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-slate-300 border border-white/10 hover:border-white/20 hover:bg-white/[0.02] transition-colors whitespace-nowrap">
          <Download className="w-4 h-4" />
          Download Tech Stack
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-8 mb-16 border-b border-white/[0.05] pb-16">
        {skillCategories.map((colData, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-12">
            {colData.categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: (colIdx * 0.1) + (i * 0.1) }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Icon className="w-6 h-6 text-blue-500 stroke-[1.5]" />
                    <h3 className="text-[15px] font-bold text-slate-100">{cat.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {cat.skills.map(skill => (
                      <li key={skill} className="flex items-start gap-3">
                        <span className="w-1 h-1 rounded-full bg-blue-500 mt-2 shrink-0" />
                        <span className="text-[13px] text-slate-400 font-medium leading-relaxed">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
        
        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-[13px] font-bold text-blue-500 block mb-6">Certifications</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
            {[
              { title: 'AWS Certified Machine Learning - Specialty', issuer: 'Amazon Web Services' },
              { title: 'TensorFlow Developer Certificate', issuer: 'Google' },
              { title: 'Deep Learning Specialization', issuer: 'deeplearning.ai (Coursera)' },
              { title: 'Python for Data Science', issuer: 'IBM (Coursera)' },
            ].map((cert, i) => (
              <div key={i} className="flex gap-3">
                <div className="mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                    <circle cx="12" cy="8" r="6"/>
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-[12px] font-semibold text-slate-200 leading-tight mb-1">{cert.title}</h4>
                  <p className="text-[11px] text-slate-500">{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <span className="text-[13px] font-bold text-blue-500 block mb-6">Soft Skills</span>
          <div className="flex flex-wrap gap-2.5">
            {['Analytical Thinking', 'Communication', 'Team Collaboration', 'Leadership', 'Project Management', 'Adaptability'].map(skill => (
              <span key={skill} className="px-3 py-1.5 text-[11px] font-medium text-slate-400 bg-white/[0.02] border border-white/[0.06] rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <span className="text-[13px] font-bold text-blue-500 block mb-6">Interests</span>
          <ul className="space-y-4">
            {[
              { text: 'AI Research', icon: Search },
              { text: 'Open Source', icon: Code2 },
              { text: 'Problem Solving', icon: Puzzle },
              { text: 'Photography', icon: Camera },
            ].map((interest, i) => {
              const Icon = interest.icon;
              return (
                <li key={i} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-blue-500" />
                  <span className="text-[13px] font-medium text-slate-300">{interest.text}</span>
                </li>
              );
            })}
          </ul>
        </motion.div>

      </div>
    </section>
  );
}

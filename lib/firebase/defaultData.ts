import { Project, Experience } from '../types';

export const defaultProjects: Project[] = [
  {
    id: 'radar',
    title: 'DRDO Radar Anomaly Detection',
    slug: 'radar-anomaly-detection',
    category: 'Defense & Aerospace AI',
    description: 'Real-time radar signal processing and anomaly detection for clutter-heavy defense environments. Optimized for multi-target tracking and signal distortion filtering.',
    longDescription: 'Developed a high-performance anomaly detection system utilizing XGBoost and SVM algorithms, trained on a comprehensive dataset of over 50,000 radar signal samples. The system successfully segregates distinct signal patterns, separating legitimate target echoes from extensive background noise and clutter.',
    visualType: 'radar',
    techStack: ['Python', 'XGBoost', 'SVM', 'Random Forest', 'Pandas', 'NumPy', 'Scikit-learn'],
    githubUrl: 'https://github.com/vishnu/radar-anomaly',
    liveUrl: '',
    featured: true,
    status: 'published',
    order: 0,
    media: ['/images/radar_ui.png'],
    metrics: [
      'Reduced false positives by 25% using XGBoost & SVM.',
      'Deployed real-time inference under restricted environments.',
      'Processed 50K+ radar signal samples with 98% accuracy.'
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'telugu',
    title: 'Telugu NLP Models',
    slug: 'telugu-nlp',
    category: 'Natural Language Processing',
    description: 'Developed advanced NLP models for the Telugu language during research at IIIT Hyderabad. Focused on low-resource language processing and dataset curation.',
    longDescription: 'Created a massive dataset of 100K+ annotated Telugu sentences. Trained and fine-tuned Transformer-based models to improve performance on regional languages.',
    visualType: 'neural',
    techStack: ['Python', 'Transformers', 'PyTorch', 'NLTK', 'Scikit-learn'],
    githubUrl: 'https://github.com/vishnu/telugu-nlp',
    liveUrl: '',
    featured: true,
    status: 'published',
    order: 1,
    media: ['/images/nlp_dashboard.png'],
    metrics: [
      'Built 100K+ annotated Telugu dataset.',
      'Improved NLP performance by 12%.',
      'Reduced dataset noise by 40%.'
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'brats',
    title: 'Brain Tumor Segmentation',
    slug: 'brain-tumor-segmentation',
    category: 'Medical Computer Vision',
    description: 'Deep learning pipeline for 3D MRI brain tumor segmentation. Achieved state-of-the-art Dice scores on the BraTS dataset.',
    longDescription: 'Designed a 3D U-Net architecture to process multi-modal MRI scans. Handled class imbalance and volumetric data processing efficiently.',
    visualType: 'brain',
    techStack: ['Python', 'PyTorch', '3D U-Net', 'Monai', 'OpenCV'],
    githubUrl: 'https://github.com/vishnu/brats-segmentation',
    liveUrl: '',
    featured: true,
    status: 'published',
    order: 2,
    media: ['/images/data_cube.png'],
    metrics: [
      'Achieved 0.92 Dice score on BraTS test set.',
      'Optimized 3D convolutions for 40% faster training.',
      'Integrated MONAI for robust medical image transforms.'
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const defaultExperiences: Experience[] = [
  {
    id: 'drdo',
    role: 'Machine Learning Research Intern',
    company: 'DRDO',
    duration: 'May 2025 - Jul 2025',
    contributions: [
      'Built radar signal segmentation pipeline (50K+ samples) using XGBoost, RF, SVM → 98% accuracy',
      'Designed anomaly detection system - reduced false positives by 25% in noisy environments',
      'Optimized inference by 30% using PCA and efficient NumPy/Pandas pipelines'
    ],
    stack: ['Python', 'XGBoost', 'SVM', 'Random Forest', 'Pandas', 'NumPy', 'Scikit-learn'],
    logo: '',
    order: 0
  },
  {
    id: 'iiit',
    role: 'NLP Research Intern',
    company: 'IIIT Hyderabad',
    duration: 'Jan 2025 - Apr 2025',
    contributions: [
      'Built 100K+ annotated Telugu dataset → improved NLP performance by 12%',
      'Reduced dataset noise by 40% using automated data pipelines and validation',
      'Collaborated with research team on multilingual NLP models'
    ],
    stack: ['Python', 'Transformers', 'PyTorch', 'Pandas', 'Dataset', 'NLTK', 'Scikit-learn'],
    logo: '',
    order: 1
  },
  {
    id: 'matrusri',
    role: 'B.E. Computer Science & Engineering',
    company: 'Matrusri Engineering College',
    duration: '2022 - 2026',
    contributions: [
      'CGPA: 7.4 / 10',
      'Active in coding competitions and hackathons',
      'Built multiple ML & CV projects',
      'Strong foundation in software engineering and problem solving'
    ],
    stack: ['C / C++', 'Python', 'Java', 'MySQL', 'OpenCV', 'Git', 'Linux'],
    logo: '',
    order: 2
  }
];

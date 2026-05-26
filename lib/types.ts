export type VisualType = 'radar' | 'brain' | 'neural' | 'llm' | 'medical' | 'custom';

export interface Project {
  id: string; // Firestore document ID
  title: string;
  slug: string;
  category: string;
  description: string; // Tagline / Short description
  longDescription: string;
  visualType: VisualType;
  visualPrompt?: string; // For Custom Prompt Generated
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  media: string[]; // URLs for images, videos, GLTF
  metrics: string[]; // Achievement bullets / metrics
  status: 'draft' | 'published';
  createdAt: string; // ISO string
  updatedAt?: string; // ISO string
}

export interface Experience {
  id: string; // Firestore document ID
  company: string;
  role: string;
  duration: string;
  contributions: string[]; // Smart content bullets
  stack: string[];
  logo: string;
  order: number;
}


export type ProjectStatus = 'draft' | 'published';
export type ResearchType = 'Applied' | 'Fundamental' | 'Review' | 'Engineering';

export interface Project {
  id: string; // Firestore document ID
  title: string;
  slug: string;
  category: string; // e.g., 'Medical AI', 'LLM', 'Computer Vision'
  shortDescription: string;
  detailedOverview?: string; // Markdown
  outcomes?: string; // Markdown
  applications?: string; // Markdown
  librariesUsed?: string[];
  technologies?: string[];
  sampleCode?: string; // Markdown or raw code
  order?: number;
  githubUrl?: string;
  demoUrl?: string;
  images?: string[]; // Array of Firebase Storage URLs
  thumbnail?: string; // Main image URL
  pdfUrl?: string;
  published?: boolean; // Computed or duplicate of status
  status?: ProjectStatus;
  featured?: boolean;
  researchType?: ResearchType;
  completionDate?: string; // ISO Date String
  createdAt?: string; // ISO Date String
  updatedAt?: string; // ISO Date String
}

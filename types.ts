export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  category: 'K-12' | 'Higher Ed' | 'Corporate' | 'Tools';
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Frontend' | 'Backend' | 'AI/ML' | 'Design';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface PortfolioData {
  name: string;
  role: string;
  bio: string;
  projects: Project[];
  skills: Skill[];
}
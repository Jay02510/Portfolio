export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  imageUrl: string;
  imagePosition?: string; // New field for object-position classes
  demoUrl?: string;
  websiteUrl?: string;
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

export interface CaseStudyType {
  title: string;
  tagline: string;
  liveUrl: string;
  storeUrl?: string;
  walkthroughVideo?: string;
  screenshots?: { label: string; url: string; subLabel?: string }[];
  stats: { label: string; value: string }[];
  problem: string[];
  solution: string[];
  stack: string[];
  behindTheArchitecture?: {
    problem: string;
    vision: string;
    rationale: string;
  };
  architecture: {
    lifecycle: string[];
    guardrails: string[];
  };
  promptEngineering: {
    logic: string;
    schema: string;
    guardrails: string[];
  };
  impact: {
    value: string[];
    security: string[];
  };
  technicalHurdles?: {
    title?: string;
    incident: string;
    diagnosis: string;
    resolution: string;
  } | {
    title?: string;
    incident: string;
    diagnosis: string;
    resolution: string;
  }[];
}

export interface PortfolioData {
  name: string;
  role: string;
  bio: string;
  projects: Project[];
  skills: Skill[];
}
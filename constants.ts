import { PortfolioData } from './types';

export const PORTFOLIO_DATA: PortfolioData = {
  name: "Jordan Rivera",
  role: "Education Technology Developer",
  bio: "I design and build intuitive education applications that engage students, empower teachers, and democratize access to knowledge. My work focuses on the intersection of cognitive science and full-stack development.",
  skills: [
    { name: "React & Next.js", level: 95, category: "Frontend" },
    { name: "TypeScript", level: 90, category: "Frontend" },
    { name: "GenAI & LLMs", level: 85, category: "AI/ML" },
    { name: "Node.js & Python", level: 85, category: "Backend" },
    { name: "LMS Integration (LTI 1.3)", level: 90, category: "Backend" },
  ],
  projects: [
    {
      id: "chekki-ai",
      title: "ScholarSync LMS",
      category: "Tools",
      description: "A modular Learning Management System designed for micro-schools.",
      longDescription: "ScholarSync features real-time grade synchronization, automated attendance tracking via QR codes, and a React-based interactive assignment builder. It streamlines the connection between student activity and institutional data.",
      tags: ["Next.js", "PostgreSQL", "Socket.io", "LTI 1.3"],
      imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop",
      demoUrl: "https://chekki-ai.vercel.app",
      githubUrl: "#"
    },
    {
      id: "lingua-ai",
      title: "LinguaAI Tutor",
      category: "Tools",
      description: "Adaptive AI-powered language tutor with speech-to-text feedback.",
      longDescription: "An AI tutor that generates personalized quizzes based on student weak points. Integrates advanced Speech-to-Text for pronunciation scoring and real-time formative feedback loops.",
      tags: ["Python", "OpenAI Whisper", "FastAPI", "React"],
      imageUrl: "https://images.unsplash.com/photo-1543269664-76bc3997d9ea?q=80&w=800&auto=format&fit=crop",
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: "edu-metrics",
      title: "EduMetrics Dash",
      category: "Higher Ed",
      description: "Centralized analytics dashboard for university retention prediction.",
      longDescription: "Aggregates data from multiple sources (LMS, SIS, Library systems) to predict at-risk students. Features D3.js powered visualizations for institutional decision making.",
      tags: ["React", "D3.js", "Firebase", "BigQuery"],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bb8c803ef776?q=80&w=800&auto=format&fit=crop",
      demoUrl: "https://education-benchmark-system.vercel.app/",
      githubUrl: "#"
    }
  ]
};
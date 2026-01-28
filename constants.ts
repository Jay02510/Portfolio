
import { PortfolioData, Project } from './types.ts';

export interface ProjectMedia {
  label: string;
  url: string;
}

export interface ProjectExtended extends Project {
  friction: string;
  flow: string;
  impactLabel: string;
  impactValue: string;
  betaCode?: string;
  spotsRemaining?: number;
  premiumFeatures?: string[];
  media?: ProjectMedia[];
}

export const BETA_CODES = [
  { code: "CHEKKI40", label: "Chekki AI" },
  { code: "GUARDIAN-2025", label: "EduPlanner" },
  { code: "BENCHMARK40", label: "Benchmark Explorer" }
];

export const PORTFOLIO_DATA = {
  name: "Jason Benjamin",
  role: "Teacher & Builder",
  profileImageUrl: "https://res.cloudinary.com/dginphpy4/image/upload/v1769135697/IMG_2852_p7w0p4.jpg",
  bio: "After ten years in the classroom, I learned that the best tools are the ones that work as they promise. My goal is to continue to build and solve problems for everyone associated with the classroom.",
  skills: [
    { name: "Workflow Optimization", level: 95, category: "Design" },
    { name: "EdTech AI Integration", level: 90, category: "AI/ML" },
    { name: "Full-Stack Development", level: 92, category: "Backend" },
    { name: "Interface Design", level: 95, category: "Frontend" },
  ],
  impactMetrics: [
    { label: "Hours Saved Weekly", value: "2,400+", icon: "clock" },
    { label: "Parent Engagement", value: "98%", icon: "heart" },
    { label: "User Satisfaction", value: "1,200+", icon: "users" },
    { label: "Efficiency Boost", value: "4x", icon: "zap" }
  ],
  projects: [
    {
      id: "chekki",
      title: "Chekki AI",
      category: "Tools",
      description: "Homework help without the stress.",
      longDescription: "An AI-powered learning assistant designed for families in Korea. It helps bridge the communication gap between school and home while supporting students with their homework in a supportive environment.",
      friction: "The communication barrier between non-native speaking parents and complex school homework assignments.",
      flow: "A bilingual interface that simplifies homework tasks and provides guided explanations for parents.",
      impactLabel: "Confidence",
      impactValue: "Calm evenings",
      betaCode: "CHEKKI40",
      spotsRemaining: 5,
      tags: ["AI Assistant", "Bilingual Support"],
      imageUrl: "https://res.cloudinary.com/dginphpy4/image/upload/v1765770525/Chekki_Futuristic_Background_i8foqe.png",
      imagePosition: "object-right",
      demoUrl: "https://chekki-ai.vercel.app/",
      media: [
        { label: "English Poster", url: "https://res.cloudinary.com/dginphpy4/image/upload/Chekki_English_Poster_r2x0au.pdf" },
        { label: "한국어 포스터", url: "https://res.cloudinary.com/dginphpy4/image/upload/Chekki_Korean_Poster_z2ylof.pdf" },
        { label: "한국어 시연 영상", url: "https://res.cloudinary.com/dginphpy4/video/upload/v1769504113/Chekki_AI_V0_fkdlyx.mov" }
      ]
    },
    {
      id: "benchmark-explorer",
      title: "Benchmark Explorer",
      category: "K-12",
      description: "Stop guessing what they missed.",
      longDescription: "A professional-grade system for tracking student growth and benchmarking. It provides teachers with clear, actionable data to identify learning gaps and personalize instruction.",
      friction: "Teachers often struggle with massive spreadsheets that don't clearly communicate student progress or specific needs.",
      flow: "Automatically transforms raw test scores into visual skill-maps and individual learning plans.",
      impactLabel: "Actionable",
      impactValue: "Zero guesswork",
      betaCode: "BENCHMARK40",
      spotsRemaining: 12,
      tags: ["Data Visualization", "Classroom Strategy"],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      demoUrl: "https://education-benchmark-system.vercel.app/",
    },
    {
      id: "eduplanner",
      title: "EduPlanner",
      category: "Tools",
      description: "Schedules that actually work.",
      longDescription: "A sophisticated scheduling engine built to handle the complex requirements of modern schools. It automates room mapping, substitute management, and staff rotations.",
      friction: "Manual scheduling leads to human error, room conflicts, and hours of administrative overhead every week.",
      flow: "Intelligent conflict-resolution algorithms that suggest the best possible layout for your school's unique needs.",
      impactLabel: "Stability",
      impactValue: "Zero conflicts",
      betaCode: "GUARDIAN-2025",
      spotsRemaining: 19,
      tags: ["Operations", "Productivity"],
      imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop",
      demoUrl: "https://scheduling-app-five.vercel.app/",
    }
  ]
};

import { PortfolioData, Project } from './types.ts';

export interface ProjectExtended extends Project {
  friction: string;
  flow: string;
  impactLabel: string;
  impactValue: string;
}

export const PORTFOLIO_DATA = {
  name: "Jason Benjamin",
  role: "Teacher & Builder",
  bio: "I build simple tools that help parents and schools solve everyday problems. I spent ten years in the classroom seeing where things were hard—now I build helpers to make them easier.",
  skills: [
    { name: "Helping Teachers Plan", level: 95, category: "Design" },
    { name: "Smart Helpers (AI)", level: 90, category: "AI/ML" },
    { name: "Building Easy Tools", level: 92, category: "Backend" },
    { name: "Simple Design", level: 95, category: "Frontend" },
  ],
  impactMetrics: [
    { label: "Paperwork Hours Saved", value: "2,400+", icon: "clock" },
    { label: "Families Helped", value: "98%", icon: "heart" },
    { label: "Colleagues Supported", value: "1,200+", icon: "users" },
    { label: "Daily Speed Boost", value: "4x", icon: "zap" }
  ],
  projects: [
    {
      id: "benchmark-explorer",
      title: "Benchmark Explorer",
      category: "K-12",
      description: "Benchmarking goes beyond test scores.",
      longDescription: "It helps teachers quickly identify learning gaps, generate diagnostic reports, and focus on what students actually need next — not just what they got wrong.",
      friction: "Teachers often see test results but struggle to know exactly which skill a student missed.",
      flow: "Quickly identifies gaps and creates clear reports for both teachers and parents.",
      impactLabel: "Focus",
      impactValue: "Targeted learning",
      tags: ["Helping Students", "Learning Gaps"],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      demoUrl: "https://education-benchmark-system.vercel.app/",
    },
    {
      id: "chekki",
      title: "Chekki AI",
      category: "Tools",
      description: "Helping parents support homework with confidence.",
      longDescription: "It provides clear explanations and guidance so families can focus on understanding — not frustration — during English homework time.",
      friction: "Parents wanting to help with English homework but feeling unsure of how to explain the answers.",
      flow: "A helpful bridge that turns homework time into a moment of shared understanding.",
      impactLabel: "Confidence",
      impactValue: "Zero frustration",
      tags: ["Home Support", "English Homework"],
      imageUrl: "https://res.cloudinary.com/dginphpy4/image/upload/v1765770525/Chekki_Futuristic_Background_i8foqe.png",
      imagePosition: "object-right",
      demoUrl: "https://chekki-ai.vercel.app/",
    },
    {
      id: "eduplanner",
      title: "EduPlanner",
      category: "Tools",
      description: "Scheduling that doesn’t fall apart.",
      longDescription: "EduPlanner creates conflict-free timetables while balancing teachers, rooms, and real-world constraints — even when changes happen last minute.",
      friction: "The stress of school scheduling falling apart when a teacher or room becomes unavailable.",
      flow: "Smart balancing of rooms and schedules so the school day runs smoothly no matter what changes.",
      impactLabel: "Stability",
      impactValue: "Conflict-free days",
      tags: ["Smart Scheduling", "School Flow"],
      imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop",
      demoUrl: "https://scheduling-app-five.vercel.app/",
    }
  ]
};
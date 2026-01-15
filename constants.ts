import { PortfolioData, Project } from './types';

export interface ProjectExtended extends Project {
  friction: string;
  flow: string;
  impactLabel: string;
  impactValue: string;
}

export const PORTFOLIO_DATA = {
  name: "Jason Benjamin",
  role: "Teacher & Developer",
  bio: "I build simple tools that solve real problems in schools. I'm a teacher who learned to code to give time back to my colleagues.",
  skills: [
    { name: "Curriculum Systems", level: 95, category: "Design" },
    { name: "AI Orchestration", level: 90, category: "AI/ML" },
    { name: "Full-Stack Dev", level: 92, category: "Backend" },
    { name: "Experience Design", level: 95, category: "Frontend" },
  ],
  impactMetrics: [
    { label: "Admin Hours Saved", value: "2.4k+", icon: "clock" },
    { label: "Intervention Accuracy", value: "98%", icon: "heart" },
    { label: "Community Reach", value: "1.2k+", icon: "users" },
    { label: "Growth Factor", value: "4.2x", icon: "zap" }
  ],
  projects: [
    {
      id: "benchmark-system",
      title: "Benchmark Explorer",
      category: "K-12",
      description: "A safety net for students.",
      longDescription: "A sophisticated dashboard that visualizes student progress in real-time, allowing educators to identify and support students before they fall behind.",
      friction: "Teachers losing valuable time on manual tracking while quiet students were slipping through the cracks.",
      flow: "A high-fidelity data visualization tool that surfaces actionable student needs instantly.",
      impactLabel: "Safety",
      impactValue: "Zero students missed",
      tags: ["Data Visualization", "Safety Nets"],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      demoUrl: "https://education-benchmark-system.vercel.app/",
    },
    {
      id: "chekki",
      title: "Chekki AI",
      category: "Tools",
      description: "Linguistic bridging for families.",
      longDescription: "A translation engine designed specifically for parent-teacher communication, ensuring that language is never a barrier to a child's education.",
      friction: "Disconnect between schools and non-native speaking families leading to unequal support at home.",
      flow: "Instant multi-modal translation that brings parents directly into the learning feedback loop.",
      impactLabel: "Inclusion",
      impactValue: "+75% Parent participation",
      tags: ["Natural Language Processing", "Social Impact"],
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop",
      demoUrl: "https://chekki.ai",
    },
    {
      id: "intelli-schedule",
      title: "The Scheduler",
      category: "Tools",
      description: "Algorithmic staff management.",
      longDescription: "An automated timetable engine that processes thousands of staff and room constraints to generate optimal school schedules in seconds.",
      friction: "Senior leadership spending weeks every year manually navigating scheduling conflicts in spreadsheets.",
      flow: "A constraint-logic solver that turns a three-week task into a three-minute automated process.",
      impactLabel: "Sanity",
      impactValue: "Saved 120 admin hours",
      tags: ["Algorithm Design", "Internal Tools"],
      imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop",
      demoUrl: "mailto:jsn.benjamin@gmail.com?subject=Scheduling App Demo",
    }
  ]
};
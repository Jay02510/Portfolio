
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
      id: "benchmark-system",
      title: "Benchmark Explorer",
      category: "K-12",
      description: "A safety net for every student.",
      longDescription: "A simple view that shows exactly how children are doing in class. It helps teachers see who needs extra help before they fall behind.",
      friction: "Teachers were buried in spreadsheets while some students weren't getting the attention they needed.",
      flow: "One clear screen that shows who is doing well and who needs a hand.",
      impactLabel: "Care",
      impactValue: "No student left behind",
      tags: ["Helping Students", "Clear Progress"],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      demoUrl: "https://education-benchmark-system.vercel.app/",
    },
    {
      id: "chekki",
      title: "Chekki AI",
      category: "Tools",
      description: "Helping every family connect.",
      longDescription: "When parents and schools speak different languages, things get missed. This tool helps everyone talk and understand each other easily.",
      friction: "Language barriers meant some parents couldn't help with their children's school work.",
      flow: "Simple translation that feels like a natural conversation between home and school.",
      impactLabel: "Family",
      impactValue: "More parents involved",
      tags: ["Language Support", "Home-School Link"],
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop",
      demoUrl: "https://chekki-ai.vercel.app/",
    },
    {
      id: "intelli-schedule",
      title: "The Scheduler",
      category: "Tools",
      description: "Taking the stress out of calendars.",
      longDescription: "School calendars are a puzzle that takes weeks to solve. This tool handles the tricky parts so school leaders can focus on students.",
      friction: "Principals spending their entire summer vacation fixing class schedules by hand.",
      flow: "A smart assistant that builds a fair and working schedule in just a few minutes.",
      impactLabel: "Time",
      impactValue: "Weeks of work saved",
      tags: ["Easy Planning", "School Admin"],
      imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop",
      demoUrl: "https://scheduling-app-five.vercel.app/",
    }
  ]
};

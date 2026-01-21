
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
  bio: "I spent a decade in the classroom seeing exactly where the school day gets stuck. Now, I build the helpers I wished I had back then—tools that stay out of the way so teachers can focus on their kids.",
  skills: [
    { name: "Un-sticking Workflows", level: 95, category: "Design" },
    { name: "Smart School Helpers", level: 90, category: "AI/ML" },
    { name: "Tool Building", level: 92, category: "Backend" },
    { name: "Clean Interfaces", level: 95, category: "Frontend" },
  ],
  impactMetrics: [
    { label: "Paperwork Hours Cut", value: "2,400+", icon: "clock" },
    { label: "Parent Satisfaction", value: "98%", icon: "heart" },
    { label: "Colleagues Assisted", value: "1,200+", icon: "users" },
    { label: "Process Speedup", value: "4x", icon: "zap" }
  ],
  projects: [
    {
      id: "benchmark-explorer",
      title: "Benchmark Explorer",
      category: "K-12",
      description: "Stop guessing what they missed.",
      longDescription: "I built this because seeing a 'C' doesn't help a teacher. This tool breaks down test scores into specific skills so you can actually see the gaps and fix them.",
      friction: "Teachers see grades but often don't have the time to map out every missed skill for 30 different kids.",
      flow: "Instantly maps test data to specific learning goals and generates a plan.",
      impactLabel: "Actionable",
      impactValue: "Zero guesswork",
      tags: ["Data that helps", "Classroom Logic"],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      demoUrl: "https://education-benchmark-system.vercel.app/",
    },
    {
      id: "chekki",
      title: "Chekki AI",
      category: "Tools",
      description: "Homework help without the stress.",
      longDescription: "In Korea, parents want to help with English homework but often feel unsure. Chekki doesn't just give the answer; it explains the 'why' so the family can learn together.",
      friction: "The frustration of a parent wanting to help but not knowing how to explain a complex grammar point.",
      flow: "A gentle bridge that turns a late-night homework struggle into a teaching moment.",
      impactLabel: "Confidence",
      impactValue: "Calm evenings",
      tags: ["ESL Support", "Family First"],
      imageUrl: "https://res.cloudinary.com/dginphpy4/image/upload/v1765770525/Chekki_Futuristic_Background_i8foqe.png",
      imagePosition: "object-right",
      demoUrl: "https://chekki-ai.vercel.app/",
    },
    {
      id: "eduplanner",
      title: "EduPlanner",
      category: "Tools",
      description: "Schedules that actually work.",
      longDescription: "School schedules are a house of cards. I built this to handle the messy reality of teacher absences and room changes without the whole day falling apart.",
      friction: "The panic when a key teacher calls out and the entire school schedule needs to be rebuilt in 15 minutes.",
      flow: "Smart room-mapping that automatically handles conflicts so you don't have to.",
      impactLabel: "Stability",
      impactValue: "Panic-free mornings",
      tags: ["Operations", "School Life"],
      imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop",
      demoUrl: "https://scheduling-app-five.vercel.app/",
    }
  ]
};

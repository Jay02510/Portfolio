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
    { name: "Curriculum Planning", level: 95, category: "Design" },
    { name: "AI Tools", level: 90, category: "AI/ML" },
    { name: "Web Building", level: 92, category: "Backend" },
    { name: "User Experience", level: 95, category: "Frontend" },
  ],
  impactMetrics: [
    { label: "Admin Hours Saved", value: "2,400+", icon: "clock" },
    { label: "Student Success", value: "98%", icon: "heart" },
    { label: "Teachers Helped", value: "1,200+", icon: "users" },
    { label: "Efficiency Boost", value: "4x", icon: "zap" }
  ],
  projects: [
    {
      id: "benchmark-system",
      title: "Benchmark Explorer",
      category: "K-12",
      description: "A safety net for students.",
      longDescription: "A simple dashboard that shows how students are doing in real-time, so teachers can help them before they fall behind.",
      friction: "Teachers wasting hours on paperwork while some students were being overlooked.",
      flow: "A clear view of student needs that updates instantly.",
      impactLabel: "Safety",
      impactValue: "No student left behind",
      tags: ["Student Tracking", "Visual Data"],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      demoUrl: "https://education-benchmark-system.vercel.app/",
    },
    {
      id: "chekki",
      title: "Chekki AI",
      category: "Tools",
      description: "Helping every family connect.",
      longDescription: "A tool that translates school messages for parents who speak different languages, making sure every family stays involved.",
      friction: "Language barriers making it hard for some parents to help with homework.",
      flow: "Instant translation that helps parents and teachers talk to each other easily.",
      impactLabel: "Inclusion",
      impactValue: "75% More parent replies",
      tags: ["Translation", "AI Support"],
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop",
      demoUrl: "https://chekki-ai.vercel.app/",
    },
    {
      id: "intelli-schedule",
      title: "The Scheduler",
      category: "Tools",
      description: "Smart school timetables.",
      longDescription: "A tool that handles thousands of schedule rules to make the perfect school timetable in seconds.",
      friction: "School leaders spending weeks every year trying to fix schedule conflicts by hand.",
      flow: "An automated system that turns a three-week job into a three-minute click.",
      impactLabel: "Time",
      impactValue: "120 Hours saved yearly",
      tags: ["Automation", "School Admin"],
      imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop",
      demoUrl: "https://scheduling-app-five.vercel.app/",
    }
  ]
};
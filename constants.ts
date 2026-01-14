import { PortfolioData } from './types';

export const PORTFOLIO_DATA: PortfolioData = {
  name: "Jason Benjamin",
  role: "Education Software Architect",
  bio: "I build the modern tools that power schools and universities. By combining smart automation, institutional data, and complex logic, I create systems that give time back to teachers and provide clear paths for student success.",
  skills: [
    { name: "Language Technology", level: 95, category: "AI/ML" },
    { name: "Resource Management", level: 90, category: "Backend" },
    { name: "Data Visualization", level: 92, category: "Frontend" },
    { name: "Full-Stack Development", level: 95, category: "Frontend" },
    { name: "School Systems (LMS)", level: 88, category: "Backend" },
  ],
  projects: [
    {
      id: "chekki",
      title: "Chekki",
      category: "Tools",
      description: "Automated student feedback and progress assistant.",
      longDescription: "Chekki changes how teachers give feedback. Using smart analysis, it allows educators to provide personalized guidance to every student instantly. It identifies where students are stuck and provides the right hint at the right time, making daily learning more interactive.",
      tags: ["Smart Feedback", "Modern Web", "Learning Design", "Automation"],
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
      demoUrl: "https://chekki.ai",
      githubUrl: "#"
    },
    {
      id: "benchmark-system",
      title: "Benchmark Explorer",
      category: "Higher Ed",
      description: "Performance tracking and school intelligence platform.",
      longDescription: "A powerful tool for academic leaders. This system brings together student scores to show how a school is performing compared to global standards. It turns complex data into simple strategies for improving graduation rates and course quality.",
      tags: ["Dashboards", "Analytics", "Interactive Data", "Reporting"],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bb8c803ef776?q=80&w=800&auto=format&fit=crop",
      demoUrl: "https://education-benchmark-system.vercel.app/",
      githubUrl: "#"
    },
    {
      id: "intelli-schedule",
      title: "Intelligent Scheduler",
      category: "Corporate",
      description: "Smart course and classroom management.",
      longDescription: "Simplifying the puzzle of school scheduling. This system automatically manages teacher availability, room sizes, and student requests. It removes the stress of manual planning, ensuring every class has a space and every student has a seat.",
      tags: ["Logic Engines", "Server Systems", "Optimization", "Web App"],
      imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800&auto=format&fit=crop",
      demoUrl: "mailto:hello@jasonbenjamin.edu?subject=Intelligent Scheduler Demo Request",
      githubUrl: "#"
    }
  ]
};
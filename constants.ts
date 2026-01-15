import { PortfolioData } from './types';

export const PORTFOLIO_DATA: PortfolioData = {
  name: "Jason Benjamin",
  role: "Education System Designer",
  bio: "With over a decade of experience in South Korean classrooms, I build tools that solve the human problems of education. My work isn't about software; it's about giving time back to teachers and ensuring no student is left behind by a rigid system.",
  skills: [
    { name: "Curriculum Design", level: 95, category: "Design" },
    { name: "Automation Pipelines", level: 90, category: "AI/ML" },
    { name: "Educational Data", level: 92, category: "Backend" },
    { name: "User Experience", level: 95, category: "Frontend" },
  ],
  projects: [
    {
      id: "benchmark-system",
      title: "Benchmark Explorer",
      category: "K-12",
      description: "A safety net for fast-paced learning.",
      longDescription: "I saw too many students struggling because the system moved faster than they could keep up. I built the Benchmark Explorer to identify exactly where a student is falling behind before the curriculum leaves them behind. It turns complex scores into a clear map for intervention.",
      tags: ["Student Tracking", "Curriculum Alignment", "Safety Nets"],
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2000&auto=format&fit=crop",
      demoUrl: "https://education-benchmark-system.vercel.app/",
    },
    {
      id: "chekki",
      title: "Chekki AI",
      category: "Tools",
      description: "Empowering every household.",
      longDescription: "In my years teaching, I realized students couldn't take books home because their parents were either too busy or didn't speak English themselves. I designed Chekki to be the bridge—an AI assistant that explains English tasks in the parents' native language, allowing learning to continue at home.",
      tags: ["Parent Support", "Translation AI", "Home Learning"],
      imageUrl: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=2000&auto=format&fit=crop",
      demoUrl: "https://chekki.ai",
    },
    {
      id: "intelli-schedule",
      title: "The Scheduler",
      category: "Corporate",
      description: "Unraveling the scheduling maze.",
      longDescription: "My school director spent days every month trapped in a maze of Excel sheets because 'nobody else could do the job.' I built this app to prove that even the most complex human constraints can be solved with smart logic, giving her back the time to focus on leading our school.",
      tags: ["Solving Mazes", "Staff Efficiency", "Time Management"],
      imageUrl: "https://images.unsplash.com/photo-1454165833767-131435bb429f?q=80&w=2000&auto=format&fit=crop",
      demoUrl: "mailto:jsn.benjamin@gmail.com?subject=Scheduling App Demo",
    }
  ]
};
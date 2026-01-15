
import { PortfolioData, Project } from './types';

// Fixed: An interface cannot extend 'any'. It now correctly extends the Project interface.
export interface ProjectExtended extends Project {
  friction: string;
  flow: string;
  impactLabel: string;
  impactValue: string;
}

export const PORTFOLIO_DATA = {
  name: "Jason Benjamin",
  role: "Education System Designer",
  bio: "With over a decade of experience in South Korean classrooms, I build tools that solve the human problems of education. My work isn't about software; it's about giving time back to teachers and ensuring no student is left behind by a rigid system.",
  skills: [
    { name: "Curriculum Design", level: 95, category: "Design" },
    { name: "Automation Pipelines", level: 90, category: "AI/ML" },
    { name: "Educational Data", level: 92, category: "Backend" },
    { name: "User Experience", level: 95, category: "Frontend" },
  ],
  impactMetrics: [
    { label: "Teacher Hours Saved", value: "2,400+", icon: "clock" },
    { label: "Student Interventions", value: "850+", icon: "heart" },
    { label: "Parent Engagement", value: "92%", icon: "users" },
    { label: "System Efficiency", value: "3.5x", icon: "zap" }
  ],
  projects: [
    {
      id: "benchmark-system",
      title: "Benchmark Explorer",
      category: "K-12",
      description: "A safety net for fast-paced learning.",
      longDescription: "I saw too many students struggling because the system moved faster than they could keep up. I built the Benchmark Explorer to identify exactly where a student is falling behind.",
      friction: "Teachers spending 10+ hours a week manually grading and missing the quiet students who were slowly slipping through the cracks.",
      flow: "A real-time heat map of student understanding that flags intervention needs automatically, turning a 10-hour chore into a 5-minute review.",
      impactLabel: "Success Rate",
      impactValue: "+40% intervention speed",
      tags: ["Student Tracking", "Curriculum Alignment", "Safety Nets"],
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2000&auto=format&fit=crop",
      demoUrl: "https://education-benchmark-system.vercel.app/",
    },
    {
      id: "chekki",
      title: "Chekki AI",
      category: "Tools",
      description: "Empowering every household.",
      longDescription: "I designed Chekki to be the bridge—an AI assistant that explains English tasks in the parents' native language, allowing learning to continue at home.",
      friction: "Non-English speaking parents feeling helpless when their child asks for help with homework, leading to a disconnect between home and school.",
      flow: "Parents simply point their phone at a worksheet to receive instructions and supportive prompts in their own language, making them partners in learning.",
      impactLabel: "Engagement",
      impactValue: "65% more home-study",
      tags: ["Parent Support", "Translation AI", "Home Learning"],
      imageUrl: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=2000&auto=format&fit=crop",
      demoUrl: "https://chekki.ai",
    },
    {
      id: "intelli-schedule",
      title: "The Scheduler",
      category: "Corporate",
      description: "Unraveling the scheduling maze.",
      longDescription: "I built this app to prove that even the most complex human constraints can be solved with smart logic, giving leadership back the time to focus on people.",
      friction: "School directors losing entire weekends to Excel 'tetris', sacrificing leadership and mentorship time for administrative puzzles.",
      flow: "A constraint-based engine that handles 200+ staff variables in seconds, ensuring every teacher has the prep time they need without the manual headache.",
      impactLabel: "Time Saved",
      impactValue: "18 days / year",
      tags: ["Solving Mazes", "Staff Efficiency", "Time Management"],
      imageUrl: "https://images.unsplash.com/photo-1454165833767-131435bb429f?q=80&w=2000&auto=format&fit=crop",
      demoUrl: "mailto:jsn.benjamin@gmail.com?subject=Scheduling App Demo",
    }
  ]
};
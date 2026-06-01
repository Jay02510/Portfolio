
import { PortfolioData, Project } from './types.ts';

export interface ProjectMedia {
  label: string;
  url: string;
  type: 'pdf' | 'video';
}

export interface ProjectExtended extends Project {
  friction: string;
  flow: string;
  impactLabel: string;
  impactValue: string;
  betaCode?: string;
  spotsRemaining?: number;
  features?: string[];
  media?: ProjectMedia[];
  collaborationUrl?: string;
}

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
      longDescription: "Chekki AI is now live! An AI-powered learning assistant designed for families in Korea. It helps bridge the communication gap between school and home while supporting students with their homework in a supportive environment.",
      friction: "The communication barrier between non-native speaking parents and complex school homework assignments.",
      flow: "A bilingual interface that simplifies homework tasks and provides guided explanations for parents.",
      impactLabel: "Confidence",
      impactValue: "Calm evenings",
      collaborationUrl: "mailto:jsn.benjamin@gmail.com?subject=Collaboration%20Inquiry%20-%20Chekki%20AI",
      maturityBadge: "V1.2 LIVE PRODUCTION",
      engineDetails: "Stack: Claude 3.5 Sonnet API via custom XML prompt routing | Made for Korean bilingual parsing.",
      features: ["Bilingual AI Support", "Parent Guidance Mode", "Homework Simplifier", "Voice-to-Text Assistance"],
      tags: ["AI Assistant", "Bilingual Support"],
      imageUrl: "https://res.cloudinary.com/dginphpy4/image/upload/v1765770525/Chekki_Futuristic_Background_i8foqe.png",
      imagePosition: "object-right",
      websiteUrl: "https://chekki-ai.vercel.app/",
      media: [
        { label: "Chekki Flyer", url: "https://res.cloudinary.com/dginphpy4/image/upload/Chekki_Flyer_nvsnta.pdf", type: 'pdf' },
        { label: "Product Walkthrough", url: "https://res.cloudinary.com/dginphpy4/video/upload/v1769504113/Chekki_AI_V0_fkdlyx.mp4", type: 'video' }
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
      maturityBadge: "MVP | ARCHITECTURAL CASE STUDY",
      engineDetails: "Engine: Relational Airtable backend mapped to multi-variable automated reporting via Make logic pipelines.",
      features: ["Visual Skill Mapping", "Individual Learning Plans", "Automated Data Analysis", "PDF Report Generation"],
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
      maturityBadge: "MVP | ACTIVE BETA",
      engineDetails: "Engine: Google Gemini reasoning model with recursive structural constraint re-weaving.",
      features: ["Automatic Room Mapping", "Conflict Resolution Engine", "Staff Rotation Management", "Live Admin Dashboard"],
      tags: ["Operations", "Productivity"],
      imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop",
      demoUrl: "https://scheduling-app-five.vercel.app/",
    },
    {
      id: "consultation-pipeline",
      title: "Automated Consult Pipeline",
      category: "Tools",
      description: "Zero-maintenance admin data operations.",
      longDescription: "A fully automated student intake and relational database pipeline that completely eliminates the administrative burden of reporting and parent consultation planning.",
      friction: "Educational staff spend up to 15 hours weekly executing manual data transformations across intake files, roster spreadsheets, and custom summaries.",
      flow: "Intake records from Fillout write directly to Airtable, triggering automated Make.com routers that coordinate AI report construction and render results securely to a Softr client dashboard.",
      impactLabel: "Operations",
      impactValue: "15 hrs saved/wk",
      maturityBadge: "MVP | PRODUCTION PIPELINE",
      engineDetails: "Engine: Relational Airtable database & Make.com workflows driving automated Softr client portals.",
      features: ["Fillout Teacher Intake", "Relational Airtable Database", "Make.com Automation Routers", "Softr Client Portals"],
      tags: ["Integration", "Operations"],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "lead-enrichment",
      title: "B2B Lead Enrichment CRM",
      category: "Tools",
      description: "Targeted, bilingual B2B outreach automation.",
      longDescription: "An automated B2B pipeline discovering local South Korean English academies and drafting hyper-personalized, high-converting bilingual cold outreach campaigns based on founder credentials.",
      friction: "Manually finding targets on regional directories, cleaning disorganized web metadata, and writing custom-tailored bilingual emails takes hours per lead.",
      flow: "Pulls local academy data, cleans raw HTML tags, queries Firebase to detect pre-saved duplicates, processes batches cleanly, and generates 1-click personalized Gmail deep links.",
      impactLabel: "Outreach",
      impactValue: "4x response rate",
      maturityBadge: "MVP | PRODUCTION CRM",
      engineDetails: "Engine: Node/Express proxy routing regional maps data through structured gemini-3-flash translation models.",
      features: ["Naver Map API Integration", "Bilingual Email Synthesizer", "Firebase CRM Tracker", "1-Click Gmail deep-links"],
      tags: ["B2B Sales", "Automation"],
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    }
  ]
};

import { PortfolioData, Project } from './types.ts';

export interface ProjectMedia {
  label: string;
  url: string;
  type: 'pdf' | 'video';
}

export interface ProjectExtended extends Project {
  pmRole?: string;
  friction: string;
  flow: string;
  impactLabel: string;
  impactValue: string;
  betaCode?: string;
  spotsRemaining?: number;
  features?: string[];
  media?: ProjectMedia[];
  collaborationUrl?: string;
  engineDetails?: string;
  maturityBadge?: string;
}

export const PORTFOLIO_DATA = {
  name: "Jason Benjamin",
  role: "AI Product Manager & Engineer — Voice AI · LLM Systems · B2B SaaS",
  profileImageUrl: "https://res.cloudinary.com/dginphpy4/image/upload/v1769135697/IMG_2852_p7w0p4.jpg",
  bio: "0→1 AI Product Manager & Engineer who shipped a production voice-AI interview platform from zero (realtime WebRTC, deterministic LLM evaluation, security hardening, AWS EC2 deploy) and 6 independent Korean EdTech AI products with a 19-entry product decision log.",
  skills: [
    { name: "Product Strategy & PRDs", level: 98, category: "Design" },
    { name: "Voice-AI & LLM Judges", level: 95, category: "AI/ML" },
    { name: "NestJS, Docker & AWS Infra", level: 92, category: "Backend" },
    { name: "React, Tailwind & UX Simplification", level: 96, category: "Frontend" },
  ],
  impactMetrics: [
    { label: "AI Products Shipped", value: "6 Production Apps", icon: "rocket" },
    { label: "Admin Workload Reduction", value: "80% Reduction", icon: "zap" },
    { label: "Scheduling Automation", value: "40h → 10min (0 Conflicts)", icon: "clock" },
    { label: "Parent & Teacher Interactions", value: "1,200+ Worksheets Evaluated", icon: "target" }
  ],
  en: {
    bio: "0→1 AI Product Manager & Engineer who shipped a production voice-AI interview platform from zero (realtime WebRTC, deterministic LLM evaluation, security hardening, AWS EC2 deploy) and 6 independent Korean EdTech AI products with a 19-entry product decision log.",
    projects: [
      {
        id: "vodabi",
        title: "VodaBi — Enterprise Voice-AI Screening & Candidate Scoring Engine",
        pmRole: "AI Product Manager (Enterprise Voice-AI & LLM Judges)",
        category: "Tools" as const,
        description: "Direct WebRTC voice screening and deterministic LLM rubric scoring engine automating 1st-round sales interviews with type-safe telemetry and PII encryption at VodaBi. (NDA Sanitized)",
        longDescription: "Architected a direct WebRTC audio stream with ephemeral session tokens and deliberate push-to-talk turn management in NestJS (preventing token burn from ambient room noise). Paired with an async post-call scoring pipeline using gpt-4o for BANTCQ discovery telemetry, tiered 11-to-24-point competency rubrics, WPM speech pacing, stateless magic-link candidate access with token rotation, and a role-gated admin console over MariaDB with Prisma ORM in Docker. *Proprietary client identifiers sanitized under NDA.*",
        friction: "Manual candidate phone screens created high administrative overhead, screening delays, and subjective hiring metrics.",
        flow: "Ephemeral WebRTC audio streaming, push-to-talk turn management, async gpt-4o scoring pipeline, stateless magic links with token rotation, and role-gated admin backoffice.",
        impactLabel: "Voice Architecture",
        impactValue: "Direct WebRTC + Ephemeral Tokens",
        collaborationUrl: "mailto:jsn.benjamin@gmail.com?subject=Collaboration%20Inquiry%20-%20VodaBi%20Voice-AI%20Roleplay%20Platform",
        maturityBadge: "VODABI CASE STUDY",
        engineDetails: "Tech Stack: React 19, TypeScript, Vite, NestJS, Direct WebRTC (Ephemeral Tokens), Prisma 7 (MariaDB Driver), OpenAI Realtime (gpt-realtime-mini) + Post-Call GPT-4o, Docker, Nginx, i18next",
        features: [
          "Realtime Voice Pipeline: Direct WebRTC streaming with ephemeral tokens and push-to-talk turn control",
          "Tiered Evaluation Pipeline: Post-call gpt-4o async scoring for BANTCQ, 11-to-24-point rubrics & WPM speech pacing",
          "Unit Economics Optimization: ~3x cost-reduction via gpt-realtime-mini voice + gpt-4o deep post-call evaluation",
          "Security & Magic Link Auth: Stateless tokenized links with auto-rotation on re-invite for zero-account applicant access",
          "Admin & Scenario Management: React 19 console with tiered scenario rubrics and candidate review workflows"
        ],
        tags: ["VodaBi B2B SaaS", "React 19", "WebRTC", "NestJS", "Prisma 7", "OpenAI Realtime"],
        imageUrl: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=2000&auto=format&fit=crop",
      },
      {
        id: "chekki-teacher",
        title: "Chekki Teacher — Curriculum Pre-seeding & Classroom Mistake Aggregator",
        pmRole: "Founding Product Manager & Workflow Architect (0→1)",
        category: "Tools" as const,
        description: "Teacher cockpit for curriculum pre-seeding, ground-truth answer key verification, classroom mistake analytics, and 1-click automated parent report publishing.",
        longDescription: "Engineered a dedicated teacher workflow engine that transforms raw lesson curricula into verifiable OCR answer keys, aggregates real-time student homework error trends before each class session, and generates personalized bilingual progress summaries from native English teacher observation notes.",
        friction: "Teachers spend 10-15 hours weekly manually grading worksheets, cross-referencing cohort mistake patterns, and wrestling with bilingual parent communications.",
        flow: "Curriculum Pre-seed → Teacher Key Calibration → Student Homework Ingestion → Mistake Cohort Telemetry → Automated Bilingual Report Generator.",
        impactLabel: "Teacher Admin Savings",
        impactValue: "80% Grading Time Saved",
        collaborationUrl: "mailto:jsn.benjamin@gmail.com?subject=Collaboration%20Inquiry%20-%20Chekki%20Teacher",
        maturityBadge: "LIVE",
        engineDetails: "Stack: React 19, TypeScript, Gemini 2.5 Pro (Multimodal Document Parsing), Cloud Firestore with Atomic Batch Writes, Tailwind CSS.",
        features: [
          "Curriculum Pre-seeding: Converts textbook curricula and answer keys into ground-truth OCR benchmarks",
          "Cohort Mistake Aggregator: Automatically identifies cluster weaknesses across student rosters",
          "Automated Bilingual Reports: Synthesizes teacher intake notes into natural Korean honorific updates",
          "Zero-Leak Privacy Bounds: Teacher notes and student records isolated with strict Firestore rules"
        ],
        tags: ["EdTech", "Curriculum AI", "Teacher Tools", "React 19", "Gemini 2.5"],
        imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000&auto=format&fit=crop",
        websiteUrl: "https://chekki-ai.vercel.app/",
      },
      {
        id: "chekki",
        title: "Chekki AI — Closed-Loop Homework & Feedback Ecosystem",
        pmRole: "Founding PM & Full-Stack Architect (0→1)",
        category: "Tools" as const,
        description: "Closed-loop AI homework and classroom feedback platform connecting Korean ESL parents, foreign teachers, and academy directors through ground-truth grading and bilingual updates.",
        longDescription: "Engineered an end-to-end mobile grading and feedback ecosystem. Solves parent-child home study friction via instant camera OCR grounded in teacher answer keys, aggregates classroom mistake telemetry, and streamlines bilingual teacher-to-parent daily progress reporting.",
        friction: "Three distinct structural pain points: 1) Non-fluent parents facing homework friction with children; 2) Disconnected loop between home mistakes and classroom interventions; 3) Heavy bilingual administrative load on teachers.",
        flow: "Connected Loop: Home Camera Scan → Ground-Truth Key Verification → Bilingual Parent Explanations → Class Roster Mistake Aggregation → Teacher Progress Notes → Parent Release.",
        impactLabel: "Pilot Adoption Target",
        impactValue: "120+ Families Pilot",
        collaborationUrl: "mailto:jsn.benjamin@gmail.com?subject=Collaboration%20Inquiry%20-%20Chekki%20AI",
        maturityBadge: "LIVE",
        engineDetails: "Stack: React 19, Capacitor JS (v8), Gemini 2.5 Pro & Flash, Vercel Serverless Functions, Cloud Firestore with Atomic Transactions.",
        features: [
          "Ground-Truth Camera OCR: Instant grading anchored against verified teacher answer keys",
          "Bilingual Parent Explanations: Korean honorifics, pronunciation keys & phonics guidance",
          "Class Mistake Aggregator: Identifies cohort-wide learning gaps before the next lesson",
          "Teacher Update Pipeline: Merged FT English notes to natural Korean parent summaries"
        ],
        tags: ["EdTech", "Bilingual AI", "Mobile", "React 19", "Gemini 2.5"],
        imageUrl: "https://res.cloudinary.com/dginphpy4/image/upload/v1765770525/Chekki_Futuristic_Background_i8foqe.png",
        imagePosition: "object-right",
        websiteUrl: "https://chekki-ai.vercel.app/",
        media: [
          { label: "Chekki Flyer", url: "https://res.cloudinary.com/dginphpy4/image/upload/Chekki_Flyer_nvsnta.pdf", type: 'pdf' as const },
          { label: "Product Walkthrough", url: "https://res.cloudinary.com/dginphpy4/video/upload/v1769504113/Chekki_AI_V0_fkdlyx.mp4", type: 'video' as const }
        ]
      },
      {
        id: "benchmark-explorer",
        title: "Benchmark Explorer",
        pmRole: "Lead Product Designer & Growth Architect",
        category: "K-12" as const,
        description: "Transforms raw test scores into clear visual skill maps. Helps teachers pinpoint student learning gaps instantly without messy spreadsheets.",
        longDescription: "A professional-grade system for tracking student growth and benchmarking. It provides teachers with clear, actionable data to identify learning gaps and personalize instruction.",
        friction: "Teachers often struggle with massive spreadsheets that don't clearly communicate student progress or specific needs.",
        flow: "Automatically transforms raw test scores into visual skill-maps and individual learning plans.",
        impactLabel: "Assessment Clarity",
        impactValue: "Longitudinal Mastery",
        maturityBadge: "LIVE",
        engineDetails: "Engine: Relational Airtable backend mapped to multi-variable automated reporting via Make logic pipelines.",
        features: ["Visual Skill Mapping", "Individual Learning Plans", "Automated Data Analysis", "PDF Report Generation"],
        tags: ["Data Visualization", "Classroom Strategy"],
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        demoUrl: "https://education-benchmark-system.vercel.app/",
      },
      {
        id: "eduplanner",
        title: "EduPlanner Pro",
        pmRole: "Product Lead & Constraint Optimization Architect",
        category: "Tools" as const,
        description: "Automates complex school master scheduling for classes, teachers, and rooms in under 10 minutes, eliminating scheduling conflicts.",
        longDescription: "A sophisticated scheduling engine built to handle the complex requirements of modern schools. It automates room mapping, substitute management, and staff rotations.",
        friction: "Manual scheduling leads to human error, room conflicts, and hours of administrative overhead every week.",
        flow: "Intelligent conflict-resolution algorithms that suggest the best possible layout for your school's unique needs.",
        impactLabel: "Constraint Solver",
        impactValue: "40h → 10min (0 Conflicts)",
        maturityBadge: "LIVE",
        engineDetails: "Engine: Google Gemini reasoning model with recursive structural constraint re-weaving.",
        features: ["Automatic Room Mapping", "Conflict Resolution Engine", "Staff Rotation Management", "Live Admin Dashboard"],
        tags: ["Operations", "Productivity"],
        imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop",
        demoUrl: "https://scheduling-app-five.vercel.app/",
      },
      {
        id: "consultation-pipeline",
        title: "Classroom Feedback & Consultation Pipeline",
        pmRole: "Operations Lead & Workflow Architect",
        category: "Tools" as const,
        description: "Integrated into Chekki ecosystem. Generates personalized bilingual student progress reports from teacher intake notes, saving 15+ hours weekly.",
        longDescription: "Eliminated manual data entry errors and reduced teacher admin reporting time by an estimated 80% (saving 15+ hours weekly). Now serves as the underlying daily teacher-to-parent update engine within the Chekki ecosystem.",
        friction: "Educational staff spend up to 15 hours weekly executing manual data transformations across intake files, roster spreadsheets, and custom summaries.",
        flow: "Intake records from Fillout write directly to Airtable, triggering automated Make.com routers that coordinate AI report construction and render results securely to a Softr client dashboard.",
        impactLabel: "Teacher Admin Savings",
        impactValue: "15h/wk Saved",
        maturityBadge: "LIVE",
        engineDetails: "Engine: Relational Airtable database & Make.com workflows driving automated Softr client portals.",
        features: ["Fillout Teacher Intake", "Relational Airtable Database", "Make.com Automation Routers", "Softr Client Portals"],
        tags: ["Integration", "Operations"],
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: "lead-enrichment",
        title: "B2B Lead Enrichment CRM",
        pmRole: "Growth Product Lead & Automation Engineer",
        category: "Tools" as const,
        description: "Finds local academies, verifies contacts, and drafts personalized outreach emails in one click to boost B2B sales lead generation.",
        longDescription: "An automated B2B pipeline discovering local South Korean English academies and drafting hyper-personalized, high-converting bilingual cold outreach campaigns based on founder credentials.",
        friction: "Manually finding targets on regional directories, cleaning disorganized web metadata, and writing custom-tailored bilingual emails takes hours per lead.",
        flow: "Pulls local academy data, cleans raw HTML tags, queries Firebase to detect pre-saved duplicates, processes batches cleanly, and generates 1-click personalized Gmail deep links.",
        impactLabel: "Outreach Automation",
        impactValue: "1-Click Ingestion & Draft",
        maturityBadge: "LIVE",
        engineDetails: "Engine: Node/Express proxy routing regional maps data through structured gemini-3-flash translation models.",
        features: ["Naver Map API Integration", "Bilingual Email Synthesizer", "Firebase CRM Tracker", "1-Click Gmail deep-links"],
        tags: ["B2B Sales", "Automation"],
        imageUrl: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.17.21_PM_wsyzzu.png",
        images: [
          "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.17.21_PM_wsyzzu.png",
          "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.18.29_PM_btxolx.png",
          "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.18.39_PM_nesi9y.png"
        ],
      },
      {
        id: "white-label-hub",
        title: "Learning Diary Hub",
        pmRole: "Product Architect & Full-Stack Engineer",
        category: "Tools" as const,
        description: "Transforms classroom activity photos and teacher notes into print-ready PDF progress portfolios in 15 seconds per student.",
        longDescription: "Engineered a student learning diary compiler that transforms classroom physical task photos and selected pedagogical tags into beautifully aligned, high-resolution PDFs. Combines an Express.js server-side font-retrieval proxy with structured Google Gemini AI prompts to synthesize customized progress reports securely.",
        friction: "Foreign teachers experience administrative exhaustion manually scripting progress papers, while large image uploads crash conventional browser compilers.",
        flow: "A touch-optimized tablet dashboard allows teachers to 'Tag & Commit' artifacts, routing compressed keys to an Express gateway that integrates Gemini and outputs print-ready PDFs instantly.",
        impactLabel: "Workflow Time",
        impactValue: "15s per student",
        maturityBadge: "MVP",
        engineDetails: "Engine: Express/Node proxy cache coupled with Gemini 1.5 Flash, Supabase containing RLS, and @react-pdf/renderer.",
        features: [
          "Multi-Tenant Support",
          "Express Font & API Proxy",
          "Supabase db with RLS",
          "@react-pdf/renderer Engine"
        ],
        tags: ["Multi-Tenant SaaS", "Bilingual Support"],
        imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2000&auto=format&fit=crop"
      }
    ]
  },
  ko: {
    bio: "실시간 WebRTC 음성 파이프라인, LLM 평가 엔진, 보안 하드닝 및 AWS EC2 배포까지 프로덕션 음성 AI 인터뷰 플랫폼을 1인 구축하고, 19개 의사결정 로그를 갖춘 6개 한국 에듀테크 AI 프로덕트를 출시한 0→1 AI 프로덕트 매니저 & 엔지니어입니다.",
    projects: [
      {
        id: "vodabi",
        title: "VodaBi — Enterprise Voice-AI Screening & Candidate Scoring Engine",
        pmRole: "AI 프로덕트 매니저 (엔터프라이즈 음성 AI & 채점 엔진)",
        category: "Tools" as const,
        description: "VodaBi의 Direct WebRTC 음성 시뮬레이션 및 결정론적 LLM 채점 루브릭으로 영업 1차 전화 면접을 자동화하고 PII를 보호하는 평가 엔진. (NDA 준수)",
        longDescription: "NestJS 기반의 임시 세션 토큰 및 의도적 Push-to-Talk 턴 제어(주변 소음으로 인한 OpenAI 토큰 과소비 방지)가 적용된 Direct WebRTC 오디오 스트림 구축. gpt-4o 기반 BANTCQ 탐색 텔레메트리, 시나리오별 11~24개 루브릭 심사, WPM 발화 속도 분석 비동기 평가 파이프라인, 토큰 자동 로테이션 무상태 매직링크 인증, Docker 기반 MariaDB 및 Prisma 7 데이터 레이어를 연동했습니다. *고객사 기밀 식별 정보는 NDA 준수를 위해 익명화되었습니다.*",
        friction: "수동 후보자 전화 인터뷰 및 과도한 행정 공수로 인한 스크리닝 지연과 주관적인 채점 지표 발생.",
        flow: "Direct WebRTC 오디오 스트리밍, Push-to-Talk 턴 제어, gpt-4o 비동기 채점 파이프라인, 토큰 로테이션 무상태 매직링크 인증 및 역할 기반 어드민 백오피스.",
        impactLabel: "음성 아키텍처",
        impactValue: "Direct WebRTC + 임시 토큰",
        collaborationUrl: "mailto:jsn.benjamin@gmail.com?subject=Collaboration%20Inquiry%20-%20VodaBi%20Voice-AI%20Roleplay%20Platform",
        maturityBadge: "VODABI CASE STUDY",
        engineDetails: "기술 스택: React 19, TypeScript, Vite, NestJS, Direct WebRTC (임시 토큰), Prisma 7 (MariaDB Driver), OpenAI Realtime (gpt-realtime-mini) + Post-Call GPT-4o, Docker, Nginx, i18next",
        features: [
          "Realtime Voice Pipeline: 임시 토큰 및 Push-to-Talk 턴 제어가 적용된 Direct WebRTC 음성 스트리밍",
          "Tiered Evaluation Pipeline: BANTCQ 지표, 11~24개 루브릭 & WPM 발화 분석 gpt-4o 비동기 채점",
          "Unit Economics Optimization: gpt-realtime-mini 음성 + gpt-4o 심층 채점 결합으로 ~3배 비용 절감",
          "Security & Magic Link Auth: 재초대 시 토큰 자동 로테이션을 지원하는 무상태 토큰화 매직링크",
          "Admin & Scenario Management: 시나리오별 다계층 루브릭 및 지원자 평가 워크플로우를 갖춘 React 19 어드민"
        ],
        tags: ["VodaBi B2B SaaS", "React 19", "WebRTC", "NestJS", "Prisma 7", "OpenAI Realtime"],
        imageUrl: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=2000&auto=format&fit=crop",
      },
      {
        id: "chekki-teacher",
        title: "Chekki Teacher (체키 티처) — 커리큘럼 사전 탑재 및 학급 취약점 분석기",
        pmRole: "파운딩 프로덕트 매니저 & 워크플로 아키텍트 (0→1)",
        category: "Tools" as const,
        description: "커리큘럼 사전 탑재, 정답지 검증, 학급 오답 취약점 분석 및 원어민 교사 노트를 자연스러운 한국어 학부모 알림장으로 1클릭 변환하는 교사용 코크핏.",
        longDescription: "원어민 교사의 복잡한 교재 정답지 입력 및 채점 부담을 해결하고, 학급별 오답 경향성을 사전 분석하여 수업 전 맞춤형 피드백과 학부모 전송용 존댓말 데일리 리포트를 자동 생성합니다.",
        friction: "교재 정답 수동 채점, 학급별 오답 집계 및 이중언어 알림장 작성으로 매주 10~15시간의 교사 행정 피로 누적.",
        flow: "커리큘럼 사전 탑재 → 교사 정답지 보정 → 학생 숙제 OCR 자동 채점 → 학급 오답 군집 분석 → 한국어 맞춤 알림장 생성.",
        impactLabel: "교사 행정 절감",
        impactValue: "채점 공수 80% 절감",
        collaborationUrl: "mailto:jsn.benjamin@gmail.com?subject=Collaboration%20Inquiry%20-%20Chekki%20Teacher",
        maturityBadge: "LIVE",
        engineDetails: "스택: React 19, TypeScript, Gemini 2.5 Pro (다중 모달 문서 분석), Cloud Firestore 배치 트랜잭션, Tailwind CSS.",
        features: ["교재 정답지 사전 탑재", "학급별 오답 군집 텔레메트리", "교사 관찰 노트 기반 알림장 생성", "Firestore 기반 완벽 데이터 격리"],
        tags: ["에듀테크", "교사용 AI", "워크플로 혁신", "React 19", "Gemini 2.5"],
        imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000&auto=format&fit=crop",
        websiteUrl: "https://chekki-ai.vercel.app/",
      },
      {
        id: "chekki",
        title: "Chekki AI (체키) — 가정-교실 폐쇄 루프 학습 피드백",
        pmRole: "파운딩 PM & 풀스택 아키텍트 (0→1)",
        category: "Tools" as const,
        description: "교사의 정답지 기반 AI 채점과 한/영 이중언어 알림장을 통해 비영어권 학부모, 원어민 교사, 원장을 연결하는 폐쇄 루프(Closed-Loop) 에듀테크 플랫폼.",
        longDescription: "가정 내 숙제 지도 마찰을 스마트폰 카메라 OCR과 교사 정답지 검증으로 즉각 해소하고, 학급별 오답 데이터를 집계하여 원어민 교사의 데일리 리포트를 자연스러운 한국어 존댓말 피드백으로 학부모에게 전달하는 종합 에듀테크 생태계입니다.",
        friction: "세 가지 구조적 문제: 1) 비영어권 학부모의 가정 내 영어 숙제 지도 마찰; 2) 가정 내 오답과 교실 내 보충 지도의 단절; 3) 원어민/한국인 교사의 과중한 이중언어 알림장 작성 부담.",
        flow: "연결된 루프: 가정 카메라 스캔 → 교사 정답지 기반 즉각 검증 → 학부모용 이중언어/발음 해설 → 학급별 오답 자동 집계 → 교사 데일리 기록 → 학부모 안심 전달.",
        impactLabel: "파일럿 운영 목표",
        impactValue: "120+ 학부모 파일럿",
        collaborationUrl: "mailto:jsn.benjamin@gmail.com?subject=Collaboration%20Inquiry%20-%20Chekki%20AI",
        maturityBadge: "LIVE",
        engineDetails: "스택: React 19, Capacitor JS (v8), Gemini 2.5 Pro & Flash, Vercel Serverless Functions, 원자적 트랜잭션 Cloud Firestore.",
        features: ["정답지 연동 카메라 OCR", "학부모 맞춤 이중언어/발음 가이드", "학급 단위 취약점 집계 분석", "교사 알림장 자동 번역 파이프라인"],
        tags: ["에듀테크", "이중언어 AI", "모바일", "React 19", "Gemini 2.5"],
        imageUrl: "https://res.cloudinary.com/dginphpy4/image/upload/v1765770525/Chekki_Futuristic_Background_i8foqe.png",
        imagePosition: "object-right",
        websiteUrl: "https://chekki-ai.vercel.app/",
        media: [
          { label: "Chekki Flyer", url: "https://res.cloudinary.com/dginphpy4/image/upload/Chekki_Flyer_nvsnta.pdf", type: 'pdf' as const },
          { label: "Product Walkthrough", url: "https://res.cloudinary.com/dginphpy4/video/upload/v1769504113/Chekki_AI_V0_fkdlyx.mp4", type: 'video' as const }
        ]
      },
      {
        id: "benchmark-explorer",
        title: "Benchmark Explorer (학업 벤치마크)",
        pmRole: "리드 프로덕트 디자이너 & 성장 지표 아키텍트",
        category: "K-12" as const,
        description: "복잡한 엑셀 수식 없이 학생 평가 결과를 명확한 시각적 차트로 변환하여, 학습 결손 부위를 즉시 파악할 수 있도록 돕습니다.",
        longDescription: "사서 적는 정성 관찰 결과를 정량 점수로 즉각 매핑하여 지도 지표를 한눈에 도출하는 전문 평가 시스템입니다. 교원들이 엑셀 수동 배치에 매달릴 공수를 개인 맞춤 지휘 시간으로 돌려줍니다.",
        friction: "행정 수지 엑셀을 가공하느라 야근을 도맡고 학부모를 위한 맞춤 학습 분석 보고서를 쓰느라 정체되는 진짜 강의 역량.",
        flow: "정렬된 관찰 평가 결과가 Airtable 레코드로 수렴해 레이더형 역량 지표 차트 생성 및 이중언어 보고문 자동 생성.",
        impactLabel: "평가 명확도",
        impactValue: "종단적 숙련도 추적",
        maturityBadge: "LIVE",
        engineDetails: "스키마: Airtable 데이터베이스 및 트랜잭션 수위 Make 워크플로 통합 보고 서비스 빌드.",
        features: ["방사 레이더 역량 차트", "개인 성장 포트폴리오", "실시간 정량화 추적", "PDF 일람 보고 즉시 빌드"],
        tags: ["데이터 시각화", "지도 관리 전략"],
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        demoUrl: "https://education-benchmark-system.vercel.app/",
      },
      {
        id: "eduplanner",
        title: "EduPlanner Pro (무인 스케줄러)",
        pmRole: "프로덕트 리드 & 제약 최적화 아키텍트",
        category: "Tools" as const,
        description: "교실, 교사, 수업 제약조건을 인공지능이 분석하여 10분 만에 충돌 없는 학교 시간표를 자동 완성합니다.",
        longDescription: "학내 수많은 교원, 활용 교실 한계치, 피로 분산율, 교과 최소 연한 가치 등의 수많은 규칙을 인공지능이 무한 대조 연산해 단 10분 만에 충돌 수치 0%인 완벽 시간표 설계도를 편성하는 SaaS형 시간표 조립기입니다.",
        friction: "변수 충돌 제어가 무리하여 학교 교직원들이 칠판에 일일이 부착해가며 수십 시간을 소모하던 행정 낭비.",
        flow: "구글 제미나이 지능형 프로와 플래시 알고리즘을 결합해 무수히 우회 편조 기법을 검증하고 즉각 불완전 노드 타협 완료.",
        impactLabel: "제약 해결 성능",
        impactValue: "40시간 → 10분 (충돌 0%)",
        maturityBadge: "LIVE",
        engineDetails: "구조: Google Gemini 추론 기반 다단계 무인 제약 충돌 해결 시간표 컴파일링 엔진.",
        features: ["교실 가용 분배 최적화", "실시간 충돌 방지 차단부", "교직원 순환 휴무 연산", "라이브 조정 대시보드"],
        tags: ["행정 혁신", "지능형 오퍼레이션"],
        imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop",
        demoUrl: "https://scheduling-app-five.vercel.app/",
      },
      {
        id: "consultation-pipeline",
        title: "Classroom Feedback & Consultation Pipeline",
        pmRole: "오퍼레이션 리드 & 워크플로 아키텍트",
        category: "Tools" as const,
        description: "Chekki 생태계로 통합 완료. 교사의 관찰 기록을 바탕으로 학부모 전달용 종합 보고서를 자동 생성하여 주 15시간의 행정 업무를 절감합니다.",
        longDescription: "수강 상담 수집 직후 한/영 맞춤 분석 보고서를 합성하여 자동 전달하는 파이프라인입니다. 현재 Chekki 생태계의 교실-학부모 데일리 업데이트 엔진으로 통합 가동 중입니다.",
        friction: "매 학과 주기와 학칙 변동 기록이 터질 때마다 상담 내역을 손으로 정리 배송하느라 주말 야근이 소모되는 악순환.",
        flow: "가볍고 빠른 입력창 클릭 직시 Airtable 행 정산, Make 분기점이 AI 보고 구성 후 Softr 학부모 전용 행 암호 영역에 직배송.",
        impactLabel: "행정 공수 절감",
        impactValue: "주 15시간 절감",
        maturityBadge: "LIVE",
        engineDetails: "엔진: Airtable 관계형 데이터베이스 및 Make 흐름 포털 제어.",
        features: ["디지털 사전 면담 창", "관계형 대형 데이터 가교", "Make 지능 연동 라우터", "전용 암호 가방 뷰어"],
        tags: ["데이터 통합", "업무 흐름 자동화"],
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: "lead-enrichment",
        title: "B2B Lead Enrichment CRM",
        pmRole: "그로스 프로덕트 리드 & 자동화 엔지니어",
        category: "Tools" as const,
        description: "지역 학원 정보를 자동 수집 및 정제하고, 맞춤형 제안메일을 1클릭으로 생성하여 B2B 영업 효율을 높입니다.",
        longDescription: "지역 지도 데이터베이스를 정밀하게 자동 수집 및 중복 정화하고, 제미나이 제어 편조로 베테랑 10년 연차 학업 주체 톤에 어울리는 극도의 매너 이메일 발송 딥링크를 원클릭 제공하는 스마트 아웃바운드 CRM 엔진입니다.",
        friction: "HTML 찌꺼기가 섞여 엉망인 원물 주소록을 손으로 타이핑 대조하고, 타겟 파트너에 수십 편씩 수동 구애 영업 메일을 쓰느라 소모되는 마케터 에포트.",
        flow: "지도 크롤러 데이터 가공, Firestore 이중 커뮤니케이션 검사 가동, 대표 역량 정합 메일 딥링크 발적 1초 연쇄 수행.",
        impactLabel: "영업 자동화",
        impactValue: "원클릭 수집 & 제안",
        maturityBadge: "LIVE",
        engineDetails: "컴팩트: Express 파싱 게이트웨이 및 Google Gemini 정형 템플레이팅 일치 구조화.",
        features: ["인스턴스 주소 파싱", "네이버 ID 중복 필터링", "디바이스별 발송 스로틀링", "지메일 1초 딥 연동"],
        tags: ["B2B 영업 제어", "마케팅 자동화"],
        imageUrl: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.17.21_PM_wsyzzu.png",
        images: [
          "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.17.21_PM_wsyzzu.png",
          "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.18.29_PM_btxolx.png",
          "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.18.39_PM_nesi9y.png"
        ],
      },
      {
        id: "white-label-hub",
        title: "모바일 포트폴리오 허브 (Learning Diary Hub)",
        pmRole: "프로덕트 아키텍트 & 풀스택 엔지니어",
        category: "Tools" as const,
        description: "학생의 활동 사진과 교육 관찰 기록을 조합하여 인쇄용 고품질 포트폴리오 PDF를 학생당 15초 만에 자동 생성합니다.",
        longDescription: "학습 활동 인쇄 기록 전형과 교육 관찰 태그를 조합하여 인쇄 규격용 포트폴리오로 원격 컴파일하는 클라이언트 사이드 PDF 생성 엔진입니다. 백엔드 Express 폰트 프록시를 통해 Hangul(한글) 깨짐 및 CORS 예외를 우산형 방어하고, Google Gemini 기반 2문장 피드백 합성을 탑재했습니다.",
        friction: "행동 마일스톤 서술에 막막함을 느끼는 원어민 교사들의 서류 피로와 대용량 이미지 일괄 정렬 업로드 시 터지는 단말 브라우저 프리징.",
        flow: "태블릿 화면 터치만으로 아티팩트 등록 및 교육 태그 배정, 프록시가 중요 API 키 노출 없이 신속하고 타이트한 PDF 인쇄물 생성을 15초 만에 컴파일 완료.",
        impactLabel: "인력 소요 시간",
        impactValue: "원생당 15초 해결",
        maturityBadge: "MVP",
        engineDetails: "컴팩트: Express 프록시 및 Google Gemini 1.5 Flash 추론, Supabase RLS 연계, 브라우저 메모리 컴파일률.",
        features: [
          "멀티 테넌트 완주",
          "서버 폰트 프록시",
          "Supabase RLS 보안",
          "메모리 PDF 컴파일"
        ],
        tags: ["다중 테넌트 SaaS", "이중언어 지원"],
        imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2000&auto=format&fit=crop"
      }
    ]
  },
  // Default root projects mapped to EN projects for backward compatibility
  projects: [] as ProjectExtended[]
};

PORTFOLIO_DATA.projects = PORTFOLIO_DATA.en.projects;

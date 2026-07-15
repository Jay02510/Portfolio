import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Unique types for our Role Resume
export type ActiveRole = 'pm' | 'eng' | 'edtech';

interface BulletItem {
  en: string;
  ko: string;
  weight: Record<ActiveRole, number>;
}

interface ProductItem {
  id: string;
  title: { en: string; ko: string };
  subtitle: { en: string; ko: string };
  primaryFor: ActiveRole[];
  bullets: BulletItem[];
  techHighlights: string[];
}

interface SkillCategory {
  id: string;
  category: { en: string; ko: string };
  items: string[];
}

interface ResumeProps {
  locale: 'en' | 'ko';
  theme: 'light' | 'dark';
}

interface RoleConfig {
  title: { en: string; ko: string };
  profileText: { en: string; ko: string };
  skillsOrder: string[]; // Order in which categories are listed
  academyBulletOrder: number[]; // Prioritized sorting of Blend ENG Academy achievements
}

const PRODUCTS: ProductItem[] = [
  {
    id: "command-center",
    title: {
      en: "Chekki B2B Command Center — Enterprise SaaS Portal",
      ko: "Chekki B2B Command Center — 엔터프라이즈 B2B SaaS 포털"
    },
    subtitle: {
      en: "Multi-tenant B2B portal · RBAC · Make.com + Gemini AI pipeline",
      ko: "멀티테넌트 B2B SaaS 포털 · RBAC 계정 관리 · Make.com + Gemini AI 에이전트"
    },
    primaryFor: ["pm", "eng", "edtech"],
    techHighlights: ["SaaS Architecture", "RBAC", "Magic Links", "Make.com Flow", "Bilingual Reporting"],
    bullets: [
      {
        en: "Defined AI product strategy and roadmap for a multi-tenant B2B SaaS portal to eliminate 15+ hours of weekly administrative overhead across language academy networks through automated generative AI reporting pipelines.",
        ko: "학사 행정을 기획 자동화하여 매주 15시간 이상의 관리 오버헤드를 완전 소거하는 기업형 B2B SaaS용 AI 제품 전략 수립 및 핵심 기능 로드맵 수립.",
        weight: { pm: 5, eng: 2, edtech: 3 }
      },
      {
        en: "Designed and launched an AI agent pipeline using Make.com and Google Gemini that processes exception-first raw observations into culturally nuanced, bilingual consultation notes (integrating Korean honorific instruction trees), driving an 80% workload reduction.",
        ko: "일일 활동 기록에서 관찰 지점(exception-first)을 자동 수합해 영한 정교한 문체와 한국식 높임법 지시 체계를 적용한 대화형 이중언어 상담 보고서로 가공해 전해주는 Make.com 및 Gemini 에이전트 파이프라인 설계로 서류 업무 80% 감축.",
        weight: { pm: 4, eng: 5, edtech: 3 }
      },
      {
        en: "Shipped secure Role-Based Access Control (RBAC) and passwordless Magic Link authentication establishing strict database role isolation between Academy Directors, staff, and parent views.",
        ko: "원장, 소속 강사 및 학부모 계정 간의 테넌트 영역 보호 및 데이터 무단 노출 방지를 차단하는 Supabase RBAC 권한 필터 및 패스워드 리스 매직 링크 보안 인증 설계 기술 수식.",
        weight: { pm: 2, eng: 5, edtech: 1 }
      },
      {
        en: "Collaborated with veteran academy academic directors to translate classroom pedagogies into structured JSON schema parameters, guaranteeing brand-safe and high-credibility outcomes.",
        ko: "어학원 실제 교육 현장 실무팀과의 정밀 조율을 통해 비정형 지표들을 JSON 스키마 규격으로 정교화하여 브랜드 가치 훼손 없는 높은 정제 수준의 보고 체계 확보.",
        weight: { pm: 3, eng: 1, edtech: 5 }
      }
    ]
  },
  {
    id: "chekki-ai",
    title: {
      en: "Chekki AI — Consumer Mobile Application",
      ko: "Chekki AI — 소비자 지향 모바일 애플리케이션"
    },
    subtitle: {
      en: "Bilingual homework assistant · Zero-storage privacy architecture · Apple App Store",
      ko: "이중언어 과제 학습 도우미 · 제로-스토리지 프라이버시 아키텍처 · 애플 앱스토어"
    },
    primaryFor: ["pm", "edtech"],
    techHighlights: ["App Store Compliance", "COPPA/Privacy", "Zero-Storage", "B2C Mobile", "Bilingual UI"],
    bullets: [
      {
        en: "Led end-to-end product lifecycle for a bilingual AI mobile web application on the Apple App Store, translating complex ESL/EFL pedagogical instruction sets into intuitive, child-friendly user interaction loops.",
        ko: "한국 가정 및 원어민 강사를 주요 타겟으로 제작한 모바일 앱 환경의 이중언어 AI 영어 학습 도우미 제품 기획, 개발 및 앱스토어 정식 론칭 전반 수행.",
        weight: { pm: 5, eng: 2, edtech: 4 }
      },
      {
        en: "Designed and executed a high-compliance zero-storage privacy architecture as a primary product constraint, eliminating risk/liability by never retaining sensitive child voice or text data, ensuring full compliance with COPPA and App Store safety standards.",
        ko: "민감 아동 데이터를 실시간 처리하되 서버에는 저장하지 않는 강형 '제로-스토리지 프라이버시 아키텍처(zero-storage privacy architecture)' 제약을 선제 정의하여 아동 개인정보 규제(COPPA)와 모바일 앱스토어 심사를 무감점 통과.",
        weight: { pm: 3, eng: 5, edtech: 2 }
      },
      {
        en: "Formulated the go-to-market and localisation strategy tailored for local education markets, creating high-trust parenting interfaces that resulted in stellar organic enrollment and engagement statistics.",
        ko: "한국 영어유치원생 가정의 보조 요구 조건에 수립하여, 원어민 표현 피드백 알림, 미취학 발달 특화 이중언어 UI 구성 등 로컬 교육 정서 맞춤 기획으로 사용자 유지율 극대화.",
        weight: { pm: 4, eng: 2, edtech: 5 }
      }
    ]
  },
  {
    id: "learning-diary",
    title: {
      en: "Learning Diary — Student Portfolio Compiler",
      ko: "Learning Diary — 패키징형 포트폴리오 생성기"
    },
    subtitle: {
      en: "In-browser PDF synthesis · Dynamic Tenant Theming · Supabase RLS",
      ko: "브라우저 구동 PDF 독립 생성 · 어학원별 동적 브랜드 테밍 · PostgreSQL RLS 필터"
    },
    primaryFor: ["eng", "pm"],
    techHighlights: ["Supabase RLS", "Dynamic Tenant Theming", "Client-Side PDF", "@react-pdf/renderer", "Gemini 1.5 Flash"],
    bullets: [
      {
        en: "Architected real-time client-side PDF synthesis with @react-pdf/renderer and Gemini 1.5 Flash, compiling parent-ready interactive portfolios directly in-browser to eliminate expensive server processing and cloud assets leaks.",
        ko: "@react-pdf/renderer와 Gemini 1.5 Flash를 융합 연동하여 일체의 미디어나 문서 렌더링 작업을 서버 가용 리소스 없이 브라우저 단에서 직접 수행, 아동 프로필 미디어 유출 위험을 100% 차단하고 서버 연산 비용 0원 수렴.",
        weight: { pm: 2, eng: 5, edtech: 2 }
      },
      {
        en: "Created Dynamic Tenant Theming systems enabling franchise academy directors to dynamically inject bespoke brand colors (HEX), local font subsets, and custom logo assets via context-level design hooks.",
        ko: "어학원 독자 고유 HEX 브랜드 색상, 원내 맞춤 장식, Noto Sans 폰트 모음을 브라우저 실행 단계에 맞춤 주입하는 완성도 높은 테넌트 테밍(Dynamic Tenant Theming) 구조 설계.",
        weight: { pm: 4, eng: 4, edtech: 3 }
      },
      {
        en: "Shipped touch-screen 'Tag and Commit' tools enabling non-technical staff to instantly stamp classroom observations against CEFR developmental milestones, converting random raw text into academic assets.",
        ko: "교사용 패드 환경에 적합한 초간편 터치식 'Tag & Commit' 관찰 태깅 모듈을 고안하여 원인 강사가 6가지 언어 평가 지수 상에 학업 과정을 간편 실시간 입력하도록 제품 구체화.",
        weight: { pm: 3, eng: 3, edtech: 5 }
      }
    ]
  },
  {
    id: "eduplanner",
    title: {
      en: "EduPlanner Pro — Tiered LLM Scheduling Engine",
      ko: "EduPlanner Pro — 계층화 LLM 스케줄링 자원 배치 엔진"
    },
    subtitle: {
      en: "Gemini Flash + Pro · Draft & Weave pipeline · 40hrs → 10min",
      ko: "Gemini Flash + Pro 유기 결합 · Draft & Weave 2단계 조율 · 설계 시간 40시간에서 10분 단축"
    },
    primaryFor: ["eng", "pm"],
    techHighlights: ["Draft & Weave Pipeline", "Multi-LLM Orchestration", "Gemini Flash / Pro", "Resource Allocation"],
    bullets: [
      {
        en: "Architected a Draft & Weave tiered LLM pipeline: Gemini Flash generates foundational scheduling candidate grids under fast context limits, then programmatic triggers invoke Gemini Pro to weave and resolve nested constraint conflicts recursively.",
        ko: "속도가 빠른 Gemini Flash가 1차 뼈대 계획을 컴파일하고, 조건 충돌(강사 공강, 강의실 가용성 등)이 발생할 경우에만 소량의 Gemini Pro를 재귀 호출하여 점진적 보정하는 'Draft & Weave' 2단계 제너레이티브 오케스트레이션 설계.",
        weight: { pm: 1, eng: 5, edtech: 1 }
      },
      {
        en: "Owned end-to-end delivery of the automated scheduling engine, cutting private language academy term timetabling times from 40 manual administrative hours down to a clean, single-click 10-minute automated run.",
        ko: "강사 조합의 기하학적 매트릭스 연산 스펙을 정형 알고리즘 정보로 변형, 매 단기 대규모 일정 수작업에 갈던 40시간 이상의 리소스 소모를 단 10분 수준으로 자동 종결시키는 고임팩트 제품 주도.",
        weight: { pm: 5, eng: 2, edtech: 4 }
      },
      {
        en: "Implemented an API resilience layer with rapid exponential fallbacks from Gemini Pro to Flash on rate-limit errors, maintaining high scheduler availability even during concurrent enterprise-scale planning queries.",
        ko: "서버 트래픽 과부하 및 토큰 한도 초과(rate limit) 발생 시 지능형 에러 폴백 백오프 엔진을 구축하여 연산 오류를 선제 차단하고 상시 구동 가용성 유지.",
        weight: { pm: 2, eng: 5, edtech: 2 }
      }
    ]
  },
  {
    id: "benchmark",
    title: {
      en: "Benchmark AI — Continuous ESL Assessment Suite",
      ko: "Benchmark AI — 상시 정량 진단 정밀 실증 도구"
    },
    subtitle: {
      en: "CEFR + Cambridge YLE mastery mapping · Predictive churn alerts",
      ko: "CEFR + Cambridge YLE 언어 지표 매핑 · 퇴원 가능 성향 조기 경보 기획"
    },
    primaryFor: ["edtech", "pm"],
    techHighlights: ["Continuous Assessment", "CEFR & Cambridge YLE", "Early Warning Trigger", "Analytics Dashboard"],
    bullets: [
      {
        en: "Designed responsive continuous assessment platform that maps day-to-day student evaluation scores across phonological, reading, and structural metrics against CEFR and Cambridge ESOL international standards.",
        ko: "원생별 일상 음성 숙련도, 글맥 가독 속도, 문장 정교화 결과를 공인 아카데믹 체계인 CEFR 및 Cambridge YLE 세부 수치에 맞춤 동적 매핑해 주는 상시 정량 대시보드 구조 기획.",
        weight: { pm: 4, eng: 2, edtech: 5 }
      },
      {
        en: "Defined and implemented predictive early-warning diagnostic indicators to identify stagnating skill mastery trends before attrition risk translates to parent customer withdrawal decisions, defending core MRR.",
        ko: "주차별 실력 가속 정체 곡선(mastery progression stagnation) 지수를 탐지하여 학부모 이탈 결심 수 주 전에 학원 관리자에게 '관리 보강 조기 경부 트리거'를 알림으로써 실질 퇴원율 방어에 전면 공헌.",
        weight: { pm: 5, eng: 2, edtech: 4 }
      },
      {
        en: "Enforced write-stabilization on Cloud Firestore through local hashing mechanisms with a 5-second debounced update threshold to prevent coordinate writes spike under high-frequency student assessments.",
        ko: "원내 동시 동시다발 터치 패드 입력 시 초당 데이터 쓰기 부하를 방지하기 위해 5초 단위 디바운스 및 내부 해시 확인 처리하는 전송 최적화 엔진 탑재.",
        weight: { pm: 1, eng: 5, edtech: 1 }
      }
    ]
  },
  {
    id: "lead-gen",
    title: {
      en: "B2B Lead Generator — Sales CRM & Outreach Engine",
      ko: "B2B Lead Generator — CRM 타겟 분석 오토메이션"
    },
    subtitle: {
      en: "Public catalog parsing · Personalization models · Hyper-personalized outreach",
      ko: "대규모 로컬 교육 공공 인프라 크롤링 · 하이퍼 세일즈 자동화 작문 모델"
    },
    primaryFor: ["pm", "eng"],
    techHighlights: ["Web Scraping", "Structured Data Extraction", "Cold Outreach PM", "CRM Flow", "Personalized Campaigns"],
    bullets: [
      {
        en: "Shipped custom B2B sales automation engine utilizing Google Gemini AI models to parse unstructured regional educational directories and output hyper-personalized cold outreach hooks, accelerating lead-to-meeting rates.",
        ko: "비정형 로컬 교육 공간 데이터를 파싱하고, 미팅 성공률을 높이기 위해 원장 맞춤형 소구점을 가미한 하이퍼 세일즈 메일을 자동 작성해 영업 리소스 소요 없이 리드를 견인하는 오토메이션 구현.",
        weight: { pm: 5, eng: 2, edtech: 3 }
      },
      {
        en: "Engineered robust scraper modules and fuzzy-logic schema parsers that successfully cleaned un-structured regional directory listings into flat, standardized client relation records.",
        ko: "공공 및 포털 교육 인프라 목록의 극성 파편화된 비관계 정보를 정제 크롤하고, 중복 정합 연산하는 파서 파이프라인 개발.",
        weight: { pm: 2, eng: 5, edtech: 1 }
      }
    ]
  }
];

const SKILLS: SkillCategory[] = [
  {
    id: "pm",
    category: { en: "Product Management", ko: "프로덕트 매니지먼트" },
    items: ["AI Product Strategy", "Product Roadmap", "Product Lifecycle Management", "User Stories", "Acceptance Criteria", "KPI Definition", "A/B Testing", "Data-Driven Decision Making", "Go-to-Market Strategy", "Agile", "Sprint Planning", "Backlog Management", "Stakeholder Management", "Cross-Functional Collaboration", "B2B SaaS", "Enterprise SaaS", "B2C Mobile"]
  },
  {
    id: "ai",
    category: { en: "AI & Generative AI", ko: "생성형 AI & 거대언어모델" },
    items: ["Generative AI", "LLM Integration", "AI Agent Design", "Prompt Engineering", "Google Gemini (Flash / Pro / Ultra)", "Multi-LLM Orchestration", "Google AI Studio", "Bilingual AI", "Responsible AI", "Model Bias Mitigation", "Structured JSON Schema Enforcement", "Prompt Injection Hardening"]
  },
  {
    id: "engineering",
    category: { en: "Engineering & Stack", ko: "기술 스택 및 아키텍처" },
    items: ["React 18/19", "TypeScript", "Vite", "Next.js", "Tailwind CSS", "Node.js", "Express.js", "Firebase (Firestore, Auth, Security Rules)", "Supabase (PostgreSQL, RLS)", "@react-pdf/renderer", "Vercel", "HTML", "CSS", "API Integration"]
  },
  {
    id: "automation",
    category: { en: "No-Code & Automation", ko: "자동화 및 노코드 연동" },
    items: ["Make.com", "Airtable", "Softr", "Fillout", "Workflow Automation", "API Webhooks", "RBAC", "Magic Link Authentication", "Zero-Storage Architecture"]
  },
  {
    id: "domain",
    category: { en: "EdTech & Domain", ko: "에듀테크 및 교육 도메인" },
    items: ["EdTech", "K-12", "Instructional Design", "Learning Outcomes", "Student Engagement", "EFL/ESL", "Bilingual Product Localisation", "CEFR", "Cambridge YLE", "LMS Concepts", "App Store Compliance", "Child Data Privacy (COPPA)"]
  }
];

const ROLES: Record<ActiveRole, RoleConfig> = {
  pm: {
    title: {
      en: "JASON BENJAMIN — AI Product Manager · EdTech Founder",
      ko: "제이슨 벤자민 — AI 프로덕트 매니저 · 에듀테크 지향 전문가"
    },
    profileText: {
      en: "EdTech founder and AI product manager with a decade of classroom experience in South Korea and a portfolio of six production-ready AI-powered products. Proven track record of defining product strategy, shipping cross-functional generative AI features from zero to launch, and driving measurable improvements in learning outcomes and operational efficiency. Uniquely positioned at the intersection of bilingual EdTech product design, LLM integration, and institutional operations — with hands-on experience across the full AI product lifecycle: discovery, agent design, go-to-market, and post-launch iteration.",
      ko: "한국 교육 현장에서의 10년 경력과 6개의 완성도 높은 실무형 AI 제품 포트폴리오를 보유한 에듀테크 창업가이자 AI 프로덕트 매니저입니다. 핵심 프로덕트 전략 수립부터 크로스 기능 기반 생성형 AI 피처 배포 완료, 그리고 학원 현장 업무 시간 매주 15시간 이상 저감 등 측정 가능 고효율 비즈니스 임팩트를 확보해 왔습니다. 다국어 마켓 번역 설계, 대형 언어 모델 프롬프트 조합 가이드라인 엔지니어링, 복잡한 비즈니스 요건의 정밀 제품 스펙 변형을 강점으로 합니다."
    },
    skillsOrder: ["pm", "ai", "domain", "automation", "engineering"],
    academyBulletOrder: [0, 1, 2] // scheduling system, assessment system, textbook authoring
  },
  eng: {
    title: {
      en: "JASON BENJAMIN — AI Integration Engineer · Solutions Architect",
      ko: "제이슨 벤자민 — AI 인티그레이션 엔지니어 · 클라우드 솔루션 아키텍트"
    },
    profileText: {
      en: "Technical solutions architect and AI integration engineer specialising in full-stack LLM orchestration, secure database designs, and automated serverless workflows. Developer of multi-tier generative models (such as the Gemini Flash/Pro 'Draft and Weave' system), robust PostgreSQL row-level security (RLS) policies, secure role-based access tokens, and containerised deployments. Passionate about engineering high-compliance zero-storage application boundaries that enforce rigorous client-side PDF compilation, preventing cloud exposure of sensitive child records.",
      ko: "대형 생성형 모델 오케스트레이션, 비비동기 이벤트 연동, 데이터 접근 경계 설계를 전문화한 프리미엄 AI 인티그레이션 솔루션 에이전트 엔지니어입니다. Gemini Flash/Pro 복합 'Draft and Weave' 가이드 2단계 컴파일 파이프라인 수립, Supabase PostgreSQL RLS 보안 시나리오 구축, 클라이언트 브라우저 인클래스 @react-pdf/renderer 독립 연산 구현 등을 소유했습니다. 민감 유저 데이터를 완전히 기기 엣지 방향에서 안전 필터 처리하는 저비용 고보안 환경 구축에 능숙합니다."
    },
    skillsOrder: ["engineering", "ai", "automation", "pm", "domain"],
    academyBulletOrder: [1, 0, 2] // assessment system, scheduling system, textbook authoring
  },
  edtech: {
    title: {
      en: "JASON BENJAMIN — EdTech Product Manager · EFL Academic Director",
      ko: "제이슨 벤자민 — 에듀테크 프로덕트 매니저 · EFL 교육 과정 총괄 디렉터"
    },
    profileText: {
      en: "Bilingual EdTech product specialist and veteran EFL homeroom manager in Seoul, holding over 10 years of experience managing core student life cycle and instructional designs. Expert in crafting responsive assessment modules synced with international standard indices (CEFR / Cambridge YLE), releasing highly rated children's English educational products targeted at local families, and coordinating complex academic resource scheduling. Co-author of a widely popular 20-volume English language learning textbook set adopted at prime private academies.",
      ko: "국내 미취학 아동 및 케이포 교육 실무 분야에서 10년 이상 영어 담임 및 아카데믹 커리큘럼 디자인 총괄을 마친 에듀테크 및 현지 마켓 특화 기획형 PM입니다. 실제 어학원들이 필수적으로 요구하는 상시 인텔리전스 평가 기준과 CEFR/Cambridge YLE 레벨 시스템을 제품에 가공 삽입하는 기법을 가지며, 아동용 모바일 안전 규정(COPPA) 준수 제품 고안, 6개 언어 영역을 망라하는 20권 어학원 전문 정규 서적 일지 구축 등을 도맡았습니다."
    },
    skillsOrder: ["domain", "pm", "ai", "automation", "engineering"],
    academyBulletOrder: [2, 1, 0] // textbook authoring, assessment system, scheduling system
  }
};

const BLEND_ACADEMY_BULLETS = [
  {
    en: "Defined requirements for and launched an automated, clash-free scheduling system that eliminated manual timetable conflicts, optimising resource allocation across departments.",
    ko: "부서 간 가용 수용 계획의 충돌을 자동으로 회피하고 리소스 가동률을 극대화하는 clash-free 스마트 학급 시간표 배치 시스템 설계."
  },
  {
    en: "Shipped a multi-domain, data-driven student assessment system tracking longitudinal academic progress, enabling early intervention that measurably reduced attrition risk.",
    ko: "장기 학업 변화 궤적을 실시간으로 추적하는 다중 진단 지수 체계를 배포해, 선제 학습 개입을 통한 수강 탈퇴율 개선 성과."
  },
  {
    en: "Authored a 20-volume institutional English textbook series spanning 6 skill domains (Phonics, Debate, Writing, Test Prep), establishing the core pedagogical framework adopted across the academy.",
    ko: "Phonics, Debate, Writing, Test Prep 교격 등 6개 분야를 총괄 가독하는 학원용 20권 분량 영어 정규 교재 공동 저술 방법론 완성."
  }
];

export default function RoleSwitchResume({ locale, theme }: ResumeProps) {
  const [activeRole, setActiveRole] = useState<ActiveRole>('pm');

  const config = ROLES[activeRole];
  const isDark = theme === 'dark';

  // Labels for rendering
  const labels = {
    en: {
      profileTitle: "Professional Profile",
      skillsTitle: "Core Competencies",
      experienceTitle: "Dynamic Experience & Core Products",
      otherExpTitle: "Professional Work History",
      blendAcademy: "Homeroom Teacher & Manager · Blend ENG Academy",
      blendSub: "Senior Educator & Curriculum Lead | Private English Academy",
      blendPeriod: "Feb 2023 – Feb 2026",
      ybmAcademy: "Homeroom Educator · YBM PSA Seocho",
      ybmSub: "Full-Immersion English Instruction | Leading English Kindergarten & Academy",
      ybmPeriod: "Feb 2019 – Feb 2023",
      ybmBullet: "Delivered full-immersion EFL instruction, developing differentiated curriculum materials and maintaining structured, data-backed academic reporting for stakeholders.",
      educationTitle: "Academy Education",
      eduEssex: "Master of Education — Educational Management (2022)",
      eduUwc: "Bachelor of Commercial Law (2013)",
      badgeFocus: "Primary Focus",
      roleLabel: "Select Resume Perspective:"
    },
    ko: {
      profileTitle: "전문가 프로필 개요",
      skillsTitle: "직무 기술 핵심 역량",
      experienceTitle: "도메인 경험 및 상용화 제품 포트폴리오",
      otherExpTitle: "기관 교육 현장 및 운영 이력",
      blendAcademy: "담임 교사 및 원장단 매니저 · Blend ENG Academy",
      blendSub: "수석 영어 강사 및 학원 시스템 설계 리드 | 대형 영어학교",
      blendPeriod: "2023년 2월 – 2026년 2월",
      ybmAcademy: "어린이 영어 강사 · YBM PSA Seocho",
      ybmSub: "영어 몰입 교육 및 아동 발달 아카이빙 책임 | PSA 명문 영어유치원",
      ybmPeriod: "2019년 2월 – 2023년 2월",
      ybmBullet: "해외 영어 발음 연마 및 학부모 지수 수립, K-12 원내 지점 다중 영어 특화 서적 집필 및 피드백 보정.",
      educationTitle: "학력 및 이수 사항",
      eduEssex: "영국 Essex 대학교 — 교육 경영 행정학 석사 (2022년)",
      eduUwc: "남아프리카공화국 Western Cape 대학교 — 상법 학사 (2013년)",
      badgeFocus: "핵심 강조 기능",
      roleLabel: "이력서 타겟 관점 선택:"
    }
  }[locale];

  // Dynamically sort products based on Role's primacy (similar to the user's template logic)
  const sortedProducts = [...PRODUCTS].sort((a, b) => {
    const aScore = a.primaryFor.includes(activeRole) ? 1 : 0;
    const bScore = b.primaryFor.includes(activeRole) ? 1 : 0;
    return bScore - aScore;
  });

  return (
    <div id="role-switch-resume-container" className="space-y-8 print:space-y-6">
      
      {/* ROLE SWITCHER - HIDDEN ON PRINT */}
      <div className="p-4 rounded-2xl bg-neutral-900 border border-white/5 space-y-3 print:hidden shadow-inner">
        <span className="text-[10px] font-black uppercase tracking-widest text-accent-gold/80 block font-mono">
          {labels.roleLabel}
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {(['pm', 'eng', 'edtech'] as ActiveRole[]).map((roleKey) => {
            const label = {
              pm: { en: "AI Product Manager", ko: "AI 프로덕트 매니저" },
              eng: { en: "AI Integration Engineer", ko: "AI 인티그레이션 엔지니어" },
              edtech: { en: "EdTech Product PM", ko: "에듀테크 특화 PM" }
            }[roleKey][locale];

            const isActive = activeRole === roleKey;

            return (
              <button
                key={roleKey}
                id={`role-btn-${roleKey}`}
                onClick={() => setActiveRole(roleKey)}
                className={`relative px-4 py-3 rounded-xl text-left border transition-all duration-150 select-none ${
                  isActive 
                    ? 'border-accent-gold bg-accent-gold/10 text-accent-gold shadow-[0_0_12px_rgba(212,163,89,0.15)] font-bold' 
                    : 'border-white/5 bg-neutral-950/40 text-white/50 hover:text-white/80 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-tight">{label}</span>
                  {isActive && (
                    <motion.span 
                      layoutId="active-indicator"
                      className="w-1.5 h-1.5 rounded-full bg-accent-gold shadow-glow"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* DYNAMIC HEADER SHOWS THE TARGETED SPECIALTY IN LARGE DISPLAY FOR PROFESSIONAL PRINT */}
      <div className="hidden print:block border-b-2 border-black pb-4 mb-4">
        <h3 className="text-2xl font-black tracking-tight text-black">{config.title[locale]}</h3>
        <p className="text-xs text-black/80 mt-1">Seoul, South Korea | jsn.benjamin@gmail.com | Portfolio: jason-portfolio-live.vercel.app</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeRole}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="space-y-8 print:space-y-6"
        >
          {/* PROFILE SUMMARY SECTION */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-accent-gold border-b pb-1.5 border-accent-gold/20 flex items-center gap-2 print:text-black print:border-black">
              <span>✦</span> {labels.profileTitle}
            </h4>
            <p className={`text-xs md:text-sm leading-relaxed font-light ${isDark ? 'text-white/85' : 'text-neutral-800'} print:text-black print:text-[11px]`}>
              {config.profileText[locale]}
            </p>
          </div>

          {/* TWO COLUMN GRID FOR RESUME (stacked vertically on print for beautiful page distribution) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 print:flex print:flex-col print:gap-6">
            
            {/* COLUMN 1 & 2: DYNAMIC PORTFOLIO WORK EXPERIENCE */}
            <div className="lg:col-span-2 space-y-6 print:w-full print:space-y-5">
              <h4 className="text-xs font-black uppercase tracking-widest text-accent-gold border-b pb-1.5 border-accent-gold/20 flex items-center gap-2 print:text-black print:border-black">
                <span>🔧</span> {labels.experienceTitle}
              </h4>
              
              <div className="space-y-5">
                <div className="border-l border-accent-gold/25 pl-4 sm:pl-5 space-y-5 print:border-black/30">
                  
                  {/* CHEKKI PORTFOLIO PARENT */}
                  <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h5 className="text-xs font-black tracking-wider uppercase text-accent-gold print:text-black font-mono">
                        Founder & AI Lead · Chekki EdTech Solutions
                      </h5>
                      <span className="text-[10px] font-mono opacity-50 print:text-black/60 print:text-[9px]">Jan 2024 – Present</span>
                    </div>
                    <span className={`text-[10px] block font-light font-display opacity-80 ${isDark ? 'text-white' : 'text-black'}`}>
                      {locale === 'en' 
                        ? "Six-product AI-powered software suite tailored for educational command channels" 
                        : "한국 영어 어학원 및 유치원 시장 고도화를 목표로 하는 6대 독자적 AI 시스템 구축 프로젝트 총괄"}
                    </span>
                  </div>

                  {/* SIX PRODUCTS RENDERED BY PRIORITIZED ROLE SORT */}
                  <div className="space-y-4 pt-1">
                    {sortedProducts.map((prod, idx) => {
                      // Top 2-3 products get a premium highlighted badge in standard screen view
                      const isTopFocus = idx < 3;

                      // Dynamically sort bullets within this product by role weights
                      const sortedBullets = [...prod.bullets].sort((a, b) => b.weight[activeRole] - a.weight[activeRole]);

                      return (
                        <div 
                          key={prod.id} 
                          className={`p-3.5 rounded-xl border transition-all duration-300 ${
                            isTopFocus 
                              ? 'bg-[#1c1b18] border-accent-gold/30 shadow-[0_2px_10px_rgba(0,0,0,0.4)]' 
                              : 'bg-neutral-950/20 border-white/5 opacity-85 hover:opacity-100 hover:border-white/10'
                          } print-avoid-break print:bg-transparent print:border-0 print:border-b print:border-black/10 print:p-0 print:pb-3 print:mb-3 last:print:border-b-0 last:print:pb-0 last:print:mb-0 print:opacity-100`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-accent-gold print:text-black flex items-center gap-1.5 font-display">
                              <span>📁</span> {prod.title[locale]}
                            </span>
                            {isTopFocus && (
                              <span className="px-1.5 py-0.5 rounded text-[8px] tracking-wider uppercase font-black bg-accent-gold/15 text-accent-gold border border-accent-gold/20 print:hidden font-mono">
                                {labels.badgeFocus}
                              </span>
                            )}
                          </div>
                          <span className="text-[9.5px] block font-light font-mono text-white/50 print:text-black/60 mt-0.5">
                            {prod.subtitle[locale]}
                          </span>
                          
                          {/* Rich bullets sorted dynamically per active role */}
                          <ul className="list-disc list-inside space-y-1.5 pl-2 mt-2">
                            {sortedBullets.map((bullet, bIdx) => (
                              <li 
                                key={bIdx} 
                                className={`text-[10.5px] leading-relaxed font-light ${isDark ? 'text-white/70' : 'text-neutral-800'} print:text-black print:text-[9px] indent-[-0.75rem] pl-3`}
                              >
                                {bullet[locale]}
                              </li>
                            ))}
                          </ul>

                          {/* Tech skill tags */}
                          <div className="flex flex-wrap gap-1 mt-3 print:hidden">
                            {prod.techHighlights.map((tag) => (
                              <span 
                                key={tag} 
                                className="px-1.5 py-0.5 rounded bg-neutral-900 border border-white/10 text-[8.5px] font-mono text-white/50"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              </div>

              {/* SECTION: ACADEMY EXPERIENCES */}
              <div className="space-y-5 pt-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-accent-gold border-b pb-1.5 border-accent-gold/20 flex items-center gap-2 print:text-black print:border-black">
                  <span>🏛️</span> {labels.otherExpTitle}
                </h4>

                {/* Blend ENG Academy with dynamic prioritized bullets */}
                <div className="space-y-2 print-avoid-break">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h5 className="text-[11.5px] font-black font-display print:text-black">{labels.blendAcademy}</h5>
                    <span className="text-[9px] font-mono opacity-50 print:text-black/60">{labels.blendPeriod}</span>
                  </div>
                  <div className="text-[10px] font-semibold text-accent-gold/80 print:text-black/80">{labels.blendSub}</div>
                  <ul className={`space-y-1.5 text-[10.5px] font-light leading-relaxed list-disc list-inside ${isDark ? 'text-white/70' : 'text-neutral-800'} print:text-black print:text-[10px]`}>
                    {config.academyBulletOrder.map((bulletIdx) => {
                      const bullet = BLEND_ACADEMY_BULLETS[bulletIdx];
                      return (
                        <li key={bulletIdx} className="indent-[-1.2rem] pl-5">
                          {bullet[locale]}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* YBM PSA Seocho (Standard static representation) */}
                <div className="space-y-2 pt-2 border-t border-white/5 print:border-black/10 print-avoid-break">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h5 className="text-[11.5px] font-black font-display print:text-black">{labels.ybmAcademy}</h5>
                    <span className="text-[9px] font-mono opacity-50 print:text-black/60">{labels.ybmPeriod}</span>
                  </div>
                  <div className="text-[10px] font-semibold text-accent-gold/80 print:text-black/80">{labels.ybmSub}</div>
                  <p className={`text-[10.5px] font-light leading-relaxed ${isDark ? 'text-white/70' : 'text-neutral-800'} print:text-black print:text-[10px]`}>
                    {labels.ybmBullet}
                  </p>
                </div>
              </div>

            </div>

            {/* COLUMN 3: STACK & COMPETENCY PRIORITIES */}
            <div className="space-y-6 print:w-full print:space-y-6 print:mt-6">
              
              {/* CORE COMPETENCIES LIST */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-accent-gold border-b pb-1.5 border-accent-gold/20 flex items-center gap-2 print:text-black print:border-black">
                  <span>⚓</span> {labels.skillsTitle}
                </h4>
                <div className="grid grid-cols-1 gap-4 print:grid-cols-2 print:gap-x-8 print:gap-y-4 print:space-y-0">
                  {config.skillsOrder.map((catId) => {
                    const cat = SKILLS.find(s => s.id === catId);
                    if (!cat) return null;

                    return (
                      <div key={cat.id} className="space-y-1.5 print-avoid-break">
                        <div className="text-[10px] font-black uppercase tracking-wider text-accent-gold/90 print:text-black font-mono">
                          {cat.category[locale]}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.items.map((item, iIdx) => (
                            <span 
                              key={iIdx} 
                              className={`px-2 py-0.5 rounded text-[8.5px] font-mono border ${
                                isDark 
                                  ? 'bg-neutral-900 border-white/5 text-white/80' 
                                  : 'bg-black/5 border-black/5 text-neutral-800'
                              } print:bg-slate-100 print:border-slate-300 print:text-slate-800 print:text-[8px]`}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* EDUCATION & COMPLIANCES */}
              <div className="space-y-4 border-t border-white/5 pt-4 print:border-black/10 print-avoid-break">
                <h4 className="text-xs font-black uppercase tracking-widest text-accent-gold border-b pb-1.5 border-accent-gold/20 flex items-center gap-2 print:text-black print:border-black">
                  <span>🎓</span> {labels.educationTitle}
                </h4>
                <div className="space-y-2.5 text-xs font-light">
                  <div className="space-y-0.5">
                    <div className="font-bold print:text-black text-[11px]">University of Essex (영국)</div>
                    <div className="opacity-75 print:text-black/80 text-[10px]">{labels.eduEssex}</div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-bold print:text-black text-[11px]">University of the Western Cape</div>
                    <div className="opacity-75 print:text-black/80 text-[10px]">{labels.eduUwc}</div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

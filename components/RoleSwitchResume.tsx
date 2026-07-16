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
  activeRole?: ActiveRole;
  onRoleChange?: (role: ActiveRole) => void;
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

const VODABI_ROLE_BULLETS: Record<ActiveRole, { en: string; ko: string }[]> = {
  pm: [
    {
      en: "Spearheaded product vision and authored the core product brief for an enterprise B2B conversational AI platform — directing the pivot from a legacy analytics-heavy dashboard to a clean, 3-step interactive AI coaching widget (Role Selection → Upload → Chat), significantly reducing user cognitive load.",
      ko: "엔터프라이즈 B2B 대화형 AI 플랫폼의 핵심 제품 사양(PRD)을 개발하고 제품 비전을 주도하여, 기존 데이터 위주의 무거운 대시보드에서 직관적인 3단계 대화형 AI 코칭 위젯(역할 선택 → 업로드 → 대화)으로 피봇을 리드함으로써 사용자 인지 부하를 획기적으로 감축함."
    },
    {
      en: "Mapped and executed a multi-phase deployment roadmap, securing immediate stakeholder ROI with a lightweight stateless MVP before architecting the transition to a stateful, enterprise-grade cloud ecosystem.",
      ko: "다단계 제품 출시 로드맵을 설계 및 실행하여, 엔터프라이즈급 영구 데이터 저장 클라우드 시스템으로 전환하기 전 상태가 없는 경량 MVP 버전을 통해 이해관계자에게 즉각적인 투자 대 효과(ROI)를 입증함."
    },
    {
      en: "Designed a deterministic evaluation framework that decoupled immutable behavioural scoring from dynamic, client-defined compliance matrices — eliminating LLM hallucinations and ensuring enterprise trust.",
      ko: "고객사의 유동적인 규격 준수 요건과 불변의 행동 기준 채점을 완벽히 분리해내는 하이브리드 결정론적 채점 프레임워크를 고안하여 거대언어모델(LLM)의 고질적인 환각을 전면 배제하고 제품의 비즈니스 정합성을 극대화함."
    },
    {
      en: "Aligned AI coaching features to existing revenue-generating reports and provided strategic GTM positioning materials supporting high-stakes B2B sales demonstrations for Tier-1 enterprise clients.",
      ko: "개발된 AI 코칭 기능을 플랫폼 내의 기존 유료 수익 리포트와 직결시키고, 1티어 대기업 파트너를 위한 고성공율 B2B 세일즈 데모용 핵심 가이드와 포지셔닝 머티리얼을 기획 및 제공함."
    },
    {
      en: "Designed and executed a 'Wizard of Oz' prototyping demonstration to validate frontend UX and backend conversational logic with executive stakeholders prior to full database integration.",
      ko: "데이터베이스 통합 개발 이전에, 경영진 등 주요 이해관계자를 대상으로 프론트엔드 사용자 경험(UX) 및 백엔드 대화 흐름 로직을 입증하기 위한 'Wizard of Oz' 프로토타이핑 검증 및 성공적 시연을 리드함."
    },
    {
      en: "Architected a webhook-driven backend pipeline using Make.com and Airtable enabling zero-day scenario updates without backend developer intervention.",
      ko: "Make.com과 Airtable을 활용한 웹훅 연동 백엔드 로직 설계로, 개발자의 실무 개입 없이도 관리자가 신규 비즈니스 코칭 시나리오를 즉각 배포할 수 있는 '제로데이' 시나리오 업데이트 환경을 구축함."
    }
  ],
  eng: [
    {
      en: "Designed a deterministic evaluation framework decoupling immutable behavioural scoring from dynamic client-defined compliance matrices, eliminating LLM hallucinations in enterprise contexts.",
      ko: "고객사의 유동적인 규격 준수 요건과 불변의 행동 기준 채점을 완벽히 분리해내는 하이브리드 결정론적 채점 프레임워크를 고안하여 거대언어모델(LLM)의 고질적인 환각을 전면 배제하고 제품의 비즈니스 정합성을 극대화함."
    },
    {
      en: "Translated a complex keyword data dictionary into a dynamic 4-persona LLM system prompt matrix, ingesting proprietary B2B sales telemetry into the LLM context window to generate highly personalised feedback.",
      ko: "복잡한 세일즈 키워드 데이터 사전을 다이내믹한 4개 페르소나 거대언어모델(LLM) 시스템 프롬프트 매트릭스로 정밀 이식하고, 회사 고유의 B2B 세일즈 텔레메트리 데이터를 컨텍스트 윈도우에 피딩하여 정교한 맞춤 피드백을 생성하는 파이프라인 설계."
    },
    {
      en: "Established enterprise AI guardrails: strict compliance protocols restricting LLM outputs to concise, high-impact bursts within proprietary boundaries, preventing hallucinated business decisions.",
      ko: "엔터프라이즈 AI 가드레일 설계: 자체 기업 정보 자산 경계 내에서 거대언어모델이 안전하게 작동하도록 엄격한 인풋/아웃풋 프로토콜을 수립하여 출력을 매우 일관되고 압축적인 형태의 안전 수준 내로 상시 통제."
    },
    {
      en: "Defined strict JSON data contracts, state management flows, and API routing logic to guide UI/UX designers and AWS engineers in translating complex LLM behaviours into production code.",
      ko: "정교한 LLM 동작 모델이 프론트엔드 UI 및 AWS 인프라 환경에서 기민하게 동작하도록 JSON 데이터 스키마 규격 계약, 상태 관리 흐름도, 그리고 API 라우팅 스펙을 엄밀하게 정의하여 교차 개발 지휘."
    },
    {
      en: "Architected a webhook-driven backend pipeline using Make.com and Airtable enabling zero-day scenario updates without backend developer intervention.",
      ko: "Make.com과 Airtable을 활용한 웹훅 연동 백엔드 로직 설계로, 개발자의 실무 개입 없이도 관리자가 신규 비즈니스 코칭 시나리오를 즉각 배포할 수 있는 '제로데이' 시나리오 업데이트 환경을 구축함."
    }
  ],
  edtech: [
    {
      en: "Directed the pivot from a legacy analytics-heavy dashboard to a 3-step interactive AI coaching widget applying UX cognitive load reduction principles to serve non-technical sales professionals.",
      ko: "엔터프라이즈 B2B 대화형 AI 플랫폼의 핵심 제품 사양(PRD)을 개발하고 제품 비전을 주도하여, 기존 데이터 위주의 무거운 대시보드에서 직관적인 3단계 대화형 AI 코칭 위젯(역할 선택 → 업로드 → 대화)으로 피봇을 리드함으로써 사용자 인지 부하를 획기적으로 감축함."
    },
    {
      en: "Designed the 'Fact-Impact-Fix' pedagogical logic model — transforming rigid integer-based scoring rubrics into empathetic, actionable micro-learning interventions grounded in instructional design principles.",
      ko: "교육학적 원리에 정합한 'Fact-Impact-Fix' 발달 평가 모델 설계: 정량적이고 차가운 수치 채점 결과를 교정에 유용하고 공감 어린 마이크로 학습 인터벤션 지표로 전환하여 부모 및 학습자의 만족도를 극대화함."
    },
    {
      en: "Led GTM and client enablement strategy supporting high-stakes B2B sales demonstrations for Tier-1 enterprise clients.",
      ko: "개발된 AI 코칭 기능을 플랫폼 내의 기존 유료 수익 리포트와 직결시키고, 1티어 대기업 파트너를 위한 고성공율 B2B 세일즈 데모용 핵심 가이드와 포지셔닝 머티리얼을 기획 및 제공함."
    },
    {
      en: "Executed a 'Wizard of Oz' prototype validation with executive stakeholders — a classic instructional design validation methodology applied to AI product.",
      ko: "데이터베이스와 백엔드 API 전면 구축 이전에, 프론트엔드 UX 및 인공지능 교수 설계 기틀을 입증하기 위해 'Wizard of Oz' 프로토타이핑을 수행하고 주요 투자 주체 및 학술진 대상 검증 완료."
    }
  ]
};

const SKILLS: SkillCategory[] = [
  {
    id: "pm",
    category: { en: "Product Management", ko: "프로덕트 매니지먼트" },
    items: [
      "AI Product Strategy", "Product Roadmap", "Acceptance Criteria", "Discovery & Scoping", 
      "Product Lifecycle Management", "Cross-Functional Collaboration", "Go-to-Market Strategy", 
      "B2B SaaS", "Enterprise AI SaaS", "Sales Enablement", "B2C Mobile", 
      "Multi-Tenant Architecture", "RBAC", "Agile", "OKRs", "Stakeholder Management", 
      "UX Cognitive Load Reduction"
    ]
  },
  {
    id: "ai",
    category: { en: "Generative AI & LLM", ko: "생성형 AI & 거대언어모델" },
    items: [
      "Generative AI", "LLM Integration", "Prompt Engineering", "Multi-Model Pipeline Orchestration", 
      "Gemini AI", "Claude AI", "Google AI Studio", "Structured Output Enforcement", 
      "AI Guardrails", "Prompt Injection Hardening", "Bilingual AI", "Automated Reporting Pipelines", 
      "AI Agent Design", "Deterministic AI Architecture", "Context Window Optimization", 
      "Hallucination Mitigation", "Persona Matrix Design"
    ]
  },
  {
    id: "technical",
    category: { en: "Technical & Tooling", ko: "기술 및 도구" },
    items: [
      "React", "TypeScript", "Firebase", "Vercel", "Supabase", "Make.com", "Airtable", 
      "Softr", "Fillout", "API Webhooks", "JSON Data Contracts", "Stateful & Stateless Architecture", 
      "AWS Integration & Handover", "Magic Links", "Passwordless Authentication", 
      "Zero-Storage Architecture", "App Store Compliance", "Child Data Privacy"
    ]
  },
  {
    id: "domain",
    category: { en: "Domain", ko: "도메인 분야 지식" },
    items: [
      "EdTech", "Educational Technology", "B2B Revenue Intelligence", "South Korea Market", 
      "Bilingual Product Design", "English-Korean Localisation", "Language Academy Operations", 
      "EFL", "ESL"
    ]
  }
];

const ROLES: Record<ActiveRole, RoleConfig> = {
  pm: {
    title: {
      en: "JASON BENJAMIN — AI Product Manager — Generative AI & EdTech",
      ko: "제이슨 벤자민 — AI 프로덕트 매니저 — 생성형 AI & 에듀테크"
    },
    profileText: {
      en: "AI Product Manager with enterprise B2B SaaS experience, five production AI products shipped, and a decade of education domain expertise that makes every product decision defensible. Proven track record defining AI product strategy, authoring product briefs, and shipping generative AI features that deliver measurable outcomes: 80% reduction in administrative workloads, scheduling automation cutting 40 hours to under 10 minutes, and enterprise B2B conversational AI coaching deployed to Tier-1 clients. Experienced across the full AI product lifecycle — from 'Wizard of Oz' validation to multi-phase roadmap execution and stateful enterprise cloud architecture.",
      ko: "B2B SaaS 도입 이력과 5개 상용화 인공지능 제품 출시 경험을 지닌 AI 프로덕트 매니저이자, 교육 결정을 단단하게 입증하는 10년의 도메인 노하우를 갖춘 기획자입니다. 제품 전략 기획, 제품 요구서(PRD) 작성, 그리고 학사 업무 80% 소거, 40시간 소요 시간표 수립 업무를 10분 내 자동화, 대기업(Tier-1) 배포용 대화형 AI 세일즈 코칭 플랫폼 구현 등 괄목할 성과를 창출해냈습니다. 'Wizard of Oz' 실증 프로토타입부터 다단계 고신뢰 배포 로드맵 및 클라우드 아키텍처 사양 수립까지 전체 라이프사이클을 리드합니다."
    },
    skillsOrder: ["pm", "ai", "technical", "domain"],
    academyBulletOrder: [0, 1, 2] // scheduling system, assessment system, textbook authoring
  },
  eng: {
    title: {
      en: "JASON BENJAMIN — AI Integration Engineer — Generative AI Systems & LLM Pipelines",
      ko: "제이슨 벤자민 — AI 인티그레이션 엔지니어 — 생성형 AI 시스템 & LLM 파이프라인"
    },
    profileText: {
      en: "AI Integration Engineer with enterprise B2B SaaS experience and five production generative AI systems shipped — specialising in deterministic AI architecture, LLM pipeline design, structured output enforcement, and privacy-first deployment. Built and deployed end-to-end AI systems across enterprise conversational coaching platforms, multi-tenant B2B portals, consumer mobile applications, and real-time assessment platforms — using Gemini, Claude, Make.com, Firebase, and a full React/TypeScript/Express stack.",
      ko: "기업용 B2B SaaS 환경에서 5개의 상용 거대언어모델(LLM) 시스템을 성공적으로 배포한 AI 인티그레이션 엔지니어입니다. 환각을 원천 배제하는 결정론적 평가 아키텍처 수립, 복합 프롬프트 매트릭스 설계, 정형 JSON 구조 보정 및 프라이버시 우선(COPPA) 설계에 높은 강점이 있습니다. 대화형 AI 코칭 서비스, 멀티테넌트 B2B SaaS, 모바일 앱 환경, 실시간 교육 진단 제품 전반의 엔드투엔드 AI 파이프라인를 React, TypeScript, Express, Firebase, Supabase, Make.com을 바탕으로 완벽히 통제 설계합니다."
    },
    skillsOrder: ["ai", "technical", "pm", "domain"],
    academyBulletOrder: [1, 0, 2] // assessment system, scheduling system, textbook authoring
  },
  edtech: {
    title: {
      en: "JASON BENJAMIN — EdTech Product Manager — AI-Powered Learning Systems & Curriculum",
      ko: "제이슨 벤자민 — 에듀테크 프로덕트 매니저 — AI 기반 학습 시스템 & 교육 과정"
    },
    profileText: {
      en: "EdTech Product Manager with a Master of Education in Educational Management, enterprise B2B AI SaaS experience, and 10+ years of domain expertise inside South Korean classrooms and academies. Uniquely positioned at the intersection of pedagogy and product — designed instructional logic models for enterprise sales coaching, shipped a consumer AI homework assistant to the App Store, and built a school-wide assessment platform mapped to CEFR and Cambridge YLE standards. Track record includes 80% administrative workload reduction, scheduling automation from 40 hours to 10 minutes, and AI coaching deployed to Tier-1 enterprise clients.",
      ko: "교육행정경영학 석사 학위와 국내 K-12 어학원 시장에서의 10년의 도메인 경험을 지닌 에듀테크 특화 프로덕트 매니저입니다. 교수법과 제품 설계를 융합하여 세일즈 행동 정량 평가 모델 설계, 모바일 앱스토어용 아동용 AI 과제 도우미 론칭, 공인 국제 진단(CEFR / Cambridge YLE) 매핑 대시보드 구축을 기획 주도했습니다. 학사 문서 부담 80% 전격 절감, 조합 연산 자동화(40시간에서 10분), 그리고 1티어 대기업 파트너를 위한 B2B AI 솔루션 연동 등 실질 비즈니스 지표를 도출했습니다."
    },
    skillsOrder: ["pm", "ai", "domain", "technical"],
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

export default function RoleSwitchResume({ locale, theme, activeRole: propActiveRole, onRoleChange }: ResumeProps) {
  const [localActiveRole, setLocalActiveRole] = useState<ActiveRole>('pm');
  const activeRole = propActiveRole !== undefined ? propActiveRole : localActiveRole;
  const setActiveRole = (role: ActiveRole) => {
    if (onRoleChange) {
      onRoleChange(role);
    } else {
      setLocalActiveRole(role);
    }
  };

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

      <div className="print:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRole}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
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
                  
                  {/* VODABI EXPERIENCE BLOCK */}
                  <div className="p-3.5 rounded-xl border border-accent-gold/35 bg-accent-gold/[0.03] shadow-[0_2px_12px_rgba(212,163,89,0.08)] print-avoid-break print-card">
                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <span className="text-[11.5px] font-black uppercase text-accent-gold print:text-black flex items-center gap-1.5 font-display">
                          <span>🚀</span> {
                            activeRole === 'pm' ? (locale === 'en' ? "AI Product Manager (Internship) · VodaBi SaaS Startup" : "AI 프로덕트 매니저 (인턴십) · VodaBi SaaS 스타트업") :
                            activeRole === 'eng' ? (locale === 'en' ? "AI Integration Engineer (Internship) · VodaBi SaaS Startup" : "AI 인티그레이션 엔지니어 (인턴십) · VodaBi SaaS 스타트업") :
                            (locale === 'en' ? "EdTech Product Manager (Internship) · VodaBi SaaS Startup" : "에듀테크 프로덕트 매니저 (인턴십) · VodaBi SaaS 스타트업")
                          }
                        </span>
                        <span className="text-[9.5px] font-mono opacity-50 print:text-black/60 print:text-[9px]">
                          {locale === 'en' ? "July 2026 – Present" : "2026년 7월 – 현재"}
                        </span>
                      </div>
                      <span className={`text-[10px] block font-light font-display opacity-80 ${isDark ? 'text-white' : 'text-black'}`}>
                        {locale === 'en' 
                          ? "Lead product architect for an enterprise B2B conversational AI and automated evaluation platform." 
                          : "엔터프라이즈 B2B 대화형 AI 및 자동 평가 플랫폼 개발 리드 프로덕트 아키텍트."}
                      </span>
                    </div>

                    {/* BULLETS */}
                    <ul className="list-disc list-inside space-y-1.5 pl-2 mt-2.5">
                      {VODABI_ROLE_BULLETS[activeRole].map((bullet, idx) => (
                        <li 
                          key={idx} 
                          className={`text-[10.5px] leading-relaxed font-light ${isDark ? 'text-white/70' : 'text-neutral-800'} print:text-black print:text-[9px] indent-[-0.75rem] pl-3`}
                        >
                          {bullet[locale]}
                        </li>
                      ))}
                    </ul>
                  </div>

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
                          } print-avoid-break print-card`}
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
              <div className="space-y-4 print-break-before">
                <h4 className="text-xs font-black uppercase tracking-widest text-accent-gold border-b pb-1.5 border-accent-gold/20 flex items-center gap-2 print:text-black print:border-black">
                  <span>⚓</span> {labels.skillsTitle}
                </h4>
                <div className="grid grid-cols-1 gap-4 print:grid-cols-2 print:gap-x-8 print:gap-y-4 print:space-y-0">
                  {config.skillsOrder.map((catId) => {
                    const cat = SKILLS.find(s => s.id === catId);
                    if (!cat) return null;

                    const visualLabel = {
                      pm: {
                        pm: { en: "Product Management", ko: "프로덕트 매니지먼트" },
                        ai: { en: "Generative AI & LLM", ko: "생성형 AI & LLM" },
                        technical: { en: "Technical & Tooling", ko: "기술 및 도구" },
                        domain: { en: "Domain", ko: "도메인 분야" }
                      },
                      eng: {
                        ai: { en: "AI & LLM Engineering", ko: "AI & LLM 엔지니어링" },
                        technical: { en: "Technical & Tooling", ko: "기술 및 개발 스택" },
                        pm: { en: "Automation & Integration", ko: "오토메이션 & 시스템 연동" },
                        domain: { en: "Security & Compliance", ko: "보안 & 컴플라이언스" }
                      },
                      edtech: {
                        pm: { en: "EdTech Product Management", ko: "에듀테크 프로덕트 기획" },
                        ai: { en: "AI & Learning Technology", ko: "AI & 학습 기술 개발" },
                        domain: { en: "Domain & Market", ko: "도메인 & 로컬 교육 시장" },
                        technical: { en: "Technical & Platforms", ko: "플랫폼 및 연동 기술" }
                      }
                    }[activeRole][catId];

                    return (
                      <div key={cat.id} className="space-y-1.5 print-avoid-break">
                        <div className="text-[10px] font-black uppercase tracking-wider text-accent-gold/90 print:text-black font-mono">
                          {visualLabel[locale]}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.items.map((item, iIdx) => (
                            <span 
                              key={iIdx} 
                              className={`px-2 py-0.5 rounded text-[8.5px] font-mono border ${
                                isDark 
                                  ? 'bg-neutral-900 border-white/5 text-white/80' 
                                  : 'bg-black/5 border-black/5 text-neutral-800'
                              } print:bg-slate-100 print:border-slate-300 print:text-slate-800 print:text-[8px] print:px-2.5 print:py-1 print:my-0.5 print:inline-block`}
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

    {/* PERFECT ATS-COMPLIANT PRINT VIEW */}
    <div className="hidden print:block print-document font-sans text-[#3D3D3D]" style={{ fontSize: '10pt', lineHeight: '1.5', padding: '0', margin: '0' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: portrait;
            margin: 18mm 20mm 18mm 20mm !important;
          }
          body {
            background: white !important;
            color: #3D3D3D !important;
          }
          .print-document h1 {
            font-size: 26pt !important;
            font-weight: 700 !important;
            color: #1B3A5C !important;
            margin: 0 0 2pt 0 !important;
            text-align: left !important;
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
          }
          .print-document .print-headline {
            font-size: 13pt !important;
            font-weight: 600 !important;
            color: #2E75B6 !important;
            font-style: italic !important;
            margin: 0 0 8pt 0 !important;
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
          }
          .print-document .print-contact {
            font-size: 9pt !important;
            color: #6B6B6B !important;
            margin: 0 0 14pt 0 !important;
            line-height: 1.4 !important;
            border-bottom: 1px solid #E0E0E0 !important;
            padding-bottom: 8pt !important;
          }
          .print-document h2 {
            font-size: 11pt !important;
            font-weight: 700 !important;
            color: #1B3A5C !important;
            text-transform: uppercase !important;
            border-bottom: 2px solid #2E75B6 !important;
            padding-bottom: 2pt !important;
            margin-top: 14pt !important;
            margin-bottom: 6pt !important;
            letter-spacing: 0.5px !important;
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
          }
          .print-document p {
            font-size: 10pt !important;
            color: #3D3D3D !important;
            line-height: 1.5 !important;
            margin: 0 0 8pt 0 !important;
            text-align: justify !important;
          }
          .print-document ul {
            margin-top: 4pt !important;
            margin-bottom: 8pt !important;
            padding-left: 0 !important;
            list-style: none !important;
          }
          .print-document li {
            position: relative !important;
            padding-left: 8mm !important;
            text-indent: -5mm !important;
            margin-bottom: 4pt !important;
            font-size: 10pt !important;
            color: #3D3D3D !important;
            line-height: 1.5 !important;
            text-align: justify !important;
          }
          .print-document .print-exp-item {
            margin-bottom: 12pt !important;
          }
          .print-document .print-exp-header {
            display: flex !important;
            justify-content: space-between !important;
            align-items: baseline !important;
            margin-bottom: 2pt !important;
          }
          .print-document .print-exp-title {
            font-size: 11pt !important;
            font-weight: 700 !important;
            color: #1B3A5C !important;
          }
          .print-document .print-exp-company {
            font-size: 11pt !important;
            font-weight: 700 !important;
            color: #2E75B6 !important;
          }
          .print-document .print-exp-dates {
            font-size: 9.5pt !important;
            color: #6B6B6B !important;
            font-weight: 500 !important;
          }
          .print-document .print-exp-subtitle {
            font-size: 10pt !important;
            font-weight: 600 !important;
            color: #3D3D3D !important;
            font-style: italic !important;
            margin-bottom: 4pt !important;
          }
          .print-document .print-skills-group {
            margin-bottom: 8pt !important;
            line-height: 1.4 !important;
          }
          .print-document .print-skills-label {
            font-weight: 700 !important;
            color: #1B3A5C !important;
            display: inline !important;
          }
          .print-document .print-skills-items {
            display: inline !important;
            color: #3D3D3D !important;
          }
          .print-document .print-footer {
            font-size: 9pt !important;
            color: #6B6B6B !important;
            text-align: center !important;
            margin-top: 18pt !important;
            border-top: 1px solid #E0E0E0 !important;
            padding-top: 8pt !important;
            font-style: italic !important;
          }
        }
      ` }} />

      {/* HEADER */}
      <h1>JASON BENJAMIN</h1>
      <div className="print-headline">
        {activeRole === 'pm' && "AI Product Manager — Generative AI & EdTech"}
        {activeRole === 'eng' && "AI Integration Engineer — Generative AI Systems & LLM Pipelines"}
        {activeRole === 'edtech' && "EdTech Product Manager — AI-Powered Learning Systems & Curriculum"}
      </div>
      <div className="print-contact">
        jsn.benjamin@gmail.com · 010 5371 9266 · Seoul, South Korea (Open to Remote) · jason-portfolio-live.vercel.app
      </div>

      {/* PROFESSIONAL PROFILE */}
      <h2>{locale === 'en' ? "Professional Profile" : "전문가 프로필 개요"}</h2>
      <p>
        {activeRole === 'pm' && (locale === 'en' 
          ? "AI Product Manager with enterprise B2B SaaS experience, five production AI products shipped, and a decade of education domain expertise that makes every product decision defensible. Proven track record defining AI product strategy, authoring product briefs, and shipping generative AI features that deliver measurable outcomes: 80% reduction in administrative workloads, scheduling automation cutting 40 hours to under 10 minutes, and enterprise B2B conversational AI coaching deployed to Tier-1 clients. Experienced across the full AI product lifecycle — from 'Wizard of Oz' validation to multi-phase roadmap execution and stateful enterprise cloud architecture."
          : "B2B SaaS 도입 이력과 5개 상용화 인공지능 제품 출시 경험을 지닌 AI 프로덕트 매니저이자, 교육 결정을 단단하게 입증하는 10년의 도메인 노하우를 갖춘 기획자입니다. 제품 전략 기획, 제품 요구서(PRD) 작성, 그리고 학사 업무 80% 소거, 40시간 소요 시간표 수립 업무를 10분 내 자동화, 대기업(Tier-1) 배포용 대화형 AI 세일즈 코칭 플랫폼 구현 등 괄목할 성과를 창출해냈습니다. 'Wizard of Oz' 실증 프로토타입부터 다단계 고신뢰 배포 로드맵 및 클라우드 아키텍처 사양 수립까지 전체 라이프사이클을 리드합니다.")}
        {activeRole === 'eng' && (locale === 'en' 
          ? "AI Integration Engineer with enterprise B2B SaaS experience and five production generative AI systems shipped — specialising in deterministic AI architecture, LLM pipeline design, structured output enforcement, and privacy-first deployment. Built and deployed end-to-end AI systems across enterprise conversational coaching platforms, multi-tenant B2B portals, consumer mobile applications, and real-time assessment platforms — using Gemini, Claude, Make.com, Firebase, and a full React/TypeScript/Express stack."
          : "기업용 B2B SaaS 환경에서 5개의 상용 거대언어모델(LLM) 시스템을 성공적으로 배포한 AI 인티그레이션 엔지니어입니다. 환각을 원천 배제하는 결정론적 평가 아키텍처 수립, 복합 프롬프트 매트릭스 설계, 정형 JSON 구조 보정 및 프라이버시 우선(COPPA) 설계에 높은 강점이 있습니다. 대화형 AI 코칭 서비스, 멀티테넌트 B2B SaaS, 모바일 앱 환경, 실시간 교육 진단 제품 전반의 엔드투엔드 AI 파이프라인을 React, TypeScript, Express, Firebase, Supabase, Make.com을 바탕으로 완벽히 통제 설계합니다.")}
        {activeRole === 'edtech' && (locale === 'en' 
          ? "EdTech Product Manager with a Master of Education in Educational Management, enterprise B2B AI SaaS experience, and 10+ years of domain expertise inside South Korean classrooms and academies. Uniquely positioned at the intersection of pedagogy and product — designed instructional logic models for enterprise sales coaching, shipped a consumer AI homework assistant to the App Store, and built a school-wide assessment platform mapped to CEFR and Cambridge YLE standards. Track record includes 80% administrative workload reduction, scheduling automation from 40 hours to 10 minutes, and AI coaching deployed to Tier-1 enterprise clients."
          : "교육행정경영학 석사 학위와 국내 K-12 어학원 시장에서의 10년의 도메인 경험을 지닌 에듀테크 특화 프로덕트 매니저입니다. 교수법과 제품 설계를 융합하여 세일즈 행동 정량 평가 모델 설계, 모바일 앱스토어용 아동용 AI 과제 도우미 론칭, 공인 국제 진단(CEFR / Cambridge YLE) 매핑 대시보드 구축을 기획 주도했습니다. 학사 문서 부담 80% 전격 절감, 조합 연산 자동화(40시간에서 10분), 그리고 1티어 대기업 파트너를 위한 B2B AI 솔루션 연동 등 실질 비즈니스 지표를 도출했습니다.")}
      </p>

      {/* CORE COMPETENCIES */}
      <h2>{locale === 'en' ? "Core Competencies" : "직무 기술 핵심 역량"}</h2>
      <div style={{ marginBottom: '12pt' }}>
        {config.skillsOrder.map((catId) => {
          const cat = SKILLS.find(s => s.id === catId);
          if (!cat) return null;

          const visualLabel = {
            pm: {
              pm: { en: "Product Management", ko: "프로덕트 매니지먼트" },
              ai: { en: "Generative AI & LLM", ko: "생성형 AI & LLM" },
              technical: { en: "Technical & Tooling", ko: "기술 및 도구" },
              domain: { en: "Domain", ko: "도메인 분야" }
            },
            eng: {
              ai: { en: "AI & LLM Engineering", ko: "AI & LLM 엔지니어링" },
              technical: { en: "Technical & Tooling", ko: "기술 및 개발 스택" },
              pm: { en: "Automation & Integration", ko: "오토메이션 & 시스템 연동" },
              domain: { en: "Security & Compliance", ko: "보안 & 컴플라이언스" }
            },
            edtech: {
              pm: { en: "EdTech Product Management", ko: "에듀테크 프로덕트 기획" },
              ai: { en: "AI & Learning Technology", ko: "AI & 학습 기술 개발" },
              domain: { en: "Domain & Market", ko: "도메인 & 로컬 교육 시장" },
              technical: { en: "Technical & Platforms", ko: "플랫폼 및 연동 기술" }
            }
          }[activeRole][catId][locale];

          return (
            <div key={cat.id} className="print-skills-group">
              <div className="print-skills-label">{visualLabel}: </div>
              <div className="print-skills-items">{cat.items.join(', ')}</div>
            </div>
          );
        })}
      </div>

      {/* PROFESSIONAL EXPERIENCE */}
      <h2>{locale === 'en' ? "Professional Experience" : "경력 사항"}</h2>

      {/* 1. VodaBi SaaS Startup */}
      <div className="print-exp-item">
        <div className="print-exp-header">
          <div>
            <span className="print-exp-title">
              {activeRole === 'pm' ? (locale === 'en' ? "AI Product Manager (Internship)" : "AI 프로덕트 매니저 (인턴십)") :
               activeRole === 'eng' ? (locale === 'en' ? "AI Integration Engineer (Internship)" : "AI 인티그레이션 엔지니어 (인턴십)") :
               (locale === 'en' ? "EdTech Product Manager (Internship)" : "에듀테크 프로덕트 매니저 (인턴십)")}
            </span>
            <span style={{ color: '#2E75B6', fontWeight: 700 }}> — </span>
            <span className="print-exp-company">VodaBi SaaS Startup</span>
          </div>
          <span className="print-exp-dates">{locale === 'en' ? "July 2026 – Present" : "2026년 7월 – 현재"}</span>
        </div>
        <div className="print-exp-subtitle">
          {locale === 'en' 
            ? "Lead product architect for an enterprise B2B conversational AI and automated evaluation platform" 
            : "엔터프라이즈 B2B 대화형 AI 및 자동 평가 플랫폼 개발 리드 프로덕트 아키텍트"}
        </div>
        <ul>
          {VODABI_ROLE_BULLETS[activeRole].map((bullet, idx) => (
            <li key={idx}>– {bullet[locale]}</li>
          ))}
        </ul>
      </div>

      {/* 2. Chekki EdTech Solutions */}
      <div className="print-exp-item">
        <div className="print-exp-header">
          <div>
            <span className="print-exp-title">{locale === 'en' ? "Founder & AI Lead" : "창업자 및 AI 리드"}</span>
            <span style={{ color: '#2E75B6', fontWeight: 700 }}> — </span>
            <span className="print-exp-company">Chekki EdTech Solutions</span>
          </div>
          <span className="print-exp-dates">{locale === 'en' ? "Jan 2024 – Present" : "2024년 1월 – 현재"}</span>
        </div>
        <div className="print-exp-subtitle">
          {locale === 'en' 
            ? "Six-product AI-powered software suite tailored for educational command channels" 
            : "한국 영어 어학원 및 유치원 시장 고도화를 목표로 하는 6대 독자적 AI 시스템 구축 프로젝트 총괄"}
        </div>
        <ul>
          {locale === 'en' ? (
            <>
              <li>– Chekki B2B Command Center — Enterprise SaaS Portal: Defined AI product strategy and roadmap for a multi-tenant B2B portal to eliminate 15 or more hours of weekly administrative overhead across language academy networks through automated generative AI reporting pipelines; shipped Role-Based Access Control and Magic Link authentication; designed and launched an AI agent pipeline using Make.com and Google Gemini that processes exception-first observations into culturally nuanced bilingual consultation notes, driving an 80% workload reduction.</li>
              <li>– Chekki AI — Consumer Mobile Application: Led end-to-end product lifecycle for a bilingual AI mobile web application on the Apple App Store, targeting Korean families and ESL teachers; defined and executed a zero-storage privacy architecture as a core product requirement, eliminating retention of sensitive child data and ensuring full compliance with App Store safety regulations and child data privacy standards.</li>
              <li>– Learning Diary — Student Portfolio Compiler: Defined product vision and shipped touch-screen 'Tag and Commit' AI portfolio tool; designed Dynamic Tenant Theming allowing directors to configure custom HEX branding and localized font sets; built zero-trust multi-tenant PostgreSQL Supabase RLS database; shipped in-browser @react-pdf/renderer compilation pipeline with Google Gemini 1.5 Flash, synthesizing teacher tags into bilingual micro-narratives client-side, eliminating cloud media exposure risk.</li>
              <li>– EduPlanner Pro — AI Scheduling Engine: Shipped an automated school scheduling engine; designed 'Draft and Weave' two-stage LLM pipeline: Gemini Flash resolves baseline schedule conflicts with a fast generative pass, with recursive fallback to Gemini Pro for targeted constraint recalculation, enabling fully optimized timetables without human intervention.</li>
              <li>– Benchmark AI — Continuous ESL Assessment Suite: Shipped a responsive continuous assessment platform that maps real-time student mastery growth to international standards (CEFR / Cambridge YLE), enabling early academic intervention before attrition risk escalates; defined KPIs around mastery progression velocity and early warning trigger accuracy.</li>
              <li>– B2B Lead Generator — Sales CRM & Outreach Engine: Shipped a B2B sales tool parsing unstructured regional directory data and leveraging Gemini AI to produce hyper-personalized outreach campaigns, scaling ESL client acquisition without additional sales headcount.</li>
            </>
          ) : (
            <>
              <li>– Chekki B2B Command Center (엔터프라이즈 SaaS 포털): 어학원 지점들의 행정 오버헤드를 매주 15시간 제거하는 멀티테넌트 B2B SaaS 포털 AI 로드맵 기획; 원장과 소속 강사 영역 보호를 위한 Supabase RBAC 및 패스워드리스 로그인 구축; 일일 활동 기록에서 관찰 지점을 수합해 영한 정교한 이중언어 상담 보고서를 가공 전송하는 Make.com 및 Gemini 에이전트 설계로 문서 오버헤드 80% 감소.</li>
              <li>– Chekki AI (소비자 지향 모바일 앱): 한국 영어유치원생 가정과 원어민 강사를 타겟으로 한 모바일 모바일 웹앱 제품 전 과정 기획 개발 및 정식 출시 주도; 민감 아동 음성 및 텍스트 데이터를 수집 및 저장하지 않는 제로-스토리지 프라이버시 아키텍처를 실질 정의하여 개인정보보호법(COPPA) 심사 완벽 통과.</li>
              <li>– Learning Diary (패키징형 포트폴리오 생성기): 원어민 교사용 터치 식 학업 평가 'Tag & Commit' 태깅 모듈 출시; HEX 기반 테넌트 테밍과 Noto Sans 국영문 글꼴 동적 바인딩 기획; PostgreSQL RLS 행 보안 정책 기획; @react-pdf/renderer와 Gemini 1.5 Flash를 융합 연동해 아동 프라이버시 보호를 위한 완전 브라우저 구동형 PDF 이중언어 포트폴리오 빌더 탑재.</li>
              <li>– EduPlanner Pro (AI 스케줄링 자원 배치 엔진): 학원 일정 충돌을 실시간 예방 예약하는 스케줄 자원 배치 엔진 총괄 주도; 속도가 빠른 Gemini Flash가 뼈대를 생성하고, 조건 충돌 발생 시 소량의 Gemini Pro를 재귀 호출 보정하는 'Draft & Weave' 2단계 프롬프트 오케스트레이션 설계로 일정 배치 작업 리소스 40시간에서 10분 단축.</li>
              <li>– Benchmark AI (상시 정량 진단 정밀 실증 도구): 상시 음성 숙련도 및 진단 점수를 공인 국제 지수(CEFR / Cambridge YLE)에 동적 매핑하는 반응형 대시보드 구축, 원생 학습 정체 곡선 조기 확인 경보 시스템 구축을 통한 이탈율 완전 방어 및 학원 핵심 고정 매출 유지.</li>
              <li>– B2B Lead Generator (CRM 타겟 분석 오토메이션): 공공 교육 디렉터리를 파싱 및 정제하여 정형화된 리드로 구조화하고, 지능형 Gemini AI를 지휘해 원장 맞춤 소구점을 가미한 세일즈 자동 메일을 대량 생산하는 자동화 영업 크롤 엔진 구축.</li>
            </>
          )}
        </ul>
      </div>

      {/* 3. Blend ENG Academy */}
      <div className="print-exp-item">
        <div className="print-exp-header">
          <div>
            <span className="print-exp-title">{labels.blendAcademy.split(' · ')[0]}</span>
            <span style={{ color: '#2E75B6', fontWeight: 700 }}> — </span>
            <span className="print-exp-company">Blend ENG Academy</span>
          </div>
          <span className="print-exp-dates">{labels.blendPeriod}</span>
        </div>
        <div className="print-exp-subtitle">{labels.blendSub}</div>
        <ul>
          {config.academyBulletOrder.map((bulletIdx) => {
            const bullet = BLEND_ACADEMY_BULLETS[bulletIdx];
            return (
              <li key={bulletIdx}>– {bullet[locale]}</li>
            );
          })}
        </ul>
      </div>

      {/* 4. YBM PSA Seocho */}
      <div className="print-exp-item">
        <div className="print-exp-header">
          <div>
            <span className="print-exp-title">{labels.ybmAcademy.split(' · ')[0]}</span>
            <span style={{ color: '#2E75B6', fontWeight: 700 }}> — </span>
            <span className="print-exp-company">YBM PSA Seocho</span>
          </div>
          <span className="print-exp-dates">{labels.ybmPeriod}</span>
        </div>
        <div className="print-exp-subtitle">{labels.ybmSub}</div>
        <ul>
          <li>– {labels.ybmBullet}</li>
        </ul>
      </div>

      {/* EDUCATION */}
      <h2>{locale === 'en' ? "Education" : "학력 사항"}</h2>
      <div className="print-exp-item">
        <div className="print-exp-header">
          <div>
            <span className="print-exp-title">University of Essex</span>
            <span style={{ color: '#6B6B6B', fontWeight: 500 }}> — Colchester, United Kingdom</span>
          </div>
          <span className="print-exp-dates">May 2022</span>
        </div>
        <div className="print-exp-subtitle" style={{ fontStyle: 'normal', fontWeight: 500 }}>
          {locale === 'en' ? "Master of Education in Educational Management" : "교육학 석사 — 교육 경영학 석사"}
        </div>
      </div>
      <div className="print-exp-item" style={{ marginTop: '6pt' }}>
        <div className="print-exp-header">
          <div>
            <span className="print-exp-title">University of the Western Cape</span>
            <span style={{ color: '#6B6B6B', fontWeight: 500 }}> — Cape Town, South Africa</span>
          </div>
          <span className="print-exp-dates">Dec 2013</span>
        </div>
        <div className="print-exp-subtitle" style={{ fontStyle: 'normal', fontWeight: 500 }}>
          {locale === 'en' ? "Bachelor of Commercial Law" : "상법 학사 (Bachelor of Commercial Law)"}
        </div>
      </div>

      {/* PRINT FOOTER TAGLINE */}
      <div className="print-footer">
        {activeRole === 'pm' && (locale === 'en' 
          ? "Open to AI PM, AI product strategy, and EdTech product leadership roles (remote)"
          : "AI PM, AI 제품 전략, 그리고 에듀테크 제품 리더십 역할 제안을 환영합니다 (원격 근무 선호)")}
        {activeRole === 'eng' && (locale === 'en' 
          ? "Open to AI integration, LLM pipeline engineering, and AI automation roles (remote)"
          : "AI 시스템 연동, LLM 파이프라인 엔지니어링, AI 오토메이션 관련 협업 기회를 환영합니다 (원격 근무 선호)")}
        {activeRole === 'edtech' && (locale === 'en' 
          ? "Open to EdTech PM, curriculum technology, and AI-in-education roles (remote)"
          : "에듀테크 PM, 커리큘럼 기술 설계, 교육 분야 AI 시스템 구축 관련 협업 기회를 환영합니다 (원격 근무 선호)")}
      </div>
    </div>
  </div>
  );
}

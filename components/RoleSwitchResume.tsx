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

const VODABI_BULLETS: { category: { en: string; ko: string }; en: string; ko: string; weight: Record<ActiveRole, number> }[] = [
  {
    category: { en: "Product Strategy & UX Leadership", ko: "제품 전략 및 UX 리더십" },
    en: "Spearheaded Product Vision: Authored the core product brief and directed the pivot from a legacy, analytics-heavy dashboard to a clean, 3-step interactive AI context aware coaching widget (Role Selection ➝ Upload ➝ Chat), significantly reducing user cognitive load.",
    ko: "제품 비전 주도: 핵심 제품 브리프 작성 및 데이터가 무거운 기존 대시보드에서 3단계(역할 선택 ➝ 업로드 ➝ 채팅) 대화형 대안 AI 맥락 인지 코칭 위젯으로의 피봇 지휘, 사용자 인지 부하 대폭 감축.",
    weight: { pm: 5, eng: 2, edtech: 4 }
  },
  {
    category: { en: "Product Strategy & UX Leadership", ko: "제품 전략 및 UX 리더십" },
    en: "Phased Product Roadmap: Mapped and executed a multi-phase deployment strategy, securing immediate stakeholder ROI with a lightweight, stateless MVP before architecting the transition to a stateful, enterprise-grade cloud ecosystem.",
    ko: "단계별 제품 로드맵: 다단계 배포 전략을 수립하여 가벼운 비상태형 MVP로 이해관계자에게 즉각적인 ROI를 증명하고, 상태형 엔터프라이즈급 클라우드 에코시스템 전환 설계.",
    weight: { pm: 5, eng: 1, edtech: 3 }
  },
  {
    category: { en: "AI Architecture & Prompt Engineering", ko: "AI 아키텍처 및 프롬프트 엔지니어링" },
    en: "Engineered Coaching Frameworks: Designed the pedagogical 'Fact-Impact-Fix' logic model, successfully transforming rigid, integer-based scoring rubrics into empathetic, actionable micro-learning interventions.",
    ko: "코칭 프레임워크 구축: 교육학적 'Fact-Impact-Fix' 논리 모델 설계, 엄격한 숫자 기반 채점표를 공감형이고 조치 가능한 마이크로 러닝 중재 프레임워크로 혁신 변환.",
    weight: { pm: 4, eng: 3, edtech: 5 }
  },
  {
    category: { en: "AI Architecture & Prompt Engineering", ko: "AI 아키텍처 및 프롬프트 엔지니어링" },
    en: "Dynamic Prompt Integration: Partnered with research teams to translate a complex keyword data dictionary into a dynamic, 4-persona LLM system prompt matrix. Strategized the ingestion of proprietary B2B sales telemetry into the LLM context window to generate highly personalized feedback.",
    ko: "동적 프롬프트 연동: 리서치 부서와 협력하여 복잡한 키워드 사전 사양을 동적인 4개 페르소나 LLM 시스템 프롬프트 매트릭스로 변환하고, 자체 B2B 영업 텔레메트리 데이터를 LLM 컨텍스트 윈도우에 연동하여 고도로 맞춤화된 피드백 기획.",
    weight: { pm: 4, eng: 4, edtech: 2 }
  },
  {
    category: { en: "AI Architecture & Prompt Engineering", ko: "AI 아키텍처 및 프롬프트 엔지니어링" },
    en: "Hybrid Evaluation Architecture: Designed a deterministic evaluation framework that decoupled immutable behavioral scoring from dynamic, client-defined compliance matrices, effectively eliminating LLM hallucinations and ensuring enterprise trust.",
    ko: "하이브리드 평가 아키텍처: 불변 행동 평가 점수와 동적 고객 맞춤형 컴플라이언스 매트릭스를 완벽 분리하는 결정론적 평가 프레임워크 설계, LLM 환각(hallucination)을 근본 방지하여 기업 신뢰도 확보.",
    weight: { pm: 3, eng: 5, edtech: 1 }
  },
  {
    category: { en: "AI Architecture & Prompt Engineering", ko: "AI 아키텍처 및 프롬프트 엔지니어링" },
    en: "Enterprise AI Guardrails: Established strict compliance protocols ensuring the LLM operated securely within proprietary boundaries, restricting outputs to concise, high-impact bursts, and preventing hallucinated business decisions.",
    ko: "엔터프라이즈 AI 가드레일: 자체 정보 보호 경계 내에서 LLM이 안전하게 작동하도록 엄격한 규격 준수 프로토콜을 정립하여, 출력을 간결하고 압축된 고임팩트 형태로 제어하며 잘못된 비즈니스 판단을 차단.",
    weight: { pm: 3, eng: 5, edtech: 2 }
  },
  {
    category: { en: "Cross-Functional Execution & Technical Scoping", ko: "교차 기능 실행 및 기술 스코핑" },
    en: "Prototyping & Validation: Designed and executed a 'Wizard of Oz' prototyping demonstration to validate frontend UX and backend conversational logic with executive stakeholders prior to full database integration.",
    ko: "프로토타이핑 및 검증: 데이터베이스 전면 연동 이전에 경영진 등 핵심 이해관계자들을 대상으로 프론트엔드 UX 및 백엔드 대화 로직을 입증하는 'Wizard of Oz' 프로토타입 시연 기획 및 성공적 수행.",
    weight: { pm: 4, eng: 3, edtech: 4 }
  },
  {
    category: { en: "Cross-Functional Execution & Technical Scoping", ko: "교차 기능 실행 및 기술 스코핑" },
    en: "Zero-Day Deployment Pipeline: Architected a webhook-driven backend logic pipeline using Make.com and Airtable. This enabled administrators to deploy instant, 'zero-day' scenario updates without requiring backend developer intervention.",
    ko: "제로데이 배포 파이프라인: Make.com 및 Airtable을 연동한 웹훅 기반 백엔드 로직 설계, 개발자 개입 없이 관리자가 즉각적으로 코칭 시나리오를 배포할 수 있는 '제로데이' 운영 유연성 수립.",
    weight: { pm: 4, eng: 4, edtech: 3 }
  },
  {
    category: { en: "Cross-Functional Execution & Technical Scoping", ko: "교차 기능 실행 및 기술 스코핑" },
    en: "Engineering Alignment: Defined strict JSON data contracts, state management flows, and API routing logic to guide UI/UX designers and AWS engineers in translating complex LLM behaviors into production code.",
    ko: "엔지니어링 사양 정렬: 정교한 LLM 동작 모델이 안전한 프론트 UI 및 AWS 인프라 환경에서 작동하도록 JSON 데이터 규격 계약, 상태 관리 흐름, API 라우팅 스펙 정의 및 전달.",
    weight: { pm: 3, eng: 5, edtech: 1 }
  },
  {
    category: { en: "Cross-Functional Execution & Technical Scoping", ko: "교차 기능 실행 및 기술 스코핑" },
    en: "GTM & Client Enablement: Aligned the AI coaching features directly to existing revenue-generating reports and provided strategic positioning materials to successfully support high-stakes B2B sales demonstrations for Tier-1 enterprise clients.",
    ko: "GTM 및 파트너 영업 활성화: 개발된 AI 코칭 기능을 기존 유료 리포트 지표들과 직결시키고, 1티어 대기업 파트너를 위한 고성공율 B2B 세일즈 데모용 핵심 가이드와 포지셔닝 머티리얼 지원.",
    weight: { pm: 5, eng: 2, edtech: 4 }
  }
];

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
      en: "JASON BENJAMIN — AI Product Manager · EdTech Founder",
      ko: "제이슨 벤자민 — AI 프로덕트 매니저 · 에듀테크 지향 전문가"
    },
    profileText: {
      en: "AI Product Manager and EdTech founder with a proven track record of shipping enterprise B2B conversational SaaS, multi-persona coaching agents, and educational technology products. Adept at leading product vision, authoring product briefs, and designing interactive widgets that drastically reduce cognitive load. Uniquely positioned at the intersection of bilingual EdTech product design, generative AI integration, and cross-functional leadership — with hands-on experience across the full AI product lifecycle: from initial discovery and 'Wizard of Oz' validation to automated webhook pipelines and database scoping.",
      ko: "엔터프라이즈 B2B 대화형 AI SaaS 및 자동 평가 코칭 플랫폼을 설계하는 AI 프로덕트 매니저이자 에듀테크 창업가입니다. 핵심 제품 비전 및 사양 수립, 초기 무상태성 MVP 설계부터 다단계 배포 전략을 거쳐 상태형 클라우드 에코시스템 설계까지 이끌었습니다. 한국 교육 현장에서의 10년 경력과 다국어 마켓 현지화 제품 기획, 정교한 4개 페르소나 LLM 동작 모델링, 그리고 Make.com/Airtable을 활용한 제로데이 배포 파이프라인 설계를 통해 비즈니스 임팩트를 확보해 왔습니다."
    },
    skillsOrder: ["pm", "ai", "domain", "technical"],
    academyBulletOrder: [0, 1, 2] // scheduling system, assessment system, textbook authoring
  },
  eng: {
    title: {
      en: "JASON BENJAMIN — AI Integration Engineer · Solutions Architect",
      ko: "제이슨 벤자민 — AI 인티그레이션 엔지니어 · 클라우드 솔루션 아키텍트"
    },
    profileText: {
      en: "Technical solutions architect and AI integration engineer specializing in full-stack LLM orchestration, enterprise B2B conversational AI, and secure serverless logic pipelines. Experienced in designing deterministic evaluation frameworks that decouple behavioral scoring from client compliance to eliminate hallucinations, and managing JSON data contracts for high-trust environments. Proven track record of architecting scalable webhook-driven pipelines (Make.com, Airtable, AWS) and robust database/RLS security policies, bridging the gap between complex LLM behaviors and production code.",
      ko: "대형 언어 모델(LLM) 오케스트레이션, 복합 프롬프트 매트릭스 설계, 그리고 결정론적 평가 하이브리드 아키텍처 구축을 전문으로 하는 기술 솔루션 아키텍트이자 AI 인티그레이션 엔지니어입니다. VodaBi SaaS의 프론트엔드 UX 및 백엔드 로직 검증용 프로토타입 시연, Make.com과 Airtable을 연동한 웹훅 기반 제로데이 배포 파이프라인, 그리고 엄격한 JSON 데이터 규격 계약 및 API 라우팅을 설계하여 고도의 성능과 기업 보안 컴플라이언스를 충족합니다."
    },
    skillsOrder: ["technical", "ai", "pm", "domain"],
    academyBulletOrder: [1, 0, 2] // assessment system, scheduling system, textbook authoring
  },
  edtech: {
    title: {
      en: "JASON BENJAMIN — EdTech Product Manager · EFL Academic Director",
      ko: "제이슨 벤자민 — 에듀테크 프로덕트 매니저 · EFL 교육 과정 총괄 디렉터"
    },
    profileText: {
      en: "Bilingual EdTech product specialist and EFL director with a decade of educational leadership in South Korea, specializing in converting complex pedagogical frameworks into actionable AI features. Designed the 'Fact-Impact-Fix' logic model to turn traditional grading rubrics into empathetic micro-learning interventions, reducing cognitive load. Expert in international standard indices (CEFR / Cambridge YLE), bilingual product localization, and cross-functional GTM strategies that align state-of-the-art AI coaching tools with commercial revenue goals and tier-1 B2B client needs.",
      ko: "국내 교육 시장에서 10년 이상 영어 교육 과정 및 학원 운영을 총괄한 에듀테크 제품 전문가이자 EFL 디렉터입니다. 학원 현장에서 요구하는 평가 기준(CEFR/Cambridge YLE)을 제품에 정밀 적용하고, 엄격한 채점 방식을 공감형 마이크로 러닝 인터벤션으로 구현하는 'Fact-Impact-Fix' 교육학적 AI 코칭 모델을 설계하였습니다. 한국어-영어 다국어 제품 현지화 설계, 아동 개인정보 규제(COPPA) 준수 제품 고안, 그리고 개발된 AI 기능을 기업 고객 대상 B2B 세일즈 및 유료 성과 리포트로 매끄럽게 연동하는 GTM 전략을 주도합니다."
    },
    skillsOrder: ["domain", "pm", "ai", "technical"],
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
                  
                  {/* VODABI EXPERIENCE BLOCK */}
                  <div className="p-3.5 rounded-xl border border-accent-gold/35 bg-accent-gold/[0.03] shadow-[0_2px_12px_rgba(212,163,89,0.08)] print-avoid-break print-card">
                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <span className="text-[11.5px] font-black uppercase text-accent-gold print:text-black flex items-center gap-1.5 font-display">
                          <span>🚀</span> {locale === 'en' ? "AI Product Manager (Internship) · VodaBi SaaS Startup" : "AI 프로덕트 매니저 (인턴십) · VodaBi SaaS 스타트업"}
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
                      {VODABI_BULLETS
                        .filter(bullet => bullet.weight[activeRole] >= 3)
                        .sort((a, b) => b.weight[activeRole] - a.weight[activeRole])
                        .slice(0, 4)
                        .map((bullet, idx) => (
                          <li 
                            key={idx} 
                            className={`text-[10.5px] leading-relaxed font-light ${isDark ? 'text-white/70' : 'text-neutral-800'} print:text-black print:text-[9px] indent-[-0.75rem] pl-3`}
                          >
                            <span className="font-bold text-accent-gold/90 print:text-black/80 font-mono text-[9px] uppercase mr-1.5">
                              [{bullet.category[locale]}]
                            </span>
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
  );
}

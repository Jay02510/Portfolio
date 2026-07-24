import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export type ActiveRole = 'pm' | 'edtech' | 'eng';

interface ResumeProps {
  locale: 'en' | 'ko';
  theme: 'light' | 'dark';
  activeRole?: ActiveRole;
  onRoleChange?: (role: ActiveRole) => void;
}

// SECTION 2 — ROLE TITLES
export const ROLE_TITLES: Record<ActiveRole, { en: string; ko: string }> = {
  pm: {
    en: "AI Product Manager — Generative AI & B2B SaaS",
    ko: "AI 프로덕트 매니저 — 생성형 AI & B2B SaaS"
  },
  edtech: {
    en: "EdTech Product Manager — AI-Powered Learning Systems · MEd",
    ko: "에듀테크 프로덕트 매니저 — AI 기반 학습 시스템 · 교육학 석사"
  },
  eng: {
    en: "AI Integration Engineer — LLM Pipelines, Automation & Cloud Infrastructure",
    ko: "AI 인티그레이션 엔지니어 — LLM 파이프라인, 오토메이션 & 클라우드 인프라"
  }
};

// SECTION 3 — PROFILES
const PROFILES: Record<ActiveRole, { en: string; ko: string }> = {
  pm: {
    en: "AI Product Manager with enterprise B2B SaaS experience at VodaBi and six production AI products shipped independently — with measurable outcomes: 80% reduction in administrative workloads, scheduling automation from 40 hours to under 10 minutes, and a deterministic AI evaluation framework deployed to Tier-1 enterprise clients. Experienced across the full AI product lifecycle: product brief authorship, roadmap execution, LLM pipeline design, go-to-market strategy, and cross-functional engineering handover. Based in Seoul, bilingual EN/KR, open to remote.",
    ko: "VodaBi에서의 엔터프라이즈 B2B SaaS 경험과 독립적으로 배포한 6개의 상용 AI 제품을 보유한 AI 프로덕트 매니저입니다. 행정 업무량 80% 절감, 시간표 자동화를 40시간에서 10분 미만으로 단축, Tier-1 엔터프라이즈 고객사에 배포된 결정론적 AI 평가 프레임워크 구축 등 측정 가능한 성과를 도출했습니다. 제품 사양서(Product Brief) 작성, 로드맵 실행, LLM 파이프라인 설계, Go-To-Market 전략 및 개발팀과의 교차 기능 핸드오버 등 AI 제품 라이프사이클 전반에 걸친 경험을 보유하고 있습니다. 서울 기반, 영/한 이중언어 제공, 원격 근무 가능."
  },
  edtech: {
    en: "EdTech Product Manager with a Master of Education in Educational Management, enterprise B2B AI SaaS experience at VodaBi, and six live AI products built for the South Korean education market. Uniquely positioned at the intersection of pedagogy and product: designed instructional logic models for enterprise AI coaching, shipped a curriculum-aware teacher tool that eliminates AI hallucinations in live classroom use, and built a real-time assessment platform mapped to CEFR and Cambridge YLE standards. Track record includes 80% administrative workload reduction and enterprise AI coaching deployed to Tier-1 clients.",
    ko: "교육경영학 석사 학위, VodaBi에서의 엔터프라이즈 B2B AI SaaS 경험, 한국 교육 시장을 위해 구축된 6개의 라이브 AI 제품을 보유한 에듀테크 프로덕트 매니저입니다. 교수법과 제품 설계의 교차점에 특화되어 있으며, 엔터프라이즈 AI 코칭을 위한 교수법적 로직 모델 설계, 실시간 교실 환경에서 AI 환각을 방지하는 커리큘럼 기반 교사용 도구 출시, CEFR 및 Cambridge YLE 표준에 매핑된 실시간 진단 평가 플랫폼 구축을 이끌었습니다. 행정 업무량 80% 절감 및 Tier-1 고객 대상 엔터프라이즈 AI 코칭 배포 성과를 도출했습니다."
  },
  eng: {
    en: "AI Integration Engineer with enterprise B2B SaaS experience and six production AI systems shipped — specialising in LLM pipeline architecture, deterministic AI design, cloud infrastructure, and privacy-first deployment. Built and deployed end-to-end AI systems across enterprise coaching platforms, multi-tenant B2B portals, and real-time assessment tools. Hands-on across the full stack: from Gemini and Claude prompt engineering and Make.com agent pipelines, to AWS EC2 provisioning, Nginx reverse proxy configuration, NestJS backends, and Supabase RLS databases. Delivered measurable outcomes: 80% workload reduction via automated AI pipelines and scheduling automation from 40 hours to under 10 minutes.",
    ko: "엔터프라이즈 B2B SaaS 경험과 6개의 상용 AI 시스템 배포 경험을 지닌 AI 인티그레이션 엔지니어입니다. LLM 파이프라인 아키텍처, 결정론적 AI 설계, 클라우드 인프라 구축, 프라이버시 우선 배포에 특화되어 있습니다. 엔터프라이즈 코칭 플랫폼, 멀티테넌트 B2B 포털, 실시간 진단 도구 전반에 걸친 엔드투엔드 AI 시스템을 구축/배포했습니다. Gemini/Claude 프롬프트 엔지니어링, Make.com 에이전트 파이프라인부터 AWS EC2 프로비저닝, Nginx 리버스 프록시 설정, NestJS 백엔드, Supabase RLS DB까지 풀스택 엔지니어링을 수행하며, 자동화 파이프라인을 통한 80% 업무 절감 및 40시간 소요 스케줄링의 10분 미만 자동화 성과를 창출했습니다."
  }
};

// SECTION 4 — SKILLS (Two rows per role)
export interface SkillRow {
  label: { en: string; ko: string };
  items: string[];
}

const SKILLS_BY_ROLE: Record<ActiveRole, [SkillRow, SkillRow]> = {
  pm: [
    {
      label: { en: "Product Strategy & Execution", ko: "프로덕트 전략 & 실행" },
      items: [
        "AI Product Strategy", "Product Roadmap", "Acceptance Criteria", "Go-to-Market",
        "B2B SaaS", "Enterprise AI SaaS", "Multi-Tenant Architecture", "RBAC", "Agile",
        "OKRs", "Stakeholder Management", "UX Cognitive Load Reduction", "Sales Enablement"
      ]
    },
    {
      label: { en: "AI & LLM Architecture", ko: "AI & LLM 파이프라인" },
      items: [
        "Generative AI", "LLM Integration", "Prompt Engineering", "Gemini AI", "Claude AI",
        "Deterministic AI Architecture", "Hallucination Mitigation", "Structured Output Enforcement",
        "AI Guardrails", "Persona Matrix Design", "Bilingual AI", "Make.com", "Airtable"
      ]
    }
  ],
  edtech: [
    {
      label: { en: "EdTech Product Management", ko: "에듀테크 프로덕트 기획" },
      items: [
        "EdTech Strategy", "Product Roadmap", "Learning Experience Design", "Instructional Design",
        "Curriculum Architecture", "Go-to-Market", "B2B SaaS", "Enterprise AI SaaS", "Agile",
        "OKRs", "Stakeholder Management", "UX Cognitive Load Reduction", "Sales Enablement"
      ]
    },
    {
      label: { en: "AI & Learning Technology", ko: "AI & 학습 기술 연동" },
      items: [
        "Generative AI", "LLM Integration", "Prompt Engineering", "Deterministic AI Architecture",
        "Hallucination Mitigation", "AI-Assisted Assessment", "CEFR Standards", "Cambridge YLE",
        "Gemini AI", "Claude AI", "Bilingual AI", "Structured Output Enforcement", "Make.com", "Airtable"
      ]
    }
  ],
  eng: [
    {
      label: { en: "AI & LLM Engineering", ko: "AI & LLM 엔지니어링" },
      items: [
        "Generative AI", "LLM Integration", "Multi-Model Pipeline Orchestration", "Prompt Engineering",
        "Deterministic AI Architecture", "Hallucination Mitigation", "Structured JSON Schema Enforcement",
        "Prompt Injection Hardening", "AI Guardrails", "Persona Matrix Design", "Context Window Optimisation",
        "Gemini AI", "Claude AI", "Google AI Studio", "Make.com", "Bilingual AI"
      ]
    },
    {
      label: { en: "Technical & Cloud Stack", ko: "기술 및 풀스택 인프라" },
      items: [
        "React", "TypeScript", "Node.js 24", "NestJS v11", "Express.js", "Firebase",
        "Supabase (PostgreSQL, RLS)", "MariaDB", "AWS EC2", "Nginx", "SSL/TLS", "WebRTC",
        "REST API", "JSON Data Contracts", "Stateful & Stateless Architecture", "Vercel",
        "Airtable", "Softr", "RBAC", "Magic Links", "Zero-Storage Architecture", "PII Sanitisation"
      ]
    }
  ]
};

// SECTION 5 — EXPERIENCE DATA

// VodaBi Entry
const VODABI_ROLE_DATA: Record<ActiveRole, {
  title: { en: string; ko: string };
  bullets: { en: string; ko: string }[];
}> = {
  pm: {
    title: { en: "AI Product Manager (Internship)", ko: "AI 프로덕트 매니저 (인턴십)" },
    bullets: [
      {
        en: "Directed the product pivot from a legacy analytics dashboard to a 3-step AI coaching widget (Role Selection → Upload → Chat) — authored the core product brief, defined the multi-phase roadmap, and secured stakeholder buy-in via a Wizard of Oz prototype demonstration.",
        ko: "기존 분석 대시보드에서 3단계 AI 코칭 위젯(역할 선택 → 업로드 → 대화)으로의 제품 피봇을 리드 — 핵심 제품 요구서(PRD) 작성, 다단계 로드맵 수립 및 Wizard of Oz 프로토타입 시연을 통한 이해관계자 얼라인먼트 확보."
      },
      {
        en: "Designed a deterministic evaluation framework decoupling immutable behavioural scoring from dynamic client-defined compliance matrices, eliminating LLM hallucinations for Tier-1 enterprise clients.",
        ko: "불변의 행동 평가점수와 동적 고객사 준수 규격을 완벽히 분리하는 결정론적 평가 프레임워크를 설계하여 Tier-1 엔터프라이즈 고객사의 LLM 환각 현상을 차단함."
      },
      {
        en: "Provisioned a staging server on AWS EC2 and authored full deployment documentation — DNS configurations, migration protocols, and system architecture — enabling a seamless vendor handover without engineering bottlenecks.",
        ko: "AWS EC2 인스턴스 환경을 구축하고 DNS 설정, 마이그레이션 프로토콜, 시스템 아키텍처를 포함한 배포 문서를 작성하여 엔지니어링 병목 없는 원활한 벤더 핸드오버를 수행함."
      },
      {
        en: "Defined JSON data contracts and API routing logic to align AWS engineers and UI designers around complex LLM behaviours, then developed GTM positioning materials supporting high-stakes B2B sales demonstrations.",
        ko: "AWS 엔지니어 및 UI 디자이너 간의 협업을 위해 JSON 데이터 스키마 및 API 라우팅 로직을 정의하고, 주요 B2B 세일즈 시연을 지원하는 GTM 포지셔닝 자료 제작."
      }
    ]
  },
  edtech: {
    title: { en: "AI Product Manager (Internship)", ko: "AI 프로덕트 매니저 (인턴십)" },
    bullets: [
      {
        en: "Designed the pedagogical 'Fact-Impact-Fix' logic model — transforming rigid integer-based scoring rubrics into empathetic, actionable micro-learning interventions grounded in instructional design principles.",
        ko: "교수설계 원리에 기반하여 정량적 점수 루브릭을 실행 가능하고 공감대 높은 마이크로 러닝 피드백으로 전환하는 'Fact-Impact-Fix' 교수법 로직 모델 설계."
      },
      {
        en: "Directed the product pivot to a 3-step AI coaching widget, applying UX cognitive load reduction principles to serve non-technical sales professionals — authored the core product brief and executed a Wizard of Oz prototype validation with executive stakeholders.",
        ko: "비기술 세일즈 담당자를 위해 UX 인지 부하 감소 원칙을 적용하여 3단계 AI 코칭 위젯으로의 제품 피봇을 리드 — 핵심 제품 요구서 작성 및 경영진 대상 Wizard of Oz 검증 시연 수행."
      },
      {
        en: "Defined GTM and client enablement strategy, producing positioning materials that supported high-stakes B2B sales demonstrations for Tier-1 enterprise clients.",
        ko: "GTM 및 고객 인에이블먼트 전략을 수립하고 Tier-1 엔터프라이즈 B2B 세일즈 시연을 완벽히 지원하는 핵심 가이드 및 포지셔닝 자료 제공."
      }
    ]
  },
  eng: {
    title: { en: "AI Integration Engineer (Internship)", ko: "AI 인티그레이션 엔지니어 (인턴십)" },
    bullets: [
      {
        en: "Provisioned and configured a staging server on AWS EC2 (ARM64) — implemented Nginx reverse proxy routing and SSL/TLS encryption to securely manage WebRTC audio streams and outbound REST API calls for the VOTEST platform migration.",
        ko: "AWS EC2 (ARM64) 스테이징 서버 프로비저닝 및 Nginx 리버스 프록시, SSL/TLS 암호화 설정 — VOTEST 플랫폼 마이그레이션을 위한 WebRTC 오디오 스트림 및 외부 REST API 호출 안전 이식."
      },
      {
        en: "Established the application environment using Node.js 24, NestJS v11, and MariaDB with strict environment variable security and AWS Security Group protocols — authored full deployment documentation covering DNS configuration, system architecture, and migration protocols for seamless vendor handover.",
        ko: "Node.js 24, NestJS v11, MariaDB 기반 애플리케이션 환경을 AWS 보안 그룹 및 환경 변수 보안 프로토콜로 구축 — DNS 설정, 시스템 아키텍처 및 마이그레이션 배포 문서 완전 작성."
      },
      {
        en: "Designed a deterministic evaluation framework decoupling immutable behavioural scoring from dynamic client-defined compliance matrices — eliminating LLM hallucinations by enforcing structured JSON schema validation on all AI outputs.",
        ko: "불변의 행동 정량 채점과 동적 compliance 매트릭스를 정밀 분리하는 결정론적 평가 프레임워크 설계 — 구조화된 JSON 스키마 검증을 강제하여 LLM 환각 전면 제거."
      },
      {
        en: "Translated a complex keyword data dictionary into a dynamic 4-persona LLM system prompt matrix, ingesting proprietary B2B sales telemetry into the LLM context window to generate highly personalised coaching feedback.",
        ko: "키워드 데이터 사전을 다이내믹한 4개 페르소나 LLM 시스템 프롬프트 매트릭스로 변환하고, 자체 B2B 세일즈 텔레메트리 데이터를 컨텍스트 윈도우에 피딩하여 정교한 맞춤 코칭 피드백 생성."
      },
      {
        en: "Defined strict JSON data contracts, state management flows, and API routing logic to guide AWS engineers and UI designers in translating complex LLM behaviours into production code.",
        ko: "복잡한 LLM 동작 모델을 프로덕션 코드로 안전하게 변환하기 위해 엄격한 JSON 데이터 계약, 상태 관리 흐름, API 라우팅 로직을 정의하고 교차 엔지니어링 지휘."
      }
    ]
  }
};

// Chekki Products Entries per role (3 products per role)
export interface ProductDetail {
  id: string;
  name: { en: string; ko: string };
  subtitle: { en: string; ko: string };
  bullets: { en: string; ko: string }[];
}

const CHEKKI_ROLE_DATA: Record<ActiveRole, {
  founderTitle: { en: string; ko: string };
  products: ProductDetail[];
}> = {
  pm: {
    founderTitle: { en: "Founder & AI Product Manager", ko: "창업자 및 AI 프로덕트 매니저" },
    products: [
      {
        id: "command-center",
        name: { en: "Chekki B2B Command Center — Enterprise AI Reporting Portal", ko: "Chekki B2B Command Center — 엔터프라이즈 AI 보고 포털" },
        subtitle: { en: "Multi-tenant B2B portal · RBAC · Make.com + Gemini AI pipeline", ko: "멀티테넌트 B2B 포털 · RBAC 계정 관리 · Make.com + Gemini AI 파이프라인" },
        bullets: [
          {
            en: "Defined strategy and roadmap for a multi-tenant B2B portal that eliminated 15+ weekly administrative hours across language academy networks — shipped a Make.com + Gemini AI pipeline that processes teacher observations into culturally nuanced bilingual parent notes, driving an 80% workload reduction.",
            ko: "전국 어학원 네트워크의 주당 15시간 이상 행정 부담을 줄이는 멀티테넌트 B2B 포털 전략 및 로드맵 수립 — 교사의 관찰 기록을 문화적 뉘앙스를 살린 이중언어 학부모 리포트로 가공하는 Make.com + Gemini AI 파이프라인 배포로 업무량 80% 절감."
          },
          {
            en: "Architected RBAC, Magic Link authentication, and dynamic Airtable lookup keys as the core data layer — giving school directors real-time visibility while enforcing strict data isolation between roles.",
            ko: "RBAC, 매직링크 패스워드리스 인증, 동적 Airtable 룩업 키를 핵심 데이터 레이어로 설계하여 원장단에게 실시간 가시성을 제공하면서 역할 간 엄격한 데이터 격리 보장."
          }
        ]
      },
      {
        id: "eduplanner",
        name: { en: "EduPlanner Pro — Tiered LLM Scheduling Engine", ko: "EduPlanner Pro — 계층화 LLM 스케줄링 자원 배치 엔진" },
        subtitle: { en: "Gemini Flash + Pro · Draft & Weave pipeline · 40hrs → 10min", ko: "Gemini Flash + Pro 유기 결합 · Draft & Weave 2단계 조율 · 40시간에서 10분 단축" },
        bullets: [
          {
            en: "Owned delivery of a Draft & Weave LLM pipeline — Gemini Flash for foundational grid generation, Gemini Pro for recursive conflict resolution — cutting academy term scheduling from 40 manual hours to a single 10-minute automated run.",
            ko: "Draft & Weave LLM 파이프라인 출시 주도 — Gemini Flash의 1차 일정격자 생성과 Gemini Pro의 재귀적 충돌 해소를 결합하여 학기 스케줄링을 수동 40시간에서 10분 자동화 실행으로 단축."
          },
          {
            en: "Implemented API resilience with automatic model downscaling on rate-limit errors, maintaining scheduler availability under concurrent enterprise-scale planning queries.",
            ko: "트래픽 제한 에러 발생 시 동적 모델 다운스케일링을 포함한 API 회복탄력성을 구현하여 동시 다발적 대규모 스케줄링 쿼리 요청에서도 상시 가용성 유지."
          }
        ]
      },
      {
        id: "chekki-ai",
        name: { en: "Chekki AI — Consumer Mobile App (Apple App Store)", ko: "Chekki AI — 소비자 지향 모바일 앱 (애플 앱스토어)" },
        subtitle: { en: "Bilingual homework assistant · Zero-storage privacy architecture · Apple App Store", ko: "이중언어 과제 학습 도우미 · 제로-스토리지 프라이버시 아키텍처 · 애플 앱스토어" },
        bullets: [
          {
            en: "Led end-to-end product lifecycle for a bilingual AI homework assistant on the App Store — zero-storage privacy architecture eliminating all child data retention, achieving full COPPA compliance as a core product constraint.",
            ko: "애플 앱스토어용 이중언어 AI 과제 도우미의 전 제품 라이프사이클 주도 — 아동 데이터 보존을 완전 배제하는 제로-스토리지 프라이버시 아키텍처를 핵심 제약으로 설계하여 COPPA 준수 달성."
          },
          {
            en: "Executed bilingual go-to-market strategy for Korean families, translating ESL/EFL pedagogy into intuitive parent-facing interaction loops that drove organic enrollment.",
            ko: "한국 가정을 위한 이중언어 GTM 전략을 실행하여 ESL/EFL 교수법을 직관적인 학부모 상호작용 루프로 변환하고 오가닉 사용자 유입을 견인."
          }
        ]
      }
    ]
  },
  edtech: {
    founderTitle: { en: "Founder & EdTech Product Manager", ko: "창업자 및 에듀테크 프로덕트 매니저" },
    products: [
      {
        id: "chekki-teacher",
        name: { en: "Chekki Teacher — Curriculum-Aware AI Teaching Tool", ko: "Chekki Teacher — 커리큘럼 기반 교사용 AI 도구" },
        subtitle: { en: "Curriculum pre-seeding · Zero-hallucination guardrails · Automated progress reports", ko: "커리큘럼 시딩 · 환각 제로 가드레일 · 자동화 학습 성과 리포트" },
        bullets: [
          {
            en: "Built and shipped a live teacher-facing platform that allows educators to pre-seed curriculum content into the AI context — eliminating hallucinations when parents use the app to check student answers, because the AI responds only within teacher-defined boundaries.",
            ko: "교사가 AI 컨텍스트에 커리큘럼 콘텐츠를 사전 주입할 수 있는 라이브 교사용 플랫폼 구축 및 출시 — AI가 교사가 정의한 경계 내에서만 응답하여 학부모의 학습 확인 시 환각을 원천 차단."
          },
          {
            en: "Shipped mistake-tracking and automated report generation: the system identifies recurring error patterns across a student's history, surfaces them for in-class review, and generates structured parent-facing progress reports — reducing teacher admin time while improving instructional targeting.",
            ko: "취약점 추적 및 자동 보고서 생성 기능 탑재: 학생의 오답 이력에서 반복 패턴을 감지하여 수업 중 복습을 안내하고 정형화된 학부모용 리포트를 자동 생성하여 교사 행정 시간을 감축."
          }
        ]
      },
      {
        id: "benchmark",
        name: { en: "Benchmark AI — Continuous ESL Assessment Platform", ko: "Benchmark AI — 상시 ESL 진단 평가 플랫폼" },
        subtitle: { en: "CEFR + Cambridge YLE mastery mapping · Predictive churn alerts", ko: "CEFR + Cambridge YLE 언어 지표 매핑 · 퇴원 위험 조기 경보" },
        bullets: [
          {
            en: "Designed a real-time assessment product mapping student mastery to CEFR and Cambridge YLE international standards, with predictive churn alerts identifying stagnating skill trends before attrition risk escalates.",
            ko: "학생의 일상 학습 성취도를 CEFR 및 Cambridge YLE 국제 공인 표준에 매핑하는 실시간 평가 제품을 설계하고, 이탈 위험 고조 전 실력 정체 곡선을 감지하는 조기 경보 구축."
          },
          {
            en: "Built predictive early-warning diagnostic indicators that defend core student retention by surfacing decline signals to teachers and leadership before parent withdrawal decisions occur.",
            ko: "학부모의 퇴원 결정 전 성취도 저하 신호를 교사 및 원장단에게 즉시 공유하는 선제적 조기 경보 시스템을 구축하여 원생 이탈을 방지."
          }
        ]
      },
      {
        id: "chekki-ai",
        name: { en: "Chekki AI — Consumer Mobile App (Apple App Store)", ko: "Chekki AI — 소비자 지향 모바일 앱 (애플 앱스토어)" },
        subtitle: { en: "Bilingual homework assistant · Zero-storage privacy architecture · Apple App Store", ko: "이중언어 과제 학습 도우미 · 제로-스토리지 프라이버시 아키텍처 · 애플 앱스토어" },
        bullets: [
          {
            en: "Led end-to-end lifecycle for a bilingual AI homework assistant on the App Store — translated complex ESL/EFL pedagogical frameworks into child-friendly interaction loops and executed go-to-market strategy for Korean families.",
            ko: "앱스토어용 이중언어 AI 과제 도우미 라이프사이클 주도 — 복잡한 ESL/EFL 교수법 프레임워크를 아동 친화적 루프로 변환하고 한국 가정을 위한 GTM 전략 실행."
          },
          {
            en: "Designed a zero-storage privacy architecture as a core product constraint, achieving full COPPA and App Store compliance while building parent trust as a primary differentiator.",
            ko: "제로-스토리지 프라이버시 아키텍처를 핵심 제품 요구사항으로 설계하여 COPPA 및 앱스토어 안전 규정을 충족함과 동시에 학부모 신뢰를 차별점으로 구축."
          }
        ]
      }
    ]
  },
  eng: {
    founderTitle: { en: "Founder & AI Integration Engineer", ko: "창업자 및 AI 인티그레이션 엔지니어" },
    products: [
      {
        id: "command-center",
        name: { en: "Chekki B2B Command Center — Enterprise AI Reporting Portal", ko: "Chekki B2B Command Center — 엔터프라이즈 AI 보고 포털" },
        subtitle: { en: "Multi-tenant B2B portal · RBAC · Make.com + Gemini AI pipeline", ko: "멀티테넌트 B2B 포털 · RBAC 계정 관리 · Make.com + Gemini AI 파이프라인" },
        bullets: [
          {
            en: "Engineered an end-to-end AI agent pipeline using Make.com webhooks and Gemini AI: transforms exception-first teacher observations into culturally nuanced bilingual parent notes using Korean honorific instruction trees and no-markdown output policies — driving an 80% reduction in translation workloads.",
            ko: "Make.com 웹훅과 Gemini AI를 활용한 엔드투엔드 AI 에이전트 파이프라인 엔지니어링: 한국어 높임법 지시 나무와 마크다운 배제 정책을 적용해 교사의 관찰 기록을 고품질 이중언어 알림장으로 자동 변환하여 번역 업무량 80% 감축."
          },
          {
            en: "Architected a secure multi-tenant portal with Airtable, Softr, and Fillout: dynamic lookup keys, pre-fill automation, RBAC data isolation, and Magic Link passwordless authentication — zero onboarding friction across multiple academy deployments.",
            ko: "Airtable, Softr, Fillout 기반의 보안 멀티테넌트 포털 설계: 동적 룩업 키, 사전문맥 자동채움, RBAC 데이터 격리, 매직링크 인증을 통합하여 다수 어학원 배포 시 온보딩 마찰 제로 달성."
          }
        ]
      },
      {
        id: "eduplanner",
        name: { en: "EduPlanner Pro — Tiered LLM Scheduling Engine", ko: "EduPlanner Pro — 계층화 LLM 스케줄링 자원 배치 엔진" },
        subtitle: { en: "Gemini Flash + Pro · Draft & Weave pipeline · 40hrs → 10min", ko: "Gemini Flash + Pro 유기 결합 · Draft & Weave 2단계 조율 · 40시간에서 10분 단축" },
        bullets: [
          {
            en: "Architected a two-stage LLM pipeline: Gemini Flash generates foundational timetable grids under context-locked parameters; programmatic conflict validators trigger a Gemini Pro Weaving Phase to recalculate only affected intersections — cutting scheduling from 40 hours to under 10 minutes.",
            ko: "2단계 LLM 파이프라인 아키텍처: Gemini Flash가 기초 타임테이블을 생성하고, 코드 충돌 검증기가 영향을 받은 교차점만 Gemini Pro로 재계산하는 Weaving Phase를 트리거하여 스케줄링 시간을 40시간에서 10분 미만으로 단축."
          },
          {
            en: "Implemented API resilience: 30-second cooldown on 429/500 errors with automatic downscaling from Pro to Flash, preventing pipeline failure under concurrent enterprise-scale load.",
            ko: "429/500 에러 시 30초 쿨다운 및 Pro에서 Flash로의 자동 다운스케일링을 포함한 API 탄력성 레이어를 구현하여 대규모 부하 환경에서의 파이프라인 중단 방지."
          }
        ]
      },
      {
        id: "learning-diary",
        name: { en: "Learning Diary — Student Portfolio Compiler", ko: "Learning Diary — 아동 포트폴리오 빌더" },
        subtitle: { en: "In-browser PDF synthesis · Dynamic Tenant Theming · Supabase RLS", ko: "브라우저 구동 PDF 생성 · 테넌트 브랜드 동적 테밍 · Supabase RLS" },
        bullets: [
          {
            en: "Architected real-time client-side PDF synthesis with @react-pdf/renderer and Gemini 1.5 Flash, compiling parent-ready portfolios directly in-browser — eliminating server processing costs and cloud asset exposure.",
            ko: "@react-pdf/renderer와 Gemini 1.5 Flash 기반의 실시간 클라이언트 사이드 PDF 생성 아키텍처 구축 — 브라우저 내 직접 포트폴리오 컴파일로 서버 연산 비용 및 클라우드 자산 노출 위험 제거."
          },
          {
            en: "Built Dynamic Tenant Theming via context-level design hooks and a zero-trust multi-tenant Supabase RLS database, enabling franchise directors to inject bespoke brand colours, fonts, and logos without engineering intervention.",
            ko: "컨텍스트 기반 디자인 훅 및 제로트러스트 멀티테넌트 Supabase RLS DB를 활용한 동적 테넌트 테밍 개발 — 원장이 엔지니어링 개입 없이 고유 브랜드 색상, 폰트, 로고를 주입 가능하도록 구현."
          }
        ]
      }
    ]
  }
};

// Blend ENG Academy (all roles)
const BLEND_ACADEMY_BULLETS = [
  {
    en: "Authored a 20-volume institutional English textbook series across 6 skill domains — now commercially sold and in active daily use academy-wide across 100+ students.",
    ko: "6개 영어 영역에 걸친 20권 분량의 기관용 정규 출판 교재 시리즈 저술 — 현재 상용 판매 및 100여 명 이상의 학생 대상 매일 정규 수업 교재로 활용 중."
  },
  {
    en: "Built a school-wide diagnostic assessment system enabling early identification of learning gaps and targeted intervention, measurably reducing student attrition.",
    ko: "학습 공백의 조기 발견과 맞춤형 학업 보정을 가능하게 하는 전교 단위 진단 평가 체계를 구축하여 원생 중도 이탈률을 유의미하게 절감."
  }
];

// YBM PSA Seocho (all roles)
const YBM_BULLET = {
  en: "Four years of full-immersion EFL instruction — building the Korean market domain expertise that drives every Chekki product decision.",
  ko: "4년간의 몰입형 EFL 교육 수행 — 모든 Chekki 에듀테크 제품 기획의 기반이 되는 한국 시장 도메인 전문성 확립."
};

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

  const isDark = theme === 'dark';
  const roleTitle = ROLE_TITLES[activeRole][locale];
  const profileText = PROFILES[activeRole][locale];
  const skillsRows = SKILLS_BY_ROLE[activeRole];
  const vodabiData = VODABI_ROLE_DATA[activeRole];
  const chekkiData = CHEKKI_ROLE_DATA[activeRole];

  // UI labels
  const labels = {
    en: {
      profileTitle: "Professional Profile",
      skillsTitle: "Technical Skills & Competencies",
      experienceTitle: "Professional Experience",
      educationTitle: "Education",
      selectRoleLabel: "Select Resume Perspective:",
      rolePM: "AI Product Manager",
      roleEdTech: "EdTech Product Manager",
      roleEng: "AI Integration Engineer",
      vodabiCompany: "VodaBi SaaS Startup",
      vodabiPeriod: "July 2026 – Present",
      vodabiSub: "Lead product architect · Enterprise B2B conversational AI coaching and evaluation platform",
      chekkiCompany: "Chekki EdTech Solutions",
      chekkiPeriod: "Jan 2024 – Present",
      chekkiSub: "Six-product AI-powered EdTech suite · South Korean education market · Full product lifecycle ownership",
      blendCompany: "Blend ENG Academy",
      blendTitle: "Curriculum Lead & Manager",
      blendPeriod: "Feb 2023 – Feb 2026",
      blendSub: "Private English academy · Kindergarten through Elementary · Senior educator and systems lead",
      ybmCompany: "YBM PSA Seocho",
      ybmTitle: "Homeroom Educator",
      ybmPeriod: "Feb 2019 – Feb 2023",
      ybmSub: "Full-immersion EFL instruction · Leading Korean English kindergarten and academy",
      eduEssexDegree: "Master of Education — Educational Management",
      eduEssexSchool: "University of Essex · May 2022",
      eduUwcDegree: "Bachelor of Commercial Law",
      eduUwcSchool: "University of the Western Cape · December 2013"
    },
    ko: {
      profileTitle: "전문가 프로필",
      skillsTitle: "직무 핵심 역량 & 기술 스택",
      experienceTitle: "경력 사항",
      educationTitle: "학력 사항",
      selectRoleLabel: "이력서 관점 선택:",
      rolePM: "AI 프로덕트 매니저",
      roleEdTech: "에듀테크 프로덕트 매니저",
      roleEng: "AI 인티그레이션 엔지니어",
      vodabiCompany: "VodaBi SaaS 스타트업",
      vodabiPeriod: "2026년 7월 – 현재",
      vodabiSub: "엔터프라이즈 B2B 대화형 AI 및 자동 평가 플랫폼 개발 리드 프로덕트 아키텍트",
      chekkiCompany: "Chekki EdTech Solutions",
      chekkiPeriod: "2024년 1월 – 현재",
      chekkiSub: "한국 교육 시장을 위한 6대 AI 에듀테크 포트폴리오 기획 및 제품 수명주기 전권 관리",
      blendCompany: "Blend ENG Academy",
      blendTitle: "커리큘럼 리드 & 매니저",
      blendPeriod: "2023년 2월 – 2026년 2월",
      blendSub: "사립 영어 어학원 · 영유아 및 초등 커리큘럼 책임자 및 학사 시스템 구축",
      ybmCompany: "YBM PSA Seocho",
      ybmTitle: "담임 교직원",
      ybmPeriod: "2019년 2월 – 2023년 2월",
      ybmSub: "몰입형 EFL 언어 교육 · 국내 최상위 유아 영어 전문 교육기관",
      eduEssexDegree: "교육학 석사 — 교육 경영학 석사",
      eduEssexSchool: "University of Essex (영국 에식스 대학교) · 2022년 5월",
      eduUwcDegree: "상법 학사 (Bachelor of Commercial Law)",
      eduUwcSchool: "University of the Western Cape · 2013년 12월"
    }
  }[locale];

  return (
    <div id="role-switch-resume-container" className="space-y-8">

      {/* ROLE SWITCHER BUTTONS (Hidden on Print) */}
      <div className="p-4 rounded-2xl bg-neutral-900/90 border border-white/10 space-y-3 print:hidden shadow-inner">
        <span className="text-[10px] font-black uppercase tracking-widest text-accent-gold/90 block font-mono">
          {labels.selectRoleLabel}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {(['pm', 'edtech', 'eng'] as ActiveRole[]).map((roleKey) => {
            const roleName = {
              pm: labels.rolePM,
              edtech: labels.roleEdTech,
              eng: labels.roleEng
            }[roleKey];

            const isActive = activeRole === roleKey;

            return (
              <button
                key={roleKey}
                id={`role-btn-${roleKey}`}
                onClick={() => setActiveRole(roleKey)}
                className={`relative px-3.5 py-3 rounded-xl text-left border transition-all duration-150 select-none ${
                  isActive
                    ? 'border-accent-gold bg-accent-gold/15 text-accent-gold shadow-[0_0_12px_rgba(212,163,89,0.2)] font-bold'
                    : 'border-white/5 bg-neutral-950/60 text-white/60 hover:text-white hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-tight">{roleName}</span>
                  {isActive && (
                    <motion.span
                      layoutId="active-role-dot"
                      className="w-1.5 h-1.5 rounded-full bg-accent-gold shadow-glow"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ON-SCREEN RESUME VIEW */}
      <div className="print:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRole}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="space-y-8"
          >
            {/* ROLE HEADER TITLE */}
            <div className="border-b pb-3 border-accent-gold/20">
              <h3 className="text-base md:text-lg font-bold font-display text-accent-gold tracking-wide">
                {roleTitle}
              </h3>
            </div>

            {/* PROFILE SECTION */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-widest text-accent-gold flex items-center gap-1.5 font-mono">
                <span>✦</span> {labels.profileTitle}
              </h4>
              <p className={`text-xs md:text-sm leading-relaxed font-light ${isDark ? 'text-white/90' : 'text-neutral-800'}`}>
                {profileText}
              </p>
            </div>

            {/* SKILLS SECTION — 2 CLEAN ROWS */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-accent-gold flex items-center gap-1.5 font-mono">
                <span>⚓</span> {labels.skillsTitle}
              </h4>
              <div className="space-y-2.5">
                {skillsRows.map((row, rIdx) => (
                  <div key={rIdx} className="p-3 rounded-xl border border-white/5 bg-neutral-950/40 space-y-1.5">
                    <span className="text-[10px] font-bold text-accent-gold font-mono uppercase block">
                      {row.label[locale]}
                    </span>
                    <p className={`text-xs font-light leading-relaxed ${isDark ? 'text-white/80' : 'text-neutral-700'}`}>
                      {row.items.join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* EXPERIENCE SECTION */}
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-accent-gold flex items-center gap-1.5 font-mono">
                <span>💼</span> {labels.experienceTitle}
              </h4>

              {/* ENTRY 1 — VODABI */}
              <div className="p-4 rounded-xl border border-accent-gold/30 bg-accent-gold/[0.03] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b pb-2 border-accent-gold/15">
                  <div>
                    <h5 className="text-sm font-bold text-accent-gold font-display">
                      {vodabiData.title[locale]}
                    </h5>
                    <span className="text-xs font-semibold text-white/80 block">
                      {labels.vodabiCompany}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono opacity-60 text-white shrink-0">
                    {labels.vodabiPeriod}
                  </span>
                </div>
                <p className="text-xs font-light italic text-white/70">
                  {labels.vodabiSub}
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-1">
                  {vodabiData.bullets.map((b, idx) => (
                    <li key={idx} className={`text-xs leading-relaxed font-light ${isDark ? 'text-white/80' : 'text-neutral-800'}`}>
                      {b[locale]}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ENTRY 2 — CHEKKI */}
              <div className="p-4 rounded-xl border border-white/10 bg-neutral-950/40 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b pb-2 border-white/10">
                  <div>
                    <h5 className="text-sm font-bold text-accent-gold font-display">
                      {chekkiData.founderTitle[locale]}
                    </h5>
                    <span className="text-xs font-semibold text-white/80 block">
                      {labels.chekkiCompany}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono opacity-60 text-white shrink-0">
                    {labels.chekkiPeriod}
                  </span>
                </div>
                <p className="text-xs font-light italic text-white/70">
                  {labels.chekkiSub}
                </p>

                {/* CHEKKI PRODUCTS */}
                <div className="space-y-3 pt-1">
                  {chekkiData.products.map((prod) => (
                    <div key={prod.id} className="p-3 rounded-lg border border-white/5 bg-neutral-900/60 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-accent-gold font-mono">
                          📁 {prod.name[locale]}
                        </span>
                      </div>
                      <span className="text-[11px] block font-light text-white/60 font-mono">
                        {prod.subtitle[locale]}
                      </span>
                      <ul className="list-disc list-inside space-y-1 pl-1">
                        {prod.bullets.map((b, bIdx) => (
                          <li key={bIdx} className={`text-[11.5px] leading-relaxed font-light ${isDark ? 'text-white/80' : 'text-neutral-800'}`}>
                            {b[locale]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* ENTRY 3 — BLEND ENG ACADEMY */}
              <div className="p-4 rounded-xl border border-white/10 bg-neutral-950/40 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b pb-2 border-white/10">
                  <div>
                    <h5 className="text-sm font-bold text-accent-gold font-display">
                      {labels.blendTitle}
                    </h5>
                    <span className="text-xs font-semibold text-white/80 block">
                      {labels.blendCompany}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono opacity-60 text-white shrink-0">
                    {labels.blendPeriod}
                  </span>
                </div>
                <p className="text-xs font-light italic text-white/70">
                  {labels.blendSub}
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-1 pt-1">
                  {BLEND_ACADEMY_BULLETS.map((b, idx) => (
                    <li key={idx} className={`text-xs leading-relaxed font-light ${isDark ? 'text-white/80' : 'text-neutral-800'}`}>
                      {b[locale]}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ENTRY 4 — YBM PSA SEOCHO */}
              <div className="p-4 rounded-xl border border-white/10 bg-neutral-950/40 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b pb-2 border-white/10">
                  <div>
                    <h5 className="text-sm font-bold text-accent-gold font-display">
                      {labels.ybmTitle}
                    </h5>
                    <span className="text-xs font-semibold text-white/80 block">
                      {labels.ybmCompany}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono opacity-60 text-white shrink-0">
                    {labels.ybmPeriod}
                  </span>
                </div>
                <p className="text-xs font-light italic text-white/70">
                  {labels.ybmSub}
                </p>
                <ul className="list-disc list-inside pl-1 pt-1">
                  <li className={`text-xs leading-relaxed font-light ${isDark ? 'text-white/80' : 'text-neutral-800'}`}>
                    {YBM_BULLET[locale]}
                  </li>
                </ul>
              </div>

            </div>

            {/* EDUCATION SECTION */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-accent-gold flex items-center gap-1.5 font-mono">
                <span>🎓</span> {labels.educationTitle}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-white/10 bg-neutral-950/40 space-y-1">
                  <div className="text-xs font-bold text-accent-gold">{labels.eduEssexDegree}</div>
                  <div className="text-[11px] text-white/70 font-mono">{labels.eduEssexSchool}</div>
                </div>
                <div className="p-3.5 rounded-xl border border-white/10 bg-neutral-950/40 space-y-1">
                  <div className="text-xs font-bold text-accent-gold">{labels.eduUwcDegree}</div>
                  <div className="text-[11px] text-white/70 font-mono">{labels.eduUwcSchool}</div>
                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* SINGLE-COLUMN ATS-COMPLIANT PRINT / PDF LAYOUT */}
      <div className="hidden print:block print-document text-[#222222] font-sans" style={{ fontSize: '10pt', lineHeight: '1.5' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            @page {
              size: portrait;
              margin: 15mm 18mm 15mm 18mm !important;
            }
            body {
              background: white !important;
              color: #222222 !important;
              font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
            }
            .print-document {
              display: block !important;
              width: 100% !important;
            }
            .print-document h1 {
              font-size: 26pt !important;
              font-weight: 800 !important;
              color: #111827 !important;
              margin: 0 0 2pt 0 !important;
              letter-spacing: -0.5px !important;
            }
            .print-document .print-headline {
              font-size: 12pt !important;
              font-weight: 700 !important;
              color: #2563EB !important;
              margin: 0 0 6pt 0 !important;
            }
            .print-document .print-contact {
              font-size: 9pt !important;
              color: #4B5563 !important;
              margin: 0 0 12pt 0 !important;
              padding-bottom: 8pt !important;
              border-bottom: 1.5px solid #E5E7EB !important;
            }
            .print-document h2 {
              font-size: 10pt !important;
              font-weight: 800 !important;
              color: #111827 !important;
              text-transform: uppercase !important;
              letter-spacing: 0.8px !important;
              border-bottom: 1.5px solid #2563EB !important;
              padding-bottom: 2pt !important;
              margin-top: 12pt !important;
              margin-bottom: 6pt !important;
            }
            .print-document p {
              font-size: 9.5pt !important;
              color: #374151 !important;
              line-height: 1.5 !important;
              margin: 0 0 6pt 0 !important;
            }
            .print-document ul {
              margin-top: 3pt !important;
              margin-bottom: 6pt !important;
              padding-left: 0 !important;
              list-style: none !important;
            }
            .print-document li {
              font-size: 9.5pt !important;
              color: #374151 !important;
              line-height: 1.45 !important;
              margin-bottom: 3pt !important;
              padding-left: 12pt !important;
              text-indent: -12pt !important;
            }
            .print-document .print-exp-block {
              margin-bottom: 10pt !important;
              page-break-inside: avoid !important;
            }
            .print-document .print-exp-header {
              display: flex !important;
              justify-content: space-between !important;
              align-items: baseline !important;
              margin-bottom: 1pt !important;
            }
            .print-document .print-title {
              font-size: 10.5pt !important;
              font-weight: 700 !important;
              color: #111827 !important;
            }
            .print-document .print-company {
              font-size: 10.5pt !important;
              font-weight: 700 !important;
              color: #2563EB !important;
            }
            .print-document .print-dates {
              font-size: 9pt !important;
              color: #6B7280 !important;
            }
            .print-document .print-subtitle {
              font-size: 9.5pt !important;
              font-weight: 500 !important;
              font-style: italic !important;
              color: #4B5563 !important;
              margin-bottom: 3pt !important;
            }
            .print-document .print-skill-row {
              margin-bottom: 4pt !important;
              font-size: 9.5pt !important;
              line-height: 1.45 !important;
            }
            .print-document .print-skill-label {
              font-weight: 700 !important;
              color: #111827 !important;
            }
            .print-document .print-prod-title {
              font-size: 9.5pt !important;
              font-weight: 700 !important;
              color: #111827 !important;
              margin-top: 4pt !important;
            }
          }
        ` }} />

        {/* HEADER */}
        <h1>JASON BENJAMIN</h1>
        <div className="print-headline">{roleTitle}</div>
        <div className="print-contact">
          jsn.benjamin@gmail.com · 010 5371 9266 · Seoul, South Korea (Open to Remote) · jason-portfolio.com
        </div>

        {/* PROFILE */}
        <h2>{locale === 'en' ? "Professional Profile" : "전문가 프로필"}</h2>
        <p>{profileText}</p>

        {/* SKILLS */}
        <h2>{locale === 'en' ? "Technical Skills & Competencies" : "직무 핵심 역량 & 기술 스택"}</h2>
        {skillsRows.map((row, idx) => (
          <div key={idx} className="print-skill-row">
            <span className="print-skill-label">{row.label[locale]}: </span>
            <span>{row.items.join(', ')}</span>
          </div>
        ))}

        {/* PROFESSIONAL EXPERIENCE */}
        <h2>{locale === 'en' ? "Professional Experience" : "경력 사항"}</h2>

        {/* VODABI */}
        <div className="print-exp-block">
          <div className="print-exp-header">
            <div>
              <span className="print-title">{vodabiData.title[locale]}</span>
              <span style={{ color: '#2563EB', fontWeight: 700 }}> — </span>
              <span className="print-company">{labels.vodabiCompany}</span>
            </div>
            <span className="print-dates">{labels.vodabiPeriod}</span>
          </div>
          <div className="print-subtitle">{labels.vodabiSub}</div>
          <ul>
            {vodabiData.bullets.map((b, idx) => (
              <li key={idx}>– {b[locale]}</li>
            ))}
          </ul>
        </div>

        {/* CHEKKI */}
        <div className="print-exp-block">
          <div className="print-exp-header">
            <div>
              <span className="print-title">{chekkiData.founderTitle[locale]}</span>
              <span style={{ color: '#2563EB', fontWeight: 700 }}> — </span>
              <span className="print-company">{labels.chekkiCompany}</span>
            </div>
            <span className="print-dates">{labels.chekkiPeriod}</span>
          </div>
          <div className="print-subtitle">{labels.chekkiSub}</div>

          {chekkiData.products.map((p) => (
            <div key={p.id} style={{ marginTop: '5pt' }}>
              <div className="print-prod-title">– {p.name[locale]} ({p.subtitle[locale]})</div>
              <ul>
                {p.bullets.map((b, bIdx) => (
                  <li key={bIdx} style={{ paddingLeft: '18pt', textIndent: '-10pt' }}>• {b[locale]}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BLEND ENG ACADEMY */}
        <div className="print-exp-block">
          <div className="print-exp-header">
            <div>
              <span className="print-title">{labels.blendTitle}</span>
              <span style={{ color: '#2563EB', fontWeight: 700 }}> — </span>
              <span className="print-company">{labels.blendCompany}</span>
            </div>
            <span className="print-dates">{labels.blendPeriod}</span>
          </div>
          <div className="print-subtitle">{labels.blendSub}</div>
          <ul>
            {BLEND_ACADEMY_BULLETS.map((b, idx) => (
              <li key={idx}>– {b[locale]}</li>
            ))}
          </ul>
        </div>

        {/* YBM PSA SEOCHO */}
        <div className="print-exp-block">
          <div className="print-exp-header">
            <div>
              <span className="print-title">{labels.ybmTitle}</span>
              <span style={{ color: '#2563EB', fontWeight: 700 }}> — </span>
              <span className="print-company">{labels.ybmCompany}</span>
            </div>
            <span className="print-dates">{labels.ybmPeriod}</span>
          </div>
          <div className="print-subtitle">{labels.ybmSub}</div>
          <ul>
            <li>– {YBM_BULLET[locale]}</li>
          </ul>
        </div>

        {/* EDUCATION */}
        <h2>{locale === 'en' ? "Education" : "학력 사항"}</h2>
        <div className="print-exp-block">
          <div className="print-exp-header">
            <span className="print-title">{labels.eduEssexDegree}</span>
            <span className="print-dates">May 2022</span>
          </div>
          <div className="print-subtitle">{labels.eduEssexSchool}</div>
        </div>
        <div className="print-exp-block" style={{ marginTop: '4pt' }}>
          <div className="print-exp-header">
            <span className="print-title">{labels.eduUwcDegree}</span>
            <span className="print-dates">Dec 2013</span>
          </div>
          <div className="print-subtitle">{labels.eduUwcSchool}</div>
        </div>

      </div>

    </div>
  );
}

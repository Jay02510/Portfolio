import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export type ActiveRole = 'pm' | 'edtech' | 'eng';

interface ResumeProps {
  locale: 'en' | 'ko';
  theme: 'light' | 'dark';
  activeRole?: ActiveRole;
  onRoleChange?: (role: ActiveRole) => void;
}

// SECTION 1 — ROLE TITLES
export const ROLE_TITLES: Record<ActiveRole, { en: string; ko: string }> = {
  pm: {
    en: "AI Product Manager — Generative AI & B2B SaaS",
    ko: "AI 프로덕트 매니저 — 생성형 AI & B2B SaaS"
  },
  edtech: {
    en: "EdTech Product Manager — AI Learning Systems · M.Ed.",
    ko: "에듀테크 프로덕트 매니저 — AI 학습 시스템 · 교육학 석사"
  },
  eng: {
    en: "AI Integration Engineer — Voice AI, LLM Pipelines & Cloud Infrastructure",
    ko: "AI 인티그레이션 엔지니어 — 음성 AI, LLM 파이프라인 & 클라우드 인프라"
  }
};

// SECTION 2 — PROFILES
const PROFILES: Record<ActiveRole, { en: string; ko: string }> = {
  pm: {
    en: "AI Product Manager with enterprise B2B SaaS experience and 6 production AI products shipped. Specialist in real-time voice AI, deterministic LLM evaluation frameworks, and low-latency API architecture. Proven track record: 80% reduction in administrative workloads and complex enterprise workflows automated end-to-end.",
    ko: "엔터프라이즈 B2B SaaS 경험과 6개의 상용 AI 제품 배포 경력을 보유한 AI 프로덕트 매니저입니다. 실시간 음성 AI, 결정론적 LLM 평가 프레임워크 및 저지연 API 아키텍처에 특화되어 있으며, 행정 업무량 80% 절감 및 복잡한 엔터프라이즈 워크플로우의 엔드투엔드 자동화 성과를 입증했습니다."
  },
  edtech: {
    en: "EdTech Product Manager with a Master of Education in Educational Management, 10 years of South Korean classroom experience, and 6 live AI educational products shipped. Specialist in AI-powered assessment, curriculum-aware LLM systems, and instructional design applied to enterprise AI coaching. 80% administrative workload reduction across live academy networks.",
    ko: "교육경영학 석사, 10년간의 한국 현장 교육 경험 및 6개의 라이브 AI 교육 제품 배포 성과를 지닌 에듀테크 프로덕트 매니저입니다. AI 기반 진단 평가, 커리큘럼 기반 LLM 시스템 및 엔터프라이즈 AI 코칭에 적용되는 교수설계 분야의 전문가입니다."
  },
  eng: {
    en: "AI Integration Engineer with 6 production AI systems shipped and an enterprise voice AI platform rebuilt from scratch. Specialist in real-time WebRTC/WebSocket voice pipelines, deterministic LLM evaluation architecture, NestJS microservices, Docker Compose infrastructure, and AES-256-GCM security. 80% workload reduction and 40-hour-to-10-minute scheduling results from end-to-end ownership across AI and infrastructure layers.",
    ko: "6개의 상용 AI 시스템을 배포하고 엔터프라이즈 음성 AI 플랫폼을 처음부터 재구축한 AI 인티그레이션 엔지니어입니다. 실시간 WebRTC/WebSocket 음성 파이프라인, 결정론적 LLM 평가 아키텍처, NestJS 마이크로서비스, Docker Compose 인프라 및 AES-256-GCM 보안 전문가입니다."
  }
};

// SECTION 3 — SKILLS (Two rows per role)
export interface SkillRow {
  label: { en: string; ko: string };
  items: string[];
}

const SKILLS_BY_ROLE: Record<ActiveRole, [SkillRow, SkillRow]> = {
  pm: [
    {
      label: { en: "Product & AI", ko: "프로덕트 & AI" },
      items: [
        "Product Roadmaps", "Acceptance Criteria", "Real-Time WebRTC Voice", "LLM Judge Architecture",
        "Prompt Engineering", "Structured JSON Outputs", "Deterministic AI Evaluation", "B2B SaaS",
        "RBAC", "Agile", "OKRs", "UX Cognitive Load Reduction"
      ]
    },
    {
      label: { en: "Tools & Infra", ko: "도구 & 인프라" },
      items: [
        "OpenAI Realtime API (gpt-4o-realtime-preview)", "GPT-4o", "Gemini API", "NestJS 11", "Node.js 24",
        "Prisma ORM", "MariaDB", "Docker Compose", "AWS EC2", "Nginx", "React", "TypeScript",
        "Make.com", "Airtable", "Softr", "Firebase", "Supabase"
      ]
    }
  ],
  edtech: [
    {
      label: { en: "EdTech & AI", ko: "에듀테크 & AI" },
      items: [
        "Learning Experience Design", "Instructional Design", "Curriculum Architecture", "AI-Assisted Assessment",
        "CEFR Standards", "Cambridge YLE", "Deterministic AI Evaluation", "LLM Judge Architecture",
        "Prompt Engineering", "Hallucination Mitigation", "Bilingual AI", "B2B SaaS", "Agile", "OKRs"
      ]
    },
    {
      label: { en: "Tools & Infra", ko: "도구 & 인프라" },
      items: [
        "OpenAI Realtime API", "GPT-4o", "Gemini AI", "Claude AI", "Make.com", "Airtable", "Softr",
        "NestJS", "Firebase", "Supabase (PostgreSQL, RLS)", "React", "TypeScript", "AWS EC2",
        "Docker Compose", "Zero-Storage Architecture"
      ]
    }
  ],
  eng: [
    {
      label: { en: "AI & Voice", ko: "AI & 음성 파이프라인" },
      items: [
        "OpenAI Realtime API (gpt-4o-realtime-preview)", "GPT-4o Structured Outputs", "LLM Judge Architecture",
        "WebRTC", "WebSockets", "Server-Side VAD", "Whisper STT", "Prompt Engineering",
        "Deterministic AI Evaluation", "Hallucination Mitigation", "Gemini AI", "Claude AI", "Make.com", "Bilingual AI"
      ]
    },
    {
      label: { en: "Backend & Infra", ko: "백엔드 & 인프라" },
      items: [
        "NestJS 11", "Node.js 24", "TypeScript", "Prisma 7 ORM", "MariaDB", "MySQL", "Docker Compose",
        "AWS EC2 (ARM64)", "Nginx", "SSL/TLS", "AES-256-GCM", "REST API", "Firebase",
        "Supabase (PostgreSQL, RLS)", "React", "Vercel", "Airtable", "Softr", "RBAC", "Magic Links", "Zero-Storage Architecture"
      ]
    }
  ]
};

// SECTION 4 — VODABI EXPERIENCE
const VODABI_ROLE_DATA: Record<ActiveRole, {
  title: { en: string; ko: string };
  company: { en: string; ko: string };
  period: { en: string; ko: string };
  sub: { en: string; ko: string };
  bullets: { en: string; ko: string }[];
}> = {
  pm: {
    title: { en: "AI Product Manager (Internship)", ko: "AI 프로덕트 매니저 (인턴십)" },
    company: { en: "VodaBi SaaS Startup", ko: "VodaBi SaaS 스타트업" },
    period: { en: "July 2026 – Present", ko: "2026년 7월 – 현재" },
    sub: { en: "Enterprise B2B conversational AI coaching and automated sales evaluation platform", ko: "엔터프라이즈 B2B 대화형 AI 코칭 및 자동 판매 평가 플랫폼" },
    bullets: [
      {
        en: "Architected a real-time WebRTC/WebSocket voice AI pipeline using gpt-4o-realtime-preview with server-side Voice Activity Detection and turn interruption, enabling natural candidate simulations with sub-second response latency.",
        ko: "gpt-4o-realtime-preview 및 서버 측 음성 활동 감지(VAD)와 턴 중단 기능을 활용하여 하위 초 단위 응답 지연 시간으로 자연스러운 지원자 시뮬레이션을 구현하는 실시간 WebRTC/WebSocket 음성 AI 파이프라인 아키텍처 구축."
      },
      {
        en: "Spearheaded product pivot from an analytics dashboard to a 3-step AI coaching widget (Role Selection → Upload → Chat); validated UX via Wizard of Oz prototyping before committing engineering resources.",
        ko: "분석 대시보드에서 3단계 AI 코칭 위젯(역할 선택 → 업로드 → 대화)으로의 제품 피봇 주도; 개발 자원 투입 전 Wizard of Oz 프로토타이핑을 통해 UX 검증."
      },
      {
        en: "Designed a deterministic LLM-judge evaluation framework using GPT-4o structured outputs to grade candidates across an 11-point rubric, BANTCQ sales telemetry, and WPM speech metrics — eliminating hallucinations from client-facing scoring.",
        ko: "GPT-4o 구조화된 출력을 사용해 11개 평가 루브릭, BANTCQ 영업 텔레메트리, WPM 발화 지표로 지원자를 채점하는 결정론적 LLM 판사 평가 프레임워크 설계 — 고객 직면 채점에서의 환각 제거."
      },
      {
        en: "Provisioned AWS EC2 (ARM64) staging infrastructure: Node.js 24, NestJS 11, Docker Compose, Nginx reverse proxy, AES-256-GCM PII encryption module, and stateless Magic Link authentication. Authored full vendor handover documentation.",
        ko: "AWS EC2 (ARM64) 스테이징 인프라 구축: Node.js 24, NestJS 11, Docker Compose, Nginx 리버스 프록시, AES-256-GCM PII 암호화 모듈, 상태 비저장 매직 링크 인증. 상세 벤더 핸드오버 문서 작성."
      }
    ]
  },
  edtech: {
    title: { en: "AI Product Manager (Internship)", ko: "AI 프로덕트 매니저 (인턴십)" },
    company: { en: "VodaBi SaaS Startup", ko: "VodaBi SaaS 스타트업" },
    period: { en: "July 2026 – Present", ko: "2026년 7월 – 현재" },
    sub: { en: "Enterprise B2B conversational AI coaching and automated sales evaluation platform", ko: "엔터프라이즈 B2B 대화형 AI 코칭 및 자동 판매 평가 플랫폼" },
    bullets: [
      {
        en: "Designed the Fact-Impact-Fix instructional model — transforming integer-based scoring rubrics into empathetic, actionable micro-coaching interventions grounded in instructional design principles.",
        ko: "Fact-Impact-Fix 교수설계 모델 개발 — 정수 기반 채점 루브릭을 교수설계 원칙에 기반한 공감대 높고 실행 가능한 마이크로 코칭 개입으로 변환."
      },
      {
        en: "Led product pivot from a legacy analytics dashboard to a 3-step AI coaching widget (Role Selection → Upload → Chat), applying UX cognitive load reduction principles validated via Wizard of Oz prototyping with executive stakeholders.",
        ko: "기존 분석 대시보드에서 3단계 AI 코칭 위젯(역할 선택 → 업로드 → 대화)으로의 제품 피봇 리드, 경영진 대상 Wizard of Oz 프로토타이핑으로 검증된 UX 인지 부하 감소 원칙 적용."
      },
      {
        en: "Built a deterministic LLM-judge evaluation framework grading candidates across an 11-point rubric and BANTCQ sales telemetry — structured JSON outputs ensuring consistent, hallucination-free coaching at scale.",
        ko: "11개 루브릭 항목 및 BANTCQ 영업 텔레메트리로 지원자를 평가하는 결정론적 LLM 판사 평가 프레임워크 구축 — 구조화된 JSON 출력으로 일관되고 환각 없는 코칭 보장."
      },
      {
        en: "Rebuilt the voice AI backend from scratch: real-time WebRTC pipeline using gpt-4o-realtime-preview with server-side VAD, enabling natural conversational coaching simulations with sub-second latency.",
        ko: "음성 AI 백엔드 재구축: gpt-4o-realtime-preview 및 서버 측 VAD를 활용한 실시간 WebRTC 파이프라인으로 서브세컨드 지연 시간의 자연스러운 대화형 코칭 시뮬레이션 구현."
      }
    ]
  },
  eng: {
    title: { en: "AI Integration Engineer (Internship)", ko: "AI 인티그레이션 엔지니어 (인턴십)" },
    company: { en: "VodaBi SaaS Startup", ko: "VodaBi SaaS 스타트업" },
    period: { en: "July 2026 – Present", ko: "2026년 7월 – 현재" },
    sub: { en: "Enterprise B2B conversational AI coaching platform — led AI architecture and full backend rebuild", ko: "엔터프라이즈 B2B 대화형 AI 코칭 플랫폼 — AI 아키텍처 및 백엔드 전면 재구축 주도" },
    bullets: [
      {
        en: "Architected a real-time WebRTC/WebSocket voice AI pipeline using gpt-4o-realtime-preview with server-side Voice Activity Detection and turn interruption — sub-second latency, natural conversational flow, full candidate simulation capability.",
        ko: "gpt-4o-realtime-preview, 서버 측 VAD 및 턴 중단 기능을 갖춘 실시간 WebRTC/WebSocket 음성 AI 파이프라인 아키텍처 구축 — 서브세컨드 지연 시간, 자연스러운 대화 흐름, 완벽한 지원자 시뮬레이션 기능."
      },
      {
        en: "Rebuilt the NestJS backend from scratch: Node.js 24, NestJS 11, Prisma ORM, MariaDB via Docker Compose with custom network bridges, volume persistence, and port isolation. Relational schema (Candidate, CallSession, CallLog, AiPersona) with cascading deletes and optimised indexing.",
        ko: "NestJS 백엔드 전면 재구축: Node.js 24, NestJS 11, Prisma ORM, Docker Compose 기반 MariaDB. 커스텀 네트워크 브리지, 볼륨 영속성, 포트 격리. 관계형 스키마(Candidate, CallSession, CallLog, AiPersona) 인덱싱 최적화."
      },
      {
        en: "Built a zero-dependency AES-256-GCM PII encryption module with dynamic initialisation key handling; structured a global NestJS ConfigModule pipeline ensuring environment variable injection across database connectors and security utilities before module bootstrapping.",
        ko: "동적 초기화 키 처리를 갖춘 제로 디펜던시 AES-256-GCM PII 암호화 모듈 구축; 글로벌 NestJS ConfigModule 파이프라인 구조화."
      },
      {
        en: "Designed a deterministic LLM-judge evaluation framework: GPT-4o structured outputs grading 11 rubric metrics, BANTCQ sales evidence, and WPM Speech Telemetry — async scoring engine generating 2-week onboarding roadmaps per candidate.",
        ko: "결정론적 LLM 판사 평가 프레임워크 설계: GPT-4o 구조화 출력이 11개 루브릭 지표, BANTCQ 영업 증거 및 WPM 발화 텔레메트리를 평가 — 지원자별 2주 온보딩 로드맵을 생성하는 비동기 채점 엔진."
      },
      {
        en: "Provisioned AWS EC2 (ARM64) staging server: Nginx reverse proxy, SSL/TLS for WebRTC audio streams, outbound REST API routing. Authored full deployment documentation — DNS, system architecture, migration protocol — for clean vendor handover.",
        ko: "AWS EC2 (ARM64) 스테이징 서버 프로비저닝: Nginx 리버스 프록시, WebRTC 오디오 스트림용 SSL/TLS, 아웃바운드 REST API 라우팅. 완전한 배포 문서 작성."
      },
      {
        en: "Replaced static system prompts with a dynamic AiPersona model via Prisma and NestJS controllers — non-technical staff update AI coaching behaviours through the frontend without server redeployment.",
        ko: "Prisma 및 NestJS 컨트롤러를 통해 정적 시스템 프롬프트를 동적 AiPersona 모델로 대체 — 비기술진이 서버 재배포 없이 프론트엔드에서 AI 코칭 동작을 직접 업데이트 가능."
      }
    ]
  }
};

// SECTION 5 — CHEKKI EXPERIENCE
export interface ProductSummary {
  id: string;
  name: { en: string; ko: string };
  summary: { en: string; ko: string };
}

const CHEKKI_ROLE_DATA: Record<ActiveRole, {
  founderTitle: { en: string; ko: string };
  company: { en: string; ko: string };
  period: { en: string; ko: string };
  sub: { en: string; ko: string };
  products: ProductSummary[];
}> = {
  pm: {
    founderTitle: { en: "Founder & AI Product Manager", ko: "창업자 및 AI 프로덕트 매니저" },
    company: { en: "Chekki EdTech Solutions", ko: "Chekki EdTech Solutions" },
    period: { en: "Jan 2024 – Present", ko: "2024년 1월 – 현재" },
    sub: { en: "6-product AI suite for South Korean language academies and families", ko: "한국 어학원 및 가정을 위한 6개 AI 제품 스위트" },
    products: [
      {
        id: "eduplanner",
        name: { en: "EduPlanner Pro", ko: "EduPlanner Pro" },
        summary: {
          en: "Built a two-tier LLM scheduling engine (Gemini Pro for recursive conflict resolution, Gemini Flash for foundational grid generation) cutting 40 hours of manual academy scheduling to a 10-minute automated run.",
          ko: "40시간 소요되던 학원 수동 스케줄링을 10분 자동화 실행으로 단축하는 2계층 LLM 스케줄링 엔진(Gemini Pro + Flash) 구축."
        }
      },
      {
        id: "command-center",
        name: { en: "B2B Command Center", ko: "B2B Command Center" },
        summary: {
          en: "Shipped a Make.com + Gemini AI pipeline converting exception-first teacher observations into bilingual parent notes with Korean honorific formatting, driving 80% workload reduction across academy networks.",
          ko: "교사의 관찰 기록을 한국어 존댓말 양식의 이중언어 알림장으로 가공하는 Make.com + Gemini AI 파이프라인으로 업무량 80% 절감."
        }
      },
      {
        id: "chekki-ai",
        name: { en: "Chekki AI", ko: "Chekki AI" },
        summary: {
          en: "Led end-to-end product delivery for a bilingual AI homework assistant on the Apple App Store with zero-storage data architecture ensuring full COPPA compliance.",
          ko: "제로-스토리지 데이터 아키텍처로 COPPA 준수를 보장하는 애플 앱스토어 이중언어 AI 과제 도우미 전 제품 배포 주도."
        }
      },
      {
        id: "chekki-teacher",
        name: { en: "Chekki Teacher", ko: "Chekki Teacher" },
        summary: {
          en: "Shipped a live curriculum pre-seeding tool allowing teachers to define AI response boundaries — structurally eliminating hallucinations when parents check student homework. Includes automated mistake-pattern tracking and parent report generation.",
          ko: "교사가 AI 응답 경계를 정의하여 환각을 원천 차단하는 라이브 커리큘럼 사전 주입 도구 배포. 오답 패턴 추적 및 자동 보고서 생성 포함."
        }
      }
    ]
  },
  edtech: {
    founderTitle: { en: "Founder & EdTech Product Manager", ko: "창업자 및 에듀테크 프로덕트 매니저" },
    company: { en: "Chekki EdTech Solutions", ko: "Chekki EdTech Solutions" },
    period: { en: "Jan 2024 – Present", ko: "2024년 1월 – 현재" },
    sub: { en: "6-product AI suite for South Korean language academies and families", ko: "한국 어학원 및 가정을 위한 6개 AI 제품 스위트" },
    products: [
      {
        id: "chekki-teacher",
        name: { en: "Chekki Teacher", ko: "Chekki Teacher" },
        summary: {
          en: "Shipped a live curriculum pre-seeding platform where teachers define the AI's response boundaries before parents check student homework — structurally eliminating hallucinations. Includes mistake-pattern tracking across sessions and automated parent report generation.",
          ko: "교사가 AI 응답 경계를 사전 정의하여 환각을 원천 제거하는 커리큘럼 주입 플랫폼 배포. 오답 패턴 추적 및 학부모 보고서 자동 생성."
        }
      },
      {
        id: "benchmark",
        name: { en: "Benchmark AI", ko: "Benchmark AI" },
        summary: {
          en: "Built a continuous ESL assessment platform mapping real-time student mastery to CEFR and Cambridge YLE standards, with predictive churn alerts identifying at-risk students before dropout decisions occur.",
          ko: "학생의 학습 성취도를 CEFR 및 Cambridge YLE 표준에 매핑하고 퇴원 위험 조기 경보를 제공하는 상시 ESL 진단 평가 플랫폼 구축."
        }
      },
      {
        id: "chekki-ai",
        name: { en: "Chekki AI", ko: "Chekki AI" },
        summary: {
          en: "Led end-to-end product lifecycle for a bilingual AI homework assistant on the Apple App Store — zero-storage privacy architecture, full COPPA compliance, bilingual Korean/English go-to-market executed independently.",
          ko: "애플 앱스토어용 이중언어 AI 과제 도우미 전 제품 라이프사이클 주도 — 제로-스토리지 프라이버시 아키텍처, COPPA 준수, 이중언어 GTM 독립 실행."
        }
      },
      {
        id: "command-center",
        name: { en: "B2B Command Center", ko: "B2B Command Center" },
        summary: {
          en: "Shipped a Make.com + Gemini AI pipeline converting teacher observations into bilingual parent notes, driving 80% workload reduction across academy networks.",
          ko: "교사의 관찰 기록을 이중언어 학부모 리포트로 가공하는 Make.com + Gemini AI 파이프라인 배포로 업무량 80% 절감."
        }
      }
    ]
  },
  eng: {
    founderTitle: { en: "Founder & AI Integration Engineer", ko: "창업자 및 AI 인티그레이션 엔지니어" },
    company: { en: "Chekki EdTech Solutions", ko: "Chekki EdTech Solutions" },
    period: { en: "Jan 2024 – Present", ko: "2024년 1월 – 현재" },
    sub: { en: "6-product AI suite — designed, built, and deployed independently", ko: "6개 AI 제품 스위트 — 독립 설계, 구축 및 배포" },
    products: [
      {
        id: "eduplanner",
        name: { en: "EduPlanner Pro", ko: "EduPlanner Pro" },
        summary: {
          en: "Two-tier LLM pipeline (Gemini Pro for recursive conflict resolution, Gemini Flash for foundational grid generation) with API resilience layer — automatic Pro-to-Flash downgrade on rate-limit errors. 40 hours of scheduling to 10 minutes.",
          ko: "2계층 LLM 파이프라인(Gemini Pro + Flash) 및 API 탄력성 레이어 — 429 에러 시 자동 다운스케일링. 스케줄링 40시간에서 10분 단축."
        }
      },
      {
        id: "command-center",
        name: { en: "B2B Command Center", ko: "B2B Command Center" },
        summary: {
          en: "Make.com webhook pipeline → Gemini AI → bilingual parent notes with Korean honorific instruction trees and no-markdown output policy. Multi-tenant Airtable portal with RBAC, Magic Link auth, dynamic lookup keys. 80% workload reduction.",
          ko: "Make.com 웹훅 파이프라인 → Gemini AI → 한국어 높임법 이중언어 알림장. RBAC, 매직링크, 동적 룩업 키 기반 멀티테넌트 Airtable 포털."
        }
      },
      {
        id: "learning-diary",
        name: { en: "Learning Diary", ko: "Learning Diary" },
        summary: {
          en: "Client-side PDF synthesis via @react-pdf/renderer and Gemini 1.5 Flash. Dynamic Tenant Theming on a zero-trust Supabase RLS database — HEX brand injection, local font subsets, custom logos without code changes.",
          ko: "@react-pdf/renderer 및 Gemini 1.5 Flash 기반 클라이언트 사이드 PDF 생성. Supabase RLS 기반 동적 테넌트 테밍."
        }
      },
      {
        id: "chekki-ai",
        name: { en: "Chekki AI", ko: "Chekki AI" },
        summary: {
          en: "Zero-storage COPPA-compliant bilingual AI app on the Apple App Store — client-side PII sanitisation via regex masking before metadata reaches backend logs.",
          ko: "애플 앱스토어의 제로-스토리지 COPPA 준수 이중언어 AI 앱 — 백엔드 로그 도달 전 정규식 마스킹을 통한 클라이언트 사이드 PII 정화."
        }
      }
    ]
  }
};

// SECTION 6 — DOMAIN FOUNDATIONS (Combined Blend ENG & YBM entry matching resume PDFs)
const DOMAIN_ROLE_DATA: Record<ActiveRole, {
  title: { en: string; ko: string };
  company: { en: string; ko: string };
  period: { en: string; ko: string };
  bullet: { en: string; ko: string };
}> = {
  pm: {
    title: { en: "Domain & Pedagogical Foundations", ko: "도메인 & 교수법적 기반" },
    company: { en: "Blend ENG Academy · YBM PSA Seocho", ko: "Blend ENG Academy · YBM PSA Seocho" },
    period: { en: "Feb 2019 – Feb 2026", ko: "2019년 2월 – 2026년 2월" },
    bullet: {
      en: "Authored a commercial 20-volume English textbook series and built diagnostic assessment systems for 100+ students — the domain expertise powering all Chekki EdTech products.",
      ko: "상용 20권 분량의 영어 교재 저술 및 100여 명 이상의 학생 대상 진단 평가 시스템 구축 — 모든 Chekki 에듀테크 제품의 기반이 되는 도메인 전문성."
    }
  },
  edtech: {
    title: { en: "Domain & Pedagogical Foundations", ko: "도메인 & 교수법적 기반" },
    company: { en: "Blend ENG Academy · YBM PSA Seocho", ko: "Blend ENG Academy · YBM PSA Seocho" },
    period: { en: "Feb 2019 – Feb 2026", ko: "2019년 2월 – 2026년 2월" },
    bullet: {
      en: "Sole author of a commercial 20-volume K–Elementary English curriculum across 6 skill domains, and designed diagnostic benchmark assessment systems for 100+ students — the pedagogical foundation for every Chekki product.",
      ko: "6개 영어 영역에 걸친 20권 분량의 유초등 정규 출판 교재 단독 저술 및 100여 명 학생 대상 진단 평가 시스템 설계 — 모든 Chekki 제품의 교수법적 기반."
    }
  },
  eng: {
    title: { en: "Domain & Pedagogical Foundations", ko: "도메인 & 교수법적 기반" },
    company: { en: "Blend ENG Academy · YBM PSA Seocho", ko: "Blend ENG Academy · YBM PSA Seocho" },
    period: { en: "Feb 2019 – Feb 2026", ko: "2019년 2월 – 2026년 2월" },
    bullet: {
      en: "10 years of Korean education domain expertise — the bilingual and cultural context behind Korean honorific prompt engineering and parent-facing UX decisions across all Chekki systems.",
      ko: "10년간의 한국 교육 현장 경험 — 모든 Chekki 시스템의 한국어 높임법 프롬프트 엔지니어링 및 학부모 UX 결정의 배경이 되는 언어적/문화적 도메인 노하우."
    }
  }
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
  const domainData = DOMAIN_ROLE_DATA[activeRole];

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
      eduEssexDegree: "Master of Education (M.Ed.) — Educational Management",
      eduEssexSchool: "University of Essex · 2022",
      eduUwcDegree: "Bachelor of Commercial Law (LL.B.)",
      eduUwcSchool: "University of the Western Cape · 2013"
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
      eduEssexDegree: "교육학 석사 (M.Ed.) — 교육경영학",
      eduEssexSchool: "University of Essex (영국 에식스 대학교) · 2022년",
      eduUwcDegree: "상법 학사 (LL.B.)",
      eduUwcSchool: "University of the Western Cape · 2013년"
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
                      {vodabiData.company[locale]}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono opacity-60 text-white shrink-0">
                    {vodabiData.period[locale]}
                  </span>
                </div>
                <p className="text-xs font-light italic text-white/70">
                  {vodabiData.sub[locale]}
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
                      {chekkiData.company[locale]}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono opacity-60 text-white shrink-0">
                    {chekkiData.period[locale]}
                  </span>
                </div>
                <p className="text-xs font-light italic text-white/70">
                  {chekkiData.sub[locale]}
                </p>

                {/* CHEKKI PRODUCTS */}
                <div className="space-y-3 pt-1">
                  {chekkiData.products.map((prod) => (
                    <div key={prod.id} className="p-3 rounded-lg border border-white/5 bg-neutral-900/60 space-y-1.5">
                      <span className="text-xs font-bold text-accent-gold font-mono block">
                        📁 {prod.name[locale]}
                      </span>
                      <p className={`text-[11.5px] leading-relaxed font-light ${isDark ? 'text-white/80' : 'text-neutral-800'}`}>
                        – {prod.summary[locale]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ENTRY 3 — DOMAIN & PEDAGOGICAL FOUNDATIONS */}
              <div className="p-4 rounded-xl border border-white/10 bg-neutral-950/40 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b pb-2 border-white/10">
                  <div>
                    <h5 className="text-sm font-bold text-accent-gold font-display">
                      {domainData.title[locale]}
                    </h5>
                    <span className="text-xs font-semibold text-white/80 block">
                      {domainData.company[locale]}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono opacity-60 text-white shrink-0">
                    {domainData.period[locale]}
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1.5 pl-1 pt-1">
                  <li className={`text-xs leading-relaxed font-light ${isDark ? 'text-white/80' : 'text-neutral-800'}`}>
                    {domainData.bullet[locale]}
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
              font-size: 24pt !important;
              font-weight: 800 !important;
              color: #111827 !important;
              margin: 0 0 2pt 0 !important;
              letter-spacing: -0.5px !important;
            }
            .print-document .print-headline {
              font-size: 11pt !important;
              font-weight: 700 !important;
              color: #1D4ED8 !important;
              margin: 0 0 6pt 0 !important;
            }
            .print-document .print-contact {
              font-size: 8.5pt !important;
              color: #4B5563 !important;
              margin: 0 0 10pt 0 !important;
              padding-bottom: 6pt !important;
              border-bottom: 1.5px solid #E5E7EB !important;
            }
            .print-document h2 {
              font-size: 9.5pt !important;
              font-weight: 800 !important;
              color: #111827 !important;
              text-transform: uppercase !important;
              letter-spacing: 0.8px !important;
              border-bottom: 1.5px solid #1D4ED8 !important;
              padding-bottom: 2pt !important;
              margin-top: 10pt !important;
              margin-bottom: 5pt !important;
            }
            .print-document p {
              font-size: 9pt !important;
              color: #374151 !important;
              line-height: 1.45 !important;
              margin: 0 0 5pt 0 !important;
            }
            .print-document ul {
              margin-top: 2pt !important;
              margin-bottom: 5pt !important;
              padding-left: 0 !important;
              list-style: none !important;
            }
            .print-document li {
              font-size: 9pt !important;
              color: #374151 !important;
              line-height: 1.4 !important;
              margin-bottom: 2.5pt !important;
              padding-left: 12pt !important;
              text-indent: -12pt !important;
            }
            .print-document .print-exp-block {
              margin-bottom: 8pt !important;
              page-break-inside: avoid !important;
            }
            .print-document .print-exp-header {
              display: flex !important;
              justify-content: space-between !important;
              align-items: baseline !important;
              margin-bottom: 1pt !important;
            }
            .print-document .print-title {
              font-size: 10pt !important;
              font-weight: 700 !important;
              color: #111827 !important;
            }
            .print-document .print-company {
              font-size: 10pt !important;
              font-weight: 700 !important;
              color: #1D4ED8 !important;
            }
            .print-document .print-dates {
              font-size: 8.5pt !important;
              color: #6B7280 !important;
            }
            .print-document .print-subtitle {
              font-size: 9pt !important;
              font-weight: 500 !important;
              font-style: italic !important;
              color: #4B5563 !important;
              margin-bottom: 3pt !important;
            }
            .print-document .print-skill-row {
              margin-bottom: 3pt !important;
              font-size: 9pt !important;
              line-height: 1.4 !important;
            }
            .print-document .print-skill-label {
              font-weight: 700 !important;
              color: #111827 !important;
            }
            .print-document .print-prod-bullet {
              font-size: 9pt !important;
              color: #374151 !important;
              line-height: 1.4 !important;
              margin-bottom: 3pt !important;
              padding-left: 12pt !important;
              text-indent: -12pt !important;
            }
          }
        ` }} />

        {/* HEADER */}
        <h1>JASON BENJAMIN</h1>
        <div className="print-headline">{roleTitle}</div>
        <div className="print-contact">
          jsn.benjamin@gmail.com · 010-5371-9266 · Seoul, South Korea (Open to Remote) · jason-portfolio.com
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
              <span style={{ color: '#1D4ED8', fontWeight: 700 }}> · </span>
              <span className="print-company">{vodabiData.company[locale]}</span>
            </div>
            <span className="print-dates">{vodabiData.period[locale]}</span>
          </div>
          <div className="print-subtitle">{vodabiData.sub[locale]}</div>
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
              <span style={{ color: '#1D4ED8', fontWeight: 700 }}> · </span>
              <span className="print-company">{chekkiData.company[locale]}</span>
            </div>
            <span className="print-dates">{chekkiData.period[locale]}</span>
          </div>
          <div className="print-subtitle">{chekkiData.sub[locale]}</div>
          <ul>
            {chekkiData.products.map((p) => (
              <li key={p.id} className="print-prod-bullet">
                – <strong>{p.name[locale]}:</strong> {p.summary[locale]}
              </li>
            ))}
          </ul>
        </div>

        {/* DOMAIN & PEDAGOGICAL FOUNDATIONS */}
        <div className="print-exp-block">
          <div className="print-exp-header">
            <div>
              <span className="print-title">{domainData.title[locale]}</span>
              <span style={{ color: '#1D4ED8', fontWeight: 700 }}> · </span>
              <span className="print-company">{domainData.company[locale]}</span>
            </div>
            <span className="print-dates">{domainData.period[locale]}</span>
          </div>
          <ul>
            <li>– {domainData.bullet[locale]}</li>
          </ul>
        </div>

        {/* EDUCATION */}
        <h2>{locale === 'en' ? "Education" : "학력 사항"}</h2>
        <div className="print-exp-block">
          <div className="print-exp-header">
            <span className="print-title">{labels.eduEssexDegree}</span>
            <span className="print-dates">2022</span>
          </div>
          <div className="print-subtitle">University of Essex</div>
        </div>
        <div className="print-exp-block" style={{ marginTop: '3pt' }}>
          <div className="print-exp-header">
            <span className="print-title">{labels.eduUwcDegree}</span>
            <span className="print-dates">2013</span>
          </div>
          <div className="print-subtitle">University of the Western Cape</div>
        </div>

      </div>

    </div>
  );
}

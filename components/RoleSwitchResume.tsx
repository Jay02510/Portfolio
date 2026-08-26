import React from 'react';
import { motion } from 'motion/react';

interface ResumeProps {
  locale: 'en' | 'ko';
  theme: 'light' | 'dark';
}

export const RESUME_DATA = {
  header: {
    name: "JASON BENJAMIN",
    title: {
      en: "AI Product Manager & Engineer — Voice AI · LLM Systems · B2B SaaS",
      ko: "AI 프로덕트 매니저 & 엔지니어 — 음성 AI · LLM 시스템 · B2B SaaS"
    },
    contact: {
      email: "jsn.benjamin@gmail.com",
      phone: "010-5371-9266",
      location: {
        en: "Seoul, Korea (Remote OK)",
        ko: "대한민국 서울 (원격 근무 가능)"
      },
      website: "www.jason-portfolio.com"
    }
  },
  profile: {
    en: "Sole engineer and product owner who shipped a production voice-AI interview/coaching platform from zero — realtime WebRTC voice pipeline, deterministic LLM evaluation engine, admin console, security hardening, and full deployment — in under four weeks. Also built and launched six AI products for Korean education markets independently, with a documented 19-entry product decision log across both portfolios.\n\nWrites PRDs, runs customer discovery, makes and defends architecture trade-offs in writing, and owns the full path from problem to production. Known for rejecting features that don't close a real user gap — and documenting why. Bilingual EN/KR product experience across consumer mobile, B2B SaaS, and enterprise AI contexts.",
    ko: "실시간 WebRTC 음성 파이프라인, 결정론적 LLM 평가 엔진, 어드민 콘솔, 보안 하드닝 및 전체 배포까지 프로덕션 음성 AI 인터뷰/코칭 플랫폼을 4주 만에 0에서 1인으로 구축·배포한 엔지니어 겸 프로덕트 오너입니다. 또한 한국 교육 시장을 위한 6개 AI 프로덕트를 독립 구축·출시하였으며 두 포트폴리오 전반에 걸쳐 19개의 문서화된 프로덕트 의사결정 로그를 보유하고 있습니다.\n\nPRD 작성, 고객 디스커버리 수행, 아키텍처 트레이드오프 문서화 및 방어를 주도하며 문제 정의부터 프로덕션 배포까지 전 과정을 직접 책임집니다. 실제 사용자 문제를 해결하지 않는 불필요한 기능은 과감히 배제하고 그 이유를 문서화합니다. B2C 모바일, B2B SaaS, 엔터프라이즈 AI 맥락 전반에서 검증된 한/영 이중언어 제품 개발 역량을 갖추고 있습니다."
  },
  skills: {
    aiVoice: {
      label: { en: "AI & Voice Systems", ko: "AI & 음성 시스템" },
      items: [
        "OpenAI Realtime API (WebRTC, ephemeral tokens)", "GPT-4o", "Gemini 2.5 Flash/Pro (multimodal/vision)",
        "LLM Judge Architecture", "Deterministic AI Evaluation", "Prompt Engineering",
        "Structured JSON Outputs (constrained responseSchema)", "Hallucination Mitigation",
        "Retrieval-grounded generation"
      ]
    },
    engineeringInfra: {
      label: { en: "Engineering & Infra", ko: "엔지니어링 & 인프라" },
      items: [
        "React 19", "TypeScript", "Vite", "NestJS 11", "Node.js 24", "Prisma 7", "MariaDB",
        "Firebase/Firestore", "Firestore Security Rules", "Capacitor (iOS/Android)", "RevenueCat",
        "Docker/Compose", "Caddy", "AWS EC2", "Upstash Redis", "GitHub Actions", "Vitest",
        "Sentry", "Vercel Serverless"
      ]
    },
    productMgmt: {
      label: { en: "Product & AI Management", ko: "프로덕트 & AI 매니지먼트" },
      items: [
        "PRD Authorship", "0-to-1 Product Development", "Customer Discovery", "User Research",
        "Documented Decision-Making", "Prompt Experimentation", "A/B Testing", "Go-to-Market",
        "Cross-Functional Collaboration", "Stakeholder Management", "B2B SaaS", "Enterprise AI SaaS",
        "RBAC", "Agile", "OKRs", "Retention & Churn Analysis", "Bilingual Product Design (EN/KR)"
      ]
    },
    otherTools: {
      label: { en: "Other Tools", ko: "기타 도구" },
      items: ["Make.com", "Airtable"]
    }
  },
  experience: {
    vodabi: {
      title: {
        en: "AI Product Manager & Engineer",
        ko: "AI 프로덕트 매니저 & 엔지니어"
      },
      company: {
        en: "VodaBi",
        ko: "VodaBi"
      },
      period: {
        en: "Jul 2026 – Present",
        ko: "2026년 7월 – 현재"
      },
      sub: {
        en: "Voice-AI sales coaching & testing platform (speech-to-speech) · Solo build · Production-deployed · 39 commits · 85 backend modules",
        ko: "음성 AI 영업 코칭 & 테스트 플랫폼 (Speech-to-Speech) · 1인 개발 · 프로덕션 배포 · 39개 커밋 · 85개 백엔드 모듈"
      },
      bullets: [
        {
          tag: { en: "Voice Pipeline", ko: "음성 파이프라인" },
          text: {
            en: "Migrated live voice roleplay from a server-relayed model to a direct browser-to-OpenAI WebRTC connection (OpenAI Realtime API, ephemeral tokens), removing the backend from the live audio path entirely — a ~200ms latency reduction per conversation turn.",
            ko: "실시간 음성 롤플레이를 서버 중계형에서 브라우저-OpenAI 간 직접 WebRTC 연결(OpenAI Realtime API, 임시 토큰)로 전환하여 백엔드를 실시간 오디오 경로에서 완전히 배제 — 매 대화 턴당 ~200ms 지연 감소 달성."
          }
        },
        {
          tag: { en: "Solo Platform Rebuild", ko: "솔로 플랫폼 재구축" },
          text: {
            en: "Originally scoped to build a coaching/reasoning layer on top of an existing production voice-testing system; when that system was found to be poorly architected, independently redesigned and rebuilt the entire platform from scratch — without access to the original source code — including the coaching layer, and shipped to production in ~3 weeks.",
            ko: "기존 프로덕션 음성 테스트 시스템 위에 코칭/추론 레이어를 구축하는 것으로 시작했으나, 기존 아키텍처의 한계를 파악한 후 원본 소스코드 접근 없이 코칭 레이어를 포함한 전체 플랫폼을 바닥부터 독립적으로 재설계 및 재구축하여 약 3주 만에 프로덕션 배포 완료."
          }
        },
        {
          tag: { en: "Deterministic LLM Evaluation Engine", ko: "결정론적 LLM 평가 엔진" },
          text: {
            en: "Built a post-call scoring pipeline (transcript → GPT-4o → structured per-criterion scores) graded against admin-configurable rubrics — fully grounded in uploaded rubrics rather than open-ended inference, resulting in 100% deterministic scoring with zero AI hallucinations.",
            ko: "통화 후 트랜스크립트를 어드민 설정 루브릭에 맞춰 GPT-4o로 심사하여 기준별 구조화 점수를 산출하는 사후 채점 파이프라인 구축 — 개방형 추론 대신 업로드된 루브릭에 완전히 앵커링하여 AI 환각 없는 100% 결정론적 채점 결과 산출."
          }
        },
        {
          tag: { en: "Reliability Fixes vs. Prior System", ko: "기존 시스템 대비 신뢰성 개선" },
          text: {
            en: "Diagnosed and resolved key gaps in the original platform — no backup database, no coaching/reasoning layer, no voice-selection option, and background noise being misread as speech — adding backup databases, a native coaching layer, a voice picker, and improved audio handling.",
            ko: "백업 데이터베이스 부재, 코칭/추론 레이어 부재, 음성 선택 옵션 부재, 배경 소음의 음성 오인식 등 기존 플랫폼의 핵심 결함을 진단 및 해결 — DB 자동 백업, 네이티브 코칭 레이어, 음성 피커, 오디오 핸들링 개선 구현."
          }
        },
        {
          tag: { en: "Admin Console & Scenario System", ko: "어드민 콘솔 & 시나리오 시스템" },
          text: {
            en: "Built a full backoffice for non-engineers to create interview personas, scenario types, and scoring tiers without touching code — currently supports 8 scenarios across 3 difficulty tiers, extensible by non-technical staff.",
            ko: "비엔지니어가 코드 수정 없이 면접 페르소나, 시나리오 유형, 채점 티어를 직접 생성·관리하는 풀 백오피스 구축 — 현재 3단계 난이도에 걸쳐 8개 시나리오 지원 및 비개발 인력의 자체 확장 가능."
          }
        },
        {
          tag: { en: "Bilingual Accessibility", ko: "이중언어 접근성" },
          text: {
            en: "Added full Korean and English language accessibility (not present in the original system) as a non-native Korean speaker.",
            ko: "비원어민 한국어 구사자로서 기존 시스템에 부재했던 한국어 및 영어 전체 다국어 접근성을 완벽 구현."
          }
        },
        {
          tag: { en: "Security Hardening", ko: "보안 하드닝" },
          text: {
            en: "Ran two independent security passes on a system handling candidate PII — field-level encryption at rest, JWT/token hardening, CORS lockdown, DTO validation, role-freshness checks, auth race condition fixes — ahead of any incident, not as cleanup.",
            ko: "후보자 PII를 다루는 시스템에 대해 2회에 걸친 독립 보안 감사 완결 — 저장 시 AES-256-GCM 필드 레벨 암호화, JWT/토큰 하드닝, CORS 엄격 제한, DTO 검증, 권한 신선도 검사, 인증 레이스 컨디션 해결을 인시던트 발생 전 선제 조치."
          }
        },
        {
          tag: { en: "Infrastructure", ko: "인프라 & 배포" },
          text: {
            en: "Containerized full-stack (Docker/Compose), Caddy reverse proxy with automatic HTTPS, healthchecks, resource limits, loopback-only DB ports, log retention caps, DB backup script. Own the full deploy cycle: build → registry push → SSH → rollout → health verify on AWS EC2.",
            ko: "풀스택 컨테이너화(Docker/Compose), Caddy 자동 HTTPS 역방향 프록시, 헬스체크, 리소스 제한, 루프백 전용 DB 포트, 로그 보존 한도, DB 백업 스크립트 구축. AWS EC2 상에서 빌드 → 레지스트리 푸시 → SSH → 롤아웃 → 헬스 검증의 전체 배포 사이클 전담 소유."
          }
        },
        {
          tag: { en: "Business Traction", ko: "비즈니스 트랙션 & 엔터프라이즈 도입" },
          text: {
            en: "Rebuilt platform is now in active pilot discussions with two major Korean financial institutions evaluating it for employee sales-skills testing.",
            ko: "재구축된 플랫폼은 현재 직원 영업 역량 테스트 도입을 검토 중인 한국의 2대 주요 금융기관과 활발한 파일럿 논의를 진행 중."
          }
        },
        {
          tag: { en: "UX Rebuild", ko: "UX 재설계" },
          text: {
            en: "Integrated a UI/UX designer's Figma spec, replacing the entire frontend UI/UX — countdown, live progress, gamified report with XP/badges/ranking. Root-caused a silent data-loss bug (mic permission requested after the countdown, not before) by tracing backend logs rather than guessing from symptoms.",
            ko: "UI/UX 디자이너의 Figma 스펙을 반영하여 프론트엔드 전체 UI/UX 재구축 — 카운트다운, 실시간 프로그레스, 게이미피케이션 리포트(XP/배지/랭킹). 백엔드 로그 추적을 통해 마이크 권한이 카운트다운 후 요청되어 발생하던 무음 데이터 유실 버그의 근본 원인을 해결."
          }
        }
      ]
    },
    chekki: {
      title: {
        en: "Founder & AI Product Manager",
        ko: "창업자 & AI 프로덕트 매니저"
      },
      company: {
        en: "Chekki EdTech Solutions",
        ko: "Chekki EdTech Solutions"
      },
      period: {
        en: "Jan 2024 – Present",
        ko: "2024년 1월 – 현재"
      },
      sub: {
        en: "AI homework grading and teacher/parent report loop for Korean English academies · Web · iOS · Android",
        ko: "한국 어학원을 위한 AI 숙제 채점 및 교사/학부모 피드백 루프 · Web · iOS · Android"
      },
      bullets: [
        {
          tag: { en: "Core Loop", ko: "핵심 루프" },
          text: {
            en: "Designed a closed parent → teacher → director pipeline: a parent scans homework against a teacher-uploaded answer key (OCR'd into Firestore, not AI-guessed), gets instant bilingual grading in under 20 seconds, mistakes aggregate to a class-level gap view, and the teacher logs the day — with a KT human-confirmation step before any AI-drafted content reaches a parent.",
            ko: "학부모 → 교사 → 원장으로 이어지는 폐쇄 파이프라인 설계: 교사가 사전 등록한 정답지(Firestore OCR 저장, AI 임의 추측 배제)와 대조해 20초 미만 즉각 이중언어 채점 제공, 오답 패턴을 학급 단위 취약점 뷰로 집계, 한국인 교사의 사전 검토(KT 확인) 후 학부모에게 최종 전달."
          }
        },
        {
          tag: { en: "Grounded Grading", ko: "정답지 기반 채점" },
          text: {
            en: "Built a multimodal grading pipeline (Gemini 2.5 Flash/Pro vision) that grounds every correction in the class's actual teacher-uploaded answer key rather than model inference, preventing hallucinated grading — the core differentiator versus generic homework-scanning apps. Structured JSON output via constrained responseSchema; safety-threshold tuned prompts.",
            ko: "일반 숙제 스캔 앱과 차별화되는 핵심으로, 모델 추론이 아닌 실제 학급 정답지에 모든 채점을 앵커링하여 환각 채점을 원천 차단하는 멀티모달 채점 파이프라인(Gemini 2.5 Flash/Pro 비전) 구축. 제약된 responseSchema 기반 구조화 JSON 출력 및 안전 임계값 튜닝 프롬프트 적용."
          }
        },
        {
          tag: { en: "Chekki Schools (in final testing)", ko: "Chekki Schools (최종 테스트 중)" },
          text: {
            en: "Extended the product into a two-sided school system running two concurrent loops — (1) foreign teachers submit typed/voice class updates auto-translated to Korean and routed to Korean teachers for parents, eliminating manual translation and page-lookup work; (2) teachers pre-review homework/answer keys, and any parent-side grading mistakes are automatically routed back to the teacher's dashboard for pre-class review. Targeting a pilot with at least two schools once final testing is complete.",
            ko: "2개의 동시 루프를 실행하는 양방향 학교 시스템으로 확장 — (1) 원어민 교사가 입력한 텍스트/음성 수업 업데이트가 한국어로 자동 번역되어 한국인 교사를 거쳐 학부모에게 전달(수기 번역 및 교재 대조 작업 제거); (2) 교사가 숙제/정답지를 사전 검토하고, 학부모 측 채점 오류는 수업 전 교사 대시보드로 자동 회수되어 사전 확인. 최종 테스트 완료 후 최소 2개 학교 파일럿 도입 목표."
          }
        },
        {
          tag: { en: "Product Decisions", ko: "프로덕트 의사결정" },
          text: {
            en: "Maintained a 19-entry architecture/product decision log — including rejecting a unified FT chatbot after mapping actual user friction, cutting five scope-creep features in a stabilization pass, and removing a community feed that contained fabricated placeholder posts (flagged as an honesty problem, not just clutter).",
            ko: "19개의 아키텍처/제품 의사결정 로그 관리 — 실제 사용자 마찰 매핑 후 원어민 교사용 통합 챗봇 기각, 안정화 패스에서 5개 잉여 기능 정리, 가짜 게시물이 포함된 커뮤니티 피드 제거(단순 군더더기가 아닌 데이터 정직성 이슈로 식별)."
          }
        },
        {
          tag: { en: "Infrastructure Constraint", ko: "인프라 제약 극복" },
          text: {
            en: "Engineered around Vercel Hobby's 12-function ceiling by consolidating nearly every AI task and four redundant endpoints into shared serverless functions — without breaking already-shipped native mobile builds, via URL-preserving rewrites in vercel.json.",
            ko: "거의 모든 AI 작업과 4개의 중복 엔드포인트를 공유 서버리스 함수로 통합하여 Vercel Hobby의 12개 함수 한도를 극복 — vercel.json URL 리라이트를 통해 기배포된 네이티브 모바일 앱의 호환성을 100% 유지."
          }
        },
        {
          tag: { en: "Refactor & CI", ko: "리팩토링 & CI 파이프라인" },
          text: {
            en: "Split a 4,678-line multi-role monolith (TeacherPage.tsx) into role-scoped hooks and shells across six shipped phases with zero functional regressions. Introduced the codebase's first CI pipeline (typecheck/test/lint/build on every PR) and Vitest suite.",
            ko: "4,678줄 규모의 다역할 모놀리스(TeacherPage.tsx)를 6단계에 걸쳐 역할별 훅과 셸 컴포넌트로 기능 오류 없이 무결점 분리. 코드베이스 최초의 CI 파이프라인(모든 PR 대상 타입체크/테스트/린트/빌드) 및 Vitest 테스트 스위트 도입."
          }
        },
        {
          tag: { en: "Cross-Platform", ko: "크로스 플랫폼" },
          text: {
            en: "Shipped to web, iOS, and Android from one codebase (React 19 + Capacitor) with full Korean/English parity as a hard non-functional requirement, native subscription billing (RevenueCat + Apple Server API), and multi-provider auth (Apple, Google, Kakao).",
            ko: "단일 코드베이스(React 19 + Capacitor)로 웹, iOS, 안드로이드 동시 출시 — 한/영 완전 동등성을 필수 비기능 요구사항으로 준수, 네이티브 구독 결제(RevenueCat + Apple Server API) 및 다중 간편 인증(애플, 구글, 카카오) 연동."
          }
        }
      ]
    },
    blend: {
      title: {
        en: "Curriculum Lead & Senior Educator",
        ko: "커리큘럼 리드 & 수석 강사"
      },
      company: {
        en: "Blend ENG Academy · Seoul",
        ko: "Blend ENG Academy · 서울"
      },
      period: {
        en: "Feb 2023 – Feb 2026",
        ko: "2023년 2월 – 2026년 2월"
      },
      sub: {
        en: "Private English academy · Kindergarten through Elementary · Senior educator, curriculum designer, and AI content producer",
        ko: "프라이빗 어학원 · 유치부 및 초등부 · 수석 강사, 커리큘럼 디자이너 및 AI 콘텐츠 기획"
      },
      bullets: [
        {
          tag: { en: "Commercial Curriculum Series", ko: "상용 교재 시리즈 개발" },
          text: {
            en: "Designed and produced a 20-volume commercial English curriculum series using AI tools and Canva — from content architecture and lesson sequencing to print-ready layout — used across all classes from age 5 through elementary after-class students (~200 students), now commercially sold through the institution and in active daily classroom use.",
            ko: "AI 도구와 Canva를 활용해 20권 분량의 상용 영어 교재 시리즈 기획 및 제작 — 콘텐츠 아키텍처, 레슨 시퀀싱부터 인쇄용 레이아웃까지 완성하여 5세부터 초등부 방과후(~200명 학생) 전체 학급에 적용, 학원을 통해 상용 판매 및 매일 실제 수업에 사용."
          }
        },
        {
          tag: { en: "Diagnostic Benchmark System", ko: "진단 벤치마크 평가 시스템" },
          text: {
            en: "Built a school-wide diagnostic benchmark assessment system, piloted on his own class, enabling data-driven identification of learning gaps and targeted intervention — the direct product precedent for Chekki's Benchmark AI.",
            ko: "100명 이상의 학생을 대상으로 데이터 기반 학습 결손 식별 및 맞춤형 지도를 가능케 하는 원내 진단 벤치마크 평가 시스템 구축(담당 학급 대상 선제 파일럿) — Chekki의 Benchmark AI 제품의 직접적 모태."
          }
        },
        {
          tag: { en: "Bilingual Operations", ko: "이중언어 학부모 소통 & 운영" },
          text: {
            en: "Managed bilingual parent communication (EN/KR), progress reporting, and homeroom operations — the real-world context informing every parent-facing UX decision in Chekki products.",
            ko: "한/영 이중언어 학부모 상담, 성취도 리포팅, 담임 학급 운영 총괄 — Chekki 제품군의 모든 학부모 대상 UX 의사결정을 뒷받침하는 현장 도메인 맥락 확립."
          }
        }
      ]
    },
    ybm: {
      title: {
        en: "Homeroom Educator",
        ko: "담임 교사 (Homeroom Educator)"
      },
      company: {
        en: "YBM PSA Seocho · Seoul",
        ko: "YBM PSA 서초 · 서울"
      },
      period: {
        en: "Feb 2019 – Feb 2023",
        ko: "2019년 2월 – 2023년 2월"
      },
      sub: {
        en: "Full-immersion EFL instruction · One of Seoul's largest English kindergartens",
        ko: "몰입형 영어 교육 · 서울 최대 규모 프리미엄 영어 유치부"
      },
      bullets: [
        {
          tag: { en: "Immersive Instruction", ko: "몰입형 교육 & 도메인 전문성" },
          text: {
            en: "Four years of full-immersion EFL instruction — building the Korean market domain expertise and bilingual communication instincts behind every later product decision.",
            ko: "4년간의 전일제 몰입형 영어 교육 전담 — 이후 모든 제품 의사결정을 뒷받침하는 한국 교육 시장 도메인 전문성과 이중언어 소통 감각 구축."
          }
        }
      ]
    }
  },
  education: [
    {
      degree: {
        en: "Master of Education (M.Ed.) — Educational Management",
        ko: "교육학 석사 (M.Ed.) — 교육경영학"
      },
      school: {
        en: "University of Essex",
        ko: "University of Essex (영국 에식스 대학교)"
      },
      year: "2022"
    },
    {
      degree: {
        en: "Bachelor of Commercial Law (LL.B.)",
        ko: "상법 학사 (LL.B.)"
      },
      school: {
        en: "University of the Western Cape",
        ko: "University of the Western Cape"
      },
      year: "2013"
    }
  ]
};

// Export ActiveRole and ROLE_TITLES for any backwards-compatibility
export type ActiveRole = 'pm';
export const ROLE_TITLES: Record<string, { en: string; ko: string }> = {
  pm: RESUME_DATA.header.title
};

export default function UnifiedResume({ locale, theme }: ResumeProps) {
  const isDark = theme === 'dark';
  const data = RESUME_DATA;

  const labels = {
    en: {
      profile: "PROFILE",
      experience: "EXPERIENCE",
      skills: "TECHNICAL SKILLS",
      education: "EDUCATION",
      badge: "UNIFIED CAREER RESUME",
      productAiLabel: "Product & AI",
      toolsInfraLabel: "Tools & Infra"
    },
    ko: {
      profile: "프로필 요약 (PROFILE)",
      experience: "경력 사항 (EXPERIENCE)",
      skills: "직무 핵심 역량 & 기술 스택 (TECHNICAL SKILLS)",
      education: "학력 사항 (EDUCATION)",
      badge: "통합 경력 명세서",
      productAiLabel: "프로덕트 & AI",
      toolsInfraLabel: "도구 & 인프라"
    }
  }[locale];

  return (
    <div id="unified-resume-root" className="space-y-8">
      {/* SCREEN VIEW */}
      <div className="print:hidden space-y-8">
        
        {/* RESUME HEADER CARD */}
        <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
          isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10 shadow-sm'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 border-accent-gold/20">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-accent-gold/15 text-accent-gold border border-accent-gold/30">
                  {labels.badge}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-accent-gold">
                {data.header.name}
              </h1>
              <h2 className={`text-sm sm:text-base font-semibold mt-1 ${isDark ? 'text-white/90' : 'text-alpine-950/90'}`}>
                {data.header.title[locale]}
              </h2>
            </div>
            
            <div className={`text-xs space-y-1 sm:text-right font-mono ${isDark ? 'text-white/70' : 'text-alpine-950/70'}`}>
              <div>{data.header.contact.email}</div>
              <div>{data.header.contact.phone}</div>
              <div>{data.header.contact.location[locale]}</div>
              <div className="text-accent-gold font-bold">{data.header.contact.website}</div>
            </div>
          </div>

          {/* PROFILE SUMMARY */}
          <div className="pt-6 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-accent-gold font-mono flex items-center gap-2">
              <span>✦</span> {labels.profile}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed whitespace-pre-line font-light ${
              isDark ? 'text-white/85' : 'text-neutral-800'
            }`}>
              {data.profile[locale]}
            </p>
          </div>
        </div>

        {/* EXPERIENCE SECTION */}
        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-accent-gold font-mono flex items-center gap-2">
            <span>💼</span> {labels.experience}
          </h3>

          {/* 1. VODABI */}
          <div className={`p-5 sm:p-7 rounded-2xl border transition-all space-y-4 ${
            isDark ? 'bg-white/[0.02] border-accent-gold/30' : 'bg-white border-accent-clay/30 shadow-sm'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b pb-3 border-accent-gold/20">
              <div>
                <h4 className="text-base font-bold text-accent-gold font-display">
                  {data.experience.vodabi.title[locale]}
                </h4>
                <span className={`text-xs sm:text-sm font-semibold block ${isDark ? 'text-white/90' : 'text-alpine-950'}`}>
                  {data.experience.vodabi.company[locale]}
                </span>
              </div>
              <span className="text-xs font-mono opacity-60 shrink-0 text-accent-gold font-bold">
                {data.experience.vodabi.period[locale]}
              </span>
            </div>

            <p className={`text-xs font-medium italic ${isDark ? 'text-white/70' : 'text-neutral-600'}`}>
              {data.experience.vodabi.sub[locale]}
            </p>

            <ul className="space-y-3 pt-1">
              {data.experience.vodabi.bullets.map((b, idx) => (
                <li key={idx} className="space-y-1">
                  <div className="text-xs font-bold text-accent-gold font-mono flex items-center gap-1.5">
                    <span>–</span> <span>{b.tag[locale]}:</span>
                  </div>
                  <p className={`text-xs sm:text-[13px] leading-relaxed pl-4 font-light ${
                    isDark ? 'text-white/80' : 'text-neutral-800'
                  }`}>
                    {b.text[locale]}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. CHEKKI */}
          <div className={`p-5 sm:p-7 rounded-2xl border transition-all space-y-4 ${
            isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-black/10 shadow-sm'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b pb-3 border-white/10">
              <div>
                <h4 className="text-base font-bold text-accent-gold font-display">
                  {data.experience.chekki.title[locale]}
                </h4>
                <span className={`text-xs sm:text-sm font-semibold block ${isDark ? 'text-white/90' : 'text-alpine-950'}`}>
                  {data.experience.chekki.company[locale]}
                </span>
              </div>
              <span className="text-xs font-mono opacity-60 shrink-0 text-accent-gold font-bold">
                {data.experience.chekki.period[locale]}
              </span>
            </div>

            <p className={`text-xs font-medium italic ${isDark ? 'text-white/70' : 'text-neutral-600'}`}>
              {data.experience.chekki.sub[locale]}
            </p>

            <ul className="space-y-3 pt-1">
              {data.experience.chekki.bullets.map((b, idx) => (
                <li key={idx} className="space-y-1">
                  <div className="text-xs font-bold text-accent-gold font-mono flex items-center gap-1.5">
                    <span>–</span> <span>{b.tag[locale]}:</span>
                  </div>
                  <p className={`text-xs sm:text-[13px] leading-relaxed pl-4 font-light ${
                    isDark ? 'text-white/80' : 'text-neutral-800'
                  }`}>
                    {b.text[locale]}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. BLEND ENG ACADEMY */}
          <div className={`p-5 sm:p-7 rounded-2xl border transition-all space-y-4 ${
            isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-black/10 shadow-sm'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b pb-3 border-white/10">
              <div>
                <h4 className="text-base font-bold text-accent-gold font-display">
                  {data.experience.blend.title[locale]}
                </h4>
                <span className={`text-xs sm:text-sm font-semibold block ${isDark ? 'text-white/90' : 'text-alpine-950'}`}>
                  {data.experience.blend.company[locale]}
                </span>
              </div>
              <span className="text-xs font-mono opacity-60 shrink-0 text-accent-gold font-bold">
                {data.experience.blend.period[locale]}
              </span>
            </div>

            <p className={`text-xs font-medium italic ${isDark ? 'text-white/70' : 'text-neutral-600'}`}>
              {data.experience.blend.sub[locale]}
            </p>

            <ul className="space-y-3 pt-1">
              {data.experience.blend.bullets.map((b, idx) => (
                <li key={idx} className="space-y-1">
                  <div className="text-xs font-bold text-accent-gold font-mono flex items-center gap-1.5">
                    <span>–</span> <span>{b.tag[locale]}:</span>
                  </div>
                  <p className={`text-xs sm:text-[13px] leading-relaxed pl-4 font-light ${
                    isDark ? 'text-white/80' : 'text-neutral-800'
                  }`}>
                    {b.text[locale]}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. YBM PSA SEOCHO */}
          <div className={`p-5 sm:p-7 rounded-2xl border transition-all space-y-4 ${
            isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-black/10 shadow-sm'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b pb-3 border-white/10">
              <div>
                <h4 className="text-base font-bold text-accent-gold font-display">
                  {data.experience.ybm.title[locale]}
                </h4>
                <span className={`text-xs sm:text-sm font-semibold block ${isDark ? 'text-white/90' : 'text-alpine-950'}`}>
                  {data.experience.ybm.company[locale]}
                </span>
              </div>
              <span className="text-xs font-mono opacity-60 shrink-0 text-accent-gold font-bold">
                {data.experience.ybm.period[locale]}
              </span>
            </div>

            <p className={`text-xs font-medium italic ${isDark ? 'text-white/70' : 'text-neutral-600'}`}>
              {data.experience.ybm.sub[locale]}
            </p>

            <ul className="space-y-3 pt-1">
              {data.experience.ybm.bullets.map((b, idx) => (
                <li key={idx} className="space-y-1">
                  <div className="text-xs font-bold text-accent-gold font-mono flex items-center gap-1.5">
                    <span>–</span> <span>{b.tag[locale]}:</span>
                  </div>
                  <p className={`text-xs sm:text-[13px] leading-relaxed pl-4 font-light ${
                    isDark ? 'text-white/80' : 'text-neutral-800'
                  }`}>
                    {b.text[locale]}
                  </p>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* TECHNICAL SKILLS SECTION */}
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-accent-gold font-mono flex items-center gap-2">
            <span>⚙️</span> {labels.skills}
          </h3>

          <div className="space-y-3">
            <div className={`p-4 sm:p-5 rounded-xl border space-y-2 ${
              isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-black/10 shadow-sm'
            }`}>
              <span className="text-xs font-bold text-accent-gold font-mono uppercase block">
                {data.skills.aiVoice.label[locale]}
              </span>
              <p className={`text-xs sm:text-[13px] font-light leading-relaxed ${
                isDark ? 'text-white/85' : 'text-neutral-700'
              }`}>
                {data.skills.aiVoice.items.join(' · ')}
              </p>
            </div>

            <div className={`p-4 sm:p-5 rounded-xl border space-y-2 ${
              isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-black/10 shadow-sm'
            }`}>
              <span className="text-xs font-bold text-accent-gold font-mono uppercase block">
                {data.skills.engineeringInfra.label[locale]}
              </span>
              <p className={`text-xs sm:text-[13px] font-light leading-relaxed ${
                isDark ? 'text-white/85' : 'text-neutral-700'
              }`}>
                {data.skills.engineeringInfra.items.join(' · ')}
              </p>
            </div>

            <div className={`p-4 sm:p-5 rounded-xl border space-y-2 ${
              isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-black/10 shadow-sm'
            }`}>
              <span className="text-xs font-bold text-accent-gold font-mono uppercase block">
                {data.skills.productMgmt.label[locale]}
              </span>
              <p className={`text-xs sm:text-[13px] font-light leading-relaxed ${
                isDark ? 'text-white/85' : 'text-neutral-700'
              }`}>
                {data.skills.productMgmt.items.join(' · ')}
              </p>
            </div>

            <div className={`p-4 sm:p-5 rounded-xl border space-y-2 ${
              isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-black/10 shadow-sm'
            }`}>
              <span className="text-xs font-bold text-accent-gold font-mono uppercase block">
                {data.skills.otherTools.label[locale]}
              </span>
              <p className={`text-xs sm:text-[13px] font-light leading-relaxed ${
                isDark ? 'text-white/85' : 'text-neutral-700'
              }`}>
                {data.skills.otherTools.items.join(' · ')}
              </p>
            </div>
          </div>
        </div>

        {/* EDUCATION SECTION */}
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-accent-gold font-mono flex items-center gap-2">
            <span>🎓</span> {labels.education}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.education.map((edu, idx) => (
              <div key={idx} className={`p-4 sm:p-5 rounded-xl border space-y-1 ${
                isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-black/10 shadow-sm'
              }`}>
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs sm:text-sm font-bold text-accent-gold">
                    {edu.degree[locale]}
                  </div>
                  <span className="text-xs font-mono text-accent-gold/80 shrink-0 font-bold">
                    {edu.year}
                  </span>
                </div>
                <div className={`text-xs font-mono ${isDark ? 'text-white/70' : 'text-neutral-600'}`}>
                  {edu.school[locale]}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* SINGLE-COLUMN ATS-COMPLIANT PRINT / PDF LAYOUT */}
      <div className="hidden print:block print-document text-[#222222] font-sans" style={{ fontSize: '9.5pt', lineHeight: '1.45' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            @page {
              size: portrait;
              margin: 14mm 16mm 14mm 16mm !important;
            }
            body {
              background: white !important;
              color: #222222 !important;
              font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .print-document {
              display: block !important;
              width: 100% !important;
            }
            .print-document h1 {
              font-size: 22pt !important;
              font-weight: 800 !important;
              color: #111827 !important;
              margin: 0 0 2pt 0 !important;
              letter-spacing: -0.5px !important;
              text-align: center !important;
            }
            .print-document .print-headline {
              font-size: 11pt !important;
              font-weight: 700 !important;
              color: #1D4ED8 !important;
              margin: 0 0 4pt 0 !important;
              text-align: center !important;
            }
            .print-document .print-contact {
              font-size: 8.5pt !important;
              color: #4B5563 !important;
              margin: 0 0 8pt 0 !important;
              padding-bottom: 5pt !important;
              border-bottom: 1.5px solid #E5E7EB !important;
              text-align: center !important;
            }
            .print-document h2 {
              font-size: 9.5pt !important;
              font-weight: 800 !important;
              color: #111827 !important;
              text-transform: uppercase !important;
              letter-spacing: 0.8px !important;
              border-bottom: 1.5px solid #1D4ED8 !important;
              padding-bottom: 2pt !important;
              margin-top: 8pt !important;
              margin-bottom: 4pt !important;
            }
            .print-document p {
              font-size: 8.8pt !important;
              color: #374151 !important;
              line-height: 1.4 !important;
              margin: 0 0 4pt 0 !important;
            }
            .print-document ul {
              margin-top: 2pt !important;
              margin-bottom: 4pt !important;
              padding-left: 0 !important;
              list-style: none !important;
            }
            .print-document li {
              font-size: 8.8pt !important;
              color: #374151 !important;
              line-height: 1.38 !important;
              margin-bottom: 3pt !important;
              padding-left: 10pt !important;
              text-indent: -10pt !important;
            }
            .print-document .print-exp-block {
              margin-bottom: 6pt !important;
            }
            .print-document .print-exp-header {
              display: flex !important;
              justify-content: space-between !important;
              align-items: baseline !important;
              margin-bottom: 1pt !important;
            }
            .print-document .print-title {
              font-size: 9.5pt !important;
              font-weight: 700 !important;
              color: #111827 !important;
            }
            .print-document .print-company {
              font-size: 9.5pt !important;
              font-weight: 700 !important;
              color: #1D4ED8 !important;
            }
            .print-document .print-dates {
              font-size: 8.5pt !important;
              color: #6B7280 !important;
              font-style: italic !important;
            }
            .print-document .print-subtitle {
              font-size: 8.5pt !important;
              font-weight: 500 !important;
              font-style: italic !important;
              color: #4B5563 !important;
              margin-bottom: 3pt !important;
            }
            .print-document .print-skill-row {
              margin-bottom: 3pt !important;
              font-size: 8.8pt !important;
              line-height: 1.38 !important;
            }
            .print-document .print-skill-label {
              font-weight: 700 !important;
              color: #111827 !important;
            }
          }
        ` }} />

        {/* HEADER */}
        <h1>{data.header.name}</h1>
        <div className="print-headline">{data.header.title[locale]}</div>
        <div className="print-contact">
          {data.header.contact.email} · {data.header.contact.phone} · {data.header.contact.location[locale]} · {data.header.contact.website}
        </div>

        {/* PROFILE */}
        <h2>{labels.profile}</h2>
        <p>{data.profile[locale]}</p>

        {/* EXPERIENCE */}
        <h2>{labels.experience}</h2>

        {/* VODABI */}
        <div className="print-exp-block">
          <div className="print-exp-header">
            <div>
              <span className="print-title">{data.experience.vodabi.title[locale]}</span>
              <span style={{ color: '#1D4ED8', fontWeight: 700 }}> · </span>
              <span className="print-company">{data.experience.vodabi.company[locale]}</span>
            </div>
            <span className="print-dates">{data.experience.vodabi.period[locale]}</span>
          </div>
          <div className="print-subtitle">{data.experience.vodabi.sub[locale]}</div>
          <ul>
            {data.experience.vodabi.bullets.map((b, idx) => (
              <li key={idx}>
                – <strong>{b.tag[locale]}:</strong> {b.text[locale]}
              </li>
            ))}
          </ul>
        </div>

        {/* CHEKKI */}
        <div className="print-exp-block">
          <div className="print-exp-header">
            <div>
              <span className="print-title">{data.experience.chekki.title[locale]}</span>
              <span style={{ color: '#1D4ED8', fontWeight: 700 }}> · </span>
              <span className="print-company">{data.experience.chekki.company[locale]}</span>
            </div>
            <span className="print-dates">{data.experience.chekki.period[locale]}</span>
          </div>
          <div className="print-subtitle">{data.experience.chekki.sub[locale]}</div>
          <ul>
            {data.experience.chekki.bullets.map((b, idx) => (
              <li key={idx}>
                – <strong>{b.tag[locale]}:</strong> {b.text[locale]}
              </li>
            ))}
          </ul>
        </div>

        {/* BLEND ENG ACADEMY */}
        <div className="print-exp-block">
          <div className="print-exp-header">
            <div>
              <span className="print-title">{data.experience.blend.title[locale]}</span>
              <span style={{ color: '#1D4ED8', fontWeight: 700 }}> · </span>
              <span className="print-company">{data.experience.blend.company[locale]}</span>
            </div>
            <span className="print-dates">{data.experience.blend.period[locale]}</span>
          </div>
          <div className="print-subtitle">{data.experience.blend.sub[locale]}</div>
          <ul>
            {data.experience.blend.bullets.map((b, idx) => (
              <li key={idx}>
                – <strong>{b.tag[locale]}:</strong> {b.text[locale]}
              </li>
            ))}
          </ul>
        </div>

        {/* YBM PSA SEOCHO */}
        <div className="print-exp-block">
          <div className="print-exp-header">
            <div>
              <span className="print-title">{data.experience.ybm.title[locale]}</span>
              <span style={{ color: '#1D4ED8', fontWeight: 700 }}> · </span>
              <span className="print-company">{data.experience.ybm.company[locale]}</span>
            </div>
            <span className="print-dates">{data.experience.ybm.period[locale]}</span>
          </div>
          <div className="print-subtitle">{data.experience.ybm.sub[locale]}</div>
          <ul>
            {data.experience.ybm.bullets.map((b, idx) => (
              <li key={idx}>
                – <strong>{b.tag[locale]}:</strong> {b.text[locale]}
              </li>
            ))}
          </ul>
        </div>

        {/* TECHNICAL SKILLS */}
        <h2>{labels.skills}</h2>
        <div className="print-skill-row">
          <span className="print-skill-label">{data.skills.aiVoice.label[locale]}: </span>
          <span>{data.skills.aiVoice.items.join(', ')}</span>
        </div>
        <div className="print-skill-row">
          <span className="print-skill-label">{data.skills.engineeringInfra.label[locale]}: </span>
          <span>{data.skills.engineeringInfra.items.join(', ')}</span>
        </div>
        <div className="print-skill-row">
          <span className="print-skill-label">{data.skills.productMgmt.label[locale]}: </span>
          <span>{data.skills.productMgmt.items.join(', ')}</span>
        </div>
        <div className="print-skill-row">
          <span className="print-skill-label">{data.skills.otherTools.label[locale]}: </span>
          <span>{data.skills.otherTools.items.join(', ')}</span>
        </div>

        {/* EDUCATION */}
        <h2>{labels.education}</h2>
        {data.education.map((edu, idx) => (
          <div key={idx} className="print-exp-block" style={{ marginBottom: '2pt' }}>
            <div className="print-exp-header">
              <span className="print-title">{edu.degree[locale]}</span>
              <span className="print-dates">{edu.year}</span>
            </div>
            <div className="print-subtitle">{edu.school[locale]}</div>
          </div>
        ))}

      </div>
    </div>
  );
}

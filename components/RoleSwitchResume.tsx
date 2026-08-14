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
      en: "AI Product Manager — Generative AI & B2B SaaS",
      ko: "AI 프로덕트 매니저 — 생성형 AI & B2B SaaS"
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
    en: "AI Product Manager with 6 production AI systems shipped and enterprise B2B SaaS experience across voice AI, LLM evaluation frameworks, and automated workflow pipelines — with a measurable track record: 80% reduction in administrative workloads and complex scheduling cut from 40 hours to 10 minutes.\n\nKnown for translating ambiguous technical requirements into clear PRDs and product decisions — running customer discovery, iterating on prompt experiments and UI flows, and coordinating across engineering, design, sales, and executive stakeholders to ship 0-to-1 products fast. Deep domain expertise in the South Korean education and B2B market, with bilingual (EN/KR) product and GTM experience.",
    ko: "6개의 상용 AI 시스템 배포 및 음성 AI, LLM 평가 프레임워크, 자동화 워크플로우 파이프라인 전반의 엔터프라이즈 B2B SaaS 경험을 보유한 AI 프로덕트 매니저입니다 — 행정 업무 80% 절감 및 복잡한 스케줄링 40시간에서 10분 단축이라는 검증된 성과를 입증했습니다.\n\n모호한 기술 요구사항을 명확한 PRD와 프로덕트 의사결정으로 구체화하는 데 강점이 있으며, 고객 인터뷰 및 디스커버리, 프롬프트 실험 및 UI 흐름 반복 최적화, 엔지니어링·디자인·영업·경영진 이해관계자 조율을 통해 0-to-1 제품을 빠르게 출시합니다. 한국 교육 및 B2B 시장에 대한 깊은 도메인 전문성과 이중언어(EN/KR) 프로덕트 및 GTM 역량을 갖추고 있습니다."
  },
  skills: {
    productAi: {
      label: { en: "Product & AI", ko: "프로덕트 & AI" },
      items: [
        "AI Product Strategy", "PRD Authorship", "0-to-1 Product Development", "Customer Discovery",
        "User Research", "Prompt Experimentation", "A/B Testing", "Go-to-Market",
        "Cross-Functional Collaboration", "Stakeholder Management", "B2B SaaS", "Enterprise AI SaaS",
        "RBAC", "Agile", "OKRs", "Retention & Churn Analysis", "LLM Judge Architecture",
        "Deterministic AI Evaluation", "Prompt Engineering", "Structured JSON Outputs",
        "Hallucination Mitigation", "Bilingual AI (EN/KR)"
      ]
    },
    toolsInfra: {
      label: { en: "Tools & Infra", ko: "도구 & 인프라" },
      items: [
        "OpenAI Realtime API (gpt-4o-realtime-preview)", "GPT-4o", "Gemini AI", "Claude AI", "WebRTC",
        "Socket.io", "NestJS 11", "Node.js 24", "Prisma 7", "MariaDB", "Docker Compose",
        "AWS EC2", "Nginx", "Passport JWT", "AES-256-GCM", "React", "TypeScript",
        "Firebase", "Supabase (PostgreSQL, RLS)", "Make.com", "Airtable", "Softr", "Vercel"
      ]
    }
  },
  experience: {
    vodabi: {
      title: {
        en: "AI Product Manager (Internship)",
        ko: "AI 프로덕트 매니저 (인턴십)"
      },
      company: {
        en: "VodaBi SaaS Startup",
        ko: "VodaBi SaaS 스타트업"
      },
      period: {
        en: "July 2026 – Present",
        ko: "2026년 7월 – 현재"
      },
      sub: {
        en: "Enterprise B2B conversational AI coaching and automated sales evaluation platform · Seoul",
        ko: "엔터프라이즈 B2B 대화형 AI 코칭 및 자동 판매 평가 플랫폼 · 서울"
      },
      bullets: [
        {
          tag: { en: "Product Pivot & Roadmap", ko: "제품 피봇 & 로드맵" },
          text: {
            en: "Authored the PRD for \"VOISOR\" — a greenfield 0-to-1 pivot from a legacy analytics dashboard to a 3-step AI coaching widget (Role Selection → Upload → Chat). Mapped a phased rollout from stateless MVP to stateful enterprise architecture; ran structured customer discovery sessions via Wizard of Oz prototyping with executive stakeholders to validate UX before committing engineering resources.",
            ko: "\"VOISOR\" PRD 작성 — 레거시 분석 대시보드에서 3단계 AI 코칭 위젯(역할 선택 → 업로드 → 대화)으로의 0-to-1 신규 피봇 주도. 상태 비저장 MVP에서 상태 유지 엔터프라이즈 아키텍처로의 단계별 로드맵 수립; 개발 자원 투입 전 경영진 대상 Wizard of Oz 프로토타이핑 고객 디스커버리를 통해 UX 검증."
          }
        },
        {
          tag: { en: "Voice AI Pipeline", ko: "음성 AI 파이프라인" },
          text: {
            en: "Architected a bidirectional real-time voice system (NestJS/Socket.io + WebRTC) using gpt-4o-realtime-preview with server-side Voice Activity Detection, turn interruption, and isolated per-caller socket channels for concurrent sessions — achieving sub-200ms response latency for natural candidate simulations.",
            ko: "gpt-4o-realtime-preview 및 서버 측 음성 활동 감지(VAD), 턴 중단, 동시 세션용 발신자별 격리 소켓 채널을 활용한 양방향 실시간 음성 시스템(NestJS/Socket.io + WebRTC) 아키텍처 설계 — 자연스러운 지원자 시뮬레이션을 위한 sub-200ms 응답 지연 시간 달성."
          }
        },
        {
          tag: { en: "Deterministic Evaluation Engine", ko: "결정론적 평가 엔진" },
          text: {
            en: "Designed the \"Fact-Impact-Fix\" coaching framework and a dynamic 4-persona LLM prompt matrix (Candidate/Supporter/Manager/Assistant) — iterated across multiple prompt versions to reduce hallucination risk in client-facing scoring. GPT-4o structured outputs grade candidates across an 11-point rubric, BANTCQ sales telemetry, and WPM speech metrics.",
            ko: "\"Fact-Impact-Fix\" 코칭 프레임워크 및 동적 4-페르소나 LLM 프롬프트 매트릭스(지원자/서포터/매니저/어시스턴트) 설계 — 고객 직면 채점에서의 환각 위험을 줄이기 위해 다양한 프롬프트 버전 반복 최적화. GPT-4o 구조화된 출력이 11개 루브릭 항목, BANTCQ 영업 텔레메트리, WPM 발화 지표로 지원자 채점."
          }
        },
        {
          tag: { en: "Security & Access Architecture", ko: "보안 & 접근 아키텍처" },
          text: {
            en: "Designed multi-tier RBAC (SUPER_ADMIN/ADMIN/MANAGER) via NestJS Guards and Passport JWT, magic-link passwordless candidate access, and a zero-dependency AES-256-GCM PII encryption module wired into the global config pipeline.",
            ko: "NestJS Guards 및 Passport JWT 기반 다단계 RBAC(SUPER_ADMIN/ADMIN/MANAGER), 매직링크 무비밀번호 지원자 접근, 글로벌 설정 파이프라인에 연결된 제로 디펜던시 AES-256-GCM PII 암호화 모듈 설계."
          }
        },
        {
          tag: { en: "Infrastructure & Handover", ko: "인프라 & 벤더 핸드오버" },
          text: {
            en: "Provisioned an AWS EC2 (ARM64) staging environment — Node.js 24, NestJS 11, Prisma 7 (driver-adapter model) over MariaDB, Docker Compose, Nginx. Authored full vendor handover documentation covering DNS, system architecture, and migration protocol with zero engineering escalations.",
            ko: "AWS EC2(ARM64) 스테이징 환경 구축 — Node.js 24, NestJS 11, Prisma 7(드라이버 어댑터 모델) 기반 MariaDB, Docker Compose, Nginx. 엔지니어링 에스컬레이션 없이 DNS, 시스템 아키텍처, 마이그레이션 프로토콜을 다루는 종합 벤더 핸드오버 문서 작성."
          }
        },
        {
          tag: { en: "GTM & Client Enablement", ko: "GTM & 엔터프라이즈 지원" },
          text: {
            en: "Built strategic positioning materials and aligned AI coaching features to existing revenue reports, directly supporting high-stakes B2B sales demonstrations for Tier-1 enterprise clients including BNK.",
            ko: "전략적 포지셔닝 자료 구축 및 기존 매출 리포트와 AI 코칭 기능 연계, BNK를 포함한 Tier-1 엔터프라이즈 고객 대상 고부가가치 B2B 영업 시연 직접 지원."
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
        en: "6-product AI suite for South Korean language academies and families · Seoul — greenfield 0-to-1 across all products",
        ko: "한국 어학원 및 가정을 위한 6개 AI 제품 스위트 · 서울 — 전 제품 0-to-1 신규 기획 및 구축"
      },
      bullets: [
        {
          tag: { en: "B2B Command Center", ko: "B2B Command Center" },
          text: {
            en: "Authored the PRD and shipped a Make.com + Gemini AI pipeline converting exception-first teacher observations into bilingual parent notes with Korean honorific formatting — cutting staff reporting time by 80% across academy networks. Iterated on prompt versions and UI flows based on academy director feedback to improve note quality and adoption.",
            ko: "PRD 작성 및 교사의 예외 중심 관찰 기록을 한국어 존댓말 양식의 이중언어 학부모 알림장으로 변환하는 Make.com + Gemini AI 파이프라인 출시 — 학원 네트워크 전반의 직원 리포팅 시간 80% 절감. 학원장 피드백을 기반으로 프롬프트 버전 및 UI 흐름을 지속 반복하여 알림장 품질과 도입률 향상."
          }
        },
        {
          tag: { en: "EduPlanner Pro", ko: "EduPlanner Pro" },
          text: {
            en: "Built a two-tier LLM scheduling engine (Gemini Pro for recursive conflict resolution, Gemini Flash for foundational grid generation) with API resilience and automatic model fallback — cutting 40 hours of manual term scheduling to a 10-minute automated run.",
            ko: "40시간 소요되던 수기 학기 스케줄링을 10분 자동화 실행으로 단축하는 2계층 LLM 스케줄링 엔진(Gemini Pro 재귀 충돌 해결 + Gemini Flash 기초 그리드 생성) 및 API 탄력성/자동 모델 폴백 구축."
          }
        },
        {
          tag: { en: "Chekki Teacher", ko: "Chekki Teacher" },
          text: {
            en: "Shipped a live curriculum pre-seeding tool — teachers define AI response boundaries before parents check student homework, reducing hallucination risk at the architecture level. Includes cross-session mistake-pattern tracking and automated parent report generation to support teacher retention decisions.",
            ko: "교사가 사전에 AI 응답 경계를 정의하여 학부모 과제 확인 시 아키텍처 수준에서 환각 위험을 방지하는 실시간 커리큘럼 사전 주입 도구 출시. 교사의 재등록 결정 지원을 위한 세션 간 오답 패턴 추적 및 자동 학부모 리포트 생성 포함."
          }
        },
        {
          tag: { en: "Chekki AI (App Store)", ko: "Chekki AI (App Store)" },
          text: {
            en: "Led end-to-end product lifecycle for a bilingual AI homework assistant — zero-storage COPPA-compliant architecture, bilingual EN/KR go-to-market executed across TikTok, Instagram, and Kakao channels.",
            ko: "이중언어 AI 과제 도우미를 위한 엔드투엔드 제품 라이프사이클 총괄 — 제로 스토리지 COPPA 준수 아키텍처, 틱톡, 인스타그램, 카카오 채널 전반에서 실행된 이중언어(EN/KR) GTM."
          }
        },
        {
          tag: { en: "Benchmark AI", ko: "Benchmark AI" },
          text: {
            en: "Designed a continuous ESL assessment platform mapping real-time student mastery to CEFR and Cambridge YLE standards — predictive churn alerts surface at-risk students to academy directors before retention decisions are made, using longitudinal assessment data to drive intervention timing.",
            ko: "실시간 학생 학업 성취도를 CEFR 및 Cambridge YLE 표준에 매핑하는 지속적 ESL 평가 플랫폼 설계 — 종단적 평가 데이터를 활용하여 퇴원 결정 전 이탈 위험 학생을 학원장에게 사전 경고하고 개입 타이밍 유도."
          }
        }
      ]
    },
    domain: {
      title: {
        en: "Domain & Pedagogical Foundations",
        ko: "도메인 & 교수법적 기반"
      },
      company: {
        en: "Blend ENG Academy · YBM PSA Seocho",
        ko: "Blend ENG Academy · YBM PSA 서초"
      },
      period: {
        en: "Feb 2019 – Feb 2026",
        ko: "2019년 2월 – 2026년 2월"
      },
      bullet: {
        en: "10 years of EFL instruction and curriculum leadership in Seoul: sole author of a 20-volume commercial English textbook series, designer of diagnostic assessment systems for 100+ students, and homeroom manager handling bilingual parent communication — the domain expertise powering every Chekki EdTech product.",
        ko: "서울에서의 10년 EFL 교육 및 커리큘럼 리더십: 20권 분량의 상용 영어 교재 시리즈 단독 저술, 100명 이상 학생 대상 진단 평가 시스템 설계, 이중언어 학부모 소통을 총괄한 담임 관리 — 모든 Chekki EdTech 제품을 뒷받침하는 핵심 도메인 전문성."
      }
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

          {/* 3. DOMAIN & PEDAGOGICAL FOUNDATIONS */}
          <div className={`p-5 sm:p-7 rounded-2xl border transition-all space-y-3 ${
            isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-black/10 shadow-sm'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b pb-3 border-white/10">
              <div>
                <h4 className="text-base font-bold text-accent-gold font-display">
                  {data.experience.domain.title[locale]}
                </h4>
                <span className={`text-xs sm:text-sm font-semibold block ${isDark ? 'text-white/90' : 'text-alpine-950'}`}>
                  {data.experience.domain.company[locale]}
                </span>
              </div>
              <span className="text-xs font-mono opacity-60 shrink-0 text-accent-gold font-bold">
                {data.experience.domain.period[locale]}
              </span>
            </div>

            <p className={`text-xs sm:text-[13px] leading-relaxed font-light ${
              isDark ? 'text-white/80' : 'text-neutral-800'
            }`}>
              – {data.experience.domain.bullet[locale]}
            </p>
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
                {data.skills.productAi.label[locale]}
              </span>
              <p className={`text-xs sm:text-[13px] font-light leading-relaxed ${
                isDark ? 'text-white/85' : 'text-neutral-700'
              }`}>
                {data.skills.productAi.items.join(' · ')}
              </p>
            </div>

            <div className={`p-4 sm:p-5 rounded-xl border space-y-2 ${
              isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-black/10 shadow-sm'
            }`}>
              <span className="text-xs font-bold text-accent-gold font-mono uppercase block">
                {data.skills.toolsInfra.label[locale]}
              </span>
              <p className={`text-xs sm:text-[13px] font-light leading-relaxed ${
                isDark ? 'text-white/85' : 'text-neutral-700'
              }`}>
                {data.skills.toolsInfra.items.join(' · ')}
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

        {/* DOMAIN */}
        <div className="print-exp-block">
          <div className="print-exp-header">
            <div>
              <span className="print-title">{data.experience.domain.title[locale]}</span>
              <span style={{ color: '#1D4ED8', fontWeight: 700 }}> · </span>
              <span className="print-company">{data.experience.domain.company[locale]}</span>
            </div>
            <span className="print-dates">{data.experience.domain.period[locale]}</span>
          </div>
          <ul>
            <li>– {data.experience.domain.bullet[locale]}</li>
          </ul>
        </div>

        {/* TECHNICAL SKILLS */}
        <h2>{labels.skills}</h2>
        <div className="print-skill-row">
          <span className="print-skill-label">{data.skills.productAi.label[locale]}: </span>
          <span>{data.skills.productAi.items.join(', ')}</span>
        </div>
        <div className="print-skill-row">
          <span className="print-skill-label">{data.skills.toolsInfra.label[locale]}: </span>
          <span>{data.skills.toolsInfra.items.join(', ')}</span>
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

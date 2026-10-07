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
    en: "Full-stack engineer at VodaBi, building a production voice-AI sales training platform: realtime WebRTC voice, LLM grading, dashboards and deployment. Independently built and launched six AI products for Korean education.\n\nWrites PRDs, runs customer discovery and owns the path from problem to production, in English and Korean.",
    ko: "VodaBi에서 프로덕션 음성 AI 영업 훈련 플랫폼을 만드는 풀스택 엔지니어입니다. 실시간 WebRTC 음성, LLM 채점, 대시보드, 배포를 맡고 있습니다. 한국 교육 시장을 위한 AI 제품 6개를 직접 만들어 출시했습니다.\n\nPRD 작성과 고객 인터뷰부터 프로덕션 배포까지 한국어와 영어로 직접 이끕니다."
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
        en: "Full-Stack Engineer",
        ko: "풀스택 엔지니어"
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
        en: "Voice-AI sales training and testing platform · In production",
        ko: "음성 AI 영업 훈련 및 테스트 플랫폼 · 프로덕션 운영 중"
      },
      bullets: [
        {
          tag: { en: "Voice Pipeline", ko: "음성 파이프라인" },
          text: {
            en: "Moved live voice roleplay to a direct browser-to-OpenAI WebRTC connection (Realtime API, ephemeral tokens), cutting ~200ms of latency per turn.",
            ko: "실시간 음성 롤플레이를 브라우저-OpenAI 직접 WebRTC 연결(Realtime API, 임시 토큰)로 전환해 턴당 약 200ms 지연을 줄임."
          }
        },
        {
          tag: { en: "Platform Revamp", ko: "플랫폼 개선" },
          text: {
            en: "Improved and revamped the existing voice-testing platform, added a coaching layer, and shipped it to production in about 3 weeks.",
            ko: "기존 음성 테스트 플랫폼을 개선·개편하고 코칭 레이어를 더해 약 3주 만에 프로덕션에 배포."
          }
        },
        {
          tag: { en: "Two-Step LLM Grading", ko: "2단계 LLM 채점" },
          text: {
            en: "Split rubric grading into a scoring call and a feedback call written from the fixed scores, so feedback never contradicts the number.",
            ko: "루브릭 채점을 점수 호출과, 확정된 점수를 바탕으로 쓰는 피드백 호출로 나눠 피드백이 점수와 어긋나지 않도록 함."
          }
        },
        {
          tag: { en: "Admin Console", ko: "어드민 콘솔" },
          text: {
            en: "Built a backoffice where non-engineers create personas, scenarios and scoring tiers without code.",
            ko: "비개발자가 코드 없이 페르소나, 시나리오, 채점 티어를 만드는 백오피스 구축."
          }
        },
        {
          tag: { en: "Security", ko: "보안" },
          text: {
            en: "Ran three security audits on a system handling candidate PII: field-level encryption, token hardening, role checks, and a regression test across every controller.",
            ko: "후보자 개인정보를 다루는 시스템에 3회 보안 감사 수행: 필드 단위 암호화, 토큰 강화, 권한 검사, 전체 컨트롤러 회귀 테스트."
          }
        },
        {
          tag: { en: "Deployment", ko: "배포" },
          text: {
            en: "Set up an arm64 staging environment beside amd64 production, with one CI/CD pipeline building for both.",
            ko: "amd64 프로덕션과 별도로 arm64 스테이징 환경을 구축하고, 하나의 CI/CD 파이프라인으로 두 환경 모두 빌드."
          }
        },
        {
          tag: { en: "Frontend", ko: "프런트엔드" },
          text: {
            en: "Rebuilt the frontend from a designer's Figma spec: live roleplay, gamified reports, staff training screens and a manager dashboard.",
            ko: "디자이너의 Figma 스펙으로 프런트엔드 재구축: 실시간 롤플레이, 게이미피케이션 리포트, 직원 훈련 화면, 매니저 대시보드."
          }
        },
        {
          tag: { en: "Traction", ko: "도입" },
          text: {
            en: "Going into use with two enterprise clients for employee sales-skills testing.",
            ko: "두 곳의 기업 고객사에서 직원 영업 역량 테스트 용도로 사용을 시작합니다."
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
        en: "AI homework grading and parent reports for Korean English academies · Web · iOS · Android",
        ko: "한국 영어학원을 위한 AI 숙제 채점과 학부모 리포트 · Web · iOS · Android"
      },
      bullets: [
        {
          tag: { en: "Core Loop", ko: "핵심 루프" },
          text: {
            en: "Designed a parent → teacher → director loop: parents scan homework and get bilingual grading in seconds, and mistakes roll up to a class view for the teacher.",
            ko: "학부모 → 교사 → 원장 루프 설계: 학부모가 숙제를 스캔하면 몇 초 만에 이중언어 채점을 받고, 오답은 교사의 학급 뷰로 모입니다."
          }
        },
        {
          tag: { en: "Grounded Grading", ko: "정답지 기반 채점" },
          text: {
            en: "Built Gemini vision grading that checks every answer against the teacher's uploaded answer key instead of the model's own guess.",
            ko: "모델의 추측이 아니라 교사가 올린 정답지와 모든 답을 대조하는 Gemini 비전 채점 구축."
          }
        },
        {
          tag: { en: "Chekki Schools (in final testing)", ko: "Chekki Schools (최종 테스트 중)" },
          text: {
            en: "Foreign teachers record one voice note per class; it becomes a Korean parent report that a Korean teacher reviews before families receive it. Two-school pilot planned.",
            ko: "원어민 교사가 수업마다 음성 메모 하나를 남기면 한국어 학부모 리포트가 되고, 한국인 교사가 검토한 뒤 가정에 전달됩니다. 2개 학교 파일럿 예정."
          }
        },
        {
          tag: { en: "AI Output Evaluation", ko: "AI 출력 평가" },
          text: {
            en: "Rewrote the report prompts after native Korean readers said the drafts sounded machine-written.",
            ko: "한국어 원어민 독자들이 초안이 기계가 쓴 글 같다고 지적한 뒤 리포트 프롬프트를 다시 작성."
          }
        },
        {
          tag: { en: "Security", ko: "보안" },
          text: {
            en: "Ran three security audits, closed 7+ authorization gaps, and added Firestore rules tests to CI.",
            ko: "3회 보안 감사로 7건 이상의 권한 취약점을 해결하고 Firestore 규칙 테스트를 CI에 추가."
          }
        },
        {
          tag: { en: "Product Decisions", ko: "프로덕트 의사결정" },
          text: {
            en: "Kept a 24-entry decision log, including cutting five scope-creep features and a feed filled with placeholder posts.",
            ko: "24건의 의사결정 로그 관리: 불필요한 기능 5개와 임시 게시물로 채워진 피드 삭제 포함."
          }
        },
        {
          tag: { en: "Refactor & CI", ko: "리팩토링 & CI" },
          text: {
            en: "Split a 4,678-line page into role-scoped modules with no regressions, and added the first CI pipeline and test suite.",
            ko: "4,678줄 페이지를 역할별 모듈로 회귀 없이 분리하고, 첫 CI 파이프라인과 테스트 스위트 도입."
          }
        },
        {
          tag: { en: "Cross-Platform", ko: "크로스 플랫폼" },
          text: {
            en: "Shipped web, iOS and Android from one codebase (React 19 + Capacitor) with Korean/English parity, subscriptions, and Apple, Google and Kakao sign-in.",
            ko: "하나의 코드베이스(React 19 + Capacitor)로 웹·iOS·안드로이드 출시: 한/영 동등 지원, 구독 결제, 애플·구글·카카오 로그인."
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
        en: "Private English academy · Kindergarten and elementary",
        ko: "영어학원 · 유치부 및 초등부"
      },
      bullets: [
        {
          tag: { en: "Commercial Curriculum Series", ko: "상용 교재 시리즈" },
          text: {
            en: "Designed a 20-volume English curriculum series with AI tools and Canva, used by ~200 students from age 5 through elementary and sold commercially.",
            ko: "AI 도구와 Canva로 20권 분량 영어 교재 시리즈 제작. 5세부터 초등부까지 약 200명이 사용하며 상용 판매 중."
          }
        },
        {
          tag: { en: "Diagnostic Benchmark System", ko: "진단 벤치마크 평가" },
          text: {
            en: "Built a school-wide diagnostic benchmark to find learning gaps and target intervention; the basis for Chekki's Benchmark AI.",
            ko: "학습 결손을 찾고 맞춤 지도를 돕는 원내 진단 벤치마크 구축. Chekki Benchmark AI의 기반."
          }
        },
        {
          tag: { en: "Bilingual Operations", ko: "이중언어 소통 & 운영" },
          text: {
            en: "Ran bilingual parent communication, progress reports and homeroom operations.",
            ko: "한/영 학부모 소통, 성취도 리포트, 담임 학급 운영 담당."
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
          tag: { en: "Immersive Instruction", ko: "몰입형 교육" },
          text: {
            en: "Four years of full-immersion EFL teaching at one of Seoul's largest English kindergartens.",
            ko: "서울 최대 규모 영어 유치부 중 한 곳에서 4년간 몰입형 영어 교육."
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
        <div className={`p-6 sm:p-8 rounded-2xl border ${
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
              <div>
                <a href={`mailto:${data.header.contact.email}`} className="hover:underline hover:text-accent-gold">
                  {data.header.contact.email}
                </a>
              </div>
              <div>
                <a href="tel:+821039828238" className="hover:underline hover:text-accent-gold">
                  {data.header.contact.phone}
                </a>
              </div>
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
          <div className={`p-5 sm:p-7 rounded-2xl border space-y-4 ${
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
          <div className={`p-5 sm:p-7 rounded-2xl border space-y-4 ${
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
          <div className={`p-5 sm:p-7 rounded-2xl border space-y-4 ${
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
          <div className={`p-5 sm:p-7 rounded-2xl border space-y-4 ${
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

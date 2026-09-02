import React, { useState, useEffect } from 'react';
import { CaseStudyViewer } from './CaseStudyViewer.tsx';
import ResumeModal from './components/ResumeModal.tsx';
import { SunIcon, MoonIcon, SearchIcon, ExternalLinkIcon } from './components/Icons.tsx';

interface Decision {
  choice: string;
  why: string;
  tradeoff: string;
}

interface FeaturedProject {
  id: string;
  context: string;
  status: string;
  title: string;
  problem: string;
  owned: string[];
  decisions: Decision[];
  stack: string[];
  image?: string;
  liveUrl?: string;
  stores?: { label: string; href: string }[];
}

interface ShippedProject {
  id: string;
  domains: string[];
  title: string;
  status: string;
  desc: string;
  outcome: string;
  stack: string[];
  liveUrl?: string;
  caseStudyId: string;
}

interface LogEntry {
  date: string;
  type: string;
  titleEn: string;
  titleKo: string;
  descEn: string;
  descKo: string;
}

const COPY = {
  en: {
    navWork: "Work",
    navMore: "Also shipped",
    navLog: "Build log",
    navContact: "Contact",
    localeSwitch: "한국어",
    resumeBtn: "Résumé",
    heroTitle: "AI product manager and engineer. Voice-AI, LLM evaluation, and the operations work around them.",
    heroBody: "At VodaBi I own an outbound sales-call screening platform: the product spec, the realtime WebRTC voice roleplay, the 11-code scoring rubric, and the deploy. On my own I built Chekki AI, now on the App Store and Play Store, and five more products used by Korean academies and teachers.",
    ctaWork: "See the work",
    ctaResume: "Interactive résumé",
    caseLabel: "Case study ↗",
    nowLabel: "Now",
    nowBody: "The VodaBi screening platform is built and going into use with IBK and FastFive.",
    roleTitle: "How I work",
    workTitle: "Selected work",
    workNote: "Two products in depth: the problem, what I built, and the calls I made along the way.",
    ownedLabel: "What I built",
    decisionsLabel: "Decisions and tradeoffs",
    moreTitle: "Also shipped",
    moreNote: "Five smaller systems, designed and built solo.",
    searchPlaceholder: "Search projects...",
    noResults: "Nothing matches that filter.",
    logTitle: "Build log",
    logToggleMore: "Show all",
    logToggleLess: "Show less",
    contactTitle: "Hiring for an AI PM or AI engineer role?",
    contactBody: "I work best where the product thinking and the implementation sit with one person: evaluation design, voice and multimodal pipelines, and the plumbing that makes them usable day to day.",
    contactCta: "Email me",
    lookingLabel: "Looking for",
    lookingValue: "AI PM or AI engineer, 0→1 product teams",
    basedLabel: "Based in",
    basedValue: "South Korea, open to remote",
    langLabel: "Languages",
    langValue: "English (native), Korean (working)",
    footerNote: "Built and maintained by hand"
  },
  ko: {
    navWork: "주요 프로젝트",
    navMore: "그 외 배포",
    navLog: "빌드 로그",
    navContact: "연락",
    localeSwitch: "English",
    resumeBtn: "이력서",
    heroTitle: "AI 프로덕트 매니저 겸 엔지니어. 음성 AI, LLM 평가, 그리고 그 주변의 운영 문제.",
    heroBody: "VodaBi에서 아웃바운드 세일즈 통화 스크리닝 플랫폼을 담당합니다. 제품 정의, 실시간 WebRTC 음성 롤플레이, 11개 코드 채점 루브릭, 배포까지 직접 맡았습니다. 개인적으로는 App Store와 Play Store에 출시한 Chekki AI를 포함해, 한국 학원과 교사가 쓰는 제품 5개를 더 만들었습니다.",
    ctaWork: "프로젝트 보기",
    ctaResume: "인터랙티브 이력서",
    caseLabel: "케이스 스터디 ↗",
    nowLabel: "현재",
    nowBody: "VodaBi 스크리닝 플랫폼 구축을 마쳤고, IBK와 패스트파이브에서 사용을 시작합니다.",
    roleTitle: "일하는 방식",
    workTitle: "주요 프로젝트",
    workNote: "두 제품을 깊게 다룹니다. 문제, 직접 만든 부분, 그 과정에서 내린 판단.",
    ownedLabel: "직접 만든 부분",
    decisionsLabel: "판단과 트레이드오프",
    moreTitle: "그 외 배포한 시스템",
    moreNote: "혼자 설계하고 만든 5개의 소규모 시스템.",
    searchPlaceholder: "프로젝트 검색...",
    noResults: "조건에 맞는 프로젝트가 없습니다.",
    logTitle: "빌드 로그",
    logToggleMore: "전체 보기",
    logToggleLess: "접기",
    contactTitle: "AI PM 또는 AI 엔지니어를 찾고 계신가요?",
    contactBody: "제품 판단과 구현을 한 사람이 함께 맡는 자리에서 가장 잘 일합니다. 평가 설계, 음성·멀티모달 파이프라인, 그리고 이를 매일 쓸 수 있게 만드는 작업.",
    contactCta: "메일 보내기",
    lookingLabel: "찾는 자리",
    lookingValue: "AI PM 또는 AI 엔지니어, 0→1 제품 팀",
    basedLabel: "거주지",
    basedValue: "대한민국, 원격 근무 가능",
    langLabel: "언어",
    langValue: "영어(모국어), 한국어(업무 가능)",
    footerNote: "직접 만들고 관리합니다"
  }
};

const FACTS = {
  en: [
    { value: "PM + sole engineer", label: "Spec, rubric design, backend, deploy — one person, on VodaBi and on the independent products." },
    { value: "6 products shipped", label: "Independently built and released to real academies, teachers, and parents in Korea." },
    { value: "19 decisions logged", label: "Architecture and product calls written down with the alternative and the tradeoff accepted." }
  ],
  ko: [
    { value: "PM 겸 단독 엔지니어", label: "기획, 루브릭 설계, 백엔드, 배포까지 한 사람이 담당했습니다. VodaBi와 독립 제품 모두." },
    { value: "제품 6개 출시", label: "한국의 실제 학원, 교사, 학부모를 대상으로 직접 만들어 배포했습니다." },
    { value: "의사결정 19건 기록", label: "검토한 대안과 감수한 트레이드오프까지 함께 남긴 아키텍처·제품 판단 기록." }
  ]
};

const ROLE_COLS = {
  en: [
    {
      head: "Product",
      items: [
        "PRD authorship and a 19-entry decision log",
        "Rubric and LLM-judge design (11 scoring codes, deterministic lookups)",
        "Tiered model routing: light model for drafting, reasoning model for conflict resolution",
        "Pricing and trial windows aligned to the customer's planning cycle",
        "Bilingual product and UX decisions, English and Korean"
      ]
    },
    {
      head: "Engineering",
      items: [
        "Realtime voice: direct WebRTC, ephemeral session tokens, push-to-talk and server VAD",
        "NestJS 11 and Prisma 7 services, React 19 front ends",
        "Server-side API proxying so keys never reach browser JS",
        "Docker Compose, reverse proxy, AWS EC2 deploys",
        "CI with typecheck, lint, and a Vitest suite on billing-critical paths"
      ]
    },
    {
      head: "Claim discipline",
      items: [
        "VodaBi is built and rolling out with IBK and FastFive; there are no production metrics yet and I do not quote any",
        "Client identifiers stay sanitized under NDA",
        "Outcomes below are tagged measured, estimated, or target — never blended",
        "Where a number is an estimate, the method is in the case study"
      ]
    }
  ],
  ko: [
    {
      head: "프로덕트",
      items: [
        "PRD 작성 및 19건의 의사결정 로그",
        "루브릭 및 LLM 채점 설계 (11개 채점 코드, 결정론적 조회)",
        "모델 계층 분리: 초안은 경량 모델, 충돌 해결은 추론 모델",
        "고객의 운영 주기에 맞춘 가격 정책과 체험 기간 설계",
        "영어·한국어 이중언어 제품 및 UX 판단"
      ]
    },
    {
      head: "엔지니어링",
      items: [
        "실시간 음성: Direct WebRTC, 임시 세션 토큰, Push-to-Talk 및 서버 VAD",
        "NestJS 11 · Prisma 7 서비스, React 19 프런트엔드",
        "API 키가 브라우저에 노출되지 않는 서버 사이드 프록시",
        "Docker Compose, 리버스 프록시, AWS EC2 배포",
        "타입체크·린트 및 결제 핵심 경로 Vitest 테스트를 포함한 CI"
      ]
    },
    {
      head: "주장의 범위",
      items: [
        "VodaBi는 구축을 마치고 IBK·패스트파이브에서 사용을 시작합니다. 아직 프로덕션 지표가 없어 어떤 수치도 인용하지 않습니다",
        "고객사 식별 정보는 NDA에 따라 익명화합니다",
        "아래 성과는 실측·추정·목표로 구분해 표기하며 섞지 않습니다",
        "추정치의 산출 방법은 케이스 스터디에 적었습니다"
      ]
    }
  ]
};

const FEATURED_PROJECTS: Record<'en' | 'ko', FeaturedProject[]> = {
  en: [
    {
      id: "vodabi",
      context: "Work project · VodaBi",
      status: "Built, rolling out",
      title: "Outbound sales-call screening and evaluation platform",
      problem: "Screening outbound telemarketing candidates ran on manual phone calls: high admin load, slow turnaround, and scores that changed depending on who listened. The platform replaces the call itself with a realtime AI persona roleplay, then scores the recording against a fixed rubric.",
      owned: [
        "Product definition: candidate flow, rubric codes, what the report has to show a hiring manager",
        "Realtime voice pipeline: direct browser-to-model WebRTC, ephemeral tokens, push-to-talk and server-side VAD",
        "Post-call evaluation service: 11 rubric codes, BANTCQ evidence extraction, speech-pacing telemetry",
        "Multi-tenant backoffice with a custom roles guard, plus the VOISOR coaching assistant",
        "Security pass and the AWS EC2 deploy, including a pre-production audit of five vulnerabilities"
      ],
      decisions: [
        {
          choice: "Direct WebRTC instead of relaying audio through our server",
          why: "Relaying added a round trip to every turn, which makes a roleplay feel broken.",
          tradeoff: "Tradeoff: ephemeral token issuance and client-side session handling to build and secure."
        },
        {
          choice: "Deterministic rubric lookups instead of letting the model score freely",
          why: "A hiring decision cannot rest on a score that moves between runs.",
          tradeoff: "Tradeoff: less nuance per answer, and rubric changes need a deliberate rewrite."
        },
        {
          choice: "Stateless magic links instead of candidate accounts",
          why: "Signup was the largest drop-off point before the call ever started.",
          tradeoff: "Tradeoff: link expiry, rotation on re-invite, and no persistent candidate history."
        }
      ],
      stack: ["React 19", "NestJS 11", "Prisma 7", "MariaDB", "Direct WebRTC", "OpenAI Realtime", "GPT-4o", "Docker Compose", "AWS EC2", "AES-256-GCM"]
    },
    {
      id: "chekki",
      context: "Independent · Chekki AI",
      status: "Live · pilot",
      image: "https://res.cloudinary.com/dginphpy4/image/upload/v1765770525/Chekki_Futuristic_Background_i8foqe.png",
      title: "Closed-loop homework grading for Korean ESL academies",
      problem: "Three problems that are usually treated separately: parents who cannot check English homework with their child, mistakes at home that never reach the next lesson, and teachers writing bilingual parent updates by hand. Chekki closes that loop with one camera scan graded against the teacher's own answer key.",
      owned: [
        "Founding product decisions across three user types: parent, foreign teacher, academy director",
        "Grading anchored to teacher-verified answer keys rather than the model's own reading of the page",
        "Bilingual explanation layer: Korean honorifics, pronunciation and phonics guidance for parents",
        "Mobile build via Capacitor, Firestore data model with atomic transactions, serverless API routes",
        "Zero-retention handling of student worksheet images, and the COPPA and GDPR alignment around it"
      ],
      decisions: [
        {
          choice: "Ground grading in the teacher's answer key, not in the model alone",
          why: "Free OCR grading was confidently wrong often enough to lose a parent's trust in one session.",
          tradeoff: "Tradeoff: a teacher has to pre-seed the curriculum before a class can be graded."
        },
        {
          choice: "Tiered model routing: light model for drafts, reasoning model for hard cases",
          why: "It keeps the free tier viable and reserves cost for the work that needs it.",
          tradeoff: "Tradeoff: two prompt paths to maintain and evaluate instead of one."
        },
        {
          choice: "Discard worksheet images immediately after evaluation",
          why: "Children's work is the most sensitive data in the product; not storing it removes the whole class of risk.",
          tradeoff: "Tradeoff: no history view, and no ability to re-run an old scan."
        }
      ],
      stack: ["React 19", "Capacitor 8", "Gemini 2.5 Pro & Flash", "Cloud Firestore", "Vercel Functions", "Upstash Redis", "RevenueCat"],
      liveUrl: "https://chekki-ai.vercel.app/",
      stores: [
        { label: "App Store ↗", href: "https://apps.apple.com/us/app/chekkiai/id6759361725" },
        { label: "Google Play ↗", href: "https://play.google.com/store/apps/details?id=com.chekkiai.app&hl=en&pli=1" }
      ]
    }
  ],
  ko: [
    {
      id: "vodabi",
      context: "업무 프로젝트 · VodaBi",
      status: "구축 완료, 도입 진행",
      title: "아웃바운드 세일즈 통화 스크리닝 및 평가 플랫폼",
      problem: "아웃바운드 텔레마케팅 지원자 1차 스크리닝이 수동 전화 통화로 진행되면서 행정 부담이 크고 처리 속도가 느리며, 듣는 사람에 따라 평가가 달라졌습니다. 이 플랫폼은 통화 자체를 실시간 AI 페르소나 롤플레이로 대체하고, 고정된 루브릭으로 채점합니다.",
      owned: [
        "제품 정의: 지원자 플로우, 루브릭 코드, 리포트가 채용 담당자에게 보여야 할 정보",
        "실시간 음성 파이프라인: 브라우저-모델 Direct WebRTC, 임시 토큰, Push-to-Talk 및 서버 VAD",
        "통화 후 평가 서비스: 11개 루브릭 코드, BANTCQ 근거 추출, 발화 속도 텔레메트리",
        "커스텀 RolesGuard 기반 멀티테넌트 백오피스 및 VOISOR 코칭 어시스턴트",
        "보안 점검과 AWS EC2 배포, 사전 프로덕션 단계의 5개 취약점 감사 포함"
      ],
      decisions: [
        {
          choice: "서버 릴레이 대신 Direct WebRTC 선택",
          why: "릴레이는 매 턴마다 왕복 지연을 추가해 롤플레이가 끊기는 느낌을 줍니다.",
          tradeoff: "트레이드오프: 임시 토큰 발급과 클라이언트 세션 처리를 직접 구축하고 보호해야 합니다."
        },
        {
          choice: "모델의 자유 채점 대신 결정론적 루브릭 조회",
          why: "채용 판단이 실행할 때마다 달라지는 점수에 기댈 수는 없습니다.",
          tradeoff: "트레이드오프: 답변별 미세한 해석은 줄고, 루브릭 변경은 의도적인 재작성이 필요합니다."
        },
        {
          choice: "지원자 계정 대신 무상태 매직링크",
          why: "통화 시작 전 가장 큰 이탈 지점이 회원가입이었습니다.",
          tradeoff: "트레이드오프: 링크 만료와 재초대 시 로테이션 관리가 필요하고, 지원자 이력은 남지 않습니다."
        }
      ],
      stack: ["React 19", "NestJS 11", "Prisma 7", "MariaDB", "Direct WebRTC", "OpenAI Realtime", "GPT-4o", "Docker Compose", "AWS EC2", "AES-256-GCM"]
    },
    {
      id: "chekki",
      context: "독립 개발 · Chekki AI",
      status: "라이브 · 파일럿",
      image: "https://res.cloudinary.com/dginphpy4/image/upload/v1765770525/Chekki_Futuristic_Background_i8foqe.png",
      title: "한국 영어학원을 위한 가정-교실 폐쇄 루프 숙제 채점",
      problem: "보통 따로 다뤄지는 세 가지 문제: 영어 숙제를 아이와 함께 확인하기 어려운 학부모, 다음 수업까지 전달되지 않는 가정 내 오답, 그리고 이중언어 알림장을 손으로 쓰는 교사. Chekki는 교사의 정답지를 기준으로 한 번의 카메라 스캔으로 이 루프를 닫습니다.",
      owned: [
        "학부모·원어민 교사·원장 세 사용자군을 아우르는 창업 단계 제품 판단",
        "모델의 자체 판독이 아니라 교사가 검증한 정답지를 기준으로 하는 채점 구조",
        "이중언어 해설 레이어: 한국어 존댓말, 발음 및 파닉스 가이드",
        "Capacitor 모바일 빌드, 원자적 트랜잭션 기반 Firestore 데이터 모델, 서버리스 API",
        "학생 숙제 이미지 무저장 처리 및 COPPA·GDPR 대응"
      ],
      decisions: [
        {
          choice: "모델 단독 판독 대신 교사 정답지 기준 채점",
          why: "자유 OCR 채점은 자신 있게 틀리는 경우가 있어, 한 번으로 학부모 신뢰를 잃습니다.",
          tradeoff: "트레이드오프: 채점 전에 교사가 커리큘럼을 사전 등록해야 합니다."
        },
        {
          choice: "모델 계층 분리: 초안은 경량, 어려운 건은 추론 모델",
          why: "무료 등급을 유지하면서 비용은 필요한 작업에만 씁니다.",
          tradeoff: "트레이드오프: 프롬프트 경로가 둘로 늘어나 유지·평가 부담이 커집니다."
        },
        {
          choice: "평가 직후 숙제 이미지 즉시 폐기",
          why: "아동의 학습물은 제품에서 가장 민감한 데이터이며, 저장하지 않으면 위험 자체가 사라집니다.",
          tradeoff: "트레이드오프: 이력 조회가 없고 과거 스캔을 다시 실행할 수 없습니다."
        }
      ],
      stack: ["React 19", "Capacitor 8", "Gemini 2.5 Pro & Flash", "Cloud Firestore", "Vercel Functions", "Upstash Redis", "RevenueCat"],
      liveUrl: "https://chekki-ai.vercel.app/",
      stores: [
        { label: "App Store ↗", href: "https://apps.apple.com/us/app/chekkiai/id6759361725" },
        { label: "Google Play ↗", href: "https://play.google.com/store/apps/details?id=com.chekkiai.app&hl=en&pli=1" }
      ]
    }
  ]
};

const SHIPPED_PROJECTS: Record<'en' | 'ko', ShippedProject[]> = {
  en: [
    {
      id: "eduplanner",
      domains: ["ops"],
      title: "EduPlanner Pro",
      status: "Live MVP",
      desc: "School master scheduling: classes, teachers and rooms solved against hard constraints, then re-woven by a reasoning model where they conflict.",
      outcome: "40 hours → under 10 minutes, zero room or teacher clashes",
      stack: ["TypeScript solver", "Gemini 2.5 Pro", "React", "Vite"],
      liveUrl: "https://scheduling-app-five.vercel.app/",
      caseStudyId: "eduplanner"
    },
    {
      id: "chekki-teacher",
      domains: ["multimodal", "ops", "mobile"],
      title: "Chekki Schools",
      status: "Beta",
      desc: "Teacher cockpit: curriculum pre-seeding, answer-key calibration, class-wide mistake aggregation before the lesson. Also carries the consultation pipeline: intake notes become bilingual progress reports in a parent portal.",
      outcome: "About 80% of grading time saved, 10–15 hours a week per teacher",
      stack: ["React 19", "Gemini 2.5 Pro", "Firestore"],
      liveUrl: "https://www.chekkiai.com/schools",
      caseStudyId: "consultation-pipeline"
    },
    {
      id: "benchmark",
      domains: ["multimodal", "ops"],
      title: "Benchmark Explorer",
      status: "Live MVP",
      desc: "Turns raw assessment scores into CEFR and Cambridge YLE skill maps so a teacher can see where a student is actually stuck.",
      outcome: "Multi-axis mastery tracking in one click",
      stack: ["D3.js", "Recharts", "Airtable API", "React"],
      liveUrl: "https://education-benchmark-system.vercel.app/",
      caseStudyId: "benchmark-explorer"
    },
    {
      id: "diary",
      domains: ["mobile", "multimodal"],
      title: "Learning Diary Hub",
      status: "WIP",
      desc: "Classroom activity photos plus pedagogical tags compiled into print-ready PDF portfolios, with a font proxy that survives Hangul rendering.",
      outcome: "15 seconds per student portfolio",
      stack: ["Express", "Gemini Flash", "Supabase RLS", "@react-pdf"],
      caseStudyId: "white-label-hub"
    },
    {
      id: "crm",
      domains: ["ops"],
      title: "B2B lead enrichment CRM",
      status: "Internal",
      desc: "Finds regional academies, cleans the directory metadata, deduplicates against the CRM, and drafts a personalized Gmail deep link per lead.",
      outcome: "One-click ingestion and outreach draft",
      stack: ["Node/Express", "Naver Map API", "Gemini JSON", "Firebase"],
      caseStudyId: "lead-enrichment"
    }
  ],
  ko: [
    {
      id: "eduplanner",
      domains: ["ops"],
      title: "EduPlanner Pro",
      status: "라이브 MVP",
      desc: "학교 시간표 편성: 반·교사·교실을 하드 제약으로 먼저 풀고, 충돌 구간만 추론 모델이 재편성합니다.",
      outcome: "40시간 → 10분 미만, 교실·교사 충돌 0건",
      stack: ["TypeScript 솔버", "Gemini 2.5 Pro", "React", "Vite"],
      liveUrl: "https://scheduling-app-five.vercel.app/",
      caseStudyId: "eduplanner"
    },
    {
      id: "chekki-teacher",
      domains: ["multimodal", "ops", "mobile"],
      title: "Chekki Schools",
      status: "베타",
      desc: "교사용 코크핏: 커리큘럼 사전 등록, 정답지 보정, 수업 전 학급 단위 오답 집계. 상담 파이프라인도 포함해 교사의 관찰 기록을 학부모 포털의 이중언어 리포트로 변환합니다.",
      outcome: "채점 시간 약 80% 절감, 교사당 주 10~15시간",
      stack: ["React 19", "Gemini 2.5 Pro", "Firestore"],
      liveUrl: "https://www.chekkiai.com/schools",
      caseStudyId: "consultation-pipeline"
    },
    {
      id: "benchmark",
      domains: ["multimodal", "ops"],
      title: "Benchmark Explorer",
      status: "라이브 MVP",
      desc: "평가 원점수를 CEFR·캠브리지 YLE 역량 지도로 변환해, 학생이 실제로 막힌 지점을 보여줍니다.",
      outcome: "1클릭 다축 숙련도 추적",
      stack: ["D3.js", "Recharts", "Airtable API", "React"],
      liveUrl: "https://education-benchmark-system.vercel.app/",
      caseStudyId: "benchmark-explorer"
    },
    {
      id: "diary",
      domains: ["mobile", "multimodal"],
      title: "Learning Diary Hub",
      status: "진행 중",
      desc: "수업 활동 사진과 교육 태그를 인쇄용 PDF 포트폴리오로 컴파일하고, 한글 렌더링을 위한 폰트 프록시를 둡니다.",
      outcome: "학생당 15초",
      stack: ["Express", "Gemini Flash", "Supabase RLS", "@react-pdf"],
      caseStudyId: "white-label-hub"
    },
    {
      id: "crm",
      domains: ["ops"],
      title: "B2B 리드 인리치먼트 CRM",
      status: "사내",
      desc: "지역 학원을 수집하고 메타데이터를 정제해 CRM과 중복을 제거한 뒤, 리드별 맞춤 지메일 딥링크를 생성합니다.",
      outcome: "원클릭 수집 및 제안 초안",
      stack: ["Node/Express", "Naver Map API", "Gemini JSON", "Firebase"],
      caseStudyId: "lead-enrichment"
    }
  ]
};

const FILTERS = {
  en: [
    { id: "all", label: "All" },
    { id: "multimodal", label: "Multimodal" },
    { id: "ops", label: "Automation" },
    { id: "mobile", label: "Mobile" }
  ],
  ko: [
    { id: "all", label: "전체" },
    { id: "multimodal", label: "멀티모달" },
    { id: "ops", label: "자동화" },
    { id: "mobile", label: "모바일" }
  ]
};

const LOG: LogEntry[] = [
  {
    date: "2026-09-01",
    type: "feature",
    titleEn: "VodaBi: voice-AI screening and 11-rubric evaluator shipped",
    titleKo: "VodaBi: 음성 AI 스크리닝 및 11개 루브릭 평가 엔진 배포",
    descEn: "Direct WebRTC voice roleplay (<200ms latency), post-call GPT-4o evaluation with BANTCQ evidence, the VOISOR coaching assistant, multi-tenant RBAC, and a pre-production audit of five vulnerabilities.",
    descKo: "Direct WebRTC 음성 롤플레이(<200ms 지연), BANTCQ 근거를 포함한 통화 후 GPT-4o 평가, VOISOR 코칭 어시스턴트, 멀티테넌트 RBAC, 사전 프로덕션 5개 취약점 감사."
  },
  {
    date: "2026-09-01",
    type: "infra",
    titleEn: "Chekki AI: function consolidation and a 4,678-line refactor",
    titleKo: "Chekki AI: 함수 통합 및 4,678줄 리팩토링",
    descEn: "Consolidated AI routes into one endpoint and billing into another to fit the platform's function limit, then split a 4,678-line teacher page into role-scoped hooks with zero regressions.",
    descKo: "플랫폼 함수 한도에 맞춰 AI 라우트와 결제를 각각 하나의 엔드포인트로 통합하고, 4,678줄 교사 페이지를 역할별 훅으로 분리해 리그레션 없이 마쳤습니다."
  },
  {
    date: "2026-08-14",
    type: "feature",
    titleEn: "Deterministic step-rubric scoring and ephemeral WebRTC sessions",
    titleKo: "결정론적 스텝 루브릭 채점 및 임시 WebRTC 세션",
    descEn: "Shipped ephemeral session tokens with push-to-talk turn control, deterministic stepIndex rubric lookups, and AES-256-GCM encryption at rest.",
    descKo: "Push-to-Talk 턴 제어가 적용된 임시 세션 토큰, stepIndex 기반 결정론적 루브릭 조회, 저장 데이터 AES-256-GCM 암호화를 배포했습니다."
  },
  {
    date: "2026-08-08",
    type: "security",
    titleEn: "Magic-link token rotation and active role verification",
    titleKo: "매직링크 토큰 로테이션 및 실시간 권한 검증",
    descEn: "Seven-day link expiry with rotation on re-invite, authenticated call-log endpoints to block transcript injection, and database role re-checks on privileged requests.",
    descKo: "7일 만료 및 재초대 시 로테이션, 트랜스크립트 주입을 막는 인증된 통화 로그 엔드포인트, 권한 요청 시 데이터베이스 역할 재검증."
  },
  {
    date: "2026-05-29",
    type: "security",
    titleEn: "Zero-retention handling for student worksheets",
    titleKo: "학생 숙제 이미지 무저장 처리",
    descEn: "Gateway-level pipeline that discards worksheet images the moment evaluation finishes, so no student record is persisted.",
    descKo: "평가가 끝나는 즉시 숙제 이미지를 폐기하는 게이트웨이 파이프라인으로, 학생 기록을 저장하지 않습니다."
  }
];

export default function App() {
  const [locale, setLocale] = useState<'en' | 'ko'>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLogExpanded, setIsLogExpanded] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string | null>(null);

  // Hash-based routing for direct case study links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validCaseIds = ['vodabi', 'chekki', 'eduplanner', 'consultation-pipeline', 'benchmark-explorer', 'white-label-hub', 'lead-enrichment'];
      if (validCaseIds.includes(hash)) {
        setActiveCaseStudyId(hash);
      } else if (!hash || hash === 'work' || hash === 'more' || hash === 'log' || hash === 'contact' || hash === 'top') {
        setActiveCaseStudyId(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const L = COPY[locale];

  const filteredShipped = SHIPPED_PROJECTS[locale].filter(item => {
    const matchesFilter = activeFilter === 'all' || item.domains.includes(activeFilter);
    const q = searchQuery.trim().toLowerCase();
    if (!q) return matchesFilter;
    const matchesQuery = (
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.outcome.toLowerCase().includes(q) ||
      item.stack.some(s => s.toLowerCase().includes(q))
    );
    return matchesFilter && matchesQuery;
  });

  const displayedLog = isLogExpanded ? LOG : LOG.slice(0, 3);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen font-sans transition-colors duration-200 ${
      isDark ? 'bg-[#14171d] text-[#faf9f6]' : 'bg-[#faf9f6] text-[#14171d]'
    }`}>
      {/* STICKY HEADER */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors ${
        isDark ? 'bg-[#14171d]/90 border-white/10' : 'bg-[#faf9f6]/90 border-black/10'
      }`}>
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 h-[60px] flex items-center justify-between gap-6">
          <a
            href="#top"
            onClick={scrollToSection('top')}
            className="font-display text-[15px] font-medium tracking-wide hover:text-accent-gold transition-colors"
          >
            Jason Benjamin
          </a>

          <nav className="hidden md:flex items-center gap-7 text-[13.5px] font-medium">
            <a
              href="#work"
              onClick={scrollToSection('work')}
              className={`transition-colors ${isDark ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`}
            >
              {L.navWork}
            </a>
            <a
              href="#more"
              onClick={scrollToSection('more')}
              className={`transition-colors ${isDark ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`}
            >
              {L.navMore}
            </a>
            <a
              href="#log"
              onClick={scrollToSection('log')}
              className={`transition-colors ${isDark ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`}
            >
              {L.navLog}
            </a>
            <a
              href="#contact"
              onClick={scrollToSection('contact')}
              className={`transition-colors ${isDark ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`}
            >
              {L.navContact}
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setLocale(l => l === 'en' ? 'ko' : 'en')}
              className={`h-[34px] px-3 rounded-lg border text-xs font-semibold tracking-wider transition-colors ${
                isDark ? 'border-white/15 text-white/80 hover:bg-white/5' : 'border-black/15 text-black/80 hover:bg-black/5'
              }`}
            >
              {L.localeSwitch}
            </button>
            <button
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className={`w-[34px] h-[34px] rounded-lg border flex items-center justify-center transition-colors ${
                isDark ? 'border-white/15 text-white/80 hover:bg-white/5' : 'border-black/15 text-black/80 hover:bg-black/5'
              }`}
            >
              {isDark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsResumeOpen(true)}
              className={`h-[34px] px-4 rounded-lg font-bold text-xs tracking-wider transition-all shadow-sm ${
                isDark ? 'bg-white text-[#14171d] hover:bg-white/90' : 'bg-[#14171d] text-white hover:bg-black/90'
              }`}
            >
              {L.resumeBtn}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main id="top" className="max-w-[1180px] mx-auto px-6 md:px-10">

        {/* HERO SECTION */}
        <section className="pt-16 md:pt-20 pb-14 grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-12 lg:gap-16 items-end">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.1rem] font-display font-normal leading-[1.06] tracking-tight text-balance">
              {L.heroTitle}
            </h1>
            <p className={`mt-6 max-w-[62ch] text-base md:text-[17px] leading-relaxed font-normal text-pretty ${
              isDark ? 'text-[#b9c0ca]' : 'text-[#4b5563]'
            }`}>
              {L.heroBody}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                onClick={scrollToSection('work')}
                className="h-[46px] px-6 rounded-xl bg-accent-gold text-[#14171d] text-[13px] font-bold tracking-wide inline-flex items-center hover:brightness-105 transition-all shadow-sm"
              >
                {L.ctaWork}
              </a>
              <button
                onClick={() => setIsResumeOpen(true)}
                className={`h-[46px] px-6 rounded-xl border text-[13px] font-bold tracking-wide transition-colors ${
                  isDark ? 'border-white/20 text-white hover:bg-white/5' : 'border-black/20 text-black hover:bg-black/5'
                }`}
              >
                {L.ctaResume}
              </button>
              <a
                href="mailto:jsn.benjamin@gmail.com"
                className={`h-[46px] px-5 rounded-xl border text-[13px] font-medium tracking-wide inline-flex items-center transition-colors ${
                  isDark ? 'border-white/10 text-[#868f9c] hover:text-white' : 'border-black/10 text-[#6b7280] hover:text-black'
                }`}
              >
                jsn.benjamin@gmail.com
              </a>
            </div>
          </div>

          <aside className={`border rounded-2xl p-6 transition-colors ${
            isDark ? 'bg-[#1a1e26] border-white/10' : 'bg-white border-black/10 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-[#5fd48b]">
              <span className="w-2 h-2 rounded-full bg-[#5fd48b] animate-pulse"></span>
              <span>{L.nowLabel}</span>
            </div>
            <p className={`mt-3 text-sm md:text-[15px] leading-relaxed font-medium ${
              isDark ? 'text-[#faf9f6]' : 'text-[#14171d]'
            }`}>
              {L.nowBody}
            </p>
          </aside>
        </section>

        {/* FACTS BAR */}
        <section className={`border-y py-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 ${
          isDark ? 'border-white/10' : 'border-black/10'
        }`}>
          {FACTS[locale].map((f, i) => (
            <div key={i} className="pr-4">
              <div className="font-display text-xl md:text-2xl font-semibold tracking-tight text-accent-gold">
                {f.value}
              </div>
              <div className={`mt-1.5 text-xs md:text-[13px] leading-relaxed ${
                isDark ? 'text-[#b9c0ca]' : 'text-[#4b5563]'
              }`}>
                {f.label}
              </div>
            </div>
          ))}
        </section>

        {/* HOW I WORK SECTION */}
        <section className="pt-16 pb-6">
          <h2 className="text-2xl md:text-3xl font-display font-medium tracking-tight">
            {L.roleTitle}
          </h2>
          <div className={`mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t ${
            isDark ? 'border-white/10' : 'border-black/10'
          }`}>
            {ROLE_COLS[locale].map((col, i) => (
              <div key={i} className="space-y-3">
                <h3 className="text-sm md:text-[15px] font-bold tracking-wide text-accent-gold">
                  {col.head}
                </h3>
                <ul className="space-y-2.5 pt-1">
                  {col.items.map((item, j) => (
                    <li key={j} className={`text-xs md:text-[13.5px] leading-relaxed flex items-start gap-2.5 ${
                      isDark ? 'text-[#b9c0ca]' : 'text-[#4b5563]'
                    }`}>
                      <span className="text-accent-gold/80 font-bold shrink-0 mt-0.5">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* SELECTED WORK SECTION */}
        <section id="work" className="pt-16">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-2">
            <h2 className="text-2xl md:text-3xl font-display font-medium tracking-tight">
              {L.workTitle}
            </h2>
            <p className={`text-xs md:text-[13.5px] max-w-[46ch] ${
              isDark ? 'text-[#868f9c]' : 'text-[#6b7280]'
            }`}>
              {L.workNote}
            </p>
          </div>

          <div className="space-y-8 mt-6">
            {FEATURED_PROJECTS[locale].map((project) => (
              <article
                key={project.id}
                className={`border rounded-2xl overflow-hidden transition-all ${
                  isDark ? 'bg-[#1a1e26] border-white/10' : 'bg-white border-black/10 shadow-sm'
                }`}
              >
                <div className={`grid grid-cols-1 ${project.image ? 'lg:grid-cols-[0.9fr_1.1fr]' : 'grid-cols-1'}`}>
                  {project.image && (
                    <div className={`aspect-video lg:aspect-auto h-full overflow-hidden border-b lg:border-b-0 lg:border-r relative ${
                      isDark ? 'bg-[#101319] border-white/10' : 'bg-[#f2f1ec] border-black/10'
                    }`}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  <div className="p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`text-[11px] font-bold tracking-widest uppercase ${
                          isDark ? 'text-[#868f9c]' : 'text-[#6b7280]'
                        }`}>
                          {project.context}
                        </span>
                        <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-md bg-accent-gold/15 text-accent-gold border border-accent-gold/25">
                          {project.status}
                        </span>
                      </div>

                      <h3 className="mt-3 text-xl md:text-2xl font-display font-medium tracking-tight leading-snug">
                        {project.title}
                      </h3>

                      <p className={`mt-3 text-sm md:text-[14.5px] leading-relaxed ${
                        isDark ? 'text-[#b9c0ca]' : 'text-[#4b5563]'
                      }`}>
                        {project.problem}
                      </p>

                      {/* WHAT I BUILT */}
                      <div className={`mt-6 pt-5 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                        <h4 className={`text-xs font-bold tracking-widest uppercase ${
                          isDark ? 'text-[#868f9c]' : 'text-[#6b7280]'
                        }`}>
                          {L.ownedLabel}
                        </h4>
                        <ul className="mt-3 space-y-2">
                          {project.owned.map((item, idx) => (
                            <li key={idx} className="text-xs md:text-[13.5px] leading-relaxed flex items-start gap-2.5">
                              <span className="text-accent-gold shrink-0">—</span>
                              <span className={isDark ? 'text-[#faf9f6]' : 'text-[#14171d]'}>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* DECISIONS & TRADEOFFS */}
                      <div className={`mt-6 pt-5 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                        <h4 className={`text-xs font-bold tracking-widest uppercase ${
                          isDark ? 'text-[#868f9c]' : 'text-[#6b7280]'
                        }`}>
                          {L.decisionsLabel}
                        </h4>
                        <div className="mt-3 space-y-3.5">
                          {project.decisions.map((d, idx) => (
                            <div key={idx} className="text-xs md:text-[13px] leading-relaxed">
                              <div className="font-semibold text-accent-gold">{d.choice}</div>
                              <div className={`mt-0.5 ${isDark ? 'text-[#b9c0ca]' : 'text-[#4b5563]'}`}>{d.why}</div>
                              <div className={`mt-0.5 italic ${isDark ? 'text-[#868f9c]' : 'text-[#6b7280]'}`}>{d.tradeoff}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* STACK TAGS */}
                      <div className={`mt-6 pt-5 border-t flex flex-wrap gap-1.5 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                        {project.stack.map((tech, idx) => (
                          <span
                            key={idx}
                            className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                              isDark ? 'border-white/10 text-[#b9c0ca] bg-white/[0.02]' : 'border-black/10 text-[#4b5563] bg-black/[0.02]'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className={`mt-6 pt-5 border-t flex flex-wrap items-center gap-3 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                      <button
                        onClick={() => setActiveCaseStudyId(project.id)}
                        className={`h-[40px] px-4 rounded-lg font-bold text-xs tracking-wider transition-all shadow-sm ${
                          isDark ? 'bg-white text-[#14171d] hover:bg-white/90' : 'bg-[#14171d] text-white hover:bg-black/90'
                        }`}
                      >
                        {locale === 'en' ? "Read the case study ↗" : "케이스 스터디 읽기 ↗"}
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`h-[40px] px-4 rounded-lg border text-xs font-semibold tracking-wider inline-flex items-center gap-1.5 transition-colors ${
                            isDark ? 'border-white/15 text-white/80 hover:bg-white/5' : 'border-black/15 text-black/80 hover:bg-black/5'
                          }`}
                        >
                          <span>{locale === 'en' ? "Open live app" : "라이브 앱 열기"}</span>
                          <ExternalLinkIcon className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {project.stores?.map((store, idx) => (
                        <a
                          key={idx}
                          href={store.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`h-[40px] px-3.5 rounded-lg border text-xs font-semibold tracking-wider inline-flex items-center gap-1 transition-colors ${
                            isDark ? 'border-white/10 text-[#b9c0ca] hover:text-white hover:bg-white/5' : 'border-black/10 text-[#4b5563] hover:text-black hover:bg-black/5'
                          }`}
                        >
                          <span>{store.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ALSO SHIPPED SECTION */}
        <section id="more" className="pt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-medium tracking-tight">
                {L.moreTitle}
              </h2>
              <p className={`mt-1 text-xs md:text-[13.5px] max-w-[58ch] ${
                isDark ? 'text-[#868f9c]' : 'text-[#6b7280]'
              }`}>
                {L.moreNote}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 flex-wrap">
                {FILTERS[locale].map(f => {
                  const isActive = activeFilter === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setActiveFilter(f.id)}
                      className={`h-[34px] px-3.5 rounded-lg text-xs font-bold tracking-wider transition-colors ${
                        isActive
                          ? (isDark ? 'bg-white text-[#14171d]' : 'bg-[#14171d] text-white')
                          : (isDark ? 'border border-white/15 text-white/70 hover:bg-white/5' : 'border border-black/15 text-black/70 hover:bg-black/5')
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>

              <div className={`h-[34px] px-3 rounded-lg border flex items-center gap-2 ${
                isDark ? 'border-white/15 bg-white/[0.02]' : 'border-black/15 bg-black/[0.02]'
              }`}>
                <SearchIcon className={`w-3.5 h-3.5 ${isDark ? 'text-white/40' : 'text-black/40'}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={L.searchPlaceholder}
                  className="bg-transparent border-none outline-none text-xs w-[120px] sm:w-[150px] placeholder-inherit"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-xs opacity-50 hover:opacity-100">
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className={`mt-6 border-t divide-y ${
            isDark ? 'border-white/10 divide-white/10' : 'border-black/10 divide-black/10'
          }`}>
            {filteredShipped.map(p => (
              <div
                key={p.id}
                className="py-5 grid grid-cols-1 md:grid-cols-[1.4fr_1.1fr_1fr_auto] gap-4 md:gap-6 items-start hover:bg-white/[0.01] transition-colors"
              >
                <div>
                  <div className={`text-[10.5px] font-bold tracking-widest uppercase ${
                    isDark ? 'text-[#868f9c]' : 'text-[#6b7280]'
                  }`}>
                    {p.status}
                  </div>
                  <h3 className="mt-1 text-base md:text-lg font-display font-medium tracking-tight">
                    {p.title}
                  </h3>
                  <p className={`mt-1.5 text-xs md:text-[13.5px] leading-relaxed max-w-[44ch] ${
                    isDark ? 'text-[#b9c0ca]' : 'text-[#4b5563]'
                  }`}>
                    {p.desc}
                  </p>
                </div>

                <div>
                  <div className="text-xs md:text-[13.5px] font-semibold leading-relaxed text-accent-gold">
                    {p.outcome}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((t, idx) => (
                    <span
                      key={idx}
                      className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                        isDark ? 'bg-white/[0.05] text-[#b9c0ca]' : 'bg-black/[0.05] text-[#4b5563]'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-1.5 md:items-end">
                  <button
                    onClick={() => setActiveCaseStudyId(p.caseStudyId)}
                    className="text-xs font-bold text-accent-gold hover:underline whitespace-nowrap text-left md:text-right"
                  >
                    {L.caseLabel}
                  </button>
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xs font-semibold whitespace-nowrap hover:underline ${
                        isDark ? 'text-[#b9c0ca]' : 'text-[#4b5563]'
                      }`}
                    >
                      Launch Live ↗
                    </a>
                  )}
                </div>
              </div>
            ))}

            {filteredShipped.length === 0 && (
              <p className={`py-10 text-center text-sm ${isDark ? 'text-[#868f9c]' : 'text-[#6b7280]'}`}>
                {L.noResults}
              </p>
            )}
          </div>
        </section>

        {/* BUILD LOG SECTION */}
        <section id="log" className="pt-20">
          <div className="flex items-baseline justify-between gap-4 pb-2">
            <h2 className="text-2xl md:text-3xl font-display font-medium tracking-tight">
              {L.logTitle}
            </h2>
            <button
              onClick={() => setIsLogExpanded(!isLogExpanded)}
              className={`h-[34px] px-3.5 rounded-lg border text-xs font-bold tracking-wider transition-colors ${
                isDark ? 'border-white/15 text-white/80 hover:bg-white/5' : 'border-black/15 text-black/80 hover:bg-black/5'
              }`}
            >
              {isLogExpanded ? L.logToggleLess : L.logToggleMore}
            </button>
          </div>

          <div className={`mt-6 border-t divide-y ${
            isDark ? 'border-white/10 divide-white/10' : 'border-black/10 divide-black/10'
          }`}>
            {displayedLog.map((e, idx) => (
              <div
                key={idx}
                className="py-4.5 grid grid-cols-1 sm:grid-cols-[110px_90px_1fr] gap-2 sm:gap-6 items-start"
              >
                <span className={`text-xs font-mono shrink-0 ${isDark ? 'text-[#868f9c]' : 'text-[#6b7280]'}`}>
                  {e.date}
                </span>
                <span className="text-[10.5px] font-bold tracking-widest uppercase text-accent-gold shrink-0">
                  [{e.type}]
                </span>
                <div>
                  <div className="text-sm md:text-[14.5px] font-semibold leading-snug">
                    {locale === 'ko' ? e.titleKo : e.titleEn}
                  </div>
                  <p className={`mt-1 text-xs md:text-[13px] leading-relaxed max-w-[78ch] ${
                    isDark ? 'text-[#b9c0ca]' : 'text-[#4b5563]'
                  }`}>
                    {locale === 'ko' ? e.descKo : e.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT / HIRING SECTION */}
        <section id="contact" className="pt-20 pb-24">
          <div className={`border rounded-2xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14 items-center ${
            isDark ? 'bg-[#1a1e26] border-white/10' : 'bg-white border-black/10 shadow-sm'
          }`}>
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-medium tracking-tight leading-tight">
                {L.contactTitle}
              </h2>
              <p className={`mt-4 text-sm md:text-base leading-relaxed max-w-[52ch] ${
                isDark ? 'text-[#b9c0ca]' : 'text-[#4b5563]'
              }`}>
                {L.contactBody}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:jsn.benjamin@gmail.com"
                  className="h-[46px] px-6 rounded-xl bg-accent-gold text-[#14171d] text-xs font-bold tracking-wider inline-flex items-center hover:brightness-105 transition-all shadow-sm"
                >
                  {L.contactCta}
                </a>
                <button
                  onClick={() => setIsResumeOpen(true)}
                  className={`h-[46px] px-6 rounded-xl border text-xs font-bold tracking-wider transition-colors ${
                    isDark ? 'border-white/20 text-white hover:bg-white/5' : 'border-black/20 text-black hover:bg-black/5'
                  }`}
                >
                  {L.ctaResume}
                </button>
              </div>
            </div>

            <dl className={`space-y-4 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l lg:pl-10 ${
              isDark ? 'border-white/10' : 'border-black/10'
            }`}>
              <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
                <dt className={`text-[11px] font-bold tracking-widest uppercase ${
                  isDark ? 'text-[#868f9c]' : 'text-[#6b7280]'
                }`}>
                  {L.lookingLabel}
                </dt>
                <dd className="text-xs md:text-sm font-medium">
                  {L.lookingValue}
                </dd>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
                <dt className={`text-[11px] font-bold tracking-widest uppercase ${
                  isDark ? 'text-[#868f9c]' : 'text-[#6b7280]'
                }`}>
                  {L.basedLabel}
                </dt>
                <dd className="text-xs md:text-sm font-medium">
                  {L.basedValue}
                </dd>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
                <dt className={`text-[11px] font-bold tracking-widest uppercase ${
                  isDark ? 'text-[#868f9c]' : 'text-[#6b7280]'
                }`}>
                  {L.langLabel}
                </dt>
                <dd className="text-xs md:text-sm font-medium">
                  {L.langValue}
                </dd>
              </div>
            </dl>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className={`border-t py-8 transition-colors ${
        isDark ? 'border-white/10 text-[#868f9c]' : 'border-black/10 text-[#6b7280]'
      }`}>
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium">
          <span>© Jason Benjamin</span>
          <span>{L.footerNote}</span>
        </div>
      </footer>

      {/* MODALS */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        theme={theme}
        locale={locale}
      />

      {activeCaseStudyId && (
        <CaseStudyViewer
          projectId={activeCaseStudyId}
          onClose={() => setActiveCaseStudyId(null)}
          theme={theme}
          locale={locale}
        />
      )}
    </div>
  );
}

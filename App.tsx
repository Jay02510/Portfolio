import React, { useState, useEffect, useMemo, useCallback, useRef, lazy, Suspense } from 'react';
import FeedbackBox from './components/FeedbackBox.tsx';
import { CompactProjectCard } from './components/CompactProjectCard.tsx';
import { SunIcon, MoonIcon, ExternalLinkIcon, ChevronDownIcon } from './components/Icons.tsx';
import { track } from '@vercel/analytics';

// Case studies (viewer + ~2,600 lines of data) load only when one is opened.
// Resume modal (and the full resume) loads on first open.
const ResumeModal = lazy(() => import('./components/ResumeModal.tsx'));
const CaseStudyViewer = lazy(() => import('./CaseStudyViewer.tsx').then(m => ({ default: m.CaseStudyViewer })));

interface Decision {
  choice: string;
  why: string;
  tradeoff: string;
}

// Muted loop that only downloads and plays while on screen; stays on its poster for reduced motion.
function LoopVideo({ src, poster, label }: { src: string; poster?: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // React leaves `muted` out of server HTML, which blocks autoplay
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" aria-label={label} className="w-full h-full object-contain" />;
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
  video?: string;
  proof?: string;
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
  contactUrl?: string;
  caseStudyId: string;
  minor?: boolean;
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
    navMore: "Side projects",
    navLog: "Build log",
    navContact: "Contact",
    localeSwitch: "한국어",
    resumeBtn: "Résumé",
    heroTitle: "AI product engineer building for Korean teachers and parents.",
    heroBody: "From the first teacher interview to the App Store. 10+ years in Korean English academies and six AI products built solo. Chekki AI is live on the App Store and Google Play; Chekki Schools is in final testing ahead of a pilot. At VODABI I build the frontend, backend and database of VODATalk, a voice-AI sales training platform.",
    ctaWork: "See the work",
    ctaResume: "Résumé",
    caseLabel: "Case study ↗",
    nowLabel: "Now",
    nowBody: "VODATalk now runs on phones as well as computers, and is going into use with enterprise clients.",
    nextLabel: "In progress, not shipped",
    nextBody: "A RAG version of the lead-enrichment CRM, and a new textbook built on my 20-volume series that ties into Chekki.",
    roleTitle: "How I work",
    workTitle: "Selected work",
    workNote: "Two products in depth: the problem, what I built, and the calls I made along the way.",
    ownedLabel: "What I built",
    decisionsLabel: "Decisions and tradeoffs",
    moreTitle: "Side projects",
    moreNote: "Designed and built solo.",
    logTitle: "Build log",
    logToggleMore: "Show all",
    logToggleLess: "Show less",
    contactTitle: "Hiring for an AI PM or AI engineer role?",
    contactBody: "I work best where the product thinking and the implementation sit with one person: evaluation design, voice and multimodal pipelines, and the plumbing that makes them usable day to day.",
    contactCta: "Email me",
    linkedinLabel: "LinkedIn ↗",
    lookingLabel: "Looking for",
    lookingValue: "AI PM, product engineer, or hybrid roles on 0→1 teams",
    basedLabel: "Based in",
    basedValue: "South Korea, open to remote",
    langLabel: "Languages",
    langValue: "English (native), Korean (professional working, used daily at work)",
    footerNote: "Built and maintained by hand"
  },
  ko: {
    navWork: "주요 프로젝트",
    navMore: "사이드 프로젝트",
    navLog: "빌드 로그",
    navContact: "연락",
    localeSwitch: "English",
    resumeBtn: "이력서",
    heroTitle: "한국 교사와 학부모를 위한 AI 제품을 설계하고 개발하는 AI 프로덕트 엔지니어.",
    heroBody: "첫 교사 인터뷰부터 앱 출시까지. 한국 영어 학원에서 10년 넘게 가르쳤고, AI 제품 6개를 혼자 만들었습니다. Chekki AI는 App Store와 Google Play에 출시되었고, Chekki Schools는 파일럿을 앞두고 최종 테스트 중입니다. VODABI에서는 음성 AI 영업 훈련 플랫폼 VODATalk(보다톡)의 프론트엔드, 백엔드, 데이터베이스를 만듭니다.",
    ctaWork: "프로젝트 보기",
    ctaResume: "이력서",
    caseLabel: "케이스 스터디 ↗",
    nowLabel: "현재",
    nowBody: "VODATalk(보다톡)은 이제 컴퓨터와 휴대폰 모두에서 통화할 수 있고, 기업 고객사에서 사용을 시작합니다.",
    nextLabel: "진행 중 · 미출시",
    nextBody: "리드 수집 CRM을 바탕으로 한 RAG 시스템, 그리고 20권 교재 시리즈를 바탕으로 Chekki와 연결되는 새 교재.",
    roleTitle: "일하는 방식",
    workTitle: "주요 프로젝트",
    workNote: "두 제품을 깊게 다룹니다. 문제, 직접 만든 부분, 그 과정에서 내린 판단.",
    ownedLabel: "직접 만든 부분",
    decisionsLabel: "판단과 트레이드오프",
    moreTitle: "사이드 프로젝트",
    moreNote: "혼자 설계하고 만들었습니다.",
    logTitle: "빌드 로그",
    logToggleMore: "전체 보기",
    logToggleLess: "접기",
    contactTitle: "AI PM 또는 AI 엔지니어를 찾고 계신가요?",
    contactBody: "제품 판단과 구현을 한 사람이 함께 맡는 자리에서 가장 잘 일합니다. 평가 설계, 음성·멀티모달 파이프라인, 그리고 이를 매일 쓸 수 있게 만드는 작업.",
    contactCta: "메일 보내기",
    linkedinLabel: "LinkedIn ↗",
    lookingLabel: "찾는 자리",
    lookingValue: "AI PM, 프로덕트 엔지니어, 또는 하이브리드 역할 (0→1 팀)",
    basedLabel: "거주지",
    basedValue: "대한민국, 원격 근무 가능",
    langLabel: "언어",
    langValue: "영어(모국어), 한국어(업무 수준, 매일 업무에 사용)",
    footerNote: "직접 만들고 관리합니다"
  }
};

const FACTS = {
  en: [
    { value: "10+ years in Korean classrooms", label: "English academies since 2015: curriculum lead, author of a 20-volume textbook series, homeroom teacher." },
    { value: "6 products built solo", label: "From discovery to release. Chekki AI is on the App Store and Google Play; Chekki Schools is in final testing." },
    { value: "26 decisions logged", label: "Architecture and product calls written down with the alternative and the tradeoff accepted." }
  ],
  ko: [
    { value: "한국 교실 10년 이상", label: "2015년부터 영어 학원에서 커리큘럼 리드, 20권 교재 시리즈 집필, 담임을 맡았습니다." },
    { value: "제품 6개 단독 개발", label: "발견부터 출시까지. Chekki AI는 App Store와 Google Play에 출시, Chekki Schools는 최종 테스트 중." },
    { value: "의사결정 26건 기록", label: "검토한 대안과 감수한 트레이드오프까지 함께 남긴 아키텍처·제품 판단 기록." }
  ]
};

const ROLE_COLS = {
  en: [
    {
      head: "Product",
      items: [
        "PRD authorship and a 26-entry decision log",
        "LLM-judge pipelines that score first and explain second",
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
        "VODATalk is built and rolling out with enterprise clients; figures measured on the client's system stay private, so I do not quote any",
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
        "PRD 작성 및 26건의 의사결정 로그",
        "채점 후 설명하는 LLM 평가 파이프라인",
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
        "VODATalk는 구축을 마치고 기업 고객사에서 사용을 시작합니다. 고객사 시스템에서 측정한 수치는 비공개라 인용하지 않습니다",
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
      context: "Work project · VODABI",
      status: "Built, rolling out",
      image: "/screenshots/vodabi/architecture.svg",
      title: "Voice-AI sales training and evaluation platform",
      problem: "Sales teams need a consistent way to practise and assess calls. The platform runs realistic AI roleplay calls, scores them against a rubric, and gives managers a view of team progress.",
      owned: [
        "Candidate and staff flows: magic-link tests, self-practice, assigned training, and the post-call report",
        "Realtime voice pipeline: direct browser-to-model WebRTC, ephemeral tokens, push-to-talk and server-side VAD",
        "Post-call evaluation service: two-step grading (score, then explain), sales-qualification evidence quoted from the call, speech-pacing telemetry",
        "Multi-tenant backoffice with a custom roles guard, plus the VOISOR coaching assistant",
        "Staff growth and manager dashboards: scores by scenario, competency growth, badges, team completion rates",
        "Pilot readiness: candidate links that run on phones behind an admin switch, and calls that survive mic loss, silence and concurrent starts",
        "Sentry error reporting and the AWS EC2 deploy"
      ],
      decisions: [
        {
          choice: "Direct WebRTC instead of relaying audio through our server",
          why: "Keeping the server out of the audio path makes each turn feel like a real call.",
          tradeoff: "Tradeoff: ephemeral token issuance and client-side session handling to build and secure."
        },
        {
          choice: "Score first, then write feedback from the fixed scores",
          why: "Writing feedback from fixed scores keeps the coaching consistent with the number.",
          tradeoff: "Tradeoff: two sequential calls add a few seconds before the report appears."
        },
        {
          choice: "Stateless magic links instead of candidate accounts",
          why: "Candidates can start a scored call straight from a link, without signing up.",
          tradeoff: "Tradeoff: link expiry, rotation on re-invite, and no persistent candidate history."
        }
      ],
      stack: ["React 19", "NestJS 11", "Prisma 7", "MariaDB", "Direct WebRTC", "OpenAI Realtime", "GPT-4o", "Docker Compose", "AWS EC2", "AES-256-GCM"]
    },
    {
      id: "chekki",
      context: "Independent · Chekki AI",
      status: "Live · pilot",
      image: "/video/chekki-loop-poster.webp",
      video: "/video/chekki-loop.mp4",
      proof: "98–100% of mistakes caught in grading evals on 105 synthetic pages",
      title: "Closed-loop homework grading for Korean ESL academies",
      problem: "Three problems that are usually treated separately: parents who cannot check English homework with their child, mistakes at home that never reach the next lesson, and teachers writing bilingual parent updates by hand. Chekki closes that loop with one camera scan graded against the teacher's own answer key.",
      owned: [
        "Founding product decisions across three user types: parent, foreign teacher, academy director",
        "Grading anchored to teacher-verified answer keys rather than the model's own reading of the page",
        "Bilingual explanation layer: Korean honorifics, pronunciation and phonics guidance for parents",
        "Mobile build via Capacitor, Firestore data model with atomic transactions, serverless API routes",
        "Parent app redesigned for a tired parent with a child beside them: praise first, then one mistake at a time",
        "Worksheet images discarded after grading, analysis deleted after 30 days, aligned with COPPA and GDPR"
      ],
      decisions: [
        {
          choice: "Ground grading in the teacher's answer key, not in the model alone",
          why: "Free OCR grading was confidently wrong often enough to lose a parent's trust in one session.",
          tradeoff: "Tradeoff: a teacher has to pre-seed the curriculum before a class can be graded."
        },
        {
          choice: "Tiered models: Gemini Flash by default, Gemini Pro with reasoning for Pro-plan deep checks",
          why: "It keeps the free tier viable and reserves cost for the users paying for it.",
          tradeoff: "Tradeoff: two prompt paths to maintain and evaluate instead of one."
        },
        {
          choice: "Discard worksheet images immediately after evaluation",
          why: "Children's work is the most sensitive data in the product; not storing it removes the whole class of risk.",
          tradeoff: "Tradeoff: no history view, and no ability to re-run an old scan."
        }
      ],
      stack: ["React 19", "Capacitor 8", "Gemini 3.8 Flash", "Cloud Firestore", "Vercel Functions", "Upstash Redis", "RevenueCat"],
      liveUrl: "https://chekki-ai.vercel.app/",
      stores: [
        { label: "App Store ↗", href: "https://apps.apple.com/us/app/chekkiai/id6759361725" },
        { label: "Google Play ↗", href: "https://play.google.com/store/apps/details?id=com.chekkiai.app&hl=en&pli=1" }
      ]
    },
    {
      id: "seoul-commute",
      context: "Side project · Open source",
      status: "Live",
      image: "/video/seoul-commute-loop-poster.webp",
      video: "/video/seoul-commute-loop.mp4",
      proof: "Grounded answers 22/30 → 28/30 on the eval set, by changing tools, not the model",
      title: "MCP server that grounds an AI assistant's commute answers in live Seoul data",
      problem: "Asked how many stops it is from Hongdae to Gangnam, an assistant answers from memory: 19, when the real answer is 17. This server gives Claude live Seoul weather, fine dust, subway arrivals and routes from Korean public data, and an eval set checks that every stop count, minute and fare in the answer came from a tool.",
      owned: [
        "6 MCP tools over 4 Korean public APIs (KMA, AirKorea, Seoul Metro route, Seoul realtime subway), with station and district names in Korean or English",
        "One server, two transports: stdio for Claude Desktop, and Streamable HTTP on Cloud Run in Seoul as a Claude.ai connector behind an access token",
        "A 33-case eval set with an automatic grader: expected tool calls, injected HTTP 503 outages, and a grounding check that fails any stop count, minute or won figure not found in a tool result",
        "Product changes driven by the eval failures: a route tool instead of a 'don't guess' rule, and rules moved from server instructions into tool descriptions and error text",
        "Weekday Telegram commute briefings at 07:45 and 18:00, run by a Cloud Run job and Cloud Scheduler",
        "149 offline tests on recorded API fixtures; keys in Secret Manager, redacted tool errors, repo secret-scanned before going public"
      ],
      decisions: [
        {
          choice: "Measure grounding with an eval set instead of trusting prompt rules",
          why: "A stricter instruction alone didn't stop the model giving stop counts and journey times from memory. A grader that matches every number against the tool results gives a score that moves after each change.",
          tradeoff: "Tradeoff: the grader only checks stops, minutes and won; other ungrounded claims still need a human read."
        },
        {
          choice: "Cloud Run in the Seoul region, after probing the APIs from there first",
          why: "Korean government APIs may refuse overseas traffic. A probe job in asia-northeast3 confirmed all four answer before any deploy work, and scale-to-zero keeps hosting close to free.",
          tradeoff: "Tradeoff: a shared access token instead of OAuth, rotated by hand."
        },
        {
          choice: "Rule-based briefing writer by default, LLM writer behind a flag",
          why: "The briefing goes out at 07:45 whether or not the model is overloaded, and rules can't reassure about data that wasn't checked.",
          tradeoff: "Tradeoff: plainer, less adaptive messages."
        }
      ],
      stack: ["Python", "MCP Python SDK", "Google Cloud Run", "Cloud Scheduler", "Secret Manager", "Telegram Bot API", "pytest"],
      stores: [
        { label: "GitHub ↗", href: "https://github.com/Jay02510/seoul-commute-mcp" }
      ]
    }
  ],
  ko: [
    {
      id: "vodabi",
      context: "업무 프로젝트 · VODABI",
      status: "구축 완료, 도입 진행",
      image: "/screenshots/vodabi/architecture.svg",
      title: "음성 AI 세일즈 훈련 및 평가 플랫폼",
      problem: "영업팀에는 통화를 일관되게 연습하고 평가할 방법이 필요합니다. 이 플랫폼은 실제 같은 AI 롤플레이 통화를 루브릭으로 채점하고, 매니저에게 팀 진행 상황을 보여줍니다.",
      owned: [
        "지원자·직원 플로우: 매직링크 테스트, 자율 연습, 필수훈련 배정, 통화 후 리포트",
        "실시간 음성 파이프라인: 브라우저-모델 Direct WebRTC, 임시 토큰, Push-to-Talk 및 서버 VAD",
        "통화 후 평가 서비스: 2단계 채점(채점 후 설명), 통화에서 인용한 영업 자격 검증 근거, 발화 속도 텔레메트리",
        "커스텀 RolesGuard 기반 멀티테넌트 백오피스 및 VOISOR 코칭 어시스턴트",
        "직원 성장·매니저 대시보드: 시나리오별 점수, 역량 성장, 배지, 팀 완료율",
        "Sentry 에러 리포팅과 AWS EC2 배포"
      ],
      decisions: [
        {
          choice: "서버 릴레이 대신 Direct WebRTC 선택",
          why: "서버를 오디오 경로에서 빼면 매 턴이 실제 통화처럼 느껴집니다.",
          tradeoff: "트레이드오프: 임시 토큰 발급과 클라이언트 세션 처리를 직접 구축하고 보호해야 합니다."
        },
        {
          choice: "먼저 채점하고, 확정된 점수로 피드백 작성",
          why: "확정된 점수로 피드백을 쓰면 코칭이 점수와 일치합니다.",
          tradeoff: "트레이드오프: 순차 호출 두 번으로 리포트 표시까지 몇 초가 더 걸립니다."
        },
        {
          choice: "지원자 계정 대신 무상태 매직링크",
          why: "지원자는 가입 없이 링크에서 바로 채점 통화를 시작합니다.",
          tradeoff: "트레이드오프: 링크 만료와 재초대 시 로테이션 관리가 필요하고, 지원자 이력은 남지 않습니다."
        }
      ],
      stack: ["React 19", "NestJS 11", "Prisma 7", "MariaDB", "Direct WebRTC", "OpenAI Realtime", "GPT-4o", "Docker Compose", "AWS EC2", "AES-256-GCM"]
    },
    {
      id: "chekki",
      context: "독립 개발 · Chekki AI",
      status: "라이브 · 파일럿",
      image: "/video/chekki-loop-poster.webp",
      video: "/video/chekki-loop.mp4",
      proof: "채점 평가에서 오답 98–100% 검출 (합성 페이지 105장)",
      title: "한국 영어학원을 위한 가정-교실 폐쇄 루프 숙제 채점",
      problem: "보통 따로 다뤄지는 세 가지 문제: 영어 숙제를 아이와 함께 확인하기 어려운 학부모, 다음 수업까지 전달되지 않는 가정 내 오답, 그리고 이중언어 알림장을 손으로 쓰는 교사. Chekki는 교사의 정답지를 기준으로 한 번의 카메라 스캔으로 이 루프를 닫습니다.",
      owned: [
        "학부모·원어민 교사·원장 세 사용자군을 아우르는 창업 단계 제품 판단",
        "모델의 자체 판독이 아니라 교사가 검증한 정답지를 기준으로 하는 채점 구조",
        "이중언어 해설 레이어: 한국어 존댓말, 발음 및 파닉스 가이드",
        "Capacitor 모바일 빌드, 원자적 트랜잭션 기반 Firestore 데이터 모델, 서버리스 API",
        "아이 옆에서 지친 학부모가 보는 화면으로 재설계: 칭찬 먼저, 오답은 하나씩",
        "숙제 이미지는 채점 후 폐기, 분석 결과는 30일 후 삭제, COPPA·GDPR 대응"
      ],
      decisions: [
        {
          choice: "모델 단독 판독 대신 교사 정답지 기준 채점",
          why: "자유 OCR 채점은 자신 있게 틀리는 경우가 있어, 한 번으로 학부모 신뢰를 잃습니다.",
          tradeoff: "트레이드오프: 채점 전에 교사가 커리큘럼을 사전 등록해야 합니다."
        },
        {
          choice: "모델 계층 분리: 기본은 Gemini Flash, Pro 요금제의 정밀 검사는 추론 기능을 켠 Gemini Pro",
          why: "무료 등급을 유지하면서 비용은 유료 사용자에게만 씁니다.",
          tradeoff: "트레이드오프: 프롬프트 경로가 둘로 늘어나 유지·평가 부담이 커집니다."
        },
        {
          choice: "평가 직후 숙제 이미지 즉시 폐기",
          why: "아동의 학습물은 제품에서 가장 민감한 데이터이며, 저장하지 않으면 위험 자체가 사라집니다.",
          tradeoff: "트레이드오프: 이력 조회가 없고 과거 스캔을 다시 실행할 수 없습니다."
        }
      ],
      stack: ["React 19", "Capacitor 8", "Gemini 3.8 Flash", "Cloud Firestore", "Vercel Functions", "Upstash Redis", "RevenueCat"],
      liveUrl: "https://chekki-ai.vercel.app/",
      stores: [
        { label: "App Store ↗", href: "https://apps.apple.com/us/app/chekkiai/id6759361725" },
        { label: "Google Play ↗", href: "https://play.google.com/store/apps/details?id=com.chekkiai.app&hl=en&pli=1" }
      ]
    },
    {
      id: "seoul-commute",
      context: "사이드 프로젝트 · 오픈 소스",
      status: "운영 중",
      image: "/video/seoul-commute-loop-poster.webp",
      video: "/video/seoul-commute-loop.mp4",
      proof: "모델은 그대로, 도구만 바꿔 평가 세트의 근거 기반 답변 22/30 → 28/30",
      title: "AI 어시스턴트의 출퇴근 답변을 서울 실시간 데이터에 근거하게 만드는 MCP 서버",
      problem: "홍대입구에서 강남까지 몇 정거장이냐고 물으면 어시스턴트는 기억에 의존해 19개라고 답합니다. 실제로는 17개입니다. 이 서버는 한국 공공데이터로 서울의 실시간 날씨, 미세먼지, 지하철 도착 정보와 경로를 Claude에 제공하고, 평가 세트로 답변 속 정거장 수, 소요 시간, 요금이 모두 도구에서 왔는지 검사합니다.",
      owned: [
        "한국 공공 API 4종(기상청, 에어코리아, 서울교통공사 경로, 서울 실시간 지하철) 위의 MCP 도구 6개, 역·자치구 이름은 한국어와 영어 모두 지원",
        "하나의 서버, 두 가지 전송 방식: Claude Desktop용 stdio, 그리고 액세스 토큰으로 보호되는 서울 리전 Cloud Run의 Streamable HTTP(Claude.ai 커넥터)",
        "자동 채점기를 갖춘 33문항 평가 세트: 기대 도구 호출, HTTP 503 장애 주입, 도구 결과에 없는 정거장 수·분·원 수치를 실패로 처리하는 근거 검사",
        "평가 실패를 근거로 한 제품 변경: '추측하지 말라'는 규칙 대신 경로 도구 추가, 규칙을 서버 지침에서 도구 설명과 오류 문구로 이동",
        "Cloud Run 잡과 Cloud Scheduler로 평일 07:45, 18:00 텔레그램 출퇴근 브리핑 발송",
        "녹화된 API 응답으로 오프라인 실행하는 테스트 149개, Secret Manager 키 관리, 오류 문구 마스킹, 공개 전 저장소 시크릿 스캔"
      ],
      decisions: [
        {
          choice: "프롬프트 규칙을 믿는 대신 평가 세트로 근거 여부를 측정",
          why: "지침을 강화하는 것만으로는 모델이 기억으로 정거장 수와 소요 시간을 말하는 것을 막지 못했습니다. 답변 속 모든 수치를 도구 결과와 대조하는 채점기가 있어야 변경마다 점수가 움직이는 것을 볼 수 있습니다.",
          tradeoff: "트레이드오프: 채점기는 정거장, 분, 원만 검사하므로 그 밖의 근거 없는 주장은 사람이 읽어야 합니다."
        },
        {
          choice: "API를 먼저 현지에서 점검한 뒤 서울 리전 Cloud Run에 배포",
          why: "한국 정부 API는 해외 트래픽을 거부할 수 있습니다. asia-northeast3의 점검 잡으로 네 API가 모두 응답하는 것을 배포 전에 확인했고, 0까지 축소되어 호스팅 비용이 거의 들지 않습니다.",
          tradeoff: "트레이드오프: OAuth 대신 공유 액세스 토큰을 쓰며, 교체는 수동입니다."
        },
        {
          choice: "브리핑은 기본적으로 규칙 기반 작성기, LLM 작성기는 옵션",
          why: "브리핑은 모델이 과부하여도 07:45에 나가야 하고, 규칙은 확인하지 않은 데이터를 두고 안심시키는 말을 하지 않습니다.",
          tradeoff: "트레이드오프: 메시지가 더 단조롭고 덜 유연합니다."
        }
      ],
      stack: ["Python", "MCP Python SDK", "Google Cloud Run", "Cloud Scheduler", "Secret Manager", "Telegram Bot API", "pytest"],
      stores: [
        { label: "GitHub ↗", href: "https://github.com/Jay02510/seoul-commute-mcp" }
      ]
    }
  ]
};

const SHIPPED_PROJECTS: Record<'en' | 'ko', ShippedProject[]> = {
  en: [
    {
      id: "chekki-teacher",
      domains: ["ops"],
      title: "Chekki Schools",
      status: "Final testing",
      desc: "Role-scoped CRM behind Chekki AI: separate logins for directors, foreign teachers and Korean teachers, voice-first class logs, and bilingual parent reports a Korean teacher reviews before families receive them.",
      outcome: "4,678-line teacher page split into role-scoped hooks with no regressions",
      stack: ["React 19", "Gemini 3.8 Flash", "Cloud Firestore", "Vercel Functions"],
      liveUrl: "https://www.chekkiai.com/schools",
      caseStudyId: "chekki-teacher"
    },
    {
      id: "hagwon-readiness",
      domains: ["ops"],
      title: "Hagwon AI Readiness Index",
      status: "Live · Lead Gen",
      desc: "Bilingual 7-pillar self-assessment quiz that scores a hagwon's AI readiness, emails a personalized report, and feeds Chekki's sales funnel — plus a Basic-Auth admin dashboard and GA4 attribution to see which channel actually converts.",
      outcome: "Automated lead capture + report delivery, zero manual follow-up needed to see a score",
      stack: ["Next.js 14", "TypeScript", "Firebase Admin / Firestore", "Resend", "GA4", "Vercel Middleware"],
      liveUrl: "https://ai-readiness.chekkiai.com",
      caseStudyId: "hagwon-readiness"
    },
    {
      id: "bridgerecruit",
      domains: ["ops", "automation"],
      title: "BridgeRecruit",
      status: "Solo Build · Live Demo",
      desc: "Inbox-native CRM for international school admissions: Outlook add-in reads emails and logs touchpoints in one click, paired with a Next.js territory & pipeline dashboard.",
      outcome: "1-click touchpoint logging, 2 OAuth flows, 19 scoped API routes",
      stack: ["Next.js", "Supabase / Postgres", "Microsoft Graph OBO", "Office.js", "OpenAI"],
      liveUrl: "https://bridgerecruit-demo.vercel.app/",
      contactUrl: "mailto:jsn.benjamin@gmail.com?subject=BridgeRecruit%20Access%20Request",
      caseStudyId: "bridgerecruit"
    },
    {
      id: "crm", minor: true,
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
      id: "chekki-teacher",
      domains: ["ops"],
      title: "Chekki Schools",
      status: "최종 테스트 중",
      desc: "Chekki AI 뒤에서 학원이 쓰는 역할별 CRM: 원장·원어민 교사·한국인 교사의 로그인 분리, 음성 우선 수업 기록, 한국인 교사가 검토한 뒤 가정에 전달되는 이중언어 학부모 리포트.",
      outcome: "4,678줄 교사 페이지를 역할별 훅으로 회귀 없이 분리",
      stack: ["React 19", "Gemini 3.8 Flash", "Cloud Firestore", "Vercel Functions"],
      liveUrl: "https://www.chekkiai.com/schools",
      caseStudyId: "chekki-teacher"
    },
    {
      id: "hagwon-readiness",
      domains: ["ops"],
      title: "학원 AI 준비도 지표",
      status: "라이브 · 리드 확보",
      desc: "학원의 AI 준비도를 7개 영역으로 진단하는 이중언어(한/영) 자가진단 퀴즈. 결과 리포트를 이메일로 발송하며 Chekki 세일즈 퍼널로 리드를 연결하고, Basic Auth 관리자 대시보드와 GA4 유입 추적으로 어떤 채널이 실제로 전환되는지 보여줍니다.",
      outcome: "리드 수집과 리포트 발송 자동화, 점수 확인까지 수동 후속 조치 불필요",
      stack: ["Next.js 14", "TypeScript", "Firebase Admin / Firestore", "Resend", "GA4", "Vercel Middleware"],
      liveUrl: "https://ai-readiness.chekkiai.com",
      caseStudyId: "hagwon-readiness"
    },
    {
      id: "bridgerecruit",
      domains: ["ops", "automation"],
      title: "BridgeRecruit",
      status: "단독 구축 · 라이브 데모",
      desc: "국제학교 입학 담당자를 위한 아웃룩 인박스 네이티브 CRM: 이메일 발신 도메인 매칭과 원클릭 접점 기록 애드인, Next.js 지역 관리·파이프라인 대시보드.",
      outcome: "원클릭 접점 기록, 2개 OAuth 플로우, 19개 스코프 API 라우트",
      stack: ["Next.js", "Supabase / Postgres", "Microsoft Graph OBO", "Office.js", "OpenAI"],
      liveUrl: "https://bridgerecruit-demo.vercel.app/",
      contactUrl: "mailto:jsn.benjamin@gmail.com?subject=BridgeRecruit%20Access%20Request",
      caseStudyId: "bridgerecruit"
    },
    {
      id: "crm", minor: true,
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

const LOG: LogEntry[] = [
  {
    date: "2026-11-17",
    type: "feature",
    titleEn: "Seoul Commute MCP: live transit and weather tools for AI assistants",
    titleKo: "Seoul Commute MCP: AI 어시스턴트를 위한 실시간 교통·날씨 도구",
    descEn: "An MCP server with 6 tools on Korean public data, live as a Claude.ai connector on Cloud Run in Seoul, with Telegram commute briefings at 07:45 and 18:00 on weekdays. A 33-question eval set with a grounding check raised grounded answers from 22/30 to 28/30 by changing tools and tool descriptions.",
    descKo: "한국 공공데이터 기반 도구 6개를 갖춘 MCP 서버로, 서울 리전 Cloud Run에서 Claude.ai 커넥터로 운영하며 평일 07:45와 18:00에 텔레그램 출퇴근 브리핑을 보냅니다. 근거 검사가 포함된 33문항 평가 세트로, 도구와 도구 설명만 바꿔 근거 기반 답변을 22/30에서 28/30으로 올렸습니다."
  },
  {
    date: "2026-11-08",
    type: "feature",
    titleEn: "Chekki Schools: director onboarding",
    titleKo: "Chekki Schools: 원장 온보딩",
    descEn: "New directors get a setup to-do list, classes get a join link, and owners who also teach can run their own class. Solo-plan rough edges were fixed and staff screens now show what needs attention first.",
    descKo: "새 원장에게 설정 할 일 목록을 보여주고, 반마다 참여 링크를 만들며, 직접 가르치는 원장도 자기 반을 운영할 수 있습니다. 1인 요금제의 거친 부분을 고치고, 교직원 화면은 먼저 처리할 일을 위에 보여줍니다."
  },
  {
    date: "2026-11-05",
    type: "feature",
    titleEn: "VODATalk: calls on phones, ready for the pilot",
    titleKo: "VODATalk: 휴대폰 통화와 파일럿 준비",
    descEn: "Campaign links can now run on phones, behind an admin switch per company and per link, with phone layouts for registration, countdown, call and report. Calls now survive mic loss, silent calls and two starts at once; candidates give consent first, and a full campaign shows a closed message. The product was renamed VODATalk with a new logo.",
    descKo: "회사와 링크별 관리자 스위치로 캠페인 링크를 휴대폰에서도 열 수 있게 하고, 등록·카운트다운·통화·리포트 화면을 휴대폰에 맞췄습니다. 마이크 끊김, 무음 통화, 동시 시작에도 통화가 유지되며, 지원자는 먼저 동의하고, 정원이 찬 캠페인은 마감 안내를 보여줍니다. 제품명을 VODATalk로 바꾸고 새 로고를 적용했습니다."
  },
  {
    date: "2026-10-14",
    type: "feature",
    titleEn: "Hagwon AI Readiness Index: server-side reports and Chekki's new design",
    titleKo: "학원 AI 준비도 지표: 서버 측 리포트 생성과 Chekki 새 디자인 적용",
    descEn: "An audit found the submit API emailed and published whatever report text a request sent. The server now rebuilds the report from the raw answers. Admin stats group on stable ids instead of localized names, and the quiz moved to Chekki's warm design system with labeled form fields and light-mode contrast fixes.",
    descKo: "감사 결과 제출 API가 요청에 담긴 리포트 문구를 그대로 이메일로 보내고 게시하고 있었습니다. 이제 서버가 원본 답변으로 리포트를 다시 만듭니다. 관리자 통계는 언어별 이름 대신 고정 ID로 묶고, 퀴즈는 Chekki의 따뜻한 디자인 시스템으로 옮기며 입력란 라벨과 라이트 모드 대비를 개선했습니다."
  },
  {
    date: "2026-10-12",
    type: "feature",
    titleEn: "VODATalk: AI stays in role on noisy calls",
    titleKo: "VODATalk: 소음이 있어도 역할을 유지하는 AI",
    descEn: "The AI customer now waits for a real greeting before replying, so a cough or background sound at the start of a call no longer pulls it out of role. On outbound calls it picks up first, like a real customer.",
    descKo: "AI 고객이 실제 인사말을 들은 뒤에 응답하도록 바꿔, 통화 시작 시 기침이나 주변 소리로 역할에서 벗어나지 않습니다. 아웃바운드 통화에서는 실제 고객처럼 AI가 먼저 전화를 받습니다."
  },
  {
    date: "2026-10-07",
    type: "feature",
    titleEn: "VODATalk: staff training and manager dashboards",
    titleKo: "VODATalk: 직원 훈련 및 매니저 대시보드",
    descEn: "Built the staff side (assigned required training, scores by scenario, competency growth, badges) and the manager company dashboard with team completion rates, implemented from the designer's Figma.",
    descKo: "직원 화면(필수훈련 배정, 시나리오별 점수, 역량 성장, 배지)과 팀 완료율을 보여주는 매니저 회사 현황 대시보드를 디자이너의 Figma대로 구현했습니다."
  },
  {
    date: "2026-10-01",
    type: "infra",
    titleEn: "VODATalk: Sentry and a lighter first load",
    titleKo: "VODATalk: Sentry 도입 및 첫 로딩 경량화",
    descEn: "Added Sentry error reporting to backend and frontend, lazy-loaded each app area so the first download dropped from 716KB to 260KB, and patched dependency advisories.",
    descKo: "백엔드와 프론트엔드에 Sentry 에러 리포팅을 붙이고, 앱 영역별 지연 로딩으로 첫 다운로드를 716KB에서 260KB로 줄였으며, 의존성 보안 권고를 패치했습니다."
  },
  {
    date: "2026-09-18",
    type: "feature",
    titleEn: "VODATalk: two-step grading",
    titleKo: "VODATalk: 2단계 채점",
    descEn: "Grading now runs as a scoring call and a feedback call written from the fixed scores, both with strict JSON schemas.",
    descKo: "채점을 점수 호출과, 확정된 점수로 피드백을 쓰는 호출로 나누고 두 호출 모두 엄격한 JSON 스키마를 적용했습니다."
  },
  {
    date: "2026-10-07",
    type: "security",
    titleEn: "Chekki Schools: third security pass before the pilot",
    titleKo: "Chekki Schools: 파일럿 전 세 번째 보안 점검",
    descEn: "Closed paths that let a self-signup set its own role or school, or let a parent become director of their child's academy. Invites are now director-only, removed teachers lose their sessions, and Firestore rules tests run on the emulator in CI. Also removed landing-page claims the product couldn't back up.",
    descKo: "자가 가입으로 역할이나 학교를 직접 지정하거나, 학부모가 자녀 학원의 원장이 될 수 있던 경로를 막았습니다. 초대는 원장만 다루고, 제외된 교사는 세션이 해제되며, Firestore 규칙 테스트를 에뮬레이터로 CI에서 실행합니다. 랜딩 페이지에서 제품이 뒷받침하지 못하는 문구도 삭제했습니다."
  },
  {
    date: "2026-10-03",
    type: "feature",
    titleEn: "Chekki Schools: voice-first class log and class-level review",
    titleKo: "Chekki Schools: 음성 우선 수업 기록과 반 단위 검토",
    descEn: "One recording now fills the class log and student notes. The Korean teacher reviews a whole class-day on one screen, and each family gets the class summary plus only their child's note. Report prompts were rewritten after native Korean readers said the drafts sounded machine-written.",
    descKo: "녹음 한 번으로 수업 기록과 학생 메모를 채웁니다. 한국인 교사는 한 반의 하루를 한 화면에서 검토하고, 각 가정은 반 요약과 자기 아이의 메모만 받습니다. 한국어 원어민 독자가 초안이 기계가 쓴 글 같다고 지적한 뒤 리포트 프롬프트를 다시 썼습니다."
  },
  {
    date: "2026-09-19",
    type: "feature",
    titleEn: "B2B lead-enrichment CRM: compliant bilingual outreach drafting shipped",
    titleKo: "B2B 리드 인리치먼트 CRM: 규정 준수 이중언어 아웃리치 초안 작성 배포",
    descEn: "Ported an external cold-outbound copywriting skill's rules directly into the in-app Gemini prompt (required personalization_hook, dual A/B subject lines), closing a manual CSV-export detour, and added a deterministic server-side function that appends Korea's legally required (광고) prefix and opt-out so compliance can't drift with a prompt edit.",
    descKo: "외부 콜드 아웃바운드 카피라이팅 스킬의 규칙(필수 personalization_hook, A/B 제목 2종)을 인앱 Gemini 프롬프트에 직접 이식해 수동 CSV 내보내기 과정을 없앴고, 한국 정보통신망법상 필수인 (광고) 접두사와 수신거부 문구를 붙이는 결정론적 서버 함수를 추가해 프롬프트 변경에도 규정 준수가 흔들리지 않도록 했습니다."
  },
  {
    date: "2026-09-09",
    type: "feature",
    titleEn: "Hagwon AI Readiness Index: bilingual lead-gen quiz shipped",
    titleKo: "학원 AI 준비도 지표: 이중언어 리드 확보 퀴즈 배포",
    descEn: "Shipped a live 7-pillar bilingual self-assessment feeding Chekki's B2B sales funnel: weighted scoring engine, automated bilingual report emails via Resend, Firestore-backed permalinks, GA4 lead attribution, and a Basic-Auth admin dashboard.",
    descKo: "Chekki의 B2B 세일즈 퍼널로 연결되는 7영역 이중언어 자가진단을 라이브로 배포했습니다. 가중치 채점 엔진, Resend를 통한 자동 이중언어 리포트 이메일, Firestore 기반 영구 링크, GA4 리드 유입 추적, Basic Auth 관리자 대시보드로 구성됩니다."
  },
  {
    date: "2026-09-07",
    type: "feature",
    titleEn: "Chekki Schools given its own flagship section",
    titleKo: "Chekki Schools 별도 플래그십 섹션 신설",
    descEn: "Split the staff-facing Chekki Schools product out of the Chekki AI side-project grid into its own featured card and case study, with a dedicated screenshot gallery and mascot-logo hero.",
    descKo: "교직원용 Chekki Schools 제품을 Chekki AI 사이드 프로젝트 목록에서 분리해 별도의 플래그십 카드와 케이스 스터디로 신설하고, 전용 스크린샷 갤러리와 마스코트 로고 히어로 이미지를 적용했습니다."
  },
  {
    date: "2026-09-06",
    type: "feature",
    titleEn: "BridgeRecruit: inbox-native admissions CRM shipped",
    titleKo: "BridgeRecruit: 인박스 네이티브 입학처 CRM 배포",
    descEn: "Shipped a solo-built CRM for international school admissions: an Outlook add-in that logs email touchpoints in one click, backed by a Next.js territory & pipeline dashboard, 2 OAuth flows, and 19 scoped API routes.",
    descKo: "국제학교 입학 담당자를 위한 아웃룩 인박스 네이티브 CRM을 단독 구축해 배포했습니다. 원클릭 접점 기록 애드인, Next.js 지역 관리·파이프라인 대시보드, 2개 OAuth 플로우, 19개 스코프 API 라우트로 구성됩니다."
  },
  {
    date: "2026-09-01",
    type: "feature",
    titleEn: "VODATalk: voice-AI screening and rubric evaluator shipped",
    titleKo: "VODATalk: 음성 AI 스크리닝 및 루브릭 평가 엔진 배포",
    descEn: "Direct WebRTC voice roleplay, post-call GPT-4o evaluation with quoted evidence from the transcript, the VOISOR coaching assistant, and multi-tenant role-based access.",
    descKo: "Direct WebRTC 음성 롤플레이, 통화 내용을 근거로 인용하는 통화 후 GPT-4o 평가, VOISOR 코칭 어시스턴트, 멀티테넌트 역할 기반 접근."
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
    titleEn: "Worksheet images discarded after grading",
    titleKo: "채점 후 숙제 이미지 폐기",
    descEn: "Gateway-level pipeline that discards worksheet images the moment evaluation finishes, so no image of a child's work is stored.",
    descKo: "평가가 끝나는 즉시 숙제 이미지를 폐기하는 게이트웨이 파이프라인으로, 아이의 숙제 이미지를 저장하지 않습니다."
  }
];

type Locale = 'en' | 'ko';

export const CASE_IDS = ['vodabi', 'chekki', 'seoul-commute', 'chekki-teacher', 'hagwon-readiness', 'bridgerecruit', 'lead-enrichment'];

// URL scheme: /, /ko, /case/<id>, /ko/case/<id>. Each one is pre-rendered at build time.
export function parsePath(path: string): { locale: Locale; caseId: string | null } {
  const locale: Locale = /^\/ko(\/|$)/.test(path) ? 'ko' : 'en';
  const m = path.replace(/^\/ko/, '').match(/^\/case\/([\w-]+)\/?$/);
  return { locale, caseId: m && CASE_IDS.includes(m[1]) ? m[1] : null };
}

export const pathFor = (locale: Locale, caseId: string | null) =>
  `${locale === 'ko' ? '/ko' : ''}${caseId ? `/case/${caseId}` : ''}` || '/';

export default function App({ initialPath }: { initialPath?: string }) {
  const [initialRoute] = useState(() => parsePath(initialPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/')));
  const [locale, setLocale] = useState<Locale>(initialRoute.locale);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isLogExpanded, setIsLogExpanded] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string | null>(initialRoute.caseId);
  const [expandedFeaturedId, setExpandedFeaturedId] = useState<string | null>(null);

  // Keep the CSS custom-property theme (index.html body.light rules) in sync with React state
  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light');
  }, [theme]);

  // Keep the document language in sync so screen readers and :lang(ko) CSS rules work correctly
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // If you're reading this, you're exactly who this section is for.
  useEffect(() => {
    console.log(
      '%cOkay, you opened devtools.',
      'font-weight: bold; font-size: 14px; color: #e2b87d;'
    );
    console.log(
      "%cI'm the one who wrote every line here, including the parts that aren't as clean as this one. If you want to talk about how any of it actually works: jsn.benjamin@gmail.com",
      'font-size: 12px; color: #a3acb9;'
    );
  }, []);

  // Back/forward between pages, plus old #<case-id> links from before path URLs existed
  useEffect(() => {
    const legacy = window.location.hash.replace('#', '');
    if (CASE_IDS.includes(legacy)) {
      history.replaceState(null, '', pathFor(parsePath(window.location.pathname).locale, legacy));
      setActiveCaseStudyId(legacy);
    }
    const onPop = () => {
      const r = parsePath(window.location.pathname);
      setLocale(r.locale);
      setActiveCaseStudyId(r.caseId);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const [animateCase, setAnimateCase] = useState(false);
  const openCaseStudy = useCallback((id: string) => {
    setAnimateCase(true);
    setActiveCaseStudyId(id);
    history.pushState(null, '', pathFor(locale, id));
    track('case_study_open', { id });
  }, [locale]);

  const switchLocale = () => {
    const next: Locale = locale === 'en' ? 'ko' : 'en';
    setLocale(next);
    history.replaceState(null, '', pathFor(next, activeCaseStudyId));
  };

  const L = COPY[locale];

  const displayedLog = useMemo(() => isLogExpanded ? LOG : LOG.slice(0, 3), [isLogExpanded]);

  const openResume = () => { setIsResumeOpen(true); track('resume_open'); };
  const closeResumeModal = useCallback(() => setIsResumeOpen(false), []);
  const closeCaseStudy = useCallback(() => {
    setActiveCaseStudyId(null);
    history.pushState(null, '', pathFor(locale, null));
  }, [locale]);

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
              onClick={switchLocale}
              className={`h-[34px] px-3 rounded-lg border text-xs font-semibold tracking-wider transition-[background-color,transform] active:scale-95 ${
                isDark ? 'border-white/15 text-white/80 hover:bg-white/5' : 'border-black/15 text-black/80 hover:bg-black/5'
              }`}
            >
              {L.localeSwitch}
            </button>
            <button
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className={`relative w-[34px] h-[34px] rounded-lg border flex items-center justify-center transition-colors before:absolute before:inset-[-5px] before:content-[''] ${
                isDark ? 'border-white/15 text-white/80 hover:bg-white/5' : 'border-black/15 text-black/80 hover:bg-black/5'
              }`}
            >
              {isDark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
            </button>
            <button
              onClick={openResume}
              className={`h-[34px] px-4 rounded-lg font-bold text-xs tracking-wider transition-[background-color,transform] active:scale-95 shadow-sm ${
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
        <section className="pt-16 md:pt-20 pb-14 grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-12 lg:gap-16 items-start">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.1rem] font-display font-semibold leading-[1.06] tracking-tight text-balance">
              {L.heroTitle}
            </h1>
            <p className={`mt-6 max-w-[62ch] text-base md:text-[17px] leading-relaxed font-normal text-pretty ${
              isDark ? 'text-[#a3acb9]' : 'text-[#4b5563]'
            }`}>
              {L.heroBody}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                onClick={scrollToSection('work')}
                className="h-[46px] px-6 rounded-xl bg-accent-gold text-[#14171d] text-[13px] font-bold tracking-wide inline-flex items-center hover:brightness-105 active:scale-95 transition-[filter,transform] duration-150 shadow-sm"
              >
                {L.ctaWork}
              </a>
              <button
                onClick={openResume}
                className={`h-[46px] px-6 rounded-xl border text-[13px] font-bold tracking-wide active:scale-95 transition-[background-color,border-color,color,transform] duration-150 ${
                  isDark ? 'border-white/20 text-white hover:bg-white/5' : 'border-black/20 text-black hover:bg-black/5'
                }`}
              >
                {L.ctaResume}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className={`rounded-2xl overflow-hidden border ${
              isDark ? 'border-white/10' : 'border-black/10'
            }`}>
              <img
                src="/images/jason-benjamin.webp"
                alt="Jason Benjamin"
                width={410}
                height={525}
                fetchPriority="high"
                className="w-full aspect-[4/5] object-cover object-top"
              />
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
              <div className={`mt-5 pt-4 border-t text-[11px] font-bold tracking-widest uppercase ${
                isDark ? 'border-white/10 text-[#848e9c]' : 'border-black/10 text-[#6b7280]'
              }`}>
                {L.nextLabel}
              </div>
              <p className={`mt-2 text-[13px] leading-relaxed ${isDark ? 'text-[#a3acb9]' : 'text-[#4b5563]'}`}>
                {L.nextBody}
              </p>
            </aside>
          </div>
        </section>

        {/* FACTS BAR */}
        <section className={`border-y py-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 ${
          isDark ? 'border-white/10' : 'border-black/10'
        }`}>
          {FACTS[locale].map((f, i) => (
            <div key={i} className="pr-4">
              <div className="font-display text-lg md:text-xl font-semibold tracking-tight text-accent-gold">
                {f.value}
              </div>
              <div className={`mt-1.5 text-xs md:text-[13px] leading-relaxed ${
                isDark ? 'text-[#a3acb9]' : 'text-[#4b5563]'
              }`}>
                {f.label}
              </div>
            </div>
          ))}
        </section>

        {/* SELECTED WORK SECTION */}
        <section id="work" className="pt-20 md:pt-24">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-2">
            <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-balance">
              {L.workTitle}
            </h2>
            <p className={`text-xs md:text-[13.5px] max-w-[46ch] ${
              isDark ? 'text-[#848e9c]' : 'text-[#6b7280]'
            }`}>
              {L.workNote}
            </p>
          </div>

          <div className="space-y-8 mt-6">
            {FEATURED_PROJECTS[locale].map((project) => (
              <article
                key={project.id}
                className={`border rounded-2xl overflow-hidden transition-[background-color,border-color] ${
                  isDark ? 'bg-[#1a1e26] border-white/10' : 'bg-white border-black/10 shadow-sm'
                }`}
              >
                <div className={`grid grid-cols-1 ${project.image ? 'lg:grid-cols-[0.9fr_1.1fr]' : 'grid-cols-1'}`}>
                  {project.image && (
                    <div className={`aspect-video lg:aspect-auto h-full overflow-hidden border-b lg:border-b-0 lg:border-r relative p-8 ${
                      isDark ? 'bg-[#101319] border-white/10' : 'bg-[#f2f1ec] border-black/10'
                    }`}>
                      {project.video ? (
                        <LoopVideo src={project.video} poster={project.image} label={project.title} />
                      ) : (
                        <img
                          src={project.image}
                          srcSet={project.image.endsWith('.webp') && project.image.includes('/screenshots/') ? `${project.image.replace('.webp', '-720.webp')} 720w, ${project.image} 1440w` : undefined}
                          sizes="(min-width: 1024px) 480px, calc(100vw - 112px)"
                          alt={project.title}
                          className="w-full h-full object-contain hover:scale-102 transition-transform duration-500"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>
                  )}

                  <div className="p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`text-[11px] font-bold tracking-widest uppercase ${
                          isDark ? 'text-[#848e9c]' : 'text-[#6b7280]'
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
                      {project.proof && (
                        <p className="mt-2 text-sm font-semibold text-accent-gold">{project.proof}</p>
                      )}

                      <p className={`mt-3 text-sm md:text-[14.5px] leading-relaxed ${
                        isDark ? 'text-[#a3acb9]' : 'text-[#4b5563]'
                      }`}>
                        {project.problem}
                      </p>

                      {/* DETAILS TOGGLE */}
                      <button
                        onClick={() => setExpandedFeaturedId(expandedFeaturedId === project.id ? null : project.id)}
                        aria-expanded={expandedFeaturedId === project.id}
                        className={`mt-6 pt-5 border-t w-full flex items-center justify-between gap-3 text-left ${
                          isDark ? 'border-white/10' : 'border-black/10'
                        }`}
                      >
                        <h4 className={`text-xs font-bold tracking-widest uppercase ${
                          isDark ? 'text-[#848e9c]' : 'text-[#6b7280]'
                        }`}>
                          {locale === 'en' ? "What I built & why" : "무엇을, 왜 만들었는지"}
                        </h4>
                        <ChevronDownIcon className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                          expandedFeaturedId === project.id ? 'rotate-180 text-accent-gold' : (isDark ? 'text-[#848e9c]' : 'text-[#6b7280]')
                        }`} />
                      </button>

                      {expandedFeaturedId === project.id && (
                        <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                          {/* WHAT I BUILT */}
                          <div className="mt-4">
                            <h4 className={`text-xs font-bold tracking-widest uppercase ${
                              isDark ? 'text-[#848e9c]' : 'text-[#6b7280]'
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
                              isDark ? 'text-[#848e9c]' : 'text-[#6b7280]'
                            }`}>
                              {L.decisionsLabel}
                            </h4>
                            <div className="mt-3 space-y-3.5">
                              {project.decisions.map((d, idx) => (
                                <div key={idx} className="text-xs md:text-[13px] leading-relaxed">
                                  <div className="font-semibold text-accent-gold">{d.choice}</div>
                                  <div className={`mt-0.5 ${isDark ? 'text-[#a3acb9]' : 'text-[#4b5563]'}`}>{d.why}</div>
                                  <div className={`mt-0.5 italic ${isDark ? 'text-[#848e9c]' : 'text-[#6b7280]'}`}>{d.tradeoff}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* STACK TAGS */}
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.stack.map((tech, idx) => (
                          <span
                            key={idx}
                            className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                              isDark ? 'border-white/10 text-[#a3acb9] bg-white/[0.02]' : 'border-black/10 text-[#4b5563] bg-black/[0.02]'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className={`mt-6 pt-5 border-t flex flex-wrap items-center gap-3 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                      <a
                        href={pathFor(locale, project.id)}
                        onClick={(e) => { e.preventDefault(); openCaseStudy(project.id); }}
                        className={`h-[40px] px-4 rounded-lg font-bold text-xs tracking-wider inline-flex items-center transition-[background-color,transform] active:scale-95 shadow-sm ${
                          isDark ? 'bg-white text-[#14171d] hover:bg-white/90' : 'bg-[#14171d] text-white hover:bg-black/90'
                        }`}
                      >
                        {locale === 'en' ? "Read the case study ↗" : "케이스 스터디 읽기 ↗"}
                      </a>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`h-[40px] px-4 rounded-lg border text-xs font-semibold tracking-wider inline-flex items-center gap-1.5 transition-[background-color,transform] active:scale-95 ${
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
                          className={`h-[40px] px-3.5 rounded-lg border text-xs font-semibold tracking-wider inline-flex items-center gap-1 transition-[background-color,color,transform] active:scale-95 ${
                            isDark ? 'border-white/10 text-[#a3acb9] hover:text-white hover:bg-white/5' : 'border-black/10 text-[#4b5563] hover:text-black hover:bg-black/5'
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

        {/* HOW I WORK SECTION */}
        <section className="pt-12 pb-4">
          <h2 className="text-2xl md:text-3xl font-display font-medium tracking-tight text-balance">
            {L.roleTitle}
          </h2>
          <div className={`mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t ${
            isDark ? 'border-white/10' : 'border-black/10'
          }`}>
            {ROLE_COLS[locale].map((col, i) => (
              <div key={i} className="space-y-2.5">
                <h3 className="text-sm md:text-[15px] font-bold tracking-wide text-accent-gold">
                  {col.head}
                </h3>
                <ul className="space-y-2 pt-1">
                  {col.items.map((item, j) => (
                    <li key={j} className={`text-xs md:text-[13.5px] leading-relaxed flex items-start gap-2.5 ${
                      isDark ? 'text-[#a3acb9]' : 'text-[#4b5563]'
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

        {/* ALSO SHIPPED SECTION */}
        <section id="more" className="pt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-medium tracking-tight text-balance">
                {L.moreTitle}
              </h2>
              <p className={`mt-1 text-xs md:text-[13.5px] max-w-[58ch] ${
                isDark ? 'text-[#848e9c]' : 'text-[#6b7280]'
              }`}>
                {L.moreNote}
              </p>
            </div>

          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHIPPED_PROJECTS[locale].map(p => (
              <CompactProjectCard
                key={p.id}
                project={p}
                theme={theme}
                locale={locale}
                caseLabel={L.caseLabel}
                caseHref={pathFor(locale, p.caseStudyId)}
                onOpenCaseStudy={openCaseStudy}
              />
            ))}
          </div>
        </section>

        {/* BUILD LOG SECTION */}
        <section id="log" className="pt-20">
          <div className="flex items-baseline justify-between gap-4 pb-2">
            <h2 className="text-2xl md:text-3xl font-display font-medium tracking-tight text-balance">
              {L.logTitle}
            </h2>
            <button
              onClick={() => setIsLogExpanded(!isLogExpanded)}
              className={`h-[34px] px-3.5 rounded-lg border text-xs font-bold tracking-wider transition-[background-color,transform] active:scale-95 ${
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
                <span className={`text-xs font-mono shrink-0 ${isDark ? 'text-[#848e9c]' : 'text-[#6b7280]'}`}>
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
                    isDark ? 'text-[#a3acb9]' : 'text-[#4b5563]'
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
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-medium tracking-tight leading-tight text-balance">
                {L.contactTitle}
              </h2>
              <p className={`mt-4 text-sm md:text-base leading-relaxed max-w-[52ch] ${
                isDark ? 'text-[#a3acb9]' : 'text-[#4b5563]'
              }`}>
                {L.contactBody}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:jsn.benjamin@gmail.com"
                  onClick={() => track('email_click')}
                  className="h-[46px] px-6 rounded-xl bg-accent-gold text-[#14171d] text-xs font-bold tracking-wider inline-flex items-center hover:brightness-105 active:scale-95 transition-[filter,transform] shadow-sm"
                >
                  {L.contactCta}
                </a>
                <a
                  href="https://www.linkedin.com/in/jason-benjamin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`h-[46px] px-6 rounded-xl border text-xs font-bold tracking-wider inline-flex items-center transition-[background-color,transform] active:scale-95 ${
                    isDark ? 'border-white/20 text-white hover:bg-white/5' : 'border-black/20 text-black hover:bg-black/5'
                  }`}
                >
                  {L.linkedinLabel}
                </a>
                <button
                  onClick={openResume}
                  className={`h-[46px] px-6 rounded-xl border text-xs font-bold tracking-wider transition-[background-color,transform] active:scale-95 ${
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
                  isDark ? 'text-[#848e9c]' : 'text-[#6b7280]'
                }`}>
                  {L.lookingLabel}
                </dt>
                <dd className="text-xs md:text-sm font-medium">
                  {L.lookingValue}
                </dd>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
                <dt className={`text-[11px] font-bold tracking-widest uppercase ${
                  isDark ? 'text-[#848e9c]' : 'text-[#6b7280]'
                }`}>
                  {L.basedLabel}
                </dt>
                <dd className="text-xs md:text-sm font-medium">
                  {L.basedValue}
                </dd>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
                <dt className={`text-[11px] font-bold tracking-widest uppercase ${
                  isDark ? 'text-[#848e9c]' : 'text-[#6b7280]'
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

      <FeedbackBox theme={theme} />

      {/* FOOTER */}
      <footer className={`border-t py-8 transition-colors ${
        isDark ? 'border-white/10 text-[#848e9c]' : 'border-black/10 text-[#6b7280]'
      }`}>
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium">
          <span>© Jason Benjamin</span>
          <span>{L.footerNote}</span>
        </div>
      </footer>

      {/* MODALS */}
      {isResumeOpen && (
        <Suspense fallback={null}>
          <ResumeModal
            isOpen={isResumeOpen}
            onClose={closeResumeModal}
            theme={theme}
            locale={locale}
          />
        </Suspense>
      )}

      {activeCaseStudyId && (
        <Suspense fallback={null}>
          <CaseStudyViewer
            projectId={activeCaseStudyId}
            onClose={closeCaseStudy}
            theme={theme}
            locale={locale}
            animateIn={animateCase}
            caseIds={CASE_IDS}
            onOpenCase={openCaseStudy}
          />
        </Suspense>
      )}
    </div>
  );
}

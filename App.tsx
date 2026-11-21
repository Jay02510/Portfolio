import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import FeedbackBox from './components/FeedbackBox.tsx';
import HeroCover, { type OrbitItem } from './components/HeroCover.tsx';
import ProjectModal from './components/ProjectModal.tsx';
import { SunIcon, MoonIcon } from './components/Icons.tsx';
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

export interface FeaturedProject {
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
    navLog: "Build log",
    navContact: "Contact",
    localeSwitch: "한국어",
    resumeBtn: "Résumé",
    heroTitle: "AI product engineer. From first interview to shipped product.",
    heroSub: "Voice AI, LLM evaluation and the apps around them, designed and built end to end.",
    nowChip: "Now · VODATalk at VODABI",
    orbitHint: "Drag or swipe to spin · click any project",
    orbitHintTouch: "Swipe to spin · tap a project",
    emailBtn: "Email me",
    ctaWork: "See the work",
    ctaResume: "Résumé",
    basedIn: "Open to AI PM & engineer roles · Seoul or remote",
    roleTitle: "How I work",
    workTitle: "Selected work",
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
    navLog: "빌드 로그",
    navContact: "연락",
    localeSwitch: "English",
    resumeBtn: "이력서",
    heroTitle: "AI 프로덕트 엔지니어. 첫 인터뷰부터 출시까지.",
    heroSub: "음성 AI, LLM 평가, 그리고 그 위의 앱까지 처음부터 끝까지 설계하고 만듭니다.",
    nowChip: "현재 · VODABI에서 VODATalk 개발",
    orbitHint: "드래그하거나 스와이프해서 돌리고, 프로젝트를 클릭하세요",
    orbitHintTouch: "스와이프해서 돌리고, 프로젝트를 탭하세요",
    emailBtn: "메일 보내기",
    ctaWork: "프로젝트 보기",
    ctaResume: "이력서",
    basedIn: "AI PM·엔지니어 포지션 찾는 중 · 서울 또는 원격",
    roleTitle: "일하는 방식",
    workTitle: "주요 프로젝트",
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
    { n: 10, suffix: "+", label: "years in Korean classrooms" },
    { n: 6, suffix: "", label: "AI products built solo" },
    { n: 26, suffix: "", label: "product decisions logged" }
  ],
  ko: [
    { n: 10, suffix: "+", label: "년 한국 교실 경력" },
    { n: 6, suffix: "", label: "개 AI 제품 단독 개발" },
    { n: 26, suffix: "", label: "건 제품 의사결정 기록" }
  ]
};

// Short names (per locale) and small thumbnails for the cover orbit, keyed by project id.
const FEATURED_IDS = ['vodabi', 'chekki'];

const ORBIT_META: Record<string, { en: string; ko: string; thumb: string; blurb: { en: string; ko: string } }> = {
  vodabi: { en: "VODATalk", ko: "보다톡", thumb: "/screenshots/vodabi/call-flow.svg", blurb: { en: "Voice-AI sales training and scoring", ko: "음성 AI 세일즈 훈련·평가" } },
  chekki: { en: "Chekki AI", ko: "채키 AI", thumb: "/orbit/chekki.webp", blurb: { en: "AI homework grading for English academies", ko: "영어학원 AI 숙제 채점" } },
  "seoul-commute": { en: "Seoul Commute MCP", ko: "서울 출퇴근 MCP", thumb: "/orbit/seoul-commute.webp", blurb: { en: "Live Seoul transit data for AI assistants", ko: "AI 비서용 서울 실시간 교통 데이터" } },
  "chekki-english-1": { en: "Chekki English 1", ko: "채키 영어 1", thumb: "/orbit/textbook.webp", blurb: { en: "Reading workbook for ages 4–7", ko: "만 4–7세 영어 읽기 워크북" } },
  "chekki-teacher": { en: "Chekki Schools", ko: "채키 스쿨즈", thumb: "/screenshots/chekki-schools/02-director-dashboard-720.webp", blurb: { en: "Academy CRM for directors and teachers", ko: "원장·강사용 학원 CRM" } },
  "hagwon-readiness": { en: "AI Readiness Index", ko: "학원 AI 준비도 지표", thumb: "/orbit/hagwon-readiness.webp", blurb: { en: "AI readiness quiz for academies", ko: "학원 AI 준비도 진단 퀴즈" } },
  bridgerecruit: { en: "BridgeRecruit", ko: "브릿지리크루트", thumb: "/screenshots/bridgerecruit/pipeline.svg", blurb: { en: "Admissions CRM inside Outlook", ko: "Outlook 안의 입학 상담 CRM" } },
  "lead-enrichment": { en: "Lead Enrichment CRM", ko: "B2B 리드 발굴 CRM", thumb: "/orbit/lead-enrichment.webp", blurb: { en: "Finds and qualifies B2B leads", ko: "B2B 리드 발굴·정리 도구" } }
};

// The workbook has its own product page, no case study.
const TEXTBOOK: Record<'en' | 'ko', FeaturedProject> = {
  en: {
    id: "chekki-english-1",
    context: "Independent · Chekki AI",
    status: "Live · on sale",
    title: "Chekki English 1: a first-sentences workbook for ages 4–7",
    proof: "Built on my 20-volume curriculum series, used by about 200 students",
    problem: "A 72-page workbook: children listen, read a short sentence and circle the matching picture. The pictures differ by one word, so a child has to read the whole sentence. Every page has QR audio and a Korean tip for parents.",
    owned: [],
    decisions: [],
    stack: ["Curriculum design", "385 QR audio tracks", "4 voices · 2 speeds", "3-question level check", "A4 PDF"],
    image: "/orbit/textbook.webp",
    liveUrl: "https://www.chekkiai.com/books/english-1"
  },
  ko: {
    id: "chekki-english-1",
    context: "독립 · Chekki AI",
    status: "출시 · 판매 중",
    title: "채키 영어 1: 만 4–7세 첫 문장 읽기 워크북",
    proof: "약 200명이 사용한 20권 교재 시리즈를 바탕으로 제작",
    problem: "짧은 영어 문장을 듣고, 읽고, 알맞은 그림에 동그라미 하는 72쪽 워크북. 그림이 한 단어만 달라 문장을 끝까지 읽어야 맞힐 수 있습니다. 모든 페이지에 QR 음원과 한국어 부모님 팁이 있습니다.",
    owned: [],
    decisions: [],
    stack: ["커리큘럼 설계", "QR 음원 385개", "목소리 4가지 · 속도 2단계", "3문항 수준 진단", "A4 PDF"],
    image: "/orbit/textbook.webp",
    liveUrl: "https://www.chekkiai.com/books/english-1"
  }
};

const ROLE_COLS = {
  en: [
    { head: "Product", line: "PRDs, LLM-judge evaluation and a 26-entry decision log." },
    { head: "Engineering", line: "Realtime voice, NestJS and React services, deployed on AWS." },
    { head: "Claim discipline", line: "Every number tagged measured, estimated or target. NDA details stay private." }
  ],
  ko: [
    { head: "프로덕트", line: "PRD, LLM 평가 설계, 26건의 의사결정 로그." },
    { head: "엔지니어링", line: "실시간 음성, NestJS·React 서비스, AWS 배포." },
    { head: "주장 원칙", line: "모든 수치는 측정·추정·목표로 구분합니다. NDA 정보는 공개하지 않습니다." }
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
        "Telegram commute briefings from a Cloud Run job, piloted on a weekday 07:45 and 18:00 schedule",
        "153 offline tests, run on every push, on recorded API fixtures; keys in Secret Manager, redacted tool errors, repo secret-scanned before going public"
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
        "Cloud Run 잡의 텔레그램 출퇴근 브리핑, 평일 07:45·18:00 예약 발송으로 시험 운영",
        "녹화된 API 응답으로 오프라인 실행하는 테스트 153개(푸시마다 실행), Secret Manager 키 관리, 오류 문구 마스킹, 공개 전 저장소 시크릿 스캔"
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
  const [selectedId, setSelectedId] = useState<string>('vodabi');
  const [modalOpen, setModalOpen] = useState(false);

  // Start from the visitor's saved choice, else their OS setting (after mount, so SSR stays dark)
  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem('theme'); } catch {}
    if (saved === 'light' || saved === 'dark') setTheme(saved);
    else if (window.matchMedia('(prefers-color-scheme: light)').matches) setTheme('light');
  }, []);

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

  // One list drives the orbit, the detail card and the project index.
  const projects = useMemo<FeaturedProject[]>(() => [
    ...FEATURED_PROJECTS[locale],
    TEXTBOOK[locale],
    ...SHIPPED_PROJECTS[locale].map(sp => ({
      id: sp.caseStudyId,
      context: locale === 'en' ? 'Side project' : '사이드 프로젝트',
      status: sp.status,
      title: sp.title,
      problem: sp.desc,
      proof: sp.outcome,
      owned: [],
      decisions: [],
      stack: sp.stack,
      image: ORBIT_META[sp.caseStudyId]?.thumb,
      liveUrl: sp.liveUrl,
      stores: sp.contactUrl ? [{ label: locale === 'en' ? 'Request access ↗' : '접근 요청 ↗', href: sp.contactUrl }] : undefined,
    })),
  ], [locale]);
  const orbitItems = useMemo<OrbitItem[]>(() => projects.map(pr => ({ id: pr.id, name: ORBIT_META[pr.id][locale], blurb: ORBIT_META[pr.id].blurb[locale], thumb: ORBIT_META[pr.id].thumb })), [projects]);
  const selected = projects.find(pr => pr.id === selectedId) ?? projects[0];

  const showProject = (id: string) => {
    setSelectedId(id);
    setModalOpen(true);
    track('project_open', { id });
  };
  const stepProject = (dir: 1 | -1) => {
    const i = projects.indexOf(selected);
    setSelectedId(projects[(i + dir + projects.length) % projects.length].id);
  };
  // ?p=<id> makes an open project shareable; dropped again when the dialog closes
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('p');
    if (id && ORBIT_META[id]) { setSelectedId(id); setModalOpen(true); }
  }, []);
  useEffect(() => {
    if (activeCaseStudyId) return;
    const url = pathFor(locale, null) + (modalOpen ? `?p=${selectedId}` : '');
    if (url !== window.location.pathname + window.location.search) history.replaceState(null, '', url);
  }, [modalOpen, selectedId, locale, activeCaseStudyId]);
  const openCaseFromModal = (id: string) => { setModalOpen(false); openCaseStudy(id); };

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
      'bg-canvas text-ink'
    }`}>
      {/* STICKY HEADER */}
      <header data-page className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors ${
        'bg-canvas/90 border-ink/10'
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
              className="transition-colors text-ink/70 hover:text-ink"
            >
              {L.navWork}
            </a>
            <a
              href="#log"
              onClick={scrollToSection('log')}
              className="transition-colors text-ink/70 hover:text-ink"
            >
              {L.navLog}
            </a>
            <a
              href="#contact"
              onClick={scrollToSection('contact')}
              className="transition-colors text-ink/70 hover:text-ink"
            >
              {L.navContact}
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={switchLocale}
              className={`h-[34px] px-3 rounded-full border text-xs font-semibold tracking-wider transition-[background-color,transform] active:scale-95 ${
                'border-ink/15 text-ink/80 hover:bg-ink/5'
              }`}
            >
              {L.localeSwitch}
            </button>
            <button
              onClick={() => setTheme(t => { const n = t === 'dark' ? 'light' : 'dark'; try { localStorage.setItem('theme', n); } catch {} return n; })}
              aria-label="Toggle theme"
              className={`relative w-[34px] h-[34px] rounded-full border flex items-center justify-center transition-colors before:absolute before:inset-[-5px] before:content-[''] ${
                'border-ink/15 text-ink/80 hover:bg-ink/5'
              }`}
            >
              {isDark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
            </button>
            <a
              href="mailto:jsn.benjamin@gmail.com"
              onClick={() => track('email_click', { from: 'header' })}
              className="h-[34px] px-4 rounded-full bg-accent-fill text-[#14171d] font-bold text-xs tracking-wider inline-flex items-center hover:brightness-105 active:scale-95 transition-[filter,transform]"
            >
              {L.emailBtn}
            </a>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main data-page id="top" className={`max-w-[1180px] mx-auto px-6 md:px-10`}>

        {/* COVER */}
        <HeroCover
          title={L.heroTitle}
          sub={L.heroSub}
          ctaWork={L.ctaWork}
          ctaResume={L.ctaResume}
          nowChip={L.nowChip}
          basedIn={L.basedIn}
          hint={L.orbitHint}
          hintTouch={L.orbitHintTouch}
          paused={modalOpen}
          items={orbitItems}
          selectedId={selectedId}
          onSelect={showProject}
          onWork={scrollToSection('work')}
          onContact={scrollToSection('contact')}
          onResume={openResume}
        />

        {/* STATS */}
        <section className="reveal border-y py-7 grid grid-cols-3 gap-4 md:gap-8 border-ink/10">
          {FACTS[locale].map((f, i) => (
            <div key={i}>
              <div className="font-serif text-4xl md:text-6xl leading-none text-accent-gold tabular-nums">
                {f.n}{f.suffix}
              </div>
              <div className="mt-2 text-xs md:text-sm text-ink-2">{f.label}</div>
            </div>
          ))}
        </section>

        {/* SELECTED WORK: the two lead projects; the orbit holds the rest */}
        <section id="work" className="pt-16 md:pt-20 scroll-mt-[76px]">
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight">{L.workTitle}</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURED_IDS.map(id => {
              const pr = projects.find(x => x.id === id)!;
              return (
                <button
                  key={id}
                  onClick={() => showProject(id)}
                  className={`group text-left grid grid-cols-[96px_minmax(0,1fr)] sm:grid-cols-[132px_minmax(0,1fr)] gap-4 items-center p-3 pr-5 rounded-2xl border transition-[border-color,transform] duration-200 hover:border-accent-gold/50 active:scale-[0.99] ${
                    'bg-card border-ink/10 shadow-sm'
                  }`}
                >
                  <img src={ORBIT_META[id].thumb} alt="" loading="lazy" className="w-full aspect-[16/10] object-cover object-top rounded-lg bg-inset" />
                  <span className="min-w-0">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="text-base md:text-lg font-semibold transition-colors group-hover:text-accent-gold">{ORBIT_META[id][locale]}</span>
                      <span aria-hidden className="text-accent-gold transition-transform group-hover:translate-x-0.5">→</span>
                    </span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-ink-2">{ORBIT_META[id].blurb[locale]}</span>
                    <span className="mt-2 inline-block text-[11px] font-bold tracking-wider uppercase text-accent-gold">{pr.status}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* HOW I WORK SECTION */}
        <section className="reveal pt-16 md:pt-20">
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight">
            {L.roleTitle}
          </h2>
          <dl className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-ink/10">
            {ROLE_COLS[locale].map(col => (
              <div key={col.head}>
                <dt className="text-sm md:text-[15px] font-bold tracking-wide text-accent-gold">{col.head}</dt>
                <dd className="mt-1.5 text-[13.5px] md:text-sm leading-relaxed text-ink-2">{col.line}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* BUILD LOG SECTION */}
        <section id="log" className="reveal pt-16 md:pt-20">
          <div className="flex items-baseline justify-between gap-4 pb-2">
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight">
              {L.logTitle}
            </h2>
            <button
              onClick={() => setIsLogExpanded(!isLogExpanded)}
              className={`h-[34px] px-3.5 rounded-full border text-xs font-bold tracking-wider transition-[background-color,transform] active:scale-95 ${
                'border-ink/15 text-ink/80 hover:bg-ink/5'
              }`}
            >
              {isLogExpanded ? L.logToggleLess : L.logToggleMore}
            </button>
          </div>

          <div className={`mt-6 border-t divide-y ${
            'border-ink/10 divide-ink/10'
          }`}>
            {displayedLog.map((e, idx) => (
              <div key={idx} className="py-3.5 grid grid-cols-[88px_minmax(0,1fr)] sm:grid-cols-[110px_90px_minmax(0,1fr)] gap-x-4 sm:gap-x-6 items-baseline">
                <span className="text-xs font-mono text-ink-3">{e.date}</span>
                <span className="hidden sm:inline text-[11px] font-bold tracking-widest uppercase text-accent-gold">[{e.type}]</span>
                <span className="text-sm md:text-[14.5px] font-medium truncate" title={locale === 'ko' ? e.descKo : e.descEn}>{locale === 'ko' ? e.titleKo : e.titleEn}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT / HIRING SECTION */}
        <section id="contact" className="reveal pt-20 pb-6">
          <div className={`border rounded-2xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-[200px_1.3fr_1fr] gap-10 lg:gap-12 items-center ${
            'bg-card border-ink/10 shadow-sm'
          }`}>
            <img
              src="/images/jason-benjamin.webp"
              alt="Jason Benjamin"
              width={410}
              height={525}
              loading="lazy"
              className="w-28 lg:w-full aspect-[4/5] object-cover object-top rounded-t-full rounded-b-2xl"
            />
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-medium tracking-tight leading-tight text-balance">
                {L.contactTitle}
              </h2>
              <p className={`mt-4 text-sm md:text-base leading-relaxed max-w-[52ch] ${
                'text-ink-2'
              }`}>
                {L.contactBody}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:jsn.benjamin@gmail.com"
                  onClick={() => track('email_click')}
                  className="h-[46px] px-6 rounded-full bg-accent-fill text-[#14171d] text-xs font-bold tracking-wider inline-flex items-center hover:brightness-105 active:scale-95 transition-[filter,transform] shadow-sm"
                >
                  {L.contactCta}
                </a>
                <a
                  href="https://www.linkedin.com/in/jason-benjamin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`h-[46px] px-6 rounded-full border text-xs font-bold tracking-wider inline-flex items-center transition-[background-color,transform] active:scale-95 ${
                    'border-ink/20 text-ink hover:bg-ink/5'
                  }`}
                >
                  {L.linkedinLabel}
                </a>
                <button
                  onClick={openResume}
                  className={`h-[46px] px-6 rounded-full border text-xs font-bold tracking-wider transition-[background-color,transform] active:scale-95 ${
                    'border-ink/20 text-ink hover:bg-ink/5'
                  }`}
                >
                  {L.ctaResume}
                </button>
              </div>
            </div>

            <dl className={`space-y-4 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l lg:pl-10 ${
              'border-ink/10'
            }`}>
              <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
                <dt className={`text-[11px] font-bold tracking-widest uppercase ${
                  'text-ink-3'
                }`}>
                  {L.lookingLabel}
                </dt>
                <dd className="text-xs md:text-sm font-medium">
                  {L.lookingValue}
                </dd>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
                <dt className={`text-[11px] font-bold tracking-widest uppercase ${
                  'text-ink-3'
                }`}>
                  {L.basedLabel}
                </dt>
                <dd className="text-xs md:text-sm font-medium">
                  {L.basedValue}
                </dd>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
                <dt className={`text-[11px] font-bold tracking-widest uppercase ${
                  'text-ink-3'
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

      <div data-page><FeedbackBox theme={theme} /></div>

      {/* FOOTER */}
      <footer data-page className={`border-t py-8 transition-colors ${
        'border-ink/10 text-ink-3'
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

      <ProjectModal
        project={selected}
        name={ORBIT_META[selected.id][locale]}
        open={modalOpen}
        locale={locale}
        position={`${String(projects.indexOf(selected) + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`}
        caseHref={CASE_IDS.includes(selected.id) ? pathFor(locale, selected.id) : null}
        onClose={() => setModalOpen(false)}
        onStep={stepProject}
        onOpenCase={openCaseFromModal}
      />

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

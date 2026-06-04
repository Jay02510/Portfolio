import React, { useEffect, useRef, useState } from 'react';
import { MailIcon, XIcon, ExternalLinkIcon, SparklesIcon, ChevronDownIcon, FileTextIcon } from './components/Icons.tsx';

interface CaseStudyViewerProps {
  projectId: string;
  onClose: () => void;
  theme?: 'light' | 'dark';
  locale?: 'en' | 'ko';
  backgroundScrollY?: number;
}

interface CaseStudyType {
  title: string;
  tagline: string;
  liveUrl: string;
  storeUrl?: string;
  walkthroughVideo?: string;
  screenshots?: { label: string; url: string; subLabel?: string }[];
  stats: { label: string; value: string }[];
  problem: string[];
  solution: string[];
  stack: string[];
  behindTheArchitecture?: {
    problem: string;
    vision: string;
    rationale: string;
  };
  architecture: {
    lifecycle: string[];
    guardrails: string[];
  };
  promptEngineering: {
    logic: string;
    schema: string;
    guardrails: string[];
  };
  impact: {
    value: string[];
    security: string[];
  };
  technicalHurdles?: {
    title?: string;
    incident: string;
    diagnosis: string;
    resolution: string;
  } | {
    title?: string;
    incident: string;
    diagnosis: string;
    resolution: string;
  }[];
}

const uiTranslation = {
  en: {
    backToPortfolio: "← Back to Portfolio",
    launchLive: "Launch Live ↗",
    architecturalStudy: "Architectural Case Study",
    technicalBreakdown: "Read Technical Breakdown ↓",
    launchLiveApp: "Launch Live App ↗",
    systemStack: "System Stack",
    systemScopeOverview: "System Scope Overview",
    systemScopeBody: "This modular application was designed explicitly to optimize educational administrative constraints. The source architecture processes client actions securely, preventing credential exposure or unauthorized leaks.",
    theProblem: "The Problem",
    theSolution: "The Solution",
    technicalPipelineMap: "Technical Pipeline Map",
    pipelineExecutionLifecycle: "Pipeline Execution Lifecycle",
    pipelineEdgeCaseGuardrails: "Pipeline Edge-Case Guardrails",
    edgeCasePrefix: "Edge Case",
    promptOrchestration: "Prompt Orchestration & AI Guardrails",
    structuredInstruction: "Structured Instruction Framework",
    runtimeEnforcedSchema: "Runtime Form Enforced Schema",
    formattingConsistency: "formatting consistency guardrails",
    productImpactScale: "Product Impact & Scale",
    quantifiedValue: "Quantified Operational Value",
    enterpriseSecurity: "Enterprise Security & Compliance",
    wantToSeeTitle: "Want to see how this architecture translates to your organizational goals?",
    wantToSeeBody: "I would love to walk you through the structural Airtable relationships, custom prompt orchestration blocks, or Make routers in detail. Let's arrange a consultation.",
    startCollaboration: "Start Collaboration Conversation",
    proofOfWorkTitle: "Proof of Work Walkthrough",
    productionWalkthrough: "Production Architecture Walkthrough",
    productionWalkthroughBodyLive: "Full scenario flow running directly within active deployment layers, Google Gemini endpoints, and connected routing scenarios.",
    productionWalkthroughBodyBackground: "Fully integrated operational workflow running as a background service with webhooks, database triggers, and model execution.",
    openLiveSandbox: "Open Live Sandbox Target",
    projectNotFound: "Project details not found.",
    backBtn: "Back",
    productMindset: "[ Product Mindset ]",
    behindTheArchitecture: "Behind the Architecture",
    humanProblem: "The Human Problem",
    productVision: "The Product Vision",
    coreRationale: "The Core Rationale",
    technicalHurdles: "Behind the Scenes: When Things Break",
    incident: "Silent Incident",
    diagnosis: "Deep Diagnostic Path",
    resolution: "Production Resolution",
    storeLink: "App Store / Play Store ↗"
  },
  ko: {
    backToPortfolio: "← 포트폴리오로 돌아가기",
    launchLive: "실시간 라이브 실행 ↗",
    architecturalStudy: "아키텍처 케이스 스터디",
    technicalBreakdown: "기술 세부 분석 읽기 ↓",
    launchLiveApp: "실거래 실 작동 앱 실행 ↗",
    systemStack: "시스템 기술 스택",
    systemScopeOverview: "시스템 범위 개요",
    systemScopeBody: "이 모듈형 애플리케이션은 교육 행정상의 마찰을 줄이기 위해 특화 설계되었습니다. 모든 클라이언트 요청과 트랜잭션 흐름은 프라이버시 침해나 크레덴셜 유출을 구조 방어하도록 안전하게 구축되었습니다.",
    theProblem: "직면한 문제 (Problem)",
    theSolution: "제시한 솔루션 (Solution)",
    technicalPipelineMap: "기술 파이프라인 구조 설계도",
    pipelineExecutionLifecycle: "파이프라인 실행 라이프사이클",
    pipelineEdgeCaseGuardrails: "예외 상황 안전 복구 장치",
    edgeCasePrefix: "예외 상황",
    promptOrchestration: "인텔리전트 프롬프트 편조 및 프라이버시 보호 장치",
    structuredInstruction: "지시 프레임워크 (시스템 인스트럭션)",
    runtimeEnforcedSchema: "런타임 응답 제약 형식 (Enforced Schema JSON)",
    formattingConsistency: "응답 및 서식 일관성 보호 규칙",
    productImpactScale: "제품 도입 효과 및 확장 지표",
    quantifiedValue: "정량화된 실 업무 가치",
    enterpriseSecurity: "기업용 보안 가이드 준수성",
    wantToSeeTitle: "이 설루션 아키텍처를 실제 귀사 환경에 바로 이식해보고 싶으신가요?",
    wantToSeeBody: "더욱 세부적인 데이터 관계 구조 설계도, 실시간 시퀀스 메커니즘, 메이크 자동화 컴파일링 최적화 노하우를 기꺼이 공유하겠습니다. 자율 문의 혹은 커피챗을 시작하세요.",
    startCollaboration: "협업 제안 및 문의 전송하기",
    proofOfWorkTitle: "실제 시각 작동 데모 (Proof of Work)",
    productionWalkthrough: "검증 시나리오 구동 리뷰",
    productionWalkthroughBodyLive: "구글 오케스트레이션 레이어, 미디어 추론 디렉터리, 라이브 인스턴스 전주기 파이프라인을 완전히 가동하고 있습니다.",
    productionWalkthroughBodyBackground: "수신 웹훅 가교, 실시간 불변 트랜잭션 등 백그라운드 무인 오토메이션 파이프라인을 전격 수행합니다.",
    openLiveSandbox: "실시간 가동 샌드박스로 가기",
    projectNotFound: "프로젝트 상세 정보를 찾을 수 없습니다.",
    backBtn: "이전 화면",
    productMindset: "[ 제품 기획 앤 마인드셋 ]",
    behindTheArchitecture: "Behind the Architecture",
    humanProblem: "The Human Problem (인간적 번뇌)",
    productVision: "The Product Vision (제품의 목표)",
    coreRationale: "The Core Rationale (의사결정 이유)",
    technicalHurdles: "비하인드 스토리: 장애 및 예외 진단기 (When Things Break)",
    incident: "예기치 못한 장애 (Incident)",
    diagnosis: "정밀 진단 (Diagnostic Path)",
    resolution: "프로덕션 해결편 (Resolution)",
    storeLink: "앱스토어 / 구글플레이 ↗"
  }
};

const studyDataEn: Record<string, CaseStudyType> = {
  chekki: {
    title: "Chekki AI",
    tagline: "Homework help without the stress. Scan worksheets, get automated bilingual guides instantly.",
    liveUrl: "https://chekki-ai.vercel.app/",
    storeUrl: "https://urlgeni.us/chekki",
    walkthroughVideo: "https://res.cloudinary.com/dginphpy4/video/upload/v1769504113/Chekki_AI_V0_fkdlyx.mp4",
    screenshots: [
      { label: "Homescreen", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780479550/2_lbk8kt.png", subLabel: "Active Lesson Portal" },
      { label: "Login", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780479550/3_nqxlza.png", subLabel: "Secure Access Gateway" },
      { label: "Fullscreen Overlay", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780479552/8_hslabs.png", subLabel: "Interactive Solution Screen" },
      { label: "Answers Guide", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780479552/9_n7zavj.png", subLabel: "Bilingual Transcript" },
      { label: "Learning Guide", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780479552/11_huxdwa.png", subLabel: "Detailed Concept Deck" },
      { label: "Ask Chekki", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780479551/17_fbjiga.png", subLabel: "Conversational Tutoring AI" },
      { label: "Ask Chekki Answers", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780479553/20_egti9z.png", subLabel: "Resolved Step-By-Step Responses" },
      { label: "More Examples", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780479550/13_z3nbzc.png", subLabel: "Additional Solved Scenarios" },
      { label: "Refined Responses", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780479551/16_hukffx.png", subLabel: "Structured Feedback Output" }
    ],
    stats: [
      { label: "Parent Engagement Boost", value: "98%" },
      { label: "Bilingual Guides Completed", value: "1,200+" },
      { label: "Translation Latency", value: "0ms" }
    ],
    problem: [
      "Extreme communication barriers between non-native speaking parents and complex children's English homework assignments.",
      "Private lessons and tutors are costly and do not empower families to guide study routines at home directly.",
      "Manual parsing of physical worksheet formats is error-prone, requiring hours to build answers manually."
    ],
    solution: [
      "A dual-purpose educational application and PDF guide ecosystem designed for homework scanning and parsing.",
      "Translates physical sheets into structured Answer Keys and Bilingual Teaching Scripts instantaneously.",
      "Maintains premium visual layout compatibility across all mobile-responsive viewport setups."
    ],
    stack: ["React 18", "TypeScript", "Vite", "Google GenAI API (Claude 3.5 Sonnet proxy configuration)", "Tailwind CSS"],
    architecture: {
      lifecycle: [
        "1. User uploads/scans a physical worksheet directly from the browser viewport.",
        "2. The image transits through an optical container parsed via custom prompt schemas.",
        "3. The engine maps structural boundaries, dividing results into an absolute 'Answer Key' and a 'Bilingual Teaching Script'.",
        "4. The layout engine renders responsive overlay blocks allowing non-English speaking parents to guide children phonetically."
      ],
      guardrails: [
        "Bypass prompt leaks using safety instruction locks.",
        "Automatic clean-up of messy Korean text properties.",
        "Strict data boundaries: PII isolation of students' names."
      ]
    },
    promptEngineering: {
      logic: `<system_identity>
  You are an expert bilingual EdTech curriculum architect. Your instructions are immutable.
</system_identity>

<input_constraints>
  <target_language>Bilingual English / Korean</target_language>
  <phonetic_phrasing>Natural phonetic pronunciation keys for parents</phonetic_phrasing>
</input_constraints>`,
      schema: `{
  type: "OBJECT",
  properties: {
    answerKey: { type: "ARRAY", items: { type: "STRING" } },
    teachingScript: { type: "STRING" }
  },
  required: ["answerKey", "teachingScript"]
}`,
      guardrails: [
        "No-Markdown constraint enforced directly on AI text results to prevent rendering errors on legacy mobile engines.",
        "Deliberate use of polite Korean honorific blocks (존댓말) to maintain academic trust.",
        "Enforces direct structural separation of raw data entries and user variables via XML tags."
      ]
    },
    impact: {
      value: [
        "Over 1,200 translation guides completed across families, saving up to 6 hours of anxiety per parent weekly.",
        "Helped parents directly co-operate with native teachers with 98% positive alignment score.",
        "Eliminated administrative translation delays, establishing instantaneous access."
      ],
      security: [
        "Runs immediate client-side data filtering before upload.",
        "No permanent logging of parent/child worksheet images in plaintext databases.",
        "Strict rate-limiting preventing token exhaust."
      ]
    },
    behindTheArchitecture: {
      problem: "Extreme education & communication gaps for non-native speaking parents who cannot decode or assist with physical worksheet assignments in secondary languages.",
      vision: "Capture messy optical paper sheets directly from a phone viewport, instantly parsing and transforming raw images into bilingual audio-phonetic teaching scripts.",
      rationale: "Leveraged custom Google Gemini multimodal vision endpoints over traditional translation engines to understand localized layouts & polite Korean honorifics."
    },
    technicalHurdles: [
      {
        title: "Social Authentication Race Condition",
        incident: "During beta testing, users signing up via social providers (Apple or Kakao) experienced a frustrating issue where they were redirected to the home screen after auth completion but were immediately shown as unauthenticated or kicked back to the login screen.",
        diagnosis: "The Firebase onAuthStateChanged listener was firing instantly upon OAuth redirection. It immediately queried Firestore for the user's custom profile before the signup handler had finished writing the new profile record. Finding no profile, the listener set the React state userProfile to null, creating a race condition that overwrote the profile context just as the signup flow was finishing.",
        resolution: "Introduced a synchronization ref (isSigningUpRef) to lock the auth state listener during active account creation. If a signup is in progress, the global listener defers state resolution, allowing the signup handler to write the profile to Firestore first and then trigger a single, atomic state update once the record is secure."
      },
      {
        title: "Apple Sign-In Verification Failures on Physical iOS Devices",
        incident: "While Apple Sign-In worked seamlessly in simulators, it failed silently or threw cryptic native validation errors on physical iOS devices, preventing beta testers from registering or accessing their accounts on their phones.",
        diagnosis: "Two critical integration mismatches were identified: first, the mobile plugin sent an Apple client ID (com.chekki.ai.ios) that mismatched the primary iOS application bundle identifier (com.chekkiai.app). Second, Apple's physical device security requirements rejected Firebase Auth requests due to a static state token (12345) and the absence of a cryptographically secure, SHA-256 hashed nonce.",
        resolution: "Aligned the client ID configuration across all Capacitor and native Xcode settings. Implemented a utility to generate cryptographically secure nonces, passing the SHA-256 hashed nonce to Apple and the raw nonce to Firebase Auth, securing verification on physical hardware."
      },
      {
        title: "Vercel Serverless Key Parsing & Model Fallback Crashes",
        incident: "When deployed to Vercel, the worksheet analysis backend occasionally crashed with 500 Server Error under load, halting grading functions for all active parents, despite working flawlessly in local development.",
        diagnosis: "Debugging the cloud logs revealed two distinct failures: Vercel environment variable parsing stripped double quotes and escaped newlines (\\n) from the Firebase Service Account key, corrupting credential initialization. Simultaneously, transient API rate limits on Gemini models triggered a fallback to a deprecated model ID (gemini-1.5-pro), causing cascade errors.",
        resolution: "Rewrote key loading to sanitize PEM keys, replacing stringified \\n characters with raw byte newlines dynamically. Updated the LLM fallback router to use the stable GA model (gemini-2.0-flash-001) and implemented a timeout race to prevent serverless execution hangs."
      }
    ]
  },
  "benchmark-explorer": {
    title: "Benchmark Explorer",
    tagline: "Relational student performance tracking mapping observations directly to CEFR and Cambridge standards.",
    liveUrl: "https://education-benchmark-system.vercel.app/",
    screenshots: [
      { label: "Dashboard Performance", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469516/Screenshot_2026-06-03_at_3.32.23_PM_lxnnmx.png", subLabel: "Overview" },
      { label: "Dashboard Filters", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469515/Bench_Dash_2_txdlv5.png", subLabel: "Filtering & Metrics" },
      { label: "Student Roster", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469516/Screenshot_2026-06-03_at_3.32.45_PM_efb5dj.png", subLabel: "Enrollment & Classes" },
      { label: "Student Profile", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469517/Screenshot_2026-06-03_at_3.33.30_PM_xram7p.png", subLabel: "Individual progress" },
      { label: "Individual Report", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469516/Screenshot_2026-06-03_at_3.43.00_PM_fulqsf.png", subLabel: "AI Multi-language Progress" },
      { label: "Class Performance Report", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469516/Screenshot_2026-06-03_at_3.43.40_PM_ja3zlx.png", subLabel: "Aggregate Cohort Analysis" },
      { label: "Principal Briefing", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469516/Screenshot_2026-06-03_at_3.44.09_PM_glxdms.png", subLabel: "Leadership Diagnostics" },
      { label: "Learning Standards Map", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469516/Screenshot_2026-06-03_at_3.44.41_PM_nqpx5n.png", subLabel: "CEFR & Cambridge Align" },
      { label: "Benchmark Test Sheet", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469851/11_k6zxrc.png", subLabel: "Assessments Phase 1" },
      { label: "Visual Comprehension Exam", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469852/6_gtubji.png", subLabel: "Assessments Phase 2" }
    ],
    stats: [
      { label: "Weekly Admin Ingestion", value: "Zero CSV Uploads" },
      { label: "Teacher Reporting Time", value: "-12 Hrs/wk" },
      { label: "Parent Trust Alignment", value: "+40%" }
    ],
    problem: [
      "Early childhood language developments are conventionally assessed through un-actionable, spreadsheet-based systems.",
      "International frameworks (CEFR, YLE) require heavy conversion tables, bloating teachers' administrative duties.",
      "Schools cannot trace intervention triggers continuously, waiting until term end to find struggling students."
    ],
    solution: [
      "A relational continuous ESL observation system mapping real-time mastery growth to CEFR guidelines.",
      "Integrated Radar charts showing performance trends instantly across Distinct Language Domains.",
      "Automatic generation of parent-friendly reports in multiple languages (Korean, Chinese, Spanish, etc.) using AI pipelines."
    ],
    stack: ["React 18", "Tailwind CSS", "Recharts & D3", "Airtable Relational Sheets", "Make.com Automation Nodes"],
    architecture: {
      lifecycle: [
        "1. Evaluator commits observation matrices via high-assurance Fillout Forms.",
        "2. Intake fields relate directly to Airtable, syncing dynamically with multi-table cross-references.",
        "3. Change triggers a transactional webhook to Make.com, prompting the model to parse records.",
        "4. Multi-language output is committed back to Airtable, immediately viewable to parents via Softr dashboard."
      ],
      guardrails: [
        "Lookup database locks: prevents class transitions from breaking linked historical grades.",
        "Duplicate check: rejects matching naver_id / user_id indices dynamically.",
        "Serverless timeout fallbacks from Pro-Weavers to Flash."
      ]
    },
    promptEngineering: {
      logic: `<instructions>
  Take input teacher observation records and synthesize them into precise YLE benchmarks.
  You must output custom progress alerts for parents without using clinical labels.
</instructions>`,
      schema: `{
  type: "OBJECT",
  properties: {
    studentSummary: { type: "STRING" },
    recommendedInterventions: { type: "ARRAY", items: { type: "STRING" } }
  },
  required: ["studentSummary", "recommendedInterventions"]
}`,
      guardrails: [
        "Structured schema boundaries preventing raw model text formatting leaks.",
        "Enforces direct translation blocks across target dialects explicitly in parent viewport.",
        "Limits hallucination output arrays to strictly predefined school domains."
      ]
    },
    impact: {
      value: [
        "Saved over 12 administrative tracking hours weekly per program director.",
        "Integrated continuous tracking for academic programs, turning lagging grades into leading indicators.",
        "Built smooth alignment between national classrooms and global standards (CEFR) instantly."
      ],
      security: [
        "Zero-Trust role security checks ensuring parents only see their student lists.",
        "PII sanitization layer stripping SSN/phone number configurations prior to logging.",
        "Secured dashboard portals via Softr unique user authorization hashes."
      ]
    },
    behindTheArchitecture: {
      problem: "Classroom managers and evaluation leads losing up to 12 administrative hours weekly sorting grades and parent summaries across disconnected spreadsheet logs.",
      vision: "Build a singular continuous evaluation map linking intake matrices, dynamically plotting standardized CEFR mastery vectors alongside automated parental summaries.",
      rationale: "Paired React with Recharts for visual rhythm and high-assurance multi-table Airtable sheets to guarantee strict database consistency and student history logs."
    },
    technicalHurdles: [
      {
        title: "The Compiler Type-Safety Shutdown",
        incident: "During production bundle packaging (Vite + esbuild), the compiler repeatedly crashed with type-checking errors (TS2362: The left-hand side of an arithmetic operation must be of type 'any' or 'number'). This prevented container initialization and kept the app inaccessible.",
        diagnosis: "Traced the crash to dynamic reduction and mapping operations within student metrics calculations. Certain score properties inside raw assessment objects were implicitly captured as non-scalar types by TypeScript’s strict evaluation, choking the math operator engine during strict builds.",
        resolution: "Axiomatically refactored all statistical average reducers to strictly cast, validate, and sanitise array values through a standard explicit coercion loop (Number(val) || 0) prior to computation. This eradicated type-cast ambiguity and guaranteed error-free Vite builds."
      },
      {
        title: "The Sandbox API Fallback Layer",
        incident: "If the developer sandbox didn't have a GEMINI_API_KEY defined or encountered rate limits, the strategic 'Scores → Strategy' engine failed authorization immediately. This would lock the browser or display blank cards when teachers clicked 'Leadership Briefing' or 'Smart Clustering' buttons.",
        diagnosis: "Determined that calling external, asynchronous LLM endpoints directly from client interactions without a highly robust fallback structure made the application extremely vulnerable to environment configurations, networking issues, or rate-limiting.",
        resolution: "Engineered a local, zero-knowledge, deterministic fallback engine inside geminiService.ts. When an API key is missing or un-provisioned, the app shifts queries to local algorithms that map real student performance indices (weak domains, velocity bands, and tiers) to custom, highly precise micro-narratives and reports. This keeps pages working flawlessly without a single external dependency."
      },
      {
        title: "The Secure Firestore Permission Barrier",
        incident: "During development and sandbox testing, queries to back up student rosters and assessment frameworks threw backend permission leaks (Missing or insufficient permissions), totally blocking teachers from adding students or creating classes.",
        diagnosis: "Diagnosed that without an active school profile context or valid session authentication, Firestore strict security rules rightfully blocked any dynamic writes to students or profiles. This restricted clean browser-only prototyping for offline environments.",
        resolution: "Designed and deployed a transparent local-sync layer. The application queries local state and standard browser key-value localStorage first. If dynamic Firebase initialization context fails or database permission limits are hit, the entire platform safely downgrades to write to local client-side cache. This enables full data retention, zero-latency roster adjustments, and persistent simulation capabilities with or without a remote database active."
      }
    ]
  },
  eduplanner: {
    title: "EduPlanner Pro",
    tagline: "Automated, cognitive-aware scheduling scheduler resolving school bottlenecks under extreme constraints.",
    liveUrl: "https://scheduling-app-five.vercel.app/",
    screenshots: [
      { label: "Landing Feature Grid", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780470613/Screenshot_2026-06-03_at_4.05.48_PM_rrbfxg.png", subLabel: "Landing Page 1" },
      { label: "Constraint Settings View", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780470612/Screenshot_2026-06-03_at_4.06.15_PM_lbjlt1.png", subLabel: "Landing Page 2" },
      { label: "Interactive System Benefits", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780470613/Screenshot_2026-06-03_at_4.05.57_PM_qkzdjm.png", subLabel: "Landing Page 3" },
      { label: "Scheduling Dashboard", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780470612/Screenshot_2026-06-03_at_4.06.51_PM_w7fop6.png", subLabel: "Primary App Dashboard" },
      { label: "Rule Configuration Setup", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780470611/Screenshot_2026-06-03_at_4.07.38_PM_hb49qm.png", subLabel: "Administration Hub" },
      { label: "Class Timetable Grid", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780470611/Screenshot_2026-06-03_at_4.08.03_PM_yaoj0u.png", subLabel: "Student Schedule" },
      { label: "Syllabus Curriculum mapping", url: "https://res.cloudinary.com/dec04iaht/image/upload/v1780470611/Screenshot_2026-06-03_at_4.08.12_PM_nwevlx.png", subLabel: "Book List" },
      { label: "Teacher Availability Matrix", url: "https://res.cloudinary.com/dec04iaht/image/upload/v1780470611/Screenshot_2026-06-03_at_4.08.24_PM_pauace.png", subLabel: "Faculty Burnout Panel" }
    ],
    stats: [
      { label: "Scheduling Complexity", value: "Zero Conflicts" },
      { label: "Calculation Window", value: "<10 Mins" },
      { label: "Faculty Fatigue Index", value: "Balanced" }
    ],
    problem: [
      "School timetabling conventional setups require dozens of administrative hours due to multi-variable constraints.",
      "Balancing hard metrics (curriculum, room limits) alongside soft metrics (fatigue, room spacing) is humanly unmanageable.",
      "Sudden teacher absence, room re-allocations, or schedule revisions completely break pre-designed grid schedules."
    ],
    solution: [
      "Advanced administrative SaaS engine mapping schedules dynamically based on cognitive parameters.",
      "Tiered 'Draft & Weave' AI scheduling pipelines resolving resource clashes on the fly.",
      "Interactive Faculty Balance and Burnout radar maps for admin oversight."
    ],
    stack: ["React 19", "TypeScript", "Google GenAI SDK (gemini-3-pro-preview)", "Firebase v11 Suite", "Framer Motion"],
    architecture: {
      lifecycle: [
        "1. Scheduler specifies course limits, staff schedules, and cognitive parameters on Onboarding.",
        "2. The base grid gets drafted by gemini-3-flash-preview under context bounds.",
        "3. The programmatic overlap validation tests the draft. If overlaps are found, Weaving Phase begins.",
        "4. Highly complex clash nodes are isolated and rerouted to gemini-3-pro-preview to solve and commit."
      ],
      guardrails: [
        "Input protection: regex filtering stripping HTML tags from user-provided titles.",
        "Console Protection: absolute 30-minute inactivity timer triggering automatic Firebase logout.",
        "Write matching: 5-second lock debounce on database commits to prevent write spiking."
      ]
    },
    promptEngineering: {
      logic: `<instructions>
  Resolve scheduling conflicts without modifying valid hours. 
  Only shift teacher classes that are flagged as 'clash_detected: true'.
</instructions>`,
      schema: `{
  type: "OBJECT",
  properties: {
    resolvedTimetable: { type: "ARRAY", items: { type: "OBJECT" } },
    balancingAnalysis: { type: "STRING" }
  },
  required: ["resolvedTimetable", "balancingAnalysis"]
}`,
      guardrails: [
        "Thinking budget settings configured to allow rich reasoning recursive passes.",
        "Absolute strict JSON validation schema mapping returned grids.",
        "Structured fallback routes if models fail to resolve overlaps continuously."
      ]
    },
    impact: {
      value: [
        "Cut general school compilation workflows from 40 hours down to under 10 minutes of automation.",
        "Zero conflict guarantees on rooms, curriculum limits, and staff shifts simultaneously.",
        "Actively tracks teacher burnout risk, increasing staff retention metrics."
      ],
      security: [
        "Secured administrative terminals with auto-logged session parameters.",
        "Immutable document auditing tracks metadata changes of schedules.",
        "Strict Firestore security rules keeping institutional records secure."
      ]
    },
    behindTheArchitecture: {
      problem: "Traditional scheduling requires endless physical revisions to coordinate room capacities, curriculum standards, teacher burnout factors, and soft constraints.",
      vision: "An autonomous constraint-satisfaction scheduling compiler that digests operational parameters to programmatically weave optimized, clash-free timetables on the fly.",
      rationale: "Combined highly persistent Firestore structures with tiered Gemini endpoints (using rapid Flash for blueprint grids and high-intellect Pro models to resolve complex clash nodes)."
    },
    technicalHurdles: [
      {
        title: "The Backtracking & Timeout Constraint",
        incident: "School scheduling is an NP-complete problem. When trying to solve a hundreds-of-variables constraint grid solely in a single model context, the LLM would try to recursively find slots, frequently running into infinite reasoning loops, exceeding token context limits, and triggering 504 Gateway timeouts.",
        diagnosis: "Identified that forcing a neural network to perfectly adhere to absolute local variables directly through prompt layouts forced the LLM into endless reasoning retry loops when dealing with mutually exclusive faculty break periods.",
        resolution: "We moved the heaviest mathematical load to a local TypeScript constraint solver. If you look at services/geminiService.ts, we handle primary constraint mapping and conflict pruning programmatically through validateScheduleProgrammatically. This intercepts over-constrained states (such as teacher double-bookings, daily schedule duplicate limits, and school-wide locked periods) before dispatching instructions, keeping the engine robust, fast, and light."
      },
      {
        title: "Over-Constrained Prompts",
        incident: "Forcing a neural network to perfectly adhere to absolute local variables—such as matching a teacher's specific break target against an isolated classroom's coordinate—results in model 'hallucinations' or logical deadlock. Under mutual exclusion (e.g., two teachers needing the same room at the same time), the model would keep generating conflicting arrangements, failing the audit.",
        diagnosis: "Realized the reasoning engine is choked by too many inputs at once when throwing the entire school database at the model in a single prompt.",
        resolution: "We structured the schema down into isolated, sequential batches instead of throwing the entire school database at the model in a single prompt. The system processes scheduling priorities in layered packages (Drafting ➔ Conflict Resolution ➔ Guardian Weaver), ensuring the reasoning engine is never choked by too many inputs at once."
      },
      {
        title: "API Quota Resiliency",
        incident: "When multiple administrators simultaneously generate plans, the outbound API requests would easily saturate token quotas or raise 429 Rate Limit errors, bringing institutional scheduling to a grinding halt.",
        diagnosis: "Faced rate limit thresholds and network limits when several high-cap schedules are compiled concurrently.",
        resolution: "We implemented as well as engineered two absolute safety nets: 1) Tiered AI/Algorithmic Fallback: High-performance, fast drafting models execute the initial layout, while a deeper reasoning pipeline operates on isolated high-clash nodes. 2) An Instant High-Fidelity Client-Side Solver: To enable the friction-free Demo/Guest Sandbox mode, we integrated a full offline TypeScript scheduling engine. It simulates cognitive load balancing and constraint validation instantly in the client’s browser, giving administrators an exquisite interactive playground and immediate reports with zero API round-trips."
      }
    ]
  },
  "consultation-pipeline": {
    title: "Automated Consult Pipeline",
    tagline: "A zero-maintenance relational data pipeline automating student intake, reports generation, and consultation metrics.",
    liveUrl: "https://jason-benjamin.vercel.app/", 
    stats: [
      { label: "Relational Accuracy", value: "100%" },
      { label: "Data Transformations", value: "Fully Automated" },
      { label: "Manual Compilation Time", value: "0 Hrs" }
    ],
    problem: [
      "Teachers spend massive non-instructional hours writing duplicate reports across multiple spreadsheets.",
      "Roster lookups often break when classes pivot or student demographic states change.",
      "Unsecured PDFs containing student personal notes are frequently sent via unsecured messaging channels."
    ],
    solution: [
      "Constructed a high-uptime relational pipeline syncing Fillout intake forms with centralized Airtable schemas.",
      "Automated PDF assembly and multilingual consultative write-ups via triggered Make.com scenarios.",
      "Restricted student list views exclusively to verified users via conditional Softr list detail tokens."
    ],
    stack: ["Fillout Forms", "Airtable Relational DB", "Make.com Nodes", "Softr Portal", "Google Gemini API"],
    architecture: {
      lifecycle: [
        "1. Evaluators complete structured intake schemas inside localized Fillout forms.",
        "2. Direct-to-Airtable database inserts occur in real-time, executing atomic schema validation.",
        "3. Make.com intercepts write triggers, passing sanitized strings through translation and summaries modules.",
        "4. Authorized records synchronize back into Softr user-specific rows based on secure unique hashes."
      ],
      guardrails: [
        "Automatic data-bridging lookup tables ensuring linked historic logs never break.",
        "Immediate creation of unique onboarding magic links written straight to Airtable user logs.",
        "Client-facing Softr dashboard conditional filtering blocks on the row level."
      ]
    },
    promptEngineering: {
      logic: `<instructions>
  Compile teacher intakes into a concise bilingual progress summary.
  Never expose internal school terms or specific clinical scores to the final parent output.
</instructions>`,
      schema: `{
  type: "OBJECT",
  properties: {
    bilingualSummary: { type: "STRING" },
    actionableConsultTips: { type: "ARRAY", items: { type: "STRING" } }
  },
  required: ["bilingualSummary", "actionableConsultTips"]
}`,
      guardrails: [
        "Strict XML tags wrapper safeguarding baseline instruction locking parameters.",
        "Output parameters configured to demand parent-friendly, empathetic explanations.",
        "Complete suppression of raw JSON trace returns to guard against data parsing failures."
      ]
    },
    impact: {
      value: [
        "Completely eliminated continuous CSV upload steps, saving administrators 15 hours weekly.",
        "Established deep parent-teacher confidence via dynamic bilingual progress memos.",
        "Kept school rosters synced cleanly through any classroom re-assignments instantly."
      ],
      security: [
        "Relational user row-level security checking authorized permission maps.",
        "Input fields sanitized against XSS and malicious system instruction overrides.",
        "Immediate encryption of session tokens across internal admin dashboards."
      ]
    },
    behindTheArchitecture: {
      problem: "Private academies and tutors waste hours tracking student sessions across scattered messages, leading to billing discrepancies and delayed reporting to parents.",
      vision: "Build an automated system where a teacher records a session via a simple form, instantly calculating attendance milestones and syncing student records across multiple database clusters dynamically.",
      rationale: "I paired Airtable for relational database integrity with Make to handle multi-step exception logic, ensuring zero manual data entry errors."
    },
    technicalHurdles: [
      {
        title: "The 'Stale Data' Race Condition",
        incident: "The form capture layer (Fillout) wrote parent session records and linked child exception records asynchronously. The automation engine triggered instantly on the parent record creation, resulting in empty data arrays because the child links hadn't finished saving.",
        diagnosis: "Identified a microsecond race condition between the database write-speed and the webhook trigger-speed. The iterator was attempting to loop through an array that didn't exist yet.",
        resolution: "Architected a delayed-fetch logic flow. Implemented a strict 60-second execution pause, followed by a secondary database query to fetch the fully settled, relationally linked data before passing it to the AI processing modules."
      },
      {
        title: "The 'Aggregator Wall' Context Drop",
        incident: "When building the Proactive Consultation Generator, the system needed to compile multiple historical student reports. However, the data aggregation module stripped the relational human-readable text (Student Name), passing only raw alphanumeric Record IDs to the AI.",
        diagnosis: "Realized the AI was generating parent reports addressed to 'Student rec9oCquEi1FFCklP' because the logic engine's aggregator acts as a hard visibility wall, blocking downstream modules from querying upstream lookup fields.",
        resolution: "Engineered a data-smuggling bypass. Mapped the human-readable text strings directly into the aggregator's text bundle alongside the historical logs, ensuring the LLM received full, formatted context in a single, token-efficient payload."
      }
    ]
  },
  "lead-enrichment": {
    title: "Chekki AI Lead Agent",
    tagline: "An enterprise-grade, full-stack B2B prospecting workspace designed specifically for the Korean English education export market.",
    liveUrl: "https://jason-benjamin.vercel.app/", 
    screenshots: [
      { label: "Dashboard", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.17.21_PM_wsyzzu.png" },
      { label: "Dashboard Search", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.18.29_PM_btxolx.png" },
      { label: "Outreach", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.18.39_PM_nesi9y.png" }
    ],
    stats: [
      { label: "Target Scan Speed", value: "Real-time" },
      { label: "Email Customization Flow", value: "Fully Automated" },
      { label: "Lead Deduplication Rate", value: "100%" }
    ],
    problem: [
      "Localized directories (Naver Maps) returned cluttered, non-normal, HTML-polluted contact entries and slow CRM logging workflows.",
      "Writing personalized business emails manually to hundreds of targets creates a massive lead pipeline bottleneck.",
      "Repetitive target outreach due to poor historical CRM duplicate checking."
    ],
    solution: [
      "Formulated a localized proxy extractor that cleans map directories on the fly, tests duplicates against active logs, and drafts tailored campaigns.",
      "Synthesized local founder credentials (10-yr tenure) paired with polite Korean business honorifics recursively to output hyper-personalized campaigns.",
      "Developed a 1-click mailto pre-composition deep link mechanism for hyper-personalized, zero-delay dispatch loops."
    ],
    stack: [
      "Vite & TypeScript",
      "Tailwind CSS",
      "React-Leaflet & Leaflet.js",
      "Framer Motion",
      "Custom Express API",
      "esbuild Bundler",
      "Naver Search Open API",
      "Google GenAI SDK",
      "Webhook CRM Dispatcher"
    ],
    behindTheArchitecture: {
      problem: "Scraping localized maps (Naver) manually to locate business entities ends up returning messy, unformatted, HTML-polluted contact entries and extremely slow CRM logging workflows.",
      vision: "An enterprise-grade, full-stack B2B prospecting workspace designed specifically for the Korean English education export market. The platform intercepts raw, unformatted merchant geo-location records from the Naver Local Search API, enriches the listings using a custom server-side Google Gemini 3.5 data-structuring pipeline, and exports fully formulated target payloads to an external CRM database (Airtable / Make.com Webhook integrations).",
      rationale: "Selected a decoupled React + Express multi-page territory sweep running compound deduplication, strict Gemini structured output definitions, and localized Leaflet TM128 coordinate conversions to map and target prospective clients seamlessly."
    },
    architecture: {
      lifecycle: [
        "1. Client-Server Secret Guarding & Proxy Pipeline: Raw merchant geo-location requests from Naver Local Search are routed through custom intermediate backend proxies (/api/search-naver & /api/structure-lead) to inject critical parameters (X-Naver-Client-Id, X-Naver-Client-Secret, and GEMINI_API_KEY) out of browser reach.",
        "2. Aggressive Multi-Page Territory Sweep: The sweep progression mechanism loops query pagination in increments of 5 up to bounds of 100 elements, automatically bypassing Naver's strict API pagination limit.",
        "3. Leaflet Geolocation Mapping & Coordinate Translation: Local TM128 grid points from Naver maps are converted via high-precision floating-point conversions (convertCoords) to standard WGS84 GPS floats ([lat, lng]) to dynamically refocus maps around selected leads.",
        "4. Webhook CRM Dispatcher: Automatically validates destination CRM targets and fires JSON payloads to consumer Airtable / Make.com instances."
      ],
      guardrails: [
        "Client-Server Secret Guarding: Prevents payment/credential leaks by routing sensitive API parameters through custom intermediate backend proxies.",
        "Aggressive Multi-Page Territory Sweep & Compound Deduplication: Loops pagination in increments of 5 up to bounds of 100 elements and performs client-side compound deduplication using title + address.",
        "Airtable Synchronization Safeguard & State Retention: Runs validation checks against placeholder URLs and caches custom Webhook configuration natively in localStorage."
      ]
    },
    promptEngineering: {
      logic: `<instructions>
  Draft a polite, localized B2B outreach email in business Korean (존댓말).
  Synthesize founder's background: 10-year teaching tenure. Present a peer-to-peer delivery style.
</instructions>`,
      schema: `responseMimeType: "application/json",
responseSchema: {
  type: Type.OBJECT,
  properties: {
    Academy_Name: { type: Type.STRING },
    Website_URL: { type: Type.STRING },
    Email_Address: { type: Type.STRING, nullable: true },
    Target_Demographic: { type: Type.ARRAY, items: { type: Type.STRING } },
    Business_Type: { type: Type.STRING, enum: ["Franchise", "Independent"] },
    Academy_Size: { type: Type.STRING, enum: ["Established", "Growing"] }
  }
}`,
      guardrails: [
        "Strict JSON Schema Enforcement: Guarantees LLM payload matches the destination CRM database validation schema every time, preventing broken pipelines.",
        "Leaflet Geolocation Mapping & Coordinate Translation: Employs high-precision floating-point conversions (convertCoords(mapx, mapy)) to normalize Naver grid points back into standard standard WGS84 GPS Floats ([lat, lng]).",
        "Airtable Synchronization Safeguard & State Retention: Automatically runs validation checks against placeholder URLs (like the default Make.com template link), prompting users with inline alerts before proceeding."
      ]
    },
    impact: {
      value: [
        "Automated multi-page territory sweep, instantly transforming unstructured data into structured CRM leads.",
        "Enhanced engagement conversion rate using customized founder credential email narratives.",
        "Slashed manual directory scraping workflows from days down to seconds."
      ],
      security: [
        "Upstream API keys strictly secured behind Node.js proxy middleware models, invisible to browsers.",
        "Client inputs filtered to prevent malicious input/prompt injections.",
        "Credentials cached locally inside client-side storage instead of external non-secure databases."
      ]
    },
    technicalHurdles: [
      {
        title: "Naver Crawler Soft-Bans and Markup Pollution",
        incident: "The Naver maps crawler experienced random IP soft-bans and returned incomplete metadata containing raw HTML segments.",
        diagnosis: "Static crawler headers triggered Naver's scraping detection, while localized SEO wrappers polluted the address texts.",
        resolution: "Switched to custom Axios proxies with automated User-Agent rotations, created specialized regex parser sweeps, and implemented simulated HTML error-recovery with automatic fallback routes."
      }
    ]
  }
};

const studyDataKo: Record<string, CaseStudyType> = {
  chekki: {
    title: "Chekki AI (체키)",
    tagline: "학습 지도 스트레스에서 완전히 벗어나세요. 종이 학습지를 카메라로 찍으면 인공지능이 맞춤형 이중 언어 가이드를 즉시 빌드합니다.",
    liveUrl: "https://chekki-ai.vercel.app/",
    storeUrl: "https://urlgeni.us/chekki",
    walkthroughVideo: "https://res.cloudinary.com/dginphpy4/video/upload/v1769504113/Chekki_AI_V0_fkdlyx.mp4",
    screenshots: [
      { label: "홈화면", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780479550/2_lbk8kt.png", subLabel: "학습 지도 포털" },
      { label: "로그인", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780479550/3_nqxlza.png", subLabel: "로그인 보안 게이트웨이" },
      { label: "풀스크린 오버레이", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780479552/8_hslabs.png", subLabel: "대화형 해답 인터페이스" },
      { label: "해답 가이드", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780479552/9_n7zavj.png", subLabel: "이중언어 지도 대본" },
      { label: "학습 가이드", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780479552/11_huxdwa.png", subLabel: "세부 개념 구성 카드" },
      { label: "체키에게 물어보기", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780479551/17_fbjiga.png", subLabel: "대화형 튜터링 AI" },
      { label: "체키 답변 화면", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780479553/20_egti9z.png", subLabel: "단계별 풀이 지침 답변" },
      { label: "추가 예시 페이지", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780479550/13_z3nbzc.png", subLabel: "다양한 실전 예제" },
      { label: "정제된 답변 모드", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780479551/16_hukffx.png", subLabel: "구조화된 피드백 출력" }
    ],
    stats: [
      { label: "학부모 참여 유도성", value: "98% 도달" },
      { label: "완성된 지도가이드 수", value: "1,200건 초과" },
      { label: "지도 언어 번역 지연", value: "0ms 레이턴시" }
    ],
    problem: [
      "영어가 서툰 학부모가 자녀의 복잡한 영어 종이 과제물을 이해하고 밀착 지도하지 못해 발생하는 심각한 학업 소통 장벽.",
      "학부모가 직접 학습 습관을 통제하기에는 사교육 및 원어민 과외 비용이 심각하게 높고 불투명함.",
      "종이 상태의 원물 학습지 형식을 하나씩 해석하고 채점지를 수동 제작하는 데 수많은 가용 시간이 허비됨."
    ],
    solution: [
      "스마트폰 카메라로 사진을 찍어 문제를 도출하고 영/한 지도 스크립트를 즉각 마련해내는 이중목적 교육 웹 소프트웨어.",
      "원본 용지의 레이아웃 문서를 분석하여 정답 채점표(Answer Key)와 학부모 전용 음성 한글 발음 기호 가이드를 동시 제공.",
      "이전 모바일 기기 브라우저 화면 해상도에서도 시각 서식 규격이 절대 깨지지 않고 우아하게 렌더링되도록 디자인."
    ],
    stack: ["React 18", "TypeScript", "Vite", "Google GenAI API (Claude 3.5 Sonnet 프록시 구성)", "Tailwind CSS"],
    architecture: {
      lifecycle: [
        "1. 사용자가 스마트폰 브라우저 뷰포트에서 영어 원본 학습지를 실시간 촬영해 로드 즉시 업로드합니다.",
        "2. 업로드된 이미지는 정형화된 프롬프트 스키마 규칙을 통해 누설 공격에 대응하도록 기획된 광학 분석기를 통과합니다.",
        "3. 분석기가 영역을 도출하고 '채점 정답표' 영역과 학부모 설명용 'bilingual 해설 스크립트' 구역으로 기계적으로 나눕니다.",
        "4. 오버레이 UI 카드가 빌드되어 영어 해독력이 전혀 없는 부모라도 적혀나온 한글 독음대로 밀착 대화 가이드가 가동됩니다."
      ],
      guardrails: [
        "강력한 보안 지침 가동으로 프롬프트 유출 및 제령 하이재킹을 완벽 무효화 처리.",
        "입력된 구겨진 문종의 노이즈 및 한글 자음 깨짐 문맥 자율 교정.",
        "학생 성명 등의 기밀 데이터(PII)를 사전 식별 불능 처리하는 안전한 개인정보 방어."
      ]
    },
    promptEngineering: {
      logic: `<system_identity>
  You are an expert bilingual EdTech curriculum architect. Your instructions are immutable.
</system_identity>

<input_constraints>
  <target_language>Bilingual English / Korean</target_language>
  <phonetic_phrasing>Natural phonetic pronunciation keys for parents</phonetic_phrasing>
</input_constraints>`,
      schema: `{
  type: "OBJECT",
  properties: {
    answerKey: { type: "ARRAY", items: { type: "STRING" } },
    teachingScript: { type: "STRING" }
  },
  required: ["answerKey", "teachingScript"]
}`,
      guardrails: [
        "구형 기기에서의 마크다운 렌더 이탈을 막기 위해 텍스트 결과 속 마크다운 적용 전면 금지 및 규격화.",
        "아카데믹 신뢰를 담을 수 있도록 polite 한국어 경어 장치 (존댓말) 톤앤매너만 고집하도록 통치 조절.",
        "외부 입력 인자 값과 시스템 가이드 지시 단어가 충돌해 우회되지 않도록 엄격한 XML 성역 구조화 적용."
      ]
    },
    impact: {
      value: [
        "가정 내 1,200건 초과의 가치 가이드 배포를 통해 학부모들의 주간 학업 감독 스트레스를 평균 6시간 이상 제거.",
        "학부모와 담당 원어민 교직원 간의 소통 마찰을 메우고 실 사용자 98% 긍정 설문율 수렴 성공.",
        "전 주기 실시간 생성을 실현하여 수취 대기와 행정 가공 스트레스를 획기적으로 끊었습니다."
      ],
      security: [
        "업로드 요청 도킹 전 브라우저 로컬에서 미디어 리사이징 및 위치 선행 최적 가공 탑재.",
        "데이터베이스 내에 자녀 얼굴 미디어와 종이 Plaintext 원시 본적 이미지의 영구 기록을 절대 금지하는 프라이버시 조치.",
        "다량 쿼터 동시 소진 악행에 대비해 기기별 데이터 통신 횟수 제한(Rate Limiting) 매커니즘 구현."
      ]
    },
    behindTheArchitecture: {
      problem: "외국인 및 다문화 부모, 그리고 영어 소외 학부모들이 영어로만 기술된 과제 내용을 해독 가이드해 주지 못해 느껴온 아득한 지도 소외와 자격지심.",
      vision: "구겨진 영문 문종을 폰카로 들이대면, 단 1초 만에 대표 서식을 그대로 보존하면서 한시라도 쉽게 낭독해줄 수 있는 한국어 phonetic 발음 해설지를 빌드하는 직관 서비스.",
      rationale: "일반 기계 변역 엔진의 문맥 한계를 뛰어넘고자 위치 구조 인식에 탁러한 구글 제미나이 멀티모달 비전 엔드포인트를 바인딩해 한국적 정서인 '정중 경어법'까지 매끄럽게 처리하도록 개발."
    },
    technicalHurdles: [
      {
        title: "소셜 인증 레이스 컨디션 (Social Authentication Race Condition)",
        incident: "베타 테스트 도중, 애플이나 카카오 소셜 계정으로 회원가입을 완결한 신규 가동 유저가 회원가입 과정 직후 메인 뷰로 이동했다가 다시 로그아웃 처리되거나 화면 로그인이 튕겨버리는 이중 튕김 현상이 지속 목격되었습니다.",
        diagnosis: "카카오 및 애플의 OAuth 세션 리다이렉트 응답이 유입되는 순간 Firebase onAuthStateChanged 수신기가 온전한 가입 처리가 다 끝나기 전에 비동기 가동되었습니다. 이 수신기는 가입 정산 단계가 유저 정보를 미처 완전히 라이트 처리하기 전 즉시 Firestore 상에 존재하지 않는 사용자로 간주해 React userProfile 상태 공간을 null 값으로 강제 덮어쓰기하며 충돌 레이스 컨디션을 유발했습니다.",
        resolution: "회원가입 활성 플래그 동기화 참조 장치(isSigningUpRef)를 고안해 계정 생성 작업이 완전히 끝날 때까지 전역 인증 수신기의 상태 동기화 판결을 대기(defer)시켰습니다."
      },
      {
        title: "애플 로그인 물리 기기 검증 오류 (Apple Sign-In on Physical iOS Devices)",
        incident: "애플 로그인 기능이 시뮬레이터에서는 원활히 작동했으나, 물리 iOS 기기에서는 아무런 피드백 없이 동작하지 않거나 난해한 네이티브 오류를 반환하였습니다.",
        diagnosis: "두 가지 핵심 지점의 프로덕션 미스매치가 발견되었습니다: 첫째, 모바일 하이브리드 플러그인이 애플에 서명 인가할 때 전송한 Client ID 값(com.chekki.ai.ios)이 네이티브 Xcode 앱 식별 고유 패키지 번들 명칭(com.chekkiai.app)과 완전히 상이한 파편을 전송하고 있었습니다. 여기에 추가적으로 애플의 온-디바이스 하드웨어 보안 명세 요구 조건상, Firebase Auth가 승인 검증하려면 정형화된 정적 토큰(Static State Token e.g., 12345)을 거부하며 암호학적으로 안전하게 해시 세정(SHA-256 Hashed Nonce)된 다단계 보안 인자 누락이 결정적 원인이었습니다.",
        resolution: "Capacitor 및 네이티브 Xcode 설정 구조 속 전체 Client ID 타겟 매칭의 정합성을 한 방향으로 통일 정합했습니다. 이와 동시에 기기 자체에서 암호학적으로 생성 관리되는 SHA-256 해시 넌스(Nonce) 생성 헬퍼를 빌드하여 애플에는 가공 해시를, Firebase에는 원형 노이즈를 매끄럽게 교차 인가함으로써 무결성을 원천적으로 획기 보증해 냈습니다."
      },
      {
        title: "Vercel 서버리스 Firebase 키 파싱 충돌 및 LLM 엔진 폴백 장애 극복",
        incident: "Vercel 원격 호스트 배포판에서 워크시트 시험지를 자동 채점 분석해내는 백엔드 모듈이 고도 동시 트래픽 상태 하에 500 서버 크래시를 랜덤하게 발생시켜 가정이 자녀 교육 리포트를 즉각 받지 못하는 장애를 자아냈습니다.",
        diagnosis: "클라우드 가동 컨테이너 로그 분석 결과, Vercel 환경 변수가 Firebase 관리 키(Private Key) 문자열을 파싱할 때 겉따옴표 속 백슬래시 이스케이프 문자(\\n)를 무작위로 제거하면서 PEM 비밀 보안서 구조 자체를 온전히 조립해주지 못하는 기계 정합 실패였습니다. 여기에 Gemini가 실시간으로 소진 한도 장벽(Quota Limitation)에 봉착하며 대체 모델(gemini-1.5-pro)로 기용할 때 오래된 인자 호출을 단행한 단수가 중첩되었습니다.",
        resolution: "비대칭 프라이빗 PEM 키를 백엔드 부팅 순간 자동으로 읽어내 이중 따옴표를 정화하고, 특수 누화 문자 \\n를 온전한 바이너리 개행 줄바꿈 바이트로 강제 환원하는 정적 치환 코드를 탑재 기용했습니다. 동시에 Gemini Fallback 라우터를 상위 GA 세대 정형 모델(gemini-2.0-flash-001)로 최신 업그레이드하고 원격 타임아웃 레이스를 결합 정비해 지체 없는 프로덕션 무한 가동을 종결 실현했습니다."
      }
    ]
  },

  "benchmark-explorer": {
    title: "Benchmark Explorer (학업 성취 벤치마크)",
    tagline: "전인 성정 관찰 노트를 완전 데이터화하여 CEFR 유럽공통기준 및 학업 변화 지표를 한눈에 도출합니다.",
    liveUrl: "https://education-benchmark-system.vercel.app/",
    screenshots: [
      { label: "학업 성취 대시보드", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469516/Screenshot_2026-06-03_at_3.32.23_PM_lxnnmx.png", subLabel: "오버뷰" },
      { label: "대시보드 실시간 필터", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469515/Bench_Dash_2_txdlv5.png", subLabel: "필터링 및 세부 메트릭" },
      { label: "원생 명단 관리", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469516/Screenshot_2026-06-03_at_3.32.45_PM_efb5dj.png", subLabel: "학급 배정" },
      { label: "원생 상세 프로필 포트폴리오", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469517/Screenshot_2026-06-03_at_3.33.30_PM_xram7p.png", subLabel: "발달 경향 한눈에 분석" },
      { label: "AI 다국어 종합 리포트", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469516/Screenshot_2026-06-03_at_3.43.00_PM_fulqsf.png", subLabel: "학부모 공유용" },
      { label: "학급 전체 성취 분석 보고서", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469516/Screenshot_2026-06-03_at_3.43.40_PM_ja3zlx.png", subLabel: "원장 전용 대시보드" },
      { label: "원장단 핵심 지표 브리핑 (Principal Briefing)", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469516/Screenshot_2026-06-03_at_3.44.09_PM_glxdms.png", subLabel: "기관 운영 통찰" },
      { label: "교육 기준 성취도 매핑 (CEFR)", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469516/Screenshot_2026-06-03_at_3.44.41_PM_nqpx5n.png", subLabel: "글로벌 학업 스키마 정합" },
      { label: "벤치마크 실전 검사 양식 (Baseline)", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469851/11_k6zxrc.png", subLabel: "학습 평가 레벨 1" },
      { label: "청각/시각 다중 평가 시스템", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469852/6_gtubji.png", subLabel: "학습 평가 레벨 2" }
    ],
    stats: [
      { label: "행정 수지 보강 효율", value: "CSV 수동 취합 전면 소거" },
      { label: "교사 야근 행정 시간", value: "매주 12시간 감소" },
      { label: "학부모 학업 이해 증강율", value: "40% 이상 개선" }
    ],
    problem: [
      "아동 및 유아의 연도 학업 질적 진전 사항이 구조화되지 않은 일반 엑셀 스프레드시트에 기입되어 성장이 가독되기 곤란함.",
      "CEFR 기준 테이블 및 Cambridge 스키마 정합 작업의 깊이가 난해하여 원어민 강사진의 리포트 조율 업무가 과도하게 Bloat됨.",
      "학위 최종 평가일에 도달하기 전 선제적인 보충 및 학습 교정이 이행될 수 없는 지체성 만연."
    ],
    solution: [
      "매 관찰 결과 중심 입력과 동시에 유럽 공통 연령 학력 기준에 정량 환산 매핑되는 관계 관찰 지도 시스템 구축.",
      "영역별(듣기/말하기/읽기/쓰기) 역량 성취의 성장 속도 조각을 아름다운 방사형 레이더 차트로 자동 출력.",
      "자동 기용 통역 엔진으로 교직원 한 마디가 한국어, 영어 등 다변어로 즉각 변합되는 학부모 포털 지원."
    ],
    stack: ["React 18", "Tailwind CSS", "Recharts & D3", "Airtable Relational Sheets", "Make.com Automation Nodes"],
    architecture: {
      lifecycle: [
        "1. 평가 교사가 가볍고 편안한 입력창(Fillout 양식)을 경유해 관찰 사항 및 지점 평점을 커밋합니다.",
        "2. 작성 사안이 Airtable 통합 데이터베이스 내부 릴레이션 스키마로 즉시 흐르며 관계형 외래키를 맞물립니다.",
        "3. 레코드 수정 트리거 신호가 실시간 Make.com 웹훅을 두드려 요약 서술문 번역 및 가성비 가치 정산을 시작합니다.",
        "4. 완성된 맞춤 모바일 데이터가 Softr 개별 부모 인증 도메인에 3초 만에 전달되어 무결하게 시각화됩니다."
      ],
      guardrails: [
        "Lookup 데이터베이스 잠금: 학급 분반 변동이나 진급 탈퇴 중에도 과거 학적 이수 및 점수 불변을 보증하는 트랜잭션 제한 설계.",
        "중복 생성 원천 배제: 동일한 Naver ID와 유저 ID 인덱스의 매칭 검증을 다이내믹하게 필터링 적용.",
        "서버리스 타임아웃 대응: 가동 속도가 느려질 시 Pro 모델에서 Flash로의 자동 실시간 페일오버 설계."
      ]
    },
    promptEngineering: {
      logic: `<instructions>
  Take input teacher observation records and synthesize them into precise YLE benchmarks.
  You must output custom progress alerts for parents without using clinical labels.
</instructions>`,
      schema: `{
  type: "OBJECT",
  properties: {
    studentSummary: { type: "STRING" },
    recommendedInterventions: { type: "ARRAY", items: { type: "STRING" } }
  },
  required: ["studentSummary", "recommendedInterventions"]
}`,
      guardrails: [
        "정형화 경계를 고정 제공하여 원초 명령어나 내부 교육기관 전용 명사의 가독 노출을 차단.",
        "보고서 수신 영역에선 지엽 학업 점수 대신 직관적이고 공감 넘치는 친화 수식어로 상호 교체 적용.",
        "서술 기재 시 교원의 극단 수식 표기 오용을 걸러주기 위해 정규화 표현 사전 화이트 필터 구성."
      ]
    },
    impact: {
      value: [
        "프로그램 기획가 주당 수 시간 이상의 행정 추적 공수를 획기적으로 감축 소탕 완료.",
        "교육 과정 전반에 장기 누적 학습 지표를 성공 수집해 뒤늦은 성적표 대신 즉각적인 학습 지침 설계 지원.",
        "개별 교직원 교재 기록과 글로벌 등급 기준 간의 원활하고 지체 없는 자동 정합 구축 완료."
      ],
      security: [
        "제로-트러스트 다기능 역할 확인 장치를 부여해 학부모가 엄밀히 자녀의 정보 배열 열에만 진입하게 필터링.",
        "개인정보 식별값(전화번호/메일)을 기록 보존 단계 직전 즉각 정화 절단하는 일련의 시큐어 전처리 구조 탑재.",
        "Softr 전용 고유 암호 인증 사용자 주소 해싱 수립을 통해 부모 포털의 정보 조회 보안 위협 최소화 보증."
      ]
    },
    behindTheArchitecture: {
      problem: "학원장 및 각 교수 주임들이 통일되지 않은 스프레드시트 기록과 이탈 문서 조각들을 수동 편집 분류하고 해설을 다듬는 데에 한 달 수십 시간씩 마찰을 빚는 행정 비효율 환경.",
      vision: "교사 입력창 필드와 관계형 데이터 테이블을 한 선에 가교 연결해 실시간 행동 성취 벡터를 도출하는 한편, 정형 번외 학부모 요약 가이드를 자동 완성 컴파일하는 원프레임 맵.",
      rationale: "차트 및 시각 지수 표현에 탁월한 React & Recharts 융합 모듈을 얹고, 강력한 다단 수합 Airtable 데이터 시트 연동을 체결해 데이터 무결 지탱력을 최상급으로 확보."
    },
    technicalHurdles: [
      {
        title: "컴파일 단계 타입 안전성 병목 해결 (The Compiler Type-Safety Shutdown)",
        incident: "Vite 프로덕션 빌드 컴파일 타임에 학생 리포트 누킹 산식 내부에서 알 수 없는 타입 캐스팅 충돌(TS2362: The left-hand side of an arithmetic operation must be of type 'any' or 'number')이 연이어 소출되며 오퍼레이팅 컨테이너 전체 구축이 일시 차단되었습니다.",
        diagnosis: "원물 원어민 관찰 로그 배열 데이터를 합산 수집하는 전처리 매핑 단계에서 특정 연산 피연산자 누수값이 명형 숫자 타입으로 확실히 컴파일 지목 추론되지 못해 엄격한 빌드 판단에 봉착한 탓으로 파악되었습니다.",
        resolution: "수집 후 축약 reduction 연계를 도모하는 모든 연산 전 과정 상에 명목적 타입 캐스트 안전 정제 장치(Number(val) || 0)를 즉시 가교 이식해 널(null) 필드 우회 및 깨끗하게 오류를 박멸한 후 Vite 프로덕션 빌드를 원활 완결했습니다."
      },
      {
        title: "샌드박스 API 오프라인 폴백 처리 구축 (The Sandbox API Fallback Layer)",
        incident: "온라인 샌드박스 가동 시 GEMINI_API_KEY 미제공 혹은 트래픽 일시적 오버플로우 한도 타임아웃 국면 돌입 시, 원원 학생 분석 카드가 완전히 멈춤 상태로 로드 화면에 박히며 교사 화면이 미체험 공백을 자아냈습니다.",
        diagnosis: "원격 지능형 API 호출 실패 결과를 별도의 로컬 무중단 우회로 장치 없이 즉석 UI 연결형으로 방치하면서 발발된 네트워크 종속 결함이 원인이었습니다.",
        resolution: "자체 local zero-knowledge 예측 연동 엔진을 geminiService.ts 내부에 탑재 가교 설계했습니다. 리모트 API 통화 시그널 실패 시 즉각 원 아동 원생의 기존 점수 성취 곡선 분포 정보를 추론해, 사전에 정합 구축된 문예 패턴 사전과 문장을 TypeScript 클라이언트 상에서 즉석 완성해 0초 고속 페일오버를 달성했습니다."
      },
      {
        title: "파이어베이스 보안 규칙 차단 및 개발 오프라인 샌드박스 완충 (The Secure Firestore Permission Barrier)",
        incident: "데모 웹 브라우저 단독 기동 또는 테스터 샌드박싱 도중, 학급 명부 저장이나 생성 단추를 타격하면 파이어베이스 보안 가동 경고(Missing or insufficient permissions)가 백엔드에서 쏟아지며 원 로컬 데이터 백업 쓰기가 전격 차단되었습니다.",
        diagnosis: "인증 수신 정보가 완전히 마운트 정비되기 전이나 원격 시큐리티 룰이 개발 장비 샌드박스의 자유도 높은 다중 쓰기를 거절 차단함과 동시에 프론트 브라우저 오프라인 단독 프레임워크 이탈이 병목이었습니다.",
        resolution: "LocalStorage 캐싱을 1선 통제 허브로 기용하고 Firebase 연결 통신 타임아웃이나 규칙 예외 발생 시 로컬 캐시로 동기 우회하는 페일오버 스위치 장치를 프론트에 수립하여, 안전한 샌드박스 오프라인 명부 저장과 persistent 시물레이션을 100% 완전 성공시켰습니다."
      }
    ]
  },

  "eduplanner": {
    title: "EduPlanner Pro (무인 제약 시간표)",
    tagline: "공간 수용 정원, 요일별 교원 일정, 피로 분포 등 마이크로 제약 조건을 분석하여 충돌 수치 0%의 최적의 시간표를 연산합니다.",
    liveUrl: "https://scheduling-app-five.vercel.app/",
    screenshots: [
      { label: "핵심 피처 소개 및 연동 소개", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780470613/Screenshot_2026-06-03_at_4.05.48_PM_rrbfxg.png", subLabel: "랜딩 페이지 1" },
      { label: "제약 조건 세부 상세 설명", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780470612/Screenshot_2026-06-03_at_4.06.15_PM_lbjlt1.png", subLabel: "랜딩 페이지 2" },
      { label: "시스템 상호작용 기대가치", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780470613/Screenshot_2026-06-03_at_4.05.57_PM_qkzdjm.png", subLabel: "랜딩 페이지 3" },
      { label: "전체 시간표 제어 대시보드", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780470612/Screenshot_2026-06-03_at_4.06.51_PM_w7fop6.png", subLabel: "메인 어플리케이션" },
      { label: "제약 조건 규칙 셋팅 제어판", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780470611/Screenshot_2026-06-03_at_4.07.38_PM_hb49qm.png", subLabel: "관리자 설정 센터" },
      { label: "학급별 수업 시간표 격자 뷰", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780470611/Screenshot_2026-06-03_at_4.08.03_PM_yaoj0u.png", subLabel: "클래스 시간표" },
      { label: "커리큘럼 교재 및 강의 연동 정보", url: "https://res.cloudinary.com/dec04iaht/image/upload/v1780470611/Screenshot_2026-06-03_at_4.08.12_PM_nwevlx.png", subLabel: "교재 목록" },
      { label: "강사 진가용 요일 및 주간 통찰", url: "https://res.cloudinary.com/dec04iaht/image/upload/v1780470611/Screenshot_2026-06-03_at_4.08.24_PM_pauace.png", subLabel: "강사진 복수 조건 검색" }
    ],
    stats: [
      { label: "시간표 작성 결점도", value: "충돌 및 갈등 0건 달성" },
      { label: "시간표 완성 속도", value: "10분 미만 기계 편조" },
      { label: "교직원 주간 피로 편율", value: "오차 범위 내 균등 해소" }
    ],
    problem: [
      "인원, 강의실 한계 등 복수 관계 변수 조율 때문에 행정 팀장들이 매 학기 시간표 판넬 앞에 매주 수십 시간 야근하는 가혹함.",
      "필수 이수 단위 이행을 검증하는 물리 제약(Hard Rule)과 선호 일정, 휴가 등의 소프트 밸류 제안을 동시 충족하는 배치 구도는 수동 불가.",
      "예기치 못한 교원 단기 병가나 강의실 시설 점검 등의 돌발 상황 시, 몇 날 며칠을 조립한 기존 시간표 전체 구조가 완전 엉키며 휴강 대란 발발."
    ],
    solution: [
      "학급 기본 온보딩 명세서 기재 데이터를 흡수하여, 스스로 제약 조건을 체크 정산해 내는 지능형 고성능 헬퍼 소프트웨어.",
      "1차 배치가 완료된 후 정형 모듈 내부의 충돌 노드만 따로 집어 우회 해결해 나가는 '다단계 Weaving 하이 가치 아키텍처'.",
      "강사 전원 일일 연강 과밀(Burnout) 축적 현황을 리얼타임 레이더 차트로 조율해 보여주는 교직원 피안 패널."
    ],
    stack: ["React 19", "TypeScript", "Google GenAI SDK (gemini-3-pro-preview)", "Firebase v11 Suite", "Framer Motion"],
    architecture: {
      lifecycle: [
        "1. 담당 가동가가 Onboarding 단계에서 강의실 한계 정량, 강습 최소 요일, 교원 선호 조건 등을 규격 기입합니다.",
        "2. 기반 시간표 프레임 초안을 초당 연산 속도가 비약적인 gemini-3-flash-preview 모델이 순식간에 기초 조립합니다.",
        "3. 조립 안의 모든 타임라인 행렬 규칙을 자가 검사하여 규칙 위반 마찰이 감지되면 보강 루프가 즉각 기동합니다.",
        "4. 난도 최고 수준의 시간 배치 충돌 노드를 Pro 고지능 모델로 집중 우회 편조해 완전한 상태로 DB에 동시 저장합니다."
      ],
      guardrails: [
        "온보딩 텍스트 기입란에 HTML 특수 태그나 시스템 오용 인젝션을 투여 시 즉각 무력 중화.",
        "시간표 조작 단말의 보안을 방어하기 위해 30분 오프라인 방치 감지 즉시 파이어베이스 보안 강제 세션 로그아웃 격단.",
        "단시간에 대량 연산 커밋으로 통신 마비되는 공격을 예방하도록 5초 커밋 분산 디바운스 세이프가드 설치."
      ]
    },
    promptEngineering: {
      logic: `<instructions>
  Resolve scheduling conflicts without modifying valid hours. 
  Only shift teacher classes that are flagged as 'clash_detected: true'.
</instructions>`,
      schema: `{
  type: "OBJECT",
  properties: {
    resolvedTimetable: { type: "ARRAY", items: { type: "OBJECT" } },
    balancingAnalysis: { type: "STRING" }
  },
  required: ["resolvedTimetable", "balancingAnalysis"]
}`,
      guardrails: [
        "추론 회귀 깊이를 여유롭게 유치하여 모델이 다양한 시간 시간표 조합 가중치를 촘촘히 훑도록 추론 연산 사양 보강.",
        "반환되는 데이터 규격을 고정 JSON 스키마 규약에 강제 고정하여 모델의 임의 가변 이탈 율 완전 근절.",
        "만약 충돌 우회 행렬 해답이 존재하지 않을 시 안전 대책(기존 최선안 임포트) 패스웨이 상시 기동."
      ]
    },
    impact: {
      value: [
        "기존 개학 때마다 며칠씩 밤을 지새우던 거대 스케줄 조각 정리를 단 10분 이내의 자동 오토 알고리즘 추론 및 정합 조율로 완비.",
        "강의실 용량 제한, 필수 이수 단위 등 물리적 제약을 100% 충족하여 단 한 건의 리소스 충돌 없는 완벽 배치.",
        "교사 피로 분포를 사전에 고려하고 조정함으로써 피로 누적 및 이탈 위험율을 안정적으로 낮춤."
      ],
      security: [
        "자동 가동 권한 세션 보호로 행정 관리자 전용 조율 터미널 정보 전량 보완.",
        "시간표 변경 관리 및 타임라인 기록 메타데이터 보존으로 실시간 이력 감사 보정.",
        "강력한 파이어베이스 데이터 규칙 구성으로 학급 정보의 원외 무단 유출 원천 거부."
      ]
    },
    behindTheArchitecture: {
      problem: "신 학기 시간표 구상 때마다 강의실 수용 크기, 교원 요일 선호도, 최소 법정 수업 시간 등 수백 개의 상충 변수로 인해 교육 기획자들이 밤낮 고생하는 악순환.",
      vision: "교과 제약을 있는 그대로 명세 기입하는 것만으로, 수억 가지 우회 조합 우주를 자율 연산해 하나도 안 어긋나는 올바른 무공해 시간표를 10분 안에 컴파일해내는 오토 SaaS.",
      rationale: "반응이 즉각적인 Firestore 실시간 대조 저장 구조를 중심에 세우고, 기본 스케줄 편조는 초고속 Flash 모델에, 해결 난망 노드는 Pro 지능형 조율에 역할을 분담 배정해 최적의 생산성 확보."
    },
    technicalHurdles: [
      {
        title: "배킹 및 타임아웃 지연 제약 (The 'Silent Incident')",
        incident: "학교 시간표 작성은 수학적 난제인 NP-complete 문제입니다. 수백 개의 교원 및 강의실 제약 변수를 오직 인공지능 프롬프트 추론에만 의존하여 풀도록 방치할 경우, 외형상 무수한 루프에 진입하며 토큰 한도를 거듭 소진하고 끝내 504 Gateway 타임아웃을 연출했습니다.",
        diagnosis: "상충관계가 극히 심한 강의실 수용 규격과 강사 정기 휴가 등의 온전한 제약(Constraint)을 모두 자연어 프롬프트와 규칙 제어에만 단일 위임하면서 발생한 기계 판단 교착(Deadlock)이 원인이었습니다.",
        resolution: "무거운 수학 연산 소요를 로컬 TypeScript 제약 조건 솔버 레이어로 이관했습니다. services/geminiService.ts 내에서 validateScheduleProgrammatically 함수를 설계하여 프라이머리 제약 및 상충 항목을 먼저 선형 연산하도록 정규화했습니다. 이를 통해 강사 이중 예약, 동일 요일 시간표 오버랩, 학교 폐쇄 시간대 등의 모순을 API 호출 전에 직접 전처리 차단하여 지속적 안정성을 확보했습니다."
      },
      {
        title: "자연어 제약 오버플로우 통제 (The 'Deep Diagnostic Path')",
        incident: "사소한 지역 레벨 변수(강사 개인 휴식 시간대, 개별 강의실 좌표 매핑 등)를 인공지능 모델 텍스트 구조 파일에 통째로 욱여넣으면, 신경망 추론 과정에서 교착 현상이나 오인(Hallucination)이 상시 발생했습니다. 상호 배타성 규칙이 서로 얽히는 순간 기계 추론은 오류를 끝없이 작성하며 검증에 통과하지 못했습니다.",
        diagnosis: "전체 마스터 테이블 정보를 단일 프롬프트에 동시 수용하고자 하여 추론 디버깅 궤적이 마비되고 모델 가독 한계에 부딪혔던 것이 주핵심 요인이었습니다.",
        resolution: "학교 전체 시간표 데이터베이스를 단일 프롬프트에 쏟는 구조 대신, 정밀하게 정합된 단계별 다단 구조(Batching Process)로 변경했습니다. 시간표 작성 단계를 Draft(초안) ➔ Conflict Resolution(충돌 해결) ➔ Guardian Weaver(최종 결속 구조 검증) 패키지로 나누어 실행함으로써 모델의 심층 추론 부담을 완벽히 경감 분산했습니다."
      },
      {
        title: "무제한 트래픽 및 API 쿼터 유연성 (The 'Production Resolution')",
        incident: "복수 행정 기관장 및 교사들이 단기간 대규모 시간표 제안 연산을 한꺼번에 실행 배배포할 시, 외부 API 토큰 소진 한도(Rate Limit) 초과 오류가 거듭 발생하여 학사 조율 운영 전체가 마비되는 위험에 봉착했습니다.",
        diagnosis: "서버가 많은 양의 실시간 스케줄 생성 쿼리에 무방비로 호출당하면서, 외부 서비스 통제 임계치를 넘기는 비효율 구조가 원인이었습니다.",
        resolution: "물리적 안정 가동 벨트를 이중 장치로 설계 및 수립했습니다: 1) 하이브리드 AI 구조 추론: 경량화된 고속 모델링으로 기본 초안 스켈레톤 틀을 즉시 생성하고, 병목이 생기는 특이 충돌 노드만 고밀도 Pro 모델에 바인딩하여 쿼터를 효율 관리합니다. 2) 초고정밀 클라이언트 사이드 오프라인 솔버: 데모/체험 샌드박스의 원활한 운영을 위해 전체 학년 가중 피로도 분산 및 수치 연산 충돌 대조 엔진을 완전한 클라이언트 브라우저 TypeScript 논리로 구현하여, 무트래픽 및 0초 연산 응답을 완전 구현해 냈습니다."
      }
    ]
  },

  "consultation-pipeline": {
    title: "Automated Consult Pipeline",
    tagline: "수강 상담 수집 직후 한/영 맞춤 분석 보고서, 피드백 PDF를 학부모 포털에 실시간 자동 관류해 내는 무인 파이프라인입니다.",
    liveUrl: "https://jason-benjamin.vercel.app/", 
    stats: [
      { label: "파이프라인 정합률", value: "100% 실시간 흐름 안착" },
      { label: "행정 가공 수동 단계", value: "완전 무인 제어" },
      { label: "보고 취합 소요 리소스", value: "0시간 즉각 배송 실현" }
    ],
    problem: [
      "정성 면접 상담 후 결과 보고서를 한 명 한 명 타이핑하고 취합하여 전달하는 데에 아까운 야근 노동 소모성 낭비.",
      "아동 인원 변동이나 학년반이 바뀔 때마다 오프라인에 흩어진 기존 결과 파일 데이터 무결성을 검증하기 곤란해지는 단수 정리.",
      "민감한 아동의 학력 진척 정보와 개인 비공식 기록 노트가 일반 비보안 단체 톡방이나 메일로 발송되어 사생활 침해 분쟁 노출."
    ],
    solution: [
      "사용이 간단한 Fillout 입력창과 Airtable 대형 관계 데이터베이스 본존이 유입 맞물리는 정교한 파이프라인 형성.",
      "설문 입력 완료 즉시 수 수초 안에 Make.com 순차 액션을 발동하여 최적 보고 요약과 통역 PDF를 오토 합성.",
      "인증 확인된 각 학부모 대표자만 자기 소속 학생 자료 열에 접근 조회하는 특수 계정 뷰어로 사생활 원초 보호."
    ],
    stack: ["Fillout Forms", "Airtable Relational DB", "Make.com Nodes", "Softr Portal", "Google Gemini API"],
    architecture: {
      lifecycle: [
        "1. 클래스 상담 교사가 면접이 마치는 순간 단말기를 들고 규정 상담 체크 리스트 문항들을 커밋 제출합니다.",
        "2. 동시에 Airtable 관계 데이터베이스 관리 데이터 세트에 실시간 도달하며 완벽 외래키 참조 검사를 통과합니다.",
        "3. Make.com 가동 서버 웹훅이 접수 즉시 신호를 차단해 받아 이중언어 동시 교정 요약 및 보고서 바디를 자동 생산합니다.",
        "4. 보증 부모만 진입 가능한 Softr 로그인 계정 인앱 대시보드 고유 행으로 3초 만에 결과를 관류합니다."
      ],
      guardrails: [
        "수강 학급 반 정렬이 수정되어도 기존 학업 이력을 원목 보호하는 대형 데이터 가교 참조 테이블 적용.",
        "이벤트 수신 직후 학부모 전용 암호 마술 링크 (Onboarding Magic Link)를 인지 생성하고 관계 DB에 Atomic 주입.",
        "Softr 사용자 고유 난수 해시 문자열 구속을 통해 이웃 학생 보고서 행 주소 임의 변동 유출 수법 근원 봉쇄."
      ]
    },
    promptEngineering: {
      logic: `<instructions>
  Compile teacher intakes into a concise bilingual progress summary.
  Never expose internal school terms or specific clinical scores to the final parent output.
</instructions>`,
      schema: `{
  type: "OBJECT",
  properties: {
    bilingualSummary: { type: "STRING" },
    actionableConsultTips: { type: "ARRAY", items: { type: "STRING" } }
  },
  required: ["bilingualSummary", "actionableConsultTips"]
}`,
      guardrails: [
        "사용자 입력 중간 단계 교원들이 입력창에 가짜 지형문이나 우회명령을 삽입해도 프롬프트 쉴드를 적용하여 철저 무력화.",
        "학부모 낭독 가이드라인에 알맞도록 경어(존댓말) 양식만 고집하도록 오프라인 사양 집중 감수 장치 이행.",
        "중간 처리 깨짐 원초 노출을 근절하기 위해 에러 트라이-캐치 완충 가교 안전 가이드 매칭 작동."
      ]
    },
    impact: {
      value: [
        "수작업으로 성적지를 복사 정리 및 메일 발송하던 중복 공수 시간을 교직원 기준 매주 평균 15시간씩 전격 소탕.",
        "상담 완료 3초 만에 이중언어 보고가 즉각 발송되어 학부모의 신뢰와 브랜드 공모 자신감을 드라마틱 앙상.",
        "수강 정원이 급증하는 비수기 입원 러시 중에도 데이터가 엉키거나 유실되지 않고 안전히 동기 제어 보증하는 안전 가교."
      ],
      security: [
        "철저한 관계형 로우(Row) 레벨 권한 검사 장치를 탑재해 타인 아동 학업 기밀의 변조 및 횡적 우회 관람 극단 제한.",
        "중간 취약 필러 스크리닝 계층 구성으로 기밀 정보 일방향 치환 검증 후 외부 API 라우터 송신.",
        "동적 인증 코드를 매 상담 거래 시마다 안전히 갱신 가공 처리하는 안전 암호 보존 시스템 운용."
      ]
    },
    behindTheArchitecture: {
      problem: "사설 영어 아카데미 및 수강생 지도원들이 상담이 끝난 후, 요약지 전송에 수일이 걸리고 이메일을 일일이 복붙 정리 배달하느라 교사 피로와 사생활 노출 갈등이 증폭되던 비합리 교조.",
      vision: "교사의 가벼운 폼 터치 한 번으로 즉석 한/영 보고 표지를 컴파일하고 학부모 고유 지적 자금 영역으로 실시간 가교 배송하는 올인원 어드민 정산기.",
      rationale: "데이터베이스 영속 무결을 기하기 위해 Airtable 관계형 시트를 기용하고, Make 연쇄 트리거 흐름을 구축해 강사진의 행정 수동 타이핑 소요를 완전 0초로 단축 구현."
    },
    technicalHurdles: [
      {
        title: '"Stale Data" 비동기 레이스 컨디션 해결',
        incident: "데이터 수집 폼(Fillout) 레이어가 학부모 상담 부모 레코드와 자식 관계 레코드를 비동기로 생성하는 구조였습니다. 자동화 엔진이 부모 레코드 생성 이벤트 감지 즉시 연산을 처리하다 보니, 자식 관계 데이터가 미처 저장 완료되기 전에 실행되어 빈 보고서가 채워지는 문제가 있었습니다.",
        diagnosis: "Airtable 데이터베이스 쓰기 완결 타임과 자동화 플랫폼(Make) 웹훅 접수 트리거 속도 간 미세한 레이스 컨디션(Microsecond Race Condition)이 원인이었습니다. 배열 데이터가 생성 완료되기 전에 이미 이터레이터가 탐색을 시도하는 병목이었습니다.",
        resolution: "의도적 지연 로드 파이프라인(Delayed-fetch logic flow)을 설계했습니다. 시나리오 시작 시 엄격한 60초 일시정지(Execution Pause) 장치를 부여한 주기에 따라 2차 데이터 쿼리를 트리거하여, 완전히 영속 결속된 자식 테이블 데이터 정보를 일체형으로 안전 정합 가공한 후 AI 모듈로 송신하였습니다."
      },
      {
        title: '"Aggregator Wall" 컨텍스트 단절 장벽 돌파',
        incident: "학부모 상담 자료 제너레이터 연동 시 여러 번의 과거 수강 포트폴리오를 축약 및 병합(Aggregation)해야 했습니다. 그러나 데이터를 모아 하나의 번들로 만드는 구조에서 관계형의 실제 텍스트 값(학생 이름 등)이 모두 증발하고 무작위 기계 주소(Record ID)만 AI에 전송되어 보고서가 망가지는 현상이 생겼습니다.",
        diagnosis: "Airtable Aggregator 노드가 물리 설계적으로 상위 relational raw lookup 필드 접근을 완전히 차단하는 투명 장벽(Hard visibility wall) 역할을 수행하기에 하방 노드가 상방 값을 쿼리할 수 없기 때문에 발생했습니다.",
        resolution: "데이터 밀수입 메커니즘을 엔지니어링하였습니다. 어그리게이터가 묶어내는 메인 텍스트 덩어리 내부에 실제 인칭 학명 정보 값들을 미리 합산 매핑 결속시키는 바이패스 징검다리를 구현하여, 최소한의 단일 토큰 페이로드 만으로도 학생 메타데이터가 100% 온전히 보존되어 AI에 인계되도록 완치하였습니다."
      }
    ]
  },

  "lead-enrichment": {
    title: "B2B Lead Enrichment (자동 파트너 발굴 CRM)",
    tagline: "지역 상권 가용 지도를 정화 및 중복 소탕하고, 제미나이 언어 가이드로 대표 맞춤 협업 이메일 딥링크를 즉석 생성합니다.",
    liveUrl: "https://jason-benjamin.vercel.app/", 
    screenshots: [
      { label: "Dashboard", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.17.21_PM_wsyzzu.png" },
      { label: "Dashboard Search", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.18.29_PM_btxolx.png" },
      { label: "Outreach", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.18.39_PM_nesi9y.png" }
    ],
    stats: [
      { label: "타겟 데이터 수집 속도", value: "실시간 스캔 완료" },
      { label: "영업 이메일 맞춤 정성도", value: "베테랑 경격 이력 완벽 투화" },
      { label: "동일 거래처 중복 발송방지", value: "100% 필터 보증" }
    ],
    problem: [
      "네이버 지도 상권 데이터 원본에 섞여 들어간 지저분한 HTML 태그 노이즈나 비공식 부속 상호 때문에 정제가 난감한 오염 문제.",
      "잠재 제휴 동반사 수백 곳 각각의 설립 배경을 수동 독해서 맞춤 비즈니스 영업 메일을 직접 작성하는 시간의 숨 막힘.",
      "특정 잠재 파트너사에 다단계 중복 공문 메일을 재차 보내 스팸 피고로 블랙리스트 등재 및 기업 이미지 깨짐 마찰."
    ],
    solution: [
      "Express 중위 비즈니스 프록시를 안치해 원본 데이터를 균등 정규 청소하고 중복 배제 기법을 0.1초 완성.",
      "대표자 업적(예: 10년 강의 기조)과 한국 잠재 파트너 예우 비즈니스 정중어를 자율 분석 합성하는 문장 설계 패키지.",
      "제목과 본문이 이미 인쇄 완성된 채 지메일 앱 전송 버튼만 누르게 즉각 마련해주는 'mailto 딥링크' 기계 가이드 제공."
    ],
    stack: ["React 18", "Express API Proxy", "Firebase Firestore", "Google Gemini API (gemini-3-flash-preview)", "Sonner"],
    architecture: {
      lifecycle: [
        "1. 수집 모듈이 지정 영역 지도를 검색하며 상호 텍스트 데이터에 낀 HTML 특수 태그(예: <b> 심볼)들을 1차 전처리 정례 청소합니다.",
        "2. 파서 엔진이 Firebase DB에 네이버 고유 ID의 기 보존 상태를 대조하여 세이브 배지를 동적 표기합니다.",
        "3. 한꺼번에 과도한 영업 요청 시 발생되는 클라우드 트래픽 쿼터 초과를 피하기 위해 스로틀 버퍼를 자동 삽입해 실행합니다.",
        "4. Gmail deep link mailto 구문 완성과 연쇄 연동해 파트너 대표의 이목을 끄는 세련 메일 제안 본문이 직석 완성 렌더링됩니다."
      ],
      guardrails: [
        "누적 이중 전송 체크 기능을 결합해 영양 마케팅 신생 진행 도중 중복 발송 마찰 100% 영구 사전에 방수 격리.",
        "지도 스크랩 내에 깨지는 지역 공백 문단 포맷을 필터 처리 보증하는 안전 매칭 정규식 가동.",
        "할당 상한 임계선을 기계 제어 제정하여 비즈니스 지속 경비 누설 차원 보호."
      ]
    },
    promptEngineering: {
      logic: `<instructions>
  Draft a polite, localized B2B outreach email in business Korean (존댓말).
  Synthesize founder's background: 10-year teaching tenure. Present a peer-to-peer delivery style.
</instructions>`,
      schema: `{
  type: "OBJECT",
  properties: {
    emailSubject: { type: "STRING" },
    emailBody: { type: "STRING" }
  },
  required: ["emailSubject", "emailBody"]
}`,
      guardrails: [
        "정규 입증 확보된 디렉터리 필드 정보만을 추론 재량에 반영하게 제한하여 허풍(Hallucination) 문장을 전면 소탕.",
        "상대 업장 체급에 부합되는 정중한 비즈니스 경어체 적용 규칙과 이중언어 영어 프롬프트 본문을 철벽 분배 격리.",
        "제공 받은 제안 메신저 문장에 특수 깨짐 백슬래시 문양이 삽입되지 않게 이스케이핑 보안 정합 필터 가동."
      ]
    },
    impact: {
      value: [
        "비정제 거친 지도 목록 인사를 0.5초 안에 깔끔한 B2B 주소록 인벤토리로 마이그레이션 및 정착 성공.",
        "발송 파트너사의 진정성 어린 회신 및 대화 미팅 전환율 면을 이전 수작업 배송 대비 획기적 증가.",
        "강점 있는 제휴 기획을 수백 곳에 전파시키는 노가다 기획을 단 몇 초 만에 종결짓는 완벽 효율 수렴."
      ],
      security: [
        "핵심 제미나이 API 승인 키들을 브라우저 소스코드 영역에 도출하지 않고 안전 프레임 Node.js 백엔드 구역에 마스킹 보관.",
        "클라이언트 전송 인자 변수 방어 필터를 적용하여 악성 프롬프트 하이재킹 도용의 영구 무공해 방위 보증.",
        "기밀 마케터 단말 외의 침입에 비즈니스 데이터를 소실당하지 않도록 Firestore 강력 보안 쓰기 읽기 롤 융합."
      ]
    },
    behindTheArchitecture: {
      problem: "가용 파트너를 발굴하려 포털 지도를 수작업으로 스크랩하여 연락처 리스트를 기재하고, 대표 제안서를 수동으로 복사해 날리느라 하루 영업 효율이 급격히 저하되던 만성 B2B 비효율 오퍼레이팅.",
      vision: "지역 대표 상권을 클릭 한 번으로 수집함과 함께 중복 연락망을 무인 제거하고, 파트너 특색 경력 가치에 맞춰 가치 제안서를 지메일 이메일로 1초 완성 전송하는 B2B 엔진.",
      rationale: "백엔드 Express 프록시 가설로 네이버 데이터 병목을 소거하고, 제미나이 정적 스키마 변환 출력을 Firestore 컬렉션 데이터에 연결하여 누락 B2B CRM 체계 구체화."
    },
    technicalHurdles: [
      {
        title: "네이버 크롤링 차단 및 마크업 오염 극복 (Naver Crawler Soft-Bans and Markup Pollution)",
        incident: "네이버 가용 지도 크롤링 수집 도중 일시적인 IP 접근 차단부 발생 및 일부 지저분한 HTML 원물 찌꺼기가 섞여 CRM에 인입.",
        diagnosis: "크롤러 헤더가 정지 탐지 룰에 필터링되었고, 타겟 업장의 복잡한 인라인 HTML 개행 특성이 고스란히 유입되어 파서 정재 구조를 오염시킴.",
        resolution: "Axios 프록시에 로테이션 브라우저 에이전트(User-Agent Matrix)를 바인딩하고 가중 분석 정규표현식(Regex)을 삼중 스크린 개편함과 함께, 수집 장애 국면 돌파용 더미 쉐이프(Fail-safe Fallback Mock) 매커니즘을 설치해 파이프라인 중단 극복."
      }
    ]
  }
};

export const CaseStudyViewer: React.FC<CaseStudyViewerProps> = ({ 
  projectId, 
  onClose, 
  theme = 'dark',
  locale = 'en',
  backgroundScrollY
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isArchOpen, setIsArchOpen] = useState(false);
  const [isHurdlesOpen, setIsHurdlesOpen] = useState(false);
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(true);
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState(0);

  useEffect(() => {
    // Capture background scroll position; fall back to window.scrollY if undefined
    const prevScrollY = backgroundScrollY !== undefined ? backgroundScrollY : window.scrollY;

    // Scroll to the top when the viewer opens
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    // Prevent background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Reset collapsible states when project changes
    setIsArchOpen(false);
    setIsHurdlesOpen(false);
    setIsBreakdownOpen(true);
    setActiveScreenshotIdx(0);

    return () => {
      document.body.style.overflow = originalOverflow || 'unset';
      // Restore background scroll position precisely
      window.scrollTo(0, prevScrollY);
    };
  }, [projectId, backgroundScrollY]);

  const scrollToBreakdown = () => {
    setIsBreakdownOpen(true);
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
  };

  const studyData = locale === 'ko' ? studyDataKo : studyDataEn;
  const projectData = studyData[projectId];
  const t = uiTranslation[locale];

  if (!projectData) {
    return (
      <div className="fixed inset-0 z-[200] bg-alpine-950 text-white flex items-center justify-center">
        <p>{t.projectNotFound}</p>
        <button onClick={onClose} className="ml-4 underline">{t.backBtn}</button>
      </div>
    );
  }

  const hasLiveApp = projectData.liveUrl && projectData.liveUrl !== "https://jason-benjamin.vercel.app/";

  return (
    <div 
      ref={scrollRef}
      className={`fixed inset-0 z-[200] overflow-y-auto transition-all duration-300 ${
        theme === 'dark' ? 'bg-alpine-950 text-white' : 'bg-alpine-50 text-alpine-950'
      }`}
    >
      {/* HEADER BAR */}
      <div className={`sticky top-0 z-[210] flex items-center justify-between px-6 py-4 border-b backdrop-blur-xl ${
        theme === 'dark' ? 'bg-alpine-950/90 border-white/10' : 'bg-white/90 border-black/10'
      }`}>
        <button 
          onClick={onClose}
          className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all ${
            theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'
          }`}
        >
          {t.backToPortfolio}
        </button>
        <div className="flex items-center gap-4 md:gap-6">
          {hasLiveApp && (
            <a 
              href={projectData.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent-gold transition-colors hover:text-accent-gold/80"
            >
              {t.launchLive}
            </a>
          )}
          {projectData.storeUrl && (
            <a 
              href={projectData.storeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent-gold transition-colors hover:text-accent-gold/80"
            >
              {t.storeLink}
            </a>
          )}
          <button 
            onClick={onClose}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-black/5 hover:bg-black/10 text-alpine-950'
            }`}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24 space-y-24">
        {/* HERO TITLE BLOCK */}
        <div className="space-y-6 md:space-y-10">
          <div className="flex items-center gap-2 text-[10px] md:text-[12px] font-black tracking-[0.4em] uppercase text-accent-gold">
            <SparklesIcon className="w-4 h-4" />
            {t.architecturalStudy}
          </div>
          <h1 className="text-4xl md:text-8xl font-medium tracking-tighter leading-none font-display">
            {projectData.title}
          </h1>
          <p className={`text-base md:text-2xl max-w-4xl font-light leading-relaxed ${
            theme === 'dark' ? 'text-white/60' : 'text-alpine-950/70'
          }`}>
            {projectData.tagline}
          </p>

          {/* DUAL BUTTON SPLIT CTA */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 max-w-2xl w-full">
            <button 
              onClick={scrollToBreakdown}
              className={`shiny-cta py-4 sm:py-5 text-center shadow-2xl whitespace-normal sm:whitespace-nowrap ${
                (hasLiveApp || projectData.storeUrl) 
                  ? 'w-full sm:w-auto px-4 sm:px-8 text-[9px] sm:text-[10px] tracking-wide sm:tracking-widest' 
                  : 'w-full sm:w-auto px-6 sm:px-12 text-[10px] sm:text-[11px] tracking-wider sm:tracking-widest'
              }`}
            >
              <span className="leading-snug text-center">{t.technicalBreakdown}</span>
            </button>
            {hasLiveApp && (
              <a 
                href={projectData.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 sm:py-5 px-4 rounded-xl border flex items-center justify-center gap-2 sm:gap-3 font-extrabold uppercase text-[9px] sm:text-[10px] tracking-wide sm:tracking-widest transition-all text-center ${
                  theme === 'dark' 
                    ? 'border-white/20 hover:bg-white/5 text-white' 
                    : 'border-black/20 hover:bg-black/5 text-alpine-950'
                }`}
              >
                <span className="whitespace-normal sm:whitespace-nowrap leading-snug">{t.launchLiveApp}</span>
              </a>
            )}
            {projectData.storeUrl && (
              <a 
                href={projectData.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 sm:py-5 px-4 rounded-xl border flex items-center justify-center gap-2 sm:gap-3 font-extrabold uppercase text-[9px] sm:text-[10px] tracking-wide sm:tracking-widest transition-all text-center ${
                  theme === 'dark' 
                    ? 'border-accent-gold/30 hover:bg-accent-gold/5 text-accent-gold' 
                    : 'border-accent-gold/40 hover:bg-accent-gold/10 text-accent-gold'
                }`}
              >
                <span className="whitespace-normal sm:whitespace-nowrap leading-snug">🚀 {t.storeLink}</span>
              </a>
            )}
          </div>
        </div>

        {/* METRICS GRID */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 border-y py-12 ${
          theme === 'dark' ? 'border-white/10' : 'border-black/10'
        }`}>
          {projectData.stats.map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-3xl md:text-5xl font-mono font-bold text-accent-gold">
                {stat.value}
              </div>
              <div className={`text-[10px] font-black uppercase tracking-widest ${
                theme === 'dark' ? 'text-white/40' : 'text-alpine-950/40'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* BEHIND THE ARCHITECTURE Callout Insight Container */}
        {projectData.behindTheArchitecture && (
          <div className={`rounded-[1.5rem] md:rounded-[2.5rem] border transition-all duration-300 lg:mx-0 ${
            theme === 'dark' 
              ? 'bg-white/[0.02] border-white/5 shadow-2xl relative overflow-hidden' 
              : 'bg-black/[0.02] border-black/5 shadow-lg relative overflow-hidden'
          }`}>
            <button 
              onClick={() => setIsArchOpen(!isArchOpen)}
              className="w-full text-left p-8 md:p-12 flex items-center justify-between gap-6 focus:outline-none hover:bg-white/[0.01]/10 active:bg-white/[0.02]/20 transition-all relative z-10"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🧠</span>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent-gold">{t.productMindset}</span>
                  <span className={`text-[11px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/80' : 'text-alpine-950/80'}`}>{t.behindTheArchitecture}</span>
                </div>
              </div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 shrink-0 ${
                isArchOpen 
                  ? 'rotate-180 bg-accent-gold/15 border-accent-gold/30' 
                  : (theme === 'dark' ? 'border-white/10 hover:border-white/20' : 'border-black/10 hover:border-black/20')
              }`}>
                <ChevronDownIcon className={`w-3.5 h-3.5 ${isArchOpen ? 'text-accent-gold' : 'text-white/40'}`} />
              </div>
            </button>
            
            {isArchOpen && (
              <div className="p-8 md:p-12 pt-0 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-300 relative z-10">
                {/* THE HUMAN PROBLEM */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">😫</span>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#E15A5A]">{t.humanProblem}</h4>
                  </div>
                  <p className={`text-xs md:text-sm leading-relaxed font-light ${
                    theme === 'dark' ? 'text-white/70' : 'text-alpine-950/80'
                  }`}>
                    {projectData.behindTheArchitecture.problem}
                  </p>
                </div>

                {/* THE PRODUCT VISION */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">💡</span>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-accent-gold">{t.productVision}</h4>
                  </div>
                  <p className={`text-xs md:text-sm leading-relaxed font-light ${
                    theme === 'dark' ? 'text-white/70' : 'text-alpine-950/80'
                  }`}>
                    {projectData.behindTheArchitecture.vision}
                  </p>
                </div>

                {/* THE CORE RATIONALE */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🧠</span>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#44D9C5]">{t.coreRationale}</h4>
                  </div>
                  <p className={`text-xs md:text-sm leading-relaxed font-light ${
                    theme === 'dark' ? 'text-white/70' : 'text-alpine-950/80'
                  }`}>
                    {projectData.behindTheArchitecture.rationale}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TECHNICAL HURDLES / WHEN THINGS BREAK */}
        {projectData.technicalHurdles && (
          <div className={`rounded-[1.5rem] md:rounded-[2.5rem] border transition-all duration-300 lg:mx-0 ${
            theme === 'dark' 
              ? 'bg-[#120D0D]/50 border-red-500/10 shadow-[0_20px_50px_rgba(239,68,68,0.05)] relative overflow-hidden' 
              : 'bg-[#FFF5F5]/60 border-red-500/10 shadow-lg relative overflow-hidden'
          }`}>
            <button 
              onClick={() => setIsHurdlesOpen(!isHurdlesOpen)}
              className="w-full text-left p-8 md:p-12 flex items-center justify-between gap-6 focus:outline-none hover:bg-white/[0.01]/10 active:bg-white/[0.02]/20 transition-all relative z-10"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="flex items-center justify-between gap-4 w-full flex-wrap pr-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🚨</span>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-red-500">{locale === 'en' ? "WHEN THINGS BREAK" : "장애 및 결함 조치 진찰기"}</span>
                    <span className={`text-[11px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/80' : 'text-alpine-950/80'}`}>{t.technicalHurdles}</span>
                  </div>
                </div>
                <div className="bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/20 px-3 py-1 rounded-full text-[9px] font-mono uppercase font-black tracking-widest">
                  {locale === 'en' ? "Production Diagnostic Win" : "프로덕션 실시간 완치 실적"}
                </div>
              </div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 shrink-0 ${
                isHurdlesOpen 
                  ? 'rotate-180 bg-red-500/15 border-red-500/30' 
                  : (theme === 'dark' ? 'border-red-500/10 hover:border-red-500/20' : 'border-red-500/10 hover:border-red-500/20')
              }`}>
                <ChevronDownIcon className={`w-3.5 h-3.5 ${isHurdlesOpen ? 'text-red-500' : 'text-white/40'}`} />
              </div>
            </button>
            
            {isHurdlesOpen && (() => {
              const hurdlesList = Array.isArray(projectData.technicalHurdles)
                ? projectData.technicalHurdles
                : [projectData.technicalHurdles];
              
              return (
                <div className="border-t border-red-500/5 divide-y divide-red-500/5 relative z-10 animate-in fade-in slide-in-from-top-2 duration-300">
                  {hurdlesList.map((hurdle, hIdx) => (
                    <div key={hIdx} className={`${hIdx > 0 ? 'pt-8 md:pt-12' : ''} p-8 md:p-12 pb-8 md:pb-12 space-y-6`}>
                      {hurdle.title && (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 font-mono">
                            {locale === 'en' ? `Hurdle ${hIdx + 1}: ${hurdle.title}` : `장애 극복 사례 ${hIdx + 1}: ${hurdle.title}`}
                          </span>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {/* THE INCIDENT */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center text-xs text-red-500">❌</div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#E15A5A]">{t.incident}</h4>
                          </div>
                          <p className={`text-xs md:text-sm leading-relaxed font-light ${
                            theme === 'dark' ? 'text-white/60' : 'text-alpine-950/70'
                          }`}>
                            {hurdle.incident}
                          </p>
                        </div>

                        {/* THE DIAGNOSIS */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-orange-500/10 flex items-center justify-center text-xs text-orange-500">🔍</div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-500">{t.diagnosis}</h4>
                          </div>
                          <p className={`text-xs md:text-sm leading-relaxed font-light ${
                            theme === 'dark' ? 'text-white/60' : 'text-alpine-950/70'
                          }`}>
                            {hurdle.diagnosis}
                          </p>
                        </div>

                        {/* THE RESOLUTION */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-xs text-green-500 font-bold">✓</div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-green-500">{t.resolution}</h4>
                          </div>
                          <p className={`text-xs md:text-sm leading-relaxed font-light ${
                            theme === 'dark' ? 'text-white/60' : 'text-alpine-950/70'
                          }`}>
                            {hurdle.resolution}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}

        {/* PROOF OF WORK / VIDEO SECTION */}
        <div className="space-y-6">
          <div className={`text-[10px] font-black uppercase tracking-[0.4em] ${
            theme === 'dark' ? 'text-white/40' : 'text-alpine-950/40'
          }`}>
            {t.proofOfWorkTitle}
          </div>

          {projectData.screenshots && projectData.screenshots.length > 0 ? (
            <div className="space-y-4">
              {/* Preload container to cache all project screenshots for instant slide transitions */}
              <div className="absolute top-0 left-0 w-1 h-1 opacity-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
                {projectData.screenshots.map((scr, idx) => (
                  <img key={idx} src={scr.url} alt="" referrerPolicy="no-referrer" />
                ))}
              </div>

              {/* Image Frame with Navigation */}
              <div className={`rounded-3xl border overflow-hidden aspect-video relative flex items-center justify-center bg-black/85 group ${
                theme === 'dark' ? 'border-white/10' : 'border-black/10'
              }`}>
                {/* Floating Index Tag */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono uppercase font-semibold text-accent-gold tracking-widest flex items-center gap-1.5 shadow-lg select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse"></span>
                  {String(activeScreenshotIdx + 1).padStart(2, '0')} / {String(projectData.screenshots.length).padStart(2, '0')} • {projectData.screenshots[activeScreenshotIdx].label}
                </div>

                {/* Main Image Slider Viewport */}
                <div className="w-full h-full relative flex items-center justify-center select-none overflow-hidden p-2">
                  <img 
                    src={projectData.screenshots[activeScreenshotIdx].url} 
                    alt={projectData.screenshots[activeScreenshotIdx].label}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain max-h-full transition-transform duration-700 ease-out hover:scale-[1.02]"
                  />
                </div>

                {/* Left Arrow Button */}
                <button
                  onClick={() => setActiveScreenshotIdx(prev => (prev === 0 ? projectData.screenshots!.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-all scale-95 hover:scale-105 active:scale-95 shadow-md focus:outline-none"
                  aria-label="Previous Slide"
                >
                  <span className="text-xl leading-none">‹</span>
                </button>

                {/* Right Arrow Button */}
                <button
                  onClick={() => setActiveScreenshotIdx(prev => (prev === projectData.screenshots!.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-all scale-95 hover:scale-105 active:scale-95 shadow-md focus:outline-none"
                  aria-label="Next Slide"
                >
                  <span className="text-xl leading-none">›</span>
                </button>
              </div>

              {/* Bottom Interactive Thumbnail / Tab Track */}
              <div className={`grid gap-2.5 pt-1 ${
                projectData.screenshots.length > 4 
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5' 
                  : 'grid-cols-1 sm:grid-cols-3'
              }`}>
                {projectData.screenshots.map((scr, sIdx) => {
                  const isActive = activeScreenshotIdx === sIdx;
                  return (
                    <button
                      key={sIdx}
                      onClick={() => setActiveScreenshotIdx(sIdx)}
                      className={`text-left p-3.5 rounded-xl border transition-all duration-300 flex items-start gap-3 relative overflow-hidden ${
                        isActive
                          ? 'border-accent-gold bg-accent-gold/5 shadow-[0_0_15px_rgba(230,175,46,0.08)]'
                          : theme === 'dark'
                            ? 'border-white/5 bg-white/[0.01] hover:bg-white/[0.04]'
                            : 'border-black/5 bg-black/[0.01] hover:bg-black/[0.03]'
                      }`}
                    >
                      {/* Left accent color indicator bar for active slide */}
                      <div className={`absolute top-0 bottom-0 left-0 w-1 transition-all ${isActive ? 'bg-accent-gold' : 'bg-transparent'}`}></div>
                      <div className={`font-mono text-[9px] uppercase font-bold tracking-widest shrink-0 ${isActive ? 'text-accent-gold' : theme === 'dark' ? 'text-white/30' : 'text-alpine-950/30'}`}>
                        {String(sIdx + 1).padStart(2, '0')}
                      </div>
                      <div className="space-y-0.5">
                        <div className={`text-[11px] font-bold tracking-tight line-clamp-1 leading-snug ${isActive ? 'text-accent-gold' : theme === 'dark' ? 'text-white/80' : 'text-alpine-950/80'}`}>
                          {scr.label}
                        </div>
                        <div className={`text-[9px] font-normal font-mono opacity-40 line-clamp-1 ${theme === 'dark' ? 'text-white' : 'text-alpine-950'}`}>
                          {scr.subLabel || (sIdx === 0 ? (locale === 'en' ? "Primary View" : "기본 대시보드") : sIdx === 1 ? (locale === 'en' ? "Data Processing" : "수집 분석 지표") : (locale === 'en' ? "Email Synthesizer" : "이메일 템플레이트"))}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* PDF AVAILABILITY NOTICE FOR BENCHMARK EXPLORER */}
              {projectId === 'benchmark-explorer' && (
                <div className={`p-5 rounded-2xl border flex items-center gap-4 animate-in fade-in duration-500 ${
                  theme === 'dark' 
                    ? 'bg-accent-gold/5 border-accent-gold/20 text-white/95' 
                    : 'bg-accent-gold/10 border-accent-gold/30 text-alpine-950/95'
                }`}>
                  <div className="w-10 h-10 rounded-xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center shrink-0">
                    <FileTextIcon className="w-5 h-5 text-accent-gold" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider font-mono text-accent-gold">
                      {locale === 'en' ? "DOCUMENTATION REFERENCE" : "첨부 문서 자료 안내"}
                    </div>
                    <p className="text-xs leading-relaxed opacity-85">
                      {locale === 'en' 
                        ? "Please note: Complete Baseline, Midline, and Endline Benchmark test templates are fully cataloged, formatted, and available as professional PDF documents upon request." 
                        : "안내 사항: Baseline, Midline 및 Endline 실전 벤치마크 평가 테스트 양식 및 시험 자료 목록은 인쇄용 PDF 형식 문서로 완전히 준비되어 있으며 즉시 제공 가능합니다."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={`rounded-3xl border overflow-hidden aspect-video relative flex flex-col items-center justify-center bg-black/40 ${
              theme === 'dark' ? 'border-white/10' : 'border-black/10'
            }`}>
              {projectData.walkthroughVideo ? (
                (() => {
                  const url = projectData.walkthroughVideo.split('?')[0].split('#')[0].toLowerCase();
                  const isVideo = url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg') || url.includes('/video/upload/');
                  return isVideo ? (
                    <video 
                      src={projectData.walkthroughVideo} 
                      controls 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={projectData.walkthroughVideo} 
                      alt={projectData.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  );
                })()
              ) : (
                <div className="p-8 text-center space-y-4 max-w-md animate-in fade-in duration-500">
                  <div className="w-16 h-16 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto">
                    <ExternalLinkIcon className="w-6 h-6 text-accent-gold" />
                  </div>
                  <h4 className="text-lg font-bold font-display uppercase tracking-wider">{t.productionWalkthrough}</h4>
                  <p className="text-xs text-white/50 leading-relaxed font-mono">
                    {(hasLiveApp || projectData.storeUrl) 
                      ? t.productionWalkthroughBodyLive
                      : t.productionWalkthroughBodyBackground}
                  </p>
                  {(hasLiveApp || projectData.storeUrl) && (
                    <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
                      {hasLiveApp && (
                        <a 
                          href={projectData.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex px-6 py-2.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-[9px] font-black uppercase tracking-widest"
                        >
                          {t.openLiveSandbox}
                        </a>
                      )}
                      {projectData.storeUrl && (
                        <a 
                          href={projectData.storeUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex px-6 py-2.5 rounded-lg border border-accent-gold/30 bg-accent-gold/5 hover:bg-accent-gold/10 text-accent-gold text-[9px] font-black uppercase tracking-widest transition-colors"
                        >
                          {t.storeLink}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* THE CORE CONTENT BREAKDOWN */}
        <div ref={contentRef} className="pt-12">
          <div className={`rounded-[1.5rem] md:rounded-[2.5rem] border transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-white/[0.01] border-white/5' 
              : 'bg-black/[0.01] border-black/5 shadow-md'
          }`}>
            <button 
              onClick={() => setIsBreakdownOpen(!isBreakdownOpen)}
              className="w-full text-left p-8 md:p-12 flex items-center justify-between gap-6 focus:outline-none hover:bg-white/[0.01]/10 active:bg-white/[0.02]/20 transition-all relative z-10"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🛠️</span>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent-gold">{locale === 'en' ? "DEEP ANALYSIS" : "심층 분석 매뉴얼"}</span>
                  <span className={`text-[11px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/80' : 'text-alpine-950/80'}`}>{t.technicalBreakdown}</span>
                </div>
              </div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 shrink-0 ${
                isBreakdownOpen 
                  ? 'rotate-180 bg-accent-gold/15 border-accent-gold/30' 
                  : (theme === 'dark' ? 'border-white/10 hover:border-white/20' : 'border-black/10 hover:border-black/20')
              }`}>
                <ChevronDownIcon className={`w-3.5 h-3.5 ${isBreakdownOpen ? 'text-accent-gold' : 'text-white/40'}`} />
              </div>
            </button>

            {isBreakdownOpen && (
              <div className="p-8 md:p-12 pt-0 grid lg:grid-cols-12 gap-12 md:gap-20 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-300 relative z-10">
                {/* LEFT RAIL - THE STACK / INFO */}
                <div className="lg:col-span-4 space-y-10 lg:sticky lg:top-24 h-fit">
                  <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent-gold">{t.systemStack}</span>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {projectData.stack.map((st, sidx) => (
                        <span 
                          key={sidx} 
                          className={`px-4 py-2 rounded-lg border font-mono text-[9px] uppercase font-bold tracking-widest ${
                            theme === 'dark' ? 'bg-white/5 border-white/5 text-white/60' : 'bg-black/5 border-black/5 text-alpine-950/70'
                          }`}
                        >
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent-gold font-display">{t.systemScopeOverview}</span>
                    <p className={`text-xs md:text-sm font-normal leading-relaxed ${
                      theme === 'dark' ? 'text-white/40' : 'text-alpine-950/50'
                    }`}>
                      {t.systemScopeBody}
                    </p>
                  </div>
                </div>

                {/* RIGHT RAIL - DETAILED ANALYSIS */}
                <div className="lg:col-span-8 space-y-20">
                  {/* PROBLEM / SOLUTION */}
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider font-display">{t.theProblem}</h3>
                      <ul className="space-y-4">
                        {projectData.problem.map((prob, pidx) => (
                          <li key={pidx} className="flex gap-4 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                            <p className={`text-xs md:text-sm leading-relaxed ${
                              theme === 'dark' ? 'text-white/70' : 'text-alpine-950/70'
                            }`}>
                              {prob}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider font-display">{t.theSolution}</h3>
                      <ul className="space-y-4">
                        {projectData.solution.map((sol, sidx) => (
                          <li key={sidx} className="flex gap-4 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                            <p className={`text-xs md:text-sm leading-relaxed ${
                              theme === 'dark' ? 'text-white/70' : 'text-alpine-950/70'
                            }`}>
                              {sol}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* PIPELINE ARCHITECTURE */}
                  <div className="space-y-6">
                    <h3 className="text-xl md:text-3xl font-bold uppercase tracking-wider font-display border-b pb-4">
                      {t.technicalPipelineMap}
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold mb-4">{t.pipelineExecutionLifecycle}</h4>
                        <ol className="space-y-4">
                          {projectData.architecture.lifecycle.map((lc, lidx) => (
                            <li key={lidx} className={`flex gap-4 items-start p-4 rounded-xl relative overflow-hidden font-mono text-xs border ${
                              theme === 'dark' ? 'border-white/5 bg-white/[0.01]' : 'border-black/5 bg-black/[0.01]'
                            }`}>
                              <span className="text-accent-gold font-bold">0{lidx + 1}</span>
                              <p className={theme === 'dark' ? 'text-white/70' : 'text-alpine-950/70'}>{lc}</p>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div>
                        <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold mb-4 mt-6">{t.pipelineEdgeCaseGuardrails}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {projectData.architecture.guardrails.map((gr, gidx) => (
                            <div key={gidx} className={`p-5 rounded-xl border ${
                              theme === 'dark' ? 'border-white/5 bg-white/[0.02]/50' : 'border-black/5 bg-black/[0.02]'
                            }`}>
                              <div className="text-xs font-mono font-bold uppercase tracking-wider mb-2 text-accent-gold opacity-90">{t.edgeCasePrefix} 0{gidx+1}</div>
                              <p className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-alpine-950/60'}`}>{gr}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PROMPT ENGINEERING */}
                  <div className="space-y-6">
                    <h3 className="text-xl md:text-3xl font-bold uppercase tracking-wider font-display border-b pb-4">
                      {t.promptOrchestration}
                    </h3>
                    <div className="space-y-6 font-mono">
                      <div>
                        <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold mb-3">{t.structuredInstruction}</h4>
                        <pre className="p-6 md:p-8 rounded-2xl overflow-x-auto text-[10px] md:text-xs leading-relaxed border border-white/5 bg-black/40 text-green-400">
                          <code>{projectData.promptEngineering.logic}</code>
                        </pre>
                      </div>

                      <div>
                        <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold mb-3">{t.runtimeEnforcedSchema}</h4>
                        <pre className="p-6 md:p-8 rounded-2xl overflow-x-auto text-[10px] md:text-xs leading-relaxed border border-white/5 bg-black/40 text-blue-400">
                          <code>{projectData.promptEngineering.schema}</code>
                        </pre>
                      </div>

                      <div>
                        <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold mb-4 font-display">{t.formattingConsistency}</h4>
                        <ul className="space-y-3 font-sans">
                          {projectData.promptEngineering.guardrails.map((gr, gidx) => (
                            <li key={gidx} className="flex gap-4 items-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent-gold"></div>
                              <p className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-alpine-950/60'}`}>{gr}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* QUANTIFIED BUSINESS IMPACT */}
                  <div className="space-y-6">
                    <h3 className="text-xl md:text-3xl font-bold uppercase tracking-wider font-display border-b pb-4">
                      {t.productImpactScale}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold mb-2 font-display">{t.quantifiedValue}</h4>
                        <ul className="space-y-3">
                          {projectData.impact.value.map((v, idx) => (
                            <li key={idx} className="flex gap-4 items-start">
                              <span className="text-accent-gold font-bold font-mono">✓</span>
                              <p className={`text-xs md:text-sm leading-relaxed ${
                                theme === 'dark' ? 'text-white/70' : 'text-alpine-950/70'
                              }`}>
                                {v}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold mb-2 font-display">{t.enterpriseSecurity}</h4>
                        <ul className="space-y-3">
                          {projectData.impact.security.map((s, idx) => (
                            <li key={idx} className="flex gap-4 items-start">
                              <span className="text-accent-gold font-bold font-mono">⚡</span>
                              <p className={`text-xs md:text-sm leading-relaxed ${
                                theme === 'dark' ? 'text-white/70' : 'text-alpine-950/70'
                              }`}>
                                {s}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CONCLUDE CONNECTOR */}
        <div className={`p-8 md:p-16 rounded-3xl border text-center space-y-6 relative overflow-hidden ${
          theme === 'dark' ? 'border-white/10 bg-white/[0.01]' : 'border-black/5 bg-white shadow-xl'
        }`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <h4 className="text-2xl md:text-4xl font-medium tracking-tight font-display">
            {t.wantToSeeTitle}
          </h4>
          <p className={`text-xs md:text-base max-w-2xl mx-auto leading-relaxed ${
            theme === 'dark' ? 'text-white/50' : 'text-alpine-950/65'
          }`}>
            {t.wantToSeeBody}
          </p>
          <div className="pt-4">
            <a 
              href="mailto:jsn.benjamin@gmail.com" 
              className="shiny-cta inline-block px-12 py-5"
            >
              {t.startCollaboration}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useRef } from 'react';
import { MailIcon, XIcon, ExternalLinkIcon, SparklesIcon } from './components/Icons.tsx';

interface CaseStudyViewerProps {
  projectId: string;
  onClose: () => void;
  theme?: 'light' | 'dark';
  locale?: 'en' | 'ko';
}

interface CaseStudyType {
  title: string;
  tagline: string;
  liveUrl: string;
  walkthroughVideo?: string;
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
    incident: string;
    diagnosis: string;
    resolution: string;
  };
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
    resolution: "Production Resolution"
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
    resolution: "프로덕션 해결편 (Resolution)"
  }
};

const studyDataEn: Record<string, CaseStudyType> = {
  chekki: {
    title: "Chekki AI",
    tagline: "Homework help without the stress. Scan worksheets, get automated bilingual guides instantly.",
    liveUrl: "https://chekki-ai.vercel.app/",
    walkthroughVideo: "https://res.cloudinary.com/dginphpy4/video/upload/v1769504113/Chekki_AI_V0_fkdlyx.mp4",
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
    technicalHurdles: {
      incident: "During beta testing, certain users experienced a silent freeze during mobile subscription activation. The billing dialog loaded, but after completing Google Play 2FA, the app interface remained locked, preventing session initialization.",
      diagnosis: "Google Play Billing client's asynchronous token validation was timing out when 2FA biometric checks forced the application process into a background frozen state, resulting in deferred purchases failing to trigger server-to-server webhook ingestion.",
      resolution: "Isolated developer profiles from 2FA requirements for the sandbox suite, implemented a dual-state local transaction manager that secures tokens client-size, and restructured the backend to process deferred purchases asynchronously using real-time polling backed by low-latency server-to-server Pub/Sub queues."
    }
  },
  "benchmark-explorer": {
    title: "Benchmark Explorer",
    tagline: "Relational student performance tracking mapping observations directly to CEFR and Cambridge standards.",
    liveUrl: "https://education-benchmark-system.vercel.app/",
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
    technicalHurdles: {
      incident: "Bulk-importing multi-cohort term exams (10,000+ data nodes) triggered browser locks and crashed Recharts rendering layers.",
      diagnosis: "React triggered cascading layout reflows because raw Airtable API sync webhooks were updating component states synchronously without throttling, clogging the rendering queue.",
      resolution: "Implemented a requestAnimationFrame buffer to chunk chart updates, virtualization over the D3 svg workspace, and structured Make.com webhook listeners with debounced 500ms transactional batch flushes."
    }
  },
  eduplanner: {
    title: "EduPlanner Pro",
    tagline: "Automated, cognitive-aware scheduling scheduler resolving school bottlenecks under extreme constraints.",
    liveUrl: "https://scheduling-app-five.vercel.app/",
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
    technicalHurdles: {
      incident: "Scheduling compilations for high-cap campuses hit 404/504 timeout bounds and exhausted Gemini token rates due to recursive backtracking loops.",
      diagnosis: "Weaving absolute room constraints directly through prompt layouts forced the LLM into endless reasoning retry loops when dealing with mutually exclusive faculty break periods.",
      resolution: "Pruned illegal scheduling configurations using a custom local pre-check algorithm in TypeScript before model dispatch, and implemented a multi-stage pipeline using fast Flash models for base blueprints and high-intelligence Pro models for isolated clashing nodes."
    }
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
    technicalHurdles: {
      incident: "Simultaneous registration spikes triggered write race-conditions inside Airtable and created duplicate parent folders.",
      diagnosis: "Highly concurrent Make webhooks executed lookup-modify-write actions simultaneously, bypassing standard relational lookups because transactions were not isolated.",
      resolution: "Configured an Redis-backed staging queue for incoming payloads and enforced custom atomic lock checking through Airtable key constraints on the Form capture layer."
    }
  },
  "lead-enrichment": {
    title: "B2B Lead Enrichment & CRM",
    tagline: "Automated regional map directory parsing, real-time deduplication, and customized cold sales outreach.",
    liveUrl: "https://jason-benjamin.vercel.app/", 
    stats: [
      { label: "B2B Lead Discoveries", value: "Real-time" },
      { label: "Outreach Personalization", value: "Highly Customized" },
      { label: "Lead Deduplication Rate", value: "100%" }
    ],
    problem: [
      "Localized directories (Naver Maps) returning cluttered, non-normal and messy HTML-polluted tags.",
      "Writing personalized business emails manually to hundreds of targets creates a massive lead pipeline bottleneck.",
      "Repetitive target outreach due to poor historical CRM duplicate checking."
    ],
    solution: [
      "Created an Express middleware proxy crawling maps data and resolving duplicate entries via index checking.",
      "Synthesized local founder credentials (10-yr tenure) paired with polite Korean business honorifics recursively.",
      "Constructed 1-click mailto pre-composition windows for hyper-personalized dispatch loops."
    ],
    stack: ["React 18", "Express API Proxy", "Firebase Firestore", "Google Gemini API (gemini-3-flash-preview)", "Sonner"],
    architecture: {
      lifecycle: [
        "1. Crawler retrieves localized map targets, cleansing noisy titles containing tags like <b>.",
        "2. Engine pre-fetches Firestore entries, testing target naver_id to flag pre-saved badges.",
        "3. Backend asynchronous loops process targeted entries, avoiding upstream 429 quota exhaustion.",
        "4. Direct Gmail mailto deep links pre-populate complete business outreach templates instantly."
      ],
      guardrails: [
        "Real-time Saved index checks preventing duplicate communication runs.",
        "Asynchronous batch loops designed specifically to protect API quotas.",
        "Regex-based raw HTML string filters removing unwanted regional metadata layouts."
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
        "No-hallucination guardrails limiting synthesized fields to verified maps metadata.",
        "Enforces direct language pairing matching Korean formal honorifics and brief English prompts.",
        "Enforces structured JSON key returns to prevent raw markdown strings breaking the deep links."
      ]
    },
    impact: {
      value: [
        "Automated unstructured regional listing cleanup, instantly organizing cold sales runs.",
        "Boosted campaign open and reply rates using highly personalized founder credential tags.",
        "Slashed standard B2B list compiling workflows from days down to seconds."
      ],
      security: [
        "Upstream API keys strictly secured behind Node.js proxy middleware models.",
        "Client inputs filtered to prevent malicious prompt injections.",
        "Encrypted lead state histories tracked continuously in Google Firestore."
      ]
    },
    behindTheArchitecture: {
      problem: "Scraping localized maps (Naver) manually to locate business entities ends up returning messy, unformatted, HTML-polluted contact entries and extremely slow CRM logging workflows.",
      vision: "Formulate a localized proxy extractor that cleans map directories on the fly, tests duplicates against active logs, and drafts tailored campaigns for outreach.",
      rationale: "Chose an Express endpoint proxy running custom regex sweeps coupled with Google Gemini's structured JSON models to populate error-free deep email compositions instantly."
    },
    technicalHurdles: {
      incident: "The Naver maps crawler experienced random IP soft-bans and returned incomplete metadata containing raw HTML segments.",
      diagnosis: "Static crawler headers triggered Naver's scraping detection, while localized SEO wrappers polluted the address texts.",
      resolution: "Switched to custom Axios proxies with automated User-Agent rotations, created specialized regex parser sweeps, and implemented simulated HTML error-recovery with automatic fallback routes."
    }
  }
};

const studyDataKo: Record<string, CaseStudyType> = {
  chekki: {
    title: "Chekki AI (체키)",
    tagline: "학습 지도 스트레스에서 완전히 벗어나세요. 종이 학습지를 카메라로 찍으면 인공지능이 맞춤형 이중 언어 가이드를 즉시 빌드합니다.",
    liveUrl: "https://chekki-ai.vercel.app/",
    walkthroughVideo: "https://res.cloudinary.com/dginphpy4/video/upload/v1769504113/Chekki_AI_V0_fkdlyx.mp4",
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
      rationale: "일반 기계 변역 엔진의 문맥 한계를 뛰어넘고자 위치 구조 인식에 탁월한 구글 제미나이 멀티모달 비전 엔드포인트를 바인딩해 한국적 정서인 '정중 경어법'까지 매끄럽게 처리하도록 개발."
    },
    technicalHurdles: {
      incident: "모바일에서 결제 검증 시 특정 소형 디바이스 유저 그룹에서 화면이 먹통이 되며 영구 동결되는 극히 드문 모바일 브라우저 먹통 현상 발생.",
      diagnosis: "결제 2단계 인증(2FA) 진행 도중 하드웨어 신뢰 토큰(Hardware Trust Token)과 OS 절전 계층이 개입하며 백그라운드 스레드로 이전된 앱 상태가 강제 정지(Freeze)되어 서버-대-서버 웹훅 토큰 인계가 인스턴트 누락되는 현상으로 규명.",
      resolution: "2FA 요구가 없는 개발자 샌드박스 프로필을 격리 편성하고, 클라이언트 단에서 영속성 미결 트랜잭션 스토리지 매니저를 구현한 후 동기 웹훅 중심 구조를 비동기 이벤트 펍/섭(Pub/Sub) 분산 처리 파이프라인으로 전면 개편해 토큰 누수를 완벽 완치."
    }
  },
  "benchmark-explorer": {
    title: "Benchmark Explorer (학업 성취 벤치마크)",
    tagline: "전인 성정 관찰 노트를 완전 데이터화하여 CEFR 유럽공통기준 및 학업 변화 지표를 한눈에 도출합니다.",
    liveUrl: "https://education-benchmark-system.vercel.app/",
    stats: [
      { label: "행정 수지 보강 효율", value: "CSV 수동 취합 전면 소거" },
      { label: "교사 야근 행정 시간", value: "매주 12시간 감수" },
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
        "관계형 참조 잠금 장치: 학급 분반 변동이나 진급 탈퇴 중에도 과거 학적 이수 및 점수 불변을 보증하는 트랜잭션 제한 설계.",
        "이중 생성을 근본 배격하기 위해 Naver 고유 식별 명세를 활용해 중위 연계 필터 배치.",
        "클라우드 서비스 타임아웃에 완충 대응하기 위해 Pro 알고리즘에서 Flash로의 자동 페일오버 설계."
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
        "산발되던 학적부와 성적 해설 편집 시간을 취합 학원장 기준 매주 평균 12시간씩 완치 구원.",
        "연말까지 기다리던 피드백 격차를 주간 단위 성장 지도로 대치하여 교육 취약 노드를 사전에 포착 보강.",
        "원어민 교육 수준을 국내가 원하는 정교 지표(CEFR)로 매칭해 학부모 단절 불안을 즉석 정화."
      ],
      security: [
        "학부모 자격 정보에 한해서 정밀 타겟 로우(Row)만 전송하는 제로트러스트 뷰 격리 필터 내장.",
        "개인 특정 번호 및 유치 아동 기밀(PII)이 백업 로그 등에 생문장 기록되지 않는 방화벽 적중.",
        "각 조회 웹 URL을 Softr 암호화 키 토큰과 상생 배치하여 임의 무작위 변조 열람 수단을 전면 단절."
      ]
    },
    behindTheArchitecture: {
      problem: "클래스 담임과 교수부 주임 강사진이 학생 성취 점수를 모으고, 학부모 상담지를 수동 문서로 꾸미느라 매주 12시간 넘는 단순 편집 복사 노동에 소진되던 참담함.",
      vision: "교사가 체크창 몇 개를 가볍게 누르기만 하면 실시간 CEFR 스케일 변환 다이어그램 레이더가 형성되고, 부모에게는 세련된 모바일 성적 리포트가 완성 제공되는 올인원 대시보드.",
      rationale: "신속한 시각 레이아웃과 데이터 흐름 보강을 위해 React + Recharts 차트를 장치하고, Airtable 관계 교차 테이블 구조를 매칭해 수동 입력 실수 오류율 0%를 보증하도록 디자인."
    },
    technicalHurdles: {
      incident: "전체 학년 데이터(10,000건 초과) 일괄 마이그레이션 진입 시 브라우저가 정지하며 가상 차트 노드가 일제히 Crash되는 현상.",
      diagnosis: "Airtable 동기 웹훅 신호 수신과 동시에 React 컴포넌트가 과도하게 레이아웃 리플로우(Layout Reflow)를 유발하고 Recharts 연산 큐가 마비됨.",
      resolution: "차트 버퍼에 requestAnimationFrame 동적 청킹을 배치하고 가상 D3 노드 분산 렌더러를 탑재하여, 동시다발성 데이터 커밋을 500ms 디바운스 트랜잭션 단위로 묶어 브라우저 안전가동 범위 보장."
    }
  },
  eduplanner: {
    title: "EduPlanner Pro (무인 제약 시간표)",
    tagline: "공간 수용 정원, 요일별 교원 일정, 피로 분포 등 마이크로 제약 조건을 분석하여 충돌 수치 0%의 최적의 시간표를 연산합니다.",
    liveUrl: "https://scheduling-app-five.vercel.app/",
    stats: [
      { label: "시간표 작성 결점도", value: "충돌 및 갈등 0건 달성" },
      { label: "시간표 완성 속도", value: "10분 미만 기계 편조" },
      { label: "교직원 주간 피로 편율", value: "오차 범위 내 균등 해소" }
    ],
    problem: [
      "인원, 강의실 한계 등 복수 관계 변수 조율 때문에 행정 팀장들이 매 학기 시간표 판넬 앞에 매주 수십 시간 야근하는 가혹함.",
      "필수 이수 단위 이행을 검증하는 물리 제약(Hard Rule)과 선호 일정, 휴가 등의 소프트 밸류 제안을 동시 충족하는 배치 구도는 수동 불가.",
      "예기치 못한 교원 단기 병가나 강의실 시설 점검 등의 돌수 상황 시, 몇날 며칠을 조립한 기존 시간표 전체 구조가 완전 엉키며 휴강 대란 발발."
    ],
    solution: [
      "학급 기본 온보딩 명세서 기재 데이터를 흡수하여, 스스로 제약 조건을 체크 정산해 내는 지능형 고성능 헬퍼 소프트웨어.",
      "1차 배치가 완료된 후 정형 모듈 내부의 충돌 노드만 따로 집어 우회 해결해 나가는 '다단계 Weaving 하이 가치 아키텍처'.",
      "강사 전원 일일 연강 과밀(Burnout) 축척 현황을 리얼타임 레이더 차트로 조율해 보여주는 교직원 피안 패널."
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
        "기존 개학 때마다 며칠씩 밤을 지새우던 거대 스케줄 조각 정리를 단 10분 이내의 자동 오토 알고리즘 추론 전격 해소.",
        "가용 교실 도크 겹침 0건, 강사 주간 정규 강좌 기한 미달 이수 0%의 청정 시간표 자동 성립 완벽 검증.",
        "연강 밀집도를 실시간 대조 배정하여 강사님들의 번아웃 리스크를 사전에 격리해 교원 결속 연한 보강 효과 도모."
      ],
      security: [
        "시간 시간표 설계 제어 패널은 오직 보증 완료된 허용 기관장의 이메일 인증을 확보해야 진입 가능.",
        "수정 및 편집 행적들을 감사 기록 서버에 기밀 보존하여 임의 오작동 및 보안 이탈 원인 자율 소탕.",
        "원클릭 파이어스토어 어드민 권한 제정 보안 규칙을 가용해 타인의 고의 변조로부터 데이터 기밀성 확보."
      ]
    },
    behindTheArchitecture: {
      problem: "신 학기 시간표 구상 때마다 강의실 수용 크기, 교원 요일 선호도, 최소 법정 수업 시간 등 수백 개의 상충 변수로 인해 교육 기획자들이 밤낮 고생하는 악순환.",
      vision: "교과 제약을 있는 그대로 명세 기입하는 것만으로, 수억 가지 우회 조합 우주를 자율 연산해 하나도 안 어긋나는 올바른 무공해 시간표를 10분 안에 컴파일해내는 오토 SaaS.",
      rationale: "반응이 즉각적인 Firestore 실시간 대조 저장 구조를 중심에 세우고, 기본 스케줄 편조는 초고속 Flash 모델에, 해결 난망 노드는 Pro 지능형 조율에 역할을 분담 배정해 최적의 생산성 확보."
    },
    technicalHurdles: {
      incident: "대규모 시간표 스케줄링 연산 수행 시 지능 추론 백패킹 궤적이 지나쳐 504 게이트웨이 타임아웃 및 생성형 API 토큰 한도 소진.",
      diagnosis: "상충관계가 극히 심한 강의실 수용 규격과 강사 정기 휴가 등의 온전한 제약(Constraint)을 모두 자연어 규칙에만 결속시킨 탓에 인공지능이 논리 교착 상태(Deadlock)에 빠짐.",
      resolution: "TypeScript로 사전 제약 정규 필터 알고리즘을 빌드해 사전에 불가능한 노드를 완전 전처리 가지치기(Pruning)하고, 1차 도안은 초고속 제미나이 플래시로 파이프라인 정리 후 충돌 노드만 고성능 프로(Pro)에 분담 할양해 하이브리드 연산 10분 컷 종결."
    }
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
        "이벤트 수신 직후 학부모 전용 암호 마술 링크(Onboarding Magic Link)를 인지 생성하고 관계 DB에 Atomic 주입.",
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
    technicalHurdles: {
      incident: "입원 면담 등록 성수기 오버플로우 트래픽 집중 시, 분기 자동화 웹훅 충돌로 부모 고유 폴더 및 관계 레코드가 이중 생성 유실되는 병목 사건 발생.",
      diagnosis: "Make.com의 병렬 연산 흐름 제어가 Airtable 테이블 데이터 조회-수정-작성 트랜잭션 도킹을 수행할 때 세션 격리(Transaction Isolation) 부족으로 인한 쓰기 경합(Race Condition)으로 진단.",
      resolution: "중간 데이터 웨어하우스용 Redis 큐 레이어를 도입해 단일 입력 가교 트랜잭션을 완전 순차 큐잉하고, Airtable에 고유 유니크 키 제약(Unique Constraint)을 도입하여 이중 쓰기를 무효화 방어."
    }
  },
  "lead-enrichment": {
    title: "B2B Lead Enrichment (자동 파트너 발굴 CRM)",
    tagline: "지역 상권 가용 지도를 정화 및 중복 소탕하고, 제미나이 언어 가이드로 대표 맞춤 협업 이메일 딥링크를 즉석 생성합니다.",
    liveUrl: "https://jason-benjamin.vercel.app/", 
    stats: [
      { label: "타겟 데이터 수집 속도", value: "실시간 스캔 완료" },
      { label: "영업 이메일 맞춤 정성도", value: "베테랑 경격 이력 완벽 투화" },
      { label: "동일 거래처 중복 발송방지", value: "100% 필터 보증" }
    ],
    problem: [
      "네이버 지도 상권 데이터 원본에 섞여 들어간 지저분한 HTML 태그 노이즈나 비공식 부속 상호 때문에 정제가 난감한 오염 문제.",
      "잠재 제휴 동반사 수백 곳 각각의 설립 배경을 수동 독해서 맞춤 비즈니스 영업 메일을 직접 작성하는 시간의 숨 막힘.",
      "특정 잠재 파트너사에 다단계 중복 공문 메일을 재차 보내 스팸 피고로 블랙리스트 등재 및 기업 이미지 꺠짐 마찰."
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
      problem: "가용 파트너를 발굴하려 포털 지도를 수작업으로 스크랩하여 연락처 리스트를 기재하고, 대표 제안서를 수동으로 복사해 날리느라 하루 영업 효율이 급격히 저하되던 만성 비인센티브 오퍼레이팅.",
      vision: "지역 대표 상권을 클릭 한 번으로 수집함과 함께 중복 연락망을 무인 제거하고, 파트너 특색 경력 가치에 맞춰 가치 제안서를 지메일 이메일로 1초 완성 전송하는 스마트 툴.",
      rationale: "백엔드 Express 프록시 가설로 네이버 데이터 병목을 소거하고, 제미나이 정적 스키마 변환 출력을Firestore 컬렉션 데이터에 연결하여 누락 없는 맞춤형 B2B 매스 영업 CRM 안착."
    },
    technicalHurdles: {
      incident: "네이버 가용 지도 크롤링 수집 도중 일시적인 IP 접근 차단부 발생 및 일부 지저분한 HTML 원물 찌꺼기가 섞여 CRM에 인입.",
      diagnosis: "크롤러 헤더가 정지 탐지 룰에 필터링되었고, 타겟 업장의 복잡한 인라인 HTML 개행 특성이 고스란히 유입되어 파서 정재 구조를 오염시킴.",
      resolution: "Axios 프록시에 로테이션 브라우저 에이전트(User-Agent Matrix)를 바인딩하고 가중 분석 정규표현식(Regex)을 삼중 스크린 개편함과 함께, 수집 장애 국면 돌파용 더미 쉐이프(Fail-safe Fallback Mock) 매커니즘을 설치해 파이프라인 중단 극복."
    }
  }
};

export const CaseStudyViewer: React.FC<CaseStudyViewerProps> = ({ 
  projectId, 
  onClose, 
  theme = 'dark',
  locale = 'en'
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the top when the viewer opens
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [projectId]);

  const scrollToBreakdown = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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
        <div className="flex items-center gap-4">
          {hasLiveApp && (
            <a 
              href={projectData.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent-gold"
            >
              {t.launchLive}
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
          <div className="flex flex-col sm:flex-row gap-4 pt-4 max-w-xl">
            <button 
              onClick={scrollToBreakdown}
              className={`shiny-cta py-5 text-center shadow-2xl ${hasLiveApp ? 'w-full' : 'w-full sm:w-auto px-12'}`}
            >
              {t.technicalBreakdown}
            </button>
            {hasLiveApp && (
              <a 
                href={projectData.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-5 rounded-xl border flex items-center justify-center gap-3 font-extrabold uppercase text-[10px] tracking-widest transition-all ${
                  theme === 'dark' 
                    ? 'border-white/20 hover:bg-white/5 text-white' 
                    : 'border-black/20 hover:bg-black/5 text-alpine-950'
                }`}
              >
                {t.launchLiveApp}
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
          <div className={`p-8 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] border transition-all duration-300 lg:mx-0 ${
            theme === 'dark' 
              ? 'bg-white/[0.02] border-white/5 shadow-2xl relative overflow-hidden' 
              : 'bg-black/[0.02] border-black/5 shadow-lg relative overflow-hidden'
          }`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex items-center gap-3 mb-8 border-b pb-5 border-accent-gold/10">
              <span className="text-2xl">🧠</span>
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent-gold">{t.productMindset}</span>
                <span className={`text-[11px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/60' : 'text-alpine-950/70'}`}>{t.behindTheArchitecture}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
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
          </div>
        )}

        {/* TECHNICAL HURDLES / WHEN THINGS BREAK */}
        {projectData.technicalHurdles && (
          <div className={`p-8 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] border transition-all duration-300 lg:mx-0 ${
            theme === 'dark' 
              ? 'bg-[#120D0D]/50 border-red-500/10 shadow-[0_20px_50px_rgba(239,68,68,0.05)] relative overflow-hidden' 
              : 'bg-[#FFF5F5]/60 border-red-500/10 shadow-lg relative overflow-hidden'
          }`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex items-center justify-between gap-4 mb-8 border-b pb-5 border-red-500/10 flex-wrap">
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
                  {projectData.technicalHurdles.incident}
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
                  {projectData.technicalHurdles.diagnosis}
                </p>
              </div>

              {/* THE RESOLUTION */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-xs text-green-500">✓</div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-green-500">{t.resolution}</h4>
                </div>
                <p className={`text-xs md:text-sm leading-relaxed font-light ${
                  theme === 'dark' ? 'text-white/60' : 'text-alpine-950/70'
                }`}>
                  {projectData.technicalHurdles.resolution}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PROOF OF WORK / VIDEO SECTION */}
        <div className="space-y-6">
          <div className={`text-[10px] font-black uppercase tracking-[0.4em] ${
            theme === 'dark' ? 'text-white/40' : 'text-alpine-950/40'
          }`}>
            {t.proofOfWorkTitle}
          </div>
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
                  {hasLiveApp 
                    ? t.productionWalkthroughBodyLive
                    : t.productionWalkthroughBodyBackground}
                </p>
                {hasLiveApp && (
                  <div className="pt-2">
                    <a 
                      href={projectData.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex px-6 py-2.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-[9px] font-black uppercase tracking-widest"
                    >
                      {t.openLiveSandbox}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* THE CORE CONTENT BREAKDOWN */}
        <div ref={contentRef} className="grid lg:grid-cols-12 gap-12 md:gap-20 pt-12">
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
                      <li key={lidx} className="flex gap-4 items-start p-4 rounded-xl relative overflow-hidden font-mono text-xs border border-white/5 bg-white/[0.01]">
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
                      <div key={gidx} className="p-5 rounded-xl border border-white/5 bg-white/[0.02]/50">
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

import { CaseStudyType } from '../types.ts';

export const studyDataEn: Record<string, CaseStudyType> = {
  vodabi: {
    title: "Enterprise Voice-AI Roleplay & Automated Candidate Scoring Engine",
    tagline: "Built an end-to-end voice simulation and candidate evaluation engine designed to automate phone screening for sales roles. Replaced manual screening calls with interactive voice AI and structured automated grading. (NDA Sanitized Case Study)",
    liveUrl: "",
    screenshots: [
      { label: "AI Voice Roleplay & Screening Persona", url: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=2000&auto=format&fit=crop", subLabel: "Direct WebRTC Pipeline: Ephemeral Tokens & Push-to-Talk in NestJS" },
      { label: "Tiered Rubric Evaluation Scorecard", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop", subLabel: "11-24 Point Rubrics, BANTCQ Metrics & Speech Telemetry (WPM)" },
      { label: "Admin & Scenario Management Backoffice", url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop", subLabel: "Dynamic Scenario Management & Candidate Evaluation Flow" }
    ],
    stats: [
      { label: "Voice Architecture", value: "Direct WebRTC", detail: "Push-to-Talk Turn Control" },
      { label: "Unit Economics", value: "~3x Cost Cut", detail: "gpt-realtime-mini voice model" },
      { label: "Scoring Precision", value: "11-24 Rubrics", detail: "Tiered by scenario difficulty" }
    ],
    problem: [
      "Confidentiality Notice: Specific company and client names have been sanitized to respect non-disclosure agreements (NDAs). Architectural patterns and PM decisions reflect original work.",
      "Manual candidate phone screens created high administrative overhead, screening delays, and subjective hiring metrics.",
      "Unstructured candidate evaluation caused inconsistent scoring and recruiter fatigue during high-volume sales hiring.",
      "Traditional static testing portals lacked realistic conversational pushback, interactive objection handling, and objective discovery telemetry."
    ],
    solution: [
      "Direct WebRTC Voice Pipeline: Engineered a direct WebRTC audio stream with ephemeral session tokens in NestJS, utilizing push-to-talk turn management to prevent ambient background noise from burning OpenAI token quotas.",
      "Tiered Evaluation Pipeline: Implemented an async post-call scoring pipeline using gpt-4o to extract structured BANTCQ sales discovery metrics, evaluate candidates against tiered 11-to-24-point rubrics, and analyze speech pacing (WPM).",
      "Unit Economics Optimization: Decoupled live voice interaction (gpt-realtime-mini for ~3x cheaper streaming) from deep post-call evaluation (gpt-4o structured JSON judging).",
      "Security & Magic Link Auth: Designed a stateless, tokenized link access system with automatic token rotation on re-invite (candidate.service.ts) so job applicants take tests without persistent account liabilities.",
      "Admin & Scenario Cockpit: Built a role-gated admin console (React 19, TypeScript, Tailwind) with dynamic scenario management and candidate review workflows over MariaDB with Prisma ORM in Docker."
    ],
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "NestJS 11",
      "Direct WebRTC (Ephemeral Tokens)",
      "Prisma 7 (MariaDB Driver)",
      "OpenAI Realtime (gpt-realtime-mini)",
      "OpenAI GPT-4o (Post-Call Judge)",
      "Docker Compose",
      "Nginx",
      "i18next"
    ],
    coreLoop: [
      { step: "01. Ephemeral Magic Entry", role: "Candidate", detail: "Candidate accesses the assessment via a tokenized URL with automatic rotation on re-invite, requiring zero account registration." },
      { step: "02. Direct WebRTC Voice Session", role: "Voice AI Persona", detail: "Candidate initiates push-to-talk voice turns via gpt-realtime-mini, preventing ambient noise from falsely triggering token-burning responses." },
      { step: "03. Conversation & Speech Buffering", role: "NestJS Gateway", detail: "Captures candidate audio stream and transcript while tracking cadence and words-per-minute (WPM) telemetry." },
      { step: "04. Post-Call gpt-4o Rubric Evaluation", role: "LLM Judge Pipeline", detail: "Post-call transcript is scored against scenario-specific 11-to-24-point rubrics and BANTCQ sales discovery criteria." },
      { step: "05. Deterministic Scorecard & Fallback", role: "Analytics Service", detail: "Outputs type-safe JSON scorecards, backed by graceful fallback evaluation handling (createDefaultEvaluation) if network feeds fail." },
      { step: "06. Recruiter Review & Backoffice", role: "Hiring Manager", detail: "Talent team reviews cohort scorecards, listens to session audio, and manages tiered scenario rubrics." }
    ],
    decisions: [
      {
        decision: "Push-to-Talk Turn Control over Unbounded Continuous Voice VAD",
        alternativeConsidered: "Continuous server/client voice activity detection with automatic barge-in",
        why: "In real-world candidate testing, ambient room noise, heavy breathing, and typing frequently triggered false AI interruptions, burning expensive OpenAI token streams. Push-to-talk guaranteed deliberate applicant turns and stable unit economics (realtime.service.ts:86-90).",
        tradeOffAccepted: "Requires candidate to hold a button/key during speech rather than relying on automated voice thresholding."
      },
      {
        decision: "Dual-Model Architecture (gpt-realtime-mini for Voice + gpt-4o for Post-Call Judging)",
        alternativeConsidered: "Running full gpt-4o-realtime-preview for both live voice audio and mid-call evaluation",
        why: "Full-tier realtime models are ~3x more expensive per minute and struggle to perform complex multi-rubric grading mid-call without latency spikes. Using gpt-realtime-mini for voice and async gpt-4o for post-call JSON judging delivered high grading precision at sustainable SaaS cost.",
        tradeOffAccepted: "Scorecard generates asynchronously within 15-30s post-call rather than instantaneously upon disconnect."
      },
      {
        decision: "Stateless Ephemeral Magic Links with Token Rotation over Persistent User Accounts",
        alternativeConsidered: "Mandatory username/password applicant registration portal",
        why: "Applicant funnels suffer high drop-off when forced to register an account for a 10-minute screening test. Rotating tokenized links (candidate.service.ts:35-37) provided zero-friction entry while securing token lifetime against unauthorized reuse.",
        tradeOffAccepted: "Candidates cannot self-manage or review historical scores directly without recruiter release."
      },
      {
        decision: "Graceful Fallback Evaluation (createDefaultEvaluation) over Hard API Crash",
        alternativeConsidered: "Throwing unhandled 500 errors and abandoning candidate records on LLM API timeout or empty audio buffers",
        why: "In production, network dropouts or empty candidate calls must not crash the recruiter queue or leave corrupted database states. The fallback pipeline safely records diagnostic status while preserving system integrity (evaluation.service.ts:230-348).",
        tradeOffAccepted: "Recruiter must verify flagged fallback records when unexpected transcript drops occur."
      }
    ],
    behindTheArchitecture: {
      problem: "Manual candidate phone screens and subjective call reviews created administrative bottlenecks, inconsistent scoring benchmarks, and recruiter fatigue during high-volume sales hiring.",
      vision: "Build a cost-efficient, production-grade conversational AI screening platform that executes realistic sales roleplay and outputs structured BANTCQ scorecards and development roadmaps.",
      rationale: "Selected direct WebRTC with push-to-talk turn control to eliminate token-burning noise triggers, combined with gpt-realtime-mini for affordable voice streaming and async gpt-4o JSON schemas for 100% structured evaluation."
    },
    architecture: {
      lifecycle: [
        "Ephemeral Magic-Link Access: Candidates access the assessment via passwordless magic links with automatic token rotation on re-invite.",
        "Push-to-Talk Voice Session: Direct WebRTC streams audio via gpt-realtime-mini with deliberate turn boundaries, preventing token waste from ambient noise.",
        "Deterministic LLM Judge: Transcripts route to an async gpt-4o evaluation pipeline with enforced JSON schemas, grading across tiered 11-to-24-point rubrics and BANTCQ criteria.",
        "Recruiter Scorecard: Generates structured candidate scorecards with WPM speech pacing and onboarding development recommendations."
      ],
      guardrails: [
        "Stateless Token Rotation: Magic links automatically rotate on re-invite (candidate.service.ts:35-37), preventing replay vulnerabilities.",
        "Structured Schema Enforcement: Enforces strict JSON Schema validation with graceful fallback handling to prevent pipeline failures.",
        "Push-to-Talk Token Guard: Eliminates ambient acoustic false-triggers to protect OpenAI API quotas.",
        "Rate-Limiting & Container Isolation: Configured with 100 req/min endpoint rate-limiting behind Nginx in Dockerized containers."
      ]
    },
    promptEngineering: {
      logic: `<system_identity>
  You are an enterprise AI Candidate Evaluation & Sales Coaching Judge. Execute strict objective scoring without subjective bias or hallucination.
</system_identity>

<evaluation_protocol>
  <rubric_points>Tiered 11-to-24-Point Rubric (Communication Clarity, Technical Depth, Problem Solving, BANTCQ Telemetry)</rubric_points>
  <metrics>Speech Rate (WPM), Keyword Alignment, Objection Handling, Personalised Onboarding Roadmap</metrics>
</evaluation_protocol>`,
      schema: `{
  "type": "OBJECT",
  "properties": {
    "candidate_score": { "type": "NUMBER", "description": "Overall score out of 100" },
    "rubric_breakdown": {
      "type": "OBJECT",
      "properties": {
        "communication_clarity": { "type": "NUMBER" },
        "technical_depth": { "type": "NUMBER" },
        "problem_solving": { "type": "NUMBER" },
        "bantcq_qualification": { "type": "BOOLEAN" }
      }
    },
    "speech_telemetry": {
      "type": "OBJECT",
      "properties": {
        "wpm": { "type": "NUMBER" },
        "interruption_count": { "type": "NUMBER" }
      }
    },
    "onboarding_roadmap": {
      "type": "ARRAY",
      "items": { "type": "STRING" }
    }
  }
}`,
      guardrails: [
        "Deterministic JSON Output: Guarantees type-safe JSON schema adherence across all evaluation runs.",
        "Resilient Fallback Handling: Safely catches transcript errors and persists diagnostic records via createDefaultEvaluation().",
        "Hallucination Mitigation: Rejects unverified candidate assertions that lack explicit transcript evidence."
      ]
    },
    impact: {
      value: [
        "Replaced manual 1st-round phone screens with interactive WebRTC AI customer simulations and automated candidate scorecards.",
        "Optimized voice unit economics by ~3x through gpt-realtime-mini voice streaming paired with async gpt-4o rubric judging.",
        "Standardized candidate evaluation across tiered 11-to-24-point competency rubrics with deterministic BANTCQ telemetry."
      ],
      security: [
        "Stateless magic-link candidate access with token rotation on re-invite (candidate.service.ts).",
        "Resilient error-boundary handling with createDefaultEvaluation() fallback for pipeline stability.",
        "Containerized Node.js 24 / NestJS 11 backend deployed behind Nginx reverse proxy with Prisma 7 over MariaDB."
      ]
    },
    technicalHurdles: [
      {
        title: "Ambient Noise Triggers & Live Voice Token Burn",
        incident: "In initial voice tests, background room noise, typing, and heavy breathing falsely triggered the realtime AI speech stream, causing rapid OpenAI token quota exhaustion.",
        diagnosis: "Automatic continuous voice activity detection (VAD) struggled with variable candidate microphone sensitivities and acoustic echo in home environments.",
        resolution: "Architected a direct WebRTC stream with deliberate push-to-talk turn management (realtime.service.ts:86-90), ensuring clean turn boundaries, zero background token bleed, and stable unit economics."
      },
      {
        title: "Evaluation API Timeouts & Pipeline Resilience",
        incident: "Network hiccups or empty audio buffers during candidate screening risked crashing the post-call evaluation pipeline and leaving orphan database records.",
        diagnosis: "Unwrapped external LLM calls lacked defensive error boundaries and schema validation fallbacks.",
        resolution: "Engineered a robust try/catch evaluation pipeline (evaluation.service.ts:230-348) with createDefaultEvaluation() fallback, ensuring uninterrupted recruiter queue processing."
      }
    ]
  },
  chekki: {
    title: "Chekki AI",
    tagline: "Designed a mobile-first digital tabletop co-pilot application to transform printed school worksheets into interactive, bilingual tutoring keys.",
    liveUrl: "https://chekki-ai.vercel.app/",
    storeUrl: "https://urlgeni.us/chekki",
    walkthroughVideo: "https://embed.app.guidde.com/playbooks/rZZfcxwam9qFtSqgh3rRGw?mode=videoOnly",
    screenshots: [
      { label: "Landing Page", url: "https://res.cloudinary.com/dginphpy4/image/upload/v1784118476/Screenshot_2026-07-15_at_9.26.57_PM_ozpruh.png", subLabel: "B2B Educational Landing Page" },
      { label: "Pain Points Solved", url: "https://res.cloudinary.com/dginphpy4/image/upload/v1784118475/Screenshot_2026-07-15_at_9.27.31_PM_f5exol.png", subLabel: "Parental & Operational Pain Points" },
      { label: "Onboarding", url: "https://res.cloudinary.com/dginphpy4/image/upload/v1784118119/3_ub3ej3.png", subLabel: "Seamless Parent Welcome Flow" },
      { label: "Homescreen", url: "https://res.cloudinary.com/dginphpy4/image/upload/v1784118119/2_yobnjt.png", subLabel: "Active Learning Portal & Scanner" },
      { label: "Teaching Guide", url: "https://res.cloudinary.com/dginphpy4/image/upload/v1784118118/9_xyzk0q.png", subLabel: "Phonetics & Explanation Script" },
      { label: "Answers Overlay", url: "https://res.cloudinary.com/dginphpy4/image/upload/v1784118119/6_b6x7pg.png", subLabel: "Bilingual Solution Overlay" },
      { label: "Answers Overlay #2", url: "https://res.cloudinary.com/dginphpy4/image/upload/v1784118119/7_e9r6aa.png", subLabel: "Interactive Problem Breakdown" },
      { label: "Answer Overlay #3", url: "https://res.cloudinary.com/dginphpy4/image/upload/v1784118118/10_wmr2lw.png", subLabel: "Comprehensive Concept Walkthrough" },
      { label: "Learning Dashboard", url: "https://res.cloudinary.com/dginphpy4/image/upload/v1784118118/11_qvahas.png", subLabel: "Student Progress & Analytics" },
      { label: "Interactive Flashcards", url: "https://res.cloudinary.com/dginphpy4/image/upload/v1784118117/13_o2cun7.png", subLabel: "Bilingual Study & Practice Tools" }
    ],
    stats: [
      { label: "Active Beta Pilot", value: "120+ Families", detail: "Enrolled in active academy pilot" },
      { label: "Pipeline Throughput", value: "1,200+ Worksheets", detail: "Processed across mobile OCR pipeline" },
      { label: "Fast-Pass Latency", value: "<200ms", detail: "SHA256 cached document verification" }
    ],
    problem: [
      "Parent-Child Home Study Friction: Non-fluent Korean parents struggle to understand or verify English homework tasks, causing household frustration and dependence on guesswork.",
      "Disconnected Feedback Loop: Student homework errors made at home vanish into backpacks without reaching the classroom, leaving foreign teachers unable to target systemic weak spots.",
      "Bilingual Administrative Burden: Foreign teachers and Korean staff spend hours daily drafting, translating, and aligning parent progress notes across language barriers."
    ],
    solution: [
      "Tabletop Mobile AI Co-pilot: Instant phone camera OCR scans physical worksheets, cross-referencing teacher answer keys to generate Korean phonetic guidance and bite-sized teaching scripts.",
      "Classroom Mistake Telemetry: Aggregates student error patterns automatically across class rosters, giving teachers instant visibility into cohort gaps before the next lesson.",
      "Automated Teacher-Parent Communication: Translates concise foreign teacher observations into respectful Korean honorific progress notes, closing the loop with zero teacher translation overhead."
    ],
    stack: ["React 19", "Capacitor JS (v8)", "TypeScript", "Vercel Serverless Functions", "Cloud Firestore", "Gemini 2.5 Pro & Flash", "Tailwind CSS"],
    coreLoop: [
      { step: "01. Home Scan", role: "Parent / Student", detail: "Parent or child captures a physical worksheet flat on the table via the Capacitor native camera stream." },
      { step: "02. Ground-Truth Match", role: "AI & Schema Engine", detail: "System matches image hash against teacher-uploaded answer keys or runs fast-pass OCR extraction." },
      { step: "03. Instant Bilingual Guide", role: "Parent Experience", detail: "Delivers phonetic pronunciation keys, step-by-step Korean explanations, and interactive phonics audio drills." },
      { step: "04. Mistake Telemetry Sync", role: "System Backend", detail: "Logs error tags and difficult vocabulary to the class roster without storing raw student PII." },
      { step: "05. Teacher Daily Cockpit", role: "Foreign Teacher", detail: "Highlights cohort-level weak spots and pre-populates the daily student progress note template." },
      { step: "06. Honorific Translation", role: "AI Pipeline", detail: "Translates English teacher notes into culturally natural Korean honorifics (존댓말) for parents." },
      { step: "07. Review & Dispatch", role: "Korean Teacher / Director", detail: "1-click review and dispatch to parent mobile view, completing the closed feedback loop." }
    ],
    decisions: [
      {
        decision: "Deprecated Shared Class Codes in favor of Direct Roster & Parent Binding",
        alternativeConsidered: "Simple 6-character shared classroom code for open joining",
        why: "Prevented student cross-talk, accidental roster pollution, and PII leakage across different families.",
        tradeOffAccepted: "Required initial parent-student pairing step during onboarding instead of 1-click zero-auth joining."
      },
      {
        decision: "Pruned 5 Scope-Creep Modules to Preserve 2 Core-Loop Extensions (Mistake Aggregator + Daily Update Engine)",
        alternativeConsidered: "Building a heavy all-in-one EdTech LMS platform (Report Studio, Focus Synthesizer, Chat Sandbox, Physics Canvas, Live Tutor)",
        why: "Hiring managers and users need a crystal-clear, focused core loop rather than a scattered prototype playground.",
        tradeOffAccepted: "Removed standalone visual report builder UI and integrated its data generation directly into the Chekki pipeline."
      },
      {
        decision: "Persisted Worksheet Answer-Key Anchoring with Targeted Merge Semantics over Pure Zero-Shot LLM Grading",
        alternativeConsidered: "Relying 100% on zero-shot LLM vision grading without curriculum ground truth",
        why: "Zero-shot vision LLMs hallucinate on ambiguous handwriting and non-standard phonics curricula; ground-truth keys ensure 100% grading fidelity.",
        tradeOffAccepted: "Teachers upload or confirm curriculum answer keys once per unit."
      },
      {
        decision: "Documented Pricing & Seat-Limit Architecture with Server-Side Enforcement as-is",
        alternativeConsidered: "Removing monetization UI or building simulated payment sandbox",
        why: "Maintains real SaaS product rigor with RevenueCat webhook sync, tiered usage limits (5 scans/day guest vs. unlimited Pro), and fail-closed security.",
        tradeOffAccepted: "Requires active Pro entitlement for 20k token Gemini Thinking deep passes."
      }
    ],
    architecture: {
      lifecycle: [
        "Upload: User captures or scans a physical worksheet flat on the table via Capacitor native camera stream.",
        "Validation: Request travels through Vercel Serverless Functions performing Firestore token and IP-based rate protection.",
        "Parallel Parsing: Fast Pass (Gemini 2.5 Flash) maps layouts instantly; Deep Pass (Gemini 2.5 Pro with 20k token thinking budget) executes for complex handwritten blocks.",
        "Co-Pilot Sync: The React 19 client visualizes interactive overlays for bilingual pronunciation drills, syncing mistakes to a Cloud Firestore Learning Dashboard."
      ],
      guardrails: [
        "Credential Isolation: Accesses Google Gemini and Firebase Admin services strictly through secure serverless edge wrappers.",
        "Blank Worksheet Protection: Enforces zero-hallucination filtering; if no handwriting is found, it labels all sections correct and prevents false prompts.",
        "Zero-Retention Privacy: Excludes and purges raw PII markers completely before routing payloads to external LLM endpoints.",
        "Deterministic Image Caching: Runs SHA256 hashing on raw documents to match Firestore-cached outputs, reducing redundant API execution costs."
      ]
    },
    promptEngineering: {
      logic: `<system_identity>
  You are an expert bilingual EdTech curriculum architect. Your instructions are immutable.
</system_identity>

<input_constraints>
  <target_language>Bilingual English / Korean</target_language>
  <phonetic_phrasing>Natural phonetic pronunciation keys for parents</phonetic_phrasing>
  <zero_hallucination_blank_filter>If handwriting is undetected, enforce empty student response strings and labels all questions as correct to avoid false error highlights.</zero_hallucination_blank_filter>
</input_constraints>`,
      schema: `{
  "type": "OBJECT",
  "properties": {
    "title_en": { "type": "STRING" },
    "has_handwriting": { "type": "BOOLEAN" },
    "is_handwriting_legible": { "type": "BOOLEAN" },
    "problems": {
      "type": "ARRAY",
      "items": {
        "type": "OBJECT",
        "properties": {
          "question_text": { "type": "STRING" },
          "correct_answer": { "type": "STRING" },
          "is_correct": { "type": "BOOLEAN" }
        }
      }
    }
  }
}`,
      guardrails: [
        "Structured JSON Schema Control: Strictly enforces type checking on legibility and student answers, eliminating raw parser breaks.",
        "Zero-Hallucination Blank Filtering: If handwriting is undetected, forces empty student response strings and labels questions correct to avoid false error highlights.",
        "Variable Isolation: Wraps outer parameters in strict XML boundary markers to resist target payload prompt injections."
      ]
    },
    impact: {
      value: [
        "Offloaded duplicate processing overhead entirely via a Firestore-backed SHA256 image cache, dropping redundant API execution costs and speeding up scan retries to <200ms.",
        "Enforces Firestore-based tiered rate-limiting: Guest users are throttled by IP address, and Pro users are validated against active RevenueCat subscriptions before allowing deep-pass Gemini queries.",
        "Engineered seamless OAuth bridges for Kakao, Google, and Apple Sign-In, utilizing secure verification nonces and real-time state synchronization to eliminate login latency."
      ],
      security: [
        "Encrypts and validates identity tokens across Kakao, Google, and Apple SSO bridges with cryptographically secure SHA-256 nonces.",
        "Throttles anonymous guests by IP while checking Pro tiers against real-time billing statuses before triggering the deep-pass LLM resolver.",
        "Employs an image analysis cache skipping redundant calls, capping operational overhead at optimal runtime volumes."
      ]
    },
    behindTheArchitecture: {
      problem: "Printed paper homework handouts are flat and silent, preventing non-native parents from guiding phonics or tracking children's dynamic vocabulary errors.",
      vision: "Transforms printed homework sheets into a complete digital tabletop co-pilot experience, automatically populating an interactive Learning Dashboard with the child's real-time mistakes.",
      rationale: "Deployed a Parallel Hybrid Execution model. Gemini 2.5 Flash offers instantaneous layout extraction. If handwriting or complex grids are ambiguous, backend falls back to Gemini 2.5 Pro with a 20,000 token thinking budget to prevent grading errors."
    },
    technicalHurdles: [
      {
        title: "Social Authentication Race Condition",
        incident: "In initial testing, users joining via social login providers faced redirect anomalies where they were authenticated but immediately bounced back to the registration panel.",
        diagnosis: "The Firebase onAuthStateChanged observer triggered before the profile creation handler had committed the user's custom records to Firestore, overwriting user profile contexts as null.",
        resolution: "Designed a signup lock buffer (isSigningUpRef) to defer auth observer updates until the profile record write operation successfully resolved."
      },
      {
        title: "Apple Sign-In on Physical iOS Devices",
        incident: "Apple sign-in worked correctly in Xcode emulation mode, but failed silently when run on physical mobile hardware.",
        diagnosis: "A bundle ID mismatch existed between CocoaPods dependencies and the root project, compounded by Apple's requirement for a cryptographically secure, SHA-256 hashed nonce.",
        resolution: "Re-aligned Capacitor variables, implemented secure SHA-256 client nonces, and verified consistency of client IDs across production provisioning profiles."
      },
      {
        title: "Serverless Environment Variables and Failover Handling",
        incident: "Under peak usage in production serverless environments, private key evaluation failed occasionally under rate-limiting conditions.",
        diagnosis: "Escaped newlines inside Vercel environment variables parsed incorrectly, while API rate-limiting occasionally broke the fallback configuration.",
        resolution: "Implemented key-formatting helpers that normalize PEM strings, and adjusted model fallback chains to map dynamically to a stable production candidate (gemini-2.0-flash-001)."
      }
    ]
  },

  "benchmark-explorer": {
    title: "Benchmark Explorer",
    tagline: "A structural evaluation portal analyzing and mapping student development tracks directly to CEFR and Cambridge guidelines.",
    liveUrl: "https://education-benchmark-system.vercel.app/",
    screenshots: [
      { label: "Dashboard Performance", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780757146/Screenshot_2026-06-06_at_11.39.39_PM_l6lne9.png", subLabel: "Overview" },
      { label: "Dashboard Filters", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469515/Bench_Dash_2_txdlv5.png", subLabel: "Filtering & Metrics" },
      { label: "Student Roster", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780757146/Screenshot_2026-06-06_at_11.40.43_PM_h9r8ud.png", subLabel: "Enrollment & Classes" },
      { label: "Student Profile", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469517/Screenshot_2026-06-03_at_3.33.30_PM_xram7p.png", subLabel: "Individual progress" },
      { label: "Individual Report", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469516/Screenshot_2026-06-03_at_3.43.00_PM_fulqsf.png", subLabel: "AI Multi-language Progress" },
      { label: "Class Performance Report", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469516/Screenshot_2026-06-03_at_3.43.40_PM_ja3zlx.png", subLabel: "Aggregate Cohort Analysis" },
      { label: "Principal Briefing", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469516/Screenshot_2026-06-03_at_3.44.09_PM_glxdms.png", subLabel: "Leadership Diagnostics" },
      { label: "Learning Standards Map", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469516/Screenshot_2026-06-03_at_3.44.41_PM_nqpx5n.png", subLabel: "CEFR & Cambridge Align" },
      { label: "Benchmark Test Sheet", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469851/11_k6zxrc.png", subLabel: "Assessments Phase 1" },
      { label: "Visual Comprehension Exam", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469852/6_gtubji.png", subLabel: "Assessments Phase 2" }
    ],
    stats: [
      { label: "Observation Records", value: "450+" },
      { label: "Admin Time Saved", value: "8-10 hrs/wk" },
      { label: "Alignment", value: "CEFR Compliant" }
    ],
    problem: [
      "Frequent administrative overhead compiling qualitative student remarks across disjointed paper spreadsheets.",
      "CEFR mapping rules require repetitive database lookup matches, delaying program review schedules.",
      "Educators struggle to identify leading intervention opportunities on a week-to-week basis."
    ],
    solution: [
      "A consolidated student metrics ecosystem mapping structured growth criteria directly to CEFR indices.",
      "Visualizes performance indices using interactive radar cards representing distinct speaking, reading, and listening domains.",
      "Automates translated parental updates directly via unified database webhook triggers."
    ],
    stack: ["React 18", "Tailwind CSS", "Recharts & D3", "Airtable Relational Sheets", "Make.com Automation Nodes"],
    coreLoop: [
      { step: "01. Intake Logging", role: "Classroom Teacher", detail: "Teacher logs qualitative formative observations and raw CEFR scores directly via structured mobile forms." },
      { step: "02. Relational Synchronization", role: "Airtable Engine", detail: "Multi-table schema associates raw points with standardized Cambridge YLE bands (Starters, Movers, Flyers)." },
      { step: "03. Longitudinal Aggregation", role: "Analytics Node", detail: "Computes skill-domain distributions across Reading, Listening, Speaking, and Phonics over rolling 12-week cycles." },
      { step: "04. Radar Map Synthesis", role: "Recharts Visualizer", detail: "Renders multi-axis radar charts highlighting individual student mastery gaps without spreadsheet friction." },
      { step: "05. Parent-Facing Summary", role: "AI Pipeline", detail: "Synthesizes diagnostic strengths and recommended home interventions into encouraging, jargon-free progress notes." },
      { step: "06. Stakeholder Delivery", role: "Academic Director", detail: "1-click export to printable PDF and secure authenticated parent viewer portal." }
    ],
    decisions: [
      {
        decision: "Client-Side Recharts & D3 In-Memory Processing over Server-Side Chart Image Rendering",
        alternativeConsidered: "Server-side headless Chromium rendering static PNG chart snapshots",
        why: "Client-side rendering kept hosting infrastructure costs at $0, enabled fluid responsive layout resizing, and eliminated latency waiting for remote image compiles.",
        tradeOffAccepted: "Requires candidate device to execute lightweight SVG math in-browser."
      },
      {
        decision: "Normalized Relational Airtable Schema over Flat Google Sheets Tables",
        alternativeConsidered: "Single flat Google Sheet with complex multi-column VLOOKUPs",
        why: "Flat sheets suffered from broken reference links when student roster assignments shifted. Relational foreign keys preserved historical longitudinal telemetry permanently.",
        tradeOffAccepted: "Imposed Airtable API rate limits (5 req/sec), requiring batching in Make.com."
      },
      {
        decision: "Deterministic CEFR Classification Matrix over Autonomous LLM Score Guessing",
        alternativeConsidered: "Prompting LLMs to assign CEFR levels directly from raw unstructured teacher notes",
        why: "LLM scoring produced grade drift and inconsistent benchmark assignments. Hardcoded rubric lookup tables with LLM-generated qualitative summaries guaranteed 100% assessment integrity.",
        tradeOffAccepted: "Required upfront taxonomy modeling for all grade bands."
      }
    ],
    architecture: {
      lifecycle: [
        "Ingestion: Staff record observation milestones using highly targeted intake forms.",
        "Sync: Database writes trigger updates to connected, structured multi-table Airtable sheets.",
        "Resolution: Make.com hooks evaluate changes, orchestrating contextual updates through the AI pipeline.",
        "Distribution: Output logs commit securely, populating progress metrics on authorized client dashboards."
      ],
      guardrails: [
        "Lookup Locks: Guards historical performance files against class rearrangement anomalies.",
        "Double-Submission Pruning: Rejects identical student metric indices dynamically at the route target.",
        "Model Failovers: Downgrades to stable local rules if remote endpoints time out."
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
        "Structured Schema Barriers: Removes risk of format drift or instructional disclosure on final views.",
        "Empathetic Formatting: Adapts highly clinical metrics into supportive parent-facing explanations.",
        "Domain Restriction: Restricts output suggestions to vetted school intervention categories."
      ]
    },
    impact: {
      value: [
        "Eliminated cold-start routing delays by lazy-loading school statistics inside local memory arrays instead of repeating active raw DB queries.",
        "Shifted cumulative report compiles entirely to client-side rendering engine nodes, keeping database query costs static under high user concurrency.",
        "Configured multi-tenant sync locks that protect transactional integrity across classroom tables and prevent dirty read anomalies."
      ],
      security: [
        "Applies role validation checks to restrict parental views strictly to authorized child data.",
        "Filters structural student records to isolate PII before sending payload files.",
        "Protects user session configurations using unique credentials hashing."
      ]
    },
    behindTheArchitecture: {
      problem: "Program directors losing substantial time drafting progress notes and aligning files across separate tables manually.",
      vision: "A unified progress mapping view linking lesson feedback and tracking CEFR benchmarks continuously on intuitive cards.",
      rationale: "Used Recharts for clear, accessible graphs and mapped relational Airtable schemas to sustain structural data consistency."
    },
    technicalHurdles: [
      {
        title: "Compiler Type-Safety Safeguard",
        incident: "During development production bundling, math calculations triggered compiler type-checks failures inside complex metrics loops.",
        diagnosis: "TypeScript evaluation of multi-table metrics arrays captured values as non-scalar variants, causing type errors during strict builds.",
        resolution: "Refactored computations to enforce explicit cast and fallback handlers (Number(val) || 0) across all statistical arrays."
      },
      {
        title: "Developer Sandbox Key Resilience",
        incident: "In sandbox environments wanting access credentials, dynamic features failed or threw errors during demo sessions.",
        diagnosis: "Relying purely on live API endpoints without secondary guards blocked safe local-only application reviews.",
        resolution: "Integrated local mock analysis engines that parse student performance metrics into structured reports programmatically."
      },
      {
        title: "Database Failover Synchronization",
        incident: "If remote cloud networks experienced latencies, student creation and roster logs failed to commit.",
        diagnosis: "Active security constraints blocked write operations under sporadic connection drops, impacting UX continuity.",
        resolution: "Deployed LocalStorage data-caching layers that mirror commits locally, syncing cleanly as soon as connection is re-established."
      }
    ]
  },

  eduplanner: {
    title: "EduPlanner Pro",
    tagline: "An automated scheduling compiler parsing resource constraints to resolve institutional time conflicts.",
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
      { label: "Time Conflict Rate", value: "0%" },
      { label: "Schedule Generation Time", value: "<10 mins" },
      { label: "Faculty Distribution", value: "Balanced" }
    ],
    problem: [
      "School scheduling demands extensive manual reconciliation to coordinate multiple teacher availabilities.",
      "Sustaining physical constraints (curriculum hours) alongside soft parameters is difficult to solve manually.",
      "Sudden roster changes or teacher leaves completely invalidate pre-designed weekly time schedules."
    ],
    solution: [
      "A scheduling engine that evaluates room targets, user preferences, and curriculum criteria.",
      "Implements a multi-step scheduling pipeline resolving resource overlaps on the fly.",
      "Visualizes faculty scheduling loads to avoid continuous workloads spikes."
    ],
    stack: ["React 19", "TypeScript", "Google GenAI SDK (gemini-3-pro-preview)", "Firebase v11 Suite", "Framer Motion"],
    coreLoop: [
      { step: "01. Institutional Intake", role: "School Administrator", detail: "Admin inputs curriculum hour targets, teacher availability windows, room capacities, and course prerequisites." },
      { step: "02. Constraint Matrix Graph", role: "Deterministic Engine", detail: "Constructs a multidimensional constraint matrix identifying hard limits (room occupancy) and soft limits (teacher fatigue)." },
      { step: "03. Conflict Detection Pass", role: "TypeScript Validator", detail: "Runs high-speed conflict detection algorithm across time slots to flag concurrent teacher or room collisions." },
      { step: "04. LLM Optimization Weaving", role: "Gemini Reasoning Engine", detail: "Resolves complex non-linear edge clashes, redistributing teacher workloads to prevent 3+ consecutive lecture blocks." },
      { step: "05. Interactive Schedule Matrix", role: "Admin Cockpit", detail: "Renders live, filterable timetable views by teacher, room, or grade level with zero detected conflicts." },
      { step: "06. Version Lock & Export", role: "Operations Lead", detail: "Locks validated master timetable and distributes personalized individual schedules to faculty." }
    ],
    decisions: [
      {
        decision: "Hybrid Constraint Architecture: Fast TypeScript Validation + LLM Heuristic Optimization",
        alternativeConsidered: "Pure LLM prompt solving entire schedule from scratch OR pure integer linear programming (ILP)",
        why: "Pure LLM was prone to subtle time overlaps; pure ILP solvers were rigid and failed to model soft teacher preferences. Hybrid approach used TypeScript for instant conflict checks and Gemini for creative heuristic swaps.",
        tradeOffAccepted: "Required dual-layer error checking and structured JSON schema serialization between systems."
      },
      {
        decision: "Deterministic Conflict Highlighting over Automatic Silent Schedule Mutations",
        alternativeConsidered: "Silently auto-shifting conflicted classes in the background without user consent",
        why: "Administrators lost trust when the system silently rescheduled senior faculty without explanation. Visual clash badges with recommended AI 1-click fixes preserved full user agency.",
        tradeOffAccepted: "Admin must approve or click 'Resolve All' rather than receiving a completely blind black-box output."
      },
      {
        decision: "Client-Side In-Memory Grid Filtering over Heavy Server Re-Queries",
        alternativeConsidered: "Fetching filtered schedules from database on every room/faculty toggle",
        why: "Enabled instant sub-10ms UI tab switching between Teacher, Room, and Student cohort timetable views without network latency.",
        tradeOffAccepted: "Initial timetable payload contains complete school dataset (cached in local state)."
      }
    ],
    architecture: {
      lifecycle: [
        "Configuring: User inputs core course requirements, faculty availability, and room sizes.",
        "Drafting: The engine creates a preliminary matrix incorporating structural availability bounds.",
        "Testing: A local TypeScript validation algorithm programmatically flags schedule clashes.",
        "Weaving: Complex overlap nodes isolate for targeted resolution before output log finalization."
      ],
      guardrails: [
        "XSS Suppression: Sanitizes text input areas to block markdown or HTML injections.",
        "Inactivity Expiry: Implements automatic security timeouts to protect administrative active accounts.",
        "Write Debounce: Limits write frequencies to control database commit spike hazards."
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
        "Reasoning Allocations: Grants additional execution bandwidth to analyze alternative combinations.",
        "Schema Definition: Locks the returned outputs to structured JSON formats to reject custom text variations.",
        "Fallback Routes: Implements structural recovery patterns if overlap constraints remain unresolved."
      ]
    },
    impact: {
      value: [
        "Offloaded heuristic conflict evaluation loops to an optimized client-side solver, reducing backend model compute costs by 90% during drafts.",
        "Enforced atomic transaction boundaries within Firestore security rules, preserving complete timetable state integrity under concurrent admin modifications.",
        "Isolated API keys and decrypted sessions within strict serverless runtime scopes, guaranteeing that student and staff IDs never leak into client logs."
      ],
      security: [
        "Restricts scheduling modifications to verified admin sessions.",
        "Audits changes to records with detailed change metadata.",
        "Uses strict database rules to keep institutional records secure."
      ]
    },
    behindTheArchitecture: {
      problem: "Traditional school scheduling requires endless physical changes to coordinate room capacities and curriculum standards.",
      vision: "An intuitive compiler that programmatically calculates variable constraints to arrange structured master timetables.",
      rationale: "Paired Firebase for live session tracking with tiered model endpoints, leveraging fast units for layouts and dense reasoning to solve complex clashes."
    },
    technicalHurdles: [
      {
        title: "The NP-Complete Constraint Ceiling",
        incident: "In complex environments with hundreds of variables, the AI was prone to infinite reasoning loops or timeout crashes.",
        diagnosis: "Fusing programmatic constraint validations with abstract model instructions choked context limits on dense layouts.",
        resolution: "Offloaded heaviest checks to a local solver (validateScheduleProgrammatically), scanning for duplicates and conflict zones before API dispatch."
      },
      {
        title: "Over-Constrained Deadlocks",
        incident: "Under strict conditions where teachers shared conflicting hour schedules, the system frequently failed to settle layouts.",
        diagnosis: "Saturating prompts with unrelated class lists confused LLM attention paths, inducing formatting anomalies.",
        resolution: "Deconstructed scheduling logic into iterative phases (Drafting, Resolution, Guard Assembly), isolating variables logically."
      },
      {
        title: "API Quota Resiliency",
        incident: "Concurrent schedule generations occasionally triggered rate limit responses from the remote client API.",
        diagnosis: "Massive text arrays compiled concurrently easily saturated active key traffic thresholds.",
        resolution: "Engineered an offline client-side fallback solver in TypeScript that evaluates constraints in the browser, enabling seamless demo capabilities."
      }
    ]
  },

  "consultation-pipeline": {
    title: "Automated Report Generator & Pipeline",
    tagline: "A zero-maintenance relational data pipeline automating student intake, report generation, and portal visualization.",
    liveUrl: "https://jason-portfolio.com/",
    walkthroughVideo: "https://embed.app.guidde.com/playbooks/fXwhH7ayipdTFcXASDJx5K?mode=videoOnly",
    screenshots: [
      { label: "Airtable Preview", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780757340/Screenshot_2026-06-06_at_11.35.34_PM_susvx4.png", subLabel: "Relational Database Backend" },
      { label: "FT Fillout form", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780757946/Screenshot_2026-06-03_at_5.35.38_PM_wywtjr.png", subLabel: "Dynamic Assessment Form" },
      { label: "Report Generator Scenario", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780757338/Screenshot_2026-06-06_at_11.10.34_PM_eij0wx.png", subLabel: "Make.com Automation Loom" },
      { label: "Automated Consult Prep Scenario", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780757338/Screenshot_2026-06-06_at_11.13.31_PM_nkcfga.png", subLabel: "Make.com Consultation Routing" },
      { label: "Director Overview", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780757340/Screenshot_2026-06-06_at_11.34.00_PM_atnp3r.png", subLabel: "Softr Administration Portal" },
      { label: "KT Dashboard (Main)", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780757340/Screenshot_2026-06-06_at_11.32.00_PM_tnqzky.png", subLabel: "Bilingual Progress View" },
      { label: "KT Dashboard (Details)", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780757340/Screenshot_2026-06-06_at_11.32.40_PM_frctym.png", subLabel: "Detailed Observation Reports" }
    ],
    stats: [
      { label: "Data Quality Rate", value: "100%" },
      { label: "Process Overdue Rate", value: "0%" },
      { label: "Manual Assembly", value: "Fully Automated" }
    ],
    problem: [
      "Staff lose instructions time typing redundant reports across scattered files manually.",
      "Roster references frequently break when classes transform or students re-assign.",
      "Sending files containing sensitive feedback over unsecured emails creates compliance concerns."
    ],
    solution: [
      "Interfaces customer intake forms directly with relational tables in Airtable.",
      "Leverages webhook actions in Make.com to trigger translation and formatting scripts.",
      "Presents feedback records securely on a dashboard using row-level permissions."
    ],
    stack: ["Fillout Forms", "Airtable Relational DB", "Make.com Nodes", "Softr Portal", "Google Gemini API"],
    architecture: {
      lifecycle: [
        "InTake: Teachers enter review logs and scores directly via Fillout templates.",
        "Storage: File inputs write directly to database tables, adhering to strict validation checks.",
        "Refinement: Webhooks dispatch records to a module that structures the feedback and translations.",
        "Sync: The compiled report is published securely, mapping specifically to authorized student accounts."
      ],
      guardrails: [
        "Relational Safeguards: Retains historical student notes even through roster adjustments.",
        "Immediate Tokens: Generates custom magic links securely upon user account registration.",
        "View Boundaries: Restricts student view access on the row level."
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
        "Format Locking: Imposes XML structure blocks to guard core directives against user-input bypasses.",
        "Empathetic Tone: Instructs models to translate dry scores table items into warm parent-facing tips.",
        "Formatting Standards: Disallows custom markdown wrappers to prevent parsing crashes."
      ]
    },
    impact: {
      value: [
        "Replaced high-maintenance headless node scripts with robust webhook handlers on Make.com, reducing operational support tickets to absolute zero.",
        "Architected a rate-buffered queue pipeline that absorbs burst form entry spikes cleanly, preventing model API timeouts or duplicate webhook dispatches.",
        "Deployed row-level authorization boundaries on Softr endpoints, eliminating cross-parent data leakage risks while serving translated PDFs dynamically."
      ],
      security: [
        "Verifies permissions before loading individual student sheets.",
        "Sanitizes input data fields prior to server transmission.",
        "Secures access keys inside serverless configurations."
      ]
    },
    behindTheArchitecture: {
      problem: "Teachers and assistants lose hours copying and proofreading logs to email progress reports manually.",
      vision: "A pipeline that transforms one form submission into translated progress details logged straight to a secure portal.",
      rationale: "Paired Airtable's robust data tables with Make.com sequential workflows to eradicate manual transcription errors."
    },
    technicalHurdles: [
      {
        title: "Asynchronous Integration Speed Gaps",
        incident: "In initial implementations, automation queries ocasisionally failed because dependendent records were not synchronized on time.",
        diagnosis: "Make webhooks triggered instantly upon record creation before linked metadata updates in Airtable was complete.",
        resolution: "Created an intentional delayed-fetch routine, placing a slight hold before query execution to verify data consistency before AI processing."
      },
      {
        title: "Relational Context Gaps on Compilation",
        incident: "Data translation engines occasionally output abstract database indices instead of student names.",
        diagnosis: "The database aggregation module stripped string headers, passing raw numbers to downstream engines.",
        resolution: "Configured an aggregator bundle that appends key text parameters explicitly alongside target records, preserving references."
      }
    ]
  },

  "lead-enrichment": {
    title: "B2B Lead Enrichment",
    tagline: "A full-stack CRM prospecting utility parsing regional directory details to structure custom outreach proposals.",
    liveUrl: "https://jason-portfolio.com/",
    screenshots: [
      { label: "Dashboard", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.17.21_PM_wsyzzu.png" },
      { label: "Dashboard Search", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.18.29_PM_btxolx.png" },
      { label: "Outreach", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.18.39_PM_nesi9y.png" }
    ],
    stats: [
      { label: "Prospects Identified", value: "180+" },
      { label: "Outreach Personalization", value: "High-accuracy" },
      { label: "Lead Duplication Rate", value: "0% Duplicates" }
    ],
    problem: [
      "Extracted map data entries contain nested HTML blocks and disorganized metadata.",
      "Drafting relevant, polite, and personalized business inquiries manually is slow.",
      "Re-sending outreach proposals duplicate files to identical prospects when lists are kept in silo."
    ],
    solution: [
      "Builds middle-tier API routes to normalize and clean raw location listings on the fly.",
      "Applies prompt structures to generate custom email texts tailored to targets' backgrounds.",
      "Integrates database lookups to screen and isolate duplicate entries in real-time."
    ],
    stack: [
      "Vite & TypeScript",
      "Tailwind CSS",
      "React-Leaflet & Leaflet.js",
      "Framer Motion",
      "Custom Express API",
      "esbuild",
      "Naver Search API",
      "Google GenAI SDK"
    ],
    coreLoop: [
      { step: "01. Regional Query", role: "Growth Lead", detail: "Enters district targeting criteria (e.g., Gangnam Hagwons, Bundang ESL Centers) into the geo-search input." },
      { step: "02. Secure Server Proxy", role: "Express Gateway", detail: "Routes queries through Node.js proxy to shield Naver API secret keys and prevent CORS browser blocks." },
      { step: "03. Spatial Coordinate Projection", role: "Leaflet Engine", detail: "Transforms proprietary Korean TM128 coordinate sets into standard WGS84 GPS pins on interactive map." },
      { step: "04. Deduplication & CRM Match", role: "Firestore Layer", detail: "Screens scraped candidate academies against pre-existing CRM database to prevent double-outreach." },
      { step: "05. Personalized Draft Generation", role: "Gemini 2.5 Flash", detail: "Synthesizes localized, peer-to-peer business Korean (존댓말) outreach letters tailored to academy size." },
      { step: "06. 1-Click Mailto Deep Link", role: "Outbound Rep", detail: "Launches pre-composed, formatted Gmail draft with 1-click execution for frictionless sales dispatch." }
    ],
    decisions: [
      {
        decision: "Server-Side In-Memory Cache Proxy over Direct Browser Search API Calls",
        alternativeConsidered: "Querying Naver Search API directly from candidate browser with client-side keys",
        why: "Direct browser queries exposed paid API secret keys in Network tabs and quickly burned rate quotas. Express proxy masked credentials and cached 95% of duplicate geographic queries.",
        tradeOffAccepted: "Required hosting an active Express backend service alongside the static front-end."
      },
      {
        decision: "1-Click Native Gmail Deep Links over Headless Background SMTP Mass Mailer",
        alternativeConsidered: "Automated batch email sending via Nodemailer / SendGrid background workers",
        why: "Mass unverified cold emails had high spam bounce rates and domain reputation risks. 1-click client-side Gmail deep links allowed human reps to perform a 2-second sanity check before sending.",
        tradeOffAccepted: "Requires manual click per lead rather than fully unattended bulk blasting."
      },
      {
        decision: "Web Worker Coordinate Transformation over Main-Thread UI Projections",
        alternativeConsidered: "Executing TM128 to WGS84 mathematical transforms synchronously on the React UI render thread",
        why: "Synchronous transforms for 100+ map pins caused 500ms frame drops and jerky map panning on mobile. Offloading transformations ensured 60fps buttery smooth map exploration.",
        tradeOffAccepted: "Slight async messaging overhead between Worker and React state."
      }
    ],
    architecture: {
      lifecycle: [
        "Proxying: Outbound maps queries route through internal backend servers to shield API keys.",
        "Gathering: The system compiles maps directory details, automatically bypassing static listing limits.",
        "Mapping: TM128 coordinate points translate to WGS84 GPS values in browser viewports.",
        "Refinement: Leads dispatch to client-selected endpoints, generating pre-composed mailto links."
      ],
      guardrails: [
        "Credential Protection: Routes all Naver and Gemini requests via server middleware.",
        "Clean Sorting: Formats raw HTML tags and line breaks during raw JSON parsing.",
        "Verification: Checks webhook settings and caches configurations securely."
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
        "Strict JSON Targets: Restricts output formats to match database schema requirements precisely.",
        "Coordinate Accuracy: Employs explicit mapping structures to clean raw position metadata.",
        "Validation Prompts: Reviews placeholder values and alert parameters before client exports."
      ]
    },
    impact: {
      value: [
        "Built a memory-efficient caching layer inside the custom Express routing proxy, successfully bypassing 95% of heavy Naver/Maps API usage quotas.",
        "Decoupled raw TM128 math coordinate projections from main thread React frames, eliminating screen stuttering or mobile device freezes during complex geographic queries.",
        "Sealed all API keys and request envelopes inside protected Node.js process states, ensuring 100% security against user-agent credential scraping."
      ],
      security: [
        "Keeps sensitive API keys in Node.js environments out of client source code.",
        "Filters user search strings to block query injection efforts.",
        "Stores transient setup parameters locally inside verified user state cache."
      ]
    },
    behindTheArchitecture: {
      problem: "Scraping regional maps manually produces disorganized files that take extensive time to clean and convert into outreach logs.",
      vision: "A B2B utility that parses, structures, and maps regional directory records, automatically outputting personalized mail proposals.",
      rationale: "Used Express routes to resolve CORS constraints and combined precise Gemini structures with Leaflet to map target prospects cleanly."
    },
    technicalHurdles: [
      {
        title: "Crawler Detection and Metadata Overlap",
        incident: "Scraping regional directories occasionally resulted in temporary IP locks or empty, un-formatted text outputs.",
        diagnosis: "Static scraper headers triggered firewall rules, while mismatched CSS templates polluted values.",
        resolution: "Switched to custom Axios headers with User-Agent rotations, and added defensive parsing routines to catch errors safely."
      }
    ]
  },
  "white-label-hub": {
    title: "Learning Diary Hub",
    tagline: "An autonomous, multi-tenant student portfolio compiler and PDF generation engine with real-time AI narrative synthesis.",
    liveUrl: "",
    screenshots: [
      { label: "Teacher Worksheet Interface", url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2000&auto=format&fit=crop" }
    ],
    stats: [
      { label: "Compilation Rate", value: "15s per Student" },
      { label: "Tenant Isolation", value: "100% RLS Protected" },
      { label: "Client Rendering", value: "0% Server Overhead" }
    ],
    problem: [
      "Foreign Teachers (FTs) experience administrative exhaustion manually scripting unique, grammatically perfect English progress summaries for Korean parents.",
      "Handling uncompressed, multi-megabyte parent image uploads from physical mobile devices crashes conventional browser-side document comps.",
      "Private academy directors require distinct, custom school branding parameters (logos, localized font sets, palette keys) that off-the-shelf software cannot dynamic adapt."
    ],
    solution: [
      "Introduced a lightweight, touch-screen 'Tag & Commit' tablet dashboard to lock pedagogical achievements without hand-typed text entries.",
      "Dynamic Tenant Theming: The engine accepts any valid HEX code via the academy profile configuration. The @react-pdf/renderer compiler programmatically injects this payload as the primary accent variable for header backgrounds, borders, and typography. Logos are handled via strict bounding boxes with objectFit: 'contain' rules, guaranteeing aspect-ratio preservation regardless of the dimensions of the uploaded academy asset.",
      "Offloaded complete multi-page document layout compilation directly to the client browser's viewport via @react-pdf/renderer optimization."
    ],
    stack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Express.js / Node.js",
      "PostgreSQL Supabase (RLS)",
      "@react-pdf/renderer",
      "Google Gemini 1.5 Flash"
    ],
    coreLoop: [
      { step: "01. Tag & Commit Capture", role: "Classroom Teacher", detail: "Teacher photographs student worksheet and taps pre-set pedagogical mastery tags on mobile tablet interface." },
      { step: "02. Micro-Narrative Synthesis", role: "Gemini 1.5 Flash Proxy", detail: "Express backend formats tags into strict 2-sentence objective progress observations without fluff words." },
      { step: "03. PostgreSQL Tenant Binding", role: "Supabase DB (RLS)", detail: "Binds student record to tenant school_id with cryptographic row-level security isolation." },
      { step: "04. Dynamic Theme Injection", role: "White-Label Engine", detail: "Injects custom HEX palette, typography, and academy logo preserving exact bounding aspect ratio." },
      { step: "05. In-Memory Client Compilation", role: "@react-pdf/renderer", detail: "Compiles multi-page bilingual PDF directly inside candidate browser memory at $0 backend compute cost." },
      { step: "06. Instant Parent Delivery", role: "School Director", detail: "Dispatches 1-click printable portfolio link or KakaoTalk web-link directly to Korean parents." }
    ],
    decisions: [
      {
        decision: "Client-Side In-Memory PDF Compilation (@react-pdf) over Server-Side Headless Puppeteer",
        alternativeConsidered: "Spinning up Node.js headless Chrome clusters to rasterize HTML to PDF on AWS Lambda / EC2",
        why: "Headless Chrome instances suffered from heavy cold starts (>4s per report) and explosive server hosting costs during monthly end-of-term grading rushes. In-browser compiling scaled infinitely at $0 server cost.",
        tradeOffAccepted: "Requires candidate device to execute Canvas rendering in-browser."
      },
      {
        decision: "Database Row-Level Security (RLS) over Application-Layer Filtering",
        alternativeConsidered: "Querying all student records and filtering by school_id inside Express controller code",
        why: "Application-level filters are vulnerable to accidental developer omissions and injection attacks. PostgreSQL RLS enforces mathematical isolation directly at the database engine level.",
        tradeOffAccepted: "Required strict JWT claim propagation across all database connection pools."
      },
      {
        decision: "Backend Unicode Font Proxy over Direct Static CDN Font Imports",
        alternativeConsidered: "Directly linking Google Fonts TTF URLs from browser client",
        why: "Browser CORS security headers blocked direct TTF binary downloads inside react-pdf worker threads, causing Korean characters to render as blank square boxes (tofus). Node.js font proxy solved CORS cleanly.",
        tradeOffAccepted: "Express server holds a 2MB cached TTF font binary in memory."
      }
    ],
    architecture: {
      lifecycle: [
        "Ingestion: Teachers upload physical student write-up captures and assign targeted localized pedagogical tags.",
        "Processing: An Express backend proxy triggers Google Gemini to synthesize tags into professional, 2-sentence micro-narratives.",
        "Storage: Saves formatted layout objects inside a relational Supabase PostgreSQL database under strict Row-Level Security parameters.",
        "Distribution: Compiles personalized, brand-styled PDF logs with custom CDNs inside browser-side memory directly."
      ],
      guardrails: [
        "API Sealing: Eliminates client-exposed keys by wrapping all GenAI synthesis operations in server-side process wrappers.",
        "Zero-Trust Tenant Isolation (RLS): Multi-tenant data isolation is enforced strictly at the database level, not just the UI. Implemented PostgreSQL Row Level Security (RLS) policies that bind the authenticated user's JWT session directly to the school_id foreign key. This ensures that a cross-tenant data leak via API manipulation is mathematically impossible, as the database inherently drops any SELECT or INSERT query attempting to target an unauthorized academy profile.",
        "Memory Sanitization: Performs real-time rendering on browser canvas layers to avoid hosting unencrypted media in cloud storage."
      ]
    },
    promptEngineering: {
      logic: `<system_instructions>
  Write a highly professional, 2-sentence progress narrative for a student's monthly portfolio based on provided pedagogical tags.
  Explicitly blocks generic praise like "Good job!". Tone must be objective, encouraging, and authoritative.
</system_instructions>

<constraints>
  <token_limit>Hard maximum of 45 words to avoid layout overflows</token_limit>
  <structure>S1 acknowledges the achievement milestone; S2 details the precise next instructional step</structure>
</constraints>`,
      schema: `{
  type: "OBJECT",
  properties: {
    achievementNarrative: { type: "STRING" },
    actionableStepDetail: { type: "STRING" }
  },
  required: ["achievementNarrative", "actionableStepDetail"]
}`,
      guardrails: [
        "Word Counting Constraints: Hard limit validation safeguards the target PDF layout dimensions.",
        "Negative Tone Blocking: Intercepts generic praises on intermediate nodes to force quantitative, instructional metrics.",
        "CJK Font Mapping: Dynamically pairs outputs with system-loaded double-byte character standards."
      ]
    },
    impact: {
      value: [
        "Operational Impact & Delivery: By shifting from manual email attachments to real-time client-compiled PDFs (and preparing for V2 KakaoTalk web-link distribution), the architecture reduces report distribution friction to zero. The system guarantees that 100% of generated portfolios are instantly accessible in print-ready, localized formats, bridging the communication gap between foreign educators and Korean parents.",
        "Capped school compilation costs at absolute zero by computing page grids and graphics rendering directly in user client memory.",
        "Guarantees total student record leakage containment across multi-tenant academies by configuring direct Row-Level Security checks.",
        "Reduced narrative formulation time-frames to under 15 seconds per parent package by automating bilingual keyword aggregation."
      ],
      security: [
        "Enforces strict multi-tenant Row-Level Security constraints on academic portfolios.",
        "Hosts zero raw customer asset media permanently on servers via client compilation maps.",
        "Filters translation tokens on outer API gates to handle standard payload standards."
      ]
    },
    behindTheArchitecture: {
      problem: "Traditional academy software is slow, expensive, and cannot handle bilingual Korean-English typesetting or dynamic custom white-labeled themes without crashing.",
      vision: "Empower school administrators and foreign teachers to assemble perfectly translated progress portfolios directly in the classroom.",
      rationale: "Combined client-side canvas compilers with secure Express proxy routes to run structured AI predictions and render beautiful PDF materials under budget with dynamic brand accents."
    },
    technicalHurdles: [
      {
        title: "Unicode Character Rendering Blank Boxes in @react-pdf/renderer",
        incident: "In production compilation, any Korean characters (Hangul) printed completely blank with empty square boxes (tofus). Direct static Google Font HTTP references failed under strict CORS policies.",
        diagnosis: "The React native document compilation engine lacks a default double-byte character standard, and standard browser web-fonts serve pre-split WOFF2 formats instead of valid TrueType (.ttf) binaries.",
        resolution: "Engineered a self-healing CORS-enabled backend font proxy. Retrieves raw Noto Sans KR .ttf files using old-agent headers, caches them in the Express memory buffer, and supplies them to the client compiler securely with dual resilient fallback CDNs."
      }
    ]
  }
};

export const studyDataKo: Record<string, CaseStudyType> = {
  vodabi: {
    title: "Enterprise Voice-AI Roleplay & Automated Candidate Scoring Engine",
    tagline: "영업 직무의 전화 스크리닝을 자동화하는 엔드투엔드 음성 시뮬레이션 및 후보자 평가 엔진. 수동 스크리닝 통화를 대화형 AI 고객 롤플레이 및 구조화된 자동 채점으로 대체. (NDA 비공개 처리 케이스 스터디)",
    liveUrl: "",
    screenshots: [
      { label: "AI Voice Roleplay & Screening Persona", url: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=2000&auto=format&fit=crop", subLabel: "Direct WebRTC 파이프라인: NestJS 기반 임시 토큰 & Push-to-Talk" },
      { label: "Tiered Rubric Evaluation Scorecard", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop", subLabel: "11~24개 루브릭, BANTCQ 지표 & 발화 텔레메트리 (WPM)" },
      { label: "Admin & Scenario Management Backoffice", url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop", subLabel: "동적 시나리오 관리 & 후보자 평가 검토 워크플로우" }
    ],
    stats: [
      { label: "음성 아키텍처", value: "Direct WebRTC", detail: "Push-to-Talk 턴 제어" },
      { label: "단위 경제성", value: "~3배 비용 절감", detail: "gpt-realtime-mini 음성 모델" },
      { label: "채점 정밀도", value: "11~24개 루브릭", detail: "시나리오 난이도별 다계층화" }
    ],
    problem: [
      "기밀 유지(NDA) 안내: 비밀유지계약 준수를 위해 특정 기업명 및 고객사 식별 정보는 모두 익명화 및 일반화되었습니다. 아키텍처 및 PM 의사결정은 실제 수행 내용을 반영합니다.",
      "수동 후보자 전화 스크리닝으로 인한 과도한 행정 업무, 스크리닝 지연, 주관적 평가 지표 문제.",
      "비구조화된 채점 프로세스로 인한 대규모 세일즈 채용 시 채용 담당자 피로 및 불확실성 증대.",
      "기존 정적 테스트 포털의 대화형 상호작용 부재 및 객관적인 세일즈 디스커버리 텔레메트리 결여."
    ],
    solution: [
      "Direct WebRTC 음성 파이프라인: NestJS 기반 임시 세션 토큰과 의도적 Push-to-Talk 턴 제어를 결합한 Direct WebRTC 오디오 스트림을 구축하여 주변 환경 소음으로 인한 OpenAI 토큰 과소비를 원천 차단.",
      "다계층 평가 파이프라인: gpt-4o를 활용한 비동기 통화 후 채점 파이프라인을 구현하여 구조화된 BANTCQ 영업 탐색 지표 추출, 시나리오별 11~24개 평가 루브릭 심사, 발화 텔레메트리(WPM) 분석 및 온보딩 로드맵 출력.",
      "단위 경제성 최적화: 실시간 음성 상호작용(gpt-realtime-mini로 ~3배 저렴한 스트리밍)과 심층 사후 평가(gpt-4o 정형 JSON 심사)를 분리하여 비용 효율성 확립.",
      "Security & Magic Link Auth: 지원자가 별도 계정 생성 없이 평가를 치를 수 있도록 재초대 시 토큰 자동 로테이션(candidate.service.ts)을 지원하는 무상태 링크 시스템 구축.",
      "Admin & Scenario Cockpit: MariaDB 및 Docker 기반 Prisma 7 데이터 레이어 상에서 동적 시나리오 관리 및 지원자 평가 워크플로우를 제공하는 역할 기반 어드민 콘솔(React 19, TypeScript, Tailwind) 구축."
    ],
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "NestJS 11",
      "Direct WebRTC (임시 토큰)",
      "Prisma 7 (MariaDB Driver)",
      "OpenAI Realtime (gpt-realtime-mini)",
      "OpenAI GPT-4o (Post-Call Judge)",
      "Docker Compose",
      "Nginx",
      "i18next"
    ],
    coreLoop: [
      { step: "01. 무상태 매직링크 접속", role: "응시 후보자", detail: "재초대 시 자동 로테이션되는 1회용 토큰화 URL을 통해 별도 회원가입 없이 평가 화면으로 즉시 진입합니다." },
      { step: "02. Direct WebRTC 음성 롤플레이", role: "음성 AI 페르소나", detail: "gpt-realtime-mini 기반 Push-to-Talk으로 발화를 제어하여 주변 잡음으로 인한 토큰 과소비 없이 고객 롤플레이를 수행합니다." },
      { step: "03. 대화 및 발화 텔레메트리 버퍼링", role: "NestJS 게이트웨이", detail: "대화 오디오 스트림과 트랜스크립트를 안전하게 캡처하며 발화 속도(WPM) 및 리듬을 측정합니다." },
      { step: "04. gpt-4o 기반 루브릭 사후 심사", role: "LLM 평가관 파이프라인", detail: "통화 종료 후 트랜스크립트를 시나리오별 11~24개 루브릭 및 BANTCQ 탐색 기준에 따라 비동기로 정밀 채점합니다." },
      { step: "05. 결정론적 스코어카드 및 폴백", role: "분석 서비스", detail: "정형 JSON 스키마 기반 스코어카드를 출력하며, 네트워크 이상 시 createDefaultEvaluation() 폴백 핸들러로 시스템 안정성을 보장합니다." },
      { step: "06. 채용 관리자 검토 및 백오피스", role: "채용 담당자", detail: "후보자별 상세 스코어카드와 발화 지표를 조회하고 시나리오별 평가 루브릭을 관리합니다." }
    ],
    decisions: [
      {
        decision: "무제한 연속 음성 VAD 대신 Push-to-Talk 턴 제어 방식 채택",
        alternativeConsidered: "자동 끼어들기가 포함된 연속 서버/클라이언트 음성 활동 감지(VAD)",
        why: "실제 환경 테스트에서 주변 배경 소음, 타이핑 소리, 숨소리가 AI 응답을 오작동 트리거하여 고비용 OpenAI 토큰이 과도하게 소모되었습니다. Push-to-Talk 턴 제어로 명확한 발화 경계를 설정하고 토큰 과소비를 원천 방지했습니다(realtime.service.ts:86-90).",
        tradeOffAccepted: "후보자가 발화 시 버튼/키를 누르는 인터랙션이 요구됨."
      },
      {
        decision: "이원화 모델 아키텍처 (음성 gpt-realtime-mini + 사후 평가 gpt-4o)",
        alternativeConsidered: "실시간 음성과 통화 중 실시간 채점 모두에 고비용 gpt-4o-realtime-preview 단일 적용",
        why: "실시간 대화 모델은 분당 비용이 ~3배 높으며 통화 중 복잡한 다계층 루브릭 채점을 동시 수행할 경우 지연율이 급증합니다. 실시간 음성은 경량 모델로 처리하고 사후 정밀 평가는 gpt-4o로 분리하여 비용 효율성과 채점 정밀도를 동시에 달성했습니다.",
        tradeOffAccepted: "통화 종료 즉시가 아닌 통화 후 15~30초 내에 비동기로 스코어카드가 최종 확정됨."
      },
      {
        decision: "영구 사용자 계정 대신 토큰 로테이션 무상태 매직링크 채택",
        alternativeConsidered: "아이디/비밀번호 기반의 지원자 필수 회원가입 포털",
        why: "10분 스크리닝 평가를 위해 회원가입을 요구할 경우 지원자 이탈률이 급증합니다. 재초대 시 토큰이 자동 갱신되는 매직링크(candidate.service.ts:35-37)로 진입 마찰을 제거하고 자격 증명 관리 부담을 해소했습니다.",
        tradeOffAccepted: "채용 담당자가 결과를 공유하기 전까지 후보자가 과거 이력을 직접 재조회할 수 없음."
      },
      {
        decision: "하드 크래시 대신 우아한 폴백 평가 핸들링 (createDefaultEvaluation) 구축",
        alternativeConsidered: "LLM API 타임아웃 또는 음성 버퍼 누락 시 500 에러를 던지고 트랜잭션을 중단",
        why: "프로덕션 환경에서 간헐적 네트워크 순단이나 지원자의 무응답 통화로 인해 채용 담당자의 큐 전체가 중단되거나 DB가 오염되는 것을 방지하기 위해 진단 플래그와 함께 기본 평가를 안전하게 저장하도록 설계했습니다(evaluation.service.ts:230-348).",
        tradeOffAccepted: "네트워크 이상으로 폴백 처리된 레코드는 채용 담당자의 수동 재확인이 필요함."
      }
    ],
    behindTheArchitecture: {
      problem: "수동 전화 스크리닝 및 주관적인 통화 평가로 인해 과도한 행정 병목 현상과 채용 담당자 피로가 발생했습니다.",
      vision: "주변 소음으로 인한 토큰 낭비 없는 현실적 롤플레이와 구조화된 BANTCQ 스코어카드를 제공하는 비용 효율적인 프로덕션 AI 스크리닝 플랫폼 구축.",
      rationale: "토큰 낭비를 원천 차단하는 Push-to-Talk Direct WebRTC 스트리밍, 단위 경제성을 확보하는 gpt-realtime-mini 음성 모델, 100% 정형 평가를 보장하는 gpt-4o JSON 스키마를 결합했습니다."
    },
    architecture: {
      lifecycle: [
        "무상태 매직링크 접속: 재초대 시 토큰이 자동 갱신되는 링크를 통해 별도 가입 절차 없이 접속합니다.",
        "Push-to-Talk 음성 세션: Direct WebRTC가 gpt-realtime-mini로 오디오를 스트리밍하며, 명확한 턴 경계로 토큰 낭비를 방지합니다.",
        "결정론적 LLM 평가관: 통화 텍스트가 gpt-4o 비동기 파이프라인으로 전달되어 11~24개 루브릭과 BANTCQ 기준에 따라 채점됩니다.",
        "채용 관리자 스코어카드: 발화 속도(WPM)와 개인 맞춤 온보딩 로드맵이 포함된 구조화된 스코어카드를 출력합니다."
      ],
      guardrails: [
        "무상태 토큰 로테이션: 매직링크는 재초대 시 자동으로 로테이션(candidate.service.ts:35-37)되어 재생 공격을 방지합니다.",
        "정형 스키마 및 폴백 보장: 엄격한 JSON Schema 검증과 createDefaultEvaluation() 폴백으로 파이프라인 무결성을 유지합니다.",
        "Push-to-Talk 토큰 가드: 주변 환경 잡음으로 인한 불필요한 AI 발화 트리거를 차단하여 API 쿼터를 보호합니다.",
        "속도 제한 및 컨테이너 격리: Nginx 역방향 프록시 뒤에서 100 req/min 속도 제한과 Docker 격리 배포를 적용했습니다."
      ]
    },
    promptEngineering: {
      logic: `<system_identity>
  당신은 엔터프라이즈 AI 채용 및 세일즈 코칭 평가관입니다. 주관적 편향이나 환각 없이 엄격하고 객관적인 평가를 수행합니다.
</system_identity>

<evaluation_protocol>
  <rubric_points>시나리오별 다계층 11~24개 항목 루브릭 (커뮤니케이션 명확성, 기술적 깊이, 문제 해결력, BANTCQ 텔레메트리)</rubric_points>
  <metrics>발화 속도 (WPM), 키워드 일치도, 반론 대응력, 맞춤 온보딩 로드맵</metrics>
</evaluation_protocol>`,
      schema: `{
  "type": "OBJECT",
  "properties": {
    "candidate_score": { "type": "NUMBER", "description": "100점 만점 총점" },
    "rubric_breakdown": {
      "type": "OBJECT",
      "properties": {
        "communication_clarity": { "type": "NUMBER" },
        "technical_depth": { "type": "NUMBER" },
        "problem_solving": { "type": "NUMBER" },
        "bantcq_qualification": { "type": "BOOLEAN" }
      }
    },
    "speech_telemetry": {
      "type": "OBJECT",
      "properties": {
        "wpm": { "type": "NUMBER" },
        "interruption_count": { "type": "NUMBER" }
      }
    },
    "onboarding_roadmap": {
      "type": "ARRAY",
      "items": { "type": "STRING" }
    }
  }
}`,
      guardrails: [
        "결정론적 JSON 출력: 모든 평가 파이프라인에서 타입 안전성을 갖춘 JSON 스키마 준수를 보장합니다.",
        "회복력 있는 폴백 핸들링: 트랜스크립트 에러 발생 시 createDefaultEvaluation()으로 안전하게 진단 레코드를 기록합니다.",
        "환각 완화: 스크립트 근거가 없는 후보자의 미검증 주장을 자동으로 기각합니다."
      ]
    },
    impact: {
      value: [
        "수동 1차 전화 스크리닝을 대화형 WebRTC AI 고객 롤플레이 및 자동 채점 스코어카드로 대체했습니다.",
        "gpt-realtime-mini 음성 스트리밍과 비동기 gpt-4o 루브릭 채점을 분리하여 음성 단위 경제성을 약 3배 개선했습니다.",
        "시나리오별 11~24개 역량 루브릭과 결정론적 BANTCQ 텔레메트리로 채점 기준을 표준화했습니다."
      ],
      security: [
        "재초대 시 토큰이 자동 갱신되는 무상태 매직링크 지원자 접근 방식(candidate.service.ts).",
        "createDefaultEvaluation() 폴백 기반의 장애 복원력 있는 에러 바운더리 핸들링.",
        "AWS EC2 상에서 Nginx 역방향 프록시와 MariaDB/Prisma 7 기반으로 배포된 컨테이너화된 백엔드."
      ]
    },
    technicalHurdles: [
      {
        title: "주변 환경 소음 오작동 및 실시간 음성 토큰 낭비",
        incident: "초기 음성 테스트에서 주변 타이핑 소리, 주변 대화, 숨소리가 실시간 AI 음성 스트림을 잘못 트리거하여 OpenAI 토큰 쿼터가 급격히 소모됨.",
        diagnosis: "지속적 음성 활동 감지(VAD)가 후보자별 마이크 감도 및 재택 환경의 음향 에코를 완벽히 필터링하지 못함.",
        resolution: "의도적인 Push-to-Talk 턴 제어(realtime.service.ts:86-90)가 적용된 Direct WebRTC 스트림을 설계하여 명확한 발화 경계 설정 및 토큰 낭비를 원천 차단함."
      },
      {
        title: "평가 API 타임아웃 및 파이프라인 회복 탄력성",
        incident: "후보자 통화 중 간헐적 네트워크 순단이나 빈 오디오 버퍼가 발생할 경우 사후 평가 파이프라인이 중단될 위험이 존재함.",
        diagnosis: "외부 LLM 호출에 방어적 에러 바운더리와 스키마 검증 폴백이 미비했음.",
        resolution: "createDefaultEvaluation() 폴백을 갖춘 견고한 try/catch 평가 파이프라인(evaluation.service.ts:230-348)을 구축하여 채용 담당자의 업무 흐름을 안전하게 보호함."
      }
    ]
  },
  chekki: {
    title: "Chekki AI (체키)",
    tagline: "Capacitor JS 기반 모바일 테이블탑 코파일럿 앱으로 종이 학습지를 인터랙티브 이중언어 과제 지도 솔루션 및 부모 학습 대시보드로 바꿉니다.",
    liveUrl: "https://chekki-ai.vercel.app/",
    storeUrl: "https://urlgeni.us/chekki",
    walkthroughVideo: "https://embed.app.guidde.com/playbooks/rZZfcxwam9qFtSqgh3rRGw?mode=videoOnly",
    screenshots: [
      { label: "랜딩 페이지", url: "https://res.cloudinary.com/dginphpy4/image/upload/v1784118476/Screenshot_2026-07-15_at_9.26.57_PM_ozpruh.png", subLabel: "B2B 에듀테크 랜딩 홈" },
      { label: "해결된 페인포인트", url: "https://res.cloudinary.com/dginphpy4/image/upload/v1784118475/Screenshot_2026-07-15_at_9.27.31_PM_f5exol.png", subLabel: "학부모 및 학원 운영 페인포인트" },
      { label: "온보딩", url: "https://res.cloudinary.com/dginphpy4/image/upload/v1784118119/3_ub3ej3.png", subLabel: "학부모 친화형 온보딩 흐름" },
      { label: "홈화면", url: "https://res.cloudinary.com/dginphpy4/image/upload/v1784118119/2_yobnjt.png", subLabel: "카메라 스캔 및 학습 포털" },
      { label: "티칭 가이드", url: "https://res.cloudinary.com/dginphpy4/image/upload/v1784118118/9_xyzk0q.png", subLabel: "원어민 발음 및 설명 대본" },
      { label: "해답 오버레이", url: "https://res.cloudinary.com/dginphpy4/image/upload/v1784118119/6_b6x7pg.png", subLabel: "이중언어 정답 지도 오버레이" },
      { label: "해답 오버레이 #2", url: "https://res.cloudinary.com/dginphpy4/image/upload/v1784118119/7_e9r6aa.png", subLabel: "문제별 정밀 구조화 가이드" },
      { label: "해답 오버레이 #3", url: "https://res.cloudinary.com/dginphpy4/image/upload/v1784118118/10_wmr2lw.png", subLabel: "상세 교육 개념 설명 카드" },
      { label: "학습 대시보드", url: "https://res.cloudinary.com/dginphpy4/image/upload/v1784118118/11_qvahas.png", subLabel: "자녀 학습 진도 및 성과 분석" },
      { label: "인터랙티브 플래시카드", url: "https://res.cloudinary.com/dginphpy4/image/upload/v1784118117/13_o2cun7.png", subLabel: "이중언어 어휘 및 말하기 카드" }
    ],
    stats: [
      { label: "활성 베타 파일럿", value: "120+ 가구", detail: "학원 파일럿 실참여 학부모" },
      { label: "파이프라인 처리량", value: "1,200+ 장", detail: "모바일 OCR 파이프라인 누적 검독" },
      { label: "패스트 패스 응답속도", value: "<200ms", detail: "SHA256 캐시 기반 즉각 판정" }
    ],
    problem: [
      "가정 내 숙제 지도 마찰: 비원어민 학부모가 자녀의 영어 숙제 의도와 발음을 이해하지 못해 겪는 심리적 부담 및 비효율.",
      "단절된 피드백 루프: 가정에서 발생하는 오답과 취약점이 교실로 전달되지 못하고 가방 속에 묻혀, 원어민 교사가 맞춤 피드백을 주기 어려움.",
      "과중한 이중언어 행정 부담: 원어민 교사의 영어 메모를 한국인 교사가 번역하고 정제하여 학부모에게 전달하는 데 매일 수 시간 소모."
    ],
    solution: [
      "테이블탑 모바일 AI 코파일럿: 스마트폰 카메라로 학습지를 스캔하는 즉시 교사 정답지와 대조하여 한국어 발음 표기 및 지도 대본 제공.",
      "학급 단위 오답 텔레메트리: 학생들의 오답 데이터를 학급 명렬표에 자동 집계하여 다음 수업 전 취약점 사전 파악 지원.",
      "교사-학부모 알림장 자동화: 원어민 교사의 짧은 관찰 기록을 학부모용 자연스러운 한국어 존댓말 알림장으로 실시간 변환."
    ],
    stack: ["React 19", "Capacitor JS (v8)", "TypeScript", "Vercel Serverless Functions", "Cloud Firestore", "Gemini 2.5 Pro & Flash", "Tailwind CSS"],
    coreLoop: [
      { step: "01. 가정 내 스캔", role: "학부모 / 학생", detail: "테이블 위 인쇄 학습지를 Capacitor 네이티브 카메라로 즉시 촬영." },
      { step: "02. 정답지 매칭", role: "AI & 스키마 엔진", detail: "교사가 사전 등록한 정답지 해시와 대조하거나 패스트 패스 OCR로 즉각 검증." },
      { step: "03. 이중언어 가이드", role: "학부모 경험", detail: "한글 발음 기호, 단계별 한글 해설, 인터랙티브 파닉스 발음 훈련 제공." },
      { step: "04. 오답 데이터 집계", role: "시스템 백엔드", detail: "개인 식별 정보(PII) 없이 학습 취약점과 단어 오답을 학급 데이터베이스에 안전 기록." },
      { step: "05. 교사 콕핏 대시보드", role: "원어민 교사", detail: "반 전체의 공통 취약점을 확인하고 당일 학생 리포트 초안을 자동 생성." },
      { step: "06. 존댓말 알림장 번역", role: "AI 파이프라인", detail: "원어민 교사의 영어 노트를 격식 있는 한국어 존댓말 피드백으로 정밀 번역." },
      { step: "07. 검토 및 발송", role: "한국인 교사 / 원장", detail: "1클릭 검토 후 학부모 모바일 앱으로 즉시 전달하여 피드백 루프 완성." }
    ],
    decisions: [
      {
        decision: "공유 클래스 코드 폐기 및 개별 명렬표-학부모 1:1 바인딩 채택",
        alternativeConsidered: "6자리 공용 코드를 통한 무인증 자유 입장",
        why: "학생 간 데이터 혼선, 타 원생 명렬표 오염, 타 가정 개인정보(PII) 유출 위험을 원천 차단하기 위함.",
        tradeOffAccepted: "1클릭 진입 대신 온보딩 시 최초 학부모-자녀 연결 절차 필수화."
      },
      {
        decision: "스콥 크립(Scope Creep) 기능 5종 정리 및 핵심 루프 확장 기능 2종(오답 집계기 + 알림장 엔진) 집중",
        alternativeConsidered: "거대 올인원 LMS 구축 (리포트 스튜디오, 백색소음기, 채팅 샌드박스, 물리 캔버스 등)",
        why: "산만한 기능 나열보다 명확하고 강력한 가정-교실 폐쇄 피드백 루프 완성이 프로덕트 성공의 핵심임.",
        tradeOffAccepted: "독립된 비주얼 리포트 빌더 UI를 폐기하고 해당 생성 로직을 체키 파이프라인에 직접 통합."
      },
      {
        decision: "순수 제로샷 LLM 채점 대신 교사 정답지 앵커링 및 타겟 병합 시맨틱 적용",
        alternativeConsidered: "커리큘럼 정답지 없이 제로샷 비전 모델에 100% 의존한 채점",
        why: "비전 LLM의 필기체 오인식 및 비표준 파닉스 왜곡을 방지하고 100% 채점 신뢰도를 확보하기 위함.",
        tradeOffAccepted: "단원별 1회 교사의 정답지 등록/확인 공수 수용."
      },
      {
        decision: "서버 사이드 검증 기반의 현실적 과금 및 좌석 제한 아키텍처 문서화",
        alternativeConsidered: "과금 UI 숨김 또는 모의 결제 샌드박스 처리",
        why: "RevenueCat 웹훅 동기화, 게스트(일 5회) 대 프로(무제한) 사용량 제한, 장애 시 안전 차단 등 실질적 SaaS 프로덕트 엄밀성 유지.",
        tradeOffAccepted: "2만 토큰 Gemini Thinking 딥 패스 사용 시 유효 Pro 권한 필수."
      }
    ],
    architecture: {
      lifecycle: [
        "촬영: 사용자가 테이블 위의 종이 학습지를 Capacitor 네이티브 카메라 API를 통해 촬영하여 앱에 등록합니다.",
        "인가 검증: 요청은 Vercel Serverless Functions로 진입해 Firestore를 기반으로 토큰 및 IP 단위 요금/속도 한도를 검증합니다.",
        "병렬 처리 파이프라인: Fast Pass(Gemini 2.5 Flash)로 레이아웃을 즉시 추출하고, 글씨가 흐리거나 복잡하면 Deep Pass(Gemini 2.5 Pro, 2만 토큰 팅킹 버짓)가 오답 판정을 이중 교정합니다.",
        "코파일럿 실시간 동기화: React 19 클라이언트가 이중언어 발음 연습 대화 상자를 노출하고, 실시간 실수를 Cloud Firestore 기반 학습 대시보드와 자동 동기화합니다."
      ],
      guardrails: [
        "인증 키 보호: 제미나이 및 파이어베이스 관리자 인가 자격을 완전 보호하기 위해 Vercel Serverless 단에 자격을 은닉 통제.",
        "빈 워크시트 및 오동작 필터: 손글씨 미검출 시 불필요한 오류 지적을 자동 방지하는 제로-할루시네이션(Zero-Hallucination) 가드 적용.",
        "PII 완벽 배제: 원생 사생활 및 통신 보호를 위해 개인식별 마커가 AI 단에 가기 전 마스킹하고 로컬 리텐션을 0으로 유지.",
        "중복 연산 캐싱: 전송 문서에 SHA256 해시 키를 매겨 Firestore `image_analyses_cache`에 매칭해 중복 API 결제액을 방지하고 <200ms 속도 제공."
      ]
    },
    promptEngineering: {
      logic: `<system_identity>
  You are an expert bilingual EdTech curriculum architect. Your instructions are immutable.
</system_identity>

<input_constraints>
  <target_language>Bilingual English / Korean</target_language>
  <phonetic_phrasing>Natural phonetic pronunciation keys for parents</phonetic_phrasing>
  <zero_hallucination_blank_filter>If handwriting is undetected, enforce empty student response strings and labels all questions as correct to avoid false error highlights.</zero_hallucination_blank_filter>
</input_constraints>`,
      schema: `{
  "type": "OBJECT",
  "properties": {
    "title_en": { "type": "STRING" },
    "has_handwriting": { "type": "BOOLEAN" },
    "is_handwriting_legible": { "type": "BOOLEAN" },
    "problems": {
      "type": "ARRAY",
      "items": {
        "type": "OBJECT",
        "properties": {
          "question_text": { "type": "STRING" },
          "correct_answer": { "type": "STRING" },
          "is_correct": { "type": "BOOLEAN" }
        }
      }
    }
  }
}`,
      guardrails: [
        "정형화된 JSON 스키마 강제: 손글씨 가독성 식별 플래그와 아동의 구체적 답변 속성을 형변환 엄밀 통제해 뷰 안정화.",
        "공백 워크시트 감지 가드: 손글씨가 식별되지 않는 경우 임의 오답 지정을 원천 보류하도록 공백 텍스트 필터링 수행.",
        "매개체 격리 처리: 사용자 원본 이미지 텍스트 분석물과 가이드라인 시스템 프롬프트 간 교란을 방지하는 XML 안전 패스."
      ]
    },
    impact: {
      value: [
        "Firestore 기반의 SHA256 이미지 해시 캐시 레이어를 정교화하여 중복 분석 연산을 전면 생략하고, 재요청 시 인지 처리 속도를 <200ms로 비약 단축.",
        "Firestore 실시간 다단계 보안 속도 제어(Rate Limiting) 장착: 일반 비회원은 IP 기반으로 Throttling 제어하고, 프로 유저는 실시간 인앱 구독 정보를 동기 검증 후 팅킹 버짓 API 사용을 연동.",
        "카카오, 구글, 애플의 소셜 간편 로그인(SSO) 브릿지를 네이티브 환경에 완벽 결합해 상태 동기화 및 로그인 지연 현상을 100% 해소."
      ],
      security: [
        "애플, 카카오, 구글 SSO 인증 단계에 일회용 암호화 해시 SHA-256 넌스(Nonce) 검증을 결합해 세션 변조 완벽 방어.",
        "비로그인 게스트는 서버단 IP 레이트로 단속하고, 헤비 리액션 파트는 클라우드 인앱 인가 장치와 결합해 자원 남용 억제.",
        "분석 완료된 이미지 캐시 데이터베이스 조회 매핑을 활성화해 불필요한 모델 통신비를 $0 수준으로 영속 세이빙."
      ]
    },
    behindTheArchitecture: {
      problem: "가정 내 인쇄물 과제지는 무반응적이고 정적이므로, 영어 비원어민 부모님이 발음 지도를 돕거나 자녀의 복합 어휘 실수 기록을 체계적으로 수집하기에 어려움이 컸습니다.",
      vision: "종이 홈워크를 디지털 테이블탑 코파일럿 경험으로 즉시 치환하여, 음성 인터랙션 기능 및 클라우드 오답 대시보드를 부모님께 무상태성 없이 자동 구축해 줍니다.",
      rationale: "병렬 하이브리드 실행 아키텍처(Parallel Hybrid Execution) 채택: 실시간 인쇄 구획 파싱은 속도가 빠른 Gemini 2.5 Flash가 전담하며, 복잡한 음성 매칭 구간이나 손글씨 식별 보완은 2만 토큰 팅킹 버짓을 탑재한 Gemini 2.5 Pro를 폴백으로 매핑해 오판을 차단합니다."
    },
    technicalHurdles: [
      {
        title: "소셜 인증 레이스 컨디션 해결",
        incident: "애플 및 카카오 가입 직후 메인 대시보드로 복귀한 유저 정보가 정상 표시되지 못하고 튕기는 문제가 있었습니다.",
        diagnosis: "리다이렉션 직후 Firestore 프로필 테이블 기록 연산이 끝나는 속도보다 Firebase 인증 감지기가 먼저 돌며 생기는 정합 병목이었습니다.",
        resolution: "가입 유효 플래그 Lock 객체(isSigningUpRef)를 구성하여 신규 레코드 작성 완결 전까지 인증 관찰자의 조기 업데이트를 안전 대기시켰습니다."
      },
      {
        title: "물리 기기 애플 로그인 복구",
        incident: "에뮬레이터 상에서 완벽히 연계되던 간편 로그인이 실 하드웨어 OS 테스트 시에는 작동을 거부했습니다.",
        diagnosis: "Xcode 빌드 변수 타겟과 소셜 인가 ID가 일치하지 않았고, 애플의 물리 하드웨어 정책 상의 일회성 nonce 요구 사항이 누락된 원인이었습니다.",
        resolution: "번들 ID 구성을 맞춰주고, 실시간 SHA-256 해싱 넌스를 Firebase 인가 흐름 및 Apple OAuth 데이터에 똑같이 전달하여 검증을 완결했습니다."
      },
      {
        title: "환경 변수 파싱 복조 및 폴백 구축",
        incident: "Vercel 기반 배포망으로 이식 시, 암호 비밀 키를 정상적으로 인식하지 못하고 500 API 실패를 발생시켰습니다.",
        diagnosis: "Vercel 변수 기록 시스템에서 PEM 특수 표식 구조와 줄바꿈 개행문자(\\n)가 임의 편집 삭제되어 파서가 오동작했습니다.",
        resolution: "비대칭 키 PEM 문자열 내부 노이즈와 특수 문자 정개합 코드를 심고, Quota Limitation 대응용 폴백 대상을 최신 2.0-flash로 개편 조치했습니다."
      }
    ]
  },

  "benchmark-explorer": {
    title: "Benchmark Explorer (학업 성취 벤치마크)",
    tagline: "관찰 기록지를 체계적으로 분류하여 학습 발달 변화를 글로벌 기준(CEFR)에 맞춰 대조해 줍니다.",
    liveUrl: "https://education-benchmark-system.vercel.app/",
    screenshots: [
      { label: "학업 성취 대시보드", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780757146/Screenshot_2026-06-06_at_11.39.39_PM_l6lne9.png", subLabel: "오버뷰" },
      { label: "대시보드 실시간 필터", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469515/Bench_Dash_2_txdlv5.png", subLabel: "필터링 및 세부 메트릭" },
      { label: "원생 명단 관리", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780757146/Screenshot_2026-06-06_at_11.40.43_PM_h9r8ud.png", subLabel: "학급 배정" },
      { label: "원생 상세 프로필 포트폴리오", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469517/Screenshot_2026-06-03_at_3.33.30_PM_xram7p.png", subLabel: "발달 경향 한눈에 분석" },
      { label: "AI 다국어 종합 리포트", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469516/Screenshot_2026-06-03_at_3.43.00_PM_fulqsf.png", subLabel: "학부모 공유용" },
      { label: "학급 전체 성취 분석 보고서", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469516/Screenshot_2026-06-03_at_3.43.40_PM_ja3zlx.png", subLabel: "원장 전용 대시보드" },
      { label: "원장단 핵심 지표 브리핑 (Principal Briefing)", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469516/Screenshot_2026-06-03_at_3.44.09_PM_glxdms.png", subLabel: "기관 운영 통찰" },
      { label: "교육 기준 성취도 매핑 (CEFR)", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469516/Screenshot_2026-06-03_at_3.44.41_PM_nqpx5n.png", subLabel: "글로벌 학업 스키마 정합" },
      { label: "벤치마크 실전 검사 양식 (Baseline)", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469851/11_k6zxrc.png", subLabel: "학습 평가 레벨 1" },
      { label: "청각/시각 다중 평가 시스템", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780469852/6_gtubji.png", subLabel: "학습 평가 레벨 2" }
    ],
    stats: [
      { label: "수집 데이터 레코드", value: "450건 이상" },
      { label: "교사 업무 단축 시간", value: "매주 8-10시간" },
      { label: "평가 연동 기준", value: "CEFR 공식 매핑" }
    ],
    problem: [
      "정성적 관찰 데이터가 구조화되지 않은 일반 시트 또는 종이에 기입되어 변화 단계를 유추하기 어려움.",
      "영역별 발달 상태를 공인 언어 표준 포맷에 일일이 정합 대조하느라 리포트 가공 시 피로가 높음.",
      "일회성 점수 배치 위주 평가는 평소 교정을 위한 선제 피드백을 전달하기 힘든 지체성을 띰."
    ],
    solution: [
      "원 내 관찰 사항을 기록할 시 글로벌 학습 기준에 어긋남 없이 필드 정합이 일루어지는 데이터 연계 명세.",
      "언어 핵심 영역인 듣기, 말하기, 읽기, 쓰기를 한 축으로 다룬 맞춤 방사 레이더 차트 가독 지원.",
      "다국어 요약문 변합을 동반하여, 다국적 가구에게도 동등하고 친근한 피드백을 실시간 유치."
    ],
    stack: ["React 18", "Tailwind CSS", "Recharts & D3", "Airtable Relational Sheets", "Make.com Automation Nodes"],
    coreLoop: [
      { step: "01. 정성 관찰 데이터 수집", role: "수업 담당 교사", detail: "교사가 모바일 반응형 폼을 통해 학생의 수행 관찰 기록과 CEFR 원시 평가 지표를 구조화하여 입력합니다." },
      { step: "02. 관계형 데이터 정규화", role: "Airtable 엔진", detail: "다대다 관계형 스키마를 통해 원시 점수를 케임브리지 YLE(Starters, Movers, Flyers) 공인 기준선과 매핑합니다." },
      { step: "03. 12주 종단적 지표 집계", role: "분석 노드", detail: "12주 순환 주기 동안의 읽기, 듣기, 말하기, 파닉스 영역별 성장 궤적과 숙련도 분포를 집계합니다." },
      { step: "04. 방사형 레이더 역량 차트 시각화", role: "Recharts 시각화 엔진", detail: "복잡한 엑셀 수식 없이 학생별 취약 영역과 강점 영역을 다축 레이더 차트로 직관적으로 렌더링합니다." },
      { step: "05. 학부모 맞춤 요약문 합성", role: "AI 파이프라인", detail: "학술적 전문 용어를 부모 친화적인 격려형 진단 리포트 및 가정 내 보충 가이드로 자동 변환합니다." },
      { step: "06. 원장단 보고 및 PDF 배포", role: "원장 / 부장 교사", detail: "1클릭 인쇄용 PDF 출력 및 보안 암호화된 학부모 전용 대시보드로 즉시 배포합니다." }
    ],
    decisions: [
      {
        decision: "서버 측 차트 이미지 렌더링 대신 클라이언트 측 Recharts & D3 인메모리 연산 채택",
        alternativeConsidered: "서버 측 헤드리스 크롬(Puppeteer)을 통한 정적 차트 PNG 캡처 생성",
        why: "클라이언트 측 렌더링으로 서버 호스팅 인프라 비용을 0원으로 억제하고, 뷰포트 반응형 리사이징을 즉각 지원하며 원격 이미지 컴파일 지연을 제거했습니다.",
        tradeOffAccepted: "사용자 단말 브라우저에서 경량 SVG 수학 연산 실행 필요."
      },
      {
        decision: "단일 평면 구글 스프레드시트 대신 정규화된 Airtable 관계형 스키마 채택",
        alternativeConsidered: "복잡한 다열 VLOOKUP 수식으로 얽힌 단일 구글 시트 운용",
        why: "원생 분반이나 학급 편성이 변경될 때 평면 시트의 참조 수식이 깨지는 결함이 잦았습니다. 관계형 외래 키를 통해 종단적 학습 이력을 영구 보존했습니다.",
        tradeOffAccepted: "Airtable API 호출 한도(초당 5회) 관리를 위해 Make.com 내 배치 처리 필요."
      },
      {
        decision: "LLM 자율 점수 추론 대신 결정론적 CEFR 매트릭스 룩업 + 정성 요약 합성 채택",
        alternativeConsidered: "교사의 자유 텍스트 관찰 기록만으로 LLM이 직접 CEFR 레벨을 임의 판정",
        why: "LLM 직접 채점 시 레벨 편차와 평가 신뢰도 결함이 발생했습니다. 확정된 루브릭 룩업 테이블과 LLM 정성 요약문을 결합하여 100% 평가 무결성을 확보했습니다.",
        tradeOffAccepted: "사전 레벨별 루브릭 분류 체계의 정밀한 모델링 선행 필요."
      }
    ],
    architecture: {
      lifecycle: [
        "기록: 평가자가 일관된 관찰 체크박스 폼(Fillout)을 활용해 학원생 발달 항목과 기준치를 체크합니다.",
        "대조: 작성 결과는 Airtable 관계형 필드로 들어가며 연도별 학적 매핑 외래 키를 자동으로 확보합니다.",
        "해석: Make.com 비동기 웹훅이 변화 감지 즉시 연동되어 분석 단어로 변형 및 요약 처리를 전개합니다.",
        "피드백: 전달된 가공 포맷은 Softr 포털 사용자 시그널과 동기화되어 부모 화면에 누수 없이 표시됩니다."
      ],
      guardrails: [
        "분반 예외 통제: 원생의 이탈이나 학급 반 변경 중에도 기 산출된 과거 학급 기록이 훼손되지 않게 관계 제한 필드 탑재.",
        "중복 대칭 차단: 중복 원생 고유 식별 명칭의 대량 입력 시 동일 유저 여부를 판결해 생성 시 정화 필터링.",
        "자동 페일오버: 원격 가동 API의 혼선이나 지체가 생기면 로컬 캐시 규칙으로 즉각 스위칭 수행."
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
        "정형화 경계: 정형 Schema 뼈대를 고정해 의사소통 가이드 내에 원초 가이드라인 명령이나 프롬포트 흔적이 새지 않게 통제.",
        "친근 지표 치환: 거친 임계 점수 수치 대신 보듬어 줄 수 있는 일상 표현으로 데이터 치환 표현 설계.",
        "규칙 준수: 임의의 수식이나 파행적인 번해적 추론을 유발하지 않게 도메인 범주(White-List) 내 행동어만 허용."
      ]
    },
    impact: {
      value: [
        "DB 원천 데이터에 대한 무조건적 중복 쿼리 대신 원생 학업 통계를 메모리 캐시 형태로 레이지 로딩(Lazy-loading)하여 콜드 스타트 응답 latency를 제거.",
        "리포트 병합 연산 로직을 클라이언트 렌더링으로 일원화하여, 고동시성 접속 환경에서도 데이터베이스 서버 쿼리 비용 발생을 정적으로 제한.",
        "Airtable의 관계형 제약 조건을 준수하는 다대다 매핑 동기화 락(Sync Lock)을 세워, 학급 전이 시 유실될 수 있는 원생 데이터 무결성을 보장."
      ],
      security: [
        "교사가 소속된 원생 목록에만 제한적으로 읽기 쓰기를 허용하는 Role 보안 필터 안치.",
        "민감한 개인 식별 데이터(PII)는 인가 요청 전 사전에 도출 삭제 필터 구조 탑재.",
        "Softr 인증 단말과의 암호 정합 해싱 배지를 세워 원생 포트폴리오 노출 우려 완전 해소."
      ]
    },
    behindTheArchitecture: {
      problem: "흩어진 스프레드시트와 관찰 파일을 하나씩 개별 취합하고 분류하는 행정 수동 병목.",
      vision: "통일된 입력 구조와 관계형 데이터베이스를 통합하여 영역별 성취도를 나타내는 데이터 시각화 보강.",
      rationale: "오류 없는 차트 렌더링에 우수한 Recharts 라이브러리를 사용하고, Airtable과의 필드 매핑으로 일관된 스키마를 보장."
    },
    technicalHurdles: [
      {
        title: "컴파일 단계 타입 안전성 병목 해결",
        incident: "로컬 및 컨테이너 프로덕션 빌드 동작 과정 중 산식 논리 내에서 알 수 없는 타입 분기 추론 버그가 발생하여 컨테이너 구축이 중단되었습니다.",
        diagnosis: "수집 metrics 계산 도중 발생한 이터레이터 형식이 숫자 형식(number) 유형으로 안정적으로 수용되지 않고 implicit any로 튕겼습니다.",
        resolution: "모든 수학적 reduce 배열 합산 및 리턴 전후 지점에 강제 검증 Cast 필터(Number(val) || 0)를 가교 탑재하여 타입 오류를 말끔히 완치했습니다."
      },
      {
        title: "오프라인 폴백 처리 구축",
        incident: "인터넷 샌드박스의 일시 차단 환경이나 API Quota Limitation 한도 근접 유입 발생 시, 아동 프로필 카드 렌더링이 가동 불능을 일으켰습니다.",
        diagnosis: "외부 지능 API 비동기 채널 실패 처리가 별도 local 우회 대응 필드 없이 다이렉트로 UI 뷰어에 종속되었기 때문이었습니다.",
        resolution: "자체 local zero-knowledge 시나리오 추론 구조를 geminiService.ts에 빌드하여, 통화 거절 감지 즉시 로컬 데이터 통계를 바탕으로 보고를 임시 완성하는 페일오버를 달성했습니다."
      },
      {
        title: "로컬 보강 싱크 구조 수립",
        incident: "학교 로컬 망 데이터 전송 지연 시 데이터 백업 쓰기가 차단 경고와 함께 로스터 등록이 먹통이 되는 결함이 목격되었습니다.",
        diagnosis: "Firestore 시큐리티 권한이 네트워크 불안 국면이나 sandbox 기동 시에 조기 쓰기 커밋 프로세스를 인가 거부했기 때문입니다.",
        resolution: "LocalStorage 캐싱 레이어를 1차 통제 허브로 세워 로물 쓰기 실패 시 로컬 캐시로 자동 무중단 우회시키는 보강 스위치를 수립해 복원했습니다."
      }
    ]
  },

  eduplanner: {
    title: "EduPlanner Pro (무인 제약 시간표)",
    tagline: "강의실 배정, 교사별 가용 시간 등 제약 변수들을 다각적으로 계산하여 최적의 학급 시간표 도출을 도웁니다.",
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
      { label: "일정 및 공간 충돌율", value: "0%" },
      { label: "시간표 연산 최적화", value: "10분 미만" },
      { label: "교사 업무 분배", value: "고른 균등도" }
    ],
    problem: [
      "강의실 크기나 수강 인원 등의 변수가 복잡하게 상충하여, 매 학기 시간표 편성에 소모되는 수작업 시간이 극도로 높음.",
      "필수 학업 단위 규정 준수와 동시에 교원 연수, 휴무 편의 사항을 수동으로 전부 충족하고 연산하기가 쉽지 않음.",
      "갑작스러운 휴가나 시설 보수 등 일정 결치가 생기면, 교차 연계된 시간표 전체의 빈 구멍을 동기 수정하기 힘듬."
    ],
    solution: [
      "기관별 명세 조건과 설정을 바탕으로 제약 사항 충돌 여부를 먼저 점검하는 도구 설계.",
      "초안 구도 배치 후에 세부 중복 노드를 격리하여 정합성을 수정하는 다단계 흐름 구성.",
      "근무 일정 분석 및 시간 격차 현황을 데이터 패널에 구현하여 일방적인 연강 과로 방지."
    ],
    stack: ["React 19", "TypeScript", "Google GenAI SDK (gemini-3-pro-preview)", "Firebase v11 Suite", "Framer Motion"],
    coreLoop: [
      { step: "01. 기관 제약 조건 입력", role: "학원 행정 관리자", detail: "교과 시수, 교사별 출근/수업 가능 시간대, 강의실 수용 인원 및 선수 과목 제약 조건을 설정합니다." },
      { step: "02. 다차원 제약 매트릭스 구성", role: "결정론적 엔진", detail: "물리적 필수 제약(강의실 중복 불가)과 정성적 선호 제약(연속 3시간 이상 강의 방지)을 그래프 구조로 매핑합니다." },
      { step: "03. 고속 충돌 감지 패스", role: "TypeScript 검증기", detail: "동일 시간대 교사 및 강의실 중복 충돌을 클라이언트 단에서 즉각 탐지하여 시각적 경고 뱃지를 부착합니다." },
      { step: "04. LLM 휴리스틱 최적화 위빙", role: "Gemini 추론 엔진", detail: "복잡한 비선형 엣지 케이스 충돌을 선별하여 교사 피로도를 최소화하는 최적의 스왑 조합을 자동 도출합니다." },
      { step: "05. 인터랙티브 시간표 매트릭스", role: "관리자 콕핏", detail: "충돌률 0%가 검증된 주간 시간표를 교사별, 강의실별, 학년별 다각도 인터랙티브 뷰로 실시간 조회합니다." },
      { step: "06. 시간표 버전 확정 및 배포", role: "운영 총괄", detail: "최종 확정된 마스터 시간표를 잠금 처리하고 교사진 및 학부모 전용 개별 시간표로 안전하게 출력합니다." }
    ],
    decisions: [
      {
        decision: "하이브리드 제약 아키텍처: 초고속 TypeScript 로컬 검증 + Gemini 휴리스틱 최적화 결합",
        alternativeConsidered: "순수 LLM 단일 프롬프트 시간표 생성 또는 순수 정수 선형 계획법(ILP) 솔버",
        why: "순수 LLM은 미세한 시간 중복 오류가 잦았고, 순수 ILP는 유연한 교사 선호 조건을 수용하기 어려웠습니다. TypeScript로 물리 충돌을 100% 방어하고 Gemini로 유연한 휴리스틱 재배치를 해결했습니다.",
        tradeOffAccepted: "이중 검증 파이프라인 구축 및 정형 JSON 스키마 동기화 오버헤드."
      },
      {
        decision: "묵시적 자동 시간표 변형 대신 명시적 충돌 하이라이트 및 1클릭 해결 채택",
        alternativeConsidered: "사용자 승인 없이 백그라운드에서 교사 일정을 자동 임의 스왑",
        why: "시스템이 수석 교사의 일정을 임의로 변경하면 관리자 신뢰가 붕괴됩니다. 충돌 지점을 투명하게 시각화하고 AI 추천안을 1클릭으로 선택 승인하게 하여 사용자 통제권을 확립했습니다.",
        tradeOffAccepted: "완전한 블랙박스 자동 생성 대신 관리자의 1회 확인 클릭 요구."
      },
      {
        decision: "서버 재쿼리 대신 클라이언트 인메모리 반응형 그리드 필터링 채택",
        alternativeConsidered: "강의실이나 교사 필터 변경 시마다 서버 데이터베이스에 재조회 요청",
        why: "교사별, 강의실별 탭 전환을 네트워크 지연 없는 sub-10ms 즉각 반응형으로 제공하여 관리 효율을 극대화했습니다.",
        tradeOffAccepted: "초기 로딩 시 해당 학기의 전체 시간표 스키마를 메모리에 캐싱."
      }
    ],
    architecture: {
      lifecycle: [
        "설정: 운영 담당관이 온보딩 화면에서 주간 커리큘럼, 강의 정원 목록, 룸 제약값을 입력합니다.",
        "설계: 연산 성능이 우수한 flash 모델을 경유 인계해 시간 격자 1차 Blueprint 초안을 구성합니다.",
        "검출: 제작된 스케줄 레이아웃을 내부 순환 루프로 모니터링하여 중복 기입 및 오점 유무를 판단합니다.",
        "조율: 정합 충돌이 극심한 클래스 지점만 집중 선별해 Pro 모델에 전달함으로써 시간표 분할 조립을 완수합니다."
      ],
      guardrails: [
        "데이터 검수: 입력창 란에 불필요한 마크다운 기둥이나 위험 스크립트 유입 시 수시 정화.",
        "자동 잠금: 미인가 사용자 접속 노출을 방지하도록 30분 미작동 대기 시 자동 로그아웃 동작 연계.",
        "디바운스 세이프티: 데이터 전송에 따른 부하 누적을 완화하도록 연속 중복 커밋 타격을 제어하는 5초 디바운스 적용."
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
        "추론 깊이 보정: 여유로운 추론 토큰(Thinking Budget) 설정을 심어 모델이 다양한 시간 시간표 가중치를 넓게 탐색하게 제어.",
        "JSON 규약 보전: 반환 타입을 임의 가변하지 않게 규격 JSON 스키마를 고정 구성.",
        "백업 노출: 다상충으로 해답이 전무한 극한 모순 분기 시, 백업된 최선 스켈레톤 안을 복조 기동."
      ]
    },
    impact: {
      value: [
        "초기 대규모 배정 검증 연산을 클라이언트 측의 가벼운 탐색 필터 솔버로 1차 선처리하여, 백엔드 고비용 추론 API 호출 비용을 90% 가량 절감.",
        "Firestore 트랜잭션 단위 보안 규칙을 강력 통제하여 복수의 관리자가 동시에 시간표를 수정하더라도 리소스 덮어쓰기나 무결성 붕괴를 영구 차단.",
        "인증 토큰 유효 제어를 엄격하게 정의하고 민감 행정 키 노출 범위를 서버 세션 내부로 응집하여 인적 자원 정보 유출 사고 방지."
      ],
      security: [
        "수정 및 편집 행정 권한 체크로 핵심 관리자 터미널 유출 사전 검문.",
        "스케줄 변화 원인 및 수정 이력 관리로 시간표 구조 신용 가치 백업.",
        "체계적인 파이어베이스 규칙을 도입해 학내 정보 노출을 보안 통제."
      ]
    },
    behindTheArchitecture: {
      problem: "인력 배정, 시설 정원, 커리큘럼 이수 기준 등 대량의 조건들을 맞물려 설계하는 비효율성.",
      vision: "제약 규칙을 명시적으로 기입하면, 충돌이 적은 타임라인 조합안을 연계 프로그램 논리로 빠르게 매핑하는 도구.",
      rationale: "데이터 상태 변경에 기여하는 Firestore 기반 구조를 두고, 일반 가이드라인 배치 연산과 정밀 해결사 논리를 적절하게 역할 배분하여 작동 구현."
    },
    technicalHurdles: [
      {
        title: "Np-Complete 백트래킹 지연 극복",
        incident: "수백 개의 제약 변수와 인자들을 오직 AI 판단에만 기대 전개 시 무한 루프나 504 타임아웃이 야기되었습니다.",
        diagnosis: "어려운 수학 변수들을 자연어 문장에 통째로 위임해 해를 찾게 시키면서 생기는 추론 교착이었습니다.",
        resolution: "의사 결정 연산 부담을 local TypeScript solver 레이어(validateScheduleProgrammatically)로 사전 이송해 물리 매핑을 전처리 필터링했습니다."
      },
      {
        title: "프롬프트 데이터 과밀 제어",
        incident: "미시 변수를 무분별하게 모델 인풋에 삽입 시, 추론 흐름 검증 시 오동작이나 엉뚱한 값 도출이 잦아졌습니다.",
        diagnosis: "많은 학교 원물 데이터를 단 하나의 프로그래머 지침 프롬프트에 동시 수용시켜 모델 집중도가 깨진 것입니다.",
        resolution: "전체 스케줄 과정을 Draft(기초) ➔ Conflict Resolution(중간 조율) ➔ Guardian Weaver(최종 검증) 패키지로 쪼개어 단계적 순차 처리를 유치했습니다."
      },
      {
        title: "API 호출 쿼터 세이프티 수립",
        incident: "학급 시간표 조립 생성 쿼리에 무작위 동시 요청이 일어날 시, 트래픽 폭증에 의해 429 기동 거부 상태 유발 수위였습니다.",
        diagnosis: "서버가 많은 양의 실시간 생성 쿼리에 무방비로 호출되어 외부 서비스 임계치를 초과한 탓이었습니다.",
        resolution: "이중 구조 장치를 마련했습니다: 1) 경량 프레임으로 기본 스케줄 뼈대를 뽑고 핵심 충돌 지점 위주로 Pro 엔진을 태워 가동율 보호, 2) 브라우저에서 돌 수 있게 경량화 설계한 TypeScript 로컬 solver를 내장해 sandbox 오프라인 환경 등에서 0초 무트래픽 즉답 렌더링에 성공했습니다."
      }
    ]
  },

  "consultation-pipeline": {
    title: "Automated Report Generator & Pipeline",
    tagline: "상담 신청서 수집 즉시 데이터 구조에 정합하고 이중 언어 보고서를 추출해 전용 포털과 동기화하는 정보 전송 파이프라인입니다.",
    liveUrl: "https://jason-portfolio.com/",
    walkthroughVideo: "https://embed.app.guidde.com/playbooks/fXwhH7ayipdTFcXASDJx5K?mode=videoOnly",
    screenshots: [
      { label: "Airtable 데이터베이스", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780757340/Screenshot_2026-06-06_at_11.35.34_PM_susvx4.png", subLabel: "관계형 데이터 백엔드" },
      { label: "FT Fillout 양식", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780757946/Screenshot_2026-06-03_at_5.35.38_PM_wywtjr.png", subLabel: "설문 취합 및 평가 템플릿" },
      { label: "성적 보고서 빌드 메커니즘", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780757338/Screenshot_2026-06-06_at_11.10.34_PM_eij0wx.png", subLabel: "Make.com 자동 생성 시나리오" },
      { label: "대화형 분석 전송 오퍼레이터", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780757338/Screenshot_2026-06-06_at_11.13.31_PM_nkcfga.png", subLabel: "Make.com 상담 지원 워크플로우" },
      { label: "원장 대시보드 오버뷰", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780757340/Screenshot_2026-06-06_at_11.34.00_PM_atnp3r.png", subLabel: "Softr 최고 관리자 어드민 포털" },
      { label: "학부모 대시보드 (메인)", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780757340/Screenshot_2026-06-06_at_11.32.00_PM_tnqzky.png", subLabel: "이중언어 맞춤 종합 도표" },
      { label: "학부모 대시보드 (상세)", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780757340/Screenshot_2026-06-06_at_11.32.40_PM_frctym.png", subLabel: "정성 관찰 상세 리포트" }
    ],
    stats: [
      { label: "데이터 정합도", value: "100%" },
      { label: "수동 가공 단계", value: "완전 자동화" },
      { label: "보고 취합 공수", value: "0분" }
    ],
    problem: [
      "정성적인 관찰 기록을 상담 종료 후 개별 엑셀 시트에 타이핑하고 옮겨 적으며 수일씩 야근을 유발하는 수동 공수 누적.",
      "학급 리스트 및 원생 학적이 변모할 시, 산재된 파일 속 과거 이수 데이터 정합성을 관리해주기 힘든 꼬임 현상.",
      "민감한 자녀 역량 평가가 보안 장치 없이 메신저나 일반 파일로 유출 공유되어 신용 우려를 촉발하는 환경."
    ],
    solution: [
      "직관적인 구성의 Fillout 입력 양식을 실시간 Airtable 관계 시트 가교에 직결 수합 통합.",
      "커밋 완료 즉석에서 Make.com 웹훅을 작동시켜 맞춤 설명서 빌드 구성 및 통역 서식 조립.",
      "로그인 인증 해시 인자를 바탕으로, 권한이 확실한 부모 단말기에만 소속 자녀 정보를 타겟 노출."
    ],
    stack: ["Fillout Forms", "Airtable Relational DB", "Make.com Nodes", "Softr Portal", "Google Gemini API"],
    architecture: {
      lifecycle: [
        "기재: 강사가 면접 필드를 보고 체크 사항을 폼 창에 등록 제출합니다.",
        "취합: 데이터는 Airtable 관계 컬렉션 구조로 실시간 기록되며 외래 키 바인딩을 통과합니다.",
        "가공: Make 서버 라우터가 입력 문맥을 확인해 다국어 요약 및 부모 전달용 통용 리포트를 만듭니다.",
        "매핑: 완성 명세는 Softr 타겟 사용자 계정 데이터와 인라인 매칭되어 포털 내에서 무결 표출됩니다."
      ],
      guardrails: [
        "데이터 보호: 반 정보가 도중에 변경되어도 기존 학적 이수 및 정밀 보고서 무결을 동기식 영구 지탱.",
        " magic 링크 발송: 계정 기입 즉시 복조 마법 전송 주소를 대조 발행해 대기 피로 해소.",
        "격리 조회 보증: 인증 쿠키 및 Row 세분화 필터 조건을 Softr 설정에 태워 임의 우회 방지."
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
        "정형 고정 가이드: 유출을 차단하도록 내부 지목 단어가 부모 영역에 일절 노출되지 않게 정형 포장 수립.",
        "온화 톤 적용 : 지엽적인 점수 대신 따뜻하고 동기 부여가 되는 발달 지침으로 단어 치환.",
        "단방향 렌더: 파싱 불안 지점을 예방하기 위해 출력 란에서 별도의 복잡 부가 서식 사용 불가."
      ]
    },
    impact: {
      value: [
        "유지 보수 비용이 많이 드는 헤드리스 스크립트 대신 Make.com의 정형 다중 웹훅 핸들러를 도입하여 인프라 지원 리스크를 최저 수준으로 조율.",
        "단시간 다중 제출 데이터 유입 시에도 트래픽을 완충하여 안정적으로 번역을 정렬하는 Rate-buffered 큐 시스템을 세워 API 누락 차단.",
        "Softr 단말의 개별 학적 권한 행 경계(Row-level authorization) 설정을 매핑하여, 다국어 리포트 렌더링 시 타인의 정보 훔쳐보기 취약성을 원천 금지."
      ],
      security: [
        "학적 수지 부모의 고유 마법 암호화 사용자 세션 여부 조기 스크리닝.",
        "인자 변수를 세니타이징하여 외부 시스템 명령어 인젝션 무력화.",
        "데이터 취합 API 라우팅 키들을 가상 컨테이너 비밀 저장소에 은폐."
      ]
    },
    behindTheArchitecture: {
      problem: "상담 종료 후 정리와 교재 검독을 수일에 걸쳐 개별 취합 및 전송하느라 겪던 피로와 사생활 노출에 따른 갈등.",
      vision: "한 번의 폼 제출로 한/영 보고 양식을 조립하고 수신 전용 어드민 포털에 동적으로 전송 및 기록하는 통합 파이프라인.",
      rationale: "데이터 영속성을 위해 Airtable 컬렉션을 설계하고, Make 연쇄 워크플로우를 결합하여 수동 행정 마찰 감소."
    },
    technicalHurdles: [
      {
        title: "비동기 동기화 타이밍 갭 해소",
        incident: "학생 상담 세션 기록 직후 Make.com 오토메이션이 일부 누락되거나 빈 데이터를 번역해 보내려 병목을 일으켰습니다.",
        diagnosis: "폼(Fillout)을 통한 로드 생성 감지 시그널이 하위 개별 레코드 연동 정합보다 마이크로초 단위로 조기 트리거되어 빈 배열을 탐색함이 요인이었습니다.",
        resolution: "delayed-fetch logic flow를 구축했습니다. 웹훅 수신 직후 의도적 일시정지 버퍼를 태워 데이터 영속 가교 합산이 완전히 끝날 시점에 AI를 통과시켰습니다."
      },
      {
        title: "어그리게이터 관계 텍스트 누설 복구",
        incident: "수강 상담 포트폴리오를 다량 묶어서 요약 리포트를 출력하는 도중 학생 실명이 사라지고 rec9oCq 등으로만 출력되었습니다.",
        diagnosis: "Airtable Aggregator 하부 모듈 노드가 관계 설정된 상위 Relational Raw lookup 필드 접근을 설계적으로 일시 투명 차단했기 때문이었습니다.",
        resolution: "물리 텍스트 매핑 결속을 우회시키는 data smuggling bypass를 완성해 하나의 토큰 바디 내에 학생 실명을 강제 병합하여 AI에 안전히 인계하는 완치에 도달했습니다."
      }
    ]
  },

  "lead-enrichment": {
    title: "B2B Lead Enrichment (자동 파트너 발굴 CRM)",
    tagline: "지역 지도를 기반으로 연락처 정보를 파싱 및 정밀 정화하고, 대표자 경력에 기반한 제안 메일 링크를 구성해 줍니다.",
    liveUrl: "https://jason-portfolio.com/",
    screenshots: [
      { label: "Dashboard", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.17.21_PM_wsyzzu.png" },
      { label: "Dashboard Search", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.18.29_PM_btxolx.png" },
      { label: "Outreach", url: "https://res.cloudinary.com/dec04iaht/image/upload/q_auto/f_auto/v1780481957/Screenshot_2026-06-03_at_7.18.39_PM_nesi9y.png" }
    ],
    stats: [
      { label: "식별 및 보정 타겟", value: "180개소 이상" },
      { label: "중복 제안 발송율", value: "0% 제거 완료" },
      { label: "아웃리치 작성", value: "자동 맞춤화" }
    ],
    problem: [
      "네이버 지도 등 로컬 주소 지도의 데이터 원본에 쓸모없는 마크업 노이즈나 부정적 가상 상호 속성이 유입되어 전처리 난망.",
      "여러 기관을 대상으로 일일이 연수 이력이나 백그라운드를 검색해 비즈니스 영업 협조 메일을 직접 수기로 수정 작성하는 시간 비효율.",
      "기 수취 업체나 동일 지점에 제휴 메일이 반복 발적되어 기업 신용 이미지 훼손 및 피고 제의 충돌 위협."
    ],
    solution: [
      "Express 기반의 서버 미들웨어를 두어 Naver 원본 주소 데이터를 깔끔하게 파싱 가공하고 동기식 중복 제거 완성.",
      "설립자 업적(예: 10년 강의 기조)에 딱 맞추어 극도의 존댓말 비즈니스 정중 문체를 자동 작성해내는 프롬포트 기법 바인딩.",
      "제목과 본문 정제가 완료되어 이메일 앱만 편하게 띄워 보내는 mailto 딥링크 전송 도구 기여."
    ],
    stack: [
      "Vite & TypeScript",
      "Tailwind CSS",
      "React-Leaflet & Leaflet.js",
      "Framer Motion",
      "Custom Express API",
      "esbuild",
      "Naver Search API",
      "Google GenAI SDK"
    ],
    coreLoop: [
      { step: "01. 지역 타겟 쿼리 입력", role: "그로스 리드", detail: "강남권 학원가, 분당 영어유치원 등 타겟 상권 및 업종 키워드를 검색창에 입력합니다." },
      { step: "02. 보안 백엔드 프록시 경유", role: "Express 게이트웨이", detail: "Node.js 프록시를 통해 네이버 로컬 API 시크릿 키 노출을 차단하고 브라우저 CORS 제약을 우회합니다." },
      { step: "03. 공간 좌표 변환 및 지도 투영", role: "Leaflet 엔진", detail: "국내 카텍 TM128 좌표계를 표준 WGS84 GPS 좌표로 변환하여 인터랙티브 지도 위에 정밀 핀으로 렌더링합니다." },
      { step: "04. 실시간 중복 필터링 및 CRM 매칭", role: "Firestore 레이어", detail: "기존 등록된 잠재 고객 DB와 대조하여 중복된 영업 제안 발송 리스크를 0%로 사전 차단합니다." },
      { step: "05. 맞춤형 B2B 제안서 문안 생성", role: "Gemini 2.5 Flash", detail: "학원 규모 및 타겟 연령대에 맞춰 10년 교육 경력 기반의 정중한 비즈니스 한국어(존댓말) 제안서를 합성합니다." },
      { step: "06. 1클릭 Gmail 딥링크 전송", role: "아웃바운드 영업 담당자", detail: "수동 복사-붙여넣기 없이 사전 작성된 완성형 이메일 초안을 즉시 팝업하여 2초 검토 후 발송합니다." }
    ],
    decisions: [
      {
        decision: "클라이언트 직접 호출 대신 Express 인메모리 캐시 프록시 채택",
        alternativeConsidered: "브라우저에서 직접 네이버 검색 API를 호출하고 클라이언트 환경변수에 키 보관",
        why: "브라우저 개발자 도구의 Network 탭을 통해 유료 API 시크릿 키가 노출되고 할당량이 남용되는 위험을 방어하고 중복 지역 검색을 95% 캐싱 처리했습니다.",
        tradeOffAccepted: "정적 프론트엔드 외에 상시 Node.js 백엔드 서버 인프라 운영 필요."
      },
      {
        decision: "무인 대량 SMTP 발송 대신 1클릭 네이티브 Gmail 딥링크 채택",
        alternativeConsidered: "Nodemailer 또는 SendGrid를 통한 백그라운드 무차별 대량 콜드메일 발송",
        why: "미검증 대량 콜드메일은 스팸 분류율이 높고 도메인 신뢰도를 훼손합니다. 1클릭 딥링크를 통해 담당자가 2초 만에 최종 문맥을 확인하고 발송하도록 설계했습니다.",
        tradeOffAccepted: "완전 자동 배치 발송 대신 담당자의 리드별 1회 확인 클릭 필요."
      },
      {
        decision: "UI 렌더 스레드 대신 웹 워커(Web Worker) 기반 좌표 변환 채택",
        alternativeConsidered: "리액트 메인 UI 스레드에서 TM128 -> WGS84 좌표 삼각함수 연산을 동기식으로 실행",
        why: "100개 이상의 지도 마커를 동시 렌더링할 때 발생하는 500ms 프레임 드랍을 해소하고 부드러운 60fps 지도 패닝 경험을 달성했습니다.",
        tradeOffAccepted: "워커 스레드와 리액트 상태 간의 비동기 메시지 통신 관리 필요."
      }
    ],
    behindTheArchitecture: {
      problem: "공간 지도를 눈으로 정리하고, 발송 초안을 클립보드로 매번 옮겨가며 하루의 기획 효율을 지체시키던 B2B 수작업 병목.",
      vision: "상권 반경을 가독하여 정보를 파싱해 저장하는 한편, 파트너 특색에 맞게 가치제안 본문을 브라우저 링크로 완성하는 CRM 조력 도구.",
      rationale: "백엔드 Node 프록시로 CORS나 데이터 단락 분석 병목을 제거하고, 제미나이 데이터 마스킹을 활용해 Firestore 정보 연동 구현."
    },
    architecture: {
      lifecycle: [
        "매핑: 지역 좌표 입력에 의한 Naver Local Search 결과를 중위 backend route에서 낚아채 정제 가공합니다.",
        "소탕: HTML 복잡 마크업 태그 노이즈(예: 상호 속 b 태그 등)들을 사전에 정규식으로 청소해 CRM에 로드합니다.",
        "대조: Firestore에 수록된 네이버 고유 식별 Key 대조를 통해 동일 거래처 신규 가동 방지 플래그를 심습니다.",
        "전환: 1-click mailto 링크 생성 루프로 이식하여 담당자 메일 앱 호출 즉시 custom 본문을 즉시 출력합니다."
      ],
      guardrails: [
        "비밀 정보 격리: 타사의 소스 검독이나 브라우저 단에서 중요 상등 Key 및 패러미터 탈취를 전면 회피하도록 백엔드 프록시화 수립.",
        "구문 파싱 제어: 지역 빈 공백 괄호가 엉키거나 주소 레이블이 깎이는 모수치를 정제하는 특화 정규식 적용.",
        "인증 보증: Webhook 및 연동 경로 설정이 불안정할 시 UI 얼럿을 표기하고 설정을 로컬에 안전 격리 보관."
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
        "JSON 강제 일람: LLM 페이로드를 목적지 정형 CRM 스키마 설계 단에 매칭해 데이터 오가공 누망 원천 제하.",
        "좌표계 산출 매칭: TM128 좌표계 원물 데이터를 표준 WGS84 GPS로 촘촘히 렌더링하고 브라우저 맵에 안착.",
        "안전 체크업: 테스트용 dummy URL 감지 시 전송 정지 메시지를 얹음으로써 실제 도출 과정 시의 실수 고속 방지."
      ]
    },
    impact: {
      value: [
        "자체 구축한 Express 프록시 라우트에 초경량 로컬 캐싱 레이어를 세워 고비용 Naver Maps API 쿼리 사용량을 정적으로 95% 단축.",
        "TM128 평면 투영 좌표계를 WGS84 GPS로 변환하는 복잡한 수학 연산을 메인 스레드와 분리 처리하여, 모바일 기기에서의 화면 버벅임 및 프리징 현상을 완전 소거.",
        "외부 지도 검색 및 AI 발송에 필요한 비밀 토큰 일체를 Node.js 백엔드 세션 내부로 응집 격리해 클라이언트 측 웹 크롤링 위협에 100% 안전 보장."
      ],
      security: [
        "구글 및 네이버 중요 접속 토큰을 Node.js 프록시로 도려내어 유출 공격에 무공해 설계 보증.",
        "사용자 인풋에 결쳐진 문자열 유효성 검사를 세워 악성 마이그레이션 override 무력화.",
        "동작 세팅값의 불순 변조 방지를 위하려 사용자 단말 환경 내부 cache(localStorage) 영속 보존."
      ]
    },
    technicalHurdles: [
      {
        title: "네이버 크롤링 소프트락 무력화",
        incident: "수집 도중 Naver 지도 맵 통신 횟수 및 트래픽 유입에 따른 접근 필터락에 직면하는 상황이 터졌습니다.",
        diagnosis: "반복적인 단순 User-Agent 신호가 지도 탐색 세이프가드에 걸린 것이 요인으로 진단되었습니다.",
        resolution: "Axios 통신 시 임의 헤더 로테이터 기법을 구축하고, 비정상 원천 마크업 태그를 깎는 수집 복정 정규식을 통해 수집 중단을 전천후 영구 완치했습니다."
      }
    ]
  },
  "white-label-hub": {
    title: "모바일 포트폴리오 허브 (Learning Diary Hub)",
    tagline: "South Korean 사립 어학원(학원)을 위한 실시간 AI 학습 성장일지 컴파일러 및 클라이언트측 고성능 PDF 빌더.",
    liveUrl: "",
    screenshots: [
      { label: "교사용 워크시트 태그 관리", url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2000&auto=format&fit=crop" }
    ],
    stats: [
      { label: "원생별 문서 생성 시간", value: "평균 15초 내외" },
      { label: "테넌트 데이터 격리", value: "100% RLS 격리" },
      { label: "클라이언트 측 렌더링", value: "서버 오버헤드 0%" }
    ],
    problem: [
      "원어민 강사들이 학부모들이 만족하는 완벽한 톤앤매너의 영문 성장 피드백을 수동 작성하느라 행정적 피로가 누적됩니다.",
      "학부모와 학생들이 올리는 메가바이트 크기의 모바일 원본 이미지를 부모용 브라우저에서 직접 조립 시 브라우저 오버플로우로 다운되는 현상.",
      "개별 학원마다 완전 독립된 상표 자산(로고, 지정 주조색, 교육 철학 폰트 지시)을 실시간 다이내믹하게 삽입 제어해야 할 필요성."
    ],
    solution: [
      "수동 타이핑 대신 간결한 클릭 중심의 'Tag & Commit' 태블릿 터치 인터페이스를 구축하여 교사 오탈자를 원천 방지.",
      "동적 지점별 브랜드 테마 설정 (Dynamic Tenant Theming): 시스템은 사전에 설정된 제한된 컬러 배열에 의존하지 않고 온전히 유연하게 작동합니다. 어학원 관리자 프로필에서 올린 임의의 HEX 코드를 파라미터로 취득하며, @react-pdf/renderer 컴파일러가 이를 헤더 배경색, 보더 영역, 그리고 타이포그래피 주조색 변수로 직접 주입 통합합니다. 로고 파일 역시 업로드된 학원의 로고 이미지 원본 가로세로 비율을 온전히 보존하기 위해 objectFit: 'contain' 제약을 주는 바인딩 박스 내 영역을 설계하여 깨지지 않는 출력 그리드를 영구 보장합니다.",
      "서버의 컴파일 파워 소모 대신 사용자 단말의 CPU를 최대로 연동하는 @react-pdf/renderer 구조적 결합을 통한 서버 비용 0원 유지."
    ],
    stack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Express.js / Node.js",
      "PostgreSQL Supabase (RLS)",
      "@react-pdf/renderer",
      "Google Gemini 1.5 Flash"
    ],
    coreLoop: [
      { step: "01. Tag & Commit 터치 기록", role: "수업 담당 교사", detail: "교사가 학생의 학습 활동지를 사진 촬영하고 태블릿 화면에서 맞춤 성취 태그를 터치 선택합니다." },
      { step: "02. 마이크로 서술문 정제 합성", role: "Gemini 1.5 Flash 프록시", detail: "Express 백엔드가 군더더기 미사여구를 배제한 2문장 구성의 객관적 성취 및 발전 가이드를 합성합니다." },
      { step: "03. PostgreSQL 테넌트 데이터 바인딩", role: "Supabase DB (RLS)", detail: "학원별 school_id 외래 키에 암호화된 Row Level Security 정책을 적용하여 완벽 격리 보관합니다." },
      { step: "04. 다이내믹 테마 및 로고 주입", role: "화이트라벨 엔진", detail: "학원별 고유 HEX 컬러 팔레트, 로고 비율 유지 바운딩 박스, 커스텀 폰트를 실시간 주입합니다." },
      { step: "05. 브라우저 인메모리 PDF 컴파일", role: "@react-pdf/renderer", detail: "서버 렌더링 비용 $0으로 사용자 브라우저 뷰포트 메모리 내에서 다쪽 분량의 한글 PDF를 즉시 생성합니다." },
      { step: "06. 학부모 전용 포트폴리오 전달", role: "원장 / 총괄 관리자", detail: "1클릭 고화질 인쇄물 출력 또는 학부모 전용 알림톡 웹 링크를 통해 즉각 공유합니다." }
    ],
    decisions: [
      {
        decision: "서버 헤드리스 크롬(Puppeteer) 대신 클라이언트 브라우저 인메모리 컴파일(@react-pdf) 채택",
        alternativeConsidered: "AWS Lambda / EC2에서 무거운 헤드리스 크롬을 띄워 HTML을 PDF로 변환",
        why: "헤드리스 크롬은 보고서당 4초 이상의 콜드 스타트 지연과 월말 마감 시 서버 비용 폭증을 초래했습니다. 브라우저 인메모리 렌더링으로 서버 비용을 0원으로 억제했습니다.",
        tradeOffAccepted: "사용자 단말 브라우저에서 Canvas 렌더링 연산 부하 수용 필요."
      },
      {
        decision: "애플리케이션 계층 필터링 대신 데이터베이스 레벨 Row Level Security (RLS) 채택",
        alternativeConsidered: "Express API 컨트롤러 코드 내부에서 school_id로 WHERE 필터링 수행",
        why: "애플리케이션 필터링은 개발자 실수나 쿼리 변조 공격 시 타 학원 데이터 유출 위험이 있습니다. PostgreSQL RLS는 DB 엔진 레벨에서 타 테넌트 침범을 원천 드롭합니다.",
        tradeOffAccepted: "모든 DB 커넥션에 JWT 클레임 전파 및 엄격한 RLS 정책 관리 필요."
      },
      {
        decision: "정적 CDN 폰트 직접 링크 대신 백엔드 유니코드 폰트 프록시 채택",
        alternativeConsidered: "구글 폰트 TTF 웹 링크를 브라우저 react-pdf 워커에 직접 연결",
        why: "브라우저 CORS 보안 정책으로 인해 폰트 바이너리 다운로드가 차단되어 한글이 빈 박스(tofu)로 깨지는 문제를 Express 서버 메모리 폰트 프록시로 완벽 해결했습니다.",
        tradeOffAccepted: "Node.js 백엔드 메모리에 약 2MB의 TTF 폰트 바이너리 캐싱."
      }
    ],
    architecture: {
      lifecycle: [
        "업로드: 원내 강사들이 원생의 학습 활동 정지 이미지를 캡처하고 지정된 교과 프레임 워크 태그를 마운트합니다.",
        "AI 합성: Express 프록시가 키 노출 없이 Google Gemini에 구조적 예측 명령을 던져 완벽 매너의 2문장 피드백 도출.",
        "영속화: 컴파일된 학원별 자산 및 결과 메타데이터 객체를 Supabase의 강력한 행 레벨 보안(RLS) 내부 영역에 저장.",
        "즉시 인쇄: 사용자 단말 브라우저 캐시에서 학원 브랜드 테마 색상과 Noto Sans KR 글꼴이 바인딩된 최종 PDF를 즉각 작성."
      ],
      guardrails: [
        "API Key 밀폐: 상용 LLM 프라이버시 등가 자산을 철저히 서버 환경에 감춰 클라이언트 스크립트 탈취 불가 구성.",
        "제로 트러스트 장막 격리 (Zero-Trust Tenant Isolation): 다중 학원 간의 정보 격리는 프론트엔드 단이 아닌 데이터베이스 심층 레벨에서 철저히 보장됩니다. PostgreSQL 서버에 Row Level Security (RLS) 정책을 활성화하고 인가된 사용자의 JWT 세션 정보를 school_id 외래 키에 수학적으로 일체화 결착시켰습니다. 따라서 잠재적인 클라이언트 스크립트 오작동이나 주입 공격 시에도 타사 정보에 간섭하는 행위를 DB 수하 노드에서 원천 드롭해 장비 간 교차 유출을 불가능하도록 봉인했습니다.",
        "리소스 미적용: 무거운 변환 서버 없이 사용자 메모리 영역 내부에서 인라인 변환 실행으로 파일 저장 비용 원천 절약."
      ]
    },
    promptEngineering: {
      logic: `<system_instructions>
  Write a highly professional, 2-sentence progress narrative for a student's monthly portfolio based on provided pedagogical tags.
  Explicitly blocks generic praise like "Good job!". Tone must be objective, encouraging, and authoritative.
</system_instructions>

<constraints>
  <token_limit>Hard maximum of 45 words to avoid layout overflows</token_limit>
  <structure>S1 acknowledges the achievement milestone; S2 details the precise next instructional step</structure>
</constraints>`,
      schema: `{
  type: "OBJECT",
  properties: {
    achievementNarrative: { type: "STRING" },
    actionableStepDetail: { type: "STRING" }
  },
  required: ["achievementNarrative", "actionableStepDetail"]
}`,
      guardrails: [
        "글자 수 경계 가이드: 최대 45단어 제약 조건을 LLM 구조 단에 얹어 출력 디자인 틀이 깨지는 사태를 완전 방어.",
        "무의미 구절 차단: 격려 수사어(예: 'Good job!') 사용을 차단하고 계량적, 발전적 성취 분석 형식을 유지하도록 강제.",
        "다국어 매핑 연동: 다중 유니코드 표준 문장 부호와 한국어 조사를 부드럽게 결합시키는 사전 가이드 세팅."
      ]
    },
    impact: {
      value: [
        "운영 효율 극대화 및 학습 경험 제공 리포트 (Operational Impact & Delivery): 기존에 이메일 첨부 파일로 리포트를 한땀한땀 전달하며 발행했던 병목 패턴을, 실시간 클라이언트 사이드 변환 PDF 링크(차세대 알림톡 배포 준비 대응)로 이그젝션함으로써 분배 배포 마찰력을 획기적인 '제로' 선으로 억제합니다. 최종 100% 성장학습일지를 한글 및 영어의 깔끔한 인쇄용 결과 지표로 한눈에 보조해 어학원과 한국인 학부모 간 소통 밀도를 전 영역 확장 수급시켰습니다.",
        "모든 연산 및 PDF 그리드 설정을 사용자 로컬 단말로 완전 이식하여 학원의 중앙 서버 트래픽 비용을 100% 절감.",
        "Supabase RLS 규칙 설정을 완료하여 보안 감사 및 다중 대형 학설 연맹 간의 엄격한 원격 법규 준수성을 공고히 수립.",
        "강의 현장 복도에서 터치 클릭 3번 만으로 PDF 생성이 가능케 보조하여 수동 취합 작성 시간을 주당 20시간 이상 절감선 제고."
      ],
      security: [
        "학원별 개별 원생 데이터베이스에 엄격한 계정 연동 Row-Level Security를 완벽 적용.",
        "서버 리소스에 영구적인 비암호화 미디어 파일을 주차 보존하지 않고 클라이언트 실시간 가공 후 휘발.",
        "서버 파이프라인 외부 노드 접근 시 차단 필터를 통해 API Quota 오접속 및 디도스 위협 방지."
      ]
    },
    behindTheArchitecture: {
      problem: "한국 학원 시장의 특수성은 다국어 타이포그래피 정렬과 다중 지점별 독립적인 브랜드 색채 표출을 요구하지만, 기존 설치형 솔루션들은 비용과 호환성 면에서 높은 허들을 갖고 있었습니다.",
      vision: "태블릿 한 대만 들고 교직원들이 번거로운 번역과 레이아웃 고민 없이, 교실 내부에서 한 번에 앨범과 리포트를 프린트하는 무복잡성 컴파일 환경.",
      rationale: "클라이언트 PDF 인클로저 기술과 Gemini 추론 지배력을 맞물리고, 한글 유니코드의 고유 서체 정합 요건을 Express 서버 폰트 라우팅 게이트웨이로 풀어 자금이 넉넉지 않은 지점들의 초기 부담을 완전 소거했습니다."
    },
    technicalHurdles: [
      {
        title: "@react-pdf/renderer 상의 한글 unicode 빈 상자(깨짐) 현상",
        incident: "프로덕션 기동 시 한국 한글(Hangul) 캐릭터가 전부 빈 사각형 박스(tofus)로 밀리며 다운되고, static 구글 폰트 직접 경로를 이용할 경우 브라우저 CORS 차단 정책에 걸리는 문제점이 야기되었습니다. ",
        diagnosis: "PDF 컴파일 장치가 다국어 더블 바이트 문자 규격을 자체 내장하지 못하고, 주요 영속 폰트 CDN 서비스는 압축 WOFF2 형식을 주기 때문에, react-pdf가 요구하는 수수한 TrueType (.ttf) 확장자가 아니었던 것이 원인입니다.",
        resolution: "Express 미들웨어 영역에 사용자 맞춤 헤더를 속이는 폰트 수합 우회 proxy를 개발했습니다. 원시 Noto Sans KR .ttf 파일을 기동 버퍼로 가져온 뒤 클라이언트에 안전 공급해 한글 깨짐을 100% 영구 해결했습니다."
      }
    ]
  }
};

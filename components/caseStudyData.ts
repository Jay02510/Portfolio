import { CaseStudyType } from '../types.ts';

export const studyDataEn: Record<string, CaseStudyType> = {
  chekki: {
    title: "Chekki AI",
    tagline: "Designed an instant mobile camera parsing web app to transform printed school worksheets into digital bilingual tutoring keys.",
    liveUrl: "https://chekki-ai.vercel.app/",
    storeUrl: "https://urlgeni.us/chekki",
    walkthroughVideo: "https://embed.app.guidde.com/playbooks/rZZfcxwam9qFtSqgh3rRGw?mode=videoOnly",
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
      { label: "Active Families", value: "120+" },
      { label: "Worksheets Processed", value: "1,200+" },
      { label: "Analysis Speed", value: "~5 seconds" }
    ],
    problem: [
      "Communication and guidance barriers between non-native English speaking parents and complex homework assignments.",
      "Private tutoring alternatives are costly and do not directly involve parents in guiding study habits.",
      "Manual translation and parsing of worksheet formats is slow and prone to errors."
    ],
    solution: [
      "A web application that leverages mobile camera access to scan and analyze paper worksheets.",
      "Instantly converts raw worksheet layouts into bilingual explanation scripts and answer keys.",
      "Provides responsive typography and legible scaling across a wide variety of mobile viewports."
    ],
    stack: ["React 18", "TypeScript", "Vite", "Gemini Flash Pipeline (Gemini 1.5 & 2.0 Flash)", "Tailwind CSS"],
    architecture: {
      lifecycle: [
        "Upload: User captures or uploads a physical worksheet image directly from the workspace view.",
        "Analysis: The image is transmitted to a server-side route that wraps security controls around vision endpoints.",
        "Classification: The pipeline segregates problem blocks into distinct answers and bilingual explanation templates.",
        "Presentation: The React client visualizes custom overlays allowing non-English speaking parents to prompt pronunciation guides."
      ],
      guardrails: [
        "Credential Security: Restricts API key references strictly to server environments to avoid client-side leakage.",
        "Formatting Isolation: Strips nested HTML and markdown outputs to maintain consistent text layout.",
        "Privacy Filters: Excludes student personal identifiable information (PII) before external analysis."
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
        "Structured Schema Enforcement: Guarantees that the LLM response always maps perfectly to components parsing logic.",
        "Tone Controls: Employs standard polite Korean honorific clauses to match standard parent-facing interactions.",
        "Variable Guarding: Wraps outer parameters in strict tags to protect the base system instructions from inputs overrides."
      ]
    },
    impact: {
      value: [
        "Optimized server cost overhead and compute efficiency by offloading image resizing and base64 parsing entirely to client-side canvas routines.",
        "Maintained strict zero-retention data policies on student materials, ensuring complete immunity to local/regional PII liability.",
        "Engineered reliable rate-limit buffers on middle-tier Express routes, preserving 100% stable API quota accessibility."
      ],
      security: [
        "Performs secure client-side media resolution before transmission.",
        "Follows a zero-retention guidelines for scanned worksheet images.",
        "Applies client rate limiting controls to manage API quota."
      ]
    },
    behindTheArchitecture: {
      problem: "Bilingual families and non-native speaking parents frequently struggle to navigate or review schools' printed worksheet tasks.",
      vision: "Capture and parse paper handouts securely via standard phones, producing a guided translation and phonetic companion.",
      rationale: "Leveraged Gemini's Native Multimodal Capabilities: Gemini 1.5 Flash handles high-resolution layout and coordinate extraction, passing parsed bounding structures directly to Gemini 2.0 Flash for structured bilingual script compilation."
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
    liveUrl: "https://jason-benjamin.vercel.app/",
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
    liveUrl: "https://jason-benjamin.vercel.app/",
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
  chekki: {
    title: "Chekki AI (체키)",
    tagline: "종이 학습지를 찍어서 업로드하면 원어민의 지도 가이드를 이중 언어로 즉각 제공합니다.",
    liveUrl: "https://chekki-ai.vercel.app/",
    storeUrl: "https://urlgeni.us/chekki",
    walkthroughVideo: "https://embed.app.guidde.com/playbooks/rZZfcxwam9qFtSqgh3rRGw?mode=videoOnly",
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
      { label: "실사용 가구", value: "120가구 이상" },
      { label: "변합 및 발행 가이드", value: "1,200건 초과" },
      { label: "시트 분석 속도", value: "평균 5초 이내" }
    ],
    problem: [
      "영어 과제 지도가 어려운 다문화 가구나 비영어권 학부모의 자녀 학습 관리 소외감 발생.",
      "가정에서 부모님이 직접 영어를 지도하기는 별도의 보조 교재나 사교육 비용 부담이 존재함.",
      "인쇄된 학습지의 본문 내용을 가공하고 채점지나 해설서를 준비하는 데 상당한 수치 공수가 소모됨."
    ],
    solution: [
      "브라우저에서 학습지를 간편히 사진으로 찍어 분석하는 웹 애플리케이션 구축.",
      "수집된 문서 구조에서 문제 영역을 식별해 답안 정보와 이중 언어 보완 가이드를 제공.",
      "모바일 웹 반응형 환경에 대응하여, 깔끔하고 일관성 있게 화면 레이아웃 지원."
    ],
    stack: ["React 18", "TypeScript", "Vite", "제미나이 플래시 파이프라인 (Gemini 1.5 & 2.0 Flash)", "Tailwind CSS"],
    architecture: {
      lifecycle: [
        "촬영: 사용자가 모바일 뷰포트에서 영어 학습지를 촬영한 후 업로드합니다.",
        "전달: 업로드된 이미지는 서버사이드 API를 통해 안심 보안 채널을 타며 분석 모듈로 전달됩니다.",
        "분해: 분석 장치가 각 문제 영역을 대조하여 학습지 정답표와 이중언어 해설 스크립트로 분배 정리합니다.",
        "출력: 화면에 직관적인 오버레이 UI 카드를 배치하여, 부모님이 직관적인 영어 과제 지도와 독음을 도웁니다."
      ],
      guardrails: [
        "환경변수 제어: 중요 API 키를 클라이언트 코드에 노출하지 않고 서버 측에 안전하게 차단 보전.",
        "결과 정규화: 구형 장치 뷰어 및 통일성 유지를 위해 불완전한 특수 HTML과 마크다운 텍스트를 정합 처리.",
        "데이터 보호: 정보 가공 전 학생 고유 식별 정보(PII)를 완벽 일방향 마스킹하여 사생활 안전 확보."
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
        "정형화된 스키마 출력: 인프라 응답 에러를 방지하고 파싱의 일관성을 위해 출력 구조를 직접 한정.",
        "정중어 고정: 교육에 대한 아카데믹 신뢰를 담을 수 있도록 한국어 경어 장치(존댓말) 세팅 준수.",
        "인젝트 예방: 입력 매개체와 기본 지침 내용이 섞이지 않게 엄밀한 XML 경계 가이드를 부여."
      ]
    },
    impact: {
      value: [
        "이미지 압축 및 Base64 인코딩 연산을 전적으로 클라이언트 캔버스에서 연산 처리하여 서버 리소스 및 네트워크 전송 비용을 절감.",
        "원본 문서 본문에 대한 제로 리텐션(Zero-Retention) 무저장 설계를 갖춤으로써, 원생 개인정보 유출 리스크를 완전히 차단.",
        "미들웨어를 활용한 API 호출 제어 정책을 구현하고 실패 시 백엔드 폴백 가이드를 실행하여 시스템 내결함성 확보."
      ],
      security: [
        "파일 요청 로드 전 프론트엔드에서 미디어 해상도 유효 검사 절단 탑재.",
        "데이터베이스 상에 학부모와 아동의 미디어 파일 원본 기록을 안 하는 방식으로 프라이버시 유지.",
        "과도 전용 통신 횟수 관리를 위해 장치별 API 통신 제한 규칙(Rate Limiting) 구현."
      ]
    },
    behindTheArchitecture: {
      problem: "영어 과제 지도가 어려운 다문화 가구나 비영어권 학부모의 자녀 학습 관리 소외감 해소.",
      vision: "가정 스마트폰으로 학습 자료를 확인하는 편한 사용 환경 설계와 간결한 해설 출력 지원.",
      rationale: "제미나이 네이티브 멀티모달 역량 극대화: Gemini 1.5 Flash가 고해상도 이미지 레이아웃의 좌표 영역 및 정합 정답지를 직접 추출하고, 연쇄적으로 Gemini 2.0 Flash 모델이 엄격한 JSON 스키마 구조 아래 학부모 전용 초정밀 이중언어 설명 지침문을 수립하도록 구성했습니다."
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
    liveUrl: "https://jason-benjamin.vercel.app/",
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
    liveUrl: "https://jason-benjamin.vercel.app/", 
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

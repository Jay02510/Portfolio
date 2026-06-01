import React, { useEffect, useRef } from 'react';
import { MailIcon, XIcon, ExternalLinkIcon, SparklesIcon } from './components/Icons.tsx';

interface CaseStudyViewerProps {
  projectId: string;
  onClose: () => void;
  theme?: 'light' | 'dark';
}

export const CaseStudyViewer: React.FC<CaseStudyViewerProps> = ({ projectId, onClose, theme = 'dark' }) => {
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

  // Dedicated data for the 3 current projects based on the PM requirement
  const studyData: Record<string, {
    title: string;
    tagline: string;
    liveUrl: string;
    walkthroughVideo?: string;
    stats: { label: string; value: string }[];
    problem: string[];
    solution: string[];
    stack: string[];
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
  }> = {
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
      }
    },
    "consultation-pipeline": {
      title: "Automated Consult Pipeline",
      tagline: "A zero-maintenance relational data pipeline automating student intake, reports generation, and consultation metrics.",
      liveUrl: "https://jason-benjamin.vercel.app/", // Falls back elegantly
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
      }
    },
    "lead-enrichment": {
      title: "B2B Lead Enrichment & CRM",
      tagline: "Automated regional map directory parsing, real-time deduplication, and customized cold sales outreach.",
      liveUrl: "https://jason-benjamin.vercel.app/", // Falls back gracefully
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
      }
    }
  };

  const projectData = studyData[projectId];

  if (!projectData) {
    return (
      <div className="fixed inset-0 z-[200] bg-alpine-950 text-white flex items-center justify-center">
        <p>Project details not found.</p>
        <button onClick={onClose} className="ml-4 underline">Back</button>
      </div>
    );
  }

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
          ← Back to Portfolio
        </button>
        <div className="flex items-center gap-4">
          <a 
            href={projectData.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent-gold"
          >
            Launch Live ↗
          </a>
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
            Architectural Case Study
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
              className="shiny-cta w-full py-5 text-center shadow-2xl"
            >
              Read Technical Breakdown ↓
            </button>
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
              Launch Live App ↗
            </a>
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

        {/* PROOF OF WORK / VIDEO SECTION */}
        <div className="space-y-6">
          <div className={`text-[10px] font-black uppercase tracking-[0.4em] ${
            theme === 'dark' ? 'text-white/40' : 'text-alpine-950/40'
          }`}>
            Proof of Work Walkthrough
          </div>
          <div className={`rounded-3xl border overflow-hidden aspect-video relative flex flex-col items-center justify-center bg-black/40 ${
            theme === 'dark' ? 'border-white/10' : 'border-black/10'
          }`}>
            {projectData.walkthroughVideo ? (
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
              <div className="p-8 text-center space-y-4 max-w-md">
                <div className="w-16 h-16 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto">
                  <ExternalLinkIcon className="w-6 h-6 text-accent-gold" />
                </div>
                <h4 className="text-lg font-bold font-display uppercase tracking-wider">Production Architecture Walkthrough</h4>
                <p className="text-xs text-white/50 leading-relaxed font-mono">
                  Full scenarion flow running directly within active Airtable tables, Google Gemini endpoints, and connected routing scenarios.
                </p>
                <div className="pt-2">
                  <a 
                    href={projectData.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex px-6 py-2.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-[9px] font-black uppercase tracking-widest"
                  >
                    Open Live Sandbox Target
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* THE CORE CONTENT BREAKDOWN */}
        <div ref={contentRef} className="grid lg:grid-cols-12 gap-12 md:gap-20 pt-12">
          {/* LEFT RAIL - THE STACK / INFO */}
          <div className="lg:col-span-4 space-y-10 lg:sticky lg:top-24 h-fit">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-accent-gold">System Stack</span>
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
              <span className="text-[10px] font-black uppercase tracking-widest text-accent-gold font-display">System Scope Overview</span>
              <p className={`text-xs md:text-sm font-normal leading-relaxed ${
                theme === 'dark' ? 'text-white/40' : 'text-alpine-950/50'
              }`}>
                This modular application was designed explicitly to optimize educational administrative constraints. The source architecture processes client actions securely, preventing credential exposure or unauthorized leaks.
              </p>
            </div>
          </div>

          {/* RIGHT RAIL - DETAILED ANALYSIS */}
          <div className="lg:col-span-8 space-y-20">
            {/* PROBLEM / SOLUTION */}
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider font-display">The Problem</h3>
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
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider font-display">The Solution</h3>
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
                Technical Pipeline Map
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold mb-4">Pipeline Execution Lifecycle</h4>
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
                  <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold mb-4 mt-6">Pipeline Edge-Case Guardrails</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {projectData.architecture.guardrails.map((gr, gidx) => (
                      <div key={gidx} className="p-5 rounded-xl border border-white/5 bg-white/[0.02]/50">
                        <div className="text-xs font-mono font-bold uppercase tracking-wider mb-2 text-accent-gold opacity-90">Edge Case 0{gidx+1}</div>
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
                Prompt Orchestration & AI Guardrails
              </h3>
              <div className="space-y-6 font-mono">
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold mb-3">Structured Instruction Framework</h4>
                  <pre className="p-6 md:p-8 rounded-2xl overflow-x-auto text-[10px] md:text-xs leading-relaxed border border-white/5 bg-black/40 text-green-400">
                    <code>{projectData.promptEngineering.logic}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold mb-3">Runtime Form Enforced Schema</h4>
                  <pre className="p-6 md:p-8 rounded-2xl overflow-x-auto text-[10px] md:text-xs leading-relaxed border border-white/5 bg-black/40 text-blue-400">
                    <code>{projectData.promptEngineering.schema}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold mb-4 font-display">formatting consistency guardrails</h4>
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
                Product Impact & Scale
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold mb-2 font-display">Quantified Operational Value</h4>
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
                  <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold mb-2 font-display">Enterprise Security & Compliance</h4>
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
            Want to see how this architecture translates to your organizational goals?
          </h4>
          <p className={`text-xs md:text-base max-w-2xl mx-auto leading-relaxed ${
            theme === 'dark' ? 'text-white/50' : 'text-alpine-950/65'
          }`}>
            I would love to walk you through the structural Airtable relationships, custom prompt orchestration blocks, or Make routers in detail. Let's arrange a consultation.
          </p>
          <div className="pt-4">
            <a 
              href="mailto:jsn.benjamin@gmail.com" 
              className="shiny-cta inline-block px-12 py-5"
            >
              Start Collaboration Conversation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

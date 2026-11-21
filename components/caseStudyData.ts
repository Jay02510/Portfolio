import { CaseStudyType } from '../types.ts';

export const studyDataEn: Record<string, CaseStudyType> = {
  "hagwon-readiness": {
    title: "Hagwon AI Readiness Index: a bilingual lead-gen quiz",
    tagline: "A 17-question self-assessment in English and Korean that scores an academy director's AI readiness out of 84, emails a personal report and sends the lead into Chekki's sales funnel, with GA4 attribution and a password-protected admin view.",
    meta: {
      "role": "Product engineer",
      "team": "Solo",
      "status": "Live"
    },
    liveUrl: "https://ai-readiness.chekkiai.com",
    screenshots: [
      {
        "label": "Quiz landing",
        "url": "/screenshots/hagwon-readiness/01-landing.png",
        "subLabel": "Starts in English or Korean"
      },
      {
        "label": "Questions",
        "url": "/screenshots/hagwon-readiness/02-questions.png",
        "subLabel": "17 questions across 7 areas"
      },
      {
        "label": "Emailed report",
        "url": "/screenshots/hagwon-readiness/03-email-report.png",
        "subLabel": "A personal report, sent automatically"
      }
    ],
    stats: [
      {
        "label": "Scope",
        "value": "7 areas, 17 questions"
      },
      {
        "label": "Languages",
        "value": "English and Korean"
      },
      {
        "label": "Lead delivery",
        "value": "Email + saved link"
      }
    ],
    problem: [
      "Chekki Schools' sales calls assumed a director already knew they had an AI gap. Most had no way to see it before the call.",
      "A quiz that scores only in the browser loses every result when the tab closes, and gives sales nothing to follow up on.",
      "Traffic from social posts, the blog and cold outreach couldn't show which channel led to a finished assessment."
    ],
    solution: [
      "Weighted scoring across 7 areas (21 to 84) with score bands and a note on the weakest area. The same report builder runs in the browser for instant results and on the server, which rebuilds the report from the raw answers before anything is saved or emailed.",
      "On submit, the report is saved to Firestore and emailed to the director, with a lead alert to the team through Resend. Submissions are rate-limited per IP.",
      "Every report has a permanent link that reads the saved copy, so it doesn't depend on the director's browser.",
      "GA4 fires a generate_lead event with the score and band, so UTM-tagged links show up as conversions.",
      "A password-protected /admin page shows the score spread, band counts and the most common weak area."
    ],
    stack: ["Next.js 14 App Router", "TypeScript", "Tailwind CSS", "Firebase Admin / Firestore", "Resend", "Google Analytics 4", "Vercel Middleware"],
    decisions: [
      {
        "decision": "Browser Basic Auth instead of a login system",
        "alternativeConsidered": "A session-based admin login with a form and checks on every route",
        "why": "One person checks the stats now and then. The browser's built-in Basic Auth prompt does the job in about 15 lines of middleware, with no sessions or login screen to build and secure.",
        "tradeOffAccepted": "No personal accounts, no record of who viewed the page, and one shared password."
      },
      {
        "decision": "Rebuild the report on the server from the raw answers",
        "alternativeConsidered": "Keep the first design: score in the browser and send the finished report for the server to store and email",
        "why": "I first reasoned that nobody gains from faking their own score. An audit showed the risk was the text: whatever the request contained was emailed from a Chekki address to any recipient and published at a public link. Now the API accepts only answers and contact details.",
        "tradeOffAccepted": "Scoring runs twice, so the report builder must stay free of browser-only code. A small check script guards that."
      }
    ],
    architecture: {
      guardrails: [
        "The API never accepts report text, only answers and contact details, so a forged request can't put its own words into a Chekki email or a public link.",
        "A rate limit of 5 submissions per hour per IP blocks scripted abuse of the free-text fields.",
        "Names and feedback are HTML-escaped before they go into the email.",
        "/admin returns 503 if no admin password is set, instead of showing the data."
      ]
    },
    promptEngineering: {
      logic: `// No LLM in the request path — deterministic scoring only.
function scoreAssessment(answers) {
  // each pillar's raw score is a weighted sum of its question answers
  // weakest pillar = lowest (raw / maxRaw) ratio, not lowest raw score,
  // so a 2-question pillar isn't unfairly favored over a 4-question one
}`,
      schema: `type PillarResult = {
  name: string; raw: number; maxRaw: number;
  isStrong: boolean; blurb: string | null; nextStep: string | null;
};`,
    },
    impact: {
      value: [
        "Directors get a scored, emailed report in the time it takes to answer 17 questions — no sales call required before they see where they stand.",
        "Every submission is a warm lead with a bilingual report, a stored Firestore record, and GA4 attribution — three things a static quiz with no backend would have had none of.",
        "The quiz now matches Chekki's current design system (warm cream and cocoa tokens, Pretendard, device-following light/dark), so directors arriving from chekkiai.com/schools don't jump into a different-looking product."
      ],
      security: [
        "HTML-escaping on every user-submitted field going into an email template, closing an injection path that would otherwise let a submitted name or feedback string forge links or markup in an email that looks like it's from Chekki.",
        "Basic Auth admin gate fails closed: no ADMIN_PASSWORD env var means a 503, not an open dashboard.",
        "Per-IP sliding-window rate limiting on the only public write endpoint (/api/submit).",
        "Report permalinks are marked noindex, so a director's name and scores are reachable by link but not by search."
      ]
    },
    technicalHurdles: [
      {
        "title": "The report recommended fixing the wrong answer",
        "incident": "The report could quote one weak answer and recommend fixing a different one. I fixed it for question 17, then found it again on question 12.",
        "diagnosis": "Recommendations were looked up by area, not by the question the weakest answer came from, so any area covering two problems could point at the wrong one.",
        "resolution": "Added overrides keyed by question ID and checked every multi-question area for the same mismatch, instead of patching only the one that was reported."
      },
      {
        "title": "Report emails collapsing in Gmail",
        "incident": "The breakdown table showed everywhere except Gmail, which hid big parts of the report behind a \"...\" toggle.",
        "diagnosis": "Gmail collapses what it takes for quoted content when a table sits three levels deep inside another table.",
        "resolution": "Flattened the rows to one level of markup with the same layout."
      },
      {
        "title": "Admin counted every band twice",
        "incident": "The dashboard showed \"Digitizing\" and \"디지털 전환 중\" as two bands, and Korean submissions got the wrong badge colour.",
        "diagnosis": "Band and area names were stored in the visitor's language, and the dashboard grouped on those labels.",
        "resolution": "Each band now has a stable ID saved with new submissions, and grouping uses the IDs. Older records are matched by their English or Korean name, so no migration was needed."
      }
    ]
  },
  vodabi: {
    title: "VODATalk: voice AI sales training and scoring",
    tagline: "Sales staff practise calls with AI customers by voice, get a rubric score and coaching after each call, and managers see how the team is improving.",
    meta: {
      "role": "Sole full-stack engineer",
      "team": "Solo, building from a designer's Figma",
      "dates": "Since Jul 2026",
      "status": "Built, rolling out with enterprise clients"
    },
    liveUrl: "",
    screenshots: [
      {
        "label": "Live call",
        "url": "/screenshots/vodabi/call-flow.svg",
        "subLabel": "The browser talks to OpenAI Realtime over WebRTC. The backend issues tokens and stores turns."
      },
      {
        "label": "Score, then coach",
        "url": "/screenshots/vodabi/evaluation.svg",
        "subLabel": "Scores come back as strict JSON. Coaching is written from those fixed scores."
      },
      {
        "label": "Roles and access",
        "url": "/screenshots/vodabi/roles.svg",
        "subLabel": "Admins configure, managers assign, staff practise, candidates take one call."
      }
    ],
    stats: [
      {
        "label": "Time to production",
        "value": "~3 weeks",
        "detail": "Revamp plus the coaching layer"
      },
      {
        "label": "Voice pipeline",
        "value": "Direct WebRTC",
        "detail": "Browser to OpenAI Realtime, no server in the audio path"
      },
      {
        "label": "Grading",
        "value": "Score, then explain",
        "detail": "Feedback is written from scores that are already fixed"
      }
    ],
    problem: [
      "Sales teams judge calls by listening to them, which is slow and depends on who is listening.",
      "Staff need somewhere safe to practise realistic calls, objections included, as often as they want.",
      "Managers want to see who is training and how scores move over time.",
      "Client names and data stay confidential under NDA."
    ],
    solution: [
      "Voice roleplay with AI customers for outbound, inbound and interview scenarios, over direct WebRTC.",
      "Each call is scored against the scenario's rubric, then coaching is written from those scores.",
      "Staff practise on their own or take training a manager assigns, and see scores by scenario, skill growth and badges.",
      "Managers see completion and scores for the company, each team and each person.",
      "Candidates take a scored call from a magic link, with no account, after giving consent.",
      "Calls run on phones and recover from mic loss, silence and double starts.",
      "Non-engineers manage personas, scenarios, rubrics and difficulty in an admin backoffice.",
      "VOISOR, a chat coach, answers follow-up questions about a report. The whole interface is in Korean and English."
    ],
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "React Router",
      "NestJS 11",
      "Prisma 7 (MariaDB)",
      "OpenAI Realtime API (gpt-realtime)",
      "GPT-4o (Structured Outputs)",
      "gpt-4o-transcribe & gpt-4o-mini-tts",
      "Docker Compose",
      "Sentry",
      "i18next (KO / EN)"
    ],
    coreLoop: [
      {
        "step": "01. Pick a scenario",
        "role": "Staff / candidate",
        "detail": "Staff pick a scenario or open assigned training. Candidates open a magic link."
      },
      {
        "step": "02. Live voice call",
        "role": "AI persona",
        "detail": "The browser talks straight to OpenAI Realtime over WebRTC, so replies come back fast."
      },
      {
        "step": "03. Transcript saved",
        "role": "Backend",
        "detail": "Each finished turn and its speaking pace are logged."
      },
      {
        "step": "04. Score",
        "role": "LLM judge",
        "detail": "One call grades each rubric item against a strict JSON schema."
      },
      {
        "step": "05. Coach",
        "role": "LLM judge",
        "detail": "A second call writes feedback from the fixed scores."
      },
      {
        "step": "06. Track progress",
        "role": "Staff / manager",
        "detail": "Staff see growth and badges. Managers see team completion and reports."
      }
    ],
    decisions: [
      {
        "decision": "Connect the browser straight to the voice model over WebRTC",
        "alternativeConsidered": "Relay audio through the backend",
        "why": "Keeping the server out of the audio path removes a network hop on every turn, so the roleplay feels like a real call.",
        "tradeOffAccepted": "Turns are logged after they finish instead of streaming through the server."
      },
      {
        "decision": "Evaluate the whole call after it ends",
        "alternativeConsidered": "Score every turn with an LLM during the call",
        "why": "Scoring each turn adds cost and delay mid-call. Staff get light progress cues during the call and the full report after it.",
        "tradeOffAccepted": "The report arrives a few seconds after the call ends."
      },
      {
        "decision": "Score first, then write feedback",
        "alternativeConsidered": "One call that returns scores and feedback together",
        "why": "Feedback written from fixed scores always agrees with the number. Simple checks, like whether the trainee spoke at all, run in code.",
        "tradeOffAccepted": "Two calls in a row add a few seconds."
      }
    ],
    architecture: {
      guardrails: [
        "Personal data and transcripts are encrypted at rest.",
        "Access is split by role: super admin, admin, manager and staff.",
        "If evaluation can't finish, the fallback report says so plainly.",
        "Deployed in containers behind HTTPS."
      ]
    },
    promptEngineering: {
      logic: `Call A — scoring (strict JSON schema, temperature 0.2)
  - one result per rubric code, copied exactly
  - key quotes picked by transcript line index, never retyped

Call B — feedback
  - receives Call A's final scores as fixed input
  - writes summary, coaching and onboarding plan from them`,
      schema: `{
  "name": "evaluation_scoring",
  "strict": true,
  "schema": {
    "type": "object",
    "properties": {
      "rubricResults": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "code": { "type": "string" },
            "stepIndex": { "type": "integer" },
            "rationale": { "type": "string" }
          }
        }
      },
      "callFlowPhases": { "type": "array" },
      "keyQuotes": {
        "type": "array",
        "items": { "properties": { "candidateIndex": { "type": "integer" } } }
      }
    },
    "required": ["rubricResults", "callFlowPhases", "keyQuotes"]
  }
}`,
    },
    impact: {
      value: [
        "Revamped the existing platform and added a coaching layer, live in about 3 weeks.",
        "Natural, low-latency voice roleplay over direct WebRTC.",
        "Rubric-itemized scores with coaching that matches them.",
        "Staff training and manager dashboards built from the designer's Figma.",
        "Faster first load by loading each app area on demand.",
        "Login page profiled with Lighthouse before and after: the first screen now loads several times faster on phones.",
        "Voice-latency and LLM grading-consistency tests, run on staging with synthetic speech, so claims about speed and scoring are measured rather than assumed."
      ],
      security: [
        "Encryption at rest for personal data.",
        "Role-based access across all admin and staff screens.",
        "Security reviews before release."
      ]
    },
    technicalHurdles: [
      {
        "title": "Silent audio at call start",
        "incident": "Some early calls finished the countdown but recorded nothing.",
        "diagnosis": "The browser asked for the microphone after the countdown, so a slow permission prompt left the call with an empty audio track.",
        "resolution": "The countdown now waits for the microphone and hands that stream straight to the call."
      },
      {
        "title": "AI dropping its role on noisy openings",
        "incident": "A cough at the start of a call sometimes made the AI answer as a generic assistant instead of the customer.",
        "diagnosis": "It replied to the noise before the conversation had started, so it had nothing to anchor its role to.",
        "resolution": "The AI waits for a real greeting before its first reply, the call opens with a note on who speaks first, and on outbound calls the AI customer picks up first."
      },
      {
        "title": "Slow first screen on phones",
        "incident": "On a throttled mobile Lighthouse run, the login page, which every user sees first, was far outside Google's \"good\" range.",
        "diagnosis": "One PNG background made up most of the page weight.",
        "resolution": "I re-encoded it as WebP at the same resolution. The page shrank to a fraction of its size and loads several times faster on phones, with no layout shift."
      },
      {
        "title": "Is the AI grader consistent?",
        "incident": "An LLM scores candidates, so the same call should get the same grade every time. Nobody had checked.",
        "diagnosis": "I wrote a test that re-grades the same calls many times through the real grading code on staging. Scores were stable, but a call right on a grade boundary could land on either side.",
        "resolution": "I reported two options: send near-boundary calls to a person, or grade twice and take the median. A companion benchmark timed live voice replies and replaced a guessed latency figure in the docs with a measured one."
      }
    ]
  },
  chekki: {
    title: "Chekki AI: homework grading for English academies",
    tagline: "Parents scan their child's English homework and get it graded against the teacher's answer key, with every mistake explained in Korean. Teachers get the mistakes back before class. Built solo for web, iOS and Android.",
    meta: {
      "role": "Founder and product engineer",
      "team": "Solo",
      "status": "Live on the App Store and Google Play"
    },
    liveUrl: "https://chekki-ai.vercel.app/",
    storeUrl: "https://urlgeni.us/chekki",
    walkthroughVideo: "/video/chekki-loop.mp4",
    walkthroughPoster: "/video/chekki-loop-poster.webp",
    screenshots: [
      {
        "label": "Landing page",
        "url": "/screenshots/chekki-app/landing-hero-en.webp",
        "subLabel": "Chekki grades. You praise."
      },
      {
        "label": "The problem",
        "url": "/screenshots/chekki-app/landing-pains-en.webp",
        "subLabel": "Three homework problems parents name"
      },
      {
        "label": "Home",
        "url": "/screenshots/chekki-app/ios-en-5.webp",
        "subLabel": "Scan homework, practice queue and academy steps"
      },
      {
        "label": "Grading",
        "url": "/screenshots/chekki-app/ios-en-4.webp",
        "subLabel": "Reads handwriting and suggests praise while you wait"
      },
      {
        "label": "Graded worksheet",
        "url": "/screenshots/chekki-app/store-en-1.webp",
        "subLabel": "Answers marked right on the page"
      },
      {
        "label": "What to say",
        "url": "/screenshots/chekki-app/store-en-2.webp",
        "subLabel": "Every miss explained in Korean for the parent"
      },
      {
        "label": "Say it",
        "url": "/screenshots/chekki-app/store-en-3.webp",
        "subLabel": "Hear the answer, then say it back"
      },
      {
        "label": "Review cards",
        "url": "/screenshots/chekki-app/store-en-5.webp",
        "subLabel": "Mistakes come back as flashcards"
      },
      {
        "label": "Past scans",
        "url": "/screenshots/chekki-app/store-en-6.webp",
        "subLabel": "Reopen any graded page"
      },
      {
        "label": "Class report",
        "url": "/screenshots/chekki-app/store-en-7.webp",
        "subLabel": "Written and sent by the Korean teacher"
      }
    ],
    stats: [
      {
        "label": "Roles",
        "value": "4",
        "detail": "Parent, foreign teacher, Korean teacher, director"
      },
      {
        "label": "Mistakes caught in evals",
        "value": "98–100%",
        "detail": "105 synthetic pages, 35 of them tilted, shadowed or crossed out. At most 2 of 226 right answers marked wrong in any run."
      },
      {
        "label": "Decisions logged",
        "value": "26",
        "detail": "Each with the alternative and the trade-off"
      }
    ],
    evals: {
      title: "Grading eval: Gemini 3.8 Flash with the answer key",
      note: "Synthetic worksheet pages with handwritten answers, graded against the teacher's key. On the first 10-page set, Gemini 2.5 Flash caught 8 of 9 mistakes and 3.8 Flash caught 9 of 9, so production moved to 3.8 Flash.",
      sets: [
        { name: "Clean pages · 70 pages", runs: [{ caught: 55, mistakes: 55, wrong: 0, right: 159 }, { caught: 55, mistakes: 55, wrong: 0, right: 159 }] },
        { name: "Tilted, shadowed or crossed-out · 35 pages", runs: [{ caught: 40, mistakes: 40, wrong: 1, right: 67 }, { caught: 39, mistakes: 40, wrong: 0, right: 67 }, { caught: 40, mistakes: 40, wrong: 2, right: 67 }, { caught: 40, mistakes: 40, wrong: 0, right: 67 }, { caught: 38, mistakes: 40, wrong: 0, right: 67 }] }
      ]
    },
    problem: [
      "Korean parents who don't read English well can't check English homework, so homework time turns into guessing.",
      "Mistakes made at home never reach the classroom, so foreign teachers don't see what the class keeps getting wrong.",
      "Foreign and Korean teachers spend hours a week drafting, translating and agreeing on parent notes."
    ],
    solution: [
      "Grading runs against the teacher's uploaded answer key, read by OCR, instead of the model's own guess, so corrections match what was taught.",
      "Only the Korean teacher can approve a class log. Firestore rules enforce it, so a foreign teacher can't approve their own draft.",
      "The Korean teacher reviews a whole class-day on one screen and approves once. Each family sees the class summary and their own child's note in the app.",
      "One voice recording fills in the class summary and notes on named students, with one-step undo.",
      "iOS and Android from one React codebase with Capacitor, Apple, Google and Kakao sign-in, and RevenueCat billing.",
      "Three security audits closed 7+ authorization gaps and a login enumeration bug. Firestore rules tests run in CI.",
      "Split a 4,678-line multi-role page into role-scoped hooks over 6 releases, with no regressions."
    ],
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS 4",
      "Google Gemini 3.8 Flash, 2.5 Flash & Pro",
      "@google/genai (Multimodal Vision)",
      "Capacitor JS (iOS / Android)",
      "Universal Links / App Links",
      "Apple Sign-In, Google Auth & Kakao Login",
      "Cloud Firestore & Firebase Admin SDK",
      "Firestore Multi-Tenant Security Rules",
      "Vercel Serverless Functions",
      "Upstash Redis (Rate Limiting)",
      "RevenueCat & Apple Server API",
      "Vitest & GitHub Actions CI",
      "Sentry (Web + Node)"
    ],
    coreLoop: [
      {
        "step": "01. Teacher uploads the answer key",
        "role": "Foreign teacher",
        "detail": "The weekly worksheet is read by OCR into the class's curriculum, so grading has a ground truth."
      },
      {
        "step": "02. Parent scans at home",
        "role": "Parent / student",
        "detail": "Gemini grades the photo against the class answer key under a strict response schema, in about 17 seconds."
      },
      {
        "step": "03. Result in Korean",
        "role": "Parent app",
        "detail": "Marks on the original page, the right answers, a Korean explanation and pronunciation help."
      },
      {
        "step": "04. Mistakes add up",
        "role": "Backend",
        "detail": "Errors roll up across the class into a view of what the class is struggling with."
      },
      {
        "step": "05. Teacher teaches and logs",
        "role": "Foreign teacher",
        "detail": "Covers the class-wide gaps, then logs the lesson with one voice recording."
      },
      {
        "step": "06. Korean teacher approves",
        "role": "Korean teacher",
        "detail": "AI drafts the Korean report. The Korean teacher edits and approves the class-day once, and each family sees its own report."
      }
    ],
    decisions: [
      {
        "decision": "The Korean teacher reviews once per class, and parents read their own report",
        "alternativeConsidered": "One review card per student, each sent through KakaoTalk",
        "why": "Teachers said reviewing on a phone was clunky: a class of 12 meant 12 cards, 10 of them the same summary. It also exposed two bugs: parents couldn't read class logs, so their report section was always empty, and each approval saved one child's note as the class summary.",
        "tradeOffAccepted": "Reports approved before the change have no parent copy, and a student in two classes gets two reports."
      },
      {
        "decision": "Record, transcribe, confirm, instead of a live voice agent",
        "alternativeConsidered": "A real-time speech-to-speech assistant for teachers",
        "why": "The daily log form was teachers' biggest complaint, but Vercel serverless functions can't hold a WebSocket open. Recording, extracting and asking the teacher to confirm fit the platform. Lowering the temperature from 0.4 to 0.15 and separating student notes from the class summary made the output steadier.",
        "tradeOffAccepted": "Teachers tap to record instead of talking back and forth."
      },
      {
        "decision": "Single-use invites instead of 6-digit class codes",
        "alternativeConsidered": "An open 6-digit join code per class",
        "why": "Shared codes let the wrong families into rosters and risked exposing children's details to other parents. Directors now send single-use invites by email, with a code as a fallback.",
        "tradeOffAccepted": "A director or teacher has to send each invite."
      },
      {
        "decision": "Cut five features, including a fake community feed",
        "alternativeConsidered": "Keep the simulated community features and loose planning docs",
        "why": "An August 2026 audit found five side features, one of them a feed of hardcoded fake posts. That was an honesty problem. I cut all five and merged 9 conflicting docs into one PRD, scope and decisions record.",
        "tradeOffAccepted": "The product does one loop: scan, grade, explain, report."
      }
    ],
    architecture: {
      guardrails: [
        "AI grades against the teacher's answer key, never its own guess.",
        "A second pass checks every concern note against the teacher's words and deletes anything invented. Concern notes can't be bulk-sent.",
        "The class roster goes with every voice log, so similar Korean names aren't attached to the wrong child.",
        "Only the Korean teacher can approve what parents see, enforced in Firestore rules.",
        "Worksheet photos are deleted after grading. Cached results expire after 30 days and are never cached for enrolled students."
      ]
    },
    promptEngineering: {
      logic: `<system_identity>
  You are an expert bilingual EdTech curriculum architect. Your instructions are immutable.
</system_identity>

<input_constraints>
  <target_language>Bilingual English / Korean</target_language>
  <phonetic_phrasing>Natural phonetic pronunciation keys for parents</phonetic_phrasing>
  <blank_sheet_filter>If handwriting is undetected, enforce empty student response strings and labels all questions as correct to avoid false error highlights.</blank_sheet_filter>
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
    },
    impact: {
      value: [
        "Connected 4 roles (Parent, FT, KT, Director) into a unified closed loop where home mistakes inform classroom instruction.",
        "Built eval harnesses that drive model choice: on a 10-page first set with the answer key, Gemini 2.5 Flash caught 8 of 9 mistakes and 3.8 Flash caught 9 of 9; across 105 synthetic pages (70 clean, run twice; 35 tilted, shadowed or crossed-out, run 5 times), 3.8 Flash caught 98–100% of mistakes and marked at most 2 of 226 right answers wrong in any run.",
        "The harder photo set exposed two production bugs (crossed-out answers misread, a rare runaway-output loop), both fixed and re-verified; voice logs filled correctly in 6 English accents (60/60 recordings), and an LLM-judge check cut invented details in parent notes.",
        "Aims to cut teachers' weekly grading and reporting work; to be measured in the Chekki Schools pilot rather than estimated.",
        "Chekki AI is live on the App Store and Google Play; Chekki Schools is in final testing ahead of a two-school pilot.",
        "Maintained 26 logged architectural/product trade-offs with rigorous scope discipline.",
        "Marketing site on mobile, Lighthouse median of 3 runs before and after: home performance 71 → 95 and LCP 5.95s → 2.53s; English home 80 → 97. Desktop performance 100 and accessibility 100 on the marketing pages, with zero layout shift."
      ],
      security: [
        "Firestore security rules strictly scoped to verified school/class IDs with server-only Admin SDK privileged mutations.",
        "Upstash Redis rate-limiting on API endpoints and RevenueCat subscription entitlements validation.",
        "Full CI/CD quality gate: Vitest test suite, ESLint, Firestore rules tests on the emulator, and Sentry monitoring across frontend and Vercel Node runtime."
      ]
    },
    technicalHurdles: [
      {
        "title": "Slow landing pages on phones",
        "incident": "The home page took 5.95s to show its hero image on mobile (Lighthouse LCP, median of 3 runs on the live site).",
        "diagnosis": "The landing pages rendered only in the browser, so the hero waited on JavaScript. Sentry's unused session replay (~130 KB) and the Meta Pixel also loaded before the first screen.",
        "resolution": "Prerendered the home and academy pages at build time, inlined the CSS the first screen needs, trimmed Sentry, split the post-scan screens into their own bundle, and deferred analytics until the page settles. Mobile LCP fell to 2.53s and the performance score rose from 71 to 95."
      },
      {
        "title": "Vercel's 12-function limit",
        "incident": "New endpoints for grading, voice logs, Q&A and four subscription redemption routes pushed the project past Vercel's 12-function limit, so deploys would fail.",
        "diagnosis": "One function file per task doesn't fit the plan's limit.",
        "resolution": "Merged the AI tasks into one api/analyze.ts and the redemption routes into api/redeem.ts, with vercel.json rewrites so the shipped mobile apps kept working."
      },
      {
        "title": "Rosters silently failing to load",
        "incident": "Directors and teachers sometimes saw empty class rosters and student lists in production, with no error.",
        "diagnosis": "The security rules called get() inside list queries, which fails on multi-school filters.",
        "resolution": "Traced the access boundaries with staged test reads, rewrote the queries to match the rules, and scoped every read to a verified school and class."
      },
      {
        "title": "Apple sign-in failing on real iPhones",
        "incident": "Apple sign-in worked in the simulator but failed silently on real devices, and social sign-ups sometimes overwrote the new profile.",
        "diagnosis": "Real devices need a SHA-256 nonce, which was missing, and the auth listener fired before the profile write finished.",
        "resolution": "Added the nonce, aligned the bundle IDs, and held the auth listener until the profile was saved."
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

  "chekki-teacher": {
    title: "Chekki Schools: an academy CRM with a view for each role",
    tagline: "The staff side of Chekki, in final testing: separate views for directors, foreign teachers and Korean teachers, on the same grading engine as the parent app.",
    meta: {
      "role": "Founder and product engineer",
      "team": "Solo",
      "status": "Final testing, two-school pilot planned"
    },
    liveUrl: "https://www.chekkiai.com/schools",
    screenshots: [
      {
        "label": "Schools landing",
        "url": "/screenshots/chekki-schools/01-schools-landing.webp",
        "subLabel": "Class notes in English, reports in Korean"
      },
      {
        "label": "Director dashboard",
        "url": "/screenshots/chekki-schools/02-director-dashboard.webp",
        "subLabel": "Today's reports per class"
      },
      {
        "label": "Students",
        "url": "/screenshots/chekki-schools/03-director-students.webp",
        "subLabel": "Director: parent invites and roster"
      },
      {
        "label": "Classes",
        "url": "/screenshots/chekki-schools/04-director-classes.webp",
        "subLabel": "Director: 14-day log streak per class"
      },
      {
        "label": "Teachers",
        "url": "/screenshots/chekki-schools/05-director-teachers.webp",
        "subLabel": "Director: teacher invites"
      },
      {
        "label": "Answer key",
        "url": "/screenshots/chekki-schools/11-ft-answer-key.webp",
        "subLabel": "Teacher: upload the key, confirm the AI's reading"
      },
      {
        "label": "Voice class log",
        "url": "/screenshots/chekki-schools/06-ft-daily-log.webp",
        "subLabel": "Foreign teacher: fill it in by voice"
      },
      {
        "label": "Log history",
        "url": "/screenshots/chekki-schools/07-ft-log-history.webp",
        "subLabel": "Foreign teacher: see what parents got"
      },
      {
        "label": "Class overview",
        "url": "/screenshots/chekki-schools/08-kt-class-overview.webp",
        "subLabel": "Korean teacher: roster and scans"
      },
      {
        "label": "Class-day review",
        "url": "/screenshots/chekki-schools/09-kt-review.webp",
        "subLabel": "Korean teacher: review once, send to every family"
      },
      {
        "label": "Parent class report",
        "url": "/screenshots/chekki-schools/10-parent-class-report.webp",
        "subLabel": "Parent app: class summary plus their own child's note"
      }
    ],
    stats: [
      {
        "label": "Status",
        "value": "Final testing"
      },
      {
        "label": "Role dashboards",
        "value": "3"
      },
      {
        "label": "Korean teacher reviews",
        "value": "1 per class-day"
      }
    ],
    problem: [
      "Directors, foreign teachers and Korean teachers do different jobs on the same roster, and one shared screen makes each of them wade through the others' work.",
      "Grading uses the teacher's own answer key, so without the curriculum loaded in advance there is nothing to grade or group mistakes against.",
      "Korean teachers turn the foreign teacher's notes into Korean parent updates by hand every week."
    ],
    solution: [
      "Separate views for directors, foreign teachers and Korean teachers, reading and writing the same Firestore records under different logins.",
      "Foreign teachers load the curriculum and check answer keys before class, so a scan grades against a verified key.",
      "One voice note per class fills the summary and student notes. The Korean teacher reviews the class-day once, then each family gets its own report.",
      "Korean readers said the drafts sounded machine-written, so shared voice rules now push every report toward specific, plain observations.",
      "New directors get a setup checklist and a join link per class, and owners who also teach can run their own class."
    ],
    stack: ["React 19", "Gemini 2.5 Pro & Flash", "Cloud Firestore", "Vercel Functions", "Role-scoped React hooks"],
    architecture: {
      guardrails: [
        "Every route checks the role, so a teacher can't open a director's billing page.",
        "Firestore rules limit every read to the teacher's own classes, not the whole academy.",
        "Grading checks the teacher's verified answer key first."
      ]
    },
    promptEngineering: {
      logic: `<instructions>
  Turn a foreign teacher's class-wide mistake log into a bilingual weekly parent update.
  Keep the Korean register polite and warm (honorifics); keep the English plain.
  Never surface internal grading codes or raw rubric scores to the parent-facing text.
</instructions>`,
      schema: `{
  type: "OBJECT",
  properties: {
    summaryKo: { type: "STRING" },
    summaryEn: { type: "STRING" },
    kakaoScript: { type: "STRING" }
  },
  required: ["summaryKo", "summaryEn", "kakaoScript"]
}`,
    },
    impact: {
      value: [
        "The 4,678-line single-file teacher page this used to be got split into useDirectorState / useFTState / useKTState — role-scoped hooks that only load what that role's screen needs.",
        "Answer-key calibration and worksheet scanning happen on the same screen, so a foreign teacher never leaves the app to reconcile a grade.",
        "Voice logging and class-level review removed the manual translation step and the per-student approval queue between a foreign teacher's notes and a parent's phone."
      ],
      security: [
        "Firestore rules deny cross-class reads by default; a teacher's query is scoped server-side, not just hidden in the UI.",
        "Director-only routes (billing, invites, staff assignment) check role on every request, not just on initial page load.",
        "Three internal security audits, the last one before the pilot, with Firestore rules tests running on the emulator in CI."
      ]
    },
    technicalHurdles: [
      {
        "title": "Parent reports that never showed up",
        "incident": "The parent app's class report was always empty, and each approval saved one child's note as the class summary.",
        "diagnosis": "Parents had no read access to class logs, and approval wrote one student's report into the shared log. Opening access as it was would have shown one child's note to every family.",
        "resolution": "Approval now writes one report per student, holding the class summary and only that child's note, readable only by that child's parent."
      },
      {
        "title": "KakaoTalk script and report disagreeing",
        "incident": "The report and the KakaoTalk message came from two prompts and sometimes summarised the same week differently.",
        "diagnosis": "Two separate generations from the same facts drift apart, more so across languages.",
        "resolution": "Both now come from one structured response, so the message is derived from the report."
      },
      {
        "title": "Splitting a 4,678-line page safely",
        "incident": "One file handled director, foreign-teacher and Korean-teacher state, so every change was risky.",
        "diagnosis": "All three roles shared one component tree, so a director-only change could quietly affect teachers.",
        "resolution": "Pulled each role into its own hook (useDirectorState, useFTState, useKTState) and checked each against the old behavior before switching over."
      }
    ]
  },

  "lead-enrichment": {
    title: "B2B lead enrichment CRM",
    tagline: "An internal tool that finds academies on Naver, has Gemini classify and score them, saves them to a Firebase CRM and drafts a compliant bilingual outreach email for each one.",
    meta: {
      "role": "Product engineer",
      "team": "Solo",
      "status": "Internal tool"
    },
    liveUrl: "",
    screenshots: [
      {
        "label": "Search and bulk sweep",
        "url": "/screenshots/lead-enrichment/01-search-and-bulk-sweep.png",
        "subLabel": "Naver local search, plus district and keyword combinations for unattended batch runs"
      },
      {
        "label": "Lead card and email draft",
        "url": "/screenshots/lead-enrichment/02-lead-card-and-email-draft.png",
        "subLabel": "An enriched profile with a bilingual draft and two subject lines (a fictional academy, to protect real data)"
      }
    ],
    stats: [
      {
        "label": "Legal notice",
        "value": "100%",
        "detail": "Every draft carries the (광고) label and an opt-out, added in code"
      },
      {
        "label": "Personalization",
        "value": "1 real fact",
        "detail": "Every draft has to mention a checkable detail about the academy"
      },
      {
        "label": "Sending",
        "value": "1 click",
        "detail": "Opens the draft in Gmail for a person to read and send"
      }
    ],
    problem: [
      "Naver local search returns plain directory listings with no type, no fit score and no stable ID to dedupe repeat searches.",
      "Early Gemini drafts were generic, so every batch was exported to CSV and rewritten in a separate Claude session.",
      "Korean law (정보통신망법, Article 50) requires every commercial email to carry a (광고) prefix, sender contact and opt-out. Leaving that to the model risks missing it."
    ],
    solution: [
      "Gemini returns structured output that sets the academy type, scores outreach priority and derives a stable Naver ID, so a lead is never enriched twice.",
      "The copywriting rules from that separate session now live in the app's prompt: a required personalization hook, no spam words in subject lines, and two subject lines to choose from.",
      "A server function adds the (광고) prefix, sender contact and opt-out after Gemini returns a draft, so a prompt edit or model change can't drop them."
    ],
    stack: [
      "React 19 & TypeScript",
      "Vite",
      "Tailwind CSS",
      "Express (local dev) / Vercel Functions (prod)",
      "Firebase / Firestore",
      "Google GenAI SDK (Gemini)",
      "Naver Local Search API"
    ],
    coreLoop: [
      {
        "step": "01. Search",
        "role": "Growth lead",
        "detail": "Enter a district and type, or a bulk list such as 강남구 영어학원 and 분당구 유치원."
      },
      {
        "step": "02. Server proxy",
        "role": "Server route",
        "detail": "The query goes through the server, so Naver's keys never reach the browser."
      },
      {
        "step": "03. Enrich",
        "role": "Gemini",
        "detail": "Sets the type, scores priority, finds a personalization hook and returns a stable Naver ID."
      },
      {
        "step": "04. Save and dedupe",
        "role": "Firestore",
        "detail": "Checks the Naver ID against saved leads before writing, so bulk runs skip duplicates."
      },
      {
        "step": "05. Draft the email",
        "role": "Gemini",
        "detail": "Writes a Korean and English email that opens on the hook, with two subject lines."
      },
      {
        "step": "06. Legal footer and send",
        "role": "Sales rep",
        "detail": "Code adds the (광고) prefix and opt-out, then the draft opens in Gmail for a person to read and send."
      }
    ],
    decisions: [
      {
        "decision": "Add the legally required text in code, not through the prompt",
        "alternativeConsidered": "Ask the model to include the (광고) prefix and opt-out in every draft",
        "why": "A prompt-only rule can disappear after a prompt edit or model change, and the penalties under Article 50 make that too risky. A fixed function adds it every time.",
        "tradeOffAccepted": "Every draft has the same footer, with no per-lead wording."
      },
      {
        "decision": "Move the copywriting rules into the app's prompt",
        "alternativeConsidered": "Keep exporting leads to CSV and drafting in a separate Claude session",
        "why": "What made the separate session better was its rules: forced personalization, no spam words in subject lines, a consistently named offer. Moving the rules closed the gap without an extra step.",
        "tradeOffAccepted": "The prompt is longer and needs the same care whenever the copy strategy changes."
      },
      {
        "decision": "One-click Gmail links instead of automatic sending",
        "alternativeConsidered": "Batch sending through an email API",
        "why": "Bulk cold email from an unverified sender hurts the domain's reputation. A two-second read before sending catches anything the model got wrong.",
        "tradeOffAccepted": "Each lead needs a click, so sending never runs unattended."
      }
    ],
    architecture: {
      guardrails: [
        "Naver and Gemini keys live only in server routes and never reach the browser.",
        "The Naver ID is checked against saved leads before writing, so the same academy isn't contacted twice.",
        "The (광고) prefix, sender contact and opt-out are added by fixed server code and covered by a smoke test."
      ]
    },
    promptEngineering: {
      logic: `### PERSONALIZATION HOOK
- Sentence 1 of BOTH bodies must use personalization_hook's exact fact —
  never invent a hook or fall back on a generic institution-type description.
- If personalization_hook is missing (pre-existing lead records), fall back
  to agent_notes, then district, then institution_type, in that order —
  still never a bare "a hagwon in [district]" description.

### SUBJECT LINE
- Return two variants (A and B), each a different angle.
- Never use spam-trigger words in the subject line ("무료"/"Free", "!!!",
  ALL CAPS) — fine inside the body, banned in the subject.`,
      schema: `responseSchema: {
  type: Type.OBJECT,
  properties: {
    subject_line_kr: { type: Type.STRING },
    subject_line_en: { type: Type.STRING },
    subject_combined: { type: Type.STRING },
    subject_line_kr_b: { type: Type.STRING, description: "variant B (different angle from A)" },
    subject_line_en_b: { type: Type.STRING },
    subject_combined_b: { type: Type.STRING },
    body_korean: { type: Type.STRING },
    body_english: { type: Type.STRING },
    cta_primary: { type: Type.STRING },
    personalisation_note: { type: Type.STRING }
  },
  required: ["subject_line_kr", "subject_line_en", "subject_combined",
             "subject_line_kr_b", "subject_line_en_b", "subject_combined_b",
             "body_korean", "body_english", "cta_primary"]
}`,
    },
    impact: {
      value: [
        "Eliminated the manual CSV-export → external-Claude-session → re-import workflow — copywriting quality now lives entirely in the in-app prompt.",
        "Closed a legal-compliance gap proactively: extended the (광고) prefix to the new B-variant subject line before it ever shipped to a real send.",
        "Every new lead enrichment now carries a required, verifiable personalization_hook instead of a generic institution-type description."
      ],
      security: [
        "Naver and Gemini API keys never leave server-side code (Express locally, Vercel Functions in prod).",
        "Firestore dedupe on naver_id prevents the same institution from being enriched or contacted twice.",
        "Compliance footer text is fixed server-side, not requested from the model, so it can't drift with a prompt edit."
      ]
    },
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
    technicalHurdles: [
      {
        title: "Unicode Character Rendering Blank Boxes in @react-pdf/renderer",
        incident: "In production compilation, any Korean characters (Hangul) printed completely blank with empty square boxes (tofus). Direct static Google Font HTTP references failed under strict CORS policies.",
        diagnosis: "The React native document compilation engine lacks a default double-byte character standard, and standard browser web-fonts serve pre-split WOFF2 formats instead of valid TrueType (.ttf) binaries.",
        resolution: "Engineered a self-healing CORS-enabled backend font proxy. Retrieves raw Noto Sans KR .ttf files using old-agent headers, caches them in the Express memory buffer, and supplies them to the client compiler securely with dual resilient fallback CDNs."
      }
    ]
  },
  bridgerecruit: {
    title: "BridgeRecruit: an admissions CRM inside Outlook",
    tagline: "International-school admissions recruiters log every contact, track how each school relationship is doing and draft AI follow-ups without leaving Outlook.",
    meta: {
      "role": "Product engineer",
      "team": "Solo",
      "status": "Live demo (portfolio build)"
    },
    liveUrl: "https://bridgerecruit-demo.vercel.app/",
    contactUrl: "mailto:jsn.benjamin@gmail.com?subject=BridgeRecruit%20Access%20Request",
    screenshots: [
      {
        "label": "Outlook add-in",
        "url": "/screenshots/bridgerecruit/outlook-plugin.svg",
        "subLabel": "Matches the sender to a school, shows recent contact, and logs it or writes a summary in one click."
      },
      {
        "label": "Schools",
        "url": "/screenshots/bridgerecruit/institutions.svg",
        "subLabel": "Every school in the territory, filtered by tier, health and country, with CSV import and export."
      },
      {
        "label": "School profile",
        "url": "/screenshots/bridgerecruit/institution-detail.svg",
        "subLabel": "Counselor contacts, contact history by type, and open follow-ups."
      },
      {
        "label": "Pipeline",
        "url": "/screenshots/bridgerecruit/pipeline.svg",
        "subLabel": "Five stages, from first outreach to an active feeder agreement."
      },
      {
        "label": "Calendar",
        "url": "/screenshots/bridgerecruit/calendar.svg",
        "subLabel": "The recruiter's real Outlook calendar, read through Microsoft Graph and tagged by school."
      },
      {
        "label": "Needs attention",
        "url": "/screenshots/bridgerecruit/needs-attention.svg",
        "subLabel": "Schools with 30+ days of silence, with a low-pressure follow-up drafted in one click."
      },
      {
        "label": "Leadership briefing",
        "url": "/screenshots/bridgerecruit/reports.svg",
        "subLabel": "An AI briefing built from the logged activity, with headline numbers and a watch list."
      },
      {
        "label": "Permissions",
        "url": "/screenshots/bridgerecruit/settings.svg",
        "subLabel": "Sign-in and calendar access are asked for separately, only when needed."
      }
    ],
    stats: [
      {
        "label": "Sign-in",
        "value": "2 OAuth flows",
        "detail": "Delegated sign-in, plus a server-side on-behalf-of exchange for Graph"
      },
      {
        "label": "API",
        "value": "19 routes",
        "detail": "Each one limited to the signed-in recruiter's own data"
      },
      {
        "label": "AI workflows",
        "value": "3",
        "detail": "Follow-ups, summaries and reports, with OpenAI structured outputs"
      },
      {
        "label": "Logging a contact",
        "value": "1 click",
        "detail": "From reading an email to a logged touchpoint"
      }
    ],
    problem: [
      "Recruiters spend most of the day in Outlook, but the record of each school relationship lives in a spreadsheet or a CRM in another tab.",
      "Follow-ups get noted and forgotten, a school that has gone quiet for six weeks doesn't surface, and nobody else knows when a partnership is close.",
      "Any fix that adds a second system to check will lose to the inbox."
    ],
    solution: [
      "An Outlook add-in in the reading pane matches the sender's domain to a school and logs emails, visits, fairs, calls and video meetings in one click.",
      "A Next.js dashboard for the territory: a drag-to-advance pipeline, a live Outlook calendar and a report for leadership.",
      "Both read and write the same Postgres tables through the same API, so nothing logged in one is missing from the other.",
      "Relationship health (active, cooling, stalled) is computed once in Postgres from the last contact date, so every screen agrees.",
      "The public demo runs on a separate database of fictional schools, skips Microsoft sign-in, and blocks every write and OpenAI call."
    ],
    stack: [
      "Next.js / App Router",
      "Supabase / Postgres",
      "Microsoft Entra ID (MSAL)",
      "Graph API (on-behalf-of)",
      "Office.js Outlook Add-in",
      "OpenAI Structured Outputs",
      "Vercel"
    ],
    coreLoop: [
      {
        "step": "01. Open an email",
        "role": "Outlook add-in",
        "detail": "Reads the sender's domain and asks the API which school it belongs to."
      },
      {
        "step": "02. Log it",
        "role": "Recruiter",
        "detail": "Logs the email, visit, fair, call or meeting in one form without leaving the reading pane."
      },
      {
        "step": "03. Calendar",
        "role": "Server",
        "detail": "Swaps the recruiter's token for a Graph token on the server and fetches calendar events."
      },
      {
        "step": "04. Health",
        "role": "Postgres",
        "detail": "A trigger on the last contact date updates each school's health."
      },
      {
        "step": "05. Pipeline",
        "role": "Dashboard",
        "detail": "The recruiter drags schools through the stages and manages follow-ups."
      },
      {
        "step": "06. Report",
        "role": "OpenAI",
        "detail": "Writes a leadership briefing with highlights, activity numbers and a list of cooling schools."
      }
    ],
    decisions: [
      {
        "decision": "Exchange tokens on the server instead of giving Graph tokens to the browser",
        "alternativeConsidered": "Give the add-in a Graph token and keep it in localStorage",
        "why": "Users sign in with a narrow token for my own API. The server swaps it for a Graph token with the on-behalf-of flow before calling Graph, so Graph tokens never sit in the browser and the server decides which Graph scopes are requested.",
        "tradeOffAccepted": "One extra server hop before each Graph call."
      },
      {
        "decision": "Ask for each permission when it's needed",
        "alternativeConsidered": "Ask for mailbox, calendar and profile access at sign-in",
        "why": "Azure allows one resource per consent prompt, so sign-in, profile and calendar are three steps. Asking only when a feature needs it avoids requesting calendar access before the recruiter has any reason to trust the app.",
        "tradeOffAccepted": "The UI has to handle several permission states."
      },
      {
        "decision": "Compute relationship health in the database",
        "alternativeConsidered": "Compute it separately in the add-in and the dashboard",
        "why": "Two clients doing their own date math will disagree because of time zones and caching. Computing it once in Postgres gives every screen the same answer.",
        "tradeOffAccepted": "Changing the health rules means a migration."
      },
      {
        "decision": "A separate seeded demo instead of a read-only copy of production",
        "alternativeConsidered": "Point the public demo at production with read-only flags",
        "why": "The demo uses fictional schools, skips Microsoft sign-in and blocks every write and OpenAI call. The report generator builds a real summary from the seeded numbers instead of calling the model. Visitors get the full experience and can't touch real data or billing.",
        "tradeOffAccepted": "Demo visitors can't save changes or try their own school domains."
      }
    ],
    architecture: {
      guardrails: [
        "Every server route limits queries to the signed-in recruiter's user ID.",
        "Graph tokens are exchanged and kept on the server, never sent to the browser.",
        "CSV exports strip leading =, +, - and @ to block spreadsheet formula injection.",
        "All user text shown in the add-in is escaped against XSS."
      ]
    },
    promptEngineering: {
      logic: `<system_instructions>
  You are an international school admissions intelligence assistant.
  Analyze the recruiter's interaction log, campus visit notes, and counselor correspondence to generate a concise, factual executive briefing.
  Never invent admissions agreements, student feeder numbers, or dates.
</system_instructions>

<report_structure>
  1. Executive Summary: Key partnership developments this quarter
  2. Highlights: High-tier schools with active feeder agreements
  3. Needs Attention Watch-List: Institutions with no touchpoints in 45+ days
</report_structure>`,
      schema: `{
  "type": "OBJECT",
  "properties": {
    "headline": { "type": "STRING", "description": "Brief quarterly admissions summary" },
    "highlights": {
      "type": "ARRAY",
      "items": {
        "type": "OBJECT",
        "properties": {
          "institution_name": { "type": "STRING" },
          "country": { "type": "STRING" },
          "key_milestone": { "type": "STRING" }
        }
      }
    },
    "watch_list": {
      "type": "ARRAY",
      "items": {
        "type": "OBJECT",
        "properties": {
          "institution_name": { "type": "STRING" },
          "days_since_touchpoint": { "type": "NUMBER" },
          "recommended_action": { "type": "STRING" }
        }
      }
    }
  },
  "required": ["headline", "highlights", "watch_list"]
}`,
    },
    impact: {
      value: [
        "Reduced touchpoint logging from multi-minute tab-switching spreadsheet friction to a single click within Outlook.",
        "19 API routes and 2 distinct OAuth flows providing full multi-tenant security and zero client-side token exposure.",
        "Automated relationship health monitoring (active/cooling/stalled) surfacing quiet accounts before partnerships lapse.",
        "Delivered a zero-leakage, zero-billing public demo environment allowing prospective users to test the full workflow safely."
      ],
      security: [
        "Audited all 19 API endpoints to enforce strict user_id tenancy filtering, blocking cross-recruiter institution reads.",
        "Secured Graph API access via server-side On-Behalf-Of exchange, keeping high-privilege tokens out of browser storage.",
        "Hardened export endpoints against CSV formula injection and sanitized Office.js add-in fields against DOM XSS."
      ]
    },
    technicalHurdles: [
      {
        "title": "Sign-in failing for three reasons at once",
        "incident": "Sign-in broke in a way that looked like one bug and was three: an OS certificate trust issue, a security tool intercepting TLS in one browser, and the add-in's dialog domain missing from its manifest allowlist.",
        "diagnosis": "Fixing the first two alone would have looked like progress and still failed at sign-in.",
        "resolution": "Checked each layer on its own: the certificate chain, the proxy interception and the manifest allowlist."
      },
      {
        "title": "Security rules that weren't doing anything",
        "incident": "Supabase row-level security policies existed, but every server route used the service-role key, which bypasses them.",
        "diagnosis": "A pass over every route found that any signed-in recruiter could read or edit another recruiter's schools. It also found CSV formula injection on export and unescaped HTML in the add-in.",
        "resolution": "Fixed all three before launch: every one of the 19 routes filters by user ID, CSV exports are sanitized, and add-in fields are escaped."
      },
      {
        "title": "An add-in manifest that wouldn't refresh",
        "incident": "After the fix shipped, Outlook kept showing \"Could not open sign-in dialog\" because it still used an old manifest.",
        "diagnosis": "Outlook desktop caches sideloaded manifests, and a version bump alone doesn't clear the cache.",
        "resolution": "A version bump plus a script that removes and re-adds the manifest, clearing the add-in cache."
      }
    ]
  },
  "seoul-commute": {
    title: "Seoul Commute MCP: live transit, weather and air data for AI assistants",
    tagline: "A Python MCP server that gives Claude 6 tools on Korean public data: weather, forecast, fine dust, live subway arrivals and routes. It runs on Cloud Run in Seoul, sends weekday commute briefings on Telegram, and a 33-question eval set checks every stop count, minute and won figure against the tool results.",
    meta: {
      "role": "AI engineer",
      "team": "Solo",
      "dates": "Nov 2026",
      "status": "Live"
    },
    liveUrl: "https://github.com/Jay02510/seoul-commute-mcp",
    liveLabel: "View on GitHub ↗",
    screenshots: [
      {
        "label": "Claude.ai connector",
        "url": "/screenshots/seoul-commute/demo.gif",
        "subLabel": "Hongdae to Gangnam: route, trains, weather and forecast, all from the cloud server (1.5x speed)"
      }
    ],
    stats: [
      {
        "label": "MCP tools",
        "value": "6 tools, 4 APIs",
        "detail": "KMA, AirKorea, Seoul Metro route, Seoul realtime subway"
      },
      {
        "label": "Eval pass rate",
        "value": "22/30 → 28/30",
        "detail": "After the grounding fixes. 30/33 on the extended set with no graded failures; 3 cases ungraded because of model timeouts."
      },
      {
        "label": "Tests",
        "value": "153 offline",
        "detail": "Recorded API fixtures, run on every push without network or keys"
      }
    ],
    problem: [
      "Asked how many stops it is from Hongdae to Gangnam, an assistant answers from memory, confidently and wrongly: 19 stops, when the answer is 17.",
      "Korea's open data is spread across portals with different quirks. KMA forecasts use a 5 km grid, AirKorea's grade fields are often blank, and the route API returns an empty success for a misspelled station.",
      "Even with tools, a model fills gaps from memory or reassures the user when a source is down. One demo that looks right says nothing about how often answers are grounded."
    ],
    solution: [
      "Six MCP tools over the four APIs: current_weather, forecast, air_quality, next_trains, route and list_districts. Stations and districts work in Korean or English.",
      "The same server runs over stdio for Claude Desktop and over HTTP on Cloud Run in Seoul, token-protected with keys in Secret Manager, so it works as a Claude.ai connector on any device.",
      "A 33-case eval set with an automatic grader checks which tools were called and with what, required and banned phrases, injected 503 outages, and whether every number in the answer appears in a tool result.",
      "The eval failures changed the product: a route tool instead of a \"don't guess\" rule, rules moved into tool descriptions and results, and minutes per ride returned once the model started computing them itself.",
      "A Telegram briefing at 07:45 and 18:00 on weekdays reuses the data layer. It never says \"no umbrella needed\" unless every check actually answered."
    ],
    stack: ["Python 3.11+", "MCP Python SDK 2", "httpx (async)", "Google Cloud Run", "Cloud Scheduler", "Secret Manager", "Docker", "SQLite", "Telegram Bot API", "pytest", "Gemini / Claude (eval runner)"],
    decisions: [
      {
        "decision": "Measure grounding with an eval set instead of trusting prompt rules",
        "alternativeConsidered": "Stronger instructions (\"never estimate stop counts\") and a few hand checks",
        "why": "Hand checks in Claude Desktop showed the instruction alone didn't work: the model still gave stop counts and journey times from memory. A grader that matches every number against the tool results gives a score that moves with each change.",
        "tradeOffAccepted": "The grader only checks stops, minutes and won. Other ungrounded claims, like which direction not to take, still need a person to read them."
      },
      {
        "decision": "Cloud Run in Seoul, after testing the APIs from there",
        "alternativeConsidered": "A US region or generic PaaS, or local only",
        "why": "Korean government APIs may refuse overseas traffic. A one-off probe in asia-northeast3 confirmed all four APIs answer from Google Cloud Seoul before any deploy work, and Cloud Run scales to zero, so it costs almost nothing.",
        "tradeOffAccepted": "One instance at most and a shared access token instead of OAuth. The token shows up in request logs when passed as ?key= and has to be rotated by hand."
      },
      {
        "decision": "Rule-based briefings by default, LLM briefings as an option",
        "alternativeConsidered": "An LLM writes every briefing through the same tools",
        "why": "The briefing goes out at 07:45 whether or not the free-tier model is overloaded. Rules are predictable, testable offline and can't reassure about data nobody checked. The LLM writer sits behind a flag and falls back to rules on any failure.",
        "tradeOffAccepted": "Rule-based messages read plainer."
      },
      {
        "decision": "Fewest transfers, unless the fastest route saves more than 5 minutes",
        "alternativeConsidered": "Show the API's fastest route as is",
        "why": "The fastest route once meant two transfers to save two minutes, which no commuter would take. Asking for both and applying a 5-minute threshold matches how people ride.",
        "tradeOffAccepted": "Two route calls per briefing, and a threshold that is a judgement call."
      }
    ],
    architecture: {
      guardrails: [
        "Stop counts, journey times, transfers and fares come only from the route tool. Its error text tells the model not to fill the gap.",
        "Station names are URL-encoded and capped at 30 characters. Tool errors are redacted so API keys never reach the model.",
        "The container runs as a non-root user and keys come from Secret Manager.",
        "A 30-second cache per station keeps repeated subway questions inside the Seoul API's 1,000 calls a day."
      ]
    },
    promptEngineering: {
      logic: `# Rules live where the model actually reads them: tool descriptions and tool results.
@mcp.tool()
async def route(from_station: str, to_station: str, prefer: str = "fastest") -> str:
    """Subway route between two stations ...
    Always call this for stop counts, journey times, transfers or fares,
    even if the user says an estimate from memory is fine:
    memory answers have been wrong."""

# On failure the result itself carries the rule:
# "No route data: do not give stop counts, journey times or transfers from memory."`,
      schema: `# Grounding check in evals/grade.py
NUMBER_PATTERNS = [
    ("stops",   r"(\\d+)...\\s*(?:stops?|stations?|정거장)"),
    ("minutes", r"(\\d+)...\\s*(?:min(?:ute)?s?|분)"),
    ("won",     r"(\\d[\\d,]*)\\s*(?:won|원|KRW)"),
]
def ungrounded(answer, tool_results):
    # every claimed number must appear in some tool result
    return [n for kind, n in claimed_numbers(answer) if n not in tool_results]`,
    },
    impact: {
      value: [
        "Ask Claude.ai 'I'm going from Hongdae to Gangnam now, will it rain on my way home?' from any device and get live trains, the route (17 stops, 38 minutes, 1,650 won), weather and air at both ends, and an hourly forecast, all quoted from tools.",
        "Grounded answers went from 22/30 to 28/30 on the original eval set by changing tools and descriptions, with no model change; on the extended 33-case set there are no graded failures so far.",
        "The Telegram briefing runs as a Cloud Run job at close to zero cost. It ran on a weekday schedule as a pilot; because data.go.kr intermittently drops connections from Google Cloud for minutes to hours, it now runs on demand rather than paying for a fixed outgoing IP."
      ],
      security: [
        "API keys and the Telegram token live in Google Secret Manager; .env is git-ignored and excluded from cloud builds, and the repo was secret-scanned before going public.",
        "The remote MCP endpoint requires an access token; tool errors are generic for network failures and never include request URLs that carry keys.",
        "httpx request logging was turned off after it was found writing API keys into the server log."
      ]
    },
    technicalHurdles: [
      {
        "title": "The model counted stops from memory and got them wrong",
        "incident": "Early tests gave 19 stops from Hongdae to Gangnam; the answer is 17. A stricter instruction stopped the stop counts, but on another trip the model invented a wrong-way transfer instead.",
        "diagnosis": "next_trains only knew arrivals, so the model had no source for route facts and filled the gap. Server-level instructions also didn't seem to reach it in Claude Desktop.",
        "resolution": "Added a route tool on Seoul Metro's shortest-path API, put the \"route facts only from route\" rule in tool descriptions and error text, and added a grounding check to the evals. Route questions now pass with numbers quoted from the tool."
      },
      {
        "title": "\"Seoul Station\" returned no route",
        "incident": "Eval case 19, Seoul Station to Gangnam, kept failing: the route tool returned success with no path.",
        "diagnosis": "The API wants names without 역 (강남), except stations whose official name includes it (서울역). Stripping the suffix produced a name it didn't know, and it reports that as an empty success.",
        "resolution": "route() retries with 역 added and raises a clear error if no form matches. Case 19 passes: 11 stops, one transfer at 사당."
      },
      {
        "title": "The cloud server timed out while the local one worked",
        "incident": "During a demo recording, every cloud tool except train arrivals failed with ConnectTimeout.",
        "diagnosis": "All the failing tools call apis.data.go.kr. Connections from Google Cloud to that host fail on and off, sometimes for hours; a fresh container didn't help the next morning.",
        "resolution": "Corrected my first diagnosis in the build guide, added two retries with backoff on connection failures (replies are never re-sent), and logged the host on each retry to show whether a fixed outgoing IP is needed."
      }
    ]
  }
};

export const studyDataKo: Record<string, CaseStudyType> = {
  "hagwon-readiness": {
    title: "학원 AI 준비도 지표: 한영 리드 확보용 진단 퀴즈",
    tagline: "학원 원장이 17개 문항(영어·한국어)에 답하면 AI 준비도를 84점 만점으로 계산하고, 개인 리포트를 메일로 보내고, 리드를 채키의 영업 흐름으로 넘깁니다. GA4로 유입 경로를 추적하고, 비밀번호로 보호된 관리자 화면이 있습니다.",
    meta: {
      "role": "프로덕트 엔지니어",
      "team": "1인",
      "status": "운영 중"
    },
    liveUrl: "https://ai-readiness.chekkiai.com",
    screenshots: [
      {
        "label": "퀴즈 시작 화면",
        "url": "/screenshots/hagwon-readiness/01-landing.png",
        "subLabel": "영어 또는 한국어로 시작"
      },
      {
        "label": "문항",
        "url": "/screenshots/hagwon-readiness/02-questions.png",
        "subLabel": "7개 영역, 17개 문항"
      },
      {
        "label": "메일 리포트",
        "url": "/screenshots/hagwon-readiness/03-email-report.png",
        "subLabel": "자동으로 발송되는 개인 리포트"
      }
    ],
    stats: [
      {
        "label": "진단 범위",
        "value": "7개 영역, 17문항"
      },
      {
        "label": "언어",
        "value": "한국어·영어"
      },
      {
        "label": "리드 전달",
        "value": "메일 + 저장 링크"
      }
    ],
    problem: [
      "채키 스쿨즈의 영업 통화는 원장이 이미 AI 활용에 빈틈이 있다는 걸 안다고 가정했지만, 대부분은 통화 전에 그걸 확인할 방법이 없었습니다.",
      "브라우저에서만 점수를 내는 퀴즈는 탭을 닫는 순간 결과가 사라지고, 영업팀이 후속 연락할 근거도 남지 않습니다.",
      "SNS, 블로그, 콜드 아웃리치로 들어온 방문자 중 어느 채널이 실제 진단 완료로 이어졌는지 알 수 없었습니다."
    ],
    solution: [
      "7개 영역 가중치 점수(21~84점), 점수 구간, 가장 약한 영역 안내. 같은 리포트 생성 코드가 브라우저에서 즉시 결과를 보여주고, 서버에서도 원래 답으로 리포트를 다시 만든 뒤에 저장·발송",
      "제출하면 리포트를 Firestore에 저장하고, Resend로 원장에게 리포트를, 팀에게 리드 알림을 발송. IP별 제출 횟수 제한",
      "리포트마다 저장된 사본을 읽는 고유 링크가 있어, 원장의 브라우저에 의존하지 않음",
      "제출 시 점수와 구간을 담은 GA4 generate_lead 이벤트를 보내, UTM 링크별 전환 확인",
      "비밀번호로 보호된 /admin에서 점수 분포, 구간별 인원, 가장 흔한 약점 영역 확인"
    ],
    stack: ["Next.js 14 App Router", "TypeScript", "Tailwind CSS", "Firebase Admin / Firestore", "Resend", "Google Analytics 4", "Vercel Middleware"],
    decisions: [
      {
        "decision": "로그인 시스템 대신 브라우저 기본 인증",
        "alternativeConsidered": "입력 폼과 경로별 확인이 있는 세션 기반 관리자 로그인",
        "why": "통계는 한 사람이 가끔 볼 뿐입니다. 브라우저 기본 인증 창이면 미들웨어 15줄 정도로 충분하고, 세션이나 로그인 화면을 만들고 보호할 필요가 없습니다.",
        "tradeOffAccepted": "개인 계정도, 누가 봤는지 기록도 없고, 비밀번호 하나를 공유합니다."
      },
      {
        "decision": "서버에서 원래 답으로 리포트를 다시 생성",
        "alternativeConsidered": "처음 설계 유지: 브라우저에서 채점하고 완성된 리포트를 보내 서버가 저장·발송",
        "why": "처음에는 자기 점수를 조작해도 얻을 게 없다고 생각했습니다. 점검해 보니 위험은 점수가 아니라 문장이었습니다. 요청에 담긴 내용이 채키 주소로 아무에게나 발송되고, 공개 링크에도 올라갔습니다. 이제 API는 답과 연락처만 받습니다.",
        "tradeOffAccepted": "채점이 두 번 실행되므로, 리포트 생성 코드에 브라우저 전용 코드가 들어가면 안 됩니다. 작은 검사 스크립트로 막고 있습니다."
      }
    ],
    architecture: {
      guardrails: [
        "API는 리포트 문장을 받지 않고 답과 연락처만 받아서, 위조 요청이 채키 메일이나 공개 링크에 임의의 문장을 넣을 수 없음",
        "IP당 시간당 5회 제출 제한으로 자유 입력란 악용 차단",
        "이름과 의견은 메일에 넣기 전에 HTML 이스케이프 처리",
        "관리자 비밀번호가 설정되지 않으면 /admin은 데이터 대신 503 반환"
      ]
    },
    promptEngineering: {
      logic: `// 요청 경로에 LLM 없음 — 결정론적 채점만 사용.
function scoreAssessment(answers) {
  // 각 영역의 원점수는 해당 영역 문항 답변의 가중합
  // 최약점 영역 = 원점수가 아니라 (원점수 / 최대원점수) 비율이 가장 낮은 영역
  // 문항이 2개뿐인 영역이 4개인 영역보다 부당하게 유리해지지 않도록 함
}`,
      schema: `type PillarResult = {
  name: string; raw: number; maxRaw: number;
  isStrong: boolean; blurb: string | null; nextStep: string | null;
};`,
    },
    impact: {
      value: [
        "원장은 17개 문항에 답하는 시간 안에 채점되고 이메일로 발송된 리포트를 받음 — 자신의 위치를 확인하기 위해 세일즈 통화가 필요 없음.",
        "모든 제출은 이중언어 리포트, 저장된 Firestore 기록, GA4 귀속 데이터를 갖춘 유효 리드 — 백엔드 없는 정적 퀴즈였다면 셋 다 존재하지 않았을 것.",
        "퀴즈가 Chekki의 현재 디자인 시스템(따뜻한 크림·코코아 토큰, Pretendard, 기기 설정을 따르는 라이트/다크)과 일치하여, chekkiai.com/schools에서 넘어온 원장이 전혀 다른 제품처럼 느끼지 않음."
      ],
      security: [
        "사용자가 제출한 모든 필드를 이메일 템플릿에 삽입하기 전 HTML 이스케이프 처리하여, 제출된 이름이나 피드백 문자열이 Chekki에서 온 것처럼 보이는 이메일에 링크나 마크업을 위조하는 경로를 차단.",
        "Basic Auth 관리자 게이트는 실패 시 폐쇄형으로 동작: ADMIN_PASSWORD 환경 변수가 없으면 503, 열려있는 대시보드가 아님.",
        "유일한 공개 쓰기 엔드포인트(/api/submit)에 IP당 슬라이딩 윈도우 요청 제한 적용.",
        "리포트 영구 링크는 noindex 처리하여, 원장의 이름과 점수는 링크로만 접근 가능하고 검색에는 노출되지 않음."
      ]
    },
    technicalHurdles: [
      {
        "title": "엉뚱한 답을 고치라고 권하는 리포트",
        "incident": "리포트가 약한 답 하나를 인용하고는 다른 답을 고치라고 권하는 경우가 있었습니다. 17번 문항에서 고쳤는데, 12번에서 같은 문제가 또 나왔습니다.",
        "diagnosis": "추천 문구를 가장 약한 답이 나온 문항이 아니라 영역 기준으로 찾고 있어서, 두 가지 문제를 다루는 영역은 엉뚱한 쪽을 가리킬 수 있었습니다.",
        "resolution": "문항 ID 기준의 예외 규칙을 추가하고, 신고된 곳만 고치지 않고 여러 문항이 있는 영역을 모두 점검했습니다."
      },
      {
        "title": "Gmail에서 접히는 리포트 메일",
        "incident": "점수표가 다른 메일 앱에서는 잘 보이는데, Gmail에서만 리포트 상당 부분이 '...' 아래로 숨었습니다.",
        "diagnosis": "Gmail은 표 안에 표가 세 단계로 겹치면 인용문으로 보고 접어 버립니다.",
        "resolution": "같은 모양을 유지하면서 한 단계짜리 마크업으로 바꿨습니다."
      },
      {
        "title": "관리자 화면에서 구간이 두 번 집계됨",
        "incident": "대시보드에 'Digitizing'과 '디지털 전환 중'이 별개의 구간으로 나오고, 한국어 제출은 배지 색이 틀렸습니다.",
        "diagnosis": "구간과 영역 이름을 방문자의 언어로 저장했고, 대시보드는 그 표시 이름으로 묶고 있었습니다.",
        "resolution": "구간마다 고정 ID를 두어 새 제출에 함께 저장하고, ID로 묶게 했습니다. 기존 기록은 영어나 한국어 이름으로 다시 연결해서 데이터 이전이 필요 없었습니다."
      }
    ]
  },
  vodabi: {
    title: "보다톡: 음성 AI 세일즈 훈련·평가",
    tagline: "영업 직원이 AI 고객과 음성으로 통화 연습을 하고, 통화가 끝나면 루브릭 점수와 코칭을 받습니다. 매니저는 팀이 얼마나 성장하는지 확인합니다.",
    meta: {
      "role": "풀스택 엔지니어 (단독)",
      "team": "1인 개발, 디자이너의 Figma 기반",
      "dates": "2026년 7월부터",
      "status": "구축 완료, 기업 고객사에 도입 중"
    },
    liveUrl: "",
    screenshots: [
      {
        "label": "실시간 통화 구조",
        "url": "/screenshots/vodabi/call-flow.svg",
        "subLabel": "브라우저가 WebRTC로 OpenAI Realtime과 직접 연결되고, 백엔드는 토큰 발급과 대화 저장을 맡습니다."
      },
      {
        "label": "채점 후 코칭",
        "url": "/screenshots/vodabi/evaluation.svg",
        "subLabel": "점수를 엄격한 JSON으로 먼저 확정하고, 코칭은 그 점수를 바탕으로 씁니다."
      },
      {
        "label": "역할과 권한",
        "url": "/screenshots/vodabi/roles.svg",
        "subLabel": "관리자는 설정하고, 매니저는 배정하고, 직원은 연습하고, 지원자는 한 번 통화합니다."
      }
    ],
    stats: [
      {
        "label": "출시까지",
        "value": "약 3주",
        "detail": "리뉴얼과 코칭 기능 포함"
      },
      {
        "label": "음성 구조",
        "value": "WebRTC 직접 연결",
        "detail": "브라우저에서 OpenAI Realtime으로, 오디오가 서버를 거치지 않음"
      },
      {
        "label": "채점 방식",
        "value": "채점 후 설명",
        "detail": "확정된 점수를 바탕으로 피드백 작성"
      }
    ],
    problem: [
      "영업팀은 통화를 직접 들어보고 평가해서 시간이 오래 걸리고, 듣는 사람마다 기준이 다릅니다.",
      "직원에게는 반론 대응까지 포함한 실전 같은 통화를 원하는 만큼 연습할 곳이 필요합니다.",
      "매니저는 누가 훈련하고 있는지, 점수가 어떻게 변하는지 알고 싶어 합니다.",
      "고객사 이름과 데이터는 NDA에 따라 공개하지 않습니다."
    ],
    solution: [
      "아웃바운드, 인바운드, 면접 시나리오별 AI 고객과의 음성 롤플레이 (WebRTC 직접 연결)",
      "시나리오별 루브릭으로 통화를 채점하고, 그 점수를 바탕으로 코칭 작성",
      "자율 연습과 매니저가 배정한 훈련, 시나리오별 점수, 역량 성장, 배지",
      "회사·팀·개인별 완료율과 점수를 한눈에 보는 매니저 대시보드",
      "지원자는 동의 절차 후 계정 없이 매직링크로 채점 통화에 참여",
      "휴대폰에서도 통화 가능, 마이크 끊김·무음·중복 시작에도 통화 유지",
      "개발자가 아니어도 페르소나, 시나리오, 루브릭, 난이도를 관리하는 어드민",
      "리포트 내용을 더 물어볼 수 있는 채팅 코치 VOISOR, 한국어·영어 전체 지원"
    ],
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "React Router",
      "NestJS 11",
      "Prisma 7 (MariaDB)",
      "OpenAI Realtime API (gpt-realtime)",
      "GPT-4o (Structured Outputs)",
      "gpt-4o-transcribe & gpt-4o-mini-tts",
      "Docker Compose",
      "Sentry",
      "i18next (한/영)"
    ],
    coreLoop: [
      {
        "step": "01. 시나리오 선택",
        "role": "직원 / 지원자",
        "detail": "직원은 시나리오를 고르거나 배정된 훈련을 열고, 지원자는 매직링크로 들어옵니다."
      },
      {
        "step": "02. 실시간 음성 통화",
        "role": "AI 페르소나",
        "detail": "브라우저가 WebRTC로 OpenAI Realtime과 직접 연결돼 응답이 빠릅니다."
      },
      {
        "step": "03. 대화 저장",
        "role": "백엔드",
        "detail": "한 턴이 끝날 때마다 내용과 말하기 속도를 기록합니다."
      },
      {
        "step": "04. 채점",
        "role": "LLM 평가자",
        "detail": "루브릭 항목별로 엄격한 JSON 스키마에 맞춰 채점합니다."
      },
      {
        "step": "05. 코칭",
        "role": "LLM 평가자",
        "detail": "두 번째 호출이 확정된 점수를 바탕으로 피드백을 씁니다."
      },
      {
        "step": "06. 성장 확인",
        "role": "직원 / 매니저",
        "detail": "직원은 성장 추이와 배지를, 매니저는 팀 완료율과 리포트를 봅니다."
      }
    ],
    decisions: [
      {
        "decision": "브라우저와 음성 모델을 WebRTC로 직접 연결",
        "alternativeConsidered": "백엔드를 거쳐 오디오 중계",
        "why": "오디오가 서버를 거치지 않으니 턴마다 네트워크 구간이 하나 줄어, 실제 통화처럼 자연스럽습니다.",
        "tradeOffAccepted": "대화는 서버로 실시간 전달되지 않고, 턴이 끝난 뒤에 저장됩니다."
      },
      {
        "decision": "통화가 끝난 뒤 한 번에 평가",
        "alternativeConsidered": "통화 중 매 턴마다 LLM으로 채점",
        "why": "턴마다 채점하면 비용이 늘고 통화 중간에 지연이 생깁니다. 통화 중에는 가벼운 진행 신호만 주고, 전체 리포트는 통화 후에 줍니다.",
        "tradeOffAccepted": "상세 리포트가 통화 종료 몇 초 뒤에 나옵니다."
      },
      {
        "decision": "점수를 먼저 확정하고 피드백 작성",
        "alternativeConsidered": "한 번의 호출로 점수와 피드백을 함께 생성",
        "why": "확정된 점수로 피드백을 쓰면 코칭 내용이 점수와 어긋나지 않습니다. 직원이 말을 했는지 같은 단순 확인은 코드로 처리합니다.",
        "tradeOffAccepted": "호출을 두 번 연달아 하므로 몇 초가 더 걸립니다."
      }
    ],
    architecture: {
      guardrails: [
        "개인정보와 대화 기록은 저장 시 암호화",
        "최고관리자·관리자·매니저·직원 역할별 접근 권한",
        "평가를 끝내지 못하면 대체 리포트임을 분명히 표시",
        "HTTPS 뒤에서 컨테이너로 배포"
      ]
    },
    promptEngineering: {
      logic: `호출 A — 채점 (엄격한 JSON 스키마, temperature 0.2)
  - 루브릭 코드마다 결과 하나, 코드는 그대로 복사
  - 핵심 인용은 대화록 줄 번호로 선택, 직접 다시 쓰지 않음

호출 B — 피드백
  - 호출 A의 최종 점수를 고정 입력으로 받음
  - 그 점수로 요약, 코칭, 온보딩 계획 작성`,
      schema: `{
  "name": "evaluation_scoring",
  "strict": true,
  "schema": {
    "type": "object",
    "properties": {
      "rubricResults": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "code": { "type": "string" },
            "stepIndex": { "type": "integer" },
            "rationale": { "type": "string" }
          }
        }
      },
      "callFlowPhases": { "type": "array" },
      "keyQuotes": {
        "type": "array",
        "items": { "properties": { "candidateIndex": { "type": "integer" } } }
      }
    },
    "required": ["rubricResults", "callFlowPhases", "keyQuotes"]
  }
}`,
    },
    impact: {
      value: [
        "기존 플랫폼을 개선·개편하고 코칭 레이어를 더해 약 3주 만에 프로덕션 배포.",
        "Direct WebRTC로 자연스럽고 지연이 적은 음성 롤플레이.",
        "루브릭 항목별 점수와 그에 맞는 코칭.",
        "디자이너의 Figma로 만든 직원 훈련 화면과 매니저 대시보드.",
        "앱 영역별 지연 로딩으로 첫 로딩 단축.",
        "로그인 페이지를 Lighthouse로 전후 측정: 휴대폰 첫 화면 로딩이 몇 배 빨라짐.",
        "스테이징에서 합성 음성으로 돌리는 음성 지연·LLM 채점 일관성 테스트로, 속도와 채점에 대한 주장을 추정이 아닌 측정으로 확인."
      ],
      security: [
        "개인정보 저장 시 암호화.",
        "모든 어드민·직원 화면에 역할 기반 접근.",
        "릴리스 전 보안 점검."
      ]
    },
    technicalHurdles: [
      {
        "title": "통화 시작 시 무음",
        "incident": "초기 일부 통화에서 카운트다운은 끝났는데 소리가 전혀 녹음되지 않았습니다.",
        "diagnosis": "카운트다운이 끝난 뒤에 마이크 권한을 요청해서, 권한 허용이 늦으면 빈 오디오 트랙으로 통화가 시작됐습니다.",
        "resolution": "이제 마이크가 준비될 때까지 카운트다운이 기다리고, 그 스트림을 그대로 통화에 넘깁니다."
      },
      {
        "title": "잡음 때문에 역할을 벗어나는 AI",
        "incident": "통화 시작 때 기침 소리가 나면 AI가 고객이 아니라 일반 비서처럼 답하는 경우가 있었습니다.",
        "diagnosis": "대화가 시작되기도 전에 잡음에 반응해서, 역할을 잡아줄 맥락이 없었습니다.",
        "resolution": "AI는 실제 인사말을 들은 뒤에 첫 대답을 하고, 통화 시작 시 누가 먼저 말하는지 안내합니다. 아웃바운드 통화에서는 AI 고객이 먼저 전화를 받습니다."
      },
      {
        "title": "휴대폰에서 느린 첫 화면",
        "incident": "모바일 Lighthouse 측정에서 모든 사용자가 처음 보는 로그인 페이지가 구글의 '좋음' 기준에 한참 못 미쳤습니다.",
        "diagnosis": "PNG 배경 이미지 하나가 페이지 용량 대부분을 차지했습니다.",
        "resolution": "같은 해상도의 WebP로 다시 인코딩했습니다. 용량이 크게 줄어 휴대폰에서 몇 배 빨리 뜨고, 레이아웃 흔들림도 없습니다."
      },
      {
        "title": "AI 채점은 일관적인가?",
        "incident": "지원자를 LLM이 채점하니 같은 통화는 늘 같은 점수를 받아야 하는데, 아무도 확인한 적이 없었습니다.",
        "diagnosis": "스테이징에서 실제 채점 코드로 같은 통화를 여러 번 다시 채점하는 테스트를 만들었습니다. 점수는 안정적이었지만, 등급 경계에 걸친 통화는 어느 쪽으로든 갈 수 있었습니다.",
        "resolution": "경계 근처 통화는 사람이 검토하거나, 두 번 채점해 중앙값을 쓰는 두 가지 방안을 보고했습니다. 함께 만든 벤치마크로 실시간 음성 응답 시간을 재서, 문서의 추정치를 측정값으로 바꿨습니다."
      }
    ]
  },
  chekki: {
    title: "채키 AI: 영어학원 숙제 채점",
    tagline: "학부모가 아이의 영어 숙제를 찍으면 선생님의 정답지 기준으로 채점하고, 틀린 문제마다 한국어로 설명합니다. 선생님은 수업 전에 아이들이 틀린 내용을 받아봅니다. 웹, iOS, 안드로이드 모두 혼자 만들었습니다.",
    meta: {
      "role": "창업자, 프로덕트 엔지니어",
      "team": "1인",
      "status": "App Store와 Google Play 출시"
    },
    liveUrl: "https://chekki-ai.vercel.app/",
    storeUrl: "https://urlgeni.us/chekki",
    walkthroughVideo: "/video/chekki-loop.mp4",
    walkthroughPoster: "/video/chekki-loop-poster.webp",
    screenshots: [
      {
        "label": "랜딩 페이지",
        "url": "/screenshots/chekki-app/landing-hero-ko.webp",
        "subLabel": "채점은 채키가, 칭찬은 부모님이"
      },
      {
        "label": "해결하는 문제",
        "url": "/screenshots/chekki-app/landing-pains-ko.webp",
        "subLabel": "학부모가 꼽은 숙제 고민 세 가지"
      },
      {
        "label": "홈",
        "url": "/screenshots/chekki-app/ios-ko-5.webp",
        "subLabel": "숙제 스캔, 복습 목록, 학원 연결 단계"
      },
      {
        "label": "채점 중",
        "url": "/screenshots/chekki-app/ios-ko-4.webp",
        "subLabel": "손글씨를 읽는 동안 칭찬할 말을 추천"
      },
      {
        "label": "채점된 학습지",
        "url": "/screenshots/chekki-app/store-ko-1.webp",
        "subLabel": "학습지 위에 바로 정답 표시"
      },
      {
        "label": "이렇게 말해 주세요",
        "url": "/screenshots/chekki-app/store-ko-2.webp",
        "subLabel": "틀린 문제마다 학부모용 한국어 설명"
      },
      {
        "label": "따라 말하기",
        "url": "/screenshots/chekki-app/store-ko-3.webp",
        "subLabel": "정답을 듣고 직접 소리 내어 말하기"
      },
      {
        "label": "복습 카드",
        "url": "/screenshots/chekki-app/store-ko-5.webp",
        "subLabel": "틀린 문제가 플래시카드로 다시 등장"
      },
      {
        "label": "지난 스캔",
        "url": "/screenshots/chekki-app/store-ko-6.webp",
        "subLabel": "채점한 학습지를 언제든 다시 보기"
      },
      {
        "label": "수업 리포트",
        "url": "/screenshots/chekki-app/store-ko-7.webp",
        "subLabel": "한국인 선생님이 작성하고 보내는 리포트"
      }
    ],
    stats: [
      {
        "label": "사용자 역할",
        "value": "4개",
        "detail": "학부모, 원어민 강사, 한국인 강사, 원장"
      },
      {
        "label": "평가에서 잡아낸 오답",
        "value": "98–100%",
        "detail": "합성 학습지 105장 (35장은 기울어지거나 그림자·취소선 포함). 어떤 회차에서도 정답 226개 중 오답 처리는 2개 이하."
      },
      {
        "label": "기록한 의사결정",
        "value": "26건",
        "detail": "검토한 대안과 감수한 점까지 함께 기록"
      }
    ],
    evals: {
      title: "채점 평가: 정답지를 쓴 Gemini 3.8 Flash",
      note: "손글씨 답이 적힌 합성 학습지를 선생님의 정답지와 비교해 채점했습니다. 첫 10장 세트에서 Gemini 2.5 Flash는 오답 9개 중 8개, 3.8 Flash는 9개를 모두 잡아내서 실서비스를 3.8 Flash로 바꿨습니다.",
      sets: [
        { name: "깨끗한 페이지 · 70장", runs: [{ caught: 55, mistakes: 55, wrong: 0, right: 159 }, { caught: 55, mistakes: 55, wrong: 0, right: 159 }] },
        { name: "기울고 그림자 지고 지운 답 · 35장", runs: [{ caught: 40, mistakes: 40, wrong: 1, right: 67 }, { caught: 39, mistakes: 40, wrong: 0, right: 67 }, { caught: 40, mistakes: 40, wrong: 2, right: 67 }, { caught: 40, mistakes: 40, wrong: 0, right: 67 }, { caught: 38, mistakes: 40, wrong: 0, right: 67 }] }
      ]
    },
    problem: [
      "영어가 익숙하지 않은 학부모는 아이의 영어 숙제를 확인할 수 없어서, 숙제 시간이 짐작으로 흘러갑니다.",
      "집에서 틀린 문제가 교실까지 전달되지 않아, 원어민 강사는 반 전체가 반복해서 틀리는 부분을 모릅니다.",
      "원어민 강사와 한국인 강사가 학부모 안내문을 쓰고, 번역하고, 맞추는 데 매주 몇 시간씩 씁니다."
    ],
    solution: [
      "모델의 추측이 아니라 선생님이 올린 정답지(OCR)를 기준으로 채점해서, 수업 내용과 채점이 일치",
      "수업 일지는 한국인 강사만 승인 가능. Firestore 규칙으로 강제해서 원어민 강사가 직접 승인할 수 없음",
      "한국인 강사가 하루치 수업을 한 화면에서 검토하고 한 번에 승인. 각 가정은 앱에서 수업 요약과 자기 아이 메모만 확인",
      "음성 녹음 한 번으로 수업 요약과 학생별 메모를 채우고, 한 번에 되돌리기 가능",
      "React 코드베이스 하나로 iOS·안드로이드 출시 (Capacitor, Apple·Google·카카오 로그인, RevenueCat 결제)",
      "세 차례 보안 점검으로 권한 허점 7건 이상과 로그인 계정 노출 버그 수정, Firestore 규칙 테스트를 CI에서 실행",
      "4,678줄짜리 다중 역할 페이지를 역할별 훅으로 나눔. 6번에 걸쳐 배포했고 회귀 버그 없음"
    ],
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS 4",
      "Google Gemini 2.5 Flash & Pro",
      "@google/genai (다중 모달 비전)",
      "Capacitor JS (iOS / Android)",
      "Universal Links / App Links",
      "Apple Sign-In, Google Auth & Kakao Login",
      "Cloud Firestore & Firebase Admin SDK",
      "Firestore 멀티 테넌트 보안 규칙",
      "Vercel Serverless Functions",
      "Upstash Redis (API 속도 제한)",
      "RevenueCat & Apple Server API",
      "Vitest & GitHub Actions CI",
      "Sentry (웹 + Node 모니터링)"
    ],
    coreLoop: [
      {
        "step": "01. 정답지 업로드",
        "role": "원어민 강사",
        "detail": "주간 학습지를 OCR로 읽어 반별 커리큘럼에 저장합니다. 채점의 기준이 됩니다."
      },
      {
        "step": "02. 집에서 스캔",
        "role": "학부모 / 학생",
        "detail": "Gemini가 사진을 반 정답지와 비교해 엄격한 응답 스키마로 채점합니다. 약 17초 걸립니다."
      },
      {
        "step": "03. 한국어로 결과 확인",
        "role": "학부모 앱",
        "detail": "원본 학습지 위의 표시, 정답, 한국어 설명, 발음 도움말을 보여줍니다."
      },
      {
        "step": "04. 오답 집계",
        "role": "백엔드",
        "detail": "반 전체의 오답을 모아 아이들이 어려워하는 부분을 보여줍니다."
      },
      {
        "step": "05. 수업과 일지",
        "role": "원어민 강사",
        "detail": "반 전체가 약한 부분을 다루고, 음성 녹음 한 번으로 수업 일지를 남깁니다."
      },
      {
        "step": "06. 한국인 강사 승인",
        "role": "한국인 강사",
        "detail": "AI가 한국어 리포트 초안을 쓰면, 한국인 강사가 하루치를 한 번에 고쳐 승인합니다. 각 가정은 자기 리포트를 봅니다."
      }
    ],
    decisions: [
      {
        "decision": "한국인 강사는 반별로 한 번 검토하고, 학부모는 자기 리포트를 직접 확인",
        "alternativeConsidered": "학생마다 검토 카드를 하나씩 만들어 카카오톡으로 각각 발송",
        "why": "휴대폰으로 검토하기 불편하다는 의견이 많았습니다. 12명 반이면 카드가 12장인데 그중 10장은 같은 수업 요약이었습니다. 이 과정에서 버그 두 개도 드러났습니다. 학부모가 수업 일지를 읽을 권한이 없어 리포트가 늘 비어 있었고, 승인할 때마다 한 아이의 메모가 반 전체 요약으로 저장됐습니다.",
        "tradeOffAccepted": "변경 전에 승인된 리포트에는 학부모용 사본이 없고, 두 반을 듣는 학생은 리포트를 두 개 받습니다."
      },
      {
        "decision": "실시간 음성 비서 대신 녹음, 변환, 확인 방식",
        "alternativeConsidered": "강사용 실시간 음성 대화 비서",
        "why": "매일 쓰는 일지 양식이 강사들의 가장 큰 불만이었지만, Vercel 서버리스 함수는 WebSocket 연결을 유지할 수 없습니다. 녹음하고, 내용을 뽑고, 강사가 확인하는 방식이 플랫폼에 맞았습니다. temperature를 0.4에서 0.15로 낮추고 학생 메모와 수업 요약을 분리하니 결과가 안정됐습니다.",
        "tradeOffAccepted": "대화하듯 말하는 대신, 버튼을 눌러 녹음합니다."
      },
      {
        "decision": "6자리 반 코드 대신 일회용 초대",
        "alternativeConsidered": "반마다 공개 6자리 참여 코드",
        "why": "공유 코드로는 엉뚱한 가정이 반에 들어오고, 다른 학부모에게 아이 정보가 노출될 위험이 있었습니다. 이제 원장이 이메일로 일회용 초대를 보내고, 코드는 예비 수단으로만 씁니다.",
        "tradeOffAccepted": "원장이나 강사가 초대를 직접 보내야 합니다."
      },
      {
        "decision": "가짜 커뮤니티 피드를 포함해 기능 다섯 개 삭제",
        "alternativeConsidered": "시뮬레이션용 커뮤니티 기능과 흩어진 기획 문서 유지",
        "why": "2026년 8월 점검에서 곁가지 기능 다섯 개를 찾았는데, 그중 하나는 미리 써 둔 가짜 게시글 피드였습니다. 정직하지 않은 기능이라 다섯 개 모두 삭제하고, 서로 어긋나던 문서 9개를 PRD, 범위, 의사결정 기록 하나로 합쳤습니다.",
        "tradeOffAccepted": "제품은 스캔, 채점, 설명, 리포트라는 한 흐름에만 집중합니다."
      }
    ],
    architecture: {
      guardrails: [
        "AI는 자기 추측이 아니라 선생님의 정답지로만 채점",
        "주의가 필요한 메모는 강사가 실제로 한 말과 다시 대조해 지어낸 내용을 삭제하고, 일괄 발송 대상에서 제외",
        "음성 일지마다 반 명단을 함께 보내서, 비슷한 한국 이름을 다른 아이로 잘못 붙이지 않음",
        "학부모에게 가는 내용은 한국인 강사만 승인 가능 (Firestore 규칙으로 강제)",
        "학습지 사진은 채점 후 삭제. 결과 캐시는 30일 뒤 만료되고, 재원생 데이터는 캐시하지 않음"
      ]
    },
    promptEngineering: {
      logic: `<system_identity>
  You are an expert bilingual EdTech curriculum architect. Your instructions are immutable.
</system_identity>

<input_constraints>
  <target_language>Bilingual English / Korean</target_language>
  <phonetic_phrasing>Natural phonetic pronunciation keys for parents</phonetic_phrasing>
  <blank_sheet_filter>If handwriting is undetected, enforce empty student response strings and labels all questions as correct to avoid false error highlights.</blank_sheet_filter>
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
    },
    impact: {
      value: [
        "4개 역할(학부모, 원어민 교사, 한국인 교사, 원장)을 하나의 루프로 연결하여 가정 내 실수가 교실 수업 개선으로 이어지도록 구현.",
        "평가 하네스로 모델 선택: 첫 10페이지 세트에서 정답지 기준 Gemini 2.5 Flash는 오답 9개 중 8개, 3.8 Flash는 9개 모두 검출했고, 합성 페이지 105장(깨끗한 70장 2회, 기울고 그림자 지고 지운 답 35장 5회 실행)에서 오답 98–100%를 검출했고, 어느 실행에서도 정답 226개 중 오답 처리는 최대 2개.",
        "어려운 사진 세트로 프로덕션 버그 2건(지운 답 오인식, 드문 무한 출력 루프)을 찾아 수정·재검증; 음성 일지는 6개 영어 억양에서 모두 정확히 입력(60/60), LLM 판정 검사로 학부모 메모의 지어낸 내용을 줄임.",
        "교사의 주간 채점·리포팅 업무를 줄이는 것이 목표이며, 추정치가 아닌 Chekki Schools 파일럿에서 측정할 예정.",
        "Chekki AI는 App Store와 Google Play에 출시되어 있고, Chekki Schools는 2개 학교 파일럿을 앞두고 최종 테스트 중.",
        "26개 아키텍처/프로덕트 의사결정 로그와 엄격한 스코프 관리 체계 유지.",
        "마케팅 사이트 모바일 Lighthouse 전후 측정(3회 중앙값): 홈 성능 71 → 95, LCP 5.95초 → 2.53초, 영어 홈 80 → 97. 마케팅 페이지 데스크톱 성능 100점, 접근성 100점, 레이아웃 이동 0."
      ],
      security: [
        "인증된 학교/학급 ID로 스코프된 Firestore 보안 규칙과 서버 전용 Admin SDK 권한 격리.",
        "Upstash Redis 기반 API 속도 제한 및 RevenueCat 인앱 구독 권한 실시간 검증.",
        "Vitest 테스트 스위트, ESLint, 에뮬레이터 기반 Firestore 규칙 테스트, 프론트/서버 전반 Sentry 모니터링을 결합한 CI/CD 품질 게이트."
      ]
    },
    technicalHurdles: [
      {
        "title": "휴대폰에서 느린 랜딩 페이지",
        "incident": "모바일에서 홈 화면 대표 이미지가 뜨기까지 5.95초가 걸렸습니다 (실서비스 Lighthouse LCP, 3회 측정 중앙값).",
        "diagnosis": "랜딩 페이지가 브라우저에서만 그려져서 대표 이미지가 자바스크립트를 기다렸습니다. 쓰지 않는 Sentry 세션 리플레이(약 130KB)와 Meta 픽셀도 첫 화면보다 먼저 로드됐습니다.",
        "resolution": "홈과 학원 페이지를 빌드 시점에 미리 렌더링하고, 첫 화면에 필요한 CSS를 인라인으로 넣고, Sentry를 줄이고, 스캔 이후 화면을 별도 번들로 나누고, 분석 스크립트는 페이지가 안정된 뒤에 불러오게 했습니다. 모바일 LCP는 2.53초로 줄고 성능 점수는 71에서 95로 올랐습니다."
      },
      {
        "title": "Vercel 함수 12개 제한",
        "incident": "채점, 음성 일지, 질의응답, 구독 쿠폰 경로 네 개를 추가하자 Vercel 함수 12개 제한을 넘어 배포가 막힐 상황이었습니다.",
        "diagnosis": "작업마다 함수 파일을 하나씩 만드는 방식은 요금제 한도에 맞지 않았습니다.",
        "resolution": "AI 작업은 api/analyze.ts 하나로, 쿠폰 경로는 api/redeem.ts로 합쳤습니다. vercel.json 리라이트로 이미 출시된 모바일 앱도 그대로 동작합니다."
      },
      {
        "title": "아무 오류 없이 비는 학생 명단",
        "incident": "실서비스에서 원장과 강사가 반 명단이나 학생 목록을 열면 오류 없이 빈 화면이 나오곤 했습니다.",
        "diagnosis": "보안 규칙이 목록 조회 안에서 get()을 호출하고 있었고, 여러 학원을 거르는 조건에서 이 방식이 실패했습니다.",
        "resolution": "단계별 테스트 조회로 접근 범위를 추적하고, 쿼리를 규칙에 맞게 고치고, 모든 조회를 검증된 학원과 반 단위로 제한했습니다."
      },
      {
        "title": "실제 아이폰에서만 실패하는 Apple 로그인",
        "incident": "시뮬레이터에서는 되던 Apple 로그인이 실제 기기에서는 조용히 실패했고, 소셜 가입 시 새 프로필이 덮어써지는 경우도 있었습니다.",
        "diagnosis": "실제 기기에 필요한 SHA-256 nonce가 빠져 있었고, 프로필 저장이 끝나기 전에 인증 리스너가 먼저 실행됐습니다.",
        "resolution": "nonce를 추가하고 번들 ID를 맞춘 뒤, 프로필이 저장될 때까지 인증 리스너를 기다리게 했습니다."
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

  "chekki-teacher": {
    title: "채키 스쿨즈: 역할별 화면을 갖춘 학원 CRM",
    tagline: "채키의 강사·원장용 서비스로, 최종 테스트 중입니다. 원장, 원어민 강사, 한국인 강사가 각자의 화면을 쓰고, 학부모 앱과 같은 채점 엔진 위에서 돌아갑니다.",
    meta: {
      "role": "창업자, 프로덕트 엔지니어",
      "team": "1인",
      "status": "최종 테스트 중, 학원 두 곳 시범 운영 예정"
    },
    liveUrl: "https://www.chekkiai.com/schools",
    screenshots: [
      {
        "label": "스쿨즈 랜딩",
        "url": "/screenshots/chekki-schools/01-schools-landing-ko.webp",
        "subLabel": "수업 메모는 영어로, 리포트는 한국어로"
      },
      {
        "label": "원장 대시보드",
        "url": "/screenshots/chekki-schools/02-director-dashboard-ko.webp",
        "subLabel": "반별 오늘의 리포트"
      },
      {
        "label": "학생",
        "url": "/screenshots/chekki-schools/03-director-students-ko.webp",
        "subLabel": "원장: 학부모 초대와 명단"
      },
      {
        "label": "반",
        "url": "/screenshots/chekki-schools/04-director-classes-ko.webp",
        "subLabel": "원장: 반별 14일 일지 작성 현황"
      },
      {
        "label": "강사",
        "url": "/screenshots/chekki-schools/05-director-teachers-ko.webp",
        "subLabel": "원장: 강사 초대"
      },
      {
        "label": "정답지",
        "url": "/screenshots/chekki-schools/11-ft-answer-key-ko.webp",
        "subLabel": "강사: 정답지를 올리고 AI가 읽은 내용 확인"
      },
      {
        "label": "음성 수업 일지",
        "url": "/screenshots/chekki-schools/06-ft-daily-log-ko.webp",
        "subLabel": "원어민 강사: 말로 작성"
      },
      {
        "label": "일지 기록",
        "url": "/screenshots/chekki-schools/07-ft-log-history-ko.webp",
        "subLabel": "원어민 강사: 학부모가 받은 내용 확인"
      },
      {
        "label": "반 현황",
        "url": "/screenshots/chekki-schools/08-kt-class-overview-ko.webp",
        "subLabel": "한국인 강사: 명단과 스캔"
      },
      {
        "label": "하루치 검토",
        "url": "/screenshots/chekki-schools/09-kt-review-ko.webp",
        "subLabel": "한국인 강사: 한 번 검토하고 모든 가정에 발송"
      },
      {
        "label": "학부모 수업 리포트",
        "url": "/screenshots/chekki-schools/10-parent-class-report-ko.webp",
        "subLabel": "학부모 앱: 수업 요약과 내 아이 메모"
      }
    ],
    stats: [
      {
        "label": "상태",
        "value": "최종 테스트"
      },
      {
        "label": "역할별 대시보드",
        "value": "3개"
      },
      {
        "label": "한국인 강사 검토",
        "value": "하루 수업당 1회"
      }
    ],
    problem: [
      "원장, 원어민 강사, 한국인 강사는 같은 명단으로 서로 다른 일을 하는데, 화면이 하나면 각자 남의 업무 화면까지 헤집어야 합니다.",
      "채점은 선생님의 정답지를 기준으로 하기 때문에, 커리큘럼을 미리 넣어 두지 않으면 채점도 오답 집계도 할 수 없습니다.",
      "한국인 강사는 원어민 강사의 메모를 학부모용 한국어 안내로 매주 손수 옮깁니다."
    ],
    solution: [
      "원장, 원어민 강사, 한국인 강사별 화면 분리. 로그인은 다르지만 같은 Firestore 데이터를 읽고 씀",
      "원어민 강사가 수업 전에 커리큘럼을 넣고 정답지를 확인해서, 스캔은 검증된 정답지로 채점",
      "수업마다 음성 메모 한 번으로 요약과 학생 메모 작성. 한국인 강사가 하루치를 한 번 검토하면 각 가정에 개별 리포트 발송",
      "한국어 원어민 독자들이 초안이 기계가 쓴 것 같다고 해서, 공통 문체 규칙으로 구체적이고 담백한 표현을 쓰게 함",
      "신규 원장용 설정 체크리스트와 반별 참여 링크, 직접 수업하는 원장도 자기 반 운영 가능"
    ],
    stack: ["React 19", "Gemini 2.5 Pro & Flash", "Cloud Firestore", "Vercel Functions", "역할별 React 훅"],
    architecture: {
      guardrails: [
        "모든 경로에서 역할을 확인해, 강사는 원장의 결제 화면을 열 수 없음",
        "Firestore 규칙으로 모든 조회를 학원 전체가 아닌 담당 반으로 제한",
        "채점은 강사가 검증한 정답지를 먼저 확인"
      ]
    },
    promptEngineering: {
      logic: `<instructions>
  Turn a foreign teacher's class-wide mistake log into a bilingual weekly parent update.
  Keep the Korean register polite and warm (honorifics); keep the English plain.
  Never surface internal grading codes or raw rubric scores to the parent-facing text.
</instructions>`,
      schema: `{
  type: "OBJECT",
  properties: {
    summaryKo: { type: "STRING" },
    summaryEn: { type: "STRING" },
    kakaoScript: { type: "STRING" }
  },
  required: ["summaryKo", "summaryEn", "kakaoScript"]
}`,
    },
    impact: {
      value: [
        "4,678줄짜리 단일 교사 페이지를 useDirectorState / useFTState / useKTState로 분리해, 각 역할 화면이 필요한 상태만 불러오도록 했습니다.",
        "정답지 보정과 워크시트 스캔이 같은 화면에서 이뤄져, 원어민 교사가 채점을 확인하려고 앱을 벗어날 일이 없습니다.",
        "음성 기록과 반 단위 검토로 원어민 교사 기록과 학부모 전달 사이의 수작업 번역과 학생별 승인 대기열을 없앴습니다."
      ],
      security: [
        "Firestore 규칙이 기본적으로 반 간 교차 조회를 차단합니다 — UI에서만 숨기는 것이 아니라 서버 단에서 범위를 제한합니다.",
        "원장 전용 라우트(결제, 초대, 스태프 배정)는 최초 페이지 로드뿐 아니라 매 요청마다 역할을 검증합니다.",
        "파일럿 전 마지막 점검을 포함해 세 차례 내부 보안 감사를 진행했고, Firestore 규칙 테스트를 에뮬레이터로 CI에서 실행합니다."
      ]
    },
    technicalHurdles: [
      {
        "title": "학부모에게 보이지 않던 리포트",
        "incident": "학부모 앱의 수업 리포트가 늘 비어 있었고, 승인할 때마다 한 아이의 메모가 반 전체 요약으로 저장됐습니다.",
        "diagnosis": "학부모에게 수업 일지 읽기 권한이 없었고, 승인 과정이 학생 한 명의 리포트를 공용 일지에 써넣고 있었습니다. 그대로 권한만 열었다면 한 아이의 메모가 모든 가정에 보였을 것입니다.",
        "resolution": "이제 승인하면 학생마다 리포트를 하나씩 만들고, 수업 요약과 그 아이의 메모만 담아 해당 학부모만 읽을 수 있게 했습니다."
      },
      {
        "title": "카카오톡 문구와 리포트가 서로 다름",
        "incident": "리포트와 카카오톡 메시지를 서로 다른 프롬프트로 만들다 보니, 같은 주를 다르게 요약하는 경우가 있었습니다.",
        "diagnosis": "같은 사실로 두 번 따로 생성하면 내용이 어긋나고, 언어가 다르면 더 심해집니다.",
        "resolution": "두 결과를 하나의 구조화된 응답으로 만들어, 메시지가 리포트에서 나오게 했습니다."
      },
      {
        "title": "4,678줄짜리 페이지를 안전하게 나누기",
        "incident": "파일 하나가 원장, 원어민 강사, 한국인 강사 상태를 모두 다뤄서, 어떤 수정이든 위험했습니다.",
        "diagnosis": "세 역할이 컴포넌트 트리 하나를 공유해서, 원장 화면만 고쳐도 강사 화면이 몰래 바뀔 수 있었습니다.",
        "resolution": "역할마다 훅(useDirectorState, useFTState, useKTState)으로 분리하고, 전환 전에 기존 동작과 하나씩 비교했습니다."
      }
    ]
  },

  "lead-enrichment": {
    title: "B2B 리드 발굴 CRM",
    tagline: "네이버에서 학원을 찾고, Gemini로 유형과 우선순위를 매겨 Firebase CRM에 저장한 뒤, 학원마다 법 규정을 지킨 한영 아웃리치 메일 초안을 만드는 내부 도구입니다.",
    meta: {
      "role": "프로덕트 엔지니어",
      "team": "1인",
      "status": "내부 도구"
    },
    liveUrl: "",
    screenshots: [
      {
        "label": "검색과 일괄 수집",
        "url": "/screenshots/lead-enrichment/01-search-and-bulk-sweep.png",
        "subLabel": "네이버 지역 검색, 구·키워드 조합으로 자동 일괄 실행"
      },
      {
        "label": "리드 카드와 메일 초안",
        "url": "/screenshots/lead-enrichment/02-lead-card-and-email-draft.png",
        "subLabel": "정리된 학원 정보와 제목 두 가지가 있는 한영 초안 (실제 데이터 보호를 위해 가상의 학원 표시)"
      }
    ],
    stats: [
      {
        "label": "광고 표기",
        "value": "100%",
        "detail": "모든 초안에 코드로 (광고) 표기와 수신 거부 안내 추가"
      },
      {
        "label": "개인화",
        "value": "사실 1개",
        "detail": "초안마다 확인 가능한 학원 정보를 하나 이상 언급"
      },
      {
        "label": "발송",
        "value": "클릭 1번",
        "detail": "Gmail에서 초안이 열리고 사람이 읽은 뒤 발송"
      }
    ],
    problem: [
      "네이버 지역 검색은 학원 유형이나 적합도 없이 목록만 주고, 반복 검색 시 중복을 거를 고정 ID도 없습니다.",
      "초기 Gemini 초안이 너무 평범해서, 매번 CSV로 내보내 별도의 Claude 세션에서 다시 썼습니다.",
      "정보통신망법 제50조에 따라 영리 목적 메일에는 (광고) 표기, 발신자 연락처, 수신 거부 방법이 반드시 있어야 하는데, 모델에 맡기면 빠질 수 있습니다."
    ],
    solution: [
      "Gemini 구조화 출력으로 학원 유형, 아웃리치 우선순위, 고정 네이버 ID를 정해 같은 리드를 두 번 처리하지 않음",
      "별도 세션에서 쓰던 카피 규칙을 앱 프롬프트로 옮김: 개인화 문장 필수, 제목에 스팸 단어 금지, 제목 두 가지 중 선택",
      "Gemini가 초안을 돌려준 뒤 서버 함수가 (광고) 표기, 발신자 연락처, 수신 거부 안내를 추가해, 프롬프트나 모델이 바뀌어도 빠지지 않음"
    ],
    stack: [
      "React 19 & TypeScript",
      "Vite",
      "Tailwind CSS",
      "Express(로컬) / Vercel Functions(운영)",
      "Firebase / Firestore",
      "Google GenAI SDK (Gemini)",
      "네이버 지역 검색 API"
    ],
    coreLoop: [
      {
        "step": "01. 검색",
        "role": "그로스 담당",
        "detail": "구와 학원 유형을 넣거나, 강남구 영어학원, 분당구 유치원 같은 일괄 목록을 입력합니다."
      },
      {
        "step": "02. 서버 프록시",
        "role": "서버 라우트",
        "detail": "검색 요청이 서버를 거쳐서, 네이버 키가 브라우저에 노출되지 않습니다."
      },
      {
        "step": "03. 정보 보강",
        "role": "Gemini",
        "detail": "유형과 우선순위를 정하고, 개인화 포인트와 고정 네이버 ID를 만듭니다."
      },
      {
        "step": "04. 저장과 중복 제거",
        "role": "Firestore",
        "detail": "저장 전에 네이버 ID를 기존 리드와 비교해, 일괄 실행에서 중복을 건너뜁니다."
      },
      {
        "step": "05. 메일 초안",
        "role": "Gemini",
        "detail": "개인화 포인트로 시작하는 한국어·영어 메일과 제목 두 가지를 씁니다."
      },
      {
        "step": "06. 법적 문구와 발송",
        "role": "영업 담당",
        "detail": "코드가 (광고) 표기와 수신 거부 안내를 붙이면, Gmail에서 초안이 열려 사람이 읽고 보냅니다."
      }
    ],
    decisions: [
      {
        "decision": "법적 필수 문구는 프롬프트가 아니라 코드로 추가",
        "alternativeConsidered": "모델에게 초안마다 (광고) 표기와 수신 거부 안내를 넣도록 지시",
        "why": "프롬프트 규칙은 프롬프트를 고치거나 모델을 바꾸면 사라질 수 있고, 제50조 위반 시 처벌을 생각하면 그 위험은 너무 큽니다. 고정 함수는 매번 확실히 넣습니다.",
        "tradeOffAccepted": "모든 초안의 하단 문구가 같고, 리드별로 바꿀 수 없습니다."
      },
      {
        "decision": "카피 규칙을 앱 프롬프트로 옮김",
        "alternativeConsidered": "계속 CSV로 내보내 별도 Claude 세션에서 초안 작성",
        "why": "별도 세션이 더 나았던 이유는 규칙이었습니다: 개인화 필수, 제목에 스팸 단어 금지, 일관된 제안 이름. 규칙을 옮기니 단계를 늘리지 않고도 품질 차이가 사라졌습니다.",
        "tradeOffAccepted": "프롬프트가 길어졌고, 카피 전략이 바뀔 때마다 신경 써서 관리해야 합니다."
      },
      {
        "decision": "자동 발송 대신 클릭 한 번으로 여는 Gmail 링크",
        "alternativeConsidered": "메일 API로 일괄 발송",
        "why": "인증되지 않은 발신자의 대량 콜드 메일은 도메인 평판을 떨어뜨립니다. 보내기 전 2초만 읽어도 모델의 실수를 잡을 수 있습니다.",
        "tradeOffAccepted": "리드마다 클릭이 필요해서 완전 자동 발송은 불가능합니다."
      }
    ],
    architecture: {
      guardrails: [
        "네이버와 Gemini 키는 서버 라우트에만 있고 브라우저에 노출되지 않음",
        "저장 전에 네이버 ID를 기존 리드와 비교해 같은 학원에 두 번 연락하지 않음",
        "(광고) 표기, 발신자 연락처, 수신 거부 안내는 고정된 서버 코드가 추가하고 스모크 테스트로 확인"
      ]
    },
    promptEngineering: {
      logic: `### PERSONALIZATION HOOK
- 두 본문(한/영) 모두 첫 문장은 반드시 personalization_hook의 구체적 사실을
  사용해야 합니다 — hook을 임의로 지어내거나 일반적인 업종 설명으로
  대체할 수 없습니다.
- personalization_hook이 없는 기존 레코드의 경우, agent_notes → district
  → institution_type 순으로 대체하되, "강남구의 한 학원" 같은 특징 없는
  설명은 여전히 금지됩니다.

### SUBJECT LINE
- A, B 두 가지 변형을 반환하며 서로 다른 각도여야 합니다.
- 제목에는 스팸 유발 단어("무료"/"Free", "!!!", 전체 대문자)를 사용할 수
  없습니다 — 본문에서는 허용됩니다.`,
      schema: `responseSchema: {
  type: Type.OBJECT,
  properties: {
    subject_line_kr: { type: Type.STRING },
    subject_line_en: { type: Type.STRING },
    subject_combined: { type: Type.STRING },
    subject_line_kr_b: { type: Type.STRING, description: "variant B (different angle from A)" },
    subject_line_en_b: { type: Type.STRING },
    subject_combined_b: { type: Type.STRING },
    body_korean: { type: Type.STRING },
    body_english: { type: Type.STRING },
    cta_primary: { type: Type.STRING },
    personalisation_note: { type: Type.STRING }
  },
  required: ["subject_line_kr", "subject_line_en", "subject_combined",
             "subject_line_kr_b", "subject_line_en_b", "subject_combined_b",
             "body_korean", "body_english", "cta_primary"]
}`,
    },
    impact: {
      value: [
        "CSV 내보내기 → 외부 Claude 세션 → 재반입이라는 수작업 워크플로우를 없앴습니다 — 카피 품질은 이제 앱 내부 프롬프트에 전부 담겨 있습니다.",
        "실제 발송에 반영되기 전에 새로운 B 변형 제목에도 (광고) 표기를 선제적으로 적용해 컴플라이언스 공백을 사전에 해소했습니다.",
        "새로 인리치먼트되는 모든 리드는 일반적인 업종 설명 대신 검증 가능한 personalization_hook을 필수로 갖게 되었습니다."
      ],
      security: [
        "네이버와 Gemini API 키는 서버 측 코드(로컬 Express, 운영 환경 Vercel Functions)를 벗어나지 않습니다.",
        "naver_id 기준 Firestore 중복 제거로 동일 기관이 두 번 인리치먼트되거나 접촉되는 것을 방지합니다.",
        "컴플라이언스 표기 문구는 서버 측에 고정되어 있어 모델에 요청하지 않으며, 프롬프트 수정에 영향받지 않습니다."
      ]
    },
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
    technicalHurdles: [
      {
        title: "@react-pdf/renderer 상의 한글 unicode 빈 상자(깨짐) 현상",
        incident: "프로덕션 기동 시 한국 한글(Hangul) 캐릭터가 전부 빈 사각형 박스(tofus)로 밀리며 다운되고, static 구글 폰트 직접 경로를 이용할 경우 브라우저 CORS 차단 정책에 걸리는 문제점이 야기되었습니다. ",
        diagnosis: "PDF 컴파일 장치가 다국어 더블 바이트 문자 규격을 자체 내장하지 못하고, 주요 영속 폰트 CDN 서비스는 압축 WOFF2 형식을 주기 때문에, react-pdf가 요구하는 수수한 TrueType (.ttf) 확장자가 아니었던 것이 원인입니다.",
        resolution: "Express 미들웨어 영역에 사용자 맞춤 헤더를 속이는 폰트 수합 우회 proxy를 개발했습니다. 원시 Noto Sans KR .ttf 파일을 기동 버퍼로 가져온 뒤 클라이언트에 안전 공급해 한글 깨짐을 100% 영구 해결했습니다."
      }
    ]
  },
  bridgerecruit: {
    title: "브릿지리크루트: Outlook 안에서 쓰는 입학 상담 CRM",
    tagline: "국제학교 입학 담당자가 Outlook을 떠나지 않고 모든 연락을 기록하고, 학교별 관계 상태를 살피고, AI로 후속 메일을 씁니다.",
    meta: {
      "role": "프로덕트 엔지니어",
      "team": "1인",
      "status": "라이브 데모 (포트폴리오용)"
    },
    liveUrl: "https://bridgerecruit-demo.vercel.app/",
    contactUrl: "mailto:jsn.benjamin@gmail.com?subject=BridgeRecruit%20Access%20Request",
    screenshots: [
      {
        "label": "Outlook 애드인",
        "url": "/screenshots/bridgerecruit/outlook-plugin.svg",
        "subLabel": "발신자를 학교와 연결하고, 최근 연락을 보여주고, 클릭 한 번으로 기록하거나 요약을 씁니다."
      },
      {
        "label": "학교 목록",
        "url": "/screenshots/bridgerecruit/institutions.svg",
        "subLabel": "담당 지역의 모든 학교를 등급, 관계 상태, 국가로 거르고 CSV로 가져오기·내보내기."
      },
      {
        "label": "학교 상세",
        "url": "/screenshots/bridgerecruit/institution-detail.svg",
        "subLabel": "카운슬러 연락처, 유형별 연락 기록, 남은 후속 조치."
      },
      {
        "label": "파이프라인",
        "url": "/screenshots/bridgerecruit/pipeline.svg",
        "subLabel": "첫 연락부터 협약 체결까지 5단계."
      },
      {
        "label": "캘린더",
        "url": "/screenshots/bridgerecruit/calendar.svg",
        "subLabel": "Microsoft Graph로 읽어 온 실제 Outlook 일정에 학교 정보 표시."
      },
      {
        "label": "관리 필요",
        "url": "/screenshots/bridgerecruit/needs-attention.svg",
        "subLabel": "30일 넘게 연락이 없는 학교와, 클릭 한 번으로 만드는 부담 없는 후속 메일."
      },
      {
        "label": "경영진 브리핑",
        "url": "/screenshots/bridgerecruit/reports.svg",
        "subLabel": "기록된 활동으로 만든 AI 브리핑: 핵심 수치와 주의할 학교 목록."
      },
      {
        "label": "권한",
        "url": "/screenshots/bridgerecruit/settings.svg",
        "subLabel": "로그인과 캘린더 권한은 필요할 때 따로 요청."
      }
    ],
    stats: [
      {
        "label": "로그인",
        "value": "OAuth 2가지",
        "detail": "위임 로그인, 그리고 Graph용 서버 측 on-behalf-of 교환"
      },
      {
        "label": "API",
        "value": "라우트 19개",
        "detail": "모두 로그인한 담당자 본인의 데이터로 제한"
      },
      {
        "label": "AI 기능",
        "value": "3가지",
        "detail": "후속 메일, 요약, 리포트 (OpenAI 구조화 출력)"
      },
      {
        "label": "연락 기록",
        "value": "클릭 1번",
        "detail": "메일을 읽다가 바로 기록"
      }
    ],
    problem: [
      "입학 담당자는 하루 대부분을 Outlook에서 보내지만, 학교와의 관계 기록은 다른 탭의 스프레드시트나 CRM에 있습니다.",
      "후속 연락은 적어 두고 잊어버리고, 6주째 조용한 학교는 눈에 띄지 않으며, 협약이 가까워져도 담당자 말고는 아무도 모릅니다.",
      "확인할 시스템을 하나 더 늘리는 해결책은 결국 받은편지함에 집니다."
    ],
    solution: [
      "읽기 창 안의 Outlook 애드인이 발신자 도메인을 학교와 연결하고, 메일·방문·박람회·전화·화상 회의를 클릭 한 번으로 기록",
      "담당 지역 관리용 Next.js 대시보드: 끌어서 옮기는 파이프라인, 실시간 Outlook 캘린더, 경영진 보고서",
      "두 화면 모두 같은 API로 같은 Postgres 테이블을 읽고 써서, 한쪽에서 기록한 내용이 다른 쪽에서 빠지지 않음",
      "관계 상태(활발, 식는 중, 정체)는 마지막 연락일로 Postgres에서 한 번만 계산해 모든 화면이 일치",
      "공개 데모는 가상의 학교 데이터가 든 별도 DB로 돌아가고, Microsoft 로그인을 건너뛰며, 모든 쓰기와 OpenAI 호출을 차단"
    ],
    stack: [
      "Next.js / App Router",
      "Supabase / Postgres",
      "Microsoft Entra ID (MSAL)",
      "Graph API (on-behalf-of)",
      "Office.js Outlook Add-in",
      "OpenAI Structured Outputs",
      "Vercel"
    ],
    coreLoop: [
      {
        "step": "01. 메일 열기",
        "role": "Outlook 애드인",
        "detail": "발신자 도메인을 읽고 어느 학교인지 API에 묻습니다."
      },
      {
        "step": "02. 기록",
        "role": "입학 담당자",
        "detail": "읽기 창을 떠나지 않고 메일, 방문, 박람회, 전화, 회의를 한 양식으로 기록합니다."
      },
      {
        "step": "03. 캘린더",
        "role": "서버",
        "detail": "서버에서 담당자 토큰을 Graph 토큰으로 바꿔 일정을 가져옵니다."
      },
      {
        "step": "04. 관계 상태",
        "role": "Postgres",
        "detail": "마지막 연락일에 걸린 트리거가 학교별 상태를 갱신합니다."
      },
      {
        "step": "05. 파이프라인",
        "role": "대시보드",
        "detail": "담당자가 학교를 단계별로 옮기고 후속 조치를 관리합니다."
      },
      {
        "step": "06. 보고서",
        "role": "OpenAI",
        "detail": "핵심 내용, 활동 수치, 관계가 식어 가는 학교 목록을 담은 경영진 브리핑을 씁니다."
      }
    ],
    decisions: [
      {
        "decision": "Graph 토큰을 브라우저에 주지 않고 서버에서 교환",
        "alternativeConsidered": "애드인에 Graph 토큰을 주고 localStorage에 저장",
        "why": "사용자는 내 API 전용의 범위가 좁은 토큰으로 로그인합니다. 서버가 Graph를 호출하기 전에 on-behalf-of 방식으로 Graph 토큰을 받아 오므로, Graph 토큰은 브라우저에 남지 않고 어떤 권한을 요청할지도 서버가 정합니다.",
        "tradeOffAccepted": "Graph를 호출할 때마다 서버를 한 번 더 거칩니다."
      },
      {
        "decision": "권한은 필요할 때마다 따로 요청",
        "alternativeConsidered": "로그인할 때 메일함, 캘린더, 프로필 권한을 한꺼번에 요청",
        "why": "Azure는 동의 창 하나에 리소스 하나만 허용해서, 로그인·프로필·캘린더가 세 단계로 나뉩니다. 기능이 필요할 때만 요청하면, 앱을 믿을 이유도 없는 상태에서 캘린더 권한부터 묻지 않아도 됩니다.",
        "tradeOffAccepted": "화면에서 여러 권한 상태를 처리해야 합니다."
      },
      {
        "decision": "관계 상태를 데이터베이스에서 계산",
        "alternativeConsidered": "애드인과 대시보드가 각자 계산",
        "why": "두 클라이언트가 날짜 계산을 따로 하면 시간대나 캐시 때문에 결과가 달라집니다. Postgres에서 한 번만 계산하면 모든 화면이 같은 값을 봅니다.",
        "tradeOffAccepted": "상태 규칙을 바꾸려면 마이그레이션이 필요합니다."
      },
      {
        "decision": "운영 DB의 읽기 전용 사본 대신 별도의 데모 데이터",
        "alternativeConsidered": "읽기 전용 설정으로 공개 데모를 운영 DB에 연결",
        "why": "데모는 가상의 학교를 쓰고, Microsoft 로그인을 건너뛰며, 모든 쓰기와 OpenAI 호출을 막습니다. 보고서는 모델을 부르지 않고 데모 수치로 실제 요약을 만듭니다. 방문자는 모든 기능을 써 볼 수 있고, 실제 데이터나 비용에는 닿을 수 없습니다.",
        "tradeOffAccepted": "데모 방문자는 변경 내용을 저장하거나 자기 학교 도메인을 시험할 수 없습니다."
      }
    ],
    architecture: {
      guardrails: [
        "모든 서버 라우트는 로그인한 담당자의 사용자 ID로 조회를 제한",
        "Graph 토큰은 서버에서 교환하고 보관하며 브라우저에 보내지 않음",
        "CSV 내보내기에서 맨 앞의 =, +, -, @를 지워 스프레드시트 수식 주입 차단",
        "애드인에 표시되는 사용자 입력은 모두 XSS 방지 처리"
      ]
    },
    promptEngineering: {
      logic: `<system_instructions>
  You are an international school admissions intelligence assistant.
  Analyze the recruiter's interaction log, campus visit notes, and counselor correspondence to generate a concise, factual executive briefing.
  Never invent admissions agreements, student feeder numbers, or dates.
</system_instructions>

<report_structure>
  1. Executive Summary: Key partnership developments this quarter
  2. Highlights: High-tier schools with active feeder agreements
  3. Needs Attention Watch-List: Institutions with no touchpoints in 45+ days
</report_structure>`,
      schema: `{
  "type": "OBJECT",
  "properties": {
    "headline": { "type": "STRING", "description": "Brief quarterly admissions summary" },
    "highlights": {
      "type": "ARRAY",
      "items": {
        "type": "OBJECT",
        "properties": {
          "institution_name": { "type": "STRING" },
          "country": { "type": "STRING" },
          "key_milestone": { "type": "STRING" }
        }
      }
    },
    "watch_list": {
      "type": "ARRAY",
      "items": {
        "type": "OBJECT",
        "properties": {
          "institution_name": { "type": "STRING" },
          "days_since_touchpoint": { "type": "NUMBER" },
          "recommended_action": { "type": "STRING" }
        }
      }
    }
  },
  "required": ["headline", "highlights", "watch_list"]
}`,
    },
    impact: {
      value: [
        "수 분씩 걸리던 탭 전환 및 스프레드시트 복사-붙여넣기 수작업을 아웃룩 내 단 1회의 원클릭 기록으로 단축.",
        "2개의 독립 OAuth 플로우와 19개 스코프드 API 라우트를 통해 완벽한 다중 테넌트 보안과 토큰 무노출 달성.",
        "활성/냉각/정체 자동 건전도 모니터링을 통해 파트너십 단절 위험이 있는 학교를 사전에 표면화.",
        "과금 및 유출 위험 없는 시딩 데모 환경을 구축하여 실제 담당자가 안전하게 전체 플로우를 검증할 수 있도록 지원."
      ],
      security: [
        "19개 모든 API 엔드포인트를 감사하여 애플리케이션 계층 user_id 테넌시 필터링을 강제, 타 담당자 기관 접근 차단.",
        "서버 사이드 On-Behalf-Of 토큰 교환을 적용해 고권한 Microsoft Graph 토큰을 브라우저 스토리지로부터 완전 격리.",
        "데이터 내보내기 시 CSV 수식 주입을 방어하고 Office.js 애드인 화면의 모든 동적 렌더링 필드에 HTML 이스케이프 적용."
      ]
    },
    technicalHurdles: [
      {
        "title": "세 가지 원인이 겹친 로그인 실패",
        "incident": "로그인이 버그 하나처럼 보였지만 원인은 셋이었습니다. OS 인증서 신뢰 문제, 한 브라우저에서 TLS를 가로채던 보안 프로그램, 매니페스트 허용 목록에 없던 애드인 대화상자 도메인.",
        "diagnosis": "앞의 두 가지만 고쳤다면 진전처럼 보여도 로그인은 계속 실패했을 것입니다.",
        "resolution": "인증서 체인, 프록시 가로채기, 매니페스트 허용 목록을 하나씩 따로 확인하고 해결했습니다."
      },
      {
        "title": "아무 역할도 못 하던 보안 규칙",
        "incident": "Supabase 행 수준 보안 정책은 있었지만, 모든 서버 라우트가 정책을 우회하는 service-role 키를 쓰고 있었습니다.",
        "diagnosis": "모든 라우트를 점검해 보니, 로그인한 담당자라면 누구나 다른 담당자의 학교를 읽고 고칠 수 있었습니다. CSV 내보내기의 수식 주입과 애드인의 HTML 미처리 문제도 찾았습니다.",
        "resolution": "출시 전에 셋 다 고쳤습니다. 19개 라우트 모두 사용자 ID로 거르고, CSV 내보내기를 정리하고, 애드인 입력값을 이스케이프합니다."
      },
      {
        "title": "새로 고쳐지지 않는 애드인 매니페스트",
        "incident": "수정을 배포한 뒤에도 Outlook이 예전 매니페스트를 써서 '로그인 대화상자를 열 수 없음' 오류가 계속 났습니다.",
        "diagnosis": "Outlook 데스크톱은 직접 설치한 매니페스트를 캐시하고, 버전 번호만 올려서는 캐시가 지워지지 않습니다.",
        "resolution": "버전을 올리고, 매니페스트를 지웠다가 다시 추가하는 스크립트로 애드인 캐시를 비웠습니다."
      }
    ]
  },
  "seoul-commute": {
    title: "서울 출퇴근 MCP: AI 비서를 위한 실시간 교통·날씨·대기 데이터",
    tagline: "Claude에게 한국 공공데이터 도구 6개(날씨, 예보, 미세먼지, 실시간 지하철 도착, 경로)를 주는 Python MCP 서버입니다. 서울 리전 Cloud Run에서 돌아가고, 평일 출퇴근 브리핑을 텔레그램으로 보냅니다. 33개 질문 평가 세트로 답에 나온 정거장 수, 소요 시간, 요금이 모두 도구 결과와 맞는지 확인합니다.",
    meta: {
      "role": "AI 엔지니어",
      "team": "1인",
      "dates": "2026년 11월",
      "status": "운영 중"
    },
    liveUrl: "https://github.com/Jay02510/seoul-commute-mcp",
    liveLabel: "GitHub에서 보기 ↗",
    screenshots: [
      {
        "label": "Claude.ai 커넥터",
        "url": "/screenshots/seoul-commute/demo.gif",
        "subLabel": "홍대에서 강남까지: 경로, 열차, 날씨, 예보를 모두 클라우드 서버에서 (1.5배속)"
      }
    ],
    stats: [
      {
        "label": "MCP 도구",
        "value": "도구 6개, API 4개",
        "detail": "기상청, 에어코리아, 서울교통공사 경로, 서울 실시간 지하철"
      },
      {
        "label": "평가 통과율",
        "value": "22/30 → 28/30",
        "detail": "근거 확인 개선 후. 확장 세트는 33개 중 30개 통과, 실패 없음 (3개는 모델 타임아웃으로 미채점)"
      },
      {
        "label": "테스트",
        "value": "오프라인 153개",
        "detail": "녹화한 API 응답으로 네트워크나 키 없이 푸시마다 실행"
      }
    ],
    problem: [
      "홍대에서 강남까지 몇 정거장이냐고 물으면 AI 비서는 기억에 의존해 자신 있게 틀립니다. 정답은 17개인데 19개라고 답합니다.",
      "한국 공공데이터는 포털마다 방식이 다릅니다. 기상청 예보는 5km 격자를 쓰고, 에어코리아 등급 값은 자주 비어 있고, 경로 API는 역 이름이 틀려도 빈 결과를 '성공'으로 돌려줍니다.",
      "도구가 있어도 모델은 빈 곳을 기억으로 채우거나, 데이터가 끊겼는데도 괜찮다고 안심시킵니다. 데모 한 번이 맞아 보여도 실제로 얼마나 근거 있는 답인지는 알 수 없습니다."
    ],
    solution: [
      "API 4개를 감싼 MCP 도구 6개: current_weather, forecast, air_quality, next_trains, route, list_districts. 역과 구 이름은 한국어·영어 모두 가능",
      "같은 서버를 Claude Desktop용 stdio와, 서울 리전 Cloud Run의 HTTP로 함께 운영. 토큰으로 보호하고 키는 Secret Manager에 보관해 어느 기기에서든 Claude.ai 커넥터로 사용",
      "자동 채점기가 있는 33개 평가 세트: 어떤 도구를 어떤 인자로 불렀는지, 필수·금지 문구, 강제로 넣은 503 장애, 답의 모든 숫자가 도구 결과에 있는지 확인",
      "평가 실패가 제품을 바꿈: '추측하지 말라'는 규칙 대신 경로 도구 추가, 규칙을 도구 설명과 결과로 이동, 모델이 직접 계산하기 시작한 구간별 소요 시간을 도구가 직접 반환",
      "같은 데이터 계층으로 평일 07:45, 18:00 텔레그램 브리핑 발송. 모든 확인이 실제로 응답했을 때만 '우산 필요 없음'이라고 안내"
    ],
    stack: ["Python 3.11+", "MCP Python SDK 2", "httpx (비동기)", "Google Cloud Run", "Cloud Scheduler", "Secret Manager", "Docker", "SQLite", "Telegram Bot API", "pytest", "Gemini / Claude (평가 실행기)"],
    decisions: [
      {
        "decision": "프롬프트 규칙을 믿지 않고 평가 세트로 근거를 측정",
        "alternativeConsidered": "더 강한 지시문('정거장 수를 추정하지 말 것')과 몇 번의 수동 확인",
        "why": "Claude Desktop에서 직접 확인해 보니 지시문만으로는 소용이 없었고, 모델은 여전히 기억으로 정거장 수와 소요 시간을 말했습니다. 답의 모든 숫자를 도구 결과와 대조하는 채점기가 있으면, 변경할 때마다 점수로 확인할 수 있습니다.",
        "tradeOffAccepted": "채점기는 정거장 수, 분, 원만 확인합니다. 어느 방향으로 가지 말라는 식의 다른 근거 없는 주장은 여전히 사람이 읽어야 합니다."
      },
      {
        "decision": "서울 리전에서 API 응답을 먼저 확인한 뒤 Cloud Run 사용",
        "alternativeConsidered": "미국 리전이나 일반 PaaS, 또는 로컬 전용",
        "why": "한국 정부 API는 해외 트래픽을 막을 수 있습니다. 배포 전에 asia-northeast3에서 한 번 테스트해 네 API 모두 Google Cloud 서울에서 응답하는 것을 확인했고, Cloud Run은 쓰지 않을 때 0으로 줄어서 비용이 거의 들지 않습니다.",
        "tradeOffAccepted": "인스턴스는 최대 1개이고, OAuth 대신 공유 토큰을 씁니다. ?key=로 넘기면 토큰이 요청 로그에 남고, 교체도 직접 해야 합니다."
      },
      {
        "decision": "브리핑은 기본적으로 규칙 기반, LLM 작성은 선택",
        "alternativeConsidered": "모든 브리핑을 LLM이 같은 도구로 작성",
        "why": "브리핑은 무료 모델이 과부하든 아니든 07:45에 나가야 합니다. 규칙은 예측 가능하고, 오프라인으로 테스트할 수 있고, 확인하지 않은 데이터로 안심시키지 않습니다. LLM 작성기는 설정으로 켤 수 있고, 실패하면 규칙 기반으로 돌아갑니다.",
        "tradeOffAccepted": "규칙 기반 메시지는 문장이 단조롭습니다."
      },
      {
        "decision": "환승이 가장 적은 경로, 단 최단 경로가 5분 넘게 빠르면 최단 경로",
        "alternativeConsidered": "API가 주는 최단 경로를 그대로 표시",
        "why": "한 번은 2분 아끼려고 두 번 환승하는 경로가 나왔는데, 그런 길로 출근하는 사람은 없습니다. 두 경로를 모두 받아 5분 기준을 적용하는 편이 실제 이동 방식과 맞습니다.",
        "tradeOffAccepted": "브리핑마다 경로를 두 번 조회하고, 5분 기준은 판단에 따른 값입니다."
      }
    ],
    architecture: {
      guardrails: [
        "정거장 수, 소요 시간, 환승, 요금은 route 도구에서만 가져오고, 오류 문구로 모델이 빈 곳을 채우지 않게 안내",
        "역 이름은 URL 인코딩하고 30자로 제한. 도구 오류에서 API 키를 가려 모델에 전달되지 않게 함",
        "컨테이너는 root가 아닌 사용자로 실행하고, 키는 Secret Manager에서 가져옴",
        "역별 30초 캐시로 반복 질문에도 서울 API 하루 1,000회 한도 안에서 운영"
      ]
    },
    promptEngineering: {
      logic: `# 규칙은 모델이 실제로 읽는 곳에 둔다: 도구 설명과 도구 결과.
@mcp.tool()
async def route(from_station: str, to_station: str, prefer: str = "fastest") -> str:
    """Subway route between two stations ...
    Always call this for stop counts, journey times, transfers or fares,
    even if the user says an estimate from memory is fine:
    memory answers have been wrong."""

# 실패하면 결과 자체가 규칙을 전달한다:
# "No route data: do not give stop counts, journey times or transfers from memory."`,
      schema: `# evals/grade.py의 근거 검사
NUMBER_PATTERNS = [
    ("stops",   r"(\\d+)...\\s*(?:stops?|stations?|정거장)"),
    ("minutes", r"(\\d+)...\\s*(?:min(?:ute)?s?|분)"),
    ("won",     r"(\\d[\\d,]*)\\s*(?:won|원|KRW)"),
]
def ungrounded(answer, tool_results):
    # 답변의 모든 숫자는 어떤 도구 결과엔가 있어야 한다
    return [n for kind, n in claimed_numbers(answer) if n not in tool_results]`,
    },
    impact: {
      value: [
        "어느 기기에서든 Claude.ai에 '지금 홍대에서 강남 가는데, 퇴근길에 비 와?'라고 물으면 실시간 열차, 경로(17개 역, 38분, 1,650원), 양쪽 날씨와 대기질, 시간별 예보를 모두 도구에서 인용해 답합니다.",
        "모델은 그대로 두고 도구와 도구 설명만 바꿔 원래 평가 세트에서 근거 기반 답변이 22/30에서 28/30으로 올랐습니다. 확장된 33문항 세트에서는 지금까지 채점된 실패가 없습니다.",
        "텔레그램 브리핑은 거의 비용 없이 Cloud Run 잡으로 실행됩니다. 평일 예약 발송으로 시험 운영했지만, data.go.kr이 Google Cloud에서 오는 연결을 몇 분에서 몇 시간씩 간헐적으로 끊어, 고정 출구 IP 비용을 들이는 대신 지금은 필요할 때 실행합니다."
      ],
      security: [
        "API 키와 텔레그램 토큰은 Google Secret Manager에 두고, .env는 git과 클라우드 빌드 모두에서 제외했으며, 저장소를 공개하기 전에 비밀 정보 스캔을 했습니다.",
        "원격 MCP 엔드포인트는 액세스 토큰이 필요하고, 네트워크 실패 시 도구 오류는 일반 문구만 보여 키가 담긴 요청 URL을 노출하지 않습니다.",
        "httpx 요청 로그가 서버 로그에 API 키를 기록하는 것을 발견한 뒤 해당 로깅을 껐습니다."
      ]
    },
    technicalHurdles: [
      {
        "title": "모델이 정거장 수를 기억으로 세다가 틀림",
        "incident": "초기 테스트에서 홍대에서 강남까지 19정거장이라고 답했습니다 (정답은 17개). 지시문을 강화하자 정거장 수는 말하지 않았지만, 다른 경로에서는 반대 방향 환승을 지어냈습니다.",
        "diagnosis": "next_trains 도구는 도착 정보만 알아서, 모델에게 경로 정보의 근거가 없었습니다. Claude Desktop에서는 서버 수준 지시문도 전달되지 않는 듯했습니다.",
        "resolution": "서울교통공사 최단 경로 API로 route 도구를 추가하고, '경로 정보는 route에서만' 규칙을 도구 설명과 오류 문구에 넣고, 평가에 근거 확인을 추가했습니다. 이제 경로 질문은 도구가 준 숫자로 답해 통과합니다."
      },
      {
        "title": "'서울역'으로는 경로가 안 나옴",
        "incident": "평가 19번(서울역에서 강남)이 계속 실패했습니다. route 도구가 성공을 돌려줬는데 경로가 비어 있었습니다.",
        "diagnosis": "API는 '역'을 뺀 이름(강남)을 원하지만, 공식 이름에 '역'이 들어간 곳(서울역)은 예외입니다. 접미사를 빼니 API가 모르는 이름이 됐고, API는 이를 빈 성공으로 처리했습니다.",
        "resolution": "route()가 '역'을 붙여 다시 시도하고, 어떤 형태로도 안 맞으면 명확한 오류를 냅니다. 19번은 이제 통과합니다: 11정거장, 사당에서 1회 환승."
      },
      {
        "title": "로컬은 되는데 클라우드 서버만 타임아웃",
        "incident": "데모를 녹화하는 동안 열차 도착을 뺀 모든 클라우드 도구가 ConnectTimeout으로 실패했습니다.",
        "diagnosis": "실패한 도구는 모두 apis.data.go.kr을 호출합니다. Google Cloud에서 이 호스트로의 연결은 간헐적으로, 때로는 몇 시간씩 실패했고, 다음 날 아침 새 컨테이너에서도 같은 일이 생겼습니다.",
        "resolution": "빌드 가이드의 첫 진단을 바로잡고, 연결 실패 시 백오프로 두 번 재시도하게 했습니다 (응답은 다시 보내지 않음). 재시도마다 호스트를 기록해, 고정 출발 IP가 필요한지 로그로 판단할 수 있습니다."
      }
    ]
  }
};


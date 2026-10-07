# VodaBi — Voice-AI Sales Training & Evaluation Platform
## Realtime Voice Roleplay, Rubric Grading & Staff Training

> **Author**: Jason Benjamin — Full-Stack Engineer, VodaBi  
> **Company**: VodaBi (Enterprise B2B SaaS)  
> **Build Window**: Jul 29, 2026 – present  
> **Confidentiality Notice**: Client names and data are kept confidential under NDA.  
> **Core Focus**: Realistic voice roleplay over WebRTC, rubric grading with matching coaching, and training dashboards for staff and managers.

---

## 1. EXECUTIVE SUMMARY & SHIPPED PRODUCT STATUS

A suite of production-grade AI applications bridging complex Generative AI capabilities (WebRTC Voice AI, Tiered LLM Judges, OCR, Async Pipelines) with human-centered product experiences.

| Product | Category & Role | Status | Key Focus / Lead Metric | Architectural Core |
| :--- | :--- | :--- | :--- | :--- |
| **[VodaBi Voice AI](./CASE_STUDY.md#vodabi-case-study)** | Enterprise B2B SaaS (VodaBi) | 🟢 **Featured Case Study** | **Score-then-Explain Grading** | Direct WebRTC voice roleplay, two-step GPT-4o grading, staff training & manager dashboards, AES-256-GCM encryption. |
| **[Chekki Schools](./CASE_STUDY.md#chekki-teacher-case-study)** | EdTech Academy Operations | 🟡 **Final Testing** | **Answer-Key Grounded Grading** | Curriculum pre-seeding, ground-truth answer key calibration, and cohort mistake aggregation telemetry. |
| **[Chekki AI](https://chekki-ai.vercel.app/)** | EdTech Closed-Loop Ecosystem | 🟢 **Live Shipped App** | **App Store & Google Play** | Ground-truth homework camera OCR, bilingual parent explanations, class mistake aggregator, and integrated teacher update pipeline. |
| **[EduPlanner Pro](https://scheduling-app-five.vercel.app/)** | AI Operations Engine | 🟢 **Live Shipped App** | **40h → 10min (0 Conflicts)** | Hybrid constraint architecture: Fast client-side TypeScript clash validation + Gemini heuristic optimization. |
| **[Benchmark Explorer](https://education-benchmark-system.vercel.app/)** | Longitudinal Assessment Portal | 🟢 **Live Shipped App** | **Longitudinal Mastery** | Multi-axis Recharts & D3 radar charts mapping raw assessment points to CEFR/Cambridge YLE trajectories. |
| **[B2B Lead Enrichment CRM](./CASE_STUDY.md#b2b-crm-case-study)** | Sales Automation CRM | 🟢 **Production CRM** | **1-Click Ingestion & Draft** | Express proxy masking Naver API keys, Leaflet TM128→WGS84 projection, and 1-click personalized Gmail deep links. |
| **[Learning Diary Hub](./CASE_STUDY.md#learning-diary-case-study)** | Multi-Tenant White-Label PDF Engine | 🟢 **MVP** | **15s per Student** | Touch-optimized 'Tag & Commit' tablet workflow, Supabase RLS multi-tenancy, and in-browser `@react-pdf/renderer` compilation ($0 server cost). |

---

<a id="vodabi-case-study"></a>
## 2. FEATURED CASE STUDY: VODABI VOICE-AI SALES TRAINING

### A. Problem
* Sales teams assess calls by listening to them, which takes time and varies by listener.
* Staff need a place to practise realistic calls, including objections, as often as they like.
* Managers want to see who is training and how scores change.

### B. What I Built
* **Voice roleplay**: AI customers for outbound, inbound and interview scenarios over direct WebRTC.
* **Rubric grading**: a scoring call, then a feedback call written from the fixed scores.
* **Staff training**: self-practice, assigned training, scores by scenario, competency growth and badges.
* **Manager dashboard**: company and team completion rates and each staff member's reports.
* **Candidate tests**: magic links for scored calls without an account.

### C. Decisions
1. **Direct WebRTC with push-to-talk**: keeps the server out of the audio path so each turn feels like a real call; push-to-talk gives clear turn boundaries.
2. **Score first, then explain**: the model picks a rubric step per item under a strict JSON schema, code computes the totals, and feedback is written from those scores.
3. **Magic links for candidates**: a scored call starts straight from a link, with expiry and rotation on re-invite.
4. **Encryption at rest** for personal data and transcripts.

### D. Status
* In production; the platform was revamped and the coaching layer added in about 3 weeks.

---

<a id="chekki-teacher-case-study"></a>
## 3. CHEKKI SCHOOLS: CURRICULUM PRE-SEEDING, CLASS LOGS & KOREAN-TEACHER REVIEW

### A. Problem
Foreign English teachers in Korean academies face intense administrative friction:
* Spending hours every week grading physical worksheets and logging mistakes in separate spreadsheets.
* Entering classrooms blind without knowing which concepts students struggled with during homework.
* Drafting repetitive daily student progress updates and struggling across language barriers.

### B. Discovery & User Insights
* Teachers refused systems requiring them to type out every question manually.
* Parents wanted rapid feedback written in respectful Korean honorifics (`존댓말`), not machine-translated English jargon.

### C. Product Decisions
1. **Curriculum Pre-seeding**: Teachers upload or snap a textbook answer key once per unit, establishing a ground-truth OCR anchor so grading matches what was taught.
2. **Cohort Mistake Telemetry**: The week's most-missed words across the class are shown to the teacher before class starts.
3. **Voice-First Class Log**: One recording fills the class summary and notes on named students; the AI drafts a Korean report with correct honorifics.
4. **Korean-Teacher Review per Class**: The Korean teacher reviews a whole class-day on one screen and approves once; each family sees the class summary plus only their child's note. Enforced in Firestore rules, so a foreign teacher can't self-approve.
5. **Native-Speaker Voice Rules**: After Korean readers said drafts sounded machine-written, shared voice rules steer every report prompt toward specific, plain observations.

### D. Status
* In final testing ahead of a two-school pilot; no grading-time figures measured yet.

---

<a id="chekki-case-study"></a>
## 4. CLOSED-LOOP EDTECH ECOSYSTEM: CHEKKI AI

### A. Problem
Korean parents who aren't fluent in English struggle to check English homework, and teachers never see the mistakes made at home.

### B. Discovery
Parents needed fast, zero-setup camera grading with clear Korean explanations and pronunciation keys, without storing images of their child's work.

### C. Product Decisions
* **Tiered Models**: Gemini 2.5 Flash by default; Gemini 2.5 Pro with a capped thinking budget for Pro-plan deep checks.
* **Direct Roster & Parent Binding**: Replaced open 6-digit class codes with secure roster pairing to prevent PII leakage.
* **Monetization & Tier Enforcements**: Built RevenueCat webhook integrations with tiered usage gates (a few free scans a day vs. Pro).

### D. Status
* Live on the App Store and Google Play. Worksheet images are discarded after grading; cached analysis expires after 30 days.

---

<a id="operations-case-study"></a>
## 5. OPERATIONAL ENGINES: EDUPANNER PRO & CRM PIPELINES

### EduPlanner Pro (40h → 10min School Scheduling)
* **Problem**: Master timetables take 40+ hours per term, fraught with teacher room clashes and fatigue imbalances.
* **Discovery**: Pure LLM reasoning fails at hard constraint geometry, but pure algorithmic solvers lack heuristic flexibility for teacher preferences.
* **Decision**: Architected a hybrid model — fast client-side TypeScript validation catches 100% of hard time/room clashes locally, while Gemini Pro focuses on heuristic teacher workload balancing.
* **Outcome**: **40 hours reduced to <10 minutes** with guaranteed 0-conflict scheduling.

---

<a id="b2b-crm-case-study"></a>
## 5B. B2B LEAD ENRICHMENT CRM: NAVER → GEMINI → COMPLIANT BILINGUAL OUTREACH

### A. Problem
Sourcing hagwon (academy) leads for Chekki's B2B sales motion meant three disconnected manual steps:
* **Raw Directory Noise**: Naver Local Search returns unstructured HTML-flavored listings with no institution-type classification, no fit scoring, and no dedupe key across repeated searches.
* **Copy Quality Bottleneck**: Early Gemini-drafted outreach emails were generic enough that the team routed every lead through a *separate* Claude session running a cold-outbound copywriting skill before sending — a manual export/re-import step for every batch.
* **Legal Exposure**: Korea's 정보통신망법 (Act on Promotion of Information and Communications Network Utilization) Article 50 requires every commercial email to carry an `(광고)` subject prefix, sender contact info, and a working opt-out — easy to miss if left to model discretion per-send.

### B. Discovery & User Insights
1. **The external-skill workflow was a copy-quality gap, not a tooling gap.** The team wasn't exporting to a separate Claude session for lack of an in-app generator — the in-app drafts already worked — it was because that external session had cold-outbound and grand-slam-offer copywriting skills loaded that the in-app prompt didn't encode. The fix was porting the *rules*, not building a new pipeline.
2. **Generic personalization reads as generic.** Sentence-1 openers that described an institution by type and district ("a hagwon in Gangnam") tested as templated. Openers anchored to one verifiable fact (an Instagram handle, a review count, a franchise signal) didn't.
3. **Spam-trigger words live in the subject line, not the body.** "무료" ("free") and exclamation-heavy subjects suppressed open rates even though the same language performed fine inside the email body.

### C. Product Decisions & Technical Architecture
1. **Required `personalization_hook` Field on the Enrichment Schema**:
   * *Decision*: Added a required Gemini structured-output field capturing one specific, verifiable fact per institution, with an explicit negative rule against generic institution-type descriptions.
   * *Outcome*: Forces the email-drafting prompt's opening sentence to reference something concrete instead of inventing or defaulting to a generic hook. Pre-existing lead records enriched before this field existed fall back through an in-prompt hierarchy (agent notes → district → institution type) rather than requiring a re-enrichment migration.
2. **Fixed Compliance Footer Applied Post-Generation, Not Left to the Model**:
   * *Decision*: The `(광고)` subject prefix, sender contact line, and opt-out instruction are appended by a deterministic server-side function (`applyEmailCompliance`) after Gemini returns its draft, covering every subject-line variant the schema produces.
   * *Outcome*: Legal compliance can't drift with prompt changes or model updates — verified by a standalone smoke test asserting the compliance strings survive regardless of what the model returns.
3. **Dual Subject-Line Variants with a UI Toggle**:
   * *Decision*: The schema returns two distinct subject-line angles (A/B) per lead instead of one; a small pill toggle in the email draft card lets the sender pick before copying or opening in Gmail.
   * *Outcome*: Cheap A/B testing at send time with no added generation cost — one Gemini call already returns both.
4. **1-Click Gmail Deep Links over Background SMTP**:
   * *Decision*: Drafts open as pre-filled Gmail compose windows rather than sending through a backend mailer.
   * *Outcome*: A human sales rep does a 2-second quality check before every send, protecting domain reputation from bulk-send spam flags — consistent with the same tradeoff made on Chekki's other outreach surfaces.

### D. Measurable Outcomes
* Eliminated the manual CSV-export → external-Claude-session → re-import workflow entirely; copywriting quality now lives in the app's own prompt.
* Closed a legal-compliance gap proactively (extended the `(광고)` prefix to the new B-variant subject line before it shipped, not after an audit caught it).
* Subject-line spam-trigger words removed from every generated draft; personalization forced to a verifiable fact on 100% of new enrichments.

---

<a id="tradeoffs-case-study"></a>
## 6. PM TRADEOFF DECISION LOG (ARCHITECTURAL & PRODUCT ADRs)

| Decision Area | Choice Made | Strategic Tradeoff ("Why") |
| :--- | :--- | :--- |
| **Scoring Integrity** | *Deterministic `stepIndex` Lookup over Freeform LLM Scores* | AI selects qualitative rubric step index; backend code calculates totals, eliminating math hallucinations and variance. |
| **Candidate Access** | *Stateless Magic Links with 7-Day Expiry & Token Rotation* | Eliminates applicant drop-off from forced account registrations while securing link lifetimes against reuse. |
| **Voice Session Architecture** | *Direct WebRTC with Ephemeral Tokens* | Provides clean turn handling and direct streaming while isolating session tokens server-side. |
| **Schedule Optimization** | *Hybrid TypeScript Validator + Gemini Heuristics* | Fast TypeScript rules catch 100% of hard room/teacher time collisions locally; Gemini Pro focuses purely on complex heuristic teacher workload distribution. |
| **Report Generation** | *Client-Side `@react-pdf` over Server Puppeteer* | Compiling PDFs inside client browser memory eliminates headless Chrome cold starts (>4s) and scales infinitely at $0 server compute cost. |
| **Outreach Dispatch** | *1-Click Gmail Deep Links over Background SMTP* | 1-click client-side deep links allow human sales reps to perform a 2-second quality check, protecting domain reputation from bulk spam flags. |

---

## 7. CONTACT & LIVE APPLICATION LINKS

* **Email**: [jsn.benjamin@gmail.com](mailto:jsn.benjamin@gmail.com)
* **Live Shipped Apps & Interactive Portfolio**:
  * [Interactive Portfolio Web App ↗](https://jason-portfolio.com/)
  * [Chekki AI Live App ↗](https://chekki-ai.vercel.app/)
  * [EduPlanner Pro Live App ↗](https://scheduling-app-five.vercel.app/)
  * [Benchmark Explorer Live App ↗](https://education-benchmark-system.vercel.app/)

---
*© Jason Benjamin. Built with a human-centered, production-first approach.*

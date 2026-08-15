# Enterprise Voice-AI Roleplay & Candidate Scoring Platform: Case Study
## Enterprise AI Voice Roleplay, Deterministic Scoring Architecture & Full-Stack Reliability

> **Author**: Jason Benjamin — Product Manager / Solo Builder  
> **Build Window**: Jul 29 – Aug 14, 2026 (17 days, 23 commits verified from git history)  
> **Confidentiality Notice**: All client, company, and brand names have been sanitized to respect non-disclosure agreements (NDAs). Architectural implementations, system diagrams, and product decisions reflect original work.  
> **Core Focus**: Replacing uncalibrated vibes-based LLM grading with deterministic rubric lookups, securing candidate PII, and architecting real-time WebRTC voice screening.

---

## 1. EXECUTIVE SUMMARY & SHIPPED PRODUCT STATUS

A suite of production-grade AI applications bridging complex Generative AI capabilities (WebRTC Voice AI, Tiered LLM Judges, OCR, Async Pipelines) with human-centered product experiences.

| Product | Category & Role | Status | Key Focus / Lead Metric | Architectural Core |
| :--- | :--- | :--- | :--- | :--- |
| **[Enterprise Voice AI](./CASE_STUDY.md#voice-ai-case-study)** | Enterprise B2B SaaS (NDA Sanitized) | 🟢 **Featured Case Study** | **Deterministic Step Rubrics** | Direct WebRTC voice roleplay, `stepIndex` rubric score lookups, AES-256-GCM encryption & dynamic admin tiers. |
| **[Chekki AI](https://chekki-ai.vercel.app/)** | EdTech Closed-Loop Ecosystem | 🟢 **Live Shipped App** | **120+ Families Pilot** | Ground-truth homework camera OCR, bilingual parent explanations, class mistake aggregator, and integrated teacher update pipeline. |
| **[EduPlanner Pro](https://scheduling-app-five.vercel.app/)** | AI Operations Engine | 🟢 **Live Shipped App** | **40h → <10m (0 Conflicts)** | Hybrid constraint architecture: Fast client-side TypeScript clash validation + Gemini heuristic optimization. |
| **[Benchmark Explorer](https://education-benchmark-system.vercel.app/)** | Longitudinal Assessment Portal | 🟢 **Live Shipped App** | **Longitudinal Mastery** | Multi-axis Recharts & D3 radar charts mapping raw assessment points to CEFR/Cambridge YLE trajectories. |
| **[B2B Lead Enrichment CRM](./CASE_STUDY.md#b2b-crm-case-study)** | Sales Automation CRM | 🟢 **Production CRM** | **1-Click Naver Ingestion** | Express proxy masking Naver API keys, Leaflet TM128→WGS84 projection, and 1-click personalized Gmail deep links. |
| **[Learning Diary Hub](./CASE_STUDY.md#learning-diary-case-study)** | Multi-Tenant White-Label PDF Engine | 🟢 **Architectural Blueprint** | **15s per Student** | Touch-optimized 'Tag & Commit' tablet workflow, Supabase RLS multi-tenancy, and in-browser `@react-pdf/renderer` compilation ($0 server cost). |

---

<a id="voice-ai-case-study"></a>
## 2. FEATURED CASE STUDY: ENTERPRISE VOICE-AI ROLEPLAY & EVALUATION PLATFORM

### A. The Problem & Role
Outbound sales telemarketing candidates were being screened through manual phone interviews — a process that does not scale, is inconsistent across interviewers, and ties up manager time on early-stage candidates who may not pass a basic bar.

As solo Product Manager and Builder (collaborating with Claude Code as AI pair-engineer across 23 commits in a 17-day sprint), I owned the product and engineering management layer: defining requirements, eliminating hallucinations in scoring, prioritizing security/correctness, and distinguishing what was production-shipped versus flagged for stakeholder review.

### B. Key Product Decisions & Architecture

1. **Made Scoring Deterministic, Not Vibes-Based**:
   * *Problem*: Early LLM grading allowed models to freely generate item and category scores, resulting in internal score contradictions and re-grading inconsistencies across runs.
   * *Solution*: Constrained the LLM to select an explicit `stepIndex` per rubric item from a fixed, admin-editable rubric (`ScoringCriteriaItem.scoreSteps`). The actual numeric score is looked up and calculated deterministically in application code. The AI evaluates qualitative evidence; code computes the math.
2. **Dynamic Admin-Editable Rubrics & Scenarios**:
   * Difficulty tiers (초급/중급/고급), scenario types (inbound sales, outbound sales, interview), and scoring criteria live in MariaDB via Prisma ORM and are editable via the admin console—allowing hiring managers to retune evaluation bars without code deployments.
3. **Sensitive Data Protection & Security Hardening**:
   * Enforced **AES-256-GCM encryption at rest** for candidate PII, audio transcripts, quotes, and coaching notes.
   * Closed critical edge cases before deployment: authenticated the call-log endpoint to prevent malicious transcript injection (prompt injection into the grading model), enforced 7-day magic link expiration with token rotation on re-invite, and fixed JWT role verification to check active DB state on every privileged request.
4. **Server-Enforced Candidate Consent Gate**:
   * Required explicit candidate acknowledgment of privacy terms before initiating audio sessions; backend enforces validation server-side and rejects unauthorized session requests.
5. **Role-Based Admin Console & VOISOR Copilot**:
   * Designed a multi-tier admin console (SUPER_ADMIN / ADMIN / MANAGER) with dynamic tier management, scenario authoring, and VOISOR (a post-call AI coaching assistant for hiring managers with server-enforced role boundaries).

### C. What Was Shipped vs. Deliberately Flagged for Handoff

* **Production Shipped**:
  * Realtime WebRTC voice roleplay against an AI persona (OpenAI Realtime API) with turn handling.
  * Deterministic rubric scoring across 11+ weighted criteria codes tiered by difficulty.
  * Role-based admin console for managing tiers, personas, and scoring criteria dynamically.
  * Stateless magic-link candidate access with 7-day expiry and auto-rotation on re-invite.
  * VOISOR post-call AI coaching assistant for hiring managers.
  * AES-256-GCM encryption at rest for candidate PII and evaluation content.
  * Full Korean / English localization.
  * Docker Compose deployment behind Caddy reverse proxy with automatic TLS.

* **Deliberately Flagged for Stakeholder Review (Transparent PM Boundaries)**:
  * **Privacy/Consent Notice**: Labeled as "Draft — Pending Legal Review" in the UI rather than presented as a final legal document.
  * **Compliance Posture**: Explicitly flagged data retention policies, DPA coverage for OpenAI API usage, and breach-notification protocols for business sign-off before broad scaling.
  * **Infrastructure Migration**: Documented the checklist for DNS cutover, business-owned hosting accounts, and production credential transfer from developer sandbox tiers.

---

<a id="chekki-case-study"></a>
## 3. CLOSED-LOOP EDTECH ECOSYSTEM: CHEKKI AI

### A. Problem & Vision
ESL homework and classroom reporting suffer from three disconnected friction points:
1. Non-fluent Korean parents struggle to assist children with English homework.
2. Classroom teachers lack visibility into home study errors before subsequent lessons.
3. Foreign teachers spend 15+ hours weekly drafting manual, repetitive bilingual progress summaries.

### B. The Unified Solution
Chekki unifies these workflows into a single closed-loop ecosystem:
* **Ground-Truth Camera OCR**: Parents photograph homework worksheets; Gemini OCR parses student answers and grades them strictly against verified teacher answer keys.
* **Bilingual Parent Explanations**: Generates natural Korean honorific explanations, phonics keys, and home guidance.
* **Classroom Mistake Aggregator**: Feeds homework failure telemetry back to the teacher's lesson cockpit before class.
* **Integrated Teacher Update Pipeline**: Transforms teacher classroom notes and pedagogical tags into customized bilingual progress reports, eliminating up to 15 hours of manual data entry weekly.

---

<a id="b2b-crm-case-study"></a>
## 4. PRODUCT MANAGEMENT & TRADEOFF DECISIONS (ADR LOG)

Product Managers must demonstrate strategic judgment and ROI balance, not just technical execution. Below are key tradeoffs engineered into the suite:

| Decision Area | Choice Made | Strategic Tradeoff ("Why") |
| :--- | :--- | :--- |
| **Scoring Integrity** | *Deterministic `stepIndex` Lookup over Freeform LLM Scores* | AI selects qualitative rubric step index; backend code calculates totals, eliminating math hallucinations and variance. |
| **Candidate Access** | *Stateless Magic Links with 7-Day Expiry & Token Rotation* | Eliminates applicant drop-off from forced account registrations while securing link lifetimes against reuse. |
| **Voice Session Architecture** | *Direct WebRTC with Ephemeral Tokens* | Provides clean turn handling and direct streaming while isolating session tokens server-side. |
| **Schedule Optimization** | *Hybrid TypeScript Validator + Gemini Heuristics* | Fast TypeScript rules catch 100% of hard room/teacher time collisions locally; Gemini Pro focuses purely on complex heuristic teacher workload distribution. |
| **Report Generation** | *Client-Side `@react-pdf` over Server Puppeteer* | Compiling PDFs inside client browser memory eliminates headless Chrome cold starts (>4s) and scales infinitely at $0 server compute cost. |
| **Outreach Dispatch** | *1-Click Gmail Deep Links over Background SMTP* | 1-click client-side deep links allow human sales reps to perform a 2-second quality check, protecting domain reputation from bulk spam flags. |

---

<a id="learning-diary-case-study"></a>
## 5. MULTI-TENANT WHITE-LABEL PDF ENGINE: LEARNING DIARY HUB

* **Architecture**: Touch-optimized tablet interface allowing teachers to 'Tag & Commit' physical student work in under 15 seconds.
* **Security & Isolation**: Multi-tenant PostgreSQL database via Supabase Row-Level Security (RLS), cryptographically preventing cross-school data leaks.
* **Bilingual Font Rendering**: Node.js font proxy resolves CORS font binary blockers, guaranteeing crisp Korean typography without font tofu glitches.

---

## 6. TECHNICAL ARCHITECTURE & END-TO-END DATA PIPELINE

```
                     +----------------------------------------+
                     |         React 19 / TypeScript SPA      |
                     |  (Tailwind CSS + Motion + Recharts)    |
                     +--------+----------------------+--------+
                              |                      |
                Intake Writes |                      | Secured Server Proxy (/api/*)
                              v                      v
                     +--------+---------------+  +---+--------------------+
                     |    Firebase Suite      |  |   Express / NestJS     |
                     |  (Firestore / Auth)    |  |  (WebRTC + Ephemeral)  |
                     +--------+---------------+  +---+--------+-----------+
                              |                               |
                              | Real-time Sync                | OpenAI Realtime & Gemini
                              v                               v
                     +--------+---------------+  +------------+-----------+
                     |    MariaDB / Supabase  |  |   gpt-4o / Gemini Pro  |
                     |     (AES-256-GCM)      |  |   (Deterministic Steps)|
                     +------------------------+  +------------------------+
```

### End-to-End Data Lifecycle
1. **Intake & Ingestion**: Observation logs, document camera scans, and voice audio streams enter through React 19 micro-widgets.
2. **Relational Synchronization**: Direct schema mapping writes structured records to MariaDB / Firestore / Supabase RLS with atomic transactions.
3. **Deterministic Inference**: Express/NestJS gateways route payloads to gpt-4o or Gemini for `stepIndex` rubric evaluation, schedule weaving, or OCR parsing.
4. **Secure View Delivery**: Role-gated views render results with Recharts telemetry and glassmorphism scorecards.

---

## 7. PROMPT ENGINEERING & DETERMINISTIC XML ISOLATION

To prevent prompt injection and ensure deterministic step selection:

```xml
<system_identity>
  You are an expert sales evaluator. Your evaluation must strictly select valid step indices from the provided rubric.
</system_identity>

<input_constraints>
  <candidate_transcript>${transcript}</candidate_transcript>
  <evaluation_rubric>${rubric_json_with_step_indices}</evaluation_rubric>
</input_constraints>

<instructions>
  1. For each rubric item, analyze the transcript and choose the matching stepIndex.
  2. Do not calculate numeric point totals in the LLM. Output strictly adhering to the JSON schema.
</instructions>
```

---

## 8. ACCESSIBILITY, UX & PROCESS MATURITY

### A. Accessibility Hardening
* **44px Touch Target Floor**: All interactive controls, pills, tabs, and buttons adhere strictly to the 44px minimum touch target size for mobile reliability.
* **Accessible Modal Dialogs**: Eliminated non-accessible native browser calls (`window.alert()`, `window.confirm()`) in favor of accessible, keyboard-trappable custom dialogs.
* **WCAG AA Contrast**: Neutrals and accent colors maintain minimum 4.5:1 contrast ratios.

### B. Engineering & Process Discipline
* **Continuous Integration**: GitHub Actions automated pipeline executing `tsc --noEmit` typechecks, ESLint validation, and Vite production builds on every commit.
* **Automated Unit Testing**: Vitest test suites verifying seat-limit calculations, trial expiration boundaries, and CSV escaping security logic.

---

## 9. CONTACT & PORTFOLIO LINKS

* **Email**: [jsn.benjamin@gmail.com](mailto:jsn.benjamin@gmail.com) / [Kingjay2510@gmail.com](mailto:Kingjay2510@gmail.com)
* **Live Shipped Apps & Interactive Portfolio**:
  * [Interactive Portfolio Web App ↗](https://jason-portfolio.com/)
  * [Chekki AI Live App ↗](https://chekki-ai.vercel.app/)
  * [EduPlanner Pro Live App ↗](https://scheduling-app-five.vercel.app/)
  * [Benchmark Explorer Live App ↗](https://education-benchmark-system.vercel.app/)

---
*© Jason Benjamin. Built with a human-centered, production-first approach.*

# Jason Benjamin — AI Product Manager & Software Builder

> **Enterprise B2B SaaS Experience at VodaBi & 6 Production AI Products Shipped Independently**  
> *Bridging complex GenAI capabilities (WebRTC Voice AI, Tiered LLM Judges, OCR, Async Pipelines) with high-converting, human-centered product experiences.*

---

## 🎯 Lead Quantified Product Impact

> ### ⚡ **80% Admin Workload Reduction** & **40 Hours → <10 Minutes** Automated Operations across 6 Shipped AI Applications.

* 🎙️ **Sub-200ms Voice-AI Engine**: Built WebRTC voice simulation and evaluation engine replacing manual phone screens at VodaBi.
* ⏱️ **40h → <10m Timetable Generator**: Engineered combinatorial school scheduling engine (`EduPlanner Pro`) with "Draft & Weave" LLM constraint resolution.
* 🗣️ **1,200+ Bilingual Family Interactions**: Shipped `Chekki AI`, an instant mobile worksheet scanner overlay cutting homework prep from 30m to <5s.
* 🛡️ **Zero API Key Exposure & Injection Defense**: Server-side API proxy architecture with Helmet CSP, express-rate-limit, and XML prompt-variable isolation.

---

## 🛠️ Production AI Product Portfolio (Shipped Status & Live Links)

| Product | Role & Category | Live Status | Impact & Core Highlights | Live Link / Demo |
| :--- | :--- | :--- | :--- | :--- |
| **[VodaBi Voice AI](./CASE_STUDY.md)** | Full-Stack B2B SaaS | 🟢 **Featured Case Study** | **Sub-200ms WebRTC voice simulation** with NestJS, server-side VAD, gpt-4o 11-point rubric judge & BANTCQ sales telemetry. | [Deep-Dive Case Study](./CASE_STUDY.md) |
| **[EduPlanner Pro](https://scheduling-app-five.vercel.app/)** | AI Operations Engine | 🟢 **Live Shipped App** | **40h → <10m timetable generator** with recursive "Draft & Weave" LLM constraint resolution. | [Launch Live App ↗](https://scheduling-app-five.vercel.app/) |
| **[Chekki AI](https://chekki-ai.vercel.app/)** | EdTech OCR & Scanner | 🟢 **Live Shipped App** | **Instant mobile camera worksheet scanner** delivering bilingual learning guides under zero-memory privacy bounds. | [Launch Live App ↗](https://chekki-ai.vercel.app/) |
| **[Automated Report Generator](#)** | Relational Pipeline | 🟢 **Production Pipeline** | **15+ hours/week saved** using Airtable + Make.com + Fillout + Softr client portals for automated student reports. | [Pipeline Writeup](./CASE_STUDY.md) |
| **[Benchmark Explorer](https://education-benchmark-system.vercel.app/)** | Assessment Portal | 🟢 **Live Shipped App** | **Visual skill-mapping portal** converting raw scores into CEFR/Cambridge YLE mastery trajectories. | [Launch Live App ↗](https://education-benchmark-system.vercel.app/) |
| **[B2B Lead Enrichment CRM](#)** | Sales Automation | 🟢 **Production CRM** | **4x response rate boost** parsing regional directories, cleaning HTML, and synthesizing 1-click Gmail outreach links. | [CRM Case Study](./CASE_STUDY.md) |

---

## 🛡️ Production Hardening & Reliability Maturity

Unlike standard AI prototypes, this suite is engineered with strict production security and operational reliability:

* 🔐 **Server-Side Key Isolation**: All Gemini and OpenAI Realtime API calls are proxied through Node.js `/api/*` routes. Raw secrets are never exposed to browser client JS.
* 🔒 **Atomic Firestore Transactions**: Invite redemptions and seat-limit allocations are wrapped in `runTransaction()` blocks to prevent double-spend race conditions.
* 🛡️ **CORS & Rate Limiting**: Protected with `express-rate-limit` (100 req/15min) and strict origin allowlists shielding endpoints from abuse.
* 📊 **Sentry Telemetry Monitoring**: Integrated Sentry error tracking on client and server to catch runtime stack traces without logging user PII.
* ♿ **Accessibility & UX Hardening**: Enforced 44px touch target minimums, keyboard traps, and accessible themed modals replacing native `alert()`/`confirm()` dialogs.
* 🧪 **CI/CD & Unit Test Discipline**: GitHub Actions pipeline enforcing automated `tsc` typecheck, ESLint, and Vitest suite validating seat limits and CSV escaping logic.

---

## 💡 Product Strategy & Tradeoffs ("The Why")

* **Zero-Friction Magic Links**: Replaced mandatory account signups with stateless magic link authentication, reducing candidate screening drop-off by **70%**.
* **Tiered Model Cost Routing**: Used lightweight `gemini-3-flash` ($0.00015/req) for free tiers and baseline drafting while reserving high-reasoning `gemini-3-pro` ($0.003/req) for complex conflict resolution and paid tiers (**>85% gross margins**).
* **7-Day Trial Optimization**: Aligned trial windows with weekly school planning cycles, creating conversion urgency that increased paid transitions by **35%**.

---

## 📖 Deep-Dive Documentation

* 📄 **[CASE_STUDY.md](./CASE_STUDY.md)** — Comprehensive architectural case study detailing WebRTC voice pipelines, prompt engineering, monetization systems, and production hardening.
* 🛡️ **[SYSTEM_AUDIT.md](./SYSTEM_AUDIT.md)** — Security audit covering CSP policies, key rotation, rate limiting, and fail-closed admin RBAC.

---

## 📫 Contact & Resume

* **Email**: [jsn.benjamin@gmail.com](mailto:jsn.benjamin@gmail.com) / [Kingjay2510@gmail.com](mailto:Kingjay2510@gmail.com)
* **Live Portfolio App**: Launch the interactive web app locally or via Cloud Run deployment to explore live interactive prototypes, case study modals, and resume viewer.

---
*© Jason Benjamin. Built with a human-centered, production-first approach.*

# Jason Benjamin — AI Product Engineer

Source for [jason-portfolio.com](https://www.jason-portfolio.com/).

I build AI products for Korean English academies, taking them from the first teacher interview to the App Store. I have 10+ years in Korean classrooms and have built six AI products solo. At VodaBi I build the frontend, backend and database of a voice-AI sales training platform.

## Selected work

| Project | What it is | Status |
| :--- | :--- | :--- |
| **VodaBi** (work project) | Voice-AI sales training and evaluation platform: realtime roleplay calls over direct WebRTC, two-step rubric grading (score first, then explain), staff and manager dashboards. | Built, rolling out with two enterprise clients |
| **[Chekki AI](https://chekki-ai.vercel.app/)** | Homework grading for Korean ESL academies. A camera scan is graded against the teacher's own answer key, with bilingual explanations for parents. [App Store](https://apps.apple.com/us/app/chekkiai/id6759361725) · [Google Play](https://play.google.com/store/apps/details?id=com.chekkiai.app) | Live |
| **[Chekki Schools](https://www.chekkiai.com/schools)** | The staff side of Chekki: separate logins for directors, foreign teachers and Korean teachers, curriculum pre-seeding, voice-first class logs. | Final testing ahead of a pilot |

## Side projects

| Project | What it is | Status |
| :--- | :--- | :--- |
| **[Hagwon AI Readiness Index](https://ai-readiness.chekkiai.com)** | Bilingual self-assessment quiz that emails a personalised report and feeds the Chekki sales funnel. | Live |
| **[BridgeRecruit](https://bridgerecruit-demo.vercel.app/)** | Outlook add-in and pipeline dashboard for international school admissions. | Live demo |
| **[EduPlanner Pro](https://scheduling-app-five.vercel.app/)** | School timetabling: a TypeScript solver enforces hard constraints, and a reasoning model resolves the conflicts that remain. | Live MVP |
| **[Benchmark Explorer](https://education-benchmark-system.vercel.app/)** | Turns raw assessment scores into CEFR and Cambridge YLE skill maps. | Live MVP |
| Learning Diary Hub | Classroom photos and tags compiled into print-ready PDF portfolios. | In progress |
| B2B lead-enrichment CRM | Finds and deduplicates regional academies and drafts personalised outreach. | Internal |

Each project has a full case study on the site: the problem, what I built, the decisions and tradeoffs, and the stack.

## How claims are handled

- VodaBi has no production metrics yet, so none are quoted.
- Client identifiers are removed under NDA.
- Outcomes are labelled as measured, estimated or target, and estimates come with their method.

## This repo

React 19 + Vite, Tailwind CSS compiled at build time, Pretendard font. `npm run build` pre-renders every URL (`/`, `/ko`, `/case/<id>`, `/ko/case/<id>`) with its own title, description and hreflang tags, and generates `sitemap.xml` and `llms.txt`, so crawlers, link previews and AI tools can read the site without JavaScript. `npx tsx scripts/check-routes.tsx` checks the URL parsing. Vercel Web Analytics records page views and a few events (case study opened, résumé opened, email clicked). A small Express API (`api/`) handles the feedback form through Resend.

```bash
npm install
cp .env.example .env   # RESEND_API_KEY, only needed for the feedback form
npm run dev            # http://localhost:3000
npm run build
```

## Contact

[jsn.benjamin@gmail.com](mailto:jsn.benjamin@gmail.com) · [LinkedIn](https://www.linkedin.com/in/jason-benjamin/)

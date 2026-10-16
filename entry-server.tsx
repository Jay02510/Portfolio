import React from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import App, { CASE_IDS, pathFor } from './App.tsx';
import { studyDataEn, studyDataKo } from './components/caseStudyData.ts';

// Used only at build time by scripts/prerender.mjs to bake each page's HTML
// into dist/, so crawlers, link previews and AI tools that don't run
// JavaScript can read the portfolio. prerender (unlike renderToString) waits
// for the lazy-loaded case study viewer.
export async function render(url: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(<App initialPath={url} />);
  let html = '';
  for await (const chunk of prelude) html += chunk;
  return html;
}

const clip = (s: string, n = 160) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);

export function pages() {
  const home = {
    en: { title: 'Jason Benjamin — AI Product Engineer', description: 'Full-stack engineer shipping production LLM apps. Sole developer of a voice-AI sales training platform at VodaBi; builder of six AI education products for Korea.' },
    ko: { title: 'Jason Benjamin — AI 프로덕트 엔지니어', description: '한국 교사와 학부모를 위한 AI 제품을 설계하고 개발하는 AI 프로덕트 엔지니어. 한국 영어 학원 10년 이상, AI 제품 6개 단독 개발.' },
  };
  return (['en', 'ko'] as const).flatMap(locale => [
    { path: pathFor(locale, null), locale, caseId: null as string | null, ...home[locale] },
    ...CASE_IDS.map(id => {
      const study = (locale === 'en' ? studyDataEn : studyDataKo)[id];
      return { path: pathFor(locale, id), locale, caseId: id as string | null, title: `${study.title} | Jason Benjamin`, description: clip(study.tagline) };
    }),
  ]);
}

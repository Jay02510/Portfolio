import React from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import App, { CASE_IDS, pathFor } from './App.tsx';
import { studyDataEn, studyDataKo } from './components/caseStudyData.ts';
import type { CaseStudyType } from './types.ts';

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

const SITE = 'https://www.jason-portfolio.com';
const PERSON = { '@id': `${SITE}/#person` };
const abs = (u: string) => (u.startsWith('http') ? u : SITE + u);

// Plain-text version of a case study for llms-full.txt.
function caseText(study: CaseStudyType) {
  const list = (head: string, items?: string[]) => (items?.length ? `\n${head}\n${items.map(i => `- ${i}`).join('\n')}\n` : '');
  return [
    `## ${study.title}`,
    study.tagline,
    study.meta ? `Role: ${study.meta.role}. Team: ${study.meta.team ?? 'n/a'}. Status: ${study.meta.status}.` : '',
    list('Key numbers', study.stats.map(st => `${st.label}: ${st.value}${st.detail ? ` (${st.detail})` : ''}`)),
    list('Problem', study.problem),
    list('What was built', study.solution),
    list('Decisions', study.decisions?.map(d => `${d.decision}. Instead of: ${d.alternativeConsidered}. Why: ${d.why} Tradeoff: ${d.tradeOffAccepted}`)),
    list('Impact', study.impact.value),
    `Stack: ${study.stack.join(', ')}`,
  ].filter(Boolean).join('\n');
}

function caseJsonLd(id: string, study: CaseStudyType, url: string, locale: string, image: string) {
  const ld: object[] = [
    {
      '@context': 'https://schema.org', '@type': 'Article', headline: study.title.slice(0, 110), description: study.tagline,
      url, inLanguage: locale, image, author: PERSON, isPartOf: { '@type': 'WebSite', url: `${SITE}/` },
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Jason Benjamin', item: `${SITE}${locale === 'ko' ? '/ko' : '/'}` },
        { '@type': 'ListItem', position: 2, name: study.title, item: url },
      ],
    },
  ];
  if (id === 'chekki') {
    ld.push({
      '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Chekki AI', operatingSystem: 'iOS, Android, Web',
      applicationCategory: 'EducationalApplication', url: study.liveUrl, author: PERSON,
      sameAs: ['https://apps.apple.com/us/app/chekkiai/id6759361725', 'https://play.google.com/store/apps/details?id=com.chekkiai.app'],
    });
    if (study.walkthroughVideo) ld.push({
      '@context': 'https://schema.org', '@type': 'VideoObject', name: 'Chekki AI: scan, grade and explain homework',
      description: 'A worksheet is scanned, graded against the teacher\'s answer key, and each mistake is explained in Korean for the parent.',
      thumbnailUrl: abs(study.walkthroughPoster ?? image), contentUrl: abs(study.walkthroughVideo), uploadDate: '2026-11-03', duration: 'PT30S',
    });
  }
  return ld;
}

export function pages() {
  const home = {
    en: { title: 'Jason Benjamin — AI Product Engineer', description: 'Full-stack engineer shipping production LLM apps. Sole developer of a voice-AI sales training platform at VodaBi; builder of six AI education products for Korea.' },
    ko: { title: 'Jason Benjamin — AI 프로덕트 엔지니어', description: '한국 교사와 학부모를 위한 AI 제품을 설계하고 개발하는 AI 프로덕트 엔지니어. 한국 영어 학원 10년 이상, AI 제품 6개 단독 개발.' },
  };
  return (['en', 'ko'] as const).flatMap(locale => [
    {
      path: pathFor(locale, null), locale, caseId: null as string | null, ...home[locale], image: null as string | null, text: '',
      jsonLd: [{ '@context': 'https://schema.org', '@type': 'ProfilePage', url: SITE + pathFor(locale, null), inLanguage: locale, mainEntity: PERSON }] as object[],
    },
    ...CASE_IDS.map(id => {
      const study = (locale === 'en' ? studyDataEn : studyDataKo)[id];
      const raster = study.screenshots?.find(sc => !sc.url.endsWith('.svg'))?.url ?? study.walkthroughPoster;
      const image = raster ? abs(raster) : `${SITE}/og.jpg`;
      const path = pathFor(locale, id);
      return {
        path, locale, caseId: id as string | null, title: `${study.title} | Jason Benjamin`, description: clip(study.tagline),
        image: raster ? image : null, text: caseText(study), jsonLd: caseJsonLd(id, study, SITE + path, locale, image),
      };
    }),
  ]);
}

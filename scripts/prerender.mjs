// Build-time prerender: renders <App /> once per URL (/, /ko, /case/<id>,
// /ko/case/<id>), writes each to dist/<path>/index.html with its own title,
// description, canonical and hreflang tags, then generates sitemap.xml and
// llms.txt from the same page list. The browser still runs the normal React
// app on top; this just means every URL has real HTML.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SITE = 'https://www.jason-portfolio.com';
const root = process.cwd();
const dist = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const marker = '<div id="root"></div>';
if (!template.includes(marker)) {
  console.error('[prerender] <div id="root"></div> not found in dist/index.html; skipping.');
  process.exit(0);
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const setAttr = (html, re, value) => html.replace(re, (_, a, b) => `${a}${esc(value)}${b}`);

try {
  const { render, pages } = await import(pathToFileURL(ssrEntry).href);
  const list = pages();

  for (const page of list) {
    const url = SITE + (page.path === '/' ? '/' : page.path);
    const twin = list.find(p => p.caseId === page.caseId && p.locale !== page.locale);
    const alternates = [page, twin]
      .map(p => `<link rel="alternate" hreflang="${p.locale}" href="${SITE}${p.path}" />`)
      .concat(`<link rel="alternate" hreflang="x-default" href="${SITE}${page.locale === 'en' ? page.path : twin.path}" />`)
      .join('\n    ');

    let html = template;
    html = html.replace(/<html lang="[^"]*"/, `<html lang="${page.locale}"`);
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(page.title)}</title>`);
    html = setAttr(html, /(<meta name="description" content=")[^"]*(")/, page.description);
    html = setAttr(html, /(<meta property="og:title" content=")[^"]*(")/, page.title);
    html = setAttr(html, /(<meta property="og:description" content=")[^"]*(")/, page.description);
    html = setAttr(html, /(<meta property="og:url" content=")[^"]*(")/, url);
    html = setAttr(html, /(<link rel="canonical" href=")[^"]*(")/, url);
    html = html.replace('</head>', `    ${alternates}\n  </head>`);

    const appHtml = await render(page.path);
    if (!appHtml || appHtml.length < 500) throw new Error(`rendered HTML for ${page.path} looks empty`);
    html = html.replace(marker, `<div id="root">${appHtml}</div>`);

    const out = path.join(dist, page.path, 'index.html');
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${list.map(page => {
  const twin = list.find(p => p.caseId === page.caseId && p.locale !== page.locale);
  return `  <url>
    <loc>${SITE}${page.path}</loc>
    <xhtml:link rel="alternate" hreflang="${page.locale}" href="${SITE}${page.path}" />
    <xhtml:link rel="alternate" hreflang="${twin.locale}" href="${SITE}${twin.path}" />
  </url>`;
}).join('\n')}
</urlset>
`;
  fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

  const en = list.filter(p => p.locale === 'en');
  const llms = `# Jason Benjamin — AI Product Engineer

> AI product engineer in South Korea, open to remote. 10+ years in Korean English academies, six AI products built solo, and the frontend, backend and database of a voice-AI sales training platform at VodaBi. Looking for AI PM, product engineer or hybrid roles on 0→1 teams.

- Email: jsn.benjamin@gmail.com
- LinkedIn: https://www.linkedin.com/in/jason-benjamin/
- GitHub: https://github.com/Jay02510
- Résumé (PDF): ${SITE}/resume/Jason_Benjamin_Resume_EN.pdf
- Languages: English (native), Korean (professional working)

## Case studies

${en.filter(p => p.caseId).map(p => `- [${p.title.replace(' | Jason Benjamin', '')}](${SITE}${p.path}): ${p.description}`).join('\n')}

## Notes on claims

VodaBi has no production metrics yet, so none are quoted. Client identifiers are removed under NDA. Outcomes on the site are labelled measured, estimated or target.

## Korean

Every page has a Korean version under ${SITE}/ko
`;
  fs.writeFileSync(path.join(dist, 'llms.txt'), llms);

  console.log(`[prerender] wrote ${list.length} pages, sitemap.xml and llms.txt`);
} catch (err) {
  // Never fail the deploy over prerendering; the SPA still works without it.
  console.error('[prerender] failed, shipping the plain SPA instead:', err);
} finally {
  fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
}

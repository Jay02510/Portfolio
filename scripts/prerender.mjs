// Build-time prerender: renders <App /> to HTML and injects it into
// dist/index.html inside <div id="root">. The browser still runs the normal
// React app on top; this just means the HTML is no longer empty.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const distHtml = path.join(root, 'dist', 'index.html');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const html = fs.readFileSync(distHtml, 'utf8');
const marker = '<div id="root"></div>';
if (!html.includes(marker)) {
  console.error('[prerender] <div id="root"></div> not found in dist/index.html; skipping.');
  process.exit(0);
}

try {
  const { render } = await import(pathToFileURL(ssrEntry).href);
  const appHtml = render();
  if (!appHtml || appHtml.length < 500) throw new Error('rendered HTML looks empty');
  fs.writeFileSync(distHtml, html.replace(marker, `<div id="root">${appHtml}</div>`));
  console.log(`[prerender] injected ${Math.round(appHtml.length / 1024)} KB of HTML into dist/index.html`);
} catch (err) {
  // Never fail the deploy over prerendering; the SPA still works without it.
  console.error('[prerender] failed, shipping the plain SPA instead:', err);
} finally {
  fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
}

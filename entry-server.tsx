import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';

// Used only at build time by scripts/prerender.mjs to bake the page's HTML
// into dist/index.html, so crawlers, link previews and AI tools that don't
// run JavaScript can read the portfolio.
export function render(): string {
  return renderToString(<App />);
}

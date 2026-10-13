import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Production builds ship the page pre-rendered (scripts/prerender.mjs), so
// hydrate that HTML instead of throwing it away. Dev has an empty root.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}

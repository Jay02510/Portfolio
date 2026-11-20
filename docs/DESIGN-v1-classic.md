# Design v1 "Classic" — pre-redesign snapshot (2026-11-21)

Full source is frozen at git tag `design-v1-classic` (commit d544f0c).

Restore everything:   git checkout design-v1-classic -- .
Restore one file:     git checkout design-v1-classic -- App.tsx
Diff against it:      git diff design-v1-classic

## Tokens (index.html :root, light theme via body.light)
| Token | Dark | Light |
|---|---|---|
| --surface-canvas | #14171d | #faf9f6 |
| --surface-panel | #15181e | #ffffff |
| --surface-card | #181c24 | #f3f4f6 |
| --surface-overlay | rgba(20,23,29,.85) | rgba(255,255,255,.9) |
| --ink-primary | #faf9f6 | #14171d |
| --ink-secondary | #a3acb9 | #4b5563 |
| --ink-muted | #848e9c | #6b7280 |
| --hairline | rgba(255,255,255,.08) | rgba(0,0,0,.08) |
| --accent-gold | #e2b87d | #b38234 |
| --accent-clay | #8c6239 | #8c6239 |
| --status-red / green | #f87171 / #4ade80 | #b91c1c / #15803d |

Focus ring: 2px solid #e2b87d, offset 2px. Body line-height 1.6, antialiased.

## Type
- Pretendard Variable for both sans and display (Korean fallbacks: Apple SD Gothic Neo, Noto Sans KR).
- H1: 3xl / 4xl / 5xl / 4.1rem, semibold, leading 1.06, tracking-tight, text-balance.
- H2: 2xl–4xl, medium/semibold, tracking-tight. H3 (cards): xl–2xl medium.

## Layout (App.tsx)
- main: max-w 1180px, px-6 / md:px-10.
- Hero: 2-col grid 1.55fr / 1fr, pt-16–20.
- Stat strip: bordered 3-col.
- Sections in order: #work (case studies), principles, #more, #log, #contact.
- Motion: `motion` lib; videos lazy-play on screen, poster under reduced motion.
- Dark default with light toggle.

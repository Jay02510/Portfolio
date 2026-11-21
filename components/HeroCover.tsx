import React, { useEffect, useRef } from 'react';

export interface OrbitItem { id: string; name: string; blurb: string; thumb: string }

interface Props {
  title: string;
  sub: string;
  ctaWork: string;
  ctaResume: string;
  nowChip: string;
  basedIn: string;
  hint: string;
  hintTouch: string;
  paused: boolean; // a dialog is open over the orbit
  items: OrbitItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onWork: (e: React.MouseEvent) => void;
  onContact: (e: React.MouseEvent) => void;
  onResume: () => void;
}

const SPIN = 5;            // idle auto-spin, deg/s
const DRAG = 0.28;         // deg per px dragged
const RY_RATIO = 0.13;     // vertical squash of the ellipse, relative to its width
const IDLE_MS = 3500;      // auto-spin resumes this long after the last interaction

// Position of card i for a ring angle. Front of the ring (cos=1) sits low, large and bright.
function place(i: number, n: number, angle: number, rx: number) {
  const t = ((i * 360) / n + angle) * (Math.PI / 180);
  const c = Math.cos(t);
  const d = (c + 1) / 2; // 0 back … 1 front
  return {
    transform: `translate(-50%, -50%) translate3d(${(Math.sin(t) * rx).toFixed(1)}px, ${(c * rx * RY_RATIO).toFixed(1)}px, 0) scale(${(0.5 + 0.5 * d).toFixed(3)})`,
    opacity: +(0.1 + 0.9 * d ** 2.5).toFixed(3),
    zIndex: Math.round(d * 100),
    // on narrow rings the side cards overlap, so only the front card keeps its caption
    label: rx < 320 ? Math.min(1, Math.max(0, (d - 0.88) / 0.1)) : 1,
  };
}

export default function HeroCover(p: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = useRef({ angle: 0, vel: 0, target: null as number | null, rx: 440, hover: false, auto: true, visible: true, reduce: false, last: 0, paused: false,
    drag: null as null | { x: number; last: number; t: number; moved: boolean; id: number } });
  const n = p.items.length;

  // Bring card i to the front by the shortest way round.
  const focus = (i: number) => {
    const st = s.current;
    const goal = -(i * 360) / n;
    const delta = ((goal - st.angle) % 360 + 540) % 360 - 180;
    st.vel = 0;
    st.auto = false;
    st.last = performance.now();
    if (st.reduce) st.angle += delta; else st.target = st.angle + delta;
  };

  // Selection from elsewhere (the project list) also brings that card round; not on first render.
  s.current.paused = p.paused;
  const prevSel = useRef(p.selectedId); // StrictMode runs effects twice, so compare ids rather than counting runs
  useEffect(() => {
    if (prevSel.current === p.selectedId) return;
    prevSel.current = p.selectedId;
    const idx = p.items.findIndex(it => it.id === p.selectedId);
    if (idx >= 0) focus(idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p.selectedId]);

  useEffect(() => {
    const st = s.current;
    const stage = stageRef.current!;
    st.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (st.reduce) st.auto = false;

    const ro = new ResizeObserver(([e]) => { st.rx = Math.min(Math.max(e.contentRect.width, window.innerWidth * 0.8) * 0.45, 620); });
    ro.observe(stage);
    const io = new IntersectionObserver(([e]) => { st.visible = e.isIntersecting; });
    io.observe(stage);

    // Trackpad swipe (horizontal wheel) spins the ring; vertical scrolling passes through.
    const wheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      st.angle -= e.deltaX * DRAG * 0.6;
      st.vel = 0; st.target = null; st.auto = false; st.last = performance.now();
    };
    stage.addEventListener('wheel', wheel, { passive: false });

    let raf = 0, prev = performance.now();
    const frame = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      if (st.visible) {
        if (st.drag) { /* angle follows the pointer */ }
        else if (st.target !== null) {
          const diff = st.target - st.angle;
          st.angle += diff * Math.min(1, dt * 7);
          if (Math.abs(diff) < 0.05) { st.angle = st.target; st.target = null; }
        } else if (Math.abs(st.vel) > 1) {
          st.angle += st.vel * dt;
          st.vel *= Math.pow(0.04, dt);
        } else if (!st.auto && !st.reduce && !st.paused && now - st.last > IDLE_MS) {
          st.auto = true;
        } else if (st.auto) {
          st.angle += SPIN * dt * (st.hover ? 0.3 : 1); // slows under the cursor so cards are easy to hit
        }
        cardRefs.current.forEach((el, i) => {
          if (!el) return;
          const pos = place(i, n, st.angle, st.rx);
          el.style.transform = pos.transform;
          el.style.opacity = String(pos.opacity);
          el.style.zIndex = String(pos.zIndex);
          el.style.setProperty('--label', String(pos.label));
        });
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); stage.removeEventListener('wheel', wheel); };
  }, [n]);

  // Horizontal drag spins the ring; a press that barely moves stays a click.
  const down = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    s.current.drag = { x: e.clientX, last: e.clientX, t: performance.now(), moved: false, id: e.pointerId };
    s.current.target = null;
  };
  const move = (e: React.PointerEvent) => {
    const st = s.current, d = st.drag;
    if (!d || d.id !== e.pointerId) return;
    if (!d.moved && Math.abs(e.clientX - d.x) > 6) {
      d.moved = true;
      st.auto = false;
      stageRef.current?.setPointerCapture(e.pointerId);
    }
    if (!d.moved) return;
    const now = performance.now();
    const step = (e.clientX - d.last) * DRAG;
    st.angle += step;
    st.last = now;
    st.vel = step / Math.max((now - d.t) / 1000, 0.008);
    d.last = e.clientX;
    d.t = now;
  };
  const up = (e: React.PointerEvent) => {
    const d = s.current.drag;
    if (!d) return;
    if (d.moved) {
      // let the click that follows a drag fall through harmlessly
      const stop = (ev: Event) => { ev.stopPropagation(); ev.preventDefault(); };
      window.addEventListener('click', stop, { capture: true, once: true });
      setTimeout(() => window.removeEventListener('click', stop, { capture: true }), 0);
      if (stageRef.current?.hasPointerCapture(e.pointerId)) stageRef.current.releasePointerCapture(e.pointerId);
    } else s.current.vel = 0;
    s.current.drag = null;
    s.current.last = performance.now();
  };

  const muted = 'text-ink-2';
  const glass = 'bg-ink/[0.06] border-ink/10 backdrop-blur-xl shadow-sm';

  return (
    <section className="relative w-screen ml-[calc(50%-50vw)] overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none bg-[radial-gradient(55%_50%_at_50%_45%,rgb(var(--rgb-gold)/0.13),transparent_70%)]" />

      <div className="relative max-w-[1180px] mx-auto px-6 md:px-10 pt-8 pb-14">
        <div className={`flex flex-wrap justify-center gap-2 text-[12px] font-medium ${muted}`}>
          <span className={`inline-flex items-center gap-2 h-8 px-3.5 rounded-full border ${glass}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#5fd48b]" />
            {p.nowChip}
          </span>
          <a href="#contact" onClick={p.onContact} className={`inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full border transition-colors hover:text-accent-gold ${glass}`}>
            {p.basedIn} <span aria-hidden>→</span>
          </a>
        </div>

        {/* stage: portrait with the project ring around it */}
        <div
          ref={stageRef}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          onPointerEnter={() => { s.current.hover = true; }}
          onPointerLeave={() => { s.current.hover = false; }}
          className="orbit-stage relative mt-4 h-[300px] sm:h-[400px] lg:h-[480px] select-none cursor-grab active:cursor-grabbing touch-pan-y"
        >
          <ul className="absolute left-1/2 top-[48%] w-0 h-0" aria-label="Projects">
            {p.items.map((it, i) => {
              const sel = it.id === p.selectedId;
              const pos = place(i, n, 0, 460);
              return (
                <li key={it.id}>
                  <button
                    ref={el => { cardRefs.current[i] = el; }}
                    onClick={() => { focus(i); p.onSelect(it.id); }}
                    onFocus={e => { if (e.currentTarget.matches(':focus-visible')) focus(i); }}
                    aria-pressed={sel}
                    style={{ transform: pos.transform, opacity: pos.opacity, zIndex: pos.zIndex }}
                    className="orbit-card group absolute left-0 top-0 w-[190px] sm:w-[280px] lg:w-[360px] text-left will-change-transform"
                  >
                    <span className={`block aspect-[16/10] rounded-[10px] overflow-hidden border transition-[border-color,box-shadow] duration-300 ${
                      sel
                        ? 'border-accent-gold shadow-[0_0_0_1px_rgba(226,184,125,0.6),0_20px_44px_-14px_rgba(0,0,0,0.6)]'
                        : `border-ink/15 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.5)] group-hover:border-accent-gold/60`
                    } bg-card`}>
                      <img src={it.thumb} alt="" draggable={false} decoding="async" className="w-full h-full object-cover object-top" />
                    </span>
                    <span style={{ opacity: 'var(--label, 1)' }} className={`mt-3 block text-center text-[13px] lg:text-[15px] font-semibold tracking-tight truncate transition-colors ${
                      sel ? 'text-ink' : 'text-ink/80'
                    }`}>
                      {it.name}
                    </span>
                    <span style={{ opacity: 'var(--label, 1)' }} className="mt-0.5 block text-center text-[11.5px] lg:text-[13px] truncate text-ink-2">
                      {it.blurb}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-10 grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-12 items-end">
          <div className="rise">
            <h1 className="font-serif text-[2.5rem] sm:text-5xl lg:text-[3.6rem] leading-[1.02] tracking-[-0.01em] text-balance">
              {p.title}
            </h1>
          </div>
          <div className="rise [animation-delay:120ms]">
            <p className={`text-[15px] leading-relaxed text-pretty ${muted}`}>{p.sub}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                onClick={p.onWork}
                className="h-[44px] px-5 rounded-full bg-accent-fill text-[#14171d] text-[13px] font-bold tracking-wide inline-flex items-center gap-2 hover:brightness-105 active:scale-95 transition-[filter,transform] duration-150"
              >
                {p.ctaWork} <span aria-hidden>→</span>
              </a>
              <button
                onClick={p.onResume}
                className={`h-[44px] px-5 rounded-full border text-[13px] font-bold tracking-wide active:scale-95 transition-[background-color,transform] duration-150 ${glass} ${
                  'text-ink hover:bg-ink/10'
                }`}
              >
                {p.ctaResume}
              </button>
              <span className="text-[12px] text-ink-3">
                <span className="hidden [@media(hover:hover)]:inline">{p.hint}</span>
                <span className="[@media(hover:hover)]:hidden">{p.hintTouch}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

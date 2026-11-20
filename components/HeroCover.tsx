import React, { useEffect, useRef } from 'react';

export interface OrbitItem { id: string; name: string; thumb: string }

interface Props {
  isDark: boolean;
  title: string;
  sub: string;
  ctaWork: string;
  ctaResume: string;
  nowChip: string;
  basedIn: string;
  hint: string;
  items: OrbitItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onWork: (e: React.MouseEvent) => void;
  onResume: () => void;
}

const SPIN = 5;            // idle auto-spin, deg/s
const DRAG = 0.28;         // deg per px dragged
const RY_RATIO = 0.18;     // vertical squash of the ellipse, relative to its width

// Position of card i for a ring angle. Front of the ring (cos=1) sits low and in front of the portrait.
function place(i: number, n: number, angle: number, rx: number) {
  const t = ((i * 360) / n + angle) * (Math.PI / 180);
  const c = Math.cos(t);
  const d = (c + 1) / 2; // 0 back … 1 front
  return {
    transform: `translate(-50%, -50%) translate3d(${(Math.sin(t) * rx).toFixed(1)}px, ${(c * rx * RY_RATIO).toFixed(1)}px, 0) scale(${(0.56 + 0.44 * d).toFixed(3)})`,
    opacity: +(0.3 + 0.7 * d).toFixed(3),
    zIndex: (c > 0 ? 101 : 0) + Math.round(d * 99), // portrait sits at 100
  };
}

export default function HeroCover(p: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = useRef({ angle: 0, vel: 0, target: null as number | null, rx: 440, hover: false, auto: true, visible: true, reduce: false,
    drag: null as null | { x: number; last: number; t: number; moved: boolean; id: number } });
  const n = p.items.length;

  // Bring card i to the front by the shortest way round.
  const focus = (i: number) => {
    const st = s.current;
    const goal = -(i * 360) / n;
    const delta = ((goal - st.angle) % 360 + 540) % 360 - 180;
    st.vel = 0;
    st.auto = false;
    if (st.reduce) st.angle += delta; else st.target = st.angle + delta;
  };

  // Selection from elsewhere (the project list) also brings that card round; not on first render.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    const idx = p.items.findIndex(it => it.id === p.selectedId);
    if (idx >= 0) focus(idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p.selectedId]);

  useEffect(() => {
    const st = s.current;
    const stage = stageRef.current!;
    st.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (st.reduce) st.auto = false;

    const ro = new ResizeObserver(([e]) => { st.rx = Math.min(e.contentRect.width * 0.46, 560); });
    ro.observe(stage);
    const io = new IntersectionObserver(([e]) => { st.visible = e.isIntersecting; });
    io.observe(stage);

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
        } else if (st.auto) {
          st.angle += SPIN * dt * (st.hover ? 0.3 : 1); // slows under the cursor so cards are easy to hit
        }
        cardRefs.current.forEach((el, i) => {
          if (!el) return;
          const pos = place(i, n, st.angle, st.rx);
          el.style.transform = pos.transform;
          el.style.opacity = String(pos.opacity);
          el.style.zIndex = String(pos.zIndex);
        });
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
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
  };

  const muted = p.isDark ? 'text-[#a3acb9]' : 'text-[#4b5563]';
  const glass = p.isDark ? 'bg-white/[0.06] border-white/10 backdrop-blur-xl' : 'bg-white/70 border-black/10 backdrop-blur-xl shadow-sm';

  return (
    <section className="relative w-screen ml-[calc(50%-50vw)] overflow-hidden">
      <div aria-hidden className={`absolute inset-0 pointer-events-none ${
        p.isDark
          ? 'bg-[radial-gradient(55%_50%_at_50%_45%,rgba(226,184,125,0.13),transparent_70%)]'
          : 'bg-[radial-gradient(55%_50%_at_50%_45%,rgba(179,130,52,0.12),transparent_70%)]'
      }`} />

      <div className="relative max-w-[1180px] mx-auto px-6 md:px-10 pt-8 pb-14">
        <div className={`flex flex-wrap justify-center gap-2 text-[12px] font-medium ${muted}`}>
          <span className={`inline-flex items-center gap-2 h-8 px-3.5 rounded-full border ${glass}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#5fd48b] animate-pulse" />
            {p.nowChip}
          </span>
          <span className={`inline-flex items-center h-8 px-3.5 rounded-full border ${glass}`}>{p.basedIn}</span>
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
          className="orbit-stage relative mt-4 h-[360px] sm:h-[440px] lg:h-[500px] select-none cursor-grab active:cursor-grabbing touch-pan-y"
        >
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[200px] sm:w-[250px] lg:w-[290px] aspect-[4/5] z-[100] hero-portrait pointer-events-none">
            <img
              src="/images/jason-benjamin.webp"
              alt="Jason Benjamin"
              width={410}
              height={525}
              fetchPriority="high"
              draggable={false}
              className="w-full h-full object-cover object-top rounded-t-full"
            />
          </div>

          <ul className="absolute left-1/2 top-[64%] w-0 h-0" aria-label="Projects">
            {p.items.map((it, i) => {
              const sel = it.id === p.selectedId;
              const pos = place(i, n, 0, 440);
              return (
                <li key={it.id}>
                  <button
                    ref={el => { cardRefs.current[i] = el; }}
                    onClick={() => { focus(i); p.onSelect(it.id); }}
                    onFocus={e => { if (e.currentTarget.matches(':focus-visible')) focus(i); }}
                    aria-pressed={sel}
                    style={pos}
                    className="orbit-card group absolute left-0 top-0 w-[128px] sm:w-[160px] lg:w-[212px] text-left will-change-transform"
                  >
                    <span className={`block aspect-[16/10] rounded-[10px] overflow-hidden border transition-[border-color,box-shadow] duration-300 ${
                      sel
                        ? 'border-accent-gold shadow-[0_0_0_1px_rgba(226,184,125,0.6),0_20px_44px_-14px_rgba(0,0,0,0.6)]'
                        : `${p.isDark ? 'border-white/15' : 'border-black/10'} shadow-[0_18px_40px_-14px_rgba(0,0,0,0.5)] group-hover:border-accent-gold/60`
                    } ${p.isDark ? 'bg-[#1a1e26]' : 'bg-white'}`}>
                      <img src={it.thumb} alt="" draggable={false} decoding="async" className="w-full h-full object-cover object-top" />
                    </span>
                    <span className={`mt-2 block text-center text-[11.5px] lg:text-[12.5px] font-semibold tracking-tight truncate transition-colors ${
                      sel ? 'text-accent-gold' : p.isDark ? 'text-white/85' : 'text-black/80'
                    }`}>
                      {it.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-10 grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-12 items-end">
          <div className="rise">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-accent-gold">Jason Benjamin</p>
            <h1 className="mt-3 font-serif text-[2.5rem] sm:text-5xl lg:text-[3.6rem] leading-[1.02] tracking-[-0.01em] text-balance">
              {p.title}
            </h1>
          </div>
          <div className="rise [animation-delay:120ms]">
            <p className={`text-[15px] leading-relaxed text-pretty ${muted}`}>{p.sub}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                onClick={p.onWork}
                className="h-[44px] px-5 rounded-full bg-accent-gold text-[#14171d] text-[13px] font-bold tracking-wide inline-flex items-center gap-2 hover:brightness-105 active:scale-95 transition-[filter,transform] duration-150"
              >
                {p.ctaWork} <span aria-hidden>→</span>
              </a>
              <button
                onClick={p.onResume}
                className={`h-[44px] px-5 rounded-full border text-[13px] font-bold tracking-wide active:scale-95 transition-[background-color,transform] duration-150 ${glass} ${
                  p.isDark ? 'text-white hover:bg-white/10' : 'text-black hover:bg-white'
                }`}
              >
                {p.ctaResume}
              </button>
              <span className={`hidden sm:inline text-[12px] ${p.isDark ? 'text-[#848e9c]' : 'text-[#6b7280]'}`}>{p.hint}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { ExternalLinkIcon, ChevronDownIcon } from './Icons.tsx';
import type { FeaturedProject } from '../App.tsx';

// Muted loop that only downloads and plays while on screen; stays on its poster for reduced motion.
function LoopVideo({ src, poster, label }: { src: string; poster?: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // React leaves `muted` out of server HTML, which blocks autoplay
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, [src]);
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" aria-label={label} className="w-full h-full object-contain" />;
}

interface Props {
  project: FeaturedProject;
  isDark: boolean;
  locale: 'en' | 'ko';
  ownedLabel: string;
  decisionsLabel: string;
  caseHref: string;
  onOpenCase: (id: string) => void;
}

export default function ProjectCard({ project, isDark, locale, ownedLabel, decisionsLabel, caseHref, onOpenCase }: Props) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [project.id]);

  const muted = isDark ? 'text-[#848e9c]' : 'text-[#6b7280]';
  const sec = isDark ? 'text-[#a3acb9]' : 'text-[#4b5563]';
  const line = isDark ? 'border-white/10' : 'border-black/10';
  const hasDetail = project.owned.length > 0 || project.decisions.length > 0;

  return (
    <article className={`border rounded-2xl overflow-hidden ${isDark ? 'bg-[#1a1e26] border-white/10' : 'bg-white border-black/10 shadow-sm'}`}>
      <div className={`grid grid-cols-1 ${project.image ? 'lg:grid-cols-[0.9fr_1.1fr]' : ''}`}>
        {project.image && (
          <div className={`aspect-video lg:aspect-auto h-full overflow-hidden border-b lg:border-b-0 lg:border-r relative p-8 ${
            isDark ? 'bg-[#101319] border-white/10' : 'bg-[#f2f1ec] border-black/10'
          }`}>
            {project.video ? (
              <LoopVideo src={project.video} poster={project.image} label={project.title} />
            ) : (
              <img
                src={project.image}
                srcSet={project.image.endsWith('.webp') && project.image.includes('/screenshots/') ? `${project.image.replace('.webp', '-720.webp')} 720w, ${project.image} 1440w` : undefined}
                sizes="(min-width: 1024px) 480px, calc(100vw - 112px)"
                alt={project.title}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            )}
          </div>
        )}

        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`text-[11px] font-bold tracking-widest uppercase ${muted}`}>{project.context}</span>
              <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-md bg-accent-gold/15 text-accent-gold border border-accent-gold/25">
                {project.status}
              </span>
            </div>

            <h3 className="mt-3 text-xl md:text-2xl font-display font-medium tracking-tight leading-snug">{project.title}</h3>
            {project.proof && <p className="mt-2 text-sm font-semibold text-accent-gold">{project.proof}</p>}
            <p className={`mt-3 text-sm md:text-[14.5px] leading-relaxed ${sec}`}>{project.problem}</p>

            {hasDetail && (
              <>
                <button
                  onClick={() => setOpen(o => !o)}
                  aria-expanded={open}
                  className={`mt-6 pt-5 border-t w-full flex items-center justify-between gap-3 text-left ${line}`}
                >
                  <span className={`text-xs font-bold tracking-widest uppercase ${muted}`}>
                    {locale === 'en' ? 'What I built & why' : '무엇을, 왜 만들었는지'}
                  </span>
                  <ChevronDownIcon className={`w-3.5 h-3.5 shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-accent-gold' : muted}`} />
                </button>

                {/* grid-rows 0fr→1fr animates height without measuring */}
                <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden" inert={!open}>
                    <h4 className={`mt-4 text-xs font-bold tracking-widest uppercase ${muted}`}>{ownedLabel}</h4>
                    <ul className="mt-3 space-y-2">
                      {project.owned.map((item, i) => (
                        <li key={i} className="text-xs md:text-[13.5px] leading-relaxed flex items-start gap-2.5">
                          <span className="text-accent-gold shrink-0">—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={`mt-6 pt-5 border-t ${line}`}>
                      <h4 className={`text-xs font-bold tracking-widest uppercase ${muted}`}>{decisionsLabel}</h4>
                      <div className="mt-3 space-y-3.5">
                        {project.decisions.map((d, i) => (
                          <div key={i} className="text-xs md:text-[13px] leading-relaxed">
                            <div className="font-semibold text-accent-gold">{d.choice}</div>
                            <div className={`mt-0.5 ${sec}`}>{d.why}</div>
                            <div className={`mt-0.5 italic ${muted}`}>{d.tradeoff}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.stack.map((tech, i) => (
                <span key={i} className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                  isDark ? 'border-white/10 text-[#a3acb9] bg-white/[0.02]' : 'border-black/10 text-[#4b5563] bg-black/[0.02]'
                }`}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className={`mt-6 pt-5 border-t flex flex-wrap items-center gap-3 ${line}`}>
            <a
              href={caseHref}
              onClick={(e) => { e.preventDefault(); onOpenCase(project.id); }}
              className={`h-[40px] px-4 rounded-full font-bold text-xs tracking-wider inline-flex items-center transition-[background-color,transform] active:scale-95 ${
                isDark ? 'bg-white text-[#14171d] hover:bg-white/90' : 'bg-[#14171d] text-white hover:bg-black/90'
              }`}
            >
              {locale === 'en' ? 'Read the case study ↗' : '케이스 스터디 읽기 ↗'}
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`h-[40px] px-4 rounded-full border text-xs font-semibold tracking-wider inline-flex items-center gap-1.5 transition-[background-color,transform] active:scale-95 ${
                  isDark ? 'border-white/15 text-white/80 hover:bg-white/5' : 'border-black/15 text-black/80 hover:bg-black/5'
                }`}
              >
                <span>{locale === 'en' ? 'Open live app' : '라이브 앱 열기'}</span>
                <ExternalLinkIcon className="w-3.5 h-3.5" />
              </a>
            )}
            {project.stores?.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`h-[40px] px-3.5 rounded-full border text-xs font-semibold tracking-wider inline-flex items-center transition-[background-color,color,transform] active:scale-95 ${
                  isDark ? 'border-white/10 text-[#a3acb9] hover:text-white hover:bg-white/5' : 'border-black/10 text-[#4b5563] hover:text-black hover:bg-black/5'
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

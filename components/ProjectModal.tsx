import React, { useEffect, useRef } from 'react';
import { ExternalLinkIcon, XIcon } from './Icons.tsx';
import type { FeaturedProject } from '../App.tsx';

// Muted loop that only plays while the dialog is open; stays on its poster for reduced motion.
function LoopVideo({ src, poster, label }: { src: string; poster?: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // React leaves `muted` out of server HTML, which blocks autoplay
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) v.play().catch(() => {});
    return () => v.pause();
  }, [src]);
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" aria-label={label} className="w-full h-full object-contain" />;
}

interface Props {
  project: FeaturedProject;
  name: string;
  open: boolean;
  isDark: boolean;
  locale: 'en' | 'ko';
  position: string; // "03 / 08"
  caseHref: string | null; // null: no case study
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
  onOpenCase: (id: string) => void;
}

// Native <dialog>: Esc, focus trap, inert page and focus return come from the browser.
export default function ProjectModal({ project, name, open, isDark, locale, position, caseHref, onClose, onStep, onOpenCase }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current!;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const muted = isDark ? 'text-[#848e9c]' : 'text-[#6b7280]';
  const sec = isDark ? 'text-[#a3acb9]' : 'text-[#4b5563]';
  const line = isDark ? 'border-white/10' : 'border-black/10';
  const ghost = `h-9 w-9 rounded-full border inline-flex items-center justify-center transition-colors ${
    isDark ? 'border-white/15 text-white/80 hover:bg-white/10' : 'border-black/15 text-black/70 hover:bg-black/5'
  }`;
  const en = locale === 'en';

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      onKeyDown={e => {
        if (e.key === 'ArrowRight') onStep(1);
        if (e.key === 'ArrowLeft') onStep(-1);
      }}
      aria-label={name}
      className={`project-modal p-0 w-[min(980px,calc(100vw-24px))] max-w-none max-h-[calc(100dvh-24px)] rounded-2xl border overflow-y-auto backdrop:bg-black/70 backdrop:backdrop-blur-sm ${
        isDark ? 'bg-[#1a1e26] border-white/10 text-[#faf9f6]' : 'bg-white border-black/10 text-[#14171d]'
      }`}
    >
      <div key={project.id} className="rise-fast grid grid-cols-1 md:grid-cols-[1fr_1.05fr]">
        {project.image && (
          <div className={`aspect-video md:aspect-auto md:min-h-[440px] p-6 md:p-8 border-b md:border-b-0 md:border-r ${line} ${isDark ? 'bg-[#101319]' : 'bg-[#f2f1ec]'}`}>
            {project.video
              ? <LoopVideo src={project.video} poster={project.image} label={project.title} />
              : <img src={project.image} alt={project.title} className="w-full h-full object-contain" />}
          </div>
        )}

        <div className="p-6 md:p-8 flex flex-col">
          <div className="flex items-center justify-between gap-3">
            <span className={`text-[11px] font-mono ${muted}`}>{position}</span>
            <div className="flex gap-2">
              <button onClick={() => onStep(-1)} aria-label={en ? 'Previous project' : '이전 프로젝트'} className={ghost}>←</button>
              <button onClick={() => onStep(1)} aria-label={en ? 'Next project' : '다음 프로젝트'} className={ghost}>→</button>
              <button onClick={onClose} aria-label={en ? 'Close' : '닫기'} className={ghost}><XIcon className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2.5 flex-wrap">
            <span className={`text-[11px] font-bold tracking-widest uppercase ${muted}`}>{project.context}</span>
            <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-accent-gold/15 text-accent-gold border border-accent-gold/25">
              {project.status}
            </span>
          </div>

          <h2 className="mt-3 font-serif text-3xl md:text-4xl leading-tight">{name}</h2>
          <p className="mt-1 text-[15px] font-semibold leading-snug">{project.title}</p>
          {project.proof && <p className="mt-4 text-sm font-semibold text-accent-gold">{project.proof}</p>}
          <p className={`mt-3 text-sm leading-relaxed ${sec}`}>{project.problem}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map(tech => (
              <span key={tech} className={`text-[11px] font-mono px-2 py-0.5 rounded border ${line} ${sec}`}>{tech}</span>
            ))}
          </div>

          <div className={`mt-auto pt-6 flex flex-wrap items-center gap-2.5`}>
            {caseHref && (
              <a
                href={caseHref}
                onClick={e => { e.preventDefault(); onOpenCase(project.id); }}
                className="h-[42px] px-5 rounded-full bg-accent-gold text-[#14171d] text-xs font-bold tracking-wider inline-flex items-center hover:brightness-105 active:scale-95 transition-[filter,transform]"
              >
                {en ? 'Read the case study →' : '케이스 스터디 읽기 →'}
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`h-[42px] px-4 rounded-full border text-xs font-semibold tracking-wider inline-flex items-center gap-1.5 transition-[background-color,transform] active:scale-95 ${
                  isDark ? 'border-white/15 text-white/85 hover:bg-white/5' : 'border-black/15 text-black/80 hover:bg-black/5'
                }`}
              >
                {en ? 'Open live app' : '라이브 앱 열기'} <ExternalLinkIcon className="w-3.5 h-3.5" />
              </a>
            )}
            {project.stores?.map(s => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`h-[42px] px-4 rounded-full border text-xs font-semibold tracking-wider inline-flex items-center transition-[background-color,color,transform] active:scale-95 ${
                  isDark ? 'border-white/10 text-[#a3acb9] hover:text-white hover:bg-white/5' : 'border-black/10 text-[#4b5563] hover:text-black hover:bg-black/5'
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </dialog>
  );
}

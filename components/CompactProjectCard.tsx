import React from 'react';
import { ExternalLinkIcon } from './Icons.tsx';

interface CompactProjectCardProps {
  project: any;
  index: number;
  theme?: 'light' | 'dark';
  locale?: 'en' | 'ko';
  onOpenCaseStudy?: (id: string) => void;
}

export const CompactProjectCard: React.FC<CompactProjectCardProps> = ({ 
  project, 
  index, 
  theme = 'dark', 
  locale = 'en',
  onOpenCaseStudy 
}) => {
  const isDark = theme === 'dark';

  return (
    <article 
      onClick={() => onOpenCaseStudy?.(project.id)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenCaseStudy?.(project.id);
        }
      }}
      aria-label={`${project.title} — ${locale === 'ko' ? '케이스 스터디 열기' : 'Open Case Study'}`}
      className={`rounded-2xl border flex flex-col group h-full cursor-pointer transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-gold outline-none ${
        isDark 
          ? 'bg-[#15181e] border-white/10 hover:border-accent-gold/40 hover:shadow-xl shadow-black/40' 
          : 'bg-white border-black/10 hover:border-accent-clay/40 hover:shadow-xl shadow-black/5'
      }`}
    >
      {/* Top Media Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-black/40 border-b border-inherit">
        <img 
          src={project.imageUrl} 
          loading="lazy"
          decoding="async"
          width="640"
          height="400"
          className={`w-full h-full object-cover ${project.imagePosition || 'object-center'} transition-transform duration-500 group-hover:scale-105 ${
            isDark ? 'opacity-90 group-hover:opacity-100' : 'opacity-95 group-hover:opacity-100'
          }`} 
          alt={project.title}
          referrerPolicy="no-referrer"
        />
        
        {/* Top Floating Badge */}
        {project.maturityBadge && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-accent-gold text-alpine-950 px-3 py-1 rounded-full text-[11px] font-bold font-mono tracking-wide shadow-md">
              {project.maturityBadge}
            </span>
          </div>
        )}

        <div className="absolute bottom-3 left-3">
          <span className={`px-2.5 py-1 text-[11px] font-mono font-semibold rounded backdrop-blur-md border ${
            isDark 
              ? 'bg-black/75 border-white/15 text-white/80' 
              : 'bg-white/90 border-black/10 text-neutral-800'
          }`}>
            Project {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Info Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 space-y-4">
        <div className="space-y-1.5">
          {project.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {project.tags.map((tag: string, tIdx: number) => (
                <span key={tIdx} className={`text-[11px] font-medium px-2.5 py-0.5 rounded ${
                  isDark ? 'bg-accent-gold/15 text-accent-gold border border-accent-gold/25' : 'bg-accent-clay/10 text-accent-clay border border-accent-clay/20'
                }`}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <h3 
            className={`text-xl font-bold font-display tracking-tight transition-colors ${
              isDark ? 'text-white group-hover:text-accent-gold' : 'text-neutral-900 group-hover:text-accent-clay'
            }`}
          >
            {project.title}
          </h3>

          {project.pmRole && (
            <div className="pt-0.5">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-medium ${
                isDark ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30' : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                {project.pmRole}
              </span>
            </div>
          )}

          <p className={`text-sm leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
            {project.description}
          </p>
        </div>

        {/* 3-Point Micro-Summary */}
        <div className={`p-4 rounded-xl border space-y-2.5 text-sm flex-1 ${
          isDark ? 'bg-black/30 border-white/10' : 'bg-neutral-50 border-black/10'
        }`}>
          {project.friction && (
            <div className="flex items-start gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600 dark:text-red-400 shrink-0 mt-0.5">
                {locale === 'ko' ? "문제" : "PROBLEM"}
              </span>
              <span className={`text-xs font-normal leading-snug line-clamp-2 ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
                {project.friction}
              </span>
            </div>
          )}

          <div className="flex items-start gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-accent-gold shrink-0 mt-0.5">
              {locale === 'ko' ? "솔루션" : "SOLUTION"}
            </span>
            <span className={`text-xs font-normal leading-snug line-clamp-2 ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
              {project.description}
            </span>
          </div>

          {project.impactLabel && project.impactValue && (
            <div className={`flex items-start gap-2 pt-2 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-green-700 dark:text-green-400 shrink-0 mt-0.5">
                {locale === 'ko' ? "성과" : "IMPACT"}
              </span>
              <span className="text-xs font-mono font-bold text-green-700 dark:text-green-400 leading-snug">
                {project.impactLabel}: {project.impactValue}
              </span>
            </div>
          )}
        </div>

        {/* Feature Pills */}
        {project.features && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.features.slice(0, 3).map((feature: string, fIdx: number) => (
              <span 
                key={fIdx} 
                className={`px-2.5 py-1 rounded font-mono text-[11px] font-medium ${
                  isDark 
                    ? 'bg-white/5 border border-white/10 text-neutral-300' 
                    : 'bg-neutral-100 border border-black/10 text-neutral-700'
                }`}
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Technical Engine detail snippet */}
        {project.engineDetails && (
          <div className={`p-3.5 rounded-xl border text-xs leading-relaxed font-mono ${
            isDark ? 'bg-black/30 border-white/10 text-accent-gold/90' : 'bg-neutral-50 border-black/10 text-accent-clay'
          }`}>
            {project.engineDetails}
          </div>
        )}

        {/* Interactive CTA Controls */}
        <div className={`pt-4 flex items-center justify-between gap-2 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenCaseStudy?.(project.id);
            }}
            className={`group rounded-full px-4 py-2 text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
              isDark 
                ? 'bg-accent-gold text-alpine-950 hover:bg-white' 
                : 'bg-accent-clay text-white hover:bg-neutral-900'
            }`}
          >
            <span>{locale === 'ko' ? "케이스 스터디" : "Case Study"}</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
          
          <div className="flex items-center gap-3">
            {(project.demoUrl || project.websiteUrl) && (
              <a 
                href={project.demoUrl || project.websiteUrl || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`flex items-center gap-1 text-xs font-bold transition-all whitespace-nowrap ${
                  isDark ? 'text-neutral-300 hover:text-accent-gold' : 'text-neutral-700 hover:text-accent-clay'
                }`}
              >
                {project.websiteUrl
                  ? (locale === 'ko' ? '실시간 실행 ↗' : 'Launch Live ↗')
                  : (locale === 'ko' ? '데모 부스 ↗' : 'Launch Demo ↗')}
              </a>
            )}

            {project.collaborationUrl && (
              <a
                href={project.collaborationUrl}
                onClick={(e) => e.stopPropagation()}
                className={`flex items-center gap-1 text-xs font-bold transition-all whitespace-nowrap ${
                  isDark ? 'text-neutral-300 hover:text-accent-gold' : 'text-neutral-700 hover:text-accent-clay'
                }`}
              >
                {locale === 'ko' ? '파일럿 신청 ↗' : 'Pilot Waitlist ↗'}
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

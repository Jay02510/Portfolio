import React from 'react';
import { ExternalLinkIcon, SparklesIcon } from './Icons.tsx';

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
  return (
    <article 
      className={`rounded-[2.2rem] border p-2 flex flex-col group h-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.015] ${
        theme === 'dark' 
          ? 'bg-neutral-900/30 border-white/5 hover:border-accent-gold/30 hover:shadow-[0_30px_70px_-15px_rgba(212,163,89,0.1)] shadow-2xl' 
          : 'bg-neutral-200/50 border-black/5 hover:border-accent-clay/20 hover:shadow-[0_30px_70px_-15px_rgba(140,98,57,0.1)] shadow-lg'
      }`}
    >
      <div className={`rounded-[1.8rem] overflow-hidden flex flex-col flex-1 h-full p-0.5 border ${
        theme === 'dark'
          ? 'bg-[#15181e] border-white/5 shadow-inner'
          : 'bg-white border-black/5 shadow-inner'
      }`}>
        {/* Thumbnail Aspect Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.6rem] border border-white/5 bg-black/40">
          <img 
            src={project.imageUrl} 
            onClick={() => onOpenCaseStudy?.(project.id)}
            className={`w-full h-full object-cover cursor-pointer ${project.imagePosition || 'object-center'} transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 ${
              theme === 'dark' ? 'opacity-85 group-hover:opacity-100' : 'opacity-95 group-hover:opacity-100'
            }`} 
            alt={project.title}
            referrerPolicy="no-referrer"
          />
          
          {/* Top Floating Badge */}
          {project.maturityBadge && (
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-accent-gold text-alpine-950 px-3.5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-xl font-mono">
                {project.maturityBadge}
              </span>
            </div>
          )}

          <div className="absolute bottom-4 left-4">
            <span className={`px-2.5 py-1 text-[8px] font-black uppercase tracking-widest rounded border font-mono ${
              theme === 'dark' 
                ? 'bg-black/70 border-white/10 text-text-sec' 
                : 'bg-white/90 border-black/5 text-alpine-950/60'
            }`}>
              Project 0{index + 1}
            </span>
          </div>
        </div>

        {/* Info Body */}
        <div className="p-6 flex flex-col flex-1 space-y-4">
          <div className="space-y-1">
            {project.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {project.tags.map((tag: string, tIdx: number) => (
                  <span key={tIdx} className={`text-[7px] md:text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                    theme === 'dark' ? 'bg-accent-gold/10 text-accent-gold border border-accent-gold/20' : 'bg-accent-clay/10 text-accent-clay border border-accent-clay/20'
                  }`}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <h3 
              onClick={() => onOpenCaseStudy?.(project.id)}
              className={`text-xl font-bold font-display tracking-tight cursor-pointer transition-colors ${
                theme === 'dark' ? 'text-white hover:text-accent-gold' : 'text-alpine-950 hover:text-accent-clay'
              }`}
            >
              {project.title}
            </h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-text-tert' : 'text-alpine-950/50'}`}>
              {project.description}
            </p>
          </div>

          <p className={`text-xs font-light leading-relaxed flex-1 ${
            theme === 'dark' ? 'text-text-sec' : 'text-alpine-950/70'
          }`}>
            {project.longDescription}
          </p>

          {/* Feature Pills */}
          {project.features && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.features.slice(0, 3).map((feature: string, fIdx: number) => (
                <span 
                  key={fIdx} 
                  className={`px-2.5 py-1 rounded font-mono text-[8px] font-bold uppercase tracking-widest ${
                    theme === 'dark' 
                      ? 'bg-white/5 border border-white/5 text-text-sec' 
                      : 'bg-black/5 border border-black/5 text-alpine-950/50'
                  }`}
                >
                  {feature}
                </span>
              ))}
            </div>
          )}

          {/* Technical Engine detail snippet */}
          {project.engineDetails && (
            <div className={`p-3.5 rounded-xl border font-mono text-[9px] leading-relaxed tracking-wide ${
              theme === 'dark' ? 'bg-black/25 border-white/5 text-accent-gold/80 shadow-inner' : 'bg-black/[0.02] border-black/5 text-accent-clay shadow-inner'
            }`}>
              {project.engineDetails}
            </div>
          )}

          {/* Interactive CTA Controls */}
          <div className="pt-4 flex items-center justify-between border-t border-white/5">
            <button 
              onClick={() => onOpenCaseStudy?.(project.id)}
              className={`group relative rounded-full pl-5 pr-3 py-2.5 text-[9px] md:text-[10px] font-black uppercase tracking-widest flex items-center justify-between gap-3 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] ${
                theme === 'dark' 
                  ? 'bg-accent-gold text-alpine-950 hover:bg-white hover:text-alpine-950 hover:shadow-lg' 
                  : 'bg-accent-clay text-white hover:bg-alpine-950 hover:text-white hover:shadow-lg'
              }`}
            >
              <span>{locale === 'ko' ? "케이스 스터디" : "Case Study"}</span>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shrink-0 ${
                theme === 'dark' ? 'bg-alpine-950/10 group-hover:bg-alpine-950/20' : 'bg-white/15 group-hover:bg-white/20'
              }`}>
                <span className="transform group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] font-bold">
                  →
                </span>
              </span>
            </button>
            
            {(project.demoUrl || project.websiteUrl) && (
              <a 
                href={project.demoUrl || project.websiteUrl || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest transition-all ${
                  theme === 'dark' ? 'text-text-sec hover:text-accent-gold' : 'text-alpine-950/60 hover:text-accent-clay'
                }`}
              >
                {project.websiteUrl 
                  ? (locale === 'ko' ? '실시간 실행 ↗' : 'Launch Live') 
                  : (locale === 'ko' ? '데모 부스 ↗' : 'Launch Demo')}
                <ExternalLinkIcon className="w-3 h-3 opacity-60" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

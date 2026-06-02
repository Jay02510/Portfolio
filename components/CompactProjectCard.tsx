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
      className={`rounded-2xl border overflow-hidden flex flex-col group h-full transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-alpine-950/20 border-white/5 hover:border-accent-gold/40 hover:shadow-2xl hover:shadow-accent-gold/5' 
          : 'bg-white border-black/5 shadow-md hover:shadow-xl hover:border-accent-clay/30'
      }`}
    >
      {/* Thumbnail Aspect Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/5 bg-black/40">
        <img 
          src={project.imageUrl} 
          onClick={() => onOpenCaseStudy?.(project.id)}
          className={`w-full h-full object-cover cursor-pointer ${project.imagePosition || 'object-center'} transition-all duration-500 group-hover:scale-105 ${
            theme === 'dark' ? 'opacity-80 group-hover:opacity-100' : 'opacity-90 group-hover:opacity-100'
          }`} 
          alt={project.title}
          referrerPolicy="no-referrer"
        />
        
        {/* Top Floating Badge */}
        {project.maturityBadge && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-accent-gold text-alpine-950 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-lg">
              {project.maturityBadge}
            </span>
          </div>
        )}

        <div className="absolute bottom-3 left-3">
          <span className={`px-2 py-1 text-[8px] font-black uppercase tracking-widest rounded border ${
            theme === 'dark' 
              ? 'bg-black/60 border-white/10 text-white/50' 
              : 'bg-white/80 border-black/5 text-alpine-950/60'
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
                <span key={tIdx} className={`text-[7px] md:text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
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
          <p className={`text-xs ${theme === 'dark' ? 'text-white/40' : 'text-alpine-950/50'}`}>
            {project.description}
          </p>
        </div>

        <p className={`text-xs font-light leading-relaxed flex-1 ${
          theme === 'dark' ? 'text-white/60' : 'text-alpine-950/70'
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
                    ? 'bg-white/5 border border-white/5 text-white/40' 
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
          <div className={`p-3.5 rounded-lg border font-mono text-[9px] leading-relaxed tracking-wide ${
            theme === 'dark' ? 'bg-black/20 border-white/5 text-accent-gold/80' : 'bg-black/[0.02] border-black/5 text-accent-clay'
          }`}>
            {project.engineDetails}
          </div>
        )}

        {/* Interactive CTA Controls */}
        <div className="pt-4 flex items-center justify-between border-t border-white/5">
          <button 
            onClick={() => onOpenCaseStudy?.(project.id)}
            className="shiny-cta py-2.5 px-4 text-[9px] font-black uppercase tracking-widest"
          >
            {locale === 'ko' ? "케이스 스터디" : "Case Study"}
          </button>
          
          {(project.demoUrl || project.websiteUrl) && (
            <a 
              href={project.demoUrl || project.websiteUrl || "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider transition-all ${
                theme === 'dark' ? 'text-white/50 hover:text-accent-gold' : 'text-alpine-950/60 hover:text-accent-clay'
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
    </article>
  );
};

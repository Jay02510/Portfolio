import React, { useState } from 'react';
import { ExternalLinkIcon, FileTextIcon, ChevronDownIcon, XIcon, SparklesIcon } from './Icons.tsx';

interface ProjectCardProps {
  project: any;
  index: number;
  theme?: 'light' | 'dark';
  locale?: 'en' | 'ko';
  onOpenCaseStudy?: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  index, 
  theme = 'dark', 
  locale = 'en',
  onOpenCaseStudy 
}) => {
  const [copied, setCopied] = useState(false);
  const [activeMedia, setActiveMedia] = useState<any | null>(null);
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [isUnfolded, setIsUnfolded] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project.betaCode) return;
    navigator.clipboard.writeText(project.betaCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className={`rounded-[2rem] border transition-all duration-500 overflow-hidden ${
      theme === 'dark' 
        ? 'bg-alpine-900/40 border-white/10 hover:border-white/20 shadow-xl' 
        : 'bg-white border-black/10 hover:border-black/20 shadow-lg'
    }`}>
      {/* Media Viewer Modal */}
      {activeMedia && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-alpine-950/95 backdrop-blur-xl" onClick={() => setActiveMedia(null)}></div>
          <div className={`relative w-full max-w-5xl aspect-video rounded-[1.5rem] overflow-hidden flex flex-col shadow-2xl border ${theme === 'dark' ? 'bg-alpine-900 border-white/10' : 'bg-white border-black/8'}`}>
            <button onClick={() => setActiveMedia(null)} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white" aria-label={locale === 'ko' ? "미디어 보기 닫기" : "Close media viewer"}>
              <XIcon className="w-5 h-5" />
            </button>
            <div className="flex-1 bg-black">
              {activeMedia.type === 'video' ? (
                <video src={activeMedia.url} controls autoPlay playsInline className="w-full h-full object-contain" />
              ) : (
                <iframe src={activeMedia.url} className="w-full h-full border-none" title={activeMedia.label} />
              )}
            </div>
          </div>
        </div>
      )}

      {/* FOLDED HEADER BANNER (Always Visible & Interactive) */}
      <div 
        onClick={() => setIsUnfolded(!isUnfolded)}
        className={`p-5 md:p-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors ${
          isUnfolded 
            ? (theme === 'dark' ? 'bg-white/[0.04] border-b border-white/10' : 'bg-black/[0.03] border-b border-black/10') 
            : (theme === 'dark' ? 'hover:bg-white/[0.02]' : 'hover:bg-black/[0.01]')
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 flex-1 min-w-0">
          {/* Index & Thumbnail Mini Preview */}
          <div className="flex items-center gap-4 shrink-0">
            <span className={`font-mono text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border ${
              theme === 'dark' ? 'bg-white/5 border-white/10 text-accent-gold' : 'bg-black/5 border-black/10 text-accent-clay'
            }`}>
              Project 0{index + 1}
            </span>

            {/* Thumbnail Circle / Micro Preview */}
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-black/40 hidden sm:block">
              <img 
                src={project.imageUrl || (project.images && project.images[0])} 
                alt={project.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className={`text-xl md:text-2xl font-bold font-display tracking-tight truncate ${
                theme === 'dark' ? 'text-white' : 'text-alpine-950'
              }`}>
                {project.title}
              </h3>

              {project.maturityBadge && (
                <span className="bg-accent-gold text-alpine-950 px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider shrink-0 font-mono">
                  {project.maturityBadge}
                </span>
              )}
            </div>

            {/* PM Role & Ownership Tag */}
            {project.pmRole && (
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[9px] font-mono font-bold tracking-wider ${
                  theme === 'dark' ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30' : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                  {project.pmRole}
                </span>
              </div>
            )}

            <p className={`text-xs md:text-sm font-light truncate ${
              theme === 'dark' ? 'text-text-sec' : 'text-alpine-950/70'
            }`}>
              {project.description || project.longDescription}
            </p>
          </div>
        </div>

        {/* Action Controls & Fold Toggle */}
        <div className="flex items-center gap-3 shrink-0 self-start md:self-center" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onOpenCaseStudy?.(project.id)}
            className={`px-4 py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${
              theme === 'dark' 
                ? 'bg-accent-gold text-alpine-950 hover:bg-white' 
                : 'bg-accent-clay text-white hover:bg-alpine-950'
            }`}
          >
            {locale === 'ko' ? "케이스 스터디" : "Case Study"}
          </button>

          <button
            onClick={() => setIsUnfolded(!isUnfolded)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-[9px] md:text-[10px] font-extrabold uppercase tracking-widest border transition-all ${
              isUnfolded
                ? 'bg-accent-gold/20 text-accent-gold border-accent-gold/40'
                : (theme === 'dark' ? 'border-white/20 text-white/80 hover:bg-white/10' : 'border-black/20 text-alpine-950/80 hover:bg-black/5')
            }`}
          >
            <span>{isUnfolded ? (locale === 'ko' ? "접기 ↑" : "Fold ↑") : (locale === 'ko' ? "펼치기 ↓" : "Unfold ↓")}</span>
            <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-300 ${isUnfolded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* UNFOLDED CONTENT PANEL (Non-overlapping relative flow layout) */}
      {isUnfolded && (
        <div className="p-6 md:p-10 space-y-8 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT / TOP: Media Showcase & Image Carousel */}
            <div className="lg:col-span-6 space-y-4">
              <div className={`w-full aspect-[16/10] rounded-2xl overflow-hidden border shadow-xl relative ${
                theme === 'dark' ? 'border-white/10 bg-black/50' : 'border-black/10 bg-black/5'
              }`}>
                {project.images && project.images.length > 0 ? (
                  <div className="relative w-full h-full group/carousel">
                    <img 
                      src={project.images[currentSlideIdx]} 
                      onClick={() => onOpenCaseStudy?.(project.id)}
                      className="w-full h-full object-cover cursor-pointer transition-all duration-500" 
                      alt={project.title}
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Slide controls */}
                    {project.images.length > 1 && (
                      <>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentSlideIdx(prev => (prev === 0 ? project.images.length - 1 : prev - 1));
                          }}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-alpine-950/80 hover:bg-accent-gold hover:text-alpine-950 flex items-center justify-center text-white transition-all shadow-lg z-10"
                        >
                          ◀
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentSlideIdx(prev => (prev === project.images.length - 1 ? 0 : prev + 1));
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-alpine-950/80 hover:bg-accent-gold hover:text-alpine-950 flex items-center justify-center text-white transition-all shadow-lg z-10"
                        >
                          ▶
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm z-10">
                          {project.images.map((_: any, idx: number) => (
                            <button 
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentSlideIdx(idx);
                              }}
                              className={`w-2 h-2 rounded-full transition-all ${
                                idx === currentSlideIdx ? 'bg-accent-gold scale-125' : 'bg-white/40'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <img 
                    src={project.imageUrl} 
                    onClick={() => onOpenCaseStudy?.(project.id)}
                    className="w-full h-full object-cover cursor-pointer" 
                    alt={project.title}
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>

              {/* Tags */}
              {project.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string, tIdx: number) => (
                    <span key={tIdx} className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${
                      theme === 'dark' ? 'bg-accent-gold/10 text-accent-gold border border-accent-gold/20' : 'bg-accent-clay/15 text-accent-clay border border-accent-clay/25'
                    }`}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT / BOTTOM: Comprehensive Details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-4">
                <h4 className={`text-xl md:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-alpine-950'}`}>
                  {project.title}
                </h4>

                {/* 3-Point Micro-Summary for Fast Skimming */}
                <div className={`p-4 rounded-xl border space-y-2.5 text-xs ${
                  theme === 'dark' ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
                }`}>
                  {project.friction && (
                    <div className="flex items-start gap-2.5">
                      <span className="text-[9px] font-mono font-black uppercase tracking-wider text-red-400 shrink-0 mt-0.5">
                        {locale === 'ko' ? "문제 (PROBLEM) :" : "PROBLEM :"}
                      </span>
                      <span className={`leading-relaxed font-light ${theme === 'dark' ? 'text-white/70' : 'text-alpine-950/70'}`}>
                        {project.friction}
                      </span>
                    </div>
                  )}
                  <div className="flex items-start gap-2.5">
                    <span className="text-[9px] font-mono font-black uppercase tracking-wider text-accent-gold shrink-0 mt-0.5">
                      {locale === 'ko' ? "해결 (SOLUTION) :" : "SOLUTION :"}
                    </span>
                    <span className={`leading-relaxed font-light ${theme === 'dark' ? 'text-white/80' : 'text-alpine-950/80'}`}>
                      {project.description}
                    </span>
                  </div>
                  {project.impactLabel && project.impactValue && (
                    <div className="flex items-start gap-2.5 pt-2 border-t border-white/5">
                      <span className="text-[9px] font-mono font-black uppercase tracking-wider text-green-400 shrink-0 mt-0.5">
                        {locale === 'ko' ? "성과 (IMPACT) :" : "IMPACT :"}
                      </span>
                      <span className="font-mono font-bold text-green-400">
                        {project.impactLabel}: {project.impactValue}
                      </span>
                    </div>
                  )}
                </div>

                <p className={`text-xs md:text-sm font-light leading-relaxed ${theme === 'dark' ? 'text-text-sec' : 'text-alpine-950/80'}`}>
                  {project.longDescription}
                </p>
              </div>

              {/* Features */}
              {project.features && (
                <div className="space-y-2">
                  <span className={`text-[9px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-alpine-950/40'}`}>
                    {locale === 'ko' ? "핵심 기능 및 특장점" : "Core Capabilities"}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature: string, fIdx: number) => (
                      <span key={fIdx} className={`px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest ${
                        theme === 'dark' ? 'bg-white/5 border-white/10 text-text-sec' : 'bg-black/5 border-black/10 text-alpine-950/70'
                      }`}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Engine Details */}
              {project.engineDetails && (
                <p className={`text-[10px] md:text-[11px] font-mono tracking-wide leading-relaxed p-4 rounded-xl border ${
                  theme === 'dark' ? 'bg-black/30 border-white/10 text-accent-gold/90' : 'bg-black/5 border-black/10 text-accent-clay'
                }`}>
                  {project.engineDetails}
                </p>
              )}

              {/* Beta Authorization */}
              {project.betaCode && (
                <div className={`rounded-xl p-4 md:p-6 flex flex-col gap-3 ${theme === 'dark' ? 'bg-white/5' : 'bg-black/[0.04]'}`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-alpine-950/50'}`}>
                      {locale === 'ko' ? "베타 접속 권한코드" : "Beta Authorization"}
                    </span>
                    {copied && (
                      <span className="text-[9px] font-bold text-accent-gold animate-pulse">
                        {locale === 'ko' ? "복사됨" : "COPIED"}
                      </span>
                    )}
                  </div>
                  <div onClick={handleCopy} className="flex justify-between items-center cursor-pointer group/code">
                    <code className={`text-sm md:text-lg font-mono tracking-widest px-4 py-2 rounded-lg border transition-all ${
                      theme === 'dark' ? 'bg-white/5 border-white/10 group-hover/code:border-accent-gold/50 text-white' : 'bg-white border-black/10 text-alpine-950'
                    }`}>
                      {project.betaCode}
                    </code>
                    <div className="text-[9px] font-bold uppercase tracking-widest opacity-60 group-hover/code:opacity-100 transition-opacity">
                      {locale === 'ko' ? "복사" : "Copy"}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="flex flex-wrap items-center gap-3">
                  <button 
                    onClick={() => onOpenCaseStudy?.(project.id)}
                    className={`rounded-full px-6 py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
                      theme === 'dark' 
                        ? 'bg-accent-gold text-alpine-950 hover:bg-white' 
                        : 'bg-accent-clay text-white hover:bg-alpine-950'
                    }`}
                  >
                    <span>{locale === 'ko' ? "전체 아키텍처 케이스 스터디 읽기" : "Read Full Case Study"}</span>
                    <span>→</span>
                  </button>

                  {(project.demoUrl || project.websiteUrl) && (
                    <a 
                      href={project.demoUrl || project.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-all ${
                        theme === 'dark' ? 'text-white/70 hover:text-accent-gold' : 'text-alpine-950/70 hover:text-accent-clay'
                      }`}
                    >
                      {project.websiteUrl ? (locale === 'ko' ? '실시간 실행 ↗' : 'Launch Live') : (locale === 'ko' ? '데모 부스 ↗' : 'Launch Demo')}
                      <ExternalLinkIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setIsUnfolded(false)}
                  className={`px-4 py-2 rounded-full text-[9px] font-extrabold uppercase tracking-widest border transition-all ${
                    theme === 'dark' ? 'border-white/10 text-white/60 hover:text-white hover:border-white/20' : 'border-black/10 text-alpine-950/60 hover:text-black hover:border-black/20'
                  }`}
                >
                  {locale === 'ko' ? "접기 ↑" : "Fold Details ↑"}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </article>
  );
};

export default ProjectCard;

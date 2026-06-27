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
  const isEven = index % 2 === 0;
  const [copied, setCopied] = useState(false);
  const [activeMedia, setActiveMedia] = useState<any | null>(null);
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  const handleCopy = () => {
    if (!project.betaCode) return;
    navigator.clipboard.writeText(project.betaCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="relative flex flex-col items-center group">
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

      {/* Background Image Container */}
      <div className={`w-full h-[350px] md:h-[700px] rounded-2xl overflow-hidden border shadow-2xl relative transition-all duration-700 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
          {project.images && project.images.length > 0 ? (
            <div className="absolute inset-0 w-full h-full group/carousel">
              <img 
                src={project.images[currentSlideIdx]} 
                onClick={() => onOpenCaseStudy?.(project.id)}
                className={`w-full h-full object-cover cursor-pointer transition-all duration-700 ${
                  theme === 'dark' 
                    ? 'grayscale opacity-40 hover:grayscale-0 hover:opacity-100' 
                    : 'opacity-90 hover:opacity-100'
                }`} 
                alt={project.title}
                referrerPolicy="no-referrer"
              />
              
              {/* Slide controls */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlideIdx(prev => (prev === 0 ? project.images.length - 1 : prev - 1));
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-alpine-950/80 hover:bg-accent-gold hover:text-alpine-950 flex items-center justify-center text-white/80 transition-all z-10 opacity-0 group-hover/carousel:opacity-100 shadow-lg"
                aria-label={locale === 'ko' ? "이전 슬라이드" : "Previous slide"}
              >
                ◀
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlideIdx(prev => (prev === project.images.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-alpine-950/80 hover:bg-accent-gold hover:text-alpine-950 flex items-center justify-center text-white/80 transition-all z-10 opacity-0 group-hover/carousel:opacity-100 shadow-lg"
                aria-label={locale === 'ko' ? "다음 슬라이드" : "Next slide"}
              >
                ▶
              </button>

              {/* Bullet Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                {project.images.map((_: any, idx: number) => (
                  <button 
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlideIdx(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentSlideIdx ? 'bg-accent-gold scale-125' : 'bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={locale === 'ko' ? `${idx + 1}번 슬라이드로 이동` : `Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <img 
              src={project.imageUrl} 
              onClick={() => onOpenCaseStudy?.(project.id)}
              className={`w-full h-full object-cover cursor-pointer ${project.imagePosition || 'object-center'} transition-all duration-700 ${
                theme === 'dark' 
                  ? 'grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100' 
                  : 'opacity-90 group-hover:opacity-100'
              }`} 
              alt={project.title}
              referrerPolicy="no-referrer"
            />
          )}
          <div className={`absolute inset-0 pointer-events-none ${theme === 'dark' ? 'bg-gradient-to-t from-alpine-950 via-transparent' : 'bg-gradient-to-t from-alpine-50/80 via-transparent'}`}></div>
          
          {project.maturityBadge && (
            <div className="absolute top-4 right-4 md:top-10 md:right-10 z-10">
               <div className="bg-accent-gold text-alpine-950 px-4 py-1.5 md:px-8 md:py-3 rounded-full text-[9px] md:text-[12px] font-black uppercase tracking-[0.2em] shadow-2xl">
                  {project.maturityBadge}
               </div>
            </div>
          )}
      </div>

      {/* Detail Panel */}
      <div className={`mt-[-60px] md:mt-0 md:absolute ${isEven ? 'md:right-12' : 'md:left-12'} md:top-1/2 md:-translate-y-1/2 w-[90%] md:w-full md:max-w-xl rounded-[2.4rem] p-2.5 z-20 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] border ${
        theme === 'dark' 
          ? 'bg-neutral-900/30 border-white/5 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.55)]' 
          : 'bg-neutral-200/50 border-black/5 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.15)]'
      }`}>
        <div className={`rounded-[2rem] p-6 md:p-12 space-y-6 md:space-y-10 border ${
          theme === 'dark'
            ? 'bg-alpine-900 border-white/5'
            : 'bg-white border-black/5'
        }`}>
          <div className="space-y-2 md:space-y-6">
              <div className="flex flex-col gap-2">
                <span className={`font-mono font-bold uppercase tracking-[0.4em] text-[8px] md:text-[11px] ${theme === 'dark' ? 'text-text-tert' : 'text-alpine-950/50'}`}>Project 0{index + 1}</span>
                {project.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag: string, tIdx: number) => (
                      <span key={tIdx} className={`text-[7px] md:text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded ${
                        theme === 'dark' ? 'bg-accent-gold/10 text-accent-gold border border-accent-gold/20' : 'bg-accent-clay/15 text-accent-clay border border-accent-clay/25'
                      }`}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <h3 
                onClick={() => onOpenCaseStudy?.(project.id)}
                className={`text-2xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-none cursor-pointer hover:text-accent-gold transition-colors ${theme === 'dark' ? 'text-white' : 'text-alpine-950'}`}
              >
                {project.title}
              </h3>
              <p className={`text-xs md:text-lg font-light leading-relaxed ${theme === 'dark' ? 'text-text-sec' : 'text-alpine-950/80'}`}>
                {project.longDescription}
              </p>
          </div>

          {/* Features / Beta Code Widget */}
          <div className="space-y-6">
            {project.features && (
              <div className="flex flex-wrap gap-2 md:gap-3">
                {project.features.map((feature: string, fIdx: number) => (
                  <span key={fIdx} className={`px-3 py-1.5 md:px-5 md:py-2 rounded-lg border text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all hover:border-accent-gold/50 ${theme === 'dark' ? 'bg-white/5 border-white/5 text-text-sec' : 'bg-black/5 border-black/5 text-alpine-950/60'}`}>
                    {feature}
                  </span>
                ))}
              </div>
            )}

            {project.engineDetails && (
              <p className={`text-[10px] md:text-[11px] font-mono tracking-wide leading-relaxed p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-black/25 border-white/5 text-accent-gold/90' : 'bg-black/5 border-black/5 text-accent-clay'
              }`}>
                {project.engineDetails}
              </p>
            )}

            {project.betaCode && (
              <div className={`rounded-xl p-5 md:p-8 flex flex-col gap-3 md:gap-5 ${theme === 'dark' ? 'bg-white/5' : 'bg-black/[0.04]'}`}>
                <div className="flex justify-between items-center">
                  <span className={`text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-white/30' : 'text-alpine-950/40'}`}>
                    {locale === 'ko' ? "베타 접속 권한코드" : "Beta Authorization"}
                  </span>
                  {copied && (
                    <span className="text-[9px] font-bold text-accent-gold animate-pulse">
                      {locale === 'ko' ? "복사됨" : "COPIED"}
                    </span>
                  )}
                </div>
                <div onClick={handleCopy} className="flex justify-between items-center cursor-pointer group/code">
                  <code className={`text-base md:text-2xl font-mono tracking-widest px-3 md:px-6 py-2 md:py-4 rounded-lg border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/5 group-hover/code:border-accent-gold/50 text-white' : 'bg-white border-black/5 text-alpine-950'}`}>
                    {project.betaCode}
                  </code>
                  <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 group-hover/code:opacity-100 transition-opacity">
                    {locale === 'ko' ? "복사" : "Copy"}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 w-full pt-4">
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => onOpenCaseStudy?.(project.id)}
                  className={`group relative rounded-full pl-6 pr-4 py-3 text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center justify-between gap-4 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] ${
                    theme === 'dark' 
                      ? 'bg-accent-gold text-alpine-950 hover:bg-white hover:text-alpine-950 hover:shadow-lg' 
                      : 'bg-accent-clay text-white hover:bg-alpine-950 hover:text-white hover:shadow-lg'
                  }`}
                >
                  <span>{locale === 'ko' ? "케이스 스터디 읽기" : "Read Case Study"}</span>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shrink-0 ${
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
                    className={`flex items-center gap-2 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all ${theme === 'dark' ? 'text-white/60 hover:text-accent-gold' : 'text-alpine-950/60 hover:text-accent-clay'}`}
                  >
                      {project.websiteUrl 
                        ? (locale === 'ko' ? '실시간 앱 실행 ↗' : 'Launch Live') 
                        : (locale === 'ko' ? '데모 부스 실행 ↗' : 'Launch Demo')}
                      <ExternalLinkIcon className="w-3.5 h-3.5 opacity-60" />
                  </a>
                )}
                {!project.betaCode && !project.collaborationUrl && !project.websiteUrl && (
                  <span className={`text-[8px] font-black uppercase tracking-[0.2em] animate-pulse ${theme === 'dark' ? 'text-accent-gold/60' : 'text-accent-clay/60'}`}>
                    {locale === 'ko' ? "프리 무료 체험" : "Free to try"}
                  </span>
                )}
                {project.collaborationUrl && (
                  <a 
                    href={project.collaborationUrl}
                    className={`text-[8px] font-black uppercase tracking-[0.2em] transition-all ${theme === 'dark' ? 'text-accent-gold hover:text-white' : 'text-accent-clay hover:text-black'}`}
                  >
                    {locale === 'ko' ? "협업 및 커미션 의뢰" : "Inquire for Collaboration"}
                  </a>
                )}
              </div>

              <span className={`text-[8px] md:text-[10px] border px-3 md:px-5 py-1.5 rounded-full uppercase tracking-widest font-black self-start sm:self-auto ${theme === 'dark' ? 'text-accent-gold/80 border-accent-gold/30' : 'text-accent-clay/80 border-accent-clay/30'}`}>
                {project.betaCode 
                  ? (locale === 'ko' ? '초대 전용 베타' : 'Restricted Beta') 
                  : (project.collaborationUrl 
                      ? (locale === 'ko' ? '실시간 가동' : 'Live') 
                      : (locale === 'ko' ? '공동 베타' : 'Public Beta'))}
              </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;

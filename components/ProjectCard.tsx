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
          <div className="relative w-full max-w-5xl aspect-video glass-panel rounded-[1.5rem] overflow-hidden flex flex-col shadow-2xl">
            <button onClick={() => setActiveMedia(null)} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
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
                    ? 'grayscale opacity-40 hover:grayscale-0 hover:opacity-100 scale-105 hover:scale-100' 
                    : 'opacity-90 hover:opacity-100 hover:scale-105'
                }`} 
                alt={`${project.title} - Slide ${currentSlideIdx + 1}`}
                referrerPolicy="no-referrer"
              />
              
              {/* Slide controls */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlideIdx(prev => (prev === 0 ? project.images.length - 1 : prev - 1));
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-alpine-950/80 hover:bg-accent-gold hover:text-alpine-950 flex items-center justify-center text-white/80 transition-all z-10 opacity-0 group-hover/carousel:opacity-100 shadow-lg"
              >
                ◀
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlideIdx(prev => (prev === project.images.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-alpine-950/80 hover:bg-accent-gold hover:text-alpine-950 flex items-center justify-center text-white/80 transition-all z-10 opacity-0 group-hover/carousel:opacity-100 shadow-lg"
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
                  ? 'grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 scale-105 group-hover:scale-100' 
                  : 'opacity-90 group-hover:opacity-100 group-hover:scale-105'
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
      <div className={`mt-[-60px] md:mt-0 md:absolute ${isEven ? 'md:right-12' : 'md:left-12'} md:top-1/2 md:-translate-y-1/2 w-[90%] md:w-full md:max-w-xl glass-panel rounded-2xl p-6 md:p-14 space-y-6 md:space-y-10 z-20 transition-all duration-500 group-hover:shadow-accent-gold/5`}>
          <div className="space-y-2 md:space-y-6">
              <div className="flex flex-col gap-2">
                <span className={`font-bold uppercase tracking-[0.4em] text-[8px] md:text-[11px] ${theme === 'dark' ? 'text-text-tert' : 'text-alpine-950/50'}`}>Project 0{index + 1}</span>
                {project.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag: string, tIdx: number) => (
                      <span key={tIdx} className={`text-[7px] md:text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
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
                className="text-2xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-none text-gradient-white cursor-pointer hover:text-accent-gold transition-colors"
              >
                {project.title}
              </h3>
              <p className={`text-xs md:text-lg font-normal leading-relaxed ${theme === 'dark' ? 'text-text-sec' : 'text-alpine-950/80'}`}>
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
                theme === 'dark' ? 'bg-white/5 border-white/5 text-accent-gold/90' : 'bg-black/5 border-black/5 text-accent-clay'
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
                  className="shiny-cta py-3 px-6 text-[10px] md:text-[11px]"
                >
                  {locale === 'ko' ? "케이스 스터디 읽기" : "Read Case Study"}
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

              <span className={`text-[8px] md:text-[10px] border px-3 md:px-5 py-1.5 rounded-full uppercase tracking-widest font-black self-start sm:self-auto ${theme === 'dark' ? 'text-accent-gold border-accent-gold/30' : 'text-accent-clay border-accent-clay/30'}`}>
                {project.betaCode 
                  ? (locale === 'ko' ? '초대 전용 베타' : 'Restricted Beta') 
                  : (project.collaborationUrl 
                      ? (locale === 'ko' ? '실시간 가동' : 'Live') 
                      : (locale === 'ko' ? '공동 베타' : 'Public Beta'))}
              </span>
          </div>
      </div>
    </article>
  );
};

export default ProjectCard;

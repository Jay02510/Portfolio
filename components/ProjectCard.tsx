
import React, { useState, useRef, useEffect } from 'react';
import { ExternalLinkIcon, FileTextIcon, ChevronDownIcon, XIcon } from './Icons.tsx';

interface ProjectCardProps {
  project: any;
  index: number;
  theme?: 'light' | 'dark';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, theme = 'dark' }) => {
  const isEven = index % 2 === 0;
  const [copied, setCopied] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [activeMedia, setActiveMedia] = useState<any | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    if (!project.betaCode) return;
    navigator.clipboard.writeText(project.betaCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMediaOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (activeMedia) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeMedia]);

  return (
    <article className="relative group flex flex-col items-center" aria-labelledby={`project-title-${project.id}`}>
      {/* Media Viewer Modal */}
      {activeMedia && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-alpine-950/95 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setActiveMedia(null)}></div>
          <div className="relative w-full max-w-6xl aspect-video glass-panel rounded-[2.5rem] overflow-hidden flex flex-col animate-in zoom-in duration-300 shadow-2xl border-white/20">
            <div className="absolute top-8 right-8 z-10">
              <button 
                onClick={() => setActiveMedia(null)}
                className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all backdrop-blur-md border border-white/20"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 bg-black">
              {activeMedia.type === 'video' ? (
                <video src={activeMedia.url} controls autoPlay className="w-full h-full object-contain" />
              ) : (
                <iframe src={`${activeMedia.url}#toolbar=0`} className="w-full h-full border-none" title={activeMedia.label} />
              )}
            </div>
            <div className="p-8 bg-alpine-900/90 backdrop-blur-md flex justify-between items-center border-t border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-white/50">{activeMedia.label}</span>
              <span className="text-[10px] font-bold text-accent-gold uppercase tracking-[0.2em]">Media Engine Preview</span>
            </div>
          </div>
        </div>
      )}

      {/* Background Image Container */}
      <div className={`w-full h-[550px] md:h-[700px] rounded-[3rem] overflow-hidden border shadow-2xl relative transition-all duration-500 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
          <img 
            src={project.imageUrl} 
            className={`w-full h-full object-cover ${project.imagePosition || 'object-center'} transition-all duration-1000 ${theme === 'dark' ? 'grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-80' : 'opacity-90 group-hover:scale-105'}`} 
            alt={project.title}
            loading="lazy"
          />
          <div className={`absolute inset-0 transition-opacity duration-500 ${theme === 'dark' ? 'bg-gradient-to-t from-alpine-950 via-alpine-950/30 to-transparent' : 'bg-gradient-to-t from-alpine-50/95 via-transparent to-transparent opacity-60'}`}></div>
          
          {project.spotsRemaining !== undefined && (
            <div className="absolute top-10 right-10 z-10">
               <div className="bg-accent-gold text-alpine-950 px-8 py-3 rounded-full text-[12px] font-extrabold uppercase tracking-[0.25em] shadow-2xl border border-white/20 animate-pulse">
                  {project.spotsRemaining} Spots Remaining
               </div>
            </div>
          )}
      </div>

      {/* Detail Panel */}
      <div className={`mt-[-120px] md:mt-0 md:absolute ${isEven ? 'md:right-16' : 'md:left-16'} md:top-1/2 md:-translate-y-1/2 w-full max-w-xl glass-panel rounded-[2.5rem] p-10 md:p-16 space-y-12 z-20`}>
          <div className="space-y-8">
              <span className={`font-bold uppercase tracking-[0.5em] text-[11px] ${theme === 'dark' ? 'text-white/40' : 'text-alpine-950/50'}`}>Project 0{index + 1}</span>
              <h3 id={`project-title-${project.id}`} className="text-5xl md:text-6xl font-medium tracking-tighter leading-none text-gradient-white">
                {project.title}
              </h3>
              <p className={`text-base md:text-lg font-normal leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-alpine-950/80'}`}>
                {project.longDescription}
              </p>
          </div>

          <div className={`space-y-6 pt-8 border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
              <div className="flex gap-5 items-start">
                <div className={`mt-2 w-2.5 h-2.5 rounded-full ${theme === 'dark' ? 'bg-accent-gold/60' : 'bg-accent-clay/70'}`} aria-hidden="true"></div>
                <p className={`text-[13px] leading-relaxed font-medium ${theme === 'dark' ? 'text-white/50' : 'text-alpine-950/70'}`}>Join the private beta program to experience full premium functionality.</p>
              </div>
          </div>

          {/* Beta Code Widget */}
          {project.betaCode && (
            <div className={`rounded-2xl p-8 flex flex-col gap-6 transition-colors shadow-inner ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-black/[0.04] border border-black/5'}`}>
              <div className="flex justify-between items-center">
                 <span className={`text-[11px] font-bold uppercase tracking-[0.4em] ${theme === 'dark' ? 'text-white/30' : 'text-alpine-950/40'}`}>Beta Authorization</span>
                 {copied && <span className="text-[11px] font-bold text-accent-gold animate-pulse tracking-widest">COPIED</span>}
              </div>
              <div 
                onClick={handleCopy}
                className="flex justify-between items-center group/code cursor-pointer"
              >
                <code className={`text-2xl font-mono tracking-widest px-6 py-4 rounded-xl border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/5 group-hover/code:border-accent-gold/50 text-white' : 'bg-white border-black/5 group-hover/code:border-accent-clay/50 text-alpine-950'}`}>
                  {project.betaCode}
                </code>
                <div className={`text-[11px] font-bold uppercase tracking-[0.3em] transition-colors ${theme === 'dark' ? 'text-accent-gold/40 group-hover/code:text-accent-gold' : 'text-accent-clay/50 group-hover/code:text-accent-clay'}`}>
                  Copy
                </div>
              </div>
            </div>
          )}

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-10 relative">
              <div className="flex items-center gap-10">
                  <a 
                    href={project.demoUrl || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`group/link inline-flex items-center gap-4 text-[11px] font-extrabold uppercase tracking-[0.4em] transition-all ${theme === 'dark' ? 'text-white hover:text-accent-gold' : 'text-alpine-950 hover:text-accent-clay'}`}
                  >
                      Explore Demo
                      <ExternalLinkIcon className="w-5 h-5 opacity-40 group-hover/link:opacity-100" />
                  </a>

                  {project.media && project.media.length > 0 && (
                    <div className="relative" ref={dropdownRef}>
                      <button 
                        onClick={() => setMediaOpen(!mediaOpen)}
                        className={`group/media inline-flex items-center gap-4 text-[11px] font-extrabold uppercase tracking-[0.4em] transition-all ${mediaOpen ? (theme === 'dark' ? 'text-accent-gold' : 'text-accent-clay') : (theme === 'dark' ? 'text-white/50 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950')}`}
                      >
                        <FileTextIcon className="w-5 h-5" />
                        Assets
                        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${mediaOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {mediaOpen && (
                        <div className={`absolute bottom-full left-0 mb-6 w-64 backdrop-blur-3xl border rounded-[1.5rem] p-3 shadow-2xl animate-in fade-in slide-in-from-bottom-3 z-50 ${theme === 'dark' ? 'bg-alpine-900/95 border-white/10' : 'bg-white border-black/10'}`}>
                           {project.media.map((item: any, i: number) => (
                             <button 
                               key={i}
                               onClick={() => {
                                 setActiveMedia(item);
                                 setMediaOpen(false);
                               }}
                               className={`flex items-center gap-5 w-full text-left p-5 text-[10px] font-bold uppercase tracking-[0.3em] rounded-xl transition-all ${theme === 'dark' ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-alpine-950/60 hover:text-alpine-950 hover:bg-black/5'}`}
                             >
                               <div className={`w-2.5 h-2.5 rounded-full ${theme === 'dark' ? 'bg-accent-gold/40' : 'bg-accent-clay/40'}`}></div>
                               {item.label}
                             </button>
                           ))}
                        </div>
                      )}
                    </div>
                  )}
              </div>

              <span className={`text-[11px] border px-6 py-2.5 rounded-full uppercase tracking-widest font-extrabold whitespace-nowrap shadow-sm ${theme === 'dark' ? 'text-accent-gold border-accent-gold/30' : 'text-accent-clay border-accent-clay/30'}`}>
                Public Beta
              </span>
          </div>
      </div>
    </article>
  );
};

export default ProjectCard;

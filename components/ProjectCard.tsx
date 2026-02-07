
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

  const handleMediaSelection = (item: any) => {
    if (item.type === 'pdf') {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      setActiveMedia(item);
    }
    setMediaOpen(false);
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
      <div className={`w-full h-[350px] md:h-[700px] rounded-[1.5rem] md:rounded-[3rem] overflow-hidden border shadow-2xl relative transition-all duration-700 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
          <img 
            src={project.imageUrl} 
            className={`w-full h-full object-cover ${project.imagePosition || 'object-center'} transition-all duration-700 ${
              theme === 'dark' 
                ? 'grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 scale-105 group-hover:scale-100' 
                : 'opacity-90 group-hover:opacity-100 group-hover:scale-105'
            }`} 
            alt={project.title}
          />
          {/* pointer-events-none ensures the mouse events reach the group container */}
          <div className={`absolute inset-0 pointer-events-none ${theme === 'dark' ? 'bg-gradient-to-t from-alpine-950 via-transparent' : 'bg-gradient-to-t from-alpine-50/80 via-transparent'}`}></div>
          
          {project.spotsRemaining !== undefined && (
            <div className="absolute top-4 right-4 md:top-10 md:right-10 z-10">
               <div className="bg-accent-gold text-alpine-950 px-4 py-1.5 md:px-8 md:py-3 rounded-full text-[9px] md:text-[12px] font-extrabold uppercase tracking-[0.2em] shadow-2xl">
                  {project.spotsRemaining} Spots Left
               </div>
            </div>
          )}
      </div>

      {/* Detail Panel */}
      <div className={`mt-[-60px] md:mt-0 md:absolute ${isEven ? 'md:right-12' : 'md:left-12'} md:top-1/2 md:-translate-y-1/2 w-[90%] md:w-full md:max-w-xl glass-panel rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-14 space-y-6 md:space-y-10 z-20 transition-all duration-500 group-hover:shadow-accent-gold/5`}>
          <div className="space-y-2 md:space-y-6">
              <span className={`font-bold uppercase tracking-[0.4em] text-[8px] md:text-[11px] ${theme === 'dark' ? 'text-white/40' : 'text-alpine-950/50'}`}>Project 0{index + 1}</span>
              <h3 className="text-2xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-none text-gradient-white">
                {project.title}
              </h3>
              <p className={`text-xs md:text-lg font-normal leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-alpine-950/80'}`}>
                {project.longDescription}
              </p>
          </div>

          {/* Beta Code Widget */}
          {project.betaCode && (
            <div className={`rounded-xl p-5 md:p-8 flex flex-col gap-3 md:gap-5 ${theme === 'dark' ? 'bg-white/5' : 'bg-black/[0.04]'}`}>
              <div className="flex justify-between items-center">
                 <span className={`text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-white/30' : 'text-alpine-950/40'}`}>Beta Authorization</span>
                 {copied && <span className="text-[9px] font-bold text-accent-gold animate-pulse">COPIED</span>}
              </div>
              <div onClick={handleCopy} className="flex justify-between items-center cursor-pointer group/code">
                <code className={`text-base md:text-2xl font-mono tracking-widest px-3 md:px-6 py-2 md:py-4 rounded-lg border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/5 group-hover/code:border-accent-gold/50 text-white' : 'bg-white border-black/5 text-alpine-950'}`}>
                  {project.betaCode}
                </code>
                <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 group-hover/code:opacity-100 transition-opacity">Copy</div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
              <a 
                href={project.demoUrl || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-3 text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] transition-all ${theme === 'dark' ? 'text-white hover:text-accent-gold' : 'text-alpine-950 hover:text-accent-clay'}`}
              >
                  Explore Demo
                  <ExternalLinkIcon className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
              </a>

              <span className={`text-[8px] md:text-[10px] border px-3 md:px-5 py-1.5 rounded-full uppercase tracking-widest font-black ${theme === 'dark' ? 'text-accent-gold border-accent-gold/30' : 'text-accent-clay border-accent-clay/30'}`}>
                Public Beta
              </span>
          </div>
      </div>
    </article>
  );
};

export default ProjectCard;

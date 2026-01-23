
import React, { useState } from 'react';
import { ExternalLinkIcon } from './Icons.tsx';

interface ProjectCardProps {
  project: any;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const isEven = index % 2 === 0;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!project.betaCode) return;
    navigator.clipboard.writeText(project.betaCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="relative group flex flex-col items-center" aria-labelledby={`project-title-${project.id}`}>
      {/* Background Image */}
      <div className="w-full h-[500px] md:h-[650px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative">
          <img 
            src={project.imageUrl} 
            className={`w-full h-full object-cover ${project.imagePosition || 'object-center'} grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700`} 
            alt={`Screenshot or representation of ${project.title}`}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-alpine-950 via-alpine-950/20 to-transparent"></div>
          
          {/* Scarcity Badge Overlay */}
          {project.spotsRemaining !== undefined && (
            <div className="absolute top-10 right-10 z-10 animate-pulse">
               <div className="bg-accent-gold text-alpine-950 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl border border-white/20">
                  {project.spotsRemaining} Spots Left
               </div>
            </div>
          )}
      </div>

      {/* Detail Panel */}
      <div className={`mt-[-100px] md:mt-0 md:absolute ${isEven ? 'md:right-12' : 'md:left-12'} md:top-1/2 md:-translate-y-1/2 w-full max-w-lg glass-panel rounded-[2rem] p-10 md:p-12 space-y-8 z-20`}>
          <div className="space-y-4">
              <span className="text-white/40 font-bold uppercase tracking-[0.4em] text-[8px]">Project 0{index + 1}</span>
              <h3 id={`project-title-${project.id}`} className="text-4xl font-light text-white font-display tracking-tight leading-none text-gradient-white">
                {project.title}
              </h3>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                {project.longDescription}
              </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex gap-4 items-start">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-gold/60" aria-hidden="true"></div>
                <p className="text-[11px] text-white/50 leading-relaxed font-light">Join the private beta program to experience full premium functionality.</p>
              </div>
          </div>

          {/* Beta Code Widget */}
          {project.betaCode && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                 <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/30">Beta Access Code</span>
                 {copied && <span className="text-[8px] font-bold text-accent-gold animate-pulse">COPIED!</span>}
              </div>
              <div 
                onClick={handleCopy}
                className="flex justify-between items-center group/code cursor-pointer"
              >
                <code className="text-lg font-mono text-white tracking-widest bg-white/5 px-4 py-2 rounded-lg border border-white/5 group-hover/code:border-accent-gold/50 transition-all">
                  {project.betaCode}
                </code>
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent-gold/40 group-hover/code:text-accent-gold transition-colors">
                  Click to Copy
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 flex items-center justify-between">
              <a 
                href={project.demoUrl || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-white hover:text-accent-gold transition-all"
                aria-label={`Launch demo for ${project.title}`}
              >
                  Launch App
                  <ExternalLinkIcon className="w-3 h-3 opacity-50 group-hover/link:opacity-100" />
              </a>
              <div className="flex gap-2">
                 <span className="text-[8px] text-accent-gold border border-accent-gold/30 px-3 py-1 rounded-full uppercase tracking-tighter">
                   Limited Slots
                 </span>
              </div>
          </div>
      </div>
    </article>
  );
};

export default ProjectCard;

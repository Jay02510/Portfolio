
import React, { useState } from 'react';
import { Project } from '../types';
import { ExternalLinkIcon, SparklesIcon, BookOpenIcon } from './Icons';

interface ProjectCardProps {
  project: any; // Using any temporarily for extended props
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [showTechnical, setShowTechnical] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <div className="relative group flex flex-col items-center">
      {/* Immersive Background Image */}
      <div className="w-full h-[600px] md:h-[800px] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl relative">
          <img 
            src={project.imageUrl} 
            className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110 opacity-60 grayscale group-hover:grayscale-0 transition-all" 
            alt={project.title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-alpine-950 via-alpine-950/20 to-transparent"></div>
      </div>

      {/* Detail Panel */}
      <div className={`mt-[-150px] md:mt-0 md:absolute ${isEven ? 'md:right-12' : 'md:left-12'} md:top-1/2 md:-translate-y-1/2 w-full max-w-xl glass-panel rounded-[2.5rem] p-10 md:p-14 space-y-10 z-20 overflow-hidden`}>
          
          {/* Decorative Corner Label */}
          <div className="absolute top-0 right-0 bg-accent-gold/10 px-6 py-2 rounded-bl-3xl border-l border-b border-white/5">
            <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-accent-gold">{project.impactLabel}: {project.impactValue}</span>
          </div>

          <div className="space-y-6">
              <div className="flex items-center justify-between">
                  <span className="text-white/30 font-bold uppercase tracking-[0.5em] text-[9px]">Case Study 0{index + 1}</span>
                  <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
                    <button 
                      onClick={() => setShowTechnical(false)}
                      className={`px-4 py-1.5 rounded-full text-[8px] font-bold tracking-widest uppercase transition-all ${!showTechnical ? 'bg-white text-alpine-950' : 'text-white/40'}`}
                    >
                      The Story
                    </button>
                    <button 
                      onClick={() => setShowTechnical(true)}
                      className={`px-4 py-1.5 rounded-full text-[8px] font-bold tracking-widest uppercase transition-all ${showTechnical ? 'bg-white text-alpine-950' : 'text-white/40'}`}
                    >
                      The Spec
                    </button>
                  </div>
              </div>

              <h3 className="text-5xl font-light text-white font-display tracking-tight leading-none">
                {project.title}
              </h3>

              <div className="min-h-[120px] transition-all duration-500">
                {!showTechnical ? (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex gap-4 items-start">
                      <div className="mt-1"><div className="w-1.5 h-1.5 rounded-full bg-red-400/50"></div></div>
                      <p className="text-xs text-white/40 italic font-light leading-relaxed">"The Friction": {project.friction}</p>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="mt-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400/50"></div></div>
                      <p className="text-xs text-white/70 font-light leading-relaxed tracking-wide">"The Flow": {project.flow}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-white/50 font-light leading-relaxed tracking-wide animate-in fade-in slide-in-from-top-2">
                    {project.longDescription}
                  </p>
                )}
              </div>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
              <div className="space-y-1">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-white/20">Category</div>
                  <div className="text-[10px] text-white/60 font-medium tracking-widest">{project.category}</div>
              </div>
              <div className="space-y-1">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-white/20">Outcome</div>
                  <div className="text-[10px] text-accent-gold font-medium tracking-widest uppercase">{project.impactValue}</div>
              </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
              <a 
                href={project.demoUrl || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.4em] text-white hover:text-accent-gold transition-all"
              >
                  Explore Solution
                  <div className="p-2 rounded-full border border-white/10 group-hover/link:border-accent-gold/50 transition-colors">
                    <ExternalLinkIcon className="w-3 h-3" />
                  </div>
              </a>
              <div className="flex gap-2">
                 {project.tags.slice(0, 2).map(tag => (
                   <span key={tag} className="text-[8px] text-white/30 border border-white/5 px-3 py-1.5 rounded-full uppercase tracking-tighter">
                     {tag}
                   </span>
                 ))}
              </div>
          </div>
      </div>
    </div>
  );
};

export default ProjectCard;

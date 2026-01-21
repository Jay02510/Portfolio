import React from 'react';
import { ExternalLinkIcon } from './Icons.tsx';

interface ProjectCardProps {
  project: any;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const isEven = index % 2 === 0;

  return (
    <article className="relative group flex flex-col items-center" aria-labelledby={`project-title-${project.id}`}>
      {/* Background Image */}
      <div className="w-full h-[500px] md:h-[650px] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl relative">
          <img 
            src={project.imageUrl} 
            className={`w-full h-full object-cover ${project.imagePosition || 'object-center'} grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700`} 
            alt={`Screenshot or representation of ${project.title}`}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-alpine-950 via-alpine-950/20 to-transparent"></div>
      </div>

      {/* Detail Panel */}
      <div className={`mt-[-100px] md:mt-0 md:absolute ${isEven ? 'md:right-12' : 'md:left-12'} md:top-1/2 md:-translate-y-1/2 w-full max-w-lg glass-panel rounded-[2rem] p-10 md:p-12 space-y-8 z-20`}>
          <div className="space-y-4">
              <span className="text-white/30 font-bold uppercase tracking-[0.4em] text-[8px]">Project 0{index + 1}</span>
              <h3 id={`project-title-${project.id}`} className="text-4xl font-light text-white font-display tracking-tight leading-none text-gradient-white">
                {project.title}
              </h3>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                {project.longDescription}
              </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex gap-4 items-start">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-gold/40" aria-hidden="true"></div>
                <p className="text-[11px] text-white/40 leading-relaxed font-light">{project.flow}</p>
              </div>
          </div>

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
                 <span className="text-[8px] text-accent-gold border border-accent-gold/20 px-3 py-1 rounded-full uppercase tracking-tighter">
                   {project.impactValue}
                 </span>
              </div>
          </div>
      </div>
    </article>
  );
};

export default ProjectCard;
import React from 'react';
import { Project } from '../types';
import { ExternalLinkIcon } from './Icons';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative group flex flex-col items-center">
      {/* Immersive Background Image (Project specific) */}
      <div className="w-full h-[600px] md:h-[800px] rounded-3xl overflow-hidden border border-white/5 shadow-2xl relative">
          <img 
            src={project.imageUrl} 
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
            alt={project.title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-alpine-950 via-transparent to-transparent"></div>
      </div>

      {/* Floating Detail Panel (Alpine Style) */}
      <div className={`mt-[-200px] md:mt-0 md:absolute ${isEven ? 'md:right-12' : 'md:left-12'} md:bottom-[-80px] w-full max-w-xl glass-panel rounded-3xl p-10 md:p-16 space-y-10 z-20`}>
          <div className="space-y-6">
              <div className="flex items-center gap-4">
                  <span className="text-white/30 font-bold uppercase tracking-[0.5em] text-[9px]">Solution 0{index + 1}</span>
              </div>
              <h3 className="text-5xl font-light text-white font-display tracking-tight">
                {project.title}
              </h3>
              <p className="text-sm text-white/50 font-light leading-relaxed tracking-wide">
                {project.longDescription}
              </p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
              <div className="space-y-1">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-white/20">Category</div>
                  <div className="text-[10px] text-white/60 font-medium tracking-widest">{project.category}</div>
              </div>
              <div className="space-y-1">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-white/20">Status</div>
                  <div className="text-[10px] text-white/60 font-medium tracking-widest uppercase">Live Deployment</div>
              </div>
          </div>

          <div className="pt-8 flex items-center justify-between">
              <a 
                href={project.demoUrl || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white hover:text-white/60 transition-all"
              >
                  Launch Suite
                  <ExternalLinkIcon className="w-3.5 h-3.5" />
              </a>
              <div className="flex gap-2">
                 {project.tags.slice(0, 2).map(tag => (
                   <span key={tag} className="text-[8px] text-white/30 border border-white/5 px-3 py-1 rounded-full uppercase tracking-tighter">
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
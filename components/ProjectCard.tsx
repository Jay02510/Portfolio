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
    <div className="group relative grid md:grid-cols-2 gap-8 md:gap-16 items-center">
      <div className={`glass-card rounded-3xl p-3 overflow-hidden ${isEven ? 'order-2 md:order-1' : 'order-2'}`}>
          <div className="aspect-[4/3] bg-[#020617] rounded-2xl overflow-hidden relative border border-white/5 group-hover:border-indigo-500/20 transition-colors">
              <img 
                src={project.imageUrl} 
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500" 
                alt={project.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
              
              {/* Mockup Frame */}
              <div className="absolute top-12 left-10 right-10 bottom-0 bg-[#0f172a] rounded-t-2xl border border-white/10 shadow-2xl p-6 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                  <div className="flex justify-between items-center mb-6">
                      <div className="flex gap-2">
                          <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                          <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                          <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                      </div>
                      <div className="h-2 w-16 bg-slate-800 rounded-full"></div>
                  </div>
                  <div className="space-y-4">
                      <div className="h-6 w-1/3 bg-indigo-500/20 rounded-lg"></div>
                      <div className="h-32 bg-slate-800/50 rounded-xl border border-white/5"></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-12 bg-slate-800/50 rounded-lg"></div>
                        <div className="h-12 bg-slate-800/50 rounded-lg"></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div className={`space-y-8 ${isEven ? 'order-1 md:order-2' : 'order-1'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/40 text-indigo-200 text-xs font-semibold tracking-wide uppercase">
              {project.category}
          </div>
          <div className="space-y-4">
              <h3 className="text-3xl font-medium tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-300 leading-relaxed font-light text-lg">
                {project.longDescription}
              </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[10px] text-slate-400 font-mono uppercase tracking-wider">
              {project.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 bg-slate-800 border border-white/10 rounded-md text-slate-300">
                  {tag}
                </span>
              ))}
          </div>
          <div className="pt-2">
              <a href={project.demoUrl} target="_blank" className="text-white text-sm font-medium flex items-center gap-2 hover:gap-3 hover:text-indigo-300 transition-all group/link">
                  Launch Application 
                  <ExternalLinkIcon className="w-4 h-4" />
              </a>
          </div>
      </div>
    </div>
  );
};

export default ProjectCard;
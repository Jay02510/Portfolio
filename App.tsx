
import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from './constants';
import ProjectCard from './components/ProjectCard';
import AIChat from './components/AIChat';
import InteractiveDemo from './components/InteractiveDemo';
import { 
  BookOpenIcon, 
  MailIcon,
  SparklesIcon
} from './components/Icons';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-accent-gold/30 selection:text-white">
      {/* HEADER */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        isScrolled ? 'bg-alpine-950/80 backdrop-blur-2xl h-16 border-b border-white/5' : 'bg-transparent h-24'
      }`}>
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
            <div className="flex items-center gap-3">
                <span className="font-display font-light text-[10px] tracking-[0.6em] text-white uppercase group cursor-pointer">
                  {PORTFOLIO_DATA.name} <span className="text-accent-gold opacity-0 group-hover:opacity-100 transition-opacity ml-2">• Architect</span>
                </span>
            </div>

            <nav className="hidden md:flex items-center gap-12 text-[9px] font-bold uppercase tracking-[0.4em] text-white/40">
                <a href="#story" onClick={scrollToSection('story')} className="hover:text-white transition-colors">Origins</a>
                <a href="#portfolio" onClick={scrollToSection('portfolio')} className="hover:text-white transition-colors">Case Studies</a>
                <a href="#lab" onClick={scrollToSection('lab')} className="hover:text-white transition-colors">Lab</a>
                <a href="#contact" onClick={scrollToSection('contact')} className="hover:text-white transition-colors">Connect</a>
            </nav>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
            <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                <div className="flex items-center justify-center gap-4">
                  <div className="h-[1px] w-8 bg-white/20"></div>
                  <div className="text-white/40 text-[10px] font-bold tracking-[0.6em] uppercase">
                    Seoul, South Korea | Est. 2014
                  </div>
                  <div className="h-[1px] w-8 bg-white/20"></div>
                </div>
                
                <h1 className="text-7xl md:text-[10rem] font-light tracking-tighter text-white leading-[0.85] font-display text-gradient-white py-4">
                  Systems for <br />
                  <span className="italic">the Soul.</span>
                </h1>

                <p className="text-sm md:text-lg text-white/50 max-w-xl mx-auto leading-relaxed tracking-wide font-light">
                  I build high-performance tools that solve the human gaps in education. From AI safety nets for students to time-recovery engines for school leaders.
                </p>

                <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-8">
                    <a href="#portfolio" onClick={scrollToSection('portfolio')} className="shiny-cta min-w-[240px]">
                        View Solutions
                    </a>
                    <button onClick={scrollToSection('lab')} className="text-white/40 hover:text-accent-gold text-[9px] font-bold uppercase tracking-[0.4em] transition-all flex items-center gap-3">
                      <SparklesIcon className="w-3 h-3" />
                      Try the Systems Lab
                    </button>
                </div>
            </div>
        </section>

        {/* IMPACT LEDGER (NEW SECTION) */}
        <section className="py-20 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24">
              {PORTFOLIO_DATA.impactMetrics.map((metric, i) => (
                <div key={i} className="space-y-2 text-center md:text-left">
                  <div className="text-4xl md:text-5xl font-light text-white font-display tracking-tighter">{metric.value}</div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ORIGIN STORY */}
        <section id="story" className="py-48 px-6">
          <div className="max-w-5xl mx-auto glass-panel rounded-[4rem] p-12 md:p-32 space-y-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
              <BookOpenIcon className="w-64 h-64 text-white" />
            </div>
            
            <div className="space-y-10 max-w-2xl relative z-10">
              <div className="text-accent-gold text-[9px] font-bold tracking-[0.6em] uppercase">Philosophy</div>
              <h2 className="text-5xl md:text-7xl font-light tracking-tight text-white font-display leading-[0.9]">Empathy is the <br /><span className="text-white/30">first feature.</span></h2>
              <p className="text-xl text-white/50 font-light leading-relaxed tracking-wide">
                Every tool I build comes from a specific 'I wish this existed' moment in a school hallway. I taught myself to code not to leave education, but to empower it.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-20 relative z-10">
              <div className="space-y-8 p-10 rounded-[2rem] bg-white/[0.02] border border-white/5">
                <div className="w-12 h-12 rounded-2xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center">
                  <BookOpenIcon className="w-5 h-5 text-accent-gold" />
                </div>
                <h3 className="text-2xl font-light text-white font-display tracking-wide">Bridging the Gap</h3>
                <p className="text-sm text-white/40 font-light leading-relaxed">
                  I saw parents who wanted to help their kids but felt excluded by language barriers. Chekki was built to give them their voice back.
                </p>
              </div>
              <div className="space-y-8 p-10 rounded-[2rem] bg-white/[0.02] border border-white/5">
                <div className="w-12 h-12 rounded-2xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-accent-gold" />
                </div>
                <h3 className="text-2xl font-light text-white font-display tracking-wide">Digital Allies</h3>
                <p className="text-sm text-white/40 font-light leading-relaxed">
                  I believe AI should be a quiet assistant, not a loud replacement. My tools automate the data so teachers can focus on the humans.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="portfolio" className="py-40 px-6 max-w-7xl mx-auto">
            <div className="mb-40 text-center space-y-6">
                <div className="text-white/20 text-[10px] font-bold tracking-[0.6em] uppercase">The Portfolio</div>
                <h2 className="text-6xl md:text-8xl font-light tracking-tighter text-white font-display">Proven Solutions.</h2>
            </div>

            <div className="space-y-80">
                {PORTFOLIO_DATA.projects.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} index={idx} />
                ))}
            </div>
        </section>

        {/* LAB SECTION */}
        <section id="lab" className="py-60">
            <div className="text-center mb-24 space-y-6">
                <div className="text-accent-gold text-[10px] font-bold tracking-[0.6em] uppercase">Interactive</div>
                <h2 className="text-5xl font-light text-white font-display tracking-tight">Systems Lab</h2>
            </div>
            <InteractiveDemo />
        </section>

        {/* ABOUT / CREDENTIALS */}
        <section id="about" className="py-60 px-6 relative overflow-hidden bg-white/[0.01]">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-32 items-start">
                <div className="space-y-12">
                  <div className="text-white/20 text-[10px] font-bold tracking-[0.6em] uppercase">Validation</div>
                  <h2 className="text-5xl font-light text-white font-display leading-tight">Grounded in <br /><span className="text-accent-gold/50 italic">Academic Rigor.</span></h2>
                  
                  <div className="space-y-12">
                    <div className="group border-l border-white/10 pl-10 py-2 hover:border-accent-gold transition-colors">
                      <div className="text-white/80 font-medium text-lg tracking-tight">Master of Education</div>
                      <div className="text-white/30 text-xs tracking-widest uppercase mt-2">University of Essex</div>
                    </div>
                    <div className="group border-l border-white/10 pl-10 py-2 hover:border-accent-gold transition-colors">
                      <div className="text-white/80 font-medium text-lg tracking-tight">Bachelor of Commercial Law</div>
                      <div className="text-white/30 text-xs tracking-widest uppercase mt-2">University of the Western Cape</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-16">
                  <div className="text-white/20 text-[10px] font-bold tracking-[0.6em] uppercase">Expertise</div>
                  <div className="grid grid-cols-1 gap-10">
                    {PORTFOLIO_DATA.skills.map(skill => (
                      <div key={skill.name} className="space-y-4">
                         <div className="flex justify-between items-center">
                            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60">{skill.name}</div>
                            <div className="text-[10px] text-accent-gold font-mono">{skill.level}%</div>
                         </div>
                         <div className="h-[2px] bg-white/5 w-full relative">
                            <div className="absolute h-full bg-accent-gold/50" style={{width: `${skill.level}%`}}></div>
                         </div>
                      </div>
                    ))}
                    <div className="pt-10">
                      <p className="text-xs text-white/30 font-light leading-relaxed tracking-widest uppercase">
                        Spec: Google AI • N8N • React • LMM Alignment
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-64 px-6 text-center">
            <div className="max-w-4xl mx-auto space-y-20">
                <h2 className="text-7xl md:text-[12rem] font-light tracking-tighter text-white font-display leading-[0.8]">
                  Speak to <br /><span className="text-accent-gold italic">Jason.</span>
                </h2>
                <p className="text-lg md:text-xl text-white/30 font-light max-w-lg mx-auto leading-relaxed">
                  Whether you're looking for a system architect or a classroom ally, let's start the conversation.
                </p>
                <div className="flex justify-center pt-10">
                    <a href="mailto:jsn.benjamin@gmail.com" className="shiny-cta px-16 py-6 text-[10px]">
                        <MailIcon className="w-4 h-4 mr-4" />
                        jsn.benjamin@gmail.com
                    </a>
                </div>
            </div>
        </section>
      </main>

      <footer className="py-24 border-t border-white/5 text-center bg-alpine-950">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.6em]">© 2024 Jason Benjamin — Built for the Future of Learning</p>
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">
              <a href="#" className="hover:text-accent-gold transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-accent-gold transition-colors">Github</a>
            </div>
          </div>
      </footer>

      <AIChat />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from './constants';
import ProjectCard from './components/ProjectCard';
import AIChat from './components/AIChat';
import InteractiveDemo from './components/InteractiveDemo';
import { MailIcon, SparklesIcon } from './components/Icons';

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
    <div className="min-h-screen selection:bg-accent-gold/30 selection:text-white font-sans">
      <header className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        isScrolled ? 'bg-alpine-950/98 backdrop-blur-3xl h-16 border-b border-white/5 shadow-2xl' : 'bg-transparent h-24'
      }`}>
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
            <span className="font-display font-light text-[11px] tracking-[0.7em] text-white uppercase">
              {PORTFOLIO_DATA.name}
            </span>
            <nav className="hidden md:flex items-center gap-12 text-[9px] font-bold uppercase tracking-[0.5em] text-white/30">
                <a href="#portfolio" onClick={scrollToSection('portfolio')} className="hover:text-white transition-colors">Portfolio</a>
                <a href="#lab" onClick={scrollToSection('lab')} className="hover:text-white transition-colors">The Lab</a>
                <a href="#about" onClick={scrollToSection('about')} className="hover:text-white transition-colors">Profile</a>
                <a href="#contact" onClick={scrollToSection('contact')} className="hover:text-white transition-colors">Contact</a>
            </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="relative min-h-[100vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-24 md:space-y-48 animate-in fade-in slide-in-from-bottom-12 duration-1000 relative z-10">
                <div className="space-y-12">
                    <div className="text-white/20 text-[10px] font-bold tracking-[1.2em] uppercase">Teacher • Developer • Systems Architect</div>
                    
                    <h1 className="text-6xl md:text-[11.5rem] font-light tracking-tighter text-white leading-[0.88] font-display text-gradient-white">
                      Tools for you, <br />
                      <span className="italic text-white/40 block mt-8 relative">
                        by you.
                        <div className="absolute -top-12 -right-12 w-24 h-24 bg-accent-gold/5 blur-3xl rounded-full animate-pulse"></div>
                      </span>
                    </h1>

                    <p className="text-xs md:text-sm text-white/20 max-w-sm mx-auto leading-relaxed font-light tracking-[0.4em] uppercase pt-12">
                      Engineering Elegant Efficiency for Education.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-16">
                    <a href="#portfolio" onClick={scrollToSection('portfolio')} className="shiny-cta min-w-[320px] group">
                        Browse The Registry
                        <div className="absolute right-8 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">→</div>
                    </a>
                    <button onClick={scrollToSection('lab')} className="text-white/15 hover:text-white text-[9px] font-bold uppercase tracking-[0.7em] transition-all flex items-center gap-5 group">
                      <SparklesIcon className="w-5 h-5 group-hover:text-accent-gold group-hover:rotate-[20deg] transition-all duration-700 ease-out" /> 
                      Solution Lab
                    </button>
                </div>
            </div>

            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 opacity-10 flex flex-col items-center gap-8 animate-in fade-in slide-in-from-top-4 duration-1000 delay-500">
              <span className="text-[7px] uppercase tracking-[1em] font-bold">Discover</span>
              <div className="w-[1px] h-24 bg-gradient-to-b from-white to-transparent"></div>
            </div>
        </section>

        {/* IMPACT */}
        <section className="py-40 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-20">
              {PORTFOLIO_DATA.impactMetrics.map((metric, i) => (
                <div key={i} className="text-center md:text-left space-y-4 group">
                  <div className="text-5xl font-light text-white font-display tracking-tight leading-none group-hover:text-accent-gold transition-colors duration-700">{metric.value}</div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.5em] text-white/20">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="py-80 px-6 max-w-6xl mx-auto">
            <div className="mb-64 text-center space-y-8">
                <div className="text-accent-gold/40 text-[10px] font-bold tracking-[1em] uppercase">01 / Selection</div>
                <h2 className="text-6xl font-light tracking-tight text-white font-display">Featured Projects</h2>
                <div className="w-20 h-[1px] bg-white/5 mx-auto"></div>
            </div>
            <div className="space-y-[32rem]">
                {PORTFOLIO_DATA.projects.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} index={idx} />
                ))}
            </div>
        </section>

        {/* LAB */}
        <section id="lab" className="py-80 relative overflow-hidden bg-white/[0.01]">
            <div className="text-center mb-40 px-6 space-y-10 relative z-10">
                <div className="text-white/20 text-[10px] font-bold tracking-[1em] uppercase">02 / Synthesis</div>
                <h2 className="text-6xl font-light text-white font-display tracking-tight">The Solution Lab</h2>
                <p className="text-white/30 text-xs max-w-sm mx-auto font-light leading-relaxed tracking-widest uppercase">
                  AI-Assisted Architectural Proposals.
                </p>
            </div>
            <InteractiveDemo />
        </section>

        {/* PROFILE */}
        <section id="about" className="py-80 px-6 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-40">
            <div className="space-y-20">
               <div className="text-accent-gold text-[10px] font-bold tracking-[0.8em] uppercase">03 / Profile</div>
               <h2 className="text-7xl font-light text-white font-display leading-[1.05] tracking-tighter">Teacher turned <br /><span className="text-white/20 italic">developer.</span></h2>
               <p className="text-xl text-white/40 font-light leading-relaxed max-w-lg">
                 After a decade in the classroom, I moved from pedagogy to systems. I build quiet, high-impact tools that prioritize the human element of education.
               </p>
               <div className="space-y-12 pt-8">
                  <div className="border-l border-white/10 pl-12 py-3 group hover:border-accent-gold/60 transition-all duration-700">
                    <div className="text-white/90 font-medium text-lg tracking-tight">Master of Education</div>
                    <div className="text-white/15 text-[10px] tracking-[0.4em] uppercase mt-4">Advanced Systems Design</div>
                  </div>
                  <div className="border-l border-white/10 pl-12 py-3 group hover:border-accent-gold/60 transition-all duration-700">
                    <div className="text-white/90 font-medium text-lg tracking-tight">Bachelor of Laws</div>
                    <div className="text-white/15 text-[10px] tracking-[0.4em] uppercase mt-4">Structural Logic & Equity</div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-16 glass-panel p-20 rounded-[4rem] bg-white/[0.01]">
               <div className="text-white/20 text-[10px] font-bold uppercase tracking-[0.8em] mb-4">Core Tech</div>
               <div className="space-y-12">
                {PORTFOLIO_DATA.skills.map(skill => (
                    <div key={skill.name} className="space-y-6">
                      <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-[0.4em] text-white/50">
                          <span>{skill.name}</span>
                          <span className="text-accent-gold font-mono tracking-normal">{skill.level}%</span>
                      </div>
                      <div className="h-[1px] bg-white/5 w-full relative">
                          <div className="absolute h-full bg-accent-gold/40 transition-all duration-1000 ease-out" style={{width: `${skill.level}%`}}></div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-96 px-6 text-center border-t border-white/5 bg-gradient-to-b from-transparent to-black/40">
            <div className="max-w-4xl mx-auto space-y-20">
                <div className="text-accent-gold text-[10px] font-bold tracking-[1.2em] uppercase">Initiation</div>
                <h2 className="text-8xl md:text-[13rem] font-light text-white font-display tracking-tighter leading-none opacity-90">Let's build.</h2>
                <p className="text-white/30 font-light text-lg leading-relaxed max-w-md mx-auto tracking-wide">
                  Now accepting select mandates for educational automation and bespoke system architecture.
                </p>
                <div className="flex justify-center pt-16">
                    <a href="mailto:jsn.benjamin@gmail.com" className="shiny-cta px-24 py-10 text-[12px] tracking-[0.5em]">
                        <MailIcon className="w-6 h-6 mr-6 opacity-40" />
                        Send Inquiry
                    </a>
                </div>
            </div>
        </section>
      </main>

      <footer className="py-32 text-center bg-black/80 border-t border-white/5">
          <p className="text-[11px] text-white/10 font-bold uppercase tracking-[1em]">
            © 2024 Jason Benjamin — Handcrafted in Seoul, Korea
          </p>
      </footer>

      <AIChat />
    </div>
  );
}

export default App;
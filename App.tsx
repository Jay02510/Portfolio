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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen selection:bg-accent-gold/30 selection:text-white font-sans">
      <header className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        isScrolled ? 'bg-alpine-950/98 backdrop-blur-3xl h-16 border-b border-white/5 shadow-2xl' : 'bg-transparent h-24'
      }`}>
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
            <span className="font-display font-light text-[11px] tracking-[0.7em] text-white uppercase">
              AMIN
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
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden pt-32 pb-16">
            {/* 3D Background Asset - Visual Pop */}
            <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
                <div className="absolute w-full h-full bg-[#0d0f14] z-[-2]"></div>
                {/* Abstract 3D Render to provide depth */}
                <img 
                  src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2560&auto=format&fit=crop" 
                  className="absolute w-full h-full object-cover opacity-10 mix-blend-plus-lighter scale-110 animate-drift"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-b from-alpine-950 via-transparent to-alpine-950"></div>
                
                {/* Floating Glows */}
                <div className="absolute top-[10%] left-[5%] w-[45rem] h-[45rem] bg-accent-gold/5 rounded-full blur-[140px] animate-float-slow opacity-20"></div>
                <div className="absolute bottom-[10%] right-[5%] w-[40rem] h-[40rem] bg-white/5 rounded-full blur-[120px] animate-drift opacity-15"></div>
            </div>

            <div className="max-w-7xl mx-auto space-y-16 md:space-y-24 animate-in fade-in slide-in-from-bottom-12 duration-1000 relative z-10">
                <div className="space-y-8 md:space-y-12">
                    <div className="flex items-center justify-center gap-4 text-white/30 text-[9px] md:text-[10px] font-bold tracking-[0.8em] uppercase">
                      TEACHER <span className="text-accent-gold/30">•</span> DEVELOPER <span className="text-accent-gold/30">•</span> APP BUILDER
                    </div>
                    
                    <div className="relative inline-block py-2">
                      <h1 className="text-5xl md:text-8xl lg:text-9xl font-light tracking-tighter text-white leading-tight font-display text-gradient-white">
                        Tools for you, <br />
                        <span className="italic text-white/40 block mt-4 md:mt-6 tracking-tighter">
                          by you.
                        </span>
                      </h1>
                    </div>

                    <p className="text-[9px] md:text-xs text-white/30 max-w-sm mx-auto leading-relaxed font-light tracking-[0.4em] uppercase pt-4 md:pt-8">
                      Simple tools for smarter schools.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12">
                    <a href="#portfolio" onClick={scrollToSection('portfolio')} className="shiny-cta min-w-[260px] md:min-w-[320px] group">
                        Browse My Tools
                        <div className="absolute right-8 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">→</div>
                    </a>
                    <button onClick={scrollToSection('lab')} className="text-white/15 hover:text-white text-[9px] font-bold uppercase tracking-[0.7em] transition-all flex items-center gap-5 group">
                      <SparklesIcon className="w-5 h-5 group-hover:text-accent-gold group-hover:rotate-[20deg] transition-all duration-700 ease-out" /> 
                      Solution Lab
                    </button>
                </div>
            </div>

            {/* Scroll Indicator - Moved inside main flow to prevent overlap */}
            <div className="relative z-10 opacity-20 flex flex-col items-center gap-6 animate-in fade-in slide-in-from-top-4 duration-1000 delay-500 mt-16 md:mt-24">
              <span className="text-[7px] uppercase tracking-[1em] font-bold">Scroll Down</span>
              <div className="w-[1px] h-10 md:h-16 bg-gradient-to-b from-white/40 to-transparent"></div>
            </div>
        </section>

        {/* IMPACT */}
        <section className="py-24 md:py-32 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20">
              {PORTFOLIO_DATA.impactMetrics.map((metric, i) => (
                <div key={i} className="text-center md:text-left space-y-4 group">
                  <div className="text-4xl md:text-5xl font-light text-white font-display tracking-tight leading-none group-hover:text-accent-gold transition-colors duration-700 text-gradient-white">{metric.value}</div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.5em] text-white/20">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="py-32 md:py-48 px-6 max-w-6xl mx-auto">
            <div className="mb-24 md:mb-40 text-center space-y-8">
                <div className="text-accent-gold/40 text-[10px] font-bold tracking-[1em] uppercase">01 / Selection</div>
                <h2 className="text-5xl md:text-6xl font-light tracking-tight text-white font-display text-gradient-white">Featured Projects</h2>
                <div className="w-20 h-[1px] bg-white/5 mx-auto"></div>
            </div>
            <div className="space-y-[15rem] md:space-y-[25rem]">
                {PORTFOLIO_DATA.projects.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} index={idx} />
                ))}
            </div>
        </section>

        {/* LAB */}
        <section id="lab" className="py-32 md:py-48 relative overflow-hidden bg-white/[0.01]">
            <div className="text-center mb-16 md:mb-32 px-6 space-y-10 relative z-10">
                <div className="text-white/20 text-[10px] font-bold tracking-[1em] uppercase">02 / Lab</div>
                <h2 className="text-5xl md:text-6xl font-light text-white font-display tracking-tight text-gradient-white">The Solution Lab</h2>
                <p className="text-white/30 text-xs max-w-sm mx-auto font-light leading-relaxed tracking-widest uppercase">
                  Tell me your problem, I'll design the app.
                </p>
            </div>
            <InteractiveDemo />
        </section>

        {/* PROFILE */}
        <section id="about" className="py-32 md:py-48 px-6 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 md:gap-40">
            <div className="space-y-12 md:space-y-20">
               <div className="text-accent-gold text-[10px] font-bold tracking-[0.8em] uppercase">03 / Profile</div>
               <h2 className="text-5xl md:text-7xl font-light text-white font-display leading-[1.05] tracking-tighter text-gradient-white">Teacher turned <br /><span className="text-white/20 italic">developer.</span></h2>
               <p className="text-lg md:text-xl text-white/40 font-light leading-relaxed max-w-lg">
                 After ten years in the classroom, I learned that the best tools are the ones that just work. I build simple apps that give teachers more time for their students.
               </p>
               <div className="space-y-10 md:space-y-12 pt-8">
                  <div className="border-l border-white/10 pl-10 md:pl-12 py-3 group hover:border-accent-gold/60 transition-all duration-700">
                    <div className="text-white/90 font-medium text-lg tracking-tight">Master of Education</div>
                    <div className="text-white/15 text-[10px] tracking-[0.4em] uppercase mt-4">Curriculum Design</div>
                  </div>
                  <div className="border-l border-white/10 pl-10 md:pl-12 py-3 group hover:border-accent-gold/60 transition-all duration-700">
                    <div className="text-white/90 font-medium text-lg tracking-tight">Bachelor of Commercial Law</div>
                    <div className="text-white/15 text-[10px] tracking-[0.4em] uppercase mt-4">Legal Logic</div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-12 md:gap-16 glass-panel p-10 md:p-20 rounded-[3rem] md:rounded-[4rem] bg-white/[0.01]">
               <div className="text-white/20 text-[10px] font-bold uppercase tracking-[0.8em] mb-4">My Skills</div>
               <div className="space-y-10 md:space-y-12">
                {PORTFOLIO_DATA.skills.map(skill => (
                    <div key={skill.name} className="space-y-4 md:space-y-6">
                      <div className="flex justify-between items-center text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-white/50">
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
        <section id="contact" className="py-48 md:py-64 px-6 text-center border-t border-white/5 bg-gradient-to-b from-transparent to-black/40">
            <div className="max-w-4xl mx-auto space-y-16 md:space-y-20">
                <div className="text-accent-gold text-[10px] font-bold tracking-[1.2em] uppercase">Get In Touch</div>
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-light text-white font-display tracking-tighter leading-none opacity-90 text-gradient-white">Let's build.</h2>
                <p className="text-white/30 font-light text-base md:text-lg leading-relaxed max-w-md mx-auto tracking-wide">
                  I'm ready to build your next tool. Send me a message and let's get started.
                </p>
                <div className="flex justify-center pt-12 md:pt-16">
                    <a href="mailto:jsn.benjamin@gmail.com" className="shiny-cta px-16 md:px-24 py-8 md:py-10 text-[11px] md:text-[12px] tracking-[0.5em]">
                        <MailIcon className="w-6 h-6 mr-6 opacity-40" />
                        Send a Message
                    </a>
                </div>
            </div>
        </section>
      </main>

      <footer className="py-24 md:py-32 text-center bg-black/80 border-t border-white/5">
          <p className="text-[11px] text-white/10 font-bold uppercase tracking-[1em]">
            © 2024 Jason Benjamin — Handcrafted in Seoul, Korea
          </p>
      </footer>

      <AIChat />
    </div>
  );
}

export default App;
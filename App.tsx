
import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from './constants.ts';
import ProjectCard from './components/ProjectCard.tsx';
import AIChat from './components/AIChat.tsx';
import InteractiveDemo from './components/InteractiveDemo.tsx';
import { MailIcon, SparklesIcon, SendIcon } from './components/Icons.tsx';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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

  const handleFeedback = () => {
    const subject = encodeURIComponent("Portfolio Feedback / Improvement for Jason Benjamin");
    const body = encodeURIComponent("Hi Jason,\n\nI was looking at your portfolio and had an idea for an improvement or found a gap:\n\n[Your thoughts here]");
    window.location.href = `mailto:jsn.benjamin@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen selection:bg-accent-gold/30 selection:text-white font-sans">
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 flex items-center ${
        isScrolled 
          ? 'bg-alpine-950/98 backdrop-blur-3xl py-4 border-b border-white/10 shadow-2xl' 
          : 'bg-transparent py-8 md:py-12'
      }`}>
        <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between h-full">
            <span className="font-display font-light text-[10px] md:text-[11px] tracking-[0.7em] text-white uppercase whitespace-nowrap leading-none">
              J. BENJAMIN
            </span>
            <nav className="hidden md:flex items-center gap-12 text-[9px] font-bold uppercase tracking-[0.5em] text-white/40">
                <a href="#portfolio" onClick={scrollToSection('portfolio')} className="hover:text-white transition-colors">Examples</a>
                <a href="#lab" onClick={scrollToSection('lab')} className="hover:text-white transition-colors">Idea Explorer</a>
                <a href="#about" onClick={scrollToSection('about')} className="hover:text-white transition-colors">My Story</a>
                <a href="#contact" onClick={scrollToSection('contact')} className="hover:text-white transition-colors">Connect</a>
            </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden pt-32 pb-12">
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
                <div className="absolute w-full h-full bg-[#0d0f14] z-[-2]"></div>
                <img 
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2560&auto=format&fit=crop" 
                  className="absolute w-full h-full object-cover opacity-[0.06] mix-blend-screen scale-125 animate-drift"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-alpine-950 via-transparent to-alpine-950"></div>
                
                <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-accent-gold/5 rounded-full blur-[140px] animate-float-slow opacity-20"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-white/5 rounded-full blur-[120px] animate-drift opacity-15"></div>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col items-center gap-10 md:gap-16 animate-in fade-in slide-in-from-bottom-12 duration-1000 relative z-10">
                <div className="space-y-6 md:space-y-8">
                    <div className="flex items-center justify-center gap-4 text-white/40 text-[9px] md:text-[10px] font-bold tracking-[0.8em] uppercase">
                      BUILDING HELPERS FOR SCHOOLS
                    </div>
                    
                    <div className="relative">
                      <h1 className="text-5xl md:text-8xl lg:text-9xl font-light tracking-tighter text-white leading-[1.2] font-display text-gradient-white pb-6">
                        Real tools for <br />
                        <span className="italic text-white/40 block tracking-tighter pt-2 md:pt-4">
                          real people.
                        </span>
                      </h1>
                    </div>

                    <p className="text-[10px] md:text-xs text-white/50 max-w-lg mx-auto leading-relaxed font-light tracking-wide uppercase">
                      Teacher turned EdTech creator — solving real pain points for teachers, students, and parents.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
                    <a href="#portfolio" onClick={scrollToSection('portfolio')} className="shiny-cta min-w-[260px] md:min-w-[300px] group">
                        See how they work
                        <div className="absolute right-8 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">→</div>
                    </a>
                    <button onClick={scrollToSection('lab')} className="ghost-cta min-w-[260px] md:min-w-[300px] flex items-center gap-5 group">
                      <SparklesIcon className="w-5 h-5 group-hover:text-accent-gold group-hover:rotate-[20deg] transition-all duration-700 ease-out" /> 
                      Idea Explorer
                    </button>
                </div>
            </div>

            <div className="relative z-10 opacity-30 flex flex-col items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-1000 delay-500 mt-12 md:mt-20">
              <span className="text-[7px] uppercase tracking-[1em] font-bold leading-none">Scroll to explore</span>
              <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
            </div>
        </section>

        {/* EXPLANATION SECTION */}
        <section className="py-24 bg-alpine-950/50 border-y border-white/[0.08]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-light text-white font-display mb-8">Tools for you.</h2>
            <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-light tracking-wide">
              Every thing on this site is built to solve a problem that I saw while teaching. You can launch the live previews to see them in action. This is about showing you what is possible when we focus on simple solutions.
            </p>
          </div>
        </section>

        {/* IMPACT */}
        <section className="py-20 md:py-24 bg-white/[0.01]">
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
        <section id="portfolio" className="py-24 md:py-32 px-6 max-w-6xl mx-auto">
            <div className="mb-20 md:mb-32 text-center space-y-6">
                <div className="text-accent-gold/50 text-[10px] font-bold tracking-[1em] uppercase">01 / Examples</div>
                <h2 className="text-5xl md:text-6xl font-light tracking-tight text-white font-display text-gradient-white">Helpful Tools</h2>
                <div className="w-16 h-[1px] bg-white/10 mx-auto"></div>
            </div>
            <div className="space-y-[10rem] md:space-y-[15rem]">
                {PORTFOLIO_DATA.projects.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} index={idx} />
                ))}
            </div>
        </section>

        {/* LAB */}
        <section id="lab" className="py-24 md:py-32 relative overflow-hidden bg-white/[0.01]">
            <div className="text-center mb-10 md:mb-16 px-6 space-y-6 relative z-10">
                <div className="text-white/30 text-[10px] font-bold tracking-[1em] uppercase">02 / Explorer</div>
                <h2 className="text-5xl md:text-6xl font-light text-white font-display tracking-tight text-gradient-white">Idea Explorer</h2>
                <p className="text-white/40 text-xs max-w-sm mx-auto font-light leading-relaxed tracking-widest uppercase">
                  Tell me about a task that takes too long. I'll show you how a helper could fix it.
                </p>
            </div>
            <InteractiveDemo />
        </section>

        {/* PROFILE */}
        <section id="about" className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-32">
            <div className="space-y-10 md:space-y-14">
               <div className="text-accent-gold text-[10px] font-bold tracking-[0.8em] uppercase leading-none">03 / My Story</div>
               <h2 className="text-5xl md:text-7xl font-light text-white font-display leading-[1.05] tracking-tighter text-gradient-white">A teacher who <br /><span className="text-white/20 italic">builds things.</span></h2>
               <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-lg">
                 After ten years in the classroom, I learned that the best tools are the ones that work as they promise. My goal is to continue to build and solve problems for everyone associated with the classroom.
               </p>
               <div className="space-y-8 md:space-y-10 pt-4">
                  <div className="border-l border-white/20 pl-8 md:pl-10 py-2 group hover:border-accent-gold transition-all duration-700">
                    <div className="text-white/90 font-medium text-lg tracking-tight">Focus on Results</div>
                    <div className="text-white/30 text-[10px] tracking-[0.4em] uppercase mt-2">Helping people, not just building tech</div>
                  </div>
                  <div className="border-l border-white/20 pl-8 md:pl-10 py-2 group hover:border-accent-gold transition-all duration-700">
                    <div className="text-white/90 font-medium text-lg tracking-tight">Korean Classrooms</div>
                    <div className="text-white/30 text-[10px] tracking-[0.4em] uppercase mt-2">A decade of learning what schools need</div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-10 md:gap-14 glass-panel p-8 md:p-16 rounded-[2.5rem] md:rounded-[3.5rem] bg-white/[0.01]">
               <div className="text-white/30 text-[10px] font-bold uppercase tracking-[0.8em] mb-2 leading-none">Core Strengths</div>
               <div className="space-y-8 md:space-y-10">
                {PORTFOLIO_DATA.skills.map(skill => (
                    <div key={skill.name} className="space-y-4 md:space-y-6">
                      <div className="flex justify-between items-center text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-white/50">
                          <span>{skill.name}</span>
                          <span className="text-accent-gold font-mono tracking-normal">{skill.level}%</span>
                      </div>
                      <div className="h-[1px] bg-white/10 w-full relative">
                          <div className="absolute h-full bg-accent-gold transition-all duration-1000 ease-out" style={{width: `${skill.level}%`}}></div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-40 md:py-52 px-6 text-center border-t border-white/[0.08] bg-gradient-to-b from-transparent to-black/40">
            <div className="max-w-5xl mx-auto space-y-12 md:space-y-16">
                <div className="text-accent-gold text-[10px] font-bold tracking-[1.2em] uppercase leading-none">Get In Touch</div>
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-light text-white font-display tracking-tighter leading-none opacity-90 text-gradient-white">Let's chat.</h2>
                <p className="text-white/40 font-light text-base md:text-lg leading-relaxed max-w-md mx-auto tracking-wide">
                  I'm always looking for new problems to solve. Send me a message if you have an idea or just want to say hi.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8 md:pt-12">
                    <a href="mailto:jsn.benjamin@gmail.com" className="shiny-cta min-w-[280px] md:min-w-[320px] px-12 py-6 text-[11px] tracking-[0.5em]">
                        <MailIcon className="w-5 h-5 mr-5 opacity-40" />
                        Send a Message
                    </a>
                    <button onClick={handleFeedback} className="ghost-cta min-w-[280px] md:min-w-[320px] px-12 py-6 text-[11px] tracking-[0.5em] flex items-center justify-center gap-4 group">
                        <SendIcon className="w-5 h-5 opacity-40 group-hover:text-accent-gold transition-colors" />
                        Share an Improvement
                    </button>
                </div>
            </div>
        </section>
      </main>

      <footer className="py-20 md:py-24 text-center bg-black/80 border-t border-white/[0.08]">
          <p className="text-[10px] md:text-[11px] text-white/20 font-bold uppercase tracking-[1em] leading-none">
            © 2024 Jason Benjamin — Handcrafted in Seoul, Korea
          </p>
      </footer>

      <AIChat />
    </div>
  );
}

export default App;

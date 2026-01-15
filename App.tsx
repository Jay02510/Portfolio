
import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from './constants';
import ProjectCard from './components/ProjectCard';
import AIChat from './components/AIChat';
import InteractiveDemo from './components/InteractiveDemo';
import { 
  BookOpenIcon, 
  MailIcon,
  SparklesIcon,
  CodeIcon
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
                <a href="#about" onClick={scrollToSection('about')} className="hover:text-white transition-colors">About Me</a>
                <a href="#portfolio" onClick={scrollToSection('portfolio')} className="hover:text-white transition-colors">Portfolio</a>
                <a href="#lab" onClick={scrollToSection('lab')} className="hover:text-white transition-colors">MVP Sandbox</a>
                <a href="#contact" onClick={scrollToSection('contact')} className="hover:text-white transition-colors">Fix a Friction</a>
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
                        The Portfolio
                    </a>
                    <button onClick={scrollToSection('lab')} className="text-white/40 hover:text-accent-gold text-[9px] font-bold uppercase tracking-[0.4em] transition-all flex items-center gap-3">
                      <SparklesIcon className="w-3 h-3" />
                      Architect an MVP
                    </button>
                </div>
            </div>
        </section>

        {/* IMPACT LEDGER */}
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

        {/* ABOUT ME SECTION (RESTORED & REDESIGNED) */}
        <section id="about" className="py-48 px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-24 items-start">
            <div className="lg:w-1/3 space-y-12">
               <div className="text-accent-gold text-[10px] font-bold tracking-[0.6em] uppercase">The Architect</div>
               <h2 className="text-6xl font-light text-white font-display leading-[0.9]">Teacher. <br /><span className="text-white/30">Developer.</span> <br />Problem Solver.</h2>
               <div className="h-1 w-20 bg-accent-gold/20"></div>
               <p className="text-lg text-white/50 font-light leading-relaxed">
                 I spent ten years in the classrooms of Seoul watching teachers drown in spreadsheets and students fall through systemic gaps. I didn't learn to code to leave education; I learned to code to save it.
               </p>
            </div>

            <div className="lg:w-2/3 grid md:grid-cols-2 gap-8">
               <div className="glass-panel rounded-[2rem] p-10 space-y-6">
                  <BookOpenIcon className="w-8 h-8 text-accent-gold opacity-50" />
                  <h3 className="text-2xl font-light text-white font-display">Deep Pedagogy</h3>
                  <p className="text-sm text-white/40 font-light leading-relaxed">
                    With a Master of Education, I understand the psychology of learning. My tools aren't just technical; they are pedagogical.
                  </p>
               </div>
               <div className="glass-panel rounded-[2rem] p-10 space-y-6">
                  <CodeIcon className="w-8 h-8 text-accent-gold opacity-50" />
                  <h3 className="text-2xl font-light text-white font-display">Custom Logic</h3>
                  <p className="text-sm text-white/40 font-light leading-relaxed">
                    I specialize in "glue-code"—connecting LLMs to real-world workflows to automate the 80% of tasks that shouldn't require a human brain.
                  </p>
               </div>
               <div className="md:col-span-2 glass-panel rounded-[2rem] p-10 grid md:grid-cols-2 gap-10 items-center">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-light text-white font-display">Technical Toolkit</h3>
                    <p className="text-[9px] text-white/20 font-bold uppercase tracking-[0.4em]">Core Competencies</p>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Gemini API', 'N8N', 'Node.js', 'PostgreSQL', 'Python'].map(t => (
                        <span key={t} className="px-3 py-1 border border-white/5 rounded text-[10px] text-white/40 uppercase tracking-widest">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-white/60 text-xs font-light italic leading-relaxed">
                      "Jason understands the classroom because he lived in it. His tools don't just work; they feel right to teachers."
                    </div>
                    <div className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent-gold">— School Director, Seoul</div>
                  </div>
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

        {/* LAB SECTION - REDESIGNED */}
        <section id="lab" className="py-60">
            <div className="text-center mb-24 space-y-6 px-6">
                <div className="text-accent-gold text-[10px] font-bold tracking-[0.6em] uppercase">MVP Architect</div>
                <h2 className="text-5xl font-light text-white font-display tracking-tight">The Systems Lab</h2>
                <p className="text-white/40 text-sm max-w-lg mx-auto font-light leading-relaxed">
                  Share a problem you face in your educational system. I'll architect three technical ways to fix it. Select one to start a project proposal.
                </p>
            </div>
            <InteractiveDemo />
        </section>

        {/* CREDENTIALS */}
        <section id="credentials" className="py-60 px-6 bg-white/[0.01]">
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
                  </div>
                </div>
              </div>
            </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-64 px-6 text-center">
            <div className="max-w-4xl mx-auto space-y-20">
                <div className="space-y-6">
                  <div className="text-accent-gold text-[10px] font-bold tracking-[0.6em] uppercase">Share Your Friction</div>
                  <h2 className="text-6xl md:text-9xl font-light tracking-tighter text-white font-display leading-[0.8] mb-12">
                    What's <span className="text-white/20 italic">Broken?</span>
                  </h2>
                  <p className="text-lg md:text-xl text-white/40 font-light max-w-2xl mx-auto leading-relaxed">
                    If you have a manual process that's draining your energy or a student group falling through the cracks, <span className="text-white">tell me the problem</span>. I'll build the system to fix it.
                  </p>
                </div>

                <div className="flex justify-center pt-10">
                    <a href="mailto:jsn.benjamin@gmail.com?subject=I have a friction point to fix" className="shiny-cta px-16 py-6 text-[10px]">
                        <MailIcon className="w-4 h-4 mr-4" />
                        Fix my friction
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

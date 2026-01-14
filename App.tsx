import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from './constants';
import ProjectCard from './components/ProjectCard';
import AIChat from './components/AIChat';
import InteractiveDemo from './components/InteractiveDemo';
import { 
  BookOpenIcon, 
  MailIcon
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
    <div className="min-h-screen selection:bg-white/20 selection:text-white">
      {/* HEADER */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        isScrolled ? 'bg-alpine-950/60 backdrop-blur-2xl h-16 border-b border-white/5' : 'bg-transparent h-24'
      }`}>
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
            <div className="flex items-center gap-3">
                <span className="font-display font-light text-xs tracking-[0.5em] text-white uppercase">
                  {PORTFOLIO_DATA.name}
                </span>
            </div>

            <nav className="hidden md:flex items-center gap-12 text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">
                <a href="#portfolio" onClick={scrollToSection('portfolio')} className="hover:text-white transition-colors">Solutions</a>
                <a href="#lab" onClick={scrollToSection('lab')} className="hover:text-white transition-colors">Digital Lab</a>
                <a href="#about" onClick={scrollToSection('about')} className="hover:text-white transition-colors">Philosophy</a>
                <a href="#contact" onClick={scrollToSection('contact')} className="hover:text-white transition-colors">Contact</a>
            </nav>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
            <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                <div className="text-white/40 text-[9px] font-bold tracking-[0.6em] uppercase">
                  Institutional Architecture
                </div>
                
                <h1 className="text-6xl md:text-9xl font-light tracking-tighter text-white leading-none font-display text-gradient-white">
                  Modernize <br />
                  <span>The Campus.</span>
                </h1>

                <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto leading-relaxed tracking-wide font-light">
                  I design invisible infrastructure for modern schools. Simple tools that manage your scheduling, insights, and feedback automatically.
                </p>

                <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
                    <a href="#portfolio" onClick={scrollToSection('portfolio')} className="shiny-cta">
                        Explore Solutions
                    </a>
                    <button onClick={scrollToSection('contact')} className="text-white/40 hover:text-white text-[9px] font-bold uppercase tracking-[0.3em] transition-colors border-b border-white/10 pb-1">
                      Start Deployment
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-[1px] h-12 bg-gradient-to-bottom from-transparent via-white/40 to-transparent"></div>
            </div>
        </section>

        {/* PROJECTS SECTION - THE "ACCOMMODATIONS" FLOW */}
        <section id="portfolio" className="py-40 px-6 max-w-6xl mx-auto">
            <div className="mb-32 text-center space-y-6">
                <div className="text-white/30 text-[9px] font-bold tracking-[0.5em] uppercase">The Portfolio</div>
                <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white font-display">School Suites</h2>
            </div>

            <div className="space-y-64">
                {PORTFOLIO_DATA.projects.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} index={idx} />
                ))}
            </div>
        </section>

        {/* INTERACTIVE LAB SECTION */}
        <section id="lab" className="py-40">
           <div className="max-w-6xl mx-auto px-6 mb-20">
              <div className="text-white/30 text-[9px] font-bold tracking-[0.5em] uppercase mb-4 text-center">Experimental</div>
              <h2 className="text-4xl font-light tracking-tight text-white font-display text-center">Digital Lab</h2>
           </div>
           <InteractiveDemo />
        </section>

        {/* PHILOSOPHY SECTION */}
        <section id="about" className="py-60 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/[0.02] -z-10"></div>
            <div className="max-w-4xl mx-auto text-center space-y-16">
                <div className="inline-block p-4 border border-white/10 rounded-full">
                  <BookOpenIcon className="w-5 h-5 text-white/60" />
                </div>
                <h2 className="text-4xl md:text-6xl font-light text-white font-display leading-tight">
                  Design that <span className="text-white/30 italic">fades away.</span>
                </h2>
                <p className="text-lg text-white/50 font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
                  True educational technology shouldn't demand a teacher's attention. It should be a silent partner that handles the complexity of scheduling and data, allowing educators to focus on their students.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10">
                   {PORTFOLIO_DATA.skills.slice(0, 4).map(skill => (
                     <div key={skill.name} className="space-y-3">
                        <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">{skill.name}</div>
                        <div className="h-[1px] bg-white/10 w-full relative">
                           <div className="absolute h-full bg-white/60" style={{width: `${skill.level}%`}}></div>
                        </div>
                     </div>
                   ))}
                </div>
            </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-64 px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-16">
                <h2 className="text-6xl md:text-8xl font-light tracking-tighter text-white font-display">
                  Let's <span className="text-white/30 italic">Consult.</span>
                </h2>
                <p className="text-lg text-white/40 font-light max-w-md mx-auto leading-relaxed">
                  Available for select partnerships with K-12 and Higher Ed institutions looking to modernize their infrastructure.
                </p>
                <div className="flex justify-center pt-10">
                    <a href="mailto:hello@jasonbenjamin.edu" className="shiny-cta px-12 py-5">
                        <MailIcon className="w-4 h-4 mr-3" />
                        Send Inquiry
                    </a>
                </div>
            </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 text-center bg-alpine-950">
          <p className="text-[9px] text-white/20 font-medium uppercase tracking-[0.6em]">© 2024 — Modern Institutional Architecture</p>
      </footer>

      <AIChat />
    </div>
  );
}

export default App;
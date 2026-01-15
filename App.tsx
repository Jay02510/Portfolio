import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from './constants';
import ProjectCard from './components/ProjectCard';
import AIChat from './components/AIChat';
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
                <a href="#story" onClick={scrollToSection('story')} className="hover:text-white transition-colors">The Story</a>
                <a href="#portfolio" onClick={scrollToSection('portfolio')} className="hover:text-white transition-colors">Tools</a>
                <a href="#about" onClick={scrollToSection('about')} className="hover:text-white transition-colors">Credentials</a>
                <a href="#contact" onClick={scrollToSection('contact')} className="hover:text-white transition-colors">Contact</a>
            </nav>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
            <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                <div className="text-white/40 text-[9px] font-bold tracking-[0.6em] uppercase">
                  South Korea | 10+ Years in Education
                </div>
                
                <h1 className="text-6xl md:text-9xl font-light tracking-tighter text-white leading-none font-display text-gradient-white">
                  Solving the <br />
                  <span>Human Gap.</span>
                </h1>

                <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto leading-relaxed tracking-wide font-light">
                  I don't just build apps. I build bridges for students falling behind, for parents who feel excluded, and for educators overwhelmed by systems.
                </p>

                <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
                    <a href="#story" onClick={scrollToSection('story')} className="shiny-cta">
                        Read the Story
                    </a>
                    <button onClick={scrollToSection('portfolio')} className="text-white/40 hover:text-white text-[9px] font-bold uppercase tracking-[0.3em] transition-colors border-b border-white/10 pb-1">
                      Skip to Tools
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-[1px] h-12 bg-gradient-to-bottom from-transparent via-white/40 to-transparent"></div>
            </div>
        </section>

        {/* ORIGIN STORY SECTION */}
        <section id="story" className="py-40 px-6">
          <div className="max-w-5xl mx-auto glass-panel rounded-[3rem] p-12 md:p-24 space-y-24">
            <div className="space-y-8 max-w-2xl">
              <div className="text-white/30 text-[9px] font-bold tracking-[0.5em] uppercase">The Spark</div>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white font-display">It started in the classroom.</h2>
              <p className="text-lg text-white/50 font-light leading-relaxed tracking-wide">
                As a teacher in Seoul, I watched brilliant students struggle because the standard curriculum didn't have room for those who needed a different pace. I saw parents who wanted to help their kids with English homework but felt paralyzed because they couldn't read the instructions themselves.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <BookOpenIcon className="w-5 h-5 text-white/60" />
                </div>
                <h3 className="text-2xl font-light text-white font-display tracking-wide">Technology as an Ally</h3>
                <p className="text-sm text-white/40 font-light leading-relaxed">
                  I realized that the 'Excel mazes' my directors lived in weren't just administrative burdens—they were taking away time that should have been spent on mentorship. I taught myself to build these systems not to replace people, but to set them free.
                </p>
              </div>
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <MailIcon className="w-5 h-5 text-white/60" />
                </div>
                <h3 className="text-2xl font-light text-white font-display tracking-wide">Real Solutions</h3>
                <p className="text-sm text-white/40 font-light leading-relaxed">
                  Every tool I build comes from a specific 'I wish this existed' moment in a school hallway. Whether it's a scheduler that saves a director weeks of work or an AI that translates homework for a struggling parent, it's always personal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="portfolio" className="py-40 px-6 max-w-6xl mx-auto">
            <div className="mb-32 text-center space-y-6">
                <div className="text-white/30 text-[9px] font-bold tracking-[0.5em] uppercase">The Results</div>
                <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white font-display">Tools Born from Experience</h2>
            </div>

            <div className="space-y-64">
                {PORTFOLIO_DATA.projects.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} index={idx} />
                ))}
            </div>
        </section>

        {/* ABOUT / CREDENTIALS SECTION */}
        <section id="about" className="py-60 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/[0.02] -z-10"></div>
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-24 items-start">
                <div className="space-y-12">
                  <div className="text-white/30 text-[9px] font-bold tracking-[0.5em] uppercase">Credentials</div>
                  <h2 className="text-4xl font-light text-white font-display">A decade of <br /><span className="text-white/30 italic">Applied Learning.</span></h2>
                  
                  <div className="space-y-8">
                    <div className="border-l border-white/10 pl-8 py-2">
                      <div className="text-white/80 font-medium text-sm">Master of Education</div>
                      <div className="text-white/30 text-xs">University of Essex</div>
                    </div>
                    <div className="border-l border-white/10 pl-8 py-2">
                      <div className="text-white/80 font-medium text-sm">Bachelor of Commercial Law</div>
                      <div className="text-white/30 text-xs">University of the Western Cape</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-12">
                  <div className="text-white/30 text-[9px] font-bold tracking-[0.5em] uppercase">Current Stack</div>
                  <div className="grid grid-cols-1 gap-6">
                    {PORTFOLIO_DATA.skills.map(skill => (
                      <div key={skill.name} className="space-y-3">
                         <div className="flex justify-between items-center">
                            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">{skill.name}</div>
                            <div className="text-[10px] text-white/30">{skill.level}%</div>
                         </div>
                         <div className="h-[1px] bg-white/5 w-full relative">
                            <div className="absolute h-full bg-white/40" style={{width: `${skill.level}%`}}></div>
                         </div>
                      </div>
                    ))}
                    <div className="pt-6">
                      <p className="text-xs text-white/30 font-light leading-relaxed italic">
                        Specialized in Google AI Studio, N8n, Relevance AI, and bridging traditional practice with smart technology integration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-64 px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-16">
                <h2 className="text-6xl md:text-8xl font-light tracking-tighter text-white font-display">
                  Let's <span className="text-white/30 italic">Connect.</span>
                </h2>
                <p className="text-lg text-white/40 font-light max-w-md mx-auto leading-relaxed">
                  I'm always looking for ways to make the classroom a better place for students and teachers alike.
                </p>
                <div className="flex justify-center pt-10">
                    <a href="mailto:jsn.benjamin@gmail.com" className="shiny-cta px-12 py-5">
                        <MailIcon className="w-4 h-4 mr-3" />
                        jsn.benjamin@gmail.com
                    </a>
                </div>
            </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 text-center bg-alpine-950">
          <p className="text-[9px] text-white/20 font-medium uppercase tracking-[0.6em]">© 2024 Jason Benjamin — Built for the Classroom</p>
      </footer>

      <AIChat />
    </div>
  );
}

export default App;
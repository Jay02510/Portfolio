import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from './constants';
import ProjectCard from './components/ProjectCard';
import AIChat from './components/AIChat';
import InteractiveDemo from './components/InteractiveDemo';
import { 
  CodeIcon, 
  MailIcon, 
  GithubIcon, 
  SendIcon, 
  SparklesIcon, 
  BookOpenIcon, 
  ExternalLinkIcon 
} from './components/Icons';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <header className={`fixed top-0 w-full z-50 border-b border-white/5 transition-all duration-300 ${
        isScrolled ? 'bg-[#030712]/90 backdrop-blur-xl h-16' : 'bg-transparent h-20'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
                <span className="p-1.5 bg-slate-800/50 border border-white/10 rounded-lg">
                    <BookOpenIcon className="w-4 h-4 text-indigo-300" />
                </span>
                <span className="font-medium tracking-tight text-sm text-slate-100 uppercase tracking-widest">
                  {PORTFOLIO_DATA.name}
                </span>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
                <a href="#expertise" className="hover:text-white transition-colors">Expertise</a>
                <a href="#about" className="hover:text-white transition-colors">About</a>
                <a href="#demo" className="hover:text-indigo-300 transition-colors">AI Lab</a>
            </nav>

            <a href="#contact" className="hidden md:flex items-center gap-2 text-xs font-semibold bg-slate-100 text-black px-4 py-2 rounded-full hover:bg-white hover:scale-105 transition-all duration-300">
                Let's Talk
                <ExternalLinkIcon className="w-3 h-3" />
            </a>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-gradient-to-b from-indigo-900/20 to-transparent blur-[100px] -z-10"></div>

            <div className="max-w-4xl mx-auto text-center space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/30 text-indigo-200 text-xs font-semibold tracking-wide shadow-lg">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    AVAILABLE FOR NEW PROJECTS
                </div>

                <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white leading-[1.1]">
                    Bridging Pedagogy <br /> 
                    <span className="text-slate-500 font-light">&amp;</span> <span className="text-gradient-accent">Technology.</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
                    {PORTFOLIO_DATA.bio}
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-5 pt-8">
                    <a href="#portfolio" className="shiny-cta">
                        View Products
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
                    </a>
                    <a href="#about" className="px-6 py-3 rounded-full border border-slate-700 bg-slate-900/50 text-slate-200 text-sm font-medium hover:bg-slate-800 hover:text-white hover:border-slate-500 transition-all flex items-center gap-2">
                        My Philosophy
                    </a>
                </div>
            </div>
        </section>

        {/* TECH STACK */}
        <section className="py-12 border-y border-white/5 bg-slate-950/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-xs text-center text-slate-400 uppercase tracking-widest mb-10 font-semibold">Powering Next-Gen Education</p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-80">
                    {['React', 'Next.js', 'TypeScript', 'Python', 'Canvas API', 'Gemini 3'].map((tech) => (
                      <div key={tech} className="flex items-center gap-2 text-lg font-medium text-slate-400 hover:text-indigo-300 transition-colors cursor-default">
                          {tech}
                      </div>
                    ))}
                </div>
            </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section id="portfolio" className="py-32 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">Featured Applications</h2>
                    <p className="text-slate-300 max-w-md font-light text-lg">Deploying scalable solutions for the modern classroom.</p>
                </div>
                <a href="https://github.com" target="_blank" className="group flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200 transition-colors">
                    View Code on GitHub 
                    <ExternalLinkIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
            </div>

            <div className="space-y-24">
                {PORTFOLIO_DATA.projects.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} index={idx} />
                ))}
            </div>
        </section>

        {/* EXPERTISE */}
        <section id="expertise" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
            <div className="mb-16">
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4 text-white">Core Competencies</h2>
                <p className="text-slate-300 max-w-xl font-light text-lg">Technical skills tailored specifically for the educational ecosystem.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="glass-card p-8 rounded-2xl group relative overflow-hidden">
                    <div className="w-12 h-12 rounded-xl bg-indigo-900/30 border border-indigo-500/20 flex items-center justify-center text-indigo-300 mb-6 group-hover:scale-110 transition-all duration-300">
                        <CodeIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-medium mb-3 text-white">LMS Integration (LTI)</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Seamlessly connecting external tools into Canvas, Blackboard, and Moodle using LTI 1.3 standards.
                    </p>
                </div>
                <div className="glass-card p-8 rounded-2xl group relative overflow-hidden">
                    <div className="w-12 h-12 rounded-xl bg-purple-900/30 border border-purple-500/20 flex items-center justify-center text-purple-300 mb-6 group-hover:scale-110 transition-all duration-300">
                        <SparklesIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-medium mb-3 text-white">Gamification Logic</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Designing point systems, leaderboards, and badging architectures that intrinsically motivate learners.
                    </p>
                </div>
                <div className="glass-card p-8 rounded-2xl group relative overflow-hidden">
                    <div className="w-12 h-12 rounded-xl bg-cyan-900/30 border border-cyan-500/20 flex items-center justify-center text-cyan-300 mb-6 group-hover:scale-110 transition-all duration-300">
                        <MailIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-medium mb-3 text-white">WCAG Accessibility</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Ensuring every application is fully navigable via keyboard and screen readers for inclusive education.
                    </p>
                </div>
            </div>
        </section>

        {/* AI LAB */}
        <section id="demo" className="py-12">
          <InteractiveDemo />
        </section>

        {/* ABOUT */}
        <section className="bg-[#030712] border-y border-white/5 py-32 relative" id="about">
            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-16 items-start">
                    <div className="w-full md:w-1/3">
                        <div className="aspect-square rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-white/10 flex items-center justify-center overflow-hidden group">
                           <div className="w-32 h-32 bg-slate-800/50 rounded-full flex items-center justify-center border border-white/5 text-slate-500">
                             <BookOpenIcon className="w-16 h-16 opacity-50" />
                           </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/3 space-y-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-2">Hello, I'm {PORTFOLIO_DATA.name.split(' ')[0]}.</h2>
                            <h3 className="text-xl text-indigo-300 font-light">Developer. Educator. Problem Solver.</h3>
                        </div>
                        <p className="text-slate-300 leading-relaxed font-light text-lg">
                            Before writing code, I wrote lesson plans. My background in curriculum design gives me a unique advantage: I don't just build software that works; <strong className="text-white font-medium">I build software that teaches.</strong>
                        </p>
                        <div className="pt-8 flex gap-10 border-t border-white/5 mt-4">
                            <div>
                                <p className="text-3xl font-bold text-white">5+</p>
                                <p className="text-xs text-slate-500 uppercase tracking-wide mt-1 font-semibold">Years in EdTech</p>
                            </div>
                             <div>
                                <p className="text-3xl font-bold text-white">12</p>
                                <p className="text-xs text-slate-500 uppercase tracking-wide mt-1 font-semibold">Apps Deployed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* CONTACT CTA */}
        <section id="contact" class="py-40 px-6 text-center relative overflow-hidden">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-900/10 to-blue-900/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>

            <div class="max-w-2xl mx-auto space-y-10">
                <h2 class="text-4xl md:text-6xl font-medium tracking-tighter text-white leading-tight">
                    Have an idea for the <br /><span class="text-indigo-300">classroom?</span>
                </h2>
                <p class="text-lg text-slate-300 font-light max-w-xl mx-auto">
                    I am currently accepting new contracts for Q4. Let's discuss how we can bring your educational vision to life.
                </p>
                <div class="flex justify-center pt-4">
                    <button class="shiny-cta text-base">
                        <span>Book a Free Consultation</span>
                    </button>
                </div>
            </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 bg-[#030712]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-slate-500">
                © 2024 {PORTFOLIO_DATA.name}. Built with Gemini & Passion.
            </div>
            <div className="flex gap-8 text-sm font-medium text-slate-500">
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>
        </div>
      </footer>

      <AIChat />
    </div>
  );
}

export default App;
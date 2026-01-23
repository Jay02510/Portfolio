
import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA, BETA_CODES } from './constants.ts';
import ProjectCard from './components/ProjectCard.tsx';
import AIChat from './components/AIChat.tsx';
import InteractiveDemo from './components/InteractiveDemo.tsx';
import ComplianceModal from './components/ComplianceModal.tsx';
import FeedbackBox from './components/FeedbackBox.tsx';
import { MailIcon, SparklesIcon, SendIcon } from './components/Icons.tsx';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);
  const [activeBanner, setActiveBanner] = useState(0);

  const banners = [
    "MVP PREVIEW: Active development. Looking for your feedback!",
    "PREMIUM BETA: Use the codes on project cards to unlock Pro features.",
    "URGENT: Limited spots remaining for early 2024 testing cycle."
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const bannerTimer = setInterval(() => {
      setActiveBanner(prev => (prev + 1) % banners.length);
    }, 4500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(bannerTimer);
    };
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
      {/* FLASHING CYCLING BANNER */}
      <div className="banner-flash-animation py-2 px-4 text-center text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase sticky top-0 z-[60] shadow-md transition-all duration-500 min-h-[34px] flex items-center justify-center">
        <span key={activeBanner} className="animate-in fade-in slide-in-from-top-1 duration-500 text-alpine-950">
          {banners[activeBanner]}
        </span>
      </div>

      <header className={`fixed top-10 w-full z-50 transition-all duration-500 flex items-center ${
        isScrolled 
          ? 'bg-alpine-950/98 backdrop-blur-3xl py-4 border-b border-white/10 shadow-2xl translate-y-[-40px]' 
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

                    <p className="text-[10px] md:text-xs text-white/50 max-w-xl mx-auto leading-relaxed font-light tracking-wide uppercase px-4">
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
              Every tool on this site was built to solve a personal pain point from my ten years in the classroom. No corporate fluff—just working helpers for busy teachers.
            </p>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="py-24 md:py-32 px-6 max-w-6xl mx-auto">
            <div className="mb-20 md:mb-32 text-center space-y-6">
                <div className="text-accent-gold/50 text-[10px] font-bold tracking-[1em] uppercase">01 / Live Tools</div>
                <h2 className="text-5xl md:text-6xl font-light tracking-tight text-white font-display text-gradient-white text-center">The Collection</h2>
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

        {/* PROFILE - UPDATED WITH USER PHOTO */}
        <section id="about" className="py-24 md:py-40 px-6 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
            <div className="relative order-2 lg:order-1 group">
               {/* Portrait Frame */}
               <div className="relative z-10 rounded-[3rem] overflow-hidden aspect-[4/5] border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000">
                  <img 
                    src={PORTFOLIO_DATA.profileImageUrl} 
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" 
                    alt="Jason Benjamin" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-alpine-950 via-transparent to-transparent opacity-60"></div>
               </div>
               {/* Decorative Element behind photo */}
               <div className="absolute -top-10 -left-10 w-40 h-40 border-t border-l border-accent-gold/20 rounded-tl-[4rem] z-0"></div>
               <div className="absolute -bottom-10 -right-10 w-40 h-40 border-b border-r border-accent-gold/20 rounded-br-[4rem] z-0"></div>
            </div>

            <div className="space-y-12 md:space-y-16 order-1 lg:order-2">
               <div className="space-y-6">
                 <div className="text-accent-gold text-[10px] font-bold tracking-[0.8em] uppercase leading-none">03 / The Story</div>
                 <h2 className="text-5xl md:text-7xl font-light text-white font-display leading-[1.05] tracking-tighter text-gradient-white">A teacher who <br /><span className="text-white/20 italic">builds things.</span></h2>
                 <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-lg">
                   I spent ten years in Seoul's classrooms watching brilliant teachers get bogged down by messy spreadsheets and broken workflows. I started building these helpers because I believe technology should actually <em>help</em>—not just exist.
                 </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-white/[0.01]">
                    <div className="text-white/90 font-medium text-lg tracking-tight mb-2">Classroom DNA</div>
                    <div className="text-white/30 text-[9px] tracking-[0.3em] uppercase leading-relaxed">Built on 10,000+ hours of teaching experience.</div>
                  </div>
                  <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-white/[0.01]">
                    <div className="text-white/90 font-medium text-lg tracking-tight mb-2">Clean Code</div>
                    <div className="text-white/30 text-[9px] tracking-[0.3em] uppercase leading-relaxed">Modern engineering with a minimal footprint.</div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* FEEDBACK BOX - INTEGRATED FOR ROLLOUT */}
        <FeedbackBox />

        {/* CONTACT */}
        <section id="contact" className="py-40 md:py-52 px-6 text-center border-t border-white/[0.08] bg-gradient-to-b from-transparent to-black/40">
            <div className="max-w-5xl mx-auto space-y-12 md:space-y-16">
                <div className="text-accent-gold text-[10px] font-bold tracking-[1.2em] uppercase leading-none">Get In Touch</div>
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-light text-white font-display tracking-tighter leading-none opacity-90 text-gradient-white">Let's chat.</h2>
                <p className="text-white/40 font-light text-base md:text-lg leading-relaxed max-w-md mx-auto tracking-wide">
                  I'm currently opening beta spots for specific schools and individuals. If you have a problem that needs a helper, let's talk.
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
          <div className="max-w-6xl mx-auto px-6 space-y-8">
            <p className="text-[10px] md:text-[11px] text-white/20 font-bold uppercase tracking-[1em] leading-none">
              © 2024 Jason Benjamin — Handcrafted in Seoul, Korea
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
               <button 
                 onClick={() => setModalType('privacy')}
                 className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/30 hover:text-accent-gold transition-all"
               >
                 Privacy Policy / 개인정보 처리방침
               </button>
               <button 
                 onClick={() => setModalType('terms')}
                 className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/30 hover:text-accent-gold transition-all"
               >
                 Terms of Service / 이용 약관
               </button>
            </div>
          </div>
      </footer>

      <ComplianceModal 
        isOpen={!!modalType} 
        onClose={() => setModalType(null)} 
        type={modalType || 'privacy'} 
      />
      <AIChat />
    </div>
  );
}

export default App;

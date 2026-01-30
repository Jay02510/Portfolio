
import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from './constants.ts';
import ProjectCard from './components/ProjectCard.tsx';
import AIChat from './components/AIChat.tsx';
import InteractiveDemo from './components/InteractiveDemo.tsx';
import ComplianceModal from './components/ComplianceModal.tsx';
import FeedbackBox from './components/FeedbackBox.tsx';
import { MailIcon, SparklesIcon, SendIcon, BookOpenIcon, MapIcon, CodeIcon, ChevronDownIcon } from './components/Icons.tsx';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);
  const [activeBanner, setActiveBanner] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [scrollY, setScrollY] = useState(0);

  const heroVideoUrl = "https://res.cloudinary.com/dginphpy4/video/upload/v1769751396/Flow_Video_3_eqf1ao.mp4"; 
  const heroFallbackImage = "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2560&auto=format&fit=crop";

  const banners = [
    "MVP PREVIEW: Active development. Looking for your feedback!",
    "PREMIUM BETA: Use the codes on project cards to unlock Pro features.",
    "URGENT: Limited spots remaining for early 2026 testing cycle."
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    
    const bannerTimer = setInterval(() => {
      setActiveBanner(prev => (prev + 1) % banners.length);
    }, 6000);

    document.body.className = theme;

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(bannerTimer);
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen selection:bg-accent-gold/30 font-sans transition-colors duration-500 ${theme === 'dark' ? 'bg-alpine-950 text-white' : 'bg-alpine-50 text-alpine-950'}`}>
      
      {/* FROZEN TOP BAR CONTAINER */}
      <div className="fixed top-0 left-0 w-full z-[100]">
        {/* FLASHING CYCLING BANNER */}
        <div className={`banner-flash-animation py-2.5 px-4 text-center text-[10px] md:text-[11px] font-extrabold tracking-[0.35em] uppercase shadow-xl min-h-[38px] flex items-center justify-center border-b ${theme === 'dark' ? 'border-white/10' : 'border-black/5'}`}>
          <span key={activeBanner} className={`animate-in fade-in slide-in-from-top-1 duration-700 text-alpine-950`}>
            {banners[activeBanner]}
          </span>
        </div>

        {/* MAIN NAVIGATION HEADER */}
        <header className={`w-full transition-all duration-500 flex items-center ${
          isScrolled 
            ? (theme === 'dark' ? 'bg-alpine-950/98 border-b border-white/10' : 'bg-white/98 border-b border-black/10') + ' backdrop-blur-3xl py-4 shadow-2xl' 
            : 'bg-transparent py-8 md:py-10'
        }`}>
          <div className="max-w-7xl mx-auto px-8 w-full flex items-center justify-between h-full">
              <span className={`font-display font-medium text-[11px] md:text-[13px] tracking-[0.8em] uppercase whitespace-nowrap leading-none transition-colors ${theme === 'dark' ? 'text-white' : 'text-alpine-950'}`}>
                J. BENJAMIN
              </span>
              <nav className="hidden md:flex items-center gap-14 text-[10px] font-bold uppercase tracking-[0.5em]">
                  <a href="#portfolio" onClick={scrollToSection('portfolio')} className={`transition-all hover:tracking-[0.6em] ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'}`}>Examples</a>
                  <a href="#lab" onClick={scrollToSection('lab')} className={`transition-all hover:tracking-[0.6em] ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'}`}>Lab</a>
                  <a href="#about" onClick={scrollToSection('about')} className={`transition-all hover:tracking-[0.6em] ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'}`}>Story</a>
                  <button 
                    onClick={toggleTheme} 
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    className={`p-3 rounded-full glass-panel hover:bg-accent-gold transition-all transform active:scale-95 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}
                  >
                    {theme === 'dark' ? '☀️' : '🌙'}
                  </button>
              </nav>
          </div>
        </header>
      </div>

      {/* UNIFIED MOBILE NAVIGATION */}
      <nav className={`md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] glass-panel rounded-full px-5 py-4 flex items-center gap-4 shadow-[0_20px_60px_rgba(0,0,0,0.4)] w-[94%] max-w-[450px] transition-all duration-500 ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`}>
          <button onClick={scrollToSection('portfolio')} aria-label="Scroll to Examples" className={`flex-1 flex flex-col items-center gap-1.5 p-2 transition-colors ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'}`}>
            <BookOpenIcon className="w-6 h-6" />
            <span className="text-[8px] font-black uppercase tracking-widest">Tools</span>
          </button>
          <button onClick={scrollToSection('lab')} aria-label="Scroll to Lab" className={`flex-1 flex flex-col items-center gap-1.5 p-2 transition-colors ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'}`}>
            <CodeIcon className="w-6 h-6" />
            <span className="text-[8px] font-black uppercase tracking-widest">Lab</span>
          </button>
          
          <div className="px-2">
            <button 
              onClick={() => setIsChatOpen(!isChatOpen)} 
              aria-label="Toggle AI Assistant"
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-2xl border-4 transform active:scale-90 ${theme === 'dark' ? 'border-alpine-900 bg-accent-gold text-alpine-950' : 'border-white bg-alpine-950 text-accent-gold'} ${isChatOpen ? 'rotate-180 scale-110' : 'animate-pulse'}`}
            >
              <SparklesIcon className="w-7 h-7" />
            </button>
          </div>

          <button onClick={scrollToSection('about')} aria-label="Scroll to Story" className={`flex-1 flex flex-col items-center gap-1.5 p-2 transition-colors ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'}`}>
            <MapIcon className="w-6 h-6" />
            <span className="text-[8px] font-black uppercase tracking-widest">Story</span>
          </button>
          <button onClick={scrollToSection('contact')} aria-label="Scroll to Connect" className={`flex-1 flex flex-col items-center gap-1.5 p-2 transition-colors ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'}`}>
            <MailIcon className="w-6 h-6" />
            <span className="text-[8px] font-black uppercase tracking-widest">Connect</span>
          </button>
      </nav>

      <main>
        {/* REFINED HERO SECTION */}
        <section className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center px-8 text-center overflow-hidden pt-60 pb-20">
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className={`absolute inset-0 transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0a0c10]' : 'bg-[#faf9f6]'}`}></div>
                
                {/* Background Media Container */}
                <div 
                  className="absolute inset-0 transition-all duration-75"
                  style={{ transform: `translateY(${scrollY * 0.08}px) scale(1.05)` }}
                >
                  {/* Frosted mist overlay optimized for visibility */}
                  <div className={`absolute inset-0 z-30 transition-all duration-500 ${theme === 'light' ? 'backdrop-blur-[4px] bg-white/20' : 'bg-transparent'}`}></div>
                  
                  {/* Digital Texture Overlays */}
                  <div className={`absolute inset-0 z-10 opacity-[0.15] mix-blend-screen pointer-events-none ${theme === 'dark' ? 'bg-[url("https://www.transparenttextures.com/patterns/stardust.png")]' : ''}`}></div>
                  <div className={`absolute inset-0 z-20 pointer-events-none ${theme === 'dark' ? 'bg-gradient-to-b from-alpine-950 via-transparent to-alpine-950' : 'bg-gradient-to-b from-alpine-50 via-transparent to-alpine-50'}`}></div>
                  
                  {/* High visibility video display */}
                  <div className={`w-full h-full relative transition-opacity duration-1000 ${theme === 'dark' ? 'opacity-[0.25] brightness-90 contrast-125' : 'opacity-[0.6] brightness-100 contrast-100'}`}>
                    {heroVideoUrl ? (
                      <video 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        poster={heroFallbackImage}
                        className="w-full h-full object-cover"
                      >
                        <source src={heroVideoUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <img 
                        src={heroFallbackImage} 
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    )}
                  </div>
                </div>

                <div 
                  className="absolute inset-0 z-[-1] transition-all duration-150"
                  style={{ transform: `translateY(${scrollY * -0.1}px)` }}
                >
                  <div className={`absolute top-[10%] left-[5%] w-[60vw] h-[60vw] rounded-full blur-[180px] opacity-20 ${theme === 'dark' ? 'bg-accent-gold/20' : 'bg-accent-gold/10'}`}></div>
                  <div className={`absolute bottom-[5%] right-[5%] w-[50vw] h-[50vw] rounded-full blur-[160px] opacity-15 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/5'}`}></div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col items-center gap-14 md:gap-24 animate-in fade-in slide-in-from-bottom-16 duration-1000 relative z-40">
                <div className="space-y-8 md:space-y-12 w-full">
                    <div className={`flex items-center justify-center gap-6 text-[10px] md:text-[12px] font-black tracking-[1em] uppercase ${theme === 'dark' ? 'text-accent-gold' : 'text-accent-clay'}`}>
                      BUILDING HELPERS FOR SCHOOLS
                    </div>
                    
                    <div className="relative">
                      <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] font-medium tracking-tight leading-[1] font-display text-gradient-white pb-8 px-4">
                        Real tools for <br />
                        <span className={`italic block tracking-tighter pt-4 md:pt-8 font-light ${theme === 'dark' ? 'text-white/20' : 'text-alpine-950/20'}`}>
                          real people.
                        </span>
                      </h1>
                    </div>

                    <p className={`text-xs md:text-sm max-w-2xl mx-auto leading-loose font-medium tracking-[0.15em] uppercase px-6 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                      Teacher turned EdTech creator — solving real pain points for teachers, students, and parents.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-10 w-full max-w-2xl px-8">
                    <a href="#portfolio" onClick={scrollToSection('portfolio')} className="shiny-cta w-full sm:min-w-[300px] group text-center py-6 shadow-2xl">
                        Explore Examples
                        <div className="hidden sm:block absolute right-10 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-3 group-hover:translate-x-0">→</div>
                    </a>
                    <button onClick={scrollToSection('lab')} className={`ghost-cta w-full sm:min-w-[300px] flex items-center justify-center gap-6 group py-6 rounded-2xl border transition-all ${theme === 'dark' ? 'border-white/20 hover:bg-white/5 text-white' : 'border-black/20 hover:bg-black/5 text-alpine-950'}`}>
                      <SparklesIcon className="w-6 h-6 group-hover:text-accent-gold group-hover:rotate-[25deg] transition-all duration-700 ease-out" /> 
                      <span className="text-[11px] font-extrabold uppercase tracking-[0.3em]">Idea Explorer</span>
                    </button>
                </div>
            </div>

            <div className="relative z-10 opacity-40 flex flex-col items-center gap-6 animate-in fade-in slide-in-from-top-6 duration-1000 delay-500 mt-24 md:mt-32">
              <span className="text-[9px] uppercase tracking-[1.2em] font-black leading-none">Scroll to explore</span>
              <div className={`w-[2px] h-12 md:h-16 bg-gradient-to-b from-accent-gold to-transparent rounded-full shadow-lg`}></div>
            </div>
        </section>

        {/* PORTFOLIO SECTION */}
        <section id="portfolio" className="py-32 md:py-48 px-8 max-w-7xl mx-auto">
            <div className="mb-24 md:mb-40 text-center space-y-10">
                <div className="text-accent-gold text-[11px] font-black tracking-[1.2em] uppercase">01 / Digital Fleet</div>
                <h2 className="text-6xl md:text-8xl font-medium tracking-tighter font-display text-gradient-white text-center leading-none">The Collection</h2>
                <div className={`w-24 h-1 mx-auto rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}></div>
            </div>
            <div className="space-y-[12rem] md:space-y-[20rem]">
                {PORTFOLIO_DATA.projects.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} index={idx} theme={theme} />
                ))}
            </div>
        </section>

        {/* LAB SECTION */}
        <section id="lab" className={`py-32 md:py-48 relative overflow-hidden transition-all duration-700 ${theme === 'dark' ? 'bg-black/20' : 'bg-alpine-100/20'}`}>
            <div className="text-center mb-16 md:mb-24 px-8 space-y-8 relative z-10">
                <div className="text-accent-gold text-[11px] font-black tracking-[1.2em] uppercase">02 / Synthesis</div>
                <h2 className="text-6xl md:text-8xl font-medium font-display tracking-tighter text-gradient-white leading-none">Idea Explorer</h2>
                <p className={`text-sm md:text-base max-w-md mx-auto font-medium leading-relaxed tracking-[0.1em] uppercase ${theme === 'dark' ? 'text-white/40' : 'text-black/50'}`}>
                  Input a challenge. Output a helper.
                </p>
            </div>
            <InteractiveDemo theme={theme} />
        </section>

        {/* STORY SECTION */}
        <section id="about" className="py-32 md:py-52 px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 md:gap-40 items-center">
            <div className="relative order-2 lg:order-1 group">
               <div className={`relative z-10 rounded-[3.5rem] overflow-hidden aspect-[4/5] border transition-all duration-1000 ${theme === 'dark' ? 'grayscale border-white/10 shadow-3xl' : 'border-black/5 shadow-2xl hover:grayscale'}`}>
                  <img 
                    src={PORTFOLIO_DATA.profileImageUrl} 
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" 
                    alt="Jason Benjamin" 
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-70 ${theme === 'dark' ? 'from-alpine-950' : 'from-alpine-50'}`}></div>
               </div>
               <div className={`absolute -top-12 -left-12 w-48 h-48 border-t-2 border-l-2 rounded-tl-[4.5rem] z-0 transition-colors ${theme === 'dark' ? 'border-accent-gold/20' : 'border-accent-clay/20'}`}></div>
               <div className={`absolute -bottom-12 -right-12 w-48 h-48 border-b-2 border-r-2 rounded-br-[4.5rem] z-0 transition-colors ${theme === 'dark' ? 'border-accent-gold/20' : 'border-accent-clay/20'}`}></div>
            </div>

            <div className="space-y-16 md:space-y-24 order-1 lg:order-2">
               <div className="space-y-10">
                 <div className="text-accent-gold text-[11px] font-black tracking-[1em] uppercase leading-none">03 / Provenance</div>
                 <h2 className="text-6xl md:text-8xl font-medium font-display leading-[1] tracking-tighter text-gradient-white">Teacher as <br /><span className={`${theme === 'dark' ? 'text-white/20' : 'text-black/10'} italic font-light`}>Architect.</span></h2>
                 <p className={`text-xl md:text-2xl font-normal leading-relaxed max-w-xl ${theme === 'dark' ? 'text-white/50' : 'text-black/70'}`}>
                   Ten years in Seoul's classrooms taught me that technology should actually <em>work</em>. I build for teachers because I am one.
                 </p>
               </div>
            </div>
          </div>
        </section>

        <FeedbackBox theme={theme} />

        {/* CONNECT SECTION */}
        <section id="contact" className={`py-48 md:py-64 px-8 text-center border-t transition-colors duration-700 ${theme === 'dark' ? 'bg-gradient-to-b from-transparent to-black/60 border-white/10' : 'bg-gradient-to-b from-transparent to-black/5 border-black/5'}`}>
            <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
                <div className="text-accent-gold text-[11px] font-black tracking-[1.5em] uppercase leading-none">The Staffroom</div>
                <h2 className="text-7xl md:text-9xl lg:text-[11rem] font-medium font-display tracking-tighter leading-none opacity-95 text-gradient-white">Come say hi.</h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-10 pt-12 md:pt-20">
                    <a href="mailto:jsn.benjamin@gmail.com" className="shiny-cta min-w-[320px] md:min-w-[400px] px-16 py-8 text-[12px] tracking-[0.6em] shadow-2xl">
                        <MailIcon className="w-6 h-6 mr-6 opacity-40" />
                        Start a Conversation
                    </a>
                </div>
            </div>
        </section>
      </main>

      <footer className={`py-24 md:py-32 text-center border-t transition-colors duration-500 ${theme === 'dark' ? 'bg-black/90 border-white/[0.08]' : 'bg-white border-black/[0.1]'}`}>
          <div className="max-w-7xl mx-auto px-8 space-y-12 pb-40 md:pb-0">
            <p className={`text-[11px] md:text-[12px] font-black uppercase tracking-[1.2em] leading-none ${theme === 'dark' ? 'text-white/20' : 'text-black/30'}`}>
              © 2026 Jason Benjamin — Built in Seoul, Korea
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
               <button onClick={() => setModalType('privacy')} className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:text-accent-gold ${theme === 'dark' ? 'text-white/30' : 'text-black/50'}`}>Privacy</button>
               <button onClick={() => setModalType('terms')} className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:text-accent-gold ${theme === 'dark' ? 'text-white/30' : 'text-black/50'}`}>Terms</button>
            </div>
          </div>
      </footer>

      <ComplianceModal isOpen={!!modalType} onClose={() => setModalType(null)} type={modalType || 'privacy'} />
      <AIChat isOpen={isChatOpen} setIsOpen={setIsChatOpen} theme={theme} />
    </div>
  );
}

export default App;

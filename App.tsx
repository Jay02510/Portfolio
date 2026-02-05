
import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from './constants.ts';
import ProjectCard from './components/ProjectCard.tsx';
import AIChat from './components/AIChat.tsx';
import InteractiveDemo from './components/InteractiveDemo.tsx';
import ComplianceModal from './components/ComplianceModal.tsx';
import FeedbackBox from './components/FeedbackBox.tsx';
import { MailIcon, SparklesIcon, SendIcon, BookOpenIcon, MapIcon, CodeIcon, ChevronDownIcon, ExternalLinkIcon } from './components/Icons.tsx';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);
  const [activeBanner, setActiveBanner] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [scrollY, setScrollY] = useState(0);
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);

  const heroVideoUrl = "https://res.cloudinary.com/dginphpy4/video/upload/v1769751396/Flow_Video_3_eqf1ao.mp4"; 
  const heroFallbackImage = "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2560&auto=format&fit=crop";

  const banners = [
    "MVP PREVIEW: Active development. Looking for your feedback!",
    "PREMIUM BETA: Use the codes on project cards to unlock Pro features.",
    "URGENT: Limited spots remaining for early 2026 testing cycle."
  ];

  useEffect(() => {
    // Detect In-App Browsers (KakaoTalk, Instagram, Line)
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isRestricted = /Instagram|KAKAOTALK|Line|FBAN|FBAV/i.test(ua);
    setIsInAppBrowser(isRestricted);

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
      const headerOffset = 110;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`min-h-screen selection:bg-accent-gold/30 font-sans transition-colors duration-500 ${theme === 'dark' ? 'bg-alpine-950 text-white' : 'bg-alpine-50 text-alpine-950'}`}>
      
      {/* FROZEN TOP BAR CONTAINER */}
      <div className="fixed top-0 left-0 w-full z-[100]">
        {/* FLASHING CYCLING BANNER */}
        <div className={`banner-flash-animation py-2 px-4 text-center text-[9px] md:text-[11px] font-extrabold tracking-[0.25em] md:tracking-[0.35em] uppercase shadow-xl min-h-[34px] md:min-h-[38px] flex items-center justify-center border-b ${theme === 'dark' ? 'border-white/10' : 'border-black/5'}`}>
          <span key={activeBanner} className={`animate-in fade-in slide-in-from-top-1 duration-700 text-alpine-950 px-2`}>
            {banners[activeBanner]}
          </span>
        </div>

        {/* IN-APP BROWSER ALERT (Safe for Kakao/Instagram) */}
        {isInAppBrowser && (
          <div className="bg-red-500/90 backdrop-blur-md text-white py-1.5 px-4 text-[9px] font-bold uppercase tracking-[0.2em] text-center flex items-center justify-center gap-3">
             <span>Best viewed in Safari/Chrome</span>
             <ExternalLinkIcon className="w-3 h-3" />
          </div>
        )}

        {/* MAIN NAVIGATION HEADER */}
        <header className={`w-full transition-all duration-500 flex items-center ${
          isScrolled 
            ? (theme === 'dark' ? 'bg-alpine-950/98 border-b border-white/10' : 'bg-white/98 border-b border-black/10') + ' backdrop-blur-3xl py-3 md:py-4 shadow-2xl' 
            : 'bg-transparent py-6 md:py-12'
        }`}>
          <div className="max-w-7xl mx-auto px-6 md:px-8 w-full flex items-center justify-between h-full">
              <span className={`font-display font-medium text-[10px] md:text-[13px] tracking-[0.5em] md:tracking-[0.8em] uppercase whitespace-nowrap leading-none transition-colors ${theme === 'dark' ? 'text-white' : 'text-alpine-950'}`}>
                J. BENJAMIN
              </span>
              <nav className="hidden md:flex items-center gap-14 text-[10px] font-bold uppercase tracking-[0.5em]">
                  <a href="#portfolio" onClick={scrollToSection('portfolio')} className={`transition-all hover:tracking-[0.6em] ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'}`}>Projects</a>
                  <a href="#lab" onClick={scrollToSection('lab')} className={`transition-all hover:tracking-[0.6em] ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'}`}>The Lab</a>
                  <a href="#about" onClick={scrollToSection('about')} className={`transition-all hover:tracking-[0.6em] ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'}`}>My Story</a>
                  <button 
                    onClick={toggleTheme} 
                    className={`p-3 rounded-full glass-panel hover:bg-accent-gold transition-all transform active:scale-95 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}
                  >
                    {theme === 'dark' ? '☀️' : '🌙'}
                  </button>
              </nav>
              <button onClick={toggleTheme} className="md:hidden p-2 text-lg">
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
          </div>
        </header>
      </div>

      {/* UNIFIED MOBILE NAVIGATION */}
      <nav className={`md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] glass-panel rounded-[2rem] px-4 py-3 flex items-center gap-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)] w-[90%] max-w-[380px] transition-all duration-500 ${theme === 'dark' ? 'border-white/20' : 'border-black/10'} pb-[env(safe-area-inset-bottom,0.75rem)]`}>
          <button onClick={scrollToSection('portfolio')} className={`flex-1 flex flex-col items-center gap-1 p-1 transition-colors ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'}`}>
            <BookOpenIcon className="w-5 h-5" />
            <span className="text-[7px] font-black uppercase tracking-widest">Tools</span>
          </button>
          <button onClick={scrollToSection('lab')} className={`flex-1 flex flex-col items-center gap-1 p-1 transition-colors ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'}`}>
            <CodeIcon className="w-5 h-5" />
            <span className="text-[7px] font-black uppercase tracking-widest">Lab</span>
          </button>
          
          <div className="px-1">
            <button 
              onClick={() => setIsChatOpen(!isChatOpen)} 
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-2xl border-4 transform active:scale-90 ${theme === 'dark' ? 'border-alpine-900 bg-accent-gold text-alpine-950' : 'border-white bg-alpine-950 text-accent-gold'}`}
            >
              <SparklesIcon className="w-6 h-6" />
            </button>
          </div>

          <button onClick={scrollToSection('about')} className={`flex-1 flex flex-col items-center gap-1 p-1 transition-colors ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'}`}>
            <MapIcon className="w-5 h-5" />
            <span className="text-[7px] font-black uppercase tracking-widest">Story</span>
          </button>
          <button onClick={scrollToSection('contact')} className={`flex-1 flex flex-col items-center gap-1 p-1 transition-colors ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'}`}>
            <MailIcon className="w-5 h-5" />
            <span className="text-[7px] font-black uppercase tracking-widest">Connect</span>
          </button>
      </nav>

      <main>
        {/* REFINED HERO SECTION - ADJUSTED PADDING FOR BREATHING ROOM */}
        <section className="relative min-h-[100vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden pt-52 md:pt-48 pb-24">
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className={`absolute inset-0 transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0a0c10]' : 'bg-[#faf9f6]'}`}></div>
                
                {/* Background Media Container */}
                <div className="absolute inset-0">
                  <div className={`absolute inset-0 z-30 transition-all duration-500 ${theme === 'light' ? 'backdrop-blur-[1px] bg-white/20' : 'bg-transparent'}`}></div>
                  <div className={`absolute inset-0 z-20 pointer-events-none ${theme === 'dark' ? 'bg-gradient-to-b from-alpine-950 via-transparent to-alpine-950' : 'bg-gradient-to-b from-alpine-50 via-transparent to-alpine-50'}`}></div>
                  
                  <div className={`w-full h-full relative transition-opacity duration-1000 ${theme === 'dark' ? 'opacity-[0.25]' : 'opacity-[0.5]'}`}>
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
                  </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col items-center gap-10 md:gap-24 animate-in fade-in slide-in-from-bottom-16 duration-1000 relative z-40 mt-12 md:mt-16">
                <div className="space-y-6 md:space-y-12 w-full">
                    <div className={`flex items-center justify-center gap-4 text-[9px] md:text-[12px] font-black tracking-[0.5em] md:tracking-[1em] uppercase ${theme === 'dark' ? 'text-accent-gold' : 'text-accent-clay'}`}>
                      BUILDING HELPERS FOR SCHOOLS
                    </div>
                    
                    <div className="relative">
                      <h1 className="text-4xl sm:text-7xl lg:text-[10rem] font-medium tracking-tight leading-[1.1] md:leading-[1] font-display text-gradient-white pb-6 px-2">
                        Real tools for <br />
                        <span className={`italic block tracking-tighter pt-2 md:pt-8 font-light ${theme === 'dark' ? 'text-white/20' : 'text-alpine-950/20'}`}>
                          real people.
                        </span>
                      </h1>
                    </div>

                    <p className={`text-[10px] md:text-sm max-w-lg mx-auto leading-relaxed font-medium tracking-[0.1em] md:tracking-[0.15em] uppercase px-4 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                      Teacher turned EdTech creator — solving real pain points for teachers, students, and parents.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-10 w-full max-w-xl px-4">
                    <a href="#portfolio" onClick={scrollToSection('portfolio')} className="shiny-cta w-full py-5 shadow-xl">
                        View Projects
                    </a>
                    <button onClick={scrollToSection('lab')} className={`w-full flex items-center justify-center gap-4 py-5 rounded-xl border transition-all ${theme === 'dark' ? 'border-white/20 hover:bg-white/5 text-white' : 'border-black/20 hover:bg-black/5 text-alpine-950'}`}>
                      <SparklesIcon className="w-5 h-5 text-accent-gold" /> 
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]">Idea Explorer</span>
                    </button>
                </div>
            </div>
        </section>

        {/* PORTFOLIO SECTION */}
        <section id="portfolio" className="py-20 md:py-48 px-6 max-w-7xl mx-auto">
            <div className="mb-20 md:mb-40 text-center space-y-6">
                <div className="text-accent-gold text-[9px] md:text-[11px] font-black tracking-[1em] uppercase">01 / The Tools</div>
                <h2 className="text-5xl md:text-8xl font-medium tracking-tighter font-display text-gradient-white leading-none">The Collection</h2>
            </div>
            <div className="space-y-[10rem] md:space-y-[20rem]">
                {PORTFOLIO_DATA.projects.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} index={idx} theme={theme} />
                ))}
            </div>
        </section>

        {/* LAB SECTION */}
        <section id="lab" className={`py-20 md:py-48 transition-all duration-700 ${theme === 'dark' ? 'bg-black/20' : 'bg-alpine-100/20'}`}>
            <InteractiveDemo theme={theme} />
        </section>

        {/* STORY SECTION */}
        <section id="about" className="py-20 md:py-52 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1">
               <div className={`relative z-10 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden aspect-[4/5] border ${theme === 'dark' ? 'border-white/10' : 'border-black/5 shadow-2xl'}`}>
                  <img src={PORTFOLIO_DATA.profileImageUrl} className="w-full h-full object-cover" alt="Jason Benjamin" />
               </div>
            </div>
            <div className="space-y-10 order-1 lg:order-2">
                 <div className="text-accent-gold text-[9px] font-black tracking-[1em] uppercase">03 / My Story</div>
                 <h2 className="text-5xl md:text-8xl font-medium font-display tracking-tighter text-gradient-white">Teacher who <br /><span className={`${theme === 'dark' ? 'text-white/20' : 'text-black/10'} italic font-light`}>builds tools.</span></h2>
            </div>
          </div>
        </section>

        <FeedbackBox theme={theme} />

        {/* CONNECT SECTION */}
        <section id="contact" className="py-32 md:py-64 px-6 text-center">
            <h2 className="text-6xl md:text-9xl font-medium font-display tracking-tighter leading-none text-gradient-white">Come say hi.</h2>
            <div className="pt-16">
                <a href="mailto:jsn.benjamin@gmail.com" className="shiny-cta px-12 py-6">
                    Start a Conversation
                </a>
            </div>
        </section>
      </main>

      <footer className="py-20 text-center opacity-40">
          <p className="text-[10px] font-black uppercase tracking-[1em]">© 2026 Jason Benjamin — Seoul, Korea</p>
      </footer>

      <ComplianceModal isOpen={!!modalType} onClose={() => setModalType(null)} type={modalType || 'privacy'} />
      <AIChat isOpen={isChatOpen} setIsOpen={setIsChatOpen} theme={theme} />
    </div>
  );
}

export default App;

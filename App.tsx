
import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from './constants.ts';
import ProjectCard from './components/ProjectCard.tsx';
import { CompactProjectCard } from './components/CompactProjectCard.tsx';
import AIChat from './components/AIChat.tsx';
import InteractiveDemo from './components/InteractiveDemo.tsx';
import ComplianceModal from './components/ComplianceModal.tsx';
import FeedbackBox from './components/FeedbackBox.tsx';
import { CaseStudyViewer } from './CaseStudyViewer.tsx';
import { MailIcon, SparklesIcon, SendIcon, BookOpenIcon, MapIcon, CodeIcon, ChevronDownIcon, ExternalLinkIcon, XIcon, FileTextIcon } from './components/Icons.tsx';

const t = {
  en: {
    projectsNav: "Projects",
    playgroundNav: "Live Playground",
    storyNav: "My Story",
    heroBadge: "BUILDING HELPERS FOR SCHOOLS",
    heroTitle1: "Real tools for",
    heroTitle2: "real people.",
    heroTagline: "Teacher turned EdTech creator — solving real pain points for teachers, students, and parents.",
    viewProjectsBtn: "View Projects",
    playgroundBtn: "Live No-Code AI Playground",
    toolsBadge: "01 / The Tools",
    toolsTitle: "The Collection",
    allSolutions: "All Solutions",
    aiEngines: "AI Engines",
    pipelines: "Pipelines & Workflows",
    sleekGrid: "Sleek Grid",
    continuousStory: "Continuous Storyboarding",
    noProjects: "No items found matching this filter combo.",
    storyBadge: "03 / My Story",
    storyTitle1: "Teacher who",
    storyTitle2: "builds tools.",
    storyBody: "Combining 10 years of classroom pedagogy with modern low-code & full-stack architecture to eliminate institutional waste. I engineer helpers that turn repetitive friction into automated pipelines.",
    hoursSaved: "Hours Saved Weekly",
    parentTrust: "Parent Trust Rating",
    sayHi: "Come say hi.",
    startConv: "Start a Conversation",
    escapeBrowser: "Escape the In-App Browser"
  },
  ko: {
    projectsNav: "프로젝트",
    playgroundNav: "라이브 실험실",
    storyNav: "소개 및 스토리",
    heroBadge: "학교 현장을 위한 에듀테크 도구 개발",
    heroTitle1: "현장에 꼭 필요한",
    heroTitle2: "실제 작동하는 도구.",
    heroTagline: "교사 출신 에듀테크 크리에이터 — 학생, 학부모, 교사가 느끼는 한계와 문제들을 직접 코딩으로 해결합니다.",
    viewProjectsBtn: "프로젝트 살펴보기",
    playgroundBtn: "라이브 노코드 AI 시험장",
    toolsBadge: "01 / 프로젝트 도구",
    toolsTitle: "주요 포트폴리오",
    allSolutions: "전체 도구",
    aiEngines: "AI 솔루션",
    pipelines: "업무 자동화 파이프라인",
    sleekGrid: "한눈에 보는 그리드",
    continuousStory: "상세 스토리보드",
    noProjects: "해당 카테고리에 맞는 프로젝트가 발견되지 않았습니다.",
    storyBadge: "03 / 마이 스토리",
    storyTitle1: "교실 연구를 도구로",
    storyTitle2: "만드는 교육 개발자.",
    storyBody: "10년간 교사로서 교육 현장에 있으면서, 행정 낭비와 비효율성을 해소하고자 로코드 및 풀스택 아키텍처를 도입했습니다. 단순 중복적 마찰을 자율적 자동화 파이프라인으로 전환합니다.",
    hoursSaved: "매주 절약된 행정 시간",
    parentTrust: "학부모 만족도 및 신뢰도",
    sayHi: "언제든 의뢰하시거나 연락해주세요",
    startConv: "이메일로 대화 시작하기",
    escapeBrowser: "인앱 브라우저를 벗어나 환상적인 체험을 즐기세요"
  }
};

function App() {
  const [locale, setLocale] = useState<'en' | 'ko'>('en');
  const [isScrolled, setIsScrolled] = useState(false);
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [scrollY, setScrollY] = useState(0);
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);
  const [isBrowserModalOpen, setIsBrowserModalOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string | null>(null);
  const [portfolioLayout, setPortfolioLayout] = useState<'grid' | 'detailed'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ai' | 'pipelines'>('all');

  const heroVideoUrl = "https://res.cloudinary.com/dginphpy4/video/upload/v1769751396/Flow_Video_3_eqf1ao.mp4"; 
  const heroFallbackImage = "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2560&auto=format&fit=crop";

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

    document.body.className = theme;

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const copyCurrentLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
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
        {/* IN-APP BROWSER ALERT - Now Interactive */}
        {isInAppBrowser && (
          <button 
            onClick={() => setIsBrowserModalOpen(true)}
            className="w-full bg-red-600/95 hover:bg-red-500 backdrop-blur-md text-white py-2 px-4 text-[9px] font-black uppercase tracking-[0.2em] text-center flex items-center justify-center gap-3 transition-colors group"
          >
             <span className="group-hover:translate-x-1 transition-transform">Optimization Required: Open in Safari/Chrome</span>
             <ExternalLinkIcon className="w-3.5 h-3.5 animate-pulse" />
          </button>
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
                  <a href="#portfolio" onClick={scrollToSection('portfolio')} className={`transition-all hover:tracking-[0.6em] ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'}`}>{t[locale].projectsNav}</a>
                  <a href="#lab" onClick={scrollToSection('lab')} className={`transition-all hover:tracking-[0.6em] ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'}`}>{t[locale].playgroundNav}</a>
                  <a href="#about" onClick={scrollToSection('about')} className={`transition-all hover:tracking-[0.6em] ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'}`}>{t[locale].storyNav}</a>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setLocale(prev => prev === 'en' ? 'ko' : 'en')}
                      className={`px-4 py-2 rounded-full text-xs font-black tracking-widest transition-all transform active:scale-95 border-2 shadow-sm ${
                        locale === 'ko' 
                          ? 'bg-accent-gold border-accent-gold text-alpine-950 shadow-md hover:brightness-110' 
                          : (theme === 'dark' 
                              ? 'border-white/20 text-white hover:bg-white/10 hover:border-white/30' 
                              : 'border-black/15 text-alpine-950 hover:bg-black/5 hover:border-black/30')
                      }`}
                      title={locale === 'en' ? 'Switch to Korean' : 'Switch to English'}
                    >
                      {locale === 'en' ? '한글 🇰🇷' : 'ENGLISH 🇺🇸'}
                    </button>
                    <button 
                      onClick={toggleTheme} 
                      className={`p-2.5 rounded-full glass-panel hover:bg-accent-gold hover:text-alpine-950 transition-all transform active:scale-95 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}
                    >
                      {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                  </div>
              </nav>
              <div className="flex items-center gap-3 md:hidden">
                <button 
                  onClick={() => setLocale(prev => prev === 'en' ? 'ko' : 'en')}
                  className={`px-4 py-2 rounded-full text-[11px] font-black tracking-wider transition-all transform active:scale-95 border-2 shadow-sm ${
                    locale === 'ko' 
                      ? 'bg-accent-gold border-accent-gold text-alpine-950 shadow-md' 
                      : (theme === 'dark' 
                          ? 'border-white/20 text-white hover:bg-white/10' 
                          : 'border-black/15 text-alpine-950 hover:bg-black/5')
                  }`}
                >
                  {locale === 'en' ? '한글 🇰🇷' : 'EN 🇺🇸'}
                </button>
                <button onClick={toggleTheme} className="p-2 text-lg">
                  {theme === 'dark' ? '☀️' : '🌙'}
                </button>
              </div>
          </div>
        </header>
      </div>

      {/* IN-APP BROWSER MODAL */}
      {isBrowserModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={() => setIsBrowserModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in duration-300">
            <div className="p-8 pb-4 flex justify-between items-start">
               <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500">
                  <ExternalLinkIcon className="w-6 h-6" />
               </div>
               <button onClick={() => setIsBrowserModalOpen(false)} className="p-2 text-black/20 hover:text-black transition-colors">
                  <XIcon className="w-6 h-6" />
               </button>
            </div>
            
            <div className="px-8 pb-10 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-bold text-alpine-950 tracking-tight leading-tight">Escape the In-App Browser</h3>
                <p className="text-sm text-black/60 leading-relaxed font-light">
                  You are currently viewing this in a social media "mini-browser". To use the AI features and interactive demos, please open this in your system browser.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-5 bg-alpine-50 rounded-2xl border border-black/5 space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-black/40">For KakaoTalk / Instagram / Line</span>
                  <ol className="text-xs space-y-3 text-alpine-950 font-medium">
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-alpine-200 text-alpine-950 flex items-center justify-center text-[10px]">1</span>
                      <span>Tap the <b>three dots (⋮)</b> or <b>share</b> button at the top right.</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-alpine-200 text-alpine-950 flex items-center justify-center text-[10px]">2</span>
                      <span>Select <b>"Open in Browser"</b> or <b>"Open in Safari"</b>.</span>
                    </li>
                  </ol>
                </div>

                <button 
                  onClick={copyCurrentLink}
                  className={`w-full py-4 rounded-xl border flex items-center justify-center gap-3 transition-all ${linkCopied ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-black/10 text-alpine-950 hover:bg-alpine-50'}`}
                >
                  {linkCopied ? <SparklesIcon className="w-4 h-4" /> : <FileTextIcon className="w-4 h-4" />}
                  <span className="text-[11px] font-bold uppercase tracking-widest">{linkCopied ? 'Link Copied!' : 'Copy Link to Paste'}</span>
                </button>
              </div>
            </div>
            
            <div className="p-6 bg-alpine-50 text-center border-t border-black/5">
               <button 
                 onClick={() => setIsBrowserModalOpen(false)}
                 className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 hover:text-black transition-colors"
               >
                 I understand, continue anyway
               </button>
            </div>
          </div>
        </div>
      )}

      {/* UNIFIED MOBILE NAVIGATION */}
      <nav className={`md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] glass-panel rounded-[2rem] px-4 py-3 flex items-center gap-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)] w-[90%] max-w-[380px] transition-all duration-500 ${theme === 'dark' ? 'border-white/20' : 'border-black/10'} pb-[env(safe-area-inset-bottom,0.75rem)]`}>
          <button onClick={scrollToSection('portfolio')} className={`flex-1 flex flex-col items-center gap-1 p-1 transition-colors ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'}`}>
            <BookOpenIcon className="w-5 h-5" />
            <span className="text-[7px] font-black uppercase tracking-widest">{locale === 'en' ? 'Tools' : '도구'}</span>
          </button>
          <button onClick={scrollToSection('lab')} className={`flex-1 flex flex-col items-center gap-1 p-1 transition-colors ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'}`}>
            <CodeIcon className="w-5 h-5" />
            <span className="text-[7px] font-black uppercase tracking-widest">{locale === 'en' ? 'Lab' : '실험실'}</span>
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
            <span className="text-[7px] font-black uppercase tracking-widest">{locale === 'en' ? 'Story' : '스토리'}</span>
          </button>
          <button onClick={scrollToSection('contact')} className={`flex-1 flex flex-col items-center gap-1 p-1 transition-colors ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'}`}>
            <MailIcon className="w-5 h-5" />
            <span className="text-[7px] font-black uppercase tracking-widest">{locale === 'en' ? 'Connect' : '연락처'}</span>
          </button>
      </nav>

      <main>
        {/* REFINED HERO SECTION - INCREASED PADDING FOR SUBSTANTIAL BREATHING ROOM */}
        <section className="relative min-h-[100vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden pt-72 md:pt-64 pb-24">
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

            {/* Increased MT to push content down significantly from the top nav */}
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-12 md:gap-28 animate-in fade-in slide-in-from-bottom-16 duration-1000 relative z-40 mt-20 md:mt-32">
                <div className="space-y-8 md:space-y-16 w-full">
                    <div className={`flex items-center justify-center gap-4 text-[9px] md:text-[12px] font-black tracking-[0.5em] md:tracking-[1em] uppercase ${theme === 'dark' ? 'text-accent-gold' : 'text-accent-clay'}`}>
                      {t[locale].heroBadge}
                    </div>
                    
                    <div className="relative">
                      {locale === 'en' ? (
                        <h1 className="text-4xl sm:text-7xl lg:text-[10rem] font-medium tracking-tight leading-[1.1] md:leading-[1] font-display text-gradient-white pb-6 px-2">
                          Real tools for <br />
                          <span className={`italic block tracking-tighter pt-2 md:pt-8 font-light ${theme === 'dark' ? 'text-white/20' : 'text-alpine-950/20'}`}>
                            real people.
                          </span>
                        </h1>
                      ) : (
                        <h1 className="text-4xl sm:text-7xl lg:text-[6.5rem] font-medium tracking-tight leading-[1.2] md:leading-[1.1] font-display text-gradient-white pb-6 px-2">
                          현장에 꼭 필요한 <br />
                          <span className={`italic block tracking-tighter pt-2 md:pt-6 font-light ${theme === 'dark' ? 'text-white/20' : 'text-alpine-950/20'}`}>
                            실제 작동하는 도구들.
                          </span>
                        </h1>
                      )}
                    </div>

                    <p className={`text-[10px] md:text-sm max-w-lg mx-auto leading-relaxed font-medium tracking-[0.1em] md:tracking-[0.15em] uppercase px-4 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                      {t[locale].heroTagline}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-10 w-full max-w-xl px-4 mx-auto">
                    <a href="#portfolio" onClick={scrollToSection('portfolio')} className="shiny-cta w-full py-5 shadow-xl text-center">
                        {t[locale].viewProjectsBtn}
                    </a>
                    <button onClick={scrollToSection('lab')} className={`w-full flex items-center justify-center gap-3.5 px-6 py-5 rounded-xl border transition-all ${theme === 'dark' ? 'border-white/20 hover:bg-white/5 text-white' : 'border-black/20 hover:bg-black/5 text-alpine-950'}`}>
                      <CodeIcon className="w-4 h-4 text-accent-gold shrink-0" /> 
                      <span className="text-[10px] font-black uppercase tracking-wider sm:tracking-[0.2em] text-center leading-normal">{t[locale].playgroundBtn}</span>
                    </button>
                </div>
            </div>
        </section>

        {/* PORTFOLIO SECTION */}
        <section id="portfolio" className="py-20 md:py-48 px-6 max-w-7xl mx-auto">
            <div className="mb-20 md:mb-24 text-center space-y-6">
                <div className="text-accent-gold text-[9px] md:text-[11px] font-black tracking-[1em] uppercase">{t[locale].toolsBadge}</div>
                <h2 className="text-5xl md:text-8xl font-medium tracking-tighter font-display text-gradient-white leading-none">{t[locale].toolsTitle}</h2>
            </div>

            {/* INTERACTIVE CONTROLS: CATEGORIES & LAYOUTS */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 pb-8 border-b border-white/5">
                {/* Category Pills */}
                <div className="flex flex-wrap items-center gap-2 justify-center">
                    {[
                      { id: 'all', label: t[locale].allSolutions, count: 5 },
                      { id: 'ai', label: t[locale].aiEngines, count: 3 },
                      { id: 'pipelines', label: t[locale].pipelines, count: 3 }
                    ].map(tab => {
                      const isActive = selectedCategory === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setSelectedCategory(tab.id as any)}
                          className={`px-5 py-2.5 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all ${
                            isActive
                              ? 'bg-accent-gold text-alpine-950 font-black'
                              : theme === 'dark'
                                ? 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/10'
                                : 'bg-black/5 text-alpine-950/60 hover:bg-black/10 hover:text-black border border-black/5'
                          }`}
                        >
                          {tab.label} <span className="opacity-60 ml-1">({tab.count})</span>
                        </button>
                      );
                    })}
                </div>

                {/* Layout Switches */}
                <div className={`flex items-center gap-2 border rounded-full p-1 ${theme === 'dark' ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-black/[0.02]'}`}>
                    {[
                      { id: 'grid', label: t[locale].sleekGrid, icon: 'grid' },
                      { id: 'detailed', label: t[locale].continuousStory, icon: 'list' }
                    ].map(layout => {
                      const isActive = portfolioLayout === layout.id;
                      return (
                        <button
                          key={layout.id}
                          onClick={() => setPortfolioLayout(layout.id as any)}
                          className={`px-4 py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                            isActive
                              ? theme === 'dark' ? 'bg-white/10 text-white' : 'bg-alpine-950 text-white'
                              : theme === 'dark' ? 'text-white/40 hover:text-white/80' : 'text-alpine-950/50 hover:text-alpine-950'
                          }`}
                        >
                          {layout.id === 'grid' ? (
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <rect x="3" y="3" width="7" height="7" />
                              <rect x="14" y="3" width="7" height="7" />
                              <rect x="14" y="14" width="7" height="7" />
                              <rect x="3" y="14" width="7" height="7" />
                            </svg>
                          ) : (
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <line x1="3" y1="6" x2="21" y2="6" />
                              <line x1="3" y1="12" x2="21" y2="12" />
                              <line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                          )}
                          {layout.label}
                        </button>
                      );
                    })}
                </div>
            </div>

            {/* FILTERED PORTFOLIO DISPLAY */}
            {(() => {
              const filteredProjects = PORTFOLIO_DATA.projects.filter(project => {
                if (selectedCategory === 'all') return true;
                if (selectedCategory === 'ai') {
                  return ['chekki', 'eduplanner', 'lead-enrichment'].includes(project.id);
                }
                if (selectedCategory === 'pipelines') {
                  return ['benchmark-explorer', 'consultation-pipeline', 'lead-enrichment'].includes(project.id);
                }
                return true;
              });

              if (filteredProjects.length === 0) {
                return (
                  <div className="text-center py-24 font-mono text-xs text-white/40">
                    {t[locale].noProjects}
                  </div>
                );
              }

              if (portfolioLayout === 'grid') {
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, idx) => (
                      <CompactProjectCard 
                        key={project.id} 
                        project={project} 
                        index={PORTFOLIO_DATA.projects.findIndex(p => p.id === project.id)} 
                        theme={theme} 
                        onOpenCaseStudy={setActiveCaseStudyId} 
                      />
                    ))}
                  </div>
                );
              }

              return (
                <div className="space-y-[10rem] md:space-y-[20rem]">
                  {filteredProjects.map((project, idx) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      index={PORTFOLIO_DATA.projects.findIndex(p => p.id === project.id)} 
                      theme={theme} 
                      onOpenCaseStudy={setActiveCaseStudyId} 
                    />
                  ))}
                </div>
              );
            })()}
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
                 <div className="text-accent-gold text-[9px] font-black tracking-[1em] uppercase">{t[locale].storyBadge}</div>
                 {locale === 'en' ? (
                   <h2 className="text-5xl md:text-8xl font-medium font-display tracking-tighter text-gradient-white leading-none">Teacher who <br /><span className={`${theme === 'dark' ? 'text-white/20' : 'text-black/10'} italic font-light`}>builds tools.</span></h2>
                 ) : (
                   <h2 className="text-5xl md:text-[5.5rem] font-medium font-display tracking-tighter text-gradient-white leading-[1.1]">교육적 한계를 <br /><span className={`${theme === 'dark' ? 'text-white/20' : 'text-black/10'} italic font-light`}>도구로 깨는 교사.</span></h2>
                 )}
                 <p className={`text-base md:text-xl font-light leading-relaxed max-w-xl ${theme === 'dark' ? 'text-white/60' : 'text-alpine-950/80'}`}>
                   {t[locale].storyBody}
                 </p>
                 <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
                   <div>
                     <div className="text-4xl md:text-5xl font-mono text-accent-gold font-bold">2,400+</div>
                     <span className={`text-[9px] font-extrabold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-alpine-950/40'}`}>{t[locale].hoursSaved}</span>
                   </div>
                   <div>
                     <div className="text-4xl md:text-5xl font-mono text-accent-gold font-bold">98%</div>
                     <span className={`text-[9px] font-extrabold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-alpine-950/40'}`}>{t[locale].parentTrust}</span>
                   </div>
                 </div>
            </div>
          </div>
        </section>

        <FeedbackBox theme={theme} />

        {/* CONNECT SECTION */}
        <section id="contact" className="py-32 md:py-64 px-6 text-center">
            <h2 className="text-6xl md:text-9xl font-medium font-display tracking-tighter leading-none text-gradient-white">{t[locale].sayHi}</h2>
            <div className="pt-16">
                <a href="mailto:jsn.benjamin@gmail.com" className="shiny-cta px-12 py-6">
                    {t[locale].startConv}
                </a>
            </div>
        </section>
      </main>

      <footer className="py-20 text-center opacity-40">
          <p className="text-[10px] font-black uppercase tracking-[1em]">© 2026 Jason Benjamin — Seoul, Korea</p>
      </footer>

      <ComplianceModal isOpen={!!modalType} onClose={() => setModalType(null)} type={modalType || 'privacy'} />
      <AIChat isOpen={isChatOpen} setIsOpen={setIsChatOpen} theme={theme} />
      
      {activeCaseStudyId && (
        <CaseStudyViewer 
          projectId={activeCaseStudyId} 
          onClose={() => setActiveCaseStudyId(null)} 
          theme={theme} 
        />
      )}
    </div>
  );
}

export default App;

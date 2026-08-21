
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { PORTFOLIO_DATA } from './constants.ts';
import ProjectCard from './components/ProjectCard.tsx';
import { CompactProjectCard } from './components/CompactProjectCard.tsx';
import AIChat from './components/AIChat.tsx';
import InteractiveDemo from './components/InteractiveDemo.tsx';
import ComplianceModal from './components/ComplianceModal.tsx';
import FeedbackBox from './components/FeedbackBox.tsx';
import { CaseStudyViewer } from './CaseStudyViewer.tsx';
import ResumeModal from './components/ResumeModal.tsx';
import LiveStatusFeed from './components/LiveStatusFeed.tsx';
import { ExecutiveMatrix } from './components/ExecutiveMatrix.tsx';
import { MailIcon, SparklesIcon, SendIcon, BookOpenIcon, MapIcon, CodeIcon, ChevronDownIcon, ExternalLinkIcon, XIcon, FileTextIcon, SearchIcon, SunIcon, MoonIcon, DeviceMobileIcon, SettingsIcon, CreditCardIcon, LockIcon, LightbulbIcon, BriefcaseIcon, RocketIcon } from './components/Icons.tsx';

const t = {
  en: {
    projectsNav: "Projects",
    playgroundNav: "Interactive Lab",
    storyNav: "Product Philosophy",
    heroBadge: "JASON BENJAMIN — AI PRODUCT MANAGER & ENGINEER",
    heroTitle1: "Voice AI · LLM Systems · B2B SaaS",
    heroTitle2: "Engineering products that eliminate operational friction.",
    heroTagline: "Sole engineer and product owner who shipped a production voice-AI interview platform from zero (realtime WebRTC, deterministic LLM evaluation, security hardening, AWS EC2 deploy) and 6 independent Korean EdTech AI products with a 19-entry decision log.",
    viewProjectsBtn: "Explore Solutions",
    playgroundBtn: "Interactive AI Lab",
    toolsBadge: "PRODUCTION PORTFOLIO",
    toolsTitle: "The Collection",
    allSolutions: "All Projects",
    chekkiEcoTab: "Chekki Ecosystem",
    workProjectsTab: "Work Projects",
    independentProjectsTab: "Independent Projects",
    sleekGrid: "Sleek Grid",
    continuousStory: "Continuous Storyboarding",
    noProjects: "No projects found matching this search criteria.",
    storyBadge: "PRODUCT PHILOSOPHY & EXECUTION",
    storyTitle1: "From pedagogical bottlenecks to",
    storyTitle2: "enterprise-grade AI products.",
    storyBody: "I combine deep domain experience in education with modern software architecture to engineer real-world AI products. I turn complex operational bottlenecks into fast, intuitive, and scalable software solutions.",
    hoursSavedLabel: "Avg. Admin Workload Saved",
    hoursSavedValue: "80%",
    hoursSavedDesc: "Streamlined operational pipelines and report generation.",
    privacyLabel: "Data Privacy & Compliance",
    privacyValue: "100%",
    privacyDesc: "Strict GDPR & COPPA alignment — zero persistent logs.",
    integrityBadge: "100% Real Trial & Production Metrics",
    sayHi: "Let's build together.",
    startConv: "Send Inquiry via Email",
    escapeBrowser: "Escape the In-App Browser"
  },
  ko: {
    projectsNav: "프로젝트",
    playgroundNav: "인터랙티브 랩",
    storyNav: "제품 철학 및 배경",
    heroBadge: "제이슨 벤자민 — AI 프로덕트 매니저 & 엔지니어",
    heroTitle1: "음성 AI · LLM 시스템 · B2B SaaS",
    heroTitle2: "운영 병목을 제거하는 실전 AI 소프트웨어 프로덕트.",
    heroTagline: "실시간 WebRTC 음성 파이프라인, LLM 평가 엔진, 보안 하드닝 및 AWS EC2 배포까지 프로덕션 음성 AI 인터뷰 플랫폼을 1인 구축하고, 19개 의사결정 로그를 갖춘 6개 에듀테크 AI 프로덕트를 출시한 0→1 AI PM & 엔지니어입니다.",
    viewProjectsBtn: "프로젝트 포트폴리오 ↓",
    playgroundBtn: "인터랙티브 AI 시험장",
    toolsBadge: "활성 프로덕션 목록",
    toolsTitle: "주요 포트폴리오",
    allSolutions: "전체 프로젝트",
    chekkiEcoTab: "Chekki 생태계",
    workProjectsTab: "기업 업무 프로젝트",
    independentProjectsTab: "독립 개발 프로젝트",
    sleekGrid: "한눈에 보는 그리드",
    continuousStory: "상세 스토리보드",
    noProjects: "해당 조건에 맞는 프로젝트가 없습니다.",
    storyBadge: "제품 철학 및 실행 여정",
    storyTitle1: "현장 운영 병목에서",
    storyTitle2: "엔터프라이즈급 AI 프로덕트로.",
    storyBody: "교육 분야의 실무 경험과 현대적인 소프트웨어 아키텍처를 결합하여 실제 문제를 해결하는 AI 프로덕트를 만듭니다. 복잡한 업무 병목 현상을 빠르고 직관적인 소프트웨어 솔루션으로 변환합니다.",
    hoursSavedLabel: "평균 행정 업무 절감률",
    hoursSavedValue: "80%",
    hoursSavedDesc: "자동화 파이프라인 및 리포트 자동 생성을 통한 공수 절감.",
    privacyLabel: "학습 데이터 보호 수준",
    privacyValue: "100% 안심 가동",
    privacyDesc: "엄격한 무저장 규약 및 개인정보 보호 완비.",
    integrityBadge: "검증된 프로덕션 지표 — 100% 실측 데이터",
    sayHi: "프로젝트 협업 문의",
    startConv: "프로젝트 협업 제안 및 메일 문의하기",
    escapeBrowser: "인앱 브라우저를 벗어나 환상적인 체험을 즐기세요"
  }
};

function App() {
  const shouldReduceMotion = useReducedMotion();
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
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showCompetencies, setShowCompetencies] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Synchronize case study state with URL Hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validIds = ['vodabi', 'chekki', 'benchmark-explorer', 'eduplanner', 'consultation-pipeline', 'lead-enrichment', 'white-label-hub'];
      if (validIds.includes(hash)) {
        setActiveCaseStudyId(hash);
      } else if (!hash) {
        setActiveCaseStudyId(null);
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (activeCaseStudyId) {
      if (window.location.hash !== `#${activeCaseStudyId}`) {
        window.location.hash = activeCaseStudyId;
      }
    } else {
      if (window.location.hash) {
        history.pushState("", document.title, window.location.pathname + window.location.search);
      }
    }
  }, [activeCaseStudyId]);

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

      // Viewport-based active navigation target tracking
      const sections = ['portfolio', 'lab', 'about', 'contact'];
      let currentSection = '';
      const headerOffset = 150; // Compensates for top bar height

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If top of section is inside or above visible scroll zone, and bottom is below header offset
          if (rect.top <= headerOffset + 80 && rect.bottom >= headerOffset) {
            currentSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentSection);
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
      <div className="fixed top-0 left-0 w-full z-[100] pointer-events-none flex flex-col items-center pt-[env(safe-area-inset-top,0px)]">
        {/* IN-APP BROWSER ALERT - Now Interactive */}
        {isInAppBrowser && (
          <button 
            onClick={() => setIsBrowserModalOpen(true)}
            className="w-full bg-red-600/95 hover:bg-red-500 backdrop-blur-md text-white py-2 px-4 text-[9px] font-black uppercase tracking-[0.2em] text-center flex items-center justify-center gap-3 transition-colors group pointer-events-auto"
          >
             <span className="group-hover:translate-x-1 transition-transform">Optimization Required: Open in Safari/Chrome</span>
             <ExternalLinkIcon className="w-3.5 h-3.5 animate-pulse" />
          </button>
        )}

        {/* MAIN NAVIGATION HEADER */}
        <header className={`pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center ${
          isScrolled 
            ? `w-[92%] md:w-[85%] max-w-5xl mt-2 md:mt-3 rounded-full border backdrop-blur-2xl py-2.5 md:py-3 px-4 sm:px-6 md:px-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] ${
                theme === 'dark' 
                  ? 'bg-alpine-950/85 border-white/10 shadow-black' 
                  : 'bg-white/90 border-black/10 shadow-black/10'
              }`
            : `w-[95%] max-w-7xl mt-3 md:mt-8 rounded-[1.8rem] border backdrop-blur-md py-3 md:py-5 px-4 sm:px-6 md:px-10 ${
                theme === 'dark' 
                  ? 'bg-[#14171d]/40 border-white/5' 
                  : 'bg-white/40 border-black/5'
              }`
        }`}>
          <div className="w-full flex items-center justify-between h-full">
              <span className={`font-display font-medium text-[10px] md:text-[13px] tracking-[0.5em] md:tracking-[0.8em] uppercase whitespace-nowrap leading-none transition-colors ${theme === 'dark' ? 'text-white' : 'text-alpine-950'}`}>
                J. BENJAMIN
              </span>
              <nav className="hidden md:flex items-center gap-12 text-[13px] font-semibold tracking-[0.05em]">
                  <a 
                    href="#portfolio" 
                    onClick={scrollToSection('portfolio')} 
                    className={`transition-all hover:opacity-85 relative pb-1 ${
                      activeSection === 'portfolio' 
                        ? 'text-accent-gold font-extrabold' 
                        : theme === 'dark' 
                          ? 'text-white/75 hover:text-white' 
                          : 'text-alpine-950/75 hover:text-alpine-950'
                    }`}
                  >
                    {t[locale].projectsNav}
                    {activeSection === 'portfolio' && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-gold animate-in fade-in duration-300"></span>
                    )}
                  </a>
                  <a 
                    href="#lab" 
                    onClick={scrollToSection('lab')} 
                    className={`transition-all hover:opacity-85 relative pb-1 ${
                      activeSection === 'lab' 
                        ? 'text-accent-gold font-extrabold' 
                        : theme === 'dark' 
                          ? 'text-white/75 hover:text-white' 
                          : 'text-alpine-950/75 hover:text-alpine-950'
                    }`}
                  >
                    {t[locale].playgroundNav}
                    {activeSection === 'lab' && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-gold animate-in fade-in duration-300"></span>
                    )}
                  </a>
                  <a 
                    href="#about" 
                    onClick={scrollToSection('about')} 
                    className={`transition-all hover:opacity-85 relative pb-1 ${
                      activeSection === 'about' 
                        ? 'text-accent-gold font-extrabold' 
                        : theme === 'dark' 
                          ? 'text-white/75 hover:text-white' 
                          : 'text-alpine-950/75 hover:text-alpine-950'
                    }`}
                  >
                    {t[locale].storyNav}
                    {activeSection === 'about' && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-gold animate-in fade-in duration-300"></span>
                    )}
                  </a>
                  
                  <div className="flex items-center gap-3">
                    {/* Search Icon / Sleek Expandable Input */}
                    <div className="flex items-center mr-1">
                      <div className={`flex items-center gap-2 rounded-full transition-all duration-300 ${
                        isSearchExpanded 
                          ? `px-3.5 py-2 border ${theme === 'dark' ? 'border-white/20 bg-white/5 text-white' : 'border-black/20 bg-black/5 text-alpine-950'} w-48 md:w-56 shadow-inner` 
                          : `w-10 h-10 hover:bg-accent-gold/10 hover:text-accent-gold justify-center rounded-full cursor-pointer flex items-center ${theme === 'dark' ? 'text-white/60' : 'text-alpine-950/60'}`
                      }`}
                      onClick={() => {
                        if (!isSearchExpanded) {
                          setIsSearchExpanded(true);
                          const element = document.getElementById('portfolio');
                          if (element) {
                            const headerOffset = 80;
                            const elementPosition = element.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: 'smooth'
                            });
                          }
                        }
                      }}>
                        <SearchIcon className="w-4 h-4 cursor-pointer shrink-0 transition-colors" />
                        {isSearchExpanded && (
                          <input
                            autoFocus
                            type="text"
                            placeholder={locale === 'en' ? "Search..." : "검색..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onBlur={() => {
                              if (!searchQuery) {
                                setIsSearchExpanded(false);
                              }
                            }}
                            className="bg-transparent border-none outline-none text-[10px] w-full font-bold uppercase tracking-wider text-inherit p-0 placeholder-black/30 dark:placeholder-white/30"
                          />
                        )}
                        {isSearchExpanded && searchQuery && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSearchQuery('');
                              setIsSearchExpanded(false);
                            }}
                            className="text-[9px] font-black uppercase text-accent-gold hover:text-white ml-1 shrink-0"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>

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
                      {locale === 'en' ? '한국어 (KO)' : 'ENGLISH (EN)'}
                    </button>
                    <button 
                      onClick={toggleTheme} 
                      className={`p-2.5 rounded-full hover:bg-accent-gold hover:text-alpine-950 transition-all transform active:scale-95 flex items-center justify-center border shadow-sm ${theme === 'dark' ? 'bg-alpine-900 border-white/10 text-white' : 'bg-white border-black/10 text-alpine-950'}`}
                      aria-label={theme === 'dark' ? "Switch to light theme" : "Switch to dark theme"}
                    >
                      {theme === 'dark' ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
                    </button>
                  </div>
              </nav>
              <div className="flex items-center gap-2 md:hidden">
                {/* Mobile Search Icon / Sleek Expandable Input */}
                <div className="flex items-center">
                  <div className={`flex items-center gap-1.5 rounded-full transition-all duration-300 ${
                    isSearchExpanded 
                      ? `px-2.5 py-1.5 border ${theme === 'dark' ? 'border-white/20 bg-white/5 text-white' : 'border-black/20 bg-black/5 text-alpine-950'} w-28 sm:w-36 shadow-inner` 
                      : `w-8 h-8 hover:bg-accent-gold/10 hover:text-accent-gold justify-center rounded-full cursor-pointer flex items-center ${theme === 'dark' ? 'text-white/60' : 'text-alpine-950/60'}`
                  }`}
                  onClick={() => {
                    if (!isSearchExpanded) {
                      setIsSearchExpanded(true);
                      const element = document.getElementById('portfolio');
                      if (element) {
                        const headerOffset = 80;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                      }
                    }
                  }}>
                    <SearchIcon className="w-3.5 h-3.5 cursor-pointer shrink-0 transition-colors" />
                    {isSearchExpanded && (
                      <input
                        autoFocus
                        type="text"
                        placeholder={locale === 'en' ? "Search..." : "검색..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onBlur={() => {
                          if (!searchQuery) {
                            setIsSearchExpanded(false);
                          }
                        }}
                        className="bg-transparent border-none outline-none text-[9px] w-full font-bold uppercase tracking-wider text-inherit p-0 placeholder-black/30 dark:placeholder-white/30"
                      />
                    )}
                    {isSearchExpanded && searchQuery && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchQuery('');
                          setIsSearchExpanded(false);
                        }}
                        className="text-[8px] font-black uppercase text-accent-gold hover:text-white ml-0.5 shrink-0"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                <button 
                  onClick={() => setLocale(prev => prev === 'en' ? 'ko' : 'en')}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-black tracking-wider transition-all transform active:scale-95 border-2 shadow-sm ${
                    locale === 'ko' 
                      ? 'bg-accent-gold border-accent-gold text-alpine-950 shadow-md' 
                      : (theme === 'dark' 
                          ? 'border-white/20 text-white hover:bg-white/10' 
                          : 'border-black/15 text-alpine-950 hover:bg-black/5')
                  }`}
                >
                  {locale === 'en' ? 'KO' : 'EN'}
                </button>
                <button 
                  onClick={toggleTheme} 
                  className={`p-2 hover:opacity-85 transition-opacity flex items-center justify-center`}
                  aria-label={theme === 'dark' ? "Switch to light theme" : "Switch to dark theme"}
                >
                  {theme === 'dark' ? <SunIcon className="w-4 h-4 text-white" /> : <MoonIcon className="w-4 h-4 text-alpine-950" />}
                </button>
              </div>
          </div>
        </header>
      </div>

      {/* IN-APP BROWSER MODAL */}
      {isBrowserModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={() => setIsBrowserModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white rounded-2xl overflow-hidden flex flex-col shadow-2xl animate-in zoom-in duration-300">
            <div className="p-8 pb-4 flex justify-between items-start">
               <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500">
                  <ExternalLinkIcon className="w-6 h-6" />
               </div>
               <button 
                 onClick={() => setIsBrowserModalOpen(false)} 
                 className="p-2 text-black/20 hover:text-black transition-colors"
                 aria-label={locale === 'ko' ? "브라우저 유의문 닫기" : "Close browser modal warning"}
               >
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

      <main>
        {/* REFINED HERO SECTION */}
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden pt-36 md:pt-48 pb-16">
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className={`absolute inset-0 transition-colors duration-500 ${theme === 'dark' ? 'bg-[#14171d]' : 'bg-[#faf9f6]'}`}></div>
                
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
                      preload="none"
                      aria-hidden="true"
                      role="presentation"
                      poster={heroFallbackImage}
                      className="w-full h-full object-cover"
                    >
                      <source src={heroVideoUrl} type="video/mp4" />
                    </video>
                  </div>
                </div>
            </div>

            {/* Balanced MT to keep content elegant from the top nav */}
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 md:gap-16 animate-in fade-in slide-in-from-bottom-16 duration-1000 relative z-40">
                <div className="space-y-6 md:space-y-10 w-full text-center">
                    <div className={`flex items-center justify-center gap-2 sm:gap-4 text-[10px] md:text-[13px] font-black tracking-[0.3em] sm:tracking-[0.6em] uppercase px-4 leading-normal ${theme === 'dark' ? 'text-accent-gold/90' : 'text-accent-clay'}`}>
                      <span>✦</span> {t[locale].heroBadge}
                    </div>
                    
                    <div className="relative">
                      <h1 
                        className={`font-medium tracking-tight font-display ${theme === 'dark' ? 'text-white' : 'text-alpine-950'} pb-4 px-2`}
                        style={{ fontSize: 'clamp(2.2rem, 7.5vw, 5.5rem)', lineHeight: '1.05', textWrap: 'balance' }}
                      >
                        {t[locale].heroTitle1} <br />
                        <span className={`italic block tracking-tight pt-2 md:pt-4 font-light ${theme === 'dark' ? 'text-white/60' : 'text-alpine-950/60'}`}>
                          {t[locale].heroTitle2}
                        </span>
                      </h1>
                    </div>

                    <p className={`text-xs md:text-base max-w-2xl mx-auto leading-relaxed font-medium px-4 ${theme === 'dark' ? 'text-white/85' : 'text-alpine-950/85'}`} style={{ textWrap: 'pretty' }}>
                      {t[locale].heroTagline}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full max-w-3xl px-4 mx-auto mt-8">
                    <a 
                      href="https://chekki-ai.vercel.app/" 
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="shiny-cta py-4 px-6 text-center shadow-xl w-full sm:w-auto text-[10px] md:text-xs tracking-wider"
                    >
                      🚀 {locale === 'en' ? "Launch Chekki AI" : "Chekki AI 기동 ↗"}
                    </a>
                    
                    <button 
                      onClick={() => setIsResumeOpen(true)} 
                      className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl border text-[10px] md:text-xs font-black uppercase tracking-wider transition-all min-h-[44px] ${
                        theme === 'dark' 
                          ? 'border-white/20 hover:bg-white/5 text-white' 
                          : 'border-black/20 hover:bg-black/5 text-alpine-950'
                      }`}
                    >
                      <span>📄</span> 
                      <span>{locale === 'en' ? "Interactive CV" : "이력서 / 명세서 열기"}</span>
                    </button>

                    <a 
                      href="#portfolio" 
                      onClick={scrollToSection('portfolio')} 
                      className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl border text-[10px] md:text-xs font-black uppercase tracking-wider transition-all min-h-[44px] ${
                        theme === 'dark' 
                          ? 'border-white/15 hover:bg-white/5 text-white/80' 
                          : 'border-black/15 hover:bg-black/5 text-alpine-950/80'
                      }`}
                    >
                      <span>🔨</span> 
                      <span>{locale === 'en' ? "Explore Solutions" : "포트폴리오 탐색 ↓"}</span>
                    </a>
                </div>

                {/* QUICK STATS BAR */}
                <div className="w-full max-w-4xl mx-auto pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4 text-center mt-4">
                  <div className={`p-4 rounded-xl border backdrop-blur-md ${theme === 'dark' ? 'bg-white/[0.03] border-white/10' : 'bg-black/[0.03] border-black/10'}`}>
                    <div className="text-base md:text-lg font-black text-accent-gold">Direct WebRTC</div>
                    <div className="text-[10px] md:text-xs font-semibold tracking-wider uppercase opacity-75 mt-1">
                      {locale === 'en' ? "Voice AI & Ephemeral Tokens" : "음성 AI & 임시 세션 토큰"}
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl border backdrop-blur-md ${theme === 'dark' ? 'bg-white/[0.03] border-white/10' : 'bg-black/[0.03] border-black/10'}`}>
                    <div className="text-xl md:text-2xl font-black text-accent-gold">&lt; 4 Weeks</div>
                    <div className="text-[10px] md:text-xs font-semibold tracking-wider uppercase opacity-75 mt-1">
                      {locale === 'en' ? "0→Production Build (VodaBi)" : "0→프로덕션 완성 (VodaBi)"}
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl border backdrop-blur-md ${theme === 'dark' ? 'bg-white/[0.03] border-white/10' : 'bg-black/[0.03] border-black/10'}`}>
                    <div className="text-xl md:text-2xl font-black text-accent-gold">19 Decisions</div>
                    <div className="text-[10px] md:text-xs font-semibold tracking-wider uppercase opacity-75 mt-1">
                      {locale === 'en' ? "Documented Architecture Log" : "문서화된 의사결정 로그"}
                    </div>
                  </div>
                </div>
            </div>
        </section>

        {/* 5-SECOND EXECUTIVE SCAN / SHIPPED SYSTEMS & STACKS MATRIX */}
        <ExecutiveMatrix 
          locale={locale} 
          theme={theme} 
          onOpenCaseStudy={setActiveCaseStudyId} 
        />

        {/* LIVE STATUS UPDATE & BUILD TIMELINE */}
        <LiveStatusFeed 
          locale={locale} 
          theme={theme} 
          onOpenCaseStudy={setActiveCaseStudyId} 
        />

        {/* PORTFOLIO SECTION */}
        <section id="portfolio" className="py-36 md:py-48 px-6 max-w-7xl mx-auto">
            <div className="mb-10 md:mb-14 text-center">
                <h2 className={`text-3xl sm:text-5xl font-medium tracking-tight font-display ${theme === 'dark' ? 'text-white' : 'text-alpine-950'} leading-tight sm:leading-none`} style={{ fontSize: 'clamp(2rem, 6vw, 5.5rem)', textWrap: 'balance' }}>{t[locale].toolsTitle}</h2>
            </div>

            {/* CORE COMPETENCIES & TECHNOLOGY BOARD (FLATTENED LAYOUT) */}
            <div className={`mb-16 border-t relative transition-all duration-300 ${
              theme === 'dark' ? 'border-white/10' : 'border-black/10'
            }`}>
              <button 
                onClick={() => setShowCompetencies(!showCompetencies)}
                className="w-full text-left py-8 flex items-center justify-between gap-6 hover:opacity-80 transition-all focus:outline-none relative z-10"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 w-full pr-4">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent-gold font-mono">
                      {locale === 'en' ? "CURRICULUM VITAE MATCH" : "핵심 역량 및 서칭 매트릭스"}
                    </span>
                    <h3 className={`text-2xl md:text-3xl font-display font-medium tracking-tight ${theme === 'dark' ? 'text-white' : 'text-alpine-950'} mt-1`}>
                      {locale === 'en' ? "Core Competencies & Stack" : "핵심 전문 역량 (Core Competencies)"}
                    </h3>
                  </div>
                  <div className={`text-xs max-w-md leading-relaxed hidden sm:block ${theme === 'dark' ? 'text-text-sec' : 'text-alpine-950/60'}`}>
                    {locale === 'en'
                      ? "Targeted search keywords, hybrid platform expertise, and monetization infrastructures mapped to industry-level requirements. Click to expand."
                      : "헤드헌터 및 채용 매니저 서칭 지표(Mobile, Data, Monetization)를 일치 기입한 보증판. 클릭해서 펼치기."}
                  </div>
                </div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border shrink-0 transition-all duration-300 ${
                  showCompetencies 
                    ? 'rotate-180 bg-accent-gold/15 border-accent-gold/30' 
                    : (theme === 'dark' ? 'border-white/10 hover:border-white/20' : 'border-black/10 hover:border-black/20')
                }`}>
                  <ChevronDownIcon className={`w-4 h-4 transition-colors ${showCompetencies ? 'text-accent-gold' : 'text-text-tert'}`} />
                </div>
              </button>
              
              {showCompetencies && (
                <div className="pb-12 pt-6 grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-top-4 duration-300 relative z-10">
                  {/* COLUMN 1 */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <DeviceMobileIcon className="w-5 h-5 text-accent-gold shrink-0" />
                      <h4 className="text-xs font-black uppercase tracking-widest text-accent-gold">
                        {locale === 'en' ? "Product Management & 0→1 AI" : "AI 프로덕트 관리 & 0→1 기획"}
                      </h4>
                    </div>
                    <ul className={`space-y-2 text-xs font-mono font-light leading-relaxed ${theme === 'dark' ? 'text-text-sec' : 'text-alpine-950/80'}`}>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"></div>PRD Authorship & Decision Logging (19 ADRs)</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"></div>LLM Judge Architecture & Rubric Design</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"></div>Deterministic stepIndex Rubrics (0% Hallucination)</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"></div>Bilingual Product Design & UX (English / Korean)</li>
                    </ul>
                  </div>

                  {/* COLUMN 2 */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <SettingsIcon className="w-5 h-5 text-accent-gold shrink-0" />
                      <h4 className="text-xs font-black uppercase tracking-widest text-accent-gold">
                        {locale === 'en' ? "Voice AI & LLM Systems" : "음성 AI & LLM 시스템 엔지니어링"}
                      </h4>
                    </div>
                    <ul className={`space-y-2 text-xs font-mono font-light leading-relaxed ${theme === 'dark' ? 'text-text-sec' : 'text-alpine-950/80'}`}>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"></div>Direct WebRTC Voice AI & Push-to-Talk Turn Control</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"></div>OpenAI Realtime API & Ephemeral Client Sessions</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"></div>Gemini 2.5 Flash / Pro Multimodal Vision Pipelines</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"></div>Stateless Magic Links & AES-256-GCM Encryption</li>
                    </ul>
                  </div>

                  {/* COLUMN 3 */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CreditCardIcon className="w-5 h-5 text-accent-gold shrink-0" />
                      <h4 className="text-xs font-black uppercase tracking-widest text-accent-gold">
                        {locale === 'en' ? "Full-Stack, Mobile & Infrastructure" : "풀스택, 모바일 & 인프라 배포"}
                      </h4>
                    </div>
                    <ul className={`space-y-2 text-xs font-mono font-light leading-relaxed ${theme === 'dark' ? 'text-text-sec' : 'text-alpine-950/80'}`}>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"></div>React 19, Vite, TypeScript & Tailwind CSS</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"></div>NestJS 11, Node.js 24, Prisma 7 & MariaDB</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"></div>Docker Compose, Caddy Reverse Proxy & AWS EC2</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"></div>Capacitor (iOS/Android) & RevenueCat Subscriptions</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* INTERACTIVE CONTROLS: CATEGORIES & LAYOUTS */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 pb-8 border-b border-white/5">
                {/* Category Pills */}
                <div className="flex overflow-x-auto flex-nowrap items-center gap-2 py-1 justify-start max-w-full scrollbar-none -mx-6 px-6 md:mx-0 md:px-0">
                    {[
                      { id: 'all', label: t[locale].allSolutions, count: 7 },
                      { id: 'chekki-eco', label: t[locale].chekkiEcoTab, count: 2 },
                      { id: 'work', label: t[locale].workProjectsTab, count: 1 },
                      { id: 'independent', label: t[locale].independentProjectsTab, count: 4 }
                    ].map(tab => {
                      const isActive = selectedCategory === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setSelectedCategory(tab.id as any)}
                          className={`px-5 py-2.5 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap shrink-0 ${
                            isActive
                              ? 'bg-accent-gold text-alpine-950 font-black shadow-md'
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
                <div className={`flex items-center gap-2 border rounded-full p-1 whitespace-nowrap shrink-0 ${theme === 'dark' ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-black/[0.02]'}`}>
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

            {/* FILTERED PORTFOLIO DISPLAY - 3 DISTINCT SECTIONS */}
            {(() => {
              const activeProjects = locale === 'ko' ? PORTFOLIO_DATA.ko.projects : PORTFOLIO_DATA.en.projects;

              const sectionDefinitions = [
                {
                  id: 'chekki-eco',
                  title: locale === 'en' ? '1. Chekki Ecosystem' : '1. Chekki 생태계',
                  badge: locale === 'en' ? 'Flagship Ecosystem' : '플래그십 생태계',
                  desc: locale === 'en' 
                    ? 'Bilingual AI homework assistant and multi-tenant mobile learning diary generator.' 
                    : '이중언어 AI 어시스턴트 및 모바일 성장학습일지 생성 플랫폼.',
                  projectIds: ['chekki', 'white-label-hub']
                },
                {
                  id: 'work',
                  title: locale === 'en' ? '2. VodaBi Enterprise Work' : '2. VodaBi 기업 엔터프라이즈 프로젝트',
                  badge: locale === 'en' ? 'VodaBi B2B SaaS (NDA Sanitized)' : 'VodaBi B2B SaaS (NDA 익명화)',
                  desc: locale === 'en' 
                    ? 'Real-time Voice-AI screening engine and deterministic LLM judge for enterprise sales candidates at VodaBi. (Proprietary client identifiers anonymized under NDA).' 
                    : 'VodaBi의 기업 채용 및 영업 코칭을 위한 실시간 음성 AI 스크리닝 및 결정론적 LLM 채점 플랫폼 (고객사 정보 NDA 준수 익명화).',
                  projectIds: ['vodabi']
                },
                {
                  id: 'independent',
                  title: locale === 'en' ? '3. Independent Projects' : '3. 독립 개발 프로젝트',
                  badge: locale === 'en' ? 'Independent AI Products' : '독립 개발 AI 프로덕트',
                  desc: locale === 'en' 
                    ? 'EdTech benchmarking tools, automated scheduling engines, report pipelines, and B2B CRM tools.' 
                    : '독립적으로 개발 및 배포한 에듀테크 앱, 스케줄링 엔진 및 B2B 자동화 파이프라인.',
                  projectIds: ['benchmark-explorer', 'eduplanner', 'consultation-pipeline', 'lead-enrichment']
                }
              ];

              const activeSections = sectionDefinitions.filter(sec => 
                selectedCategory === 'all' || selectedCategory === sec.id
              );

              let totalVisibleCount = 0;

              const renderedSections = activeSections.map(sec => {
                const secProjects = activeProjects.filter(p => sec.projectIds.includes(p.id));
                const filteredSecProjects = secProjects.filter(project => {
                  if (!searchQuery) return true;
                  const query = searchQuery.toLowerCase().trim();
                  const titleMatch = project.title.toLowerCase().includes(query);
                  const descMatch = project.description?.toLowerCase().includes(query) || project.longDescription?.toLowerCase().includes(query);
                  const tagMatch = project.tags?.some(t => t.toLowerCase().includes(query));
                  const featureMatch = project.features?.some(f => f.toLowerCase().includes(query));
                  const engineMatch = project.engineDetails?.toLowerCase().includes(query);
                  return titleMatch || descMatch || tagMatch || featureMatch || engineMatch;
                });

                totalVisibleCount += filteredSecProjects.length;

                if (filteredSecProjects.length === 0) return null;

                return (
                  <div key={sec.id} className="mb-20 last:mb-0">
                    {/* SECTION HEADER */}
                    <div className="mb-8 pb-4 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-accent-gold/15 text-accent-gold border border-accent-gold/30">
                            {sec.badge}
                          </span>
                          <span className="text-xs font-mono opacity-50">
                            {filteredSecProjects.length} {locale === 'en' ? 'project' : '개'}
                          </span>
                        </div>
                        <h3 className={`text-2xl md:text-3xl font-display font-medium tracking-tight ${theme === 'dark' ? 'text-white' : 'text-alpine-950'}`}>
                          {sec.title}
                        </h3>
                        <p className={`text-xs md:text-sm mt-1 max-w-2xl font-light leading-relaxed ${theme === 'dark' ? 'text-white/70' : 'text-alpine-950/70'}`}>
                          {sec.desc}
                        </p>
                      </div>
                    </div>

                    {/* SECTION CONTENT */}
                    {portfolioLayout === 'grid' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredSecProjects.map((project, idx) => (
                          <div key={project.id}>
                            <CompactProjectCard 
                              project={project} 
                              index={activeProjects.findIndex(p => p.id === project.id)} 
                              theme={theme} 
                              locale={locale}
                              onOpenCaseStudy={setActiveCaseStudyId} 
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-6 md:space-y-8">
                        {filteredSecProjects.map((project, idx) => (
                          <div key={project.id}>
                            <ProjectCard 
                              project={project} 
                              index={activeProjects.findIndex(p => p.id === project.id)} 
                              theme={theme} 
                              locale={locale}
                              onOpenCaseStudy={setActiveCaseStudyId} 
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              });

              if (totalVisibleCount === 0) {
                return (
                  <div className={`text-center py-24 font-mono text-xs ${theme === 'dark' ? 'text-white/60' : 'text-alpine-950/60'}`}>
                    {t[locale].noProjects}
                  </div>
                );
              }

              return <div className="space-y-8">{renderedSections}</div>;
            })()}
        </section>

        {/* LAB SECTION */}
        <section id="lab" className={`py-36 md:py-48 transition-all duration-700 ${theme === 'dark' ? 'bg-black/20' : 'bg-alpine-100/20'}`}>
            <InteractiveDemo theme={theme} />
        </section>

        {/* STORY SECTION */}
        <section id="about" className="py-36 md:py-48 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1">
               <div className={`relative z-10 rounded-3xl overflow-hidden aspect-[4/5] border ${theme === 'dark' ? 'border-white/10' : 'border-black/5 shadow-2xl'}`}>
                  <img src={PORTFOLIO_DATA.profileImageUrl} className="w-full h-full object-cover" alt="Jason Benjamin" />
               </div>
            </div>
            <div className="space-y-10 order-1 lg:order-2">
                 {locale === 'en' ? (
                   <h2 className="text-3xl sm:text-5xl font-medium font-display tracking-tight ${theme === 'dark' ? 'text-white' : 'text-alpine-950'} leading-tight sm:leading-none" style={{ fontSize: 'clamp(2rem, 6vw, 5.5rem)', textWrap: 'balance' }}>Teacher who <br /><span className={`${theme === 'dark' ? 'text-white/20' : 'text-black/10'} italic font-light`}>builds tools.</span></h2>
                 ) : (
                   <h2 className="text-3xl sm:text-5xl font-medium font-display tracking-tight ${theme === 'dark' ? 'text-white' : 'text-alpine-950'} leading-tight md:leading-[1.1]" style={{ fontSize: 'clamp(2rem, 6vw, 5.5rem)', textWrap: 'balance' }}>교육적 한계를 <br /><span className={`${theme === 'dark' ? 'text-white/20' : 'text-black/10'} italic font-light`}>도구로 깨는 교사.</span></h2>
                 )}
                 <p className={`text-base md:text-xl font-light leading-relaxed max-w-xl ${theme === 'dark' ? 'text-white/60' : 'text-alpine-950/80'}`}>
                   {t[locale].storyBody}
                 </p>
                 <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
                   <div>
                     <div className="text-4xl md:text-5xl font-mono text-accent-gold font-bold">{t[locale].hoursSavedValue}</div>
                     <span className={`text-xs font-extrabold uppercase tracking-widest ${theme === 'dark' ? 'text-white/70' : 'text-alpine-950/80'}`}>{t[locale].hoursSavedLabel}</span>
                      <p className={`text-[13px] font-light mt-1.5 leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-alpine-950/70'}`}>{t[locale].hoursSavedDesc}</p>
                   </div>
                   <div>
                     <div className="text-4xl md:text-5xl font-mono text-accent-gold font-bold">{t[locale].privacyValue}</div>
                     <span className={`text-xs font-extrabold uppercase tracking-widest ${theme === 'dark' ? 'text-white/70' : 'text-alpine-950/80'}`}>{t[locale].privacyLabel}</span>
                      <p className={`text-[13px] font-light mt-1.5 leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-alpine-950/70'}`}>{t[locale].privacyDesc}</p>
                   </div>
                 </div>
            </div>
          </div>
        </section>

        <FeedbackBox theme={theme} />

        {/* CONNECT SECTION */}
        <section id="contact" className="py-36 md:py-48 px-6 text-center">
            <h2 className={`text-4xl sm:text-6xl font-medium font-display tracking-tight leading-tight sm:leading-none ${theme === 'dark' ? 'text-accent-gold' : 'text-accent-clay'}`} style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', textWrap: 'balance' }}>{t[locale].sayHi}</h2>
            <div className="pt-8 md:pt-10">
                <a href="mailto:jsn.benjamin@gmail.com" className="shiny-cta px-12 py-6">
                    {t[locale].startConv}
                </a>
            </div>
        </section>
      </main>

      <footer className="py-20 text-center opacity-40">
          <p className="text-[10px] font-black uppercase tracking-[1em]">© 2026 Jason Benjamin — Seoul, Korea</p>
      </footer>

      {/* MOBILE FLOATING BOTTOM NAVIGATION DOCK */}
      <nav 
        className={`md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] rounded-full border px-2 py-1.5 flex items-center justify-around gap-1 w-[92%] max-w-[390px] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] transition-all ${
          theme === 'dark' 
            ? 'bg-alpine-950/90 border-white/15 text-white' 
            : 'bg-white/95 border-black/15 text-alpine-950'
        }`}
        aria-label="Mobile Navigation"
      >
        <a 
          href="#portfolio" 
          onClick={scrollToSection('portfolio')} 
          className={`flex-1 py-2.5 px-2 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all min-h-[44px] ${
            activeSection === 'portfolio'
              ? (theme === 'dark' ? 'bg-accent-gold text-alpine-950 shadow-md font-black' : 'bg-accent-clay text-white shadow-md font-black')
              : (theme === 'dark' ? 'text-white/70 hover:text-white' : 'text-alpine-950/70 hover:text-alpine-950')
          }`}
        >
          <span>📁</span>
          <span>{locale === 'en' ? 'Tools' : '프로덕트'}</span>
        </a>

        <a 
          href="#lab" 
          onClick={scrollToSection('lab')} 
          className={`flex-1 py-2.5 px-2 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all min-h-[44px] ${
            activeSection === 'lab'
              ? (theme === 'dark' ? 'bg-accent-gold text-alpine-950 shadow-md font-black' : 'bg-accent-clay text-white shadow-md font-black')
              : (theme === 'dark' ? 'text-white/70 hover:text-white' : 'text-alpine-950/70 hover:text-alpine-950')
          }`}
        >
          <span>🧪</span>
          <span>{locale === 'en' ? 'Lab' : '실험실'}</span>
        </a>

        <a 
          href="#about" 
          onClick={scrollToSection('about')} 
          className={`flex-1 py-2.5 px-2 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all min-h-[44px] ${
            activeSection === 'about'
              ? (theme === 'dark' ? 'bg-accent-gold text-alpine-950 shadow-md font-black' : 'bg-accent-clay text-white shadow-md font-black')
              : (theme === 'dark' ? 'text-white/70 hover:text-white' : 'text-alpine-950/70 hover:text-alpine-950')
          }`}
        >
          <span>📖</span>
          <span>{locale === 'en' ? 'Story' : '스토리'}</span>
        </a>

        <button 
          onClick={() => setIsChatOpen(true)}
          className={`flex-1 py-2.5 px-2 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all min-h-[44px] ${
            isChatOpen
              ? 'bg-accent-gold text-alpine-950 shadow-md font-black'
              : (theme === 'dark' ? 'bg-white/10 text-accent-gold hover:bg-white/20' : 'bg-black/5 text-accent-clay hover:bg-black/10')
          }`}
        >
          <span>✨</span>
          <span>{locale === 'en' ? 'AI' : 'AI'}</span>
        </button>
      </nav>

      <ComplianceModal isOpen={!!modalType} onClose={() => setModalType(null)} type={modalType || 'privacy'} locale={locale} />
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} theme={theme} locale={locale} />
      <AIChat isOpen={isChatOpen} setIsOpen={setIsChatOpen} theme={theme} locale={locale} />
      
      {activeCaseStudyId && (
        <CaseStudyViewer 
          projectId={activeCaseStudyId} 
          onClose={() => setActiveCaseStudyId(null)} 
          theme={theme} 
          locale={locale}
          backgroundScrollY={scrollY}
        />
      )}
    </div>
  );
}

export default App;

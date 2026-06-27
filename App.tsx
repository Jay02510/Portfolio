
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
import { MailIcon, SparklesIcon, SendIcon, BookOpenIcon, MapIcon, CodeIcon, ChevronDownIcon, ExternalLinkIcon, XIcon, FileTextIcon, SearchIcon, SunIcon, MoonIcon, DeviceMobileIcon, SettingsIcon, CreditCardIcon, LockIcon, LightbulbIcon, BriefcaseIcon, RocketIcon } from './components/Icons.tsx';

const t = {
  en: {
    projectsNav: "Projects",
    playgroundNav: "Live Playground",
    storyNav: "My Story",
    heroBadge: "JASON BENJAMIN — EDTECH FOUNDER & SOFTWARE BUILDER",
    heroTitle1: "Classroom-Tested Tools",
    heroTitle2: "built by a teacher.",
    heroTagline: "I am an educator and software builder who designs real-world educational tools. I engineer custom full-stack applications like Chekki AI, currently piloting with bilingual families in Korea.",
    viewProjectsBtn: "Explore Solutions",
    playgroundBtn: "Live No-Code AI Playground",
    toolsBadge: "PRODUCTION PORTFOLIO",
    toolsTitle: "The Collection",
    allSolutions: "All Solutions",
    aiEngines: "AI Engines",
    pipelines: "Pipelines & Workflows",
    sleekGrid: "Sleek Grid",
    continuousStory: "Continuous Storyboarding",
    noProjects: "No items found matching this filter combo.",
    storyBadge: "PRACTICAL JOURNEY",
    storyTitle1: "From chalkboards to",
    storyTitle2: "clean production code.",
    storyBody: "I combined 10 years of classroom pedagogy with modern systems architecture to engineer real-world EdTech tools. I replace tedious manual operations and reporting bottlenecks with high-efficiency automated workflows.",
    hoursSavedLabel: "Avg. Prep & Admin Saved",
    hoursSavedValue: "15h+",
    hoursSavedDesc: "Per classroom. Measured during school-wide trials in Korea.",
    privacyLabel: "Data Privacy & Compliance",
    privacyValue: "100%",
    privacyDesc: "Strict GDPR & COPPA alignment — zero persistent classroom logs.",
    integrityBadge: "Teacher-Vetted Benchmarks — 100% Real Trial Data",
    sayHi: "Let's build together.",
    startConv: "Send Project Inquiry via Email",
    escapeBrowser: "Escape the In-App Browser"
  },
  ko: {
    projectsNav: "프로젝트",
    playgroundNav: "라이브 실험실",
    storyNav: "소개 및 스토리",
    heroBadge: "제이슨 벤자민 — 에듀테크 창업가 & 빌더",
    heroTitle1: "학교 현장이 검증하고",
    heroTitle2: "교사적 관점으로 코딩한 솔루션.",
    heroTagline: "교육 현장의 목소리를 해결하는 소프트웨어 빌더입니다. 실제 bilingual 가정에서 필드 테스트 중인 대표작 Chekki AI를 개발하여 성취를 입증하고 있습니다.",
    viewProjectsBtn: "프로젝트 포트폴리오 ↓",
    playgroundBtn: "라이브 노코드 AI 시험장",
    toolsBadge: "활성 프로덕션 목록",
    toolsTitle: "주요 포트폴리오",
    allSolutions: "전체 도구",
    allSolutionsDesc: "전체 솔루션",
    aiEngines: "AI 솔루션",
    pipelines: "업무 자동화 파이프라인",
    sleekGrid: "한눈에 보는 그리드",
    continuousStory: "상세 스토리보드",
    noProjects: "해당 카테고리에 맞는 프로젝트가 발견되지 않았습니다.",
    storyBadge: "엔지니어의 여정",
    storyTitle1: "교정 분필에서",
    storyTitle2: "실제 배포 가능한 코드로.",
    storyBody: "10년간 교직에서 절감한 비효율을 직접 코딩하여 전수 자동화하였습니다. 반복 작업을 설계적 차원에서 제거하는 영구 자동화 연쇄망을 다져 학교의 소중한 시간을 보전합니다.",
    hoursSavedLabel: "주당 평균 준비/행정 시간 단축",
    hoursSavedValue: "15시간 이상",
    hoursSavedDesc: "실제 서울 지역 학원 연계 파일럿 연쇄 실측 분석 지표.",
    privacyLabel: "학습 데이터 보호 수준",
    privacyValue: "100% 안심 가동",
    privacyDesc: "매 수업 엄격 무저장 규약 완비 — 아동 행동학 로그의 영구 삭제.",
    integrityBadge: "정량화된 교직 성과 지수 — 거짓 없는 실측 통계",
    sayHi: "더 나은 생태계를 위해 소통해봐요",
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
  const [activePathfinderRole, setActivePathfinderRole] = useState<'recruiter' | 'director' | 'parent' | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');

  // Synchronize case study state with URL Hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validIds = ['chekki', 'benchmark-explorer', 'eduplanner', 'consultation-pipeline', 'lead-enrichment'];
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
      <div className="fixed top-0 left-0 w-full z-[100] pointer-events-none flex flex-col items-center">
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
            ? `w-[92%] md:w-[85%] max-w-5xl mt-3 rounded-full border backdrop-blur-2xl py-3 px-6 md:px-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] ${
                theme === 'dark' 
                  ? 'bg-alpine-950/85 border-white/10 shadow-black' 
                  : 'bg-white/90 border-black/10 shadow-black/10'
              }`
            : `w-[95%] max-w-7xl mt-4 md:mt-8 rounded-[1.8rem] border backdrop-blur-md py-4 md:py-5 px-6 md:px-10 ${
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

      {/* UNIFIED MOBILE NAVIGATION */}
      <nav className={`md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] rounded-[2rem] px-4 py-3 flex items-center gap-2 transition-all duration-500 border shadow-[0_20px_60px_rgba(0,0,0,0.5)] w-[90%] max-w-[385px] pb-[env(safe-area-inset-bottom,0.75rem)] ${
        theme === 'dark' ? 'bg-alpine-900 border-white/20' : 'bg-white border-black/10 shadow-xl'
      }`}>
          <button onClick={scrollToSection('portfolio')} className={`flex-1 flex flex-col items-center gap-1 p-1 transition-colors ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'}`}>
            <BookOpenIcon className="w-5 h-5" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wide">{locale === 'en' ? 'Tools' : '도구'}</span>
          </button>
          <button onClick={scrollToSection('lab')} className={`flex-1 flex flex-col items-center gap-1 p-1 transition-colors ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'}`}>
            <CodeIcon className="w-5 h-5" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wide">{locale === 'en' ? 'Lab' : '실험실'}</span>
          </button>
          
          <div className="px-1">
            <button 
              onClick={() => setIsChatOpen(!isChatOpen)} 
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-2xl border-4 transform active:scale-90 ${theme === 'dark' ? 'border-alpine-900 bg-accent-gold text-alpine-950' : 'border-white bg-alpine-950 text-accent-gold'}`}
              aria-label={locale === 'ko' ? "AI 어시스턴트 토글" : "Toggle AI assistant"}
            >
              <SparklesIcon className="w-6 h-6" />
            </button>
          </div>

          <button onClick={scrollToSection('about')} className={`flex-1 flex flex-col items-center gap-1 p-1 transition-colors ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'}`}>
            <MapIcon className="w-5 h-5" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wide">{locale === 'en' ? 'Story' : '스토리'}</span>
          </button>
          <button onClick={scrollToSection('contact')} className={`flex-1 flex flex-col items-center gap-1 p-1 transition-colors ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'}`}>
            <MailIcon className="w-5 h-5" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wide">{locale === 'en' ? 'Connect' : '연락처'}</span>
          </button>
      </nav>

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

                    {/* AUDIENCE PATHFINDER GROUP */}
                    <div className={`mt-8 max-w-2xl mx-auto rounded-2xl border p-5 transition-all text-left ${
                      theme === 'dark' ? 'bg-[#101419]/90 border-white/10' : 'bg-[#faf9f6]/95 border-black/5 shadow-xl'
                    }`}>
                      <div className="flex flex-col sm:flex-row items-baseline gap-2 mb-3.5">
                        <span className="text-[9px] font-black tracking-widest text-accent-gold uppercase font-mono">
                          {locale === 'en' ? "✦ PATHFINDER ROUTING" : "✦ 방문자 맞춤 빠른 가방 경로"}
                        </span>
                        <span className={`text-[11px] font-bold ${theme === 'dark' ? 'text-white/70' : 'text-alpine-950/70'}`}>
                          {locale === 'en' ? "Who are you?" : "어느 소속의 파트너이신가요?"}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {[
                          { id: 'recruiter', labelEn: 'Recruiter / Tech Lead', labelKo: '채용 담당자 / 테크 리더' },
                          { id: 'director', labelEn: 'School Director / Principal', labelKo: '학교 원장 / 교육 행정자' },
                          { id: 'parent', labelEn: 'Parent / Classroom Teacher', labelKo: '학부모 / 일선 교사' }
                        ].map(role => {
                          const isActive = activePathfinderRole === role.id;
                          return (
                            <button
                              key={role.id}
                              id={`pathfinder-role-${role.id}`}
                              onClick={() => setActivePathfinderRole(isActive ? null : role.id as any)}
                              className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-wider text-center border ${
                                isActive 
                                  ? 'bg-accent-gold border-accent-gold text-alpine-950 font-black shadow-lg scale-[1.02]' 
                                  : theme === 'dark'
                                    ? 'bg-white/5 border-white/5 text-white/80 hover:bg-white/10'
                                    : 'bg-black/5 border-black/5 text-alpine-950/80 hover:bg-black/10'
                              }`}
                            >
                              {locale === 'en' ? role.labelEn : role.labelKo}
                            </button>
                          );
                        })}
                      </div>

                      {activePathfinderRole && (
                        <div className="mt-4 pt-4 border-t border-white/5 animate-in fade-in duration-300">
                          <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-white/85' : 'text-alpine-950/85'}`}>
                            {activePathfinderRole === 'recruiter' && (
                              locale === 'en' 
                                ? "💡 Target Fit: Evaluating full-stack architecture or custom B2B outreach pipeline? Explore direct-fit competencies, architectural case studies, or prompt me for an instant interactive CV."
                                : "💡 채용 최적점: 풀스택 자동화 아키텍처 및 B2B 연결망이 필요하신가요? 핵심 역량 대조판을 확인하시거나, 원클릭 이력서 모달을 기동하세요."
                            )}
                            {activePathfinderRole === 'director' && (
                              locale === 'en'
                                ? "🏫 Operations Fit: Need to minimize student intake errors or conflict-resolution variables? Review EduPlanner (automated scheduling) or Automated Report Generator & Pipeline (data systems saving 15h/week)."
                                : "🏫 학원 행정 최적화: 수강생 선제 등재나 야근을 줄일 일체 데이터 관리망이 필요하신가요? 무인 시간표 생성 조립기(EduPlanner) 및 Automated Report Generator & Pipeline (주 15시간 데이터 관리 자동화)를 살펴보관하세요."
                            )}
                            {activePathfinderRole === 'parent' && (
                              locale === 'en'
                                ? "🎒 Learner Fit: Want to see the real classroom helpers built with strict Zero-Memory COPPA data safeguards? Explore Chekki AI for immediate, bilingual worksheet parsing."
                                : "🎒 교직 및 교양: 아이들의 학업 데이터 주권을 100% 보장하는 무결점 교육 도구를 확인하세요. 스마트폰 카메라 스캔형 숙제 지시 비서 Chekki AI 기동이 준비되어 있습니다."
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full max-w-3xl px-4 mx-auto">
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
                      className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl border text-[10px] md:text-xs font-black uppercase tracking-wider transition-all ${
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
                      className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl border text-[10px] md:text-xs font-black uppercase tracking-wider transition-all ${
                        theme === 'dark' 
                          ? 'border-white/15 hover:bg-white/5 text-white/80' 
                          : 'border-black/15 hover:bg-black/5 text-alpine-950/80'
                      }`}
                    >
                      <span>🔨</span> 
                      <span>{locale === 'en' ? "Explore Solutions" : "포트폴리오 탐색 ↓"}</span>
                    </a>
                </div>
            </div>
        </section>

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
                        {locale === 'en' ? "Mobile & Frontend Bridges" : "모바일 및 하이브리드 프론트엔드"}
                      </h4>
                    </div>
                    <ul className={`space-y-2 text-xs font-mono font-light leading-relaxed ${theme === 'dark' ? 'text-text-sec' : 'text-alpine-950/80'}`}>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"></div>Capacitor SDK Bridge</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"></div>Native Device Android/iOS Integrations</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"></div>Bilingual UI Layout Engraving</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"></div>React 18 & Vite Ecosystem</li>
                    </ul>
                  </div>

                  {/* COLUMN 2 */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <SettingsIcon className="w-5 h-5 text-accent-gold shrink-0" />
                      <h4 className="text-xs font-black uppercase tracking-widest text-accent-gold">
                        {locale === 'en' ? "Data & Automation Architecture" : "데이터 및 자동화 아키텍처"}
                      </h4>
                    </div>
                    <ul className={`space-y-2 text-xs font-mono font-light leading-relaxed ${theme === 'dark' ? 'text-text-sec' : 'text-alpine-950/80'}`}>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"></div>Airtable Relational Clustering</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"></div>Make.com Automation Routers</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"></div>Fillout Dynamic Schema Mappings</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"></div>Secure Server-Side Webhook Controllers</li>
                    </ul>
                  </div>

                  {/* COLUMN 3 */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CreditCardIcon className="w-5 h-5 text-accent-gold shrink-0" />
                      <h4 className="text-xs font-black uppercase tracking-widest text-accent-gold">
                        {locale === 'en' ? "Monetization & Store Deployments" : "수익화 및 앱스토어 배포"}
                      </h4>
                    </div>
                    <ul className={`space-y-2 text-xs font-mono font-light leading-relaxed ${theme === 'dark' ? 'text-text-sec' : 'text-alpine-950/80'}`}>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"></div>RevenueCat Subscriptions Hub</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"></div>Google Play Developer Ecosystem</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"></div>App Store Connect Sandbox Suites</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"></div>Secure Server-to-Server Ingestion</li>
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
                      { id: 'all', label: t[locale].allSolutions, count: 5 },
                      { id: 'ai', label: t[locale].aiEngines, count: 3 },
                      { id: 'pipelines', label: t[locale].pipelines, count: 3 }
                    ].map(tab => {
                      const isActive = selectedCategory === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setSelectedCategory(tab.id as any)}
                          className={`px-5 py-2.5 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap shrink-0 ${
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

            {/* FILTERED PORTFOLIO DISPLAY */}
            {(() => {
              const activeProjects = locale === 'ko' ? PORTFOLIO_DATA.ko.projects : PORTFOLIO_DATA.en.projects;
              const filteredProjects = activeProjects.filter(project => {
                // Category filtering
                let categoryMatches = true;
                if (selectedCategory === 'all') categoryMatches = true;
                else if (selectedCategory === 'ai') {
                  categoryMatches = ['chekki', 'eduplanner', 'lead-enrichment'].includes(project.id);
                } else if (selectedCategory === 'pipelines') {
                  categoryMatches = ['benchmark-explorer', 'consultation-pipeline', 'lead-enrichment'].includes(project.id);
                }

                // Search query filtering
                if (searchQuery) {
                  const query = searchQuery.toLowerCase().trim();
                  const titleMatch = project.title.toLowerCase().includes(query);
                  const descMatch = project.description?.toLowerCase().includes(query) || project.longDescription?.toLowerCase().includes(query);
                  const tagMatch = project.tags?.some(t => t.toLowerCase().includes(query));
                  const featureMatch = project.features?.some(f => f.toLowerCase().includes(query));
                  const engineMatch = project.engineDetails?.toLowerCase().includes(query);
                  return categoryMatches && (titleMatch || descMatch || tagMatch || featureMatch || engineMatch);
                }

                return categoryMatches;
              });

              if (filteredProjects.length === 0) {
                return (
                  <div className={`text-center py-24 font-mono text-xs ${theme === 'dark' ? 'text-white/60' : 'text-alpine-950/60'}`}>
                    {t[locale].noProjects}
                  </div>
                );
              }

              if (portfolioLayout === 'grid') {
                return (
                  <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    <AnimatePresence mode="popLayout">
                      {filteredProjects.map((project, idx) => (
                        <motion.div
                          key={project.id}
                          layout
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={shouldReduceMotion ? { duration: 0 } : { 
                            duration: 0.35, 
                            ease: "easeOut",
                            delay: Math.min(idx * 0.04, 0.2)
                          }}
                        >
                          <CompactProjectCard 
                            project={project} 
                            index={activeProjects.findIndex(p => p.id === project.id)} 
                            theme={theme} 
                            locale={locale}
                            onOpenCaseStudy={setActiveCaseStudyId} 
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                );
              }

              return (
                <motion.div 
                  layout
                  className="space-y-12 md:space-y-16"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, idx) => (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={shouldReduceMotion ? { duration: 0 } : { 
                          duration: 0.45, 
                          ease: "easeOut",
                          delay: Math.min(idx * 0.08, 0.4)
                        }}
                      >
                        <ProjectCard 
                          project={project} 
                          index={activeProjects.findIndex(p => p.id === project.id)} 
                          theme={theme} 
                          locale={locale}
                          onOpenCaseStudy={setActiveCaseStudyId} 
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              );
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

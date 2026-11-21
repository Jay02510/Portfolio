import React, { useEffect, useRef, useState } from 'react';
import { XIcon, SearchIcon, ChevronDownIcon, FileTextIcon } from './components/Icons.tsx';
import { CaseStudyType } from './types.ts';
import { studyDataEn, studyDataKo } from './components/caseStudyData.ts';

interface CaseStudyViewerProps {
  projectId: string;
  onClose: () => void;
  theme?: 'light' | 'dark';
  locale?: 'en' | 'ko';
  backgroundScrollY?: number;
  // false when the page loaded directly on this case study's URL: it is already
  // in the pre-rendered HTML, so fading it in would flash the homepage first.
  animateIn?: boolean;
  // Order of case studies for next/previous links, and how to open one in place.
  caseIds?: string[];
  onOpenCase?: (id: string) => void;
}

const uiTranslation = {
  en: {
    backToPortfolio: "← Back",
    launchLive: "Live app ↗",
    architecturalStudy: "Case study",
    technicalBreakdown: "Technical details ↓",
    launchLiveApp: "Open the live app ↗",
    systemStack: "Stack",
    systemScopeOverview: "System Overview",
    systemScopeBody: "Designed to optimize workflows and reduce administrative friction. This architecture processes transactions securely without exposing keys or credentials.",
    theProblem: "Problem",
    theSolution: "What I built",
    technicalPipelineMap: "Architecture",
    pipelineExecutionLifecycle: "Execution Lifecycle",
    pipelineEdgeCaseGuardrails: "Safeguards",
    edgeCasePrefix: "Safeguard",
    promptOrchestration: "Prompts and output format",
    structuredInstruction: "Prompt logic",
    runtimeEnforcedSchema: "JSON schema",
    formattingConsistency: "Formatting Guardrails",
    productImpactScale: "Impact & Operational Metrics",
    quantifiedValue: "Operational Value",
    enterpriseSecurity: "Security & Compliance",
    wantToSeeTitle: "Want the implementation details?",
    wantToSeeBody: "I'm happy to walk through the schema, the prompts or the deployment by email.",
    startCollaboration: "Email me",
    proofOfWorkTitle: "Screenshots",
    productionWalkthrough: "Walkthrough",
    productionWalkthroughBodyLive: "Interactive application workflow running directly across connected client-server endpoints and model APIs.",
    productionWalkthroughBodyBackground: "Integrated automated routines running background synchronizations and conditional database pipelines.",
    openLiveSandbox: "Open the sandbox",
    projectNotFound: "Project not found.",
    backBtn: "Back",
    productMindset: "[ Product & Design Focus ]",
    behindTheArchitecture: "Behind the Architecture",
    humanProblem: "The Focus Bottleneck",
    productVision: "Product Objective",
    coreRationale: "Engineering Choices",
    technicalHurdles: "What broke and how I fixed it",
    incident: "What happened",
    diagnosis: "Cause",
    resolution: "Fix",
    storeLink: "App Store / Google Play ↗",
    coreLoopTitle: "How it works",
    coreLoopSubtitle: "The product loop, step by step",
    decisionsTitle: "Product decisions",
    decisionsSubtitle: "What I chose, what I passed on, and the cost",
    decisionLabel: "Decision",
    alternativeLabel: "Alternative",
    whyLabel: "Why",
    tradeoffLabel: "Trade-off"
  },
  ko: {
    backToPortfolio: "← 돌아가기",
    launchLive: "라이브 앱 ↗",
    architecturalStudy: "케이스 스터디",
    technicalBreakdown: "기술 상세 ↓",
    launchLiveApp: "라이브 앱 열기 ↗",
    systemStack: "기술 스택",
    systemScopeOverview: "시스템 개요",
    systemScopeBody: "수작업 행정 피로를 소거하고 업무 생산성을 높이기 위한 구조적 설계 사례입니다. 모든 요청 처리와 저장 구조는 프라이버시 유지 및 보안 규정 준수를 우선 고려해 구축되었습니다.",
    theProblem: "문제",
    theSolution: "만든 것",
    technicalPipelineMap: "아키텍처",
    pipelineExecutionLifecycle: "파이프라인 실행 라이프사이클",
    pipelineEdgeCaseGuardrails: "안전장치",
    edgeCasePrefix: "안전장치",
    promptOrchestration: "프롬프트와 출력 형식",
    structuredInstruction: "프롬프트 구조",
    runtimeEnforcedSchema: "JSON 스키마",
    formattingConsistency: "응답 레이아웃 보장 규칙",
    productImpactScale: "실무 영향 및 성과",
    quantifiedValue: "업무 생산성 향상 지표",
    enterpriseSecurity: "보안 가이드라인 준수성",
    wantToSeeTitle: "구현 내용이 더 궁금하신가요?",
    wantToSeeBody: "스키마, 프롬프트, 배포 방식까지 메일로 자세히 설명드릴게요.",
    startCollaboration: "메일 보내기",
    proofOfWorkTitle: "스크린샷",
    productionWalkthrough: "시연 영상",
    productionWalkthroughBodyLive: "안전하게 라우팅된 실시간 인스턴스와 API 엔드포인트를 중심으로 정상 작동 메타데이터가 파이프라인 전반에 흐르고 있습니다.",
    productionWalkthroughBodyBackground: "수신 웹훅 연동, 실시간 데이터 정합성 보존 등 백그라운드 오토메이션 시퀀스를 무인 수행합니다.",
    openLiveSandbox: "샌드박스 열기",
    projectNotFound: "프로젝트를 찾을 수 없습니다.",
    backBtn: "돌아가기",
    productMindset: "[ 기획 및 설계 사유 ]",
    behindTheArchitecture: "Behind the Architecture",
    humanProblem: "업무 병목 현상 (Human Problem)",
    productVision: "기획적 목표 및 시점 (Product Vision)",
    coreRationale: "엔지니어링 의사결정 (Core Rationale)",
    technicalHurdles: "문제가 생겼을 때",
    incident: "무슨 일이 있었나",
    diagnosis: "원인",
    resolution: "해결",
    storeLink: "App Store / Google Play ↗",
    coreLoopTitle: "작동 방식",
    coreLoopSubtitle: "제품이 돌아가는 순서",
    decisionsTitle: "제품 의사결정",
    decisionsSubtitle: "무엇을 골랐고, 무엇을 포기했는지",
    decisionLabel: "결정",
    alternativeLabel: "검토한 대안",
    whyLabel: "이유",
    tradeoffLabel: "감수한 점"
  }
};

const SOLUTION_SHOWN = 5;
const isFileVideo = (u?: string) => !!u && /\.(mp4|webm)$/i.test(u.split('?')[0]);


export const CaseStudyViewer: React.FC<CaseStudyViewerProps> = React.memo(({
  projectId,
  onClose,
  theme = 'dark',
  locale = 'en',
  backgroundScrollY,
  animateIn = true,
  caseIds,
  onOpenCase
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isCoreLoopOpen, setIsCoreLoopOpen] = useState(false);
  const [isDecisionsOpen, setIsDecisionsOpen] = useState(false);
  const [isHurdlesOpen, setIsHurdlesOpen] = useState(false);
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState(0);
  // A self-hosted loop is the quickest read of the product, so it opens first; screenshots stay one tab away.
  const [proofOfWorkTab, setProofOfWorkTab] = useState<'screenshots' | 'video'>(() =>
    isFileVideo((locale === 'ko' ? studyDataKo : studyDataEn)[projectId]?.walkthroughVideo) ? 'video' : 'screenshots'
  );
  const [lightboxImage, setLightboxImage] = useState<{ url: string; label: string } | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [isEntered, setIsEntered] = useState(!animateIn);
  const [isClosing, setIsClosing] = useState(false);
  // Once the case study fully covers the page, hide the page under it (paint and screen readers)
  useEffect(() => {
    document.body.classList.toggle('case-open', isEntered && !isClosing);
    return () => document.body.classList.remove('case-open');
  }, [isEntered, isClosing]);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Case study open/close is the site's core interaction (card -> full technical depth);
  // it earns an authored transition instead of the instant hard cut a plain conditional render gives it.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, prefersReducedMotion ? 0 : 200);
  };

  // Reset video player state when changing tab or project
  useEffect(() => {
  }, [projectId, proofOfWorkTab]);

  useEffect(() => {
    setActiveScreenshotIdx(0);
  }, [projectId]);

  // Focus trap implementation for enhanced accessibility (WCAG 2.1.2)
  useEffect(() => {
    const handleFocusTrap = (e: KeyboardEvent) => {
      if (!scrollRef.current) return;
      if (e.key === 'Tab') {
        const focusableElements = scrollRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!firstElement || !lastElement) return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleFocusTrap);
    return () => {
      document.removeEventListener('keydown', handleFocusTrap);
    };
  }, []);

  // Move focus into the modal on open, restore it to the trigger on close (WCAG 2.4.3)
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    scrollRef.current?.focus();
    return () => {
      previouslyFocused?.focus?.();
    };
  }, []);

  // Escape closes the lightbox if it's open, otherwise closes the whole modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      if (lightboxImage) {
        setLightboxImage(null);
      } else {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [lightboxImage]);

  // 1. Manage body scroll lock and restore precisely on mount/unmount
  useEffect(() => {
    // Record current scroll position once on mount
    const prevScrollY = window.scrollY;

    // Prevent background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow || 'unset';
      // Restore background scroll position precisely on unmount
      window.scrollTo(0, prevScrollY);
    };
  }, []); // Run strictly once on mount and once on unmount

  // 2. Manage content transitions and states when project selection changes
  useEffect(() => {
    // Scroll the modal container viewport to the top
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }

    // Every section starts folded on a new case study
    setIsCoreLoopOpen(false);
    setIsDecisionsOpen(false);
    setIsHurdlesOpen(false);
    setIsBreakdownOpen(false);
    setActiveScreenshotIdx(0);

    const studyData = locale === 'ko' ? studyDataKo : studyDataEn;
    const project = studyData[projectId];
    if (project && (!project.screenshots || project.screenshots.length === 0 || isFileVideo(project.walkthroughVideo))) {
      setProofOfWorkTab('video');
    } else {
      setProofOfWorkTab('screenshots');
    }
  }, [projectId, locale]);

  const scrollToBreakdown = () => {
    setIsBreakdownOpen(true);
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
  };

  const studyData = locale === 'ko' ? studyDataKo : studyDataEn;
  const projectData = studyData[projectId];
  const t = uiTranslation[locale];

  if (!projectData) {
    return (
      <div className="fixed inset-0 z-[200] bg-alpine-950 text-white flex items-center justify-center">
        <p>{t.projectNotFound}</p>
        <button onClick={onClose} className="ml-4 underline">{t.backBtn}</button>
      </div>
    );
  }

  const hasLiveApp = projectData.liveUrl && projectData.liveUrl !== "https://jason-portfolio.com/";

  return (
    <div
      ref={scrollRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      tabIndex={-1}
      className={`outline-none fixed inset-0 z-[200] overflow-y-auto overflow-x-hidden w-full min-w-0 transition-colors duration-300 bg-canvas text-ink ${
        prefersReducedMotion
          ? (isEntered && !isClosing ? 'opacity-100' : 'opacity-0') + ' transition-opacity duration-150'
          : (isEntered && !isClosing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3') +
            ' transition-[opacity,transform] ease-[cubic-bezier(0.16,1,0.3,1)] ' +
            (isClosing ? 'duration-200' : 'duration-300')
      }`}
    >
      {/* HEADER BAR */}
      <div className={`sticky top-0 z-[210] flex items-center justify-between px-3.5 sm:px-6 py-3 sm:py-4 border-b backdrop-blur-xl bg-canvas/90 border-ink/10`}>
        <button
          onClick={handleClose}
          className={`flex items-center gap-1.5 sm:gap-2 text-[13px] font-medium transition-colors active:scale-95 whitespace-nowrap shrink-0 text-ink-3 hover:text-ink`}
        >
          {t.backToPortfolio}
        </button>
        {caseIds && onOpenCase && caseIds.includes(projectId) && (() => {
          const i = caseIds.indexOf(projectId), n = caseIds.length;
          const go = (d: number) => onOpenCase(caseIds[(i + d + n) % n]);
          const btn = `w-8 h-8 rounded-full inline-flex items-center justify-center transition-colors hover:bg-ink/10 text-ink/70`;
          return (
            <nav aria-label={locale === 'ko' ? '케이스 스터디 이동' : 'Case study pages'} className="flex items-center gap-1 text-xs font-mono">
              <button onClick={() => go(-1)} aria-label={locale === 'ko' ? '이전 케이스 스터디' : 'Previous case study'} className={btn}>←</button>
              <span className="text-ink-3">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
              <button onClick={() => go(1)} aria-label={locale === 'ko' ? '다음 케이스 스터디' : 'Next case study'} className={btn}>→</button>
            </nav>
          );
        })()}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 shrink-0">
          {hasLiveApp && (
            <a 
              href={projectData.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-full border border-accent-gold/30 text-xs font-semibold text-accent-gold transition-[background-color,transform] active:scale-95 hover:bg-accent-gold/10 whitespace-nowrap"
            >
              {projectData.liveLabel ?? t.launchLive}
            </a>
          )}
          {projectData.contactUrl && (
            <a 
              href={projectData.contactUrl} 
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-full border border-accent-gold/30 text-xs font-semibold text-accent-gold transition-[background-color,transform] active:scale-95 hover:bg-accent-gold/10 whitespace-nowrap"
            >
              {locale === 'en' ? "Ask to try it ↗" : "체험 문의 ↗"}
            </a>
          )}
          {projectData.storeUrl && (
            <a 
              href={projectData.storeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-full border border-accent-gold/30 text-xs font-semibold text-accent-gold transition-[background-color,transform] active:scale-95 hover:bg-accent-gold/10 whitespace-nowrap"
            >
              {t.storeLink}
            </a>
          )}
          <button
            onClick={handleClose}
            aria-label={locale === 'ko' ? "케이스 스터디 닫기" : "Close case study"}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors active:scale-95 shrink-0 bg-ink/5 hover:bg-ink/10 text-ink`}
          >
            <XIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-6 md:px-12 py-10 md:py-16 space-y-14 md:space-y-16">
        {/* HERO TITLE BLOCK */}
        <div className="space-y-6 md:space-y-10">
          <div className="flex items-center gap-2 text-[11px] md:text-[12px] font-bold tracking-[0.2em] uppercase text-accent-gold">
            {t.architecturalStudy}
          </div>
          <h1 id="case-study-title" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-[18ch] tracking-[-0.01em] leading-[1.04] font-serif text-balance">
            {projectData.title}
          </h1>
          <p className={`text-base md:text-2xl max-w-4xl font-normal leading-relaxed text-pretty text-ink-3`}>
            {projectData.tagline}
          </p>

          {projectData.meta && (
            <dl className="flex flex-wrap gap-x-10 gap-y-4 pt-2 border-t pt-6 max-w-4xl border-ink/10">
              {([
                [locale === 'ko' ? '역할' : 'Role', projectData.meta.role],
                [locale === 'ko' ? '팀' : 'Team', projectData.meta.team],
                [locale === 'ko' ? '기간' : 'Dates', projectData.meta.dates],
                [locale === 'ko' ? '상태' : 'Status', projectData.meta.status],
              ] as const).filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="space-y-1">
                  <dt className="text-[11px] font-bold uppercase tracking-widest text-ink-3">{k}</dt>
                  <dd className="text-sm md:text-base font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          )}

          {/* DUAL BUTTON SPLIT CTA */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 pt-4 w-full">
            <button 
              onClick={scrollToBreakdown}
              className="w-full sm:w-auto whitespace-nowrap py-3 px-6 rounded-full bg-accent-fill text-[#14171d] text-[13px] font-bold text-center hover:brightness-105 active:scale-95 transition-[filter,transform]"
            >
              <span className="leading-snug text-center">{t.technicalBreakdown}</span>
            </button>
            {hasLiveApp && (
              <a 
                href={projectData.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto py-3 px-5 rounded-full border flex items-center justify-center gap-2 sm:gap-3 font-semibold text-[13px] transition-[background-color] active:scale-95 text-center border-ink/20 hover:bg-ink/5 text-ink`}
              >
                <span className="whitespace-nowrap leading-snug">{projectData.liveLabel ?? t.launchLiveApp}</span>
              </a>
            )}
            {projectData.contactUrl && (
              <a 
                href={projectData.contactUrl}
                className={`w-full sm:w-auto py-3 px-5 rounded-full border flex items-center justify-center gap-2 sm:gap-2.5 font-semibold text-[13px] transition-[background-color] active:scale-95 text-center ${
                  theme === 'dark'
                    ? 'border-accent-gold/50 bg-accent-gold/10 hover:bg-accent-gold/20 text-accent-gold'
                    : 'border-accent-gold/60 bg-accent-gold/10 hover:bg-accent-gold/20 text-accent-gold'
                }`}
              >
                <span className="text-xs">✉</span>
                <span className="whitespace-nowrap leading-snug">{locale === 'en' ? "Ask to try it" : "체험 문의"}</span>
              </a>
            )}
            {projectData.storeUrl && (
              <a 
                href={projectData.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto py-3 px-5 rounded-full border flex items-center justify-center gap-2 sm:gap-3 font-semibold text-[13px] transition-[background-color] active:scale-95 text-center ${
                  theme === 'dark'
                    ? 'border-accent-gold/30 hover:bg-accent-gold/5 text-accent-gold'
                    : 'border-accent-gold/40 hover:bg-accent-gold/10 text-accent-gold'
                }`}
              >
                <span className="whitespace-nowrap leading-snug">{t.storeLink}</span>
              </a>
            )}
          </div>
        </div>

        {/* METRICS GRID */}
        <div className={`grid grid-cols-1 gap-6 border-y py-12 ${projectData.stats.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'} border-ink/10`}>
          {projectData.stats.map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <div className={`font-serif leading-none text-accent-gold tabular-nums ${/^[~<≤]?\d/.test(stat.value) ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'}`}>
                {stat.value}
              </div>
              <div className={`text-[11px] font-bold uppercase tracking-widest text-ink-3`}>
                {stat.label}
              </div>
              {stat.detail && (
                <p className="text-xs leading-relaxed text-ink-3">
                  {stat.detail}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* EVAL RESULTS: one bar per run, full 0-100% scale so near-perfect reads as near-full, not inflated */}
        {projectData.evals && (
          <figure className={`rounded-2xl border p-6 md:p-8 space-y-6 bg-ink/[0.02] border-ink/10`}>
            <figcaption className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-widest text-accent-gold">{projectData.evals.title}</div>
              <p className="text-sm leading-relaxed max-w-[58ch] text-ink/70">
                {projectData.evals.note}
              </p>
            </figcaption>
            <div className="grid md:grid-cols-2 gap-8">
              {projectData.evals.sets.map((set) => (
                <div key={set.name} className="space-y-3">
                  <div className="text-xs font-bold text-ink/80">{set.name}</div>
                  <ul className="space-y-2.5">
                    {set.runs.map((r, i) => {
                      const pct = Math.round((r.caught / r.mistakes) * 100);
                      return (
                        <li key={i} className="grid grid-cols-[3.5rem_1fr] items-end gap-3 text-xs">
                          <span className="font-mono text-ink-3">
                            {locale === 'ko' ? `${i + 1}회` : `Run ${i + 1}`}
                          </span>
                          <div className="space-y-1">
                            <div className="h-2 rounded bg-ink/10">
                              <div className="h-2 rounded bg-accent-fill" style={{ width: `${pct}%` }} />
                            </div>
                            <div className="font-mono flex flex-wrap gap-x-3 text-ink/70">
                              <span>{locale === 'ko' ? `오답 ${r.caught}/${r.mistakes} 검출 (${pct}%)` : `${r.caught}/${r.mistakes} caught (${pct}%)`}</span>
                              <span>{locale === 'ko' ? `정답 ${r.wrong}/${r.right} 오답 처리` : `${r.wrong}/${r.right} right marked wrong`}</span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </figure>
        )}

        {/* PROOF OF WORK / VIDEO SECTION */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink/10 pb-4">
            <h2 className="font-serif text-2xl md:text-3xl tracking-tight">
              {t.proofOfWorkTitle}
            </h2>

            {/* Sub-tab switcher to toggle between Interactive Screenshots and Walkthrough Video */}
            {projectData.screenshots && projectData.screenshots.length > 0 && projectData.walkthroughVideo && (
              <div className="flex rounded-xl p-1 border border-ink/10 bg-ink/[0.04] text-[11px] font-bold uppercase tracking-wider overflow-hidden max-w-full self-start sm:self-auto shadow-2xl">
                <button
                  type="button"
                  onClick={() => setProofOfWorkTab('screenshots')}
                  className={`px-4 py-2 rounded-lg transition-[background-color,color,box-shadow] active:scale-95 flex items-center gap-2 ${
                    proofOfWorkTab === 'screenshots'
                      ? 'bg-accent-fill text-black shadow-md'
                      : 'text-ink-3 hover:text-ink hover:bg-ink/5'
                  }`}
                >
                  <span>{locale === 'en' ? "Screenshots" : "스크린샷"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setProofOfWorkTab('video')}
                  className={`px-4 py-2 rounded-lg transition-[background-color,color,box-shadow] active:scale-95 flex items-center gap-2 ${
                    proofOfWorkTab === 'video'
                      ? 'bg-accent-fill text-black shadow-md'
                      : 'text-ink-3 hover:text-ink hover:bg-ink/5'
                  }`}
                >
                  <span>{locale === 'en' ? "Walkthrough Video" : "데모영상 시연"}</span>
                </button>
              </div>
            )}
          </div>

          {proofOfWorkTab === 'screenshots' && projectData.screenshots && projectData.screenshots.length > 0 ? (
            <div className="space-y-4">
              {/* Preload container to cache all project screenshots for instant slide transitions */}
              <div className="absolute top-0 left-0 w-1 h-1 opacity-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
                {projectData.screenshots.map((scr, idx) => (
                  <img key={idx} src={scr.url} alt="" referrerPolicy="no-referrer" />
                ))}
              </div>

              {/* Image Frame with Navigation */}
              <div className={`rounded-2xl border overflow-hidden aspect-video relative flex items-center justify-center bg-black/85 group border-ink/10`}>
                {/* Floating Index Tag */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono uppercase font-semibold text-accent-fill tracking-widest flex items-center gap-1.5 shadow-lg select-none">
                  {String(activeScreenshotIdx + 1).padStart(2, '0')} / {String(projectData.screenshots.length).padStart(2, '0')} • {projectData.screenshots[activeScreenshotIdx].label}
                </div>

                {/* Main Image Slider Viewport */}
                <button 
                  type="button"
                  onClick={() => setLightboxImage({ url: projectData.screenshots![activeScreenshotIdx].url, label: projectData.screenshots![activeScreenshotIdx].label })}
                  className="w-full h-full relative flex items-center justify-center select-none overflow-hidden p-2 cursor-zoom-in active:scale-95 transition-transform group/img focus:outline-none"
                  aria-label={locale === 'ko' ? "현재 이미지 전체 화면으로 보기" : "View current image in full screen"}
                >
                  {imageErrors[projectData.screenshots[activeScreenshotIdx].url] ? (
                    <div className="flex flex-col items-center justify-center p-8 text-center select-none max-w-sm animate-in fade-in duration-300">
                      <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center mb-4 text-accent-fill">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-[11px] font-bold tracking-[0.15em] text-white uppercase font-mono block">
                        {locale === 'en' ? "Interactive Slide Preview" : "데모 슬라이드"}
                      </span>
                      <span className="mt-2 text-[11px] text-white/50 block font-sans leading-relaxed max-w-[280px]">
                        {locale === 'en' 
                          ? "We are rendering the slider. Click 'Expand View' below to zoom, or open the direct gateway link under the section headers." 
                          : "데모 슬라이드가 안전하게 구성되었습니다. 원격 보안 등으로 이미지가 가려진 경우 우측 하단의 돋보기 버튼을 통해 확대 감상해 주세요."}
                      </span>
                    </div>
                  ) : (
                    <img 
                      src={projectData.screenshots[activeScreenshotIdx].url} 
                      alt={projectData.screenshots[activeScreenshotIdx].label}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain max-h-full transition-transform duration-700 ease-out group-hover/img:scale-[1.02]"
                      onError={() => {
                        const activeUrl = projectData.screenshots![activeScreenshotIdx].url;
                        setImageErrors(prev => ({ ...prev, [activeUrl]: true }));
                      }}
                    />
                  )}
                  
                  {/* Zoom Badge Indicator */}
                  <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono uppercase font-semibold text-white/80 tracking-widest flex items-center gap-1.5 shadow-lg opacity-0 md:group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none select-none">
                    <span>{locale === 'en' ? "Expand View" : "전체화면"}</span>
                  </div>
                  
                  {/* Mobile always-visible scale expand button icon */}
                  <div className="md:hidden absolute bottom-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/90 shadow-lg" aria-hidden="true">
                    <SearchIcon className="w-3.5 h-3.5" />
                  </div>
                </button>

                {/* Left Arrow Button */}
                <button
                  onClick={() => setActiveScreenshotIdx(prev => (prev === 0 ? projectData.screenshots!.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-[background-color,color,transform] scale-95 hover:scale-105 active:scale-95 shadow-md focus:outline-none"
                  aria-label="Previous Slide"
                >
                  <span className="text-xl leading-none">‹</span>
                </button>

                {/* Right Arrow Button */}
                <button
                  onClick={() => setActiveScreenshotIdx(prev => (prev === projectData.screenshots!.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-[background-color,color,transform] scale-95 hover:scale-105 active:scale-95 shadow-md focus:outline-none"
                  aria-label="Next Slide"
                >
                  <span className="text-xl leading-none">›</span>
                </button>
              </div>

              {/* Bottom Interactive Thumbnail / Tab Track */}
              <div className={`grid gap-2.5 pt-1 ${
                projectData.screenshots.length > 4 
                   ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' 
                   : 'grid-cols-1 sm:grid-cols-3'
              }`}>
                {projectData.screenshots.map((scr, sIdx) => {
                  const isActive = activeScreenshotIdx === sIdx;
                  return (
                    <button
                      key={sIdx}
                      onClick={() => setActiveScreenshotIdx(sIdx)}
                      className={`text-left p-3 rounded-xl border transition-[background-color,border-color,box-shadow] active:scale-95 duration-300 flex items-start gap-3 relative overflow-hidden ${
                        isActive
                          ? 'border-accent-gold bg-accent-gold/5 shadow-[0_0_15px_rgba(230,175,46,0.08)]'
                          : 'border-ink/5 bg-ink/[0.01] hover:bg-ink/[0.04]'
                      }`}
                    >
                      {/* Left accent color indicator bar for active slide */}
                      <div className={`absolute top-0 bottom-0 left-0 w-1 transition-[background-color] ${isActive ? 'bg-accent-fill' : 'bg-transparent'}`}></div>
                      <div className={`font-mono text-[11px] uppercase font-bold tracking-widest shrink-0 ${isActive ? 'text-accent-gold' : 'text-ink-3'}`}>
                        {String(sIdx + 1).padStart(2, '0')}
                      </div>
                      <div className="space-y-0.5">
                        <div className={`text-[11px] font-bold tracking-tight line-clamp-1 leading-snug ${isActive ? 'text-accent-gold' : 'text-ink/80'}`}>
                          {scr.label}
                        </div>
                        <div className="text-[11px] font-normal font-mono line-clamp-1 text-ink-3">
                          {scr.subLabel || (sIdx === 0 ? (locale === 'en' ? "Primary View" : "기본 대시보드") : sIdx === 1 ? (locale === 'en' ? "Data Processing" : "수집 분석 지표") : (locale === 'en' ? "Email Synthesizer" : "이메일 템플레이트"))}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* PDF AVAILABILITY NOTICE FOR BENCHMARK EXPLORER */}
              {projectId === 'benchmark-explorer' && (
                <div className={`p-5 rounded-xl border flex items-center gap-4 animate-in fade-in duration-500 ${
                  theme === 'dark' 
                    ? 'bg-accent-gold/5 border-accent-gold/20 text-white/95' 
                    : 'bg-accent-gold/10 border-accent-gold/30 text-alpine-950/95'
                }`}>
                  <div className="w-10 h-10 rounded-xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center shrink-0">
                    <FileTextIcon className="w-5 h-5 text-accent-gold" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider font-mono text-accent-gold">
                      {locale === 'en' ? "DOCUMENTATION REFERENCE" : "첨부 문서 자료 안내"}
                    </div>
                    <p className="text-xs leading-relaxed max-w-prose text-pretty opacity-85">
                      {locale === 'en' 
                        ? "Please note: Complete Baseline, Midline, and Endline Benchmark test templates are fully cataloged, formatted, and available as professional PDF documents upon request." 
                        : "안내 사항: Baseline, Midline 및 Endline 실전 벤치마크 평가 테스트 양식 및 시험 자료 목록은 인쇄용 PDF 형식 문서로 완전히 준비되어 있으며 즉시 제공 가능합니다."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={`rounded-2xl border overflow-hidden aspect-video relative flex flex-col items-center justify-center bg-black/40 border-ink/10`}>
              {projectData.walkthroughVideo && (
                <video
                  src={projectData.walkthroughVideo}
                  poster={projectData.walkthroughPoster}
                  controls
                  autoPlay={!prefersReducedMotion}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  // React omits `muted` from server HTML, so the browser blocks the autoplay; start it once mounted.
                  ref={(el) => { if (el && !prefersReducedMotion) { el.muted = true; el.play().catch(() => {}); } }}
                  aria-label={projectData.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}

        </div>

        <div className="space-y-3">
        {/* CONNECTED CORE LOOP (THE PRODUCT ENGINE) */}
        {projectData.coreLoop && projectData.coreLoop.length > 0 && (
          <div className={`rounded-2xl border transition-[background-color,border-color,box-shadow] duration-300 lg:mx-0 bg-card border-ink/10 shadow-sm relative overflow-hidden`}>
            <button
              onClick={() => setIsCoreLoopOpen(!isCoreLoopOpen)}
              aria-expanded={isCoreLoopOpen}
              aria-controls="core-loop-panel"
              className="w-full text-left px-5 py-5 md:px-8 md:py-6 flex items-center justify-between gap-6 focus:outline-none hover:bg-white/[0.01]/10 active:bg-white/[0.02]/20 transition-[background-color] relative z-10"
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <h2 className="mt-1 font-serif text-2xl md:text-3xl tracking-tight text-ink">{t.coreLoopTitle}</h2>
                </div>
              </div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border transition-[background-color,border-color,transform] duration-300 shrink-0 ${
                isCoreLoopOpen 
                  ? 'rotate-180 bg-accent-gold/15 border-accent-gold/30' 
                  : ('border-ink/10 hover:border-ink/20')
              }`}>
                <ChevronDownIcon className={`w-3.5 h-3.5 ${isCoreLoopOpen ? 'text-accent-gold' : 'text-ink-3'}`} />
              </div>
            </button>

            {isCoreLoopOpen && (
              <div id="core-loop-panel" className="p-6 md:p-10 pt-0 border-t border-ink/10 animate-in fade-in slide-in-from-top-2 duration-300 relative z-10 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {projectData.coreLoop.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-[background-color,border-color] ${
                        theme === 'dark'
                          ? 'bg-black/30 border-white/5 hover:border-accent-gold/30 hover:bg-white/[0.02]'
                          : 'bg-white border-black/5 shadow-sm hover:border-accent-gold/40'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[11px] font-bold text-accent-gold uppercase tracking-wider">
                            {item.step}
                          </span>
                          {item.role && (
                            <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-semibold uppercase tracking-wider bg-ink/5 text-ink/70`}>
                              {item.role}
                            </span>
                          )}
                        </div>
                        <p className={`text-xs leading-relaxed font-normal text-ink/70`}>
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PRODUCT DECISIONS & TRADEOFFS (ADR LOG) */}
        {projectData.decisions && projectData.decisions.length > 0 && (
          <div className={`rounded-2xl border transition-[background-color,border-color,box-shadow] duration-300 lg:mx-0 bg-card border-ink/10 shadow-sm relative overflow-hidden`}>
            <button
              onClick={() => setIsDecisionsOpen(!isDecisionsOpen)}
              aria-expanded={isDecisionsOpen}
              aria-controls="decisions-panel"
              className="w-full text-left px-5 py-5 md:px-8 md:py-6 flex items-center justify-between gap-6 focus:outline-none hover:bg-white/[0.01]/10 active:bg-white/[0.02]/20 transition-[background-color] relative z-10"
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <h2 className="mt-1 font-serif text-2xl md:text-3xl tracking-tight text-ink">{t.decisionsTitle}</h2>
                </div>
              </div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border transition-[background-color,border-color,transform] duration-300 shrink-0 ${
                isDecisionsOpen 
                  ? 'rotate-180 bg-accent-gold/15 border-accent-gold/30' 
                  : ('border-ink/10 hover:border-ink/20')
              }`}>
                <ChevronDownIcon className={`w-3.5 h-3.5 ${isDecisionsOpen ? 'text-accent-gold' : 'text-ink-3'}`} />
              </div>
            </button>

            {isDecisionsOpen && (
              <div id="decisions-panel" className="p-6 md:p-10 pt-0 border-t border-ink/10 animate-in fade-in slide-in-from-top-2 duration-300 relative z-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projectData.decisions.map((dec, idx) => (
                    <div 
                      key={idx} 
                      className={`p-5 rounded-xl border flex flex-col justify-between space-y-4 transition-[background-color,border-color] ${
                        theme === 'dark'
                          ? 'bg-black/40 border-white/5 hover:border-accent-gold/30 hover:bg-white/[0.02]'
                          : 'bg-white border-black/5 shadow-sm hover:border-accent-gold/40'
                      }`}
                    >
                      {/* Decision Header */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] font-bold text-accent-gold">ADR 0{idx + 1}</span>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-accent-gold">• {t.decisionLabel}</span>
                        </div>
                        <h3 className={`text-xs md:text-sm font-semibold leading-snug text-ink`}>
                          {dec.decision}
                        </h3>
                      </div>

                      {/* Alternative Considered */}
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-ink-3">
                          <span>↪</span>
                          <span>{t.alternativeLabel}</span>
                        </div>
                        <p className={`leading-relaxed font-normal text-ink-3`}>
                          {dec.alternativeConsidered}
                        </p>
                      </div>

                      {/* Why & Tradeoff Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-ink/10">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-green-400">
                            <span>✓</span>
                            <span>{t.whyLabel}</span>
                          </div>
                          <p className={`text-[11px] leading-relaxed font-normal text-ink/70`}>
                            {dec.why}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-orange-400">
                            <span>{t.tradeoffLabel}</span>
                          </div>
                          <p className={`text-[11px] leading-relaxed font-normal text-ink/70`}>
                            {dec.tradeOffAccepted}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TECHNICAL HURDLES / WHEN THINGS BREAK */}
        {projectData.technicalHurdles && (
          <div className={`rounded-2xl border transition-[background-color,border-color,box-shadow] duration-300 lg:mx-0 bg-card border-ink/10 shadow-sm relative overflow-hidden`}>
            <button
              onClick={() => setIsHurdlesOpen(!isHurdlesOpen)}
              aria-expanded={isHurdlesOpen}
              aria-controls="hurdles-panel"
              className="w-full text-left px-5 py-5 md:px-8 md:py-6 flex items-center justify-between gap-6 focus:outline-none hover:bg-white/[0.01]/10 active:bg-white/[0.02]/20 transition-[background-color] relative z-10"
            >
              <div className="flex items-center justify-between gap-4 w-full flex-wrap pr-4">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <h2 className="mt-1 font-serif text-2xl md:text-3xl tracking-tight text-ink">{t.technicalHurdles}</h2>
                  </div>
                </div>
                <div className="hidden sm:block bg-accent-gold/10 text-accent-gold border border-accent-gold/25 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                  {locale === 'en' ? "Production fixes" : "실서비스 수정"}
                </div>
              </div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border transition-[background-color,border-color,transform] duration-300 shrink-0 ${
                isHurdlesOpen 
                  ? 'rotate-180 bg-accent-gold/15 border-accent-gold/30' 
                  : ('border-ink/10 hover:border-ink/20')
              }`}>
                <ChevronDownIcon className={`w-3.5 h-3.5 ${isHurdlesOpen ? 'text-red-500' : 'text-ink-3'}`} />
              </div>
            </button>
            
            {isHurdlesOpen && (() => {
              const hurdlesList = Array.isArray(projectData.technicalHurdles)
                ? projectData.technicalHurdles
                : [projectData.technicalHurdles];
              
              return (
                <div id="hurdles-panel" className="border-t border-ink/10 divide-y divide-ink/10 relative z-10 animate-in fade-in slide-in-from-top-2 duration-300">
                  {hurdlesList.map((hurdle, hIdx) => (
                    <div key={hIdx} className={`${hIdx > 0 ? 'pt-8 md:pt-12' : ''} p-6 md:p-10 pb-8 md:pb-12 space-y-6`}>
                      {hurdle.title && (
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-500 font-mono">
                            {hurdle.title}
                          </span>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {/* THE INCIDENT */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center text-xs text-red-500 font-bold">×</div>
                            <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#E15A5A]">{t.incident}</h3>
                          </div>
                          <p className={`text-xs md:text-sm leading-relaxed max-w-prose text-pretty break-words whitespace-normal w-full min-w-0 font-normal text-ink-3`}>
                            {hurdle.incident}
                          </p>
                        </div>

                        {/* THE DIAGNOSIS */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500"><SearchIcon className="w-3 h-3" /></div>
                            <h3 className="text-[11px] font-bold uppercase tracking-widest text-orange-500">{t.diagnosis}</h3>
                          </div>
                          <p className={`text-xs md:text-sm leading-relaxed max-w-prose text-pretty break-words whitespace-normal w-full min-w-0 font-normal text-ink-3`}>
                            {hurdle.diagnosis}
                          </p>
                        </div>

                        {/* THE RESOLUTION */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-xs text-green-500 font-bold">✓</div>
                            <h3 className="text-[11px] font-bold uppercase tracking-widest text-green-500">{t.resolution}</h3>
                          </div>
                          <p className={`text-xs md:text-sm leading-relaxed max-w-prose text-pretty break-words whitespace-normal w-full min-w-0 font-normal text-ink-3`}>
                            {hurdle.resolution}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}

        {/* THE CORE CONTENT BREAKDOWN */}
        <div ref={contentRef}>
          <div className={`rounded-2xl border bg-card border-ink/10 shadow-sm`}>
            <button
              onClick={() => setIsBreakdownOpen(!isBreakdownOpen)}
              aria-expanded={isBreakdownOpen}
              aria-controls="breakdown-panel"
              className="w-full text-left px-5 py-5 md:px-8 md:py-6 flex items-center justify-between gap-6 focus:outline-none hover:bg-white/[0.01]/10 active:bg-white/[0.02]/20 transition-[background-color] relative z-10"
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col min-w-0 w-full">
                  <h2 className="mt-1 font-serif text-2xl md:text-3xl tracking-tight whitespace-normal break-words text-pretty text-ink">{t.technicalBreakdown.replace(' ↓', '')}</h2>
                </div>
              </div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border transition-[background-color,border-color,transform] duration-300 shrink-0 ${
                isBreakdownOpen 
                  ? 'rotate-180 bg-accent-gold/15 border-accent-gold/30' 
                  : ('border-ink/10 hover:border-ink/20')
              }`}>
                <ChevronDownIcon className={`w-3.5 h-3.5 ${isBreakdownOpen ? 'text-accent-gold' : 'text-ink-3'}`} />
              </div>
            </button>

            {/* Always rendered (hidden when collapsed) so the full case study is in the prerendered HTML for search and AI crawlers. */}
            {(
              <div id="breakdown-panel" className={`${isBreakdownOpen ? 'grid' : 'hidden'} p-4 sm:p-6 md:p-10 pt-0 grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 border-t border-ink/10 animate-in fade-in slide-in-from-top-2 duration-300 relative z-10 w-full min-w-0 overflow-hidden`}>
                {/* LEFT RAIL - THE STACK / INFO */}
                <div className="lg:col-span-4 space-y-10 lg:sticky lg:top-24 h-fit w-full min-w-0">
                  <div className="space-y-4">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-accent-gold">{t.systemStack}</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {projectData.stack.map(st => (
                        <span key={st} className={`text-[11px] font-mono px-2 py-0.5 rounded border border-ink/10 text-ink-2`}>{st}</span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* RIGHT RAIL - DETAILED ANALYSIS */}
                <div className="lg:col-span-8 space-y-20 w-full min-w-0">
                  {/* PROBLEM / SOLUTION */}
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-serif tracking-tight">{t.theProblem}</h3>
                      <ul className="space-y-4">
                        {projectData.problem.map((prob, pidx) => (
                          <li key={pidx} className="flex gap-4 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                            <p className={`text-xs md:text-sm leading-relaxed max-w-prose text-pretty break-words whitespace-normal w-full min-w-0 text-ink/70`}>
                              {prob}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-serif tracking-tight">{t.theSolution}</h3>
                      {[projectData.solution.slice(0, SOLUTION_SHOWN), projectData.solution.slice(SOLUTION_SHOWN)].map((items, part) => {
                        if (items.length === 0) return null;
                        const list = (
                          <ul className={`space-y-4 ${part ? 'mt-4' : ''}`}>
                            {items.map((sol, sidx) => (
                              <li key={sidx} className="flex gap-4 items-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                                <p className={`text-xs md:text-sm leading-relaxed max-w-prose text-pretty break-words whitespace-normal w-full min-w-0 text-ink/70`}>
                                  {sol}
                                </p>
                              </li>
                            ))}
                          </ul>
                        );
                        // Lead with the few that matter; the rest sits behind a native disclosure.
                        return part === 0 ? <React.Fragment key={part}>{list}</React.Fragment> : (
                          <details key={part} className="group">
                            <summary className="cursor-pointer list-none text-xs font-bold text-accent-gold hover:underline min-h-[24px] inline-flex items-center">
                              <span className="group-open:hidden">{locale === 'ko' ? `${items.length}개 더 보기` : `Show ${items.length} more`}</span>
                              <span className="hidden group-open:inline">{locale === 'ko' ? '접기' : 'Show less'}</span>
                            </summary>
                            {list}
                          </details>
                        );
                      })}
                    </div>
                  </div>

                  {/* PIPELINE ARCHITECTURE */}
                  <div className="space-y-6">
                    <h3 className="text-xl md:text-3xl font-serif tracking-tight border-b pb-4 text-pretty">
                      {t.technicalPipelineMap}
                    </h3>
                    <div className="space-y-6">

                      <div>
                        <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold mb-4 mt-6">{t.pipelineEdgeCaseGuardrails}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full min-w-0">
                          {projectData.architecture.guardrails.map((gr, gidx) => (
                            <div key={gidx} className={`p-4 rounded-xl border w-full min-w-0 border-ink/5 bg-ink/[0.02]`}>
                              <div className="text-xs font-mono font-bold uppercase tracking-wider mb-2 text-accent-gold opacity-90">{t.edgeCasePrefix} 0{gidx+1}</div>
                              <p className="text-xs max-w-prose text-pretty break-words whitespace-normal w-full min-w-0 text-ink-3">{gr}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PROMPT ENGINEERING */}
                  <div className="space-y-6">
                    <h3 className="text-xl md:text-3xl font-serif tracking-tight border-b pb-4 text-pretty">
                      {t.promptOrchestration}
                    </h3>
                    <div className="space-y-6 font-mono font-normal text-pretty">
                      <div className="w-full min-w-0">
                        <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold mb-3">{t.structuredInstruction}</h4>
                        <pre className="p-4 md:p-6 rounded-xl overflow-x-auto text-[11px] md:text-xs leading-relaxed border border-white/5 bg-black/40 text-green-400 w-full max-w-full whitespace-pre-wrap break-words md:whitespace-pre md:break-normal">
                          <code>{projectData.promptEngineering.logic}</code>
                        </pre>
                      </div>

                      <div className="w-full min-w-0">
                        <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold mb-3">{t.runtimeEnforcedSchema}</h4>
                        <pre className="p-4 md:p-6 rounded-xl overflow-x-auto text-[11px] md:text-xs leading-relaxed border border-white/5 bg-black/40 text-[#a3acb9] w-full max-w-full whitespace-pre-wrap break-words md:whitespace-pre md:break-normal">
                          <code>{projectData.promptEngineering.schema}</code>
                        </pre>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>

        </div>

        {/* CONCLUDE CONNECTOR */}
        <div className={`p-8 md:p-14 rounded-2xl border text-center space-y-6 relative overflow-hidden border-ink/10 bg-card`}>
          <h2 className="text-3xl md:text-5xl tracking-tight font-serif text-pretty">
            {t.wantToSeeTitle}
          </h2>
          <p className={`text-xs md:text-base max-w-2xl mx-auto leading-relaxed text-pretty text-ink-3`}>
            {t.wantToSeeBody}
          </p>
          <div className="pt-4">
            <a 
              href={projectData.contactUrl || "mailto:jsn.benjamin@gmail.com"} 
              className="inline-block px-8 py-3 rounded-full bg-accent-fill text-[#14171d] text-[13px] font-bold hover:brightness-105 active:scale-95 transition-[filter,transform]"
            >
              {projectData.contactUrl ? (locale === 'en' ? "Ask to try BridgeRecruit" : "BridgeRecruit 체험 문의") : t.startCollaboration}
            </a>
          </div>
        </div>

        {caseIds && onOpenCase && caseIds.includes(projectId) && (() => {
          const i = caseIds.indexOf(projectId);
          const prev = caseIds[(i - 1 + caseIds.length) % caseIds.length];
          const next = caseIds[(i + 1) % caseIds.length];
          const href = (id: string) => `${locale === 'ko' ? '/ko' : ''}/case/${id}`;
          return (
            <nav aria-label={locale === 'ko' ? '다른 케이스 스터디' : 'More case studies'} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {([[prev, `${locale === 'ko' ? '← 이전' : '← Previous'} · ${String(caseIds.indexOf(prev) + 1).padStart(2, '0')}`, 'text-left'], [next, `${String(caseIds.indexOf(next) + 1).padStart(2, '0')} · ${locale === 'ko' ? '다음 →' : 'Next →'}`, 'sm:text-right']] as const).map(([id, label, align]) => (
                <a
                  key={label}
                  href={href(id)}
                  onClick={(e) => { e.preventDefault(); onOpenCase(id); }}
                  className={`block p-6 rounded-2xl border transition-[border-color] ${align} border-ink/10 hover:border-accent-gold/40`}
                >
                  <span className="block text-[11px] font-bold uppercase tracking-widest text-ink-3">{label}</span>
                  <span className="block mt-2 text-base md:text-lg font-medium">{studyData[id]?.title}</span>
                </a>
              ))}
            </nav>
          );
        })()}
      </div>

      {lightboxImage && (
        <div 
          id="case-study-lightbox"
          className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setLightboxImage(null)}
        >
          {/* Close button with high-contrast indicator */}
          <button 
            type="button"
            id="close-lightbox-btn"
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 z-[320] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-[background-color,transform] shadow-xl hover:rotate-90 duration-300"
            aria-label={locale === 'ko' ? "전체화면 닫기" : "Close full screen view"}
          >
            <XIcon className="w-6 h-6" />
          </button>
          
          {/* Label Banner */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[310] px-5 py-2.5 rounded-full bg-black/80 border border-white/10 text-xs text-white/90 text-center shadow-2xl max-w-[90%] pointer-events-none font-sans flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-fill animate-ping"></span>
            <span>{lightboxImage.label}</span>
          </div>

          {/* Full scale image area */}
          <div className="relative max-w-full max-h-full flex items-center justify-center cursor-zoom-out select-none p-4">
            {imageErrors[lightboxImage.url] ? (
              <div className="flex flex-col items-center justify-center p-12 text-center max-w-md bg-neutral-900/60 rounded-2xl border border-white/10 select-none animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-neutral-950 border border-white/10 flex items-center justify-center mb-6 text-accent-fill">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-sm font-bold tracking-wider text-white uppercase font-mono block">
                  {locale === 'en' ? "Full Screen Asset View" : "전체 슬라이드 뷰어"}
                </p>
                <p className="mt-4 text-xs text-white/60 leading-relaxed max-w-xs">
                  {locale === 'en'
                    ? "Interactive high-contrast image preview completed. Click anywhere to return, or explore via the live running project link below."
                    : "데모 슬라이드가 안전하게 빌드되었습니다. 이 창을 닫고 하단의 라이브 서비스 바로가기 링크를 통해 실시간 데모 버전을 감상할 수 있습니다."}
                </p>
              </div>
            ) : (
              <img 
                id="lightbox-fullspace-img"
                src={lightboxImage.url} 
                alt={lightboxImage.label}
                referrerPolicy="no-referrer"
                className="max-w-[100vw] max-h-[100vh] md:max-w-[95vw] md:max-h-[95vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
                onError={() => {
                  const url = lightboxImage.url;
                  setImageErrors(prev => ({ ...prev, [url]: true }));
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
});

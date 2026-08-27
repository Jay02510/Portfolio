import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  SparklesIcon, 
  DeviceMobileIcon, 
  FileTextIcon, 
  RocketIcon,
  CheckCircleIcon
} from './Icons.tsx';

// Inline SVGs for specialized matrix controls
const LayersIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
    <path d="m22 12.5-8.58 3.9a2 2 0 0 1-1.66 0L2 12.5" />
    <path d="m22 17.5-8.58 3.9a2 2 0 0 1-1.66 0L2 17.5" />
  </svg>
);

const RadioIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="2" />
    <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
  </svg>
);

const SlidersIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="4" x2="4" y1="21" y2="14" />
    <line x1="4" x2="4" y1="10" y2="3" />
    <line x1="12" x2="12" y1="21" y2="12" />
    <line x1="12" x2="12" y1="8" y2="3" />
    <line x1="20" x2="20" y1="21" y2="16" />
    <line x1="20" x2="20" y1="12" y2="3" />
    <line x1="1" x2="7" y1="14" y2="14" />
    <line x1="9" x2="15" y1="8" y2="8" />
    <line x1="17" x2="23" y1="16" y2="16" />
  </svg>
);

interface ExecutiveMatrixProps {
  locale: 'en' | 'ko';
  theme: 'light' | 'dark';
  onOpenCaseStudy: (id: string) => void;
}

type FilterCategory = 'all' | 'voice' | 'multimodal' | 'mobile' | 'ops';
type SystemStatus = 'enterprise' | 'beta' | 'live' | 'internal';

interface SystemItem {
  id: string;
  name: string;
  categoryEn: string;
  categoryKo: string;
  status: SystemStatus;
  badgeEn: string;
  badgeKo: string;
  domain: FilterCategory[];
  roleEn: string;
  roleKo: string;
  problemEn: string;
  problemKo: string;
  techStack: string[];
  highlightMetricEn: string;
  highlightMetricKo: string;
  liveUrl?: string;
  caseStudyId?: string;
}

const SYSTEMS_DATA: SystemItem[] = [
  {
    id: "vodabi",
    name: "VodaBi Voice-AI Screening Engine",
    categoryEn: "Enterprise B2B SaaS",
    categoryKo: "엔터프라이즈 B2B SaaS",
    status: "enterprise",
    badgeEn: "Enterprise Case Study",
    badgeKo: "기업 케이스 스터디",
    domain: ['voice', 'ops'],
    roleEn: "AI Product Manager (Enterprise Voice & LLM Judges)",
    roleKo: "AI 프로덕트 매니저 (음성 AI & 채점 모델)",
    problemEn: "Automated manual 1st-round sales phone screening calls with real-time WebRTC customer simulations & deterministic grading.",
    problemKo: "수동 1차 전화 스크리닝을 실시간 WebRTC AI 고객 롤플레이 및 결정론적 채점으로 100% 자동화.",
    techStack: ["Direct WebRTC", "NestJS", "OpenAI Realtime", "GPT-4o Judge", "Prisma 7", "MariaDB", "AES-256-GCM", "Docker"],
    highlightMetricEn: "100% Deterministic Step Rubrics (0% Score Hallucination)",
    highlightMetricKo: "100% 결정론적 스텝 루브릭 (채점 환각 0%)",
    caseStudyId: "vodabi"
  },
  {
    id: "chekki-teacher",
    name: "Chekki Schools — Teacher Operations Cockpit",
    categoryEn: "EdTech Operations & Telemetry",
    categoryKo: "에듀테크 운영 & 텔레메트리",
    status: "beta",
    badgeEn: "Beta — Pilot Waitlist Open",
    badgeKo: "베타 — 파일럿 대기명단 모집중",
    domain: ['multimodal', 'ops'],
    roleEn: "0→1 Product Architect & Founder",
    roleKo: "0→1 프로덕트 아키텍트 & 창업자",
    problemEn: "Eliminated repetitive worksheet grading via curriculum pre-seeding and aggregates class mistake patterns before lessons.",
    problemKo: "정답지 사전 시딩으로 반복 채점을 제거하고 수업 전 학급별 오답 취약 패턴을 사전 집계.",
    techStack: ["React 19", "Gemini 2.5 Pro", "Cloud Firestore", "Atomic Transactions", "Bilingual Engine", "TypeScript"],
    highlightMetricEn: "Est. 80% Grading Time Saved (10-15h / week / teacher)",
    highlightMetricKo: "채점 시간 약 80% 절감 추정 (주당 10~15시간 절약)",
    liveUrl: "https://chekki-ai.vercel.app/",
    caseStudyId: "chekki"
  },
  {
    id: "chekki-ai",
    name: "Chekki AI Homework Companion",
    categoryEn: "Closed-Loop EdTech Ecosystem",
    categoryKo: "학부모 AI 숙제 검사기",
    status: "live",
    badgeEn: "Live Shipped App",
    badgeKo: "라이브 프로덕션",
    domain: ['multimodal', 'mobile'],
    roleEn: "0→1 Product Architect & Founder",
    roleKo: "0→1 프로덕트 아키텍트 & 창업자",
    problemEn: "Instant camera OCR homework evaluation with respectful Korean explanations for non-English speaking parents.",
    problemKo: "영어가 어려운 학부모를 위한 즉각적인 카메라 OCR 숙제 채점 및 자연스러운 한국어 존댓말 해설.",
    techStack: ["Capacitor (iOS/Android)", "Gemini 2.5 Flash", "RevenueCat IAP", "Zero-Storage COPPA", "Tailwind CSS"],
    highlightMetricEn: "100+ Users Pilot · <200ms Parsing Latency",
    highlightMetricKo: "100+ 사용자 파일럿 운영 · 200ms 미만 파싱",
    liveUrl: "https://chekki-ai.vercel.app/",
    caseStudyId: "chekki"
  },
  {
    id: "eduplanner",
    name: "EduPlanner Pro Scheduler",
    categoryEn: "AI Constraint Engine",
    categoryKo: "AI 제약 최적화 스케줄러",
    status: "live",
    badgeEn: "Live Shipped App",
    badgeKo: "라이브 프로덕션",
    domain: ['ops'],
    roleEn: "Full-Stack AI Engineer & PM",
    roleKo: "풀스택 AI 엔지니어 & PM",
    problemEn: "Replaced 40+ hours of manual timetable scheduling with hybrid TypeScript validation and Gemini heuristic optimization.",
    problemKo: "40시간 이상의 시간표 편성 작업을 TypeScript 하드 제약 검증 및 Gemini Pro 휴리스틱 최적화로 대체.",
    techStack: ["TypeScript Constraint Engine", "Gemini 2.5 Pro", "React", "Local Persistence", "Vite"],
    highlightMetricEn: "MVP: 40h → <10min with 0 Room & Teacher Clashes",
    highlightMetricKo: "MVP: 40시간 → 10분 미만 단축 (충돌 0건 보장)",
    liveUrl: "https://scheduling-app-five.vercel.app/"
  },
  {
    id: "benchmark-explorer",
    name: "Benchmark Explorer & Radar",
    categoryEn: "Assessment & Data Analytics",
    categoryKo: "장기 성취도 분석 포털",
    status: "live",
    badgeEn: "Live Shipped App",
    badgeKo: "라이브 프로덕션",
    domain: ['multimodal', 'ops'],
    roleEn: "Product Designer & Data Lead",
    roleKo: "프로덕트 디자이너 & 데이터 리드",
    problemEn: "Unified multi-axis CEFR and Cambridge Young Learners data into dynamic longitudinal mastery trajectories.",
    problemKo: "분산된 CEFR 및 캠브리지 YLE 평가 점수를 동적 다축 방사형 차트 및 종단 학습 궤적으로 통합.",
    techStack: ["D3.js", "Recharts", "Airtable API", "React 18", "Tailwind CSS"],
    highlightMetricEn: "1-Click Multi-Axis Competency Tracking",
    highlightMetricKo: "1-클릭 다축 역량 추적 및 시각화",
    liveUrl: "https://education-benchmark-system.vercel.app/"
  },
  {
    id: "b2b-enrichment",
    name: "B2B Lead Enrichment CRM",
    categoryEn: "Sales Automation Pipeline",
    categoryKo: "B2B 영업 자동화 CRM",
    status: "internal",
    badgeEn: "Production Tool",
    badgeKo: "사내 운영 툴",
    domain: ['ops'],
    roleEn: "Technical PM & Automation Lead",
    roleKo: "테크니컬 PM & 자동화 리드",
    problemEn: "Automated academy discovery via Naver Map API proxies with 1-click personalized Gmail deep links for human reps.",
    problemKo: "네이버 지도 API 프록시를 통한 학원 데이터 수집 및 영업 담당자용 1-클릭 개인화 지메일 딥링크 생성.",
    techStack: ["Node/Express Proxy", "Naver Map API", "TM128→WGS84", "Gemini JSON", "Leaflet"],
    highlightMetricEn: "4x Outbound Outreach Velocity & Rep Response",
    highlightMetricKo: "아웃바운드 영업 응답 속도 4배 향상"
  }
];

export const ExecutiveMatrix: React.FC<ExecutiveMatrixProps> = ({ locale, theme, onOpenCaseStudy }) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('all');

  const isDark = theme === 'dark';

  const filterOptions: { id: FilterCategory; labelEn: string; labelKo: string; icon: React.ReactNode }[] = [
    { id: 'all', labelEn: 'All 6 Systems', labelKo: '전체 6개 시스템', icon: <LayersIcon className="w-4 h-4" /> },
    { id: 'voice', labelEn: 'Voice AI & LLMs', labelKo: '음성 AI & 채점 LLM', icon: <RadioIcon className="w-4 h-4" /> },
    { id: 'multimodal', labelEn: 'Multimodal Vision', labelKo: '멀티모달 & OCR', icon: <SparklesIcon className="w-4 h-4" /> },
    { id: 'mobile', labelEn: 'Mobile & Cross-Platform', labelKo: '모바일 & 크로스플랫폼', icon: <DeviceMobileIcon className="w-4 h-4" /> },
    { id: 'ops', labelEn: 'Operations & Solvers', labelKo: '제약 엔진 & 자동화', icon: <SlidersIcon className="w-4 h-4" /> }
  ];

  const getStatusBadgeStyle = (status: SystemStatus) => {
    switch (status) {
      case 'enterprise':
        return isDark
          ? 'bg-purple-500/15 text-purple-300 border-purple-500/30'
          : 'bg-purple-100 text-purple-900 border-purple-300 font-bold';
      case 'beta':
        return isDark
          ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
          : 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
      case 'live':
        return isDark
          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
          : 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
      case 'internal':
        return isDark
          ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
          : 'bg-indigo-100 text-indigo-900 border-indigo-300 font-bold';
    }
  };

  const filteredSystems = selectedFilter === 'all'
    ? SYSTEMS_DATA
    : SYSTEMS_DATA.filter(sys => sys.domain.includes(selectedFilter));

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-12">
      {/* CONTAINER */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 backdrop-blur-xl ${
        isDark 
          ? 'bg-[#181c24]/90 border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)]' 
          : 'bg-white border-black/10 shadow-[0_10px_40px_rgba(0,0,0,0.06)]'
      }`}>
        
        {/* TOP TITLE ROW */}
        <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b ${
          isDark ? 'border-white/10' : 'border-black/10'
        }`}>
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center justify-center p-1.5 rounded-lg bg-accent-gold/15 text-accent-gold border border-accent-gold/30">
                <RocketIcon className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-accent-gold font-mono">
                {locale === 'en' ? "5-SECOND EXECUTIVE SCAN" : "5초 요약: 배포 시스템 & 기술 스택"}
              </span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-display font-medium tracking-tight ${
              isDark ? 'text-white' : 'text-alpine-950'
            }`}>
              {locale === 'en' ? "Shipped AI Products & Core Tech Stacks" : "배포된 6대 AI 제품 & 아키텍처 매트릭스"}
            </h2>
            <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${
              isDark ? 'text-white/70' : 'text-neutral-700'
            }`}>
              {locale === 'en'
                ? "A high-density overview of production-grade AI systems, exact technical architectures, and verified business outcomes."
                : "실제 프로덕션에 배포된 AI 시스템, 사용된 핵심 기술 스택 및 실측된 정량적 성과를 한눈에 스캔할 수 있는 매트릭스입니다."}
            </p>
          </div>

          {/* FILTER BUTTONS */}
          <div className={`flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl border ${
            isDark ? 'bg-black/30 border-white/10' : 'bg-neutral-100 border-black/10'
          }`}>
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedFilter(opt.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-2 min-h-[38px] ${
                  selectedFilter === opt.id
                    ? (isDark ? 'bg-accent-gold text-alpine-950 shadow-md font-bold' : 'bg-accent-clay text-white shadow-md font-bold')
                    : (isDark ? 'text-white/70 hover:text-white hover:bg-white/5' : 'text-neutral-700 hover:text-neutral-950 hover:bg-black/5')
                }`}
              >
                {opt.icon}
                <span>{locale === 'en' ? opt.labelEn : opt.labelKo}</span>
              </button>
            ))}
          </div>
        </div>

        {/* SYSTEM CARDS / TABLE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 pt-6">
          <AnimatePresence mode="popLayout">
            {filteredSystems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                className={`p-5 sm:p-6 rounded-2xl border transition-all flex flex-col justify-between group ${
                  isDark 
                    ? 'bg-[#1e232d]/80 border-white/10 hover:border-accent-gold/40 hover:bg-[#232936]' 
                    : 'bg-neutral-50 border-black/10 hover:border-accent-clay/40 hover:bg-white hover:shadow-lg'
                }`}
              >
                <div className="space-y-4">
                  {/* TOP ROW: CATEGORY, TITLE & BADGE */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                          isDark ? 'text-accent-gold' : 'text-accent-clay'
                        }`}>
                          {locale === 'en' ? item.categoryEn : item.categoryKo}
                        </span>
                        <span className={isDark ? 'text-white/30' : 'text-neutral-400'}>•</span>
                        <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${getStatusBadgeStyle(item.status)}`}>
                          {locale === 'en' ? item.badgeEn : item.badgeKo}
                        </span>
                      </div>
                      <h3 className={`text-lg sm:text-xl font-display font-semibold tracking-tight ${
                        isDark ? 'text-white' : 'text-neutral-950'
                      }`}>
                        {item.name}
                      </h3>
                      <div className={`text-xs font-medium font-mono ${
                        isDark ? 'text-neutral-400' : 'text-neutral-600'
                      }`}>
                        {locale === 'en' ? item.roleEn : item.roleKo}
                      </div>
                    </div>
                  </div>

                  {/* CORE PROBLEM & 0→1 CONTRIBUTION */}
                  <p className={`text-xs leading-relaxed ${
                    isDark ? 'text-neutral-300' : 'text-neutral-700'
                  }`}>
                    {locale === 'en' ? item.problemEn : item.problemKo}
                  </p>

                  {/* TECH STACK CHIPS */}
                  <div className="space-y-1.5 pt-1">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${
                      isDark ? 'text-white/50' : 'text-neutral-500'
                    }`}>
                      {locale === 'en' ? "Architecture & Stack" : "핵심 아키텍처 및 스택"}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.techStack.map((tech, tIdx) => (
                        <span 
                          key={tIdx} 
                          className={`text-[10px] font-mono px-2.5 py-1 rounded-md border font-semibold ${
                            isDark 
                              ? 'bg-black/30 border-white/10 text-neutral-200' 
                              : 'bg-white border-black/10 text-neutral-800 shadow-xs'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* BOTTOM ROW: KEY OUTCOME METRIC & ACTIONS */}
                <div className={`mt-5 pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isDark ? 'border-white/10' : 'border-black/10'
                }`}>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className={`w-4 h-4 shrink-0 ${
                      isDark ? 'text-emerald-400' : 'text-emerald-700'
                    }`} />
                    <span className={`text-xs font-bold font-mono tracking-tight ${
                      isDark ? 'text-emerald-400' : 'text-emerald-700'
                    }`}>
                      {locale === 'en' ? item.highlightMetricEn : item.highlightMetricKo}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {item.caseStudyId && (
                      <button
                        onClick={() => onOpenCaseStudy(item.caseStudyId!)}
                        className={`text-xs font-bold font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                          isDark
                            ? 'bg-accent-gold/15 border-accent-gold/30 text-accent-gold hover:bg-accent-gold hover:text-alpine-950'
                            : 'bg-accent-clay/10 border-accent-clay/30 text-accent-clay hover:bg-accent-clay hover:text-white'
                        }`}
                      >
                        <FileTextIcon className="w-3.5 h-3.5" />
                        <span>{locale === 'en' ? "Case Study" : "케이스 스터디"}</span>
                      </button>
                    )}

                    {item.liveUrl && (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-bold font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-lg border transition-all flex items-center gap-1 ${
                          isDark
                            ? 'border-white/15 text-white/80 hover:bg-white/10 hover:text-white'
                            : 'border-black/15 text-neutral-800 hover:bg-black/5 hover:text-black'
                        }`}
                      >
                        <span>{locale === 'en' ? "Launch" : "실행"}</span>
                        <span>↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

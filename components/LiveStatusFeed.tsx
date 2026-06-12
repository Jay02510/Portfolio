import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BuildItem {
  id: string;
  date: string;
  type: 'fix' | 'feature' | 'security' | 'infra';
  titleEn: string;
  titleKo: string;
  descEn: string;
  descKo: string;
  relatedProjectId?: string;
}

const LIVE_UPDATES_DATA: BuildItem[] = [
  {
    id: "guidde-video-add",
    date: "2026-06-12",
    type: "feature",
    titleEn: "Published Interactive Walkthrough Video",
    titleKo: "상세 시연 비디오 가동",
    descEn: "Integrated the 1-minute 4-second interactive walkthrough video for the 'Automated Report Generator & Pipeline' project, with cross-origin sandboxing protections for secure preview rendering.",
    descKo: "Airtable-Make-Softr 연동 데이터 파이프라인의 1분 4초 분량 상세 작동 시연 영상을 softr 전용 포털과 연쇄 가동하도록 연결하였습니다. 보안 샌드박스를 구성해 끊김 없는 시청이 보장됩니다.",
    relatedProjectId: "consultation-pipeline"
  },
  {
    id: "sandbox-iframe-resolution",
    date: "2026-06-11",
    type: "fix",
    titleEn: "Resolved Sandbox Video Player Blocking",
    titleKo: "시연 비디오 플레이어 샌드박스 차단 해결",
    descEn: "Fixed cross-origin rendering restrictions on video widgets by adding a fully sandboxed fallback. Added a direct secondary window launcher to bypass strict browser privacy frames.",
    descKo: "일부 보안 브라우저의 아이프레임 격리 환경에서 가이드 플레이어 실행이 가로막히는 문제를 우회하기 위해 샌드박스 매개 변수를 조정하고 직접 시청용 새 창 기동 장치를 가설했습니다.",
    relatedProjectId: "consultation-pipeline"
  },
  {
    id: "korean-phonetics",
    date: "2026-06-08",
    type: "feature",
    titleEn: "Bilingual Phonetic Synthesis Engine Deployed",
    titleKo: "Chekki AI 영어 발음 정밀 한글 합성 탑재",
    descEn: "Overhauled the translation parsing step under the Chekki AI project. Configured Gemini structured JSON prompts to generate flawless Korean phonetic guidelines for ESL learners.",
    descKo: "Chekki AI 숙제 판독 엔진을 고도화하여 제미나이 정형 데이터 규약에 맞춰 영어 문장의 한글 발음 독음 가이드가 무누수로 완전 조합되도록 파이프라인을 안정화했습니다.",
    relatedProjectId: "chekki"
  },
  {
    id: "case-study-pdf-templates",
    date: "2026-06-04",
    type: "feature",
    titleEn: "Published Benchmark Explorer PDF Attachments",
    titleKo: "Benchmark Explorer 성과측정 리포트 견본 배포",
    descEn: "Released direct PDF assessment print-out samples for the Benchmark Explorer case study, demonstrating multi-point evaluation matrices across Baseline, Midline, and Endline test scenarios.",
    descKo: "Benchmark Explorer 사례분석 탭 내에 학습 성과 측정 결과물(Baseline/Midline/Endline)을 정식 출력 양식에 맞춘 고품질 PDF 자료로 다운로드 요청할 수 있도록 연동을 완료했습니다.",
    relatedProjectId: "benchmark-explorer"
  },
  {
    id: "zero-memory-hardening",
    date: "2026-05-29",
    type: "security",
    titleEn: "Zero-Memory Database Security Enforcement",
    titleKo: "이중 아동정보보호 무저장 아키텍처 완료",
    descEn: "Enforced compliance with COPPA children data rules by implementing backend route safety pipelines that instantly discard student worksheets post-evaluation. No personal records are persisted.",
    descKo: "미 아동 온라인 개인정보 보호법(COPPA) 기준을 실가동에서 충족하도록 게이트웨이 단계에서 임시 숙제 이미지가 전송 즉시 삭제되는 영구 무저장 휘발성 처리를 탑재했습니다.",
    relatedProjectId: "chekki"
  }
];

function getRelativeTime(dateStr: string, locale: 'en' | 'ko'): string {
  const itemDate = new Date(dateStr + "T00:00:00");
  const today = new Date();
  
  // Set times to midnight to calculate absolute day-to-day diff
  const itemMidnight = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate());
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const diffTime = todayMidnight.getTime() - itemMidnight.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 0) {
    return locale === 'en' ? "Just now" : "방금 전";
  } else if (diffDays === 1) {
    return locale === 'en' ? "Yesterday" : "어제";
  } else if (diffDays < 7) {
    return locale === 'en' ? `${diffDays} days ago` : `${diffDays}일 전`;
  } else {
    const weeks = Math.floor(diffDays / 7);
    if (weeks === 1) {
      return locale === 'en' ? "1 week ago" : "1주일 전";
    }
    return locale === 'en' ? `${weeks} weeks ago` : `${weeks}주일 전`;
  }
}

interface LiveStatusFeedProps {
  locale: 'en' | 'ko';
  theme: 'light' | 'dark';
  onOpenCaseStudy: (id: string | null) => void;
}

export default function LiveStatusFeed({ locale, theme, onOpenCaseStudy }: LiveStatusFeedProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  
  const latestItem = LIVE_UPDATES_DATA[0];

  if (isDismissed) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-8 mt-10 md:mt-12 relative z-50">
      {/* Outer Banner Wrapper */}
      <div 
        className={`rounded-3xl border transition-all duration-300 relative overflow-hidden backdrop-blur-xl ${
          theme === 'dark' 
            ? 'bg-black/40 border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.4)]' 
            : 'bg-white/60 border-black/5 shadow-xl'
        }`}
      >
        {/* Banner Quick Strip */}
        <div className="p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {/* Live Indicator Dot */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            
            {/* Tag */}
            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded bg-red-500/10 text-red-400 font-mono shrink-0`}>
              {locale === 'en' ? "LIVE DEV FEED" : "실시간 빌드 로그"}
            </span>

            {/* Headline */}
            <div className={`text-xs md:text-sm font-semibold truncate ${
              theme === 'dark' ? 'text-white/90' : 'text-alpine-950/90'
            }`}>
              <strong className="text-accent-gold mr-1.5">
                [{latestItem.type.toUpperCase()}]
              </strong>
              {locale === 'en' ? latestItem.titleEn : latestItem.titleKo}
            </div>

            {/* Time badge */}
            <span className={`text-[10px] font-mono whitespace-nowrap shrink-0 px-2 py-0.5 rounded-full ${
              theme === 'dark' ? 'bg-white/5 text-white/40' : 'bg-black/5 text-alpine-950/40'
            }`}>
              {getRelativeTime(latestItem.date, locale)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 ml-auto md:ml-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`px-3 py-1.5 rounded-xl text-[10px] sm:text-[11px] font-black uppercase tracking-wider transition-all border ${
                isOpen
                  ? (theme === 'dark' ? 'bg-white/10 border-white/20 text-white' : 'bg-black/10 border-black/20 text-alpine-950')
                  : (theme === 'dark' ? 'bg-white/5 border-white/5 text-white/70 hover:bg-white/10 hover:text-white' : 'bg-black/5 border-black/5 text-alpine-950/70 hover:bg-black/10 hover:text-alpine-950')
              }`}
            >
              {isOpen 
                ? (locale === 'en' ? "Close History ▲" : "히스토리 닫기 ▲") 
                : (locale === 'en' ? "Browse Feed ▼" : "연혁 전체보기 ▼")}
            </button>
            
            {latestItem.relatedProjectId && (
              <button
                onClick={() => onOpenCaseStudy(latestItem.relatedProjectId || null)}
                className="px-3.5 py-1.5 rounded-xl text-[10px] sm:text-[11px] font-black uppercase tracking-widest bg-accent-gold text-alpine-950 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-accent-gold/10"
              >
                {locale === 'en' ? "See Fix" : "적용부 보기"} ↗
              </button>
            )}

            <button
              onClick={() => setIsDismissed(true)}
              className={`p-1.5 rounded-lg transition-colors ${
                theme === 'dark' ? 'text-white/20 hover:text-white/50 hover:bg-white/5' : 'text-alpine-950/20 hover:text-alpine-950/50 hover:bg-black/5'
              }`}
              title={locale === 'en' ? "Dismiss alert" : "알림 숨기기"}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Historical Build Updates Timeline Section */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`border-t ${theme === 'dark' ? 'border-white/10 bg-[#0c0f13]/60' : 'border-black/5 bg-black/[0.01]'}`}
            >
              <div className="p-6 md:p-8 space-y-8">
                <div className="flex flex-col gap-1">
                  <h4 className={`text-xs font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-accent-gold' : 'text-accent-clay'}`}>
                    {locale === 'en' ? "Active Workspace Deployment Timeline" : "실제 작동 반영 타임라인 및 마일스톤 로그"}
                  </h4>
                  <p className={`text-[11px] leading-relaxed max-w-2xl font-light ${theme === 'dark' ? 'text-white/50' : 'text-alpine-950/60'}`}>
                    {locale === 'en' 
                      ? "A chronological record of structural fixes, algorithm enhancements, and production-ready deployments applied directly to classroom-tested ecosystems." 
                      : "교육 현장 피드백과 QA 수정을 거쳐 포트폴리오 프로덕션 및 데이터 허브 전반에 반영된 핵심 실시간 개선 명세 목록입니다."}
                  </p>
                </div>

                <div className="relative border-l border-white/5 dark:border-white/10 ml-1.5 space-y-8 pl-6 md:pl-8">
                  {LIVE_UPDATES_DATA.map((item, idx) => (
                    <div key={item.id} className="relative group/timeline">
                      {/* Interactive dot */}
                      <span className={`absolute -left-[31px] md:-left-[39px] top-1.5 w-2 h-2 rounded-full border transition-all duration-300 ${
                        idx === 0
                          ? 'bg-accent-gold border-accent-gold scale-125 ring-4 ring-accent-gold/20'
                          : 'bg-[#181D25] border-white/20 group-hover/timeline:border-white/40'
                      }`}></span>

                      <div className="space-y-2">
                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="text-[10px] font-mono font-bold tracking-wider text-accent-gold bg-accent-gold/10 px-2 py-0.5 rounded uppercase">
                            {item.type}
                          </span>
                          <span className={`text-[10px] font-mono ${theme === 'dark' ? 'text-white/40' : 'text-alpine-950/40'}`}>
                            {item.date}
                          </span>
                          <span className={`text-[9px] font-mono font-semibold uppercase ${theme === 'dark' ? 'text-white/30' : 'text-alpine-950/30'}`}>
                            ({getRelativeTime(item.date, locale)})
                          </span>
                        </div>

                        {/* Title */}
                        <h5 className={`text-sm md:text-base font-bold tracking-tight ${theme === 'dark' ? 'text-white/95' : 'text-alpine-950/95'}`}>
                          {locale === 'en' ? item.titleEn : item.titleKo}
                        </h5>

                        {/* Description */}
                        <p className={`text-xs leading-relaxed max-w-3xl ${theme === 'dark' ? 'text-white/70' : 'text-alpine-950/75'}`}>
                          {locale === 'en' ? item.descEn : item.descKo}
                        </p>

                        {/* Linked Project CTA */}
                        {item.relatedProjectId && (
                          <div className="pt-1.5">
                            <button
                              onClick={() => onOpenCaseStudy(item.relatedProjectId || null)}
                              className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${
                                theme === 'dark' ? 'text-white/45 hover:text-accent-gold' : 'text-alpine-950/45 hover:text-accent-clay'
                              } transition-colors`}
                            >
                              <span>{locale === 'en' ? "Open Module Case Study" : "솔루션 스토리보드 열람"}</span>
                              <span className="text-[11px]">→</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

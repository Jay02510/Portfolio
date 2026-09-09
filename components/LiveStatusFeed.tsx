import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { XIcon } from './Icons.tsx';

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

const BUILD_UPDATES_DATA: BuildItem[] = [
  {
    id: "hagwon-readiness-launch-2026",
    date: "2026-09-09",
    type: "feature",
    titleEn: "Hagwon AI Readiness Index: Bilingual Lead-Gen Quiz Shipped",
    titleKo: "학원 AI 준비도 지표: 이중언어 리드 확보 퀴즈 배포",
    descEn: "Shipped a live 6-pillar bilingual self-assessment feeding Chekki's B2B sales funnel: weighted scoring engine, automated bilingual report emails via Resend, Firestore-backed permalinks, GA4 lead attribution, and a Basic-Auth admin dashboard.",
    descKo: "Chekki의 B2B 세일즈 퍼널로 연결되는 6영역 이중언어 자가진단을 라이브로 배포했습니다. 가중치 채점 엔진, Resend를 통한 자동 이중언어 리포트 이메일, Firestore 기반 영구 링크, GA4 리드 유입 추적, Basic Auth 관리자 대시보드로 구성됩니다.",
    relatedProjectId: "hagwon-readiness"
  },
  {
    id: "bridgerecruit-launch-2026",
    date: "2026-09-06",
    type: "feature",
    titleEn: "BridgeRecruit: Inbox-Native Admissions CRM Shipped",
    titleKo: "BridgeRecruit: 인박스 네이티브 입학처 CRM 배포",
    descEn: "Shipped a solo-built CRM for international school admissions: an Outlook add-in that logs email touchpoints in one click, backed by a Next.js territory & pipeline dashboard, 2 OAuth flows, and 19 scoped API routes.",
    descKo: "국제학교 입학 담당자를 위한 아웃룩 인박스 네이티브 CRM을 단독 구축해 배포했습니다. 원클릭 접점 기록 애드인, Next.js 지역 관리·파이프라인 대시보드, 2개 OAuth 플로우, 19개 스코프 API 라우트로 구성됩니다.",
    relatedProjectId: "bridgerecruit"
  },
  {
    id: "vodabi-production-release-2026",
    date: "2026-09-01",
    type: "feature",
    titleEn: "VODABI: Outbound Telemarketing Voice-AI & 11-Rubric Evaluator Shipped",
    titleKo: "VODABI: 아웃바운드 텔레마케팅 음성 AI 및 11개 루브릭 평가 엔진 배포",
    descEn: "Shipped the production platform featuring Direct WebRTC voice roleplay (<200ms latency), post-call GPT-4o 11-rubric evaluation with BANTCQ evidence, VOISOR coaching assistant, multi-tenant RBAC, and 5-vulnerability pre-prod security audit.",
    descKo: "Direct WebRTC 실시간 음성 롤플레이(<200ms 지연), BANTCQ 근거가 포함된 사후 GPT-4o 11개 루브릭 평가, VOISOR 코칭 어시스턴트, 멀티테넌트 RBAC 및 5대 취약점 사전 보안 감사가 완결된 프로덕션 버전을 배포했습니다.",
    relatedProjectId: "vodabi"
  },
  {
    id: "chekki-production-consolidation-2026",
    date: "2026-09-01",
    type: "infra",
    titleEn: "Chekki AI: Vercel 12-Function Consolidation",
    titleKo: "Chekki AI: Vercel 12개 함수 한도 통합",
    descEn: "Consolidated all AI routes into api/analyze.ts and billing into api/redeem.ts to stay under Vercel's function-count limit, with zero regressions.",
    descKo: "Vercel 함수 개수 한도 내에서 모든 AI 작업을 api/analyze.ts로, 결제를 api/redeem.ts로 통합하였으며, 리그레션 없이 완료했습니다.",
    relatedProjectId: "chekki"
  },
  {
    id: "chekki-schools-teacherpage-refactor-2026",
    date: "2026-09-01",
    type: "infra",
    titleEn: "Chekki Schools: 4,678-Line Monolith Split into Role-Scoped Hooks",
    titleKo: "Chekki Schools: 4,678줄 모놀리스를 역할별 훅으로 분리",
    descEn: "Refactored the single-file TeacherPage into useDirectorState / useFTState / useKTState — role-scoped hooks for director, foreign-teacher and Korean-teacher cockpits, with zero regressions.",
    descKo: "단일 파일이던 TeacherPage를 원장·원어민 교사·한국인 교사 코크핏용 useDirectorState / useFTState / useKTState 역할별 훅으로 분리했으며, 리그레션 없이 완료했습니다.",
    relatedProjectId: "chekki-teacher"
  },
  {
    id: "voice-ai-deterministic-scoring-release",
    date: "2026-08-14",
    type: "feature",
    titleEn: "VodaBi Voice-AI: Deterministic Step Rubric Scoring & Ephemeral WebRTC Deployed",
    titleKo: "VodaBi 음성 AI: 결정론적 스텝 루브릭 평가 및 임시 WebRTC 배포 완료",
    descEn: "Shipped direct WebRTC voice streaming with ephemeral session tokens and push-to-talk turn control at VodaBi, paired with deterministic stepIndex rubric score lookups and AES-256-GCM encryption at rest.",
    descKo: "VodaBi의 임시 세션 토큰 및 Push-to-Talk 턴 제어가 적용된 Direct WebRTC 음성 스트림과 stepIndex 기반 결정론적 루브릭 산출 및 AES-256-GCM 암호화를 프로덕션 배포했습니다.",
    relatedProjectId: "vodabi"
  },
  {
    id: "voice-ai-security-hardening",
    date: "2026-08-08",
    type: "security",
    titleEn: "VodaBi Voice-AI: Token Rotation & Active Role Verification Hardening",
    titleKo: "VodaBi 음성 AI: 매직링크 토큰 로테이션 & 실시간 권한 검증 보안 강화",
    descEn: "Enforced 7-day magic link expiration with token rotation on re-invite, authenticated call-log endpoints to block transcript injection, and verified active database roles on privileged requests at VodaBi.",
    descKo: "VodaBi 평가 파이프라인에 재초대 시 토큰 자동 로테이션(7일 만료), 트랜스크립트 주입 방지 인증 엔드포인트 및 실시간 데이터베이스 권한 재검증을 적용하여 보안 모델을 완성했습니다.",
    relatedProjectId: "vodabi"
  },
  {
    id: "chekki-major-overhaul-2026",
    date: "2026-07-15",
    type: "feature",
    titleEn: "Major Chekki Showcase Overhaul & Asset Upgrade",
    titleKo: "Chekki 쇼케이스 대규모 자산 및 가이드 업데이트 완료",
    descEn: "Upgraded the Chekki showcase assets with a brand new B2B educational landing page, highlighted user pain points, streamlined parent onboarding, and redesigned high-contrast bilingual teaching overlays.",
    descKo: "신규 B2B 교육 랜딩 페이지 도입, 핵심 부모/원천 페인 포인트 가시화, 학부모 전용 온보딩 흐름 탑재 및 고대비 이중언어 티칭/풀이 오버레이 신규 자산으로 업그레이드를 마쳤습니다.",
    relatedProjectId: "chekki"
  },
  {
    id: "chekki-guidde-video",
    date: "2026-06-20",
    type: "feature",
    titleEn: "Chekki AI Interactive Playbook Embedded",
    titleKo: "Chekki AI 인터랙티브 시연 가이드북 탑재",
    descEn: "Upgraded the Chekki AI mobile worksheet parsing walkthrough to use an interactive Guidde Video Playbook, resolving potential cross-origin iframe security blocks elegantly across all browsers.",
    descKo: "Chekki AI 종이 시험지 인식 솔루션의 동영상 시연을 브라우저 보안 이슈 걱정 없는 최신 인터랙티브 Guidde 비디오 플레이메이커 가이드북으로 일괄 전환 탑재 완료했습니다.",
    relatedProjectId: "chekki"
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

interface LiveStatusFeedProps {
  locale: 'en' | 'ko';
  theme: 'light' | 'dark';
  onOpenCaseStudy: (id: string | null) => void;
}

export default function LiveStatusFeed({ locale, theme, onOpenCaseStudy }: LiveStatusFeedProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  
  const latestItem = BUILD_UPDATES_DATA[0];

  if (isDismissed) return null;

  const isDark = theme === 'dark';

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-8 mt-10 md:mt-12 relative z-50">
      {/* Outer Banner Wrapper */}
      <div 
        className={`rounded-2xl border relative overflow-hidden ${
          isDark 
            ? 'bg-alpine-900 border-white/10 shadow-xl' 
            : 'bg-white border-black/10 shadow-md'
        }`}
      >
        {/* Banner Quick Strip */}
        <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Tag */}
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded font-mono shrink-0 border ${
              isDark 
                ? 'bg-accent-gold/15 text-accent-gold border-accent-gold/30' 
                : 'bg-accent-clay/10 text-accent-clay border-accent-clay/20'
            }`}>
              {locale === 'en' ? "BUILD LOG" : "빌드 로그"}
            </span>

            {/* Headline */}
            <div className={`text-xs md:text-sm font-semibold truncate ${
              isDark ? 'text-white' : 'text-alpine-950'
            }`}>
              <span className={`mr-1.5 font-mono text-[11px] font-bold uppercase ${
                isDark ? 'text-accent-gold' : 'text-accent-clay'
              }`}>
                [{latestItem.type.toUpperCase()}]
              </span>
              <span>{locale === 'en' ? latestItem.titleEn : latestItem.titleKo}</span>
            </div>

            {/* Date badge */}
            <span className={`text-[11px] font-mono whitespace-nowrap shrink-0 px-2.5 py-0.5 rounded-full border ${
              isDark ? 'bg-white/5 border-white/10 text-white/60' : 'bg-neutral-100 border-black/10 text-neutral-600'
            }`}>
              {latestItem.date}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 ml-auto md:ml-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-[background-color,border-color,color] active:scale-95 border min-h-[40px] flex items-center gap-1.5 ${
                isOpen
                  ? (isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-neutral-200 border-black/20 text-alpine-950')
                  : (isDark ? 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white' : 'bg-neutral-100 border-black/10 text-neutral-700 hover:bg-neutral-200 hover:text-black')
              }`}
            >
              <span>
                {isOpen 
                  ? (locale === 'en' ? "Hide History ▲" : "로그 닫기 ▲") 
                  : (locale === 'en' ? "View Log ▼" : "연혁 보기 ▼")}
              </span>
            </button>
            
            {latestItem.relatedProjectId && (
              <button
                onClick={() => onOpenCaseStudy(latestItem.relatedProjectId || null)}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-accent-gold text-alpine-950 hover:brightness-110 active:scale-95 transition-[filter] shadow-sm min-h-[40px] flex items-center gap-1"
              >
                <span>{locale === 'en' ? "See Fix" : "적용부 보기"}</span>
                <span>↗</span>
              </button>
            )}

            <button
              onClick={() => setIsDismissed(true)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors active:scale-95 border ${
                isDark
                  ? 'border-white/10 text-white/70 hover:text-white hover:bg-white/10'
                  : 'border-black/10 text-neutral-700 hover:text-black hover:bg-neutral-100'
              }`}
              aria-label={locale === 'en' ? "Dismiss build log" : "빌드 로그 닫기"}
            >
              <XIcon className="w-4 h-4" />
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
              className={`border-t ${isDark ? 'border-white/10 bg-[#0c0f13]/80' : 'border-black/10 bg-neutral-50'}`}
            >
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex flex-col gap-1">
                  <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${
                    isDark ? 'text-accent-gold' : 'text-accent-clay'
                  }`}>
                    {locale === 'en' ? "Production Deployment Log" : "프로덕션 배포 및 변경 이력"}
                  </h4>
                  <p className={`text-xs leading-relaxed max-w-2xl ${isDark ? 'text-white/70' : 'text-neutral-700'}`}>
                    {locale === 'en' 
                      ? "A chronological changelog of structural architecture updates, algorithm improvements, and security enhancements shipped across production systems." 
                      : "교육 현장 피드백과 QA를 거쳐 배포된 아키텍처 개선 및 보안 모델 업데이트 명세입니다."}
                  </p>
                </div>

                {/* Timeline Spine */}
                <div className={`relative border-l ml-2 space-y-6 pl-6 md:pl-8 ${
                  isDark ? 'border-white/15' : 'border-neutral-300'
                }`}>
                  {BUILD_UPDATES_DATA.map((item, idx) => (
                    <div
                      key={item.id}
                      className="relative group/timeline animate-in fade-in slide-in-from-left-2 duration-300"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      {/* Timeline dot */}
                      <span className={`absolute -left-[31px] md:-left-[39px] top-1.5 w-2.5 h-2.5 rounded-full border transition-[transform,background-color,border-color] duration-300 ${
                        idx === 0
                          ? 'bg-accent-gold border-accent-gold scale-125 ring-4 ring-accent-gold/20'
                          : (isDark ? 'bg-neutral-800 border-white/30' : 'bg-white border-neutral-400')
                      }`}></span>

                      <div className="space-y-1.5">
                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className={`text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded uppercase ${
                            isDark ? 'text-accent-gold bg-accent-gold/15' : 'text-accent-clay bg-accent-clay/10'
                          }`}>
                            {item.type}
                          </span>
                          <span className={`text-xs font-mono font-medium ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                            {item.date}
                          </span>
                        </div>

                        {/* Title */}
                        <h5 className={`text-sm md:text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                          {locale === 'en' ? item.titleEn : item.titleKo}
                        </h5>

                        {/* Description */}
                        <p className={`text-xs leading-relaxed max-w-3xl ${isDark ? 'text-white/80' : 'text-neutral-700'}`}>
                          {locale === 'en' ? item.descEn : item.descKo}
                        </p>

                        {/* Linked Project CTA */}
                        {item.relatedProjectId && (
                          <div className="pt-1">
                            <button
                              onClick={() => onOpenCaseStudy(item.relatedProjectId || null)}
                              className={`inline-flex items-center gap-1 text-xs font-bold ${
                                isDark ? 'text-accent-gold hover:underline' : 'text-accent-clay hover:underline'
                              } transition-colors`}
                            >
                              <span>{locale === 'en' ? "Open Case Study" : "케이스 스터디 보기"}</span>
                              <span className="text-sm">→</span>
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

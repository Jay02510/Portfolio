import React, { useEffect, useRef, useState } from 'react';
import { MailIcon, XIcon, ExternalLinkIcon, SparklesIcon, ChevronDownIcon, FileTextIcon, DeviceMobileIcon, SettingsIcon, LockIcon, CodeIcon } from './components/Icons.tsx';
import { CaseStudyType } from './types.ts';
import { studyDataEn, studyDataKo } from './components/caseStudyData.ts';

interface CaseStudyViewerProps {
  projectId: string;
  onClose: () => void;
  theme?: 'light' | 'dark';
  locale?: 'en' | 'ko';
  backgroundScrollY?: number;
}

const uiTranslation = {
  en: {
    backToPortfolio: "← Back",
    launchLive: "Launch Live ↗",
    architecturalStudy: "Architectural Case Study",
    technicalBreakdown: "Technical Breakdown ↓",
    launchLiveApp: "Launch Live App ↗",
    systemStack: "System Stack",
    systemScopeOverview: "System Overview",
    systemScopeBody: "Designed to optimize workflows and reduce administrative friction. This architecture processes transactions securely without exposing keys or credentials.",
    theProblem: "The Problem",
    theSolution: "The Solution",
    technicalPipelineMap: "Architecture Map",
    pipelineExecutionLifecycle: "Execution Lifecycle",
    pipelineEdgeCaseGuardrails: "Edge-Case Guardrails",
    edgeCasePrefix: "Edge Case",
    promptOrchestration: "Prompt Design & AI Guardrails",
    structuredInstruction: "System Instructions",
    runtimeEnforcedSchema: "Enforced JSON Schema",
    formattingConsistency: "Formatting Guardrails",
    productImpactScale: "Impact & Operational Metrics",
    quantifiedValue: "Operational Value",
    enterpriseSecurity: "Security & Compliance",
    wantToSeeTitle: "Interested in the implementation details?",
    wantToSeeBody: "I would be happy to discuss the relational database schemas, automation rules, or model tuning parameters in more detail. Let's start a conversation by email.",
    startCollaboration: "Get in Touch",
    proofOfWorkTitle: "System Interface & Screenshots",
    productionWalkthrough: "Integration Walkthrough",
    productionWalkthroughBodyLive: "Interactive application workflow running directly across connected client-server endpoints and model APIs.",
    productionWalkthroughBodyBackground: "Integrated automated routines running background synchronizations and conditional database pipelines.",
    openLiveSandbox: "Launch Project Sandbox",
    projectNotFound: "Project not found.",
    backBtn: "Back",
    productMindset: "[ Product & Design Focus ]",
    behindTheArchitecture: "Behind the Architecture",
    humanProblem: "The Focus Bottleneck",
    productVision: "Product Objective",
    coreRationale: "Engineering Choices",
    technicalHurdles: "Troubleshooting & Resolutions",
    incident: "Incident",
    diagnosis: "Root Cause Diagnosis",
    resolution: "Production Resolution",
    storeLink: "App Store / Play Store ↗"
  },
  ko: {
    backToPortfolio: "← 돌아가기",
    launchLive: "라이브 데모 실행 ↗",
    architecturalStudy: "아키텍처 케이스 스터디",
    technicalBreakdown: "기술 세부 분석 ↓",
    launchLiveApp: "구동 데모 ↗",
    systemStack: "시스템 기술 스택",
    systemScopeOverview: "시스템 개요",
    systemScopeBody: "수작업 행정 피로를 소거하고 업무 생산성을 높이기 위한 구조적 설계 사례입니다. 모든 요청 처리와 저장 구조는 프라이버시 유지 및 보안 규정 준수를 우선 고려해 구축되었습니다.",
    theProblem: "현장의 어려움 (Problem)",
    theSolution: "아키텍처 설계 (Solution)",
    technicalPipelineMap: "기술 파이프라인 구조 설계도",
    pipelineExecutionLifecycle: "파이프라인 실행 라이프사이클",
    pipelineEdgeCaseGuardrails: "예외 분기 처리 장치",
    edgeCasePrefix: "예외 상황",
    promptOrchestration: "프롬프트 튜닝 및 입출력 제어",
    structuredInstruction: "시스템 프롬프트 (System Instructions)",
    runtimeEnforcedSchema: "JSON 출력 구조 적용 (Schema Structure)",
    formattingConsistency: "응답 레이아웃 보장 규칙",
    productImpactScale: "실무 영향 및 성과",
    quantifiedValue: "업무 생산성 향상 지표",
    enterpriseSecurity: "보안 가이드라인 준수성",
    wantToSeeTitle: "이 아키텍처의 설계 및 상세 흐름에 대해 관심이 있으신가요?",
    wantToSeeBody: "관계형 시트 구조 설계, API 미들웨어 프록시 구현, 자동화 동기화 시나리오 등에 노하우를 기꺼이 공유합니다. 이메일 편의 채널로 편하게 문의 주세요.",
    startCollaboration: "이메일 문의 보내기",
    proofOfWorkTitle: "시스템 인터페이스 및 명세 자료",
    productionWalkthrough: "구동 시나리오 아웃포커스",
    productionWalkthroughBodyLive: "안전하게 라우팅된 실시간 인스턴스와 API 엔드포인트를 중심으로 정상 작동 메타데이터가 파이프라인 전반에 흐르고 있습니다.",
    productionWalkthroughBodyBackground: "수신 웹훅 연동, 실시간 데이터 정합성 보존 등 백그라운드 오토메이션 시퀀스를 무인 수행합니다.",
    openLiveSandbox: "라이브 샌드박스로 가기",
    projectNotFound: "상세 케이스가 부재합니다.",
    backBtn: "이전 화면",
    productMindset: "[ 기획 및 설계 사유 ]",
    behindTheArchitecture: "Behind the Architecture",
    humanProblem: "업무 병목 현상 (Human Problem)",
    productVision: "기획적 목표 및 시점 (Product Vision)",
    coreRationale: "엔지니어링 의사결정 (Core Rationale)",
    technicalHurdles: "장애 트러블슈팅 기록",
    incident: "장애 일지 (Incident)",
    diagnosis: "원인 규명 및 진단 (Diagnosis)",
    resolution: "프로덕션 조치 (Resolution)",
    storeLink: "스토어 둘러보기 ↗"
  }
};

const stackExplains: Record<string, { en: string; ko: string }> = {
  "React 18": {
    en: "Core state hydration and rendering lifecycle for mobile viewport agility.",
    ko: "모바일 뷰포트 기민성에 대응하는 컴포넌트 하이드레이션 및 상태 생명주기 관리."
  },
  "React 19": {
    en: "Native action handlers for async transitions.",
    ko: "비동기 상태 전이를 매끄럽게 핸들링하는 네이티브 액션 핸들러 탑재."
  },
  "TypeScript": {
    en: "Type-safety contracts that eliminate runtime layout exceptions during builds.",
    ko: "발생 가능한 컴포넌트 런타임 오류를 차단하는 엄격한 타입 계약 정의."
  },
  "Vite": {
    en: "Bundling environment providing optimized code delivery with minimal footprint.",
    ko: "최소한의 파일 구성 요소로 모바일 번들 크기를 최적화하는 빌드 도구."
  },
  "Google GenAI API (Claude 3.5 Sonnet proxy)": {
    en: "Advanced layout and vision-processing model API proxied behind express server.",
    ko: "익스프레스 프록시 서버 백단에서 조율되는 어드밴스드 비전 및 레이아웃 분석 API."
  },
  "Google GenAI SDK (gemini-3-pro-preview)": {
    en: "High-reasoning SDK selected to resolve NP-complete scheduling branches.",
    ko: "조율하기 까다로운 자원 분배 조합 최적화를 위해 실시간 호출되는 지능형 SDK."
  },
  "Google GenAI SDK": {
    en: "Enterprise server-side SDK to secure connections with Gemini endpoints.",
    ko: "AI 모델 엔드포인트와 안전하고 유연하게 고성능 통신을 수행할 수 있는 SDK."
  },
  "Google Gemini API": {
    en: "Deep reasoning engine to normalize unstructured text inputs securely.",
    ko: "비정형 교사 관찰 데이터를 글로벌 벤치마크 기준 언어로 변환하는 핵심 엔진."
  },
  "Tailwind CSS": {
    en: "Design consistency utilizing structural theme variables and zero CSS overhead.",
    ko: "스타일 크기 오버헤드를 제로로 유도하며 일관된 변수를 보장하는 유틸리티 테마."
  },
  "Recharts & D3": {
    en: "Visualizing CEFR speaking, reading, and listening domains in custom radar charts.",
    ko: "원생별 특성을 언어 공인 척도로 대조하여 반응형 다각 레이더 그래프로 시각화."
  },
  "Airtable Relational Sheets": {
    en: "Unified relational schema backplane ensuring direct multi-table student rosters.",
    ko: "여러 테이블 간의 상호 참조 정합성을 강력 유지하는 실시간 데이터베이스."
  },
  "Airtable Relational DB": {
    en: "Normalized CRM record storage that keeps direct cross-table alignments.",
    ko: "상호 연결된 고객 및 기록 테두리를 견고하게 엮어주는 다대다 참조형 DB."
  },
  "Make.com Automation Nodes": {
    en: "Headless webhook orchestrators automating backend flow routing and triggers.",
    ko: "백엔드 트리거 처리와 API 데이터 전처리를 담당하는 자동화 분산 워크플로 노드."
  },
  "Make.com Nodes": {
    en: "Scalable async webhook handlers evaluating student feedback pipelines.",
    ko: "원생별 개별 피드백 파이프라인의 안전 전송 및 흐름 제어를 처리하는 비동기 핸들러."
  },
  "Framer Motion": {
    en: "Hardware-accelerated animations reinforcing route transitions and UX hierarchy.",
    ko: "화면 전이와 뷰포트 레이아웃 우선순위 변화를 깔끔하게 처리하는 저지연 애니메이션."
  },
  "Fillout Forms": {
    en: "Dynamic multi-page intake forms feeding schema-validated databases.",
    ko: "데이터베이스 자료 필드 명세와 100% 대응되어 에러를 사전 방지하는 고성능 폼."
  },
  "Softr Portal": {
    en: "Authorized parent access gateway rendering records with row-level view boundaries.",
    ko: "개별 계정별 행 수준 권한 경계를 설정하여 타 사용자 데이터 유출을 막는 보안 포털."
  },
  "React-Leaflet & Leaflet.js": {
    en: "Dynamic coordinate mappings visualizer optimized for mobile touch inputs.",
    ko: "모바일 터치 환경에 완벽 대응하는 저지연 위치 마커 시각화 지도 라이브러리."
  },
  "Custom Express API": {
    en: "Handles API key shielding, request sanitization, and CORS headers resolution.",
    ko: "안전하게 비밀 API 키를 차단하고, 요청 정화 및 교차 크레덴셜 이슈를 조율하는 백엔드."
  },
  "esbuild": {
    en: "High-performance bundler compiling express routes into single stable bundles.",
    ko: "여러 서버 사이드 모듈을 하나의 경량 CJS 스크립트로 압축해 기동 latency를 단축하는 컴파일러."
  },
  "Naver Search API": {
    en: "Live coordinate and localized geographic directory lookup for prospects indexing.",
    ko: "지도 타운 및 신규 고객 주소지의 정확한 하드웨어 공간 좌표를 가져오는 지리 데이터 조회 API."
  },
  "Firebase v11 Suite": {
    en: "Row-isolated cloud storage and encrypted session tokens for user security.",
    ko: "세션 유효 체크 및 사용자 데이터 격리를 통해 고신뢰성 다중 인증을 보조하는 인프라."
  },
  "Express.js / Node.js": {
    en: "Provides zero-expose routing with process-level key caching and stable file proxies.",
    ko: "프로세스 수준의 API 키 캐싱 및 안정적 한글 글꼴 프록시를 보장하는 무노출 백엔드."
  },
  "PostgreSQL Supabase (RLS)": {
    en: "Durable database engine applying Row-Level Security policies to keep school records completely isolated.",
    ko: "행 레벨 보안(RLS) 정책을 통해 학원별 데이터베이스 기록을 영구 격리 보장하는 정밀 DB."
  },
  "@react-pdf/renderer": {
    en: "Direct in-browser print compiler creating beautifully structured documents with dynamic custom brand parameters.",
    ko: "학원별 고유 브랜드 테마 및 Noto Sans KR 서체를 결합해 즉각적인 인쇄용 PDF를 만드는 엔진."
  },
  "Google Gemini 1.5 Flash": {
    en: "High-throughput vision/text model utilized to normalize pedagogical notes into rigid 2-sentence narratives.",
    ko: "단 두 문장의 엄격한 피드백 명세 구조로 교육 내용을 정형 완수하는 고성능 추론 모델."
  }
};

interface FlowchartNode {
  title: string;
  subtitle: string;
  tech: string;
  icon: 'mobile' | 'settings' | 'sparkles' | 'fileText' | 'code' | 'lock';
}

const getFlowchartNodes = (pId: string, lang: 'en' | 'ko'): FlowchartNode[] => {
  const nodesMap: Record<string, FlowchartNode[]> = {
    'chekki': [
      {
        title: lang === 'en' ? "React UI App" : "모바일 React 클라이언트",
        subtitle: lang === 'en' ? "Captures and resizes raw paper worksheet stream" : "사용자 카메라 제어 및 학습지 이미지 로컬 압축",
        tech: "React 18 / Tailwind",
        icon: "mobile"
      },
      {
        title: lang === 'en' ? "Server Gateway" : "Express 백엔드 미들웨어",
        subtitle: lang === 'en' ? "Protects API credentials & proxies payloads" : "보안 토큰 은폐, 요청 검증 및 우회 호출 실행",
        tech: "Express / Node.js",
        icon: "settings"
      },
      {
        title: lang === 'en' ? "Gemini Vision Engine" : "Google Gemini LLM",
        subtitle: lang === 'en' ? "Classifies text & exports validated JSON keys" : "학습지 비전 분석, 텍스트 추출 및 정형 데이터 변환",
        tech: "gemini-3.5-flash",
        icon: "sparkles"
      },
      {
        title: lang === 'en' ? "Operational Output" : "클라이언트 다국어 뷰어",
        subtitle: lang === 'en' ? "Renders step-by-step parent overlays & TTS" : "이중언어 지도안 오버레이, 학습 가이드 표기",
        tech: "Client Canvas / TTS",
        icon: "fileText"
      }
    ],
    'benchmark-explorer': [
      {
        title: lang === 'en' ? "Teacher Ingest Form" : "교사 저널 입력 단말",
        subtitle: lang === 'en' ? "Captures qualitative review items in real-time" : "실시간 정성적 서술지 입력 및 비동기 Webhook 발행",
        tech: "Fillout Ingest Node",
        icon: "fileText"
      },
      {
        title: lang === 'en' ? "Orchestrator Nodes" : "Make.com 자동화 엔진",
        subtitle: lang === 'en' ? "Sequences webhook triggers & triggers Gemini" : "웹훅 완충 대기, 프롬프트 병합 및 데이터 번역 조율",
        tech: "Make.com Flow Nodes",
        icon: "settings"
      },
      {
        title: lang === 'en' ? "CEFR Database" : "Airtable 관계형 DB",
        subtitle: lang === 'en' ? "Stores student records, rosters & histories" : "클래스 마스터 테이블, 원생 발달 인덱스 매핑 보관",
        tech: "Airtable Sheets",
        icon: "lock"
      },
      {
        title: lang === 'en' ? "Principal Dashboard" : "교원 평가 대시보드",
        subtitle: lang === 'en' ? "Renders D3 speaking / reading radar matrices" : "실시간 D3 다각 방사선 평가 차트 조감 렌더링",
        tech: "React / Recharts / D3",
        icon: "sparkles"
      }
    ],
    'eduplanner': [
      {
        title: lang === 'en' ? "Scheduler Input UI" : "시간표 조건 설정 뷰",
        subtitle: lang === 'en' ? "Pushes room sizes, course targets & slots" : "교과 시수 배정, 시설 정원, 교사 제약 입력 수집",
        tech: "React 19 Frontend",
        icon: "settings"
      },
      {
        title: lang === 'en' ? "Local Pre-Compiler" : "성능 최적화 TS 솔버",
        subtitle: lang === 'en' ? "Prunes trivial overlapping conflicts inline" : "수학적 탐색 루프 사전 가동으로 명백한 충돌 병목 제거",
        tech: "TypeScript Class Solver",
        icon: "code"
      },
      {
        title: lang === 'en' ? "Gemini API Engine" : "Gemini Dense Reasoner",
        subtitle: lang === 'en' ? "Solves high-complexity NP-hard combinations" : "해결이 까다로운 복합 제약 충돌 조정 결과 자동 조립",
        tech: "gemini-3-pro-preview",
        icon: "sparkles"
      },
      {
        title: lang === 'en' ? "Durable Auth Memory" : "파이어베이스 DB 통합",
        subtitle: lang === 'en' ? "Saves schedules & manages secure admin sessions" : "시간표 영속 일지 작성 및 원 로그인 세션 권한 조율",
        tech: "Firebase v11 & Firestore",
        icon: "lock"
      }
    ],
    'consultation-pipeline': [
      {
        title: lang === 'en' ? "Evaluation Form" : "학습 진단 양식",
        subtitle: lang === 'en' ? "Fires instant validation events on commit" : "평가 보고 폼 제출 감지 및 트래픽 webhook 전달",
        tech: "Fillout Assessment",
        icon: "fileText"
      },
      {
        title: lang === 'en' ? "Routing Middleware" : "경로 제어 노드",
        subtitle: lang === 'en' ? "Deduplicates notes & buffers payload calls" : "이중 중복 제출 거부, 프롬프트 주입 방지 완충 연산",
        tech: "Make.com Automation",
        icon: "settings"
      },
      {
        title: lang === 'en' ? "Relational Sheets" : "Airtable DB",
        subtitle: lang === 'en' ? "Applies lookup hooks to track historical metrics" : "데이터 일관성과 무결성이 보증되는 중앙 장부 기록",
        tech: "Airtable Relational Sheets",
        icon: "lock"
      },
      {
        title: lang === 'en' ? "Softr Parent Portal" : "원 부모 성취 포털",
        subtitle: lang === 'en' ? "Row-level isolated bilingual progress view" : "개인인별 완벽 격리 보호 및 translated 리포트 열람",
        tech: "Softr Client Web App",
        icon: "sparkles"
      }
    ],
    'lead-enrichment': [
      {
        title: lang === 'en' ? "Interactive Map UI" : "Geographic Map 대시보드",
        subtitle: lang === 'en' ? "Plots coordinate locations & user maps" : "지역 및 수집 기준 입력 수집, 지도 마커 실시간 표기",
        tech: "React-Leaflet / Leaflet.js",
        icon: "mobile"
      },
      {
        title: lang === 'en' ? "Proxy API Backend" : "Express 좌표 서버",
        subtitle: lang === 'en' ? "Shields API keys & handles coordinate projections" : "외부 Naver API 키 보안 밀폐, 구글 통신 CORS 조율",
        tech: "Custom Express Proxy",
        icon: "settings"
      },
      {
        title: lang === 'en' ? "Naver Directory API" : "네이버 지도 데이터",
        subtitle: lang === 'en' ? "Compiles live local businesses & map addresses" : "실시간 정확한 장소 및 지역 비즈니스 상호 위치 수합",
        tech: "Naver Search Maps API",
        icon: "fileText"
      },
      {
        title: lang === 'en' ? "Outreach AI Engine" : "Gemini 메일 제너레이터",
        subtitle: lang === 'en' ? "Translates details and outputs polite proposals" : "데이터 통합 번역, 공익 성격 맞춤 한국어 존댓말 제안 조합",
        tech: "Google GenAI API (Gemini)",
        icon: "sparkles"
      }
    ],
    'white-label-hub': [
      {
        title: lang === 'en' ? "Teacher Tagging UI" : "교사용 태그 입력 단말",
        subtitle: lang === 'en' ? "Vite app to upload student work & assign localized didactic tags" : "교사가 학습 결과물 사진을 올리고 한/영 교육적 태그 선택",
        tech: "Vite / React 18",
        icon: "mobile"
      },
      {
        title: lang === 'en' ? "Express.js Proxy Server" : "Express 백엔드 미들웨어",
        subtitle: lang === 'en' ? "Masks proprietary API keys & guides structured Gemini synthesis requests" : "상용 API 키 은폐 및 Gemini 인접 문단 일직선 합성 조율",
        tech: "Express / Node.js",
        icon: "settings"
      },
      {
        title: lang === 'en' ? "Supabase Postgres DB" : "Supabase 관계형 DB",
        subtitle: lang === 'en' ? "Locks relational academic portfolios behind strict Row Level Security" : "철저한 행 레벨 보안(RLS)으로 다중 학교 간 학생 기록 완벽 격리",
        tech: "Postgres / Supabase RLS",
        icon: "lock"
      },
      {
        title: lang === 'en' ? "Dynamic PDF Compiler" : "Direct 브라우저 렌더러",
        subtitle: lang === 'en' ? "Executes custom @react-pdf/renderer compiler to build fully-branded bilingual PDFs" : "브라우저 단에서 직접 브랜드 맞춤 색상 및 글꼴의 PDF 즉시 인쇄 컴파일",
        tech: "@react-pdf/renderer",
        icon: "sparkles"
      }
    ]
  };

  return nodesMap[pId] || nodesMap['chekki'];
};

const ArchitectureFlowchart: React.FC<{ projectId: string; theme: 'light' | 'dark'; locale: 'en' | 'ko' }> = ({
  projectId,
  theme,
  locale
}) => {
  const nodes = getFlowchartNodes(projectId, locale);
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'mobile':
        return <DeviceMobileIcon className="w-5 h-5 text-accent-gold" />;
      case 'settings':
        return <SettingsIcon className="w-5 h-5 text-accent-gold" />;
      case 'sparkles':
        return <SparklesIcon className="w-5 h-5 text-accent-gold animate-pulse" />;
      case 'fileText':
        return <FileTextIcon className="w-5 h-5 text-accent-gold" />;
      case 'code':
        return <CodeIcon className="w-5 h-5 text-accent-gold" />;
      case 'lock':
        return <LockIcon className="w-5 h-5 text-accent-gold" />;
      default:
        return <SettingsIcon className="w-5 h-5 text-accent-gold" />;
    }
  };

  return (
    <div className="space-y-4">
      <style>{`
        @keyframes flow-line-motion {
          to {
            stroke-dashoffset: -20;
          }
        }
        .animated-flow-line {
          animation: flow-line-motion 1.5s linear infinite;
        }
      `}</style>

      <div className={`rounded-xl border p-6 overflow-hidden relative z-10 transition-all ${
        theme === 'dark' 
          ? 'bg-black/30 border-white/5 shadow-2xl shadow-black/80' 
          : 'bg-black/[0.01] shadow border-black/5'
      }`}>
        {/* Connection flow lines absolute decoration for desktop */}
        <svg className="absolute top-1/2 left-0 w-full h-8 -translate-y-1/2 pointer-events-none hidden lg:block z-0" viewBox="0 0 1000 32" fill="none" preserveAspectRatio="none">
          <path d="M 80 16 L 920 16" stroke="url(#glowing-line-gradient)" strokeWidth="1.5" strokeDasharray="6,4" className="animated-flow-line" />
          <defs>
            <linearGradient id="glowing-line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.1" />
              <stop offset="30%" stopColor="#D4AF37" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Content list */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
          {nodes.map((node, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-full p-4 rounded-xl border flex flex-col items-center text-center space-y-3 relative transition-all duration-300 md:hover:scale-[1.02] ${
                theme === 'dark' 
                  ? 'bg-white/[0.01] border-white/5 hover:border-accent-gold/40 hover:bg-white/[0.03]' 
                  : 'bg-white border-black/5 shadow-sm hover:border-accent-gold/50 hover:bg-black/[0.01]'
              }`}>
                {/* Node counter */}
                <div className="absolute top-2 left-2.5 font-mono text-[9px] font-bold text-accent-gold/60">
                  0{index + 1}
                </div>

                {/* Badge Icon wrapper */}
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all ${
                  theme === 'dark' 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-black/5 border-black/5 shadow-inner'
                }`}>
                  {getIcon(node.icon)}
                </div>

                {/* Labels */}
                <div className="space-y-1">
                  <h5 className={`text-[11px] font-bold uppercase tracking-wider font-display ${
                    theme === 'dark' ? 'text-white' : 'text-alpine-950'
                  }`}>
                    {node.title}
                  </h5>
                  <p className={`text-[9px] leading-relaxed max-w-[200px] mx-auto opacity-60 ${
                    theme === 'dark' ? 'text-white/80' : 'text-alpine-950/80'
                  }`}>
                    {node.subtitle}
                  </p>
                </div>

                {/* Tech specifications label */}
                <div className={`px-2 py-0.5 rounded font-mono text-[7px] uppercase font-bold tracking-widest ${
                  theme === 'dark' 
                    ? 'bg-accent-gold/10 border border-accent-gold/20 text-accent-gold' 
                    : 'bg-accent-gold/5 border border-accent-gold/15 text-accent-gold/90'
                }`}>
                  {node.tech}
                </div>
              </div>

              {/* Connecting dashed elements for mobile responsive timelines */}
              {index < 3 && (
                <div className="h-6 w-0.5 border-r border-dashed border-accent-gold lg:hidden mt-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CaseStudyViewer: React.FC<CaseStudyViewerProps> = ({ 
  projectId, 
  onClose, 
  theme = 'dark',
  locale = 'en',
  backgroundScrollY
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isArchOpen, setIsArchOpen] = useState(false);
  const [isHurdlesOpen, setIsHurdlesOpen] = useState(false);
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(true);
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState(0);

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

    // Reset collapsible states when project changes
    setIsArchOpen(false);
    setIsHurdlesOpen(false);
    setIsBreakdownOpen(true);
    setActiveScreenshotIdx(0);
  }, [projectId]);

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

  const hasLiveApp = projectData.liveUrl && projectData.liveUrl !== "https://jason-benjamin.vercel.app/";

  return (
    <div 
      ref={scrollRef}
      className={`fixed inset-0 z-[200] overflow-y-auto overflow-x-hidden w-full min-w-0 transition-all duration-300 ${
        theme === 'dark' ? 'bg-alpine-950 text-white' : 'bg-alpine-50 text-alpine-950'
      }`}
    >
      {/* HEADER BAR */}
      <div className={`sticky top-0 z-[210] flex items-center justify-between px-6 py-4 border-b backdrop-blur-xl ${
        theme === 'dark' ? 'bg-alpine-950/90 border-white/10' : 'bg-white/90 border-black/10'
      }`}>
        <button 
          onClick={onClose}
          className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all ${
            theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-alpine-950/50 hover:text-alpine-950'
          }`}
        >
          {t.backToPortfolio}
        </button>
        <div className="flex items-center gap-4 md:gap-6">
          {hasLiveApp && (
            <a 
              href={projectData.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent-gold transition-colors hover:text-accent-gold/80"
            >
              {t.launchLive}
            </a>
          )}
          {projectData.storeUrl && (
            <a 
              href={projectData.storeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent-gold transition-colors hover:text-accent-gold/80"
            >
              {t.storeLink}
            </a>
          )}
          <button 
            onClick={onClose}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-black/5 hover:bg-black/10 text-alpine-950'
            }`}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24 space-y-24">
        {/* HERO TITLE BLOCK */}
        <div className="space-y-6 md:space-y-10">
          <div className="flex items-center gap-2 text-[10px] md:text-[12px] font-black tracking-[0.4em] uppercase text-accent-gold">
            <SparklesIcon className="w-4 h-4" />
            {t.architecturalStudy}
          </div>
          <h1 className="text-4xl md:text-8xl font-medium tracking-tighter leading-none font-display text-pretty">
            {projectData.title}
          </h1>
          <p className={`text-base md:text-2xl max-w-4xl font-light leading-relaxed text-pretty ${
            theme === 'dark' ? 'text-white/60' : 'text-alpine-950/70'
          }`}>
            {projectData.tagline}
          </p>

          {/* DUAL BUTTON SPLIT CTA */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 max-w-2xl w-full">
            <button 
              onClick={scrollToBreakdown}
              className={`shiny-cta py-4 sm:py-5 text-center shadow-2xl whitespace-nowrap rounded-xl ${
                (hasLiveApp || projectData.storeUrl) 
                  ? 'w-full sm:w-auto px-4 sm:px-8 text-[9px] sm:text-[10px] tracking-wide sm:tracking-widest' 
                  : 'w-full sm:w-auto px-6 sm:px-12 text-[10px] sm:text-[11px] tracking-wider sm:tracking-widest'
              }`}
            >
              <span className="leading-snug text-center">{t.technicalBreakdown}</span>
            </button>
            {hasLiveApp && (
              <a 
                href={projectData.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 sm:py-5 px-4 rounded-xl border flex items-center justify-center gap-2 sm:gap-3 font-extrabold uppercase text-[9px] sm:text-[10px] tracking-wide sm:tracking-widest transition-all text-center ${
                  theme === 'dark' 
                    ? 'border-white/20 hover:bg-white/5 text-white' 
                    : 'border-black/20 hover:bg-black/5 text-alpine-950'
                }`}
              >
                <span className="whitespace-nowrap leading-snug">{t.launchLiveApp}</span>
              </a>
            )}
            {projectData.storeUrl && (
              <a 
                href={projectData.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 sm:py-5 px-4 rounded-xl border flex items-center justify-center gap-2 sm:gap-3 font-extrabold uppercase text-[9px] sm:text-[10px] tracking-wide sm:tracking-widest transition-all text-center ${
                  theme === 'dark' 
                    ? 'border-accent-gold/30 hover:bg-accent-gold/5 text-accent-gold' 
                    : 'border-accent-gold/40 hover:bg-accent-gold/10 text-accent-gold'
                }`}
              >
                <span className="whitespace-nowrap leading-snug">🚀 {t.storeLink}</span>
              </a>
            )}
          </div>
        </div>

        {/* METRICS GRID */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 border-y py-12 ${
          theme === 'dark' ? 'border-white/10' : 'border-black/10'
        }`}>
          {projectData.stats.map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-3xl md:text-5xl font-mono font-bold text-accent-gold">
                {stat.value}
              </div>
              <div className={`text-[10px] font-black uppercase tracking-widest ${
                theme === 'dark' ? 'text-white/40' : 'text-alpine-950/40'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* BEHIND THE ARCHITECTURE Callout Insight Container */}
        {projectData.behindTheArchitecture && (
          <div className={`rounded-2xl border transition-all duration-300 lg:mx-0 ${
            theme === 'dark' 
              ? 'bg-white/[0.02] border-white/5 shadow-2xl relative overflow-hidden' 
              : 'bg-black/[0.02] border-black/5 shadow-lg relative overflow-hidden'
          }`}>
            <button 
              onClick={() => setIsArchOpen(!isArchOpen)}
              className="w-full text-left p-6 md:p-10 flex items-center justify-between gap-6 focus:outline-none hover:bg-white/[0.01]/10 active:bg-white/[0.02]/20 transition-all relative z-10"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🧠</span>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent-gold">{t.productMindset}</span>
                  <span className={`text-[11px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/80' : 'text-alpine-950/80'}`}>{t.behindTheArchitecture}</span>
                </div>
              </div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 shrink-0 ${
                isArchOpen 
                  ? 'rotate-180 bg-accent-gold/15 border-accent-gold/30' 
                  : (theme === 'dark' ? 'border-white/10 hover:border-white/20' : 'border-black/10 hover:border-black/20')
              }`}>
                <ChevronDownIcon className={`w-3.5 h-3.5 ${isArchOpen ? 'text-accent-gold' : 'text-white/40'}`} />
              </div>
            </button>
            
            {isArchOpen && (
              <div className="p-6 md:p-10 pt-0 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-300 relative z-10">
                {/* THE HUMAN PROBLEM */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">😫</span>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#E15A5A]">{t.humanProblem}</h4>
                  </div>
                  <p className={`text-xs md:text-sm leading-relaxed max-w-prose text-pretty font-light ${
                    theme === 'dark' ? 'text-white/70' : 'text-alpine-950/80'
                  }`}>
                    {projectData.behindTheArchitecture.problem}
                  </p>
                </div>

                {/* THE PRODUCT VISION */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">💡</span>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-accent-gold">{t.productVision}</h4>
                  </div>
                  <p className={`text-xs md:text-sm leading-relaxed max-w-prose text-pretty font-light ${
                    theme === 'dark' ? 'text-white/70' : 'text-alpine-950/80'
                  }`}>
                    {projectData.behindTheArchitecture.vision}
                  </p>
                </div>

                {/* THE CORE RATIONALE */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🧠</span>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#44D9C5]">{t.coreRationale}</h4>
                  </div>
                  <p className={`text-xs md:text-sm leading-relaxed max-w-prose text-pretty font-light ${
                    theme === 'dark' ? 'text-white/70' : 'text-alpine-950/80'
                  }`}>
                    {projectData.behindTheArchitecture.rationale}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TECHNICAL HURDLES / WHEN THINGS BREAK */}
        {projectData.technicalHurdles && (
          <div className={`rounded-2xl border transition-all duration-300 lg:mx-0 ${
            theme === 'dark' 
              ? 'bg-[#120D0D]/50 border-red-500/10 shadow-[0_20px_50px_rgba(239,68,68,0.05)] relative overflow-hidden' 
              : 'bg-[#FFF5F5]/60 border-red-500/10 shadow-lg relative overflow-hidden'
          }`}>
            <button 
              onClick={() => setIsHurdlesOpen(!isHurdlesOpen)}
              className="w-full text-left p-6 md:p-10 flex items-center justify-between gap-6 focus:outline-none hover:bg-white/[0.01]/10 active:bg-white/[0.02]/20 transition-all relative z-10"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="flex items-center justify-between gap-4 w-full flex-wrap pr-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🚨</span>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-red-500">{locale === 'en' ? "WHEN THINGS BREAK" : "장애 및 결함 조치 진찰기"}</span>
                    <span className={`text-[11px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/80' : 'text-alpine-950/80'}`}>{t.technicalHurdles}</span>
                  </div>
                </div>
                <div className="bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/20 px-3 py-1 rounded-full text-[9px] font-mono uppercase font-black tracking-widest">
                  {locale === 'en' ? "Production Diagnostic Win" : "프로덕션 실시간 완치 실적"}
                </div>
              </div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 shrink-0 ${
                isHurdlesOpen 
                  ? 'rotate-180 bg-red-500/15 border-red-500/30' 
                  : (theme === 'dark' ? 'border-red-500/10 hover:border-red-500/20' : 'border-red-500/10 hover:border-red-500/20')
              }`}>
                <ChevronDownIcon className={`w-3.5 h-3.5 ${isHurdlesOpen ? 'text-red-500' : 'text-white/40'}`} />
              </div>
            </button>
            
            {isHurdlesOpen && (() => {
              const hurdlesList = Array.isArray(projectData.technicalHurdles)
                ? projectData.technicalHurdles
                : [projectData.technicalHurdles];
              
              return (
                <div className="border-t border-red-500/5 divide-y divide-red-500/5 relative z-10 animate-in fade-in slide-in-from-top-2 duration-300">
                  {hurdlesList.map((hurdle, hIdx) => (
                    <div key={hIdx} className={`${hIdx > 0 ? 'pt-8 md:pt-12' : ''} p-6 md:p-10 pb-8 md:pb-12 space-y-6`}>
                      {hurdle.title && (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 font-mono">
                            {hurdle.title}
                          </span>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {/* THE INCIDENT */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center text-xs text-red-500">❌</div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#E15A5A]">{t.incident}</h4>
                          </div>
                          <p className={`text-xs md:text-sm leading-relaxed max-w-prose text-pretty font-light ${
                            theme === 'dark' ? 'text-white/60' : 'text-alpine-950/70'
                          }`}>
                            {hurdle.incident}
                          </p>
                        </div>

                        {/* THE DIAGNOSIS */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-orange-500/10 flex items-center justify-center text-xs text-orange-500">🔍</div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-500">{t.diagnosis}</h4>
                          </div>
                          <p className={`text-xs md:text-sm leading-relaxed max-w-prose text-pretty font-light ${
                            theme === 'dark' ? 'text-white/60' : 'text-alpine-950/70'
                          }`}>
                            {hurdle.diagnosis}
                          </p>
                        </div>

                        {/* THE RESOLUTION */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-xs text-green-500 font-bold">✓</div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-green-500">{t.resolution}</h4>
                          </div>
                          <p className={`text-xs md:text-sm leading-relaxed max-w-prose text-pretty font-light ${
                            theme === 'dark' ? 'text-white/60' : 'text-alpine-950/70'
                          }`}>
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

        {/* PROOF OF WORK / VIDEO SECTION */}
        <div className="space-y-6">
          <div className={`text-[10px] font-black uppercase tracking-[0.4em] ${
            theme === 'dark' ? 'text-white/40' : 'text-alpine-950/40'
          }`}>
            {t.proofOfWorkTitle}
          </div>

          {projectData.screenshots && projectData.screenshots.length > 0 ? (
            <div className="space-y-4">
              {/* Preload container to cache all project screenshots for instant slide transitions */}
              <div className="absolute top-0 left-0 w-1 h-1 opacity-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
                {projectData.screenshots.map((scr, idx) => (
                  <img key={idx} src={scr.url} alt="" referrerPolicy="no-referrer" />
                ))}
              </div>

              {/* Image Frame with Navigation */}
              <div className={`rounded-2xl border overflow-hidden aspect-video relative flex items-center justify-center bg-black/85 group ${
                theme === 'dark' ? 'border-white/10' : 'border-black/10'
              }`}>
                {/* Floating Index Tag */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono uppercase font-semibold text-accent-gold tracking-widest flex items-center gap-1.5 shadow-lg select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse"></span>
                  {String(activeScreenshotIdx + 1).padStart(2, '0')} / {String(projectData.screenshots.length).padStart(2, '0')} • {projectData.screenshots[activeScreenshotIdx].label}
                </div>

                {/* Main Image Slider Viewport */}
                <div className="w-full h-full relative flex items-center justify-center select-none overflow-hidden p-2">
                  <img 
                    src={projectData.screenshots[activeScreenshotIdx].url} 
                    alt={projectData.screenshots[activeScreenshotIdx].label}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain max-h-full transition-transform duration-700 ease-out hover:scale-[1.02]"
                  />
                </div>

                {/* Left Arrow Button */}
                <button
                  onClick={() => setActiveScreenshotIdx(prev => (prev === 0 ? projectData.screenshots!.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-all scale-95 hover:scale-105 active:scale-95 shadow-md focus:outline-none"
                  aria-label="Previous Slide"
                >
                  <span className="text-xl leading-none">‹</span>
                </button>

                {/* Right Arrow Button */}
                <button
                  onClick={() => setActiveScreenshotIdx(prev => (prev === projectData.screenshots!.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-all scale-95 hover:scale-105 active:scale-95 shadow-md focus:outline-none"
                  aria-label="Next Slide"
                >
                  <span className="text-xl leading-none">›</span>
                </button>
              </div>

              {/* Bottom Interactive Thumbnail / Tab Track */}
              <div className={`grid gap-2.5 pt-1 ${
                projectData.screenshots.length > 4 
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5' 
                  : 'grid-cols-1 sm:grid-cols-3'
              }`}>
                {projectData.screenshots.map((scr, sIdx) => {
                  const isActive = activeScreenshotIdx === sIdx;
                  return (
                    <button
                      key={sIdx}
                      onClick={() => setActiveScreenshotIdx(sIdx)}
                      className={`text-left p-3 rounded-xl border transition-all duration-300 flex items-start gap-3 relative overflow-hidden ${
                        isActive
                          ? 'border-accent-gold bg-accent-gold/5 shadow-[0_0_15px_rgba(230,175,46,0.08)]'
                          : theme === 'dark'
                            ? 'border-white/5 bg-white/[0.01] hover:bg-white/[0.04]'
                            : 'border-black/5 bg-black/[0.01] hover:bg-black/[0.03]'
                      }`}
                    >
                      {/* Left accent color indicator bar for active slide */}
                      <div className={`absolute top-0 bottom-0 left-0 w-1 transition-all ${isActive ? 'bg-accent-gold' : 'bg-transparent'}`}></div>
                      <div className={`font-mono text-[9px] uppercase font-bold tracking-widest shrink-0 ${isActive ? 'text-accent-gold' : theme === 'dark' ? 'text-white/30' : 'text-alpine-950/30'}`}>
                        {String(sIdx + 1).padStart(2, '0')}
                      </div>
                      <div className="space-y-0.5">
                        <div className={`text-[11px] font-bold tracking-tight line-clamp-1 leading-snug ${isActive ? 'text-accent-gold' : theme === 'dark' ? 'text-white/80' : 'text-alpine-950/80'}`}>
                          {scr.label}
                        </div>
                        <div className={`text-[9px] font-normal font-mono opacity-40 line-clamp-1 ${theme === 'dark' ? 'text-white' : 'text-alpine-950'}`}>
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
                    <div className="text-[10px] font-bold uppercase tracking-wider font-mono text-accent-gold">
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
            <div className={`rounded-2xl border overflow-hidden aspect-video relative flex flex-col items-center justify-center bg-black/40 ${
              theme === 'dark' ? 'border-white/10' : 'border-black/10'
            }`}>
              {projectData.walkthroughVideo ? (
                (() => {
                  const url = projectData.walkthroughVideo.split('?')[0].split('#')[0].toLowerCase();
                  const isVideo = url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg') || url.includes('/video/upload/');
                  return isVideo ? (
                    <video 
                      src={projectData.walkthroughVideo} 
                      controls 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={projectData.walkthroughVideo} 
                      alt={projectData.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  );
                })()
              ) : (
                <div className="p-8 text-center space-y-4 max-w-md animate-in fade-in duration-500">
                  <div className="w-16 h-16 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto animate-pulse">
                    <ExternalLinkIcon className="w-6 h-6 text-accent-gold" />
                  </div>
                  <h4 className="text-lg font-bold font-display uppercase tracking-wider text-pretty">{t.productionWalkthrough}</h4>
                  <p className="text-xs text-white/50 leading-relaxed font-mono max-w-prose text-pretty">
                    {(hasLiveApp || projectData.storeUrl) 
                      ? t.productionWalkthroughBodyLive
                      : t.productionWalkthroughBodyBackground}
                  </p>
                  {(hasLiveApp || projectData.storeUrl) && (
                    <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
                      {hasLiveApp && (
                        <a 
                          href={projectData.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex px-6 py-2.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-[9px] font-black uppercase tracking-widest"
                        >
                          {t.openLiveSandbox}
                        </a>
                      )}
                      {projectData.storeUrl && (
                        <a 
                          href={projectData.storeUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex px-6 py-2.5 rounded-lg border border-accent-gold/30 bg-accent-gold/5 hover:bg-accent-gold/10 text-accent-gold text-[9px] font-black uppercase tracking-widest transition-colors"
                        >
                          {t.storeLink}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* THE CORE CONTENT BREAKDOWN */}
        <div ref={contentRef} className="pt-12">
          <div className={`rounded-2xl border transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-white/[0.01] border-white/5' 
              : 'bg-black/[0.01] border-black/5 shadow-md'
          }`}>
            <button 
              onClick={() => setIsBreakdownOpen(!isBreakdownOpen)}
              className="w-full text-left p-6 md:p-10 flex items-center justify-between gap-6 focus:outline-none hover:bg-white/[0.01]/10 active:bg-white/[0.02]/20 transition-all relative z-10"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🛠️</span>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent-gold">{locale === 'en' ? "DEEP ANALYSIS" : "심층 분석 매뉴얼"}</span>
                  <span className={`text-[11px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/80' : 'text-alpine-950/80'}`}>{t.technicalBreakdown}</span>
                </div>
              </div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 shrink-0 ${
                isBreakdownOpen 
                  ? 'rotate-180 bg-accent-gold/15 border-accent-gold/30' 
                  : (theme === 'dark' ? 'border-white/10 hover:border-white/20' : 'border-black/10 hover:border-black/20')
              }`}>
                <ChevronDownIcon className={`w-3.5 h-3.5 ${isBreakdownOpen ? 'text-accent-gold' : 'text-white/40'}`} />
              </div>
            </button>

            {isBreakdownOpen && (
              <div className="p-4 sm:p-6 md:p-10 pt-0 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-300 relative z-10 w-full min-w-0 overflow-hidden">
                {/* LEFT RAIL - THE STACK / INFO */}
                <div className="lg:col-span-4 space-y-10 lg:sticky lg:top-24 h-fit w-full min-w-0">
                  <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent-gold">{t.systemStack}</span>
                    <div className="grid grid-cols-1 gap-3 pt-2">
                       {projectData.stack.map((st, sidx) => {
                        const explanation = stackExplains[st]
                          ? (locale === 'ko' ? stackExplains[st].ko : stackExplains[st].en)
                          : (locale === 'ko' ? "프로덕션 아키텍처 지원 요소." : "Production capability supporter.");
                        return (
                          <div 
                            key={sidx} 
                            className={`p-3 rounded-lg border transition-all ${
                              theme === 'dark' 
                                ? 'bg-white/[0.01] border-white/5 hover:bg-white/[0.02]/80 hover:border-accent-gold/20' 
                                : 'bg-black/[0.01] border-black/5 hover:bg-black/[0.02]/80 hover:border-accent-gold/30'
                            }`}
                          >
                            <span 
                              className={`inline-block px-2 py-0.5 rounded font-mono text-[8px] uppercase font-bold tracking-wider ${
                                theme === 'dark' ? 'bg-white/5 text-white/80 border border-white/5' : 'bg-black/5 text-alpine-950/80 border border-black/5'
                              }`}
                            >
                              {st}
                            </span>
                            <p className={`text-[10px] leading-relaxed mt-2 select-text font-normal ${
                              theme === 'dark' ? 'text-white/50' : 'text-alpine-950/60'
                            }`}>
                              {explanation}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent-gold font-display">{t.systemScopeOverview}</span>
                    <p className={`text-xs md:text-sm font-normal leading-relaxed max-w-prose text-pretty ${
                      theme === 'dark' ? 'text-white/40' : 'text-alpine-950/50'
                    }`}>
                      {t.systemScopeBody}
                    </p>
                  </div>
                </div>

                {/* RIGHT RAIL - DETAILED ANALYSIS */}
                <div className="lg:col-span-8 space-y-20 w-full min-w-0">
                  {/* PROBLEM / SOLUTION */}
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider font-display">{t.theProblem}</h3>
                      <ul className="space-y-4">
                        {projectData.problem.map((prob, pidx) => (
                          <li key={pidx} className="flex gap-4 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                            <p className={`text-xs md:text-sm leading-relaxed max-w-prose text-pretty ${
                              theme === 'dark' ? 'text-white/70' : 'text-alpine-950/70'
                            }`}>
                              {prob}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider font-display">{t.theSolution}</h3>
                      <ul className="space-y-4">
                        {projectData.solution.map((sol, sidx) => (
                          <li key={sidx} className="flex gap-4 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                            <p className={`text-xs md:text-sm leading-relaxed max-w-prose text-pretty ${
                              theme === 'dark' ? 'text-white/70' : 'text-alpine-950/70'
                            }`}>
                              {sol}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* PIPELINE ARCHITECTURE */}
                  <div className="space-y-6">
                    <h3 className="text-xl md:text-3xl font-bold uppercase tracking-wider font-display border-b pb-4 text-pretty">
                      {t.technicalPipelineMap}
                    </h3>
                    <div className="space-y-6">
                      {/* Visual Architecture Flow Blueprint */}
                      <ArchitectureFlowchart projectId={projectId} theme={theme} locale={locale || 'en'} />

                      <div>
                        <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold mb-4">{t.pipelineExecutionLifecycle}</h4>
                        <ol className="space-y-4 w-full min-w-0">
                          {projectData.architecture.lifecycle.map((lc, lidx) => (
                            <li key={lidx} className={`flex gap-4 items-start p-4 rounded-xl relative overflow-hidden font-mono text-xs border w-full min-w-0 ${
                              theme === 'dark' ? 'border-white/5 bg-white/[0.01]' : 'border-black/5 bg-black/[0.01]'
                            }`}>
                              <span className="text-accent-gold font-bold">0{lidx + 1}</span>
                              <p className={`max-w-prose text-pretty break-words whitespace-normal w-full min-w-0 ${theme === 'dark' ? 'text-white/70' : 'text-alpine-950/70'}`}>{lc}</p>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div>
                        <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold mb-4 mt-6">{t.pipelineEdgeCaseGuardrails}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full min-w-0">
                          {projectData.architecture.guardrails.map((gr, gidx) => (
                            <div key={gidx} className={`p-4 rounded-xl border w-full min-w-0 ${
                              theme === 'dark' ? 'border-white/5 bg-white/[0.02]/50' : 'border-black/5 bg-black/[0.02]'
                            }`}>
                              <div className="text-xs font-mono font-bold uppercase tracking-wider mb-2 text-accent-gold opacity-90">{t.edgeCasePrefix} 0{gidx+1}</div>
                              <p className={`text-xs max-w-prose text-pretty break-words whitespace-normal w-full min-w-0 ${theme === 'dark' ? 'text-white/60' : 'text-alpine-950/66'}`}>{gr}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PROMPT ENGINEERING */}
                  <div className="space-y-6">
                    <h3 className="text-xl md:text-3xl font-bold uppercase tracking-wider font-display border-b pb-4 text-pretty">
                      {t.promptOrchestration}
                    </h3>
                    <div className="space-y-6 font-mono font-light text-pretty">
                      <div className="w-full min-w-0">
                        <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold mb-3">{t.structuredInstruction}</h4>
                        <pre className="p-4 md:p-6 rounded-xl overflow-x-auto text-[10px] md:text-xs leading-relaxed border border-white/5 bg-black/40 text-green-400 w-full max-w-full whitespace-pre-wrap break-all md:whitespace-pre md:break-normal">
                          <code>{projectData.promptEngineering.logic}</code>
                        </pre>
                      </div>

                      <div className="w-full min-w-0">
                        <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold mb-3">{t.runtimeEnforcedSchema}</h4>
                        <pre className="p-4 md:p-6 rounded-xl overflow-x-auto text-[10px] md:text-xs leading-relaxed border border-white/5 bg-black/40 text-blue-400 w-full max-w-full whitespace-pre-wrap break-all md:whitespace-pre md:break-normal">
                          <code>{projectData.promptEngineering.schema}</code>
                        </pre>
                      </div>

                      <div>
                        <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold mb-4 font-display">{t.formattingConsistency}</h4>
                        <ul className="space-y-3 font-sans">
                          {projectData.promptEngineering.guardrails.map((gr, gidx) => (
                            <li key={gidx} className="flex gap-4 items-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent-gold"></div>
                              <p className={`text-xs max-w-prose text-pretty ${theme === 'dark' ? 'text-white/60' : 'text-alpine-950/66'}`}>{gr}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* QUANTIFIED BUSINESS IMPACT */}
                  <div className="space-y-6">
                    <h3 className="text-xl md:text-3xl font-bold uppercase tracking-wider font-display border-b pb-4 text-pretty">
                      {t.productImpactScale}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold mb-2 font-display">{t.quantifiedValue}</h4>
                        <ul className="space-y-3">
                          {projectData.impact.value.map((v, idx) => (
                            <li key={idx} className="flex gap-4 items-start">
                              <span className="text-accent-gold font-bold font-mono">✓</span>
                              <p className={`text-xs md:text-sm leading-relaxed max-w-prose text-pretty ${
                                theme === 'dark' ? 'text-white/70' : 'text-alpine-950/70'
                              }`}>
                                {v}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold mb-2 font-display">{t.enterpriseSecurity}</h4>
                        <ul className="space-y-3">
                          {projectData.impact.security.map((s, idx) => (
                            <li key={idx} className="flex gap-4 items-start">
                              <span className="text-accent-gold font-bold font-mono">⚡</span>
                              <p className={`text-xs md:text-sm leading-relaxed max-w-prose text-pretty ${
                                theme === 'dark' ? 'text-white/70' : 'text-alpine-950/70'
                              }`}>
                                {s}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CONCLUDE CONNECTOR */}
        <div className={`p-8 md:p-14 rounded-2xl border text-center space-y-6 relative overflow-hidden ${
          theme === 'dark' ? 'border-white/10 bg-white/[0.01]' : 'border-black/5 bg-white shadow-xl'
        }`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <h4 className="text-2xl md:text-4xl font-medium tracking-tight font-display text-pretty">
            {t.wantToSeeTitle}
          </h4>
          <p className={`text-xs md:text-base max-w-2xl mx-auto leading-relaxed text-pretty ${
            theme === 'dark' ? 'text-white/50' : 'text-alpine-950/65'
          }`}>
            {t.wantToSeeBody}
          </p>
          <div className="pt-4">
            <a 
              href="mailto:jsn.benjamin@gmail.com" 
              className="shiny-cta inline-block px-12 py-5 rounded-xl"
            >
              {t.startCollaboration}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

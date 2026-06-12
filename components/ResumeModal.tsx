import React from 'react';
import { MailIcon, XIcon, FileTextIcon } from './Icons.tsx';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  locale: 'en' | 'ko';
}

export default function ResumeModal({ isOpen, onClose, theme, locale }: ResumeModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const isDark = theme === 'dark';

  const t = {
    en: {
      title: "JASON BENJAMIN — AI Product Manager · EdTech Founder · Solutions Architect",
      subtitle: "jsn.benjamin@gmail.com · 010 5371 9266 · Seoul, South Korea (Open to Remote) · jason-portfolio-live.vercel.app",
      printBtn: "Print / Save as PDF",
      closeBtn: "Close",
      profileTitle: "Professional Profile",
      profileText: "EdTech founder and AI product manager with a decade of classroom experience in South Korea and a portfolio of six production-ready AI-powered products. Proven track record of defining product strategy, shipping cross-functional generative AI features from zero to launch, and driving measurable improvements in learning outcomes and operational efficiency. Uniquely positioned at the intersection of bilingual EdTech product design, LLM integration, and institutional operations — with hands-on experience across the full AI product lifecycle: discovery, agent design, go-to-market, and post-launch iteration.",
      experienceTitle: "Professional Experience",
      skillsTitle: "Technical Skills & Competencies",
      educationTitle: "Education",
      contactTitle: "Get in Touch",
      emailLabel: "Email Address",
      locationLabel: "Location",
      locationVal: "Seoul, South Korea",
      roles: [
        {
          company: "Founder & AI Product Manager · Chekki EdTech Solutions",
          title: "Six-product AI EdTech portfolio for the South Korean market · Full product lifecycle ownership",
          period: "Jan 2024 – Present",
          bulletPoints: [
            "Chekki B2B Command Center — Enterprise SaaS Portal: Defined AI product strategy and roadmap for a multi-tenant B2B portal to eliminate 15 or more hours of weekly administrative overhead across language academy networks through automated generative AI reporting pipelines; shipped Role-Based Access Control and Magic Link authentication; designed and launched an AI agent pipeline using Make.com and Google Gemini that processes exception-first observations into culturally nuanced bilingual consultation notes, driving an 80% workload reduction.",
            "Chekki AI — Consumer Mobile Application: Led end-to-end product lifecycle for a bilingual AI mobile web application on the Apple App Store, targeting Korean families and ESL teachers; defined and executed a zero-storage privacy architecture as a core product requirement, eliminating retention of sensitive child data and ensuring full compliance with App Store safety regulations and child data privacy standards.",
            "Learning Diary — Bilingual Student Portfolio Compiler: Defined product vision and shipped touch-screen 'Tag and Commit' AI portfolio tool; designed Dynamic Tenant Theming allowing directors to configure custom HEX branding and localized font sets; built zero-trust multi-tenant PG Supabase RLS database; shipped in-browser @react-pdf/renderer compilation pipeline with Google Gemini 1.5 Flash, synthesizing teacher tags into bilingual micro-narratives client-side, eliminating cloud media exposure risk.",
            "EduPlanner Pro — AI Scheduling Engine: Shipped an automated school scheduling engine; designed 'Draft and Weave' two-stage LLM pipeline: Gemini Flash resolves baseline schedule conflicts with a fast generative pass, with recursive fallback to Gemini Pro for targeted constraint recalculation, enabling fully optimized timetables without human intervention.",
            "Benchmark AI — Continuous ESL Assessment Suite: Shipped a responsive continuous assessment platform that maps real-time student mastery growth to international standards (CEFR / Cambridge YLE), enabling early academic intervention before attrition risk escalates; defined KPIs around mastery progression velocity and early warning trigger accuracy.",
            "B2B Lead Generator — Sales CRM & Outreach Engine: Shipped a B2B sales tool parsing unstructured regional directory data and leveraging Gemini AI to produce hyper-personalized outreach campaigns, scaling ESL client acquisition without additional sales headcount."
          ]
        },
        {
          company: "Homeroom Teacher & Manager · Blend ENG Academy",
          title: "Senior Educator & Curriculum Lead | Private English Academy",
          period: "Feb 2023 – Feb 2026",
          bulletPoints: [
            "Defined requirements for and launched an automated, clash-free scheduling system that eliminated manual timetable conflicts, optimising resource allocation across departments.",
            "Shipped a multi-domain, data-driven student assessment system tracking longitudinal academic progress, enabling early intervention that measurably reduced attrition risk.",
            "Authored a 20-volume institutional English textbook series spanning 6 skill domains (Phonics, Debate, Writing, Test Prep), establishing the core pedagogical framework adopted across the academy."
          ]
        },
        {
          company: "Homeroom Educator · YBM PSA Seocho",
          title: "Full-Immersion English Instruction | Leading English Kindergarten & Academy",
          period: "Feb 2019 – Feb 2023",
          bulletPoints: [
            "Delivered full-immersion EFL instruction, developing differentiated curriculum materials and maintaining structured, data-backed academic reporting for stakeholders."
          ]
        }
      ],
      skills: [
        { category: "Product Management", items: ["AI Product Strategy", "Product Roadmap", "Product Lifecycle Management", "User Stories", "Acceptance Criteria", "KPI Definition", "A/B Testing", "Data-Driven Decision Making", "Go-to-Market Strategy", "Agile", "Sprint Planning", "Backlog Management", "Stakeholder Management", "Cross-Functional Collaboration", "B2B SaaS", "Enterprise SaaS", "B2C Mobile"] },
        { category: "AI & Generative AI", items: ["Generative AI", "LLM Integration", "AI Agent Design", "Prompt Engineering", "Google Gemini (Flash / Pro / Ultra)", "Multi-LLM Orchestration", "Google AI Studio", "Bilingual AI", "Responsible AI", "Model Bias Mitigation", "Structured JSON Schema Enforcement", "Prompt Injection Hardening"] },
        { category: "Engineering & Stack", items: ["React 18/19", "TypeScript", "Vite", "Next.js", "Tailwind CSS", "Node.js", "Express.js", "Firebase (Firestore, Auth, Security Rules)", "Supabase (PostgreSQL, RLS)", "@react-pdf/renderer", "Vercel", "HTML", "CSS", "API Integration"] },
        { category: "No-Code / Automation", items: ["Make.com", "Airtable", "Softr", "Fillout", "Workflow Automation", "API Webhooks", "RBAC", "Magic Link Authentication", "Zero-Storage Architecture"] },
        { category: "EdTech & Domain", items: ["EdTech", "K-12", "Instructional Design", "Learning Outcomes", "Student Engagement", "EFL/ESL", "Bilingual Product Localisation", "CEFR", "Cambridge YLE", "LMS Concepts", "App Store Compliance", "Child Data Privacy (COPPA)"] }
      ],
      education: [
        { institution: "University of Essex", degree: "Master of Education — Educational Management", period: "May 2022" },
        { institution: "University of the Western Cape", degree: "Bachelor of Commercial Law", period: "Dec 2013" }
      ]
    },
    ko: {
      title: "제이슨 벤자민 — AI 프로덕트 매니저 · 에듀테크 창업가 · 솔루션 아키텍트",
      subtitle: "jsn.benjamin@gmail.com · 010 5371 9266 · 서울, 대한민국 (원격 근무 가능) · jason-portfolio-live.vercel.app",
      printBtn: "인쇄 / PDF로 저장하기",
      closeBtn: "닫기",
      profileTitle: "전문가 프로필",
      profileText: "한국 교육 현장에서의 10년 경력과 6개의 기성 수준 AI 제품 포트폴리오를 보유한 에듀테크 창업자이자 AI 프로덕트 매니저입니다. 프로덕트 전략 수립, 초기 기획 단계부터 크로스-기능 생성형 AI 기능 출시 완료, 학습 성과 및 업무 효율에 측정 가능한 개선을 견인한 검증된 이력을 갖고 있습니다. 기획, 에이전트 설계, 상용화 전략 및 사후 운영 등 AI 제품 생애 전체 주기의 최전선에서 실전 경험을 다진 한/영 에듀테크 제품 기획, LLM 결합 설계 및 학원 업무 운영 고도화의 독보적인 적임자입니다.",
      experienceTitle: "경력 사항",
      skillsTitle: "핵심 기술 역량",
      educationTitle: "학력",
      contactTitle: "연락처 및 협업 제안",
      emailLabel: "대표 이메일",
      locationLabel: "근무지",
      locationVal: "대한민국 서울특별시",
      roles: [
        {
          company: "창업자 및 AI 프로덕트 매니저 · Chekki EdTech Solutions",
          title: "한국 교육 시장을 위한 6대 AI 에듀테크 포트폴리오 기획 및 제품 수명주기 전권 관리",
          period: "2024 - 현재",
          bulletPoints: [
            "Product 1 (Chekki B2B Command Center - 엔터프라이즈 SaaS): 어학원 지점들의 수동 행정을 기획 자동화하여 매주 15시간 이상의 행정 오버헤드를 완전 소거하는 로드맵 수립; 원장과 강사 계정 간 확실한 데이터 접근 경계를 긋는 RBAC 권한 제어 및 패스워드리스 로그인 구축; 일상 기록을 정교한 보육 상담 메모로 가공 전수하는 Make.com 및 Gemini 에이전트 파이프라인 개발로 문서 처리 업무 80% 전격 감축.",
            "Product 2 (Chekki AI - 소비자 모바일 앱): 한국 가정과 ESL 강사를 타겟팅한 iOS 앱스토어 및 Vercel 탑재 모바일 웹앱 제품 전 과정 주도; 아동 개인정보를 수집 보관하지 않는 제로-스토리지 프라이버시 아키텍처를 설계하여 아동데이터 보호법(COPPA) 및 애플 앱스토어 안전 규제 완벽 통과; 글로벌 및 다국어 시장 진출 전략 수행.",
            "Product 3 (Learning Diary - 이중언어 포트폴리오 빌더): 교사용 터치스크린 'Tag & Commit' 태블릿 입력 도구 출시; 어학원별 임의 컬러테마 브랜드 HEX 코드 및 원본 비율 로고 통합, Noto Sans 한국어/영어 글꼴 세트를 바인딩하는 동적 테넌트 테밍 설계; PostgreSQL Supabase RLS 행 보안 정책 기획; 클라이언트 인라인 @react-pdf/renderer를 연동해 서버 트래픽 비용 0원 유지 및 개인 비밀 보호.",
            "Product 4 (EduPlanner Pro - AI 스케줄링 배치 엔진): 강의실 예약 충돌, 구성원 인적 부하, 시간 한계선을 자동으로 연산 회피 배치하는 스케줄 엔진 출시; Gemini Flash(초안 고속 해법 작성)와 Gemini Pro(제약조건 피드백 보정)를 융합한 독창적인 'Draft & Weave' 2단계 프롬프트 백만 파이프라인 설계로 수동 기동 전격 차단.",
            "Product 5 (Benchmark AI - ESL 상시 정량 진단 도구): 원생별 학습 숙련 추이를 공인 국제 지표(CEFR / Cambridge YLE)에 지능형 동기화 매핑하여 중도 이탈 리스크를 사전 확인하고 조치 조절할 수 있도록 교직원용 상시 정량 평가 대시보드 구축.",
            "Product 6 (B2B Lead Generator - 영업 전력 오토메이션): 비정형 네이버 지도 디렉터리 공간 데이터를 자동으로 정밀 수합 파싱하고 LLM을 지휘하여 맞춤형 B2B 영업 레터를 대량 자동 생산, 인력 대폭 증원 없이도 고객 접점을 기하급수적으로 확장 배치하는 자동 크롤 CRM 툴 구축."
          ]
        },
        {
          company: "담임 교사 및 팀장 · Blend ENG Academy",
          title: "수석 강사 및 커리큘럼 리드 | 사립 영어 영어유치원·어학원",
          period: "2023 - 2026",
          bulletPoints: [
            "부서 간 가용 수용 계획의 충돌을 자동으로 회피하고 리소스 가동률을 극대화하는 clash-free 스마트 학급 시간표 배치 시스템 설계.",
            "장기 학업 변화 궤적을 실시간으로 추적하는 다중 진단 지수 체계를 배포해, 선제 학습 개입을 통한 수강 탈퇴율 개선 성과.",
            "Phonics, Debate, Writing, Test Prep 교격 등 6개 분야를 총괄 가독하는 학원용 20권 분량 영어 정규 교재 공동 저술 방법론 완성."
          ]
        },
        {
          company: "담임 교직원 · YBM PSA Seocho",
          title: "완전 몰입형 영어 교직원 선도 | 국내 최상위 어린이 영어 영어유치원",
          period: "2019 - 2023",
          bulletPoints: [
            "다중 몰입형 외국어 교육(EFL)을 책임 전담하고, 세밀히 구조화된 정량적 발달 기준 보고 문서를 부서 간 통일 구축하여 학부모 상담 공인 신뢰도 증대."
          ]
        }
      ],
      skills: [
        { category: "Product Management (제품 기획)", items: ["AI 제품 아젠다 수립", "제품 로드맵 설계", "제품 수명 주기 관리(PLM)", "사용자 스토리 작성", "인수 조건 수립", "KPI 타겟팅", "A/B 테스트 및 실험 검증", "정량 지표 기반 개발 의사결정", "새 해외 시장 GTM 전략", "애자일 및 시간표 스프린트", "이해관계자 협상", "B2B SaaS 서비스", "엔터프라이즈 구조", "B2C 모바일 수용성"] },
        { category: "AI & Generative AI (LLM 응용)", items: ["생성형 AI 시스템 설계", "LLM 결합 엔지니어링", "AI 에이전트 오토메이션", "프롬프트 아키텍팅", "Google Gemini Flash/Pro/Ultra", "멀티 LLM 상호 연동", "Google AI Studio 활용", "이중언어 AI 특화", "책임감 있는 AI 배포", "편향 제거 설계", "정형 JSON 스키마 주입 및 보정", "프롬프트 인젝션 보안 배리어 구축"] },
        { category: "Engineering & Stack (기술 스택)", items: ["React 18/19", "TypeScript 부품 제어", "Vite 컴파일 엔진", "Next.js 인프라", "Tailwind CSS 최적 지표", "Node.js 런타임", "Express.js API", "Firebase (Firestore DB, Auth, 보안 가드)", "Supabase (PostgreSQL 및 RLS)", "@react-pdf/renderer 비동기 리포팅", "Vercel 호스트", "HTML/CSS 컴퍼넌트", "CORS 프록시 및 API 연쇄 연동"] },
        { category: "No-Code / Automation (오토메이션)", items: ["Make.com 클라우드 커넥터", "Airtable 관계형 스키마 설계", "Softr 고객용 포털", "Fillout 동적 설문 인터페이스", "비동기 웹훅 파이프", "자동화 워크플로", "CSV 일괄 수합 엔진", "데이터 영구 아카이빙", "Role-Based Access Control"] },
        { category: "EdTech & Domain (글로벌 교육공학)", items: ["에듀테크 교수법 설계", "K-12 및 영유아 공교육/사교육 프로세스", "한/영 현지 언어 조율", "EFL/ESL 커리큘럼 아키텍처", "이학습 성과 극대화", "App Store 및 Google Play 심사 가이드 준수", "아동 개인정보 규제 COPPA 완전 충족"] }
      ],
      education: [
        { institution: "University of Essex (영국 에식스 대학교)", degree: "교육학 석사 — 교육 경영학 석사", period: "2022년 5월 취득" },
        { institution: "University of the Western Cape (남아프리카공화국 웨스턴케이프 대학교)", degree: "상법 학사 (Bachelor of Commercial Law)", period: "2013년 12월 취득" }
      ]
    }
  };

  const curr = t[locale];

  return (
    <div id="resume-modal-overlay" className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto print:static print:bg-white print:p-0">
      <div className={`relative w-full max-w-4xl rounded-2xl border shadow-2xl overflow-hidden transition-all duration-300 max-h-[90vh] flex flex-col ${
        isDark 
          ? 'bg-alpine-950 border-white/10 text-white' 
          : 'bg-[#faf9f6] border-black/10 text-alpine-950'
      } print:max-h-full print:border-none print:shadow-none print:w-full print:rounded-none print:text-black print:bg-white`}>
        
        {/* HEADER */}
        <div className={`p-6 md:p-8 flex items-center justify-between border-b shrink-0 ${
          isDark ? 'border-white/10 bg-white/[0.01]' : 'border-black/5 bg-black/[0.01]'
        } print:border-b-2 print:border-black print:pb-4 print:p-0`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-gold/20 flex items-center justify-center print:hidden">
              <FileTextIcon className="w-5 h-5 text-accent-gold" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-display font-medium leading-none print:text-black print:text-2xl">{curr.title}</h3>
              <p className={`text-xs mt-1 md:mt-2 print:text-black/80 ${isDark ? 'text-white/60' : 'text-alpine-950/60'}`}>{curr.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 print:hidden">
            <button 
              onClick={handlePrint}
              className="px-4 py-2 bg-accent-gold hover:brightness-110 text-alpine-950 rounded-full text-[10px] font-black uppercase tracking-widest transition-all scale-100 active:scale-95"
            >
              {curr.printBtn}
            </button>
            <button 
              onClick={onClose}
              className={`p-2.5 rounded-full border transition-colors ${
                isDark ? 'border-white/10 hover:bg-white/5 text-white/50 hover:text-white' : 'border-black/10 hover:bg-black/5 text-alpine-950/50 hover:text-alpine-950'
              }`}
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PRINT BANNER IN RAW WINDOW PRINT */}
        <div className="hidden print:block text-[10px] uppercase tracking-wider text-black border-b pb-4 mb-6">
          <span>PORTFOLIO AT: <strong className="underline">https://jason-benjamin.vercel.app</strong></span>
          <span className="mx-6">|</span>
          <span>EMAIL: <strong>jsn.benjamin@gmail.com</strong></span>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="p-6 md:p-10 overflow-y-auto space-y-8 md:space-y-12 shrink print:overflow-visible print:p-0 print:space-y-8">
          
          {/* PROFILE SUMMARY */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-accent-gold border-b pb-1.5 border-accent-gold/20 flex items-center gap-2 print:text-black print:border-black">
              <span>✦</span> {curr.profileTitle}
            </h4>
            <p className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-white/80' : 'text-alpine-950/80'} print:text-black print:text-xs`}>
              {curr.profileText}
            </p>
          </div>

          {/* TWO COLUMN CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 print:grid-cols-3 print:gap-8">
            
            {/* COLUMN 1 & 2: RECENT EXPERIENCE */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8 print:col-span-2">
              <h4 className="text-xs font-black uppercase tracking-widest text-accent-gold border-b pb-1.5 border-accent-gold/20 flex items-center gap-2 print:text-black print:border-black">
                <span>🔧</span> {curr.experienceTitle}
              </h4>
              <div className="space-y-6 md:space-y-8">
                {curr.roles.map((r, rIdx) => (
                  <div key={rIdx} className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h5 className="text-sm font-black font-display print:text-black">{r.company}</h5>
                      <span className="text-[10px] font-mono opacity-60 print:text-black/60 print:text-[9px]">{r.period}</span>
                    </div>
                    <div className="text-xs font-semibold text-accent-gold/90 print:text-black/80">{r.title}</div>
                    <ul className={`space-y-1.5 text-xs font-light leading-relaxed list-disc list-inside ${isDark ? 'text-white/70' : 'text-alpine-950/70'} print:text-black print:text-[11px]`}>
                      {r.bulletPoints.map((bp, bpIdx) => (
                        <li key={bpIdx} className="indent-[-1.2rem] pl-5">
                          {bp}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUMN 3: STACK & CONTACT */}
            <div className="space-y-8">
              {/* CORE COMPETENCIES */}
              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-accent-gold border-b pb-1.5 border-accent-gold/20 flex items-center gap-2 print:text-black print:border-black">
                  <span>⚓</span> {curr.skillsTitle}
                </h4>
                <div className="space-y-4">
                  {curr.skills.map((cat, catIdx) => (
                    <div key={catIdx} className="space-y-1.5">
                      <div className="text-[10px] font-black uppercase tracking-wider text-accent-gold/90 print:text-black">{cat.category}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.items.map((item, iIdx) => (
                          <span 
                            key={iIdx} 
                            className={`px-2 py-0.5 rounded text-[9px] font-mono border ${
                              isDark 
                                ? 'bg-white/5 border-white/10 text-white/80' 
                                : 'bg-black/5 border-black/5 text-alpine-950/80'
                            } print:bg-none print:border-black/20 print:text-black print:text-[8px]`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* EDUCATION */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-accent-gold border-b pb-1.5 border-accent-gold/20 flex items-center gap-2 print:text-black print:border-black">
                  <span>🎓</span> {curr.educationTitle}
                </h4>
                <div className="space-y-3">
                  {curr.education.map((edu, eduIdx) => (
                    <div key={eduIdx} className="text-xs">
                      <div className="font-bold print:text-black">{edu.institution}</div>
                      <div className="opacity-70 print:text-black/80">{edu.degree}</div>
                      <div className="text-[9px] font-mono opacity-50 print:text-black/50">{edu.period}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* CONTACT INFO CONTAINER */}
          <div className={`p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-6 ${
            isDark ? 'bg-white/[0.01] border-white/5' : 'bg-black/[0.01] border-black/5'
          } print:border-t print:border-black/20 print:p-0 print:pt-6`}>
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-accent-gold print:text-black">{curr.contactTitle}</h4>
              <p className={`text-xs mt-1 ${isDark ? 'text-white/60' : 'text-alpine-950/60'} print:text-black/80`}>
                Available for curriculum design, full-stack workflow optimization, and educational product integrations.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 print:hidden">
              <a 
                href="mailto:jsn.benjamin@gmail.com?subject=Strategic%20Opportunity%20Inquiry"
                className="px-5 py-3 rounded-full bg-accent-gold text-alpine-950 text-xs font-black uppercase tracking-widest inline-flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-md"
              >
                <MailIcon className="w-3.5 h-3.5" />
                <span>jsn.benjamin@gmail.com</span>
              </a>
            </div>
            <div className="hidden print:block text-xs text-black">
              <strong>Direct Email:</strong> jsn.benjamin@gmail.com
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

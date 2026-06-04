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
      title: "JASON BENJAMIN — EdTech Product Manager & Solutions Architect",
      subtitle: "Seoul, South Korea | jason-portfolio-live.vercel.app | jsn.benjamin@gmail.com | 010 5371 9266",
      printBtn: "Print / Save as PDF",
      closeBtn: "Close",
      profileTitle: "Professional Profile",
      profileText: "EdTech founder and solutions architect with a decade of experience in the South Korean education sector. Proven ability to take AI-powered SaaS products from zero to launch, bridging deep pedagogical expertise with scalable software. Specialized in designing high-adoption user workflows, multi-tenant relational databases, and B2B communication systems that drastically reduce administrative overhead. Uniquely positioned at the intersection of AI integration, no-code/low-code development, and institutional operations.",
      experienceTitle: "Professional Experience",
      skillsTitle: "Technical Skills & Competencies",
      educationTitle: "Education",
      contactTitle: "Get in Touch",
      emailLabel: "Email Address",
      locationLabel: "Location",
      locationVal: "Seoul, South Korea",
      roles: [
        {
          company: "Founder & Solutions Architect · Chekki EdTech Solutions",
          title: "Full Product Lifecycle Portfolio Ownership",
          period: "Jan 2024 – Present",
          bulletPoints: [
            "Chekki B2B Command Center (Enterprise SaaS Portal): Architected and deployed a multi-tenant B2B educational portal using Airtable, Softr, and Fillout, establishing a scalable relational database that automates end-to-end reporting pipelines for multiple language academies.",
            "Access & Security: Implemented strict Role-Based Access Control (RBAC) and passwordless authentication via Magic Links, ensuring secure data isolation between Academy Directors and teaching staff while eliminating onboarding friction.",
            "LLM Consultation Memos: Engineered automated API webhooks and Make.com scenarios integrated with LLMs to dynamically process exception-first behavioural data into culturally nuanced, bilingual consultation notes, reducing reporting loops by 80%.",
            "Chekki AI (Consumer Mobile App - iOS & Web): Engineered an AI-powered educational application using Google Gemini 3 (Flash & Pro) for high-speed OCR text extraction, automated worksheet grading, overlays ('Magic Scan'), and real-time interactive tutoring.",
            "Cross-Platform Capacitor Deployment: Built a seamless, responsive frontend using React and wrapped with Capacitor for native App Store publishing. Designed a zero-storage privacy architecture to eliminate the retention of sensitive child data and ensure 100% app compliance."
          ]
        },
        {
          company: "Homeroom Teacher & Manager · Blend ENG Academy",
          title: "Senior Educator & Curriculum Lead | Private English Academy",
          period: "Feb 2023 – Feb 2026",
          bulletPoints: [
            "Engineered an automated, clash-free scheduling system that eliminated manual timetable conflicts, optimising resource allocation across departments.",
            "Built and deployed a multi-domain, data-driven student assessment system to track longitudinal progress, reducing attrition risk through early academic intervention.",
            "Authored a commercially viable 20-volume institutional English textbook series spanning 6-skill domains (Phonics, Debate, Writing, Test Prep), establishing the core pedagogical framework."
          ]
        },
        {
          company: "Homeroom Educator · YBM PSA Seocho",
          title: "Full-Immersion English Instruction",
          period: "Feb 2019 – Feb 2023",
          bulletPoints: [
            "Delivered full-immersion EFL instruction, developing differentiated curriculum materials and maintaining structured, data-backed academic reporting for stakeholders."
          ]
        }
      ],
      skills: [
        { category: "Product Management", items: ["B2B SaaS", "Product Lifecycle (PLM)", "UX/UI Design", "Go-to-Market Strategy", "Multi-Tenant Architecture", "RBAC", "Agile", "Stakeholder Management"] },
        { category: "No-Code / Low-Code Stack", items: ["Make.com", "Workflow Automation", "Airtable Relational DB Design", "Softr", "Fillout Forms", "API Webhooks & Webhooks Proxy", "CSV Ingestion Pipelines", "Data Archiving"] },
        { category: "AI & Engineering", items: ["Prompt Engineering", "LLM Integration (Gemini, Claude)", "Google AI Studio", "Bilingual AI", "React.js", "TypeScript", "Next.js", "Capacitor SDK Mobile Wrap", "Firebase (Auth, Firestore)", "Cloudinary", "Vercel", "Supabase", "Zero-Storage Architecture"] },
        { category: "EdTech & Operations", items: ["Educational Technology", "Product Localisation", "English/Korean Bilingual", "EFL/ESL", "Parent Communication", "App Store Compliance", "Child Data Privacy"] }
      ],
      education: [
        { institution: "University of Essex", degree: "Master of Education — Educational Management", period: "Graduated: May 2022" },
        { institution: "University of the Western Cape", degree: "Bachelor of Commercial Law", period: "Graduated: Dec 2013" }
      ]
    },
    ko: {
      title: "제이슨 벤자민 — 에듀테크 프로덕트 매니저 & 솔루션 아키텍트",
      subtitle: "대한민국 서울 | jason-portfolio-live.vercel.app | jsn.benjamin@gmail.com | 010 5371 9266",
      printBtn: "인쇄 / PDF로 저장하기",
      closeBtn: "닫기",
      profileTitle: "전문가 프로필",
      profileText: "한국 교육 업계에서 10년간 활약해 온 에듀테크 창업가이자 솔루션 아키텍트입니다. 깊이 있는 교육학적 지식과 확장 가능한 소프트웨어 기술을 조화시켜, AI 기반 SaaS 제품을 기획 단계부터 실제 론칭까지 조종해 왔습니다. 행정 업무 오버헤드를 극단적으로 감소시키는 고밀도 워크플로, 관계형 데이터베이스, B2B 커뮤니케이션 오토메이션 설계에 능통하며 최신 AI 수립 및 로코드/노코드 솔루션 통합에 특화되어 있습니다.",
      experienceTitle: "경력 사항",
      skillsTitle: "핵심 기술 역량",
      educationTitle: "학력",
      contactTitle: "연락처 및 협업 제안",
      emailLabel: "대표 이메일",
      locationLabel: "근무지",
      locationVal: "대한민국 서울특별시",
      roles: [
        {
          company: "창업자 및 솔루션 아키텍트 · Chekki EdTech Solutions",
          title: "전체 제품 개발 라이프사이클 및 포트폴리오 관리",
          period: "2024 - 현재",
          bulletPoints: [
            "Chekki B2B Command Center (엔터프라이즈 SaaS 포털): Airtable, Softr, Fillout을 유기적으로 바인딩 설계하여, 다수 어학원 지점에 균일한 자동 보고 파이프라인과 대규모 관리형 관계 데이터베이스 구상.",
            "엄격한 권한 제어: 역할 기반 권한 제어(RBAC) 및 개별 매직링크 로그인 구축으로 원장단과 강사진 간 데이터 통로 완벽 차단 및 제로 온보딩 마찰 실현.",
            "상담 보고서 오토메이션: Make.com을 이용해 LLM 연동 오토 웹훅 엔진을 개발, 일일 관찰 행동 데이터를 이중언어 맥락에 맞춰 존댓말 상담 보고서로 자동 완성 합성 (업무량 80% 전격 소거).",
            "Chekki AI (소비자 모바일 및 웹앱): Google Gemini 3 (Flash/Pro) 비전 기반의 문종 이미지 스캔 해답 매핑('Magic Scan'), 문맥 번역 및 한글 독음 발음 지도 및 학습(TTS/STT) 교정 솔루션 설계 출시.",
            "소아 개인 정보 제로-스토리지: 암호화 이중화 통제 및 Zero-Storage 데이터 정책을 완결 관철해 Capacitor 모바일 iOS/Android 앱 배포 및 자녀 데이터 보호 규정(COPPA) 완벽 준수."
          ]
        },
        {
          company: "담임 교사 및 팀장 · Blend ENG Academy",
          title: "어학원 수석 교수진 및 교육과정 책임 리더 | 유아기·초등 전문",
          period: "2023 - 2026",
          bulletPoints: [
            "부서 간 가용 수용 계획의 충돌을 자동으로 회피하고 리소스 가동률을 극대화하는 clash-free 스마트 학급 시간표 배치 시스템 설계.",
            "장기 학업 변화 궤적을 실시간으로 추적하는 다중 진단 지수 체계를 배포해, 선제 학습 개입을 통한 수강 탈퇴율 개선 성과.",
            "Phonics, Debate, Writing, Test Prep 교격 등 6개 분야를 총괄 가독하는 학원용 20권 분량 영어 정규 교재 공동 저술 방법론 완성."
          ]
        },
        {
          company: "담임 교직원 · YBM PSA Seocho",
          title: "완전 몰입형 영어 교육 어학원 지도",
          period: "2019 - 2023",
          bulletPoints: [
            "다중 몰입형 외국어 교육(EFL)을 책임 전담하고, 세밀히 구조화된 정량적 발달 기준 보고 문서를 부서 간 통일 구축하여 학부모 상담 공인 신뢰도 증대."
          ]
        }
      ],
      skills: [
        { category: "Product Management (제품 기획)", items: ["B2B SaaS", "제품 수명주기(PLM)", "UX/UI 디자인", "시장 진출 전략(GTM)", "멀티테넌트 아키텍처", "RBAC 권한 제어", "애자일(Agile)", "이해관계자 조율"] },
        { category: "No-Code Stack (자동화 빌드)", items: ["Make.com 오토메이션", "워크플로 효율화", "Airtable 관계형 DB 설계", "Softr 포털 제작", "Fillout 양식 제어", "API 웹훅 및 프록시 가교", "CSV 대량 수합 처리", "데이터 이관 및 아카이빙"] },
        { category: "AI & Engineering (AI 엔지니어링)", items: ["프롬프트 엔지니어링", "LLM 연동(Gemini, Claude)", "Google AI Studio", "이중언어 AI 구조화", "React.js", "TypeScript", "Next.js", "Capacitor 하이브리드 SDK", "Firebase (Auth, Firestore)", "Cloudinary", "Vercel", "Supabase", "Zero-Storage 보안 아키텍처"] },
        { category: "EdTech & Operations (어학 운영)", items: ["교육공학(EdTech)", "제품 현지화(Localisation)", "한/영 이중언어 조율", "ESL/EFL 교수법", "학부모 밀착 소통 설계", "App Store 동의 가이드라인", "아동 개인정보 규제 준수"] }
      ],
      education: [
        { institution: "University of Essex (영국 에식스 대학교)", degree: "교육학 석사 — 교육 경영학 (Master of Education)", period: "취득 완료: 2022년 5월" },
        { institution: "University of the Western Cape (남아프리카공화국 웨스턴케이프 대학교)", degree: "상법 학사 (Bachelor of Commercial Law)", period: "취득 완료: 2013년 12월" }
      ]
    }
  };

  const curr = t[locale];

  return (
    <div id="resume-modal-overlay" className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto print:static print:bg-white print:p-0">
      <div className={`relative w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300 max-h-[90vh] flex flex-col ${
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

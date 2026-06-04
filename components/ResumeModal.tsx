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
      title: "Jason Benjamin — Executive Curriculum Vitae",
      subtitle: "EdTech Founder, Software Architect & Experienced Educator",
      printBtn: "Print / Save as PDF",
      closeBtn: "Close",
      profileTitle: "Executive Summary",
      profileText: "Passionate classroom teacher of 10 years who transitioned into full-stack software engineering. Specialized in building secure, high-impact EdTech platforms and enterprise-level automation pipelines. Proven record in automating educational admin, managing strict user-data privacy compliance (GDPR/COPPA), and designing scalable web systems.",
      experienceTitle: "Professional Experience",
      skillsTitle: "Core Competencies",
      educationTitle: "Education & Impact",
      contactTitle: "Get in Touch",
      emailLabel: "Work Email",
      locationLabel: "Location",
      locationVal: "Seoul, South Korea",
      roles: [
        {
          company: "Chekki AI",
          title: "Founder & Lead Software Architect",
          period: "2024 - Present",
          bulletPoints: [
            "Architected a mobile-first real-time language worksheet solver, cutting educator prep time from 30 minutes to under 5 seconds utilizing Claude 3.5 Sonnet & Gemini vision arrays.",
            "Enforced a strict 'Zero-Memory Policy' ensuring 100% data compliance for students' privacy and academic record protection.",
            "Scaled testing pilots to hundreds of Korean families weekly, managing cloud ingestion routing and seamless bilingual output rendering."
          ]
        },
        {
          company: "EduPlanner & Automated Consult Projects",
          title: "Full-Stack Engineer & Operations Designer",
          period: "2022 - 2024",
          bulletPoints: [
            "Programmed heuristic time-table constraint solvers mapping room availability, teacher rotations, and schedule rules to reduce scheduling friction to absolute zero.",
            "Integrated automatic Softr customer portals with relational Airtable backends via complex Make.com and Express.js webhook proxies.",
            "Reduced educational admin prep by over 15 hours per classroom weekly through strict automation mapping."
          ]
        },
        {
          company: "K-12 Educational Institutions",
          title: "Head Classroom Educator & Language Instructor",
          period: "2014 - 2024",
          bulletPoints: [
            "Conducted over 12,000 hours of direct pedagogy and curriculum instruction in South Korea.",
            "Designed and standardized regional bilingual student progress report patterns used by dozens of academic departments.",
            "Pioneered early low-code integrations inside the classroom to bridge tech accessibility for children with learning variances."
          ]
        }
      ],
      skills: [
        { category: "Languages & Frameworks", items: ["TypeScript", "JavaScript (ES6+)", "React 18", "Node.js", "Express.js", "HTML5/CSS3", "Vite"] },
        { category: "Systems & Automation", items: ["Airtable Relational DB", "Firebase/Firestore", "Make.com (Integromat)", "Softr", "Capacitor SDK"] },
        { category: "AI Engineering", items: ["Anthropic Claude 3.5 API", "Google Gemini API", "Structured XML Prompts", "LLM Vision Architectures"] },
        { category: "Professional Fit", items: ["Zero-Memory Privacy Compliance", "Bilingual Localization", "User Interface Wireframing", "Product Subscriptions Hub"] }
      ],
      education: [
        { institution: "Licensed Classroom Teacher (K-12)", degree: "Professional Pedagogy & Curriculum Methodology", period: "In-Service Leadership Milestones" },
        { institution: "Full-Stack Development Specialization", degree: "Modern Software Systems & Cloud Integrations", period: "Credential Portfolio Certified" }
      ]
    },
    ko: {
      title: "제이슨 벤자민 — 이력서 및 핵심 역량 명세서",
      subtitle: "에듀테크 창업가, 풀스택 아키텍트 & 10년 경력의 전문 교육자",
      printBtn: "인쇄 / PDF로 저장하기",
      closeBtn: "닫기",
      profileTitle: "전문가 프로필",
      profileText: "10년간의 실제 교육 현장 실무 경험을 바탕으로 기술 솔루션을 구현하는 풀스택 소프트웨어 엔지니어입니다. 학생 프라이버시(GDPR/COPPA 등) 규정을 100% 준수하는 엄격한 보안 하의 실전 에듀테크 플랫폼 및 기업용 자동화 파이프라인 개발에 특화되어 있으며, 교사의 행정 낭비를 기술로 지워 학습 본질에 집중할 수 있는 인프라를 구축하는 데 뛰어납니다.",
      experienceTitle: "경력 사항",
      skillsTitle: "핵심 기술 역량",
      educationTitle: "학력 및 교육 자격",
      contactTitle: "연락처 및 협업 제안",
      emailLabel: "대표 이메일",
      locationLabel: "근무지",
      locationVal: "대한민국 서울특별시",
      roles: [
        {
          company: "Chekki AI (체키)",
          title: "창업자 & 대표 개발 및 시스템 아키텍트",
          period: "2024 - 현재 (서비스 실가동 중)",
          bulletPoints: [
            "카메라 인화 검독형 이중언어 학습 비서 서비스인 'Chekki AI'를 창업하고 설계하여, 기존 30분의 교안 준비 공수를 5초 이내로 단축하는 솔루션 출시.",
            "Claude 3.5 Sonnet 비전 및 Gemini 정형 가상화 지침 프롬프팅 설계를 리드하여 매끄러운 한글 발음 기호 및 가이드 생성 자동화 완성.",
            "Zero-Memory 엄격 무저장 규약을 정립하여 청소년 정보 보안 최적화 및 학부모 안심 데이터 아키텍처 실현."
          ]
        },
        {
          company: "EduPlanner & Automated Consult Projects",
          title: "풀스택 엔지니어 & 가교 자동화 시스템 설계자",
          period: "2022 - 2024",
          bulletPoints: [
            "교실 자원 배치, 교직원 순환 휴일 및 피로도 자동 제어가 포함된 무결점 컴파일러 엔진 개발 완료.",
            "Softr 기반의 독립 포털 및 관계형 Airtable 구조를 Make.com 및 Express 프록시 서버 연쇄 API로 가교 연결하여 관리 오버헤드를 80% 이상 전면 자동 처리.",
            "현직 교육 부서 파일럿 연동에서 교실당 매주 평균 15시간의 행정 행위 소거 성과 검증."
          ]
        },
        {
          company: "국내 초등·고등 외국어 학군 교육 기관",
          title: "해드 클래스 교직원 & 원어민 교육 담당 리더",
          period: "2014 - 2024",
          bulletPoints: [
            "국내 주요 학군 내에서 총합 12,000시간 이상의 실제 영어 전공 교안 설계 및 행정, 학부모 상담 총괄 관리.",
            "정량화된 관찰 데이터를 시각 이미지 보고서로 실시간 변환하는 분석 프로토타입 설계 및 교사 연수 주최.",
            "저학년 대상의 저코드/노코드 창의 교구 도입으로 수업 몰입도 향상 수치 4x 달성."
          ]
        }
      ],
      skills: [
        { category: "개발 언어 및 프레임워크", items: ["TypeScript", "JavaScript (ES6+)", "React 18", "Node.js", "Express.js", "HTML5/CSS3", "Vite"] },
        { category: "데이터 및 백엔드 가교", items: ["Airtable Relational DB", "Firebase/Firestore", "Make.com (Integromat)", "Softr", "Capacitor Native SDK"] },
        { category: "AI 엔지니어링", items: ["Anthropic Claude 3.5 API", "Google Gemini API", "Structured XML Prompts", "LLM Vision API"] },
        { category: "비즈니스 보안 및 규제", items: ["유저 프라이버시 규제 대응", "한/영 이중언어 현지화 통합", "인스턴스 웹 훅 제어", "RevenueCat 정기결정 구독 설계"] }
      ],
      education: [
        { institution: "초·중등 정교사 / 어학 교육 라이센스", degree: "전문 교육학 & 커리큘럼 설계 검정 과정 수료", period: "교사 연수 정기 자격증 보유" },
        { institution: "풀스택 소프트웨어 엔지니어링 스쿨 수료", degree: "웹 애플리케이션 및 클라우드 시스템 설계 전문 포트폴리오 인증", period: "프로젝트 성과 보증인 자격" }
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

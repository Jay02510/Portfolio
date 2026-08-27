import React, { useState, useEffect, useRef } from 'react';
import { MailIcon, XIcon, FileTextIcon, PrinterIcon } from './Icons.tsx';
import UnifiedResume from './RoleSwitchResume.tsx';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  locale: 'en' | 'ko';
}

export default function ResumeModal({ isOpen, onClose, theme, locale }: ResumeModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Escape key handler and focus management
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const prevActiveElement = document.activeElement as HTMLElement;

    // Focus close button or container on mount
    dialogRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      prevActiveElement?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isDark = theme === 'dark';

  const triggerPdfDownload = () => {
    const originalTitle = document.title;
    document.title = 'Jason_Benjamin_AI_Product_Manager';

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);
    }, 150);
  };

  const headerTitle = locale === 'en'
    ? "JASON BENJAMIN — AI Product Manager Resume"
    : "제이슨 벤자민 — AI 프로덕트 매니저 이력서";

  const headerSubtitle = "jsn.benjamin@gmail.com · 010-5371-9266 · Seoul, Korea (Remote OK) · www.jason-portfolio.com";

  return (
    <div 
      id="resume-modal-overlay" 
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      ref={dialogRef}
      tabIndex={-1}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto print:static print:bg-white print:p-0 outline-none"
    >
      <div className={`relative w-full max-w-4xl rounded-2xl border shadow-2xl overflow-hidden transition-all duration-300 max-h-[90vh] flex flex-col ${
        isDark 
          ? 'bg-alpine-950 border-white/10 text-white' 
          : 'bg-[#faf9f6] border-black/10 text-alpine-950'
      } print:max-h-full print:border-none print:shadow-none print:w-full print:rounded-none print:text-black print:bg-white`}>
        
        {/* HEADER */}
        <div className={`p-4 sm:p-6 md:p-8 flex items-center justify-between gap-3 border-b shrink-0 ${
          isDark ? 'border-white/10 bg-white/[0.01]' : 'border-black/5 bg-black/[0.01]'
        } print:hidden`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-accent-gold/20 flex items-center justify-center shrink-0">
              <FileTextIcon className="w-4 h-4 sm:w-5 sm:h-5 text-accent-gold" />
            </div>
            <div className="min-w-0">
              <h3 id="resume-modal-title" className="text-sm sm:text-base md:text-lg font-display font-medium leading-tight truncate">{headerTitle}</h3>
              <p className={`text-[10px] sm:text-xs mt-0.5 sm:mt-1 truncate ${isDark ? 'text-white/60' : 'text-alpine-950/60'}`}>{headerSubtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button 
              onClick={triggerPdfDownload}
              className="px-3 py-2 sm:px-4 sm:py-2 bg-accent-gold hover:brightness-110 text-alpine-950 rounded-full text-xs font-bold uppercase tracking-wider transition-all active:scale-95 shadow-md flex items-center gap-1.5 whitespace-nowrap"
            >
              <PrinterIcon className="w-3.5 h-3.5" />
              <span>{locale === 'en' ? "Print / Save PDF" : "인쇄 / PDF 저장"}</span>
            </button>
            <button 
              onClick={onClose}
              className={`w-11 h-11 rounded-full border transition-colors flex items-center justify-center ${
                isDark ? 'border-white/10 hover:bg-white/10 text-white/80 hover:text-white' : 'border-black/10 hover:bg-black/10 text-alpine-950/80 hover:text-alpine-950'
              }`}
              aria-label={locale === 'ko' ? "이력서 닫기" : "Close resume"}
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="p-6 md:p-10 overflow-y-auto space-y-8 md:space-y-12 shrink print:overflow-visible print:p-0 print:space-y-8">
          
          {/* UNIFIED RESUME VIEW */}
          <UnifiedResume
            locale={locale}
            theme={theme}
          />

          {/* CONTACT INFO CONTAINER */}
          <div className={`p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-6 ${
            isDark ? 'bg-white/[0.01] border-white/5' : 'bg-black/[0.01] border-black/5'
          } print:hidden`}>
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-accent-gold">{locale === 'en' ? "Get in Touch" : "연락처 및 협업 제안"}</h4>
              <p className={`text-xs mt-1 ${isDark ? 'text-white/60' : 'text-alpine-950/60'}`}>
                {locale === 'en'
                  ? "Available for AI product strategy, 0-to-1 generative AI development, and enterprise SaaS opportunities."
                  : "AI 프로덕트 전략 수립, 0-to-1 생성형 AI 개발 및 엔터프라이즈 SaaS 협업 제안을 환영합니다."}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a 
                href="mailto:jsn.benjamin@gmail.com?subject=Strategic%20Opportunity%20Inquiry"
                className="px-5 py-3 rounded-full bg-accent-gold text-alpine-950 text-xs font-black uppercase tracking-widest inline-flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-md font-mono"
              >
                <MailIcon className="w-3.5 h-3.5" />
                <span>jsn.benjamin@gmail.com</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

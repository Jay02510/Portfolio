import React, { useState } from 'react';
import { MailIcon, XIcon, FileTextIcon, PrinterIcon } from './Icons.tsx';
import RoleSwitchResume, { ActiveRole, ROLE_TITLES } from './RoleSwitchResume.tsx';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  locale: 'en' | 'ko';
}

export default function ResumeModal({ isOpen, onClose, theme, locale }: ResumeModalProps) {
  const [isInIframe, setIsInIframe] = useState(false);
  const [activeRole, setActiveRole] = useState<ActiveRole>('pm');
  const [showPrintSelector, setShowPrintSelector] = useState(false);

  React.useEffect(() => {
    try {
      setIsInIframe(window.self !== window.top);
    } catch (e) {
      setIsInIframe(true);
    }
  }, []);

  if (!isOpen) return null;

  const isDark = theme === 'dark';

  const triggerPdfDownload = (selectedRole: ActiveRole) => {
    setActiveRole(selectedRole);
    setShowPrintSelector(false);

    // Set document title so PDF save defaults to exact specified filename
    const filenameMap: Record<ActiveRole, string> = {
      pm: 'Jason_Benjamin_AI_Product_Manager',
      edtech: 'Jason_Benjamin_EdTech_PM',
      eng: 'Jason_Benjamin_AI_Integration_Engineer'
    };

    const originalTitle = document.title;
    document.title = filenameMap[selectedRole];

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);
    }, 150);
  };

  const headerTitle = locale === 'en'
    ? "JASON BENJAMIN — Interactive Career & Role Experience Resume"
    : "제이슨 벤자민 — AI 프로덕트 & 에듀테크 통합 이력서";

  const headerSubtitle = "jsn.benjamin@gmail.com · 010 5371 9266 · Seoul, South Korea (Open to Remote) · jason-portfolio.com";

  return (
    <div id="resume-modal-overlay" className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto print:static print:bg-white print:p-0">
      
      {/* ROLE SELECTOR MODAL FOR PDF DOWNLOAD */}
      {showPrintSelector && (
        <div className="fixed inset-0 z-[350] bg-black/85 backdrop-blur-lg flex items-center justify-center p-4 print:hidden animate-fade-in">
          <div className="bg-neutral-900 border border-accent-gold/40 rounded-2xl p-6 md:p-8 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <PrinterIcon className="w-5 h-5 text-accent-gold" />
                <h4 className="text-base font-bold text-white font-display">
                  {locale === 'en' ? "Select PDF Resume Role" : "PDF 저장용 이력서 관점 선택"}
                </h4>
              </div>
              <button
                onClick={() => setShowPrintSelector(false)}
                className="p-1.5 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/20"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-white/70 leading-relaxed font-light">
              {locale === 'en'
                ? "Choose which tailored perspective to print or download as an ATS-compliant single-column PDF:"
                : "인쇄 및 ATS 호환 단일 컬럼 PDF로 다운로드할 이력서 버전을 선택하세요:"}
            </p>

            <div className="space-y-3">
              {(['pm', 'eng', 'edtech'] as ActiveRole[]).map((rKey) => (
                <button
                  key={rKey}
                  onClick={() => triggerPdfDownload(rKey)}
                  className="w-full text-left p-4 rounded-xl border border-white/10 bg-neutral-950/80 hover:bg-accent-gold/15 hover:border-accent-gold transition-all duration-150 group space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono uppercase tracking-wider text-accent-gold group-hover:text-white">
                      {rKey === 'pm' && "AI Product Manager"}
                      {rKey === 'eng' && "AI Integration Engineer"}
                      {rKey === 'edtech' && "EdTech Product Manager"}
                    </span>
                    <span className="text-[10px] text-white/40 group-hover:text-accent-gold font-mono">
                      .pdf ↗
                    </span>
                  </div>
                  <div className="text-xs text-white/80 font-light">
                    {ROLE_TITLES[rKey][locale]}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowPrintSelector(false)}
                className="px-4 py-2 text-xs text-white/60 hover:text-white font-mono"
              >
                {locale === 'en' ? "Cancel" : "취소"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`relative w-full max-w-4xl rounded-2xl border shadow-2xl overflow-hidden transition-all duration-300 max-h-[90vh] flex flex-col ${
        isDark 
          ? 'bg-alpine-950 border-white/10 text-white' 
          : 'bg-[#faf9f6] border-black/10 text-alpine-950'
      } print:max-h-full print:border-none print:shadow-none print:w-full print:rounded-none print:text-black print:bg-white`}>
        
        {/* HEADER */}
        <div className={`p-6 md:p-8 flex items-center justify-between border-b shrink-0 ${
          isDark ? 'border-white/10 bg-white/[0.01]' : 'border-black/5 bg-black/[0.01]'
        } print:hidden`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-gold/20 flex items-center justify-center shrink-0">
              <FileTextIcon className="w-5 h-5 text-accent-gold" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-display font-medium leading-tight">{headerTitle}</h3>
              <p className={`text-xs mt-1 ${isDark ? 'text-white/60' : 'text-alpine-950/60'}`}>{headerSubtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setShowPrintSelector(true)}
              className="px-4 py-2 bg-accent-gold hover:brightness-110 text-alpine-950 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-md flex items-center gap-1.5"
            >
              <PrinterIcon className="w-3.5 h-3.5" />
              <span>{locale === 'en' ? "Print / Save as PDF" : "인쇄 / PDF로 저장"}</span>
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

        {/* SCROLLABLE BODY */}
        <div className="p-6 md:p-10 overflow-y-auto space-y-8 md:space-y-12 shrink print:overflow-visible print:p-0 print:space-y-8">
          
          {/* IFRAME NOTICE BANNER */}
          {isInIframe && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs rounded-xl flex items-start gap-3 print:hidden shadow-inner">
              <span className="text-base leading-none">⚠️</span>
              <div className="space-y-1">
                <p className="font-extrabold uppercase tracking-wide text-amber-400">
                  {locale === 'en' ? "Running in AI Studio Preview Iframe" : "AI Studio 프리뷰 화면 실행 중"}
                </p>
                <p className="opacity-90 leading-relaxed text-[11px]">
                  {locale === 'en' 
                    ? "Standard browser print dialogs are restricted inside preview panels. To download this highly polished resume as a clean PDF: Please open the app in a new tab by clicking the external link icon (arrow icon in the top-right corner of the AI Studio preview pane), then open the resume modal and click Print / Save as PDF!" 
                    : "브라우저 보안 샌드박스로 인해 프리뷰 화면 내에서는 인쇄 및 PDF 저장(window.print()) 호출이 제한됩니다. 고해상도 PDF 이력서를 온전히 다운로드 받으시려면, 프리뷰 우측 상단의 새 창에서 열기(화살표 아이콘) 버튼을 누른 뒤 이력서 인쇄 단추를 눌러주세요!"}
                </p>
              </div>
            </div>
          )}

          {/* DYNAMIC ROLE SWITCHABLE RESUME */}
          <RoleSwitchResume
            locale={locale}
            theme={theme}
            activeRole={activeRole}
            onRoleChange={setActiveRole}
          />

          {/* CONTACT INFO CONTAINER */}
          <div className={`p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-6 ${
            isDark ? 'bg-white/[0.01] border-white/5' : 'bg-black/[0.01] border-black/5'
          } print:hidden`}>
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-accent-gold">{locale === 'en' ? "Get in Touch" : "연락처 및 협업 제안"}</h4>
              <p className={`text-xs mt-1 ${isDark ? 'text-white/60' : 'text-alpine-950/60'}`}>
                Available for curriculum design, AI product architecture, and enterprise SaaS integrations.
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

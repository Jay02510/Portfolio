import React from 'react';

interface ShippedProject {
  id: string;
  domains: string[];
  title: string;
  status: string;
  desc: string;
  outcome: string;
  stack: string[];
  liveUrl?: string;
  contactUrl?: string;
  caseStudyId: string;
}

interface CompactProjectCardProps {
  project: ShippedProject;
  theme?: 'light' | 'dark';
  locale?: 'en' | 'ko';
  caseLabel: string;
  onOpenCaseStudy: (id: string) => void;
}

export const CompactProjectCard: React.FC<CompactProjectCardProps> = ({
  project,
  theme = 'dark',
  locale = 'en',
  caseLabel,
  onOpenCaseStudy
}) => {
  const isDark = theme === 'dark';

  return (
    <article
      onClick={() => onOpenCaseStudy(project.caseStudyId)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenCaseStudy(project.caseStudyId);
        }
      }}
      aria-label={`${project.title} — ${locale === 'ko' ? '케이스 스터디 열기' : 'Open case study'}`}
      className={`rounded-2xl border flex flex-col h-full cursor-pointer group transition-[border-color,box-shadow,transform] duration-300 active:scale-95 focus-visible:ring-2 focus-visible:ring-accent-gold outline-none p-6 ${
        isDark
          ? 'bg-[#15181e] border-white/10 hover:border-accent-gold/40 hover:shadow-xl shadow-black/40'
          : 'bg-white border-black/10 hover:border-accent-clay/40 hover:shadow-xl shadow-black/5'
      }`}
    >
      <div className={`text-[10.5px] font-bold tracking-widest uppercase ${
        isDark ? 'text-[#788290]' : 'text-[#6b7280]'
      }`}>
        {project.status}
      </div>

      <h3 className={`mt-1.5 text-lg font-display font-semibold tracking-tight transition-colors ${
        isDark ? 'text-white group-hover:text-accent-gold' : 'text-alpine-950 group-hover:text-accent-clay'
      }`}>
        {project.title}
      </h3>

      <p className={`mt-2 text-sm leading-relaxed flex-1 ${
        isDark ? 'text-[#a3acb9]' : 'text-[#4b5563]'
      }`}>
        {project.desc}
      </p>

      <div className="mt-3 text-sm font-semibold leading-relaxed text-accent-gold">
        {project.outcome}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((t, idx) => (
          <span
            key={idx}
            className={`text-[11px] font-mono px-2 py-0.5 rounded ${
              isDark ? 'bg-white/[0.05] text-[#a3acb9]' : 'bg-black/[0.05] text-[#4b5563]'
            }`}
          >
            {t}
          </span>
        ))}
      </div>

      <div className={`mt-5 pt-4 border-t flex items-center justify-between gap-3 ${
        isDark ? 'border-white/10' : 'border-black/10'
      }`}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenCaseStudy(project.caseStudyId);
          }}
          className="text-xs font-bold text-accent-gold hover:underline whitespace-nowrap"
        >
          {caseLabel}
        </button>

        <div className="flex items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`text-xs font-semibold whitespace-nowrap hover:underline ${
                isDark ? 'text-[#a3acb9]' : 'text-[#4b5563]'
              }`}
            >
              Launch Live ↗
            </a>
          )}
          {project.contactUrl && (
            <a
              href={project.contactUrl}
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-bold text-accent-gold hover:underline whitespace-nowrap"
            >
              {locale === 'en' ? "Contact to try ↗" : "체험 문의 ↗"}
            </a>
          )}
        </div>
      </div>
    </article>
  );
};


import React, { useState } from 'react';
import { CodeIcon, SendIcon, MailIcon, FileTextIcon, SparklesIcon } from './Icons.tsx';
import { generateSolutionsForProblem, SolutionSuggestion } from '../services/geminiService.ts';

interface InteractiveDemoProps {
  theme?: 'light' | 'dark';
}

const InteractiveDemo: React.FC<InteractiveDemoProps> = ({ theme = 'dark' }) => {
  const [problem, setProblem] = useState('');
  const [loading, setLoading] = useState(false);
  const [solutions, setSolutions] = useState<SolutionSuggestion[] | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!problem.trim()) return;
    setLoading(true);
    setSolutions(null);
    setSelectedSolution(null);
    setCopiedIndex(null);
    const data = await generateSolutionsForProblem(problem);
    setSolutions(data);
    setLoading(false);
  };

  const handleCopySummary = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!solutions) return;
    const sol = solutions[index];
    const text = `Problem: ${problem}\nProposed Solution: ${sol.title}\nDescription: ${sol.description}\nImpact: ${sol.impact}`;
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 3000);
  };

  const handleSelect = (index: number) => {
    setSelectedSolution(index);
    if (solutions) {
      const sol = solutions[index];
      const subject = encodeURIComponent(`Let's talk about: ${sol.title}`);
      const body = encodeURIComponent(
        `Hi Jason,\n\nI used your Live AI Playground and I'd like to talk about this helper: "${sol.title}"\n\nProblem: ${problem}\n\nMy Idea: ${sol.description}\n\nCan we chat?`
      );
      window.location.href = `mailto:jsn.benjamin@gmail.com?subject=${subject}&body=${body}`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
      <div className={`absolute inset-0 rounded-[3rem] blur-[120px] opacity-20 pointer-events-none transition-all duration-1000 ${theme === 'dark' ? 'bg-accent-gold/10' : 'bg-accent-clay/10'}`}></div>
      
      <div className={`rounded-2xl overflow-hidden shadow-2xl relative z-10 lab-blueprint-bg min-h-[650px] border transition-all duration-500 ${theme === 'dark' ? 'bg-alpine-950 border-white/10' : 'bg-white border-black/8 shadow-2xl'}`}>
        <div className="grid lg:grid-cols-12 min-h-[inherit]">
          {/* Input Panel */}
          <div className={`lg:col-span-5 p-8 md:p-16 border-r flex flex-col justify-between transition-colors duration-500 ${theme === 'dark' ? 'bg-alpine-950/80 border-white/10' : 'bg-white/95 border-black/10'}`}>
            <div className="space-y-8">
              <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border text-[11px] font-bold uppercase tracking-[0.4em] transition-colors ${theme === 'dark' ? 'bg-accent-gold/10 border-accent-gold/20 text-accent-gold' : 'bg-accent-clay/10 border-accent-clay/20 text-accent-clay'}`}>
                <SparklesIcon className={`w-3.5 h-3.5 animate-pulse ${theme === 'dark' ? 'text-accent-gold' : 'text-accent-clay'} shrink-0`} />
                Live No-Code AI Playground
              </div>
              
              <h2 className={`text-4xl md:text-6xl font-medium tracking-tight font-display leading-[1.1] ${theme === 'dark' ? 'text-white' : 'text-alpine-950'}`}>
                Describe a <br/><span className={`italic font-light ${theme === 'dark' ? 'text-white/50' : 'text-alpine-950/40'}`}>problem.</span>
              </h2>
              
              <p className={`text-base md:text-lg font-normal leading-relaxed max-w-sm ${theme === 'dark' ? 'text-white/50' : 'text-alpine-950/70'}`}>
                Tell me about a task at school that is boring, hard, or repetitive. I'll show you three ways we could build a digital helper to fix it.
              </p>
            </div>

            <div className="space-y-6 mt-12">
              <div className="relative group">
                <textarea 
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="Example: It takes me too long to check if every student has handed in their permission slips..."
                  className={`w-full rounded-2xl px-8 py-8 text-base placeholder-current focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/70 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-alpine-950 transition-all font-medium min-h-[200px] resize-none border ${
                    theme === 'dark' 
                      ? 'bg-white/[0.04] border-white/10 text-white placeholder-white/20 focus:ring-accent-gold/20' 
                      : 'bg-black/[0.05] border-black/10 text-alpine-950 placeholder-alpine-950/40 focus:ring-accent-clay/20'
                  }`}
                  aria-label="Describe your school problem"
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className={`text-[9px] font-black uppercase tracking-[0.15em] block w-full opacity-40 mb-1 ${theme === 'dark' ? 'text-white' : 'text-alpine-950'}`}>Or try an example challenge:</span>
                <button 
                  onClick={() => setProblem("It takes me 30 minutes per sheet to prepare Korean translation worksheets and matching audio pronunciation notes for my parents.")}
                  className={`text-[10px] font-medium px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-white/[0.02] border-white/10 hover:bg-white/10 text-white hover:text-accent-gold hover:border-accent-gold/40' 
                      : 'bg-black/[0.02] border-black/10 hover:bg-black/5 text-alpine-950/80 hover:text-accent-clay hover:border-accent-clay/40'
                  }`}
                >
                  📝 Bilingual Prep
                </button>
                <button 
                  onClick={() => setProblem("I spend 10+ hours a week copying student test results into spreadsheets and writing customized reports to parents.")}
                  className={`text-[10px] font-medium px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-white/[0.02] border-white/10 hover:bg-white/10 text-white hover:text-accent-gold hover:border-accent-gold/40' 
                      : 'bg-black/[0.02] border-black/10 hover:bg-black/5 text-alpine-950/80 hover:text-accent-clay hover:border-accent-clay/40'
                  }`}
                >
                  📊 Auto Reports
                </button>
                <button 
                  onClick={() => setProblem("Our school staff gets bogged down manually aligning rooms, substitute schedules, and staff rotations by hand every semester.")}
                  className={`text-[10px] font-medium px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-white/[0.02] border-white/10 hover:bg-white/10 text-white hover:text-accent-gold hover:border-accent-gold/40' 
                      : 'bg-black/[0.02] border-black/10 hover:bg-black/5 text-alpine-950/80 hover:text-accent-clay hover:border-accent-clay/40'
                  }`}
                >
                  🕒 School Scheduling
                </button>
              </div>
              
              <button 
                onClick={handleGenerate}
                disabled={loading || !problem.trim()}
                className="w-full shiny-cta disabled:opacity-40 transition-all shadow-xl py-6"
                aria-label="Generate solutions"
              >
                {loading ? 'Finding ideas...' : 'Show Me Helpers'}
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className={`lg:col-span-7 p-8 md:p-16 relative flex flex-col transition-colors duration-500 ${theme === 'dark' ? 'bg-black/30' : 'bg-alpine-100/40'}`}>
             {!solutions && !loading && (
               <div className="flex-1 flex flex-col items-center justify-center text-center space-y-10 animate-in fade-in duration-1000">
                  <div className={`w-24 h-24 rounded-full border flex items-center justify-center transition-all ${theme === 'dark' ? 'border-white/10 bg-white/[0.02]' : 'border-black/5 bg-white shadow-xl'}`}>
                      <CodeIcon className={`w-10 h-10 ${theme === 'dark' ? 'text-white/10' : 'text-black/10'} shrink-0`} />
                  </div>
                  <div className="space-y-4">
                    <p className={`text-[12px] font-bold uppercase tracking-[0.7em] ${theme === 'dark' ? 'text-white/30' : 'text-alpine-950/40'}`}>Ready to Help</p>
                    <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] max-w-[240px] mx-auto leading-relaxed ${theme === 'dark' ? 'text-white/20' : 'text-alpine-950/30'}`}>Enter your challenge to generate 3 custom ideas</p>
                  </div>
               </div>
             )}

             {loading && (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-alpine-950/5 backdrop-blur-2xl z-50">
                  <div className={`w-16 h-16 border-t-2 rounded-full animate-spin mb-8 transition-colors ${theme === 'dark' ? 'border-accent-gold' : 'border-accent-clay'}`}></div>
                  <span className={`text-[12px] font-bold uppercase tracking-[0.6em] animate-pulse ${theme === 'dark' ? 'text-accent-gold' : 'text-accent-clay'}`}>Working...</span>
               </div>
             )}

             {solutions && (
               <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700 flex-1 overflow-y-auto pr-4 custom-scrollbar">
                  <div className={`flex flex-col md:flex-row md:items-end justify-between border-b pb-10 gap-6 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
                    <h3 className={`text-4xl md:text-5xl font-medium font-display tracking-tight ${theme === 'dark' ? 'text-white' : 'text-alpine-950'}`}>Ways I can help</h3>
                    <div className={`text-[11px] font-bold uppercase tracking-[0.5em] ${theme === 'dark' ? 'text-white/30' : 'text-black/40'}`}>Helper Idea</div>
                  </div>

                  <div className="grid gap-8">
                    {solutions.map((sol, i) => (
                      <div 
                        key={i} 
                        onClick={() => handleSelect(i)}
                        className={`rounded-[2.2rem] border p-2 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.01] ${
                          selectedSolution === i 
                          ? (theme === 'dark' ? 'bg-accent-gold/25 border-accent-gold/40 shadow-2xl shadow-accent-gold/5' : 'bg-accent-clay/20 border-accent-clay/35 shadow-2xl shadow-accent-clay/5') 
                          : (theme === 'dark' ? 'bg-white/[0.01] border-white/5 hover:border-white/15' : 'bg-black/[0.02] border-black/5 hover:border-black/10')
                        }`}
                      >
                        <div className={`rounded-[1.8rem] p-6 md:p-10 relative overflow-hidden h-full border transition-all duration-500 ${
                          selectedSolution === i 
                          ? (theme === 'dark' ? 'bg-accent-gold border-accent-gold text-alpine-950' : 'bg-accent-clay border-accent-clay text-white') 
                          : (theme === 'dark' ? 'bg-white/[0.04] border-white/5' : 'bg-white border-black/5 shadow-inner')
                        }`}>
                          {selectedSolution === i && (
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/25 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                          )}

                          <div className="flex justify-between items-start mb-6 gap-6 relative z-10">
                            <h5 className={`text-2xl md:text-3xl font-medium font-display transition-colors ${selectedSolution === i ? (theme === 'dark' ? 'text-alpine-950' : 'text-white') : (theme === 'dark' ? 'text-white' : 'text-alpine-950')}`}>
                              {sol.title}
                            </h5>
                            <button 
                              onClick={(e) => handleCopySummary(i, e)}
                              className={`p-3 rounded-xl border transition-all ${
                                selectedSolution === i 
                                ? (theme === 'dark' ? 'border-black/15 hover:bg-black/10 text-black' : 'border-white/20 hover:bg-white/10 text-white') 
                                : (theme === 'dark' ? 'border-white/10 hover:bg-white/10 text-white/40' : 'border-black/10 hover:bg-black/5 text-black/40')
                              }`}
                              title="Copy Summary"
                              aria-label="Copy solution summary"
                            >
                              <FileTextIcon className="w-5 h-5" />
                            </button>
                          </div>

                          {copiedIndex === i && (
                            <div className="absolute top-6 right-20 animate-in fade-in zoom-in duration-300 z-20">
                               <span className={`text-[10px] font-bold uppercase px-4 py-1.5 rounded-full shadow-2xl ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>Copied to Clipboard</span>
                            </div>
                          )}
                          
                          <p className={`text-base md:text-lg font-normal leading-relaxed mb-10 relative z-10 transition-colors ${selectedSolution === i ? (theme === 'dark' ? 'text-alpine-950/90' : 'text-white/95') : (theme === 'dark' ? 'text-white/60' : 'text-alpine-950/80')}`}>
                            {sol.description}
                          </p>

                          <div className={`flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.4em] transition-all duration-500 relative z-10 ${
                            selectedSolution === i ? (theme === 'dark' ? 'text-alpine-950' : 'text-white') : (theme === 'dark' ? 'text-accent-gold' : 'text-accent-clay')
                          }`}>
                            <div className={`px-5 py-3 rounded-xl border flex items-center gap-4 ${selectedSolution === i ? 'border-current' : (theme === 'dark' ? 'border-white/10' : 'border-black/10')}`}>
                               <MailIcon className="w-5 h-5" />
                               <span>Discuss this idea</span>
                            </div>
                            <span className={`ml-auto hidden sm:inline-block px-4 py-1.5 rounded-full border text-[10px] font-bold ${selectedSolution === i ? 'border-current' : 'border-current opacity-40'}`}>
                               {sol.impact}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;

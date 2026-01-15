import React, { useState } from 'react';
import { SparklesIcon, SendIcon, MailIcon } from './Icons';
import { generateSolutionsForProblem, SolutionSuggestion } from '../services/geminiService';

const InteractiveDemo: React.FC = () => {
  const [problem, setProblem] = useState('');
  const [loading, setLoading] = useState(false);
  const [solutions, setSolutions] = useState<SolutionSuggestion[] | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!problem.trim()) return;
    setLoading(true);
    setSolutions(null);
    setSelectedSolution(null);
    const data = await generateSolutionsForProblem(problem);
    setSolutions(data);
    setLoading(false);
  };

  const handleSelect = (index: number) => {
    setSelectedSolution(index);
    if (solutions) {
      const sol = solutions[index];
      const subject = encodeURIComponent(`Project Build: ${sol.title}`);
      const body = encodeURIComponent(
        `Hi Jason,\n\nI just used your Solution Lab and I'm interested in developing this tool: "${sol.title}"\n\nOriginal Problem: ${problem}\n\nProposed Feature Set: ${sol.description}\n\nSuggested Stack: ${sol.technicalStack.join(', ')}\n\nExpected Outcome: ${sol.impact}\n\nLet's discuss how we can build this out.`
      );
      window.location.href = `mailto:jsn.benjamin@gmail.com?subject=${subject}&body=${body}`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 relative">
      {/* Visual background layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/5 to-transparent rounded-[3rem] blur-3xl opacity-30"></div>
      
      <div className="glass-panel rounded-[3rem] overflow-hidden border-white/5 shadow-2xl relative z-10 lab-blueprint-bg min-h-[700px]">
        <div className="grid lg:grid-cols-12 min-h-[inherit]">
          {/* Input Panel */}
          <div className="lg:col-span-4 p-12 md:p-16 border-r border-white/5 space-y-12 bg-alpine-950/40">
            <div>
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-accent-gold/5 border border-accent-gold/10 text-accent-gold text-[9px] font-bold uppercase tracking-[0.4em] mb-10">
                <div className="w-1 h-1 bg-accent-gold rounded-full animate-ping"></div>
                Live System Lab
              </div>
              <h2 className="text-4xl font-light text-white tracking-tight mb-6 font-display leading-[1.1]">Problem <br/><span className="italic text-white/30">Architecture.</span></h2>
              <p className="text-white/20 text-xs font-light leading-relaxed tracking-wide max-w-xs">
                Describe a friction point in your current workflow. Our AI-driven lab will architect three buildable solutions Jason can develop for you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="relative group">
                <textarea 
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="I spend too much time manually updating student portfolios every Friday..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-6 text-white text-sm placeholder-white/5 focus:outline-none focus:border-accent-gold/30 transition-all font-light min-h-[240px] resize-none"
                />
                <div className="absolute bottom-4 right-4 text-[8px] font-bold uppercase tracking-widest text-white/10 pointer-events-none group-focus-within:opacity-0 transition-opacity">
                  Describe the friction
                </div>
              </div>
              
              <button 
                onClick={handleGenerate}
                disabled={loading || !problem.trim()}
                className="w-full shiny-cta disabled:opacity-20 py-6 transition-all active:scale-95"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 border-t-2 border-current rounded-full animate-spin"></div>
                    Architecting...
                  </div>
                ) : 'Run Simulation'}
              </button>
            </div>
          </div>

          {/* Output / Results Panel */}
          <div className="lg:col-span-8 p-12 md:p-16 relative bg-black/30 flex flex-col">
             {!solutions && !loading && (
               <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in duration-700">
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent-gold/5 blur-[80px] rounded-full"></div>
                    <div className="w-24 h-24 rounded-full border border-white/5 flex items-center justify-center bg-white/[0.01] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-t from-accent-gold/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-1000"></div>
                        <SendIcon className="w-8 h-8 text-white/10 group-hover:text-white/40 transition-colors duration-700" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-white/20 font-bold text-[10px] uppercase tracking-[0.8em]">System Idle</p>
                    <p className="text-[10px] text-white/10 italic">Awaiting problem input for solution synthesis</p>
                  </div>
               </div>
             )}

             {loading && (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-alpine-950/80 backdrop-blur-3xl z-50 animate-in fade-in duration-500">
                  <div className="relative mb-12">
                    <div className="w-20 h-20 border-t-2 border-accent-gold rounded-full animate-spin"></div>
                    <div className="absolute inset-0 border border-white/5 rounded-full scale-150 animate-pulse"></div>
                  </div>
                  <div className="space-y-2 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[1em] text-accent-gold animate-pulse block">Analyzing Logic</span>
                    <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 block">Cross-referencing pedagogic frameworks</span>
                  </div>
               </div>
             )}

             {solutions && (
               <div className="space-y-12 animate-in fade-in slide-in-from-right-12 duration-1000 flex-1 overflow-y-auto pr-4 scroll-hidden">
                  <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-12 gap-8">
                    <div className="space-y-3">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.6em] text-accent-gold/60">Architectural Report</h3>
                      <h4 className="text-5xl font-light font-display text-white tracking-tight">Proposed Builds</h4>
                    </div>
                    <div className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20">3 Viable Systems Found</div>
                  </div>

                  <div className="space-y-8">
                    {solutions.map((sol, i) => (
                      <div 
                        key={i} 
                        className={`group p-10 rounded-[2.5rem] border transition-all duration-700 cursor-pointer relative overflow-hidden ${
                          selectedSolution === i 
                          ? 'bg-accent-gold border-accent-gold shadow-2xl scale-[1.01]' 
                          : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]'
                        }`}
                        onClick={() => handleSelect(i)}
                      >
                        <div className="flex justify-between items-start mb-8 gap-4">
                          <h5 className={`text-3xl font-light font-display tracking-tight leading-none ${selectedSolution === i ? 'text-alpine-950' : 'text-white'}`}>
                            {sol.title}
                          </h5>
                          <span className={`text-[8px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border shrink-0 ${
                            selectedSolution === i ? 'border-black/20 text-black/60' : 'border-white/10 text-white/20'
                          }`}>
                            {sol.impact}
                          </span>
                        </div>
                        
                        <p className={`text-sm font-light leading-relaxed mb-10 max-w-2xl ${selectedSolution === i ? 'text-alpine-950/90' : 'text-white/40'}`}>
                          {sol.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-10">
                          {sol.technicalStack.map(stack => (
                            <span key={stack} className={`text-[9px] font-bold uppercase tracking-tight px-3 py-1.5 rounded-lg border ${
                              selectedSolution === i ? 'bg-black/5 border-black/10 text-black/50' : 'bg-white/5 border-white/5 text-white/30'
                            }`}>
                              {stack}
                            </span>
                          ))}
                        </div>

                        <div className={`flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.5em] transition-all duration-700 ${
                          selectedSolution === i ? 'text-alpine-950' : 'text-accent-gold opacity-0 translate-x-[-20px] group-hover:opacity-100 group-hover:translate-x-0'
                        }`}>
                          <div className="w-5 h-[1px] bg-current opacity-30"></div>
                          Inquire about this build
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
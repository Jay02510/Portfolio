
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
      const subject = encodeURIComponent(`MVP Proposal: ${sol.title}`);
      const body = encodeURIComponent(
        `Hi Jason,\n\nI used your Systems Lab and I'm interested in building an MVP for: "${sol.title}"\n\nProblem context: ${problem}\n\nProposed Solution: ${sol.description}\n\nStack: ${sol.technicalStack.join(', ')}\n\nExpected Impact: ${sol.impact}\n\nLet's talk about how to make this real.`
      );
      window.location.href = `mailto:jsn.benjamin@gmail.com?subject=${subject}&body=${body}`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="glass-panel rounded-[3rem] overflow-hidden border-white/5 shadow-2xl">
        <div className="grid lg:grid-cols-12">
          {/* Input Side */}
          <div className="lg:col-span-4 p-12 md:p-16 border-r border-white/5 space-y-12">
            <div>
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-accent-gold/5 border border-accent-gold/10 text-accent-gold text-[9px] font-bold uppercase tracking-[0.3em] mb-8">
                <SparklesIcon className="w-3.5 h-3.5" />
                Architect Sandbox v2.0
              </div>
              <h2 className="text-4xl font-light text-white tracking-tight mb-6 font-display">Fix a System.</h2>
              <p className="text-white/40 text-sm font-light leading-relaxed tracking-wide">
                Describe a bottleneck, a friction point, or a manual task in your classroom or office. I'll architect the solution.
              </p>
            </div>

            <div className="space-y-6">
              <textarea 
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Ex: My teachers spend 4 hours a week manually translating reports for parents..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-accent-gold/30 transition-all font-light min-h-[180px] resize-none"
              />
              
              <button 
                onClick={handleGenerate}
                disabled={loading || !problem.trim()}
                className="w-full shiny-cta disabled:opacity-50 py-6"
              >
                {loading ? 'Designing Solutions...' : 'Generate MVP Concepts'}
              </button>
            </div>
          </div>

          {/* Output Side */}
          <div className="lg:col-span-8 p-12 md:p-16 min-h-[600px] relative bg-black/20 overflow-y-auto">
             {!solutions && !loading && (
               <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-8">
                    <SendIcon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white font-bold text-[10px] uppercase tracking-[0.6em]">Awaiting Input Analysis</p>
               </div>
             )}

             {loading && (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-alpine-950/40 backdrop-blur-md z-50">
                  <div className="w-12 h-12 border-2 border-accent-gold/10 border-t-accent-gold rounded-full animate-spin mb-8"></div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent-gold">Mapping Logic for {problem.substring(0, 20)}...</span>
               </div>
             )}

             {solutions && (
               <div className="space-y-10 animate-in fade-in duration-700 pb-10">
                  <div className="flex justify-between items-end border-b border-white/5 pb-8">
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-2 text-accent-gold">Proposed Solutions</h3>
                      <h4 className="text-3xl font-light font-display text-white">System Architecture</h4>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-1 gap-6">
                    {solutions.map((sol, i) => (
                      <div 
                        key={i} 
                        className={`group p-8 rounded-3xl border transition-all cursor-pointer ${
                          selectedSolution === i 
                          ? 'bg-accent-gold border-accent-gold' 
                          : 'bg-white/[0.03] border-white/5 hover:border-white/20'
                        }`}
                        onClick={() => handleSelect(i)}
                      >
                        <div className="flex justify-between items-start mb-6">
                          <h5 className={`text-2xl font-light font-display ${selectedSolution === i ? 'text-alpine-950' : 'text-white'}`}>
                            {sol.title}
                          </h5>
                          <span className={`text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                            selectedSolution === i ? 'border-black/20 text-black/60' : 'border-white/10 text-white/30'
                          }`}>
                            {sol.impact}
                          </span>
                        </div>
                        
                        <p className={`text-sm font-light leading-relaxed mb-8 ${selectedSolution === i ? 'text-alpine-950/80' : 'text-white/50'}`}>
                          {sol.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                          {sol.technicalStack.map(stack => (
                            <span key={stack} className={`text-[8px] font-bold uppercase tracking-tighter px-2 py-1 rounded border ${
                              selectedSolution === i ? 'bg-black/5 border-black/10 text-black/40' : 'bg-white/5 border-white/5 text-white/20'
                            }`}>
                              {stack}
                            </span>
                          ))}
                        </div>

                        <div className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] transition-all ${
                          selectedSolution === i ? 'text-alpine-950' : 'text-accent-gold opacity-0 group-hover:opacity-100'
                        }`}>
                          <MailIcon className="w-3.5 h-3.5" />
                          {selectedSolution === i ? 'Opening Proposal...' : 'Select this MVP Solution'}
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

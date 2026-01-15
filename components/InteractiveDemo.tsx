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
      const subject = encodeURIComponent(`Let's build: ${sol.title}`);
      const body = encodeURIComponent(
        `Hi Jason,\n\nI used your Lab and I'd like to talk about building this tool: "${sol.title}"\n\nProblem: ${problem}\n\nMy Idea: ${sol.description}\n\nCan we chat about this?`
      );
      window.location.href = `mailto:jsn.benjamin@gmail.com?subject=${subject}&body=${body}`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/5 to-transparent rounded-[3rem] blur-3xl opacity-30"></div>
      
      <div className="glass-panel rounded-[3rem] overflow-hidden border-white/5 shadow-2xl relative z-10 lab-blueprint-bg min-h-[600px]">
        <div className="grid lg:grid-cols-12 min-h-[inherit]">
          {/* Input Panel */}
          <div className="lg:col-span-4 p-8 md:p-12 border-r border-white/5 space-y-10 bg-alpine-950/40">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-accent-gold/5 border border-accent-gold/10 text-accent-gold text-[9px] font-bold uppercase tracking-[0.4em] mb-8">
                <div className="w-1.5 h-1.5 bg-accent-gold rounded-full"></div>
                Solution Lab
              </div>
              <h2 className="text-3xl font-light text-white tracking-tight mb-4 font-display leading-tight text-gradient-white">Your <br/><span className="italic text-white/30">Problem.</span></h2>
              <p className="text-white/20 text-xs font-light leading-relaxed">
                Describe a boring or hard task at school. I'll show you three tools I can build to fix it.
              </p>
            </div>

            <div className="space-y-4">
              <textarea 
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Ex: I spend too long tracking student reading progress..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-5 text-white text-sm placeholder-white/10 focus:outline-none focus:border-accent-gold/30 transition-all font-light min-h-[200px] resize-none"
              />
              
              <button 
                onClick={handleGenerate}
                disabled={loading || !problem.trim()}
                className="w-full shiny-cta disabled:opacity-20 py-5"
              >
                {loading ? 'Thinking...' : 'Find a Solution'}
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-8 p-8 md:p-12 relative bg-black/30 flex flex-col">
             {!solutions && !loading && (
               <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center bg-white/[0.01]">
                      <SendIcon className="w-6 h-6 text-white/10" />
                  </div>
                  <p className="text-white/20 font-bold text-[10px] uppercase tracking-[0.6em]">Awaiting Input</p>
               </div>
             )}

             {loading && (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-alpine-950/80 backdrop-blur-3xl z-50">
                  <div className="w-12 h-12 border-t-2 border-accent-gold rounded-full animate-spin mb-6"></div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-accent-gold animate-pulse">Designing tools...</span>
               </div>
             )}

             {solutions && (
               <div className="space-y-10 animate-in fade-in duration-700 flex-1 overflow-y-auto pr-2">
                  <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-8 gap-4">
                    <h3 className="text-4xl font-light font-display text-white tracking-tight text-gradient-white">Tools I can build</h3>
                    <div className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20">3 Ideas Ready</div>
                  </div>

                  <div className="space-y-6">
                    {solutions.map((sol, i) => (
                      <div 
                        key={i} 
                        className={`group p-8 rounded-3xl border transition-all duration-500 cursor-pointer relative ${
                          selectedSolution === i 
                          ? 'bg-accent-gold border-accent-gold shadow-2xl scale-[1.01]' 
                          : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                        }`}
                        onClick={() => handleSelect(i)}
                      >
                        <div className="flex justify-between items-start mb-4 gap-4">
                          <h5 className={`text-2xl font-light font-display ${selectedSolution === i ? 'text-alpine-950' : 'text-white text-gradient-white'}`}>
                            {sol.title}
                          </h5>
                          <span className={`text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                            selectedSolution === i ? 'border-black/20 text-black/60' : 'border-white/10 text-white/20'
                          }`}>
                            {sol.impact}
                          </span>
                        </div>
                        
                        <p className={`text-sm font-light leading-relaxed mb-6 ${selectedSolution === i ? 'text-alpine-950/90' : 'text-white/40'}`}>
                          {sol.description}
                        </p>

                        <div className={`flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-500 ${
                          selectedSolution === i ? 'text-alpine-950' : 'text-accent-gold'
                        }`}>
                          <MailIcon className="w-4 h-4" />
                          Let's talk about this build
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
import React, { useState } from 'react';
import { SparklesIcon, CodeIcon, SendIcon } from './Icons';
import { 
  generateQuizFromTopic, 
  generateLearningPath, 
  QuizQuestion, 
  LearningPathStep 
} from '../services/geminiService';

type DemoMode = 'quiz' | 'path';

const InteractiveDemo: React.FC = () => {
  const [mode, setMode] = useState<DemoMode>('quiz');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [learningPath, setLearningPath] = useState<LearningPathStep[] | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    if (mode === 'quiz') {
      setLearningPath(null);
      const data = await generateQuizFromTopic(topic);
      setQuiz(data);
    } else {
      setQuiz(null);
      const data = await generateLearningPath(topic);
      setLearningPath(data);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="glass-card rounded-[2.5rem] overflow-hidden border-white/5 shadow-2xl">
        <div className="grid lg:grid-cols-12">
          {/* Controls */}
          <div className="lg:col-span-4 p-10 border-r border-white/5 space-y-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-6">
                <SparklesIcon className="w-3 h-3 animate-pulse" />
                Experimental AI Lab
              </div>
              <h2 className="text-3xl font-semibold text-white tracking-tight mb-4">Gemini Engine</h2>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Generate structured pedagogical objects using advanced reasoning models.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex bg-slate-900/50 p-1 rounded-xl border border-white/5">
                <button 
                  onClick={() => setMode('quiz')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-widest ${
                    mode === 'quiz' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Assessment
                </button>
                <button 
                  onClick={() => setMode('path')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-widest ${
                    mode === 'path' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Curriculum
                </button>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input 
                    type="text" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter subject objective..."
                    className="w-full bg-[#030712] border border-white/10 rounded-xl px-5 py-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  />
                  <CodeIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
                </div>
                
                <button 
                  onClick={handleGenerate}
                  disabled={loading || !topic.trim()}
                  className="w-full shiny-cta disabled:opacity-50"
                >
                  {loading ? 'Synthesizing...' : 'Generate Object'}
                  {!loading && <SendIcon className="w-4 h-4 ml-2" />}
                </button>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-8 bg-[#020617] p-10 min-h-[500px] relative overflow-y-auto">
             {!quiz && !learningPath && !loading && (
               <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                  <div className="w-16 h-16 rounded-3xl border-2 border-dashed border-slate-700 mb-6 flex items-center justify-center">
                    <SparklesIcon className="w-8 h-8 text-slate-700" />
                  </div>
                  <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Waiting for simulation...</p>
               </div>
             )}

             {loading && (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#020617]/50 backdrop-blur-sm z-50">
                  <div className="w-10 h-10 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Compiling Schema...</span>
               </div>
             )}

             {quiz && (
               <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  <h3 className="text-xl font-bold text-white border-b border-white/5 pb-4">Assessment Module: {topic}</h3>
                  {quiz.map((q, i) => (
                    <div key={i} className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
                      <p className="text-indigo-400 font-mono text-[10px] uppercase mb-2">QUERY_0{i+1}</p>
                      <h4 className="text-slate-200 font-medium mb-4">{q.question}</h4>
                      <div className="grid gap-2">
                        {q.options.map((opt, oIdx) => (
                          <div key={oIdx} className="bg-slate-900/50 border border-white/5 p-3 rounded-lg text-sm text-slate-400">
                            {opt}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
               </div>
             )}

             {learningPath && (
               <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  <h3 className="text-xl font-bold text-white border-b border-white/5 pb-4">Curriculum Schema: {topic}</h3>
                  <div className="space-y-4">
                    {learningPath.map((step, i) => (
                      <div key={i} className="flex gap-6 group">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-indigo-400 font-bold text-sm">
                            {step.stepNumber}
                          </div>
                          {i < learningPath.length - 1 && <div className="w-px flex-1 bg-white/5 my-2"></div>}
                        </div>
                        <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6 flex-1 hover:border-indigo-500/30 transition-all">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-slate-200 font-bold">{step.title}</h4>
                            <span className="text-[10px] text-slate-500 bg-slate-900 px-2 py-1 rounded">{step.duration}</span>
                          </div>
                          <p className="text-slate-400 text-sm font-light mb-4">{step.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {step.keyTopics.map(t => (
                              <span key={t} className="text-[9px] text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">#{t}</span>
                            ))}
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
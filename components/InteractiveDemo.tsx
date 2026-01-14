import React, { useState } from 'react';
import { SparklesIcon, SendIcon } from './Icons';
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
    <div className="max-w-6xl mx-auto px-6">
      <div className="glass-panel rounded-3xl overflow-hidden border-white/5 shadow-2xl">
        <div className="grid lg:grid-cols-12">
          {/* Controls */}
          <div className="lg:col-span-4 p-10 md:p-12 border-r border-white/5 space-y-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-[9px] font-bold uppercase tracking-[0.2em] mb-8">
                <SparklesIcon className="w-3 h-3" />
                Lab Content Builder
              </div>
              <h2 className="text-3xl font-light text-white tracking-tight mb-4 font-display">Systems Lab</h2>
              <p className="text-white/40 text-xs font-light leading-relaxed tracking-wide">
                Build materials instantly to test our smart resource management.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                <button 
                  onClick={() => setMode('quiz')}
                  className={`flex-1 py-3 rounded-lg text-[10px] font-bold transition-all uppercase tracking-[0.2em] ${
                    mode === 'quiz' ? 'bg-white text-alpine-950' : 'text-white/30 hover:text-white'
                  }`}
                >
                  Quick Test
                </button>
                <button 
                  onClick={() => setMode('path')}
                  className={`flex-1 py-3 rounded-lg text-[10px] font-bold transition-all uppercase tracking-[0.2em] ${
                    mode === 'path' ? 'bg-white text-alpine-950' : 'text-white/30 hover:text-white'
                  }`}
                >
                  Syllabus
                </button>
              </div>

              <div className="space-y-5">
                <div className="relative">
                  <input 
                    type="text" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter topic..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-xs placeholder-white/20 focus:outline-none focus:border-white/40 transition-all font-light"
                  />
                </div>
                
                <button 
                  onClick={handleGenerate}
                  disabled={loading || !topic.trim()}
                  className="w-full shiny-cta disabled:opacity-50"
                >
                  {loading ? 'Synthesizing...' : 'Generate Resource'}
                  {!loading && <SendIcon className="w-3.5 h-3.5 ml-3" />}
                </button>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-8 bg-black/20 p-10 md:p-12 min-h-[500px] relative overflow-y-auto">
             {!quiz && !learningPath && !loading && (
               <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                  <SparklesIcon className="w-10 h-10 text-white mb-6" />
                  <p className="text-white font-bold text-[9px] uppercase tracking-[0.4em]">Awaiting Instruction</p>
               </div>
             )}

             {loading && (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                  <div className="w-8 h-8 border border-white/10 border-t-white rounded-full animate-spin mb-6"></div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/60">Optimizing Content</span>
               </div>
             )}

             {quiz && (
               <div className="space-y-10 animate-in fade-in duration-700">
                  <h3 className="text-xl font-light text-white/90 border-b border-white/5 pb-6 font-display tracking-widest uppercase text-xs">Resources / Quiz / {topic}</h3>
                  {quiz.map((q, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-8 space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-white/20 font-bold text-[8px] uppercase tracking-[0.3em]">Item 0{i+1}</span>
                      </div>
                      <h4 className="text-white text-base font-light tracking-wide">{q.question}</h4>
                      <div className="grid gap-3">
                        {q.options.map((opt, oIdx) => (
                          <div key={oIdx} className="bg-white/[0.02] border border-white/5 p-4 rounded-lg text-xs text-white/50 font-light hover:border-white/20 transition-colors">
                            {opt}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
               </div>
             )}

             {learningPath && (
               <div className="space-y-10 animate-in fade-in duration-700">
                  <h3 className="text-xl font-light text-white/90 border-b border-white/5 pb-6 font-display tracking-widest uppercase text-xs">Resources / Syllabus / {topic}</h3>
                  <div className="space-y-6">
                    {learningPath.map((step, i) => (
                      <div key={i} className="flex gap-8 group">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 font-medium text-xs">
                            {step.stepNumber}
                          </div>
                          {i < learningPath.length - 1 && <div className="w-[1px] flex-1 bg-white/5 my-3"></div>}
                        </div>
                        <div className="bg-white/5 border border-white/5 rounded-2xl p-8 flex-1">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-white text-lg font-light tracking-wide">{step.title}</h4>
                            <span className="text-[8px] text-white/30 bg-white/5 px-3 py-1.5 rounded-full font-bold uppercase tracking-widest border border-white/5">{step.duration}</span>
                          </div>
                          <p className="text-white/40 text-xs font-light mb-6 leading-relaxed tracking-wide">{step.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {step.keyTopics.map(t => (
                              <span key={t} className="text-[8px] text-white/20 bg-white/5 px-3 py-1 rounded-full border border-white/5 uppercase tracking-tighter">#{t}</span>
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
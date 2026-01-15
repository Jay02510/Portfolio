
import React, { useState } from 'react';
import { SparklesIcon, SendIcon, BookOpenIcon } from './Icons';
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
  const [previewMode, setPreviewMode] = useState<'raw' | 'classroom'>('raw');
  
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
    <div className="max-w-7xl mx-auto px-6">
      <div className="glass-panel rounded-[3rem] overflow-hidden border-white/5 shadow-2xl">
        <div className="grid lg:grid-cols-12">
          {/* Controls */}
          <div className="lg:col-span-4 p-12 md:p-16 border-r border-white/5 space-y-16">
            <div>
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-accent-gold/5 border border-accent-gold/10 text-accent-gold text-[9px] font-bold uppercase tracking-[0.3em] mb-10">
                <SparklesIcon className="w-3.5 h-3.5" />
                Laboratory v1.2
              </div>
              <h2 className="text-4xl font-light text-white tracking-tight mb-6 font-display">Systems Lab</h2>
              <p className="text-white/40 text-sm font-light leading-relaxed tracking-wide">
                Experience how our AI engines transform raw topics into pedagogical structure in seconds.
              </p>
            </div>

            <div className="space-y-10">
              <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
                <button 
                  onClick={() => setMode('quiz')}
                  className={`flex-1 py-4 rounded-xl text-[10px] font-bold transition-all uppercase tracking-[0.3em] ${
                    mode === 'quiz' ? 'bg-white text-alpine-950' : 'text-white/30 hover:text-white'
                  }`}
                >
                  Generation
                </button>
                <button 
                  onClick={() => setMode('path')}
                  className={`flex-1 py-4 rounded-xl text-[10px] font-bold transition-all uppercase tracking-[0.3em] ${
                    mode === 'path' ? 'bg-white text-alpine-950' : 'text-white/30 hover:text-white'
                  }`}
                >
                  Syllabus
                </button>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <input 
                    type="text" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter curriculum topic..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-accent-gold/30 transition-all font-light"
                  />
                </div>
                
                <button 
                  onClick={handleGenerate}
                  disabled={loading || !topic.trim()}
                  className="w-full shiny-cta disabled:opacity-50 py-6"
                >
                  {loading ? 'Processing Logic...' : 'Synthesize Resource'}
                </button>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className={`lg:col-span-8 p-12 md:p-20 min-h-[700px] relative overflow-y-auto transition-all duration-700 ${previewMode === 'classroom' ? 'bg-[#faf9f6]' : 'bg-black/20'}`}>
             
             {/* Preview Toggle */}
             {(quiz || learningPath) && (
               <div className="absolute top-10 right-10 flex gap-4 z-20">
                  <button 
                    onClick={() => setPreviewMode('raw')}
                    className={`px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest border transition-all ${previewMode === 'raw' ? 'bg-white text-black border-white' : 'text-white/30 border-white/10'}`}
                  >
                    Raw Output
                  </button>
                  <button 
                    onClick={() => setPreviewMode('classroom')}
                    className={`px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest border transition-all ${previewMode === 'classroom' ? 'bg-accent-gold text-white border-accent-gold' : 'text-white/30 border-white/10'}`}
                  >
                    Classroom Mode
                  </button>
               </div>
             )}

             {!quiz && !learningPath && !loading && (
               <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                  <BookOpenIcon className="w-16 h-16 text-white mb-8" />
                  <p className="text-white font-bold text-[10px] uppercase tracking-[0.6em]">Awaiting System Input</p>
               </div>
             )}

             {loading && (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-alpine-950/60 backdrop-blur-md z-50">
                  <div className="w-12 h-12 border-2 border-accent-gold/10 border-t-accent-gold rounded-full animate-spin mb-8"></div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent-gold">Synthesizing Educational Context</span>
               </div>
             )}

             {quiz && (
               <div className={`space-y-12 animate-in fade-in duration-700 ${previewMode === 'classroom' ? 'text-[#161920]' : ''}`}>
                  <div className="border-b border-current/10 pb-8 flex justify-between items-end">
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-2 opacity-40">System_Output / Resource_Quiz</h3>
                      <h4 className="text-4xl font-light font-display tracking-tight">{topic} Assessment</h4>
                    </div>
                  </div>

                  <div className="space-y-10">
                    {quiz.map((q, i) => (
                      <div key={i} className={`rounded-3xl p-10 space-y-8 border ${previewMode === 'classroom' ? 'bg-white shadow-xl border-black/5' : 'bg-white/5 border-white/5'}`}>
                        <div className="flex justify-between items-center opacity-40">
                          <span className="font-bold text-[9px] uppercase tracking-[0.4em]">Item 0{i+1}</span>
                        </div>
                        <h4 className="text-2xl font-light tracking-wide font-display leading-snug">{q.question}</h4>
                        <div className="grid gap-4">
                          {q.options.map((opt, oIdx) => (
                            <div key={oIdx} className={`p-5 rounded-2xl text-sm font-light border transition-all ${
                              previewMode === 'classroom' 
                                ? 'bg-gray-50 border-black/5 hover:border-black/20' 
                                : 'bg-white/[0.02] border-white/5 hover:border-white/20 text-white/50'
                            }`}>
                              {opt}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
             )}

             {learningPath && (
               <div className={`space-y-16 animate-in fade-in duration-700 ${previewMode === 'classroom' ? 'text-[#161920]' : ''}`}>
                  <div className="border-b border-current/10 pb-8">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-2 opacity-40">System_Output / Resource_Syllabus</h3>
                    <h4 className="text-4xl font-light font-display tracking-tight">{topic} Learning Path</h4>
                  </div>
                  
                  <div className="space-y-12">
                    {learningPath.map((step, i) => (
                      <div key={i} className="flex gap-12 group">
                        <div className="flex flex-col items-center">
                          <div className={`w-14 h-14 rounded-full border flex items-center justify-center font-display text-lg font-light transition-all ${
                            previewMode === 'classroom' ? 'border-black/10 bg-white shadow-lg' : 'border-white/10 bg-white/5 text-white/60'
                          }`}>
                            {step.stepNumber}
                          </div>
                          {i < learningPath.length - 1 && <div className={`w-[1px] flex-1 my-4 ${previewMode === 'classroom' ? 'bg-black/10' : 'bg-white/5'}`}></div>}
                        </div>
                        <div className={`rounded-3xl p-10 flex-1 border transition-all ${
                          previewMode === 'classroom' ? 'bg-white shadow-xl border-black/5' : 'bg-white/5 border-white/5'
                        }`}>
                          <div className="flex justify-between items-start mb-6">
                            <h4 className="text-2xl font-light tracking-tight font-display">{step.title}</h4>
                            <span className={`text-[9px] px-4 py-2 rounded-full font-bold uppercase tracking-widest border ${
                              previewMode === 'classroom' ? 'bg-gray-50 border-black/5' : 'bg-white/5 border-white/5 text-white/30'
                            }`}>{step.duration}</span>
                          </div>
                          <p className={`text-sm font-light mb-10 leading-relaxed tracking-wide opacity-70`}>{step.description}</p>
                          <div className="flex flex-wrap gap-3">
                            {step.keyTopics.map(t => (
                              <span key={t} className={`text-[9px] px-4 py-1.5 rounded-full border uppercase tracking-widest font-bold ${
                                previewMode === 'classroom' ? 'bg-gray-50 border-black/5 text-black/40' : 'bg-white/5 border-white/5 text-white/20'
                              }`}>#{t}</span>
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

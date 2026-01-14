import React, { useState, useRef, useEffect } from 'react';
import { SparklesIcon, SendIcon, XIcon } from './Icons';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello, I'm Jordan's AI Liaison. Ask me about my architectural philosophy, recent LMS projects, or tech stack details.",
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    const responseText = await sendMessageToGemini(input);
    const modelMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-6 w-[400px] max-w-[calc(100vw-48px)] h-[550px] bg-[#030712] border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-500">
          <div className="bg-slate-900/50 p-6 flex justify-between items-center border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm tracking-tight leading-none">AI Concierge</h3>
                <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-1">Gemini 3 Pro</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#020617]/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm font-light leading-relaxed ${
                    msg.role === 'user' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-[#0f172a] text-slate-300 border border-white/5'
                  }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#0f172a] border border-white/5 rounded-xl px-4 py-2 flex gap-1.5 items-center">
                  <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-slate-950/50 border-t border-white/5">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Jordan anything..."
                className="w-full pl-5 pr-12 py-3 bg-[#030712] border border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm text-white placeholder-slate-600 transition-all"
              />
              <button onClick={handleSend} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-indigo-400 hover:text-indigo-300">
                <SendIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="shiny-cta px-6 py-4 shadow-2xl"
      >
        {isOpen ? <XIcon className="w-5 h-5" /> : <SparklesIcon className="w-5 h-5" />}
        <span className="text-xs uppercase font-black tracking-widest">{isOpen ? 'Close' : 'AI Assistant'}</span>
      </button>
    </div>
  );
};

export default AIChat;
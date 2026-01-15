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
      text: "Hi there. I'm here to share the stories behind Jason's tools and his time in Korea. What would you like to know?",
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
    <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-6 w-[380px] max-w-[calc(100vw-60px)] h-[540px] glass-panel rounded-3xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500 shadow-2xl border-white/10">
          {/* Header */}
          <div className="p-8 flex justify-between items-center border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <SparklesIcon className="w-4 h-4 text-accent-gold" />
              </div>
              <div>
                <h3 className="text-white font-display font-light text-sm tracking-widest uppercase">Concierge</h3>
                <p className="text-[8px] text-white/30 font-bold uppercase tracking-[0.3em] mt-1">Personal Assistant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center text-white/30 hover:text-white transition-all">
              <XIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-xs leading-relaxed tracking-wide ${
                    msg.role === 'user' 
                      ? 'bg-white text-alpine-950 font-medium' 
                      : 'bg-white/5 text-white/70 border border-white/5 font-light'
                  }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/5 rounded-full px-4 py-2 flex gap-1.5 items-center">
                  <div className="w-1 h-1 bg-accent-gold/40 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-accent-gold/40 rounded-full animate-pulse delay-75"></div>
                  <div className="w-1 h-1 bg-accent-gold/40 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t border-white/5">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me about the tools..."
                className="w-full pl-5 pr-14 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent-gold/30 text-xs text-white placeholder-white/20 transition-all font-light"
              />
              <button 
                onClick={handleSend} 
                className="absolute right-3 p-2 text-white/40 hover:text-accent-gold transition-all"
              >
                <SendIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full glass-panel flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all group border-white/10"
      >
        {isOpen ? <XIcon className="w-5 h-5 text-accent-gold" /> : <SparklesIcon className="w-5 h-5 group-hover:rotate-12 transition-transform text-accent-gold" />}
      </button>
    </div>
  );
};

export default AIChat;
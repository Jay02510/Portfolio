
import React, { useState, useRef, useEffect } from 'react';
import { SparklesIcon, SendIcon, XIcon, MailIcon } from './Icons.tsx';
import { sendMessageToGemini } from '../services/geminiService.ts';
import { ChatMessage } from '../types.ts';

interface AIChatProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  theme: 'light' | 'dark';
}

const SUGGESTIONS = [
  "What was teaching in Seoul like?",
  "How can we collaborate?",
  "Tell me about Chekki AI.",
  "How does Benchmark Explorer work?",
  "Why did you start building tools?"
];

const MAX_MESSAGES = 10;

const AIChat: React.FC<AIChatProps> = ({ isOpen, setIsOpen, theme }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi there. I'm Jason's digital helper. If you have questions about how these tools work or what Jason did while teaching in Seoul, just ask.",
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || isLoading || messageCount >= MAX_MESSAGES) return;

    const userMsg: ChatMessage = { 
      id: Date.now().toString(), 
      role: 'user', 
      text: messageText, 
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setMessageCount(prev => prev + 1);
    setIsLoading(true);

    const responseText = await sendMessageToGemini(messageText);
    const modelMsg: ChatMessage = { 
      id: (Date.now() + 1).toString(), 
      role: 'model', 
      text: responseText, 
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  const isLimitReached = messageCount >= MAX_MESSAGES;

  if (!isOpen) {
    return (
      <div className="hidden md:block fixed bottom-10 right-10 z-[100]">
        <button
          onClick={() => setIsOpen(true)}
          className={`w-16 h-16 rounded-full glass-panel flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all group ${theme === 'dark' ? 'border-white/10' : 'border-black/5'}`}
        >
          <SparklesIcon className="w-5 h-5 group-hover:rotate-12 transition-transform text-accent-gold" />
          {messageCount > 0 && !isLimitReached && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent-gold text-alpine-950 rounded-full text-[9px] font-black flex items-center justify-center border-2 border-alpine-950">
              {MAX_MESSAGES - messageCount}
            </div>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 md:inset-auto md:bottom-10 md:right-10 z-[200] md:z-[100] flex flex-col items-end">
      {/* Mobile Backdrop */}
      <div className={`md:hidden absolute inset-0 transition-opacity duration-500 ${theme === 'dark' ? 'bg-alpine-950/90 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-lg'}`} onClick={() => setIsOpen(false)}></div>
      
      <div className={`w-full h-full md:w-[400px] md:h-[650px] glass-panel md:rounded-3xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500 shadow-2xl relative z-10 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
        {/* Header */}
        <div className={`p-8 flex justify-between items-center border-b ${theme === 'dark' ? 'bg-alpine-900/40 border-white/5' : 'bg-white/40 border-black/5'}`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5'}`}>
              <SparklesIcon className="w-5 h-5 text-accent-gold" />
            </div>
            <div>
              <h3 className={`font-display font-light text-sm tracking-widest uppercase ${theme === 'dark' ? 'text-white' : 'text-alpine-950'}`}>Assistant</h3>
              <p className={`text-[8px] font-bold uppercase tracking-[0.3em] mt-1 ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
                {isLimitReached ? 'Session Complete' : 'Online & Ready'}
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${theme === 'dark' ? 'hover:bg-white/5 text-white/30 hover:text-white' : 'hover:bg-black/5 text-black/30 hover:text-black'}`}>
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className={`flex-1 overflow-y-auto p-6 md:p-10 space-y-8 ${theme === 'dark' ? 'scrollbar-dark' : 'scrollbar-light'}`}>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[88%] rounded-2xl px-6 py-4 text-[13px] leading-relaxed tracking-wide shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-accent-gold text-alpine-950 font-bold' 
                    : (theme === 'dark' ? 'bg-white/5 text-white/70 border border-white/5' : 'bg-black/5 text-black/80 border border-black/5')
                }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className={`rounded-full px-5 py-3 flex gap-2 items-center ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}>
                <div className="w-1.5 h-1.5 bg-accent-gold rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-accent-gold rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-accent-gold rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
          {isLimitReached && (
            <div className="pt-4 flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className={`w-12 h-px ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}></div>
               <p className={`text-[11px] font-bold uppercase tracking-widest text-center px-8 leading-relaxed ${theme === 'dark' ? 'text-white/30' : 'text-black/40'}`}>
                 You've reached the conversation limit. Jason would love to hear from you directly!
               </p>
               <a 
                href="mailto:jsn.benjamin@gmail.com" 
                className="flex items-center gap-3 px-6 py-3 bg-accent-gold text-alpine-950 rounded-full text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
               >
                 <MailIcon className="w-4 h-4" />
                 Contact Jason
               </a>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips & Input */}
        <div className={`p-6 md:p-8 border-t pb-24 md:pb-8 transition-colors ${theme === 'dark' ? 'bg-alpine-900/40 border-white/5' : 'bg-white border-black/5'}`}>
          {/* Suggestion Chips - Hide when limit reached to clean up UI */}
          {!isLimitReached && (
            <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar">
              {SUGGESTIONS.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(suggestion)}
                  disabled={isLoading}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase border transition-all hover:scale-105 active:scale-95 disabled:opacity-50 ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/10 text-white/60 hover:border-accent-gold hover:text-accent-gold' 
                      : 'bg-black/5 border-black/10 text-black/60 hover:border-accent-clay hover:text-accent-clay'
                  }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLimitReached}
              placeholder={isLimitReached ? "Conversation limit reached" : "Ask me anything..."}
              className={`w-full pl-6 pr-14 py-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold/20 transition-all text-sm font-light ${
                theme === 'dark' 
                  ? 'bg-white/5 border border-white/10 text-white placeholder-white/20' 
                  : 'bg-black/5 border border-black/10 text-black placeholder-black/30'
              } ${isLimitReached ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
            />
            {!isLimitReached && (
              <button 
                onClick={() => handleSend()} 
                disabled={isLoading || !input.trim()}
                className={`absolute right-4 p-2 transition-all disabled:opacity-20 ${theme === 'dark' ? 'text-white/40 hover:text-accent-gold' : 'text-black/40 hover:text-accent-gold'}`}
              >
                <SendIcon className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {!isLimitReached && messageCount > 0 && (
            <p className={`text-[8px] font-bold uppercase tracking-[0.2em] mt-4 text-center opacity-30 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              {MAX_MESSAGES - messageCount} messages remaining
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIChat;

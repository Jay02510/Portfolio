import React, { useState, useRef, useEffect } from 'react';
import { SparklesIcon, SendIcon, XIcon, MailIcon } from './Icons.tsx';
import { sendMessageToGemini, ChatHistoryItem } from '../services/geminiService.ts';
import { ChatMessage } from '../types.ts';

interface AIChatProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  theme: 'light' | 'dark';
  locale?: 'en' | 'ko';
}

const SUGGESTIONS_EN = [
  "What was teaching in Seoul like?",
  "How can we collaborate?",
  "Tell me about Chekki AI.",
  "How does Benchmark Explorer work?",
  "Why did you start building tools?"
];

const SUGGESTIONS_KO = [
  "서울에서의 교직 생활은 어땠나요?",
  "제이슨과 프로젝트를 같이 만들려면?",
  "Chekki AI는 어떤 서비스인가요?",
  "Benchmark Explorer 구조에 대해 알려줘.",
  "왜 직접 에듀테크 도구를 제작하나요?"
];

const MAX_MESSAGES = 30;

const AIChat: React.FC<AIChatProps> = ({ 
  isOpen, 
  setIsOpen, 
  theme,
  locale = 'en'
}) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: locale === 'ko' 
          ? "안녕하세요! 저는 제이슨의 디지털 비서입니다. 제이슨의 교육 솔루션, 10년 교직 스토리, 또는 기술 스택에 대해 무엇이든 편안하게 물어보세요."
          : "Hi there. I'm Jason's digital helper. If you have questions about how these tools work or what Jason did while teaching in Seoul, just ask.",
        timestamp: new Date()
      }
    ]);
  }, [locale]);

  // Scroll lock and focus cleanup
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      document.body.style.overflow = 'hidden';
      dialogRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [messages, isOpen]);

  // Escape key listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  const handleSend = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || isLoading || messageCount >= MAX_MESSAGES) return;

    const userMsg: ChatMessage = { 
      id: Date.now().toString(), 
      role: 'user', 
      text: messageText, 
      timestamp: new Date() 
    };
    
    // Prepare history array of the previous turns (exclude the welcome message if preferred, or include it)
    const historyPayload: ChatHistoryItem[] = messages
      .slice(-6)
      .map(m => ({
        role: m.role,
        text: m.text
      }));

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setMessageCount(prev => prev + 1);
    setIsLoading(true);

    const responseText = await sendMessageToGemini(messageText, historyPayload);
    const modelMsg: ChatMessage = { 
      id: (Date.now() + 1).toString(), 
      role: 'model', 
      text: responseText, 
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  const handleReset = () => {
    setMessageCount(0);
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: locale === 'ko' 
          ? "안녕하세요! 저는 제이슨의 디지털 비서입니다. 제이슨의 교육 솔루션, 10년 교직 스토리, 또는 기술 스택에 대해 무엇이든 편안하게 물어보세요."
          : "Hi there. I'm Jason's digital helper. If you have questions about how these tools work or what Jason did while teaching in Seoul, just ask.",
        timestamp: new Date()
      }
    ]);
    setInput('');
  };

  const isLimitReached = messageCount >= MAX_MESSAGES;
  const activeSuggestions = locale === 'ko' ? SUGGESTIONS_KO : SUGGESTIONS_EN;

  if (!isOpen) {
    return (
      <div className="fixed bottom-20 right-4 md:bottom-10 md:right-10 z-[90] md:z-[100]">
        <button
          onClick={() => setIsOpen(true)}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all group border ${
            theme === 'dark' ? 'bg-alpine-900 border-white/10 text-accent-gold' : 'bg-white border-black/10 text-accent-clay'
          }`}
          aria-label={locale === 'ko' ? "AI 어시스턴트 열기" : "Open AI assistant"}
        >
          <SparklesIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
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
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-chat-title"
      ref={dialogRef}
      tabIndex={-1}
      className="fixed inset-0 md:inset-auto md:bottom-10 md:right-10 z-[200] md:z-[100] flex flex-col items-end outline-none"
    >
      {/* Mobile Backdrop */}
      <div 
        className={`md:hidden absolute inset-0 transition-opacity duration-500 ${
          theme === 'dark' ? 'bg-alpine-950/90 backdrop-blur-xl' : 'bg-black/40 backdrop-blur-md'
        }`} 
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      
      <div className={`w-full h-full md:w-[420px] md:h-[650px] md:rounded-3xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500 shadow-2xl relative z-10 border ${
        theme === 'dark' ? 'bg-alpine-950 border-white/10' : 'bg-[#faf9f6] border-black/10'
      }`}>
        {/* Header */}
        <div className={`p-6 sm:p-8 flex justify-between items-center border-b ${
          theme === 'dark' ? 'bg-alpine-900/60 border-white/10' : 'bg-white border-black/5'
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full flex items-center justify-center border bg-accent-gold/15 border-accent-gold/30 text-accent-gold">
               <SparklesIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 id="ai-chat-title" className={`font-display font-medium text-sm tracking-wider uppercase ${
                theme === 'dark' ? 'text-white' : 'text-alpine-950'
              }`}>
                {locale === 'ko' ? 'AI 어시스턴트' : 'Assistant'}
              </h3>
              <p className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${
                theme === 'dark' ? 'text-white/60' : 'text-alpine-950/60'
              }`}>
                {isLimitReached 
                  ? (locale === 'ko' ? '세션 대화 종료' : 'Session Complete') 
                  : (locale === 'ko' ? '대화 준비 완료' : 'Online & Ready')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {messageCount > 0 && (
              <button
                onClick={handleReset}
                className={`min-h-[44px] px-3.5 py-2 text-xs uppercase tracking-wider font-bold rounded-full border transition-all ${
                  theme === 'dark'
                    ? 'border-white/20 text-white/80 hover:border-accent-gold hover:text-accent-gold hover:bg-white/5'
                    : 'border-black/20 text-alpine-950/80 hover:border-accent-clay hover:text-accent-clay hover:bg-black/5'
                }`}
                aria-label={locale === 'ko' ? "대화 초기화" : "Reset chat"}
              >
                {locale === 'ko' ? "초기화" : "Reset"}
              </button>
            )}
            <button 
              onClick={() => setIsOpen(false)} 
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                theme === 'dark' ? 'hover:bg-white/10 text-white/70 hover:text-white' : 'hover:bg-black/10 text-alpine-950/70 hover:text-alpine-950'
              }`}
              aria-label={locale === 'ko' ? "AI 어시스턴트 닫기" : "Close AI assistant"}
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages with aria-live="polite" */}
        <div 
          aria-live="polite"
          className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6"
        >
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[88%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed tracking-wide shadow-xs ${
                  msg.role === 'user' 
                    ? 'bg-accent-gold text-alpine-950 font-semibold' 
                    : (theme === 'dark' ? 'bg-[#1e232d] text-white/90 border border-white/10' : 'bg-white text-neutral-800 border border-black/10')
                }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className={`rounded-full px-5 py-3 flex gap-2 items-center border ${
                theme === 'dark' ? 'bg-[#1e232d] border-white/10' : 'bg-white border-black/10'
              }`}>
                <div className="w-2 h-2 bg-accent-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-accent-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-accent-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          {isLimitReached && (
            <div className="pt-4 flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className={`w-12 h-px ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}></div>
               <p className={`text-xs font-bold uppercase tracking-wider text-center px-6 leading-relaxed ${
                 theme === 'dark' ? 'text-white/70' : 'text-alpine-950/70'
               }`}>
                 {locale === 'ko' 
                   ? "금일 권장 대화수 회수에 도달했습니다. 언제든 제이슨에게 편한 메일 전송으로 협의해 보세요!" 
                   : "You've reached the conversation limit. Jason would love to hear from you directly!"}
               </p>
               <div className="flex flex-col items-center gap-3 w-full px-6">
                 <a 
                  href="mailto:jsn.benjamin@gmail.com" 
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent-gold text-alpine-950 rounded-full text-xs font-bold uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-md"
                 >
                   <MailIcon className="w-4 h-4" />
                   {locale === 'ko' ? "제이슨과 메일 대화 나누기" : "Contact Jason"}
                 </a>
                 <button
                   onClick={handleReset}
                   className={`text-xs uppercase tracking-widest font-bold px-6 py-3 rounded-full border transition-all hover:scale-105 active:scale-95 w-full text-center ${
                     theme === 'dark'
                       ? 'border-white/20 text-white/80 hover:border-accent-gold hover:text-accent-gold hover:bg-white/5'
                       : 'border-black/20 text-alpine-950/80 hover:border-accent-clay hover:text-accent-clay hover:bg-black/5'
                   }`}
                 >
                   {locale === 'ko' ? "대화 새로 시작하기" : "Restart Conversation"}
                 </button>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips & Input */}
        <div className={`p-4 sm:p-6 border-t pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] md:pb-6 transition-colors ${
          theme === 'dark' ? 'bg-alpine-900/60 border-white/10' : 'bg-white border-black/5'
        }`}>
          {!isLimitReached && (
            <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
              {activeSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(suggestion)}
                  disabled={isLoading}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all hover:scale-105 active:scale-95 disabled:opacity-50 ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/15 text-white/80 hover:border-accent-gold hover:text-accent-gold' 
                      : 'bg-neutral-100 border-black/15 text-neutral-800 hover:border-accent-clay hover:text-accent-clay'
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
              placeholder={isLimitReached 
                ? (locale === 'ko' ? "보유 세션 횟수를 초과했습니다" : "Conversation limit reached") 
                : (locale === 'ko' ? "무엇이든 물어보세요..." : "Ask me anything...")}
              className={`w-full pl-5 pr-14 py-4 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/70 transition-all text-sm ${
                theme === 'dark' 
                  ? 'bg-white/5 border border-white/15 text-white placeholder-white/40' 
                  : 'bg-neutral-100 border border-black/15 text-neutral-900 placeholder-neutral-500'
              } ${isLimitReached ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
            />
            {!isLimitReached && (
              <button 
                onClick={() => handleSend()} 
                disabled={isLoading || !input.trim()}
                className={`absolute right-3 p-2.5 transition-all disabled:opacity-20 ${
                  theme === 'dark' ? 'text-white/70 hover:text-accent-gold' : 'text-neutral-700 hover:text-accent-clay'
                }`}
                aria-label="Send message"
              >
                <SendIcon className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {!isLimitReached && messageCount > 0 && (
            <p className={`text-[10px] font-mono font-semibold uppercase tracking-wider mt-3 text-center ${
              theme === 'dark' ? 'text-white/50' : 'text-alpine-950/50'
            }`}>
              {locale === 'ko' 
                ? `가용 대화 ${MAX_MESSAGES - messageCount}회 남음` 
                : `${MAX_MESSAGES - messageCount} messages remaining`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIChat;

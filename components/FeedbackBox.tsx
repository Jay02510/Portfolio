
import React, { useState } from 'react';
import { MailIcon, SendIcon } from './Icons.tsx';

interface FeedbackBoxProps {
  theme?: 'light' | 'dark';
}

const FeedbackBox: React.FC<FeedbackBoxProps> = ({ theme = 'dark' }) => {
  const [feedback, setFeedback] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    // Direct notification via mailto
    const subject = encodeURIComponent("Portfolio Feedback for Jason Benjamin");
    const body = encodeURIComponent(feedback);
    window.location.href = `mailto:jsn.benjamin@gmail.com?subject=${subject}&body=${body}`;

    setIsSent(true);
    setTimeout(() => {
      setFeedback('');
      setIsSent(false);
    }, 5000);
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className={`glass-panel rounded-2xl p-10 md:p-16 relative overflow-hidden group transition-all duration-500 border ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
          {/* Decorative background element */}
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-all duration-1000 ${theme === 'dark' ? 'bg-accent-gold/5 group-hover:bg-accent-gold/10' : 'bg-accent-clay/5 group-hover:bg-accent-clay/10'}`}></div>

          {!isSent ? (
            <div className="space-y-10 relative z-10">
              <div className="space-y-4">
                <h3 className="text-4xl font-light font-display tracking-tight text-gradient-white">
                  See a gap?
                </h3>
                <p className={`text-xs font-medium leading-relaxed max-w-md transition-colors ${theme === 'dark' ? 'text-white/60' : 'text-alpine-950/70'}`}>
                  I'm always refining these tools. If you have an idea for an improvement or just want to call out a bug, I'm all ears.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell it to me straight..."
                  className={`w-full border rounded-2xl px-8 py-6 text-sm focus:outline-none transition-all font-light min-h-[140px] resize-none ${
                    theme === 'dark' 
                      ? 'bg-white/[0.03] border-white/10 text-white placeholder-white/20 focus:border-accent-gold/50' 
                      : 'bg-black/[0.04] border-black/20 text-alpine-950 placeholder-alpine-950/50 focus:border-accent-clay/50'
                  }`}
                  required
                />
                <button
                  type="submit"
                  className="shiny-cta w-full md:w-auto px-12 py-5"
                >
                  <SendIcon className="w-4 h-4 mr-4 opacity-50" />
                  Send a note
                </button>
              </form>
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center border ${theme === 'dark' ? 'bg-accent-gold/10 border-accent-gold/20' : 'bg-accent-clay/10 border-accent-clay/20'}`}>
                <MailIcon className={`w-8 h-8 ${theme === 'dark' ? 'text-accent-gold' : 'text-accent-clay'}`} />
              </div>
              <div className="space-y-2">
                <h4 className={`text-2xl font-light font-display ${theme === 'dark' ? 'text-white' : 'text-alpine-950'}`}>Ready to send.</h4>
                <p className={`text-sm font-light ${theme === 'dark' ? 'text-white/30' : 'text-black/60'}`}>
                  Your mail app should be open now. Thanks for being honest.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeedbackBox;

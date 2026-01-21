
import React, { useState } from 'react';
import { MailIcon, SendIcon } from './Icons.tsx';

const FeedbackBox: React.FC = () => {
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
        <div className="glass-panel rounded-[2.5rem] p-10 md:p-16 border-white/5 relative overflow-hidden group">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-accent-gold/10 transition-all duration-1000"></div>

          {!isSent ? (
            <div className="space-y-10 relative z-10">
              <div className="space-y-4">
                <div className="text-accent-gold/40 text-[9px] font-bold tracking-[0.8em] uppercase">Quick Feedback</div>
                <h3 className="text-4xl font-light text-white font-display tracking-tight text-gradient-white">
                  Have a suggestion?
                </h3>
                <p className="text-white/30 text-xs font-light leading-relaxed max-w-md">
                  I'm always refining these tools. If you have an idea for an improvement or just a general thought, I'd love to hear it.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Your thoughts..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-6 text-white text-sm placeholder-white/10 focus:outline-none focus:border-accent-gold/30 transition-all font-light min-h-[140px] resize-none"
                  required
                />
                <button
                  type="submit"
                  className="shiny-cta w-full md:w-auto px-12 py-5"
                >
                  <SendIcon className="w-4 h-4 mr-4 opacity-50" />
                  Send to Jason
                </button>
              </form>
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center">
                <MailIcon className="w-8 h-8 text-accent-gold" />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-light text-white font-display">Message Prepared!</h4>
                <p className="text-white/30 text-sm font-light">
                  Your email client should open now. Thanks for helping me build better tools.
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

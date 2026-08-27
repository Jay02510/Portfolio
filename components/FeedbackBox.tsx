import React, { useState } from 'react';
import { MailIcon, SendIcon } from './Icons.tsx';

interface FeedbackBoxProps {
  theme?: 'light' | 'dark';
}

const FeedbackBox: React.FC<FeedbackBoxProps> = ({ theme = 'dark' }) => {
  const [feedback, setFeedback] = useState('');
  const [contact, setContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback, contact })
      });

      if (!response.ok) {
        throw new Error('Could not submit feedback to server');
      }

      setIsSent(true);
    } catch (err) {
      console.warn('Direct feedback endpoint error, providing fallback:', err);
      // Fallback: trigger mailto link
      const subject = encodeURIComponent("Portfolio Feedback for Jason Benjamin");
      const body = encodeURIComponent(feedback + (contact ? `\n\nContact: ${contact}` : ''));
      window.location.href = `mailto:jsn.benjamin@gmail.com?subject=${subject}&body=${body}`;
      setIsSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(feedback);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setFeedback('');
    setContact('');
    setIsSent(false);
  };

  const isDark = theme === 'dark';

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className={`rounded-2xl p-8 sm:p-12 md:p-16 relative overflow-hidden group transition-all duration-500 border ${
          isDark ? 'bg-alpine-900 border-white/10' : 'bg-white border-black/10'
        }`}>
          {/* Decorative background element */}
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-all duration-1000 ${
            isDark ? 'bg-accent-gold/5 group-hover:bg-accent-gold/10' : 'bg-accent-clay/5 group-hover:bg-accent-clay/10'
          }`}></div>

          {!isSent ? (
            <div className="space-y-8 relative z-10">
              <div className="space-y-3">
                <h3 className={`text-3xl sm:text-4xl font-display font-medium tracking-tight ${
                  isDark ? 'text-white' : 'text-alpine-950'
                }`}>
                  See a gap?
                </h3>
                <p className={`text-sm leading-relaxed max-w-md ${
                  isDark ? 'text-white/70' : 'text-alpine-950/70'
                }`}>
                  I'm constantly refining these products. If you have an idea for an improvement or just want to call out a friction point, I'm all ears.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell it to me straight..."
                  rows={4}
                  className={`w-full border rounded-2xl p-5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/70 transition-all resize-none ${
                    isDark 
                      ? 'bg-white/[0.03] border-white/15 text-white placeholder-white/40 focus:border-accent-gold/50' 
                      : 'bg-black/[0.03] border-black/15 text-alpine-950 placeholder-black/40 focus:border-accent-clay/50'
                  }`}
                  required
                />

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Your email or LinkedIn (optional)"
                    className={`w-full sm:flex-1 border rounded-xl px-4 py-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/70 transition-all ${
                      isDark 
                        ? 'bg-white/[0.03] border-white/15 text-white placeholder-white/40' 
                        : 'bg-black/[0.03] border-black/15 text-alpine-950 placeholder-black/40'
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !feedback.trim()}
                    className="shiny-cta w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    <SendIcon className="w-4 h-4" />
                    <span>{isSubmitting ? "Sending..." : "Send note"}</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-5 animate-in fade-in zoom-in duration-500">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center border ${
                isDark ? 'bg-accent-gold/10 border-accent-gold/20' : 'bg-accent-clay/10 border-accent-clay/20'
              }`}>
                <MailIcon className={`w-7 h-7 ${isDark ? 'text-accent-gold' : 'text-accent-clay'}`} />
              </div>
              <div className="space-y-2">
                <h4 className={`text-2xl font-display font-medium ${isDark ? 'text-white' : 'text-alpine-950'}`}>
                  Feedback Received
                </h4>
                <p className={`text-sm max-w-sm ${isDark ? 'text-white/70' : 'text-alpine-950/70'}`}>
                  Thank you for taking the time to share your thoughts. Your perspective helps sharpen the entire ecosystem.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className={`text-xs px-4 py-2 rounded-lg border font-mono font-medium transition-all ${
                    isDark 
                      ? 'border-white/15 hover:border-white/30 text-white/80' 
                      : 'border-black/15 hover:border-black/30 text-alpine-950/80'
                  }`}
                >
                  {copied ? "Copied to clipboard!" : "Copy note to clipboard"}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs px-4 py-2 rounded-lg bg-accent-gold text-alpine-950 font-bold hover:brightness-110 transition-all"
                >
                  Send another note
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeedbackBox;

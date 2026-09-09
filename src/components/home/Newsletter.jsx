import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setFeedback({ type: 'error', message: 'Please enter your email address.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setFeedback({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setFeedback({
      type: 'success',
      message: '🌸 Welcome to the Greenden family! Enjoy 15% off your next floral order.',
    });
    setEmail('');
  };

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      <div className="bg-gradient-to-b from-[#f7f2ea] to-[#faf7f2] border border-[#e8dfcf] rounded-3xl p-8 sm:p-14 shadow-sm relative overflow-hidden">
        {/* Subtle decorative background petals */}
        <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-20 select-none text-rose-500 text-6xl">
          🌸
        </div>
        <div className="absolute bottom-0 left-0 p-6 pointer-events-none opacity-20 select-none text-emerald-800 text-5xl">
          🌿
        </div>

        <div className="relative z-10 max-w-xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-800">
            Botanical Digest
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mt-1 tracking-tight">
            Get Fresh Blooms in Your Inbox
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
            Flower inspiration, seasonal collections, florist care tips, and exclusive boutique offers delivered weekly.
          </p>

          <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto" noValidate>
            <label htmlFor="newsletterInput" className="sr-only">
              Email address
            </label>
            <input
              id="newsletterInput"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (feedback.message) setFeedback({ type: '', message: '' });
              }}
              placeholder="Enter your email for 15% off..."
              className="flex-1 bg-white text-gray-900 border border-gray-300 rounded-xl px-4 py-3 text-xs sm:text-sm focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20 outline-none transition-all shadow-2xs"
            />
            <button
              type="submit"
              className="bg-emerald-950 text-white px-7 py-3 rounded-xl text-xs sm:text-sm font-semibold hover:bg-emerald-800 transition-colors shadow-xs cursor-pointer active:scale-95 shrink-0"
            >
              Subscribe
            </button>
          </form>

          {feedback.message && (
            <div
              role="status"
              className={`mt-4 text-xs sm:text-sm font-medium p-3 rounded-xl animate-fade-in ${
                feedback.type === 'error'
                  ? 'text-rose-800 bg-rose-50 border border-rose-200'
                  : 'text-emerald-900 bg-emerald-100 border border-emerald-300'
              }`}
            >
              {feedback.message}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
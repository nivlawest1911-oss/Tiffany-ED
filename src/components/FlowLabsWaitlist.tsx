'use client';

import { useState } from 'react';

export default function FlowLabsWaitlist() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    // TODO: Replace with your actual waitlist API route
    await new Promise(resolve => setTimeout(resolve, 800));

    setSubmitted(true);
    setLoading(false);
    setEmail('');
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-emerald-400 text-5xl mb-4">✓</div>
        <h3 className="text-2xl tracking-[-1px] mb-2">You're on the list.</h3>
        <p className="text-white/60">We'll send early access details soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-all"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-10 py-4 rounded-2xl bg-white text-black font-semibold tracking-[-0.3px] hover:bg-white/90 active:scale-[0.985] transition-all disabled:opacity-70"
        >
          {loading ? 'Joining...' : 'Join Waitlist'}
        </button>
      </div>
      <p className="text-center text-xs tracking-[2px] text-white/40 mt-4">
        NO CREDIT CARD • EARLY ACCESS ONLY
      </p>
    </form>
  );
}

import React, { useState } from 'react';
import { ArrowLeft, Mail, Loader2, CheckCircle2, XCircle } from 'lucide-react';

/** Replace with your real e‑mail implementation */
const sendEmail = async ({ to, summary }: { to: string; summary: string }) => {
  await new Promise((r) => setTimeout(r, 1200));
  return { ok: true };
};

type Props = {
  summary: string;
  onBack: () => void; // back to the previous screen
};

export default function EmailSummaryForm({ summary, onBack }: Props) {
  const [to, setTo] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!to.trim()) return;

    setStatus('sending');
    try {
      const res = await sendEmail({ to, summary });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      {status === 'sent' ? (
        <div className="flex flex-col items-center text-green-700 gap-4">
          <CheckCircle2 size={48} className="animate-pulse" />
          <p className="text-lg font-semibold">Email sent successfully!</p>
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition"
          >
            ← Back
          </button>
        </div>
      ) : status === 'error' ? (
        <div className="flex flex-col items-center text-red-700 gap-4">
          <XCircle size={48} className="animate-shake" />
          <p className="text-lg font-semibold">Something went wrong. Please try again.</p>
          <button
            onClick={() => setStatus('idle')}
            className="text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition"
          >
            Try again
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block text-gray-700 font-semibold text-sm">
            Recipient&nbsp;e‑mail
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
              placeholder="parent@example.com"
              className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3 text-sm shadow-sm
                placeholder-gray-400
                focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                transition duration-200 ease-in-out
                focus:outline-none"
            />
          </label>

          <label className="block text-gray-700 font-semibold text-sm">
            Summary
            <textarea
              readOnly
              rows={6}
              value={summary}
              className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3 text-sm bg-gray-50
                shadow-inner resize-none cursor-default
                focus:outline-none"
            />
          </label>

          <button
            type="submit"
            disabled={status === 'sending'}
            className={`w-full inline-flex items-center justify-center gap-3 px-5 py-3 rounded-lg
              font-semibold text-white
              transition
              ${status === 'sending'
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 focus:outline-none'
              }`}
            aria-live="polite"
          >
            {status === 'sending' ? (
              <>
                <Loader2 size={20} className="animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Mail size={20} /> Send e‑mail
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

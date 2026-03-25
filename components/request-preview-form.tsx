'use client';

import { useState } from 'react';
import { LoaderCircle, Mail } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success' | 'duplicate' | 'error';

export function RequestPreviewForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;

    setStatus('submitting');
    setMessage('');

    try {
      const body = new URLSearchParams();
      body.set('email', email.trim());

      const response = await fetch('/request-preview-submit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: body.toString(),
      });

      const payload = (await response.json().catch(() => ({}))) as { status?: string; message?: string };

      if (!response.ok) {
        throw new Error(payload.message || 'Request preview is temporarily unavailable.');
      }

      if (payload.status === 'duplicate') {
        setStatus('duplicate');
        setMessage(payload.message || 'This email is already on the request list.');
        return;
      }

      setStatus('success');
      setMessage(payload.message || 'Request received. We will review it shortly.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Request preview is temporarily unavailable.');
    }
  }

  return (
    <form className="relative rounded-[28px] border border-white/10 bg-white/[0.03] p-5" onSubmit={onSubmit} noValidate>
      <label className="block text-sm text-muted" htmlFor="email">
        Work email
      </label>
      <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-background/80 px-4 py-3">
        <Mail className="h-4 w-4 text-primary" />
        <input
          id="email"
          name="email"
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="name@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-slate-950 transition hover:bg-[#9AB8FF] disabled:cursor-not-allowed disabled:opacity-80"
      >
        {status === 'submitting' ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Sending request
          </>
        ) : (
          'Request preview'
        )}
      </button>
      <p className="mt-3 text-xs leading-6 text-muted">
        Requests go into the review queue immediately. We only use this address for preview follow-up.
      </p>
      {status !== 'idle' && message ? (
        <div
          className={`mt-4 rounded-2xl border px-4 py-3 text-sm leading-6 ${
            status === 'success'
              ? 'border-success/20 bg-success/10 text-success'
              : status === 'duplicate'
                ? 'border-warning/20 bg-warning/10 text-warning'
                : status === 'error'
                  ? 'border-danger/20 bg-danger/10 text-danger'
                  : 'border-white/10 bg-white/5 text-foreground'
          }`}
        >
          {message}
        </div>
      ) : null}
    </form>
  );
}

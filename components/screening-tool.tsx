'use client';

import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, ArrowRight, BarChart3, CheckCircle2, Mail, MapPinHouse, ShieldAlert } from 'lucide-react';
import { evaluateFeasibility, type OverlayStatus, type ScreeningInput, type ScreeningResult, type SlopeCategory, type ZoningStatus } from '@/lib/feasibility';

const defaults = {
  address: '',
  zoning: 'unknown' as ZoningStatus,
  landSizeM2: '',
  frontageM: '',
  slopeCategory: 'flat' as SlopeCategory,
  overlayStatus: 'none' as OverlayStatus,
  email: '',
};

type AnalyticsEvent = 'page_visit' | 'submission_started' | 'submission_completed' | 'result_viewed';

export function ScreeningTool() {
  const [form, setForm] = useState(defaults);
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<ScreeningResult | null>(null);
  const [reviewStatus, setReviewStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [reviewMessage, setReviewMessage] = useState('');

  useEffect(() => {
    void track('page_visit');
  }, []);

  const parsedInput = useMemo<ScreeningInput | null>(() => {
    const land = Number(form.landSizeM2);
    if (!Number.isFinite(land) || land <= 0) return null;
    const frontage = form.frontageM.trim() ? Number(form.frontageM) : null;

    return {
      address: form.address.trim() || 'Address not provided',
      zoning: form.zoning,
      landSizeM2: land,
      frontageM: frontage !== null && Number.isFinite(frontage) ? frontage : null,
      slopeCategory: form.slopeCategory,
      overlayStatus: form.overlayStatus,
    };
  }, [form]);

  async function track(event: AnalyticsEvent, payload?: object) {
    try {
      await fetch('/track-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, payload }),
      });
    } catch {}
  }

  function update<K extends keyof typeof defaults>(key: K, value: (typeof defaults)[K]) {
    if (!started) {
      setStarted(true);
      void track('submission_started');
    }
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function onEvaluate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!parsedInput) return;
    const next = evaluateFeasibility(parsedInput);
    setResult(next);
    setReviewStatus('idle');
    setReviewMessage('');
    await track('submission_completed', { input: parsedInput, result: next });
    await track('result_viewed', { classification: next.classification, estimated_yield: next.estimated_yield, score: next.score });
  }

  async function requestExpertReview() {
    if (!parsedInput || !result || !form.email.trim()) {
      setReviewStatus('error');
      setReviewMessage('Enter an email to send this result for expert review.');
      return;
    }

    setReviewStatus('submitting');
    setReviewMessage('');

    try {
      const response = await fetch('/request-expert-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: form.email.trim(), input: parsedInput, result }),
      });
      const payload = (await response.json().catch(() => ({}))) as { message?: string };
      if (!response.ok) throw new Error(payload.message || 'Expert review request failed.');
      setReviewStatus('success');
      setReviewMessage(payload.message || 'Expert review request saved.');
    } catch (error) {
      setReviewStatus('error');
      setReviewMessage(error instanceof Error ? error.message : 'Expert review request failed.');
    }
  }

  return (
    <section className="py-12" id="screening-tool">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.28em] text-primary/80">Feasibility screen</p>
        <h2 className="mt-5 text-3xl font-medium tracking-[-0.03em] text-slate-50 sm:text-4xl">
          Generate a decision-grade subdivision screen in under a minute.
        </h2>
        <p className="mt-4 text-lg leading-8 text-muted">
          Enter the core site details and the tool will return a pass, fail, or review result with yield, confidence, constraints, and the next step.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
        <form onSubmit={onEvaluate} className="rounded-[32px] border border-white/10 bg-panel/80 p-6 shadow-panel backdrop-blur sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Address" icon={<MapPinHouse className="h-4 w-4 text-primary" />} className="sm:col-span-2">
              <input value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="123 Example Street, Brisbane" className={inputClass} />
            </Field>
            <Field label="Zoning">
              <select value={form.zoning} onChange={(e) => update('zoning', e.target.value as ZoningStatus)} className={inputClass}>
                <option value="unknown">Unknown / inferred</option>
                <option value="residential">Residential</option>
                <option value="non-residential">Non-residential</option>
              </select>
            </Field>
            <Field label="Land size (m²)">
              <input value={form.landSizeM2} onChange={(e) => update('landSizeM2', e.target.value)} inputMode="decimal" placeholder="650" className={inputClass} />
            </Field>
            <Field label="Frontage (m)">
              <input value={form.frontageM} onChange={(e) => update('frontageM', e.target.value)} inputMode="decimal" placeholder="Optional" className={inputClass} />
            </Field>
            <Field label="Slope">
              <select value={form.slopeCategory} onChange={(e) => update('slopeCategory', e.target.value as SlopeCategory)} className={inputClass}>
                <option value="flat">Flat</option>
                <option value="moderate">Moderate</option>
                <option value="steep">Steep</option>
              </select>
            </Field>
            <Field label="Overlays">
              <select value={form.overlayStatus} onChange={(e) => update('overlayStatus', e.target.value as OverlayStatus)} className={inputClass}>
                <option value="none">None known</option>
                <option value="present">Present</option>
                <option value="restrictive">Restrictive</option>
              </select>
            </Field>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted">
            {['<60 second flow', 'Deterministic scoring', 'Safe defaults reduce confidence'].map((item) => (
              <span key={item} className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5">
                {item}
              </span>
            ))}
          </div>

          <button type="submit" className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-6 text-[15px] font-medium text-slate-950 transition hover:bg-[#9AB8FF]">
            Run feasibility screen
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </form>

        <div className="rounded-[32px] border border-white/10 bg-panel/80 p-6 shadow-panel backdrop-blur sm:p-8">
          {result ? <ResultView result={result} email={form.email} setEmail={(value) => update('email', value)} onRequestReview={requestExpertReview} reviewStatus={reviewStatus} reviewMessage={reviewMessage} /> : <EmptyState />}
        </div>
      </div>
    </section>
  );
}

function Field({ label, children, className, icon }: { label: string; children: React.ReactNode; className?: string; icon?: React.ReactNode }) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm text-muted">{label}</label>
      <div className="flex items-center gap-3 rounded-[20px] border border-white/10 bg-background/90 px-4 py-3.5">
        {icon}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}

function ResultView({ result, email, setEmail, onRequestReview, reviewStatus, reviewMessage }: { result: ScreeningResult; email: string; setEmail: (value: string) => void; onRequestReview: () => void; reviewStatus: 'idle' | 'submitting' | 'success' | 'error'; reviewMessage: string; }) {
  const tone = result.classification === 'PASS' ? 'success' : result.classification === 'REVIEW' ? 'warning' : 'danger';
  const toneClasses = tone === 'success' ? 'border-success/20 bg-success/10 text-success' : tone === 'warning' ? 'border-warning/20 bg-warning/10 text-warning' : 'border-danger/20 bg-danger/10 text-danger';

  return (
    <div>
      <div className={`inline-flex rounded-full border px-4 py-2 text-xs uppercase tracking-[0.24em] ${toneClasses}`}>{result.classification}</div>
      <h3 className="mt-5 text-3xl font-medium tracking-[-0.03em] text-slate-50 sm:text-4xl">Decision-ready output</h3>
      <p className="mt-3 text-base leading-7 text-muted">A deterministic screening result using block size, frontage, slope, overlays, and zoning confidence.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Metric label="Estimated yield" value={String(result.estimated_yield)} />
        <Metric label="Score" value={`${result.score}/100`} />
        <Metric label="Confidence" value={`${result.confidence}%`} />
      </div>

      <div className="mt-6 rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
        <div className="flex items-center gap-2 text-sm text-foreground">
          <BarChart3 className="h-4 w-4 text-primary" />
          Key constraints
        </div>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
          {result.constraints.length ? result.constraints.map((constraint) => (
            <li key={constraint} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" /> <span>{constraint}</span></li>
          )) : <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" /> <span>No material screening constraints triggered.</span></li>}
        </ul>
      </div>

      <div className="mt-6 rounded-[24px] border border-white/8 bg-background/70 p-5">
        <div className="flex items-center gap-2 text-sm text-foreground">
          {result.classification === 'FAIL' ? <ShieldAlert className="h-4 w-4 text-danger" /> : <CheckCircle2 className="h-4 w-4 text-primary" />}
          Recommendation
        </div>
        <p className="mt-3 text-base leading-7 text-muted">{result.recommendation}</p>
      </div>

      <div className="mt-6 rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5">
        <div className="mb-3 text-xs uppercase tracking-[0.24em] text-primary/75">Request expert review</div>
        <div className="flex items-center gap-3 rounded-[18px] border border-white/10 bg-background/90 px-4 py-3.5">
          <Mail className="h-4 w-4 text-primary" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email for follow-up" className={inputClass} />
        </div>
        <button onClick={onRequestReview} type="button" disabled={reviewStatus === 'submitting'} className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full border border-primary/20 bg-primary/10 px-5 text-sm font-medium text-primary transition hover:bg-primary/15 disabled:opacity-70">
          {reviewStatus === 'submitting' ? 'Saving request' : 'Request expert review'}
        </button>
        {reviewMessage ? <div className={`mt-4 rounded-[18px] border px-4 py-3 text-sm leading-6 ${reviewStatus === 'success' ? 'border-success/20 bg-success/10 text-success' : 'border-danger/20 bg-danger/10 text-danger'}`}>{reviewMessage}</div> : null}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
      <p className="text-xs uppercase tracking-[0.22em] text-muted">{label}</p>
      <p className="mt-3 text-3xl font-medium tracking-[-0.03em] text-slate-50">{value}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[560px] flex-col items-center justify-center rounded-[24px] border border-dashed border-white/10 bg-white/[0.02] px-8 text-center">
      <div className="rounded-full border border-primary/20 bg-primary/10 p-4">
        <BarChart3 className="h-6 w-6 text-primary" />
      </div>
      <h3 className="mt-5 text-2xl font-medium tracking-[-0.03em] text-slate-50">Run the feasibility screen</h3>
      <p className="mt-3 max-w-md text-base leading-7 text-muted">
        Enter the core site inputs and the result panel will return classification, estimated yield, confidence, key constraints, and the next recommended action.
      </p>
    </div>
  );
}

const inputClass = 'w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted';

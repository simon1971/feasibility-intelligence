import { ArrowRight, CheckCircle2, Mail, SearchCheck, ShieldAlert, Sparkles } from 'lucide-react';
import { HeroEngine } from '@/components/hero-engine';
import { OutcomeCards } from '@/components/outcome-cards';
import { Card } from '@/components/ui/card';

const problemPoints = [
  'Too many opportunities look plausible until the hard constraints appear late.',
  'Manual screening is inconsistent when inputs arrive in different formats and levels of quality.',
  'Expert time gets consumed on low-probability prospects instead of the strongest candidates.',
];

const solutionPoints = [
  'Normalise fragmented inputs into a clear, repeatable assessment path.',
  'Surface hard-stop issues quickly with concise reasoning attached.',
  'Escalate only the strongest or ambiguous cases for expert judgement.',
];

const steps = [
  {
    title: 'Collect the core inputs',
    body: 'Bring together zoning, site metrics, constraints, and market signals into one screening flow.',
  },
  {
    title: 'Apply layered feasibility checks',
    body: 'Pass each candidate through structured logic that distinguishes hard stops from review flags.',
  },
  {
    title: 'Return an action-ready outcome',
    body: 'Classify each opportunity as not feasible, needs review, or high potential with a clear reason.',
  },
];

const outcomes = [
  {
    label: 'Not feasible',
    reason: 'Constraint conflicts with the target use, so the opportunity is filtered out early.',
    tone: 'danger',
  },
  {
    label: 'Needs review',
    reason: 'The signal is mixed, so the case is elevated with the exact uncertainty identified.',
    tone: 'warning',
  },
  {
    label: 'High potential',
    reason: 'The opportunity clears initial screens and is ready for deeper expert work.',
    tone: 'success',
  },
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-hero-radial">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-6 sm:px-8 lg:px-12">
        <header className="sticky top-0 z-30 mb-8 border-b border-white/5 bg-background/70 py-5 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-1">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-primary/80">Feasibility Intelligence</p>
              <p className="mt-2 text-sm text-muted">Filter non-starters. Explain why. Escalate the right opportunities.</p>
            </div>
            <a
              href="#cta"
              className="inline-flex h-11 items-center rounded-full border border-white/10 bg-white/5 px-5 text-sm text-foreground transition hover:bg-white/10"
            >
              Request preview
            </a>
          </div>
        </header>

        <section className="grid gap-10 py-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-16" id="hero">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary/90">
              <Sparkles className="h-3.5 w-3.5" />
              Feasibility engine MVP
            </div>
            <h1 className="max-w-3xl text-5xl font-medium tracking-[-0.04em] text-slate-50 sm:text-6xl lg:text-[4.2rem]">
              Screen opportunities before they consume expert time.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted sm:text-xl">
              Feasibility Intelligence turns fragmented site and market inputs into a clear first-pass outcome: stop, review, or proceed.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#cta"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-[15px] font-medium text-slate-950 transition hover:bg-[#9AB8FF]"
              >
                Book early access
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 text-[15px] font-medium text-foreground transition hover:bg-white/10"
              >
                See the flow
              </a>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ['Earlier filtering', 'Remove obvious non-starters before manual review.'],
                ['Clear reasoning', 'Every outcome carries a concise explanation.'],
                ['Better allocation', 'Expert attention goes to the strongest cases.'],
              ].map(([title, body]) => (
                <Card key={title} className="rounded-[24px] p-4">
                  <p className="text-sm font-medium text-foreground">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
                </Card>
              ))}
            </div>
          </div>
          <HeroEngine />
        </section>

        <section className="grid gap-6 py-12 lg:grid-cols-2" id="problem">
          <Card className="p-8">
            <div className="flex items-center gap-3 text-accent">
              <ShieldAlert className="h-5 w-5" />
              <p className="text-sm uppercase tracking-[0.26em] text-accent/90">Problem</p>
            </div>
            <h2 className="mt-6 text-3xl font-medium tracking-[-0.03em] text-slate-50">Good-looking opportunities often fail late.</h2>
            <div className="mt-6 space-y-4">
              {problemPoints.map((point) => (
                <div key={point} className="flex gap-3 text-muted">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <p className="leading-7">{point}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-8">
            <div className="flex items-center gap-3 text-primary">
              <SearchCheck className="h-5 w-5" />
              <p className="text-sm uppercase tracking-[0.26em] text-primary/90">Solution</p>
            </div>
            <h2 className="mt-6 text-3xl font-medium tracking-[-0.03em] text-slate-50">Use a structured first-pass engine before deep work starts.</h2>
            <div className="mt-6 space-y-4">
              {solutionPoints.map((point) => (
                <div key={point} className="flex gap-3 text-muted">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <p className="leading-7">{point}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="py-12" id="how-it-works">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm uppercase tracking-[0.28em] text-primary/80">How it works</p>
            <h2 className="mt-5 text-3xl font-medium tracking-[-0.03em] text-slate-50 sm:text-4xl">A practical screening layer for feasibility decisions.</h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              The system is designed to increase decision confidence without pretending to replace expert judgement.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {steps.map((step, index) => (
              <Card key={step.title} className="p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-sm text-primary">
                  0{index + 1}
                </div>
                <h3 className="mt-6 text-xl font-medium text-slate-50">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-muted">{step.body}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-12" id="outputs">
          <OutcomeCards outcomes={outcomes} />
        </section>

        <section className="py-12" id="cta">
          <Card className="overflow-hidden p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-primary/80">Call to action</p>
                <h2 className="mt-5 text-3xl font-medium tracking-[-0.03em] text-slate-50 sm:text-4xl">
                  Request the preview and shape the first screening workflow.
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
                  Early conversations are focused on fit, input quality, and decision thresholds. No hype. No black box claims.
                </p>
              </div>
              <form className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
                <label className="block text-sm text-muted" htmlFor="email">
                  Work email
                </label>
                <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-background/80 px-4 py-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
                  />
                </div>
                <button
                  type="button"
                  className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-slate-950 transition hover:bg-[#9AB8FF]"
                >
                  Request access
                </button>
                <p className="mt-3 text-xs leading-6 text-muted">
                  Placeholder capture for the MVP. Wire to CRM or email routing in the next iteration.
                </p>
              </form>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}

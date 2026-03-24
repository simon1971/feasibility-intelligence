'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

type OutputTone = 'danger' | 'warning' | 'success';

const inputs = ['Zoning', 'Site Metrics', 'Constraints', 'Market'];
const layers = [
  ['Signal ingest', 'Normalise inputs'],
  ['Rule pass', 'Check hard constraints'],
  ['Decision layer', 'Classify outcome'],
];
const outputs: Array<{ title: string; reason: string; tone: OutputTone }> = [
  { title: 'Not feasible', reason: 'Use conflicts with site conditions', tone: 'danger' },
  { title: 'Needs review', reason: 'Planning uncertainty requires expert judgement', tone: 'warning' },
  { title: 'High potential', reason: 'Core indicators clear the first-pass screen', tone: 'success' },
];

const pulseTransition = {
  duration: 3.6,
  repeat: Infinity,
  repeatType: 'mirror' as const,
  ease: 'easeInOut' as const,
};

const flowLines = [
  { top: '14%', delay: 0 },
  { top: '34%', delay: 0.65 },
  { top: '54%', delay: 1.2 },
  { top: '74%', delay: 1.85 },
];

export function HeroEngine() {
  return (
    <Card className="relative overflow-hidden rounded-[32px] border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-4 shadow-glow sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,164,255,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(203,184,157,0.14),transparent_24%)]" />
      <div className="relative grid gap-5 lg:grid-cols-[0.95fr_1.05fr_1fr]">
        <Column title="Inputs" subtitle="Captured signals">
          {inputs.map((input, index) => (
            <motion.div
              key={input}
              animate={{ opacity: [0.6, 1, 0.6], y: [0, -4, 0] }}
              transition={{ ...pulseTransition, delay: index * 0.18 }}
              className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3"
            >
              <p className="text-sm font-medium text-slate-100">{input}</p>
              <p className="mt-1 text-xs text-muted">Validated against the active screening model.</p>
            </motion.div>
          ))}
        </Column>

        <Column title="Processing layers" subtitle="Structured passes">
          <div className="relative flex min-h-[360px] flex-col justify-between py-3">
            {flowLines.map((line) => (
              <div key={line.top} className="pointer-events-none absolute left-[-16%] right-[-16%]" style={{ top: line.top }}>
                <div className="relative h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent">
                  <motion.div
                    className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_18px_rgba(123,164,255,0.7)]"
                    initial={{ left: '2%' }}
                    animate={{ left: ['2%', '96%', '2%'] }}
                    transition={{ duration: 7, delay: line.delay, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </div>
            ))}
            {layers.map((layer, index) => (
              <motion.div
                key={layer[0]}
                animate={{ scale: [1, 1.025, 1], borderColor: ['rgba(255,255,255,0.08)', 'rgba(123,164,255,0.34)', 'rgba(255,255,255,0.08)'] }}
                transition={{ ...pulseTransition, delay: 0.4 + index * 0.35 }}
                className="relative mx-auto flex w-full max-w-[250px] items-center gap-4 rounded-[28px] border bg-background/70 px-5 py-5"
              >
                <motion.div
                  animate={{ boxShadow: ['0 0 0 rgba(123,164,255,0)', '0 0 24px rgba(123,164,255,0.32)', '0 0 0 rgba(123,164,255,0)'] }}
                  transition={{ ...pulseTransition, delay: index * 0.22 }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-sm text-primary"
                >
                  0{index + 1}
                </motion.div>
                <div>
                  <p className="text-sm font-medium text-slate-50">{layer[0]}</p>
                  <p className="mt-1 text-xs leading-5 text-muted">{layer[1]}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Column>

        <Column title="Outputs" subtitle="Decision-ready results">
          {outputs.map((output, index) => (
            <motion.div
              key={output.title}
              animate={{ opacity: [0.72, 1, 0.72], x: [0, 3, 0] }}
              transition={{ ...pulseTransition, delay: 0.55 + index * 0.3 }}
              className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-50">{output.title}</p>
                  <p className="mt-1 text-xs leading-5 text-muted">{output.reason}</p>
                </div>
                <span className={toneClass(output.tone)} />
              </div>
            </motion.div>
          ))}
        </Column>
      </div>
    </Card>
  );
}

function Column({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[28px] border border-white/8 bg-background/40 p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-primary/75">{title}</p>
      <p className="mt-2 text-sm text-muted">{subtitle}</p>
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}

function toneClass(tone: OutputTone) {
  switch (tone) {
    case 'danger':
      return 'mt-1 inline-flex h-3 w-3 rounded-full bg-danger shadow-[0_0_18px_rgba(240,139,139,0.65)]';
    case 'warning':
      return 'mt-1 inline-flex h-3 w-3 rounded-full bg-warning shadow-[0_0_18px_rgba(231,192,125,0.65)]';
    case 'success':
      return 'mt-1 inline-flex h-3 w-3 rounded-full bg-success shadow-[0_0_18px_rgba(139,208,170,0.65)]';
  }
}

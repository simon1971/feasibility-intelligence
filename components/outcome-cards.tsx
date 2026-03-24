'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

type OutputTone = 'danger' | 'warning' | 'success';

type Outcome = {
  label: string;
  reason: string;
  tone: OutputTone;
};

export function OutcomeCards({ outcomes }: { outcomes: readonly Outcome[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {outcomes.map((outcome, index) => (
        <OrbitCard key={outcome.label} outcome={outcome} index={index} />
      ))}
    </div>
  );
}

function OrbitCard({ outcome, index }: { outcome: Outcome; index: number }) {
  const theme = toneTheme(outcome.tone);

  return (
    <Card className="group relative overflow-hidden p-7">
      <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_45%)] opacity-40" />
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute h-3.5 w-3.5 rounded-full ${theme.dot}`}
        initial={{ top: 12, left: 12 }}
        animate={{
          top: [12, 12, 'calc(100% - 14px)', 'calc(100% - 14px)', 12],
          left: [12, 'calc(100% - 14px)', 'calc(100% - 14px)', 12, 12],
        }}
        transition={{
          duration: 8.5,
          delay: index * 0.45,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <div className={`pointer-events-none absolute inset-[7px] rounded-[22px] border ${theme.border}`} />
      <div className="relative">
        <p className={`inline-flex rounded-full px-3 py-1 text-xs uppercase tracking-[0.22em] ${theme.pill}`}>
          {outcome.label}
        </p>
        <p className="mt-5 text-lg leading-8 text-muted">{outcome.reason}</p>
      </div>
    </Card>
  );
}

function toneTheme(tone: OutputTone) {
  switch (tone) {
    case 'danger':
      return {
        pill: 'bg-danger/10 text-danger',
        dot: 'bg-danger shadow-[0_0_20px_rgba(240,139,139,0.72)]',
        border: 'border-danger/30',
      };
    case 'warning':
      return {
        pill: 'bg-warning/10 text-warning',
        dot: 'bg-warning shadow-[0_0_20px_rgba(231,192,125,0.72)]',
        border: 'border-warning/30',
      };
    case 'success':
      return {
        pill: 'bg-success/10 text-success',
        dot: 'bg-success shadow-[0_0_20px_rgba(139,208,170,0.72)]',
        border: 'border-success/30',
      };
  }
}

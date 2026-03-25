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
        <GlowCard key={outcome.label} outcome={outcome} index={index} />
      ))}
    </div>
  );
}

function GlowCard({ outcome, index }: { outcome: Outcome; index: number }) {
  const theme = toneTheme(outcome.tone);

  return (
    <Card className="group relative overflow-hidden p-7">
      <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]" />

      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-10 top-[-18%] h-40 w-40 rounded-full blur-3xl ${theme.glow}`}
        animate={{
          x: [0, -8, 0],
          y: [0, 10, 0],
          opacity: [0.2, 0.32, 0.2],
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 6.8,
          delay: index * 0.45,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      />

      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-px ${theme.edge}`}
        animate={{ opacity: [0.18, 0.34, 0.18] }}
        transition={{
          duration: 5.8,
          delay: index * 0.35,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      />

      <div className="pointer-events-none absolute inset-[1px] rounded-[27px] border border-white/[0.05]" />

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
        glow: 'bg-[rgba(240,139,139,0.18)]',
        edge: 'bg-gradient-to-r from-transparent via-danger/40 to-transparent',
      };
    case 'warning':
      return {
        pill: 'bg-warning/10 text-warning',
        glow: 'bg-[rgba(231,192,125,0.18)]',
        edge: 'bg-gradient-to-r from-transparent via-warning/40 to-transparent',
      };
    case 'success':
      return {
        pill: 'bg-success/10 text-success',
        glow: 'bg-[rgba(139,208,170,0.18)]',
        edge: 'bg-gradient-to-r from-transparent via-success/40 to-transparent',
      };
  }
}

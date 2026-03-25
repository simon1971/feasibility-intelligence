'use client';

import { useId } from 'react';
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
  const pathId = useId().replace(/:/g, '');
  const begin = `${index * 0.6}s`;

  return (
    <Card className="group relative overflow-hidden p-7">
      <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_48%)] opacity-35" />

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-[10px] h-[calc(100%-20px)] w-[calc(100%-20px)]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <path id={pathId} d="M18,4 H82 A14,14 0 0 1 96,18 V82 A14,14 0 0 1 82,96 H18 A14,14 0 0 1 4,82 V18 A14,14 0 0 1 18,4 Z" />
          <filter id={`${pathId}-blur`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.3" />
          </filter>
        </defs>

        <rect x="4" y="4" width="92" height="92" rx="14" fill="none" className="stroke-white/8" strokeWidth="1.05" />
        <rect x="4" y="4" width="92" height="92" rx="14" fill="none" className={theme.edgeTint} strokeWidth="1.05" />

        <circle r="2.5" className={theme.glowFill} filter={`url(#${pathId}-blur)`} opacity="0.36">
          <animateMotion dur="7.2s" begin={begin} repeatCount="indefinite" rotate="auto" calcMode="linear">
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </circle>

        <circle r="1.2" className={theme.dotFill}>
          <animateMotion dur="7.2s" begin={begin} repeatCount="indefinite" rotate="auto" calcMode="linear">
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </circle>
      </svg>

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
        dotFill: 'fill-danger',
        glowFill: 'fill-danger',
        edgeTint: 'stroke-danger/14',
      };
    case 'warning':
      return {
        pill: 'bg-warning/10 text-warning',
        dotFill: 'fill-warning',
        glowFill: 'fill-warning',
        edgeTint: 'stroke-warning/14',
      };
    case 'success':
      return {
        pill: 'bg-success/10 text-success',
        dotFill: 'fill-success',
        glowFill: 'fill-success',
        edgeTint: 'stroke-success/14',
      };
  }
}

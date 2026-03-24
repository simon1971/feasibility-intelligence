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

  return (
    <Card className="group relative overflow-hidden p-7">
      <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_45%)] opacity-40" />

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-[7px] h-[calc(100%-14px)] w-[calc(100%-14px)]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <rect
          x="1"
          y="1"
          width="98"
          height="98"
          rx="16"
          fill="none"
          className={theme.borderStroke}
          strokeWidth="1.25"
        />
        <defs>
          <path id={pathId} d="M17,1 H83 A16,16 0 0 1 99,17 V83 A16,16 0 0 1 83,99 H17 A16,16 0 0 1 1,83 V17 A16,16 0 0 1 17,1 Z" />
        </defs>
        <circle r="2.2" className={theme.dotFill}>
          <animateMotion dur="8.8s" begin={`${index * 0.5}s`} repeatCount="indefinite" rotate="auto" calcMode="linear">
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
        dotFill: 'fill-danger drop-shadow-[0_0_6px_rgba(240,139,139,0.95)]',
        borderStroke: 'stroke-danger/30',
      };
    case 'warning':
      return {
        pill: 'bg-warning/10 text-warning',
        dotFill: 'fill-warning drop-shadow-[0_0_6px_rgba(231,192,125,0.95)]',
        borderStroke: 'stroke-warning/30',
      };
    case 'success':
      return {
        pill: 'bg-success/10 text-success',
        dotFill: 'fill-success drop-shadow-[0_0_6px_rgba(139,208,170,0.95)]',
        borderStroke: 'stroke-success/30',
      };
  }
}

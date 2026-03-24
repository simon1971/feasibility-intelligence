import * as React from 'react';
import { cn } from '@/lib/utils';

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('rounded-[28px] border border-white/10 bg-panel/80 shadow-panel backdrop-blur', className)}
      {...props}
    />
  );
}

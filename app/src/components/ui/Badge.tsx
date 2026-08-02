import type { ReactNode } from 'react';

export type BadgeVariant =
  | 'warrior'
  | 'ranger'
  | 'warlock'
  | 'tank'
  | 'carry'
  | 'support'
  | 'gold'
  | 'neutral'
  | 'teal'
  | 'red'
  | 'blue'
  | 'purple';

const variantClass: Record<BadgeVariant, string> = {
  warrior: 'bw',
  ranger: 'br',
  warlock: 'bwk',
  tank: 'bt',
  carry: 'bc',
  support: 'bs',
  gold: 'bg',
  neutral: 'bd',
  teal: 'bteal',
  red: 'bred',
  blue: 'bblue',
  purple: 'bpurp',
};

export function Badge({ variant = 'neutral', children }: { variant?: BadgeVariant; children: ReactNode }) {
  return <span className={`badge ${variantClass[variant]}`}>{children}</span>;
}

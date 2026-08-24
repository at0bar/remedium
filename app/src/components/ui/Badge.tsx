import type { ReactNode } from 'react';
import type { PlayerGroup } from '../../lib/api/types';

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
  | 'purple'
  | 'slate';

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
  slate: 'bslate',
};

export function Badge({ variant = 'neutral', children }: { variant?: BadgeVariant; children: ReactNode }) {
  return <span className={`badge ${variantClass[variant]}`}>{children}</span>;
}

/**
 * Player-group color coding, reused everywhere a group badge shows up (rosters, contribution,
 * caravan). Deliberately uses the generic gold/purple/blue/teal/slate variants rather than the
 * faction/class ones (carry/ranger/warlock/...) — per DESIGN.md's Two-Taxonomy Rule, those hues
 * are reserved for hero faction/class and must never carry an unrelated UI signal.
 */
export const GROUP_BADGE_VARIANT: Record<PlayerGroup, BadgeVariant> = {
  R5: 'gold',
  R4: 'purple',
  R3: 'blue',
  R2: 'teal',
  R1: 'slate',
};

import type { Playstyle } from './api/types';

/** Canonical order and Russian display labels for "Стиль игры" (see CONTEXT.md, ADR 0005) —
 * shared between the profile/roster editors and the Formation legend, since it's one attribute. */
export const PLAYSTYLES: Playstyle[] = ['attacker', 'defender', 'mixed', 'none'];

export const PLAYSTYLE_LABELS: Record<Playstyle, string> = {
  attacker: 'Рашер',
  defender: 'Куколд',
  mixed: 'Флоатер',
  none: 'Афк',
};

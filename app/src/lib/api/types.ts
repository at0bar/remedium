export type PlayerGroup = 'R1' | 'R2' | 'R3' | 'R4' | 'R5';
/** See CONTEXT.md "Стиль игры", ADR 0005 — the same attribute as the old FormationRole, now
 * unified onto the player. Russian display labels live in `lib/playstyle.ts`. */
export type Playstyle = 'attacker' | 'defender' | 'mixed' | 'none';

export interface Squad {
  id: string;
  name: string;
  /** Squad power in millions, e.g. 9.35 = 9.35M */
  powerM: number;
  /** 5 hero names, front-to-back; '' marks an empty slot. Mocked for now — not yet backed by real hero/loadout data. */
  heroes: string[];
}

export interface ProfileStats {
  avgDuelScore: number;
  avgDuelRank: number;
  strongerThanPercent: number;
  lastCoachmanDate: string;
  /** Change in total squad power vs. the previous week, in percent. */
  weeklyPowerChangePercent: number;
}

export interface ProfileData {
  nick: string;
  level: number;
  group: PlayerGroup;
  playstyle: Playstyle;
  coords: { x: number; y: number };
  squads: Squad[];
  stats: ProfileStats;
}

export interface AlliancePlayer {
  id: string;
  nick: string;
  level: number;
  group: PlayerGroup;
  totalPowerM: number;
  playstyle: Playstyle;
  /** Base position on the world map — officer-edited, also what "Формация" plots (see ADR 0007). */
  coordsX: number | null;
  coordsY: number | null;
  isSelf?: boolean;
}

/**
 * A player's role on a caravan run. Every run has exactly one 'кучер' (coachman) and one
 * escort riding beside them — either 'страж' (guard) or 'vip'; which of those two the escort
 * gets is a separate rule still to be defined, so the draw picks between them arbitrarily for now.
 */
export type CaravanRole = 'кучер' | 'страж' | 'vip';
export type CaravanEscortRole = 'страж' | 'vip';

export interface CaravanMember {
  nick: string;
  group: PlayerGroup;
  level: number;
  isSelf?: boolean;
}

/** One caravan run's outcome — always a coachman plus one escort, never a lone player. */
export interface CaravanDraw {
  coachman: CaravanMember;
  escort: CaravanMember;
  escortRole: CaravanEscortRole;
  /**
   * Carried through from `roll` to `confirm` (see useAddCaravanRun) — not for display.
   * Optional only because `CaravanRun` extends this shape and its own `list` query doesn't
   * carry player ids; an actual roll result always has both.
   */
  coachmanPlayerId?: string;
  escortPlayerId?: string;
}

export interface CaravanRun extends CaravanDraw {
  id: string;
  lastAssignedDate: string;
}

export interface FormationTile {
  x: number;
  y: number;
  nick: string;
  /** The player's totalPowerM, in millions — same figure as the "Игроки" tab (see ADR 0007). */
  power: number;
  /** Joined live from the player's `playstyle` — not its own stored field, see ADR 0005. */
  role: Playstyle;
  isSelf?: boolean;
}

export type ElixirTeam = 'Основа А' | 'Основа Б' | 'Резерв А' | 'Резерв Б' | 'Не зарегистрирован';
export type ElixirParticipation = 'Да' | 'Нет' | 'Не знает';

export interface ElixirRaceEntry {
  nick: string;
  level: number;
  team: ElixirTeam;
  participation: ElixirParticipation;
  isSelf?: boolean;
}

export interface WeeklyRatingEntry {
  nick: string;
  /** Points for the last 5 weeks, newest first — length matches ratingWeeks. */
  points: number[];
  isSelf?: boolean;
}

export interface ContributionEntry {
  nick: string;
  group: PlayerGroup;
  /** Total alliance-duel rating points contributed. */
  points: number;
  isSelf?: boolean;
}

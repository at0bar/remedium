export type PlayerGroup = 'R1' | 'R2' | 'R3' | 'R4' | 'R5';
export type Playstyle = 'Фарм' | 'Оборона' | 'Смешанный';

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
  nick: string;
  level: number;
  group: PlayerGroup;
  totalPowerM: number;
  playstyle: Playstyle;
}

export type CaravanFlag = 'страж' | 'vip';

export interface CaravanEntry {
  nick: string;
  group: PlayerGroup;
  level: number;
  flag: CaravanFlag;
  lastAssignedDate: string;
}

export type FormationRole = 'attacker' | 'mixed' | 'defender' | 'none';

export interface FormationTile {
  x: number;
  y: number;
  nick: string;
  /** Raw power value as shown on the source screenshot — unit wasn't labeled there, kept as-is. */
  power: number | null;
  role: FormationRole;
  isSelf?: boolean;
}

export type ElixirTeam = 'Основа А' | 'Основа Б' | 'Резерв А' | 'Резерв Б' | 'Не зарегистрирован';
export type ElixirParticipation = 'Да' | 'Нет' | 'Не знает';

export interface ElixirRaceEntry {
  nick: string;
  level: number;
  team: ElixirTeam;
  participation: ElixirParticipation;
}

export interface WeeklyRatingEntry {
  nick: string;
  /** Points for the last 5 weeks, newest first — length matches ratingWeeks. */
  points: number[];
}

export interface ContributionEntry {
  nick: string;
  group: PlayerGroup;
  /** Total alliance-duel rating points contributed. */
  points: number;
  isSelf?: boolean;
}

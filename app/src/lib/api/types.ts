export type PlayerGroup = 'R1' | 'R2' | 'R3' | 'R4' | 'R5';
export type Playstyle = 'Фарм' | 'Оборона' | 'Смешанный';

export interface Squad {
  name: string;
  /** Squad power in millions, e.g. 9.35 = 9.35M */
  powerM: number;
}

export interface ProfileStats {
  avgDuelScore: number;
  avgDuelRank: number;
  strongerThanPercent: number;
  lastCoachmanDate: string;
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

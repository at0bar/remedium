import type {
  AlliancePlayer,
  CaravanEntry,
  ElixirRaceEntry,
  ProfileData,
  WeeklyRatingEntry,
} from './types';

export const mockProfile: ProfileData = {
  nick: 'Atobar',
  level: 25,
  group: 'R3',
  playstyle: 'Фарм',
  coords: { x: 680, y: 428 },
  squads: [
    { name: 'Отряд 1', powerM: 9.35 },
    { name: 'Отряд 2', powerM: 6.38 },
    { name: 'Отряд 3', powerM: 5.2 },
  ],
  stats: {
    avgDuelScore: 18420,
    avgDuelRank: 11,
    strongerThanPercent: 80,
    lastCoachmanDate: '2026-07-21',
  },
};

export const mockAlliancePlayers: AlliancePlayer[] = [
  { nick: 'Ironclad', level: 30, group: 'R5', totalPowerM: 41.2, playstyle: 'Смешанный' },
  { nick: 'Valkyrie', level: 29, group: 'R5', totalPowerM: 38.7, playstyle: 'Оборона' },
  { nick: 'Nyxara', level: 28, group: 'R4', totalPowerM: 33.1, playstyle: 'Смешанный' },
  { nick: 'Grishka', level: 28, group: 'R4', totalPowerM: 30.4, playstyle: 'Оборона' },
  { nick: 'Silence', level: 27, group: 'R4', totalPowerM: 27.9, playstyle: 'Фарм' },
  { nick: 'Atobar', level: 25, group: 'R3', totalPowerM: 20.93, playstyle: 'Фарм' },
  { nick: 'Dolvax', level: 26, group: 'R3', totalPowerM: 24.6, playstyle: 'Смешанный' },
  { nick: 'Mirelle', level: 24, group: 'R3', totalPowerM: 19.8, playstyle: 'Фарм' },
  { nick: 'Bramblewick', level: 23, group: 'R3', totalPowerM: 18.5, playstyle: 'Оборона' },
  { nick: 'Kestrel', level: 22, group: 'R2', totalPowerM: 14.2, playstyle: 'Фарм' },
  { nick: 'Ossian', level: 21, group: 'R2', totalPowerM: 12.7, playstyle: 'Смешанный' },
  { nick: 'Tavren', level: 20, group: 'R2', totalPowerM: 11.3, playstyle: 'Фарм' },
  { nick: 'Wrenna', level: 19, group: 'R1', totalPowerM: 7.9, playstyle: 'Фарм' },
  { nick: 'Cobble', level: 18, group: 'R1', totalPowerM: 6.4, playstyle: 'Оборона' },
  { nick: 'Sorrel', level: 17, group: 'R1', totalPowerM: 5.1, playstyle: 'Фарм' },
  { nick: 'Pipkin', level: 16, group: 'R1', totalPowerM: 4.3, playstyle: 'Смешанный' },
];

export const mockCaravan: CaravanEntry[] = [
  { nick: 'Ironclad', group: 'R5', level: 30, flag: 'страж', lastAssignedDate: '2026-07-28' },
  { nick: 'Valkyrie', group: 'R5', level: 29, flag: 'vip', lastAssignedDate: '2026-07-25' },
  { nick: 'Nyxara', group: 'R4', level: 28, flag: 'страж', lastAssignedDate: '2026-07-22' },
  { nick: 'Atobar', group: 'R3', level: 25, flag: 'vip', lastAssignedDate: '2026-07-21' },
  { nick: 'Dolvax', group: 'R3', level: 26, flag: 'страж', lastAssignedDate: '2026-07-19' },
  { nick: 'Kestrel', group: 'R2', level: 22, flag: 'vip', lastAssignedDate: '2026-07-14' },
];

export const mockElixirRace: ElixirRaceEntry[] = [
  { nick: 'Ironclad', level: 30, team: 'Основа А', participation: 'Да' },
  { nick: 'Valkyrie', level: 29, team: 'Основа А', participation: 'Да' },
  { nick: 'Nyxara', level: 28, team: 'Основа Б', participation: 'Да' },
  { nick: 'Grishka', level: 28, team: 'Основа Б', participation: 'Не знает' },
  { nick: 'Atobar', level: 25, team: 'Резерв А', participation: 'Да' },
  { nick: 'Dolvax', level: 26, team: 'Резерв А', participation: 'Нет' },
  { nick: 'Mirelle', level: 24, team: 'Резерв Б', participation: 'Не знает' },
  { nick: 'Kestrel', level: 22, team: 'Не зарегистрирован', participation: 'Нет' },
];

/** Week-ending dates, newest first — matches the point order in WeeklyRatingEntry.points. */
export const ratingWeeks: string[] = ['2026-08-02', '2026-07-26', '2026-07-19', '2026-07-12', '2026-07-05'];

export const mockWeeklyRating: WeeklyRatingEntry[] = [
  { nick: 'Ironclad', points: [5820, 6110, 5490, 6020, 5750] },
  { nick: 'Valkyrie', points: [5410, 5230, 5680, 5090, 5340] },
  { nick: 'Nyxara', points: [4790, 4520, 4960, 4680, 4410] },
  { nick: 'Atobar', points: [3120, 2980, 3340, 2870, 3050] },
  { nick: 'Dolvax', points: [2890, 3010, 2760, 2940, 2680] },
  { nick: 'Mirelle', points: [2340, 2210, 2480, 2190, 2360] },
  { nick: 'Kestrel', points: [1680, 1590, 1740, 1620, 1550] },
];

import type {
  AlliancePlayer,
  CaravanEntry,
  ContributionEntry,
  ElixirRaceEntry,
  FormationTile,
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
    { id: 's1', name: 'Отряд 1', powerM: 9.35, heroes: ['Arthur', 'Daskal', 'Marlena', 'Zoya', 'Harper'] },
    { id: 's2', name: 'Отряд 2', powerM: 6.38, heroes: ['Shadow', 'Louis', 'Red Lady', 'Cynthia', 'Bell'] },
    { id: 's3', name: 'Отряд 3', powerM: 5.2, heroes: ['Brian', 'Bella', 'Jester', 'Claire', 'Celia'] },
  ],
  stats: {
    avgDuelScore: 18420,
    avgDuelRank: 11,
    strongerThanPercent: 80,
    lastCoachmanDate: '2026-07-21',
    weeklyPowerChangePercent: 4.2,
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

/**
 * Transcribed from a screenshot of the alliance's "circular defense" town layout
 * (strong attackers on the outer ring, defenders/no-style in the center).
 * Some nicknames were already cut off on the source image itself (kept with "…").
 * A few power values were too small to read reliably and are left as `null`.
 * Treat as a snapshot, not a live feed — re-sync when a fresher screenshot is available.
 */
export const mockFormationTiles: FormationTile[] = [
  // Row y=428
  { x: 680, y: 428, nick: 'Зет~Ангел', power: 33, role: 'attacker' },
  { x: 684, y: 428, nick: 'Гамино', power: 21, role: 'mixed' },
  { x: 688, y: 428, nick: 'Afinaz', power: 23, role: 'mixed' },
  { x: 692, y: 428, nick: 'Гаечка7777', power: null, role: 'attacker' },
  { x: 696, y: 428, nick: '°|mú•mú', power: null, role: 'attacker' },
  { x: 700, y: 428, nick: 'RAGNAR-Иван…', power: 23, role: 'mixed' },
  { x: 704, y: 428, nick: 'velikoebeds…', power: 32, role: 'mixed' },
  { x: 708, y: 428, nick: 'Скучный', power: 11, role: 'attacker' },
  { x: 712, y: 428, nick: 'Pavelllll', power: 46, role: 'attacker' },
  { x: 716, y: 428, nick: 'Axxxiles', power: 23, role: 'attacker' },
  // Row y=424
  { x: 680, y: 424, nick: 'vladisskk', power: 18, role: 'attacker' },
  { x: 684, y: 424, nick: 'AmozFFm', power: 20, role: 'mixed' },
  { x: 688, y: 424, nick: 'Abrammovaa', power: 17, role: 'mixed' },
  { x: 692, y: 424, nick: 'mozzz', power: 13, role: 'mixed' },
  { x: 696, y: 424, nick: 'd1rtyyankees', power: 10, role: 'mixed' },
  { x: 700, y: 424, nick: 'змееныш', power: 11, role: 'mixed' },
  { x: 704, y: 424, nick: 'TaiPAN', power: 13, role: 'mixed' },
  { x: 708, y: 424, nick: 'Алц', power: 18, role: 'attacker' },
  { x: 712, y: 424, nick: 'vanillavy', power: 21, role: 'none' },
  { x: 716, y: 424, nick: 'Maramay', power: 20, role: 'attacker' },
  // Row y=420
  { x: 680, y: 420, nick: 'Zimagor69', power: 18, role: 'attacker' },
  { x: 684, y: 420, nick: 'Dimitey', power: 18, role: 'mixed' },
  { x: 688, y: 420, nick: '-Miyako-', power: null, role: 'none' },
  { x: 692, y: 420, nick: 'Gonxa', power: null, role: 'none' },
  { x: 696, y: 420, nick: 'luna5', power: 19, role: 'defender' },
  { x: 700, y: 420, nick: 'Eduard111', power: null, role: 'none' },
  { x: 704, y: 420, nick: 'OllTiMicT', power: null, role: 'none' },
  { x: 708, y: 420, nick: 'Лисён0к', power: 3, role: 'none' },
  { x: 712, y: 420, nick: 'лисичкабеds…', power: 18, role: 'mixed' },
  { x: 716, y: 420, nick: 'Alishechka', power: 20, role: 'attacker' },
  // Row y=416
  { x: 680, y: 416, nick: 'MAN82', power: 17, role: 'attacker' },
  { x: 684, y: 416, nick: 'Галина72', power: 13, role: 'mixed' },
  { x: 688, y: 416, nick: 'NehirT', power: null, role: 'mixed' },
  { x: 692, y: 416, nick: 'Adalinaness', power: 13, role: 'defender' },
  { x: 696, y: 416, nick: 'STaYeR2k', power: 10, role: 'defender' },
  { x: 700, y: 416, nick: 'Muriana', power: 11, role: 'defender' },
  { x: 704, y: 416, nick: 'Статист', power: 14, role: 'defender' },
  { x: 708, y: 416, nick: 'Doctor3N6Zi…', power: null, role: 'none' },
  { x: 712, y: 416, nick: 'SRE', power: 13, role: 'none' },
  { x: 716, y: 416, nick: 'VIVOVI', power: 22, role: 'attacker' },
  // Row y=412
  { x: 680, y: 412, nick: 'Yari4ik', power: 17, role: 'attacker' },
  { x: 684, y: 412, nick: 'AcmoDey', power: 32, role: 'defender' },
  { x: 688, y: 412, nick: 'winterbouns', power: 16, role: 'defender' },
  { x: 692, y: 412, nick: 'Yuliya987', power: 10, role: 'defender' },
  { x: 696, y: 412, nick: 'inskwoy', power: null, role: 'defender' },
  { x: 700, y: 412, nick: 'gazi02', power: null, role: 'defender' },
  { x: 704, y: 412, nick: 'Bleeeh', power: 11, role: 'defender' },
  { x: 708, y: 412, nick: 'Зевсюша', power: 19, role: 'defender' },
  { x: 712, y: 412, nick: 'NasiBabi', power: 11, role: 'none' },
  { x: 716, y: 412, nick: 'Apyrexia', power: 22, role: 'attacker' },
  // Row y=408
  { x: 680, y: 408, nick: 'DokDja', power: 20, role: 'attacker' },
  { x: 684, y: 408, nick: 'ктк', power: 12, role: 'mixed' },
  { x: 688, y: 408, nick: 'Karel10r', power: null, role: 'none' },
  { x: 692, y: 408, nick: 'ФилиппСпб', power: 13, role: 'defender' },
  { x: 696, y: 408, nick: '•KiSss•', power: 3, role: 'defender' },
  { x: 700, y: 408, nick: 'DokariOj', power: 10, role: 'defender' },
  { x: 704, y: 408, nick: 'Ируся13', power: 13, role: 'defender' },
  { x: 708, y: 408, nick: 'Seeyou', power: null, role: 'mixed' },
  { x: 712, y: 408, nick: 'BUZ113', power: 13, role: 'none' },
  { x: 716, y: 408, nick: 'Бландос', power: 22, role: 'attacker' },
  // Row y=404
  { x: 680, y: 404, nick: 'GabrielleSev', power: 20, role: 'attacker' },
  { x: 684, y: 404, nick: 'Tekilaboom', power: 14, role: 'mixed' },
  { x: 688, y: 404, nick: 'Stouty1', power: null, role: 'none' },
  { x: 692, y: 404, nick: 'NixiaNella', power: 14, role: 'defender' },
  { x: 696, y: 404, nick: 'SofiaBel', power: 12, role: 'defender' },
  { x: 700, y: 404, nick: 'Zloypizdec2…', power: 13, role: 'defender' },
  { x: 704, y: 404, nick: 'MementoSanya', power: 15, role: 'defender' },
  { x: 708, y: 404, nick: 'NadiNka', power: null, role: 'mixed' },
  { x: 712, y: 404, nick: '0plague0bea…', power: 17, role: 'mixed' },
  { x: 716, y: 404, nick: 'Lockbit', power: 22, role: 'attacker' },
  // Row y=400
  { x: 680, y: 400, nick: 'gans92', power: 19, role: 'attacker' },
  { x: 684, y: 400, nick: 'Black~Maria', power: 19, role: 'none' },
  { x: 688, y: 400, nick: 'Доктор Стре…', power: 4, role: 'none' },
  { x: 692, y: 400, nick: 'Lis1RT', power: null, role: 'none' },
  { x: 696, y: 400, nick: 'Nontrixxx', power: null, role: 'none' },
  { x: 700, y: 400, nick: 'shinecolor', power: null, role: 'none' },
  { x: 704, y: 400, nick: '-ТриАда-', power: null, role: 'none' },
  { x: 708, y: 400, nick: 'MKdb', power: 6, role: 'mixed' },
  { x: 712, y: 400, nick: 'Шпулька2', power: 20, role: 'mixed' },
  { x: 716, y: 400, nick: 'SaTaNA', power: 30, role: 'attacker' },
  // Row y=396
  { x: 680, y: 396, nick: 'Dr-Cheshire', power: 19, role: 'attacker' },
  { x: 684, y: 396, nick: 'Vera~Odessa', power: 21, role: 'mixed' },
  { x: 688, y: 396, nick: 'РафНаБанано…', power: 18, role: 'mixed' },
  { x: 692, y: 396, nick: 'Luther609', power: 14, role: 'none' },
  { x: 696, y: 396, nick: 'АнгелВасили…', power: 12, role: 'none' },
  { x: 700, y: 396, nick: 'ol24', power: 13, role: 'none' },
  { x: 704, y: 396, nick: 'hey-zoey', power: 14, role: 'none' },
  { x: 708, y: 396, nick: 'DokDree', power: 19, role: 'mixed' },
  { x: 712, y: 396, nick: 'Atobar', power: 16, role: 'attacker', isSelf: true },
  // Row y=392
  { x: 680, y: 392, nick: 'IAMDMITRY', power: 35, role: 'attacker' },
  { x: 684, y: 392, nick: 'Алексей89', power: 16, role: 'attacker' },
  { x: 688, y: 392, nick: 'RINNaa', power: 15, role: 'attacker' },
  { x: 692, y: 392, nick: 'epileptickid', power: 15, role: 'attacker' },
  { x: 696, y: 392, nick: 'Лилит', power: 15, role: 'attacker' },
  { x: 700, y: 392, nick: 'Extazy13', power: 13, role: 'attacker' },
  { x: 704, y: 392, nick: 'Nikolaiastr…', power: 12, role: 'attacker' },
  { x: 708, y: 392, nick: 'capitanmorg…', power: 17, role: 'attacker' },
];

/**
 * Transcribed from a screenshot of the alliance-duel rating leaderboard.
 * Group is each player's real alliance rank, independent of the R1/R2/R3
 * milestone lines shown on the scale — those mark typical group thresholds,
 * not a computed rule.
 */
export const mockContribution: ContributionEntry[] = [
  { nick: 'Axxxiles', group: 'R4', points: 53_664_201 },
  { nick: 'DokDree', group: 'R4', points: 51_495_684 },
  { nick: 'Pavelllll', group: 'R3', points: 49_915_036 },
  { nick: 'Apyrexia', group: 'R4', points: 48_482_296 },
  { nick: 'DokDja', group: 'R3', points: 42_388_968 },
  { nick: 'Yari4ik', group: 'R3', points: 39_317_533 },
  { nick: 'vanillavy', group: 'R3', points: 37_333_669 },
  { nick: 'gans92', group: 'R3', points: 36_352_069 },
  { nick: 'Alishechka', group: 'R3', points: 35_985_404 },
  { nick: 'Алц', group: 'R3', points: 35_443_305 },
  { nick: 'Dr-Cheshire', group: 'R3', points: 33_235_914 },
  { nick: 'NehirT', group: 'R2', points: 32_262_105 },
  { nick: 'capitanmorgan', group: 'R3', points: 31_434_509 },
  { nick: 'marena', group: 'R2', points: 30_914_372 },
  { nick: 'RAGNAR-Иваныч', group: 'R2', points: 29_785_175 },
  { nick: 'Бландос', group: 'R2', points: 23_560_299 },
  { nick: '-ТриАда-', group: 'R2', points: 23_510_643 },
  { nick: 'Atobar', group: 'R3', points: 22_252_151, isSelf: true },
  { nick: 'РафНаБананвом', group: 'R2', points: 21_966_068 },
  { nick: 'vladisskk', group: 'R2', points: 20_754_235 },
  { nick: 'NadiNka', group: 'R2', points: 20_376_827 },
  { nick: '0plague0beast0', group: 'R1', points: 19_440_844 },
  { nick: 'AmozFFm', group: 'R1', points: 18_231_690 },
];

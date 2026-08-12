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

/**
 * Transcribed from a screenshot of the alliance's "circular defense" town layout
 * (strong attackers on the outer ring, defenders/no-style in the center).
 * Some nicknames were already cut off on the source image itself (kept with "…").
 * A few power values were too small to read reliably and are left as `null`.
 * Treat as a snapshot, not a live feed — re-sync when a fresher screenshot is available.
 */
export const formationTiles: FormationTile[] = [
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

export const formationRoleLabels: Record<FormationRole, string> = {
  attacker: 'Нападающий (кольцо)',
  mixed: 'Смешанный',
  defender: 'Оборонящийся (центр)',
  none: 'Без стиля',
};

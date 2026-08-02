export interface SanctuaryLevelRow {
  level: number;
  farmWood: string;
  herbs: string;
  stars: string;
  buildings: string;
  time: string;
  /** May contain **bold** markers (plain white bold) or ++bold++ markers (gold bold) for important unlock names. */
  unlocks: string;
  /** Row highlighted (background + bold gold level number) — matches original milestone rows. */
  highlight?: boolean;
  /** Small gold "gate" note shown under unlocks, e.g. troop tier gate. */
  gate?: string;
}

// Data from lastasylumplague.com. Original Time = base time before reductions
// from Builder's Hut, research, alliance help or Curios. Levels 2-7 show only
// Build Time (no separate Original Time listed). Troop tier gates confirmed by community.
export const sanctuaryLevels: SanctuaryLevelRow[] = [
  { level: 2, farmWood: '32', herbs: '—', stars: '—', buildings: '—', time: 'как строительство', unlocks: 'Новая Herb Garden' },
  { level: 3, farmWood: '983', herbs: '—', stars: '17', buildings: '—', time: 'как строительство', unlocks: "Builder's Hut, Herb Storage, Lumber Depot, Granary" },
  { level: 4, farmWood: '2,598', herbs: '—', stars: '19', buildings: 'Lumber Depot Lv.1 · Granary Lv.1 · Herb Storage Lv.1', time: 'как строительство', unlocks: 'Tavern, Walls, новая Lumberyard, новая Farm, новая Herb Garden' },
  { level: 5, farmWood: '19.7K', herbs: '—', stars: '28', buildings: 'Walls Lv.3', time: 'как строительство', unlocks: 'Antitoxin Workshop, Gear Workshop, Squad 1, Weaving Workshop, Smelting Workshop' },
  { level: 6, farmWood: '92.7K', herbs: '—', stars: '47', buildings: 'Walls Lv.5', time: 'как строительство', unlocks: 'Barracks, Scout Squad, Nomad Trader, Infirmary, Falcon Tower, Alliance Hall, 2× TG' },
  { level: 7, farmWood: '236K', herbs: '—', stars: '61', buildings: 'Training Grounds Lv.4 · Alliance Hall Lv.3', time: 'как строительство', unlocks: '**Warrior Statue, Raven Nest, 1-я лаборатория, Arena**', highlight: true },
  { level: 8, farmWood: '396K', herbs: '—', stars: '80', buildings: 'Training Grounds Lv.6 · Alliance Hall Lv.5', time: '3:01:35', unlocks: 'Слот отряда 2, новая Lumberyard, новая Farm, Watchtower, Curio Hall, новая Infirmary' },
  { level: 9, farmWood: '606K', herbs: '209K', stars: '96', buildings: 'Walls Lv.8 · Alliance Hall Lv.7', time: '4:16:50', unlocks: 'Monument, 2-я лаборатория (покупная), Black Ops' },
  { level: 10, farmWood: '749K', herbs: '233K', stars: '112', buildings: 'Walls Lv.9 · Infirmary Lv.7', time: '5:35:23', unlocks: 'Private Stable, Alliance Stable, новая Antitoxin Workshop, новая Smelting Workshop' },
  { level: 11, farmWood: '1.9M', herbs: '602K', stars: '142', buildings: 'Training Grounds Lv.10 · 1-я лаборатория Lv.7', time: '7:14:03', unlocks: 'Warlock Statue, новый Scout Squad' },
  { level: 12, farmWood: '3.1M', herbs: '959K', stars: '155', buildings: '1-я лаборатория Lv.11 · Walls Lv.10 · Antitoxin Workshop Lv.7', time: '9:24:17', unlocks: 'Новая Lumberyard, новая Farm' },
  { level: 13, farmWood: '3.5M', herbs: '1.1M', stars: '173', buildings: '1-я лаборатория Lv.12 · Alliance Hall Lv.11 · Farm Lv.7', time: '12:13:33', unlocks: 'Ranger Statue, Infirmary, новая Antitoxin Workshop' },
  { level: 14, farmWood: '4.9M', herbs: '1.6M', stars: '193', buildings: '1-я лаборатория Lv.13 · Warrior Statue Lv.12 · Lumberyard Lv.7', time: '15:53:38', unlocks: 'Новая Lumberyard, новая Farm' },
  { level: 15, farmWood: '6.4M', herbs: '2.3M', stars: '201', buildings: '1-я лаборатория Lv.14 · Training Grounds Lv.14 · Herb Garden Lv.7', time: '22:15:05', unlocks: '**Raven Workshop**, новая Barracks', highlight: true },
  { level: 16, farmWood: '11.9M', herbs: '4.0M', stars: '215', buildings: 'Warrior Statue Lv.14 · 1-я лаборатория Lv.15 · Granary Lv.7', time: '1Д 07:09', unlocks: '2× новая Antitoxin Workshop, новая Smelting Workshop' },
  { level: 17, farmWood: '16.3M', herbs: '5.0M', stars: '225', buildings: '1-я лаборатория Lv.16 · Barracks Lv.15 · Lumber Depot Lv.7', time: '1Д 19:36', unlocks: 'Новая Herb Garden, новая Training Grounds' },
  { level: 18, farmWood: '27.1M', herbs: '9.0M', stars: '231', buildings: '1-я лаборатория Lv.17 · Training Grounds Lv.17 · Herb Storage Lv.7', time: '2Д 13:03', unlocks: 'Новая Weaving Workshop, новая Infirmary' },
  { level: 19, farmWood: '31.1M', herbs: '10.8M', stars: '237', buildings: '1-я лаборатория Lv.18 · Warrior Statue Lv.17 · Antitoxin Lv.10', time: '3Д 13:28', unlocks: 'Новая Herb Garden, новый Scout Squad' },
  { level: 20, farmWood: '57.0M', herbs: '17.5M', stars: '247', buildings: '1-я лаборатория Lv.19 · Alliance Hall Lv.18 · Farm Lv.10', time: '4Д 23:40', unlocks: '++Слот отряда 3++, новая Barracks, новая Smelting Workshop', gate: 'Войска T7: TG Lv.20', highlight: true },
  { level: 21, farmWood: '81.2M', herbs: '26.3M', stars: '254', buildings: '1-я лаборатория Lv.20 · Training Grounds Lv.20 · Lumberyard Lv.10', time: '6Д 16:20', unlocks: 'Новая Weaving Workshop' },
  { level: 22, farmWood: '106M', herbs: '34.8M', stars: '260', buildings: '1-я лаборатория Lv.21 · Warrior Statue Lv.21 · Herb Garden Lv.10', time: '8Д 16:26', unlocks: '—' },
  { level: 23, farmWood: '137M', herbs: '40.4M', stars: '270', buildings: '1-я лаборатория Lv.22 · Infirmary Lv.22 · Granary Lv.10', time: '11Д 06:58', unlocks: '—' },
  { level: 24, farmWood: '168M', herbs: '55.1M', stars: '282', buildings: '1-я лаборатория Lv.23 · Walls Lv.23 · Lumber Depot Lv.10', time: '15Д 19:21', unlocks: '—', gate: 'Войска T8: TG Lv.24' },
  { level: 25, farmWood: '260M', herbs: '91.2M', stars: '292', buildings: '1-я лаборатория Lv.24 · Training Grounds Lv.24 · Herb Storage Lv.10', time: '22Д 03:05', unlocks: '—' },
  { level: 26, farmWood: '362M', herbs: '115M', stars: '304', buildings: '1-я лаборатория Lv.25 · Warrior Statue Lv.25 · Antitoxin Lv.13', time: '30Д 23:32', unlocks: '—' },
  { level: 27, farmWood: '512M', herbs: '158M', stars: '314', buildings: '1-я лаборатория Lv.26 · Training Grounds Lv.26 · Farm Lv.13', time: '43Д 08:57', unlocks: '—', gate: 'Войска T9: TG Lv.27' },
  { level: 28, farmWood: '684M', herbs: '221M', stars: '326', buildings: '1-я лаборатория Lv.27 · Barracks Lv.27 · Lumberyard Lv.13', time: '60Д 17:20', unlocks: '—' },
  { level: 29, farmWood: '995M', herbs: '301M', stars: '326', buildings: '1-я лаборатория Lv.28 · Alliance Hall Lv.28 · Herb Garden Lv.13', time: '78Д 22:32', unlocks: '—' },
  { level: 30, farmWood: '1.3B', herbs: '415M', stars: '326', buildings: '1-я лаборатория Lv.29 · Training Grounds Lv.29 · Antitoxin Lv.15', time: '102Д 14:53', unlocks: '—', gate: 'Войска T10: TG Lv.30 (= Sanctuary Lv.30)', highlight: true },
];

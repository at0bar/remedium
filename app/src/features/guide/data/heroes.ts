export type Faction = 'warrior' | 'ranger' | 'warlock';
export type HeroClass = 'tank' | 'carry' | 'support';

export interface UrHero {
  name: string;
  faction: Faction;
  cls: HeroClass;
  clsLabel: string;
  unlock: string;
  notes: string;
}

export interface SsrHero {
  name: string;
  faction: Faction;
  cls: HeroClass;
  clsLabel: string;
  notes: string;
}

export interface SrHero {
  name: string;
  faction: Faction;
  cls: HeroClass;
  clsLabel: string;
  notes: string;
}

export const urHeroes: UrHero[] = [
  {
    name: 'Arthur',
    faction: 'warrior',
    cls: 'tank',
    clsLabel: '🛡️ Tank',
    unlock: 'Таверна (всегда)',
    notes: 'Лучший танк в игре. Снижение урона всей команде, щит, масштабирующийся от HP, AoE-ультимейт.',
  },
  {
    name: 'Marlena',
    faction: 'warrior',
    cls: 'carry',
    clsLabel: '🪓 Carry',
    unlock: '1-е пополнение / Таверна',
    notes: 'Основной ДПС. AoE «вихрь мечей», пассивка энергетического урона.',
  },
  {
    name: 'Harper',
    faction: 'warrior',
    cls: 'support',
    clsLabel: '⚗️ Support',
    unlock: 'Ежедневное предложение, день 22',
    notes: 'Лучшая поддержка для составов Warrior. Нативная синергия с фракцией Warrior.',
  },
  {
    name: 'Daskal',
    faction: 'warrior',
    cls: 'tank',
    clsLabel: '🛡️ Tank',
    unlock: 'Ежедневное предложение, день 29',
    notes: 'Сильный второй танк Warrior. Щит масштабируется от DEF.',
  },
  {
    name: 'Zoya',
    faction: 'warrior',
    cls: 'carry',
    clsLabel: '🪓 Carry',
    unlock: 'Ежедневное предложение, день 57',
    notes: 'Керри-Warrior для составов из чистой фракции Warrior.',
  },
  {
    name: 'Shadow',
    faction: 'ranger',
    cls: 'tank',
    clsLabel: '🛡️ Tank',
    unlock: 'Паки / позже в Таверне',
    notes: 'Гибридный танк с высоким HP. Пассивное снижение энергетического урона.',
  },
  {
    name: 'Louis',
    faction: 'ranger',
    cls: 'tank',
    clsLabel: '🛡️ Tank',
    unlock: 'Ежедневное предложение, день 64',
    notes: 'Танк-Ranger для составов фракции Ranger.',
  },
  {
    name: 'Red Lady',
    faction: 'ranger',
    cls: 'carry',
    clsLabel: '🪓 Carry',
    unlock: 'Ежедневное предложение, день 36',
    notes: 'Керри-Ranger с упором на бёрст-урон.',
  },
  {
    name: 'Bell',
    faction: 'ranger',
    cls: 'support',
    clsLabel: '⚗️ Support',
    unlock: 'Ежедневное предложение, день 71',
    notes: 'Лучшая поддержка для составов Ranger. Нативная синергия с фракцией Ranger.',
  },
  {
    name: 'Cynthia',
    faction: 'ranger',
    cls: 'carry',
    clsLabel: '🪓 Carry',
    unlock: 'Ежедневное предложение / VIP / События',
    notes: 'Сильный керри-Ranger.',
  },
  {
    name: 'Annie',
    faction: 'warlock',
    cls: 'carry',
    clsLabel: '🪓 Carry',
    unlock: 'Hero Pass, день 15',
    notes: 'Керри-Warlock. Доступна рано через Hero Pass.',
  },
  {
    name: 'Jester',
    faction: 'warlock',
    cls: 'carry',
    clsLabel: '🪓 Carry',
    unlock: 'Доступен примерно с 14 дня',
    notes: 'Керри-Warlock. Восстанавливает 10% энергии при смешанном составе 3+2.',
  },
  {
    name: 'Brian',
    faction: 'warlock',
    cls: 'tank',
    clsLabel: '🛡️ Tank',
    unlock: 'Пак ежедневного предложения',
    notes: 'Основной танк Warlock. Ключевой для составов из чистой фракции Warlock.',
  },
  {
    name: 'Billy',
    faction: 'warlock',
    cls: 'tank',
    clsLabel: '🛡️ Tank',
    unlock: 'Доступен примерно с 85 дня',
    notes: 'Второй танк Warlock для позднеигровых составов Warlock.',
  },
  {
    name: 'Nicole',
    faction: 'warlock',
    cls: 'support',
    clsLabel: '⚗️ Support',
    unlock: 'Hero Pass, день 99',
    notes: 'Лучшая поддержка для составов Warlock. Нативная синергия с фракцией Warlock.',
  },
];

export const ssrHeroes: SsrHero[] = [
  {
    name: 'Bella',
    faction: 'warrior',
    cls: 'tank',
    clsLabel: '🛡️ Tank',
    notes: 'Контроль, снижает получаемый союзниками урон и атаку врага. Лучший танк не-UR уровня.',
  },
  {
    name: 'Claire',
    faction: 'warrior',
    cls: 'carry',
    clsLabel: '🪓 Carry',
    notes: 'Усиливает урон 3 Warrior-героев с наибольшей атакой. AoE-ультимейт мечом.',
  },
  {
    name: 'Kesso',
    faction: 'warrior',
    cls: 'carry',
    clsLabel: '🪓 Carry',
    notes: 'Керри-Warrior. Хороший вариант на раннем этапе.',
  },
  {
    name: 'Sivir',
    faction: 'warrior',
    cls: 'carry',
    clsLabel: '🪓 Carry',
    notes: 'Обычный ДПС Warrior. Заменить на UR-керри при появлении.',
  },
  {
    name: 'Lucius',
    faction: 'warrior',
    cls: 'tank',
    clsLabel: '🛡️ Tank',
    notes: 'Танк-Warrior. Годный ранний офф-танк.',
  },
  {
    name: 'Celia',
    faction: 'warrior',
    cls: 'support',
    clsLabel: '⚗️ Support',
    notes: 'Временная поддержка-Warrior до появления Harper.',
  },
  {
    name: 'Bestar',
    faction: 'ranger',
    cls: 'carry',
    clsLabel: '🪓 Carry',
    notes: 'Специалист по кровотечению. Ультимейт «призрачные коты». Отлично в затяжных боях.',
  },
  {
    name: 'Hastar',
    faction: 'ranger',
    cls: 'carry',
    clsLabel: '🪓 Carry',
    notes: 'Работает в паре с Bestar для устойчивого урона от кровотечения.',
  },
  {
    name: 'Ash',
    faction: 'ranger',
    cls: 'carry',
    clsLabel: '🪓 Carry',
    notes: 'Физический керри-Ranger. Самый слабый SSR-керри — заменить рано.',
  },
  {
    name: 'Grenwald',
    faction: 'warlock',
    cls: 'carry',
    clsLabel: '🪓 Carry',
    notes: 'Хрупкий ДПС-Warlock. Высокий бёрст. Нуждается в защите.',
  },
  {
    name: 'Griffith',
    faction: 'warlock',
    cls: 'tank',
    clsLabel: '🛡️ Tank',
    notes: 'Танк-Warlock для составов Warlock SSR-уровня.',
  },
  {
    name: 'Stellar',
    faction: 'warlock',
    cls: 'support',
    clsLabel: '⚗️ Support',
    notes: 'Экстренное лечение при смерти. Усиление урона по монстрам. Синергия с Warlock активируется только в составе с большинством Warlock.',
  },
];

export const srHeroes: SrHero[] = [
  {
    name: 'Durant',
    faction: 'warrior',
    cls: 'tank',
    clsLabel: '🛡️ Tank',
    notes: 'Только для заполнения слота. Не вкладываться сверх этого.',
  },
  {
    name: 'William',
    faction: 'ranger',
    cls: 'carry',
    clsLabel: '🪓 Carry',
    notes: 'Только для заполнения слота. Не вкладываться сверх этого.',
  },
  {
    name: 'Robin',
    faction: 'ranger',
    cls: 'carry',
    clsLabel: '🪓 Carry',
    notes: 'Только для заполнения слота. Не вкладываться сверх этого.',
  },
  {
    name: 'Kafa',
    faction: 'warlock',
    cls: 'carry',
    clsLabel: '🪓 Carry',
    notes: 'Только для заполнения слота. Не вкладываться сверх этого.',
  },
];

/** Flattened, sorted hero-name roster for pickers (squad composition, etc.) across all rarities. */
export const allHeroNames: string[] = [...urHeroes, ...ssrHeroes, ...srHeroes]
  .map((h) => h.name)
  .sort((a, b) => a.localeCompare(b));

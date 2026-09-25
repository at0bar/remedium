import { sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

// Mirrors the literal unions in app/src/lib/api/types.ts — kept local so `server/` has no
// dependency on `app/` (only `app/` type-imports `server/`, never the other way around).
export type PlayerGroup = 'R1' | 'R2' | 'R3' | 'R4' | 'R5';
/** See CONTEXT.md "Стиль игры", ADR 0005 — единственный атрибут манеры игры игрока, ранее
 * ошибочно продублированный отдельным `FormationRole` на `formationTiles`. `none` — осознанный
 * дефолт "стиль не определён". */
export type Playstyle = 'attacker' | 'defender' | 'mixed' | 'none';
export type CaravanEscortRole = 'страж' | 'vip';
export type ElixirTeam = 'Основа А' | 'Основа Б' | 'Резерв А' | 'Резерв Б' | 'Не зарегистрирован';
export type ElixirParticipation = 'Да' | 'Нет' | 'Не знает';

/**
 * Roster row — one alliance member's in-game data. Not a login; see `accounts`.
 * `totalPowerM` is a manually-entered snapshot (most roster rows have no registered account
 * behind them, so there's no real squad data to sum) — EXCEPT for whichever row is the
 * current caller's own, where it's always overridden with a live sum of their own `squads`
 * (see `listPlayersWithPower` in routers/players.ts). Mirrors the original mock's `withSelfPower`.
 * `coordsX`/`coordsY` — base position on the world map; officer-edited from the "Игроки" tab
 * (see ADR 0007). This is also what "Формация" plots, filtering out rows with no coords set.
 */
export const players = sqliteTable('players', {
  id: text('id').primaryKey(),
  nick: text('nick').notNull(),
  level: integer('level').notNull(),
  group: text('group').notNull().$type<PlayerGroup>(),
  totalPowerM: real('total_power_m').notNull().default(0),
  playstyle: text('playstyle').notNull().$type<Playstyle>(),
  coordsX: integer('coords_x'),
  coordsY: integer('coords_y'),
  createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
});

/** Login credential, 1:1 with a `players` row. Edit rights live here, not on `players`. */
export const accounts = sqliteTable(
  'accounts',
  {
    id: text('id').primaryKey(),
    playerId: text('player_id').notNull().references(() => players.id, { onDelete: 'cascade' }),
    passwordHash: text('password_hash').notNull(),
    canEdit: integer('can_edit', { mode: 'boolean' }).notNull().default(false),
    createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
  },
  (table) => [uniqueIndex('accounts_player_id_idx').on(table.playerId)],
);

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(), // random session token, this IS the cookie value
  accountId: text('account_id').notNull().references(() => accounts.id, { onDelete: 'cascade' }),
  createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
  expiresAt: text('expires_at').notNull(),
});

export const squads = sqliteTable('squads', {
  id: text('id').primaryKey(),
  playerId: text('player_id').notNull().references(() => players.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  powerM: real('power_m').notNull(),
  heroes: text('heroes', { mode: 'json' }).notNull().$type<string[]>(),
});

export const caravanRuns = sqliteTable('caravan_runs', {
  id: text('id').primaryKey(),
  coachmanPlayerId: text('coachman_player_id').notNull().references(() => players.id, { onDelete: 'cascade' }),
  escortPlayerId: text('escort_player_id').notNull().references(() => players.id, { onDelete: 'cascade' }),
  escortRole: text('escort_role').notNull().$type<CaravanEscortRole>(),
  lastAssignedDate: text('last_assigned_date').notNull(),
});

/**
 * `elixirRaceEntries` is a CSV-imported snapshot (see CONTEXT.md "Импортируемые данные") — no
 * app CRUD yet, wholesale-replaced on every officer import. (Formation used to be a second such
 * table, `formationTiles` — see ADR 0007 for why it was dropped in favor of `players.coords_x/y`.)
 */
export const elixirRaceEntries = sqliteTable('elixir_race_entries', {
  id: text('id').primaryKey(),
  nick: text('nick').notNull(),
  level: integer('level').notNull(),
  team: text('team').notNull().$type<ElixirTeam>(),
  participation: text('participation').notNull().$type<ElixirParticipation>(),
});

/**
 * "Вклад" — weekly alliance-duel points per player (see CONTEXT.md "Вклад", ADR 0003). One
 * row per (nick, weekStart); imported per-week (replace only that week, not the whole table —
 * see importCsv.ts). `group` is intentionally not stored here — it's a live attribute of the
 * player (`players.group`), not a fact about a past week. `avgDuelScore`/`avgDuelRank` on the
 * Profile page are computed by averaging over this history (see ADR 0004), not stored fields.
 */
export const contributionEntries = sqliteTable(
  'contribution_entries',
  {
    id: text('id').primaryKey(),
    nick: text('nick').notNull(),
    weekStart: text('week_start').notNull(),
    points: integer('points').notNull(),
  },
  (table) => [uniqueIndex('contribution_entries_nick_week_idx').on(table.nick, table.weekStart)],
);

/**
 * A manually-triggered snapshot of every player's live squad power (see CONTEXT.md "Срез
 * мощи", ADR 0004) — the baseline `weeklyPowerChangePercent` on the Profile page compares
 * against. Independent cadence from "Вклад": an officer takes one whenever, not weekly.
 */
export const powerSnapshots = sqliteTable('power_snapshots', {
  id: text('id').primaryKey(),
  takenAt: text('taken_at').notNull().default(sql`(current_timestamp)`),
});

export const powerSnapshotEntries = sqliteTable('power_snapshot_entries', {
  id: text('id').primaryKey(),
  snapshotId: text('snapshot_id').notNull().references(() => powerSnapshots.id, { onDelete: 'cascade' }),
  playerId: text('player_id').notNull().references(() => players.id, { onDelete: 'cascade' }),
  powerM: real('power_m').notNull(),
});

/**
 * Generic alliance-wide key-value settings (see ADR 0006) — starts out holding the "Порог
 * группы" values (`groupThresholdR1R2`, `groupThresholdR2R3`), but the shape is deliberately
 * open-ended so future settings don't need their own migration/table.
 */
export const settings = sqliteTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
});

import { sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

// Mirrors the literal unions in app/src/lib/api/types.ts — kept local so `server/` has no
// dependency on `app/` (only `app/` type-imports `server/`, never the other way around).
export type PlayerGroup = 'R1' | 'R2' | 'R3' | 'R4' | 'R5';
export type Playstyle = 'Фарм' | 'Оборона' | 'Смешанный';
export type CaravanEscortRole = 'страж' | 'vip';
export type ElixirTeam = 'Основа А' | 'Основа Б' | 'Резерв А' | 'Резерв Б' | 'Не зарегистрирован';
export type ElixirParticipation = 'Да' | 'Нет' | 'Не знает';
export type FormationRole = 'attacker' | 'mixed' | 'defender' | 'none';

/**
 * Roster row — one alliance member's in-game data. Not a login; see `accounts`.
 * `totalPowerM` is a manually-entered snapshot (most roster rows have no registered account
 * behind them, so there's no real squad data to sum) — EXCEPT for whichever row is the
 * current caller's own, where it's always overridden with a live sum of their own `squads`
 * (see `listPlayersWithPower` in routers/players.ts). Mirrors the original mock's `withSelfPower`.
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
 * The four tables below are CSV-imported snapshots (see CONTEXT.md "Импортируемые данные") —
 * no app CRUD yet, wholesale-replaced by an officer's import except weeklyRatingEntries,
 * which is append-only across weeks (see importCsv.ts for the per-resource replace/append split).
 */
export const elixirRaceEntries = sqliteTable('elixir_race_entries', {
  id: text('id').primaryKey(),
  nick: text('nick').notNull(),
  level: integer('level').notNull(),
  team: text('team').notNull().$type<ElixirTeam>(),
  participation: text('participation').notNull().$type<ElixirParticipation>(),
});

export const formationTiles = sqliteTable('formation_tiles', {
  id: text('id').primaryKey(),
  x: integer('x').notNull(),
  y: integer('y').notNull(),
  nick: text('nick').notNull(),
  power: integer('power'),
  role: text('role').notNull().$type<FormationRole>(),
});

export const ratingWeeks = sqliteTable('rating_weeks', {
  id: text('id').primaryKey(),
  label: text('label').notNull(),
  weekStart: text('week_start').notNull().unique(),
});

export const weeklyRatingEntries = sqliteTable('weekly_rating_entries', {
  id: text('id').primaryKey(),
  weekId: text('week_id').notNull().references(() => ratingWeeks.id, { onDelete: 'cascade' }),
  nick: text('nick').notNull(),
  points: integer('points').notNull(),
});

export const contributionEntries = sqliteTable('contribution_entries', {
  id: text('id').primaryKey(),
  nick: text('nick').notNull(),
  group: text('group').notNull().$type<PlayerGroup>(),
  points: integer('points').notNull(),
});

/**
 * Duel stats shown on the Profile page (`ProfileStats` minus `lastCoachmanDate`, which is
 * derived from `caravanRuns` instead — it's not an external metric, just a fact this DB
 * already tracks). Same CSV-imported-snapshot treatment as the four tables above; not
 * explicitly discussed with the user, inferred by analogy — flagged for them to confirm.
 */
export const playerStats = sqliteTable('player_stats', {
  id: text('id').primaryKey(),
  nick: text('nick').notNull(),
  avgDuelScore: integer('avg_duel_score').notNull(),
  avgDuelRank: integer('avg_duel_rank').notNull(),
  strongerThanPercent: integer('stronger_than_percent').notNull(),
  weeklyPowerChangePercent: real('weekly_power_change_percent').notNull(),
});

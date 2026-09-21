import { desc, inArray } from 'drizzle-orm';
import { db } from '../../db/client.js';
import { contributionEntries, players, powerSnapshotEntries, powerSnapshots } from '../../db/schema.js';
import { sumPowerByPlayer } from './players.js';

/**
 * Computed Profile-page metrics (see CONTEXT.md "Дуэльная статистика профиля", ADR 0004) —
 * replaces the old `player_stats` CSV snapshot. Every value is `null` when there isn't enough
 * data to compute it yet, so the UI can show "—" instead of a misleading 0.
 */

/** Share of alliance players (excluding self and 0-power players) whose live squad power is
 * lower than the caller's. `null` when there's nobody left to compare against. */
export async function strongerThanPercent(playerId: string): Promise<number | null> {
  const power = await sumPowerByPlayer();
  const selfPower = power.get(playerId) ?? 0;
  const roster = await db.select({ id: players.id }).from(players);
  const others = roster
    .filter((p) => p.id !== playerId)
    .map((p) => power.get(p.id) ?? 0)
    .filter((p) => p > 0);
  if (others.length === 0) return null;
  const weaker = others.filter((p) => p < selfPower).length;
  return Math.round((weaker / others.length) * 100);
}

/** Percent change in the caller's live squad power between the two most recent "срезы мощи".
 * `null` if fewer than two snapshots exist yet, the caller is missing from one, or the earlier
 * value is 0 (nothing to divide by). */
export async function weeklyPowerChangePercent(playerId: string): Promise<number | null> {
  const snapshots = await db.select().from(powerSnapshots).orderBy(desc(powerSnapshots.takenAt)).limit(2);
  if (snapshots.length < 2) return null;
  const [latest, previous] = snapshots;

  const entries = await db
    .select()
    .from(powerSnapshotEntries)
    .where(inArray(powerSnapshotEntries.snapshotId, [latest.id, previous.id]));
  const latestPower = entries.find((e) => e.snapshotId === latest.id && e.playerId === playerId)?.powerM;
  const previousPower = entries.find((e) => e.snapshotId === previous.id && e.playerId === playerId)?.powerM;
  if (latestPower === undefined || !previousPower) return null;

  return Math.round(((latestPower - previousPower) / previousPower) * 100);
}

/** Average weekly "Вклад" points, and average weekly rank among that week's scorers (both over
 * every week recorded since the redesign — see CONTEXT.md "Вклад"). Weeks with 0 points for
 * this player don't count as participation. `null` fields when there's no recorded week yet. */
export async function duelStats(nick: string): Promise<{ avgDuelScore: number | null; avgDuelRank: number | null }> {
  const rows = await db.select({ nick: contributionEntries.nick, weekStart: contributionEntries.weekStart, points: contributionEntries.points }).from(contributionEntries);

  const byWeek = new Map<string, typeof rows>();
  for (const row of rows) {
    if (!byWeek.has(row.weekStart)) byWeek.set(row.weekStart, []);
    byWeek.get(row.weekStart)!.push(row);
  }

  const scores: number[] = [];
  const ranks: number[] = [];
  for (const weekRows of byWeek.values()) {
    const mine = weekRows.find((r) => r.nick === nick);
    if (!mine || mine.points <= 0) continue;
    scores.push(mine.points);
    ranks.push(1 + weekRows.filter((r) => r.points > mine.points).length);
  }

  const avg = (values: number[]) => (values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : null);
  return { avgDuelScore: avg(scores), avgDuelRank: avg(ranks) };
}

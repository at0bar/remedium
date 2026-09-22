import { desc, eq, inArray } from 'drizzle-orm';
import { db } from '../../db/client.js';
import { contributionEntries, players } from '../../db/schema.js';
import { protectedProcedure, router } from '../trpc.js';

const WEEKS_SHOWN = 5;

async function latestWeeks(limit: number): Promise<string[]> {
  const rows = await db
    .selectDistinct({ weekStart: contributionEntries.weekStart })
    .from(contributionEntries)
    .orderBy(desc(contributionEntries.weekStart))
    .limit(limit);
  return rows.map((r) => r.weekStart);
}

export const contributionRouter = router({
  /** Latest week's "Вклад" only — see CONTEXT.md "Вклад". `group` is joined live from the
   * roster, not stored on the entry (see ADR 0003) — falls back to 'R1' for a nick with no
   * roster match, the same tolerance the rest of the nick-matched CSV imports already have. */
  list: protectedProcedure.query(async ({ ctx }) => {
    const [latestWeek] = await latestWeeks(1);
    if (!latestWeek) return [];

    const rows = await db.select().from(contributionEntries).where(eq(contributionEntries.weekStart, latestWeek));
    const rosterGroups = new Map((await db.select({ nick: players.nick, group: players.group }).from(players)).map((p) => [p.nick, p.group]));

    return rows.map((r) => ({
      nick: r.nick,
      points: r.points,
      group: rosterGroups.get(r.nick) ?? 'R1',
      isSelf: r.nick === ctx.user.nick || undefined,
    }));
  }),

  /** Last `WEEKS_SHOWN` weeks of "Вклад", pivoted nick × week — powers the "Рейтинг игроков"
   * tab. Replaces the old `weeklyRating.list` now that rating and contribution are one entity
   * (see ADR 0003); same response shape, so the frontend didn't need to change. */
  history: protectedProcedure.query(async ({ ctx }) => {
    const weeks = await latestWeeks(WEEKS_SHOWN);
    const rows = weeks.length ? await db.select().from(contributionEntries).where(inArray(contributionEntries.weekStart, weeks)) : [];

    const byNick = new Map<string, Map<string, number>>();
    for (const row of rows) {
      if (!byNick.has(row.nick)) byNick.set(row.nick, new Map());
      byNick.get(row.nick)!.set(row.weekStart, row.points);
    }

    const entries = [...byNick.entries()].map(([nick, points]) => ({
      nick,
      points: weeks.map((w) => points.get(w) ?? 0),
      isSelf: nick === ctx.user.nick || undefined,
    }));

    return { weeks, entries };
  }),
});

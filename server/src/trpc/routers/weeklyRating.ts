import { desc, inArray } from 'drizzle-orm';
import { db } from '../../db/client.js';
import { ratingWeeks, weeklyRatingEntries } from '../../db/schema.js';
import { protectedProcedure, router } from '../trpc.js';

const WEEKS_SHOWN = 5;

export const weeklyRatingRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const weeks = await db.select().from(ratingWeeks).orderBy(desc(ratingWeeks.weekStart)).limit(WEEKS_SHOWN);
    const weekIds = weeks.map((w) => w.id);
    const rows = weekIds.length ? await db.select().from(weeklyRatingEntries).where(inArray(weeklyRatingEntries.weekId, weekIds)) : [];

    const byNick = new Map<string, Map<string, number>>();
    for (const row of rows) {
      if (!byNick.has(row.nick)) byNick.set(row.nick, new Map());
      byNick.get(row.nick)!.set(row.weekId, row.points);
    }

    const entries = [...byNick.entries()].map(([nick, points]) => ({
      nick,
      points: weeks.map((w) => points.get(w.id) ?? 0),
      isSelf: nick === ctx.user.nick || undefined,
    }));

    return { weeks: weeks.map((w) => w.weekStart), entries };
  }),
});

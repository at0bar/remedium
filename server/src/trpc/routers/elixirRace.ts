import { db } from '../../db/client.js';
import { elixirRaceEntries } from '../../db/schema.js';
import { protectedProcedure, router } from '../trpc.js';

export const elixirRaceRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const rows = await db.select().from(elixirRaceEntries);
    return rows.map((r) => ({ ...r, isSelf: r.nick === ctx.user.nick || undefined }));
  }),
});

import { db } from '../../db/client.js';
import { contributionEntries } from '../../db/schema.js';
import { protectedProcedure, router } from '../trpc.js';

export const contributionRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const rows = await db.select().from(contributionEntries);
    return rows.map((r) => ({ ...r, isSelf: r.nick === ctx.user.nick || undefined }));
  }),
});

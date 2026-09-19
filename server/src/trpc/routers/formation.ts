import { db } from '../../db/client.js';
import { formationTiles } from '../../db/schema.js';
import { protectedProcedure, router } from '../trpc.js';

export const formationRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const rows = await db.select().from(formationTiles);
    return rows.map((r) => ({ ...r, isSelf: r.nick === ctx.user.nick || undefined }));
  }),
});

import { db } from '../../db/client.js';
import { formationTiles, players } from '../../db/schema.js';
import { protectedProcedure, router } from '../trpc.js';

export const formationRouter = router({
  /** `role` isn't stored — it's "Стиль игры" (see ADR 0005), joined live from `players.playstyle`
   * by nick, falling back to 'none' for a nick with no roster match. */
  list: protectedProcedure.query(async ({ ctx }) => {
    const rows = await db.select().from(formationTiles);
    const rosterPlaystyles = new Map((await db.select({ nick: players.nick, playstyle: players.playstyle }).from(players)).map((p) => [p.nick, p.playstyle]));

    return rows.map((r) => ({
      ...r,
      role: rosterPlaystyles.get(r.nick) ?? 'none',
      isSelf: r.nick === ctx.user.nick || undefined,
    }));
  }),
});

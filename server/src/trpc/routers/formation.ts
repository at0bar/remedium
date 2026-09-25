import { protectedProcedure, router } from '../trpc.js';
import { listPlayersWithPower } from './players.js';

export const formationRouter = router({
  /**
   * Reads live off the roster (see ADR 0007) — coordsX/coordsY, officer-edited from the
   * "Игроки" tab, instead of the old CSV-imported `formation_tiles` snapshot. Players with no
   * coords set yet are left off the map entirely rather than plotted at a fake origin.
   */
  list: protectedProcedure.query(async ({ ctx }) => {
    const roster = await listPlayersWithPower(ctx.user.playerId);
    return roster
      .filter((p): p is typeof p & { coordsX: number; coordsY: number } => p.coordsX !== null && p.coordsY !== null)
      .map((p) => ({
        x: p.coordsX,
        y: p.coordsY,
        nick: p.nick,
        power: p.totalPowerM,
        role: p.playstyle,
        isSelf: p.isSelf,
      }));
  }),
});

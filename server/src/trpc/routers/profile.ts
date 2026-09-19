import { TRPCError } from '@trpc/server';
import { desc, eq, sql } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../../db/client.js';
import { caravanRuns, playerStats, players, squads } from '../../db/schema.js';
import { protectedProcedure, router } from '../trpc.js';

export const profileRouter = router({
  get: protectedProcedure.query(async ({ ctx }) => {
    const [player] = await db.select().from(players).where(eq(players.id, ctx.user.playerId)).limit(1);
    if (!player) throw new TRPCError({ code: 'NOT_FOUND' });

    const mySquads = await db.select().from(squads).where(eq(squads.playerId, ctx.user.playerId));
    const [stats] = await db.select().from(playerStats).where(eq(playerStats.nick, player.nick)).limit(1);
    const [lastRun] = await db
      .select({ date: caravanRuns.lastAssignedDate })
      .from(caravanRuns)
      .where(eq(caravanRuns.coachmanPlayerId, ctx.user.playerId))
      .orderBy(desc(caravanRuns.lastAssignedDate))
      .limit(1);

    return {
      nick: player.nick,
      level: player.level,
      group: player.group,
      playstyle: player.playstyle,
      coords: { x: player.coordsX ?? 0, y: player.coordsY ?? 0 },
      squads: mySquads,
      stats: {
        avgDuelScore: stats?.avgDuelScore ?? 0,
        avgDuelRank: stats?.avgDuelRank ?? 0,
        strongerThanPercent: stats?.strongerThanPercent ?? 0,
        lastCoachmanDate: lastRun?.date ?? '',
        weeklyPowerChangePercent: stats?.weeklyPowerChangePercent ?? 0,
      },
    };
  }),

  updateNick: protectedProcedure.input(z.string().trim().min(1)).mutation(async ({ ctx, input }) => {
    const [clash] = await db
      .select()
      .from(players)
      .where(sql`lower(${players.nick}) = lower(${input}) and ${players.id} != ${ctx.user.playerId}`)
      .limit(1);
    if (clash) throw new TRPCError({ code: 'CONFLICT', message: 'Ник уже занят.' });

    await db.update(players).set({ nick: input }).where(eq(players.id, ctx.user.playerId));
    return input;
  }),
});

import { TRPCError } from '@trpc/server';
import { desc, eq, sql } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../../db/client.js';
import { caravanRuns, players, squads } from '../../db/schema.js';
import { protectedProcedure, router } from '../trpc.js';
import { duelStats, strongerThanPercent, weeklyPowerChangePercent } from './profileStats.js';

export const profileRouter = router({
  get: protectedProcedure.query(async ({ ctx }) => {
    const [player] = await db.select().from(players).where(eq(players.id, ctx.user.playerId)).limit(1);
    if (!player) throw new TRPCError({ code: 'NOT_FOUND' });

    const mySquads = await db.select().from(squads).where(eq(squads.playerId, ctx.user.playerId));
    const [lastRun] = await db
      .select({ date: caravanRuns.lastAssignedDate })
      .from(caravanRuns)
      .where(eq(caravanRuns.coachmanPlayerId, ctx.user.playerId))
      .orderBy(desc(caravanRuns.lastAssignedDate))
      .limit(1);

    const [stronger, weeklyChange, duel] = await Promise.all([
      strongerThanPercent(ctx.user.playerId),
      weeklyPowerChangePercent(ctx.user.playerId),
      duelStats(player.nick),
    ]);

    return {
      nick: player.nick,
      level: player.level,
      group: player.group,
      playstyle: player.playstyle,
      coords: { x: player.coordsX ?? 0, y: player.coordsY ?? 0 },
      squads: mySquads,
      stats: {
        avgDuelScore: duel.avgDuelScore,
        avgDuelRank: duel.avgDuelRank,
        strongerThanPercent: stronger,
        lastCoachmanDate: lastRun?.date ?? null,
        weeklyPowerChangePercent: weeklyChange,
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

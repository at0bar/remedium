import { TRPCError } from '@trpc/server';
import { alias } from 'drizzle-orm/sqlite-core';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { db } from '../../db/client.js';
import { caravanRuns, players, type PlayerGroup } from '../../db/schema.js';
import { editorProcedure, protectedProcedure, router } from '../trpc.js';

const ESCORT_ROLES = ['страж', 'vip'] as const;

const coachmen = alias(players, 'coachmen');
const escorts = alias(players, 'escorts');

function toMember(row: { id: string; nick: string; group: PlayerGroup; level: number }, selfPlayerId: string) {
  return { nick: row.nick, group: row.group, level: row.level, isSelf: row.id === selfPlayerId || undefined };
}

async function listRuns(selfPlayerId: string) {
  const rows = await db
    .select({
      id: caravanRuns.id,
      escortRole: caravanRuns.escortRole,
      lastAssignedDate: caravanRuns.lastAssignedDate,
      coachmanId: coachmen.id,
      coachmanNick: coachmen.nick,
      coachmanGroup: coachmen.group,
      coachmanLevel: coachmen.level,
      escortId: escorts.id,
      escortNick: escorts.nick,
      escortGroup: escorts.group,
      escortLevel: escorts.level,
    })
    .from(caravanRuns)
    .innerJoin(coachmen, eq(caravanRuns.coachmanPlayerId, coachmen.id))
    .innerJoin(escorts, eq(caravanRuns.escortPlayerId, escorts.id));

  return rows.map((r) => ({
    id: r.id,
    escortRole: r.escortRole,
    lastAssignedDate: r.lastAssignedDate,
    coachman: toMember({ id: r.coachmanId, nick: r.coachmanNick, group: r.coachmanGroup, level: r.coachmanLevel }, selfPlayerId),
    escort: toMember({ id: r.escortId, nick: r.escortNick, group: r.escortGroup, level: r.escortLevel }, selfPlayerId),
  }));
}

function pickRandom<T>(list: T[], count: number): T[] {
  const pool = [...list];
  const result: T[] = [];
  while (result.length < count && pool.length) {
    const idx = Math.floor(Math.random() * pool.length);
    result.push(pool.splice(idx, 1)[0]);
  }
  return result;
}

export const caravanRouter = router({
  list: protectedProcedure.query(({ ctx }) => listRuns(ctx.user.playerId)),

  /**
   * Pure draw, no persistence — the "roll" half of the two-step flow kept from the mock
   * (see CONTEXT.md "CaravanDraw / CaravanRun"). `confirm` below is the second step.
   */
  roll: editorProcedure.mutation(async () => {
    const allPlayers = await db.select().from(players);
    const usedIds = new Set(
      (await db.select({ c: caravanRuns.coachmanPlayerId, e: caravanRuns.escortPlayerId }).from(caravanRuns)).flatMap(
        (r) => [r.c, r.e],
      ),
    );
    let eligible = allPlayers.filter((p) => !usedIds.has(p.id));
    if (eligible.length < 2) eligible = allPlayers; // everyone's had a turn — restart the cycle
    if (eligible.length < 2) throw new TRPCError({ code: 'PRECONDITION_FAILED', message: 'Недостаточно игроков в ростере.' });

    const [coachman, escort] = pickRandom(eligible, 2);
    const escortRole = ESCORT_ROLES[Math.floor(Math.random() * ESCORT_ROLES.length)];
    return {
      coachman: { nick: coachman.nick, group: coachman.group, level: coachman.level },
      escort: { nick: escort.nick, group: escort.group, level: escort.level },
      escortRole,
      coachmanPlayerId: coachman.id,
      escortPlayerId: escort.id,
    };
  }),

  confirm: editorProcedure
    .input(
      z.object({
        coachmanPlayerId: z.string(),
        escortPlayerId: z.string(),
        escortRole: z.enum(ESCORT_ROLES),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await db.insert(caravanRuns).values({
        id: nanoid(),
        coachmanPlayerId: input.coachmanPlayerId,
        escortPlayerId: input.escortPlayerId,
        escortRole: input.escortRole,
        lastAssignedDate: new Date().toISOString().slice(0, 10),
      });
      return listRuns(ctx.user.playerId);
    }),

  update: editorProcedure
    .input(
      z.object({
        id: z.string(),
        coachmanPlayerId: z.string(),
        escortPlayerId: z.string(),
        escortRole: z.enum(ESCORT_ROLES),
        lastAssignedDate: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...fields } = input;
      await db.update(caravanRuns).set(fields).where(eq(caravanRuns.id, id));
      return listRuns(ctx.user.playerId);
    }),
});

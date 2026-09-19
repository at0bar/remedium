import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { db } from '../../db/client.js';
import { squads } from '../../db/schema.js';
import { protectedProcedure, router } from '../trpc.js';

const heroesInput = z.array(z.string()).length(5);

function nextSquadName(existing: { name: string }[]) {
  const usedNumbers = existing.map((s) => Number(s.name.match(/\d+/)?.[0] ?? 0));
  const next = usedNumbers.length ? Math.max(...usedNumbers) + 1 : 1;
  return `Отряд ${next}`;
}

async function listMine(playerId: string) {
  return db.select().from(squads).where(eq(squads.playerId, playerId));
}

async function requireOwnedOrEditable(squadId: string, ctx: { playerId: string; canEdit: boolean }) {
  const [squad] = await db.select().from(squads).where(eq(squads.id, squadId)).limit(1);
  if (!squad) throw new TRPCError({ code: 'NOT_FOUND' });
  if (squad.playerId !== ctx.playerId && !ctx.canEdit) throw new TRPCError({ code: 'FORBIDDEN' });
  return squad;
}

export const squadsRouter = router({
  listMine: protectedProcedure.query(({ ctx }) => listMine(ctx.user.playerId)),

  add: protectedProcedure
    .input(z.object({ powerM: z.number().nonnegative(), heroes: heroesInput }))
    .mutation(async ({ ctx, input }) => {
      const existing = await listMine(ctx.user.playerId);
      await db.insert(squads).values({
        id: nanoid(),
        playerId: ctx.user.playerId,
        name: nextSquadName(existing),
        powerM: input.powerM,
        heroes: input.heroes,
      });
      return listMine(ctx.user.playerId);
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string().min(1), powerM: z.number().nonnegative(), heroes: heroesInput }))
    .mutation(async ({ ctx, input }) => {
      const squad = await requireOwnedOrEditable(input.id, ctx.user);
      await db
        .update(squads)
        .set({ name: input.name, powerM: input.powerM, heroes: input.heroes })
        .where(eq(squads.id, input.id));
      return listMine(squad.playerId);
    }),

  delete: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const squad = await requireOwnedOrEditable(input, ctx.user);
    await db.delete(squads).where(eq(squads.id, input));
    return listMine(squad.playerId);
  }),
});

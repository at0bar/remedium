import { TRPCError } from '@trpc/server';
import { eq, sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { db } from '../../db/client.js';
import { players, squads } from '../../db/schema.js';
import { editorProcedure, protectedProcedure, router } from '../trpc.js';

const PLAYER_GROUPS = ['R1', 'R2', 'R3', 'R4', 'R5'] as const;
const PLAYSTYLES = ['Фарм', 'Оборона', 'Смешанный'] as const;

async function sumOwnSquads(playerId: string): Promise<number> {
  const [row] = await db
    .select({ total: sql<number>`coalesce(sum(${squads.powerM}), 0)` })
    .from(squads)
    .where(eq(squads.playerId, playerId));
  return row?.total ?? 0;
}

/** Every row keeps its manually-entered totalPowerM, except the caller's own — see schema.ts. */
async function listPlayersWithPower(selfPlayerId: string | undefined) {
  const rows = await db.select().from(players);
  const selfPower = selfPlayerId ? await sumOwnSquads(selfPlayerId) : 0;
  return rows.map((row) => ({
    id: row.id,
    nick: row.nick,
    level: row.level,
    group: row.group,
    playstyle: row.playstyle,
    totalPowerM: row.id === selfPlayerId ? selfPower : row.totalPowerM,
    isSelf: row.id === selfPlayerId || undefined,
  }));
}

export const playersRouter = router({
  list: protectedProcedure.query(({ ctx }) => listPlayersWithPower(ctx.user.playerId)),

  add: editorProcedure
    .input(
      z.object({
        nick: z.string().trim().min(1),
        level: z.number().int().positive(),
        group: z.enum(PLAYER_GROUPS),
        totalPowerM: z.number().nonnegative(),
        playstyle: z.enum(PLAYSTYLES),
      }),
    )
    .mutation(async ({ input }) => {
      await db.insert(players).values({ id: nanoid(), ...input });
      return listPlayersWithPower(undefined);
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        level: z.number().int().positive().optional(),
        group: z.enum(PLAYER_GROUPS).optional(),
        totalPowerM: z.number().nonnegative().optional(),
        playstyle: z.enum(PLAYSTYLES).optional(),
        coordsX: z.number().int().optional(),
        coordsY: z.number().int().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const isSelf = input.id === ctx.user.playerId;
      if (!isSelf && !ctx.user.canEdit) throw new TRPCError({ code: 'FORBIDDEN' });

      const [current] = await db.select().from(players).where(eq(players.id, input.id)).limit(1);
      if (!current) throw new TRPCError({ code: 'NOT_FOUND' });
      // Compared against the stored value, not just "was a group sent" — the client always
      // resends every field on save, so a same-value group must not require the edit flag.
      if (input.group !== undefined && input.group !== current.group && !ctx.user.canEdit) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Смену группы может подтвердить только редактор.' });
      }

      const { id, ...fields } = input;
      if (Object.keys(fields).length > 0) {
        await db.update(players).set(fields).where(eq(players.id, id));
      }
      return listPlayersWithPower(ctx.user.playerId);
    }),

  remove: editorProcedure.input(z.string()).mutation(async ({ input }) => {
    await db.delete(players).where(eq(players.id, input));
    return listPlayersWithPower(undefined);
  }),
});

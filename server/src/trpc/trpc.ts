import { initTRPC, TRPCError } from '@trpc/server';
import type { Context } from './context.js';

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

/** Requires a logged-in account. Use for anything gated behind "must be a real player", incl. editing your own data. */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
  return next({ ctx: { ...ctx, user: ctx.user } });
});

/**
 * Requires the account-wide `canEdit` flag (see CONTEXT.md "Право редактирования") — gates
 * edits to data that isn't the caller's own (other players' roster rows, caravan runs, etc).
 */
export const editorProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (!ctx.user.canEdit) throw new TRPCError({ code: 'FORBIDDEN', message: 'Требуется право редактирования.' });
  return next({ ctx });
});

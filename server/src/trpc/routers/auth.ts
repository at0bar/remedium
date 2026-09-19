import { TRPCError } from '@trpc/server';
import { eq, sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { hashPassword, verifyPassword } from '../../auth/password.js';
import { createSession, deleteSession, SESSION_COOKIE } from '../../auth/session.js';
import { db } from '../../db/client.js';
import { accounts, players } from '../../db/schema.js';
import { publicProcedure, protectedProcedure, router } from '../trpc.js';

const BOOTSTRAP_ADMIN_NICK = process.env.BOOTSTRAP_ADMIN_NICK?.toLowerCase();
const GENERIC_LOGIN_ERROR = 'Неверный ник или пароль.';

const credentialsInput = z.object({ nick: z.string().trim().min(1), password: z.string().min(6) });

function setSessionCookie(res: import('fastify').FastifyReply, sessionId: string, expiresAt: Date) {
  res.setCookie(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    sameSite: 'lax',
    // NOT tied to NODE_ENV=production — that says nothing about whether TLS is actually in
    // front of this deploy. A browser silently refuses to send a Secure cookie over plain
    // HTTP (bare-IP deploys with no domain yet have no TLS), so this must be opt-in via env.
    secure: process.env.COOKIE_SECURE === 'true',
    path: '/',
    expires: expiresAt,
  });
}

async function findPlayerByNick(nick: string) {
  const rows = await db
    .select()
    .from(players)
    .where(sql`lower(${players.nick}) = lower(${nick})`)
    .limit(1);
  return rows[0];
}

export const authRouter = router({
  me: publicProcedure.query(({ ctx }) => ctx.user),

  register: publicProcedure.input(credentialsInput).mutation(async ({ ctx, input }) => {
    const player = await findPlayerByNick(input.nick);
    if (!player) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Такого игрока нет в ростере альянса — обратитесь к редактору.' });
    }

    const existing = await db.select().from(accounts).where(eq(accounts.playerId, player.id)).limit(1);
    if (existing[0]) {
      throw new TRPCError({ code: 'CONFLICT', message: 'Для этого игрока уже есть аккаунт.' });
    }

    const passwordHash = await hashPassword(input.password);
    const canEdit = !!BOOTSTRAP_ADMIN_NICK && player.nick.toLowerCase() === BOOTSTRAP_ADMIN_NICK;
    const accountId = nanoid();
    await db.insert(accounts).values({ id: accountId, playerId: player.id, passwordHash, canEdit });

    const session = await createSession(accountId);
    setSessionCookie(ctx.res, session.id, session.expiresAt);
    return { accountId, playerId: player.id, nick: player.nick, canEdit };
  }),

  login: publicProcedure.input(credentialsInput).mutation(async ({ ctx, input }) => {
    const player = await findPlayerByNick(input.nick);
    const account = player ? (await db.select().from(accounts).where(eq(accounts.playerId, player.id)).limit(1))[0] : undefined;
    const ok = account ? await verifyPassword(input.password, account.passwordHash) : false;
    if (!player || !account || !ok) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: GENERIC_LOGIN_ERROR });
    }

    const session = await createSession(account.id);
    setSessionCookie(ctx.res, session.id, session.expiresAt);
    return { accountId: account.id, playerId: player.id, nick: player.nick, canEdit: account.canEdit };
  }),

  logout: protectedProcedure.mutation(async ({ ctx }) => {
    const sessionId = ctx.req.cookies[SESSION_COOKIE];
    if (sessionId) await deleteSession(sessionId);
    ctx.res.clearCookie(SESSION_COOKIE, { path: '/' });
    return { ok: true };
  }),

  changePassword: protectedProcedure
    .input(z.object({ currentPassword: z.string().min(1), newPassword: z.string().min(6) }))
    .mutation(async ({ ctx, input }) => {
      const [account] = await db.select().from(accounts).where(eq(accounts.id, ctx.user.accountId)).limit(1);
      if (!account || !(await verifyPassword(input.currentPassword, account.passwordHash))) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Текущий пароль неверен.' });
      }
      const passwordHash = await hashPassword(input.newPassword);
      await db.update(accounts).set({ passwordHash }).where(eq(accounts.id, ctx.user.accountId));
      return { ok: true };
    }),

  /** Grants/revokes the account-wide edit flag — requires the caller to already hold it. */
  setEditPermission: protectedProcedure
    .input(z.object({ playerId: z.string(), canEdit: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user.canEdit) throw new TRPCError({ code: 'FORBIDDEN' });
      await db.update(accounts).set({ canEdit: input.canEdit }).where(eq(accounts.playerId, input.playerId));
      return { ok: true };
    }),
});

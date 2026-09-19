import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { db } from '../db/client.js';
import { accounts, players, sessions } from '../db/schema.js';

export const SESSION_COOKIE = 'remedium_session';
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days, fixed (not sliding) — fine at this scale

export async function createSession(accountId: string): Promise<{ id: string; expiresAt: Date }> {
  const id = nanoid(48);
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await db.insert(sessions).values({ id, accountId, expiresAt: expiresAt.toISOString() });
  return { id, expiresAt };
}

export async function deleteSession(sessionId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}

export interface CurrentUser {
  accountId: string;
  playerId: string;
  nick: string;
  canEdit: boolean;
}

export async function resolveSession(sessionId: string | undefined): Promise<CurrentUser | null> {
  if (!sessionId) return null;
  const rows = await db
    .select({
      accountId: accounts.id,
      playerId: players.id,
      nick: players.nick,
      canEdit: accounts.canEdit,
      expiresAt: sessions.expiresAt,
    })
    .from(sessions)
    .innerJoin(accounts, eq(sessions.accountId, accounts.id))
    .innerJoin(players, eq(accounts.playerId, players.id))
    .where(eq(sessions.id, sessionId))
    .limit(1);

  const row = rows[0];
  if (!row) return null;
  if (new Date(row.expiresAt).getTime() < Date.now()) {
    await deleteSession(sessionId);
    return null;
  }
  return { accountId: row.accountId, playerId: row.playerId, nick: row.nick, canEdit: row.canEdit };
}

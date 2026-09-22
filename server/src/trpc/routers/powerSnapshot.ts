import { nanoid } from 'nanoid';
import { db } from '../../db/client.js';
import { players, powerSnapshotEntries, powerSnapshots } from '../../db/schema.js';
import { editorProcedure, router } from '../trpc.js';
import { sumPowerByPlayer } from './players.js';

/**
 * "Срез мощи" (see CONTEXT.md, ADR 0004) — an officer-triggered snapshot of every player's
 * live squad power, taken whenever, independent of "Вклад"'s weekly cadence. The most recent
 * two snapshots are what `weeklyPowerChangePercent` on the Profile page compares.
 */
export const powerSnapshotRouter = router({
  create: editorProcedure.mutation(async () => {
    const power = await sumPowerByPlayer();
    const roster = await db.select({ id: players.id }).from(players);

    const snapshotId = nanoid();
    await db.insert(powerSnapshots).values({ id: snapshotId });
    if (roster.length) {
      await db
        .insert(powerSnapshotEntries)
        .values(roster.map((p) => ({ id: nanoid(), snapshotId, playerId: p.id, powerM: power.get(p.id) ?? 0 })));
    }
    return { id: snapshotId };
  }),
});

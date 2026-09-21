import { z } from 'zod';
import { db } from '../../db/client.js';
import { settings } from '../../db/schema.js';
import { editorProcedure, protectedProcedure, router } from '../trpc.js';

async function allSettings(): Promise<Record<string, string>> {
  const rows = await db.select().from(settings);
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

/**
 * Generic alliance-wide settings (see CONTEXT.md "Порог группы", ADR 0006) — starts out with
 * just the two group-threshold values, edited from the "Настройки" tab (canEdit-only).
 */
export const settingsRouter = router({
  get: protectedProcedure.query(() => allSettings()),

  update: editorProcedure
    .input(z.object({ key: z.string().min(1), value: z.string().min(1) }))
    .mutation(async ({ input }) => {
      await db
        .insert(settings)
        .values(input)
        .onConflictDoUpdate({ target: settings.key, set: { value: input.value } });
      return allSettings();
    }),
});

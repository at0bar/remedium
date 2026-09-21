import { parse } from 'csv-parse/sync';
import { eq } from 'drizzle-orm';
import type { FastifyInstance } from 'fastify';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { db } from '../db/client.js';
import { contributionEntries, elixirRaceEntries, formationTiles } from '../db/schema.js';

const numeric = z.coerce.number();
const nullableNumeric = z.preprocess((v) => (v === '' || v === undefined ? null : v), z.coerce.number().nullable());

const ROW_SCHEMAS = {
  'elixir-race': z.object({
    nick: z.string().min(1),
    level: numeric,
    team: z.enum(['Основа А', 'Основа Б', 'Резерв А', 'Резерв Б', 'Не зарегистрирован']),
    participation: z.enum(['Да', 'Нет', 'Не знает']),
  }),
  formation: z.object({
    x: numeric,
    y: numeric,
    nick: z.string().min(1),
    power: nullableNumeric,
  }),
  contribution: z.object({ nick: z.string().min(1), points: numeric }),
} as const;

/**
 * CSV bulk-import for the read-only snapshot resources — see CONTEXT.md "Импортируемые
 * данные". `elixir-race` and `formation` wholesale-replace their table on each import;
 * `contribution` ("Вклад", see CONTEXT.md / ADR 0003) instead replaces only the rows for the
 * one week being imported, since it's a trailing-weeks history. Every row is validated against
 * ROW_SCHEMAS before anything is written — a malformed CSV fails the whole import, not just a
 * few rows.
 */
const REPLACE_ALL_IMPORTERS: Record<string, (rows: Record<string, unknown>[]) => Promise<void>> = {
  'elixir-race': async (rows) => {
    const parsed = rows as z.infer<(typeof ROW_SCHEMAS)['elixir-race']>[];
    await db.delete(elixirRaceEntries);
    if (parsed.length) await db.insert(elixirRaceEntries).values(parsed.map((r) => ({ id: nanoid(), ...r })));
  },
  formation: async (rows) => {
    const parsed = rows as z.infer<(typeof ROW_SCHEMAS)['formation']>[];
    await db.delete(formationTiles);
    if (parsed.length) await db.insert(formationTiles).values(parsed.map((r) => ({ id: nanoid(), ...r })));
  },
};

async function importContribution(rows: z.infer<(typeof ROW_SCHEMAS)['contribution']>[], weekStart: string) {
  await db.delete(contributionEntries).where(eq(contributionEntries.weekStart, weekStart));
  if (rows.length) {
    await db.insert(contributionEntries).values(rows.map((r) => ({ id: nanoid(), weekStart, ...r })));
  }
}

export async function registerImportRoute(app: FastifyInstance) {
  app.post('/api/import/:resource', async (req, reply) => {
    const user = req.currentUser;
    if (!user) return reply.code(401).send({ error: 'Не авторизован.' });
    if (!user.canEdit) return reply.code(403).send({ error: 'Требуется право редактирования.' });

    const resource = (req.params as { resource: string }).resource;
    const rowSchema = (ROW_SCHEMAS as Record<string, z.ZodTypeAny>)[resource];
    if (!rowSchema) return reply.code(404).send({ error: `Неизвестный ресурс импорта: ${resource}` });

    const data = await req.file();
    if (!data) return reply.code(400).send({ error: 'Файл не передан.' });

    const csvText = (await data.toBuffer()).toString('utf-8');
    const rawRecords = parse(csvText, { columns: true, skip_empty_lines: true, trim: true }) as Record<string, unknown>[];

    const result = z.array(rowSchema).safeParse(rawRecords);
    if (!result.success) {
      return reply.code(400).send({ error: 'Файл не прошёл проверку.', issues: result.error.issues });
    }

    if (resource === 'contribution') {
      const weekStart = (data.fields.weekStart as { value: string } | undefined)?.value;
      if (!weekStart) return reply.code(400).send({ error: 'Не передана дата недели (weekStart).' });
      await importContribution(result.data, weekStart);
      return reply.send({ ok: true, imported: result.data.length });
    }

    await REPLACE_ALL_IMPORTERS[resource](result.data);
    return reply.send({ ok: true, imported: result.data.length });
  });
}

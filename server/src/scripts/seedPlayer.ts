import { nanoid } from 'nanoid';
import { z } from 'zod';
import { db } from '../db/client.js';
import { players } from '../db/schema.js';

/**
 * Breaks the bootstrap deadlock: `players.add` is editor-only, but a fresh DB has zero
 * accounts and zero editors, so nobody could ever add the first roster row through the app.
 * Run this once against a fresh deployment (e.g. `docker exec <container> node dist/scripts/seedPlayer.js ...`)
 * to create the roster row for whoever BOOTSTRAP_ADMIN_NICK points at, then register normally.
 *
 * Usage: node dist/scripts/seedPlayer.js --nick Atobar --level 25 --group R3 --playstyle Фарм --power 0
 */
function readArg(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag);
  return idx === -1 ? undefined : process.argv[idx + 1];
}

const input = z
  .object({
    nick: z.string().trim().min(1),
    level: z.coerce.number().int().positive(),
    group: z.enum(['R1', 'R2', 'R3', 'R4', 'R5']),
    playstyle: z.enum(['Фарм', 'Оборона', 'Смешанный']),
    totalPowerM: z.coerce.number().nonnegative(),
  })
  .safeParse({
    nick: readArg('--nick'),
    level: readArg('--level') ?? '1',
    group: readArg('--group') ?? 'R1',
    playstyle: readArg('--playstyle') ?? 'Фарм',
    totalPowerM: readArg('--power') ?? '0',
  });

if (!input.success) {
  console.error('Usage: seedPlayer --nick <nick> [--level N] [--group R1..R5] [--playstyle Фарм|Оборона|Смешанный] [--power N]');
  console.error(input.error.issues);
  process.exit(1);
}

await db.insert(players).values({ id: nanoid(), ...input.data });
console.log(`Добавлен игрок в ростер: ${input.data.nick}`);
process.exit(0);

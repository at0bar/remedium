import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fastifyCookie from '@fastify/cookie';
import fastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import Fastify from 'fastify';
import { resolveSession, SESSION_COOKIE } from './auth/session.js';
import { registerImportRoute } from './routes/importCsv.js';
import { createContext } from './trpc/context.js';
import { appRouter } from './trpc/appRouter.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT ?? 3000);
// Built by `vite build` in app/ — see docs/adr/0002 for the single-process/single-origin deploy shape.
const STATIC_DIR = process.env.STATIC_DIR ?? path.join(__dirname, '../../app/dist');

const app = Fastify({ logger: true });

await app.register(fastifyCookie);
await app.register(fastifyMultipart);

app.addHook('onRequest', async (req) => {
  req.currentUser = await resolveSession(req.cookies[SESSION_COOKIE]);
});

await app.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: appRouter, createContext },
});

await registerImportRoute(app);

await app.register(fastifyStatic, { root: STATIC_DIR });
app.setNotFoundHandler((req, reply) => {
  if (req.raw.url?.startsWith('/trpc') || req.raw.url?.startsWith('/api')) {
    reply.code(404).send({ error: 'Not found' });
    return;
  }
  reply.sendFile('index.html'); // SPA fallback for client-side routes
});

app.listen({ port: PORT, host: '0.0.0.0' }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});

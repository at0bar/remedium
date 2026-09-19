/// <reference path="../types/fastify.d.ts" />
// Force @fastify/cookie's own request/reply type augmentation (req.cookies, res.setCookie, ...)
// into any program that reaches this file — needed when app/ type-checks across the package
// boundary via the tRPC AppRouter type-only import, since nothing there imports the plugin itself.
import type {} from '@fastify/cookie';
import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  return { req, res, user: req.currentUser };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

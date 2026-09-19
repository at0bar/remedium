import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
// Type-only import across the sibling `server/` package — no runtime dependency, no monorepo
// tooling needed, just the standard non-monorepo tRPC pattern (see docs/adr/0001).
import type { AppRouter } from '../../../../server/src/trpc/appRouter';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: '/trpc',
      fetch(url, options) {
        return fetch(url, { ...options, credentials: 'include' });
      },
    }),
  ],
});

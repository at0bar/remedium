import type { CurrentUser } from '../auth/session.js';

declare module 'fastify' {
  interface FastifyRequest {
    currentUser: CurrentUser | null;
  }
}

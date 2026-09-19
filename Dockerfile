# Single-process/single-origin deploy (see docs/adr/0002): one image builds both app/ and
# server/, the runtime container serves the built SPA and the tRPC API from one Node process.
# node:*-slim (Debian/glibc), not *-alpine (musl) — better-sqlite3's prebuilt binary needs glibc,
# alpine would force a from-source compile that needs a toolchain we'd rather not carry.
#
# Both packages are built in ONE stage (not one-per-package) because app/'s build type-checks
# across a relative type-only import into server/src (see app/src/lib/api/trpcClient.ts) — an
# isolated app-only build context can't resolve that import.

FROM node:22-slim AS build
WORKDIR /repo
COPY app/package.json app/package-lock.json app/.npmrc ./app/
COPY server/package.json server/package-lock.json server/.npmrc ./server/
RUN cd app && npm ci
RUN cd server && npm ci
COPY app ./app
COPY server ./server
RUN cd server && npm run build
RUN cd app && npm run build

FROM node:22-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY server/package.json server/package-lock.json server/.npmrc ./
RUN npm ci --omit=dev
COPY --from=build /repo/server/dist ./dist
COPY --from=build /repo/server/drizzle ./drizzle
COPY --from=build /repo/app/dist ./app-dist

ENV STATIC_DIR=/app/app-dist
ENV DB_PATH=/app/data/remedium.db
VOLUME ["/app/data"]
EXPOSE 3000

CMD ["sh", "-c", "node dist/db/migrate.js && node dist/index.js"]

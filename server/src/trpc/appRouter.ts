import { authRouter } from './routers/auth.js';
import { caravanRouter } from './routers/caravan.js';
import { contributionRouter } from './routers/contribution.js';
import { elixirRaceRouter } from './routers/elixirRace.js';
import { formationRouter } from './routers/formation.js';
import { playersRouter } from './routers/players.js';
import { profileRouter } from './routers/profile.js';
import { squadsRouter } from './routers/squads.js';
import { weeklyRatingRouter } from './routers/weeklyRating.js';
import { router } from './trpc.js';

export const appRouter = router({
  auth: authRouter,
  profile: profileRouter,
  players: playersRouter,
  squads: squadsRouter,
  caravan: caravanRouter,
  elixirRace: elixirRaceRouter,
  formation: formationRouter,
  weeklyRating: weeklyRatingRouter,
  contribution: contributionRouter,
});

export type AppRouter = typeof appRouter;

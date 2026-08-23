import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { readLocalStore, writeLocalStore } from './localStore';
import {
  mockAlliancePlayers,
  mockCaravan,
  mockContribution,
  mockElixirRace,
  mockFormationTiles,
  mockProfile,
  mockWeeklyRating,
  ratingWeeks,
} from './mockData';
import { mockFetch } from './mockFetch';
import type { AlliancePlayer, ProfileData, Squad } from './types';
import { sumPowerM } from '../format';

/**
 * Every read hook below wraps a static mock today. When the backend exists, swap
 * the queryFn for a real request — call sites elsewhere in the app don't change.
 * Mutation hooks (useAddSquad etc.) go through `localStore` as a stand-in
 * database; swapping in a real API later means changing their mutationFn only.
 */

const SQUADS_KEY = 'profile:squads';
const NICK_KEY = 'profile:nick';
const PLAYERS_KEY = 'alliance:players';
const PLAYERS_QUERY_KEY = ['alliance', 'players'] as const;

function loadSquads(): Squad[] {
  return readLocalStore(SQUADS_KEY, mockProfile.squads);
}
function saveSquads(squads: Squad[]) {
  writeLocalStore(SQUADS_KEY, squads);
  return squads;
}
function nextSquadName(squads: Squad[]) {
  const usedNumbers = squads.map((s) => Number(s.name.match(/\d+/)?.[0] ?? 0));
  const next = usedNumbers.length ? Math.max(...usedNumbers) + 1 : 1;
  return `Отряд ${next}`;
}

function currentNick(): string {
  return readLocalStore(NICK_KEY, mockProfile.nick);
}

/** Substitutes the live nick into whichever row is flagged `isSelf` — the one place every roster/leaderboard mock agrees on "who you are". */
function withCurrentNick<T extends { nick: string; isSelf?: boolean }>(rows: T[]): T[] {
  const nick = currentNick();
  return rows.map((row) => (row.isSelf ? { ...row, nick } : row));
}

/** The alliance roster (Players tab) is the only place level/group get edited — the Profile page just mirrors its `isSelf` row. */
function selfPlayer(): AlliancePlayer | undefined {
  return loadPlayers().find((p) => p.isSelf);
}

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => {
      const self = selfPlayer();
      return mockFetch({
        ...mockProfile,
        nick: currentNick(),
        level: self?.level ?? mockProfile.level,
        group: self?.group ?? mockProfile.group,
        squads: loadSquads(),
      });
    },
  });
}

export function useUpdateNick() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (nick: string) => {
      writeLocalStore(NICK_KEY, nick);
      return mockFetch(nick);
    },
    onSuccess: () => {
      // The nick can appear as an `isSelf` row in any roster/leaderboard query — refresh them all.
      queryClient.invalidateQueries();
    },
  });
}

function useSquadsMutation<TVariables>(mutate: (squads: Squad[], variables: TVariables) => Squad[]) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: TVariables) => mockFetch(saveSquads(mutate(loadSquads(), variables))),
    onSuccess: (squads) => {
      queryClient.setQueryData<ProfileData>(['profile'], (old) => old && { ...old, squads });
    },
  });
}

export function useAddSquad() {
  return useSquadsMutation<{ powerM: number; heroes: string[] }>((squads, { powerM, heroes }) => [
    ...squads,
    { id: crypto.randomUUID(), name: nextSquadName(squads), powerM, heroes },
  ]);
}

export function useUpdateSquad() {
  return useSquadsMutation<Squad>((squads, updated) => squads.map((s) => (s.id === updated.id ? updated : s)));
}

export function useDeleteSquad() {
  return useSquadsMutation<string>((squads, id) => squads.filter((s) => s.id !== id));
}

/**
 * Generic add/update/delete for a flat mock list that's also the whole query's data
 * (unlike squads, which are a field nested inside the profile query). Reused across
 * players, caravan, etc. — pass a fresh `[]`-returning `mutate` and this is the only
 * plumbing a new CRUD resource needs.
 */
function useLocalListMutation<T, TVariables>(
  queryKey: readonly unknown[],
  storageKey: string,
  defaultList: T[],
  mutate: (list: T[], variables: TVariables) => T[],
  transform: (list: T[]) => T[] = (list) => list,
  invalidate: readonly (readonly unknown[])[] = [],
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: TVariables) => {
      const next = mutate(readLocalStore(storageKey, defaultList), variables);
      writeLocalStore(storageKey, next);
      return mockFetch(transform(next));
    },
    onSuccess: (next) => {
      queryClient.setQueryData(queryKey, next);
      invalidate.forEach((key) => queryClient.invalidateQueries({ queryKey: key }));
    },
  });
}

function loadPlayers(): AlliancePlayer[] {
  return readLocalStore(PLAYERS_KEY, mockAlliancePlayers);
}

/** The self row's total power is never a typed-in number — it's the sum of your own squads, same as the Profile page. */
function withSelfPower(players: AlliancePlayer[]): AlliancePlayer[] {
  const totalPowerM = sumPowerM(loadSquads().map((s) => s.powerM));
  return players.map((p) => (p.isSelf ? { ...p, totalPowerM } : p));
}

function playersTransform(players: AlliancePlayer[]): AlliancePlayer[] {
  return withSelfPower(withCurrentNick(players));
}

export function useAlliancePlayers() {
  return useQuery({ queryKey: PLAYERS_QUERY_KEY, queryFn: () => mockFetch(playersTransform(loadPlayers())) });
}

export function useAddPlayer() {
  return useLocalListMutation<AlliancePlayer, Omit<AlliancePlayer, 'id' | 'isSelf'>>(
    PLAYERS_QUERY_KEY,
    PLAYERS_KEY,
    mockAlliancePlayers,
    (players, data) => [...players, { ...data, id: crypto.randomUUID() }],
    playersTransform,
  );
}

export function useUpdatePlayer() {
  return useLocalListMutation<AlliancePlayer, AlliancePlayer>(
    PLAYERS_QUERY_KEY,
    PLAYERS_KEY,
    mockAlliancePlayers,
    (players, updated) => players.map((p) => (p.id === updated.id ? updated : p)),
    playersTransform,
    // Editing the self row's level/group must show up on the Profile page too.
    [['profile']],
  );
}

export function useDeletePlayer() {
  return useLocalListMutation<AlliancePlayer, string>(
    PLAYERS_QUERY_KEY,
    PLAYERS_KEY,
    mockAlliancePlayers,
    (players, id) => players.filter((p) => p.id !== id),
    playersTransform,
    [['profile']],
  );
}

export function useCaravan() {
  return useQuery({ queryKey: ['alliance', 'caravan'], queryFn: () => mockFetch(withCurrentNick(mockCaravan)) });
}

export function useElixirRace() {
  return useQuery({ queryKey: ['alliance', 'elixir-race'], queryFn: () => mockFetch(withCurrentNick(mockElixirRace)) });
}

export function useFormation() {
  return useQuery({ queryKey: ['alliance', 'formation'], queryFn: () => mockFetch(withCurrentNick(mockFormationTiles)) });
}

export function useContribution() {
  return useQuery({ queryKey: ['stats', 'contribution'], queryFn: () => mockFetch(withCurrentNick(mockContribution)) });
}

export function useWeeklyRating() {
  return useQuery({
    queryKey: ['stats', 'weekly-rating'],
    queryFn: () => mockFetch({ weeks: ratingWeeks, entries: withCurrentNick(mockWeeklyRating) }),
  });
}

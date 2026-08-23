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
import type { ProfileData, Squad } from './types';

/**
 * Every read hook below wraps a static mock today. When the backend exists, swap
 * the queryFn for a real request — call sites elsewhere in the app don't change.
 * Mutation hooks (useAddSquad etc.) go through `localStore` as a stand-in
 * database; swapping in a real API later means changing their mutationFn only.
 */

const SQUADS_KEY = 'profile:squads';
const NICK_KEY = 'profile:nick';

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

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => mockFetch({ ...mockProfile, nick: currentNick(), squads: loadSquads() }),
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

export function useAlliancePlayers() {
  return useQuery({ queryKey: ['alliance', 'players'], queryFn: () => mockFetch(withCurrentNick(mockAlliancePlayers)) });
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

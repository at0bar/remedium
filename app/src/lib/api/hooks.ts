import { useQuery } from '@tanstack/react-query';
import {
  mockAlliancePlayers,
  mockCaravan,
  mockElixirRace,
  mockFormationTiles,
  mockProfile,
  mockWeeklyRating,
  ratingWeeks,
} from './mockData';
import { mockFetch } from './mockFetch';

/**
 * Every hook below wraps a static mock today. When the backend exists, swap the
 * queryFn for a real request — call sites elsewhere in the app don't change.
 */

export function useProfile() {
  return useQuery({ queryKey: ['profile'], queryFn: () => mockFetch(mockProfile) });
}

export function useAlliancePlayers() {
  return useQuery({ queryKey: ['alliance', 'players'], queryFn: () => mockFetch(mockAlliancePlayers) });
}

export function useCaravan() {
  return useQuery({ queryKey: ['alliance', 'caravan'], queryFn: () => mockFetch(mockCaravan) });
}

export function useElixirRace() {
  return useQuery({ queryKey: ['alliance', 'elixir-race'], queryFn: () => mockFetch(mockElixirRace) });
}

export function useFormation() {
  return useQuery({ queryKey: ['alliance', 'formation'], queryFn: () => mockFetch(mockFormationTiles) });
}

export function useWeeklyRating() {
  return useQuery({
    queryKey: ['stats', 'weekly-rating'],
    queryFn: () => mockFetch({ weeks: ratingWeeks, entries: mockWeeklyRating }),
  });
}

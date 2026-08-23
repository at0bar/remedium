/**
 * Namespaced localStorage JSON helpers — the mutation layer's "database" until a
 * real backend exists. Mutation hooks read/write through here instead of talking
 * to localStorage directly, so this file is the one place that changes when a
 * real API replaces it.
 */
const PREFIX = 'remedium:';

export function readLocalStore<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw !== null ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeLocalStore<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // storage unavailable (private mode, quota) — edits just won't survive a reload
  }
}

/** Simulates a network round-trip so query hooks behave like real API calls until a backend exists. */
export function mockFetch<T>(data: T, delayMs = 150): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delayMs));
}

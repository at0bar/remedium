export function formatPowerM(powerM: number): string {
  return `${powerM.toFixed(2)}М`;
}

export function sumPowerM(values: number[]): number {
  return Math.round(values.reduce((sum, v) => sum + v, 0) * 100) / 100;
}

export function formatPercentChange(percent: number | null): string {
  if (percent === null) return '—';
  const sign = percent > 0 ? '+' : '';
  return `${sign}${percent}%`;
}

export function formatDate(iso: string | null): string {
  if (!iso) return '—';
  const [year, month, day] = iso.split('-');
  return `${day}.${month}.${year}`;
}

export function pluralizeRu(count: number, one: string, few: string, many: string): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

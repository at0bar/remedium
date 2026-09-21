export function StatTile({
  value,
  label,
  sub,
  subTone = 'muted',
}: {
  value: string;
  label: string;
  sub?: string;
  subTone?: 'muted' | 'positive' | 'negative';
}) {
  return (
    <div className="stat-tile">
      <div className="stat-l">{label}</div>
      <div className="stat-n">{value}</div>
      {sub && <div className={`stat-sub${subTone !== 'muted' ? ` ${subTone}` : ''}`}>{sub}</div>}
    </div>
  );
}

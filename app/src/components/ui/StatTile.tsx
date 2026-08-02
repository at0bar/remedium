export function StatTile({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="stat-tile">
      <div className="stat-l">{label}</div>
      <div className="stat-n">{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}

import type { ReactNode } from 'react';

export interface MinisterBuff {
  label: string;
  value: string;
}

export function MinisterCard({
  title,
  buffs,
  tip,
}: {
  title: string;
  buffs: MinisterBuff[];
  tip?: ReactNode;
}) {
  return (
    <div className="mcard">
      <div className="mtitle">{title}</div>
      {buffs.map((buff) => (
        <div className="mbuff" key={buff.label}>
          {buff.label}: <span>{buff.value}</span>
        </div>
      ))}
      {tip && <div className="mtip">{tip}</div>}
    </div>
  );
}

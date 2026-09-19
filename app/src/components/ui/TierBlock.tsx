import type { ReactNode } from 'react';

export function TierBlock({
  tier,
  label,
  name,
  priority,
  twoCol,
  children,
}: {
  tier: 1 | 2 | 3 | 4 | 5;
  label?: string;
  name: string;
  priority?: string;
  twoCol?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="tblock">
      <div className={`thdr t${tier}`}>
        <span className="tlbl">{label ?? `Tier ${tier}`}</span>
        <span className="tname">{name}</span>
        {priority && <span className="tpri">{priority}</span>}
      </div>
      <div className={twoCol ? 'tbody2' : 'tbody1'}>{children}</div>
    </div>
  );
}

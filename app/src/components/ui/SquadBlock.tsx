import type { ReactNode } from 'react';

export interface HeroSlot {
  role: string;
  name: string;
  type?: string;
}

export function SquadBlock({
  title,
  headerBadge,
  headerBackground,
  slots,
}: {
  title: string;
  headerBadge?: ReactNode;
  headerBackground?: string;
  slots: HeroSlot[];
}) {
  return (
    <div className="squad">
      <div className="squad-hdr" style={headerBackground ? { background: headerBackground } : undefined}>
        <div className="squad-title">{title}</div>
        {headerBadge}
      </div>
      <div className="squad-body">
        {slots.map((slot, i) => (
          <div className="hslot" key={i}>
            <div className="hslot-r">{slot.role}</div>
            <div className="hslot-n">{slot.name}</div>
            {slot.type && <div className="hslot-t">{slot.type}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

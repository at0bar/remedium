import type { ReactNode } from 'react';

export function RegionMap({ children }: { children: ReactNode }) {
  return (
    <div className="region-map">
      <span className="region-label" style={{ top: 3, left: 26, color: 'var(--map-neighbor)' }}>
        Храм войны
      </span>
      <div className="region-line h region-neighbor" style={{ top: 18, left: 16, width: 170 }} />
      <div className="region-line v region-neighbor" style={{ top: 18, left: 16, height: 90 }} />

      <div className="region-line h region-us" style={{ top: 25, left: 23, width: 148 }} />
      <div className="region-line v region-us" style={{ top: 25, left: 23, height: 74 }} />
      <span className="region-label" style={{ top: 31, left: 33, color: 'var(--gold-lt)' }}>
        Мифриловый зал
      </span>

      <div className="region-map-content">{children}</div>
    </div>
  );
}

import type { ReactNode } from 'react';

export function RegionMap({ children }: { children: ReactNode }) {
  return (
    <div className="region-map">
      <div className="region-map-content">{children}</div>
    </div>
  );
}

import type { ReactNode } from 'react';

/** Bordered/radius'd table container per DESIGN.md §5 Tables. Wrap a <table> element with it. */
export function TableWrap({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="tw">
      <div className={['tc', className].filter(Boolean).join(' ')}>{children}</div>
    </div>
  );
}

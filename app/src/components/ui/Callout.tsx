import type { ReactNode } from 'react';

export type CalloutKind = 'tip' | 'warn' | 'info';

const labels: Record<CalloutKind, string> = { tip: 'TIP', warn: 'WARN', info: 'INFO' };

export function Callout({ kind, children }: { kind: CalloutKind; children: ReactNode }) {
  return (
    <div className={kind}>
      <span className={`${kind}-i`}>{labels[kind]}</span>
      <span style={{ flex: 1, minWidth: 0 }}>{children}</span>
    </div>
  );
}

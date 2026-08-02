import type { CSSProperties, ReactNode } from 'react';

export type CardAccent =
  | 'warrior'
  | 'ranger'
  | 'warlock'
  | 'tank'
  | 'carry'
  | 'support'
  | 'gold'
  | 'red'
  | 'blue';

interface CardProps {
  accent?: CardAccent;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function Card({ accent, className, style, children }: CardProps) {
  const classes = ['card', accent ? `ct-${accent}` : '', className].filter(Boolean).join(' ');
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}

export function CardTitle({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="ctitle" style={style}>
      {children}
    </div>
  );
}

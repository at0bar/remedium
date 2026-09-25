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

export function CardTitle({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={['ctitle', className].filter(Boolean).join(' ')} style={style}>
      {children}
    </div>
  );
}

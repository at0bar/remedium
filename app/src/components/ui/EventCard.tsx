import type { ReactNode } from 'react';

export function EventCard({
  title,
  type,
  children,
}: {
  title: string;
  type?: string;
  children: ReactNode;
}) {
  return (
    <div className="evcard">
      <div className="evhdr">
        <div>
          <div className="evtitle">{title}</div>
          {type && <div className="evtype">{type}</div>}
        </div>
      </div>
      <div className="evbody">{children}</div>
    </div>
  );
}

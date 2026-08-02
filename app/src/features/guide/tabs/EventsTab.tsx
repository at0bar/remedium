import { SectionHeader } from '../../../components/layout/SectionHeader';
import { events } from '../data/events';

export function EventsTab() {
  return (
    <div className="section">
      <SectionHeader num="09 // EVENTS" title="Гайд по событиям" sub="Стратегии для отдельных событий ради максимальных наград." />

      {events.map((ev) => (
        <div className="evcard" key={ev.title}>
          <div className="evhdr" style={{ borderLeft: `3px solid var(--${ev.borderColor})` }}>
            <div>
              <div className="evtitle">{ev.title}</div>
              <div className="evtype">{ev.type}</div>
            </div>
          </div>
          <div className="evbody">
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>{ev.description}</p>
            <div className="evcols">
              {ev.columns.map((col) => (
                <div key={col.label}>
                  <div className="evlbl">{col.label}</div>
                  {col.items.map((item, i) => (
                    <p className="evli" key={i}>
                      {item}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

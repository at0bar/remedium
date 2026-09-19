import { useState } from 'react';
import { CancelIcon, SaveIcon } from '../../../components/ui/ActionIcons';
import { Button } from '../../../components/ui/Button';
import { allHeroNames } from '../../guide/data/heroes';
import type { Squad } from '../../../lib/api/types';

const EMPTY_HEROES = ['', '', '', '', ''];

export function SquadEditForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Squad | null;
  onSave: (data: { powerM: number; heroes: string[] }) => void;
  onCancel: () => void;
}) {
  const [powerM, setPowerM] = useState(initial?.powerM ?? 0);
  const [heroes, setHeroes] = useState<string[]>(initial?.heroes ?? EMPTY_HEROES);

  function setHero(index: number, name: string) {
    setHeroes((prev) => prev.map((h, i) => (i === index ? name : h)));
  }

  return (
    <div className="squad">
      <div className="squad-hdr">
        <div className="squad-title">{initial?.name ?? 'Новый отряд'}</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button
            variant="gold"
            size="sm"
            iconOnly
            aria-label="Сохранить"
            title="Сохранить"
            onClick={() => onSave({ powerM, heroes })}
          >
            <SaveIcon />
          </Button>
          <Button variant="neutral" size="sm" iconOnly aria-label="Отмена" title="Отмена" onClick={onCancel}>
            <CancelIcon />
          </Button>
        </div>
      </div>
      <div className="squad-body-edit">
        <div className="auth-field" style={{ maxWidth: 160 }}>
          <label className="auth-label" htmlFor={`squad-power-${initial?.id ?? 'new'}`}>
            Мощь, М
          </label>
          <input
            id={`squad-power-${initial?.id ?? 'new'}`}
            className="auth-input"
            type="number"
            min={0}
            step={0.01}
            value={powerM}
            onChange={(e) => setPowerM(Number(e.target.value))}
          />
        </div>
        <div className="hero-slots-edit">
          {heroes.map((hero, i) => (
            <div className="auth-field" key={i}>
              <label className="auth-label">Герой {i + 1}</label>
              <select className="auth-input" value={hero} onChange={(e) => setHero(i, e.target.value)}>
                <option value="">—</option>
                {allHeroNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

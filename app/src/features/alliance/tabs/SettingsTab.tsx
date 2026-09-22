import { useEffect, useState } from 'react';
import { SaveIcon } from '../../../components/ui/ActionIcons';
import { Button } from '../../../components/ui/Button';
import { Card, CardTitle } from '../../../components/ui/Card';
import { useCreatePowerSnapshot, useSettings, useUpdateSetting } from '../../../lib/api/hooks';

const DEFAULT_R1_R2 = 8_000_000;
const DEFAULT_R2_R3 = 30_000_000;

export function SettingsTab() {
  const { data: settings } = useSettings();
  const updateSetting = useUpdateSetting();
  const createPowerSnapshot = useCreatePowerSnapshot();

  const [r1r2, setR1r2] = useState(String(DEFAULT_R1_R2));
  const [r2r3, setR2r3] = useState(String(DEFAULT_R2_R3));

  useEffect(() => {
    if (!settings) return;
    setR1r2(settings.groupThresholdR1R2 ?? String(DEFAULT_R1_R2));
    setR2r3(settings.groupThresholdR2R3 ?? String(DEFAULT_R2_R3));
  }, [settings]);

  return (
    <>
      <Card>
        <CardTitle>Пороги групп</CardTitle>
        <p style={{ color: 'var(--text2)', fontSize: 13, margin: '0 0 12px' }}>
          Ориентировочные пороги очков Вклада для линий R1/R2/R3 на шкале «Анализ вклада». Группу игрока это не меняет
          — её по-прежнему назначает редактор вручную.
        </p>
        <div className="auth-field">
          <label className="auth-label" htmlFor="settings-threshold-r1r2">
            Порог R1 → R2
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              id="settings-threshold-r1r2"
              className="auth-input"
              type="number"
              min={0}
              value={r1r2}
              onChange={(e) => setR1r2(e.target.value)}
            />
            <Button
              variant="gold"
              iconOnly
              aria-label="Сохранить"
              title="Сохранить"
              disabled={updateSetting.isPending}
              onClick={() => updateSetting.mutate({ key: 'groupThresholdR1R2', value: r1r2 })}
            >
              <SaveIcon />
            </Button>
          </div>
        </div>
        <div className="auth-field">
          <label className="auth-label" htmlFor="settings-threshold-r2r3">
            Порог R2 → R3
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              id="settings-threshold-r2r3"
              className="auth-input"
              type="number"
              min={0}
              value={r2r3}
              onChange={(e) => setR2r3(e.target.value)}
            />
            <Button
              variant="gold"
              iconOnly
              aria-label="Сохранить"
              title="Сохранить"
              disabled={updateSetting.isPending}
              onClick={() => updateSetting.mutate({ key: 'groupThresholdR2R3', value: r2r3 })}
            >
              <SaveIcon />
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <CardTitle>Срез мощи</CardTitle>
        <p style={{ color: 'var(--text2)', fontSize: 13, margin: '0 0 12px' }}>
          Фиксирует текущую суммарную мощь отрядов всех игроков альянса — нужна для расчёта изменения мощи на странице
          профиля.
        </p>
        <Button variant="neutral" disabled={createPowerSnapshot.isPending} onClick={() => createPowerSnapshot.mutate()}>
          Зафиксировать срез мощи
        </Button>
      </Card>
    </>
  );
}

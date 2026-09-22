import { useEffect, useState } from 'react';
import { SaveIcon } from '../../../components/ui/ActionIcons';
import { Button } from '../../../components/ui/Button';
import { Card, CardTitle } from '../../../components/ui/Card';
import {
  DEFAULT_ALLIANCE_NAME,
  DEFAULT_GROUP_THRESHOLD_R1_R2,
  DEFAULT_GROUP_THRESHOLD_R2_R3,
  DEFAULT_SERVER_NUMBER,
  useCreatePowerSnapshot,
  useSettings,
  useUpdateSetting,
} from '../../../lib/api/hooks';

export function SettingsTab() {
  const { data: settings } = useSettings();
  const updateSetting = useUpdateSetting();
  const createPowerSnapshot = useCreatePowerSnapshot();

  const [allianceName, setAllianceName] = useState(DEFAULT_ALLIANCE_NAME);
  const [serverNumber, setServerNumber] = useState(DEFAULT_SERVER_NUMBER);
  const [r1r2, setR1r2] = useState(String(DEFAULT_GROUP_THRESHOLD_R1_R2));
  const [r2r3, setR2r3] = useState(String(DEFAULT_GROUP_THRESHOLD_R2_R3));

  useEffect(() => {
    if (!settings) return;
    setAllianceName(settings.allianceName ?? DEFAULT_ALLIANCE_NAME);
    setServerNumber(settings.serverNumber ?? DEFAULT_SERVER_NUMBER);
    setR1r2(settings.groupThresholdR1R2 ?? String(DEFAULT_GROUP_THRESHOLD_R1_R2));
    setR2r3(settings.groupThresholdR2R3 ?? String(DEFAULT_GROUP_THRESHOLD_R2_R3));
  }, [settings]);

  return (
    <>
      <Card>
        <CardTitle>Альянс и сервер</CardTitle>
        <p style={{ color: 'var(--text2)', fontSize: 13, margin: '0 0 12px' }}>
          Название альянса и номер сервера, отображаемые в шапках разделов и в боковом меню.
        </p>
        <div className="auth-field">
          <label className="auth-label" htmlFor="settings-alliance-name">
            Название альянса
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              id="settings-alliance-name"
              className="auth-input"
              type="text"
              value={allianceName}
              onChange={(e) => setAllianceName(e.target.value)}
            />
            <Button
              variant="gold"
              iconOnly
              aria-label="Сохранить"
              title="Сохранить"
              disabled={updateSetting.isPending}
              onClick={() => updateSetting.mutate({ key: 'allianceName', value: allianceName })}
            >
              <SaveIcon />
            </Button>
          </div>
        </div>
        <div className="auth-field">
          <label className="auth-label" htmlFor="settings-server-number">
            Номер сервера
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              id="settings-server-number"
              className="auth-input"
              type="text"
              value={serverNumber}
              onChange={(e) => setServerNumber(e.target.value)}
            />
            <Button
              variant="gold"
              iconOnly
              aria-label="Сохранить"
              title="Сохранить"
              disabled={updateSetting.isPending}
              onClick={() => updateSetting.mutate({ key: 'serverNumber', value: serverNumber })}
            >
              <SaveIcon />
            </Button>
          </div>
        </div>
      </Card>

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

import { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Callout } from '../../../components/ui/Callout';
import { Card, CardTitle } from '../../../components/ui/Card';
import { useAuth } from '../../auth/AuthContext';
import { useProfile, useUpdateNick } from '../../../lib/api/hooks';

export function SettingsTab() {
  const { data: profile } = useProfile();
  const updateNick = useUpdateNick();
  const { setPassword } = useAuth();

  const [nick, setNick] = useState('');
  useEffect(() => {
    if (profile) setNick(profile.nick);
  }, [profile?.nick]);
  const nickChanged = Boolean(profile) && nick.trim() !== '' && nick.trim() !== profile?.nick;

  const [password, setPasswordInput] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);

  return (
    <>
      <Callout kind="info">
        Ник и пароль сохраняются локально в этом браузере — до подключения бэкенда это не настоящий аккаунт.
      </Callout>
      <Card>
        <CardTitle>Аккаунт</CardTitle>
        <div className="auth-field">
          <label className="auth-label" htmlFor="settings-nick">
            Ник
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              id="settings-nick"
              className="auth-input"
              value={nick}
              onChange={(e) => setNick(e.target.value)}
            />
            <Button
              variant="gold"
              disabled={!nickChanged || updateNick.isPending}
              onClick={() => nickChanged && updateNick.mutate(nick.trim())}
            >
              Сохранить
            </Button>
          </div>
        </div>
        <div className="auth-field">
          <label className="auth-label" htmlFor="settings-password">
            Новый пароль
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              id="settings-password"
              className="auth-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                setPasswordSaved(false);
              }}
              autoComplete="new-password"
            />
            <Button
              variant="gold"
              disabled={!password}
              onClick={() => {
                setPassword(password);
                setPasswordInput('');
                setPasswordSaved(true);
              }}
            >
              Сохранить
            </Button>
          </div>
          {passwordSaved && (
            <div style={{ color: 'var(--teal)', fontSize: 12, marginTop: 6 }}>
              Пароль обновлён — используйте его при следующем входе.
            </div>
          )}
        </div>
      </Card>
    </>
  );
}

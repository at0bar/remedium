import { useEffect, useState } from 'react';
import { SaveIcon } from '../../../components/ui/ActionIcons';
import { Button } from '../../../components/ui/Button';
import { Callout } from '../../../components/ui/Callout';
import { Card, CardTitle } from '../../../components/ui/Card';
import { trpc } from '../../../lib/api/trpcClient';
import { useProfile, useUpdateNick } from '../../../lib/api/hooks';

export function SettingsTab() {
  const { data: profile } = useProfile();
  const updateNick = useUpdateNick();
  const changePassword = trpc.auth.changePassword.useMutation();

  const [nick, setNick] = useState('');
  useEffect(() => {
    if (profile) setNick(profile.nick);
  }, [profile?.nick]);
  const nickChanged = Boolean(profile) && nick.trim() !== '' && nick.trim() !== profile?.nick;

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  return (
    <>
      <Callout kind="info">Ник виден всем в ростере альянса. Пароль знаете только вы.</Callout>
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
              iconOnly
              aria-label="Сохранить"
              title="Сохранить"
              disabled={!nickChanged || updateNick.isPending}
              onClick={() => nickChanged && updateNick.mutate(nick.trim())}
            >
              <SaveIcon />
            </Button>
          </div>
          {updateNick.isError && (
            <div style={{ color: 'var(--red)', fontSize: 12, marginTop: 6 }}>{updateNick.error.message}</div>
          )}
        </div>
        <div className="auth-field">
          <label className="auth-label" htmlFor="settings-current-password">
            Текущий пароль
          </label>
          <input
            id="settings-current-password"
            className="auth-input"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <div className="auth-field">
          <label className="auth-label" htmlFor="settings-new-password">
            Новый пароль
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              id="settings-new-password"
              className="auth-input"
              type="password"
              placeholder="не короче 6 символов"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
            />
            <Button
              variant="gold"
              iconOnly
              aria-label="Сохранить"
              title="Сохранить"
              disabled={!currentPassword || newPassword.length < 6 || changePassword.isPending}
              onClick={() =>
                changePassword.mutate(
                  { currentPassword, newPassword },
                  { onSuccess: () => { setCurrentPassword(''); setNewPassword(''); } },
                )
              }
            >
              <SaveIcon />
            </Button>
          </div>
          {changePassword.isSuccess && (
            <div style={{ color: 'var(--teal)', fontSize: 12, marginTop: 6 }}>
              Пароль обновлён — используйте его при следующем входе.
            </div>
          )}
          {changePassword.isError && (
            <div style={{ color: 'var(--red)', fontSize: 12, marginTop: 6 }}>{changePassword.error.message}</div>
          )}
        </div>
      </Card>
    </>
  );
}

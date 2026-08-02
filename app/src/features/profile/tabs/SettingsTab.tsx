import { Callout } from '../../../components/ui/Callout';
import { Card, CardTitle } from '../../../components/ui/Card';
import { useAuth } from '../../auth/AuthContext';

export function SettingsTab() {
  const { user } = useAuth();

  return (
    <>
      <Callout kind="info">
        Настройки пока не сохраняются — это заготовка интерфейса до подключения бэкенда.
      </Callout>
      <Card>
        <CardTitle>Аккаунт</CardTitle>
        <div className="auth-field">
          <label className="auth-label" htmlFor="settings-nick">
            Ник
          </label>
          <input id="settings-nick" className="auth-input" defaultValue={user?.nick} disabled />
        </div>
        <div className="auth-field">
          <label className="auth-label" htmlFor="settings-password">
            Новый пароль
          </label>
          <input id="settings-password" className="auth-input" type="password" placeholder="••••••••" disabled />
        </div>
      </Card>
    </>
  );
}

import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [nick, setNick] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (user) {
    const from = (location.state as { from?: Location })?.from?.pathname ?? '/profile';
    return <Navigate to={from} replace />;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    const ok = await login(nick, password);
    if (!ok) {
      setError('Введите ник и пароль.');
      return;
    }
    navigate('/profile', { replace: true });
  }

  return (
    <div className="auth-shell">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="sb-tag">Alliance Dashboard</div>
        <div className="sb-title" style={{ marginBottom: 18 }}>
          Remedium
        </div>
        <div className="auth-field">
          <label className="auth-label" htmlFor="nick">
            Ник
          </label>
          <input
            id="nick"
            className="auth-input"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            autoComplete="username"
            autoFocus
          />
        </div>
        <div className="auth-field">
          <label className="auth-label" htmlFor="password">
            Пароль
          </label>
          <input
            id="password"
            className="auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <button className="auth-btn" type="submit">
          Войти
        </button>
        {error && <div className="auth-error">{error}</div>}
      </form>
    </div>
  );
}

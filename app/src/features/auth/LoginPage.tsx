import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

type Mode = 'login' | 'register';

export function LoginPage() {
  const { user, login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState<Mode>('login');
  const [nick, setNick] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  if (user) {
    const from = (location.state as { from?: Location })?.from?.pathname ?? '/profile';
    return <Navigate to={from} replace />;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    if (!nick.trim() || !password) {
      setError('Введите ник и пароль.');
      return;
    }
    if (mode === 'register' && password.length < 6) {
      setError('Пароль должен быть не короче 6 символов.');
      return;
    }

    setPending(true);
    const result = mode === 'login' ? await login(nick, password) : await register(nick, password);
    setPending(false);

    if (!result.ok) {
      setError(result.error);
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
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          />
        </div>
        <button className="auth-btn" type="submit" disabled={pending}>
          {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </button>
        {error && <div className="auth-error">{error}</div>}
        <button
          type="button"
          className="auth-link"
          onClick={() => {
            setMode(mode === 'login' ? 'register' : 'login');
            setError(null);
          }}
        >
          {mode === 'login' ? 'Впервые здесь? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
        </button>
      </form>
    </div>
  );
}

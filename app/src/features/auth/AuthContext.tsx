import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { readLocalStore, writeLocalStore } from '../../lib/api/localStore';

export type SiteRole = 'member' | 'officer';

export interface AuthUser {
  nick: string;
  role: SiteRole;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (nick: string, password: string) => Promise<boolean>;
  logout: () => void;
  setPassword: (password: string) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'remedium.mock-auth-user';
const PASSWORD_KEY = 'auth:password';

/**
 * MOCK auth — placeholder for the future backend-issued JWT/cookie session.
 * Accepts any non-empty nick/password until a password is set via Settings,
 * after which login checks against it; nicks "admin" or "officer" get the
 * officer role (used to gate future edit-only UI), everything else is a
 * read-only member. Replace with a real API call once the backend exists.
 */
function mockAuthenticate(nick: string, password: string): AuthUser | null {
  const trimmed = nick.trim();
  if (!trimmed || !password) return null;
  const savedPassword = readLocalStore<string | null>(PASSWORD_KEY, null);
  if (savedPassword !== null && password !== savedPassword) return null;
  const role: SiteRole = ['admin', 'officer'].includes(trimmed.toLowerCase()) ? 'officer' : 'member';
  return { nick: trimmed, role };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  async function login(nick: string, password: string) {
    const result = mockAuthenticate(nick, password);
    if (!result) return false;
    setUser(result);
    return true;
  }

  function logout() {
    setUser(null);
  }

  function setPassword(password: string) {
    writeLocalStore(PASSWORD_KEY, password);
  }

  return <AuthContext.Provider value={{ user, login, logout, setPassword }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

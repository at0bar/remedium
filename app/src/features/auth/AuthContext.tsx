import { TRPCClientError } from '@trpc/client';
import { createContext, useContext, type ReactNode } from 'react';
import { trpc } from '../../lib/api/trpcClient';

export interface AuthUser {
  playerId: string;
  nick: string;
  canEdit: boolean;
}

type AuthResult = { ok: true } | { ok: false; error: string };

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (nick: string, password: string) => Promise<AuthResult>;
  register: (nick: string, password: string) => Promise<AuthResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function errorMessage(err: unknown): string {
  if (err instanceof TRPCClientError) return err.message;
  return 'Что-то пошло не так, попробуйте ещё раз.';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const utils = trpc.useUtils();
  const meQuery = trpc.auth.me.useQuery();
  const loginMutation = trpc.auth.login.useMutation();
  const registerMutation = trpc.auth.register.useMutation();
  const logoutMutation = trpc.auth.logout.useMutation();

  async function login(nick: string, password: string): Promise<AuthResult> {
    try {
      const user = await loginMutation.mutateAsync({ nick, password });
      utils.auth.me.setData(undefined, user);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: errorMessage(err) };
    }
  }

  async function register(nick: string, password: string): Promise<AuthResult> {
    try {
      const user = await registerMutation.mutateAsync({ nick, password });
      utils.auth.me.setData(undefined, user);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: errorMessage(err) };
    }
  }

  function logout() {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        utils.auth.me.setData(undefined, null);
        utils.invalidate();
      },
    });
  }

  return (
    <AuthContext.Provider value={{ user: meQuery.data ?? null, isLoading: meQuery.isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

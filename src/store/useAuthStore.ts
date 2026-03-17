import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { User } from '../types/user.types';

interface AuthState {
  user: User | null;
  token: string | null;
  refreshTokenValue: string | null;
  isAuthenticated: boolean;
  login: (payload: { user: User; token: string; refreshToken: string }) => void;
  logout: () => void;
  refreshToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    immer((set) => ({
      user: null,
      token: null,
      refreshTokenValue: null,
      isAuthenticated: false,
      login: ({ user, token, refreshToken }) => {
        set((state) => {
          state.user = user;
          state.token = token;
          state.refreshTokenValue = refreshToken;
          state.isAuthenticated = true;
        });
      },
      logout: () => {
        set((state) => {
          state.user = null;
          state.token = null;
          state.refreshTokenValue = null;
          state.isAuthenticated = false;
        });
      },
      refreshToken: (token) => {
        set((state) => {
          state.token = token;
          state.isAuthenticated = Boolean(token);
        });
      },
    })),
    { name: 'auth' },
  ),
);

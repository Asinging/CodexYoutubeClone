import axiosInstance from './axiosInstance';
import type { AuthResponse, LoginDto, RegisterDto } from '../types/user.types';

export const AUTH_QUERY_KEYS = {
  me: ['auth', 'me'] as const,
};

export const authApi = {
  login: async (payload: LoginDto): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<AuthResponse>('/auth/login', payload);
    return data;
  },
  register: async (payload: RegisterDto): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<AuthResponse>('/auth/register', payload);
    return data;
  },
  refreshToken: async (refreshToken: string): Promise<{ accessToken: string }> => {
    const { data } = await axiosInstance.post<{ accessToken: string }>('/auth/refresh', { refreshToken });
    return data;
  },
};

import axiosInstance from './axiosInstance';
import type { Channel, SubscribeDto } from '../types/channel.types';

export const CHANNEL_QUERY_KEYS = {
  detail: (channelId: string) => ['channels', 'detail', channelId] as const,
};

export const channelApi = {
  getById: async (channelId: string): Promise<Channel> => {
    const { data } = await axiosInstance.get<Channel>(`/channels/${channelId}`);
    return data;
  },
  subscribe: async ({ channelId }: SubscribeDto): Promise<void> => {
    await axiosInstance.post(`/channels/${channelId}/subscribe`);
  },
  unsubscribe: async ({ channelId }: SubscribeDto): Promise<void> => {
    await axiosInstance.delete(`/channels/${channelId}/subscribe`);
  },
};

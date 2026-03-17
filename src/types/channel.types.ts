import type { VideoPreview } from './video.types';

export interface ChannelStats {
  subscribers: number;
  totalViews: number;
  totalVideos: number;
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  isSubscribed?: boolean;
  stats: ChannelStats;
  videos?: VideoPreview[];
}

export interface SubscribeDto {
  channelId: string;
}

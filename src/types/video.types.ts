export interface VideoPreview {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelId: string;
  channelName: string;
  channelAvatarUrl?: string;
  views: number;
  duration: number;
  createdAt: string;
}

export interface Video extends VideoPreview {
  description: string;
  sourceUrl: string;
  likes: number;
  dislikes: number;
  isLiked?: boolean;
  isDisliked?: boolean;
}

export interface CreateVideoDto {
  title: string;
  description: string;
  category?: string;
}

export interface UpdateVideoDto {
  title?: string;
  description?: string;
  category?: string;
}

export interface PaginatedVideos {
  items: VideoPreview[];
  nextCursor: string | null;
}

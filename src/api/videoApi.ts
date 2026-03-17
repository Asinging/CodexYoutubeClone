import axiosInstance from './axiosInstance';
import type { CreateVideoDto, PaginatedVideos, UpdateVideoDto, Video, VideoPreview } from '../types/video.types';

export const VIDEO_QUERY_KEYS = {
  feed: ['videos', 'feed'] as const,
  detail: (videoId: string) => ['videos', 'detail', videoId] as const,
  related: (videoId: string) => ['videos', 'related', videoId] as const,
  studio: ['videos', 'studio'] as const,
};

export const videoApi = {
  getFeed: async (cursor?: string): Promise<PaginatedVideos> => {
    const { data } = await axiosInstance.get<PaginatedVideos>('/videos', { params: { cursor } });
    return data;
  },
  getById: async (videoId: string): Promise<Video> => {
    const { data } = await axiosInstance.get<Video>(`/videos/${videoId}`);
    return data;
  },
  getRelated: async (videoId: string): Promise<VideoPreview[]> => {
    const { data } = await axiosInstance.get<VideoPreview[]>(`/videos/${videoId}/related`);
    return data;
  },
  incrementView: async (videoId: string): Promise<void> => {
    await axiosInstance.post(`/videos/${videoId}/views`);
  },
  likeVideo: async (videoId: string): Promise<void> => {
    await axiosInstance.post(`/videos/${videoId}/likes`);
  },
  createVideo: async (payload: CreateVideoDto): Promise<Video> => {
    const { data } = await axiosInstance.post<Video>('/videos', payload);
    return data;
  },
  updateVideo: async (videoId: string, payload: UpdateVideoDto): Promise<Video> => {
    const { data } = await axiosInstance.patch<Video>(`/videos/${videoId}`, payload);
    return data;
  },
  deleteVideo: async (videoId: string): Promise<void> => {
    await axiosInstance.delete(`/videos/${videoId}`);
  },
};

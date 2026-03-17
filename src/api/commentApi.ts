import axiosInstance from './axiosInstance';
import type { Comment, CreateCommentDto, PaginatedComments } from '../types/comment.types';

export const COMMENT_QUERY_KEYS = {
  list: (videoId: string) => ['comments', videoId] as const,
};

export const commentApi = {
  getComments: async (videoId: string, cursor?: string): Promise<PaginatedComments> => {
    const { data } = await axiosInstance.get<PaginatedComments>(`/videos/${videoId}/comments`, { params: { cursor } });
    return data;
  },
  postComment: async (payload: CreateCommentDto): Promise<Comment> => {
    const { data } = await axiosInstance.post<Comment>(`/videos/${payload.videoId}/comments`, payload);
    return data;
  },
  deleteComment: async (commentId: string): Promise<void> => {
    await axiosInstance.delete(`/comments/${commentId}`);
  },
};

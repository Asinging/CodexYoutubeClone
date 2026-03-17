import { ThumbsUp } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { videoApi, VIDEO_QUERY_KEYS } from '../../api/videoApi';
import type { Video } from '../../types/video.types';
import { Button } from '../ui/Button';

interface VideoInfoProps {
  video: Video;
}

export const VideoInfo = ({ video }: VideoInfoProps) => {
  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: () => videoApi.likeVideo(video.id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: VIDEO_QUERY_KEYS.detail(video.id) });
      const previous = queryClient.getQueryData<Video>(VIDEO_QUERY_KEYS.detail(video.id));
      queryClient.setQueryData<Video>(VIDEO_QUERY_KEYS.detail(video.id), (old) =>
        old ? { ...old, likes: old.likes + 1, isLiked: true } : old,
      );
      return { previous };
    },
    onError: (_error, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(VIDEO_QUERY_KEYS.detail(video.id), context.previous);
      }
    },
  });

  return (
    <section className="space-y-3">
      <h1 className="text-xl font-bold">{video.title}</h1>
      <Button variant="ghost" onClick={() => likeMutation.mutate()}><ThumbsUp size={16} className="mr-2" />{video.likes}</Button>
      <p className="rounded-xl bg-zinc-100 p-4 text-sm dark:bg-zinc-900">{video.description}</p>
    </section>
  );
};

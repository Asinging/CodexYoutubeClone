import { useInfiniteQuery } from '@tanstack/react-query';
import { VIDEO_QUERY_KEYS, videoApi } from '../api/videoApi';

export const useVideoFeed = () =>
  useInfiniteQuery({
    queryKey: VIDEO_QUERY_KEYS.feed,
    queryFn: ({ pageParam }) => videoApi.getFeed(pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

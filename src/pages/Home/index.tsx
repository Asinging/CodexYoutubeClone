import { useMemo } from 'react';
import { VideoGrid } from '../../components/video/VideoGrid';
import { useVideoFeed } from '../../hooks/useVideoFeed';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

const HomePage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useVideoFeed();
  const videos = useMemo(() => data?.pages.flatMap((page) => page.items) ?? [], [data]);
  const loadMoreRef = useInfiniteScroll(() => void fetchNextPage(), Boolean(hasNextPage) && !isFetchingNextPage);

  return (
    <div className="space-y-4">
      <VideoGrid videos={videos} loading={isLoading} />
      <div ref={loadMoreRef} className="h-10" />
    </div>
  );
};

export default HomePage;

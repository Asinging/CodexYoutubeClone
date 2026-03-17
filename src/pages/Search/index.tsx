import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useVideoFeed } from '../../hooks/useVideoFeed';
import { useDebounce } from '../../hooks/useDebounce';
import { VideoGrid } from '../../components/video/VideoGrid';

const SearchPage = () => {
  const [params] = useSearchParams();
  const q = params.get('q') ?? '';
  const debounced = useDebounce(q);
  const { data, isLoading } = useVideoFeed();

  const videos = useMemo(() => {
    const source = data?.pages.flatMap((page) => page.items) ?? [];
    return source.filter((video) => video.title.toLowerCase().includes(debounced.toLowerCase()));
  }, [data, debounced]);

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">Search results for “{q}”</h1>
      <VideoGrid videos={videos} loading={isLoading} />
    </section>
  );
};

export default SearchPage;

import type { VideoPreview } from '../../types/video.types';
import { VideoCard } from './VideoCard';
import { SkeletonCard } from '../ui/SkeletonCard';

interface VideoGridProps {
  videos: VideoPreview[];
  loading?: boolean;
}

export const VideoGrid = ({ videos, loading = false }: VideoGridProps) => {
  if (loading) {
    return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => <VideoCard key={video.id} video={video} />)}
    </div>
  );
};

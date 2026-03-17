import { useQuery } from '@tanstack/react-query';
import { videoApi, VIDEO_QUERY_KEYS } from '../../api/videoApi';
import { VideoCard } from './VideoCard';

interface RelatedVideosProps {
  videoId: string;
}

export const RelatedVideos = ({ videoId }: RelatedVideosProps) => {
  const { data = [] } = useQuery({ queryKey: VIDEO_QUERY_KEYS.related(videoId), queryFn: () => videoApi.getRelated(videoId) });

  return <div className="space-y-4">{data.map((video) => <VideoCard key={video.id} video={video} />)}</div>;
};

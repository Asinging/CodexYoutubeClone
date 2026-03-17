import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { videoApi, VIDEO_QUERY_KEYS } from '../../api/videoApi';
import { Spinner } from '../../components/ui/Spinner';
import { VideoPlayer } from '../../components/video/VideoPlayer';
import { VideoInfo } from '../../components/video/VideoInfo';
import { CommentSection } from '../../components/comment/CommentSection';
import { RelatedVideos } from '../../components/video/RelatedVideos';

const WatchPage = () => {
  const { videoId = '' } = useParams();
  const { data: video, isLoading } = useQuery({ queryKey: VIDEO_QUERY_KEYS.detail(videoId), queryFn: () => videoApi.getById(videoId), enabled: Boolean(videoId) });

  if (isLoading || !video) return <Spinner />;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-5">
        <VideoPlayer src={video.sourceUrl} />
        <VideoInfo video={video} />
        <CommentSection videoId={video.id} />
      </div>
      <RelatedVideos videoId={video.id} />
    </div>
  );
};

export default WatchPage;

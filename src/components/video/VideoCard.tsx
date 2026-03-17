import { Link } from 'react-router-dom';
import type { VideoPreview } from '../../types/video.types';
import { formatDate } from '../../utils/formatDate';
import { formatDuration } from '../../utils/formatDuration';
import { formatViews } from '../../utils/formatViews';

interface VideoCardProps {
  video: VideoPreview;
}

export const VideoCard = ({ video }: VideoCardProps) => (
  <Link to={`/watch/${video.id}`} className="space-y-3">
    <div className="relative overflow-hidden rounded-xl">
      <img src={video.thumbnailUrl} alt={video.title} className="aspect-video w-full object-cover" />
      <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5 text-xs text-white">{formatDuration(video.duration)}</span>
    </div>
    <div>
      <h3 className="line-clamp-2 font-semibold">{video.title}</h3>
      <p className="text-sm text-zinc-500">{video.channelName}</p>
      <p className="text-xs text-zinc-500">{formatViews(video.views)} • {formatDate(video.createdAt)}</p>
    </div>
  </Link>
);

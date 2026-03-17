import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { videoApi, VIDEO_QUERY_KEYS } from '../../api/videoApi';
import { VideoGrid } from '../../components/video/VideoGrid';
import { Button } from '../../components/ui/Button';

const StudioPage = () => {
  const queryClient = useQueryClient();
  const { data = [] } = useQuery({ queryKey: VIDEO_QUERY_KEYS.studio, queryFn: () => videoApi.getFeed().then((res) => res.items) });

  const deleteMutation = useMutation({
    mutationFn: (videoId: string) => videoApi.deleteVideo(videoId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: VIDEO_QUERY_KEYS.studio }),
  });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Studio</h1>
      <VideoGrid videos={data} />
      <div className="space-y-2">
        {data.map((video) => (
          <div key={video.id} className="flex items-center justify-between rounded-xl border p-3 dark:border-zinc-800">
            <span>{video.title}</span>
            <Button variant="danger" onClick={() => deleteMutation.mutate(video.id)}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudioPage;

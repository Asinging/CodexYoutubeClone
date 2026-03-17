import { useEffect } from 'react';
import ReactPlayer from 'react-player';
import Hls from 'hls.js';
import * as Slider from '@radix-ui/react-slider';
import { useVideoPlayer } from '../../hooks/useVideoPlayer';
import { usePlayerStore } from '../../store/usePlayerStore';

interface VideoPlayerProps {
  src: string;
}

export const VideoPlayer = ({ src }: VideoPlayerProps) => {
  const { videoRef, supportsHls, qualities, setQuality } = useVideoPlayer({ src });
  const setPlayerState = usePlayerStore((state) => state.setPlayerState);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (videoRef.current) {
        setPlayerState({ progress: videoRef.current.currentTime, duration: videoRef.current.duration || 0 });
      }
    }, 500);
    return () => window.clearInterval(interval);
  }, [setPlayerState, videoRef]);

  const useNativeHls = src.endsWith('.m3u8') && (Hls.isSupported() || Boolean(videoRef.current?.canPlayType('application/vnd.apple.mpegurl')));

  return (
    <div className="space-y-3">
      {useNativeHls ? (
        <video ref={videoRef} controls className="aspect-video w-full rounded-xl bg-black" />
      ) : (
        <ReactPlayer url={src} controls width="100%" height="auto" />
      )}
      {supportsHls && qualities.length > 0 && (
        <div className="rounded-xl border p-3 dark:border-zinc-800">
          <p className="mb-2 text-sm">Quality</p>
          <Slider.Root className="relative flex h-6 items-center" min={0} max={qualities.length - 1} step={1} onValueChange={(value) => setQuality(value[0])}>
            <Slider.Track className="relative h-1 grow rounded-full bg-zinc-200 dark:bg-zinc-700">
              <Slider.Range className="absolute h-full bg-red-600" />
            </Slider.Track>
            <Slider.Thumb className="block h-4 w-4 rounded-full bg-red-600" />
          </Slider.Root>
        </div>
      )}
    </div>
  );
};

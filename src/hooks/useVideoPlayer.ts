import Hls from 'hls.js';
import { useEffect, useMemo, useRef, useState } from 'react';

interface UseVideoPlayerProps {
  src: string;
}

export const useVideoPlayer = ({ src }: UseVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [qualities, setQualities] = useState<number[]>([]);

  useEffect(() => {
    if (!videoRef.current || !src.endsWith('.m3u8')) {
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const levels = hls.levels.map((level, index) => ({ index, height: level.height }));
        setQualities(levels.map((l) => l.index));
      });
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = src;
    }

    return () => {
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, [src]);

  const supportsHls = useMemo(() => src.endsWith('.m3u8') && Hls.isSupported(), [src]);

  const setQuality = (level: number) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = level;
    }
  };

  return { videoRef, supportsHls, qualities, setQuality };
};

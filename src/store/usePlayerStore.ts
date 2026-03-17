import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface PlayerState {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  progress: number;
  duration: number;
  quality: number;
  isFullscreen: boolean;
  setPlayerState: (payload: Partial<Omit<PlayerState, 'setPlayerState'>>) => void;
}

export const usePlayerStore = create<PlayerState>()(
  immer((set) => ({
    isPlaying: false,
    volume: 1,
    isMuted: false,
    progress: 0,
    duration: 0,
    quality: -1,
    isFullscreen: false,
    setPlayerState: (payload) => {
      set((state) => {
        Object.assign(state, payload);
      });
    },
  })),
);

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface UploadState {
  uploadProgress: number;
  uploadStatus: 'idle' | 'uploading' | 'success' | 'error';
  fileName: string;
  setUploadState: (payload: Partial<Omit<UploadState, 'setUploadState' | 'reset'>>) => void;
  reset: () => void;
}

export const useUploadStore = create<UploadState>()(
  immer((set) => ({
    uploadProgress: 0,
    uploadStatus: 'idle',
    fileName: '',
    setUploadState: (payload) => {
      set((state) => {
        Object.assign(state, payload);
      });
    },
    reset: () => {
      set((state) => {
        state.uploadProgress = 0;
        state.uploadStatus = 'idle';
        state.fileName = '';
      });
    },
  })),
);

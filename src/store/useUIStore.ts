import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface UIState {
  isSidebarOpen: boolean;
  theme: 'light' | 'dark';
  activeModal: string | null;
  toggleSidebar: () => void;
  toggleTheme: () => void;
  openModal: (id: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    immer((set) => ({
      isSidebarOpen: true,
      theme: 'light',
      activeModal: null,
      toggleSidebar: () => {
        set((state) => {
          state.isSidebarOpen = !state.isSidebarOpen;
        });
      },
      toggleTheme: () => {
        set((state) => {
          state.theme = state.theme === 'light' ? 'dark' : 'light';
          document.documentElement.classList.toggle('dark', state.theme === 'dark');
        });
      },
      openModal: (id) => {
        set((state) => {
          state.activeModal = id;
        });
      },
      closeModal: () => {
        set((state) => {
          state.activeModal = null;
        });
      },
    })),
    {
      name: 'ui',
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        if (state?.theme) {
          document.documentElement.classList.toggle('dark', state.theme === 'dark');
        }
      },
    },
  ),
);

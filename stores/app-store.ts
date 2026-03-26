import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storage } from '@/lib/storage';

interface AppStore {
  activeTripId: string | null;
  isOnboarded: boolean;
  setActiveTripId: (tripId: string | null) => void;
  setOnboarded: (value: boolean) => void;
  reset: () => void;
}

const initialState = {
  activeTripId: null,
  isOnboarded: false,
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      ...initialState,
      setActiveTripId: (activeTripId) => set({ activeTripId }),
      setOnboarded: (isOnboarded) => set({ isOnboarded }),
      reset: () => set(initialState),
    }),
    {
      name: 'voya-app',
      storage: createJSONStorage(() => storage),
    }
  )
);

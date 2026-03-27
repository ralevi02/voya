import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storage } from '@/lib/storage';
import type { ChatMessage } from '@/features/ai/types/ai.types';

const EMPTY: ChatMessage[] = [];

interface ChatStore {
  /** Messages keyed by tripId */
  conversations: Record<string, ChatMessage[]>;
  addMessage: (tripId: string, message: ChatMessage) => void;
  clearChat: (tripId: string) => void;
}

/** Stable selector — avoids new [] on every render */
export function selectMessages(tripId: string) {
  return (s: ChatStore) => s.conversations[tripId] ?? EMPTY;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      conversations: {},
      addMessage: (tripId: string, message: ChatMessage) =>
        set((state) => {
          const current = state.conversations[tripId] ?? [];
          return {
            conversations: {
              ...state.conversations,
              [tripId]: [...current, message],
            },
          };
        }),
      clearChat: (tripId: string) =>
        set((state) => {
          const { [tripId]: _, ...rest } = state.conversations;
          return { conversations: rest };
        }),
    }),
    {
      name: 'voya-chat',
      storage: createJSONStorage(() => storage),
    },
  ),
);

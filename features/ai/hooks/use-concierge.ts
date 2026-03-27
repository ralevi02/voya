import { useState, useCallback } from 'react';
import { useChatStore, selectMessages } from '@/stores/chat-store';
import { sendConciergeMessage } from '../services/concierge.service';
import type { TripContext, ChatMessage } from '../types/ai.types';

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useConcierge(
  tripId: string,
  tripContext: TripContext,
) {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messages = useChatStore(selectMessages(tripId));
  const addMessage = useChatStore((s) => s.addMessage);
  const clearChat = useChatStore((s) => s.clearChat);

  const send = useCallback(
    async (text: string) => {
      if (!text.trim() || isSending) return;
      setError(null);

      const userMsg: ChatMessage = {
        id: createId(),
        role: 'user',
        content: text.trim(),
        timestamp: Date.now(),
      };
      addMessage(tripId, userMsg);
      setIsSending(true);

      try {
        const state = useChatStore.getState();
        const currentMsgs = state.conversations[tripId] ?? [];
        const response = await sendConciergeMessage(
          text.trim(),
          currentMsgs,
          tripContext,
        );

        const aiMsg: ChatMessage = {
          id: createId(),
          role: 'assistant',
          content: response.reply,
          has_itinerary_action: response.has_itinerary_action,
          timestamp: Date.now(),
        };
        addMessage(tripId, aiMsg);
      } catch (err) {
        const msg = err instanceof Error
          ? err.message
          : 'Error al enviar mensaje';
        setError(msg);
      } finally {
        setIsSending(false);
      }
    },
    [tripId, tripContext, isSending, addMessage],
  );

  const clear = useCallback(
    () => clearChat(tripId),
    [tripId, clearChat],
  );

  return { messages, send, isSending, error, clear };
}

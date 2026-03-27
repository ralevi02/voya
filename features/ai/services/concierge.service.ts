import { supabase } from '@/lib/supabase';
import { conciergeResponseSchema } from '../types/schemas';
import type {
  ChatMessage,
  TripContext,
  ConciergeResponse,
} from '../types/ai.types';

/**
 * Envía un mensaje al Voya Concierge con contexto del viaje.
 * Retorna la respuesta de la IA validada con Zod.
 */
export async function sendConciergeMessage(
  message: string,
  history: ChatMessage[],
  tripContext: TripContext,
): Promise<ConciergeResponse> {
  const apiHistory = history.slice(-10).map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const { data, error } = await supabase.functions.invoke(
    'trip-concierge',
    {
      body: {
        message,
        history: apiHistory,
        trip_context: tripContext,
      },
    },
  );

  if (error) throw new Error(error.message ?? 'Error del concierge');

  const parsed = conciergeResponseSchema.safeParse(data?.data);
  if (!parsed.success) {
    throw new Error('Respuesta inválida del concierge');
  }

  return parsed.data;
}

import { supabase } from '@/lib/supabase';
import { receiptDataSchema } from '../types/schemas';
import type { ReceiptData } from '../types/ai.types';

/**
 * Envía una imagen de boleta a la Edge Function process-receipt.
 * Retorna los datos extraídos por GPT-4o Vision.
 */
export async function processReceipt(
  imageBase64: string,
): Promise<ReceiptData> {
  const { data, error } = await supabase.functions.invoke(
    'process-receipt',
    {
      body: { image_base64: imageBase64 },
    },
  );

  if (error) throw new Error(error.message ?? 'Error procesando boleta');

  const parsed = receiptDataSchema.safeParse(data?.data);
  if (!parsed.success) {
    throw new Error('La IA no pudo extraer los datos de la boleta');
  }

  return parsed.data;
}

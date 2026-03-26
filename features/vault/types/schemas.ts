import { z } from 'zod';

const docTypes = [
  'flight', 'hotel', 'insurance', 'passport', 'other',
] as const;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const createDocumentSchema = z.object({
  trip_id: z.string().uuid(),
  name: z.string().min(1, 'Nombre requerido').max(120),
  doc_type: z.enum(docTypes),
  file_url: z.string().min(1, 'URL requerida'),
  file_size: z.number().max(
    MAX_FILE_SIZE,
    'Archivo muy grande (máx 10MB)',
  ).nullable().optional(),
  mime_type: z.string().nullable().optional(),
  associated_itinerary_item_id: z
    .string().uuid().nullable().optional(),
});

export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE;

export type CreateDocFormData = z.infer<
  typeof createDocumentSchema
>;

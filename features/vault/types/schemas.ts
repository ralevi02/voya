import { z } from 'zod';

const documentTypes = [
  'passport',
  'ticket',
  'boarding_pass',
  'reservation',
  'insurance',
  'visa',
  'other',
] as const;

export const createDocumentSchema = z.object({
  trip_id: z.string().uuid().nullable().optional(),
  type: z.enum(documentTypes),
  title: z.string().min(1, 'Título requerido'),
  file_url: z.string().url('URL inválida'),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const vaultDocumentSchema = z.object({
  id: z.string().uuid(),
  trip_id: z.string().uuid().nullable(),
  user_id: z.string().uuid(),
  type: z.enum(documentTypes),
  title: z.string(),
  file_url: z.string().url(),
  local_path: z.string().nullable(),
  metadata: z.record(z.string(), z.unknown()),
  is_encrypted: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;
export type VaultDocumentResponse = z.infer<typeof vaultDocumentSchema>;

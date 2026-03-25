export type DocumentType =
  | 'passport'
  | 'ticket'
  | 'boarding_pass'
  | 'reservation'
  | 'insurance'
  | 'visa'
  | 'other';

export interface VaultDocument {
  id: string;
  trip_id: string | null;
  user_id: string;
  type: DocumentType;
  title: string;
  file_url: string;
  local_path: string | null;
  metadata: Record<string, unknown>;
  is_encrypted: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateDocumentInput {
  trip_id?: string | null;
  type: DocumentType;
  title: string;
  file_url: string;
  metadata?: Record<string, unknown>;
}

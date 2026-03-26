export type DocType =
  | 'flight'
  | 'hotel'
  | 'insurance'
  | 'passport'
  | 'other';

export interface TravelDocument {
  id: string;
  trip_id: string;
  owner_id: string;
  name: string;
  doc_type: DocType;
  file_url: string;
  file_size: number | null;
  mime_type: string | null;
  associated_itinerary_item_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateDocumentInput {
  trip_id: string;
  name: string;
  doc_type: DocType;
  file_url: string;
  file_size?: number | null;
  mime_type?: string | null;
  associated_itinerary_item_id?: string | null;
}

export type VaultFilter = 'all' | 'mine' | 'group';

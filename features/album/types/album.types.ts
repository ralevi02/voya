export type MediaType = 'photo' | 'video';

export interface MediaItem {
  id: string;
  trip_id: string;
  user_id: string;
  type: MediaType;
  file_url: string;
  thumbnail_url: string | null;
  caption: string | null;
  location_lat: number | null;
  location_lng: number | null;
  taken_at: string;
  created_at: string;
}

export interface UploadMediaInput {
  trip_id: string;
  type: MediaType;
  file_url: string;
  caption?: string | null;
  location_lat?: number | null;
  location_lng?: number | null;
  taken_at: string;
}

export interface AlbumDay {
  date: string;
  items: MediaItem[];
}

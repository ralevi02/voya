export type TravelObjectType =
  | 'flight'
  | 'hotel'
  | 'activity'
  | 'restaurant'
  | 'transport'
  | 'other';

export interface TravelObject {
  id: string;
  trip_id: string;
  type: TravelObjectType;
  title: string;
  description: string;
  start_time: string;
  end_time: string | null;
  location_name: string | null;
  location_lat: number | null;
  location_lng: number | null;
  metadata: Record<string, unknown>;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTravelObjectInput {
  trip_id: string;
  type: TravelObjectType;
  title: string;
  description?: string;
  start_time: string;
  end_time?: string | null;
  location_name?: string | null;
  location_lat?: number | null;
  location_lng?: number | null;
  metadata?: Record<string, unknown>;
}

export interface ItineraryDay {
  date: string;
  items: TravelObject[];
}

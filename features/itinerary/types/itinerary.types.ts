export type ItineraryItemType =
  | 'flight'
  | 'hotel'
  | 'food'
  | 'activity';

export interface ItineraryItem {
  id: string;
  trip_id: string;
  title: string;
  type: ItineraryItemType;
  start_time: string;
  end_time: string | null;
  location_name: string | null;
  location_lat: number | null;
  location_lng: number | null;
  notes: string | null;
  is_completed: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface CreateItineraryItemInput {
  trip_id: string;
  title: string;
  type: ItineraryItemType;
  start_time: string;
  end_time?: string | null;
  location_name?: string | null;
  location_lat?: number | null;
  location_lng?: number | null;
  notes?: string | null;
}

export interface ItineraryDay {
  date: string;
  label: string;
  items: ItineraryItem[];
}

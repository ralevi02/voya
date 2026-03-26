export type TripRole = 'admin' | 'editor' | 'viewer';

export interface Trip {
  id: string;
  name: string;
  description: string | null;
  destination: string;
  start_date: string;
  end_date: string;
  base_currency: string;
  cover_image: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface TripMember {
  id: string;
  trip_id: string;
  user_id: string;
  role: TripRole;
  joined_at: string;
}

export interface TripWithMembers extends Trip {
  trip_members: TripMember[];
}

export interface CreateTripInput {
  name: string;
  destination: string;
  start_date: string;
  end_date: string;
  description?: string;
  base_currency?: string;
  cover_image?: string;
}

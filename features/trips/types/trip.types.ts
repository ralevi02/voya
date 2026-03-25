export type MemberRole = 'admin' | 'member';

export interface Trip {
  id: string;
  name: string;
  description: string;
  destination: string;
  start_date: string;
  end_date: string;
  base_currency: string;
  cover_image_url: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface TripMember {
  id: string;
  trip_id: string;
  user_id: string;
  role: MemberRole;
  joined_at: string;
}

export interface CreateTripInput {
  name: string;
  description: string;
  destination: string;
  start_date: string;
  end_date: string;
  base_currency: string;
  cover_image_url?: string | null;
}

export interface TripWithMembers extends Trip {
  members: TripMember[];
}

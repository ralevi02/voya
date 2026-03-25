import { supabase } from '@/lib/supabase';
import type { Trip, TripMember } from '../types/trip.types';
import type { CreateTripInput } from '../types/schemas';

export async function getTrips(userId: string): Promise<Trip[]> {
  const { data, error } = await supabase
    .from('trip_members')
    .select('trip_id, trips(*)')
    .eq('user_id', userId);
  if (error) throw error;
  return (data ?? []).map((row) => row.trips as unknown as Trip);
}

export async function getTripById(tripId: string): Promise<Trip> {
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('id', tripId)
    .single();
  if (error) throw error;
  return data as Trip;
}

export async function createTrip(
  input: CreateTripInput,
  userId: string
): Promise<Trip> {
  const { data, error } = await supabase
    .from('trips')
    .insert({ ...input, created_by: userId })
    .select()
    .single();
  if (error) throw error;
  return data as Trip;
}

export async function getTripMembers(
  tripId: string
): Promise<TripMember[]> {
  const { data, error } = await supabase
    .from('trip_members')
    .select('*')
    .eq('trip_id', tripId);
  if (error) throw error;
  return (data ?? []) as TripMember[];
}

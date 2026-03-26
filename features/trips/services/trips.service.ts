import { supabase } from '@/lib/supabase';
import type { Trip, TripWithMembers, TripMember } from '../types/trip.types';
import type { CreateTripInput } from '../types/trip.types';

export async function createTrip(input: CreateTripInput): Promise<string> {
  const { data, error } = await supabase.rpc('create_trip_with_member', {
    p_name: input.name,
    p_destination: input.destination,
    p_start_date: input.start_date,
    p_end_date: input.end_date,
    p_description: input.description ?? null,
    p_base_currency: input.base_currency ?? 'USD',
    p_cover_image: input.cover_image ?? null,
  });
  if (error) throw error;
  return data as string;
}

export async function getUserTrips(
  userId: string,
): Promise<TripWithMembers[]> {
  const { data, error } = await supabase
    .from('trips')
    .select('*, trip_members!inner(*)')
    .eq('trip_members.user_id', userId)
    .order('start_date', { ascending: false });
  if (error) throw error;
  return (data ?? []) as TripWithMembers[];
}

export async function getTripById(
  tripId: string,
): Promise<TripWithMembers> {
  const { data, error } = await supabase
    .from('trips')
    .select('*, trip_members(*)')
    .eq('id', tripId)
    .single();
  if (error) throw error;
  return data as TripWithMembers;
}

export async function getTripMembers(
  tripId: string,
): Promise<TripMember[]> {
  const { data, error } = await supabase
    .from('trip_members')
    .select('*')
    .eq('trip_id', tripId);
  if (error) throw error;
  return (data ?? []) as TripMember[];
}

import { supabase } from '@/lib/supabase';
import type { TravelObject } from '../types/itinerary.types';
import type { CreateTravelObjectInput } from '../types/schemas';

export async function getTravelObjects(
  tripId: string
): Promise<TravelObject[]> {
  const { data, error } = await supabase
    .from('travel_objects')
    .select('*')
    .eq('trip_id', tripId)
    .order('start_time', { ascending: true });
  if (error) throw error;
  return (data ?? []) as TravelObject[];
}

export async function createTravelObject(
  input: CreateTravelObjectInput
): Promise<TravelObject> {
  const { data, error } = await supabase
    .from('travel_objects')
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data as TravelObject;
}

export async function deleteTravelObject(id: string): Promise<void> {
  const { error } = await supabase
    .from('travel_objects')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

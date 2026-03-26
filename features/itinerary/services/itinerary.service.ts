import { supabase } from '@/lib/supabase';
import type {
  ItineraryItem,
  CreateItineraryItemInput,
} from '../types/itinerary.types';

export async function getItineraryItems(
  tripId: string,
): Promise<ItineraryItem[]> {
  const { data, error } = await supabase
    .from('itinerary_items')
    .select('*')
    .eq('trip_id', tripId)
    .order('start_time', { ascending: true });
  if (error) throw error;
  return (data ?? []) as ItineraryItem[];
}

export async function createItineraryItem(
  input: CreateItineraryItemInput,
): Promise<ItineraryItem> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No autenticado');

  const { data, error } = await supabase
    .from('itinerary_items')
    .insert({ ...input, created_by: user.id })
    .select()
    .single();
  if (error) throw error;
  return data as ItineraryItem;
}

export async function updateItineraryItem(
  id: string,
  updates: Partial<ItineraryItem>,
): Promise<ItineraryItem> {
  const { data, error } = await supabase
    .from('itinerary_items')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as ItineraryItem;
}

export async function deleteItineraryItem(
  id: string,
): Promise<void> {
  const { error } = await supabase
    .from('itinerary_items')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

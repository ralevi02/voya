import { supabase } from '@/lib/supabase';
import type {
  TravelDocument,
  CreateDocumentInput,
} from '../types/vault.types';

export async function getTripDocuments(
  tripId: string,
): Promise<TravelDocument[]> {
  const { data, error } = await supabase
    .from('travel_documents')
    .select('*')
    .eq('trip_id', tripId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as TravelDocument[];
}

export async function getDocumentsByItem(
  itemId: string,
): Promise<TravelDocument[]> {
  const { data, error } = await supabase
    .from('travel_documents')
    .select('*')
    .eq('associated_itinerary_item_id', itemId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as TravelDocument[];
}

export async function createDocument(
  input: CreateDocumentInput,
): Promise<TravelDocument> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No autenticado');

  const { data, error } = await supabase
    .from('travel_documents')
    .insert({ ...input, owner_id: user.id })
    .select()
    .single();
  if (error) throw error;
  return data as TravelDocument;
}

export async function deleteDocument(
  id: string,
): Promise<void> {
  const { error } = await supabase
    .from('travel_documents')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

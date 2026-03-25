import { supabase } from '@/lib/supabase';
import type { VaultDocument } from '../types/vault.types';
import type { CreateDocumentInput } from '../types/schemas';

export async function getDocumentsByUser(
  userId: string
): Promise<VaultDocument[]> {
  const { data, error } = await supabase
    .from('vault_documents')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as VaultDocument[];
}

export async function getDocumentsByTrip(
  tripId: string
): Promise<VaultDocument[]> {
  const { data, error } = await supabase
    .from('vault_documents')
    .select('*')
    .eq('trip_id', tripId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as VaultDocument[];
}

export async function createDocument(
  input: CreateDocumentInput,
  userId: string
): Promise<VaultDocument> {
  const { data, error } = await supabase
    .from('vault_documents')
    .insert({ ...input, user_id: userId })
    .select()
    .single();
  if (error) throw error;
  return data as VaultDocument;
}

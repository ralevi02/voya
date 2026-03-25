import { supabase } from '@/lib/supabase';
import type { MediaItem } from '../types/album.types';
import type { UploadMediaInput } from '../types/schemas';

export async function getMediaByTrip(
  tripId: string
): Promise<MediaItem[]> {
  const { data, error } = await supabase
    .from('media_items')
    .select('*')
    .eq('trip_id', tripId)
    .order('taken_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as MediaItem[];
}

export async function uploadMedia(
  input: UploadMediaInput,
  userId: string
): Promise<MediaItem> {
  const { data, error } = await supabase
    .from('media_items')
    .insert({ ...input, user_id: userId })
    .select()
    .single();
  if (error) throw error;
  return data as MediaItem;
}

export async function deleteMedia(id: string): Promise<void> {
  const { error } = await supabase
    .from('media_items')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

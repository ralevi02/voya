import { supabase } from '@/lib/supabase';
import { Platform } from 'react-native';

const BUCKET = 'vault';

/**
 * Sube un archivo al bucket vault de Supabase Storage.
 * Retorna la URL pública del archivo.
 */
export async function uploadFile(
  tripId: string,
  fileName: string,
  fileUri: string,
  mimeType: string,
): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No autenticado');

  const path = `${user.id}/${tripId}/${Date.now()}_${fileName}`;

  if (Platform.OS === 'web') {
    const response = await fetch(fileUri);
    const blob = await response.blob();
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, blob, { contentType: mimeType });
    if (error) throw error;
  } else {
    const response = await fetch(fileUri);
    const blob = await response.blob();
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, blob, { contentType: mimeType });
    if (error) throw error;
  }

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(path);

  return data.publicUrl;
}

/**
 * Elimina un archivo del bucket vault.
 */
export async function deleteFile(fileUrl: string): Promise<void> {
  const path = fileUrl.split(`${BUCKET}/`)[1];
  if (!path) return;
  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([path]);
  if (error) throw error;
}

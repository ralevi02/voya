import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as DocumentPicker from 'expo-document-picker';
import { QUERY_KEYS } from '@/shared/constants/config';
import { uploadFile } from '../services/storage.service';
import { createDocument } from '../services/vault.service';
import { createDocumentSchema } from '../types/schemas';
import { MAX_FILE_SIZE_BYTES } from '../types/schemas';
import type { DocType } from '../types/vault.types';

interface UploadParams {
  tripId: string;
  docType: DocType;
  name: string;
  itemId?: string | null;
}

export function useUploadDocument(tripId: string) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (params: UploadParams) => {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets?.[0]) {
        throw new Error('Selección cancelada');
      }

      const asset = result.assets[0];

      if (asset.size && asset.size > MAX_FILE_SIZE_BYTES) {
        throw new Error('Archivo muy grande (máx 10MB)');
      }

      const fileUrl = await uploadFile(
        params.tripId,
        asset.name,
        asset.uri,
        asset.mimeType ?? 'application/octet-stream',
      );

      const input = {
        trip_id: params.tripId,
        name: params.name || asset.name,
        doc_type: params.docType,
        file_url: fileUrl,
        file_size: asset.size ?? null,
        mime_type: asset.mimeType ?? null,
        associated_itinerary_item_id: params.itemId ?? null,
      };

      createDocumentSchema.parse(input);
      return createDocument(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.vaultTrip(tripId),
      });
    },
    onError: (err: Error) => setError(err.message),
  });

  const upload = useCallback(
    (params: UploadParams) => {
      setError(null);
      mutation.mutate(params);
    },
    [mutation],
  );

  return {
    upload,
    error,
    isUploading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}

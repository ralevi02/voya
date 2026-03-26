import { useCallback } from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { Image } from 'expo-image';
import * as Sharing from 'expo-sharing';
import { ExternalLink, Download } from 'lucide-react-native';
import { useCachedDocument } from '../hooks/use-cached-document';
import type { TravelDocument } from '../types/vault.types';

interface DocumentViewerProps {
  document: TravelDocument;
}

export function DocumentViewer({ document }: DocumentViewerProps) {
  const { localUri, isDownloading, progress } = useCachedDocument(
    document.file_url,
  );

  const isImage = document.mime_type?.startsWith('image/');
  const isPdf = document.mime_type?.includes('pdf');

  const handleOpen = useCallback(async () => {
    if (!localUri) return;

    if (Platform.OS === 'web') {
      window.open(localUri, '_blank');
      return;
    }

    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      await Sharing.shareAsync(localUri, {
        mimeType: document.mime_type ?? undefined,
        dialogTitle: document.name,
      });
    }
  }, [localUri, document]);

  if (isDownloading) {
    return (
      <View className="h-48 rounded-xl bg-neutral-100 items-center justify-center">
        <Download size={24} color="#A3A3A3" />
        <Text className="text-sm text-neutral-400 mt-2">
          Descargando... {Math.round(progress * 100)}%
        </Text>
      </View>
    );
  }

  if (isImage && localUri) {
    return (
      <Pressable onPress={handleOpen}>
        <Image
          source={{ uri: localUri }}
          style={{ height: 240, borderRadius: 12 }}
          contentFit="cover"
        />
        <Text className="text-xs text-primary-600 text-center mt-2">
          Toca para ampliar
        </Text>
      </Pressable>
    );
  }

  if (isPdf) {
    return (
      <Pressable
        className="h-48 rounded-xl bg-neutral-50 border border-neutral-200 items-center justify-center gap-2"
        onPress={handleOpen}
      >
        <ExternalLink size={28} color="#4F46E5" />
        <Text className="text-sm font-medium text-primary-600">
          Abrir PDF
        </Text>
        <Text className="text-xs text-neutral-400">
          Se abrirá con el visor del sistema
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      className="h-32 rounded-xl bg-neutral-50 border border-neutral-200 items-center justify-center gap-2"
      onPress={handleOpen}
    >
      <ExternalLink size={24} color="#737373" />
      <Text className="text-sm text-neutral-500">
        Abrir archivo
      </Text>
    </Pressable>
  );
}

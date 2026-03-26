import { useState, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

interface CacheState {
  localUri: string | null;
  isDownloading: boolean;
  progress: number;
  error: string | null;
}

/**
 * Descarga y cachea un documento para acceso offline.
 * En web, retorna directamente la URL remota.
 */
export function useCachedDocument(remoteUrl: string | null) {
  const [state, setState] = useState<CacheState>({
    localUri: null,
    isDownloading: false,
    progress: 0,
    error: null,
  });

  const download = useCallback(async () => {
    if (!remoteUrl) return;

    if (Platform.OS === 'web') {
      setState({ localUri: remoteUrl, isDownloading: false, progress: 1, error: null });
      return;
    }

    const fileName = remoteUrl.split('/').pop() ?? 'file';
    const localPath = `${FileSystem.cacheDirectory}vault_${fileName}`;

    try {
      const info = await FileSystem.getInfoAsync(localPath);
      if (info.exists) {
        setState({ localUri: localPath, isDownloading: false, progress: 1, error: null });
        return;
      }

      setState((s) => ({ ...s, isDownloading: true, progress: 0 }));

      const callback: FileSystem.FileSystemNetworkTaskProgressCallback<FileSystem.DownloadProgressData> = (dp) => {
        if (dp.totalBytesExpectedToWrite > 0) {
          const pct = dp.totalBytesWritten / dp.totalBytesExpectedToWrite;
          setState((s) => ({ ...s, progress: pct }));
        }
      };

      const download = FileSystem.createDownloadResumable(
        remoteUrl, localPath, {}, callback,
      );
      const result = await download.downloadAsync();

      if (result?.uri) {
        setState({ localUri: result.uri, isDownloading: false, progress: 1, error: null });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al descargar';
      setState({ localUri: null, isDownloading: false, progress: 0, error: msg });
    }
  }, [remoteUrl]);

  useEffect(() => {
    download();
  }, [download]);

  return state;
}

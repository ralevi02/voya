import { useState, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';
import { processReceipt } from '../services/receipt.service';
import type { ReceiptData } from '../types/ai.types';

interface ScanState {
  isScanning: boolean;
  data: ReceiptData | null;
  error: string | null;
}

export function useScanReceipt() {
  const [state, setState] = useState<ScanState>({
    isScanning: false,
    data: null,
    error: null,
  });

  const scan = useCallback(async () => {
    try {
      setState({ isScanning: true, data: null, error: null });

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.7,
        base64: Platform.OS === 'web',
      });

      if (result.canceled || !result.assets?.[0]) {
        setState((s) => ({ ...s, isScanning: false }));
        return;
      }

      const asset = result.assets[0];
      let base64: string;

      if (asset.base64) {
        base64 = asset.base64;
      } else {
        base64 = await FileSystem.readAsStringAsync(
          asset.uri,
          { encoding: FileSystem.EncodingType.Base64 },
        );
      }

      const data = await processReceipt(base64);
      setState({ isScanning: false, data, error: null });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al escanear';
      setState({ isScanning: false, data: null, error: msg });
    }
  }, []);

  const reset = useCallback(() => {
    setState({ isScanning: false, data: null, error: null });
  }, []);

  return { ...state, scan, reset };
}

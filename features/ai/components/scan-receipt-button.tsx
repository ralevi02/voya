import { View, Text, Pressable } from 'react-native';
import { Camera, Loader2 } from 'lucide-react-native';
import { useScanReceipt } from '../hooks/use-scan-receipt';
import type { ReceiptData } from '../types/ai.types';

interface ScanReceiptButtonProps {
  onResult: (data: ReceiptData) => void;
}

export function ScanReceiptButton({ onResult }: ScanReceiptButtonProps) {
  const { isScanning, error, scan, data, reset } = useScanReceipt();

  if (data) {
    onResult(data);
    reset();
  }

  return (
    <View>
      <Pressable
        className={`flex-row items-center justify-center gap-2 py-3 rounded-xl border ${
          isScanning
            ? 'border-primary-300 bg-primary-50'
            : 'border-dashed border-neutral-300'
        }`}
        onPress={scan}
        disabled={isScanning}
      >
        {isScanning ? (
          <>
            <Loader2 size={16} color="#4F46E5" />
            <Text className="text-sm text-primary-600 font-medium">
              Analizando boleta...
            </Text>
          </>
        ) : (
          <>
            <Camera size={16} color="#4F46E5" />
            <Text className="text-sm text-primary-600 font-medium">
              Escanear boleta con IA
            </Text>
          </>
        )}
      </Pressable>

      {isScanning && <SkeletonFeedback />}

      {error && (
        <Text className="text-xs text-red-500 mt-2 text-center">
          {error}
        </Text>
      )}
    </View>
  );
}

/** Skeleton feedback while AI processes */
function SkeletonFeedback() {
  return (
    <View className="mt-3 gap-2">
      <View className="h-4 w-24 bg-neutral-200 rounded animate-pulse" />
      <View className="h-10 bg-neutral-100 rounded-xl animate-pulse" />
      <View className="h-4 w-32 bg-neutral-200 rounded animate-pulse" />
      <View className="h-10 bg-neutral-100 rounded-xl animate-pulse" />
    </View>
  );
}

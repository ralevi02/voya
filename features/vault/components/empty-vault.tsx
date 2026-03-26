import { View, Text } from 'react-native';
import { FolderOpen } from 'lucide-react-native';
import { Button } from '@/shared/components/ui/button';

interface EmptyVaultProps {
  onAdd: () => void;
}

export function EmptyVault({ onAdd }: EmptyVaultProps) {
  return (
    <View className="flex-1 items-center justify-center px-8 gap-4">
      <View className="rounded-full bg-primary-50 p-5">
        <FolderOpen size={40} color="#4F46E5" />
      </View>

      <Text className="text-xl font-bold text-neutral-900 text-center">
        Sin documentos
      </Text>

      <Text className="text-base text-neutral-500 text-center">
        Guarda pasaportes, boletos, seguros y
        reservas para tenerlos siempre a mano
      </Text>

      <View className="w-full mt-2">
        <Button
          title="Subir primer documento"
          onPress={onAdd}
        />
      </View>
    </View>
  );
}

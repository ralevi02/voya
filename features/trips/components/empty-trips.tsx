import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Plane } from 'lucide-react-native';
import { Button } from '@/shared/components/ui/button';

export function EmptyTrips() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center px-8 gap-4">
      <View className="rounded-full bg-primary-50 p-5">
        <Plane size={40} color="#4F46E5" />
      </View>

      <Text className="text-xl font-bold text-neutral-900 text-center">
        No tienes viajes aún
      </Text>

      <Text className="text-base text-neutral-500 text-center">
        Crea tu primer viaje y comienza a planificar tu próxima aventura
      </Text>

      <View className="w-full mt-2">
        <Button
          title="Crear mi primer viaje"
          onPress={() => router.push('/trip/create')}
        />
      </View>
    </View>
  );
}

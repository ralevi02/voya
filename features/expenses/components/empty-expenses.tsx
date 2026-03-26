import { View, Text } from 'react-native';
import { Receipt } from 'lucide-react-native';
import { Button } from '@/shared/components/ui/button';

interface EmptyExpensesProps {
  onAdd: () => void;
}

export function EmptyExpenses({ onAdd }: EmptyExpensesProps) {
  return (
    <View className="flex-1 items-center justify-center px-8 gap-4">
      <View className="rounded-full bg-primary-50 p-5">
        <Receipt size={40} color="#4F46E5" />
      </View>

      <Text className="text-xl font-bold text-neutral-900 text-center">
        Sin gastos registrados
      </Text>

      <Text className="text-base text-neutral-500 text-center">
        Registra el primer gasto del viaje y mantén las cuentas claras
      </Text>

      <View className="w-full mt-2">
        <Button
          title="Agregar primer gasto"
          onPress={onAdd}
        />
      </View>
    </View>
  );
}

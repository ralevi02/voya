import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Global expenses dashboard.
 * Shows debt summary across ALL trips when no trip is selected.
 * Within a trip context (trip/[id]/expenses), shows trip-specific expenses.
 */
export default function ExpensesDashboardScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Gastos</Text>
        <Text style={{ fontSize: 14, color: '#737373', marginTop: 4 }}>
          Resumen global de deudas y gastos
        </Text>
      </View>
    </SafeAreaView>
  );
}

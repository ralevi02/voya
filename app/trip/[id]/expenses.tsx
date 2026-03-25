import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function TripExpensesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        Gastos del viaje
      </Text>
      <Text style={{ fontSize: 14, color: '#737373', marginTop: 4 }}>
        Trip ID: {id}
      </Text>
    </View>
  );
}

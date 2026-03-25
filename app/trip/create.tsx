import { View, Text } from 'react-native';

export default function CreateTripScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Nuevo Viaje</Text>
      <Text style={{ fontSize: 14, color: '#737373', marginTop: 4 }}>
        Crea un nuevo viaje con tu grupo
      </Text>
    </View>
  );
}

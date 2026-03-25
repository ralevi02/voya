import { View, Text } from 'react-native';

export default function RegisterScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Crear Cuenta</Text>
      <Text style={{ fontSize: 16, color: '#737373', marginTop: 8 }}>
        Register Screen
      </Text>
    </View>
  );
}

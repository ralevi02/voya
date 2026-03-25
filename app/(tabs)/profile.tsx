import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Perfil</Text>
        <Text style={{ fontSize: 14, color: '#737373', marginTop: 4 }}>
          Tu cuenta y configuración
        </Text>
      </View>
    </SafeAreaView>
  );
}

import { View, Text } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Voya</Text>
      <Text style={{ fontSize: 16, color: '#737373', marginTop: 8 }}>
        Login Screen
      </Text>
    </View>
  );
}

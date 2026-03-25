import { View, Text, Pressable } from 'react-native';

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorView({
  message = 'Algo salió mal',
  onRetry,
}: ErrorViewProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <Text style={{ fontSize: 16, color: '#525252', textAlign: 'center', marginBottom: 16 }}>
        {message}
      </Text>
      {onRetry && (
        <Pressable
          onPress={onRetry}
          style={{
            backgroundColor: '#6366F1',
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>
            Reintentar
          </Text>
        </Pressable>
      )}
    </View>
  );
}

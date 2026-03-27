import { Stack } from 'expo-router';

export default function TripDetailLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="itinerary" />
      <Stack.Screen name="expenses" />
      <Stack.Screen name="vault" />
      <Stack.Screen name="chat" />
      <Stack.Screen name="vote" options={{ title: 'Votaciones', headerShown: true }} />
      <Stack.Screen name="album" options={{ title: 'Álbum', headerShown: true }} />
    </Stack>
  );
}

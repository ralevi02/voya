import { Stack } from 'expo-router';

export default function TripDetailLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Itinerario' }}
      />
      <Stack.Screen
        name="expenses"
        options={{ title: 'Gastos del viaje' }}
      />
      <Stack.Screen
        name="vote"
        options={{ title: 'Votaciones' }}
      />
      <Stack.Screen
        name="vault"
        options={{ title: 'Documentos' }}
      />
      <Stack.Screen
        name="album"
        options={{ title: 'Álbum' }}
      />
    </Stack>
  );
}

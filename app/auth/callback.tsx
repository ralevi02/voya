import { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackScreen() {
  const router = useRouter();

  useEffect(() => {
    // Supabase auto-detects tokens from the URL hash
    // (detectSessionInUrl: true). We just wait for the session
    // to be established, then redirect.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === 'SIGNED_IN') {
          router.replace('/(tabs)');
        }
      },
    );

    // Fallback: if session already exists, redirect immediately
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('/(tabs)');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color="#4F46E5" />
      <Text className="mt-4 text-neutral-500">Autenticando...</Text>
    </View>
  );
}

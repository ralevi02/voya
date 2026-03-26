import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { FormError } from '@/shared/components/ui/form-error';
import { Divider } from '@/shared/components/ui/divider';
import { useLogin } from '@/features/auth/hooks/use-login';
import { useGoogleAuth } from '@/features/auth/hooks/use-google-auth';
import { GoogleIcon } from '@/shared/components/icons/google-icon';

export default function LoginScreen() {
  const login = useLogin();
  const google = useGoogleAuth();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1 justify-center px-6">
          <View className="mb-10">
            <Text className="text-4xl font-bold text-neutral-900">
              Voya
            </Text>
            <Text className="mt-2 text-lg text-neutral-500">
              Inicia sesión para continuar
            </Text>
          </View>

          <View className="gap-4">
            <FormError message={login.formError || google.error} />

            <Button
              title="Continuar con Google"
              variant="outline"
              icon={<GoogleIcon size={20} />}
              onPress={google.handleGoogleSignIn}
              isLoading={google.isLoading}
            />

            <Divider text="o" />

            <Input
              label="Email"
              placeholder="tu@email.com"
              value={login.email}
              onChangeText={login.setEmail}
              error={login.fieldErrors.email}
              keyboardType="email-address"
              autoComplete="email"
            />

            <Input
              label="Contraseña"
              placeholder="••••••••"
              value={login.password}
              onChangeText={login.setPassword}
              error={login.fieldErrors.password}
              isPassword
            />

            <Button
              title="Iniciar Sesión"
              onPress={login.handleLogin}
              isLoading={login.isLoading}
            />
          </View>

          <View className="mt-6 flex-row justify-center gap-1">
            <Text className="text-neutral-500">¿No tienes cuenta?</Text>
            <Link href="/(auth)/register">
              <Text className="font-semibold text-primary-600">
                Regístrate
              </Text>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

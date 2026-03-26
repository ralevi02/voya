import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { FormError } from '@/shared/components/ui/form-error';
import { Divider } from '@/shared/components/ui/divider';
import { useRegister } from '@/features/auth/hooks/use-register';
import { useGoogleAuth } from '@/features/auth/hooks/use-google-auth';
import { GoogleIcon } from '@/shared/components/icons/google-icon';

export default function RegisterScreen() {
  const register = useRegister();
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
              Crear Cuenta
            </Text>
            <Text className="mt-2 text-lg text-neutral-500">
              Únete a Voya y planifica tu próximo viaje
            </Text>
          </View>

          <View className="gap-4">
            <FormError message={register.formError || google.error} />

            <Button
              title="Continuar con Google"
              variant="outline"
              icon={<GoogleIcon size={20} />}
              onPress={google.handleGoogleSignIn}
              isLoading={google.isLoading}
            />

            <Divider text="o" />

            <Input
              label="Nombre"
              placeholder="Tu nombre"
              value={register.displayName}
              onChangeText={register.setDisplayName}
              error={register.fieldErrors.display_name}
              autoComplete="name"
            />

            <Input
              label="Email"
              placeholder="tu@email.com"
              value={register.email}
              onChangeText={register.setEmail}
              error={register.fieldErrors.email}
              keyboardType="email-address"
              autoComplete="email"
            />

            <Input
              label="Contraseña"
              placeholder="Mínimo 6 caracteres"
              value={register.password}
              onChangeText={register.setPassword}
              error={register.fieldErrors.password}
              isPassword
            />

            <Button
              title="Crear Cuenta"
              onPress={register.handleRegister}
              isLoading={register.isLoading}
            />
          </View>

          <View className="mt-6 flex-row justify-center gap-1">
            <Text className="text-neutral-500">¿Ya tienes cuenta?</Text>
            <Link href="/(auth)/login">
              <Text className="font-semibold text-primary-600">
                Inicia Sesión
              </Text>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

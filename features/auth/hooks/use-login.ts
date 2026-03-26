import { useState } from 'react';
import { useRouter } from 'expo-router';
import { loginSchema } from '../types/schemas';
import { signIn } from '../services/auth.service';

interface FieldErrors {
  email?: string;
  password?: string;
}

export function useLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function clearErrors() {
    setFormError(null);
    setFieldErrors({});
  }

  async function handleLogin() {
    clearErrors();

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const errors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FieldErrors;
        errors[field] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      await signIn(result.data.email, result.data.password);
      router.replace('/(tabs)');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Error al iniciar sesión';
      setFormError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    formError,
    fieldErrors,
    handleLogin,
  };
}

import { useState } from 'react';
import { useRouter } from 'expo-router';
import { registerSchema } from '../types/schemas';
import { signUp } from '../services/auth.service';

interface FieldErrors {
  email?: string;
  password?: string;
  display_name?: string;
}

export function useRegister() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function clearErrors() {
    setFormError(null);
    setFieldErrors({});
  }

  async function handleRegister() {
    clearErrors();

    const result = registerSchema.safeParse({
      email,
      password,
      display_name: displayName,
    });
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
      await signUp(
        result.data.email,
        result.data.password,
        result.data.display_name
      );
      router.replace('/(tabs)');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Error al crear la cuenta';
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
    displayName,
    setDisplayName,
    isLoading,
    formError,
    fieldErrors,
    handleRegister,
  };
}

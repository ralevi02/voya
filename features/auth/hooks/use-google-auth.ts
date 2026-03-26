import { useState } from 'react';
import { signInWithGoogle } from '../services/google-auth.service';

export function useGoogleAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGoogleSignIn() {
    setError(null);
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Error con Google';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, error, handleGoogleSignIn };
}

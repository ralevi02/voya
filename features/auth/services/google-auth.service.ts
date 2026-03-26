import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from '@/lib/supabase';
import { Platform } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const redirectUri = makeRedirectUri({
  scheme: 'voya',
  path: 'auth/callback',
});

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUri,
      skipBrowserRedirect: Platform.OS !== 'web',
    },
  });

  if (error) throw error;

  // On web, Supabase handles the redirect automatically.
  // On native, we need to open the URL in an in-app browser.
  if (Platform.OS !== 'web' && data.url) {
    const result = await WebBrowser.openAuthSessionAsync(
      data.url,
      redirectUri,
    );

    if (result.type !== 'success' || !('url' in result)) {
      throw new Error('Autenticación cancelada');
    }

    // Extract tokens from the callback URL hash
    const url = new URL(result.url);
    const params = new URLSearchParams(
      url.hash.replace('#', '?').slice(1),
    );
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (!accessToken || !refreshToken) {
      throw new Error('No se recibieron tokens de autenticación');
    }

    const { error: sessionError } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (sessionError) throw sessionError;
  }
}

export function getRedirectUri() {
  return redirectUri;
}

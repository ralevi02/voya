import { supabase } from '@/lib/supabase';
import { FALLBACK_RATES } from '../constants/currencies';

const API_URL = 'https://api.frankfurter.app/latest?from=USD';

/**
 * Intenta obtener tasas frescas de la API.
 * Si falla, intenta leer del caché de Supabase.
 * Si todo falla, retorna las tasas de fallback.
 */
export async function fetchExchangeRates(): Promise<
  Record<string, number>
> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    const rates: Record<string, number> = { USD: 1 };
    for (const [code, rate] of Object.entries(data.rates)) {
      rates[code] = rate as number;
    }
    await cacheRatesToSupabase(rates);
    return rates;
  } catch {
    return fetchCachedRates();
  }
}

async function fetchCachedRates(): Promise<
  Record<string, number>
> {
  try {
    const { data, error } = await supabase
      .from('exchange_rates')
      .select('target_currency, rate')
      .eq('base_currency', 'USD');
    if (error || !data?.length) return FALLBACK_RATES;
    const rates: Record<string, number> = { USD: 1 };
    for (const row of data) {
      rates[row.target_currency] = Number(row.rate);
    }
    return rates;
  } catch {
    return FALLBACK_RATES;
  }
}

async function cacheRatesToSupabase(
  rates: Record<string, number>,
): Promise<void> {
  try {
    const rows = Object.entries(rates)
      .filter(([code]) => code !== 'USD')
      .map(([code, rate]) => ({
        base_currency: 'USD',
        target_currency: code,
        rate,
        fetched_at: new Date().toISOString(),
      }));
    await supabase
      .from('exchange_rates')
      .upsert(rows, {
        onConflict: 'base_currency,target_currency',
      });
  } catch {
    // Silently fail — cache is best-effort
  }
}

export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
}

export const POPULAR_CURRENCIES: CurrencyInfo[] = [
  { code: 'USD', name: 'Dólar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'CLP', name: 'Peso Chileno', symbol: '$' },
  { code: 'PEN', name: 'Sol Peruano', symbol: 'S/' },
  { code: 'ARS', name: 'Peso Argentino', symbol: '$' },
  { code: 'BRL', name: 'Real', symbol: 'R$' },
  { code: 'MXN', name: 'Peso Mexicano', symbol: '$' },
  { code: 'COP', name: 'Peso Colombiano', symbol: '$' },
  { code: 'GBP', name: 'Libra', symbol: '£' },
  { code: 'JPY', name: 'Yen', symbol: '¥' },
];

/**
 * Tasas de fallback estáticas (vs USD).
 * Último recurso si no hay red ni caché.
 */
export const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  CLP: 950,
  PEN: 3.72,
  ARS: 890,
  BRL: 4.95,
  MXN: 17.2,
  COP: 3950,
  GBP: 0.79,
  JPY: 150,
};

export function getCurrencySymbol(code: string): string {
  const found = POPULAR_CURRENCIES.find((c) => c.code === code);
  return found?.symbol ?? code;
}

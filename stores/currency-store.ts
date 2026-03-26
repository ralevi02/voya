import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storage } from '@/lib/storage';
import { FALLBACK_RATES } from '@/features/expenses/constants/currencies';

interface CurrencyStore {
  rates: Record<string, number>;
  lastSyncedAt: string | null;
  setRates: (rates: Record<string, number>) => void;
  getRate: (from: string, to: string) => number;
  reset: () => void;
}

const initialState = {
  rates: FALLBACK_RATES,
  lastSyncedAt: null as string | null,
};

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setRates: (rates) =>
        set({
          rates: { ...FALLBACK_RATES, ...rates },
          lastSyncedAt: new Date().toISOString(),
        }),

      /**
       * Calcula tasa de conversión: from → to.
       * Todas las tasas almacenadas son vs USD.
       * from→to = rateTO / rateFROM
       */
      getRate: (from: string, to: string) => {
        if (from === to) return 1;
        const { rates } = get();
        const fromRate = rates[from] ?? 1;
        const toRate = rates[to] ?? 1;
        return toRate / fromRate;
      },

      reset: () => set(initialState),
    }),
    {
      name: 'voya-currency',
      storage: createJSONStorage(() => storage),
    },
  ),
);

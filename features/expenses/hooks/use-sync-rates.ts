import { useEffect, useRef } from 'react';
import { useCurrencyStore } from '@/stores/currency-store';
import { fetchExchangeRates } from '../services/currency.service';

const SYNC_INTERVAL_MS = 6 * 60 * 60 * 1000; // 6 horas

/**
 * Sincroniza tasas de cambio al montar y cada 6 horas.
 * Si no hay red, mantiene las tasas cacheadas.
 */
export function useSyncRates() {
  const setRates = useCurrencyStore((s) => s.setRates);
  const lastSynced = useCurrencyStore((s) => s.lastSyncedAt);
  const syncing = useRef(false);

  useEffect(() => {
    async function sync() {
      if (syncing.current) return;
      const now = Date.now();
      const last = lastSynced ? new Date(lastSynced).getTime() : 0;
      if (now - last < SYNC_INTERVAL_MS) return;

      syncing.current = true;
      try {
        const rates = await fetchExchangeRates();
        setRates(rates);
      } finally {
        syncing.current = false;
      }
    }
    sync();
  }, [lastSynced, setRates]);
}

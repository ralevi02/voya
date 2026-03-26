import type { SplitInput } from '../types/expense.types';

/**
 * Largest Remainder Method para dividir un monto equitativamente.
 * Trabaja internamente en centavos (enteros) para evitar
 * errores de punto flotante.
 *
 * @param totalAmount - Monto total en decimal (ej: 100.00)
 * @param userIds - IDs de los usuarios entre quienes se divide
 * @param payerId - ID del pagador (recibe el centavo extra)
 * @returns Array de SplitInput con la suma exacta = totalAmount
 */
export function calculateEqualSplits(
  totalAmount: number,
  userIds: string[],
  payerId: string,
): SplitInput[] {
  if (userIds.length === 0) return [];

  const totalCents = Math.round(totalAmount * 100);
  const count = userIds.length;
  const baseCents = Math.floor(totalCents / count);
  const remainder = totalCents - baseCents * count;

  // Ordenar: el pagador primero para recibir centavos extras
  const sorted = [...userIds].sort((a, b) => {
    if (a === payerId) return -1;
    if (b === payerId) return 1;
    return 0;
  });

  return sorted.map((userId, index) => {
    const extra = index < remainder ? 1 : 0;
    const cents = baseCents + extra;
    return {
      user_id: userId,
      amount_owed: cents / 100,
    };
  });
}

/**
 * Valida que un array de splits manuales sume el monto total.
 * Usa comparación en centavos para evitar floating-point.
 */
export function validateSplitsTotal(
  splits: SplitInput[],
  totalAmount: number,
): boolean {
  const totalCents = Math.round(totalAmount * 100);
  const splitsCents = splits.reduce(
    (sum, s) => sum + Math.round(s.amount_owed * 100),
    0,
  );
  return splitsCents === totalCents;
}

/**
 * Redondea un monto a 2 decimales de forma segura.
 */
export function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

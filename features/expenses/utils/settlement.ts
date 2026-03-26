import type {
  ExpenseWithSplits,
  MemberBalance,
  Settlement,
} from '../types/expense.types';
import { roundCurrency } from './split-calculator';

/**
 * Calcula el balance neto de cada miembro del viaje.
 *
 * Balance = TotalPagado - TotalDebido
 * - Positivo → Le deben dinero
 * - Negativo → Debe dinero
 *
 * Todos los montos en base_amount (moneda base del viaje).
 */
export function calculateBalances(
  expenses: ExpenseWithSplits[],
  memberIds: string[],
): MemberBalance[] {
  const paid = new Map<string, number>();
  const owed = new Map<string, number>();

  for (const id of memberIds) {
    paid.set(id, 0);
    owed.set(id, 0);
  }

  for (const expense of expenses) {
    const current = paid.get(expense.paid_by) ?? 0;
    paid.set(expense.paid_by, current + expense.base_amount);

    for (const split of expense.expense_splits) {
      const splitBase = roundCurrency(
        split.amount_owed * expense.exchange_rate,
      );
      const currentOwed = owed.get(split.user_id) ?? 0;
      owed.set(split.user_id, currentOwed + splitBase);
    }
  }

  return memberIds.map((id) => {
    const totalPaid = roundCurrency(paid.get(id) ?? 0);
    const totalOwed = roundCurrency(owed.get(id) ?? 0);
    return {
      user_id: id,
      totalPaid,
      totalOwed,
      net: roundCurrency(totalPaid - totalOwed),
    };
  });
}

/**
 * Calcula la lista mínima de transferencias para saldar deudas.
 * Usa un algoritmo greedy: emparejar el mayor deudor con el
 * mayor acreedor hasta que todos queden en 0.
 */
export function calculateSettlements(
  balances: MemberBalance[],
): Settlement[] {
  const debtors: { id: string; amount: number }[] = [];
  const creditors: { id: string; amount: number }[] = [];

  for (const b of balances) {
    if (b.net < -0.01) {
      debtors.push({ id: b.user_id, amount: Math.abs(b.net) });
    } else if (b.net > 0.01) {
      creditors.push({ id: b.user_id, amount: b.net });
    }
  }

  debtors.sort((a, b) => b.amount - a.amount);
  creditors.sort((a, b) => b.amount - a.amount);

  const settlements: Settlement[] = [];
  let di = 0;
  let ci = 0;

  while (di < debtors.length && ci < creditors.length) {
    const transfer = Math.min(
      debtors[di].amount,
      creditors[ci].amount,
    );
    if (transfer > 0.01) {
      settlements.push({
        from_user_id: debtors[di].id,
        to_user_id: creditors[ci].id,
        amount: roundCurrency(transfer),
      });
    }
    debtors[di].amount -= transfer;
    creditors[ci].amount -= transfer;
    if (debtors[di].amount < 0.01) di++;
    if (creditors[ci].amount < 0.01) ci++;
  }

  return settlements;
}

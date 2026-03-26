import { View, Text, Pressable } from 'react-native';
import { CategoryIcon } from './category-icon';
import { getCurrencySymbol } from '../constants/currencies';
import { CATEGORY_CONFIG } from '../constants/categories';
import type { ExpenseWithSplits } from '../types/expense.types';
import type { ExpenseCategory } from '../types/expense.types';
import { formatDate } from '@/shared/utils/date';

interface ExpenseCardProps {
  expense: ExpenseWithSplits;
  currentUserId: string;
  baseCurrency: string;
  onPress: (expense: ExpenseWithSplits) => void;
}

export function ExpenseCard({
  expense,
  currentUserId,
  baseCurrency,
  onPress,
}: ExpenseCardProps) {
  const cat = expense.category as ExpenseCategory;
  const config = CATEGORY_CONFIG[cat] ?? CATEGORY_CONFIG.other;
  const symbol = getCurrencySymbol(baseCurrency);
  const isPayer = expense.paid_by === currentUserId;

  const mySplit = expense.expense_splits.find(
    (s) => s.user_id === currentUserId,
  );
  const myOwed = mySplit?.amount_owed ?? 0;

  return (
    <Pressable
      className="flex-row items-center bg-white rounded-xl p-3 mb-2 active:opacity-70"
      onPress={() => onPress(expense)}
    >
      <CategoryIcon category={cat} size={18} />

      <View className="flex-1 ml-3">
        <Text
          className="text-sm font-semibold text-neutral-900"
          numberOfLines={1}
        >
          {expense.title}
        </Text>
        <Text className="text-xs text-neutral-400 mt-0.5">
          {config.label} · {formatDate(expense.expense_date, 'es-CL')}
        </Text>
      </View>

      <View className="items-end">
        <Text className="text-sm font-bold text-neutral-900">
          {symbol}{expense.base_amount.toFixed(2)}
        </Text>
        {isPayer ? (
          <Text className="text-xs text-green-600 mt-0.5">
            Pagaste
          </Text>
        ) : myOwed > 0 ? (
          <Text className="text-xs text-red-500 mt-0.5">
            Debes {symbol}{myOwed.toFixed(2)}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

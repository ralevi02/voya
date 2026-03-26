import { View, Text } from 'react-native';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react-native';
import { getCurrencySymbol } from '../constants/currencies';
import type { MemberBalance } from '../types/expense.types';

interface BalanceSummaryProps {
  totalSpent: number;
  myBalance: MemberBalance | null;
  baseCurrency: string;
}

export function BalanceSummary({
  totalSpent,
  myBalance,
  baseCurrency,
}: BalanceSummaryProps) {
  const symbol = getCurrencySymbol(baseCurrency);
  const net = myBalance?.net ?? 0;
  const isPositive = net > 0.01;
  const isNegative = net < -0.01;

  return (
    <View className="flex-row gap-3 px-4">
      {/* Total gastado */}
      <View className="flex-1 bg-white rounded-xl p-4">
        <Text className="text-xs text-neutral-500 mb-1">
          Gasto total
        </Text>
        <Text className="text-xl font-bold text-neutral-900">
          {symbol}{totalSpent.toFixed(2)}
        </Text>
        <Text className="text-xs text-neutral-400 mt-0.5">
          {baseCurrency}
        </Text>
      </View>

      {/* Mi balance */}
      <View
        className={`flex-1 rounded-xl p-4 ${
          isPositive
            ? 'bg-green-50'
            : isNegative
              ? 'bg-red-50'
              : 'bg-neutral-50'
        }`}
      >
        <Text className="text-xs text-neutral-500 mb-1">
          Tu balance
        </Text>
        <View className="flex-row items-center gap-1">
          {isPositive ? (
            <TrendingUp size={16} color="#22C55E" />
          ) : isNegative ? (
            <TrendingDown size={16} color="#EF4444" />
          ) : (
            <Minus size={16} color="#737373" />
          )}
          <Text
            className={`text-xl font-bold ${
              isPositive
                ? 'text-green-600'
                : isNegative
                  ? 'text-red-500'
                  : 'text-neutral-700'
            }`}
          >
            {symbol}{Math.abs(net).toFixed(2)}
          </Text>
        </View>
        <Text
          className={`text-xs mt-0.5 ${
            isPositive
              ? 'text-green-600'
              : isNegative
                ? 'text-red-500'
                : 'text-neutral-400'
          }`}
        >
          {isPositive
            ? 'Te deben'
            : isNegative
              ? 'Debes'
              : 'Sin deudas'}
        </Text>
      </View>
    </View>
  );
}

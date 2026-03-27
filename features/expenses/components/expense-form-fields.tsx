import { View, Text, TextInput } from 'react-native';
import { CategoryPicker } from './category-picker';
import { SplitSelector } from './split-selector';
import { ScanReceiptButton } from '@/features/ai/components/scan-receipt-button';
import type { ReceiptData } from '@/features/ai/types/ai.types';
import type {
  ExpenseCategory,
  SplitMethod,
  SplitInput,
} from '../types/expense.types';

interface MemberInfo {
  user_id: string;
  label: string;
}

interface ExpenseFormFieldsProps {
  amount: string;
  currency: string;
  title: string;
  category: ExpenseCategory;
  date: string;
  splits: SplitInput[];
  method: SplitMethod;
  totalAmount: number;
  members: MemberInfo[];
  onAmountChange: (v: string) => void;
  onCurrencyChange: (v: string) => void;
  onTitleChange: (v: string) => void;
  onCategoryChange: (v: ExpenseCategory) => void;
  onDateChange: (v: string) => void;
  onMethodChange: (v: SplitMethod) => void;
  onSplitsChange: (v: SplitInput[]) => void;
  onScanResult: (data: ReceiptData) => void;
}

export function ExpenseFormFields(p: ExpenseFormFieldsProps) {
  return (
    <>
      {/* Amount + Currency */}
      <Text className="text-sm font-medium text-neutral-700 mb-1">
        Monto *
      </Text>
      <View className="flex-row gap-2 mb-4">
        <TextInput
          className="flex-1 h-12 border border-neutral-300 rounded-xl px-4 text-lg font-bold text-neutral-900"
          placeholder="0.00"
          placeholderTextColor="#A3A3A3"
          keyboardType="decimal-pad"
          value={p.amount}
          onChangeText={p.onAmountChange}
        />
        <TextInput
          className="w-20 h-12 border border-neutral-300 rounded-xl px-3 text-center text-sm font-medium text-neutral-900"
          placeholder="USD"
          placeholderTextColor="#A3A3A3"
          maxLength={3}
          autoCapitalize="characters"
          value={p.currency}
          onChangeText={p.onCurrencyChange}
        />
      </View>

      {/* Title */}
      <Text className="text-sm font-medium text-neutral-700 mb-1">
        Descripción *
      </Text>
      <TextInput
        className="h-12 border border-neutral-300 rounded-xl px-4 text-base text-neutral-900 mb-4"
        placeholder="Ej: Almuerzo en el mercado"
        placeholderTextColor="#A3A3A3"
        value={p.title}
        onChangeText={p.onTitleChange}
      />

      {/* Category */}
      <Text className="text-sm font-medium text-neutral-700 mb-2">
        Categoría
      </Text>
      <View className="mb-4">
        <CategoryPicker selected={p.category} onSelect={p.onCategoryChange} />
      </View>

      {/* Date */}
      <Text className="text-sm font-medium text-neutral-700 mb-1">
        Fecha
      </Text>
      <TextInput
        className="h-12 border border-neutral-300 rounded-xl px-4 text-base text-neutral-900 mb-4"
        placeholder="YYYY-MM-DD"
        placeholderTextColor="#A3A3A3"
        value={p.date}
        onChangeText={p.onDateChange}
      />

      {/* Splits */}
      <Text className="text-sm font-medium text-neutral-700 mb-2">
        Dividir entre
      </Text>
      <SplitSelector
        members={p.members}
        splits={p.splits}
        method={p.method}
        totalAmount={p.totalAmount}
        onMethodChange={p.onMethodChange}
        onSplitsChange={p.onSplitsChange}
      />

      {/* AI Receipt Scanner */}
      <View className="mt-6">
        <ScanReceiptButton onResult={p.onScanResult} />
      </View>
    </>
  );
}

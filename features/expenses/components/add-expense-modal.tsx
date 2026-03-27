import { useState, useEffect, useCallback } from 'react';
import {
  View, Text, Modal, Pressable, ScrollView,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { X } from 'lucide-react-native';
import { Button } from '@/shared/components/ui/button';
import { ExpenseFormFields } from './expense-form-fields';
import { useCreateExpense } from '../hooks/use-create-expense';
import { useCurrencyStore } from '@/stores/currency-store';
import { calculateEqualSplits, roundCurrency } from '../utils/split-calculator';
import type { ReceiptData } from '@/features/ai/types/ai.types';
import type {
  ExpenseCategory, SplitMethod, SplitInput,
} from '../types/expense.types';

interface AddExpenseModalProps {
  tripId: string;
  baseCurrency: string;
  members: { user_id: string; label: string }[];
  currentUserId: string;
  visible: boolean;
  onClose: () => void;
}

export function AddExpenseModal({
  tripId, baseCurrency, members, currentUserId, visible, onClose,
}: AddExpenseModalProps) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState(baseCurrency);
  const [category, setCategory] = useState<ExpenseCategory>('food');
  const [method, setMethod] = useState<SplitMethod>('equal');
  const [splits, setSplits] = useState<SplitInput[]>([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const getRate = useCurrencyStore((s) => s.getRate);
  const { submit, isSubmitting, isSuccess, formError, reset } =
    useCreateExpense(tripId);
  const numAmount = parseFloat(amount) || 0;

  useEffect(() => {
    if (method === 'equal' && numAmount > 0) {
      const ids = members.map((m) => m.user_id);
      setSplits(calculateEqualSplits(numAmount, ids, currentUserId));
    }
  }, [numAmount, members, method, currentUserId]);

  const handleMethodChange = useCallback((m: SplitMethod) => {
    setMethod(m);
    if (m === 'equal' && numAmount > 0) {
      const ids = members.map((mem) => mem.user_id);
      setSplits(calculateEqualSplits(numAmount, ids, currentUserId));
    }
  }, [numAmount, members, currentUserId]);

  useEffect(() => {
    if (isSuccess) {
      setTitle(''); setAmount(''); setCategory('food');
      setMethod('equal'); setSplits([]); reset(); onClose();
    }
  }, [isSuccess, onClose, reset]);

  function handleScanResult(data: ReceiptData) {
    setAmount(data.amount.toString());
    setTitle(data.merchant);
    setCategory(data.category);
    if (data.currency) setCurrency(data.currency);
    if (data.date) setDate(data.date);
  }

  function handleSubmit() {
    const rate = getRate(baseCurrency, currency);
    const exchangeRate = roundCurrency(1 / rate);
    const baseAmount = roundCurrency(numAmount * exchangeRate);
    submit({
      trip_id: tripId, title, amount: numAmount, currency,
      exchange_rate: exchangeRate, base_amount: baseAmount,
      category, expense_date: date, splits,
    });
  }

  return (
    <Modal visible={visible} animationType="slide"
      presentationStyle="pageSheet" onRequestClose={onClose}>
      <KeyboardAvoidingView className="flex-1 bg-white"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View className="flex-row items-center justify-between px-6 pt-4 pb-3 border-b border-neutral-100">
          <Text className="text-lg font-bold text-neutral-900">
            Nuevo gasto
          </Text>
          <Pressable
            className="h-8 w-8 items-center justify-center rounded-full bg-neutral-100"
            onPress={onClose}>
            <X size={16} color="#525252" />
          </Pressable>
        </View>
        <ScrollView className="flex-1 px-6 pt-4" keyboardShouldPersistTaps="handled">
          <ExpenseFormFields
            amount={amount} currency={currency} title={title}
            category={category} date={date} splits={splits}
            method={method} totalAmount={numAmount} members={members}
            onAmountChange={setAmount} onCurrencyChange={setCurrency}
            onTitleChange={setTitle} onCategoryChange={setCategory}
            onDateChange={setDate} onMethodChange={handleMethodChange}
            onSplitsChange={setSplits} onScanResult={handleScanResult}
          />
          {formError && (
            <Text className="text-sm text-red-500 mt-3">{formError}</Text>
          )}
          <View className="mt-4 mb-8">
            <Button title="Registrar gasto" onPress={handleSubmit}
              isLoading={isSubmitting}
              disabled={!title.trim() || numAmount <= 0} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

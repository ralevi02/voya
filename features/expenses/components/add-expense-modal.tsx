import { useState, useEffect, useCallback } from 'react';
import {
  View, Text, Modal, Pressable, ScrollView,
  TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { X, Camera } from 'lucide-react-native';
import { Button } from '@/shared/components/ui/button';
import { CategoryPicker } from './category-picker';
import { SplitSelector } from './split-selector';
import { useCreateExpense } from '../hooks/use-create-expense';
import { useCurrencyStore } from '@/stores/currency-store';
import { calculateEqualSplits } from '../utils/split-calculator';
import { roundCurrency } from '../utils/split-calculator';
import type {
  ExpenseCategory,
  SplitMethod,
  SplitInput,
} from '../types/expense.types';

interface MemberInfo {
  user_id: string;
  label: string;
}

interface AddExpenseModalProps {
  tripId: string;
  baseCurrency: string;
  members: MemberInfo[];
  currentUserId: string;
  visible: boolean;
  onClose: () => void;
}

export function AddExpenseModal({
  tripId,
  baseCurrency,
  members,
  currentUserId,
  visible,
  onClose,
}: AddExpenseModalProps) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState(baseCurrency);
  const [category, setCategory] = useState<ExpenseCategory>('food');
  const [method, setMethod] = useState<SplitMethod>('equal');
  const [splits, setSplits] = useState<SplitInput[]>([]);
  const [date, setDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  const getRate = useCurrencyStore((s) => s.getRate);
  const { submit, isSubmitting, isSuccess, formError, reset } =
    useCreateExpense(tripId);

  const numAmount = parseFloat(amount) || 0;

  // Recalculate equal splits when amount or members change
  useEffect(() => {
    if (method === 'equal' && numAmount > 0) {
      const ids = members.map((m) => m.user_id);
      setSplits(
        calculateEqualSplits(numAmount, ids, currentUserId),
      );
    }
  }, [numAmount, members, method, currentUserId]);

  const handleMethodChange = useCallback(
    (m: SplitMethod) => {
      setMethod(m);
      if (m === 'equal' && numAmount > 0) {
        const ids = members.map((mem) => mem.user_id);
        setSplits(
          calculateEqualSplits(numAmount, ids, currentUserId),
        );
      }
    },
    [numAmount, members, currentUserId],
  );

  useEffect(() => {
    if (isSuccess) {
      setTitle('');
      setAmount('');
      setCategory('food');
      setMethod('equal');
      setSplits([]);
      reset();
      onClose();
    }
  }, [isSuccess, onClose, reset]);

  function handleSubmit() {
    const rate = getRate(baseCurrency, currency);
    const exchangeRate = roundCurrency(1 / rate);
    const baseAmount = roundCurrency(numAmount * exchangeRate);

    submit({
      trip_id: tripId,
      title,
      amount: numAmount,
      currency,
      exchange_rate: exchangeRate,
      base_amount: baseAmount,
      category,
      expense_date: date,
      splits,
    });
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        className="flex-1 bg-white"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 pt-4 pb-3 border-b border-neutral-100">
          <Text className="text-lg font-bold text-neutral-900">
            Nuevo gasto
          </Text>
          <Pressable
            className="h-8 w-8 items-center justify-center rounded-full bg-neutral-100"
            onPress={onClose}
          >
            <X size={16} color="#525252" />
          </Pressable>
        </View>

        <ScrollView
          className="flex-1 px-6 pt-4"
          keyboardShouldPersistTaps="handled"
        >
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
              value={amount}
              onChangeText={setAmount}
            />
            <TextInput
              className="w-20 h-12 border border-neutral-300 rounded-xl px-3 text-center text-sm font-medium text-neutral-900"
              placeholder="USD"
              placeholderTextColor="#A3A3A3"
              maxLength={3}
              autoCapitalize="characters"
              value={currency}
              onChangeText={setCurrency}
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
            value={title}
            onChangeText={setTitle}
          />

          {/* Category */}
          <Text className="text-sm font-medium text-neutral-700 mb-2">
            Categoría
          </Text>
          <View className="mb-4">
            <CategoryPicker
              selected={category}
              onSelect={setCategory}
            />
          </View>

          {/* Date */}
          <Text className="text-sm font-medium text-neutral-700 mb-1">
            Fecha
          </Text>
          <TextInput
            className="h-12 border border-neutral-300 rounded-xl px-4 text-base text-neutral-900 mb-4"
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#A3A3A3"
            value={date}
            onChangeText={setDate}
          />

          {/* Splits */}
          <Text className="text-sm font-medium text-neutral-700 mb-2">
            Dividir entre
          </Text>
          <SplitSelector
            members={members}
            splits={splits}
            method={method}
            totalAmount={numAmount}
            onMethodChange={handleMethodChange}
            onSplitsChange={setSplits}
          />

          {/* AI Placeholder */}
          <Pressable className="flex-row items-center justify-center gap-2 mt-6 py-3 rounded-xl border border-dashed border-neutral-300">
            <Camera size={16} color="#A3A3A3" />
            <Text className="text-sm text-neutral-400">
              Escanear boleta con IA (próximamente)
            </Text>
          </Pressable>

          {formError && (
            <Text className="text-sm text-red-500 mt-3">
              {formError}
            </Text>
          )}

          <View className="mt-4 mb-8">
            <Button
              title="Registrar gasto"
              onPress={handleSubmit}
              isLoading={isSubmitting}
              disabled={!title.trim() || numAmount <= 0}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

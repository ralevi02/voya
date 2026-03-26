import { View, Text, TextInput, Pressable } from 'react-native';
import { Users, Edit3 } from 'lucide-react-native';
import type { SplitInput, SplitMethod } from '../types/expense.types';

interface MemberInfo {
  user_id: string;
  label: string;
}

interface SplitSelectorProps {
  members: MemberInfo[];
  splits: SplitInput[];
  method: SplitMethod;
  totalAmount: number;
  onMethodChange: (method: SplitMethod) => void;
  onSplitsChange: (splits: SplitInput[]) => void;
}

export function SplitSelector({
  members,
  splits,
  method,
  totalAmount,
  onMethodChange,
  onSplitsChange,
}: SplitSelectorProps) {
  function handleManualChange(userId: string, value: string) {
    const num = parseFloat(value) || 0;
    const updated = splits.map((s) =>
      s.user_id === userId ? { ...s, amount_owed: num } : s,
    );
    onSplitsChange(updated);
  }

  const splitsTotal = splits.reduce(
    (sum, s) => sum + s.amount_owed, 0,
  );
  const diff = Math.abs(splitsTotal - totalAmount);
  const isValid = diff < 0.01;

  return (
    <View>
      {/* Method toggle */}
      <View className="flex-row gap-2 mb-3">
        <Pressable
          className={`flex-1 flex-row items-center justify-center gap-2 py-2.5 rounded-xl border ${
            method === 'equal'
              ? 'border-primary-500 bg-primary-50'
              : 'border-neutral-200 bg-white'
          }`}
          onPress={() => onMethodChange('equal')}
        >
          <Users size={14} color={method === 'equal' ? '#4F46E5' : '#737373'} />
          <Text className={`text-xs font-medium ${
            method === 'equal' ? 'text-primary-700' : 'text-neutral-600'
          }`}>
            Equitativo
          </Text>
        </Pressable>

        <Pressable
          className={`flex-1 flex-row items-center justify-center gap-2 py-2.5 rounded-xl border ${
            method === 'manual'
              ? 'border-primary-500 bg-primary-50'
              : 'border-neutral-200 bg-white'
          }`}
          onPress={() => onMethodChange('manual')}
        >
          <Edit3 size={14} color={method === 'manual' ? '#4F46E5' : '#737373'} />
          <Text className={`text-xs font-medium ${
            method === 'manual' ? 'text-primary-700' : 'text-neutral-600'
          }`}>
            Manual
          </Text>
        </Pressable>
      </View>

      {/* Split per member */}
      {members.map((member) => {
        const split = splits.find(
          (s) => s.user_id === member.user_id,
        );
        return (
          <View
            key={member.user_id}
            className="flex-row items-center justify-between py-2 border-b border-neutral-100"
          >
            <Text className="text-sm text-neutral-700 flex-1">
              {member.label}
            </Text>
            {method === 'manual' ? (
              <TextInput
                className="w-24 h-9 border border-neutral-300 rounded-lg px-3 text-sm text-right text-neutral-900"
                keyboardType="decimal-pad"
                value={split?.amount_owed.toFixed(2) ?? '0.00'}
                onChangeText={(v) =>
                  handleManualChange(member.user_id, v)
                }
              />
            ) : (
              <Text className="text-sm font-medium text-neutral-900">
                ${split?.amount_owed.toFixed(2) ?? '0.00'}
              </Text>
            )}
          </View>
        );
      })}

      {/* Validation badge */}
      {method === 'manual' && !isValid && totalAmount > 0 && (
        <Text className="text-xs text-red-500 mt-2">
          Faltan ${diff.toFixed(2)} por asignar
        </Text>
      )}
    </View>
  );
}

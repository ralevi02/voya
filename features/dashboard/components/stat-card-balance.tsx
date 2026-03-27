import { View, Text, StyleSheet } from 'react-native';
import { DollarSign } from 'lucide-react-native';
import { GlassCard } from './glass-card';
import { TEXT, GREEN } from '../constants/colors';

interface StatCardBalanceProps {
  amount: number;
  currency: string;
  status: string;
}

export function StatCardBalance({
  amount,
  currency,
  status,
}: StatCardBalanceProps) {
  return (
    <GlassCard variant="standard" radius={22}>
      <View style={S.pad}>
        <Text style={S.label}>Balance</Text>
        <View style={S.iconBox}>
          <DollarSign size={14} color="rgba(57,217,138,0.70)" />
        </View>
        <Text style={S.amount}>
          {currency}{amount}
        </Text>
        <Text style={S.status}>● {status}</Text>
      </View>
    </GlassCard>
  );
}

const S = StyleSheet.create({
  pad: { padding: 14, paddingHorizontal: 13 },
  label: {
    fontSize: 9.5,
    fontWeight: '600',
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    color: TEXT.label,
    marginBottom: 7,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: 'rgba(57,217,138,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(57,217,138,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  amount: {
    fontSize: 22,
    fontWeight: '700',
    color: TEXT.primary,
    letterSpacing: -0.7,
    lineHeight: 24,
  },
  status: {
    fontSize: 9,
    color: 'rgba(57,217,138,0.65)',
    marginTop: 4,
  },
});

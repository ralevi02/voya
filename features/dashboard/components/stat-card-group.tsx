import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from './glass-card';
import { TEXT } from '../constants/colors';
import type { GroupMember } from '../types/dashboard.types';

interface StatCardGroupProps {
  members: GroupMember[];
  totalCount: number;
}

export function StatCardGroup({ members, totalCount }: StatCardGroupProps) {
  const visible = members.slice(0, 3);
  const overflow = members.slice(3, 4);
  const extra = totalCount - visible.length - overflow.length;

  return (
    <GlassCard variant="standard" radius={22}>
      <View style={S.pad}>
        <Text style={S.label}>Grupo</Text>

        {/* Row 1 — first 3 */}
        <View style={S.avatarRow}>
          {visible.map((m, i) => (
            <View
              key={m.initials}
              style={[S.avatar, { backgroundColor: m.bg, marginLeft: i > 0 ? -6 : 0 }]}
            >
              <Text style={S.initials}>{m.initials}</Text>
            </View>
          ))}
        </View>

        {/* Row 2 — overflow */}
        {(overflow.length > 0 || extra > 0) && (
          <View style={[S.avatarRow, { marginTop: 5 }]}>
            {overflow.map((m) => (
              <View key={m.initials} style={[S.avatar, { backgroundColor: m.bg }]}>
                <Text style={S.initials}>{m.initials}</Text>
              </View>
            ))}
            {extra > 0 && (
              <View style={[S.avatar, S.extraBubble, { marginLeft: overflow.length > 0 ? -6 : 0 }]}>
                <Text style={S.extraText}>+{extra}</Text>
              </View>
            )}
          </View>
        )}

        <Text style={S.count}>{totalCount} viajeros</Text>
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
  avatarRow: { flexDirection: 'row' },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(6,6,6,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: 7.5,
    fontWeight: '700',
    color: 'rgba(208,214,232,0.72)',
  },
  extraBubble: {
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  extraText: {
    fontSize: 7.5,
    color: 'rgba(160,166,192,0.52)',
  },
  count: {
    fontSize: 9,
    color: 'rgba(138,142,162,0.38)',
    marginTop: 6,
  },
});

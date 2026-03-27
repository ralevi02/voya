import { View, Text, StyleSheet } from 'react-native';
import { Clock, ArrowRightLeft, Home, Check } from 'lucide-react-native';
import { TEXT } from '../constants/colors';
import type { TimelineEvent } from '../types/dashboard.types';

const ICON_MAP = {
  clock: Clock,
  flight: ArrowRightLeft,
  hotel: Home,
} as const;

/** Style tokens per status */
const STATUS = {
  past: {
    opacity: 0.45,
    iconBg: 'rgba(255,255,255,0.04)',
    iconBorder: 'rgba(255,255,255,0.06)',
    iconColor: 'rgba(180,185,210,0.55)',
    titleColor: 'rgba(180,185,210,0.65)',
    titleWeight: '500' as const,
    subtitleColor: 'rgba(120,124,145,0.40)',
    trailingColor: 'rgba(57,217,138,0.50)',
  },
  active: {
    opacity: 1,
    iconBg: 'rgba(255,255,255,0.07)',
    iconBorder: 'rgba(255,255,255,0.12)',
    iconColor: 'rgba(218,222,242,0.78)',
    titleColor: TEXT.primary,
    titleWeight: '700' as const,
    subtitleColor: 'rgba(57,217,138,0.65)',
    trailingColor: 'rgba(235,236,242,0.60)',
  },
  next: {
    opacity: 0.65,
    iconBg: 'rgba(255,255,255,0.04)',
    iconBorder: 'rgba(255,255,255,0.07)',
    iconColor: 'rgba(180,185,210,0.55)',
    titleColor: TEXT.secondary,
    titleWeight: '500' as const,
    subtitleColor: 'rgba(120,124,145,0.42)',
    trailingColor: 'rgba(180,185,210,0.42)',
  },
};

interface TimelineItemProps {
  event: TimelineEvent;
}

export function TimelineItem({ event }: TimelineItemProps) {
  const t = STATUS[event.status];
  const Icon = ICON_MAP[event.icon];

  return (
    <View style={[S.row, { opacity: t.opacity }]}>
      <View style={[S.iconBox, { backgroundColor: t.iconBg, borderColor: t.iconBorder }]}>
        <Icon size={14} color={t.iconColor} />
      </View>

      <View style={S.body}>
        <Text style={[S.title, { color: t.titleColor, fontWeight: t.titleWeight }]}>
          {event.title}
        </Text>
        <Text style={[S.subtitle, { color: t.subtitleColor }]}>
          {event.time} · {event.subtitle}
        </Text>
      </View>

      {event.status === 'past' ? (
        <Check size={14} color={t.trailingColor} />
      ) : (
        <Text style={[S.trailing, { color: t.trailingColor }]}>
          {event.time}
        </Text>
      )}
    </View>
  );
}

const S = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  body: { flex: 1 },
  title: { fontSize: 12.5, lineHeight: 16 },
  subtitle: { fontSize: 10, marginTop: 1 },
  trailing: { fontSize: 13, fontFamily: 'monospace' },
});

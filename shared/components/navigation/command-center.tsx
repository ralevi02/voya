import { useState, useCallback } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  Plus, X, CalendarDays, Receipt, FolderOpen, MessageCircle,
} from 'lucide-react-native';

const ACTIONS = [
  { key: 'chat', label: 'Chat IA', icon: MessageCircle, color: '#8B5CF6', bg: '#F5F3FF', route: 'chat' },
  { key: 'vault', label: 'Bóveda', icon: FolderOpen, color: '#22C55E', bg: '#F0FDF4', route: 'vault' },
  { key: 'expenses', label: 'Gastos', icon: Receipt, color: '#F59E0B', bg: '#FFFBEB', route: 'expenses' },
  { key: 'itinerary', label: 'Itinerario', icon: CalendarDays, color: '#3B82F6', bg: '#EFF6FF', route: '' },
] as const;

export function CommandCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const toggle = useCallback(() => setIsOpen((o) => !o), []);

  const navigate = useCallback((route: string) => {
    setIsOpen(false);
    router.push((route ? `/trip/${id}/${route}` : `/trip/${id}`) as never);
  }, [id, router]);

  return (
    <>
      {isOpen && (
        <Pressable style={S.backdrop} onPress={toggle} />
      )}

      {isOpen && (
        <View style={S.items} pointerEvents="box-none">
          {ACTIONS.map((a) => {
            const Icon = a.icon;
            return (
              <Pressable
                key={a.key}
                style={S.itemRow}
                onPress={() => navigate(a.route)}
              >
                <View style={[S.miniFab, { backgroundColor: a.bg }]}>
                  <Icon size={20} color={a.color} />
                </View>
                <View style={S.labelWrap}>
                  <Text style={S.labelText}>{a.label}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      )}

      <Pressable style={S.fab} onPress={toggle}>
        {isOpen
          ? <X size={26} color="#FFFFFF" />
          : <Plus size={26} color="#FFFFFF" />}
      </Pressable>
    </>
  );
}

const S = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 900,
  },
  items: {
    position: 'absolute',
    bottom: 90,
    left: 24,
    zIndex: 910,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  miniFab: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelWrap: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  labelText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 920,
  },
});

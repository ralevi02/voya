import { useState, useMemo, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/stores/auth-store';
import { useTrips } from '@/features/trips/hooks/use-trips';
import { useExpenses } from '@/features/expenses/hooks/use-expenses';
import { useSyncRates } from '@/features/expenses/hooks/use-sync-rates';
import { calculateBalances } from '@/features/expenses/utils/settlement';
import { roundCurrency } from '@/features/expenses/utils/split-calculator';
import { BalanceSummary } from '@/features/expenses/components/balance-summary';
import { ExpenseCard } from '@/features/expenses/components/expense-card';
import { EmptyExpenses } from '@/features/expenses/components/empty-expenses';
import { FabAddItem } from '@/features/itinerary/components/fab-add-item';
import { AddExpenseModal } from '@/features/expenses/components/add-expense-modal';
import { LoadingSpinner } from '@/shared/components/ui/loading-spinner';
import { ErrorView } from '@/shared/components/ui/error-view';
import { DashboardShell } from '@/shared/components/navigation/dashboard-shell';
import type { ExpenseWithSplits } from '@/features/expenses/types/expense.types';

export default function TripExpensesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const user = useAuthStore((s) => s.user);
  const { data: trips } = useTrips(user?.id);
  const { data: expenses, isLoading, error, refetch } = useExpenses(id);
  const [modalVisible, setModalVisible] = useState(false);

  useSyncRates();

  const trip = useMemo(
    () => trips?.find((t) => t.id === id),
    [trips, id],
  );
  const baseCurrency = trip?.base_currency ?? 'USD';

  const memberIds = useMemo(() => {
    if (!trip) return [];
    const members = (trip as { trip_members?: { user_id: string }[] })
      .trip_members;
    return members?.map((m) => m.user_id) ?? [user?.id ?? ''];
  }, [trip, user]);

  const balances = useMemo(() => {
    if (!expenses?.length || !memberIds.length) return [];
    return calculateBalances(expenses, memberIds);
  }, [expenses, memberIds]);

  const myBalance = useMemo(
    () => balances.find((b) => b.user_id === user?.id) ?? null,
    [balances, user],
  );

  const totalSpent = useMemo(
    () =>
      roundCurrency(
        (expenses ?? []).reduce((s, e) => s + e.base_amount, 0),
      ),
    [expenses],
  );

  const members = useMemo(
    () =>
      memberIds.map((uid) => ({
        user_id: uid,
        label: uid === user?.id ? 'Tú' : uid.slice(0, 8),
      })),
    [memberIds, user],
  );

  const handlePress = useCallback(
    (_expense: ExpenseWithSplits) => {
      // Future: open detail modal
    },
    [],
  );

  if (isLoading) return <LoadingSpinner fullScreen />;
  if (error) return <ErrorView message={error.message} onRetry={refetch} />;

  const hasExpenses = !!expenses?.length;

  return (
    <DashboardShell>
    <SafeAreaView className="flex-1 bg-neutral-50" edges={['bottom']}>
      <View className="px-6 pt-2 pb-3 bg-white border-b border-neutral-100">
        <Text className="text-2xl font-bold text-neutral-900">
          Gastos
        </Text>
        {trip && (
          <Text className="text-sm text-neutral-500 mt-0.5">
            {trip.name}
          </Text>
        )}
      </View>

      {!hasExpenses ? (
        <EmptyExpenses onAdd={() => setModalVisible(true)} />
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View className="pt-4 pb-2">
              <BalanceSummary
                totalSpent={totalSpent}
                myBalance={myBalance}
                baseCurrency={baseCurrency}
              />
            </View>
          }
          renderItem={({ item }) => (
            <View className="px-4">
              <ExpenseCard
                expense={item}
                currentUserId={user?.id ?? ''}
                baseCurrency={baseCurrency}
                onPress={handlePress}
              />
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      <FabAddItem onPress={() => setModalVisible(true)} />

      <AddExpenseModal
        tripId={id!}
        baseCurrency={baseCurrency}
        members={members}
        currentUserId={user?.id ?? ''}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
    </DashboardShell>
  );
}

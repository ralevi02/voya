import { useState, useMemo, useCallback } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/stores/auth-store';
import { useTrips } from '@/features/trips/hooks/use-trips';
import { useVault } from '@/features/vault/hooks/use-vault';
import { DocumentCard } from '@/features/vault/components/document-card';
import { DocumentDetailModal } from '@/features/vault/components/document-detail-modal';
import { EmptyVault } from '@/features/vault/components/empty-vault';
import { UploadDocumentModal } from '@/features/vault/components/upload-document-modal';
import { FabAddItem } from '@/features/itinerary/components/fab-add-item';
import { LoadingSpinner } from '@/shared/components/ui/loading-spinner';
import { ErrorView } from '@/shared/components/ui/error-view';
import { DOC_TYPES, DOC_TYPE_CONFIG } from '@/features/vault/constants/doc-types';
import type { TravelDocument, DocType } from '@/features/vault/types/vault.types';

type FilterType = 'all' | DocType;

export default function TripVaultScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const user = useAuthStore((s) => s.user);
  const { data: trips } = useTrips(user?.id);
  const { data: docs, isLoading, error, refetch } = useVault(id);

  const [uploadVisible, setUploadVisible] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<TravelDocument | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');

  const trip = useMemo(
    () => trips?.find((t) => t.id === id),
    [trips, id],
  );

  const filtered = useMemo(() => {
    if (!docs) return [];
    if (filter === 'all') return docs;
    return docs.filter((d) => d.doc_type === filter);
  }, [docs, filter]);

  const handleOpenDoc = useCallback((doc: TravelDocument) => {
    setSelectedDoc(doc);
  }, []);

  if (isLoading) return <LoadingSpinner fullScreen />;
  if (error) return <ErrorView message={error.message} onRetry={refetch} />;

  const hasDocs = !!docs?.length;

  return (
    <SafeAreaView className="flex-1 bg-neutral-50" edges={['bottom']}>
      {/* Header */}
      <View className="px-6 pt-2 pb-3 bg-white border-b border-neutral-100">
        <Text className="text-2xl font-bold text-neutral-900">
          Documentos
        </Text>
        {trip && (
          <Text className="text-sm text-neutral-500 mt-0.5">
            {trip.name}
          </Text>
        )}
      </View>

      {!hasDocs ? (
        <EmptyVault onAdd={() => setUploadVisible(true)} />
      ) : (
        <>
          <FilterBar selected={filter} onSelect={setFilter} />
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="px-4">
                <DocumentCard document={item} onPress={handleOpenDoc} />
              </View>
            )}
            contentContainerStyle={{ paddingTop: 8, paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}

      <FabAddItem onPress={() => setUploadVisible(true)} />

      <UploadDocumentModal
        tripId={id!}
        visible={uploadVisible}
        onClose={() => setUploadVisible(false)}
      />

      <DocumentDetailModal
        document={selectedDoc}
        visible={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />
    </SafeAreaView>
  );
}

/* ───────── Filter Bar ───────── */

interface FilterBarProps {
  selected: FilterType;
  onSelect: (f: FilterType) => void;
}

function FilterBar({ selected, onSelect }: FilterBarProps) {
  const options: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'Todos' },
    ...DOC_TYPES.map((t) => ({
      key: t as FilterType,
      label: DOC_TYPE_CONFIG[t].label,
    })),
  ];

  return (
    <View className="px-4 py-3">
      <View className="flex-row flex-wrap gap-2">
        {options.map(({ key, label }) => {
          const active = key === selected;
          return (
            <Pressable
              key={key}
              className={`px-3 py-1.5 rounded-full ${
                active ? 'bg-primary-600' : 'bg-white border border-neutral-200'
              }`}
              onPress={() => onSelect(key)}
            >
              <Text
                className={`text-xs font-medium ${
                  active ? 'text-white' : 'text-neutral-600'
                }`}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

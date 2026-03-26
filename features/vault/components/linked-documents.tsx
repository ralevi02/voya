import { View, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Paperclip } from 'lucide-react-native';
import { QUERY_KEYS } from '@/shared/constants/config';
import { getDocumentsByItem } from '../services/vault.service';
import { DocTypeIcon } from './doc-type-icon';

interface LinkedDocumentsProps {
  itemId: string;
}

export function LinkedDocuments({ itemId }: LinkedDocumentsProps) {
  const { data: docs } = useQuery({
    queryKey: QUERY_KEYS.vaultItem(itemId),
    queryFn: () => getDocumentsByItem(itemId),
    enabled: !!itemId,
  });

  if (!docs?.length) return null;

  return (
    <View className="mt-5 mb-6">
      <View className="flex-row items-center gap-2 mb-3">
        <Paperclip size={16} color="#737373" />
        <Text className="text-sm font-medium text-neutral-700">
          Documentos adjuntos ({docs.length})
        </Text>
      </View>
      {docs.map((doc) => (
        <View
          key={doc.id}
          className="flex-row items-center gap-3 py-2.5 border-b border-neutral-100"
        >
          <DocTypeIcon docType={doc.doc_type} size={16} />
          <Text
            className="flex-1 text-sm text-neutral-700"
            numberOfLines={1}
          >
            {doc.name}
          </Text>
        </View>
      ))}
    </View>
  );
}

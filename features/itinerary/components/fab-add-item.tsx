import { Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';

interface FabAddItemProps {
  onPress: () => void;
}

export function FabAddItem({ onPress }: FabAddItemProps) {
  return (
    <Pressable
      className="absolute bottom-6 right-6 h-14 w-14 rounded-full bg-primary-600 items-center justify-center active:bg-primary-700"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
      }}
      onPress={onPress}
    >
      <Plus size={24} color="#FFFFFF" />
    </Pressable>
  );
}

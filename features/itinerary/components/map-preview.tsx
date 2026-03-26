import { View, Text, Pressable, Linking } from 'react-native';
import { MapPin, ExternalLink } from 'lucide-react-native';

interface MapPreviewProps {
  locationName: string;
  lat: number;
  lng: number;
}

function openInGoogleMaps(lat: number, lng: number, label: string) {
  const encoded = encodeURIComponent(label);
  const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encoded}`;
  Linking.openURL(url);
}

export function MapPreview({
  locationName,
  lat,
  lng,
}: MapPreviewProps) {
  return (
    <Pressable
      className="bg-neutral-100 rounded-xl p-4 items-center justify-center active:opacity-70"
      style={{ height: 140 }}
      onPress={() => openInGoogleMaps(lat, lng, locationName)}
    >
      <MapPin size={32} color="#6366F1" />
      <Text className="text-sm font-medium text-neutral-700 mt-2 text-center">
        {locationName}
      </Text>
      <View className="flex-row items-center gap-1 mt-2">
        <ExternalLink size={12} color="#4F46E5" />
        <Text className="text-xs font-medium text-primary-600">
          Abrir en Google Maps
        </Text>
      </View>
    </Pressable>
  );
}

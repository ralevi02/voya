import { View, StyleSheet } from 'react-native';
import { ArrowRightLeft } from 'lucide-react-native';
import { GLASS } from '../constants/colors';

export function FlightIconBox() {
  return (
    <View style={S.box}>
      <ArrowRightLeft size={22} color="rgba(218,222,242,0.80)" />
    </View>
  );
}

const S = StyleSheet.create({
  box: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: GLASS.subtle.bg,
    borderWidth: 1,
    borderColor: GLASS.subtle.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

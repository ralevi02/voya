import { View, StyleSheet } from 'react-native';
import type { ReactNode } from 'react';
import { CommandCenter } from './command-center';

interface TripScreenWrapperProps {
  children: ReactNode;
}

export function TripScreenWrapper({
  children,
}: TripScreenWrapperProps) {
  return (
    <View style={styles.container}>
      {children}
      <CommandCenter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

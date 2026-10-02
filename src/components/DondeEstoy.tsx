import { View, Text, StyleSheet, Platform } from 'react-native';
import { usePathname, useSegments, useLocalSearchParams } from 'expo-router';

const DEBUG = true;

export function DondeEstoy() {
  if (!DEBUG) return null;

  const pathname = usePathname();
  const segments = useSegments();
  const localSearchParams = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Diagnóstico de Navegación</Text>
      <Text style={styles.label}>pathname:</Text>
      <Text style={styles.value}>{pathname}</Text>
      <Text style={styles.label}>segments:</Text>
      <Text style={styles.value}>{JSON.stringify(segments)}</Text>
      <Text style={styles.label}>localSearchParams:</Text>
      <Text style={styles.value}>{JSON.stringify(localSearchParams)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDF2F8',
    borderTopWidth: 1,
    borderTopColor: '#FCE7F3',
    padding: 12,
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  title: {
    fontWeight: '700',
    fontSize: 13,
    color: '#BE185D',
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    fontSize: 11,
    color: '#831843',
    marginTop: 6,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  value: {
    fontSize: 11,
    color: '#111827',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    backgroundColor: '#FFFFFF',
    padding: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#F3E8FF',
  },
});
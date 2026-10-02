import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { usePathname } from 'expo-router';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Ionicons } from '@expo/vector-icons';

export default function NotFoundScreen() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <Ionicons name="warning-outline" size={64} color="#F59E0B" style={styles.icon} />
      <Text style={styles.title}>Página no encontrada</Text>
      <Text style={styles.subtitle}>La ruta solicitada no existe</Text>

      <View style={styles.pathCard}>
        <Text style={styles.pathLabel}>URL intentada:</Text>
        <Text style={styles.pathValue}>{pathname}</Text>
      </View>

      <View style={styles.buttons}>
        <Link href="/(tabs)" style={styles.buttonPrimary}>
          <Text style={styles.buttonPrimaryText}>Ir al Inicio</Text>
        </Link>
        <Link href="/ayuda" style={styles.buttonSecondary}>
          <Text style={styles.buttonSecondaryText}>Ver Ayuda</Text>
        </Link>
      </View>

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  pathCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    padding: 16,
    width: '100%',
    maxWidth: 360,
    marginBottom: 24,
  },
  pathLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  pathValue: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#BE185D',
    fontWeight: '600',
  },
  buttons: {
    width: '100%',
    maxWidth: 360,
    gap: 12,
  },
  buttonPrimary: {
    backgroundColor: '#BE185D',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#BE185D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonPrimaryText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  buttonSecondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3E8FF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonSecondaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#BE185D',
  },
});
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useComedor } from '@/context/ComedorContext';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Ionicons } from '@expo/vector-icons';

export default function TurnoScreen() {
  const { numero } = useLocalSearchParams<{ numero: string }>();
  const { colaPedidos } = useComedor();

  const turnoNum = parseInt(numero ?? '', 10);
  const pedidosAntes = colaPedidos.filter((p) => p.numero < turnoNum).length;
  const tiempoEstimado = pedidosAntes * 3;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="ticket-outline" size={64} color="#BE185D" style={styles.icon} />
        <Text style={styles.title}>¡Pedido Confirmado!</Text>
        <Text style={styles.subtitle}>Tu número de turno es</Text>

        <View style={styles.numberContainer}>
          <Text style={styles.number}>#{turnoNum.toString().padStart(3, '0')}</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Pedidos por delante</Text>
            <Text style={styles.infoValue}>{pedidosAntes}</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Tiempo estimado</Text>
            <Text style={styles.infoValue}>{tiempoEstimado} min</Text>
          </View>
        </View>

        <Text style={styles.note}>
          Tu pedido se está preparando. Te avisaremos cuando esté listo.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)')}>
        <Text style={styles.buttonText}>Volver al Inicio</Text>
      </TouchableOpacity>

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    padding: 32,
    alignItems: 'center',
    shadowColor: '#BE185D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  numberContainer: {
    backgroundColor: '#BE185D',
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 20,
    marginBottom: 24,
    shadowColor: '#BE185D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  number: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 4,
  },
  infoRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  infoDivider: {
    width: 1,
    backgroundColor: '#F3E8FF',
    marginVertical: 8,
  },
  note: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 8,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#BE185D',
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 16,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
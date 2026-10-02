import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { useComedor } from '@/context/ComedorContext';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Ionicons } from '@expo/vector-icons';

export default function CocinaScreen() {
  const { colaPedidos, atenderSiguiente, logout, usuario } = useComedor();
  const pedidoActual = colaPedidos[0];
  const totalEnEspera = colaPedidos.length;

  const handleAtender = () => {
    if (!pedidoActual) return;
    Alert.alert(
      'Atender pedido',
      `¿Marcar el turno #${pedidoActual.numero.toString().padStart(3, '0')} como atendido?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Atender',
          onPress: () => {
            atenderSiguiente();
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    logout();
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="flame" size={32} color="#BE185D" />
          <Text style={styles.headerTitle}>Cocina - Pedidos Pendientes</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#6B7280" style={{ marginRight: 6 }} />
          <Text style={styles.logoutText}>Salir ({usuario})</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stats}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalEnEspera}</Text>
          <Text style={styles.statLabel}>En espera</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{pedidoActual ? pedidoActual.numero : '-'}</Text>
          <Text style={styles.statLabel}>Turno actual</Text>
        </View>
      </View>

      {pedidoActual ? (
        <View style={styles.currentOrderCard}>
          <View style={styles.currentOrderHeader}>
            <View style={styles.turnoBadge}>
              <Text style={styles.turnoLabel}>TURNO</Text>
              <Text style={styles.turnoNumber}>#{pedidoActual.numero.toString().padStart(3, '0')}</Text>
            </View>
            <View style={styles.turnoTime}>
              <Text style={styles.turnoTimeLabel}>Recibido</Text>
              <Text style={styles.turnoTimeValue}>
                {pedidoActual.fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          </View>

          <Text style={styles.itemsTitle}>Items del pedido ({pedidoActual.items.length})</Text>
          <View style={styles.itemsList}>
            {pedidoActual.items.map((item) => (
              <View key={item.plato.id} style={styles.itemRow}>
                <Text style={styles.itemQty}>{item.cantidad}x</Text>
                <Text style={styles.itemName}>{item.plato.nombre}</Text>
                <Text style={styles.itemCategory}>{item.plato.categoria}</Text>
              </View>
            ))}
          </View>

          {pedidoActual.nota && (
            <View style={styles.notaCard}>
              <Ionicons name="chatbox-outline" size={18} color="#BE185D" style={{ marginRight: 8 }} />
              <Text style={styles.notaText}>
                <Text style={styles.notaLabel}>Nota: </Text>
                {pedidoActual.nota}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.atenderButton,
              totalEnEspera === 0 && styles.atenderButtonDisabled,
            ]}
            onPress={handleAtender}
            disabled={totalEnEspera === 0}
            activeOpacity={0.9}
          >
            <Ionicons name="checkmark-circle-outline" size={24} color="#FFFFFF" style={{ marginRight: 10 }} />
            <Text style={styles.atenderButtonText}>Atender Siguiente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="checkmark-circle-outline" size={64} color="#22C55E" style={styles.emptyIcon} />
          <Text style={styles.emptyTitle}>¡Todo al día!</Text>
          <Text style={styles.emptyText}>No hay pedidos pendientes en cola</Text>
        </View>
      )}

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3E8FF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  logoutText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#BE185D',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    marginTop: 4,
  },
  currentOrderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    padding: 20,
    marginBottom: 20,
    shadowColor: '#BE185D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  currentOrderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3E8FF',
  },
  turnoBadge: {
    backgroundColor: '#BE185D',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  turnoLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FCE7F3',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  turnoNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  turnoTime: {
    alignItems: 'flex-end',
  },
  turnoTimeLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'uppercase',
  },
  turnoTimeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  itemsList: {
    gap: 8,
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F3E8FF',
  },
  itemQty: {
    fontSize: 15,
    fontWeight: '700',
    color: '#BE185D',
    minWidth: 24,
  },
  itemName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  itemCategory: {
    fontSize: 11,
    fontWeight: '600',
    color: '#BE185D',
    backgroundColor: '#FDF2F8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    textTransform: 'capitalize',
  },
  notaCard: {
    backgroundColor: '#FDF2F8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FCE7F3',
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notaLabel: {
    fontWeight: '700',
  },
  notaText: {
    fontSize: 13,
    color: '#831843',
    flex: 1,
    lineHeight: 20,
  },
  atenderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BE185D',
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#BE185D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  atenderButtonDisabled: {
    backgroundColor: '#D1D5DB',
    shadowOpacity: 0,
    elevation: 0,
  },
  atenderButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3E8FF',
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
  },
});
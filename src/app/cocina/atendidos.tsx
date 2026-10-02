import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useComedor } from '@/context/ComedorContext';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Ionicons } from '@expo/vector-icons';

export default function AtendidosScreen() {
  const { historialAtendidos } = useComedor();

  // La pila devuelve del tope a la base (más reciente primero)
  const atendidos = historialAtendidos;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Ionicons name="time" size={32} color="#BE185D" style={{ marginRight: 10 }} />
        <Text style={styles.headerTitle}>Historial de Atendidos</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{atendidos.length}</Text>
          <Text style={styles.statLabel}>Total atendidos</Text>
        </View>
      </View>

      {atendidos.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="time-outline" size={64} color="#D1D5DB" style={styles.emptyIcon} />
          <Text style={styles.emptyTitle}>Sin historial aún</Text>
          <Text style={styles.emptyText}>Los pedidos atendidos aparecerán aquí</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {atendidos.map((pedido, index) => (
            <TouchableOpacity
              key={pedido.numero}
              style={styles.historyCard}
              onPress={() => {}}
            >
              <View style={styles.historyHeader}>
                <View style={styles.historyTurno}>
                  <Text style={styles.historyTurnoLabel}>Turno</Text>
                  <Text style={styles.historyTurnoNumber}>#{pedido.numero.toString().padStart(3, '0')}</Text>
                </View>
                <View style={styles.historyTime}>
                  <Text style={styles.historyTimeLabel}>Atendido</Text>
                  <Text style={styles.historyTimeValue}>
                    {pedido.fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
                <View style={styles.historyPosition}>
                  <Ionicons name="trophy" size={20} color="#F59E0B" />
                  <Text style={styles.historyPositionText}>#{index + 1}</Text>
                </View>
              </View>

              <View style={styles.historyItems}>
                {pedido.items.map((item) => (
                  <View key={item.plato.id} style={styles.historyItemRow}>
                    <Text style={styles.historyItemQty}>{item.cantidad}x</Text>
                    <Text style={styles.historyItemName}>{item.plato.nombre}</Text>
                    <Text style={styles.historyItemCategory}>{item.plato.categoria}</Text>
                  </View>
                ))}
              </View>

              {pedido.nota && (
                <View style={styles.historyNota}>
                  <Ionicons name="chatbox-outline" size={14} color="#BE185D" style={{ marginRight: 6 }} />
                  <Text style={styles.historyNotaText}>{pedido.nota}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  stats: {
    marginBottom: 20,
  },
  statCard: {
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
  list: {
    gap: 12,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    padding: 16,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3E8FF',
  },
  historyTurno: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  historyTurnoLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
  },
  historyTurnoNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#BE185D',
  },
  historyTime: {
    alignItems: 'center',
  },
  historyTimeLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'uppercase',
  },
  historyTimeValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  historyPosition: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  historyPositionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F59E0B',
  },
  historyItems: {
    gap: 6,
    marginBottom: 8,
  },
  historyItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  historyItemQty: {
    fontSize: 13,
    fontWeight: '700',
    color: '#BE185D',
    minWidth: 20,
  },
  historyItemName: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: '#111827',
  },
  historyItemCategory: {
    fontSize: 10,
    fontWeight: '600',
    color: '#BE185D',
    backgroundColor: '#FDF2F8',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
    textTransform: 'capitalize',
  },
  historyNota: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3E8FF',
  },
  historyNotaText: {
    fontSize: 12,
    color: '#831843',
    fontStyle: 'italic',
    flex: 1,
  },
});
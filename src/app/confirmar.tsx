import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { CarritoItem } from '@/context/ComedorContext';
import { useComedor } from '@/context/ComedorContext';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Ionicons } from '@expo/vector-icons';

export default function ConfirmarScreen() {
  const { carrito, notaCocina, confirmarPedido, limpiarCarrito } = useComedor();

  const total = carrito.reduce((sum, item) => sum + item.plato.precio * item.cantidad, 0);
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  useEffect(() => {
    if (carrito.length === 0) {
      router.replace('/carrito');
    }
  }, [carrito, router]);

  const handleConfirmar = () => {
    const numero = confirmarPedido(carrito, notaCocina);
    limpiarCarrito();
    router.replace(`/turno/${numero}`);
  };

  const handleCancelar = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Ionicons name="receipt-outline" size={48} color="#BE185D" style={styles.headerIcon} />
        <Text style={styles.headerTitle}>Confirmar Pedido</Text>
        <Text style={styles.headerSubtitle}>Revisa tu orden antes de enviar a cocina</Text>
      </View>

      <View style={styles.itemsCard}>
        <Text style={styles.sectionTitle}>Platos ({totalItems} items)</Text>
        {carrito.map((item: CarritoItem) => (
          <View key={item.plato.id} style={styles.confirmItem}>
            <View style={styles.confirmItemLeft}>
              <Text style={styles.confirmItemName}>{item.plato.nombre}</Text>
              <Text style={styles.confirmItemDetail}>
                {item.cantidad} x $ {item.plato.precio.toLocaleString()}
              </Text>
            </View>
            <Text style={styles.confirmItemTotal}>
              $ {(item.plato.precio * item.cantidad).toLocaleString()}
            </Text>
          </View>
        ))}
      </View>

      {notaCocina && (
        <View style={styles.notaCard}>
          <View style={styles.notaHeader}>
            <Ionicons name="chatbox-outline" size={20} color="#BE185D" />
            <Text style={styles.notaLabel}>Nota para cocina</Text>
          </View>
          <Text style={styles.notaText}>"{notaCocina}"</Text>
        </View>
      )}

      <View style={styles.totalCard}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal</Text>
          <Text style={styles.totalValue}>$ {total.toLocaleString()}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Servicio</Text>
          <Text style={styles.totalValue}>$ 0</Text>
        </View>
        <View style={styles.totalDivider} />
        <View style={styles.totalRowFinal}>
          <Text style={styles.totalLabelFinal}>Total a pagar</Text>
          <Text style={styles.totalValueFinal}>$ {total.toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.buttonSecondary} onPress={handleCancelar}>
          <Text style={styles.buttonSecondaryText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleConfirmar}>
          <Ionicons name="send-outline" size={22} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.buttonPrimaryText}>Confirmar y Generar Turno</Text>
        </TouchableOpacity>
      </View>

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
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 8,
  },
  headerIcon: {
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  itemsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3E8FF',
  },
  confirmItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  confirmItemLeft: {
    flex: 1,
  },
  confirmItemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  confirmItemDetail: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  confirmItemTotal: {
    fontSize: 15,
    fontWeight: '700',
    color: '#BE185D',
  },
  notaCard: {
    backgroundColor: '#FDF2F8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FCE7F3',
    padding: 14,
    marginBottom: 16,
  },
  notaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  notaLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#831843',
  },
  notaText: {
    fontSize: 14,
    color: '#831843',
    fontStyle: 'italic',
  },
  totalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    padding: 16,
    marginBottom: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 15,
    color: '#6B7280',
  },
  totalValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  totalDivider: {
    height: 1,
    backgroundColor: '#F3E8FF',
    marginVertical: 10,
  },
  totalRowFinal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabelFinal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  totalValueFinal: {
    fontSize: 22,
    fontWeight: '800',
    color: '#BE185D',
  },
  buttons: {
    gap: 12,
    paddingHorizontal: 4,
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
  buttonPrimary: {
    backgroundColor: '#BE185D',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
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
});
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { CarritoItem } from '@/context/ComedorContext';
import { DondeEstoy } from '@/components/DondeEstoy';
import { useComedor } from '@/context/ComedorContext';
import { Ionicons } from '@expo/vector-icons';

export default function CarritoScreen() {
  const { carrito, quitarDelCarrito, deshacerUltimo, puedeDeshacer, notaCocina, limpiarCarrito, agregarAlCarrito } = useComedor();

  const total = carrito.reduce((sum, item) => sum + item.plato.precio * item.cantidad, 0);
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  const handleConfirmar = () => {
    if (carrito.length === 0) {
      Alert.alert('Carrito vacío', 'Agrega al menos un plato antes de confirmar');
      return;
    }
    router.push('/confirmar');
  };

  const handleNota = () => {
    router.push('/carrito/nota');
  };

  const handleDeshacer = () => {
    if (puedeDeshacer) {
      deshacerUltimo();
    }
  };

  const handleQuitar = (id: number) => {
    Alert.alert('Quitar plato', '¿Eliminar este plato del carrito?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Quitar', style: 'destructive', onPress: () => quitarDelCarrito(id) },
    ]);
  };

  if (carrito.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={64} color="#D1D5DB" style={styles.emptyIcon} />
        <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
        <Text style={styles.emptyText}>Explora el menú y agrega tus platos favoritos</Text>
        <Link href="/menu" style={styles.emptyButton}>
          <Text style={styles.emptyButtonText}>Ir al Menú</Text>
        </Link>
        <DondeEstoy />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.list}>
        {carrito.map((item: CarritoItem) => (
          <View key={item.plato.id} style={styles.itemCard}>
            <View style={styles.itemImage}><Text style={styles.itemImageText}>{item.plato.imagen}</Text></View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.plato.nombre}</Text>
              <Text style={styles.itemPrice}>$ {item.plato.precio.toLocaleString()} c/u</Text>
              <View style={styles.quantityRow}>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => quitarDelCarrito(item.plato.id)}
                  disabled={item.cantidad <= 1}
                >
                  <Ionicons name="remove" size={20} color={item.cantidad <= 1 ? '#D1D5DB' : '#BE185D'} />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.cantidad}</Text>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => agregarAlCarrito(item.plato)}
                >
                  <Ionicons name="add" size={20} color="#BE185D" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.itemTotal}>$ {(item.plato.precio * item.cantidad).toLocaleString()}</Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleQuitar(item.plato.id)}>
                <Ionicons name="trash-bin-outline" size={22} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal ({totalItems} items)</Text>
          <Text style={styles.summaryValue}>$ {total.toLocaleString()}</Text>
        </View>
        {notaCocina && (
          <View style={styles.notaRow}>
            <Ionicons name="chatbox-outline" size={16} color="#BE185D" style={{ marginRight: 6 }} />
            <Text style={styles.notaText}>Nota: {notaCocina}</Text>
          </View>
        )}
        <View style={styles.divider} />
        <View style={styles.summaryRowTotal}>
          <Text style={styles.summaryLabelTotal}>Total</Text>
          <Text style={styles.summaryValueTotal}>$ {total.toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonSecondary, !puedeDeshacer && styles.actionButtonDisabled]}
          onPress={handleDeshacer}
          disabled={!puedeDeshacer}
        >
          <Ionicons name="arrow-undo-outline" size={20} color={puedeDeshacer ? '#BE185D' : '#D1D5DB'} style={{ marginRight: 6 }} />
          <Text style={[
            styles.actionButtonText,
            !puedeDeshacer && styles.actionButtonTextDisabled,
          ]}>
            Deshacer último
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButtonSecondary} onPress={handleNota}>
          <Ionicons name="create-outline" size={20} color="#BE185D" style={{ marginRight: 6 }} />
          <Text style={styles.actionButtonText}>Agregar nota</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButtonPrimary} onPress={handleConfirmar}>
          <Ionicons name="checkmark-circle" size={22} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.actionButtonTextPrimary}>Confirmar Pedido</Text>
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
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
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#BE185D',
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  list: {
    gap: 12,
    marginBottom: 16,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    padding: 12,
    gap: 12,
  },
  itemImage: {
    fontSize: 36,
    width: 56,
    height: 56,
    backgroundColor: '#FDF2F8',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImageText: {
    fontSize: 36,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  itemPrice: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    minWidth: 24,
    textAlign: 'center',
  },
  itemRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 8,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#BE185D',
  },
  deleteButton: {
    padding: 4,
  },
  summary: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    padding: 16,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  notaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#FDF2F8',
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  notaText: {
    fontSize: 13,
    color: '#831843',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3E8FF',
    marginVertical: 8,
  },
  summaryRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabelTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  summaryValueTotal: {
    fontSize: 22,
    fontWeight: '800',
    color: '#BE185D',
  },
  actions: {
    gap: 10,
    paddingHorizontal: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonSecondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3E8FF',
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#BE185D',
  },
  actionButtonDisabled: {
    opacity: 0.5,
  },
  actionButtonTextDisabled: {
    color: '#D1D5DB',
  },
  actionButtonPrimary: {
    backgroundColor: '#BE185D',
    shadowColor: '#BE185D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  actionButtonTextPrimary: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
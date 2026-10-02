import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Plato, obtenerPlatoPorId } from '@/data/platos';
import { DondeEstoy } from '@/components/DondeEstoy';
import { useComedor } from '@/context/ComedorContext';
import { Ionicons } from '@expo/vector-icons';

export default function PlatoDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { agregarAlCarrito } = useComedor();

  const platoId = parseInt(id ?? '', 10);
  const plato = obtenerPlatoPorId(platoId);

  useEffect(() => {
    if (isNaN(platoId) || !plato) {
      router.replace('/menu');
    }
  }, [platoId, plato, router]);

  if (!plato) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  const handleAgregar = () => {
    agregarAlCarrito(plato);
    Alert.alert('Agregado', `${plato.nombre} se agregó al carrito`, [
      { text: 'Ver Carrito', onPress: () => router.push('/carrito') },
      { text: 'Seguir Comprando', style: 'cancel' },
    ]);
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.imageContainer}>
        <Text style={styles.bigIcon}>{plato.imagen}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{plato.nombre}</Text>
        <View style={styles.categoryRow}>
          <View
            style={{
              backgroundColor: '#FDF2F8',
              borderRadius: 16,
              paddingHorizontal: 12,
              paddingVertical: 4,
            }}
          >
            <Text style={styles.categoryText}>{plato.categoria}</Text>
          </View>
        </View>
        <Text style={styles.description}>{plato.descripcion}</Text>
        <Text style={styles.price}>$ {plato.precio.toLocaleString()}</Text>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAgregar} activeOpacity={0.9}>
        <Ionicons name="cart-outline" size={22} color="#FFFFFF" style={{ marginRight: 8 }} />
        <Text style={styles.addButtonText}>Agregar al Carrito</Text>
      </TouchableOpacity>

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
    paddingBottom: 32,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  imageContainer: {
    backgroundColor: '#BE185D',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
    marginBottom: 24,
  },
  bigIcon: {
    fontSize: 100,
  },
  info: {
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  categoryRow: {
    marginTop: 8,
    marginBottom: 16,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#BE185D',
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: '800',
    color: '#BE185D',
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: '#BE185D',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 8,
    shadowColor: '#BE185D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
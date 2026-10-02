import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { platos, categorias, obtenerPlatosPorCategoria } from '@/data/platos';
import { DondeEstoy } from '@/components/DondeEstoy';

export default function MenuScreen() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Nuestro Menú</Text>
        <Text style={styles.subtitle}>Explora todas las opciones disponibles</Text>
      </View>

      {categorias.map((cat) => {
        const platosCat = obtenerPlatosPorCategoria(cat.id);
        if (platosCat.length === 0) return null;
        return (
          <View key={cat.id} style={styles.categorySection}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryIcon}>{cat.icono}</Text>
              <Text style={styles.categoryTitle}>{cat.nombre}</Text>
            </View>
            <View style={styles.platosGrid}>
              {platosCat.map((plato) => (
                <Link key={plato.id} href={`../${plato.id}`} style={styles.platoCard}>
                  <View style={styles.platoImage}><Text style={styles.platoImageText}>{plato.imagen}</Text></View>
                  <View style={styles.platoInfo}>
                    <Text style={styles.platoName}>{plato.nombre}</Text>
                    <Text style={styles.platoDesc} numberOfLines={2}>
                      {plato.descripcion}
                    </Text>
                    <Text style={styles.platoPrice}>$ {plato.precio.toLocaleString()}</Text>
                  </View>
                </Link>
              ))}
            </View>
          </View>
        );
      })}

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
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  categorySection: {
    marginBottom: 28,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  platosGrid: {
    gap: 12,
  },
  platoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    padding: 12,
    gap: 12,
  },
  platoImage: {
    fontSize: 40,
    width: 64,
    height: 64,
    backgroundColor: '#FDF2F8',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  platoImageText: {
    fontSize: 40,
  },
  platoInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  platoName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  platoDesc: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
    lineHeight: 18,
  },
  platoPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#BE185D',
    marginTop: 6,
  },
});
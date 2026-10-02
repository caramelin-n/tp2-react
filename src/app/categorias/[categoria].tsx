import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Link } from 'expo-router';
import { Plato, obtenerPlatosPorCategoria, Categoria, categorias } from '@/data/platos';
import { DondeEstoy } from '@/components/DondeEstoy';

export default function CategoriaScreen() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();

  const catValida = categorias.find((c) => c.id === categoria) ? (categoria as Categoria) : null;
  const platos = catValida ? obtenerPlatosPorCategoria(catValida) : [];
  const catInfo = catValida ? categorias.find((c) => c.id === categoria) : null;

  if (!catValida) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>Categoría no encontrada</Text>
        <Text style={styles.errorText}>La categoría "{categoria}" no existe.</Text>
        <DondeEstoy />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>{catInfo?.icono}</Text>
        <Text style={styles.headerTitle}>{catInfo?.nombre}</Text>
        <Text style={styles.headerCount}>{platos.length} opciones disponibles</Text>
      </View>

      {platos.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No hay platos en esta categoría aún.</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {platos.map((plato) => (
            <Link key={plato.id} href={`/menu/${plato.id}`} style={styles.platoCard}>
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 8,
  },
  headerIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  headerCount: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3E8FF',
  },
  emptyText: {
    fontSize: 15,
    color: '#9CA3AF',
  },
  list: {
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
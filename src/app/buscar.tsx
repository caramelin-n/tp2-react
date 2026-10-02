import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router, Link } from 'expo-router';
import { Plato, platos, categorias, Categoria, obtenerPlatosPorCategoria } from '@/data/platos';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Ionicons } from '@expo/vector-icons';

export default function BuscarScreen() {
  const { q = '', categoria = '' } = useLocalSearchParams<{ q?: string; categoria?: string }>();
  const [query, setQuery] = useState(q);
  const [selectedCat, setSelectedCat] = useState<Categoria | 'todas'>(
    categorias.find((c) => c.id === categoria) ? (categoria as Categoria) : 'todas'
  );

  useEffect(() => {
    router.setParams({ q: query, categoria: selectedCat === 'todas' ? '' : selectedCat });
  }, [query, selectedCat, router]);

  const filtrados = platos.filter((plato) => {
    const coincideTexto =
      query === '' ||
      plato.nombre.toLowerCase().includes(query.toLowerCase()) ||
      plato.descripcion.toLowerCase().includes(query.toLowerCase());
    const coincideCat = selectedCat === 'todas' || plato.categoria === selectedCat;
    return coincideTexto && coincideCat;
  });

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.searchBar}>
        <Ionicons name="search" size={22} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar platos..."
          value={query}
          onChangeText={setQuery}
          placeholderTextColor="#9CA3AF"
        />
        {query && (
          <TouchableOpacity onPress={() => setQuery('')} style={styles.clearButton}>
            <Ionicons name="close" size={22} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.categoryFilter}>
        <TouchableOpacity
          style={[
            styles.categoryChip,
            selectedCat === 'todas' && styles.categoryChipActive,
          ]}
          onPress={() => setSelectedCat('todas')}
        >
          <Text style={[
            styles.categoryChipText,
            selectedCat === 'todas' && styles.categoryChipTextActive,
          ]}>
            Todas
          </Text>
        </TouchableOpacity>
        {categorias.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryChip,
              selectedCat === cat.id && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCat(cat.id)}
          >
            <Text style={[
              styles.categoryChipText,
              selectedCat === cat.id && styles.categoryChipTextActive,
            ]}>
              {cat.icono} {cat.nombre}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>
          {filtrados.length} {filtrados.length === 1 ? 'resultado' : 'resultados'}
          {query && <Text style={styles.resultsQuery}> para &ldquo;{query}&rdquo;</Text>}
        </Text>
      </View>

      {filtrados.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="restaurant-outline" size={48} color="#D1D5DB" style={styles.emptyIcon} />
          <Text style={styles.emptyText}>
            {query
              ? `No se encontraron platos para &ldquo;${query}&rdquo;`
              : 'No hay platos en esta categoría'}
          </Text>
          <Text style={styles.emptyHint}>Intenta con otros términos o categorías</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {filtrados.map((plato) => (
            <Link key={plato.id} href={`/menu/${plato.id}`} style={styles.platoCard}>
              <View style={styles.platoImage}><Text style={styles.platoImageText}>{plato.imagen}</Text></View>
              <View style={styles.platoInfo}>
                <Text style={styles.platoName}>{plato.nombre}</Text>
                <View style={styles.platoMeta}>
                  <Text style={styles.platoCategory}>{plato.categoria}</Text>
                  <Text style={styles.platoPrice}>$ {plato.precio.toLocaleString()}</Text>
                </View>
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 10,
  },
  clearButton: {
    padding: 4,
  },
  categoryFilter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  categoryChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  categoryChipActive: {
    backgroundColor: '#BE185D',
    borderColor: '#BE185D',
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  resultsHeader: {
    marginBottom: 12,
  },
  resultsTitle: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '500',
  },
  resultsQuery: {
    fontWeight: '600',
    color: '#BE185D',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3E8FF',
  },
  emptyIcon: {
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  emptyHint: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 4,
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
  platoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  platoCategory: {
    fontSize: 12,
    fontWeight: '600',
    color: '#BE185D',
    backgroundColor: '#FDF2F8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    textTransform: 'capitalize',
  },
  platoPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#BE185D',
  },
});
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { platos, categorias } from '@/data/platos';
import { DondeEstoy } from '@/components/DondeEstoy';
import { useComedor } from '@/context/ComedorContext';

export default function HomeScreen() {
  const { conSesion, login, logout } = useComedor();

  const handleLoginDemo = () => login('alumno', 'ipf');
  const handleLogout = () => logout();

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Comedor IPF</Text>
          <Text style={styles.heroSubtitle}>
            Instituto Politécnico Formosa — React Native II
          </Text>
          <Text style={styles.heroTagline}>Tu menú diario, a un toque</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categorías</Text>
        <View style={styles.categoriesGrid}>
          {categorias.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoryCard}
              onPress={() => router.push(`/categorias/${cat.id}`)}
            >
              <Text style={styles.categoryIcon}>{cat.icono}</Text>
              <Text style={styles.categoryName}>{cat.nombre}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Platos Destacados</Text>
          <Link href="/menu" style={styles.verTodos}>
            Ver todos
          </Link>
        </View>
        <View style={styles.featuredList}>
          {platos.slice(0, 4).map((plato) => (
            <Link key={plato.id} href={`/menu/${plato.id}`} style={styles.featuredCard}>
              <View style={styles.featuredImage}><Text style={styles.featuredImageText}>{plato.imagen}</Text></View>
              <View style={styles.featuredInfo}>
                <Text style={styles.featuredName}>{plato.nombre}</Text>
                <Text style={styles.featuredCategory}>{plato.categoria}</Text>
                <Text style={styles.featuredPrice}>$ {plato.precio.toLocaleString()}</Text>
              </View>
            </Link>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accesos Rápidos</Text>
        <View style={styles.quickActions}>
          <Link href="/buscar" style={styles.quickAction}>
            <Ionicons name="search" size={24} color="#BE185D" />
            <Text style={styles.quickActionText}>Buscar Platos</Text>
          </Link>
          <Link href="/ayuda" style={styles.quickAction}>
            <Ionicons name="help-circle" size={24} color="#BE185D" />
            <Text style={styles.quickActionText}>Ayuda</Text>
          </Link>
        </View>
      </View>

      <View style={styles.authSection}>
        {conSesion ? (
          <>
            <Text style={styles.authText}>Sesión: <Text style={styles.authUser}>alumno</Text></Text>
            <TouchableOpacity style={styles.authButton} onPress={handleLogout}>
              <Text style={styles.authButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.authText}>No has iniciado sesión</Text>
            <TouchableOpacity style={styles.authButtonPrimary} onPress={handleLoginDemo}>
              <Text style={styles.authButtonPrimaryText}>Entrar como Alumno (demo)</Text>
            </TouchableOpacity>
            <Text style={styles.authHint}>
              Credenciales: alumno / ipf  •  cocina / cocina  •  admin / 1234
            </Text>
          </>
        )}
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
    paddingBottom: 32,
  },
  hero: {
    backgroundColor: '#BE185D',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    padding: 24,
    paddingTop: 40,
    marginBottom: 24,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#FCE7F3',
    marginBottom: 12,
  },
  heroTagline: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FDF2F8',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  verTodos: {
    fontSize: 14,
    color: '#BE185D',
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  categoryIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  featuredList: {
    gap: 12,
  },
  featuredCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    padding: 12,
    gap: 12,
  },
  featuredImage: {
    fontSize: 40,
    width: 60,
    height: 60,
    backgroundColor: '#FDF2F8',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredImageText: {
    fontSize: 40,
  },
  featuredInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  featuredName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  featuredCategory: {
    fontSize: 12,
    color: '#BE185D',
    fontWeight: '500',
    textTransform: 'capitalize',
    marginTop: 2,
  },
  featuredPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#BE185D',
    marginTop: 4,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    paddingVertical: 14,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  authSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    marginHorizontal: 16,
    alignItems: 'center',
    gap: 12,
  },
  authText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  authUser: {
    fontWeight: '700',
    color: '#BE185D',
  },
  authButton: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  authButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
  },
  authButtonPrimary: {
    backgroundColor: '#BE185D',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  authButtonPrimaryText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  authHint: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 8,
  },
});
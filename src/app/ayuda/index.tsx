import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Ionicons } from '@expo/vector-icons';

const temas = [
  {
    slug: 'como-pedir',
    titulo: 'Cómo hacer un pedido',
    resumen: 'Pasos para navegar el menú, agregar al carrito y confirmar tu turno.',
    icono: 'list-outline' as any,
  },
  {
    slug: 'carrito-y-notas',
    titulo: 'Carrito y notas a cocina',
    resumen: 'Gestiona cantidades, deshace acciones y deja instrucciones para la cocina.',
    icono: 'cart-outline' as any,
  },
  {
    slug: 'turnos-y-espera',
    titulo: 'Turnos y tiempo de espera',
    resumen: 'Entiende tu número de turno, posición en cola y tiempo estimado.',
    icono: 'ticket-outline' as any,
  },
  {
    slug: 'cocina',
    titulo: 'Panel de cocina (staff)',
    resumen: 'Cómo el personal atiende pedidos y ve el historial de atendidos.',
    icono: 'flame-outline' as any,
  },
  {
    slug: 'credenciales',
    titulo: 'Credenciales de acceso',
    resumen: 'Usuarios de prueba: alumno/ipf, cocina/cocina, admin/1234.',
    icono: 'key-outline' as any,
  },
  {
    slug: 'contacto',
    titulo: 'Contacto y soporte',
    resumen: 'Canales para reportar problemas o sugerencias sobre la app.',
    icono: 'mail-outline' as any,
  },
];

export default function AyudaIndexScreen() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Ionicons name="help-circle" size={48} color="#BE185D" style={styles.headerIcon} />
        <Text style={styles.headerTitle}>Centro de Ayuda</Text>
        <Text style={styles.headerSubtitle}>Encuentra respuestas a tus dudas</Text>
      </View>

      <View style={styles.list}>
        {temas.map((tema) => (
          <Link key={tema.slug} href={`/ayuda/${tema.slug}`} style={styles.itemCard}>
            <View style={styles.itemIcon}>
              <Ionicons name={tema.icono} size={24} color="#BE185D" />
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{tema.titulo}</Text>
              <Text style={styles.itemResumen}>{tema.resumen}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#D1D5DB" />
          </Link>
        ))}
      </View>

      <View style={styles.contactCard}>
        <Text style={styles.contactTitle}>¿No encontraste lo que buscabas?</Text>
        <Text style={styles.contactText}>
          Escríbenos a <Text style={styles.contactEmail}>soporte@comedoripf.edu.ar</Text> o acércate a la administración del comedor.
        </Text>
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
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 4,
  },
  list: {
    gap: 12,
    marginBottom: 24,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    padding: 16,
    gap: 14,
  },
  itemIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#FDF2F8',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  itemResumen: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
    lineHeight: 18,
  },
  contactCard: {
    backgroundColor: '#FDF2F8',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FCE7F3',
    padding: 20,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#831843',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#831843',
    textAlign: 'center',
    lineHeight: 22,
  },
  contactEmail: {
    fontWeight: '700',
    color: '#BE185D',
  },
});
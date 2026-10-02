import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Ionicons } from '@expo/vector-icons';

const articulos: Record<string, { titulo: string; contenido: string[]; icono: string }> = {
  'como-pedir': {
    titulo: 'Cómo hacer un pedido',
    icono: 'list-outline',
    contenido: [
      '1. Abre la app y ve a la pestaña "Menú" o usa "Buscar" para encontrar platos.',
      '2. Toca cualquier plato para ver su detalle (descripción, precio, categoría).',
      '3. Presiona "Agregar al carrito". El badge en la pestaña Carrito se actualizará.',
      '4. Repite para agregar más platos. Puedes mezclar categorías.',
      '5. Ve a la pestaña "Carrito" para revisar tu pedido, cambiar cantidades o agregar una nota para la cocina.',
      '6. Toca "Confirmar pedido" → revisa el resumen → "Confirmar y Generar Turno".',
      '7. Recibirás tu número de turno. La pantalla muestra cuántos pedidos hay por delante y el tiempo estimado.',
      '8. Cuando tu turno sea atendido, el personal de cocina te avisará.',
    ],
  },
  'carrito-y-notas': {
    titulo: 'Carrito y notas a cocina',
    icono: 'cart-outline',
    contenido: [
      '• Cada plato agregado suma 1 unidad. Usa los botones +/− en el carrito para ajustar cantidades.',
      '• "Deshacer último" revierte la última adición individual (usa la pila de deshacer). Se deshabilita si no hay acciones para deshacer.',
      '• "Agregar nota" abre una hoja inferior (formSheet) para escribir instrucciones: alergias, punto de cocción, sin sal, etc.',
      '• La nota se muestra en la confirmación y la cocina la ve al atender tu pedido.',
      '• Al confirmar, el carrito se vacía y la nota se reinicia para el próximo pedido.',
    ],
  },
  'turnos-y-espera': {
    titulo: 'Turnos y tiempo de espera',
    icono: 'ticket-outline',
    contenido: [
      '• Al confirmar, se asigna un número correlativo de turno (1, 2, 3...).',
      '• Los pedidos entran a una cola FIFO (Cola). El primero en entrar es el primero en ser atendido.',
      '• En la pantalla de turno verás: tu número, cuántos pedidos hay por delante y el tiempo estimado (posición × 3 min).',
      '• Usa "router.replace" al ir a /turno/[numero] para que el botón "Atrás" del sistema no vuelva a la confirmación.',
      '• Cuando la cocina atiende, tu pedido sale de la cola y pasa al historial (Pila).',
    ],
  },
  'cocina': {
    titulo: 'Panel de cocina (staff)',
    icono: 'flame-outline',
    contenido: [
      '• Accesible solo con sesión activa (credenciales: cocina/cocina o admin/1234).',
      '• Se abre como Drawer (deslizador lateral) con dos vistas: "Pedidos Pendientes" e "Historial Atendidos".',
      '• En "Pedidos Pendientes" ves el turno al frente de la cola, sus items, nota y hora de recepción.',
      '• Botón "Atender siguiente": desencola el pedido actual y lo apila en el historial de atendidos.',
      '• En "Historial Atendidos" se listan los pedidos ya servidos, del más reciente (tope de la pila) al más antiguo.',
      '• Botón "Salir" cierra la sesión y vuelve al inicio.',
    ],
  },
  'credenciales': {
    titulo: 'Credenciales de acceso',
    icono: 'key-outline',
    contenido: [
      'La app incluye tres usuarios de prueba hardcodeados:',
      '',
      '👤 Alumno:',
      '   Usuario: alumno',
      '   Contraseña: ipf',
      '   Acceso: Menú, Carrito, Buscar, Categorías, Ayuda.',
      '',
      '👨‍🍳 Cocina:',
      '   Usuario: cocina',
      '   Contraseña: cocina',
      '   Acceso: Todo lo de alumno + Panel de Cocina (Drawer protegido).',
      '',
      '🔧 Admin:',
      '   Usuario: admin',
      '   Contraseña: 1234',
      '   Acceso: Igual que cocina (panel de cocina incluido).',
      '',
      'La protección de rutas usa Stack.Protected en el layout raíz.',
    ],
  },
  'contacto': {
    titulo: 'Contacto y soporte',
    icono: 'mail-outline',
    contenido: [
      'Para dudas, sugerencias o reportar errores:',
      '',
      '📧 Email: soporte@comedoripf.edu.ar',
      '📍 Presencial: Administración del Comedor IPF, Planta Baja',
      '🕐 Horario: Lunes a Viernes 7:30–14:00',
      '',
      'Esta app fue desarrollada como Trabajo Práctico N° 2 de React Native II — Instituto Politécnico Formosa.',
      'Tecnologías: Expo SDK 57, Expo Router, React Native, TypeScript.',
      'Estructuras de datos propias: Pila (LIFO) y Cola (FIFO) implementadas sin librerías externas.',
    ],
  },
};

export default function AyudaArticuloScreen() {
  const { slug } = useLocalSearchParams<{ slug?: string[] }>();
  const path = Array.isArray(slug) ? slug.join('/') : slug ?? '';
  const articulo = articulos[path];

  if (!articulo) {
    return (
      <View style={styles.container}>
        <Ionicons name="help-circle-outline" size={48} color="#D1D5DB" style={styles.errorIcon} />
        <Text style={styles.errorTitle}>Artículo no encontrado</Text>
        <Text style={styles.errorText}>No existe ayuda para "{path}"</Text>
        <Link href="/ayuda" style={styles.backLink}>
          <Text style={styles.backLinkText}>← Volver al índice</Text>
        </Link>
        <DondeEstoy />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Link href="/ayuda" style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#BE185D" />
        </Link>
        <View style={styles.headerInfo}>
          <View style={styles.headerIcon}>
            <Ionicons name={articulo.icono as any} size={28} color="#BE185D" />
          </View>
          <Text style={styles.headerTitle}>{articulo.titulo}</Text>
        </View>
      </View>

      <View style={styles.articleCard}>
        {articulo.contenido.map((parrafo, i) => (
          <Text key={i} style={styles.paragraph}>
            {parrafo}
          </Text>
        ))}
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorIcon: {
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  backLink: {
    backgroundColor: '#BE185D',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backLinkText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  backButton: {
    padding: 8,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  headerIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#FDF2F8',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  articleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    padding: 20,
  },
  paragraph: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 12,
  },
});
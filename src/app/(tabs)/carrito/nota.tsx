import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { router } from 'expo-router';
import { useComedor } from '@/context/ComedorContext';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Ionicons } from '@expo/vector-icons';

export default function NotaScreen() {
  const { notaCocina, setNotaCocina } = useComedor();
  const [texto, setTexto] = useState(notaCocina);

  useEffect(() => {
    setTexto(notaCocina);
  }, [notaCocina]);

  const handleGuardar = () => {
    setNotaCocina(texto);
    router.back();
  };

  const handleLimpiar = () => {
    setTexto('');
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nota para la Cocina</Text>
        <TouchableOpacity onPress={handleGuardar} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Aclaraciones, alergias o preferencias:</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={8}
          placeholder="Ej: Sin sal, alérgico a frutos secos, punto de cocción medio..."
          value={texto}
          onChangeText={setTexto}
          placeholderTextColor="#9CA3AF"
          blurOnSubmit={false}
        />
        {texto.length > 0 && (
          <View style={styles.charCount}>
            <Text style={styles.charCountText}>{texto.length}/500 caracteres</Text>
            <TouchableOpacity onPress={handleLimpiar} style={styles.clearButton}>
              <Ionicons name="trash-bin-outline" size={18} color="#EF4444" style={{ marginRight: 4 }} />
              <Text style={styles.clearButtonText}>Limpiar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle-outline" size={20} color="#BE185D" style={{ marginRight: 8 }} />
        <Text style={styles.infoText}>
          Esta nota será visible para el personal de cocina al recibir tu pedido.
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#BE185D',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    padding: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
  },
  textArea: {
    fontSize: 15,
    color: '#111827',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    padding: 12,
    minHeight: 160,
    textAlignVertical: 'top',
  },
  charCount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  charCountText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
  },
  infoCard: {
    backgroundColor: '#FDF2F8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FCE7F3',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoText: {
    fontSize: 13,
    color: '#831843',
    flex: 1,
    lineHeight: 20,
  },
});
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Keyboard } from 'react-native';
import { router } from 'expo-router';
import { useComedor } from '@/context/ComedorContext';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const { login } = useComedor();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    Keyboard.dismiss();
    setError('');
    if (login(user, pass)) {
      router.replace('/(tabs)');
    } else {
      setError('Credenciales inválidas. Prueba: alumno/ipf, cocina/cocina, admin/1234');
    }
  };

  const handleDemo = (u: string, p: string) => {
    setUser(u);
    setPass(p);
    handleLogin();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="restaurant-outline" size={56} color="#BE185D" style={styles.icon} />
        <Text style={styles.title}>Comedor IPF</Text>
        <Text style={styles.subtitle}>Iniciar sesión para acceder</Text>

        {error && (
          <View style={styles.error}>
            <Ionicons name="alert-circle-outline" size={18} color="#DC2626" style={{ marginRight: 8 }} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Usuario</Text>
          <TextInput
            style={styles.input}
            value={user}
            onChangeText={setUser}
            placeholder="alumno, cocina o admin"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="username"
            returnKeyType="next"
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Contraseña</Text>
          <TextInput
            style={styles.input}
            value={pass}
            onChangeText={setPass}
            placeholder="••••••••"
            secureTextEntry
            textContentType="password"
            returnKeyType="go"
            onSubmitEditing={handleLogin}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.9}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>Accesos rápidos (demo)</Text>
          <View style={styles.demoButtons}>
            <TouchableOpacity style={styles.demoButton} onPress={() => handleDemo('alumno', 'ipf')}>
              <Text style={styles.demoButtonText}>Alumno</Text>
              <Text style={styles.demoButtonHint}>ipf</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.demoButton} onPress={() => handleDemo('cocina', 'cocina')}>
              <Text style={styles.demoButtonText}>Cocina</Text>
              <Text style={styles.demoButtonHint}>cocina</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.demoButton} onPress={() => handleDemo('admin', '1234')}>
              <Text style={styles.demoButtonText}>Admin</Text>
              <Text style={styles.demoButtonHint}>1234</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    padding: 32,
    alignItems: 'center',
    shadowColor: '#BE185D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 24,
  },
  error: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 13,
    color: '#DC2626',
    flex: 1,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: '#111827',
  },
  button: {
    width: '100%',
    backgroundColor: '#BE185D',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#BE185D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  demoSection: {
    width: '100%',
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3E8FF',
  },
  demoTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 12,
  },
  demoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  demoButton: {
    flex: 1,
    backgroundColor: '#FDF2F8',
    borderWidth: 1,
    borderColor: '#FCE7F3',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  demoButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#BE185D',
  },
  demoButtonHint: {
    fontSize: 11,
    color: '#FB7185',
    marginTop: 2,
  },
});
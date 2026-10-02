import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ComedorProvider, useComedor } from '@/context/ComedorContext';
import React from 'react';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutInner() {
  const { conSesion } = useComedor();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF',
          borderBottomWidth: 1,
          borderBottomColor: '#F3E8FF',
          elevation: 0,
          shadowOpacity: 0,
        } as any,
        headerTitleStyle: {
          color: '#111827',
          fontWeight: '600',
        },
        headerTintColor: '#BE185D',
        cardStyle: { backgroundColor: '#F9FAFB' },
      } as any}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="categorias/[categoria]" />
      <Stack.Screen name="buscar" />
      <Stack.Screen name="confirmar" options={{ presentation: 'modal' } as any} />
      <Stack.Screen name="turno/[numero]" />
      <Stack.Screen name="ayuda/index" />
      <Stack.Screen name="ayuda/[...slug]" />
      <Stack.Screen name="pedido" />
      <Stack.Screen name="+not-found" />

      <Stack.Screen
        name="login"
        options={{
          presentation: 'modal',
          unstable_router: 'dismiss',
        } as any}
      />

      <Stack.Screen
        name="cocina"
        options={{
          presentation: 'modal',
        } as any}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ComedorProvider>
        <RootLayoutInner />
      </ComedorProvider>
    </GestureHandlerRootView>
  );
}
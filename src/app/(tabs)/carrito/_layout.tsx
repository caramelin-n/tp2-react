import { Stack } from 'expo-router';

export default function CarritoLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF',
          borderBottomWidth: 1,
          borderBottomColor: '#F3E8FF',
        } as any,
        headerTitleStyle: {
          color: '#111827',
          fontWeight: '600',
        },
        headerTintColor: '#BE185D',
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Carrito' }} />
      <Stack.Screen name="nota" options={{ title: 'Nota para Cocina', presentation: 'formSheet' }} />
    </Stack>
  );
}
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

export default function CocinaLayout() {
  return (
    <Drawer
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
        drawerContentOptions: {
          activeTintColor: '#BE185D',
          inactiveTintColor: '#9CA3AF',
          itemStyle: { marginVertical: 4 },
          labelStyle: { fontWeight: '600', fontSize: 14 },
        } as any,
        drawerStyle: {
          backgroundColor: '#FFFFFF',
        },
      } as any}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: 'Pedidos Pendientes',
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'list' : 'list-outline'}
              size={24}
              color={focused ? '#BE185D' : '#9CA3AF'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="atendidos"
        options={{
          title: 'Historial Atendidos',
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'time' : 'time-outline'}
              size={24}
              color={focused ? '#BE185D' : '#9CA3AF'}
            />
          ),
        }}
      />
    </Drawer>
  );
}
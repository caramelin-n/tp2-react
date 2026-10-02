import { Tabs } from 'expo-router/js-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useComedor } from '@/context/ComedorContext';
import React from 'react';

export default function TabsLayout() {
  const { carrito } = useComedor();
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F3E8FF',
          height: 64,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#BE185D',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={focused ? '#BE185D' : '#9CA3AF'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menú',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'restaurant' : 'restaurant-outline'}
              size={24}
              color={focused ? '#BE185D' : '#9CA3AF'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="carrito"
        options={{
          title: 'Carrito',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'cart' : 'cart-outline'}
              size={24}
              color={focused ? '#BE185D' : '#9CA3AF'}
            />
          ),
          tabBarBadge: totalItems > 0 ? totalItems : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#BE185D',
            minWidth: 18,
            height: 18,
            borderRadius: 9,
          },
        }}
      />
    </Tabs>
  );
}
import React, { useEffect } from 'react';
import { router } from 'expo-router';

export default function PedidoRedirect() {
  useEffect(() => {
    router.replace('/(tabs)/carrito');
  }, []);

  return null;
}
# Comedor IPF - Estructura del Proyecto

```
src/
├── app/
│   ├── _layout.tsx                    # Layout raíz con GestureHandlerRootView, ComedorProvider, unstable_settings
│   ├── +not-found.tsx                 # Pantalla 404 con usePathname()
│   ├── pedido.tsx                     # Redirección a /(tabs)/carrito
│   ├── login.tsx                      # Login modal (protegido: solo sin sesión)
│   ├── confirmar.tsx                  # Modal confirmación pedido → router.replace a /turno/[numero]
│   ├── buscar.tsx                     # Buscador con useLocalSearchParams y router.setParams
│   ├── categorias/
│   │   └── [categoria].tsx            # Lista platos por categoría validada
│   ├── turno/
│   │   └── [numero].tsx               # Turno asignado, cola adelante, tiempo estimado
│   ├── ayuda/
│   │   ├── index.tsx                  # Índice de temas de ayuda
│   │   └── [...slug].tsx              # Catch-all artículos de ayuda (profundidad variable)
│   ├── cocina/                        # Drawer protegido (solo con sesión)
│   │   ├── _layout.tsx                # Drawer de expo-router/drawer
│   │   ├── index.tsx                  # Pedido al frente, atender siguiente, logout
│   │   └── atendidos.tsx              # Historial atendidos (pila: tope = más reciente)
│   └── (tabs)/                        # Grupo de tabs (expo-router/js-tabs)
│       ├── _layout.tsx                # Tabs: Inicio, Menú, Carrito, Cocina (condicional)
│       ├── index.tsx                  # Home: hero, categorías, destacados, auth demo
│       ├── menu/
│       │   ├── _layout.tsx            # Stack interno para mantener tabs visibles
│       │   ├── index.tsx              # Menú agrupado por categoría
│       │   └── [id].tsx               # Detalle plato (validación numérica id, header dinámico)
│       └── carrito/
│           ├── _layout.tsx            # Stack interno con formSheet para nota
│           ├── index.tsx              # Lista items, total, deshacer, nota, confirmar
│           └── nota.tsx               # Pantalla nota cocina (formSheet)
├── components/
│   └── DondeEstoy.tsx                 # Diagnóstico: usePathname, useSegments, useLocalSearchParams (DEBUG=true)
├── context/
│   └── ComedorContext.tsx             # Provider global: sesión, carrito, pila deshacer, cola pedidos, historial atendidos
├── data/
│   └── platos.ts                      # 12 platos (3 por categoría), tipos, helpers de filtrado
└── estructuras/
    ├── Pila.ts                        # LIFO: push, pop, tope, vacia, tamanio, aArray()
    └── Cola.ts                        # FIFO eficiente: #items + #frente, encolar, desencolar, frente, vacia, tamanio, aArray()
```

## Puntos clave de arquitectura (SDK 57)

- **Tabs**: `expo-router/js-tabs` (no `expo-router`)
- **Drawer**: `expo-router/drawer` envuelto en `GestureHandlerRootView` en `_layout` raíz
- **Rutas tipadas**: `typedRoutes: true` en `app.json`
- **Ancla**: `unstable_settings = { anchor: '(tabs)' }` en `_layout` raíz
- **Protección**: `Stack.Protected` con `before` callbacks para login (solo sin sesión) y cocina (solo con sesión)
- **Navegación modal**: `presentation: "modal"` en confirmar y login
- **Navegación replace**: `router.replace` en confirmar → turno para evitar volver atrás
- **Estilos**: Sin arrays directos en `<View style={[...]}>` — usar componentes envueltos propios
- **Paleta**: Rosa gastronómico (#BE185D, #E11D48, #FB7185, #F43F5E) sobre neutros (#F9FAFB, #FFFFFF, #111827)
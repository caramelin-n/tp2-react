# Comedor IPF - React Native II (TP2)

Aplicación de gestión de comedor para el Instituto Politécnico Formosa. Desarrollada con **Expo SDK 57**, **Expo Router**, **TypeScript** y estructuras de datos propias (Pila/Cola).

## 🚀 Inicio rápido

### Prerrequisitos
- **Node.js** ≥ 18 (recomendado LTS)
- **npm** ≥ 9 (o yarn/pnpm)
- **Expo Go** instalado en tu dispositivo físico (iOS/Android) o emulador/simulador

### Instalación

```bash
# 1. Clonar/entrar al proyecto
cd comedor-ipf

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm start
# o: npx expo start
```

### Ejecutar en Expo Go

1. Ejecuta `npm start` — se abrirá Expo DevTools en el navegador
2. Escanea el **código QR** con:
   - **iOS**: App Cámara → abre en Expo Go
   - **Android**: App Expo Go → "Scan QR Code"
3. La app cargará en tu dispositivo (Hot Reload activado)

> **Nota**: Para que Expo Go funcione en red local, tu PC y celular deben estar en la **misma Wi-Fi**. Si falla, usa túnel: `npx expo start --tunnel`

### Plataformas específicas

```bash
# Android (requiere Android Studio/emulador configurado)
npm run android

# iOS (solo macOS con Xcode)
npm run ios

# Web
npm run web
```

## 📁 Estructura del proyecto

```
src/
├── app/                    # Rutas (Expo Router file-based)
│   ├── (tabs)/            # Grupo de tabs principales
│   ├── cocina/            # Drawer protegido (staff)
│   ├── ayuda/             # Catch-all [...slug]
│   └── ...                # Rutas modales, dinámicas, 404
├── components/            # UI reutilizable (DondeEstoy)
├── context/               # ComedorContext (estado global)
├── data/                  # Datos estáticos (platos.ts)
└── estructuras/           # Pila.ts, Cola.ts (LIFO/FIFO)
```

Ver árbol completo en [`ARBOL_PROYECTO.md`](ARBOL_PROYECTO.md)

## ⚙️ Configuración clave (SDK 57)

| Archivo | Configuración |
|---------|---------------|
| `app.json` | `"scheme": "comedoripf"`, `"experiments": { "typedRoutes": true }`, plugin `expo-router` |
| `src/app/_layout.tsx` | `unstable_settings = { anchor: '(tabs)' }`, `GestureHandlerRootView` |
| `src/app/(tabs)/_layout.tsx` | `Tabs` desde `expo-router/js-tabs` |
| `src/app/cocina/_layout.tsx` | `Drawer` desde `expo-router/drawer` |

## 🔐 Credenciales de prueba (hardcodeadas)

| Rol | Usuario | Contraseña | Acceso |
|-----|---------|------------|--------|
| Alumno | `alumno` | `ipf` | Menú, Carrito, Buscar, Ayuda |
| Cocina | `cocina` | `cocina` | Todo + Panel Cocina (Drawer) |
| Admin | `admin` | `1234` | Todo + Panel Cocina |

## 🧪 Funcionalidades implementadas

- **G1** Estructuras: `Pila` (LIFO) y `Cola` (FIFO eficiente sin `shift()`)
- **G2** Datos: 12 platos (3 por categoría: desayuno, almuerzo, bebidas, kiosco)
- **G3** Contexto global: sesión, carrito, pila deshacer, cola pedidos, historial atendidos
- **G4** (Opcionales) Badge en tab Carrito, tiempo estimado en turno (posición × 3 min), tab Cocina condicional, formSheet para nota

## 🐛 Solución de problemas

| Error | Solución |
|-------|----------|
| `Module not found` | `rm -rf node_modules package-lock.json && npm install` |
| Metro no conecta | Misma red Wi-Fi, o `npx expo start --tunnel` |
| "Invalid hook call" | Reinicia Metro: `npx expo start -c` |
| TypeScript errors | `npx tsc --noEmit` para diagnosticar |
| Gesture Handler crash | Asegúrate de `GestureHandlerRootView` en `_layout` raíz |

## 📦 Dependencias principales

```json
{
  "expo": "~57.0.0",
  "expo-router": "~5.0.0",
  "react": "18.3.1",
  "react-native": "0.76.5",
  "react-native-gesture-handler": "~2.20.0",
  "react-native-reanimated": "~3.16.0",
  "@expo/vector-icons": "^14.0.0"
}
```

## 📝 Scripts útiles

```bash
npm start          # Inicia Expo DevTools
npm run android    # Abre en emulador Android
npm run ios        # Abre en simulador iOS (macOS)
npm run web        # Abre en navegador
npm run lint       # ESLint + Expo lint
```

## 📄 Licencia

Trabajo Práctico N° 2 — React Native II — Instituto Politécnico Formosa — 2026# tp2-react

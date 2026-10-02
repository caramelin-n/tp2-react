import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Pila } from '@/estructuras/Pila';
import { Cola } from '@/estructuras/Cola';
import { Plato } from '@/data/platos';

export interface CarritoItem {
  plato: Plato;
  cantidad: number;
}

interface Pedido {
  numero: number;
  items: CarritoItem[];
  nota: string;
  fecha: Date;
}

interface ComedorContextValue {
  // Sesión
  usuario: string | null;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
  conSesion: boolean;

  // Carrito
  carrito: CarritoItem[];
  agregarAlCarrito: (plato: Plato) => void;
  quitarDelCarrito: (id: number) => void;
  notaCocina: string;
  setNotaCocina: (nota: string) => void;
  limpiarCarrito: () => void;

  // Pila de Deshacer
  deshacerUltimo: () => void;
  puedeDeshacer: boolean;

  // Cola de Pedidos
  confirmarPedido: (items: CarritoItem[], nota: string) => number;
  colaPedidos: Pedido[];
  proximoNumeroTurno: number;

  // Historial de Atendidos
  atenderSiguiente: () => Pedido | undefined;
  historialAtendidos: Pedido[];
}

const ComedorContext = createContext<ComedorContextValue | null>(null);

const CREDENCIALES_VALIDAS = {
  admin: '1234',
  cocina: 'cocina',
  alumno: 'ipf',
};

export function ComedorProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<string | null>(null);
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);
  const [notaCocina, setNotaCocina] = useState<string>('');

  // Pila de Deshacer: guarda acciones de "agregar al carrito"
  const pilaDeshacer = useState(() => new Pila<CarritoItem>())[0];

  // Cola de Pedidos
  const colaPedidos = useState(() => new Cola<Pedido>())[0];
  const [proximoNumeroTurno, setProximoNumeroTurno] = useState(1);

  // Historial de Atendidos (Pila)
  const historialAtendidos = useState(() => new Pila<Pedido>())[0];

  const conSesion = usuario !== null;

  const login = useCallback((user: string, pass: string): boolean => {
    if (CREDENCIALES_VALIDAS[user as keyof typeof CREDENCIALES_VALIDAS] === pass) {
      setUsuario(user);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUsuario(null);
  }, []);

  const agregarAlCarrito = useCallback((plato: Plato) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.plato.id === plato.id);
      let nuevoItem: CarritoItem;
      if (existente) {
        nuevoItem = { ...existente, cantidad: existente.cantidad + 1 };
        return prev.map((item) => (item.plato.id === plato.id ? nuevoItem : item));
      } else {
        nuevoItem = { plato, cantidad: 1 };
        return [...prev, nuevoItem];
      }
    });
    // Guardar en pila de deshacer la acción (el item agregado)
    pilaDeshacer.push({ plato, cantidad: 1 });
  }, []);

  const quitarDelCarrito = useCallback((id: number) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.plato.id === id);
      if (!existente) return prev;
      if (existente.cantidad <= 1) {
        return prev.filter((item) => item.plato.id !== id);
      }
      return prev.map((item) =>
        item.plato.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
      );
    });
  }, []);

  const limpiarCarrito = useCallback(() => {
    setCarrito([]);
    setNotaCocina('');
  }, []);

  const deshacerUltimo = useCallback(() => {
    const ultimaAccion = pilaDeshacer.pop();
    if (ultimaAccion) {
      setCarrito((prev) => {
        const existente = prev.find((item) => item.plato.id === ultimaAccion.plato.id);
        if (!existente) return prev;
        if (existente.cantidad <= 1) {
          return prev.filter((item) => item.plato.id !== ultimaAccion.plato.id);
        }
        return prev.map((item) =>
          item.plato.id === ultimaAccion.plato.id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        );
      });
    }
  }, []);

  const confirmarPedido = useCallback(
    (items: CarritoItem[], nota: string): number => {
      const numero = proximoNumeroTurno;
      const pedido: Pedido = {
        numero,
        items,
        nota,
        fecha: new Date(),
      };
      colaPedidos.encolar(pedido);
      setProximoNumeroTurno((n) => n + 1);
      return numero;
    },
    [proximoNumeroTurno]
  );

  const atenderSiguiente = useCallback((): Pedido | undefined => {
    const pedido = colaPedidos.desencolar();
    if (pedido) {
      historialAtendidos.push(pedido);
    }
    return pedido;
  }, []);

  const value: ComedorContextValue = {
    usuario,
    login,
    logout,
    conSesion,
    carrito,
    agregarAlCarrito,
    quitarDelCarrito,
    notaCocina,
    setNotaCocina,
    limpiarCarrito,
    deshacerUltimo,
    puedeDeshacer: !pilaDeshacer.vacia,
    confirmarPedido,
    colaPedidos: colaPedidos.aArray(),
    proximoNumeroTurno,
    atenderSiguiente,
    historialAtendidos: historialAtendidos.aArray(),
  };

  return <ComedorContext.Provider value={value}>{children}</ComedorContext.Provider>;
}

export function useComedor() {
  const ctx = useContext(ComedorContext);
  if (!ctx) {
    throw new Error('useComedor debe usarse dentro de un ComedorProvider');
  }
  return ctx;
}
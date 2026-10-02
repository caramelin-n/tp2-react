export type Categoria = 'desayuno' | 'almuerzo' | 'bebidas' | 'kiosco';

export interface Plato {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: Categoria;
  imagen: string; // URI o nombre de ícono
}

export const platos: Plato[] = [
  // Desayuno (3 platos)
  {
    id: 1,
    nombre: 'Medialunas de Manteca',
    descripcion: 'Clásicas medialunas artesanales, crujientes por fuera y suaves por dentro.',
    precio: 1200,
    categoria: 'desayuno',
    imagen: '🥐',
  },
  {
    id: 2,
    nombre: 'Tostado Mixto',
    descripcion: 'Pan de miga con jamón y queso, tostado a la plancha.',
    precio: 1800,
    categoria: 'desayuno',
    imagen: '🥪',
  },
  {
    id: 3,
    nombre: 'Yogur con Granola y Frutas',
    descripcion: 'Yogur natural casero con granola crocante y frutas de estación.',
    precio: 2200,
    categoria: 'desayuno',
    imagen: '🥣',
  },

  // Almuerzo (3 platos)
  {
    id: 4,
    nombre: 'Milanesa con Puré',
    descripcion: 'Milanesa de carne tierna con puré de papas casero y ensalada mixta.',
    precio: 4500,
    categoria: 'almuerzo',
    imagen: '🍗',
  },
  {
    id: 5,
    nombre: 'Ñoquis Caseros',
    descripcion: 'Ñoquis de papa con salsa fileto y queso parmesano rallado.',
    precio: 3800,
    categoria: 'almuerzo',
    imagen: '🍝',
  },
  {
    id: 6,
    nombre: 'Pollo al Horno con Verduras',
    descripcion: 'Suprema de pollo horneada con papas, zanahoria y morrón.',
    precio: 4200,
    categoria: 'almuerzo',
    imagen: '🍗',
  },

  // Bebidas (3 platos)
  {
    id: 7,
    nombre: 'Jugo de Naranja Exprimido',
    descripcion: 'Jugo natural de naranja recién exprimido, 300ml.',
    precio: 1500,
    categoria: 'bebidas',
    imagen: '🍊',
  },
  {
    id: 8,
    nombre: 'Café con Leche',
    descripcion: 'Café de grano molido al momento con leche entera o descremada.',
    precio: 1300,
    categoria: 'bebidas',
    imagen: '☕',
  },
  {
    id: 9,
    nombre: 'Agua Mineral con Gas',
    descripcion: 'Botella de 500ml de agua mineral carbonatada.',
    precio: 1000,
    categoria: 'bebidas',
    imagen: '💧',
  },

  // Kiosco (3 platos)
  {
    id: 10,
    nombre: 'Chocolate Amargo 70%',
    descripcion: 'Tableta de chocolate amargo premium 70% cacao, 80g.',
    precio: 2500,
    categoria: 'kiosco',
    imagen: '🍫',
  },
  {
    id: 11,
    nombre: 'Galletitas de Avena',
    descripcion: 'Paquete de galletitas integrales de avena y pasas, 120g.',
    precio: 1800,
    categoria: 'kiosco',
    imagen: '🍪',
  },
  {
    id: 12,
    nombre: 'Barra de Cereales',
    descripcion: 'Barra energética con frutos secos, miel y semillas.',
    precio: 1400,
    categoria: 'kiosco',
    imagen: '🥜',
  },
];

export const categorias: { id: Categoria; nombre: string; icono: string }[] = [
  { id: 'desayuno', nombre: 'Desayuno', icono: '🌅' },
  { id: 'almuerzo', nombre: 'Almuerzo', icono: '🍽️' },
  { id: 'bebidas', nombre: 'Bebidas', icono: '🥤' },
  { id: 'kiosco', nombre: 'Kiosco', icono: '🍫' },
];

export function obtenerPlatosPorCategoria(categoria: Categoria): Plato[] {
  return platos.filter((p) => p.categoria === categoria);
}

export function obtenerPlatoPorId(id: number): Plato | undefined {
  return platos.find((p) => p.id === id);
}
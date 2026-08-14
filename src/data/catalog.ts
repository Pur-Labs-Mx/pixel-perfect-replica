/**
 * Catálogo PŪR LABS.
 *
 * Fuente única de datos de la tienda y de las landings individuales.
 * Cuando se conecte el backend, basta con reemplazar estos objetos
 * manteniendo la forma. NO duplicar esta información en componentes.
 */

import imaginaBg from "@/assets/imagina-bg.webp";
import imaginaSoap from "@/assets/imagina-soap.webp";
import bacarougeBg from "@/assets/bacarouge-bg.webp";
import bacarougeSoap from "@/assets/bacarouge-soap.webp";
import pacificBg from "@/assets/pacific-bg.webp";
import pacificSoap from "@/assets/pacific-soap.webp";
import placeholderBg from "@/assets/placeholder-bg.jpg";
import placeholderSoap from "@/assets/placeholder-soap.png";

export type Product = {
  id: string;
  slug: string;
  number: string;
  name: string;
  displayName: string[];
  family: string;
  price: number;
  compareAtPrice: number;
  discountPercent: number;
  stock: number;
  hot: boolean;
  /** Frase corta que dice INMEDIATAMENTE a qué huele. */
  firstImpression: string;
  /** Referencia olfativa de inspiración (no es el producto oficial de la marca). */
  inspiredBy: string;
  claim: string;
  description: string;
  /** Cómo se siente durante la ducha. */
  shower: string;
  /** Momento ideal de uso. */
  moment: string;
  notes: { label: string; value: string }[];
  signatureColor: string;
  glowColor: string;
  bgImage: string;
  soapImage: string;
  /** true = fotografía definitiva pendiente (se usa imagen provisional). */
  photoPending?: boolean;
  /** Storytelling para la landing individual. */
  story?: string;
  features?: string[];
};

export const CURRENCY = "MXN";
export const PROMO_LABEL = "Promoción de apertura";
export const PIECE_WEIGHT = "180 g";

/** Características compartidas por toda la línea. EDITABLE. */
const baseFeatures = [
  `Pieza sólida de ${PIECE_WEIGHT}`,
  "Glicerina vegetal translúcida",
  "Curado de cuatro semanas",
  "Aromaterapia sensorial durante el ritual de ducha",
];

export const products: Product[] = [
  {
    id: "imagina",
    slug: "imagina",
    number: "01",
    name: "IMAGINA",
    displayName: ["IMAGINA"],
    family: "Cítrico · Té negro · Ámbar",
    price: 399,
    compareAtPrice: 800,
    discountPercent: 50,
    stock: 47,
    hot: true,
    firstImpression:
      "Jabón de ULTRA LUJO. Una sensación limpia, sofisticada y envolvente que transforma la ducha en un ritual de perfumería.",
    inspiredBy: "Imagination, L.V.",
    claim: "Huele a lujo silencioso: limpio, refinado, imposible de ignorar.",
    description:
      "Cítricos luminosos que abren, té negro que sostiene y un ámbar moderno que envuelve el vapor de la ducha. Elegancia limpia, sin ruido.",
    shower:
      "Al contacto con el agua caliente la espuma se abre y llena el baño de una atmósfera cítrica y aterciopelada.",
    moment: "Mañana · trabajo · oficina",
    notes: [
      { label: "Primera impresión", value: "Bergamota y cítricos luminosos" },
      { label: "Corazón aromático", value: "Té negro y especias suaves" },
      { label: "Experiencia sensorial", value: "Ámbar moderno y maderas limpias en el vapor" },
    ],
    signatureColor: "#2E86C1",
    glowColor: "#8fe9ff",
    bgImage: imaginaBg,
    soapImage: imaginaSoap,
    story:
      "Nace del momento exacto en que una idea aparece: cítricos que despiertan la mente, té negro que la sostiene y un ámbar que deja el aire distinto.",
    features: baseFeatures,
  },
  {
    id: "bacarouge",
    slug: "bacarouge",
    number: "02",
    name: "BACAROUGE",
    displayName: ["BACAROUGE"],
    family: "Caramelo · Azafrán · Ámbar",
    price: 399,
    compareAtPrice: 800,
    discountPercent: 50,
    stock: 42,
    hot: true,
    firstImpression:
      "Caramelo caliente, dulce y magnético. Un aroma intenso que hace que la ducha se sienta como entrar en una perfumería de lujo.",
    inspiredBy: "B. Rouge 540",
    claim: "Huele a piel tibia, cristal y presencia.",
    description:
      "Un dulzor cálido y mineral, envuelto en azafrán y maderas secas. Magnético desde el primer segundo, elegante hasta el último.",
    shower:
      "El vapor lo vuelve golosinado y sedoso: el baño queda con una estela dulce y luminosa que se percibe en el aire.",
    moment: "Noche · casa · pareja",
    notes: [
      { label: "Primera impresión", value: "Caramelo cálido y azafrán" },
      { label: "Corazón aromático", value: "Jazmín transparente y ámbar mineral" },
      { label: "Experiencia sensorial", value: "Maderas secas y dulzor contenido en la atmósfera" },
    ],
    signatureColor: "#B01818",
    glowColor: "#ff9b9b",
    bgImage: bacarougeBg,
    soapImage: bacarougeSoap,
    story:
      "Un rojo que no grita. Caramelo y azafrán sobre un ámbar mineral que convierte la ducha en un momento magnético.",
    features: baseFeatures,
  },
  {
    id: "pacific-chill",
    slug: "pacific-chill",
    number: "03",
    name: "PACIFIC CHILL",
    displayName: ["PACIFIC", "CHILL"],
    family: "Cítrico · Acuático · Frutal",
    price: 399,
    compareAtPrice: 800,
    discountPercent: 50,
    stock: 32,
    hot: false,
    firstImpression:
      "Fresco, frutal y limpio. Una sensación fría y luminosa que despierta los sentidos desde la primera ducha.",
    inspiredBy: "Perfil cítrico-acuático, L.V.",
    claim: "Huele a una mañana que comienza de nuevo.",
    description:
      "Cidra, grosella negra y un verde acuático que despierta. Frescura limpia, luminosa, sin peso.",
    shower:
      "Refrescante y vibrante bajo el agua: deja el baño con una sensación de aire frío y fruta recién cortada.",
    moment: "Mañana · deporte · días cálidos",
    notes: [
      { label: "Primera impresión", value: "Cidra y naranja fría" },
      { label: "Corazón aromático", value: "Grosella negra y fruta acuática" },
      { label: "Experiencia sensorial", value: "Menta, ambreta y notas verdes en el vapor" },
    ],
    signatureColor: "#7FD8C0",
    glowColor: "#d9fff7",
    bgImage: pacificBg,
    soapImage: pacificSoap,
    story:
      "Agua fría, fruta recién cortada y un verde limpio: la sensación de empezar otra vez, cada mañana, sin peso.",
    features: baseFeatures,
  },
  {
    id: "l-ayton",
    slug: "l-ayton",
    number: "04",
    name: "L'AYTON",
    displayName: ["L'AYTON"],
    family: "Manzana · Vainilla · Lavanda",
    price: 399,
    compareAtPrice: 800,
    discountPercent: 50,
    stock: 28,
    hot: false,
    firstImpression:
      "Manzana fresca, vainilla cremosa y una calidez elegante. Una ducha sofisticada, dulce y envolvente.",
    inspiredBy: "Layton, P.D.M.",
    claim: "Huele a elegancia tibia, con un filo de fruta fresca.",
    description:
      "Manzana luminosa sobre una vainilla cremosa y un fondo suave de lavanda y maderas. Cálido, pulido, adictivo.",
    shower:
      "La espuma se vuelve cremosa y el vapor deja una calidez afrutada que permanece en el baño.",
    moment: "Noche · oficina · reuniones",
    notes: [
      { label: "Primera impresión", value: "Manzana fresca y bergamota" },
      { label: "Corazón aromático", value: "Lavanda, jazmín y violeta" },
      { label: "Experiencia sensorial", value: "Vainilla cremosa y maderas cálidas en la atmósfera" },
    ],
    signatureColor: "#4B5D8C",
    glowColor: "#c3cdf5",
    bgImage: placeholderBg,
    soapImage: placeholderSoap,
    photoPending: true,
    story:
      "Una manzana fría entrando en una habitación cálida: contraste elegante entre fruta y vainilla.",
    features: baseFeatures,
  },
  {
    id: "millesime",
    slug: "millesime",
    number: "05",
    name: "MILLESIME",
    displayName: ["MILLESIME"],
    family: "Melón · Acuático · Almizcle limpio",
    price: 399,
    compareAtPrice: 800,
    discountPercent: 50,
    stock: 26,
    hot: false,
    firstImpression:
      "Melón fresco, fruta acuática y una sensación limpia y luminosa. Un aroma ligero, elegante y refrescante.",
    inspiredBy: "M. Impérial, Creed",
    claim: "Huele a agua fría sobre fruta madura.",
    description:
      "Melón y fruta acuática sobre un almizcle limpio. Luminoso, fresco y sofisticado de principio a fin.",
    shower:
      "Frescura acuática que abre el baño: el vapor queda limpio, ligero y luminoso.",
    moment: "Mañana · verano · días largos",
    notes: [
      { label: "Primera impresión", value: "Melón y limón siciliano" },
      { label: "Corazón aromático", value: "Fruta acuática y bergamota" },
      { label: "Experiencia sensorial", value: "Almizcle limpio y ambreta en la atmósfera" },
    ],
    signatureColor: "#5F8F6B",
    glowColor: "#cdeed8",
    bgImage: placeholderBg,
    soapImage: placeholderSoap,
    photoPending: true,
    story:
      "El primer día de calor del año: fruta acuática, agua fría y una limpieza luminosa.",
    features: baseFeatures,
  },
  {
    id: "habentus",
    slug: "habentus",
    number: "06",
    name: "HABENTUS",
    displayName: ["HABENTUS"],
    family: "Piña ahumada · Abedul · Maderas",
    price: 399,
    compareAtPrice: 800,
    discountPercent: 50,
    stock: 24,
    hot: false,
    firstImpression:
      "Piña ahumada, fruta intensa y profundidad amaderada. Una experiencia poderosa, masculina y sofisticada.",
    inspiredBy: "Av., Creed",
    claim: "Huele a fruta encendida sobre madera.",
    description:
      "Piña intensa envuelta en abedul ahumado y maderas oscuras. Rotundo, magnético, con carácter.",
    shower:
      "Bajo el agua caliente se vuelve profundo y ahumado: el baño queda con una atmósfera densa y elegante.",
    moment: "Noche · frío · momentos de carácter",
    notes: [
      { label: "Primera impresión", value: "Piña y bergamota" },
      { label: "Corazón aromático", value: "Abedul ahumado y jazmín" },
      { label: "Experiencia sensorial", value: "Maderas oscuras y musgo en la atmósfera" },
    ],
    signatureColor: "#8B6B3A",
    glowColor: "#f0d8ab",
    bgImage: placeholderBg,
    soapImage: placeholderSoap,
    photoPending: true,
    story:
      "Fruta encendida sobre madera húmeda: el contraste entre dulzor y humo, convertido en ritual.",
    features: baseFeatures,
  },
];

export const availableProducts = products;

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export type Plan = {
  id: string;
  eyebrow: string;
  title: string;
  price: number;
  pricePerPiece?: number;
  compareAtPerPiece?: number;
  savingLabel?: string;
  perks: string[];
  pieces: number;
  featured?: boolean;
  badge?: string;
  priceHint: string;
  subHint?: string;
};

export const plans: Plan[] = [
  {
    id: "single",
    eyebrow: "Compra única · 1 pieza",
    title: "Una pieza",
    price: 399,
    perks: ["Envío no incluido", `1 jabón · ${PIECE_WEIGHT}`],
    pieces: 1,
    priceHint: "Precio por pieza",
    subHint: "Punto de partida",
  },
  {
    id: "plan-3",
    eyebrow: "3 meses · 2 piezas · envío incluido",
    title: "Plan 3 meses",
    price: 650,
    pricePerPiece: 325,
    compareAtPerPiece: 399,
    savingLabel: "Ahorras $148 MXN · 19%",
    perks: ["Envío gratis incluido", `2 jabones · ${PIECE_WEIGHT}`, "No se renueva automáticamente"],
    pieces: 2,
    priceHint: "pago único",
  },
  {
    id: "plan-6",
    eyebrow: "6 meses · 3 piezas · envío incluido",
    title: "Plan 6 meses",
    price: 850,
    pricePerPiece: 283,
    compareAtPerPiece: 399,
    savingLabel: "Ahorras $347 MXN · 29%",
    perks: ["Envío gratis incluido", `3 jabones · ${PIECE_WEIGHT}`, "No se renueva automáticamente"],
    pieces: 3,
    featured: true,
    badge: "Mejor valor",
    priceHint: "pago único",
  },
];

export const getPlan = (id: string) => plans.find((p) => p.id === id);

export const comparisonRows: { feature: string; pur: boolean; common: boolean }[] = [
  { feature: "Aroma inspirado en alta perfumería", pur: true, common: false },
  { feature: "Acabado translúcido de glicerina vegetal", pur: true, common: false },
  { feature: `Pieza sólida de ${PIECE_WEIGHT}`, pur: true, common: true },
  { feature: "Diseño de autor listo para regalo", pur: true, common: false },
  { feature: "Fórmula suave, sin sulfatos agresivos", pur: true, common: false },
  { feature: "Atmósfera aromática durante el ritual de ducha", pur: true, common: false },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "¿Cuánto pesa cada pieza?",
    answer:
      "180 g. Cada jabón se cura durante cuatro semanas para estabilizar su fragancia antes de salir del taller.",
  },
  {
    question: "¿A dónde envían?",
    answer:
      "Envío a todo México. El plazo y el costo se confirman al finalizar la compra según la dirección.",
  },
  {
    question: "¿Cómo funciona el pago de las suscripciones?",
    answer:
      "Es un pago único por el plan completo. No hay cargos recurrentes y al terminar el periodo no se renueva automáticamente.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer: "OXXO, PayPal y Mercado Pago. Puedes pagar en efectivo en cualquier tienda OXXO.",
  },
  {
    question: "¿Sustituyen a un perfume?",
    answer:
      "No. La experiencia sucede durante la ducha: crean una atmósfera aromática alrededor del ritual, no una estela de perfume prolongada sobre la piel.",
  },
  {
    question: "¿Están relacionados con las casas de perfume mencionadas?",
    answer:
      "No. Son jabones artesanales PŪR LABS inspirados libremente en perfiles olfativos de perfumería premium. No son productos oficiales ni están afiliados a esas marcas.",
  },
  {
    question: "¿Son aptos para piel sensible? ¿Qué ingredientes usan?",
    answer: "La lista completa de ingredientes y su validación dermatológica se publicará próximamente.",
  },
  {
    question: "¿Aceptan devoluciones o cambios?",
    answer: "Nuestra política de devoluciones y cambios se publicará próximamente.",
  },
];

export const marqueeItems = [
  "ENVÍO A TODO MÉXICO",
  "EDICIÓN LIMITADA",
  "PROMOCIÓN DE APERTURA −50%",
];

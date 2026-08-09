/**
 * Catálogo PŪR LABS.
 *
 * Fuente única de datos de la tienda. Cuando se conecte el backend,
 * basta con reemplazar estos objetos manteniendo la forma.
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
  claim: string;
  description: string;
  notes: { label: string; value: string }[];
  signatureColor: string;
  glowColor: string;
  bgImage: string;
  soapImage: string;
  /** Espacio preparado: los datos definitivos llegarán después. */
  placeholder?: boolean;
  /** Storytelling para la ficha individual. */
  story?: string;
  features?: string[];
};

export const CURRENCY = "MXN";
export const PROMO_LABEL = "Promoción de apertura";
export const PIECE_WEIGHT = "180 g";

const PENDING = "[PENDIENTE: información oficial]";

const placeholderProduct = (n: number, color: string, glow: string): Product => ({
  id: `producto-0${n}`,
  slug: `producto-0${n}`,
  number: `0${n}`,
  name: `PRODUCTO 0${n}`,
  displayName: [`PRODUCTO 0${n}`],
  family: "[PENDIENTE: familia olfativa]",
  price: 399,
  compareAtPrice: 800,
  discountPercent: 50,
  stock: 0,
  hot: false,
  claim: "[PENDIENTE: claim de la fragancia]",
  description: `${PENDING} Este espacio ya está preparado con el mismo sistema visual: al recibir foto, nombre, descripción y precio se integra automáticamente.`,
  notes: [
    { label: "Primera impresión", value: PENDING },
    { label: "El corazón", value: PENDING },
    { label: "La estela", value: PENDING },
  ],
  signatureColor: color,
  glowColor: glow,
  bgImage: placeholderBg,
  soapImage: placeholderSoap,
  placeholder: true,
  story: PENDING,
  features: [`Pieza sólida de ${PIECE_WEIGHT}`, PENDING, PENDING],
});

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
    claim: "Huele a una idea que acaba de comenzar.",
    description:
      "IMAGINA transforma la claridad de los cítricos, la profundidad del té negro y la calidez del ámbar en una experiencia limpia, sofisticada y expansiva.",
    notes: [
      { label: "Primera impresión", value: "Bergamota y cítricos luminosos" },
      { label: "El corazón", value: "Té negro y especias suaves" },
      { label: "La estela", value: "Ámbar moderno, Ambrox y maderas suaves" },
    ],
    signatureColor: "#2E86C1",
    glowColor: "#8fe9ff",
    bgImage: imaginaBg,
    soapImage: imaginaSoap,
    story:
      "Nace del momento exacto en que una idea aparece: cítricos que abren la mente, té negro que la sostiene y un ámbar que la deja resonando en la piel.",
    features: [
      `Pieza sólida de ${PIECE_WEIGHT}`,
      "Glicerina vegetal translúcida",
      "Curado de cuatro semanas",
    ],
  },
  {
    id: "bacarouge",
    slug: "bacarouge",
    number: "02",
    name: "BACAROUGE",
    displayName: ["BACAROUGE"],
    family: "Floral · Ámbar · Amaderado",
    price: 399,
    compareAtPrice: 800,
    discountPercent: 50,
    stock: 42,
    hot: true,
    claim: "Huele a piel tibia, cristal y presencia.",
    description: "BACAROUGE es cálido, luminoso y magnético.",
    notes: [
      { label: "Primera impresión", value: "Azafrán y jazmín transparente" },
      { label: "El corazón", value: "Ámbar mineral y aire cálido" },
      { label: "La estela", value: "Maderas secas, cedro y dulzor contenido" },
    ],
    signatureColor: "#B01818",
    glowColor: "#ff9b9b",
    bgImage: bacarougeBg,
    soapImage: bacarougeSoap,
    story:
      "Un rojo que no grita. Azafrán y jazmín sobre un ámbar mineral que se queda cerca de la piel, como una presencia que se recuerda después.",
    features: [
      `Pieza sólida de ${PIECE_WEIGHT}`,
      "Glicerina vegetal translúcida",
      "Curado de cuatro semanas",
    ],
  },
  {
    id: "pacific-chill",
    slug: "pacific-chill",
    number: "03",
    name: "PACIFIC CHILL",
    displayName: ["PACIFIC", "CHILL"],
    family: "Frutal · Cítrico · Verde",
    price: 399,
    compareAtPrice: 800,
    discountPercent: 50,
    stock: 32,
    hot: false,
    claim: "Huele a una mañana que comienza de nuevo.",
    description:
      "PACIFIC CHILL convierte la frescura frutal, los cítricos y las notas verdes en una sensación de energía limpia y movimiento.",
    notes: [
      { label: "Primera impresión", value: "Cidra y naranja" },
      { label: "El corazón", value: "Grosella negra y fruta vibrante" },
      { label: "La estela", value: "Menta, ambreta y notas verdes suaves" },
    ],
    signatureColor: "#7FD8C0",
    glowColor: "#d9fff7",
    bgImage: pacificBg,
    soapImage: pacificSoap,
    story:
      "Agua fría, fruta recién cortada y un verde limpio: la sensación de empezar otra vez, cada mañana, sin peso.",
    features: [
      `Pieza sólida de ${PIECE_WEIGHT}`,
      "Glicerina vegetal translúcida",
      "Curado de cuatro semanas",
    ],
  },
  placeholderProduct(4, "#8A8F98", "#dfe4ea"),
  placeholderProduct(5, "#7E8B7A", "#dfe9dc"),
  placeholderProduct(6, "#8B8074", "#e9e1d7"),
];

export const availableProducts = products.filter((p) => !p.placeholder);

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
  { feature: "Estela perceptible después del baño", pur: true, common: false },
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
    question: "¿Cuánto dura una pieza en uso diario?",
    answer: "[PENDIENTE: dato oficial del laboratorio].",
  },
  {
    question: "¿La fragancia permanece en la piel después del baño?",
    answer: "[PENDIENTE: respuesta oficial del equipo perfumista].",
  },
  {
    question: "¿Son aptos para piel sensible? ¿Qué ingredientes usan?",
    answer: "[PENDIENTE: lista completa de ingredientes y validación dermatológica].",
  },
  {
    question: "¿Aceptan devoluciones o cambios?",
    answer: "[PENDIENTE: política oficial de devoluciones].",
  },
];

export const marqueeItems = [
  "ENVÍO A TODO MÉXICO",
  "EDICIÓN LIMITADA",
  "PROMOCIÓN DE APERTURA −50%",
];

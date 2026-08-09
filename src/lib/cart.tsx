import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { track } from "@/lib/analytics";

export type CartItem = {
  /** Clave única de línea (producto + variante + fragancias). */
  key: string;
  productId: string;
  name: string;
  slug: string;
  image: string;
  variant: string;
  fragrances: string[];
  unitPrice: number;
  qty: number;
};

export type NewCartItem = Omit<CartItem, "key" | "qty"> & { qty?: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  total: number;
  add: (item: NewCartItem) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
};

const STORAGE_KEY = "purlabs.cart.v1";
const CartContext = createContext<CartContextValue | null>(null);

const lineKey = (item: NewCartItem) =>
  [item.productId, item.variant, [...item.fragrances].sort().join("|")].join("::");

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Hidratación desde localStorage sólo en cliente (evita mismatch de SSR).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignorar almacenamiento no disponible */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignorar */
    }
  }, [items]);

  const add = useCallback((item: NewCartItem) => {
    const key = lineKey(item);
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + (item.qty ?? 1) } : i));
      }
      return [...prev, { ...item, key, qty: item.qty ?? 1 }];
    });
    track("AddToCart", {
      content_name: item.name,
      content_ids: [item.productId],
      value: item.unitPrice * (item.qty ?? 1),
      currency: "MXN",
    });
  }, []);

  const remove = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, qty: Math.min(qty, 20) } : i)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
    return {
      items,
      count: items.reduce((sum, i) => sum + i.qty, 0),
      subtotal,
      total: subtotal,
      add,
      remove,
      setQty,
      clear,
    };
  }, [items, add, remove, setQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}

export const formatMXN = (value: number) => `$${value.toLocaleString("es-MX")} MXN`;

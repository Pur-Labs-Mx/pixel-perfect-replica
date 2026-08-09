import { createFileRoute } from "@tanstack/react-router";

import { ProductPage } from "@/components/product/ProductPage";
import { getProduct } from "@/data/catalog";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/imagina")({
  head: () => pageMeta({ title: "IMAGINA — Jabón perfumado de autor | PŪR LABS", description: "IMAGINA: cítricos luminosos, té negro y ámbar moderno en una pieza sólida de 180 g. Edición limitada con envío a todo México.", path: "/imagina" }),
  component: () => <ProductPage product={getProduct("imagina")!} />,
});

import { createFileRoute } from "@tanstack/react-router";

import { ProductPage } from "@/components/product/ProductPage";
import { getProduct } from "@/data/catalog";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/pacific-chill")({
  head: () => pageMeta({ title: "PACIFIC CHILL — Jabón perfumado de autor | PŪR LABS", description: "PACIFIC CHILL: cidra, grosella negra y notas verdes frescas. Pieza sólida de 180 g, edición limitada.", path: "/pacific-chill" }),
  component: () => <ProductPage product={getProduct("pacific-chill")!} />,
});

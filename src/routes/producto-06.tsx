import { createFileRoute } from "@tanstack/react-router";

import { ProductPage } from "@/components/product/ProductPage";
import { getProduct } from "@/data/catalog";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/producto-06")({
  head: () => pageMeta({ title: "PRODUCTO 06 — Próximamente | PŪR LABS", description: "Espacio preparado para el próximo lanzamiento de PŪR LABS. Muy pronto, más información.", path: "/producto-06" }),
  component: () => <ProductPage product={getProduct("producto-06")!} />,
});

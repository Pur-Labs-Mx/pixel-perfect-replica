import { createFileRoute } from "@tanstack/react-router";

import { ProductPage } from "@/components/product/ProductPage";
import { getProduct } from "@/data/catalog";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/producto-4")({
  head: () =>
    pageMeta({
      title: "PRODUCTO 04 — Próximamente | PŪR LABS",
      description: "Espacio preparado para el próximo lanzamiento de PŪR LABS. Muy pronto, más información.",
      path: "/producto-4",
    }),
  component: () => <ProductPage product={getProduct("producto-4")!} />,
});

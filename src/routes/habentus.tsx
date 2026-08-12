import { createFileRoute } from "@tanstack/react-router";

import { ProductPage } from "@/components/product/ProductPage";
import { getProduct } from "@/data/catalog";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/habentus")({
  head: () =>
    pageMeta({
      title: "HABENTUS — Jabón perfumado de autor | PŪR LABS",
      description: "HABENTUS: piña ahumada, fruta intensa y profundidad amaderada. Jabón artesanal perfumado PŪR LABS de 180 g.",
      path: "/habentus",
    }),
  component: () => <ProductPage product={getProduct("habentus")!} />,
});

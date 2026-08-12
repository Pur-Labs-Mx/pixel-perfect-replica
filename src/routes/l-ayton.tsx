import { createFileRoute } from "@tanstack/react-router";

import { ProductPage } from "@/components/product/ProductPage";
import { getProduct } from "@/data/catalog";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/l-ayton")({
  head: () =>
    pageMeta({
      title: "L'AYTON — Jabón perfumado de autor | PŪR LABS",
      description: "L'AYTON: manzana fresca, vainilla cremosa y una calidez elegante en una pieza sólida de 180 g. Jabón artesanal perfumado PŪR LABS.",
      path: "/l-ayton",
    }),
  component: () => <ProductPage product={getProduct("l-ayton")!} />,
});

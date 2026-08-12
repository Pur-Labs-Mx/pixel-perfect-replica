import { createFileRoute } from "@tanstack/react-router";

import { ProductPage } from "@/components/product/ProductPage";
import { getProduct } from "@/data/catalog";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/millesime")({
  head: () =>
    pageMeta({
      title: "MILLESIME — Jabón perfumado de autor | PŪR LABS",
      description: "MILLESIME: melón fresco, fruta acuática y una sensación limpia y luminosa. Jabón artesanal perfumado PŪR LABS de 180 g.",
      path: "/millesime",
    }),
  component: () => <ProductPage product={getProduct("millesime")!} />,
});

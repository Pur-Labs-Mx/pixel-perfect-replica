import { createFileRoute } from "@tanstack/react-router";

import { ProductPage } from "@/components/product/ProductPage";
import { getProduct } from "@/data/catalog";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/bacarouge")({
  head: () => pageMeta({ title: "BACAROUGE — Jabón perfumado de autor | PŪR LABS", description: "BACAROUGE: azafrán, jazmín y ámbar mineral sobre maderas secas. Pieza sólida de 180 g, edición limitada.", path: "/bacarouge" }),
  component: () => <ProductPage product={getProduct("bacarouge")!} />,
});

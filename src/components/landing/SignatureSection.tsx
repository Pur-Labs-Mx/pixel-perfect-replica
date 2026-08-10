import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/data/catalog";

/**
 * Envoltorio de línea de tiempo para la home. La estructura visual real
 * (imagen, jabón, reflejo, texto, CTA) vive en ProductCard para que los
 * 6 productos sean pixel-idénticos en proporciones y disposición.
 */
export function SignatureSection({ product }: { product: Product }) {
  return <ProductCard product={product} />;
}

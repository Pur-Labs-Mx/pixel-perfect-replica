import { createFileRoute } from "@tanstack/react-router";

import { AnnouncementBar, GrainOverlay, ScrollProgress } from "@/components/landing/Chrome";
import { ComparisonSection } from "@/components/landing/ComparisonSection";
import { ConvertSection } from "@/components/landing/ConvertSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { Hero } from "@/components/landing/Hero";
import { PlansSection } from "@/components/landing/PlansSection";
import { PromiseSection } from "@/components/landing/PromiseSection";
import { SignatureSection } from "@/components/landing/SignatureSection";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { products } from "@/data/catalog";

const TITLE = "PŪR LABS — Jabón perfumado de autor";
const DESCRIPTION =
  "Piezas translúcidas perfumadas inspiradas en la alta perfumería. Edición limitada, envío a todo México y promoción de apertura −50%.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <ScrollProgress />
      <GrainOverlay />
      <AnnouncementBar />
      <SiteHeader />

      <main className="relative overflow-hidden bg-[var(--black-deep)]">
        <Hero />

        <div id="fragrances">
          {products.map((product) => (
            <SignatureSection key={product.id} product={product} />
          ))}
        </div>

        <ComparisonSection />
        <PlansSection />
        <PromiseSection />
        <FaqSection />
        <ConvertSection />
      </main>

      <SiteFooter />
    </>
  );
}

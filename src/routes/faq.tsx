import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { pageMeta } from "@/lib/site";
import { faqs } from "@/data/catalog";

export const Route = createFileRoute("/faq")({
  head: () =>
    pageMeta({
      title: "Preguntas frecuentes · PŪR LABS",
      description: "Resolvemos las dudas más comunes sobre envíos, pagos, planes y jabones perfumados PŪR LABS.",
      path: "/faq",
    }),
  component: FaqPage,
});

function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[var(--black-deep)]">
      <SiteHeader />
      <main className="bg-[var(--ivory)] px-6 pt-[140px] pb-24 text-[var(--black-deep)] sm:px-10">
        <div className="mx-auto max-w-[900px]">
          <span className="font-body text-[10px] font-medium tracking-[0.32em] uppercase text-black/55">
            Ayuda
          </span>
          <h1
            className="mt-6 font-heading italic leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            Preguntas frecuentes.
          </h1>

          <div className="mt-14 divide-y divide-black/10 border-y border-black/10">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.question} className="py-6">
                  <button
                    type="button"
                    className="flex w-full min-h-[44px] cursor-pointer items-center justify-between gap-6 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className="font-heading text-xl italic md:text-2xl">{faq.question}</span>
                    <span
                      aria-hidden="true"
                      className={`shrink-0 font-body text-lg leading-none text-black/50 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <p
                      id={`faq-panel-${index}`}
                      className="mt-4 max-w-2xl font-body text-[15px] leading-relaxed text-black/70"
                    >
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

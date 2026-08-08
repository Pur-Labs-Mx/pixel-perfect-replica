import { useState } from "react";
import { faqs } from "@/data/catalog";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="relative bg-[var(--ivory)] px-6 py-24 text-[var(--black-deep)] sm:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[900px]">
        <div>
          <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-black/55">
            Preguntas frecuentes
          </span>
          <h2
            className="mt-6 font-heading italic leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            Lo que suele preguntarse.
          </h2>
        </div>
        <div className="mt-14 divide-y divide-black/10 border-y border-black/10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="group py-6">
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center justify-between gap-6 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-heading text-xl italic md:text-2xl">{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className={`font-body text-lg leading-none text-black/50 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-4 max-w-2xl font-body text-[15px] leading-relaxed text-black/70">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

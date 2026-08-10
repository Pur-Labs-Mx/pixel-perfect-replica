/**
 * Datos del carrusel de estilo de vida (LifestyleCarousel).
 *
 * EDITAR AQUÍ: cada entrada es un placeholder editable. Reutiliza imágenes
 * existentes en src/assets mientras no haya fotografía lifestyle dedicada
 * (baño real, empaque de regalo, en mano, junto a la tina). Al recibir las
 * fotos definitivas, basta con reemplazar `image` e `import` manteniendo la
 * forma de este arreglo.
 */

import imaginaBg from "@/assets/imagina-bg.webp";
import imaginaSoap from "@/assets/imagina-soap.webp";
import bacarougeBg from "@/assets/bacarouge-bg.webp";
import bacarougeSoap from "@/assets/bacarouge-soap.webp";
import pacificBg from "@/assets/pacific-bg.webp";
import pacificSoap from "@/assets/pacific-soap.webp";

export type LifestyleSlide = {
  id: string;
  image: string;
  alt: string;
  caption: string;
};

// [PLACEHOLDER EDITABLE]: reemplazar por fotografía lifestyle real cuando esté disponible.
export const lifestyleSlides: LifestyleSlide[] = [
  {
    id: "imagina-tina",
    image: imaginaBg,
    alt: "Jabón IMAGINA junto a una tina, ambiente de baño en tonos cálidos",
    caption: "IMAGINA · junto a la tina",
  },
  {
    id: "imagina-mano",
    image: imaginaSoap,
    alt: "Pieza de jabón translúcido IMAGINA sostenida en la mano",
    caption: "IMAGINA · en mano",
  },
  {
    id: "bacarouge-bano",
    image: bacarougeBg,
    alt: "Jabón BACAROUGE en un baño real, sobre superficie de mármol",
    caption: "BACAROUGE · en el baño",
  },
  {
    id: "bacarouge-regalo",
    image: bacarougeSoap,
    alt: "Empaque de regalo de BACAROUGE listo para obsequiar",
    caption: "BACAROUGE · empaque de regalo",
  },
  {
    id: "pacific-tina",
    image: pacificBg,
    alt: "Jabón PACIFIC CHILL junto a la tina con luz natural",
    caption: "PACIFIC CHILL · junto a la tina",
  },
  {
    id: "pacific-mano",
    image: pacificSoap,
    alt: "Pieza de jabón PACIFIC CHILL sostenida en la mano",
    caption: "PACIFIC CHILL · en mano",
  },
];

/**
 * Testimonios en video (VideoTestimonials).
 *
 * ⚠️ DATOS DEMO / EDITABLES — NO SON RESEÑAS REALES DE CLIENTES.
 * Reemplazar cada campo (name, city, rating, videoSrc, thumbnail, product)
 * por contenido real y verificado antes de publicar en producción.
 */

import imaginaSoap from "@/assets/imagina-soap.webp";
import bacarougeSoap from "@/assets/bacarouge-soap.webp";
import pacificSoap from "@/assets/pacific-soap.webp";

export type VideoTestimonial = {
  id: string;
  /** [DEMO EDITABLE] nombre de ejemplo, no corresponde a una persona real. */
  name: string;
  /** [DEMO EDITABLE] ciudad de ejemplo. */
  city: string;
  /** [DEMO EDITABLE] calificación de ejemplo, 1 a 5. */
  rating: number;
  /** [DEMO EDITABLE] ruta de video de ejemplo; sustituir por archivo real. */
  videoSrc: string;
  /** Miniatura estática mostrada antes de reproducir. */
  thumbnail: string;
  /** Slug del producto para filtrar en la página de producto. */
  productSlug: string;
};

export const videoTestimonials: VideoTestimonial[] = [
  {
    id: "demo-1",
    name: "[DEMO] Camila R.",
    city: "[DEMO] Ciudad de México",
    rating: 5,
    videoSrc: "/videos/testimonio-demo-1.mp4",
    thumbnail: imaginaSoap,
    productSlug: "imagina",
  },
  {
    id: "demo-2",
    name: "[DEMO] Andrea L.",
    city: "[DEMO] Monterrey",
    rating: 5,
    videoSrc: "/videos/testimonio-demo-2.mp4",
    thumbnail: bacarougeSoap,
    productSlug: "bacarouge",
  },
  {
    id: "demo-3",
    name: "[DEMO] Fernanda G.",
    city: "[DEMO] Guadalajara",
    rating: 4,
    videoSrc: "/videos/testimonio-demo-3.mp4",
    thumbnail: pacificSoap,
    productSlug: "pacific-chill",
  },
  {
    id: "demo-4",
    name: "[DEMO] Renata M.",
    city: "[DEMO] Puebla",
    rating: 5,
    videoSrc: "/videos/testimonio-demo-4.mp4",
    thumbnail: imaginaSoap,
    productSlug: "imagina",
  },
];

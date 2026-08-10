import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Ruta antigua conservada por compatibilidad: redirige a la ruta canónica.
 */
export const Route = createFileRoute("/producto-06")({
  beforeLoad: () => {
    throw redirect({ to: "/producto-6" });
  },
});

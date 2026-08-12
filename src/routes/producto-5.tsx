import { createFileRoute, redirect } from "@tanstack/react-router";

/** Ruta antigua conservada por compatibilidad: redirige a la landing canónica. */
export const Route = createFileRoute("/producto-5")({
  beforeLoad: () => {
    throw redirect({ to: "/millesime" });
  },
});

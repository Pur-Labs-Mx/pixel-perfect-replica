import { createFileRoute, redirect } from "@tanstack/react-router";

/** Ruta antigua conservada por compatibilidad: redirige a la landing canónica. */
export const Route = createFileRoute("/producto-05")({
  beforeLoad: () => {
    throw redirect({ to: "/millesime" });
  },
});

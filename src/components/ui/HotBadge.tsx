/**
 * Distintivo "Hot" reutilizable para productos destacados.
 * Usar en lugar de cualquier marcado HOT ad-hoc.
 */
export function HotBadge({
  label = "Hot",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border bg-transparent px-2 py-[3px] font-body text-[9px] font-bold tracking-[0.24em] uppercase whitespace-nowrap ${className}`}
      style={{ borderColor: "var(--tiffany)", color: "var(--tiffany)" }}
    >
      {label}
    </span>
  );
}

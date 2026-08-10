/**
 * Insignia premium para productos destacados/más vendidos.
 * Superficie negra con borde y texto Tiffany, ligera rotación (-3deg)
 * para un acabado editorial, no de "sticker" barato.
 *
 * Uso:
 *   <div className="relative">
 *     ...imagen del producto...
 *     <HotBadge className="absolute -top-3 -right-3" />
 *   </div>
 */
type Props = {
  label?: string;
  className?: string;
};

export function HotBadge({ label = "Producto más vendido", className = "" }: Props) {
  return (
    <span
      className={
        "inline-flex select-none items-center rounded-full border-[1.5px] border-[var(--tiffany-border-strong)] bg-[var(--black-deep)] px-3 py-1.5 " +
        "font-body text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--tiffany)] shadow-[0_8px_20px_-10px_var(--tiffany-glow)] " +
        "-rotate-3 " +
        className
      }
    >
      {label}
    </span>
  );
}

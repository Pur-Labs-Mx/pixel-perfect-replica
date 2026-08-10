import { useEffect, useRef, type ReactNode } from "react";

/**
 * Shell visual compartido para todos los popups de conversión.
 * Estilo consistente: superficie negra, borde Tiffany de 2px, X visible,
 * cierre fácil (click fuera, Escape, botón), nunca bloquea el scroll de
 * forma permanente y nunca cubre toda la pantalla de forma agresiva.
 */
export function PopupShell({
  open,
  onClose,
  labelledBy,
  children,
  maxWidthClassName = "max-w-md",
  zIndexClassName = "z-[95]",
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  maxWidthClassName?: string;
  zIndexClassName?: string;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 ${zIndexClassName} flex items-end justify-center bg-black/60 px-3 pb-3 backdrop-blur-[2px] sm:items-center sm:px-4 sm:pb-0`}
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${maxWidthClassName} rounded-2xl border-2 border-[var(--tiffany-border)] bg-[var(--black-deep)] p-6 sm:p-8 text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] max-h-[85vh] overflow-y-auto`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-[var(--gray-muted)] transition-colors hover:text-[var(--tiffany)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tiffany-active)]"
        >
          <span aria-hidden="true" className="text-xl">
            ×
          </span>
        </button>
        {children}
      </div>
    </div>
  );
}

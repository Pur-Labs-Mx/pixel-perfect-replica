type WaveBannerProps = {
  className?: string;
  /** Altura del banner, ej. "80px" o "6rem". */
  height?: string;
};

/**
 * Franja decorativa de olas, en CSS/SVG puro (sin librerías, sin assets pesados).
 * Deriva muy lenta y sutil hacia los lados; se vuelve estática si el usuario
 * prefiere movimiento reducido.
 */
export function WaveBanner({ className = "", height = "6rem" }: WaveBannerProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden bg-[var(--black-deep)] ${className}`}
      style={{ height }}
    >
      <svg
        className="pur-wave-drift pur-wave-back absolute -left-[10%] top-0 h-full w-[120%]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,60 C150,110 350,10 600,60 C850,110 1050,10 1200,60 L1200,120 L0,120 Z"
          fill="var(--tiffany)"
          opacity="0.08"
        />
      </svg>
      <svg
        className="pur-wave-drift pur-wave-mid absolute -left-[10%] top-0 h-full w-[120%]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,70 C200,20 400,110 600,70 C800,30 1000,100 1200,70 L1200,120 L0,120 Z"
          fill="var(--tiffany-border)"
          opacity="0.12"
        />
      </svg>
      <svg
        className="pur-wave-drift pur-wave-front absolute -left-[10%] top-0 h-full w-[120%]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,85 C180,55 420,105 600,85 C780,65 1020,110 1200,85 L1200,120 L0,120 Z"
          fill="var(--gray-muted)"
          opacity="0.15"
        />
      </svg>

      <style>{`
        .pur-wave-drift {
          will-change: transform;
        }
        .pur-wave-back { animation: pur-wave-x 42s ease-in-out infinite; }
        .pur-wave-mid { animation: pur-wave-x 30s ease-in-out infinite reverse; }
        .pur-wave-front { animation: pur-wave-x 24s ease-in-out infinite; }

        @keyframes pur-wave-x {
          0% { transform: translateX(0); }
          50% { transform: translateX(2%); }
          100% { transform: translateX(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .pur-wave-drift { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

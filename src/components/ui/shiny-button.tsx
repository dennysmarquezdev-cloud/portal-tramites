import React from "react";

export interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  theme?: "light" | "dark";
}

export function ShinyButton({ children, onClick, className = "", theme = "light", style, ...props }: ShinyButtonProps) {
  const isLight = theme === "light";

  return (
    <>
      <style>{`
        @property --gradient-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @property --gradient-angle-offset {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @property --gradient-percent {
          syntax: "<percentage>";
          initial-value: 5%;
          inherits: false;
        }

        @property --gradient-shine {
          syntax: "<color>";
          initial-value: white;
          inherits: false;
        }

        .shiny-cta {
          --animation: gradient-angle linear infinite;
          --duration: 3s;
          --shadow-size: 2px;
          --transition: 800ms cubic-bezier(0.25, 1, 0.5, 1);
          
          isolation: isolate;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          outline-offset: 4px;
          padding: 1.15rem 2.5rem;
          font-family: inherit;
          font-size: 1.05rem;
          line-height: 1.2;
          font-weight: 650;
          border: 1.5px solid transparent;
          border-radius: 360px;
          color: var(--shiny-cta-fg);
          background: linear-gradient(var(--shiny-cta-bg), var(--shiny-cta-bg)) padding-box,
            conic-gradient(
              from calc(var(--gradient-angle) - var(--gradient-angle-offset)),
              transparent,
              var(--shiny-cta-highlight) var(--gradient-percent),
              var(--gradient-shine) calc(var(--gradient-percent) * 2),
              var(--shiny-cta-highlight) calc(var(--gradient-percent) * 3),
              transparent calc(var(--gradient-percent) * 4)
            ) border-box;
          box-shadow: inset 0 0 0 1px var(--shiny-cta-bg-subtle), var(--shiny-cta-shadow);
          transition: var(--transition);
          transition-property: --gradient-angle-offset, --gradient-percent, --gradient-shine, box-shadow, transform;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .shiny-cta-light {
          --shiny-cta-bg: #0056AC;
          --shiny-cta-bg-subtle: #184397;
          --shiny-cta-fg: #FFFFFF;
          --shiny-cta-highlight: #FFFFFF;
          --shiny-cta-highlight-subtle: #E8F2F7;
          --shiny-cta-shadow: 0 10px 28px rgba(0, 86, 172, 0.32), 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .shiny-cta-dark {
          --shiny-cta-bg: #0D1028;
          --shiny-cta-bg-subtle: #1363D0;
          --shiny-cta-fg: #FFFFFF;
          --shiny-cta-highlight: #0056AC;
          --shiny-cta-highlight-subtle: #DC362E;
          --shiny-cta-shadow: 0 8px 30px rgba(0, 0, 0, 0.6), 0 0 24px rgba(0, 86, 172, 0.40);
        }

        .shiny-cta::before,
        .shiny-cta::after,
        .shiny-cta span::before {
          content: "";
          pointer-events: none;
          position: absolute;
          inset-inline-start: 50%;
          inset-block-start: 50%;
          translate: -50% -50%;
          z-index: -1;
        }

        .shiny-cta:active {
          translate: 0 1px;
        }

        /* Dots pattern */
        .shiny-cta::before {
          --size: calc(100% - var(--shadow-size) * 3);
          --position: 2px;
          --space: calc(var(--position) * 2);
          width: var(--size);
          height: var(--size);
          background: radial-gradient(
            circle at var(--position) var(--position),
            white calc(var(--position) / 4),
            transparent 0
          ) padding-box;
          background-size: var(--space) var(--space);
          background-repeat: space;
          mask-image: conic-gradient(
            from calc(var(--gradient-angle) + 45deg),
            black,
            transparent 10% 90%,
            black
          );
          -webkit-mask-image: conic-gradient(
            from calc(var(--gradient-angle) + 45deg),
            black,
            transparent 10% 90%,
            black
          );
          border-radius: inherit;
          opacity: 0.4;
          z-index: -1;
        }

        /* Inner shimmer */
        .shiny-cta::after {
          --animation: shimmer linear infinite;
          width: 100%;
          aspect-ratio: 1;
          background: linear-gradient(
            -50deg,
            transparent,
            var(--shiny-cta-highlight),
            transparent
          );
          mask-image: radial-gradient(circle at bottom, transparent 40%, black);
          -webkit-mask-image: radial-gradient(circle at bottom, transparent 40%, black);
          opacity: 0.6;
        }

        .shiny-cta span {
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .shiny-cta span::before {
          --size: calc(100% + 1rem);
          width: var(--size);
          height: var(--size);
          box-shadow: inset 0 -1ex 2rem 4px var(--shiny-cta-highlight);
          opacity: 0;
          transition: opacity var(--transition);
          animation: calc(var(--duration) * 1.5) breathe linear infinite;
        }

        /* Animate */
        .shiny-cta,
        .shiny-cta::before,
        .shiny-cta::after {
          animation: var(--animation) var(--duration),
            var(--animation) calc(var(--duration) / 0.4) reverse paused;
          animation-composition: add;
        }

        .shiny-cta:is(:hover, :focus-visible) {
          --gradient-percent: 20%;
          --gradient-angle-offset: 95deg;
          --gradient-shine: var(--shiny-cta-highlight-subtle);
          box-shadow: inset 0 0 0 1px var(--shiny-cta-bg-subtle), 0 12px 32px rgba(220, 38, 38, 0.45);
        }

        .shiny-cta:is(:hover, :focus-visible),
        .shiny-cta:is(:hover, :focus-visible)::before,
        .shiny-cta:is(:hover, :focus-visible)::after {
          animation-play-state: running;
        }

        .shiny-cta:is(:hover, :focus-visible) span::before {
          opacity: 1;
        }

        @keyframes gradient-angle {
          to {
            --gradient-angle: 360deg;
          }
        }

        @keyframes shimmer {
          to {
            rotate: 360deg;
          }
        }

        @keyframes breathe {
          from, to {
            scale: 1;
          }
          50% {
            scale: 1.2;
          }
        }
      `}</style>

      <button className={`shiny-cta ${isLight ? "shiny-cta-light" : "shiny-cta-dark"} ${className}`} onClick={onClick} style={style} {...props}>
        <span>{children}</span>
      </button>
    </>
  );
}

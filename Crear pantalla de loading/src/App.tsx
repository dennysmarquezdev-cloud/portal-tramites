import { useEffect, useState, useRef } from "react";
import logoIcon from "@/imports/image-5.png";

const DURATION = 3400;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function App() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    function tick(now: number) {
      const raw = Math.min((now - start) / DURATION, 1);
      setProgress(easeInOutCubic(raw));
      if (raw < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Gradient mask: white = visible, black = hidden.
  // A diagonal linear gradient sweeps top-right → bottom-left,
  // matching natural calligraphic writing direction.
  // The soft edge (±6%) creates a clean reveal without deformation.
  const edgeLo = Math.max(0, progress - 0.06);
  const edgeHi = Math.min(1, progress + 0.06);

  return (
    <div
      className="size-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#2F6CB5", fontFamily: "'Outfit', sans-serif" }}
    >
      <div style={{ marginBottom: 40 }}>
        <svg
          viewBox="0 0 100 100"
          width="800"
          height="800"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: 200, height: 200, borderRadius: 0 }}
        >
          <defs>
            {/* Remove blue background: alpha = R+G+B − 1.8 */}
            <filter id="xw" colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1 1 1 0 -1.8"
              />
            </filter>

            {/* Diagonal sweep: slightly tilted so reveal feels hand-drawn */}
            <linearGradient
              id="sweep"
              gradientUnits="userSpaceOnUse"
              x1="55" y1="-5"
              x2="45" y2="105"
            >
              <stop offset={edgeLo} stopColor="white" />
              <stop offset={edgeHi} stopColor="black" />
            </linearGradient>

            <mask id="m">
              <rect x="0" y="0" width="100" height="100" fill="url(#sweep)" />
            </mask>
          </defs>

          <image
            href={logoIcon}
            x="0"
            y="0"
            width="100"
            height="100"
            preserveAspectRatio="xMidYMid meet"
            filter="url(#xw)"
            mask="url(#m)"
          />
        </svg>
      </div>

      <div style={{ width: 178 }}>
        <div
          style={{
            height: 2.5,
            borderRadius: 2,
            background: "rgba(255,255,255,0.22)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress * 100}%`,
              background: "rgba(255,255,255,0.88)",
              borderRadius: 2,
              boxShadow: "0 0 9px rgba(255,255,255,0.5)",
            }}
          />
        </div>
        <p
          style={{
            color: "rgba(255,255,255,0.62)",
            fontSize: 11.5,
            fontWeight: 500,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          {progress >= 1 ? "Listo" : "Cargando…"}
        </p>
      </div>
    </div>
  );
}

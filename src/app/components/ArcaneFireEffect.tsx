import React, { useEffect, useRef } from "react";

interface ArcaneFireEffectProps {
  className?: string;
  style?: React.CSSProperties;
}

export const ArcaneFireEffect: React.FC<ArcaneFireEffectProps> = ({ className, style }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth || 260);
    let height = (canvas.height = canvas.offsetHeight || 64);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 260;
      height = canvas.height = canvas.offsetHeight || 64;
    };
    window.addEventListener("resize", handleResize);

    let t = 0;

    const render = () => {
      // Velocidad lenta y cinematográfica
      t += 0.0035;
      ctx.clearRect(0, 0, width, height);

      // 1. Nebulosa de Luz Clara y Luminosa (Tonos Celestes / Cyan Claros)
      const pulse = 0.85 + Math.sin(t * 0.6) * 0.15;
      const bgGlow = ctx.createRadialGradient(
        width * 0.35, height * 0.85, 4,
        width * 0.45, height * 0.5, width * 0.75
      );
      bgGlow.addColorStop(0, `rgba(56, 189, 248, ${0.28 * pulse})`);
      bgGlow.addColorStop(0.4, `rgba(125, 211, 252, ${0.18 * pulse})`);
      bgGlow.addColorStop(0.75, `rgba(186, 230, 253, ${0.08 * pulse})`);
      bgGlow.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalCompositeOperation = "screen";

      // 2. Ondas Arcanas con Colores Claros y Radiantes (Sin motas)
      const waves = [
        {
          // Onda 1: Cyan Claro Luminoso
          colorStart: "rgba(56, 189, 248, 0.32)",
          colorEnd: "rgba(56, 189, 248, 0.0)",
          crest: "rgba(125, 211, 252, 0.95)",
          glowColor: "#38BDF8",
          glowBlur: 14,
          lineWidth: 2.0,
          freq1: 0.011,
          freq2: 0.022,
          speed: 0.8,
          amp1: 14,
          amp2: 7,
          baseY: height * 0.58,
        },
        {
          // Onda 2: Celeste Brillante & Blanco Etéreo
          colorStart: "rgba(0, 212, 255, 0.28)",
          colorEnd: "rgba(0, 212, 255, 0.0)",
          crest: "rgba(240, 249, 255, 0.98)",
          glowColor: "#00D4FF",
          glowBlur: 13,
          lineWidth: 1.8,
          freq1: 0.015,
          freq2: 0.028,
          speed: -0.65,
          amp1: 16,
          amp2: 8,
          baseY: height * 0.44,
        },
        {
          // Onda 3: Cinta de Luz Especular Pastel
          colorStart: "rgba(186, 230, 253, 0.22)",
          colorEnd: "rgba(186, 230, 253, 0.0)",
          crest: "rgba(255, 255, 255, 0.92)",
          glowColor: "#7DD3FC",
          glowBlur: 10,
          lineWidth: 1.2,
          freq1: 0.008,
          freq2: 0.017,
          speed: 0.45,
          amp1: 11,
          amp2: 6,
          baseY: height * 0.70,
        },
      ];

      waves.forEach((w) => {
        const wavePhase = t * w.speed;

        // Relleno Volumétrico Claro
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 2) {
          const y =
            w.baseY +
            Math.sin(x * w.freq1 + wavePhase) * w.amp1 +
            Math.cos(x * w.freq2 - wavePhase * 0.75) * w.amp2;

          if (x === 0) ctx.lineTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        const waveGrad = ctx.createLinearGradient(0, w.baseY - 18, 0, height);
        waveGrad.addColorStop(0, w.colorStart);
        waveGrad.addColorStop(1, w.colorEnd);
        ctx.fillStyle = waveGrad;
        ctx.fill();

        // Línea de Cresta de Luz Nítida
        ctx.beginPath();
        for (let x = 0; x <= width; x += 2) {
          const y =
            w.baseY +
            Math.sin(x * w.freq1 + wavePhase) * w.amp1 +
            Math.cos(x * w.freq2 - wavePhase * 0.75) * w.amp2;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = w.crest;
        ctx.lineWidth = w.lineWidth;
        ctx.shadowColor = w.glowColor;
        ctx.shadowBlur = w.glowBlur;
        ctx.stroke();
      });

      ctx.restore();

      // 3. Línea de Acento Superior (#38BDF8 -> #7DD3FC)
      const topBorder = ctx.createLinearGradient(0, 0, width, 0);
      topBorder.addColorStop(0, "rgba(56, 189, 248, 0.85)");
      topBorder.addColorStop(0.5, "rgba(125, 211, 252, 0.60)");
      topBorder.addColorStop(1, "rgba(186, 230, 253, 0)");

      ctx.fillStyle = topBorder;
      ctx.fillRect(0, 0, width, 1.8);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
};

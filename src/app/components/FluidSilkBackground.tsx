import React, { useEffect, useRef } from "react";
import { GOBPE_COLORS } from "../utils/gobpe-theme";

interface FluidSilkBackgroundProps {
  theme?: "light" | "dark";
  className?: string;
}

export function FluidSilkBackground({
  theme = "dark",
  className = ""
}: FluidSilkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isLight = theme === "light";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Estado del ratón con inercia elástica
    const mouse = {
      x: width * 0.5,
      y: height * 0.5,
      targetX: width * 0.5,
      targetY: height * 0.5,
      active: false
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Definición de las 4 ondas de seda fluida armónicas
    const silkLayers = [
      {
        baseY: 0.32,
        speed: 0.0007,
        amplitude: 85,
        frequency: 0.0016,
        points: 7,
        lightColors: ["rgba(0, 86, 172, 0.08)", "rgba(19, 99, 208, 0.04)", "rgba(244, 248, 251, 0)"],
        darkColors: ["rgba(0, 113, 227, 0.22)", "rgba(0, 86, 172, 0.10)", "rgba(6, 9, 19, 0)"]
      },
      {
        baseY: 0.46,
        speed: 0.0009,
        amplitude: 105,
        frequency: 0.0013,
        points: 8,
        lightColors: ["rgba(220, 38, 38, 0.06)", "rgba(220, 54, 46, 0.02)", "rgba(244, 248, 251, 0)"],
        darkColors: ["rgba(220, 38, 38, 0.20)", "rgba(191, 9, 9, 0.08)", "rgba(6, 9, 19, 0)"]
      },
      {
        baseY: 0.60,
        speed: 0.0006,
        amplitude: 90,
        frequency: 0.0018,
        points: 7,
        lightColors: ["rgba(19, 99, 208, 0.07)", "rgba(0, 86, 172, 0.03)", "rgba(244, 248, 251, 0)"],
        darkColors: ["rgba(19, 99, 208, 0.18)", "rgba(0, 86, 172, 0.06)", "rgba(6, 9, 19, 0)"]
      },
      {
        baseY: 0.74,
        speed: 0.0008,
        amplitude: 75,
        frequency: 0.002,
        points: 6,
        lightColors: ["rgba(0, 86, 172, 0.05)", "rgba(220, 38, 38, 0.02)", "rgba(244, 248, 251, 0)"],
        darkColors: ["rgba(0, 86, 172, 0.14)", "rgba(220, 38, 38, 0.06)", "rgba(6, 9, 19, 0)"]
      }
    ];

    let time = 0;

    const render = () => {
      time += 1;

      // Suavizado del cursor
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // ── 1. Fondo Base (Gradiente Nacarado en Light / Obsidiana Cósmica en Dark) ──
      const baseGradient = ctx.createRadialGradient(
        width * 0.5, height * 0.42, 0,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.75
      );

      if (isLight) {
        baseGradient.addColorStop(0, "#FFFFFF");
        baseGradient.addColorStop(0.5, "#F6F9FD");
        baseGradient.addColorStop(1, "#EAF1F8");
      } else {
        baseGradient.addColorStop(0, "#0A1024");
        baseGradient.addColorStop(0.45, "#060A17");
        baseGradient.addColorStop(1, "#03050C");
      }

      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, width, height);

      // ── 2. Halo Central de Iluminación ──
      const centerGlow = ctx.createRadialGradient(
        width * 0.5, height * 0.45, 10,
        width * 0.5, height * 0.45, Math.max(width * 0.45, 340)
      );
      if (isLight) {
        centerGlow.addColorStop(0, "rgba(0, 86, 172, 0.06)");
        centerGlow.addColorStop(0.5, "rgba(220, 38, 38, 0.03)");
        centerGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
      } else {
        centerGlow.addColorStop(0, "rgba(0, 113, 227, 0.20)");
        centerGlow.addColorStop(0.4, "rgba(220, 38, 38, 0.12)");
        centerGlow.addColorStop(1, "rgba(3, 5, 12, 0)");
      }
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, width, height);

      // ── 3. Dibujar Ondas de Seda Líquida ──
      silkLayers.forEach((layer, layerIdx) => {
        const colors = isLight ? layer.lightColors : layer.darkColors;
        const currentBaseY = height * layer.baseY;

        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, currentBaseY);

        const step = width / (layer.points - 1);
        const pts: { x: number; y: number }[] = [];

        for (let i = 0; i < layer.points; i++) {
          const px = i * step;
          const sin1 = Math.sin(time * layer.speed + px * layer.frequency + layerIdx * 1.6);
          const cos1 = Math.cos(time * (layer.speed * 0.75) + px * (layer.frequency * 1.4));
          let py = currentBaseY + (sin1 * 0.6 + cos1 * 0.4) * layer.amplitude;

          // Efecto de interacción fluida con el cursor
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 280;
          if (dist < maxDist) {
            const force = (1 - dist / maxDist) * 32;
            py += Math.sin(dist * 0.035 - time * 0.06) * force;
          }

          pts.push({ x: px, y: py });
        }

        // Trazado de curva suave Spline
        for (let i = 0; i < pts.length - 1; i++) {
          const xc = (pts[i].x + pts[i + 1].x) / 2;
          const yc = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
        }
        ctx.lineTo(width, pts[pts.length - 1].y);
        ctx.lineTo(width, height);
        ctx.closePath();

        // Relleno de degradado vertical
        const grad = ctx.createLinearGradient(0, currentBaseY - layer.amplitude, 0, height);
        grad.addColorStop(0, colors[0]);
        grad.addColorStop(0.45, colors[1]);
        grad.addColorStop(1, colors[2]);

        ctx.fillStyle = grad;
        ctx.fill();

        // Línea de brillo en la cresta de la seda
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 0; i < pts.length - 1; i++) {
          const xc = (pts[i].x + pts[i + 1].x) / 2;
          const yc = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
        }
        ctx.strokeStyle = isLight 
          ? `rgba(255, 255, 255, ${0.6 + layerIdx * 0.1})` 
          : `rgba(255, 255, 255, ${0.12 + layerIdx * 0.05})`;
        ctx.lineWidth = isLight ? 1.8 : 1.2;
        ctx.stroke();
      });

      // ── 4. Resplandor reactivo bajo el puntero ──
      if (mouse.active) {
        const mouseGrad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 240
        );
        if (isLight) {
          mouseGrad.addColorStop(0, "rgba(0, 86, 172, 0.05)");
          mouseGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        } else {
          mouseGrad.addColorStop(0, "rgba(0, 113, 227, 0.12)");
          mouseGrad.addColorStop(0.5, "rgba(220, 38, 38, 0.06)");
          mouseGrad.addColorStop(1, "rgba(3, 5, 12, 0)");
        }
        ctx.fillStyle = mouseGrad;
        ctx.fillRect(0, 0, width, height);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isLight]);

  return (
    <div
      className={`at-fluid-silk-wrapper ${className}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden"
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%"
        }}
      />
      {/* Capa de difusión atmosférica */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          opacity: 0.5,
          pointerEvents: "none"
        }}
      />
    </div>
  );
}

export default FluidSilkBackground;

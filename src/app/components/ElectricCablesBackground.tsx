import React, { useEffect, useRef } from "react";

interface ElectricCable {
  yBase: number;
  amplitude: number;
  frequency: number;
  speed: number;
  phase: number;
  thickness: number;
  sheathColor: string;
  coreColor: string;
  voltageGlow: string;
  alpha: number;
  tension: number;
}

interface ElectricPulse {
  cableIdx: number;
  progress: number;
  speed: number;
  length: number;
  color: string;
  intensity: number;
}

interface ElectricSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

// Paleta calibrada para Modo Oscuro
const DARK_CABLE_PALETTE = [
  { sheath: "#EF4444", core: "#FCA5A5", glow: "#EF4444" }, // Fase Rojo Perú
  { sheath: "#D97706", core: "#FDE68A", glow: "#F59E0B" }, // Cobre Puro / Bronce
  { sheath: "#2563EB", core: "#93C5FD", glow: "#3B82F6" }, // Neutro Azul
  { sheath: "#15803D", core: "#86EFAC", glow: "#22C55E" }, // Tierra Verde
  { sheath: "#EA580C", core: "#FED7AA", glow: "#F97316" }, // Conductor Ámbar
  { sheath: "#475569", core: "#E2E8F0", glow: "#94A3B8" }, // Cable blindado acero
  { sheath: "#DC2626", core: "#FFFFFF", glow: "#EF4444" }, // Alta Tensión Carmín
  { sheath: "#B45309", core: "#FCD34D", glow: "#FBBF24" }  // Filamento de Cobre
];

// Paleta calibrada para Modo Claro (Swiss Paper / Pure Ceramic)
const LIGHT_CABLE_PALETTE = [
  { sheath: "#D97706", core: "#B45309", glow: "#F59E0B" }, // Cobre Puro
  { sheath: "#DC2626", core: "#991B1B", glow: "#EF4444" }, // Carmín
  { sheath: "#B45309", core: "#78350F", glow: "#D97706" }, // Ámbar Cobrizo
  { sheath: "#94A3B8", core: "#64748B", glow: "#CBD5E1" }, // Acero Platino
  { sheath: "#EA580C", core: "#C2410C", glow: "#FB923C" }, // Conductor Cálido
  { sheath: "#D97706", core: "#92400E", glow: "#FBBF24" }  // Filamento Cobre
];

export function ElectricCablesBackground({ 
  className = "",
  theme = "dark"
}: { 
  className?: string;
  theme?: "light" | "dark";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean; lastX: number; lastY: number }>({
    x: -1000,
    y: -1000,
    active: false,
    lastX: 0,
    lastY: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth * (window.devicePixelRatio || 1));
    let height = (canvas.height = window.innerHeight * (window.devicePixelRatio || 1));
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
      height = canvas.height = window.innerHeight * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
        lastX: e.clientX,
        lastY: e.clientY
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const displayW = window.innerWidth;
    const displayH = window.innerHeight;

    const isLight = theme === "light";
    const palette = isLight ? LIGHT_CABLE_PALETTE : DARK_CABLE_PALETTE;

    // 1. Creación de cables con calibración para legibilidad
    const cableCount = 18;
    const cables: ElectricCable[] = [];

    for (let i = 0; i < cableCount; i++) {
      const pal = palette[i % palette.length];
      cables.push({
        yBase: (displayH / (cableCount + 1)) * (i + 1) + (Math.random() - 0.5) * 50,
        amplitude: Math.random() * 30 + 15,
        frequency: Math.random() * 0.0014 + 0.0006,
        speed: (Math.random() - 0.5) * 0.005,
        phase: Math.random() * Math.PI * 2,
        thickness: isLight ? Math.random() * 1.5 + 1.2 : Math.random() * 2.2 + 1.8,
        sheathColor: pal.sheath,
        coreColor: pal.core,
        voltageGlow: pal.glow,
        alpha: isLight ? Math.random() * 0.08 + 0.07 : Math.random() * 0.14 + 0.28,
        tension: Math.random() * 0.3 + 0.85
      });
    }

    // 2. Impulsos de corriente suaves y elegantes
    const pulses: ElectricPulse[] = [];
    const maxPulses = 12;

    for (let i = 0; i < 6; i++) {
      const randCable = Math.floor(Math.random() * cableCount);
      pulses.push({
        cableIdx: randCable,
        progress: Math.random(),
        speed: Math.random() * 0.008 + 0.004,
        length: Math.random() * 0.15 + 0.07,
        color: cables[randCable].voltageGlow,
        intensity: Math.random() * 0.3 + 0.35
      });
    }

    // 3. Chispas voltaicas atenuadas
    const sparks: ElectricSpark[] = [];

    let time = 0;

    const render = () => {
      time += 1;
      const curW = window.innerWidth;
      const curH = window.innerHeight;
      ctx.clearRect(0, 0, curW, curH);

      // Calcular puntos de cada cable
      const pointsPerCable = 36;
      const stepX = curW / pointsPerCable;
      const cableCoords: { x: number; y: number }[][] = [];

      cables.forEach((cable, cIdx) => {
        cable.phase += cable.speed;
        const coords: { x: number; y: number }[] = [];

        for (let i = 0; i <= pointsPerCable; i++) {
          const x = i * stepX;
          let y = cable.yBase + 
                  Math.sin(x * cable.frequency + cable.phase) * cable.amplitude + 
                  Math.cos(x * cable.frequency * 0.6 + time * 0.007) * (cable.amplitude * 0.3);

          // Interacción sutil con el cursor
          if (mouseRef.current.active) {
            const dx = x - mouseRef.current.x;
            const dy = y - mouseRef.current.y;
            const dist = Math.hypot(dx, dy);
            const inductionRadius = 150;

            if (dist < inductionRadius && dist > 1) {
              const factor = (1 - dist / inductionRadius);
              y += (dy / dist) * factor * 18;

              if (Math.random() < 0.025 && sparks.length < 25) {
                sparks.push({
                  x: x + (Math.random() - 0.5) * 6,
                  y: y + (Math.random() - 0.5) * 6,
                  vx: (Math.random() - 0.5) * 2,
                  vy: (Math.random() - 0.5) * 2,
                  life: 0,
                  maxLife: Math.random() * 18 + 8,
                  color: cable.voltageGlow,
                  size: Math.random() * 1.5 + 0.8
                });
              }
            }
          }

          coords.push({ x, y });
        }
        cableCoords.push(coords);

        // A. Dibujar funda aislante atenuada
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = cable.thickness;
        ctx.strokeStyle = cable.sheathColor;
        ctx.globalAlpha = cable.alpha * (isLight ? 0.35 : 0.45);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        coords.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();

        // B. Dibujar filamento conductor
        ctx.beginPath();
        ctx.lineWidth = Math.max(1, cable.thickness * 0.35);
        ctx.strokeStyle = cable.coreColor;
        ctx.globalAlpha = cable.alpha * (isLight ? 0.55 : 0.65);
        coords.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
        ctx.restore();
      });

      // Spawn new pulses
      if (Math.random() < 0.05 && pulses.length < maxPulses) {
        const randCable = Math.floor(Math.random() * cableCount);
        pulses.push({
          cableIdx: randCable,
          progress: 0,
          speed: Math.random() * 0.009 + 0.005,
          length: Math.random() * 0.14 + 0.06,
          color: cables[randCable].voltageGlow,
          intensity: Math.random() * 0.35 + 0.3
        });
      }

      // 4. Dibujar impulsos de electricidad suaves
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;

        if (pulse.progress - pulse.length >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const coords = cableCoords[pulse.cableIdx];
        if (!coords || coords.length < 2) continue;

        const totalSegments = coords.length - 1;
        const headIdx = Math.min(totalSegments, Math.max(0, Math.floor(pulse.progress * totalSegments)));
        const tailIdx = Math.min(totalSegments, Math.max(0, Math.floor((pulse.progress - pulse.length) * totalSegments)));

        if (headIdx > tailIdx) {
          ctx.save();
          ctx.beginPath();
          for (let s = tailIdx; s <= headIdx; s++) {
            const pt = coords[s];
            if (s === tailIdx) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
          ctx.lineWidth = cables[pulse.cableIdx].thickness * (isLight ? 1.6 : 1.8);
          ctx.strokeStyle = pulse.color;
          ctx.globalAlpha = pulse.intensity * (isLight ? 0.45 : 0.6);
          ctx.shadowColor = pulse.color;
          ctx.shadowBlur = isLight ? 6 : 10;
          ctx.lineCap = "round";
          ctx.stroke();

          // Núcleo brillante
          ctx.beginPath();
          for (let s = tailIdx; s <= headIdx; s++) {
            const pt = coords[s];
            if (s === tailIdx) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
          ctx.lineWidth = cables[pulse.cableIdx].thickness * 0.6;
          ctx.strokeStyle = isLight ? "#FFFFFF" : "#FFFFFF";
          ctx.globalAlpha = pulse.intensity * (isLight ? 0.65 : 0.85);
          ctx.shadowBlur = 0;
          ctx.stroke();
          ctx.restore();
        }
      }

      // 5. Dibujar chispas
      for (let s = sparks.length - 1; s >= 0; s--) {
        const spark = sparks[s];
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.life += 1;

        if (spark.life >= spark.maxLife) {
          sparks.splice(s, 1);
          continue;
        }

        const sparkAlpha = (1 - spark.life / spark.maxLife) * (isLight ? 0.5 : 0.7);
        ctx.save();
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fillStyle = spark.color;
        ctx.globalAlpha = sparkAlpha;
        ctx.shadowColor = spark.color;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        opacity: theme === "light" ? 0.65 : 0.85,
        pointerEvents: "none"
      }}
    />
  );
}

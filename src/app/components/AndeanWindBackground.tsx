import React, { useEffect, useRef } from "react";

interface WindStream {
  yBase: number;
  amplitude: number;
  frequency: number;
  speed: number;
  phase: number;
  width: number;
  color: string;
  alpha: number;
}

interface WindParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  driftPhase: number;
}

// Paleta representativa de los Andes Peruanos: Rojo Carmín, Blanco Nieve, Oro Sol y Glaciar Huascarán
const ANDEAN_PERUVIAN_COLORS = [
  "#EF4444", // Rojo Carmín Perú
  "#FFFFFF", // Nieve Pura Andina
  "#F59E0B", // Oro Inca / Inti Sol
  "#38BDF8", // Glaciar Huascarán
  "#F87171", // Rosa Aurora Andina
  "#E2E8F0"  // Brisa Altiplánica
];

export function AndeanWindBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; vx: number; vy: number; lastX: number; lastY: number; active: boolean }>({
    x: -1000,
    y: -1000,
    vx: 0,
    vy: 0,
    lastX: 0,
    lastY: 0,
    active: false
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
      const vx = (e.clientX - mouseRef.current.lastX) * 0.15;
      const vy = (e.clientY - mouseRef.current.lastY) * 0.15;
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        vx,
        vy,
        lastX: e.clientX,
        lastY: e.clientY,
        active: true
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

    // 1. Corrientes Aerodinámicas de Viento Andino Peruano (Streams)
    const streamCount = 24;
    const streams: WindStream[] = [];

    for (let i = 0; i < streamCount; i++) {
      streams.push({
        yBase: (displayH / (streamCount + 1)) * (i + 1) + (Math.random() - 0.5) * 40,
        amplitude: Math.random() * 45 + 25,
        frequency: Math.random() * 0.0018 + 0.0008,
        speed: Math.random() * 0.015 + 0.008,
        phase: Math.random() * Math.PI * 2,
        width: Math.random() * 2.2 + 0.9,
        color: ANDEAN_PERUVIAN_COLORS[i % ANDEAN_PERUVIAN_COLORS.length],
        alpha: Math.random() * 0.22 + 0.08
      });
    }

    // 2. Partículas & Chispas de la Brisa Andina
    const particleCount = 100;
    const particles: WindParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * displayW,
        y: Math.random() * displayH,
        vx: Math.random() * 1.8 + 1.2,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.2 + 0.8,
        alpha: Math.random() * 0.75 + 0.25,
        color: ANDEAN_PERUVIAN_COLORS[Math.floor(Math.random() * ANDEAN_PERUVIAN_COLORS.length)],
        driftPhase: Math.random() * Math.PI * 2
      });
    }

    let time = 0;

    const render = () => {
      time += 1;
      const curW = window.innerWidth;
      const curH = window.innerHeight;
      ctx.clearRect(0, 0, curW, curH);

      // Dibujar Corrientes de Viento Suave
      streams.forEach((st) => {
        st.phase += st.speed;

        ctx.beginPath();
        ctx.lineWidth = st.width;
        ctx.strokeStyle = st.color;
        ctx.globalAlpha = st.alpha;

        const points = 32;
        const stepX = curW / points;

        for (let i = 0; i <= points; i++) {
          const x = i * stepX;
          
          // Onda senoidal base del viento andino
          let y = st.yBase + Math.sin(x * st.frequency + st.phase) * st.amplitude + Math.cos(x * st.frequency * 0.5 + time * 0.01) * (st.amplitude * 0.4);

          // Ráfaga interactiva con el mouse
          if (mouseRef.current.active) {
            const dx = x - mouseRef.current.x;
            const dy = y - mouseRef.current.y;
            const dist = Math.hypot(dx, dy);
            const maxGust = 220;

            if (dist < maxGust && dist > 1) {
              const gustFactor = (1 - dist / maxGust);
              y += (dy / dist) * gustFactor * 32 + mouseRef.current.vy * gustFactor * 8;
            }
          }

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      });

      // Dibujar Partículas Flotando en el Viento Andino
      particles.forEach((p) => {
        p.driftPhase += 0.02;
        p.x += p.vx;
        p.y += p.vy + Math.sin(p.driftPhase + time * 0.02) * 0.6;

        // Mouse gust reaction
        if (mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.hypot(dx, dy);
          const maxDist = 180;

          if (dist < maxDist && dist > 1) {
            const force = (1 - dist / maxDist);
            p.x += (dx / dist) * force * 3.5 + mouseRef.current.vx * force * 1.5;
            p.y += (dy / dist) * force * 3.5 + mouseRef.current.vy * force * 1.5;
          }
        }

        // Wrap around horizontally
        if (p.x > curW + 20) {
          p.x = -20;
          p.y = Math.random() * curH;
          p.vx = Math.random() * 1.8 + 1.2;
        }

        if (p.y < -20) p.y = curH + 20;
        if (p.y > curH + 20) p.y = -20;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (0.8 + Math.sin(p.driftPhase) * 0.2);
        ctx.shadowBlur = p.size * 5;
        ctx.shadowColor = p.color;
        ctx.fill();

        // White glowing spark at center
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
        background: "transparent",
        zIndex: 0
      }}
    />
  );
}

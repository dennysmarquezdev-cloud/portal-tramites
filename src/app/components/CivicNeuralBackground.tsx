import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label?: string;
  color: string;
  glow: number;
  pulsePhase: number;
}

interface Pulse {
  sourceIdx: number;
  targetIdx: number;
  progress: number;
  speed: number;
  color: string;
}

const ENTITY_LABELS = [
  "RENIEC", "SUNAT", "MTC", "SUNARP", "BANCO DE LA NACIÓN", 
  "MIGRACIONES", "ESSALUD", "MINEDU", "PÁGALO.PE", "TUPA DIGITAL", 
  "SUCAMEC", "INDECOPI", "OSIPTEL", "ONP"
];

const COLORS = ["#38BDF8", "#818CF8", "#00F2FE", "#C084FC", "#67E8F9", "#A5B4FC"];

export function CivicNeuralBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

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
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const displayW = window.innerWidth;
    const displayH = window.innerHeight;

    // Create Nodes
    const nodes: Node[] = [];
    const totalEntities = ENTITY_LABELS.length;
    const totalConstellation = 42;

    // 1. Major Entity Nodes with Civic Labels
    for (let i = 0; i < totalEntities; i++) {
      nodes.push({
        x: Math.random() * (displayW * 0.9) + displayW * 0.05,
        y: Math.random() * (displayH * 0.85) + displayH * 0.08,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.2 + 3.2,
        label: ENTITY_LABELS[i],
        color: COLORS[i % COLORS.length],
        glow: 14,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // 2. Micro Data Constellation Points
    for (let i = 0; i < totalConstellation; i++) {
      nodes.push({
        x: Math.random() * displayW,
        y: Math.random() * displayH,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 1.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        glow: 8,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // Data Pulses
    const pulses: Pulse[] = [];
    const maxPulses = 16;

    const render = () => {
      const curW = window.innerWidth;
      const curH = window.innerHeight;
      ctx.clearRect(0, 0, curW, curH);

      const maxConnectDist = Math.min(curW, curH) * 0.22;
      const mouseMaxDist = 180;

      // Update and Draw Nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulsePhase += 0.03;

        // Bounce on borders softly
        if (node.x < 20 || node.x > curW - 20) node.vx *= -1;
        if (node.y < 20 || node.y > curH - 20) node.vy *= -1;

        // Mouse gentle repel
        if (mouseRef.current.active) {
          const dx = node.x - mouseRef.current.x;
          const dy = node.y - mouseRef.current.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouseMaxDist && dist > 1) {
            const force = (1 - dist / mouseMaxDist) * 0.8;
            node.x += (dx / dist) * force * 2.5;
            node.y += (dy / dist) * force * 2.5;
          }
        }

        // Draw connections between nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const target = nodes[j];
          const dx = target.x - node.x;
          const dy = target.y - node.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectDist) {
            const alpha = Math.max(0, (1 - dist / maxConnectDist) * 0.35);
            ctx.beginPath();
            ctx.strokeStyle = node.label || target.label ? "#38BDF8" : "rgba(129, 140, 248, 0.4)";
            ctx.globalAlpha = alpha;
            ctx.lineWidth = node.label && target.label ? 1.2 : 0.75;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();

            // Spawn occasional pulse
            if (Math.random() < 0.003 && pulses.length < maxPulses) {
              pulses.push({
                sourceIdx: i,
                targetIdx: j,
                progress: 0,
                speed: Math.random() * 0.012 + 0.008,
                color: "#FFFFFF"
              });
            }
          }
        }

        // Draw Node Core
        const breathing = Math.sin(node.pulsePhase) * 0.5 + 1;
        ctx.save();
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * breathing, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.label ? 0.95 : 0.65;
        ctx.shadowBlur = node.glow * breathing;
        ctx.shadowColor = node.color;
        ctx.fill();

        // Draw White Core Center
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.globalAlpha = 1;
        ctx.fill();
        ctx.restore();

        // Draw Entity Label if available
        if (node.label) {
          ctx.save();
          ctx.font = "700 9.5px 'JetBrains Mono', monospace";
          ctx.fillStyle = "rgba(226, 232, 240, 0.85)";
          ctx.textAlign = "center";
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(0,0,0,0.8)";
          ctx.fillText(node.label, node.x, node.y + node.radius + 13);
          ctx.restore();
        }
      });

      // Update & Draw Data Pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const src = nodes[pulse.sourceIdx];
        const tgt = nodes[pulse.targetIdx];
        if (!src || !tgt) {
          pulses.splice(p, 1);
          continue;
        }

        const px = src.x + (tgt.x - src.x) * pulse.progress;
        const py = src.y + (tgt.y - src.y) * pulse.progress;

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.globalAlpha = Math.sin(pulse.progress * Math.PI) * 0.95;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#38BDF8";
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

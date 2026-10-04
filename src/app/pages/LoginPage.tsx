import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "sonner";
import { DismissRegular, SparkleRegular, LockClosedRegular, ArrowLeftRegular } from "@fluentui/react-icons";
import { Page } from "../types";
import { haptic } from "../utils/haptics";

export default function LoginPage({ 
  onLogin, 
  onNavigate 
}: { 
  onLogin?: () => void; 
  onNavigate?: (page: Page) => void;
}) {
  const [loading, setLoading] = useState(false);

  // GSAP References
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const halo1Ref = useRef<HTMLDivElement>(null);
  const halo2Ref = useRef<HTMLDivElement>(null);
  const halo3Ref = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const glassCardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const googleBtnRef = useRef<HTMLButtonElement>(null);
  const trustBadgeRef = useRef<HTMLDivElement>(null);
  const securityShimmerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  
  // Silk Wave Refs
  const waveContainerRef = useRef<HTMLDivElement>(null);
  const wave1Ref = useRef<SVGPathElement>(null);
  const wave2Ref = useRef<SVGPathElement>(null);
  const wave3Ref = useRef<SVGPathElement>(null);

  // GSAP QuickTo Multi-Layer Physics
  const quickPhysics = useRef<{
    cardRx?: gsap.QuickToFunc;
    cardRy?: gsap.QuickToFunc;
    cardX?: gsap.QuickToFunc;
    cardY?: gsap.QuickToFunc;
    spotX?: gsap.QuickToFunc;
    spotY?: gsap.QuickToFunc;
    robotX?: gsap.QuickToFunc;
    robotY?: gsap.QuickToFunc;
    robotRy?: gsap.QuickToFunc;
    h1x?: gsap.QuickToFunc;
    h1y?: gsap.QuickToFunc;
    h2x?: gsap.QuickToFunc;
    h2y?: gsap.QuickToFunc;
    h3x?: gsap.QuickToFunc;
    h3y?: gsap.QuickToFunc;
    btnX?: gsap.QuickToFunc;
    btnY?: gsap.QuickToFunc;
  }>({});

  useEffect(() => {
    // ─── 1. Entrada Cinematográfica Orquestada ───
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo([halo1Ref.current, halo2Ref.current, halo3Ref.current], 
      { scale: 0.75, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1.1, stagger: 0.12, ease: "expo.out" }
    );

    if (waveContainerRef.current) {
      tl.fromTo(waveContainerRef.current, 
        { y: 60, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" }, 
        "-=0.8"
      );
    }

    if (robotRef.current) {
      tl.fromTo(robotRef.current, 
        { y: -30, opacity: 0, scale: 0.94, filter: "blur(8px)" }, 
        { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }, 
        "-=0.65"
      );
    }

    if (glassCardRef.current) {
      tl.fromTo(glassCardRef.current, 
        { y: 28, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)" }, 
        "-=0.55"
      );
    }

    tl.fromTo([logoRef.current, titleRef.current, subtitleRef.current, googleBtnRef.current, trustBadgeRef.current],
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: "power2.out" },
      "-=0.45"
    );

    if (footerRef.current) {
      tl.fromTo(footerRef.current, 
        { opacity: 0, y: 8 }, 
        { opacity: 1, y: 0, duration: 0.5 }, 
        "-=0.3"
      );
    }

    // ─── 2. Animación Continua de Ondas de Seda con GSAP ───
    if (wave1Ref.current) {
      gsap.to(wave1Ref.current, {
        x: -90,
        y: 4,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    if (wave2Ref.current) {
      gsap.to(wave2Ref.current, {
        x: 110,
        y: -5,
        duration: 9.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.4
      });
    }
    if (wave3Ref.current) {
      gsap.to(wave3Ref.current, {
        x: -140,
        y: 6,
        duration: 11.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.8
      });
    }

    // ─── 3. Destello Periódico de Seguridad en Badge ───
    if (securityShimmerRef.current) {
      gsap.fromTo(securityShimmerRef.current,
        { x: -80, opacity: 0 },
        { x: 180, opacity: 0.8, duration: 1.8, repeat: -1, repeatDelay: 3.5, ease: "power2.inOut" }
      );
    }

    // ─── 4. Configurar QuickTo Handlers ───
    if (glassCardRef.current) {
      quickPhysics.current.cardRx = gsap.quickTo(glassCardRef.current, "rotationX", { duration: 0.45, ease: "power2.out" });
      quickPhysics.current.cardRy = gsap.quickTo(glassCardRef.current, "rotationY", { duration: 0.45, ease: "power2.out" });
      quickPhysics.current.cardX = gsap.quickTo(glassCardRef.current, "x", { duration: 0.5, ease: "power2.out" });
      quickPhysics.current.cardY = gsap.quickTo(glassCardRef.current, "y", { duration: 0.5, ease: "power2.out" });
    }

    if (spotlightRef.current) {
      quickPhysics.current.spotX = gsap.quickTo(spotlightRef.current, "x", { duration: 0.25, ease: "power2.out" });
      quickPhysics.current.spotY = gsap.quickTo(spotlightRef.current, "y", { duration: 0.25, ease: "power2.out" });
    }

    if (robotRef.current) {
      quickPhysics.current.robotX = gsap.quickTo(robotRef.current, "x", { duration: 0.6, ease: "power2.out" });
      quickPhysics.current.robotY = gsap.quickTo(robotRef.current, "y", { duration: 0.6, ease: "power2.out" });
      quickPhysics.current.robotRy = gsap.quickTo(robotRef.current, "rotationY", { duration: 0.6, ease: "power2.out" });
    }

    if (halo1Ref.current) {
      quickPhysics.current.h1x = gsap.quickTo(halo1Ref.current, "x", { duration: 0.9, ease: "power2.out" });
      quickPhysics.current.h1y = gsap.quickTo(halo1Ref.current, "y", { duration: 0.9, ease: "power2.out" });
    }
    if (halo2Ref.current) {
      quickPhysics.current.h2x = gsap.quickTo(halo2Ref.current, "x", { duration: 1.1, ease: "power2.out" });
      quickPhysics.current.h2y = gsap.quickTo(halo2Ref.current, "y", { duration: 1.1, ease: "power2.out" });
    }
    if (halo3Ref.current) {
      quickPhysics.current.h3x = gsap.quickTo(halo3Ref.current, "x", { duration: 1.3, ease: "power2.out" });
      quickPhysics.current.h3y = gsap.quickTo(halo3Ref.current, "y", { duration: 1.3, ease: "power2.out" });
    }

    if (googleBtnRef.current) {
      quickPhysics.current.btnX = gsap.quickTo(googleBtnRef.current, "x", { duration: 0.3, ease: "power2.out" });
      quickPhysics.current.btnY = gsap.quickTo(googleBtnRef.current, "y", { duration: 0.3, ease: "power2.out" });
    }

    return () => {
      tl.kill();
    };
  }, []);

  // 3D Magnetic Parallax Multi-Capa Global + Spotlight Tracking
  const handleGlobalMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const w = window.innerWidth || 1000;
    const h = window.innerHeight || 800;
    const xNorm = (e.clientX - w / 2) / (w / 2); // -1 a 1
    const yNorm = (e.clientY - h / 2) / (h / 2); // -1 a 1

    // 1. Tarjeta de Cristal: Inclinación 3D
    quickPhysics.current.cardRy?.(xNorm * 6.5);
    quickPhysics.current.cardRx?.(-yNorm * 6.5);
    quickPhysics.current.cardX?.(xNorm * 7);
    quickPhysics.current.cardY?.(yNorm * 5);

    // 2. Spotlight traslúcido dentro de la tarjeta
    if (glassCardRef.current) {
      const cardRect = glassCardRef.current.getBoundingClientRect();
      const sx = e.clientX - cardRect.left - 75;
      const sy = e.clientY - cardRect.top - 75;
      quickPhysics.current.spotX?.(sx);
      quickPhysics.current.spotY?.(sy);
    }

    // 3. Robot 3D: Desplazamiento en sentido opuesto
    quickPhysics.current.robotX?.(-xNorm * 12);
    quickPhysics.current.robotY?.(-yNorm * 8);
    quickPhysics.current.robotRy?.(-xNorm * 5);

    // 4. Halos Atmosféricos
    quickPhysics.current.h1x?.(xNorm * 22);
    quickPhysics.current.h1y?.(yNorm * 16);
    quickPhysics.current.h2x?.(-xNorm * 28);
    quickPhysics.current.h2y?.(-yNorm * 20);
    quickPhysics.current.h3x?.(xNorm * 18);
    quickPhysics.current.h3y?.(yNorm * 22);
  };

  const handleGlobalMouseLeave = () => {
    quickPhysics.current.cardRy?.(0);
    quickPhysics.current.cardRx?.(0);
    quickPhysics.current.cardX?.(0);
    quickPhysics.current.cardY?.(0);
    quickPhysics.current.robotX?.(0);
    quickPhysics.current.robotY?.(0);
    quickPhysics.current.robotRy?.(0);
    quickPhysics.current.h1x?.(0);
    quickPhysics.current.h1y?.(0);
    quickPhysics.current.h2x?.(0);
    quickPhysics.current.h2y?.(0);
    quickPhysics.current.h3x?.(0);
    quickPhysics.current.h3y?.(0);
    quickPhysics.current.btnX?.(0);
    quickPhysics.current.btnY?.(0);
  };

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!googleBtnRef.current) return;
    const rect = googleBtnRef.current.getBoundingClientRect();
    const bx = e.clientX - (rect.left + rect.width / 2);
    const by = e.clientY - (rect.top + rect.height / 2);
    quickPhysics.current.btnX?.(bx * 0.2);
    quickPhysics.current.btnY?.(by * 0.2);
  };

  const handleButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    quickPhysics.current.btnX?.(0);
    quickPhysics.current.btnY?.(0);
  };

  const handleGoogle = async () => {
    haptic.medium();
    setLoading(true);
    if (googleBtnRef.current) {
      gsap.to(googleBtnRef.current, { scale: 0.98, duration: 0.15 });
    }
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onLogin?.();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Error al iniciar sesión con Google");
      if (googleBtnRef.current) {
        gsap.to(googleBtnRef.current, { scale: 1, duration: 0.2 });
      }
    } finally {
      setLoading(false);
    }
  };

  const navigateTo = (target: Page) => {
    haptic.selection();
    if (onNavigate) {
      onNavigate(target);
    } else {
      window.location.hash = `#${target}`;
    }
  };

  return (
    <div
      ref={pageContainerRef}
      onMouseMove={handleGlobalMouseMove}
      onMouseLeave={handleGlobalMouseLeave}
      style={{
        position: "relative",
        minHeight: "100vh",
        height: "100dvh",
        width: "100vw",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 50% 0%, #FFFFFF 0%, #F8FAFC 40%, #FFF5F5 75%, #F1F5F9 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 16px 8px",
        boxSizing: "border-box",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Botón de Retorno Rápido a Inicio */}
      <motion.button
        whileHover={{ scale: 1.08, background: "rgba(255, 255, 255, 0.95)" }}
        whileTap={{ scale: 0.92 }}
        onClick={() => navigateTo("home")}
        style={{
          position: "absolute",
          top: 18,
          left: 18,
          zIndex: 20,
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          borderRadius: 9999,
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          gap: 6,
          cursor: "pointer",
          fontSize: 13,
          fontWeight: 650,
          color: "#0F172A",
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.05)"
        }}
      >
        <ArrowLeftRegular fontSize={15} color="#DC2626" />
        <span>Inicio</span>
      </motion.button>

      {/* Halo 1: Resplandor Carmín Nácar Suave */}
      <div
        ref={halo1Ref}
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "clamp(380px, 60vh, 680px)",
          height: "clamp(380px, 60vh, 680px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(220, 38, 38, 0.14) 0%, rgba(239, 68, 68, 0.05) 45%, transparent 72%)",
          pointerEvents: "none",
          zIndex: 0,
          willChange: "transform, opacity"
        }}
      />

      {/* Halo 2: Luz Solar Cálida de Oro */}
      <div
        ref={halo2Ref}
        style={{
          position: "absolute",
          top: "10%",
          right: "15%",
          width: "clamp(260px, 35vh, 420px)",
          height: "clamp(260px, 35vh, 420px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.16) 0%, rgba(254, 240, 138, 0.06) 50%, transparent 75%)",
          pointerEvents: "none",
          zIndex: 0,
          willChange: "transform, opacity"
        }}
      />

      {/* Halo 3: Brisa Nácar Blanca */}
      <div
        ref={halo3Ref}
        style={{
          position: "absolute",
          bottom: "15%",
          left: "10%",
          width: "clamp(240px, 30vh, 380px)",
          height: "clamp(240px, 30vh, 380px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(241, 245, 249, 0.3) 55%, transparent 80%)",
          pointerEvents: "none",
          zIndex: 0,
          willChange: "transform, opacity"
        }}
      />

      {/* Main Centered Composition Container con Perspectiva 3D */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: 520,
          margin: "auto 0",
          boxSizing: "border-box",
          perspective: 1200,
        }}
      >
        {/* Robot Video Hero con Parallax de Profundidad Opuesto */}
        <div
          ref={robotRef}
          style={{
            position: "relative",
            width: "clamp(220px, 34vh, 390px)",
            height: "clamp(220px, 34vh, 390px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            filter: "drop-shadow(0 12px 28px rgba(220, 38, 38, 0.12))",
            willChange: "transform, opacity, filter",
            transformStyle: "preserve-3d"
          }}
        >
          <video
            src="/login-resources/cute-robot-standing.webm"
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Frosted Glass Card con Spotlight Dinámico y Borde Refráctil */}
        <div
          ref={glassCardRef}
          style={{
            position: "relative",
            zIndex: 3,
            width: "min(324px, 92vw)",
            minHeight: "auto",
            marginTop: "clamp(-125px, -17vh, -155px)",
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(28px) saturate(190%)",
            WebkitBackdropFilter: "blur(28px) saturate(190%)",
            border: "1.5px solid rgba(255, 255, 255, 0.95)",
            borderRadius: 20,
            padding: "20px 22px 18px",
            boxSizing: "border-box",
            boxShadow: "0 20px 50px -10px rgba(220, 38, 38, 0.12), 0 8px 24px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(255, 255, 255, 0.9), inset 0 1.5px 2px #FFFFFF",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
            transformStyle: "preserve-3d",
            userSelect: "none",
            overflow: "hidden",
            willChange: "transform, opacity"
          }}
        >
          {/* Spotlight Interactivo traslúcido */}
          <div
            ref={spotlightRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 150,
              height: 150,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, rgba(255, 255, 255, 0) 70%)",
              pointerEvents: "none",
              zIndex: 0,
              filter: "blur(10px)",
              willChange: "transform"
            }}
          />

          {/* Header Row: Logo Icon */}
          <div style={{ marginBottom: 8, display: "flex", alignItems: "center", position: "relative", zIndex: 2 }}>
            <img
              ref={logoRef}
              src="/login-resources/logo-ahorratiempo.svg"
              alt="ahorratiempo"
              style={{ width: 28, height: 24, objectFit: "contain", willChange: "transform, opacity" }}
            />
          </div>

          {/* Heading */}
          <h2
            ref={titleRef}
            style={{
              margin: "0 0 4px 0",
              fontSize: 20,
              fontWeight: 700,
              color: "#0F172A",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              position: "relative",
              zIndex: 2,
              willChange: "transform, opacity"
            }}
          >
            Iniciar sesión
          </h2>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            style={{
              margin: "0 0 16px 0",
              fontSize: 13,
              lineHeight: 1.4,
              color: "#475569",
              fontWeight: 400,
              position: "relative",
              zIndex: 2,
              willChange: "transform, opacity"
            }}
          >
            Gestiona tus trámites del Estado peruano con asistencia de Inteligencia Artificial rápida y segura.
          </p>

          {/* CSS Keyframes for Subtle Shimmer */}
          <style>{`
            @keyframes figmaButtonShimmer {
              0% { transform: translateX(-150%) skewX(-20deg); opacity: 0; }
              20% { opacity: 0.8; }
              40% { transform: translateX(250%) skewX(-20deg); opacity: 0; }
              100% { transform: translateX(250%) skewX(-20deg); opacity: 0; }
            }
            .figma-btn-shimmer {
              position: absolute;
              top: 0;
              left: 0;
              width: 60%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent);
              animation: figmaButtonShimmer 3.5s ease-in-out infinite;
              pointer-events: none;
            }
            .emil-google-btn:focus-visible {
              outline: 2px solid #DC2626;
              outline-offset: 2px;
            }
          `}</style>

          {/* Botón de Google Magnético con GSAP */}
          <motion.button
            ref={googleBtnRef}
            onClick={handleGoogle}
            onMouseMove={handleButtonMouseMove}
            onMouseLeave={handleButtonMouseLeave}
            disabled={loading}
            className="emil-google-btn"
            whileHover={{ 
              boxShadow: "0 10px 26px rgba(220, 38, 38, 0.16), 0 0 0 1.5px rgba(220, 38, 38, 0.4), inset 0 1.5px 2px #FFFFFF",
            }}
            whileTap={{ scale: 0.96 }}
            style={{
              position: "relative",
              overflow: "hidden",
              width: "100%",
              height: 46,
              borderRadius: 12,
              background: "linear-gradient(180deg, #FFFFFF 0%, #FAFBFC 50%, #F1F5F9 100%)",
              border: "1.5px solid rgba(203, 213, 225, 0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              cursor: loading ? "wait" : "pointer",
              userSelect: "none",
              WebkitTapHighlightColor: "transparent",
              boxShadow: "0 4px 14px rgba(15, 23, 42, 0.07), 0 1px 3px rgba(0, 0, 0, 0.03), inset 0 1.5px 2px #FFFFFF, inset 0 -1px 0 rgba(0, 0, 0, 0.04)",
              transition: "box-shadow 140ms ease, border-color 140ms ease",
              marginTop: "auto",
              zIndex: 2,
              willChange: "transform, opacity"
            }}
          >
            {/* Shimmer light sweep */}
            <div className="figma-btn-shimmer" />

            <motion.img
              src="/login-resources/icons8-google.svg"
              alt="Google"
              animate={{ rotate: loading ? 360 : 0 }}
              transition={{ repeat: loading ? Infinity : 0, duration: 0.8, ease: "linear" }}
              style={{ width: 20, height: 20, objectFit: "contain", position: "relative", zIndex: 2 }}
            />
            <span
              style={{
                fontFamily: "'Calibri', 'Carlito', 'Candara', 'Segoe UI', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#0F172A",
                position: "relative",
                zIndex: 2,
              }}
            >
              {loading ? "Iniciando sesión..." : "Continuar con Google"}
            </span>
          </motion.button>

          {/* Micro Trust & Security Note con GSAP Pulse Shimmer */}
          <div
            ref={trustBadgeRef}
            style={{
              position: "relative",
              overflow: "hidden",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              marginTop: 10,
              padding: "2px 0",
              fontSize: 11,
              color: "#64748B",
              fontWeight: 600,
              letterSpacing: "0.01em",
              zIndex: 2,
              willChange: "transform, opacity"
            }}
          >
            {/* Shimmer linear beam on trust badge */}
            <div
              ref={securityShimmerRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 40,
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.4), transparent)",
                pointerEvents: "none",
                willChange: "transform"
              }}
            />
            <LockClosedRegular fontSize={12} color="#DC2626" />
            <span>Acceso seguro vía Google OAuth 2.0</span>
          </div>
        </div>
      </div>

      {/* Footer Limpio con Alta Jerarquía */}
      <footer
        ref={footerRef}
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          padding: "10px 20px 8px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          boxSizing: "border-box",
          willChange: "transform, opacity"
        }}
      >
        <span style={{ fontSize: 13, color: "#64748B", fontWeight: 500 }}>
          © {new Date().getFullYear()} ahorratiempo.pe
        </span>

        <span style={{ color: "#CBD5E1", fontSize: 13 }}>•</span>

        <button
          onClick={() => navigateTo("terminos")}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            fontSize: 13,
            color: "#DC2626",
            fontWeight: 600,
            cursor: "pointer",
            textDecoration: "underline",
            textUnderlineOffset: 3,
            transition: "color 140ms ease",
            fontFamily: "inherit"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#991B1B"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#DC2626"; }}
        >
          Términos y Condiciones
        </button>
      </footer>

      {/* 🌊 Bottom Wave: Olas de Seda Nacarada con GSAP Animation 🌊 */}
      <div
        ref={waveContainerRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "clamp(130px, 20vh, 195px)",
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: 0,
          willChange: "transform, opacity"
        }}
      >
        <svg
          viewBox="0 0 1600 280"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            bottom: 0,
            left: "-5%",
            width: "110%",
            height: "100%",
          }}
        >
          <defs>
            {/* Gradiente Seda Carmín Suave */}
            <linearGradient id="silkDeepGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FCA5A5" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#DC2626" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#F8FAFC" stopOpacity="1" />
            </linearGradient>

            {/* Gradiente Seda Oro Solar */}
            <linearGradient id="silkMidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#FED7AA" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#F8FAFC" stopOpacity="1" />
            </linearGradient>

            {/* Gradiente Seda Frontal Nácar */}
            <linearGradient id="silkFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="35%" stopColor="#FFF5F5" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F8FAFC" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Capa 3: Onda Profunda */}
          <path
            ref={wave3Ref}
            d="M-200,120 C150,40 550,180 950,90 C1350,20 1650,140 1900,110 L1900,280 L-200,280 Z"
            fill="url(#silkDeepGrad)"
          />

          {/* Capa 2: Onda Media */}
          <path
            ref={wave2Ref}
            d="M-150,150 C200,80 600,210 1050,130 C1400,60 1680,180 1850,140 L1850,280 L-150,280 Z"
            fill="url(#silkMidGrad)"
          />

          {/* Capa 1: Onda Frontal */}
          <path
            ref={wave1Ref}
            d="M-100,95 C300,180 700,40 1100,120 C1400,180 1600,80 1800,125 L1800,280 L-100,280 Z"
            fill="url(#silkFrontGrad)"
          />
        </svg>
      </div>
    </div>
  );
}

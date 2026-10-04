import React, { useState, useEffect } from "react";
import { DismissRegular, FoodCakeRegular } from '@fluentui/react-icons';
import { motion, AnimatePresence } from "motion/react";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Small delay before showing
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    } else if (consent === "granted") {
      // If previously granted, update gtag immediately
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("consent", "update", {
          ad_storage: "granted",
          analytics_storage: "granted"
        });
      }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "granted");
    setShow(false);
    
    // Update gtag consent
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted"
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "denied");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          style={{
            position: "fixed",
            bottom: 24,
            left: 24,
            right: 24,
            maxWidth: 550,
            margin: "0 auto",
            zIndex: 9999,
            background: "var(--colorNeutralBackground1)",
            
            border: "1px solid rgba(13,110,253,0.3)",
            borderRadius: 16,
            padding: "20px 24px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,194,255,0.1)",
            fontFamily: "'Inter', sans-serif"
          }}
        >
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: "rgba(0,194,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
            }}>
              <FoodCakeRegular fontSize={18} color="#00C2FF" />
            </div>
            
            <div style={{ flex: 1 }}>
              <h3 style={{ color: "#FFF", fontSize: 15, fontWeight: 700, margin: "0 0 6px" }}>
                Valoramos tu privacidad
              </h3>
              <p style={{ color: "#B8C1D1", fontSize: 13, lineHeight: 1.5, margin: "0 0 16px" }}>
                Utilizamos cookies para analizar nuestro tráfico de forma anónima y mejorar la plataforma, conforme a la Ley N° 29733. 
                Revisa nuestra <a href="#cookies" onClick={() => { setShow(false); window.history.pushState({ page: "cookies" }, "", "#cookies"); window.dispatchEvent(new PopStateEvent("popstate", { state: { page: "cookies" } })); }} style={{ color: "#00C2FF", textDecoration: "none", fontWeight: 600 }}>Política de Cookies</a>
              </p>
              
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  onClick={handleAccept}
                  style={{
                    background: "linear-gradient(135deg, #0D6EFD, #00C2FF)",
                    border: "none",
                    borderRadius: 8,
                    color: "#FFF",
                    padding: "8px 20px",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(13,110,253,0.3)"
                  }}
                >
                  Aceptar todas
                </button>
                <button
                  onClick={handleDecline}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid var(--colorNeutralStroke1)",
                    borderRadius: 8,
                    color: "#B8C1D1",
                    padding: "8px 16px",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                >
                  Solo necesarias
                </button>
              </div>
            </div>
            
            <button
              onClick={() => setShow(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#7A9ABF",
                cursor: "pointer",
                padding: 4
              }}
            >
              <DismissRegular fontSize={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

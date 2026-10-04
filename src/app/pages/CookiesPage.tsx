import React from "react";
import { InfoRegular } from '@fluentui/react-icons';

export default function CookiesPage() {
  return (
    <div style={{ padding: "clamp(20px, 5vw, 40px)", maxWidth: 800, margin: "0 auto", color: "var(--colorNeutralForeground2)", lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--colorBrandBackground2)", border: "1px solid var(--colorBrandStroke2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <InfoRegular fontSize={20} color="var(--colorBrandForeground1)" />
        </div>
        <h1 style={{ color: "var(--colorNeutralForeground1)", fontSize: 28, fontWeight: 700, margin: 0 }}>Política de Cookies</h1>
      </div>
      
      <div style={{ background: "var(--colorNeutralBackground1)", border: "1px solid var(--colorNeutralStroke1)", borderRadius: 16, padding: "clamp(20px, 5vw, 32px)", boxShadow: "var(--elevation4)" }}>
        <p style={{ marginBottom: 16 }}>
          Esta Política de Cookies explica qué son las cookies, cómo las utilizamos en <strong>ahorratiempo</strong> y cómo usted puede gestionarlas.
        </p>
        
        <h2 style={{ color: "var(--colorNeutralForeground1)", fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>¿Qué son las cookies?</h2>
        <p style={{ marginBottom: 16 }}>
          Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (computadora, tablet o móvil) cuando visita un sitio web. Ayudan a que el sitio web funcione de manera más eficiente y proporcionan información a los propietarios del sitio.
        </p>

        <h2 style={{ color: "var(--colorNeutralForeground1)", fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>¿Cómo utilizamos las cookies?</h2>
        <p style={{ marginBottom: 16 }}>
          Utilizamos dos tipos principales de cookies:
          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
            <li style={{ marginBottom: 8 }}><strong>Cookies estrictamente necesarias:</strong> Son esenciales para el funcionamiento básico de la página, como mantener su sesión iniciada o recordar sus preferencias de visualización (ej. trámites favoritos).</li>
            <li style={{ marginBottom: 8 }}><strong>Cookies de análisis (Google Analytics):</strong> Nos ayudan a entender cómo los usuarios interactúan con nuestro sitio web, midiendo el número de visitas, las páginas más consultadas y de dónde proviene nuestro tráfico. Esta información es anónima.</li>
          </ul>
        </p>

        <h2 style={{ color: "var(--colorNeutralForeground1)", fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Su Control sobre las Cookies</h2>
        <p style={{ marginBottom: 16 }}>
          Usted tiene el derecho de aceptar o rechazar las cookies no esenciales (analíticas). Si decide no aceptar las cookies analíticas, el sitio seguirá funcionando normalmente, pero no podremos recopilar datos de rendimiento para mejorarlo. Podrá ajustar sus preferencias desde la barra de consentimiento inferior.
        </p>
      </div>
    </div>
  );
}

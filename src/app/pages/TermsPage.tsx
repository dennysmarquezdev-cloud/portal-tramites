import React from "react";
import { DocumentTextRegular } from '@fluentui/react-icons';

export default function TermsPage() {
  return (
    <div style={{ padding: "clamp(20px, 5vw, 40px)", maxWidth: 800, margin: "0 auto", color: "var(--colorNeutralForeground2)", lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--colorBrandBackground2)", border: "1px solid var(--colorBrandStroke2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <DocumentTextRegular fontSize={20} color="var(--colorBrandForeground1)" />
        </div>
        <h1 style={{ color: "var(--colorNeutralForeground1)", fontSize: 28, fontWeight: 700, margin: 0 }}>Términos y Condiciones</h1>
      </div>
      
      <div style={{ background: "var(--colorNeutralBackground1)", border: "1px solid var(--colorNeutralStroke1)", borderRadius: 16, padding: "clamp(20px, 5vw, 32px)", boxShadow: "var(--elevation4)" }}>
        <p style={{ marginBottom: 16 }}>
          Bienvenido a <strong>ahorratiempo</strong>. Al acceder y utilizar esta plataforma, usted acepta los siguientes términos y condiciones. Por favor, léalos detenidamente.
        </p>
        
        <h2 style={{ color: "var(--colorNeutralForeground1)", fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>1. Naturaleza del Servicio</h2>
        <p style={{ marginBottom: 16 }}>
          ahorratiempo es una plataforma informativa privada e independiente. <strong>No somos una entidad gubernamental del Estado Peruano</strong>, ni estamos afiliados, asociados, o respaldados por ninguna institución pública. Nuestro propósito es facilitar información de acceso público sobre trámites estatales para ayudar a los ciudadanos.
        </p>

        <h2 style={{ color: "var(--colorNeutralForeground1)", fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>2. Exactitud de la Información</h2>
        <p style={{ marginBottom: 16 }}>
          Nos esforzamos por mantener la información de los trámites actualizada recopilando datos de fuentes oficiales (como gob.pe). Sin embargo, los requisitos, costos y tiempos pueden cambiar sin previo aviso por parte de las entidades oficiales. ahorratiempo no se responsabiliza por errores u omisiones ni por perjuicios derivados de su uso.
        </p>

        <h2 style={{ color: "var(--colorNeutralForeground1)", fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>3. Enlaces Externos</h2>
        <p style={{ marginBottom: 16 }}>
          Nuestra plataforma incluye enlaces a sitios web de terceros (plataformas del Estado como RENIEC, SUNAT, etc.). No tenemos control sobre el contenido o disponibilidad de dichos sitios, por lo que su uso está sujeto a los términos propios de cada plataforma.
        </p>

        <h2 style={{ color: "var(--colorNeutralForeground1)", fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>4. Uso del Asistente Virtual (IA)</h2>
        <p style={{ marginBottom: 16 }}>
          Nuestro asistente virtual "LOTA AI" funciona mediante inteligencia artificial para orientarle. Sus respuestas son sugerencias informativas y no sustituyen el consejo legal, contable o institucional oficial.
        </p>
      </div>
    </div>
  );
}

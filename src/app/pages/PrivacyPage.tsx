import React from "react";
import { ShieldRegular } from '@fluentui/react-icons';

export default function PrivacyPage() {
  return (
    <div style={{ padding: "clamp(20px, 5vw, 40px)", maxWidth: 800, margin: "0 auto", color: "var(--colorNeutralForeground2)", lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--colorBrandBackground2)", border: "1px solid var(--colorBrandStroke2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ShieldRegular fontSize={20} color="var(--colorBrandForeground1)" />
        </div>
        <h1 style={{ color: "var(--colorNeutralForeground1)", fontSize: 28, fontWeight: 700, margin: 0 }}>Política de Privacidad</h1>
      </div>
      
      <div style={{ background: "var(--colorNeutralBackground1)", border: "1px solid var(--colorNeutralStroke1)", borderRadius: 16, padding: "clamp(20px, 5vw, 32px)", boxShadow: "var(--elevation4)" }}>
        <p style={{ marginBottom: 16 }}>
          En <strong>ahorratiempo</strong>, respetamos su privacidad y nos comprometemos a proteger sus datos personales en estricto cumplimiento con la <strong>Ley de Protección de Datos Personales N° 29733</strong> de la República del Perú y su Reglamento (Decreto Supremo N° 003-2013-JUS).
        </p>
        
        <h2 style={{ color: "var(--colorNeutralForeground1)", fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>1. Información que recopilamos</h2>
        <p style={{ marginBottom: 16 }}>
          ahorratiempo recopila información mínima necesaria para mejorar su experiencia, incluyendo datos de navegación anónimos, cookies (previo consentimiento) y, en caso de que inicie sesión, su correo electrónico y nombre proporcionado por los servicios de autenticación de Google.
        </p>

        <h2 style={{ color: "var(--colorNeutralForeground1)", fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>2. Uso de la Información</h2>
        <p style={{ marginBottom: 16 }}>
          La información recopilada tiene como finalidad exclusiva:
          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
            <li style={{ marginBottom: 8 }}>Personalizar y guardar sus trámites favoritos (solo si ha iniciado sesión).</li>
            <li style={{ marginBottom: 8 }}>Analizar el tráfico de la web de forma anónima para optimizar la plataforma mediante herramientas como Google Analytics.</li>
            <li style={{ marginBottom: 8 }}>Mejorar nuestro asistente virtual (IA) sin vincular consultas a usuarios específicos.</li>
          </ul>
        </p>

        <h2 style={{ color: "var(--colorNeutralForeground1)", fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>3. Derechos ARCO</h2>
        <p style={{ marginBottom: 16 }}>
          De acuerdo con la legislación peruana, usted tiene el derecho de Acceso, Rectificación, Cancelación y Oposición (Derechos ARCO) respecto a sus datos personales. Puede ejercer estos derechos escribiéndonos a nuestro correo de soporte técnico.
        </p>

        <h2 style={{ color: "var(--colorNeutralForeground1)", fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>4. Consentimiento</h2>
        <p style={{ marginBottom: 16 }}>
          Al utilizar ahorratiempo, usted consiente el tratamiento de sus datos conforme a esta Política de Privacidad. Esta política puede ser actualizada, por lo que recomendamos su revisión periódica.
        </p>
      </div>
    </div>
  );
}

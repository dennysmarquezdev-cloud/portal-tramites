import React, { useState, useEffect } from "react";
import { DocumentTextRegular, ShieldRegular, InfoRegular, ChevronRightRegular, NavigationRegular, DismissRegular } from '@fluentui/react-icons';
import { motion, AnimatePresence } from "motion/react";

export default function LegalPage() {
  const [activeSection, setActiveSection] = useState("terminos");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: "terminos",
      title: "Terminos y Condiciones",
      icon: DocumentTextRegular,
      subItems: [
        { id: "terminos-1", label: "Naturaleza del Servicio" },
        { id: "terminos-2", label: "Exactitud de la Información" },
        { id: "terminos-3", label: "Enlaces Externos" },
        { id: "terminos-4", label: "Uso del Asistente Virtual (IA)" }
      ]
    },
    {
      id: "privacidad",
      title: "Poltica de Privacidad",
      icon: ShieldRegular,
      subItems: [
        { id: "privacidad-1", label: "Información que recopilamos" },
        { id: "privacidad-2", label: "Uso de la Información" },
        { id: "privacidad-3", label: "Derechos ARCO" },
        { id: "privacidad-4", label: "Consentimiento" }
      ]
    },
    {
      id: "cookies",
      title: "Poltica de Cookies",
      icon: InfoRegular,
      subItems: [
        { id: "cookies-1", label: "¿Qué son las cookies?" },
        { id: "cookies-2", label: "¿Cómo utilizamos las cookies?" },
        { id: "cookies-3", label: "Su Control sobre las Cookies" }
      ]
    }
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id.split('-')[0]);
      setMobileMenuOpen(false);
    }
  };

  const SidebarContent = () => (
    <>
      <div style={{ padding: "30px 24px", borderBottom: "1px solid var(--colorNeutralStroke1)" }}>
         <h1 style={{ color: "var(--colorNeutralForeground1)", fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>ahorratiempo Docs</h1>
         <p style={{ fontSize: 13, marginTop: 6, color: "var(--colorNeutralForeground3)", fontWeight: 500 }}>Centro Legal y Políticas</p>
      </div>
      
      <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
        {navItems.map(item => (
          <div key={item.id} style={{ marginBottom: 28 }}>
            <button 
              onClick={() => scrollTo(item.id)}
              style={{ background: "none", border: "none", width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 10, color: "var(--colorNeutralForeground1)", fontSize: 15, fontWeight: 700, padding: 0, cursor: "pointer", marginBottom: 14 }}
            >
              <item.icon fontSize={18} color="var(--colorBrandForeground1)" />
              {item.title}
            </button>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 28, borderLeft: "2px solid var(--colorNeutralStroke2)", marginLeft: 8 }}>
              {item.subItems.map(sub => (
                <button 
                  key={sub.id}
                  onClick={() => scrollTo(sub.id)}
                  style={{ background: "none", border: "none", textAlign: "left", color: "var(--colorNeutralForeground2)", fontSize: 13, padding: "2px 0", cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--colorBrandForeground1)"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--colorNeutralForeground2)"}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      <style>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.2); }
        .docs-sidebar { width: 300px; display: flex; flex-direction: column; flex-shrink: 0; background: var(--colorNeutralBackground2); border-right: 1px solid var(--colorNeutralStroke1); }
        .mobile-header { display: none; }
        @media (max-width: 800px) {
          .docs-sidebar { display: none; }
          .mobile-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; background: var(--colorNeutralBackground1); border-bottom: 1px solid var(--colorNeutralStroke1); }
          .docs-content-inner { padding: 40px 20px !important; }
        }
      `}</style>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "var(--colorNeutralBackground1)", color: "var(--colorNeutralForeground2)", fontFamily: "'Inter', sans-serif", overflow: "hidden" }}>
        
        {/* Mobile Header */}
        <div className="mobile-header">
          <div style={{ color: "var(--colorNeutralForeground1)", fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em" }}>ahorratiempo Docs</div>
          <button onClick={() => setMobileMenuOpen(true)} style={{ background: "none", border: "none", color: "var(--colorNeutralForeground1)", cursor: "pointer" }}>
            <NavigationRegular fontSize={24} />
          </button>
        </div>

        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Desktop Sidebar */}
          <div className="docs-sidebar">
            <SidebarContent />
          </div>

          {/* Mobile Sidebar Overlay */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex" }}>
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} onClick={() => setMobileMenuOpen(false)} />
                <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 25, stiffness: 250 }} style={{ position: "relative", width: "80%", maxWidth: 300, background: "var(--colorNeutralBackground2)", display: "flex", flexDirection: "column" }}>
                  <button onClick={() => setMobileMenuOpen(false)} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", color: "var(--colorNeutralForeground1)", cursor: "pointer" }}>
                    <DismissRegular fontSize={24} />
                  </button>
                  <SidebarContent />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content Center */}
          <div style={{ flex: 1, overflowY: "auto", scrollBehavior: "smooth" }} id="docs-content">
            <div className="docs-content-inner" style={{ maxWidth: 800, margin: "0 auto", padding: "80px 60px" }}>
              
              <div id="terminos" style={{ marginBottom: 80 }}>
                <h2 style={{ color: "var(--colorNeutralForeground1)", fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 800, marginBottom: 24, letterSpacing: "-0.02em" }}>Términos y Condiciones</h2>
                <p style={{ fontSize: 16, lineHeight: 1.8, marginBottom: 40 }}>
                  Bienvenido a <strong>ahorratiempo</strong>. Al acceder y utilizar esta plataforma, usted acepta los siguientes términos y condiciones. Por favor, léalos detenidamente.
                </p>
                
                <div id="terminos-1" style={{ marginBottom: 40, paddingTop: 20 }}>
                  <h3 style={{ color: "var(--colorNeutralForeground1)", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>1. Naturaleza del Servicio</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.8 }}>
                    ahorratiempo es una plataforma informativa privada e independiente. <strong>No somos una entidad gubernamental del Estado Peruano</strong>, ni estamos afiliados, asociados, o respaldados por ninguna institución pública. Nuestro propósito es facilitar información de acceso público sobre trámites estatales para ayudar a los ciudadanos.
                  </p>
                </div>
                
                <div id="terminos-2" style={{ marginBottom: 40, paddingTop: 20 }}>
                  <h3 style={{ color: "var(--colorNeutralForeground1)", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>2. Exactitud de la Información</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.8 }}>
                    Nos esforzamos por mantener la información de los trámites actualizada recopilando datos de fuentes oficiales (como gob.pe). Sin embargo, los requisitos, costos y tiempos pueden cambiar sin previo aviso por parte de las entidades oficiales. ahorratiempo no se responsabiliza por errores u omisiones ni por perjuicios derivados de su uso.
                  </p>
                </div>
                
                <div id="terminos-3" style={{ marginBottom: 40, paddingTop: 20 }}>
                  <h3 style={{ color: "var(--colorNeutralForeground1)", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>3. Enlaces Externos</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.8 }}>
                    Nuestra plataforma incluye enlaces a sitios web de terceros (plataformas del Estado como RENIEC, SUNAT, etc.). No tenemos control sobre el contenido o disponibilidad de dichos sitios, por lo que su uso está sujeto a los términos propios de cada plataforma.
                  </p>
                </div>
                
                <div id="terminos-4" style={{ marginBottom: 40, paddingTop: 20 }}>
                  <h3 style={{ color: "var(--colorNeutralForeground1)", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>4. Uso del Asistente Virtual (IA)</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.8 }}>
                    Nuestro asistente virtual "LOTA AI" funciona mediante inteligencia artificial para orientarle. Sus respuestas son sugerencias informativas y no sustituyen el consejo legal, contable o institucional oficial.
                  </p>
                </div>
              </div>
              
              <div style={{ width: "100%", height: 1, background: "var(--colorNeutralStroke1)", marginBottom: 80 }} />
              
              <div id="privacidad" style={{ marginBottom: 80 }}>
                <h2 style={{ color: "var(--colorNeutralForeground1)", fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 800, marginBottom: 24, letterSpacing: "-0.02em" }}>Política de Privacidad</h2>
                <p style={{ fontSize: 16, lineHeight: 1.8, marginBottom: 40 }}>
                  En <strong>ahorratiempo</strong>, respetamos su privacidad y nos comprometemos a proteger sus datos personales en estricto cumplimiento con la <strong>Ley de Protección de Datos Personales N° 29733</strong> de la República del Perú y su Reglamento (Decreto Supremo N° 003-2013-JUS).
                </p>
                
                <div id="privacidad-1" style={{ marginBottom: 40, paddingTop: 20 }}>
                  <h3 style={{ color: "var(--colorNeutralForeground1)", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>1. Información que recopilamos</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.8 }}>
                    ahorratiempo recopila información mínima necesaria para mejorar su experiencia, incluyendo datos de navegación anónimos, cookies (previo consentimiento) y, en caso de que inicie sesión, su correo electrónico y nombre proporcionado por los servicios de autenticación de Google.
                  </p>
                </div>
                
                <div id="privacidad-2" style={{ marginBottom: 40, paddingTop: 20 }}>
                  <h3 style={{ color: "var(--colorNeutralForeground1)", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>2. Uso de la Información</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.8 }}>La información recopilada tiene como finalidad exclusiva:</p>
                  <ul style={{ paddingLeft: 24, marginTop: 16, display: "flex", flexDirection: "column", gap: 12, fontSize: 15, lineHeight: 1.6 }}>
                    <li>Personalizar y guardar sus trámites favoritos (solo si ha iniciado sesión).</li>
                    <li>Analizar el tráfico de la web de forma anónima para optimizar la plataforma mediante herramientas como Google Analytics.</li>
                    <li>Mejorar nuestro asistente virtual (IA) sin vincular consultas a usuarios específicos.</li>
                  </ul>
                </div>
                
                <div id="privacidad-3" style={{ marginBottom: 40, paddingTop: 20 }}>
                  <h3 style={{ color: "var(--colorNeutralForeground1)", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>3. Derechos ARCO</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.8 }}>
                    De acuerdo con la legislación peruana, usted tiene el derecho de Acceso, Rectificación, Cancelación y Oposición (Derechos ARCO) respecto a sus datos personales. Puede ejercer estos derechos escribiéndonos a nuestro correo de soporte técnico.
                  </p>
                </div>
                
                <div id="privacidad-4" style={{ marginBottom: 40, paddingTop: 20 }}>
                  <h3 style={{ color: "var(--colorNeutralForeground1)", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>4. Consentimiento</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.8 }}>
                    Al utilizar ahorratiempo, usted consiente el tratamiento de sus datos conforme a esta Política de Privacidad. Esta política puede ser actualizada, por lo que recomendamos su revisión periódica.
                  </p>
                </div>
              </div>
              
              <div style={{ width: "100%", height: 1, background: "var(--colorNeutralStroke1)", marginBottom: 80 }} />
              
              <div id="cookies" style={{ marginBottom: 80 }}>
                <h2 style={{ color: "var(--colorNeutralForeground1)", fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 800, marginBottom: 24, letterSpacing: "-0.02em" }}>Política de Cookies</h2>
                <p style={{ fontSize: 16, lineHeight: 1.8, marginBottom: 40 }}>
                  Esta Política de Cookies explica qué son las cookies, cómo las utilizamos en <strong>ahorratiempo</strong> y cómo usted puede gestionarlas.
                </p>
                
                <div id="cookies-1" style={{ marginBottom: 40, paddingTop: 20 }}>
                  <h3 style={{ color: "var(--colorNeutralForeground1)", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>¿Qué son las cookies?</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.8 }}>
                    Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (computadora, tablet o móvil) cuando visita un sitio web. Ayudan a que el sitio web funcione de manera más eficiente y proporcionan información a los propietarios del sitio.
                  </p>
                </div>
                
                <div id="cookies-2" style={{ marginBottom: 40, paddingTop: 20 }}>
                  <h3 style={{ color: "var(--colorNeutralForeground1)", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>¿Cómo utilizamos las cookies?</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.8 }}>Utilizamos dos tipos principales de cookies:</p>
                  <ul style={{ paddingLeft: 24, marginTop: 16, display: "flex", flexDirection: "column", gap: 12, fontSize: 15, lineHeight: 1.6 }}>
                    <li><strong>Cookies estrictamente necesarias:</strong> Son esenciales para el funcionamiento básico de la página, como mantener su sesión iniciada o recordar sus preferencias de visualización (ej. trámites favoritos).</li>
                    <li><strong>Cookies de análisis (Google Analytics):</strong> Nos ayudan a entender cómo los usuarios interactúan con nuestro sitio web, midiendo el número de visitas, las páginas más consultadas y de dónde proviene nuestro tráfico. Esta información es anónima.</li>
                  </ul>
                </div>
                
                <div id="cookies-3" style={{ marginBottom: 40, paddingTop: 20 }}>
                  <h3 style={{ color: "var(--colorNeutralForeground1)", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Su Control sobre las Cookies</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.8 }}>
                    Usted tiene el derecho de aceptar o rechazar las cookies no esenciales (analíticas). Si decide no aceptar las cookies analíticas, el sitio seguirá funcionando normalmente, pero no podremos recopilar datos de rendimiento para mejorarlo. Podrá ajustar sus preferencias desde la barra de consentimiento inferior.
                  </p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}






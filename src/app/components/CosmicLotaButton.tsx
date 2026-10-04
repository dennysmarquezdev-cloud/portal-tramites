import React from "react";

interface CosmicLotaButtonProps {
  onClick: () => void;
  className?: string;
}

export function CosmicLotaButton({ onClick, className = "" }: CosmicLotaButtonProps) {
  return (
    <button 
      type="button"
      className={`lota-obsidian-star-btn ${className}`}
      onClick={onClick}
      aria-label="Consultar trámite con LOTA AI"
    >
      {/* ── Fondo de Universo Dinámico Suave y Equilibrado ── */}
      <div className="star-canvas" aria-hidden="true">
        {/* Base Espacial y Nebulosa Suave */}
        <div className="deep-space-base" />
        <div className="living-nebula nebula-cloud-1" />
        <div className="living-nebula nebula-cloud-2" />

        {/* Capa 1: Deriva Estelar Suave Infinita */}
        <div className="drifting-stars-track track-1">
          <svg className="starfield-svg" viewBox="0 0 760 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Tile A (0-380) */}
            <circle cx="20" cy="16" r="0.65" fill="#FFFFFF" opacity="0.65" />
            <circle cx="38" cy="38" r="0.5" fill="#93C5FD" opacity="0.55" />
            <circle cx="58" cy="14" r="0.7" fill="#FFFFFF" opacity="0.75" />
            <circle cx="78" cy="40" r="0.55" fill="#BAE6FD" opacity="0.6" />
            <circle cx="98" cy="12" r="0.6" fill="#FFFFFF" opacity="0.65" />
            <circle cx="118" cy="34" r="0.7" fill="#FFFFFF" opacity="0.8" />
            <circle cx="138" cy="44" r="0.5" fill="#93C5FD" opacity="0.5" />
            <circle cx="158" cy="16" r="0.65" fill="#FFFFFF" opacity="0.7" />
            <circle cx="178" cy="36" r="0.55" fill="#FFFFFF" opacity="0.6" />
            <circle cx="198" cy="14" r="0.75" fill="#E0F2FE" opacity="0.85" />
            <circle cx="218" cy="42" r="0.5" fill="#93C5FD" opacity="0.55" />
            <circle cx="238" cy="18" r="0.65" fill="#FFFFFF" opacity="0.75" />
            <circle cx="258" cy="46" r="0.55" fill="#FFFFFF" opacity="0.65" />
            <circle cx="278" cy="14" r="0.7" fill="#BAE6FD" opacity="0.8" />
            <circle cx="298" cy="36" r="0.5" fill="#FFFFFF" opacity="0.55" />
            <circle cx="318" cy="18" r="0.65" fill="#FFFFFF" opacity="0.7" />
            <circle cx="338" cy="40" r="0.5" fill="#93C5FD" opacity="0.5" />
            <circle cx="358" cy="14" r="0.7" fill="#FFFFFF" opacity="0.75" />

            {/* Tile B (380-760) Réplica para bucle sin fin */}
            <circle cx="400" cy="16" r="0.65" fill="#FFFFFF" opacity="0.65" />
            <circle cx="418" cy="38" r="0.5" fill="#93C5FD" opacity="0.55" />
            <circle cx="438" cy="14" r="0.7" fill="#FFFFFF" opacity="0.75" />
            <circle cx="458" cy="40" r="0.55" fill="#BAE6FD" opacity="0.6" />
            <circle cx="478" cy="12" r="0.6" fill="#FFFFFF" opacity="0.65" />
            <circle cx="498" cy="34" r="0.7" fill="#FFFFFF" opacity="0.8" />
            <circle cx="518" cy="44" r="0.5" fill="#93C5FD" opacity="0.5" />
            <circle cx="538" cy="16" r="0.65" fill="#FFFFFF" opacity="0.7" />
            <circle cx="558" cy="36" r="0.55" fill="#FFFFFF" opacity="0.6" />
            <circle cx="578" cy="14" r="0.75" fill="#E0F2FE" opacity="0.85" />
            <circle cx="598" cy="42" r="0.5" fill="#93C5FD" opacity="0.55" />
            <circle cx="618" cy="18" r="0.65" fill="#FFFFFF" opacity="0.75" />
            <circle cx="638" cy="46" r="0.55" fill="#FFFFFF" opacity="0.65" />
            <circle cx="658" cy="14" r="0.7" fill="#BAE6FD" opacity="0.8" />
            <circle cx="678" cy="36" r="0.5" fill="#FFFFFF" opacity="0.55" />
            <circle cx="698" cy="18" r="0.65" fill="#FFFFFF" opacity="0.7" />
            <circle cx="718" cy="40" r="0.5" fill="#93C5FD" opacity="0.5" />
            <circle cx="738" cy="14" r="0.7" fill="#FFFFFF" opacity="0.75" />
          </svg>
        </div>

        {/* Capa 2: Estrellas con Centelleo Suave Asíncrono */}
        <div className="drifting-stars-track track-2">
          <svg className="starfield-svg" viewBox="0 0 760 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="46" cy="24" r="0.8" fill="#E0F2FE" opacity="0.8" className="scintillate-a" />
            <circle cx="112" cy="18" r="0.85" fill="#FFFFFF" opacity="0.9" className="scintillate-b" />
            <circle cx="190" cy="32" r="0.75" fill="#BAE6FD" opacity="0.8" className="scintillate-c" />
            <circle cx="276" cy="22" r="0.9" fill="#FFFFFF" opacity="0.9" className="scintillate-d" />
            <circle cx="348" cy="34" r="0.8" fill="#38BDF8" opacity="0.8" className="scintillate-a" />

            {/* Tile B */}
            <circle cx="426" cy="24" r="0.8" fill="#E0F2FE" opacity="0.8" className="scintillate-a" />
            <circle cx="492" cy="18" r="0.85" fill="#FFFFFF" opacity="0.9" className="scintillate-b" />
            <circle cx="570" cy="32" r="0.75" fill="#BAE6FD" opacity="0.8" className="scintillate-c" />
            <circle cx="656" cy="22" r="0.9" fill="#FFFFFF" opacity="0.9" className="scintillate-d" />
            <circle cx="728" cy="34" r="0.8" fill="#38BDF8" opacity="0.8" className="scintillate-a" />
          </svg>
        </div>

        {/* Reflejo Perimetral Suave de Luz */}
        <div className="btn-ambient-sweep" />
      </div>

      {/* ── Micro-Reflejo Superior de Cristal ── */}
      <div className="btn-top-specular" aria-hidden="true" />

      {/* ── Contenido con Tipografía Proporcionada ── */}
      <div className="btn-content">
        <svg className="btn-sparkle" width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path d="M7.5 1v2M7.5 12v2M1 7.5h2M12 7.5h2M3.05 3.05l1.42 1.42M10.53 10.53l1.42 1.42M10.53 4.47l1.42-1.42M3.05 11.95l1.42-1.42" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span className="btn-text">Consultar trámite con LOTA AI</span>
        <svg className="btn-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7h8M8 4.5l3 2.5-3 2.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </button>
  );
}

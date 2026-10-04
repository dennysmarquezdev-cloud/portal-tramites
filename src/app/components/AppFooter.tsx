import React from "react";
import { Page } from "../types";
import { haptic } from "../utils/haptics";

interface AppFooterProps {
  onNavigate?: (page: Page) => void;
}

export function AppFooter({ onNavigate }: AppFooterProps) {
  return (
    <footer className="app-footer" aria-label="Pie de página">
      <span className="footer-copy">
        © 2026 ahorratiempo.pe — Todos los derechos reservados. Orientación cívica y trámites oficiales del Estado.
      </span>

      <div className="footer-links">
        <button 
          type="button" 
          className="footer-link"
          onClick={() => {
            haptic.selection();
            onNavigate?.("privacidad");
          }}
        >
          Privacidad
        </button>

        <button 
          type="button" 
          className="footer-link"
          onClick={() => {
            haptic.selection();
            onNavigate?.("terminos");
          }}
        >
          Términos
        </button>

        <button 
          type="button" 
          className="footer-link"
          onClick={() => {
            haptic.selection();
            onNavigate?.("cookies");
          }}
        >
          Cookies
        </button>

        <button 
          type="button" 
          className="footer-link"
          onClick={() => {
            haptic.selection();
            onNavigate?.("marketing-kit");
          }}
        >
          Marketing Kit
        </button>
      </div>
    </footer>
  );
}

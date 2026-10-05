import React from "react";

export interface DirectOfficialProcedure {
  title: string;
  description: string;
  url: string;
  isPopular?: boolean;
}

/**
 * Mapeo inteligente de URLs exactas a portales oficiales de tramitación del Estado peruano (.gob.pe)
 */
export function getOfficialProcedureDirectUrl(acronym: string, title: string, fallbackUrl?: string): string {
  const normTitle = (title || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normAcro = (acronym || "").toUpperCase().trim();

  // SUNARP
  if (normAcro === "SUNARP") {
    if (normTitle.includes("vehicular") || normTitle.includes("placa")) return "https://www.sunarp.gob.pe/ConsultaVehicular/";
    if (normTitle.includes("copia literal") || normTitle.includes("sprl") || normTitle.includes("certificado registral") || normTitle.includes("vigencia")) return "https://serviciosweb.sunarp.gob.pe/sprl/";
    if (normTitle.includes("alerta registral")) return "https://www.sunarp.gob.pe/alertaregistral/";
    if (normTitle.includes("conoce") || normTitle.includes("busqueda")) return "https://conoce-aqui.sunarp.gob.pe/conoce-aqui/inicio";
    return "https://www.gob.pe/sunarp";
  }

  // RENIEC
  if (normAcro === "RENIEC") {
    if (normTitle.includes("renovacion") || normTitle.includes("caducidad") || normTitle.includes("dnie") || normTitle.includes("azul")) return "https://www.reniec.gob.pe/portal/masServiciosLinea.htm";
    if (normTitle.includes("duplicado")) return "https://apps.reniec.gob.pe/duplicado/";
    if (normTitle.includes("acta") || normTitle.includes("partida") || normTitle.includes("nacimiento") || normTitle.includes("matrimonio") || normTitle.includes("defuncion")) return "https://apps.reniec.gob.pe/actasConsulta/";
    if (normTitle.includes("c4") || normTitle.includes("inscripcion")) return "https://apps.reniec.gob.pe/certc4/";
    if (normTitle.includes("estado") || normTitle.includes("consulta")) return "https://serviciosportal.reniec.gob.pe/cetdnip/";
    return "https://www.reniec.gob.pe/portal/masServiciosLinea.htm";
  }

  // SUNAT
  if (normAcro === "SUNAT") {
    if (normTitle.includes("ruc") || normTitle.includes("inscripcion")) return "https://ww1.sunat.gob.pe/ol-ti-itinsruc/inscripcion/index.htm";
    if (normTitle.includes("clave sol")) return "https://ww1.sunat.gob.pe/ol-ti-itclave/ol-ti-itclave.htm";
    if (normTitle.includes("honorarios") || normTitle.includes("recibo") || normTitle.includes("comprobante")) return "https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/jrcS00Alias";
    if (normTitle.includes("1609") || normTitle.includes("arancel") || normTitle.includes("tasa")) return "https://pagosunat.sunat.gob.pe/";
    if (normTitle.includes("renta") || normTitle.includes("declaracion")) return "https://renta.sunat.gob.pe/";
    return "https://www.sunat.gob.pe/";
  }

  // MIGRACIONES
  if (normAcro === "MIGRACIONES") {
    if (normTitle.includes("pasaporte") || normTitle.includes("cita")) return "https://citaspasaporte.migraciones.gob.pe/";
    if (normTitle.includes("movimiento") || normTitle.includes("salidas") || normTitle.includes("entradas")) return "https://agenciavirtual.migraciones.gob.pe/agencia-virtual/identidad";
    if (normTitle.includes("permanencia") || normTitle.includes("residencia") || normTitle.includes("extranjero")) return "https://agenciavirtual.migraciones.gob.pe/";
    return "https://agenciavirtual.migraciones.gob.pe/";
  }

  // BANCO DE LA NACIÓN
  if (normAcro === "BN" || normAcro.includes("BANCO")) {
    if (normTitle.includes("pagalo") || normTitle.includes("tasa") || normTitle.includes("arancel")) return "https://pagalo.pe/";
    if (normTitle.includes("cuenta dni")) return "https://www.cuentadni.pe/";
    return "https://pagalo.pe/";
  }

  // SBS
  if (normAcro === "SBS") {
    if (normTitle.includes("deuda") || normTitle.includes("crediticia") || normTitle.includes("central")) return "https://servicios.sbs.gob.pe/reportedeudas/";
    if (normTitle.includes("afp") || normTitle.includes("afiliacion")) return "https://servicios.sbs.gob.pe/afiliados/";
    return "https://servicios.sbs.gob.pe/reportedeudas/";
  }

  // ESSALUD
  if (normAcro === "ESSALUD") {
    if (normTitle.includes("acreditacion") || normTitle.includes("vigencia") || normTitle.includes("atiendo") || normTitle.includes("centro")) return "https://ww4.essalud.gob.pe:7777/acredita/";
    if (normTitle.includes("lactancia") || normTitle.includes("maternidad") || normTitle.includes("subsidio")) return "https://viva.essalud.gob.pe/";
    return "https://ww4.essalud.gob.pe:7777/acredita/";
  }

  // SIS
  if (normAcro === "SIS") {
    if (normTitle.includes("asegurado") || normTitle.includes("consulta")) return "http://app.sis.gob.pe/SisConsultaEnLinea/Consulta/frmConsultaEnLinea.aspx";
    if (normTitle.includes("afiliacion") || normTitle.includes("gratuito")) return "https://afiliacion.sis.gob.pe/";
    return "https://www.gob.pe/sis";
  }

  // MINSA / DIGEMID
  if (normAcro === "MINSA" || normAcro === "DIGEMID") {
    if (normTitle.includes("vacunacion") || normTitle.includes("carne") || normTitle.includes("dosis")) return "https://carnetvacunacion.minsa.gob.pe/";
    if (normTitle.includes("precio") || normTitle.includes("medicamento") || normTitle.includes("observatorio")) return "https://observatorio.digemid.minsa.gob.pe/";
    return "https://carnetvacunacion.minsa.gob.pe/";
  }

  // ONP
  if (normAcro === "ONP") {
    return "https://onpvirtual.pe/";
  }

  // SUNAFIL
  if (normAcro === "SUNAFIL") {
    if (normTitle.includes("denuncia") || normTitle.includes("laboral")) return "https://aplicacionesweb5.sunafil.gob.pe/si.denunciasVirtuales/";
    if (normTitle.includes("planilla") || normTitle.includes("chamba")) return "https://aplicacionesweb6.sunafil.gob.pe/si.verificacionPlanilla/";
    return "https://www.gob.pe/sunafil";
  }

  // MTPE
  if (normAcro === "MTPE") {
    if (normTitle.includes("cul") || normTitle.includes("certificado unico") || normTitle.includes("certijoven") || normTitle.includes("certiadulto")) return "https://www.empleosperu.gob.pe/CertificadoUnicoLaboral/";
    return "https://www.empleosperu.gob.pe/";
  }

  // AFP
  if (normAcro === "AFP") {
    return "https://www.asociacionafp.pe/";
  }

  // MTC
  if (normAcro === "MTC") {
    if (normTitle.includes("licencia") || normTitle.includes("brevete") || normTitle.includes("revalidacion")) return "https://licencias.mtc.gob.pe/";
    if (normTitle.includes("record") || normTitle.includes("puntos") || normTitle.includes("papeleta")) return "https://recordconductor.mtc.gob.pe/";
    return "https://licencias.mtc.gob.pe/";
  }

  // SUTRAN
  if (normAcro === "SUTRAN") {
    return "https://www.sutran.gob.pe/";
  }

  // SAT LIMA
  if (normAcro.includes("SAT")) {
    return "https://www.sat.gob.pe/";
  }

  // ATU
  if (normAcro === "ATU") {
    if (normTitle.includes("tuc") || normTitle.includes("circulacion") || normTitle.includes("taxi")) return "https://sistemas.atu.gob.pe/consultatuc/";
    return "https://sistemas.atu.gob.pe/";
  }

  // SUNEDU
  if (normAcro === "SUNEDU") {
    return "https://enlinea.sunedu.gob.pe/";
  }

  // MINEDU
  if (normAcro === "MINEDU") {
    if (normTitle.includes("certificado") || normTitle.includes("estudios")) return "https://certificado.minedu.gob.pe/";
    return "https://certificado.minedu.gob.pe/";
  }

  // PRONABEC
  if (normAcro === "PRONABEC") {
    return "https://www.pronabec.gob.pe/beca-18/";
  }

  // INDECOPI
  if (normAcro === "INDECOPI") {
    if (normTitle.includes("reclama") || normTitle.includes("queja") || normTitle.includes("consumo")) return "https://enlinea.indecopi.gob.pe/reclamavirtual/";
    if (normTitle.includes("marca") || normTitle.includes("patente")) return "https://servicios.indecopi.gob.pe/";
    return "https://enlinea.indecopi.gob.pe/reclamavirtual/";
  }

  // OSIPTEL
  if (normAcro === "OSIPTEL") {
    if (normTitle.includes("imei") || normTitle.includes("robado") || normTitle.includes("celular")) return "https://www.osiptel.gob.pe/checatuimei/";
    return "https://www.osiptel.gob.pe/checatuimei/";
  }

  // OSINERGMIN
  if (normAcro === "OSINERGMIN") {
    return "https://www.facilito.gob.pe/";
  }

  // SEDAPAL
  if (normAcro === "SEDAPAL") {
    return "https://aquanet.sedapal.com.pe/";
  }

  // PODER JUDICIAL
  if (normAcro.includes("PODER JUDICIAL") || normAcro === "PJ") {
    if (normTitle.includes("penales") || normTitle.includes("cape") || normTitle.includes("antecedentes")) return "https://cape.pj.gob.pe/cape/pages/terminos-uso.xhtml";
    if (normTitle.includes("expedientes") || normTitle.includes("cej") || normTitle.includes("casos")) return "https://cej.pj.gob.pe/cej/";
    return "https://cape.pj.gob.pe/cape/pages/terminos-uso.xhtml";
  }

  // PNP
  if (normAcro === "PNP") {
    if (normTitle.includes("policiales") || normTitle.includes("cerap") || normTitle.includes("antecedentes")) return "https://sistemas.policia.gob.pe/cerapdigital/";
    if (normTitle.includes("denuncia") || normTitle.includes("perdida") || normTitle.includes("extravio")) return "https://sistemas.policia.gob.pe/denunciadigital/";
    return "https://sistemas.policia.gob.pe/cerapdigital/";
  }

  // INPE
  if (normAcro === "INPE") {
    return "https://antjudiciales.inpe.gob.pe/";
  }

  // ONPE
  if (normAcro === "ONPE") {
    return "https://consultaelectoral.onpe.gob.pe/";
  }

  // SUCAMEC
  if (normAcro === "SUCAMEC") {
    return "https://sucamecenlinea.sucamec.gob.pe/";
  }

  if (fallbackUrl && fallbackUrl.startsWith("http")) {
    return fallbackUrl;
  }

  return "https://www.gob.pe/";
}

/**
 * Genera el icono monocromático estilo ChatGPT en trazo vectorial limpio (stroke fino, color currentColor).
 */
export function getTramiteChatGPTIcon(title: string, acronym?: string): React.ReactNode {
  const normTitle = (title || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normAcro = (acronym || "").toUpperCase().trim();

  // 1. Vehicular / Autos / Placas / Brevete / MTC / SUTRAN / SAT / ATU
  if (
    normTitle.includes("vehicul") ||
    normTitle.includes("placa") ||
    normTitle.includes("conduc") ||
    normTitle.includes("brevete") ||
    normTitle.includes("papeleta") ||
    normTitle.includes("circulacion") ||
    normTitle.includes("tuc") ||
    normAcro === "MTC" ||
    normAcro === "SUTRAN" ||
    normAcro === "ATU"
  ) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M5 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0" />
        <path d="M7 7l2-4h6l2 4" />
      </svg>
    );
  }

  // 2. DNI / Identidad / C4 / Actas / RENIEC
  if (
    normTitle.includes("dni") ||
    normTitle.includes("identidad") ||
    normTitle.includes("c4") ||
    normTitle.includes("acta") ||
    normTitle.includes("partida") ||
    normTitle.includes("nacimiento") ||
    normTitle.includes("matrimonio") ||
    normTitle.includes("defuncion") ||
    normTitle.includes("duplicado") ||
    normAcro === "RENIEC"
  ) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <circle cx="9" cy="10" r="2" />
        <path d="M15 8h2M15 12h2M7 16h10" />
      </svg>
    );
  }

  // 3. Tributos / RUC / Clave SOL / Recibos / SUNAT / Renta / Comprobante
  if (
    normTitle.includes("ruc") ||
    normTitle.includes("clave sol") ||
    normTitle.includes("tribut") ||
    normTitle.includes("honorario") ||
    normTitle.includes("recibo") ||
    normTitle.includes("renta") ||
    normTitle.includes("factura") ||
    normTitle.includes("1609") ||
    normAcro === "SUNAT"
  ) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 2v20l3-1.5 3 1.5 3-1.5 3 1.5 3-1.5 3 1.5V2l-3 1.5-3-1.5-3 1.5-3-1.5-3 1.5L4 2z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
    );
  }

  // 4. Pasaporte / Viajes / Residencia / MIGRACIONES
  if (
    normTitle.includes("pasaporte") ||
    normTitle.includes("migratorio") ||
    normTitle.includes("permanencia") ||
    normTitle.includes("extranjer") ||
    normTitle.includes("viaje") ||
    normAcro === "MIGRACIONES"
  ) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <circle cx="12" cy="11" r="3.5" />
        <path d="M12 7.5v7M8.5 11h7" />
      </svg>
    );
  }

  // 5. Salud / Seguros / ESSALUD / SIS / MINSA / DIGEMID / Vacunas
  if (
    normTitle.includes("salud") ||
    normTitle.includes("seguro") ||
    normTitle.includes("acreditacion") ||
    normTitle.includes("vacun") ||
    normTitle.includes("medico") ||
    normTitle.includes("medicamento") ||
    normTitle.includes("carne de vacunacion") ||
    normAcro === "ESSALUD" ||
    normAcro === "SIS" ||
    normAcro === "MINSA" ||
    normAcro === "DIGEMID" ||
    normAcro === "SUSALUD"
  ) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    );
  }

  // 6. Inmuebles / Predios / Partidas / Copia Literal / Propiedad / SUNARP
  if (
    normTitle.includes("inmueble") ||
    normTitle.includes("predio") ||
    normTitle.includes("propiedad") ||
    normTitle.includes("copia literal") ||
    normTitle.includes("sprl") ||
    normTitle.includes("alerta registral") ||
    normTitle.includes("vigencia de poder") ||
    normAcro === "SUNARP"
  ) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 10h1M9 14h1M14 10h1M14 14h1M9 21v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
      </svg>
    );
  }

  // 7. Banco / Pagos / Tasas / Deudas / BN / Pagalo.pe / SBS / SMV
  if (
    normTitle.includes("pagalo") ||
    normTitle.includes("tasa") ||
    normTitle.includes("cuenta dni") ||
    normTitle.includes("deuda") ||
    normTitle.includes("credit") ||
    normTitle.includes("banco") ||
    normAcro === "BN" ||
    normAcro === "SBS" ||
    normAcro === "SMV"
  ) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
        <path d="M16 14h2" />
      </svg>
    );
  }

  // 8. Educación / Grados / Títulos / Becas / SUNEDU / MINEDU / PRONABEC
  if (
    normTitle.includes("grado") ||
    normTitle.includes("titulo") ||
    normTitle.includes("estudio") ||
    normTitle.includes("escolar") ||
    normTitle.includes("beca") ||
    normAcro === "SUNEDU" ||
    normAcro === "MINEDU" ||
    normAcro === "PRONABEC" ||
    normAcro === "SINEACE"
  ) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
      </svg>
    );
  }

  // 9. Antecedentes / Legal / Penal / Policial / Judicial / PNP / PJ / INPE / MPFN
  if (
    normTitle.includes("antecedente") ||
    normTitle.includes("penal") ||
    normTitle.includes("policial") ||
    normTitle.includes("judicial") ||
    normTitle.includes("expediente") ||
    normTitle.includes("cej") ||
    normTitle.includes("cerap") ||
    normTitle.includes("cape") ||
    normAcro.includes("PODER JUDICIAL") ||
    normAcro === "PJ" ||
    normAcro === "PNP" ||
    normAcro === "INPE" ||
    normAcro === "MPFN" ||
    normAcro === "MINJUSDH"
  ) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m14 13-7.5 7.5a2.12 2.12 0 0 1-3-3L11 10" />
        <path d="m16 16 6-6a2 2 0 0 0 0-2.83l-3.17-3.17a2 2 0 0 0-2.83 0L10 10" />
        <path d="m8 8 3-3" />
        <path d="m2 22 4-4" />
      </svg>
    );
  }

  // 10. Empleo / Trabajo / Pensiones / ONP / AFP / Planilla / CUL
  if (
    normTitle.includes("pension") ||
    normTitle.includes("jubilacion") ||
    normTitle.includes("aporte") ||
    normTitle.includes("empleo") ||
    normTitle.includes("trabajo") ||
    normTitle.includes("planilla") ||
    normTitle.includes("cul") ||
    normTitle.includes("laboral") ||
    normAcro === "ONP" ||
    normAcro === "SUNAFIL" ||
    normAcro === "MTPE" ||
    normAcro === "AFP"
  ) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <path d="M12 12v.01" />
      </svg>
    );
  }

  // 11. Reclamos / IMEI / Consumo / INDECOPI / OSIPTEL / OSINERGMIN / SEDAPAL
  if (
    normTitle.includes("reclamo") ||
    normTitle.includes("imei") ||
    normTitle.includes("facilito") ||
    normTitle.includes("gas") ||
    normTitle.includes("agua") ||
    normTitle.includes("suministro") ||
    normAcro === "INDECOPI" ||
    normAcro === "OSIPTEL" ||
    normAcro === "OSINERGMIN" ||
    normAcro === "SUNASS" ||
    normAcro === "SEDAPAL"
  ) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    );
  }

  // 12. Electoral / Votos / ONPE / JNE
  if (
    normTitle.includes("voto") ||
    normTitle.includes("electoral") ||
    normTitle.includes("mesa") ||
    normAcro === "ONPE" ||
    normAcro === "JNE"
  ) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 12 2 2 4-4" />
        <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7z" />
      </svg>
    );
  }

  // Default: Archivo / Guía oficial
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

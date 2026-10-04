import { db } from "../firebase";
import { setDoc, doc, getDocs, collection, deleteDoc, serverTimestamp } from "firebase/firestore";

const officialCats = [
  { id: "ayuda-social", name: "Ayuda social", description: "Consultas e inscripciones a programas y bonos.", colorA: "#0c4a6e", colorB: "#0ea5e9", orden: 1 },
  { id: "conducir", name: "Conducir", description: "Brevete, identificación vehicular y multas.", colorA: "#1e3a8a", colorB: "#3b82f6", orden: 2 },
  { id: "denunciar-o-reclamar", name: "Denunciar o reclamar", description: "Daños contra personas, patrimonio, animales y medio ambiente.", colorA: "#7f1d1d", colorB: "#ef4444", orden: 3 },
  { id: "educacion", name: "Educación", description: "Matrícula, certificados, becas y cursos.", colorA: "#064e3b", colorB: "#34d399", orden: 4 },
  { id: "emprender", name: "Emprender", description: "Iniciar un negocio, contratar con el Estado e impuestos.", colorA: "#3730a3", colorB: "#f59e0b", orden: 5 },
  { id: "familia", name: "Familia", description: "Matrimonio, maternidad y denuncias.", colorA: "#701a75", colorB: "#e879f9", orden: 6 },
  { id: "identificacion-ciudadana", name: "Identificación ciudadana", description: "DNI, partidas y firma digital.", colorA: "#0f172a", colorB: "#00b4d8", orden: 7 },
  { id: "informacion-de-entidades", name: "Información de entidades públicas", description: "Información pública y transparencia.", colorA: "#1e1b4b", colorB: "#8b5cf6", orden: 8 },
  { id: "salud", name: "Salud", description: "Atención médica y seguros de salud.", colorA: "#111827", colorB: "#10b981", orden: 9 },
  { id: "trabajo", name: "Trabajo", description: "Convocatorias públicas, recibos y derechos laborales.", colorA: "#3f3f46", colorB: "#6366f1", orden: 10 },
  { id: "viajar-a-otro-pais", name: "Viajar a otro país", description: "Pasaporte, documentación y requisitos.", colorA: "#14532d", colorB: "#84cc16", orden: 11 },
  { id: "vivienda-y-construccion", name: "Vivienda y construcción", description: "Servicios básicos y trámites municipales.", colorA: "#4a044e", colorB: "#d946ef", orden: 12 },
  { id: "vivir-en-el-peru", name: "Vivir en el Perú como extranjero", description: "Carnés, residencia y permisos.", colorA: "#1e1b4b", colorB: "#ef4444", orden: 13 }
];

const top20Procedures = [
  { title: "Emitir recibo por honorarios electrónico", url: "https://ww1.sunat.gob.pe/ol-ti-itrheopciones/RHESunat.htm", cat: "emprender" },
  { title: "Consultar estado de tu trámite para la entrega de tu DNI", url: "https://serviciosportal.reniec.gob.pe/cetdnipi/inicio.htm", cat: "identificacion-ciudadana" },
  { title: "Verificar si estás afiliado al SIS", url: "https://cel.sis.gob.pe/SisConsultaEnLinea", cat: "salud" },
  { title: "Consultar los datos de un vehículo - Consulta Vehicular", url: "https://consultavehicular.sunarp.gob.pe/", cat: "conducir" },
  { title: "Obtener tu Certificado Único Laboral (CUL)", url: "https://www.empleosperu.gob.pe/CertificadoUnicoLaboral/", cat: "trabajo" },
  { title: "Consultar el estado del RUC", url: "https://e-consultaruc.sunat.gob.pe/", cat: "emprender" },
  { title: "Emitir factura electrónica - Sistema de Emisión Electrónica", url: "https://ww1.sunat.gob.pe/ol-ti-itfesimpopciones/FESimpSunat.htm", cat: "emprender" },
  { title: "Imprimir constancia de inscripción en el RNP", url: "https://www.rnp.gob.pe/constancia/rnp_constancia/validacertificadotodos.asp", cat: "emprender" },
  { title: "Antecedentes Penales", url: "https://cape.pj.gob.pe/cape/", cat: "denunciar-o-reclamar" },
  { title: "Solicitar copia certificada de acta o partida en Reniec", url: "https://apps.reniec.gob.pe/actascertificadas", cat: "identificacion-ciudadana" },
  { title: "Acceder a la oficina virtual de Sedapal Aquanet", url: "https://www.gob.pe/institucion/sedapal/tramites-y-servicios", cat: "informacion-de-entidades" },
  { title: "Obtener ficha RUC electrónica", url: "https://orientacion.sunat.gob.pe/sites/default/files/inline-files/ficha_ruc_0.pdf", cat: "emprender" },
  { title: "Consultar si tu seguro EsSalud está activo", url: "https://dondemeatiendo.essalud.gob.pe/", cat: "salud" },
  { title: "Conocer cuántas líneas celulares tienes a tu nombre - Checa", url: "https://checatuslineas.osiptel.gob.pe/", cat: "informacion-de-entidades" },
  { title: "Buscar procedimientos de selección de entidades públicas", url: "https://prodapp2.seace.gob.pe/seacebus-uiwd-pub/buscadorPublico/buscadorPublico.xhtml", cat: "informacion-de-entidades" },
  { title: "Solicitar la suspensión de retenciones de cuarta categoría", url: "https://www.sunat.gob.pe/accesosDirectos/suspensionCuarta.html", cat: "emprender" },
  { title: "Obtener Certificado de Antecedentes Policiales para uso nacional", url: "https://www.gob.pe/324-certificado-de-antecedentes-policiales-para-viaje-o-uso-en-el-extranjero", cat: "identificacion-ciudadana" },
  { title: "Obtener pasaporte electrónico para mayores de edad", url: "https://www.gob.pe/208-obtener-pasaporte-electronico-para-menores-de-edad", cat: "viajar-a-otro-pais" },
  { title: "Solicitar Certificado de Inscripción (C4)", url: "https://apps.reniec.gob.pe/certins", cat: "identificacion-ciudadana" },
  { title: "Solicitar duplicado de DNI azul, DNIe y DNI de menor", url: "https://identidad.reniec.gob.pe/preguntas-frecuentes-dni", cat: "identificacion-ciudadana" }
];

export const seedCategories = async () => {
  try {
    // 1. Fetch and delete old categories
    const catSnap = await getDocs(collection(db, "categorias"));
    for (const d of catSnap.docs) {
      await deleteDoc(doc(db, "categorias", d.id));
    }

    // 2. Insert official categories
    for (const cat of officialCats) {
      await setDoc(doc(db, "categorias", cat.id), {
        ...cat,
        active: true,
        count: 0,
        logos: []
      });
    }

    // 3. Migrate existing tramites to match new category IDs
    const tramitesSnap = await getDocs(collection(db, "tramites"));
    for (const tDoc of tramitesSnap.docs) {
      const tData = tDoc.data();
      const oldTheme = tData.theme || tData.category || "";
      
      // Auto-map based on slug logic
      const slugified = oldTheme.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
      let newThemeId = slugified;

      // Manual corrections for matching
      if (slugified === "identidad") newThemeId = "identificacion-ciudadana";
      if (slugified === "pensiones") newThemeId = "trabajo"; 
      if (slugified === "tributos" || slugified === "produccion") newThemeId = "emprender";
      if (slugified === "telecom") newThemeId = "conducir"; // Just for mapping old to new
      if (slugified === "migraciones") newThemeId = "viajar-a-otro-pais";
      if (slugified === "justicia") newThemeId = "denunciar-o-reclamar";
      if (slugified === "vivir-en-el-peru-como-extranjero" || tData.entity === "Vivir en el Perú como extranjero") {
        newThemeId = "vivir-en-el-peru";
      }

      // Verify if the newThemeId exists in official cats, else fallback to 'informacion-de-entidades'
      if (!officialCats.find(c => c.id === newThemeId)) {
        newThemeId = "informacion-de-entidades";
      }

      await setDoc(doc(db, "tramites", tDoc.id), { theme: newThemeId }, { merge: true });
    }

    console.log("Migración de categorías y trámites completada con éxito!");
  } catch (err) {
    console.error("Error en migración", err);
  }
};

import { CIVIC_ENTITIES } from "./civicEntities";

export interface DirectProcedureItem {
  id: string;
  title: string;
  url: string;
  actionUrl?: string;
  category?: string;
  costo?: string;
  imageUrl?: string;
  bannerUrl?: string;
}

/**
 * Catálogo completo de trámites directos oficiales agrupados por entidad y subcategoría.
 * Flujo oficial: Subcategoría -> Título del trámite -> Clic -> Plataforma oficial o guía exacta de Gob.pe
 * Enriquecido con imágenes de campañas oficiales y URLs verificadas del Estado Peruano.
 */
export const OFFICIAL_PROCEDURES_BY_ENTITY: Record<string, DirectProcedureItem[]> = {
  "SUNAT": [
    {
      "id": "sunat-inscribir-ruc-digital",
      "title": "Inscribirse en el RUC con DNI por Internet",
      "url": "https://www.gob.pe/99-inscribirse-en-el-ruc",
      "actionUrl": "https://ww1.sunat.gob.pe/ol-ti-itinsruc/inscripcion/index.htm",
      "category": "RUC y Clave SOL",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-consulta-ruc",
      "title": "Consulta RUC Oficial (Personas y Empresas)",
      "url": "https://www.gob.pe/565-consultar-ruc",
      "actionUrl": "https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp",
      "category": "RUC y Clave SOL",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-obtener-clave-sol",
      "title": "Obtener Clave SOL por Internet",
      "url": "https://www.gob.pe/278-obtener-clave-sol",
      "actionUrl": "https://ww1.sunat.gob.pe/ol-ti-itclave/ol-ti-itclave.htm",
      "category": "RUC y Clave SOL",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-recuperar-clave-sol",
      "title": "Recuperar la Clave SOL Virtual",
      "url": "https://www.gob.pe/7550-recuperar-la-clave-sol",
      "actionUrl": "https://ww1.sunat.gob.pe/ol-ti-itclave/ol-ti-itclave.htm",
      "category": "RUC y Clave SOL",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-ficha-ruc",
      "title": "Obtener Ficha RUC Electrónica Certificada",
      "url": "https://www.gob.pe/281-obtener-ficha-ruc-electronica",
      "actionUrl": "https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm",
      "category": "RUC y Clave SOL",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-modificar-ruc",
      "title": "Modificar Datos de tu RUC y Domicilio Fiscal",
      "url": "https://www.gob.pe/283-modificar-datos-de-tu-ruc",
      "actionUrl": "https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm",
      "category": "RUC y Clave SOL",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-suspension-reinicio",
      "title": "Suspender o Reiniciar Actividades del RUC",
      "url": "https://www.gob.pe/286-suspender-o-reiniciar-actividades-del-ruc",
      "actionUrl": "https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm",
      "category": "RUC y Clave SOL",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-baja-ruc",
      "title": "Dar de Baja a tu RUC",
      "url": "https://www.gob.pe/288-dar-de-baja-a-tu-ruc",
      "actionUrl": "https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm",
      "category": "RUC y Clave SOL",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-recibos-honorarios",
      "title": "Emitir Recibo por Honorarios Electrónico (RHE)",
      "url": "https://www.gob.pe/1101-emitir-recibo-por-honorarios-electronico",
      "actionUrl": "https://www.sunat.gob.pe/ol-ti-itrheopciones/RHESunat.htm",
      "category": "Comprobantes de Pago",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-consulta-rhe",
      "title": "Consultar Información de Recibos por Honorarios y Notas de Crédito",
      "url": "https://www.gob.pe/7986-consultar-informacion-de-mis-recibos-por-honorarios-y-notas-de-credito",
      "actionUrl": "https://www.sunat.gob.pe/ol-ti-itrheconsemisor/consemisor.do",
      "category": "Comprobantes de Pago",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-suspension-cuarta",
      "title": "Solicitar Suspensión de Retenciones de 4ta Categoría (Formulario 1609)",
      "url": "https://www.gob.pe/8017-solicitar-la-suspension-de-retenciones-de-cuarta-categoria-formulario-n-1609",
      "actionUrl": "https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm",
      "category": "Comprobantes de Pago",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-factura-boleta",
      "title": "Emitir Factura Electrónica y Boleta de Venta desde SOL",
      "url": "https://www.gob.pe/1103-emitir-factura-electronica-en-sunat-operaciones-en-linea",
      "actionUrl": "https://www.sunat.gob.pe/ol-ti-itfesimpopciones/FESimpSunat.htm",
      "category": "Comprobantes de Pago",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-gre",
      "title": "Emitir Guía de Remisión Electrónica (GRE) - SOL",
      "url": "https://www.gob.pe/30114-emitir-guia-de-remision-electronica-gre-sol",
      "actionUrl": "https://www.sunat.gob.pe/ol-ti-itgreopciones/GRESunat.htm",
      "category": "Comprobantes de Pago",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-consulta-facturas-notas",
      "title": "Consultar Facturas y Notas Electrónicas Emitidas",
      "url": "https://www.gob.pe/7476-consultar-facturas-y-notas-electronicas",
      "actionUrl": "https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm",
      "category": "Comprobantes de Pago",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-declara-facil",
      "title": "Declarar y Pagar Tributos Mensuales (Declara Fácil Formulario 621)",
      "url": "https://www.gob.pe/1105-declarar-y-pagar-tributos-mensuales-a-la-sunat",
      "actionUrl": "https://declarafacil.sunat.gob.pe/",
      "category": "Declaraciones y Tributos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-plame",
      "title": "Instalar y Acceder al PDT Planilla Electrónica PLAME",
      "url": "https://www.gob.pe/13972-instalar-y-acceder-al-pdt-planilla-electronica-plame",
      "actionUrl": "http://www.sunat.gob.pe/pdt/pdtdown/independientes/independientes.htm",
      "category": "Declaraciones y Tributos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-pago-varios-1662",
      "title": "Pagar Tributos o Multas con Guía de Pago Fácil (Formulario 1662)",
      "url": "https://www.gob.pe/681-pagar-tributos-o-multas-con-guia-de-pago-facil-formulario-1662",
      "actionUrl": "https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm",
      "category": "Declaraciones y Tributos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-consulta-declaraciones-pagos",
      "title": "Consultar Declaraciones Presentadas y Pagos a SUNAT",
      "url": "https://www.gob.pe/684-consultar-declaraciones-y-pagos-a-sunat",
      "actionUrl": "https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm",
      "category": "Declaraciones y Tributos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-deuda-tributaria",
      "title": "Consultar Reporte de Pagos Pendientes y Deuda en SUNAT",
      "url": "https://www.gob.pe/683-consultar-reporte-de-pagos-pendientes-en-sunat",
      "actionUrl": "https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm",
      "category": "Deuda y Devoluciones",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-fraccionamiento",
      "title": "Fraccionamiento y Aplazamiento Tributario (Artículo 36)",
      "url": "https://www.gob.pe/8010-fraccionamiento-y-aplazamiento-tributario-articulo-36",
      "actionUrl": "https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm",
      "category": "Deuda y Devoluciones",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-devolucion-exceso",
      "title": "Solicitar Devolución de Impuestos Pagados en Exceso (Formulario 4949 / 1649)",
      "url": "https://www.gob.pe/8250-solicitar-devolucion-de-impuestos-pagados-en-exceso-para-negocios",
      "actionUrl": "https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm",
      "category": "Deuda y Devoluciones",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-devolucion-oficio",
      "title": "Devolución de Oficio del Impuesto a la Renta de 4ta y 5ta Categoría",
      "url": "https://www.gob.pe/1203-devolucion-de-oficio-del-impuesto-a-la-renta-de-cuarta-y-quinta-categoria",
      "actionUrl": "https://ww1.sunat.gob.pe/ol-ti-itdevolucion-consultalibre/ConsultarDevolucionOficio.htm",
      "category": "Deuda y Devoluciones",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-expedientes-coactivos",
      "title": "Acceder a tu Expediente Electrónico de Cobranza Coactiva",
      "url": "https://www.gob.pe/21622-acceder-a-tu-expediente-electronico-de-cobranza-coactiva-en-la-sunat",
      "actionUrl": "https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm",
      "category": "Deuda y Devoluciones",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-gastos-deducibles",
      "title": "Consultar Gastos Deducibles de Impuesto a la Renta (Hasta 3 UIT)",
      "url": "https://www.gob.pe/7345-consultar-gastos-deducibles-para-personas-naturales",
      "actionUrl": "https://www.sunat.gob.pe/cl-ti-itgastosdeduciblesconsulta/index.htm",
      "category": "Herramientas y Consultas Especiales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-detracciones",
      "title": "Depositar Detracciones a la SUNAT",
      "url": "https://www.gob.pe/702-depositar-detracciones-a-la-sunat",
      "actionUrl": "https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm",
      "category": "Herramientas y Consultas Especiales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-tipo-cambio",
      "title": "Consultar Tipo de Cambio Oficial SBS / SUNAT",
      "url": "https://www.gob.pe/13493-consultar-tipo-de-cambio",
      "actionUrl": "https://e-consulta.sunat.gob.pe/cl-at-ittipcam/tcS01Alias",
      "category": "Herramientas y Consultas Especiales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sunat-operatividad-aduanera",
      "title": "Consultar la Plataforma Operatividad Aduanera de la SUNAT",
      "url": "https://www.gob.pe/7474-consultar-la-plataforma-operatividad-aduanera-de-la-sunat",
      "actionUrl": "http://www.sunat.gob.pe/operatividadaduanera/index.html",
      "category": "Herramientas y Consultas Especiales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    }
  ],
  "RENIEC": [
    {
      "id": "reniec-1489302",
      "title": "Consultar estado de tu trámite para la entrega de tu DNI",
      "url": "https://www.gob.pe/13388-consultar-estado-de-tu-tramite-para-la-entrega-de-tu-dni",
      "actionUrl": "https://serviciosportal.reniec.gob.pe/cetdnipi/inicio.htm",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg"
    },
    {
      "id": "reniec-4246944",
      "title": "Solicitar duplicado de DNI",
      "url": "https://www.gob.pe/224-solicitar-duplicado-de-dni",
      "actionUrl": "https://portaladminusuarios.reniec.gob.pe/duplicado/#!/index",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg"
    },
    {
      "id": "reniec-448198",
      "title": "Solicitar copia certificada de acta o partida en Reniec",
      "url": "https://www.gob.pe/434-solicitar-copia-certificada-de-acta-o-partida-en-reniec",
      "actionUrl": "https://apps.reniec.gob.pe/actascertificadas",
      "category": "Identidad y Certificados",
      "costo": "S/ 10.30",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg"
    },
    {
      "id": "reniec-448123",
      "title": "¿Qué es el Documento Nacional de Identidad Electrónico (DNIe)?",
      "url": "https://www.gob.pe/235-que-es-el-documento-nacional-de-identidad-electronico-dnie",
      "actionUrl": "https://www.gob.pe/235-que-es-el-documento-nacional-de-identidad-electronico-dnie",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg"
    },
    {
      "id": "reniec-3222187",
      "title": "Solicitar Certificado de Inscripción (C4)",
      "url": "https://www.gob.pe/8803-solicitar-certificado-de-inscripcion-c4",
      "actionUrl": "https://apps.reniec.gob.pe/certins",
      "category": "Identidad y Certificados",
      "costo": "S/ 4.50",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg"
    },
    {
      "id": "reniec-6956250",
      "title": "Generar ticket para pagos de trámite a través de Yape y Agente BCP",
      "url": "https://www.gob.pe/103516-generar-ticket-para-pagos-de-tramite-a-traves-de-yape-y-agente-bcp",
      "actionUrl": "https://recaudacion.reniec.gob.pe/recaudacionTasas/",
      "category": "Pagos de Tasas y Servicios",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg"
    },
    {
      "id": "reniec-7193737",
      "title": "Renovar DNI para mayores de 17 Años",
      "url": "https://www.gob.pe/250-renovar-dni-para-mayores-de-17-anos",
      "actionUrl": "https://apps.reniec.gob.pe/renovacionDni/",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg"
    },
    {
      "id": "reniec-448117",
      "title": "Solicitar DNI por primera vez",
      "url": "https://www.gob.pe/219-solicitar-dni-por-primera-vez",
      "actionUrl": "https://www.gob.pe/219-solicitar-dni-por-primera-vez",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg"
    },
    {
      "id": "reniec-1583002",
      "title": "Solicitar acceso al servicio de verificación de identidad de personas en Reniec",
      "url": "https://www.gob.pe/13543-solicitar-acceso-al-servicio-de-verificacion-de-identidad-de-personas-en-reniec",
      "actionUrl": "https://apps.reniec.gob.pe/MesaPartesVirtual/",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg"
    },
    {
      "id": "reniec-6809757",
      "title": "Acceder a la información sobre quién consultó tu DNI",
      "url": "https://www.gob.pe/100393-acceder-a-la-informacion-sobre-quien-consulto-tu-dni",
      "actionUrl": "https://apps.reniec.gob.pe/MesaPartesVirtual/",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg"
    },
    {
      "id": "reniec-8264376",
      "title": "Agendar citas presenciales en línea",
      "url": "https://www.gob.pe/116789-agendar-citas-presenciales-en-linea",
      "actionUrl": "https://citas.reniec.gob.pe/#/modulo-reservas/home-cita",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg"
    },
    {
      "id": "reniec-8281370",
      "title": "Realizar trámites de DNI con la app DNI BioFacial",
      "url": "https://www.gob.pe/116809-realizar-tramites-de-dni-con-la-app-dni-biofacial",
      "actionUrl": "https://www.gob.pe/116809-realizar-tramites-de-dni-con-la-app-dni-biofacial",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg"
    },
    {
      "id": "reniec-1475175",
      "title": "Consultar identidad de una persona",
      "url": "https://www.gob.pe/13390-consultar-identidad-de-una-persona",
      "actionUrl": "https://www.gob.pe/13390-consultar-identidad-de-una-persona",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg"
    },
    {
      "id": "reniec-3083064",
      "title": "Solicitar Certificación Digital",
      "url": "https://www.gob.pe/31114-solicitar-certificacion-digital",
      "actionUrl": "https://www.gob.pe/31114-solicitar-certificacion-digital",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg"
    },
    {
      "id": "reniec-1283105",
      "title": "Renovar DNI para menores de edad",
      "url": "https://www.gob.pe/251-renovar-dni-para-menores-de-edad",
      "actionUrl": "https://www.gob.pe/251-renovar-dni-para-menores-de-edad",
      "category": "Identidad y Certificados",
      "costo": "S/ 16.00",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg"
    },
    {
      "id": "reniec-8296499",
      "title": "Consultar los horarios de centros de atención del RENIEC a nivel nacional",
      "url": "https://www.gob.pe/116858-consultar-los-horarios-de-centros-de-atencion-del-reniec-a-nivel-nacional",
      "actionUrl": "https://docs.google.com/spreadsheets/d/1ILruYkEiJBv2kzIZd5BbDQuj7tBmVMAV/edit?usp=sharing&ouid=107568598387382262939&rtpof=true&sd=true",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg"
    },
    {
      "id": "reniec-6559591",
      "title": "Solicitar devolución de pagos realizados al Reniec",
      "url": "https://www.gob.pe/13430-solicitar-devolucion-de-pagos-realizados-al-reniec",
      "actionUrl": "https://apps.reniec.gob.pe/MesaPartesVirtual/",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg"
    },
    {
      "id": "reniec-2352664",
      "title": "Solicitar Constancia Negativa de Inscripción de Nacimiento, Matrimonio y Defunción en Reniec",
      "url": "https://www.gob.pe/21514-solicitar-constancia-negativa-de-inscripcion-de-nacimiento-matrimonio-y-defuncion-en-reniec",
      "actionUrl": "https://apps.reniec.gob.pe/MesaPartesVirtual/",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 4.10",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg"
    },
    {
      "id": "reniec-448121",
      "title": "Rectificación de datos del DNI",
      "url": "https://www.gob.pe/229-rectificacion-de-datos-del-dni",
      "actionUrl": "https://www.gob.pe/229-rectificacion-de-datos-del-dni",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg"
    },
    {
      "id": "reniec-6742710",
      "title": "Actualizar PIN de seguridad",
      "url": "https://www.gob.pe/99724-actualizar-pin-de-seguridad",
      "actionUrl": "https://www.gob.pe/99724-actualizar-pin-de-seguridad",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/816/campaign_ERM_banners_650x406.jpg"
    }
  ],
  "MIGRACIONES": [
    {
      "id": "migraciones-6188212",
      "title": "Obtener pasaporte electrónico para mayores de edad",
      "url": "https://www.gob.pe/174-obtener-pasaporte-electronico-para-mayores-de-edad",
      "actionUrl": "https://citaspasaporte.migraciones.gob.pe/citas-pasaporte-v2/",
      "category": "Pasaportes y Control Migratorio",
      "costo": "S/ 120.90",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg"
    },
    {
      "id": "migraciones-1452874",
      "title": "Solicitar el certificado de movimiento migratorio",
      "url": "https://www.gob.pe/12633-solicitar-el-certificado-de-movimiento-migratorio",
      "actionUrl": "https://agenciavirtual.migraciones.gob.pe/agencia-virtual/identidad",
      "category": "Identidad y Certificados",
      "costo": "S/ 15.10",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg"
    },
    {
      "id": "migraciones-7307586",
      "title": "Haz tu prerregistro migratorio en MigraCheck",
      "url": "https://www.gob.pe/109786-haz-tu-prerregistro-migratorio-en-migracheck",
      "actionUrl": "https://www.gob.pe/109786-haz-tu-prerregistro-migratorio-en-migracheck",
      "category": "Pasaportes y Control Migratorio",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg"
    },
    {
      "id": "migraciones-1283814",
      "title": "Obtener pasaporte electrónico para menores de edad",
      "url": "https://www.gob.pe/208-obtener-pasaporte-electronico-para-menores-de-edad",
      "actionUrl": "https://citaspasaporte.migraciones.gob.pe/citas-pasaporte-v2/pasaporte",
      "category": "Pasaportes y Control Migratorio",
      "costo": "S/ 120.90",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg"
    },
    {
      "id": "migraciones-451415",
      "title": "Obtener carnet de extranjería",
      "url": "https://www.gob.pe/7005-obtener-carnet-de-extranjeria",
      "actionUrl": "https://www.gob.pe/7005-obtener-carnet-de-extranjeria",
      "category": "Pasaportes y Control Migratorio",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg"
    },
    {
      "id": "migraciones-448102",
      "title": "Pasaporte electrónico",
      "url": "https://www.gob.pe/165-pasaporte-electronico",
      "actionUrl": "https://www.gob.pe/165-pasaporte-electronico",
      "category": "Pasaportes y Control Migratorio",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg"
    },
    {
      "id": "migraciones-1283984",
      "title": "Obtener pasaporte en casos de urgencia",
      "url": "https://www.gob.pe/156-obtener-pasaporte-en-casos-de-urgencia",
      "actionUrl": "https://www.gob.pe/156-obtener-pasaporte-en-casos-de-urgencia",
      "category": "Pasaportes y Control Migratorio",
      "costo": "S/ 120.90",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg"
    },
    {
      "id": "migraciones-448101",
      "title": "Revalidar Pasaporte",
      "url": "https://www.gob.pe/164-revalidar-pasaporte",
      "actionUrl": "https://www.gob.pe/164-revalidar-pasaporte",
      "category": "Pasaportes y Control Migratorio",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg"
    },
    {
      "id": "migraciones-1504768",
      "title": "Obtener la nacionalidad peruana por matrimonio",
      "url": "https://www.gob.pe/12574-obtener-la-nacionalidad-peruana-por-matrimonio",
      "actionUrl": "https://agenciavirtual.migraciones.gob.pe/agencia-virtual/identidad",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 113.30",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg"
    },
    {
      "id": "migraciones-1525802",
      "title": "Cambiar calidad migratoria residente",
      "url": "https://www.gob.pe/12926-cambiar-calidad-migratoria-residente",
      "actionUrl": "https://www.gob.pe/12926-cambiar-calidad-migratoria-residente",
      "category": "Pasaportes y Control Migratorio",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg"
    },
    {
      "id": "migraciones-1639516",
      "title": "Solicitar la renovación del carné de extranjería",
      "url": "https://www.gob.pe/14187-solicitar-la-renovacion-del-carne-de-extranjeria",
      "actionUrl": "https://agenciavirtual.migraciones.gob.pe/agencia-virtual/identidad",
      "category": "Pasaportes y Control Migratorio",
      "costo": "S/ 22.10",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg"
    },
    {
      "id": "migraciones-1492719",
      "title": "Solicitar la nacionalidad peruana por naturalización",
      "url": "https://www.gob.pe/12580-solicitar-la-nacionalidad-peruana-por-naturalizacion",
      "actionUrl": "https://agenciavirtual.migraciones.gob.pe/agencia-virtual/identidad",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 530.60",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg"
    },
    {
      "id": "migraciones-1437023",
      "title": "Solicitar carné de extranjería para Calidad Migratoria Residente, Calidad Humanitaria o personas extranjeras con estatuto de refugiados o asilados",
      "url": "https://www.gob.pe/13113-solicitar-carne-de-extranjeria-para-calidad-migratoria-residente-calidad-humanitaria-o-personas-extranjeras-con-estatuto-de-refugiados-o-asilados",
      "actionUrl": "https://agenciavirtual.migraciones.gob.pe/agencia-virtual/identidad",
      "category": "Pasaportes y Control Migratorio",
      "costo": "S/ 24.00",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg"
    },
    {
      "id": "migraciones-1463869",
      "title": "Sacar cita para recoger documentos en Migraciones",
      "url": "https://www.gob.pe/13325-sacar-cita-para-recoger-documentos-en-migraciones",
      "actionUrl": "https://agenciavirtual.migraciones.gob.pe/agencia-virtual/identidad",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg"
    },
    {
      "id": "migraciones-1649171",
      "title": "Actualizar tus datos en Migraciones (con emisión de documento)",
      "url": "https://www.gob.pe/14179-actualizar-tus-datos-en-migraciones-con-emision-de-documento",
      "actionUrl": "https://agenciavirtual.migraciones.gob.pe/agencia-virtual/identidad",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 20.20",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg"
    },
    {
      "id": "migraciones-7348244",
      "title": "Todo sobre el registro de huéspedes y arrendamiento a extranjeros.",
      "url": "https://www.gob.pe/110824-todo-sobre-el-registro-de-huespedes-y-arrendamiento-a-extranjeros",
      "actionUrl": "https://www.gob.pe/110824-todo-sobre-el-registro-de-huespedes-y-arrendamiento-a-extranjeros",
      "category": "Pasaportes y Control Migratorio",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg"
    },
    {
      "id": "migraciones-1525639",
      "title": "Solicitar permiso especial para firmar documentos",
      "url": "https://www.gob.pe/12614-solicitar-permiso-especial-para-firmar-documentos",
      "actionUrl": "https://agenciavirtual.migraciones.gob.pe/agencia-virtual/identidad",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg"
    },
    {
      "id": "migraciones-1399689",
      "title": "Solicitar calidad migratoria de familiar residente para mayores de edad",
      "url": "https://www.gob.pe/12876-solicitar-calidad-migratoria-de-familiar-residente-para-mayores-de-edad",
      "actionUrl": "https://agenciavirtual.migraciones.gob.pe/agencia-virtual/identidad",
      "category": "Pasaportes y Control Migratorio",
      "costo": "S/ 58.80",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg"
    },
    {
      "id": "migraciones-448096",
      "title": "Tarjeta Andina de Migración - TAM",
      "url": "https://www.gob.pe/159-tarjeta-andina-de-migracion-tam",
      "actionUrl": "https://www.gob.pe/159-tarjeta-andina-de-migracion-tam",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg"
    },
    {
      "id": "migraciones-1453566",
      "title": "Solicitar duplicado de carné de extranjería, carné temporal migratorio, carné de permiso temporal de permanencia y otros documentos emitidos por MIGRACIONES",
      "url": "https://www.gob.pe/12618-solicitar-duplicado-de-carne-de-extranjeria-carne-temporal-migratorio-carne-de-permiso-temporal-de-permanencia-y-otros-documentos-emitidos-por-migraciones",
      "actionUrl": "https://agenciavirtual.migraciones.gob.pe/agencia-virtual/identidad",
      "category": "Pasaportes y Control Migratorio",
      "costo": "S/ 20.20",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/144/473/campaign_WhatsApp_Image_2026-08-18_at_2.46.55_PM.jpeg"
    }
  ],
  "SUNARP": [
    {
      "id": "sunarp-448169",
      "title": "Consultar los datos de un vehículo - Consulta Vehicular",
      "url": "https://www.gob.pe/358-consultar-los-datos-de-un-vehiculo-consulta-vehicular",
      "actionUrl": "https://consultavehicular.sunarp.gob.pe/",
      "category": "Registros de Bienes y Propiedad",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png"
    },
    {
      "id": "sunarp-4368501",
      "title": "Consultar gratis partidas registrales",
      "url": "https://www.gob.pe/50685-consultar-gratis-partidas-registrales",
      "actionUrl": "https://conoce-aqui.sunarp.gob.pe/conoce-aqui",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png"
    },
    {
      "id": "sunarp-448151",
      "title": "Obtener la Tarjeta de Identificación Vehicular Electrónica (TIVe)",
      "url": "https://www.gob.pe/306-obtener-la-tarjeta-de-identificacion-vehicular-electronica-tive",
      "actionUrl": "https://siguelo.sunarp.gob.pe/siguelo/?ref=SPRL",
      "category": "Registros de Bienes y Propiedad",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png"
    },
    {
      "id": "sunarp-2776311",
      "title": "Concursos y convocatorias de personal de la Sunarp",
      "url": "https://www.gob.pe/24791-concursos-y-convocatorias-de-personal-de-la-sunarp",
      "actionUrl": "https://www.gob.pe/24791-concursos-y-convocatorias-de-personal-de-la-sunarp",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png"
    },
    {
      "id": "sunarp-2918773",
      "title": "Consultar los datos de una propiedad - Consulta de Propiedad",
      "url": "https://www.gob.pe/26531-consultar-los-datos-de-una-propiedad-consulta-de-propiedad",
      "actionUrl": "https://www2.sunarp.gob.pe/consulta-propiedad",
      "category": "Registros de Bienes y Propiedad",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png"
    },
    {
      "id": "sunarp-448170",
      "title": "Solicitar certificado literal de partida a Sunarp",
      "url": "https://www.gob.pe/360-solicitar-certificado-literal-de-partida-a-sunarp",
      "actionUrl": "https://enlinea.sunarp.gob.pe/sunarpweb/pages/acceso/ingreso.faces",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png"
    },
    {
      "id": "sunarp-2925987",
      "title": "Solicitar certificado de vigencia de poder otorgado por persona jurídica",
      "url": "https://www.gob.pe/380-solicitar-certificado-de-vigencia-de-poder-otorgado-por-persona-juridica",
      "actionUrl": "https://enlinea.sunarp.gob.pe/sunarpweb/pages/acceso/ingreso.faces",
      "category": "Identidad y Certificados",
      "costo": "S/ 32.10",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png"
    },
    {
      "id": "sunarp-1005231",
      "title": "Conocer el estado de tu trámite de inscripción en la Sunarp - Síguelo Plus",
      "url": "https://www.gob.pe/10574-conocer-el-estado-de-tu-tramite-de-inscripcion-en-la-sunarp-siguelo-plus",
      "actionUrl": "https://sigueloplus.sunarp.gob.pe/siguelo/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png"
    },
    {
      "id": "sunarp-2552379",
      "title": "Solicitar boleta informativa vehicular",
      "url": "https://www.gob.pe/22911-solicitar-boleta-informativa-vehicular",
      "actionUrl": "https://enlinea.sunarp.gob.pe/sunarpweb/pages/acceso/ingreso.faces",
      "category": "Registros de Bienes y Propiedad",
      "costo": "S/ 6.10",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png"
    },
    {
      "id": "sunarp-448324",
      "title": "Acceder a la Plataforma de Servicio de Publicidad Registral en Línea (SPRL)",
      "url": "https://www.gob.pe/709-acceder-a-la-plataforma-de-servicio-de-publicidad-registral-en-linea-sprl",
      "actionUrl": "https://sprl.sunarp.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png"
    },
    {
      "id": "sunarp-4981636",
      "title": "Acceder al Visor de la Base Gráfica Registral",
      "url": "https://www.gob.pe/63173-acceder-al-visor-de-la-base-grafica-registral",
      "actionUrl": "https://visor-bgr.sunarp.gob.pe/visor-bgr/inicio",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png"
    },
    {
      "id": "sunarp-572728",
      "title": "Buscar y reservar el nombre de una empresa en la Sunarp",
      "url": "https://www.gob.pe/271-buscar-y-reservar-el-nombre-de-una-empresa-en-la-sunarp",
      "actionUrl": "https://sidciudadano.sunarp.gob.pe/sid/sesion.htm",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 25.60",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png"
    },
    {
      "id": "sunarp-448176",
      "title": "Ver partidas registrales en el SPRL de Sunarp",
      "url": "https://www.gob.pe/381-ver-partidas-registrales-en-el-sprl-de-sunarp",
      "actionUrl": "https://enlinea.sunarp.gob.pe/sunarpweb/pages/acceso/ingreso.faces",
      "category": "Identidad y Certificados",
      "costo": "S/ 8.50",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png"
    },
    {
      "id": "sunarp-3677148",
      "title": "Consultar los directorios telefónicos de la Sunarp",
      "url": "https://www.gob.pe/23018-consultar-los-directorios-telefonicos-de-la-sunarp",
      "actionUrl": "https://www.gob.pe/23018-consultar-los-directorios-telefonicos-de-la-sunarp",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png"
    },
    {
      "id": "sunarp-1271237",
      "title": "Normas y resoluciones de la Sunarp",
      "url": "https://www.gob.pe/12324-normas-y-resoluciones-de-la-sunarp",
      "actionUrl": "https://www.gob.pe/10543",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png"
    },
    {
      "id": "sunarp-448152",
      "title": "Solicitar duplicado de la Tarjeta de Identidad Vehicular (TIV)",
      "url": "https://www.gob.pe/307-solicitar-duplicado-de-la-tarjeta-de-identidad-vehicular-tiv",
      "actionUrl": "https://www.gob.pe/307-solicitar-duplicado-de-la-tarjeta-de-identidad-vehicular-tiv",
      "category": "Registros de Bienes y Propiedad",
      "costo": "S/ 48.10",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png"
    },
    {
      "id": "sunarp-2924614",
      "title": "Solicitar certificado de sucesión intestada y testamento",
      "url": "https://www.gob.pe/26685-solicitar-certificado-de-sucesion-intestada-y-testamento",
      "actionUrl": "https://enlinea.sunarp.gob.pe/sunarpweb/pages/acceso/ingreso.faces",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png"
    },
    {
      "id": "sunarp-3701434",
      "title": "Denunciar un presunto acto de corrupción",
      "url": "https://www.gob.pe/39108-superintendencia-nacional-de-los-registros-publicos-denunciar-un-presunto-acto-de-corrupcion",
      "actionUrl": "https://denuncias.servicios.gob.pe/",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png"
    },
    {
      "id": "sunarp-448168",
      "title": "Solicitar Certificado literal de Partida del Registro de Propiedad Vehicular",
      "url": "https://www.gob.pe/357-solicitar-certificado-literal-de-partida-del-registro-de-propiedad-vehicular",
      "actionUrl": "https://enlinea.sunarp.gob.pe/sunarpweb/pages/acceso/ingreso.faces",
      "category": "Identidad y Certificados",
      "costo": "S/ 6.40",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png"
    },
    {
      "id": "sunarp-2918774",
      "title": "Conocer el directorio nacional de personas jurídicas",
      "url": "https://www.gob.pe/26674-conocer-el-directorio-nacional-de-personas-juridicas",
      "actionUrl": "https://www.sunarp.gob.pe/dn-personas-juridicas.asp",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/142/703/campaign_PORTADA-Secci%C3%B3nWebCAMPA%C3%91A-IA-SUNARP-2.png"
    }
  ],
  "BN": [
    {
      "id": "bn-5380703",
      "title": "Acceder a mesa de partes",
      "url": "https://www.gob.pe/70066-banco-de-la-nacion-acceder-a-mesa-de-partes",
      "actionUrl": "https://facilita.gob.pe/t/8345",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "bn-5380725",
      "title": "Consultar estado de trámite",
      "url": "https://www.gob.pe/70068-banco-de-la-nacion-consultar-estado-de-tramite",
      "actionUrl": "https://facilita.gob.pe/seguimiento",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "bn-489744",
      "title": "Pagar online trámites y servicios del Estado - Págalo.pe",
      "url": "https://www.gob.pe/7815-pagar-online-tramites-y-servicios-del-estado-pagalo-pe",
      "actionUrl": "https://pagalo.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "bn-3752739",
      "title": "Abrir cuenta corriente para detracciones",
      "url": "https://www.gob.pe/20973-abrir-cuenta-corriente-para-detracciones",
      "actionUrl": "https://www.gob.pe/20973-abrir-cuenta-corriente-para-detracciones",
      "category": "Pagos de Tasas y Servicios",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "bn-4122514",
      "title": "Atención al cliente",
      "url": "https://www.gob.pe/47445-atencion-al-cliente",
      "actionUrl": "https://www.gob.pe/47445-atencion-al-cliente",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "bn-3667606",
      "title": "MultiRed Virtual",
      "url": "https://www.gob.pe/40677-multired-virtual",
      "actionUrl": "https://www.gob.pe/40677-multired-virtual",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 10",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "bn-3601100",
      "title": "Solicitar un préstamo clásico Multired en el Banco de la Nación",
      "url": "https://www.gob.pe/38998-solicitar-un-prestamo-clasico-multired-en-el-banco-de-la-nacion",
      "actionUrl": "https://www.gob.pe/38998-solicitar-un-prestamo-clasico-multired-en-el-banco-de-la-nacion",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 99",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "bn-1789445",
      "title": "Cobrar tu apoyo económico por Cuenta DNI",
      "url": "https://www.gob.pe/14908-cobrar-tu-apoyo-economico-por-cuenta-dni",
      "actionUrl": "https://www.gob.pe/14908-cobrar-tu-apoyo-economico-por-cuenta-dni",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "bn-3601097",
      "title": "Ver cronograma de pagos de remuneraciones y pensiones",
      "url": "https://www.gob.pe/39018-ver-cronograma-de-pagos-de-remuneraciones-y-pensiones",
      "actionUrl": "https://www.bn.com.pe/cronograma-pagos/cronograma-pagos.asp",
      "category": "Pensiones y Retiro",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "bn-3767725",
      "title": "Fideicomiso",
      "url": "https://www.gob.pe/42602-fideicomiso",
      "actionUrl": "https://www.gob.pe/42602-fideicomiso",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "bn-3894074",
      "title": "Obtener clave digital de cuentas corrientes para consultas por Internet",
      "url": "https://www.gob.pe/44169-obtener-clave-digital-de-cuentas-corrientes-para-consultas-por-internet",
      "actionUrl": "https://www.gob.pe/44169-obtener-clave-digital-de-cuentas-corrientes-para-consultas-por-internet",
      "category": "Pagos de Tasas y Servicios",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "bn-3601064",
      "title": "Solicitar crédito hipotecario para compra de vivienda",
      "url": "https://www.gob.pe/39727-solicitar-credito-hipotecario-para-compra-de-vivienda",
      "actionUrl": "https://www.gob.pe/39727-solicitar-credito-hipotecario-para-compra-de-vivienda",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 5",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "bn-3981457",
      "title": "Afiliarse a la Clave Dinámica Digital",
      "url": "https://www.gob.pe/45677-afiliarse-a-la-clave-dinamica-digital",
      "actionUrl": "https://www.gob.pe/45677-afiliarse-a-la-clave-dinamica-digital",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "bn-490262",
      "title": "Gestionar tu cuenta del Banco de la Nación mediante la aplicación móvil",
      "url": "https://www.gob.pe/7817-gestionar-tu-cuenta-del-banco-de-la-nacion-mediante-la-aplicacion-movil",
      "actionUrl": "https://www.gob.pe/7817-gestionar-tu-cuenta-del-banco-de-la-nacion-mediante-la-aplicacion-movil",
      "category": "Pagos de Tasas y Servicios",
      "costo": "S/ 4.00",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "bn-4101295",
      "title": "Revisar códigos para pagar trámites de entidades públicas en el Banco de la Nación",
      "url": "https://www.gob.pe/47156-revisar-codigos-para-pagar-tramites-de-entidades-publicas-en-el-banco-de-la-nacion",
      "actionUrl": "https://www.gob.pe/47156-revisar-codigos-para-pagar-tramites-de-entidades-publicas-en-el-banco-de-la-nacion",
      "category": "Pasaportes y Control Migratorio",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "bn-3723463",
      "title": "Abrir cuenta de ahorros en agencias UOB",
      "url": "https://www.gob.pe/21203-abrir-cuenta-de-ahorros-en-agencias-uob",
      "actionUrl": "https://www.gob.pe/21203-abrir-cuenta-de-ahorros-en-agencias-uob",
      "category": "Pagos de Tasas y Servicios",
      "costo": "S/ 100",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "bn-4122125",
      "title": "Solicitar un requerimiento en el Banco de la Nación",
      "url": "https://www.gob.pe/47434-solicitar-un-requerimiento-en-el-banco-de-la-nacion",
      "actionUrl": "https://reclamos.bn.com.pe/SARE_inter/",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "bn-3601099",
      "title": "Solicitar una tarjeta de crédito en el Banco de la Nación",
      "url": "https://www.gob.pe/38110-solicitar-una-tarjeta-de-credito-en-el-banco-de-la-nacion",
      "actionUrl": "https://www.gob.pe/38110-solicitar-una-tarjeta-de-credito-en-el-banco-de-la-nacion",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 50",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "bn-1889072",
      "title": "Activar Cuenta DNI del Banco de la Nación",
      "url": "https://www.gob.pe/14909-activar-cuenta-dni-del-banco-de-la-nacion",
      "actionUrl": "https://www.cuentadni.pe/bnp-retail-app/self-enrollment-reniec#/comienzo",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "bn-3601072",
      "title": "Solicitar un préstamo descuento por planilla",
      "url": "https://www.gob.pe/39021-solicitar-un-prestamo-descuento-por-planilla",
      "actionUrl": "https://www.gob.pe/39021-solicitar-un-prestamo-descuento-por-planilla",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 50",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    }
  ],
  "MTC": [
    {
      "id": "mtc-448163",
      "title": "Consulta tu récord de conductor",
      "url": "https://www.gob.pe/341-consulta-tu-record-de-conductor",
      "actionUrl": "https://recordconductor.mtc.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg"
    },
    {
      "id": "mtc-448233",
      "title": "Consulta tu código postal nacional",
      "url": "https://www.gob.pe/521-consulta-tu-codigo-postal-nacional",
      "actionUrl": "http://www.codigopostal.gob.pe/pages/invitado/consulta.jsf",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg"
    },
    {
      "id": "mtc-448108",
      "title": "Renovar o revalidar la licencia de conducir (brevete)",
      "url": "https://www.gob.pe/191-renovar-o-revalidar-la-licencia-de-conducir-brevete",
      "actionUrl": "https://www.gob.pe/191-renovar-o-revalidar-la-licencia-de-conducir-brevete",
      "category": "Licencias y Tránsito",
      "costo": "S/ 6.70",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg"
    },
    {
      "id": "mtc-1086454",
      "title": "Inscribirte al curso de seguridad vial que reduce puntos por infracción a conductores",
      "url": "https://www.gob.pe/11005-inscribirte-al-curso-de-seguridad-vial-que-reduce-puntos-por-infraccion-a-conductores",
      "actionUrl": "https://icjc.mtc.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg"
    },
    {
      "id": "mtc-448132",
      "title": "Tipos de licencia de conducir (brevete)",
      "url": "https://www.gob.pe/262-tipos-de-licencia-de-conducir-brevete",
      "actionUrl": "https://www.gob.pe/262-tipos-de-licencia-de-conducir-brevete",
      "category": "Licencias y Tránsito",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg"
    },
    {
      "id": "mtc-448090",
      "title": "Obtener licencia de conducir (brevete) por primera vez",
      "url": "https://www.gob.pe/135-obtener-licencia-de-conducir-brevete-por-primera-vez",
      "actionUrl": "https://www.gob.pe/135-obtener-licencia-de-conducir-brevete-por-primera-vez",
      "category": "Licencias y Tránsito",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg"
    },
    {
      "id": "mtc-1521227",
      "title": "Afiliarte a la casilla electrónica del MTC",
      "url": "https://www.gob.pe/13519-afiliarte-a-la-casilla-electronica-del-mtc",
      "actionUrl": "https://casilla.mtc.gob.pe/#/auth/login",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg"
    },
    {
      "id": "mtc-448105",
      "title": "Duplicado de licencia de conducir (brevete)",
      "url": "https://www.gob.pe/179-duplicado-de-licencia-de-conducir-brevete",
      "actionUrl": "https://www.gob.pe/179-duplicado-de-licencia-de-conducir-brevete",
      "category": "Licencias y Tránsito",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg"
    },
    {
      "id": "mtc-448164",
      "title": "¿Cómo funciona el sistema de Licencias de Conducir por Puntos?",
      "url": "https://www.gob.pe/343-como-funciona-el-sistema-de-licencias-de-conducir-por-puntos",
      "actionUrl": "https://www.gob.pe/343-como-funciona-el-sistema-de-licencias-de-conducir-por-puntos",
      "category": "Licencias y Tránsito",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg"
    },
    {
      "id": "mtc-448185",
      "title": "Revisión Técnica Vehicular",
      "url": "https://www.gob.pe/397-revision-tecnica-vehicular",
      "actionUrl": "http://portal.mtc.gob.pe/reportedgtt/form/frmConsultaCITV.aspx",
      "category": "Registros de Bienes y Propiedad",
      "costo": "S/ 2",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg"
    },
    {
      "id": "mtc-448144",
      "title": "Recategorizar licencia de conducir (brevete)",
      "url": "https://www.gob.pe/288-recategorizar-licencia-de-conducir-brevete",
      "actionUrl": "https://www.gob.pe/288-recategorizar-licencia-de-conducir-brevete",
      "category": "Licencias y Tránsito",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg"
    },
    {
      "id": "mtc-1506591",
      "title": "Solicitar autorización para prestar servicio de transporte público de mercancías",
      "url": "https://www.gob.pe/13429-solicitar-autorizacion-para-prestar-servicio-de-transporte-publico-de-mercancias",
      "actionUrl": "https://mpv.mtc.gob.pe/",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 10.80",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg"
    },
    {
      "id": "mtc-4018641",
      "title": "Realiza tus trámites sin ir al MTC usando el TUPA Digital",
      "url": "https://www.gob.pe/42073-realiza-tus-tramites-sin-ir-al-mtc-usando-el-tupa-digital",
      "actionUrl": "https://tupadigital.mtc.gob.pe/#/autenticacion/iniciar-sesion",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg"
    },
    {
      "id": "mtc-448111",
      "title": "Llevar curso de conductores para obtener licencia de conducir (brevete)",
      "url": "https://www.gob.pe/195-llevar-curso-de-conductores-para-obtener-licencia-de-conducir-brevete",
      "actionUrl": "https://www.gob.pe/195-llevar-curso-de-conductores-para-obtener-licencia-de-conducir-brevete",
      "category": "Licencias y Tránsito",
      "costo": "S/ 75.00",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg"
    },
    {
      "id": "mtc-2549511",
      "title": "Solicitar certificado de homologación para un equipo y/o aparato de telecomunicaciones que genera emisiones radioeléctricas",
      "url": "https://www.gob.pe/22738-solicitar-certificado-de-homologacion-para-un-equipo-y-o-aparato-de-telecomunicaciones-que-genera-emisiones-radioelectricas",
      "actionUrl": "https://authorize.vuce.gob.pe/public/login-options/mercancias-restringidas",
      "category": "Identidad y Certificados",
      "costo": "S/ 86.40",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg"
    },
    {
      "id": "mtc-4083001",
      "title": "Examen de reglas de tránsito",
      "url": "https://www.gob.pe/139-examen-de-reglas-de-transito",
      "actionUrl": "https://www.gob.pe/139-examen-de-reglas-de-transito",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg"
    },
    {
      "id": "mtc-448147",
      "title": "Permiso provisional para aprender a conducir",
      "url": "https://www.gob.pe/294-permiso-provisional-para-aprender-a-conducir",
      "actionUrl": "https://mpv.mtc.gob.pe/",
      "category": "Licencias y Tránsito",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg"
    },
    {
      "id": "mtc-2848220",
      "title": "Nuevos límites de velocidad en zonas urbanas a nivel nacional",
      "url": "https://www.gob.pe/26617-nuevos-limites-de-velocidad-en-zonas-urbanas-a-nivel-nacional",
      "actionUrl": "https://www.gob.pe/26617-nuevos-limites-de-velocidad-en-zonas-urbanas-a-nivel-nacional",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg"
    },
    {
      "id": "mtc-1504802",
      "title": "Solicitar autorización para prestar servicio de transporte terrestre público de personas",
      "url": "https://www.gob.pe/13427-solicitar-autorizacion-para-prestar-servicio-de-transporte-terrestre-publico-de-personas",
      "actionUrl": "https://mpv.mtc.gob.pe/",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 266.80",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg"
    },
    {
      "id": "mtc-5988798",
      "title": "GeoPortal del MTC",
      "url": "https://www.gob.pe/74825-geoportal-del-mtc",
      "actionUrl": "https://www.gob.pe/74825-geoportal-del-mtc",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/101/campaign_nota-prensa-web---foro-por-la-movilidad-sostenible---4-setiembre-2026.jpg.jpeg"
    }
  ],
  "ESSALUD": [
    {
      "id": "essalud-4524364",
      "title": "Consultar si tu seguro EsSalud está activo",
      "url": "https://www.gob.pe/12947-consultar-si-tu-seguro-essalud-esta-activo",
      "actionUrl": "https://viva.essalud.gob.pe/viva/login",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png"
    },
    {
      "id": "essalud-448137",
      "title": "Sacar una cita médica en EsSalud",
      "url": "https://www.gob.pe/277-sacar-una-cita-medica-en-essalud",
      "actionUrl": "https://miconsulta.essalud.gob.pe/auth/login",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png"
    },
    {
      "id": "essalud-4427900",
      "title": "Acceder a mesa de partes",
      "url": "https://www.gob.pe/51211-seguro-social-de-salud-acceder-a-mesa-de-partes",
      "actionUrl": "https://mpv.essalud.gob.pe/Login/Index",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png"
    },
    {
      "id": "essalud-8076886",
      "title": "Implementación de la Ley N° 32566 - Segunda Fase",
      "url": "https://www.gob.pe/115903-implementacion-de-la-ley-n-32566-segunda-fase",
      "actionUrl": "https://www.gob.pe/115903-implementacion-de-la-ley-n-32566-segunda-fase",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png"
    },
    {
      "id": "essalud-4427907",
      "title": "Acceder a la Plataforma VIVA",
      "url": "https://www.gob.pe/50981-acceder-a-la-plataforma-viva",
      "actionUrl": "https://viva.essalud.gob.pe/viva/login",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png"
    },
    {
      "id": "essalud-7796001",
      "title": "Implementación de la Ley N° 32566, “Ley que autoriza el cambio de contrato CAS-COVID a Contrato CAS al Personal Asistencial del Seguro Social de Salud (EsSalud)",
      "url": "https://www.gob.pe/114392-implementacion-de-la-ley-n-32566-ley-que-autoriza-el-cambio-de-contrato-cas-covid-a-contrato-cas-al-personal-asistencial-del-seguro-social-de-salud-essalud",
      "actionUrl": "https://www.gob.pe/114392-implementacion-de-la-ley-n-32566-ley-que-autoriza-el-cambio-de-contrato-cas-covid-a-contrato-cas-al-personal-asistencial-del-seguro-social-de-salud-essalud",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png"
    },
    {
      "id": "essalud-4452058",
      "title": "Consultar dónde atenderte en EsSalud",
      "url": "https://www.gob.pe/47765-consultar-donde-atenderte-en-essalud",
      "actionUrl": "https://dondemeatiendo.essalud.gob.pe/#/consulta",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png"
    },
    {
      "id": "essalud-7805922",
      "title": "Oficinas de Seguros y Prestaciones Económicas (OSPE)",
      "url": "https://www.gob.pe/114429-oficinas-de-seguros-y-prestaciones-economicas-ospe",
      "actionUrl": "https://www.gob.pe/114429-oficinas-de-seguros-y-prestaciones-economicas-ospe",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png"
    },
    {
      "id": "essalud-4712202",
      "title": "Acceder a Convocatorias Internas",
      "url": "https://www.gob.pe/56313-acceder-a-convocatorias-internas",
      "actionUrl": "https://www.gob.pe/56313-acceder-a-convocatorias-internas",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png"
    },
    {
      "id": "essalud-5153102",
      "title": "Consultar mis citas médicas, recetas y exámenes pendientes a través de EsSalud Mi Consulta",
      "url": "https://www.gob.pe/66366-consultar-mis-citas-medicas-recetas-y-examenes-pendientes-a-traves-de-essalud-mi-consulta",
      "actionUrl": "https://play.google.com/store/search?q=essalud&c=apps&hl=es_419",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png"
    },
    {
      "id": "essalud-448135",
      "title": "Solicitar subsidio por lactancia - EsSalud",
      "url": "https://www.gob.pe/266-solicitar-subsidio-por-lactancia-essalud",
      "actionUrl": "https://www.gob.pe/266-solicitar-subsidio-por-lactancia-essalud",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png"
    },
    {
      "id": "essalud-448138",
      "title": "Cita médica por referencia en EsSalud",
      "url": "https://www.gob.pe/278-cita-medica-por-referencia-en-essalud",
      "actionUrl": "https://miconsulta.essalud.gob.pe",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png"
    },
    {
      "id": "essalud-448118",
      "title": "Seguro Potestativo de EsSalud (+Salud)",
      "url": "https://www.gob.pe/221-seguro-potestativo-de-essalud-salud",
      "actionUrl": "https://www.gob.pe/221-seguro-potestativo-de-essalud-salud",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png"
    },
    {
      "id": "essalud-4449238",
      "title": "Certificado de Incapacidad Temporal para el Trabajo - CITT Digital Cero Trámite",
      "url": "https://www.gob.pe/52178-certificado-de-incapacidad-temporal-para-el-trabajo-citt-digital-cero-tramite",
      "actionUrl": "https://www.gob.pe/52178-certificado-de-incapacidad-temporal-para-el-trabajo-citt-digital-cero-tramite",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png"
    },
    {
      "id": "essalud-448113",
      "title": "Seguro Regular EsSalud (+SEGURO)",
      "url": "https://www.gob.pe/199-seguro-regular-essalud-seguro",
      "actionUrl": "https://www.gob.pe/199-seguro-regular-essalud-seguro",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png"
    },
    {
      "id": "essalud-8076780",
      "title": "Implementación de la Ley N° 32566 - Primera Fase",
      "url": "https://www.gob.pe/115902-implementacion-de-la-ley-n-32566-primera-fase",
      "actionUrl": "https://www.gob.pe/115902-implementacion-de-la-ley-n-32566-primera-fase",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png"
    },
    {
      "id": "essalud-4461125",
      "title": "Presentar un reclamo ante una entidad pública",
      "url": "https://www.gob.pe/52103-seguro-social-de-salud-presentar-un-reclamo-ante-una-entidad-publica",
      "actionUrl": "https://ww10.essalud.gob.pe/libro-reclamaciones/",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png"
    },
    {
      "id": "essalud-7661464",
      "title": "Programa de Prácticas Administrativas",
      "url": "https://www.gob.pe/113864-programa-de-practicas-administrativas",
      "actionUrl": "https://www.gob.pe/113864-programa-de-practicas-administrativas",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png"
    },
    {
      "id": "essalud-448146",
      "title": "Subsidio por maternidad en EsSalud",
      "url": "https://www.gob.pe/291-subsidio-por-maternidad-en-essalud",
      "actionUrl": "https://www.gob.pe/291-subsidio-por-maternidad-en-essalud",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png"
    },
    {
      "id": "essalud-448110",
      "title": "Tipos de seguros en el Seguro Social de Salud del Perú (EsSalud)",
      "url": "https://www.gob.pe/194-tipos-de-seguros-en-el-seguro-social-de-salud-del-peru-essalud",
      "actionUrl": "https://www.gob.pe/194-tipos-de-seguros-en-el-seguro-social-de-salud-del-peru-essalud",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/406/campaign_Boton_686x424_px.png"
    }
  ],
  "SIS": [
    {
      "id": "sis-934800",
      "title": "Verificar si estás afiliado al SIS",
      "url": "https://www.gob.pe/10337-verificar-si-estas-afiliado-al-sis",
      "actionUrl": "https://cel.sis.gob.pe/SisConsultaEnLinea",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg"
    },
    {
      "id": "sis-5752198",
      "title": "Afiliarte al SIS Gratuito",
      "url": "https://www.gob.pe/133-afiliarte-al-sis-gratuito",
      "actionUrl": "https://afiliacion.sis.gob.pe/sisAfiliacionVirtual",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg"
    },
    {
      "id": "sis-633044",
      "title": "Afiliarte al SIS Para Todos",
      "url": "https://www.gob.pe/8970-afiliarte-al-sis-para-todos",
      "actionUrl": "https://afiliacion.sis.gob.pe/sisAfiliacionVirtual",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg"
    },
    {
      "id": "sis-934916",
      "title": "Consultar el estado de un trámite de sepelios",
      "url": "https://www.gob.pe/10342-consultar-el-estado-de-un-tramite-de-sepelios",
      "actionUrl": "https://www.sis.gob.pe/NUEVO/consultaSepelio/frmConsultaSepelioOnLine.aspx",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg"
    },
    {
      "id": "sis-4021173",
      "title": "Buscar Establecimientos de Salud a nivel nacional",
      "url": "https://www.gob.pe/46299-buscar-establecimientos-de-salud-a-nivel-nacional",
      "actionUrl": "https://sigeps.sis.gob.pe/BuscadorEESS/PortalSIS/",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg"
    },
    {
      "id": "sis-4533229",
      "title": "Planes del Seguro Integral de Salud (SIS)",
      "url": "https://www.gob.pe/130-planes-del-seguro-integral-de-salud-sis",
      "actionUrl": "http://app.sis.gob.pe/SisConsultaEnLinea/Consulta/frmConsultaEnLinea.aspx",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg"
    },
    {
      "id": "sis-5726931",
      "title": "Preguntas frecuentes de los planes de seguros SIS",
      "url": "https://www.gob.pe/76693-preguntas-frecuentes-de-los-planes-de-seguros-sis",
      "actionUrl": "https://www.gob.pe/76693-preguntas-frecuentes-de-los-planes-de-seguros-sis",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg"
    },
    {
      "id": "sis-448106",
      "title": "Afiliarte al SIS Microempresas",
      "url": "https://www.gob.pe/180-afiliarte-al-sis-microempresas",
      "actionUrl": "https://www.gob.pe/180-afiliarte-al-sis-microempresas",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg"
    },
    {
      "id": "sis-4649359",
      "title": "Cambiar mi centro de salud SIS",
      "url": "https://www.gob.pe/55242-cambiar-mi-centro-de-salud-sis",
      "actionUrl": "https://play.google.com/store/apps/details?id=gob.pe.sis",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg"
    },
    {
      "id": "sis-448104",
      "title": "Afiliarte al SIS Independiente",
      "url": "https://www.gob.pe/172-afiliarte-al-sis-independiente",
      "actionUrl": "https://www.gob.pe/172-afiliarte-al-sis-independiente",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg"
    },
    {
      "id": "sis-5217307",
      "title": "Solicitar la Prestación Económica de Sepelio (PES) del Seguro Integral de Salud",
      "url": "https://www.gob.pe/67425-solicitar-la-prestacion-economica-de-sepelio-pes-del-seguro-integral-de-salud",
      "actionUrl": "https://www.gob.pe/67425-solicitar-la-prestacion-economica-de-sepelio-pes-del-seguro-integral-de-salud",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 1",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg"
    },
    {
      "id": "sis-448094",
      "title": "Afiliarte al SIS Emprendedor",
      "url": "https://www.gob.pe/152-afiliarte-al-sis-emprendedor",
      "actionUrl": "https://www.gob.pe/152-afiliarte-al-sis-emprendedor",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg"
    },
    {
      "id": "sis-6574058",
      "title": "Denuncias Anticorrupción",
      "url": "https://www.gob.pe/95464-denuncias-anticorrupcion",
      "actionUrl": "https://denuncias.servicios.gob.pe/?gobpe_id=229",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg"
    },
    {
      "id": "sis-4992777",
      "title": "Acceder a la plataforma de datos abiertos del SIS",
      "url": "https://www.gob.pe/63324-acceder-a-la-plataforma-de-datos-abiertos-del-sis",
      "actionUrl": "https://www.datosabiertos.gob.pe/group/seguro-integral-de-salud-sis?fbclid=IwZXh0bgNhZW0CMTAAAR2oJgvEoiOBCefCcCwKvJJh7a3xRRlJHgAMkxZZUXdaqAQlA3B9NB5fJaE_aem_ATb_lLrKW4GthQYtEnF9e73mw9_BNMBvXWmHHRPPFTnYWTbhLPJHzefeLe3TLxoJp8yD_X-rLe9pOBrPnuiNwh3_",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg"
    },
    {
      "id": "sis-6650738",
      "title": "Plataforma Conect@SIS",
      "url": "https://www.gob.pe/89764-plataforma-conect-sis",
      "actionUrl": "https://www.gob.pe/89764-plataforma-conect-sis",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg"
    },
    {
      "id": "sis-6592505",
      "title": "SISTEMA DE CONTROL INTERNO",
      "url": "https://www.gob.pe/96158-sistema-de-control-interno",
      "actionUrl": "https://www.gob.pe/96158-sistema-de-control-interno",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg"
    },
    {
      "id": "sis-3958615",
      "title": "Base legal del Seguro Integral de Salud",
      "url": "https://www.gob.pe/45278-base-legal-del-seguro-integral-de-salud",
      "actionUrl": "https://www.gob.pe/45278-base-legal-del-seguro-integral-de-salud",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg"
    },
    {
      "id": "sis-3376522",
      "title": "Ecoeficiencia SIS",
      "url": "https://www.gob.pe/36514-ecoeficiencia-sis",
      "actionUrl": "https://www.gob.pe/36514-ecoeficiencia-sis",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg"
    },
    {
      "id": "sis-4932369",
      "title": "Acceder al repositorio Institucional del Seguro Integral de Salud - SIS",
      "url": "https://www.gob.pe/61905-acceder-al-repositorio-institucional-del-seguro-integral-de-salud-sis",
      "actionUrl": "https://repositorio.sis.gob.pe/home",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg"
    },
    {
      "id": "sis-1576704",
      "title": "Acceder a mesa de partes",
      "url": "https://www.gob.pe/13886-seguro-integral-de-salud-acceder-a-la-mesa-de-partes-virtual-del-seguro-integral-de-salud-sis",
      "actionUrl": "https://mpv.sis.gob.pe:8181/appmesapartesenlinea/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/444/campaign_MESA_DE_PARTES_VIRTUAL_PAGINA_WEB.jpg"
    }
  ],
  "MINSA": [
    {
      "id": "minsa-934800",
      "title": "Verificar si estás afiliado al SIS",
      "url": "https://www.gob.pe/10337-verificar-si-estas-afiliado-al-sis",
      "actionUrl": "https://cel.sis.gob.pe/SisConsultaEnLinea",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png"
    },
    {
      "id": "minsa-1943487",
      "title": "Obtener tu carnet de vacunación digital",
      "url": "https://www.gob.pe/13314-obtener-tu-carnet-de-vacunacion-digital",
      "actionUrl": "https://minsadigital.minsa.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png"
    },
    {
      "id": "minsa-8186656",
      "title": "Proceso de Adjudicación de Plazas para el Servicio Rural y Urbano Marginal de Salud (SERUMS) 2026 – II",
      "url": "https://www.gob.pe/116510-proceso-de-adjudicacion-de-plazas-para-el-servicio-rural-y-urbano-marginal-de-salud-serums-2026-ii",
      "actionUrl": "https://www.gob.pe/116510-proceso-de-adjudicacion-de-plazas-para-el-servicio-rural-y-urbano-marginal-de-salud-serums-2026-ii",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png"
    },
    {
      "id": "minsa-8196615",
      "title": "Acceder a los servicios de salud en Minsa Digital",
      "url": "https://www.gob.pe/114083-acceder-a-los-servicios-de-salud-en-minsa-digital",
      "actionUrl": "https://minsadigital.minsa.gob.pe/",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png"
    },
    {
      "id": "minsa-5752198",
      "title": "Afiliarte al SIS Gratuito",
      "url": "https://www.gob.pe/133-afiliarte-al-sis-gratuito",
      "actionUrl": "https://afiliacion.sis.gob.pe/sisAfiliacionVirtual",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png"
    },
    {
      "id": "minsa-2441225",
      "title": "Esquema Nacional de Inmunizaciones",
      "url": "https://www.gob.pe/22037-esquema-nacional-de-inmunizaciones",
      "actionUrl": "https://www.gob.pe/22037-esquema-nacional-de-inmunizaciones",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png"
    },
    {
      "id": "minsa-633044",
      "title": "Afiliarte al SIS Para Todos",
      "url": "https://www.gob.pe/8970-afiliarte-al-sis-para-todos",
      "actionUrl": "https://afiliacion.sis.gob.pe/sisAfiliacionVirtual",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png"
    },
    {
      "id": "minsa-619609",
      "title": "Recibir atención a distancia en salud a través de Teleatiendo",
      "url": "https://www.gob.pe/8945-recibir-atencion-a-distancia-en-salud-a-traves-de-teleatiendo",
      "actionUrl": "https://teleatiendo.minsa.gob.pe/",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png"
    },
    {
      "id": "minsa-8071944",
      "title": "Proceso de Evaluación para el Servicio Rural y Urbano Marginal de Salud (SERUMS) 2026–II",
      "url": "https://www.gob.pe/115875-proceso-de-evaluacion-para-el-servicio-rural-y-urbano-marginal-de-salud-serums-2026-ii",
      "actionUrl": "https://www.gob.pe/115875-proceso-de-evaluacion-para-el-servicio-rural-y-urbano-marginal-de-salud-serums-2026-ii",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png"
    },
    {
      "id": "minsa-2819688",
      "title": "Acceder al Sistema de Información Gerencial de Tuberculosis (SIGTB)",
      "url": "https://www.gob.pe/25739-acceder-al-sistema-de-informacion-gerencial-de-tuberculosis-sigtb",
      "actionUrl": "https://appsalud.minsa.gob.pe/sigtbdata/wflogin.aspx",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png"
    },
    {
      "id": "minsa-448212",
      "title": "Obtener carnet de inscripción en el Registro del CONADIS",
      "url": "https://www.gob.pe/465-obtener-carnet-de-inscripcion-en-el-registro-del-conadis",
      "actionUrl": "http://sirnpdpide.conadisperu.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png"
    },
    {
      "id": "minsa-448247",
      "title": "Línea 113 Salud: recibir orientación e información en salud",
      "url": "https://www.gob.pe/555-linea-113-salud-recibir-orientacion-e-informacion-en-salud",
      "actionUrl": "https://www.gob.pe/24223",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png"
    },
    {
      "id": "minsa-2785987",
      "title": "Solicitar la vacuna contra la fiebre amarilla en el Perú",
      "url": "https://www.gob.pe/25427-solicitar-la-vacuna-contra-la-fiebre-amarilla-en-el-peru",
      "actionUrl": "https://www.gob.pe/25427-solicitar-la-vacuna-contra-la-fiebre-amarilla-en-el-peru",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png"
    },
    {
      "id": "minsa-448213",
      "title": "Obtener Certificado de Discapacidad",
      "url": "https://www.gob.pe/467-obtener-certificado-de-discapacidad",
      "actionUrl": "https://geominsa.minsa.gob.pe/geominsaportal/apps/webappviewer/index.html?id=5f6a1c4ccdfc4ca7a742e00e0da663d6",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png"
    },
    {
      "id": "minsa-7368686",
      "title": "Solicitar atención en Centros de Salud Mental Comunitaria en el Perú",
      "url": "https://www.gob.pe/10942-solicitar-atencion-en-centros-de-salud-mental-comunitaria-en-el-peru",
      "actionUrl": "https://www.gob.pe/10942-solicitar-atencion-en-centros-de-salud-mental-comunitaria-en-el-peru",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png"
    },
    {
      "id": "minsa-1772972",
      "title": "Calcular si tienes un peso saludable para tu estatura (IMC)",
      "url": "https://www.gob.pe/14806-calcular-si-tienes-un-peso-saludable-para-tu-estatura-imc",
      "actionUrl": "https://alimentacionsaludable.ins.gob.pe/adultos/valoracion-nutricional/calculadora-de-imc",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png"
    },
    {
      "id": "minsa-7243270",
      "title": "Obtener constancia internacional de vacunación contra la fiebre amarilla",
      "url": "https://www.gob.pe/109062-obtener-constancia-internacional-de-vacunacion-contra-la-fiebre-amarilla",
      "actionUrl": "https://www.gob.pe/109062-obtener-constancia-internacional-de-vacunacion-contra-la-fiebre-amarilla",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png"
    },
    {
      "id": "minsa-4533229",
      "title": "Planes del Seguro Integral de Salud (SIS)",
      "url": "https://www.gob.pe/130-planes-del-seguro-integral-de-salud-sis",
      "actionUrl": "http://app.sis.gob.pe/SisConsultaEnLinea/Consulta/frmConsultaEnLinea.aspx",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png"
    },
    {
      "id": "minsa-3142422",
      "title": "Información sobre el Control de Crecimiento y Desarrollo (CRED) para niñas y niños",
      "url": "https://www.gob.pe/32588-informacion-sobre-el-control-de-crecimiento-y-desarrollo-cred-para-ninas-y-ninos",
      "actionUrl": "https://www.gob.pe/32588-informacion-sobre-el-control-de-crecimiento-y-desarrollo-cred-para-ninas-y-ninos",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png"
    },
    {
      "id": "minsa-448106",
      "title": "Afiliarte al SIS Microempresas",
      "url": "https://www.gob.pe/180-afiliarte-al-sis-microempresas",
      "actionUrl": "https://www.gob.pe/180-afiliarte-al-sis-microempresas",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/039/484/campaign_5-Portada-Web-EA.png"
    }
  ],
  "DIGEMID": [
    {
      "id": "digemid-6824069",
      "title": "Consultar el precio de los Medicamentos en el Observatorio Peruano de Productos Farmacéuticos del DIGEMID",
      "url": "https://www.gob.pe/42006-consultar-el-precio-de-los-medicamentos-en-el-observatorio-peruano-de-productos-farmaceuticos-del-digemid",
      "actionUrl": "https://opm-digemid.minsa.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "digemid-4194833",
      "title": "Comisión Multisectorial de naturaleza permanente para enfrentar la resistencia a los antimicrobianos",
      "url": "https://www.gob.pe/48558-comision-multisectorial-de-naturaleza-permanente-para-enfrentar-la-resistencia-a-los-antimicrobianos",
      "actionUrl": "https://www.gob.pe/48558-comision-multisectorial-de-naturaleza-permanente-para-enfrentar-la-resistencia-a-los-antimicrobianos",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "digemid-932020",
      "title": "Acceder al portal de transparencia contratos COVID-19",
      "url": "https://www.gob.pe/10221-acceder-al-portal-de-transparencia-contratos-covid-19",
      "actionUrl": "https://central.perucompras.gob.pe/contrataciones/contrataciones-emergencia-covid19.php",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "digemid-2553161",
      "title": "Cambiar el titular de la Notificación Sanitaria Obligatoria (NSO)",
      "url": "https://www.gob.pe/22998-cambiar-el-titular-de-la-notificacion-sanitaria-obligatoria-nso",
      "actionUrl": "https://www.vuce.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 211.20",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "digemid-2553116",
      "title": "Cambiar el titular de la Notificación Sanitaria Obligatoria (NSO) de productos de higiene",
      "url": "https://www.gob.pe/22954-cambiar-el-titular-de-la-notificacion-sanitaria-obligatoria-nso-de-productos-de-higiene",
      "actionUrl": "https://www.vuce.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 346.90",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "digemid-2553137",
      "title": "Solicitar el Certificado de Libre Comercialización (CLC) de productos de salud",
      "url": "https://www.gob.pe/22975-solicitar-el-certificado-de-libre-comercializacion-clc-de-productos-de-salud",
      "actionUrl": "https://www.vuce.gob.pe/",
      "category": "Identidad y Certificados",
      "costo": "S/ 373.40",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "digemid-2553153",
      "title": "Modificar o incluir fabricante de productos de higiene doméstica y absorbentes",
      "url": "https://www.gob.pe/22990-modificar-o-incluir-fabricante-de-productos-de-higiene-domestica-y-absorbentes",
      "actionUrl": "https://www.vuce.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "digemid-6980618",
      "title": "Notiseguridad y alertas de medicamentos dispositivos medicos",
      "url": "https://www.gob.pe/103760-notiseguridad-y-alertas-de-medicamentos-dispositivos-medicos",
      "actionUrl": "https://www.gob.pe/103760-notiseguridad-y-alertas-de-medicamentos-dispositivos-medicos",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "digemid-2553133",
      "title": "Solicitar el certificado de exportación de productos farmacéuticos, dispositivos médicos o productos sanitarios",
      "url": "https://www.gob.pe/22971-solicitar-el-certificado-de-exportacion-de-productos-farmaceuticos-dispositivos-medicos-o-productos-sanitarios",
      "actionUrl": "https://www.vuce.gob.pe/",
      "category": "Identidad y Certificados",
      "costo": "S/ 373.40",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "digemid-2553155",
      "title": "Modificar el nombre o razón social del titular o fabricante de productos de higiene",
      "url": "https://www.gob.pe/22992-modificar-el-nombre-o-razon-social-del-titular-o-fabricante-de-productos-de-higiene",
      "actionUrl": "https://www.vuce.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 211.00",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "digemid-2553156",
      "title": "Modificar la razón social o dirección de la cadena de producción de un cosmético",
      "url": "https://www.gob.pe/22993-modificar-la-razon-social-o-direccion-de-la-cadena-de-produccion-de-un-cosmetico",
      "actionUrl": "https://www.vuce.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 210.40",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "digemid-2553154",
      "title": "Modificar el nombre de un producto cosmético",
      "url": "https://www.gob.pe/22991-modificar-el-nombre-de-un-producto-cosmetico",
      "actionUrl": "https://www.vuce.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 211.20",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "digemid-2553152",
      "title": "Modificar la marca de un producto cosmético",
      "url": "https://www.gob.pe/22989-modificar-la-marca-de-un-producto-cosmetico",
      "actionUrl": "https://www.vuce.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 209.40",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "digemid-8148613",
      "title": "Solicitar autorización sanitaria de funcionamiento o traslado de laboratorio de control de calidad",
      "url": "https://www.gob.pe/22935-solicitar-autorizacion-sanitaria-de-funcionamiento-o-traslado-de-laboratorio-de-control-de-calidad",
      "actionUrl": "https://www.gob.pe/22935-solicitar-autorizacion-sanitaria-de-funcionamiento-o-traslado-de-laboratorio-de-control-de-calidad",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 711.20",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "digemid-2553087",
      "title": "Solicitar autorización excepcional para importar y usar productos de salud para tratamiento individual",
      "url": "https://www.gob.pe/22926-solicitar-autorizacion-excepcional-para-importar-y-usar-productos-de-salud-para-tratamiento-individual",
      "actionUrl": "https://www.vuce.gob.pe/",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "digemid-8149671",
      "title": "Solicitar autorización sanitaria para la ampliación de almacenes de establecimientos farmacéuticos",
      "url": "https://www.gob.pe/116332-solicitar-autorizacion-sanitaria-para-la-ampliacion-de-almacenes-de-establecimientos-farmaceuticos",
      "actionUrl": "https://www.gob.pe/116332-solicitar-autorizacion-sanitaria-para-la-ampliacion-de-almacenes-de-establecimientos-farmaceuticos",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 416.50",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "digemid-8149112",
      "title": "Solicitar la modificación o ampliación de información declarada de establecimientos farmacéuticos",
      "url": "https://www.gob.pe/116331-solicitar-la-modificacion-o-ampliacion-de-informacion-declarada-de-establecimientos-farmaceuticos",
      "actionUrl": "https://www.gob.pe/116331-solicitar-la-modificacion-o-ampliacion-de-informacion-declarada-de-establecimientos-farmaceuticos",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 81.70",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "digemid-8149989",
      "title": "Solicitar autorización sanitaria para la ampliación de planta o áreas de laboratorios",
      "url": "https://www.gob.pe/22947-solicitar-autorizacion-sanitaria-para-la-ampliacion-de-planta-o-areas-de-laboratorios",
      "actionUrl": "https://www.gob.pe/22947-solicitar-autorizacion-sanitaria-para-la-ampliacion-de-planta-o-areas-de-laboratorios",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 710.50",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "digemid-2553151",
      "title": "Modificar el nombre de un producto de higiene doméstica o absorbente",
      "url": "https://www.gob.pe/22988-modificar-el-nombre-de-un-producto-de-higiene-domestica-o-absorbente",
      "actionUrl": "https://www.vuce.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 210.90",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "digemid-2553158",
      "title": "Modificar la información del rotulado de productos de higiene doméstica y absorbentes personales",
      "url": "https://www.gob.pe/22995-modificar-la-informacion-del-rotulado-de-productos-de-higiene-domestica-y-absorbentes-personales",
      "actionUrl": "https://www.vuce.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 211.00",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    }
  ],
  "SBS": [
    {
      "id": "sbs-448262",
      "title": "Acceder a reporte de deuda en el Sistema Financiero",
      "url": "https://www.gob.pe/576-acceder-a-reporte-de-deuda-en-el-sistema-financiero",
      "actionUrl": "https://servicios.sbs.gob.pe/serviciosenlinea",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 8.50",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sbs-448278",
      "title": "Obtener Constancia de Afiliación AFP",
      "url": "https://www.gob.pe/597-obtener-constancia-de-afiliacion-afp",
      "actionUrl": "https://servicios.sbs.gob.pe/serviciosenlinea",
      "category": "Pensiones y Retiro",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sbs-448230",
      "title": "Elegir sistema de pensiones",
      "url": "https://www.gob.pe/515-elegir-sistema-de-pensiones",
      "actionUrl": "https://www.gob.pe/515-elegir-sistema-de-pensiones",
      "category": "Pensiones y Retiro",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sbs-5249220",
      "title": "Consultar tu reporte de deudas, gastos y afiliación a la AFP con la aplicación móvil de la Superintendencia de Banca, Seguros y AFP",
      "url": "https://www.gob.pe/67759-consultar-tu-reporte-de-deudas-gastos-y-afiliacion-a-la-afp-con-la-aplicacion-movil-de-la-superintendencia-de-banca-seguros-y-afp",
      "actionUrl": "https://www.gob.pe/576-acceder-a-reporte-de-deuda-en-el-sistema-financiero",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sbs-448300",
      "title": "Consultar a la SBS sobre los servicios de las empresas del sistema financiero, de seguros y AFP",
      "url": "https://www.gob.pe/635-consultar-a-la-sbs-sobre-los-servicios-de-las-empresas-del-sistema-financiero-de-seguros-y-afp",
      "actionUrl": "https://servicios.sbs.gob.pe/VentanillaSBS/Solicitud/ConsultaSoho",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sbs-448297",
      "title": "Obtener constancia de estado pensionario en el Sistema Privado de Pensiones",
      "url": "https://www.gob.pe/631-obtener-constancia-de-estado-pensionario-en-el-sistema-privado-de-pensiones",
      "actionUrl": "http://www.sbs.gob.pe/usuarios/nuestros-servicios/seguimiento-de-tramites/constancia-de-estado-pensionario",
      "category": "Pensiones y Retiro",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sbs-448271",
      "title": "Obtener certificado de pólizas de seguro",
      "url": "https://www.gob.pe/590-obtener-certificado-de-polizas-de-seguro",
      "actionUrl": "http://www.sbs.gob.pe/usuarios/nuestros-servicios/tramites-en-linea/certificado-de-polizas",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sbs-6471460",
      "title": "Tupa SBS",
      "url": "https://www.gob.pe/92868-tupa-sbs",
      "actionUrl": "https://www.gob.pe/92868-tupa-sbs",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sbs-448277",
      "title": "Obtener constancia de depósitos de personas fallecidas",
      "url": "https://www.gob.pe/596-obtener-constancia-de-depositos-de-personas-fallecidas",
      "actionUrl": "https://www.gob.pe/596-obtener-constancia-de-depositos-de-personas-fallecidas",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sbs-448242",
      "title": "Presentar reclamo ante AFP o empresas de seguros de pensiones",
      "url": "https://www.gob.pe/544-presentar-reclamo-ante-afp-o-empresas-de-seguros-de-pensiones",
      "actionUrl": "https://www.gob.pe/544-presentar-reclamo-ante-afp-o-empresas-de-seguros-de-pensiones",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    },
    {
      "id": "sbs-448298",
      "title": "Rectificar datos de identidad en el Reporte de Deudas",
      "url": "https://www.gob.pe/633-rectificar-datos-de-identidad-en-el-reporte-de-deudas",
      "actionUrl": "http://www.sbs.gob.pe/usuarios/nuestros-servicios/seguimiento-de-tramites/rectificacion-de-datos-de-identidad-en-el-reporte-de-deudas-sbs",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/063/007/campaign_Banner-gob-Individual.jpg.jpeg"
    }
  ],
  "SMV": [
    {
      "id": "smv-987097",
      "title": "Acceder al sistema de información del Mercado de Valores y Fondos Colectivos",
      "url": "https://www.gob.pe/9770-acceder-al-sistema-de-informacion-del-mercado-de-valores-y-fondos-colectivos",
      "actionUrl": "https://www.smv.gob.pe/SIMV/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png"
    },
    {
      "id": "smv-6134758",
      "title": "Información Financiera de Otras Entidades del Mercado de Valores",
      "url": "https://www.gob.pe/85091-informacion-financiera-de-otras-entidades-del-mercado-de-valores",
      "actionUrl": "https://www.gob.pe/85091-informacion-financiera-de-otras-entidades-del-mercado-de-valores",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png"
    },
    {
      "id": "smv-5991823",
      "title": "Modelo de Prevención de Delitos",
      "url": "https://www.gob.pe/82660-modelo-de-prevencion-de-delitos",
      "actionUrl": "https://www.gob.pe/82660-modelo-de-prevencion-de-delitos",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png"
    },
    {
      "id": "smv-898207",
      "title": "Acceder al sistema MVNET y SMV Virtual",
      "url": "https://www.gob.pe/9599-acceder-al-sistema-mvnet-y-smv-virtual",
      "actionUrl": "https://mvnet.smv.gob.pe/mvnet/Autenticacion/frmInicio.aspx#",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png"
    },
    {
      "id": "smv-6132617",
      "title": "Información Financiera de Emisores",
      "url": "https://www.gob.pe/85076-informacion-financiera-de-emisores",
      "actionUrl": "https://www.gob.pe/85076-informacion-financiera-de-emisores",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png"
    },
    {
      "id": "smv-6086256",
      "title": "Diviértete y Juega con la SMV",
      "url": "https://www.gob.pe/84247-diviertete-y-juega-con-la-smv",
      "actionUrl": "http://stringnetlab.com/juego-memoria/juego",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png"
    },
    {
      "id": "smv-6067030",
      "title": "Mercado Alternativo de Valores",
      "url": "https://www.gob.pe/82759-mercado-alternativo-de-valores",
      "actionUrl": "https://www.gob.pe/82759-mercado-alternativo-de-valores",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png"
    },
    {
      "id": "smv-6134112",
      "title": "Información Financiera de Sociedades Agentes de Bolsa (SAB)",
      "url": "https://www.gob.pe/85087-informacion-financiera-de-sociedades-agentes-de-bolsa-sab",
      "actionUrl": "https://www.gob.pe/85087-informacion-financiera-de-sociedades-agentes-de-bolsa-sab",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png"
    },
    {
      "id": "smv-6084691",
      "title": "Inscríbase al Programa de especialización en Mercado de Valores",
      "url": "https://www.gob.pe/84211-inscribase-al-programa-de-especializacion-en-mercado-de-valores",
      "actionUrl": "https://www.smv.gob.pe/PEMV/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png"
    },
    {
      "id": "smv-5647705",
      "title": "Acceder al servicio de Orientación y Educación de la SMV",
      "url": "https://www.gob.pe/74782-acceder-al-servicio-de-orientacion-y-educacion-de-la-smv",
      "actionUrl": "https://www.smv.gob.pe/OrientacionyEducacion/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png"
    },
    {
      "id": "smv-6132239",
      "title": "Hechos de Importancia por tipo de supervisado",
      "url": "https://www.gob.pe/85071-hechos-de-importancia-por-tipo-de-supervisado",
      "actionUrl": "https://www.gob.pe/85071-hechos-de-importancia-por-tipo-de-supervisado",
      "category": "Pasaportes y Control Migratorio",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png"
    },
    {
      "id": "smv-6084698",
      "title": "Recomendaciones que usted debe tener presente al invertir en el Mercado de Valores",
      "url": "https://www.gob.pe/84212-recomendaciones-que-usted-debe-tener-presente-al-invertir-en-el-mercado-de-valores",
      "actionUrl": "https://www.gob.pe/84212-recomendaciones-que-usted-debe-tener-presente-al-invertir-en-el-mercado-de-valores",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png"
    },
    {
      "id": "smv-6084652",
      "title": "Fondos Colectivos",
      "url": "https://www.gob.pe/84145-fondos-colectivos",
      "actionUrl": "https://www.gob.pe/84145-fondos-colectivos",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png"
    },
    {
      "id": "smv-6084647",
      "title": "Emisores",
      "url": "https://www.gob.pe/84112-emisores",
      "actionUrl": "https://www.gob.pe/84112-emisores",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png"
    },
    {
      "id": "smv-3330906",
      "title": "Verificar autenticidad de documentos emitidos por las entidades del Estado",
      "url": "https://www.gob.pe/35990-superintendencia-del-mercado-de-valores-verificar-autenticidad-de-documentos-emitidos-por-las-entidades-del-estado",
      "actionUrl": "https://www.smv.gob.pe/Verifica-cvd/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png"
    },
    {
      "id": "smv-7333599",
      "title": "Verifique los certificados de capacitación",
      "url": "https://www.gob.pe/110619-verifique-los-certificados-de-capacitacion",
      "actionUrl": "https://www.smv.gob.pe/IGOEF/",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png"
    },
    {
      "id": "smv-6131071",
      "title": "Hechos de importancia del Día",
      "url": "https://www.gob.pe/85070-hechos-de-importancia-del-dia",
      "actionUrl": "https://www.smv.gob.pe/SIMV/Frm_hechosdeImportanciaDia?data=38C2EC33FA106691BB5B5039DACFDF50795D8EC3AF",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png"
    },
    {
      "id": "smv-6090675",
      "title": "Gobierno Corporativo",
      "url": "https://www.gob.pe/84283-gobierno-corporativo",
      "actionUrl": "https://www.gob.pe/84283-gobierno-corporativo",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png"
    },
    {
      "id": "smv-6087152",
      "title": "Ingresar a la feria virtual de la Superintendencia del Mercado de Valores",
      "url": "https://www.gob.pe/84250-ingresar-a-la-feria-virtual-de-la-superintendencia-del-mercado-de-valores",
      "actionUrl": "https://www.smv.gob.pe/SIMV/feriavirtual/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png"
    },
    {
      "id": "smv-3189719",
      "title": "Acceder a las normas de regulación del mercado de valores",
      "url": "https://www.gob.pe/20826-acceder-a-las-normas-de-regulacion-del-mercado-de-valores",
      "actionUrl": "https://www.smv.gob.pe/ServicioConsultaNormas/Frm_sil_avanzada1?data=25AF5F241B31A9BA161EC316039E84722EAC38B028",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/130/406/campaign_BANNER_SEMANA_INTEGRIDAD.png"
    }
  ],
  "PNP": [
    {
      "id": "pnp-1099748",
      "title": "Denunciar pérdida o robo de documentos - Denuncia Policial Digital",
      "url": "https://www.gob.pe/11155-denunciar-perdida-o-robo-de-documentos-denuncia-policial-digital",
      "actionUrl": "https://sistemas.policia.gob.pe/denuncias_digitales/",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg"
    },
    {
      "id": "pnp-448325",
      "title": "Postula a la Escuela de Oficiales de la Policía Nacional del Perú",
      "url": "https://www.gob.pe/712-postula-a-la-escuela-de-oficiales-de-la-policia-nacional-del-peru",
      "actionUrl": "https://www.gob.pe/712-postula-a-la-escuela-de-oficiales-de-la-policia-nacional-del-peru",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 497.40",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg"
    },
    {
      "id": "pnp-448156",
      "title": "Certificado de antecedentes policiales para viaje o uso en el extranjero",
      "url": "https://www.gob.pe/324-certificado-de-antecedentes-policiales-para-viaje-o-uso-en-el-extranjero",
      "actionUrl": "https://www.gob.pe/324-certificado-de-antecedentes-policiales-para-viaje-o-uso-en-el-extranjero",
      "category": "Identidad y Certificados",
      "costo": "S/ 8.50",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg"
    },
    {
      "id": "pnp-5410703",
      "title": "Postula a las convocatorias CAS de la Policía Nacional del Perú",
      "url": "https://www.gob.pe/70267-postula-a-las-convocatorias-cas-de-la-policia-nacional-del-peru",
      "actionUrl": "https://www.gob.pe/es/o/49316",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg"
    },
    {
      "id": "pnp-448437",
      "title": "Ubicar la comisaría más cercana",
      "url": "https://www.gob.pe/912-ubicar-la-comisaria-mas-cercana",
      "actionUrl": "https://aplicaciones.mininter.gob.pe/ubicatucomisaria/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg"
    },
    {
      "id": "pnp-5591310",
      "title": "Postular a las Escuelas de Educación Superior Técnica Profesional de la Policía Nacional del Perú",
      "url": "https://www.gob.pe/70333-postular-a-las-escuelas-de-educacion-superior-tecnica-profesional-de-la-policia-nacional-del-peru",
      "actionUrl": "https://www.gob.pe/70333-postular-a-las-escuelas-de-educacion-superior-tecnica-profesional-de-la-policia-nacional-del-peru",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 22.80",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg"
    },
    {
      "id": "pnp-448191",
      "title": "Multas de tránsito",
      "url": "https://www.gob.pe/416-multas-de-transito",
      "actionUrl": "https://www.gob.pe/416-multas-de-transito",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg"
    },
    {
      "id": "pnp-448148",
      "title": "Certificado de Mudanza",
      "url": "https://www.gob.pe/302-certificado-de-mudanza",
      "actionUrl": "https://www.gob.pe/302-certificado-de-mudanza",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg"
    },
    {
      "id": "pnp-5156654",
      "title": "Reporta incidentes y delitos mediante la aplicación Mi Policía Digital",
      "url": "https://www.gob.pe/66396-reporta-incidentes-y-delitos-mediante-la-aplicacion-mi-policia-digital",
      "actionUrl": "https://www.gob.pe/66396-reporta-incidentes-y-delitos-mediante-la-aplicacion-mi-policia-digital",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg"
    },
    {
      "id": "pnp-3889438",
      "title": "Solicitar pase laboral",
      "url": "https://www.gob.pe/8783-solicitar-pase-laboral",
      "actionUrl": "https://paselaboral.servicios.gob.pe/",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg"
    },
    {
      "id": "pnp-448149",
      "title": "Certificado de Supervivencia",
      "url": "https://www.gob.pe/303-certificado-de-supervivencia",
      "actionUrl": "https://www.gob.pe/303-certificado-de-supervivencia",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg"
    },
    {
      "id": "pnp-5156723",
      "title": "Recibir notificaciones, consultar el legajo personal y pago de planillas para miembros de la PNP desde el celular",
      "url": "https://www.gob.pe/66398-recibir-notificaciones-consultar-el-legajo-personal-y-pago-de-planillas-para-miembros-de-la-pnp-desde-el-celular",
      "actionUrl": "https://www.gob.pe/66398-recibir-notificaciones-consultar-el-legajo-personal-y-pago-de-planillas-para-miembros-de-la-pnp-desde-el-celular",
      "category": "Pagos de Tasas y Servicios",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg"
    },
    {
      "id": "pnp-5156651",
      "title": "Consultar y registrar información de operativos policiales en la aplicación Súper Búho",
      "url": "https://www.gob.pe/66397-consultar-y-registrar-informacion-de-operativos-policiales-en-la-aplicacion-super-buho",
      "actionUrl": "https://www.gob.pe/66397-consultar-y-registrar-informacion-de-operativos-policiales-en-la-aplicacion-super-buho",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg"
    },
    {
      "id": "pnp-5156737",
      "title": "Acceder a apoyo tecnológico para policías mediante la aplicación Servicio Policial (Serpol)",
      "url": "https://www.gob.pe/66399-acceder-a-apoyo-tecnologico-para-policias-mediante-la-aplicacion-servicio-policial-serpol",
      "actionUrl": "https://www.gob.pe/66399-acceder-a-apoyo-tecnologico-para-policias-mediante-la-aplicacion-servicio-policial-serpol",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg"
    },
    {
      "id": "pnp-1200566",
      "title": "Usos autorizados de autos particulares durante estado de emergencia",
      "url": "https://www.gob.pe/9123-usos-autorizados-de-autos-particulares-durante-estado-de-emergencia",
      "actionUrl": "https://www.gob.pe/9123-usos-autorizados-de-autos-particulares-durante-estado-de-emergencia",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg"
    },
    {
      "id": "pnp-642140",
      "title": "Solicitar pase vehicular distrital",
      "url": "https://www.gob.pe/9121-solicitar-pase-vehicular-distrital",
      "actionUrl": "https://www.gob.pe/9121-solicitar-pase-vehicular-distrital",
      "category": "Registros de Bienes y Propiedad",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/030/529/campaign_PORTADAS_WEB_EXTORSION_-grande.jpg"
    }
  ],
  "INPE": [
    {
      "id": "inpe-448150",
      "title": "Solicitar Antecedentes Judiciales",
      "url": "https://www.gob.pe/305-solicitar-antecedentes-judiciales",
      "actionUrl": "https://apps.inpe.gob.pe/certificado_aj_electronico/registroCE.html",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 37.70",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png"
    },
    {
      "id": "inpe-4862325",
      "title": "Consultar registro de visitas de las entidades del Estado peruano",
      "url": "https://www.gob.pe/59202-instituto-nacional-penitenciario-consultar-registro-de-visitas-de-las-entidades-del-estado-peruano",
      "actionUrl": "https://visitas.servicios.gob.pe/consultas/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png"
    },
    {
      "id": "inpe-877022",
      "title": "Acceder a datos estadísticos del INPE",
      "url": "https://www.gob.pe/9625-acceder-a-datos-estadisticos-del-inpe",
      "actionUrl": "https://siep.inpe.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png"
    },
    {
      "id": "inpe-7375326",
      "title": "Postular al Centro Nacional de Estudios Criminológicos y Penitenciarios del Perú (CENECP)",
      "url": "https://www.gob.pe/9863-postular-al-centro-nacional-de-estudios-criminologicos-y-penitenciarios-del-peru-cenecp",
      "actionUrl": "https://www.gob.pe/9863-postular-al-centro-nacional-de-estudios-criminologicos-y-penitenciarios-del-peru-cenecp",
      "category": "Educación, Becas y Títulos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png"
    },
    {
      "id": "inpe-881072",
      "title": "Obtener certificado de conducta",
      "url": "https://www.gob.pe/9659-obtener-certificado-de-conducta",
      "actionUrl": "https://www.gob.pe/9659-obtener-certificado-de-conducta",
      "category": "Identidad y Certificados",
      "costo": "S/ 6.00",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png"
    },
    {
      "id": "inpe-3275615",
      "title": "Sistema Penitenciario Nacional",
      "url": "https://www.gob.pe/27654-sistema-penitenciario-nacional",
      "actionUrl": "https://www.gob.pe/9625",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png"
    },
    {
      "id": "inpe-1184993",
      "title": "Programas especializados de Medio Libre",
      "url": "https://www.gob.pe/10955-programas-especializados-de-medio-libre",
      "actionUrl": "https://www.gob.pe/10955-programas-especializados-de-medio-libre",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png"
    },
    {
      "id": "inpe-1021719",
      "title": "Solicitar autorización de asistencia religiosa a los establecimientos penitenciarios",
      "url": "https://www.gob.pe/9836-solicitar-autorizacion-de-asistencia-religiosa-a-los-establecimientos-penitenciarios",
      "actionUrl": "https://www.gob.pe/9836-solicitar-autorizacion-de-asistencia-religiosa-a-los-establecimientos-penitenciarios",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png"
    },
    {
      "id": "inpe-1145683",
      "title": "Solicitar constancia de liberado",
      "url": "https://www.gob.pe/9824-solicitar-constancia-de-liberado",
      "actionUrl": "https://www.gob.pe/9824-solicitar-constancia-de-liberado",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 6.30",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png"
    },
    {
      "id": "inpe-877017",
      "title": "Cárceles Productivas",
      "url": "https://www.gob.pe/9624-carceles-productivas",
      "actionUrl": "https://www.gob.pe/9625",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png"
    },
    {
      "id": "inpe-3041405",
      "title": "Modelo de integridad en el Instituto Nacional Penitenciario",
      "url": "https://www.gob.pe/30356-modelo-de-integridad-en-el-instituto-nacional-penitenciario",
      "actionUrl": "https://www.gob.pe/30356-modelo-de-integridad-en-el-instituto-nacional-penitenciario",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png"
    },
    {
      "id": "inpe-3516988",
      "title": "Declaración de Política Institucional 2023",
      "url": "https://www.gob.pe/38226-declaracion-de-politica-institucional-2023",
      "actionUrl": "https://www.gob.pe/38226-declaracion-de-politica-institucional-2023",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png"
    },
    {
      "id": "inpe-1021656",
      "title": "Inscribir a una institución como unidad beneficiaria para recibir sentenciados a prestación de servicios comunitarios",
      "url": "https://www.gob.pe/9654-inscribir-a-una-institucion-como-unidad-beneficiaria-para-recibir-sentenciados-a-prestacion-de-servicios-comunitarios",
      "actionUrl": "https://www.gob.pe/9654-inscribir-a-una-institucion-como-unidad-beneficiaria-para-recibir-sentenciados-a-prestacion-de-servicios-comunitarios",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png"
    },
    {
      "id": "inpe-1021718",
      "title": "Renovar autorización de asistencia religiosa a los establecimientos penitenciarios",
      "url": "https://www.gob.pe/10645-renovar-autorizacion-de-asistencia-religiosa-a-los-establecimientos-penitenciarios",
      "actionUrl": "https://www.gob.pe/10645-renovar-autorizacion-de-asistencia-religiosa-a-los-establecimientos-penitenciarios",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png"
    },
    {
      "id": "inpe-1123059",
      "title": "Solicitar acceso a la información pública",
      "url": "https://www.gob.pe/9935-instituto-nacional-penitenciario-acceder-a-la-informacion-publica-del-instituto-nacional-penitenciario",
      "actionUrl": "https://mesadepartes.inpe.gob.pe/",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png"
    },
    {
      "id": "inpe-2323903",
      "title": "Denunciar un presunto acto de corrupción",
      "url": "https://www.gob.pe/9652-instituto-nacional-penitenciario-denunciar-un-acto-de-corrupcion-en-el-instituto-nacional-penitenciario-inpe",
      "actionUrl": "https://denuncias.servicios.gob.pe/?gobpe_id=73",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png"
    },
    {
      "id": "inpe-3004387",
      "title": "Consultar registro de visitas de las entidades del Estado peruano",
      "url": "https://www.gob.pe/29451-instituto-nacional-penitenciario-consultar-registro-de-visitas-de-las-entidades-del-estado-peruano",
      "actionUrl": "https://www.transparencia.gob.pe/reportes_directos/pte_transparencia_reg_visitas.aspx?id_entidad=182&ver=&id_tema=500#.YlQmnudBxPY",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png"
    },
    {
      "id": "inpe-880890",
      "title": "Presentar un reclamo ante una entidad pública",
      "url": "https://www.gob.pe/9769-instituto-nacional-penitenciario-acceder-al-libro-de-reclamaciones-del-inpe",
      "actionUrl": "https://reclamos.servicios.gob.pe/?institution_id=95",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/227/campaign_INPE_EN_MEDIOS_2___1_.png"
    }
  ],
  "MPFN": [
    {
      "id": "mpfn-1211369",
      "title": "Consultar estado de denuncias en el Ministerio Público",
      "url": "https://www.gob.pe/11325-consultar-estado-de-denuncias-en-el-ministerio-publico",
      "actionUrl": "https://portal.mpfn.gob.pe/seguimiento-de-denuncias",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png"
    },
    {
      "id": "mpfn-893306",
      "title": "Consultar si una persona ha sido detenida",
      "url": "https://www.gob.pe/9703-consultar-si-una-persona-ha-sido-detenida",
      "actionUrl": "https://portal.mpfn.gob.pe/consultarena",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png"
    },
    {
      "id": "mpfn-1211373",
      "title": "Presentar denuncia ante el Ministerio Público",
      "url": "https://www.gob.pe/11324-presentar-denuncia-ante-el-ministerio-publico",
      "actionUrl": "https://portal.mpfn.gob.pe/denuncias-en-linea",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png"
    },
    {
      "id": "mpfn-2864717",
      "title": "Delitos contra la administración pública (delitos de corrupción)",
      "url": "https://www.gob.pe/27097-delitos-contra-la-administracion-publica-delitos-de-corrupcion",
      "actionUrl": "https://www.gob.pe/27097-delitos-contra-la-administracion-publica-delitos-de-corrupcion",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png"
    },
    {
      "id": "mpfn-4931919",
      "title": "Acceder a la casilla fiscal electrónica del Ministerio Público",
      "url": "https://www.gob.pe/61729-acceder-a-la-casilla-fiscal-electronica-del-ministerio-publico",
      "actionUrl": "https://cfe.mpfn.gob.pe/casilla-fiscal-electronica/security/login",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png"
    },
    {
      "id": "mpfn-3109147",
      "title": "Medidas de protección hacia las víctimas de violencia",
      "url": "https://www.gob.pe/32126-medidas-de-proteccion-hacia-las-victimas-de-violencia",
      "actionUrl": "https://www.gob.pe/32126-medidas-de-proteccion-hacia-las-victimas-de-violencia",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png"
    },
    {
      "id": "mpfn-2806145",
      "title": "Suplantación de identidad",
      "url": "https://www.gob.pe/25712-suplantacion-de-identidad",
      "actionUrl": "https://www.gob.pe/25712-suplantacion-de-identidad",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png"
    },
    {
      "id": "mpfn-3015903",
      "title": "Delitos contra el honor",
      "url": "https://www.gob.pe/29830-delitos-contra-el-honor",
      "actionUrl": "https://www.gob.pe/29830-delitos-contra-el-honor",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png"
    },
    {
      "id": "mpfn-2790642",
      "title": "¿Qué es la trata de personas?",
      "url": "https://www.gob.pe/25487-que-es-la-trata-de-personas",
      "actionUrl": "https://www.gob.pe/25487-que-es-la-trata-de-personas",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png"
    },
    {
      "id": "mpfn-2645498",
      "title": "¿Qué es el Ministerio Público - Fiscalía de la Nación?",
      "url": "https://www.gob.pe/23554-que-es-el-ministerio-publico-fiscalia-de-la-nacion",
      "actionUrl": "https://www.gob.pe/23554-que-es-el-ministerio-publico-fiscalia-de-la-nacion",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png"
    },
    {
      "id": "mpfn-2953800",
      "title": "Delitos contra la voluntad popular",
      "url": "https://www.gob.pe/28311-delitos-contra-la-voluntad-popular",
      "actionUrl": "https://www.gob.pe/28311-delitos-contra-la-voluntad-popular",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png"
    },
    {
      "id": "mpfn-6918691",
      "title": "Si estacionas en zona rígida, tu carro será multado y removido al depósito sin excepción.",
      "url": "https://www.gob.pe/102364-si-estacionas-en-zona-rigida-tu-carro-sera-multado-y-removido-al-deposito-sin-excepcion",
      "actionUrl": "https://www.gob.pe/102364-si-estacionas-en-zona-rigida-tu-carro-sera-multado-y-removido-al-deposito-sin-excepcion",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png"
    },
    {
      "id": "mpfn-2492509",
      "title": "El Ministerio Público – Fiscalía de la Nación",
      "url": "https://www.gob.pe/22419-el-ministerio-publico-fiscalia-de-la-nacion",
      "actionUrl": "https://www.gob.pe/22419-el-ministerio-publico-fiscalia-de-la-nacion",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png"
    },
    {
      "id": "mpfn-3257244",
      "title": "Falsedad ideológica, genérica y otros delitos",
      "url": "https://www.gob.pe/34581-falsedad-ideologica-generica-y-otros-delitos",
      "actionUrl": "https://www.gob.pe/34581-falsedad-ideologica-generica-y-otros-delitos",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png"
    },
    {
      "id": "mpfn-947226",
      "title": "Presentar quejas a la actuación fiscal",
      "url": "https://www.gob.pe/9993-presentar-quejas-a-la-actuacion-fiscal",
      "actionUrl": "https://www.gob.pe/9992-acceder-a-la-mesa-de-partes-electronica-del-distrito-fiscal-de-lima-centro",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png"
    },
    {
      "id": "mpfn-2825961",
      "title": "Accidentes de tránsito",
      "url": "https://www.gob.pe/26039-accidentes-de-transito",
      "actionUrl": "https://www.gob.pe/26039-accidentes-de-transito",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png"
    },
    {
      "id": "mpfn-3320667",
      "title": "El bullying",
      "url": "https://www.gob.pe/35880-el-bullying",
      "actionUrl": "https://www.gob.pe/35880-el-bullying",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png"
    },
    {
      "id": "mpfn-2845331",
      "title": "Maltrato infantil",
      "url": "https://www.gob.pe/26595-maltrato-infantil",
      "actionUrl": "https://www.gob.pe/26595-maltrato-infantil",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png"
    },
    {
      "id": "mpfn-2726594",
      "title": "Tráfico ilícito de drogas (TID)",
      "url": "https://www.gob.pe/24121-trafico-ilicito-de-drogas-tid",
      "actionUrl": "https://www.gob.pe/24121-trafico-ilicito-de-drogas-tid",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png"
    },
    {
      "id": "mpfn-4160204",
      "title": "Programa de Protección y Asistencia a Víctimas y Testigos",
      "url": "https://www.gob.pe/47892-programa-de-proteccion-y-asistencia-a-victimas-y-testigos",
      "actionUrl": "https://www.gob.pe/47892-programa-de-proteccion-y-asistencia-a-victimas-y-testigos",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/140/592/campaign_Portada-web.png"
    }
  ],
  "MINJUSDH": [
    {
      "id": "minjusdh-1718818",
      "title": "Acceder al Sistema Peruano de Información Jurídica (SPIJ)",
      "url": "https://www.gob.pe/748-acceder-al-sistema-peruano-de-informacion-juridica-spij",
      "actionUrl": "https://spij.minjus.gob.pe/spij-ext-web/#/inicio",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg"
    },
    {
      "id": "minjusdh-448252",
      "title": "Obtener asesoría legal gratis en los Centros de Asistencia Legal Gratuita (Alegra)",
      "url": "https://www.gob.pe/562-obtener-asesoria-legal-gratis-en-los-centros-de-asistencia-legal-gratuita-alegra",
      "actionUrl": "https://www.gob.pe/562-obtener-asesoria-legal-gratis-en-los-centros-de-asistencia-legal-gratuita-alegra",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg"
    },
    {
      "id": "minjusdh-1660429",
      "title": "Conciliación extrajudicial",
      "url": "https://www.gob.pe/13935-conciliacion-extrajudicial",
      "actionUrl": "https://www.gob.pe/11211-acceder-a-la-mesa-de-partes-virtual-del-minjusdh",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 44",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg"
    },
    {
      "id": "minjusdh-448378",
      "title": "Inscripción en el Registro Único de Víctimas (RUV)",
      "url": "https://www.gob.pe/790-inscripcion-en-el-registro-unico-de-victimas-ruv",
      "actionUrl": "https://www.gob.pe/790-inscripcion-en-el-registro-unico-de-victimas-ruv",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg"
    },
    {
      "id": "minjusdh-448382",
      "title": "Inscribirte como conciliador extrajudicial acreditado",
      "url": "https://www.gob.pe/794-inscribirte-como-conciliador-extrajudicial-acreditado",
      "actionUrl": "https://www.gob.pe/794-inscribirte-como-conciliador-extrajudicial-acreditado",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 181.10",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg"
    },
    {
      "id": "minjusdh-1665531",
      "title": "Presentar apelación al Tribunal de Transparencia y Acceso a la Información Pública (TTAIP)",
      "url": "https://www.gob.pe/13540-presentar-apelacion-al-tribunal-de-transparencia-y-acceso-a-la-informacion-publica-ttaip",
      "actionUrl": "https://sgd.minjus.gob.pe/sgd-virtual/public/ciudadano/ciudadanoMain.xhtml",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg"
    },
    {
      "id": "minjusdh-1687738",
      "title": "Solicitar conciliación extrajudicial virtual al Minjusdh",
      "url": "https://www.gob.pe/14455-solicitar-conciliacion-extrajudicial-virtual-al-minjusdh",
      "actionUrl": "https://sgd.minjus.gob.pe/sgd-virtual/public/ciudadano/ciudadanoMain.xhtml",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg"
    },
    {
      "id": "minjusdh-448372",
      "title": "Acceder a la lista de abogados sancionados por mala práctica profesional",
      "url": "https://www.gob.pe/783-acceder-a-la-lista-de-abogados-sancionados-por-mala-practica-profesional",
      "actionUrl": "https://rnas.minjus.gob.pe/rnas/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg"
    },
    {
      "id": "minjusdh-1414837",
      "title": "Registro de Entidades Religiosas (RER)",
      "url": "https://www.gob.pe/12370-registro-de-entidades-religiosas-rer",
      "actionUrl": "https://www.gob.pe/12370-registro-de-entidades-religiosas-rer",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg"
    },
    {
      "id": "minjusdh-1313317",
      "title": "Consultar en el Registro Nacional de Búsqueda de Personas Desaparecidas (RENADE)",
      "url": "https://www.gob.pe/12547-consultar-en-el-registro-nacional-de-busqueda-de-personas-desaparecidas-renade",
      "actionUrl": "https://renade.minjus.gob.pe/renade/public/seguimientoPublico/seguimientoPublicoMain.xhtml",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg"
    },
    {
      "id": "minjusdh-2426788",
      "title": "Autorización de funcionamiento de centro de conciliación",
      "url": "https://www.gob.pe/21811-autorizacion-de-funcionamiento-de-centro-de-conciliacion",
      "actionUrl": "https://www.gob.pe/21811-autorizacion-de-funcionamiento-de-centro-de-conciliacion",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg"
    },
    {
      "id": "minjusdh-4120999",
      "title": "Conocer la ubicación de las Sedes de Defensa Pública a Nivel Nacional",
      "url": "https://www.gob.pe/47080-conocer-la-ubicacion-de-las-sedes-de-defensa-publica-a-nivel-nacional",
      "actionUrl": "https://www.google.com/maps/d/u/0/viewer?hl=es-419&mid=1KaTSqpscDiwihTrj_yaf-ubfF-MNyZQ&ll=-12.055215199999994%2C-77.1308114&z=8",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg"
    },
    {
      "id": "minjusdh-4103063",
      "title": "Conocer el Catálogo de Servicios del Ministerio de Justicia y Derechos Humanos",
      "url": "https://www.gob.pe/47265-conocer-el-catalogo-de-servicios-del-ministerio-de-justicia-y-derechos-humanos",
      "actionUrl": "https://www.gob.pe/institucion/minjus/informes-publicaciones/6860256-catalogo-de-servicios-del-ministerio-de-justicia-y-derechos-humanos-2025",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg"
    },
    {
      "id": "minjusdh-2087143",
      "title": "Postular a fedatario juramentado con especialización en informática",
      "url": "https://www.gob.pe/14611-postular-a-fedatario-juramentado-con-especializacion-en-informatica",
      "actionUrl": "https://www.gob.pe/14611-postular-a-fedatario-juramentado-con-especializacion-en-informatica",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg"
    },
    {
      "id": "minjusdh-2355281",
      "title": "Salas TTAIP",
      "url": "https://www.gob.pe/13060-salas-ttaip",
      "actionUrl": "https://www.gob.pe/13060-salas-ttaip",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg"
    },
    {
      "id": "minjusdh-1744819",
      "title": "Recursos por la vulneración de tu derecho a la información pública",
      "url": "https://www.gob.pe/13539-recursos-por-la-vulneracion-de-tu-derecho-a-la-informacion-publica",
      "actionUrl": "https://www.gob.pe/13539-recursos-por-la-vulneracion-de-tu-derecho-a-la-informacion-publica",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg"
    },
    {
      "id": "minjusdh-1832138",
      "title": "Consultar el Registro Nacional de Fedatarios Juramentados con Especialización en Informática",
      "url": "https://www.gob.pe/15048-consultar-el-registro-nacional-de-fedatarios-juramentados-con-especializacion-en-informatica",
      "actionUrl": "https://fedatario.minjus.gob.pe/fedatario/public/consulta/registro/registroMain.xhtml",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg"
    },
    {
      "id": "minjusdh-448377",
      "title": "Programa de Reparación de Víctimas en Educación",
      "url": "https://www.gob.pe/789-programa-de-reparacion-de-victimas-en-educacion",
      "actionUrl": "https://cman.minjus.gob.pe/programa-de-reparaciones-en-educacion-2/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg"
    },
    {
      "id": "minjusdh-3892425",
      "title": "Reparaciones a víctimas de la violencia ocurrida en el periodo de 1980 a 2000",
      "url": "https://www.gob.pe/44153-reparaciones-a-victimas-de-la-violencia-ocurrida-en-el-periodo-de-1980-a-2000",
      "actionUrl": "https://www.gob.pe/44153-reparaciones-a-victimas-de-la-violencia-ocurrida-en-el-periodo-de-1980-a-2000",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg"
    },
    {
      "id": "minjusdh-1527292",
      "title": "Programa de Reparaciones en Educación",
      "url": "https://www.gob.pe/12729-programa-de-reparaciones-en-educacion",
      "actionUrl": "https://www.gob.pe/12729-programa-de-reparaciones-en-educacion",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/103/568/campaign_zoom_dra_paola.jpg"
    }
  ],
  "DEFENSORIA": [
    {
      "id": "defensoria-914947",
      "title": "Conocer los conflictos sociales activos o latentes en el Perú",
      "url": "https://www.gob.pe/9894-conocer-los-conflictos-sociales-activos-o-latentes-en-el-peru",
      "actionUrl": "http://www.defensoria.gob.pe/mapa-de-conflictos-sociales/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png"
    },
    {
      "id": "defensoria-964354",
      "title": "Presentar queja ante la Defensoría del Pueblo",
      "url": "https://www.gob.pe/10179-presentar-queja-ante-la-defensoria-del-pueblo",
      "actionUrl": "https://apps2.defensoria.gob.pe/sidPublic/",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png"
    },
    {
      "id": "defensoria-964302",
      "title": "Consultar el estado de tu caso en la Defensoría del Pueblo",
      "url": "https://www.gob.pe/10466-consultar-el-estado-de-tu-caso-en-la-defensoria-del-pueblo",
      "actionUrl": "https://apps2.defensoria.gob.pe/sidPublic/acceso.jsp",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png"
    },
    {
      "id": "defensoria-1159944",
      "title": "Derecho a la movilización pública",
      "url": "https://www.gob.pe/11498-derecho-a-la-movilizacion-publica",
      "actionUrl": "https://apps2.defensoria.gob.pe/sidPublic/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png"
    },
    {
      "id": "defensoria-1048381",
      "title": "Grupos de especial protección de la Defensoría del Pueblo",
      "url": "https://www.gob.pe/10367-grupos-de-especial-proteccion-de-la-defensoria-del-pueblo",
      "actionUrl": "https://www.gob.pe/10467",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png"
    },
    {
      "id": "defensoria-995350",
      "title": "Acceder al chat de la Defensoría del Pueblo",
      "url": "https://www.gob.pe/10467-acceder-al-chat-de-la-defensoria-del-pueblo",
      "actionUrl": "https://www.defensoria.gob.pe/chat3/livehelp.php?connect_user=1&try=0&scriptname=user_chat&department=1&cslheg=1&serversession=1",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png"
    },
    {
      "id": "defensoria-952078",
      "title": "Acceder a la muestra fotográfica Yuyanapaq. Para Recordar",
      "url": "https://www.gob.pe/10133-acceder-a-la-muestra-fotografica-yuyanapaq-para-recordar",
      "actionUrl": "https://www.gob.pe/10432",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png"
    },
    {
      "id": "defensoria-951955",
      "title": "Centro de Información de la Defensoría del Pueblo",
      "url": "https://www.gob.pe/9897-centro-de-informacion-de-la-defensoria-del-pueblo",
      "actionUrl": "https://www.gob.pe/10432",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png"
    },
    {
      "id": "defensoria-952016",
      "title": "Acceder al archivo de la Defensoría del Pueblo",
      "url": "https://www.gob.pe/10438-acceder-al-archivo-de-la-defensoria-del-pueblo",
      "actionUrl": "http://www.cinfodefensoria.pe/archivo/items/browse",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png"
    },
    {
      "id": "defensoria-951874",
      "title": "Acceder a la biblioteca virtual de la Defensoría del Pueblo",
      "url": "https://www.gob.pe/10432-acceder-a-la-biblioteca-virtual-de-la-defensoria-del-pueblo",
      "actionUrl": "http://www.cinfodefensoria.pe/catalogo/opac_css/index.php?lvl=index",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png"
    },
    {
      "id": "defensoria-919566",
      "title": "Conocer las intervenciones de la Defensoría del Pueblo ante emergencias y desastres",
      "url": "https://www.gob.pe/9896-conocer-las-intervenciones-de-la-defensoria-del-pueblo-ante-emergencias-y-desastres",
      "actionUrl": "https://www.defensoria.gob.pe/mapas/public/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png"
    },
    {
      "id": "defensoria-964318",
      "title": "Acceder a mesa de partes",
      "url": "https://www.gob.pe/10162-defensoria-del-pueblo-acceder-a-mesa-de-partes",
      "actionUrl": "https://sgd.defensoria.gob.pe/TramiteVirtual/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/033/638/campaign_LOGO-RECOMPENSA.png"
    }
  ],
  "ONP": [
    {
      "id": "onp-5121532",
      "title": "Cronograma de pago del pensionista",
      "url": "https://www.gob.pe/10952-cronograma-de-pago-del-pensionista",
      "actionUrl": "https://www.gob.pe/10952-cronograma-de-pago-del-pensionista",
      "category": "Pensiones y Retiro",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png"
    },
    {
      "id": "onp-448244",
      "title": "Revisar tus aportes declarados en la ONP",
      "url": "https://www.gob.pe/550-revisar-tus-aportes-declarados-en-la-onp",
      "actionUrl": "https://tuzonasegura.onp.gob.pe",
      "category": "Pasaportes y Control Migratorio",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png"
    },
    {
      "id": "onp-1021714",
      "title": "Consultar constancias de pago de pensiones en la ONP",
      "url": "https://www.gob.pe/10296-consultar-constancias-de-pago-de-pensiones-en-la-onp",
      "actionUrl": "https://tuzonasegura.onp.gob.pe",
      "category": "Pensiones y Retiro",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png"
    },
    {
      "id": "onp-3225027",
      "title": "Aseguramiento facultativo al Sistema Nacional de Pensiones (SNP)",
      "url": "https://www.gob.pe/10286-aseguramiento-facultativo-al-sistema-nacional-de-pensiones-snp",
      "actionUrl": "https://aseguramiento.onp.gob.pe/facultativo/#/inicio/solicitud-incorporacion-SNP",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png"
    },
    {
      "id": "onp-1574970",
      "title": "Solicitar información de aportes a la ONP",
      "url": "https://www.gob.pe/13762-solicitar-informacion-de-aportes-a-la-onp",
      "actionUrl": "https://www.onp.gob.pe/paginas/otrasolicitud.aspx",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png"
    },
    {
      "id": "onp-1021721",
      "title": "Solicitar clave virtual de la Oficina de Normalización Previsional",
      "url": "https://www.gob.pe/10298-solicitar-clave-virtual-de-la-oficina-de-normalizacion-previsional",
      "actionUrl": "https://tuclavevirtual.onp.gob.pe/#/clave-virtual/datos-personales",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png"
    },
    {
      "id": "onp-3761103",
      "title": "Consulta el estado de tu trámite administrativo ante la ONP",
      "url": "https://www.gob.pe/42367-consulta-el-estado-de-tu-tramite-administrativo-ante-la-onp",
      "actionUrl": "https://consultasgd.onp.gob.pe/consultatutramiteonp/inicio.do",
      "category": "Pensiones y Retiro",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png"
    },
    {
      "id": "onp-709593",
      "title": "Solicitar pensión de jubilación según D.L. N° 19990",
      "url": "https://www.gob.pe/9239-solicitar-pension-de-jubilacion-segun-d-l-n-19990",
      "actionUrl": "https://onpvirtual.pe/#/centro-atencion-virtual",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 1",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png"
    },
    {
      "id": "onp-1358089",
      "title": "Solicitar constancia de pensionista o no pensionista",
      "url": "https://www.gob.pe/12420-solicitar-constancia-de-pensionista-o-no-pensionista",
      "actionUrl": "https://www.onp.gob.pe/paginas/otrasolicitud.aspx",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png"
    },
    {
      "id": "onp-1358080",
      "title": "Solicitar bonificación por cuidado permanente D.L. N° 19990",
      "url": "https://www.gob.pe/12417-solicitar-bonificacion-por-cuidado-permanente-d-l-n-19990",
      "actionUrl": "https://www.onp.gob.pe/paginas/otrasolicitud.aspx",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png"
    },
    {
      "id": "onp-448326",
      "title": "Solicitar pensión de viudez D.L. N° 19990",
      "url": "https://www.gob.pe/714-solicitar-pension-de-viudez-d-l-n-19990",
      "actionUrl": "https://onpvirtual.pe/#/centro-atencion-virtual-familiar",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png"
    },
    {
      "id": "onp-1191313",
      "title": "Pagar aporte facultativo al Sistema Nacional de Pensiones",
      "url": "https://www.gob.pe/11926-pagar-aporte-facultativo-al-sistema-nacional-de-pensiones",
      "actionUrl": "https://tuzonasegura.onp.gob.pe/auth/#/login?code=ZSEG",
      "category": "Pensiones y Retiro",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png"
    },
    {
      "id": "onp-895445",
      "title": "Solicitar capital de defunción D.L. N° 19990",
      "url": "https://www.gob.pe/9187-solicitar-capital-de-defuncion-d-l-n-19990",
      "actionUrl": "https://onpvirtual.pe/#/centro-atencion-virtual-familiar",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 1",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png"
    },
    {
      "id": "onp-1812174",
      "title": "Solicitar pensión de jubilación proporcional especial - Ley N° 31301",
      "url": "https://www.gob.pe/14959-solicitar-pension-de-jubilacion-proporcional-especial-ley-n-31301",
      "actionUrl": "https://onpvirtual.pe/#/centro-atencion-virtual",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png"
    },
    {
      "id": "onp-1271227",
      "title": "Acceder al Bono de Reconocimiento (BdR)",
      "url": "https://www.gob.pe/12414-acceder-al-bono-de-reconocimiento-bdr",
      "actionUrl": "https://www.gob.pe/12414-acceder-al-bono-de-reconocimiento-bdr",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png"
    },
    {
      "id": "onp-448330",
      "title": "Solicitar pensión de orfandad D.L. Nº 19990",
      "url": "https://www.gob.pe/718-solicitar-pension-de-orfandad-d-l-n-19990",
      "actionUrl": "https://onpvirtual.pe/#/centro-atencion-virtual-familiar",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png"
    },
    {
      "id": "onp-1388144",
      "title": "Bonificación FONAHPU del Decreto Ley N° 20530",
      "url": "https://www.gob.pe/12859-bonificacion-fonahpu-del-decreto-ley-n-20530",
      "actionUrl": "https://www.gob.pe/12859-bonificacion-fonahpu-del-decreto-ley-n-20530",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png"
    },
    {
      "id": "onp-448231",
      "title": "Consultar importes no cobrados por pensionista fallecida(o)",
      "url": "https://www.gob.pe/518-consultar-importes-no-cobrados-por-pensionista-fallecida-o",
      "actionUrl": "https://www.onp.gob.pe/paginas/otrasolicitud.aspx",
      "category": "Pensiones y Retiro",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png"
    },
    {
      "id": "onp-1404256",
      "title": "Fondo Complementario de Jubilación Minera, Metalúrgica y Siderúrgica (FCJMMS)",
      "url": "https://www.gob.pe/12962-fondo-complementario-de-jubilacion-minera-metalurgica-y-siderurgica-fcjmms",
      "actionUrl": "https://www.gob.pe/12962-fondo-complementario-de-jubilacion-minera-metalurgica-y-siderurgica-fcjmms",
      "category": "Pensiones y Retiro",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png"
    },
    {
      "id": "onp-1811083",
      "title": "Consultar comprobantes de pago del Seguro Complementario de Trabajo de Riesgo (SCTR)",
      "url": "https://www.gob.pe/14658-consultar-comprobantes-de-pago-del-seguro-complementario-de-trabajo-de-riesgo-sctr",
      "actionUrl": "http://see.ebizlatin.com/#/",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/129/413/campaign_Orbi_11_Gob.pe-campa%C3%B1a_ConPdePension.png"
    }
  ],
  "SUNAFIL": [
    {
      "id": "sunafil-927331",
      "title": "Acceder a la casilla electrónica de Sunafil",
      "url": "https://www.gob.pe/10006-acceder-a-la-casilla-electronica-de-sunafil",
      "actionUrl": "https://casillaelectronica.sunafil.gob.pe/si.inbox/Login/SUNAT",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg"
    },
    {
      "id": "sunafil-1163446",
      "title": "Verificar si estás en planilla",
      "url": "https://www.gob.pe/11525-verificar-si-estas-en-planilla",
      "actionUrl": "https://aplicativosweb6.sunafil.gob.pe/si.verificacionPlanillaElectronica",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg"
    },
    {
      "id": "sunafil-927376",
      "title": "Denunciar incumplimientos laborales de una empresa privada",
      "url": "https://www.gob.pe/9972-denunciar-incumplimientos-laborales-de-una-empresa-privada",
      "actionUrl": "https://aplicativosweb2.sunafil.gob.pe/si.denunciasVirtuales",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg"
    },
    {
      "id": "sunafil-933730",
      "title": "Realizar consultas laborales a la Sunafil",
      "url": "https://www.gob.pe/10017-realizar-consultas-laborales-a-la-sunafil",
      "actionUrl": "http://aplicativosweb5.sunafil.gob.pe/si.consultasLaborales/inicio",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg"
    },
    {
      "id": "sunafil-5577444",
      "title": "Acceder a Sunafil en Línea",
      "url": "https://www.gob.pe/73521-acceder-a-sunafil-en-linea",
      "actionUrl": "https://aplicativosweb7.sunafil.gob.pe/si.sunafilLinea/#/consulta",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg"
    },
    {
      "id": "sunafil-3031093",
      "title": "Consultar el expediente inspectivo de Sunafil",
      "url": "https://www.gob.pe/30093-consultar-el-expediente-inspectivo-de-sunafil",
      "actionUrl": "https://aplicativosweb7.sunafil.gob.pe/si.consultaExpediente",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg"
    },
    {
      "id": "sunafil-933836",
      "title": "Buscar resoluciones del Sistema inspectivo de la Sunafil",
      "url": "https://www.gob.pe/9958-buscar-resoluciones-del-sistema-inspectivo-de-la-sunafil",
      "actionUrl": "https://aplicativosweb2.sunafil.gob.pe/si.consultaMultasSIIT",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg"
    },
    {
      "id": "sunafil-927349",
      "title": "Verificar identificación de inspectores de Sunafil",
      "url": "https://www.gob.pe/9977-verificar-identificacion-de-inspectores-de-sunafil",
      "actionUrl": "https://aplicativosweb2.sunafil.gob.pe/si.consultaInspectores",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg"
    },
    {
      "id": "sunafil-3109669",
      "title": "Sistema de Inspección del Trabajo (SIT)",
      "url": "https://www.gob.pe/29200-sistema-de-inspeccion-del-trabajo-sit",
      "actionUrl": "https://www.gob.pe/29200-sistema-de-inspeccion-del-trabajo-sit",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg"
    },
    {
      "id": "sunafil-606696",
      "title": "Denunciar a una empresa privada que no cumple con el estado de emergencia",
      "url": "https://www.gob.pe/8802-denunciar-a-una-empresa-privada-que-no-cumple-con-el-estado-de-emergencia",
      "actionUrl": "https://aplicativosweb2.sunafil.gob.pe/si.denunciasVirtuales",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg"
    },
    {
      "id": "sunafil-936698",
      "title": "Calcular cuota de empleo de personas con discapacidad en mi empresa",
      "url": "https://www.gob.pe/10044-calcular-cuota-de-empleo-de-personas-con-discapacidad-en-mi-empresa",
      "actionUrl": "https://aplicativosweb2.sunafil.gob.pe/si.cuotaEmpleo",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg"
    },
    {
      "id": "sunafil-3318056",
      "title": "Enviar alerta contra el trabajo infantil y forzoso",
      "url": "https://www.gob.pe/35841-enviar-alerta-contra-el-trabajo-infantil-y-forzoso",
      "actionUrl": "https://aplicativosweb7.sunafil.gob.pe/si.alerta",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg"
    },
    {
      "id": "sunafil-4916060",
      "title": "Acceder a mesa de partes",
      "url": "https://www.gob.pe/12910-superintendencia-nacional-de-fiscalizacion-laboral-acceder-a-mesa-de-partes",
      "actionUrl": "https://aplicativosweb6.sunafil.gob.pe/si.mesaVirtual/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/991/campaign_WhatsApp_Image_2026-07-31_at_12.27.48_PM.jpeg"
    }
  ],
  "MTPE": [
    {
      "id": "mtpe-4082577",
      "title": "Obtener tu Certificado Único Laboral (CUL)",
      "url": "https://www.gob.pe/47089-obtener-tu-certificado-unico-laboral-cul",
      "actionUrl": "https://www.empleosperu.gob.pe/CertificadoUnicoLaboral/irIndex.html;jsessionid=-jYMcfXqgh6WAbI0F5NUJUyCJ6fr7ThxjV8U-nu5.srv-cjl",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png"
    },
    {
      "id": "mtpe-2603962",
      "title": "Obtener tu Certijoven",
      "url": "https://www.gob.pe/967-obtener-tu-certijoven",
      "actionUrl": "https://www.gob.pe/967-obtener-tu-certijoven",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png"
    },
    {
      "id": "mtpe-719983",
      "title": "Obtener tu Certiadulto",
      "url": "https://www.gob.pe/9377-obtener-tu-certiadulto",
      "actionUrl": "https://www.gob.pe/9377-obtener-tu-certiadulto",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png"
    },
    {
      "id": "mtpe-448139",
      "title": "Registro de la Micro y Pequeña Empresa (REMYPE)",
      "url": "https://www.gob.pe/279-registro-de-la-micro-y-pequena-empresa-remype",
      "actionUrl": "https://apps.trabajo.gob.pe/remypepasarela/sunat/oauth/login",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png"
    },
    {
      "id": "mtpe-2608847",
      "title": "Registrarte en Empleos Perú",
      "url": "https://www.gob.pe/23434-registrarte-en-empleos-peru",
      "actionUrl": "https://www.empleosperu.gob.pe/portal-mtpe/#/nuevo-usuario",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png"
    },
    {
      "id": "mtpe-5520265",
      "title": "Calcular la liquidación de beneficios sociales para trabajadores del sector privado",
      "url": "https://www.gob.pe/72288-calcular-la-liquidacion-de-beneficios-sociales-para-trabajadores-del-sector-privado",
      "actionUrl": "https://portal.trabajo.gob.pe/calculadoraMTPE/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png"
    },
    {
      "id": "mtpe-2661828",
      "title": "Verificar Certificado Único Laboral",
      "url": "https://www.gob.pe/23661-verificar-certificado-unico-laboral",
      "actionUrl": "https://www.empleosperu.gob.pe/CertificadoUnicoLaboral/Verificacion.html",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png"
    },
    {
      "id": "mtpe-2621317",
      "title": "Buscar trabajo en el portal Empleos Perú",
      "url": "https://www.gob.pe/23475-buscar-trabajo-en-el-portal-empleos-peru",
      "actionUrl": "https://mtpe-candidatos.empleosperu.gob.pe/search-jobs#error=login_required&state=a83ff840-31be-4e43-8b44-5c17b225a708",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png"
    },
    {
      "id": "mtpe-5860246",
      "title": "Acceder a la casilla electrónica del Ministerio de Trabajo y Promoción del Empleo (MTPE)",
      "url": "https://www.gob.pe/80086-acceder-a-la-casilla-electronica-del-ministerio-de-trabajo-y-promocion-del-empleo-mtpe",
      "actionUrl": "https://mesadigital360.trabajo.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png"
    },
    {
      "id": "mtpe-448365",
      "title": "Notificar accidentes de trabajo, incidentes peligrosos y enfermedades ocupacionales",
      "url": "https://www.gob.pe/774-notificar-accidentes-de-trabajo-incidentes-peligrosos-y-enfermedades-ocupacionales",
      "actionUrl": "https://api-seguridad.sunat.gob.pe/v1/clientessol/195cbfcb-a841-48a8-b718-38636a1281b9/oauth2/login?originalUrl=https://apps.trabajo.gob.pe/si.sat/index.jsp&state=m1ntr4",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png"
    },
    {
      "id": "mtpe-2121582",
      "title": "Registrar, modificar o dar de baja a un trabajador del hogar en el Ministerio de Trabajo",
      "url": "https://www.gob.pe/17006-registrar-modificar-o-dar-de-baja-a-un-trabajador-del-hogar-en-el-ministerio-de-trabajo",
      "actionUrl": "https://apps.trabajo.gob.pe/rcth/app/#/inicio",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png"
    },
    {
      "id": "mtpe-2688861",
      "title": "Servicios gratuitos de Empleos Perú",
      "url": "https://www.gob.pe/23845-servicios-gratuitos-de-empleos-peru",
      "actionUrl": "https://www.gob.pe/23752-acceder-a-asesoria-sobre-temas-laborales-en-el-ministerio-de-trabajo-y-promocion-del-empleoCrear",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png"
    },
    {
      "id": "mtpe-3897253",
      "title": "Consultar los servicios y ubicación de los centros de empleo del MTPE a nivel nacional",
      "url": "https://www.gob.pe/44219-consultar-los-servicios-y-ubicacion-de-los-centros-de-empleo-del-mtpe-a-nivel-nacional",
      "actionUrl": "https://www.gob.pe/44219-consultar-los-servicios-y-ubicacion-de-los-centros-de-empleo-del-mtpe-a-nivel-nacional",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png"
    },
    {
      "id": "mtpe-448218",
      "title": "Valor Remuneración Mínima Vital (sueldo mínimo)",
      "url": "https://www.gob.pe/476-valor-remuneracion-minima-vital-sueldo-minimo",
      "actionUrl": "https://www.gob.pe/476-valor-remuneracion-minima-vital-sueldo-minimo",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png"
    },
    {
      "id": "mtpe-7823075",
      "title": "Eventos Empleos Perú",
      "url": "https://www.gob.pe/110489-eventos-empleos-peru",
      "actionUrl": "https://eventosempleosperu.trabajo.gob.pe",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png"
    },
    {
      "id": "mtpe-2678222",
      "title": "Obtener capacitación y certificación en Empleos Perú",
      "url": "https://www.gob.pe/23794-obtener-capacitacion-y-certificacion-en-empleos-peru",
      "actionUrl": "https://mtpe.trabajo.gob.pe/capacitacionlaboral/",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png"
    },
    {
      "id": "mtpe-2672601",
      "title": "Acceder a asesorías sobre temas laborales en el Ministerio de Trabajo y Promoción del Empleo",
      "url": "https://www.gob.pe/23752-acceder-a-asesorias-sobre-temas-laborales-en-el-ministerio-de-trabajo-y-promocion-del-empleo",
      "actionUrl": "https://extranet.trabajo.gob.pe/extranet/web/citas",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png"
    },
    {
      "id": "mtpe-5979486",
      "title": "Acceder a orientación vocacional en la plataforma Mi carrera",
      "url": "https://www.gob.pe/82439-acceder-a-orientacion-vocacional-en-la-plataforma-mi-carrera",
      "actionUrl": "https://micarrera.trabajo.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png"
    },
    {
      "id": "mtpe-448471",
      "title": "¿Qué son las utilidades?",
      "url": "https://www.gob.pe/1044-que-son-las-utilidades",
      "actionUrl": "https://www.gob.pe/1044-que-son-las-utilidades",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png"
    },
    {
      "id": "mtpe-2549672",
      "title": "Aprobación de contratos de trabajo del régimen de exportación no tradicional",
      "url": "https://www.gob.pe/22896-aprobacion-de-contratos-de-trabajo-del-regimen-de-exportacion-no-tradicional",
      "actionUrl": "https://www.gob.pe/22896-aprobacion-de-contratos-de-trabajo-del-regimen-de-exportacion-no-tradicional",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/001/167/campaign_9-setiembre.png"
    }
  ],
  "SUTRAN": [
    {
      "id": "sutran-1320918",
      "title": "Consultar si tienes papeletas de infracción por Cinemómetro",
      "url": "https://www.gob.pe/12133-consultar-si-tienes-papeletas-de-infraccion-por-cinemometro",
      "actionUrl": "https://www.sutran.gob.pe/infraccion-por-cinemometro/",
      "category": "Licencias y Tránsito",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png"
    },
    {
      "id": "sutran-2490737",
      "title": "Realizar pagos en línea a través de Sutran Virtual",
      "url": "https://www.gob.pe/22380-realizar-pagos-en-linea-a-traves-de-sutran-virtual",
      "actionUrl": "https://www.sutran.gob.pe/acceso-a-sutran-virtual/",
      "category": "Pagos de Tasas y Servicios",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png"
    },
    {
      "id": "sutran-1190632",
      "title": "Consultar que el bus y conductor tengan sus papeles en regla",
      "url": "https://www.gob.pe/11146-consultar-que-el-bus-y-conductor-tengan-sus-papeles-en-regla",
      "actionUrl": "http://www.sutran.gob.pe/informacion-del-conductor-y-bus-de-tu-viaje/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png"
    },
    {
      "id": "sutran-4484250",
      "title": "Consultar información de transparencia",
      "url": "https://www.gob.pe/52516-superintendencia-de-transporte-terrestre-de-personas-carga-y-mercancias-consultar-informacion-de-transparencia",
      "actionUrl": "https://www.transparencia.gob.pe/enlaces/pte_transparencia_enlaces.aspx?id_entidad=14069",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png"
    },
    {
      "id": "sutran-4036844",
      "title": "Verifica tu infracción",
      "url": "https://www.gob.pe/46479-verifica-tu-infraccion",
      "actionUrl": "https://www.sutran.gob.pe/consultas/record-de-infracciones/verifica-tu-infraccion/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png"
    },
    {
      "id": "sutran-1196170",
      "title": "Consultar el estado de tu licencia de conducir retenida",
      "url": "https://www.gob.pe/11145-consultar-el-estado-de-tu-licencia-de-conducir-retenida",
      "actionUrl": "https://www.sutran.gob.pe/estado-de-licencias/",
      "category": "Licencias y Tránsito",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png"
    },
    {
      "id": "sutran-1189985",
      "title": "Pagar infracciones de tránsito con número de papeleta o acta de control",
      "url": "https://www.gob.pe/11712-pagar-infracciones-de-transito-con-numero-de-papeleta-o-acta-de-control",
      "actionUrl": "https://www.gob.pe/11712-pagar-infracciones-de-transito-con-numero-de-papeleta-o-acta-de-control",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png"
    },
    {
      "id": "sutran-1196700",
      "title": "Consultar tus expedientes y trámites en la Sutran",
      "url": "https://www.gob.pe/11147-consultar-tus-expedientes-y-tramites-en-la-sutran",
      "actionUrl": "https://www.sutran.gob.pe/registro-de-expediente/consulta-de-parte-diario/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png"
    },
    {
      "id": "sutran-1321677",
      "title": "Consultar cuáles son los Centros de Inspección Técnica Vehicular (CITV)",
      "url": "https://www.gob.pe/12138-consultar-cuales-son-los-centros-de-inspeccion-tecnica-vehicular-citv",
      "actionUrl": "https://rec.mtc.gob.pe/AutorizaEntiComplementarias/ArCITVConfiguracion",
      "category": "Registros de Bienes y Propiedad",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png"
    },
    {
      "id": "sutran-1321324",
      "title": "Descuentos en pagos de multas",
      "url": "https://www.gob.pe/12135-descuentos-en-pagos-de-multas",
      "actionUrl": "https://www.gob.pe/12135-descuentos-en-pagos-de-multas",
      "category": "Pagos de Tasas y Servicios",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png"
    },
    {
      "id": "sutran-2852942",
      "title": "Conocer las alertas por bloqueo de carreteras a nivel nacional",
      "url": "https://www.gob.pe/26687-conocer-las-alertas-por-bloqueo-de-carreteras-a-nivel-nacional",
      "actionUrl": "https://gis.sutran.gob.pe/alerta_sutran/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png"
    },
    {
      "id": "sutran-1148566",
      "title": "Solicitar la devolución de la licencia o el recojo de la placa",
      "url": "https://www.gob.pe/10902-solicitar-la-devolucion-de-la-licencia-o-el-recojo-de-la-placa",
      "actionUrl": "https://webexterno.sutran.gob.pe/webexterno/pages/SolicitudAIP/SolicitudLicenciaPlaca.aspx?TW=S",
      "category": "Registros de Bienes y Propiedad",
      "costo": "S/ 4",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png"
    },
    {
      "id": "sutran-1199353",
      "title": "Consultar la lista de placas y licencias listas para recoger",
      "url": "https://www.gob.pe/11110-consultar-la-lista-de-placas-y-licencias-listas-para-recoger",
      "actionUrl": "https://www.sutran.gob.pe/recojo-de-placas-y-licencias/#datos",
      "category": "Registros de Bienes y Propiedad",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png"
    },
    {
      "id": "sutran-1155355",
      "title": "Consultar constancias otorgadas por la Sutran",
      "url": "https://www.gob.pe/11205-consultar-constancias-otorgadas-por-la-sutran",
      "actionUrl": "https://www.sutran.gob.pe/constancias-digitales/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png"
    },
    {
      "id": "sutran-1147002",
      "title": "Solicitar tu récord de infracciones de la Sutran",
      "url": "https://www.gob.pe/10917-solicitar-tu-record-de-infracciones-de-la-sutran",
      "actionUrl": "http://www.sutran.gob.pe/consultas/record-de-infracciones/record-de-infracciones/",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png"
    },
    {
      "id": "sutran-1192496",
      "title": "Conocer los tipos de infracciones de transporte de la Sutran",
      "url": "https://www.gob.pe/11701-conocer-los-tipos-de-infracciones-de-transporte-de-la-sutran",
      "actionUrl": "http://www.sutran.gob.pe/procedimiento-sancionador/transporte/",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 5",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png"
    },
    {
      "id": "sutran-1323446",
      "title": "Procedimiento administrativo sancionador especial de tramitación sumaria",
      "url": "https://www.gob.pe/11720-procedimiento-administrativo-sancionador-especial-de-tramitacion-sumaria",
      "actionUrl": "https://www.gob.pe/11720-procedimiento-administrativo-sancionador-especial-de-tramitacion-sumaria",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png"
    },
    {
      "id": "sutran-1321686",
      "title": "Conocer las entidades certificadoras de GLP a nivel nacional",
      "url": "https://www.gob.pe/12144-conocer-las-entidades-certificadoras-de-glp-a-nivel-nacional",
      "actionUrl": "http://portal.mtc.gob.pe/reportedgtt/form/frmCertificadoraGLP.aspx",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png"
    },
    {
      "id": "sutran-1141526",
      "title": "Presentar descargos ante la imputación de faltas de tránsito",
      "url": "https://www.gob.pe/10876-presentar-descargos-ante-la-imputacion-de-faltas-de-transito",
      "actionUrl": "https://www.sutran.gob.pe/mesa-de-partes-virtual/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png"
    },
    {
      "id": "sutran-1192506",
      "title": "Conocer los tipos de infracciones de tránsito de la Sutran",
      "url": "https://www.gob.pe/11703-conocer-los-tipos-de-infracciones-de-transito-de-la-sutran",
      "actionUrl": "https://www.sutran.gob.pe/procedimiento-sancionador/transito/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/095/494/campaign_Mapa_interactivo_portadas_notas_web.png"
    }
  ],
  "ATU": [
    {
      "id": "atu-1977334",
      "title": "Acceder a la plataforma de consulta de infracciones de la ATU",
      "url": "https://www.gob.pe/15921-acceder-a-la-plataforma-de-consulta-de-infracciones-de-la-atu",
      "actionUrl": "https://pasarela.atu.gob.pe/?CONSULTA=1",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg"
    },
    {
      "id": "atu-8126290",
      "title": "Subsidio al transporte terrestre regular de personas y del servicio de transporte público terrestre de mercancías",
      "url": "https://www.gob.pe/116186-subsidio-al-transporte-terrestre-regular-de-personas-y-del-servicio-de-transporte-publico-terrestre-de-mercancias",
      "actionUrl": "https://soluciones.atu.gob.pe/subsidio_transportista_du007/login",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 4",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg"
    },
    {
      "id": "atu-619471",
      "title": "Consultar si tu taxi tiene autorización para circular en Lima y Callao",
      "url": "https://www.gob.pe/8953-consultar-si-tu-taxi-tiene-autorizacion-para-circular-en-lima-y-callao",
      "actionUrl": "https://sistemas.atu.gob.pe/ConsultaVehiculo",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg"
    },
    {
      "id": "atu-1267271",
      "title": "Acceder al Portal del Ciudadano de la ATU",
      "url": "https://www.gob.pe/12413-acceder-al-portal-del-ciudadano-de-la-atu",
      "actionUrl": "https://soluciones.atu.gob.pe/portal_ciudadano/login",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg"
    },
    {
      "id": "atu-1987392",
      "title": "Acceder a la Plataforma Virtual de Trámites - PVT de la ATU (para trámites TUPA y/o servicios prestados en exclusividad)",
      "url": "https://www.gob.pe/15920-acceder-a-la-plataforma-virtual-de-tramites-pvt-de-la-atu-para-tramites-tupa-y-o-servicios-prestados-en-exclusividad",
      "actionUrl": "http://soluciones.atu.gob.pe/plataformavirtual",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg"
    },
    {
      "id": "atu-1843118",
      "title": "Conocer puntos de venta y recarga de tarjetas del Metropolitano y Corredores complementarios",
      "url": "https://www.gob.pe/15049-conocer-puntos-de-venta-y-recarga-de-tarjetas-del-metropolitano-y-corredores-complementarios",
      "actionUrl": "https://www.google.com/maps/d/u/0/viewer?mid=1yAw_GY9R8jQ28znyNOSaeTL5nRcSas-6&ll=-12.009248819678794%2C-76.90176369873045&z=11",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg"
    },
    {
      "id": "atu-2350596",
      "title": "Pagar multas por infracciones de transporte en la ATU",
      "url": "https://www.gob.pe/21482-pagar-multas-por-infracciones-de-transporte-en-la-atu",
      "actionUrl": "https://www.gob.pe/15920-acceder-a-la-plataforma-de-tramites-de-la-atu",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg"
    },
    {
      "id": "atu-8317459",
      "title": "Subsidio META Nacional al transporte de pasajeros y mercancías en el ámbito nacional, regional y provincial",
      "url": "https://www.gob.pe/116886-subsidio-meta-nacional-al-transporte-de-pasajeros-y-mercancias-en-el-ambito-nacional-regional-y-provincial",
      "actionUrl": "https://soluciones.atu.gob.pe/subsidio_transportista_du007/login",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 4",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg"
    },
    {
      "id": "atu-1989711",
      "title": "Obtener usuario en la Plataforma de trámites de la ATU",
      "url": "https://www.gob.pe/15841-obtener-usuario-en-la-plataforma-de-tramites-de-la-atu",
      "actionUrl": "http://sistemas.atu.gob.pe/plataformavirtual/Login/Register",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg"
    },
    {
      "id": "atu-1988511",
      "title": "Consultar operadores de transporte urbano habilitados por la ATU",
      "url": "https://www.gob.pe/15924-consultar-operadores-de-transporte-urbano-habilitados-por-la-atu",
      "actionUrl": "https://sistemas.atu.gob.pe/ConsultaCredencial/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg"
    },
    {
      "id": "atu-2081987",
      "title": "Programa de Regularización de Sanciones (PRS): ¡Regulariza tu situación hoy!",
      "url": "https://www.gob.pe/16818-programa-de-regularizacion-de-sanciones-prs-regulariza-tu-situacion-hoy",
      "actionUrl": "https://www.gob.pe/16818-programa-de-regularizacion-de-sanciones-prs-regulariza-tu-situacion-hoy",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg"
    },
    {
      "id": "atu-1272700",
      "title": "Registrar pago de multas ante la ATU",
      "url": "https://www.gob.pe/12477-registrar-pago-de-multas-ante-la-atu",
      "actionUrl": "https://soluciones.atu.gob.pe/sispamul/",
      "category": "Pagos de Tasas y Servicios",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg"
    },
    {
      "id": "atu-2603971",
      "title": "Consultar la autorización de circulación de unidades de transporte público en Lima y Callao",
      "url": "https://www.gob.pe/23352-consultar-la-autorizacion-de-circulacion-de-unidades-de-transporte-publico-en-lima-y-callao",
      "actionUrl": "https://sistemas.atu.gob.pe/ConsultaVehiculo",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg"
    },
    {
      "id": "atu-1268828",
      "title": "Solicitar devolución de licencias de conducir retenidas por la ATU",
      "url": "https://www.gob.pe/12449-solicitar-devolucion-de-licencias-de-conducir-retenidas-por-la-atu",
      "actionUrl": "https://soluciones.atu.gob.pe/SIDELI/",
      "category": "Licencias y Tránsito",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg"
    },
    {
      "id": "atu-7820974",
      "title": "Sistemas de Prevención de La Corrupción",
      "url": "https://www.gob.pe/114475-sistemas-de-prevencion-de-la-corrupcion",
      "actionUrl": "https://www.gob.pe/114475-sistemas-de-prevencion-de-la-corrupcion",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg"
    },
    {
      "id": "atu-1988578",
      "title": "Consultar habilitación para el servicio de transporte de trabajadores en el régimen excepcional",
      "url": "https://www.gob.pe/15926-consultar-habilitacion-para-el-servicio-de-transporte-de-trabajadores-en-el-regimen-excepcional",
      "actionUrl": "https://soluciones.atu.gob.pe/consultaservicioespecial/login",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg"
    },
    {
      "id": "atu-2288783",
      "title": "Pagar por derecho de trámites TUPA en la ATU",
      "url": "https://www.gob.pe/20988-pagar-por-derecho-de-tramites-tupa-en-la-atu",
      "actionUrl": "https://pasarela.atu.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg"
    },
    {
      "id": "atu-2299106",
      "title": "Solicitar acceso a la información pública",
      "url": "https://www.gob.pe/12444-autoridad-de-transporte-urbano-para-lima-y-callao-acceder-a-la-informacion-publica-de-la-atu",
      "actionUrl": "https://soluciones.atu.gob.pe/saip_portal/",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg"
    },
    {
      "id": "atu-2288715",
      "title": "Crear usuario en la pasarela de pagos de la ATU",
      "url": "https://www.gob.pe/21037-crear-usuario-en-la-pasarela-de-pagos-de-la-atu",
      "actionUrl": "https://pasarela.atu.gob.pe/#",
      "category": "Pagos de Tasas y Servicios",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg"
    },
    {
      "id": "atu-1284895",
      "title": "Presentar denuncias sobre posibles actos de corrupción en la ATU",
      "url": "https://www.gob.pe/12492-presentar-denuncias-sobre-posibles-actos-de-corrupcion-en-la-atu",
      "actionUrl": "https://denuncias.servicios.gob.pe/?gobpe_id=3286",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/764/campaign_Plan_de_rutas_Se%C3%B1or_de_los_Milagros.jpeg"
    }
  ],
  "SUNEDU": [
    {
      "id": "sunedu-448226",
      "title": "Obtener constancia de inscripción de diplomas",
      "url": "https://www.gob.pe/488-obtener-constancia-de-inscripcion-de-diplomas",
      "actionUrl": "https://enlinea.sunedu.gob.pe/constanciadeinscripcion",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg"
    },
    {
      "id": "sunedu-1800965",
      "title": "Consultar el estado de emisión de un carné universitario",
      "url": "https://www.gob.pe/14803-consultar-el-estado-de-emision-de-un-carne-universitario",
      "actionUrl": "https://enlinea.sunedu.gob.pe/estadodemicarne",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg"
    },
    {
      "id": "sunedu-1194410",
      "title": "Consultar si una universidad está licenciada por la Sunedu",
      "url": "https://www.gob.pe/11262-consultar-si-una-universidad-esta-licenciada-por-la-sunedu",
      "actionUrl": "https://www.tuni.pe/",
      "category": "Licencias y Tránsito",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg"
    },
    {
      "id": "sunedu-448301",
      "title": "Obtener reconocimiento de grados y títulos universitarios del extranjero",
      "url": "https://www.gob.pe/648-obtener-reconocimiento-de-grados-y-titulos-universitarios-del-extranjero",
      "actionUrl": "https://www.gob.pe/648-obtener-reconocimiento-de-grados-y-titulos-universitarios-del-extranjero",
      "category": "Pasaportes y Control Migratorio",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg"
    },
    {
      "id": "sunedu-448227",
      "title": "Obtener Constancia de Verificación de Datos de Autoridades",
      "url": "https://www.gob.pe/489-obtener-constancia-de-verificacion-de-datos-de-autoridades",
      "actionUrl": "https://www.gob.pe/489-obtener-constancia-de-verificacion-de-datos-de-autoridades",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 13.10",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg"
    },
    {
      "id": "sunedu-2353394",
      "title": "Postular a una universidad pública",
      "url": "https://www.gob.pe/21489-postular-a-una-universidad-publica",
      "actionUrl": "https://www.gob.pe/21489-postular-a-una-universidad-publica",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg"
    },
    {
      "id": "sunedu-1664175",
      "title": "Consultar listado de carreras en universidades licenciadas por Sunedu",
      "url": "https://www.gob.pe/14408-consultar-listado-de-carreras-en-universidades-licenciadas-por-sunedu",
      "actionUrl": "https://www.tuni.pe",
      "category": "Licencias y Tránsito",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg"
    },
    {
      "id": "sunedu-4777337",
      "title": "Solicitar corrección de datos personales de tu grado o título en la Sunedu",
      "url": "https://www.gob.pe/57762-solicitar-correccion-de-datos-personales-de-tu-grado-o-titulo-en-la-sunedu",
      "actionUrl": "https://enlinea.sunedu.gob.pe/verificainscripcion",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg"
    },
    {
      "id": "sunedu-1003011",
      "title": "Acceder a los servicios en línea para educación universitaria",
      "url": "https://www.gob.pe/10607-acceder-a-los-servicios-en-linea-para-educacion-universitaria",
      "actionUrl": "https://enlinea.sunedu.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg"
    },
    {
      "id": "sunedu-6139795",
      "title": "Registro de la modificación de la oferta académica de universidades y escuelas de posgrado licenciadas",
      "url": "https://www.gob.pe/85147-registro-de-la-modificacion-de-la-oferta-academica-de-universidades-y-escuelas-de-posgrado-licenciadas",
      "actionUrl": "https://www.gob.pe/85147-registro-de-la-modificacion-de-la-oferta-academica-de-universidades-y-escuelas-de-posgrado-licenciadas",
      "category": "Licencias y Tránsito",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg"
    },
    {
      "id": "sunedu-2471241",
      "title": "Consultar los informes legales de interpretación de la Ley Universitaria emitidos por Sunedu",
      "url": "https://www.gob.pe/22302-consultar-los-informes-legales-de-interpretacion-de-la-ley-universitaria-emitidos-por-sunedu",
      "actionUrl": "https://enlinea.sunedu.gob.pe/informeslegales",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg"
    },
    {
      "id": "sunedu-1662627",
      "title": "Buscar universidades licenciadas en el país y sus locales",
      "url": "https://www.gob.pe/14392-buscar-universidades-licenciadas-en-el-pais-y-sus-locales",
      "actionUrl": "https://www.tuni.pe/",
      "category": "Licencias y Tránsito",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg"
    },
    {
      "id": "sunedu-1628894",
      "title": "Obtener información para traslado a una universidad licenciada",
      "url": "https://www.gob.pe/14159-obtener-informacion-para-traslado-a-una-universidad-licenciada",
      "actionUrl": "https://www.gob.pe/14159-obtener-informacion-para-traslado-a-una-universidad-licenciada",
      "category": "Licencias y Tránsito",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg"
    },
    {
      "id": "sunedu-6139736",
      "title": "Autorización de inicio de actividades de promotoras de universidades privadas",
      "url": "https://www.gob.pe/85146-autorizacion-de-inicio-de-actividades-de-promotoras-de-universidades-privadas",
      "actionUrl": "https://www.gob.pe/85146-autorizacion-de-inicio-de-actividades-de-promotoras-de-universidades-privadas",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg"
    },
    {
      "id": "sunedu-5180648",
      "title": "SUNEDU remite información requerida para la elección del representante de las universidades privadas ante el consejo directivo de la SUNEDU en cumplimiento a la Ley N.° 31520",
      "url": "https://www.gob.pe/66830-sunedu-remite-informacion-requerida-para-la-eleccion-del-representante-de-las-universidades-privadas-ante-el-consejo-directivo-de-la-sunedu-en-cumplimiento-a-la-ley-n-31520",
      "actionUrl": "https://www.gob.pe/66830-sunedu-remite-informacion-requerida-para-la-eleccion-del-representante-de-las-universidades-privadas-ante-el-consejo-directivo-de-la-sunedu-en-cumplimiento-a-la-ley-n-31520",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg"
    },
    {
      "id": "sunedu-3275822",
      "title": "Proceso de licenciamiento de la Universidad Alas Peruanas",
      "url": "https://www.gob.pe/34954-proceso-de-licenciamiento-de-la-universidad-alas-peruanas",
      "actionUrl": "https://www.gob.pe/34954-proceso-de-licenciamiento-de-la-universidad-alas-peruanas",
      "category": "Licencias y Tránsito",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg"
    },
    {
      "id": "sunedu-1671144",
      "title": "Consultar convenios de traslado a universidades licenciadas",
      "url": "https://www.gob.pe/14457-consultar-convenios-de-traslado-a-universidades-licenciadas",
      "actionUrl": "https://metraslado.pe/convenios",
      "category": "Licencias y Tránsito",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg"
    },
    {
      "id": "sunedu-1193565",
      "title": "Consultar el registro de infractores y sanciones de la Sunedu",
      "url": "https://www.gob.pe/10649-consultar-el-registro-de-infractores-y-sanciones-de-la-sunedu",
      "actionUrl": "https://enlinea.sunedu.gob.pe/infractoresysanciones",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/009/398/campaign_ce244f73-96dc-41d5-a270-2c80cdff4c14.jpg"
    }
  ],
  "MINEDU": [
    {
      "id": "minedu-448448",
      "title": "Consultar grados y títulos de instituciones tecnológicas y pedagógicas",
      "url": "https://www.gob.pe/941-consultar-grados-y-titulos-de-instituciones-tecnologicas-y-pedagogicas",
      "actionUrl": "https://titulosinstitutos.minedu.gob.pe/",
      "category": "Educación, Becas y Títulos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png"
    },
    {
      "id": "minedu-3117662",
      "title": "Acceder al Sistema de Gestión de la Calidad del Servicio Educativo (SIMON)",
      "url": "https://www.gob.pe/32106-acceder-al-sistema-de-gestion-de-la-calidad-del-servicio-educativo-simon",
      "actionUrl": "https://simon.minedu.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png"
    },
    {
      "id": "minedu-5458587",
      "title": "Obtener primera emisión o duplicado del certificado oficial de estudios desde el año 1986",
      "url": "https://www.gob.pe/11745-obtener-primera-emision-o-duplicado-del-certificado-oficial-de-estudios-desde-el-ano-1986",
      "actionUrl": "https://certificado.minedu.gob.pe/certificate",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png"
    },
    {
      "id": "minedu-861855",
      "title": "Obtener Constancia de Logros de Aprendizaje",
      "url": "https://www.gob.pe/9719-obtener-constancia-de-logros-de-aprendizaje",
      "actionUrl": "https://www.gob.pe/8858",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png"
    },
    {
      "id": "minedu-5755328",
      "title": "Solicitar boletas de pago al sistema Ayni",
      "url": "https://www.gob.pe/77206-solicitar-boletas-de-pago-al-sistema-ayni",
      "actionUrl": "https://servicios-ayni.minedu.gob.pe/ayni/inicio",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png"
    },
    {
      "id": "minedu-7939161",
      "title": "Participar en el concurso Ideas en Acción",
      "url": "https://www.gob.pe/115043-participar-en-el-concurso-ideas-en-accion",
      "actionUrl": "https://www.gob.pe/115043-participar-en-el-concurso-ideas-en-accion",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png"
    },
    {
      "id": "minedu-448303",
      "title": "Certificado de estudios (emisión y duplicado)",
      "url": "https://www.gob.pe/657-certificado-de-estudios-emision-y-duplicado",
      "actionUrl": "https://www.gob.pe/657-certificado-de-estudios-emision-y-duplicado",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png"
    },
    {
      "id": "minedu-2858075",
      "title": "Conocer si una institución educativa está autorizada para operar - Código Modular",
      "url": "https://www.gob.pe/26769-conocer-si-una-institucion-educativa-esta-autorizada-para-operar-codigo-modular",
      "actionUrl": "http://escale.minedu.gob.pe/web/inicio/padron-de-iiee",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png"
    },
    {
      "id": "minedu-4929306",
      "title": "Reportar casos de violencia escolar en la plataforma SíseVe del Minedu",
      "url": "https://www.gob.pe/62013-reportar-casos-de-violencia-escolar-en-la-plataforma-siseve-del-minedu",
      "actionUrl": "https://siseve.minedu.gob.pe/web/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png"
    },
    {
      "id": "minedu-3239394",
      "title": "Acceder a los Materiales Educativos Digitales (MED) de la Plataforma Tecnológica Educativa - PerúEduca",
      "url": "https://www.gob.pe/34222-acceder-a-los-materiales-educativos-digitales-med-de-la-plataforma-tecnologica-educativa-perueduca",
      "actionUrl": "https://www.perueduca.pe/#/home/materiales-educativos",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png"
    },
    {
      "id": "minedu-4878549",
      "title": "Consultar programas de estudios del Catálogo Nacional de la Oferta Formativa (CNOF)",
      "url": "https://www.gob.pe/57095-consultar-programas-de-estudios-del-catalogo-nacional-de-la-oferta-formativa-cnof",
      "actionUrl": "https://www.gob.pe/57095-consultar-programas-de-estudios-del-catalogo-nacional-de-la-oferta-formativa-cnof",
      "category": "Educación, Becas y Títulos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png"
    },
    {
      "id": "minedu-5911583",
      "title": "Identicole",
      "url": "https://www.gob.pe/7782-identicole",
      "actionUrl": "https://identicole.minedu.gob.pe",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png"
    },
    {
      "id": "minedu-448474",
      "title": "Conocer la lista de personas buscadas por la justicia - Programa de recompensas del Mininter",
      "url": "https://www.gob.pe/1051-conocer-la-lista-de-personas-buscadas-por-la-justicia-programa-de-recompensas-del-mininter",
      "actionUrl": "https://www.recompensas.pe/requisitoriados",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png"
    },
    {
      "id": "minedu-1424595",
      "title": "Acceder al repositorio institucional del Minedu",
      "url": "https://www.gob.pe/13126-acceder-al-repositorio-institucional-del-minedu",
      "actionUrl": "https://repositorio.minedu.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png"
    },
    {
      "id": "minedu-4883103",
      "title": "Licenciamiento para instituto y escuela de educación superior del Minedu",
      "url": "https://www.gob.pe/7775-licenciamiento-para-instituto-y-escuela-de-educacion-superior-del-minedu",
      "actionUrl": "https://tinyurl.com/29fymxhx",
      "category": "Licencias y Tránsito",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png"
    },
    {
      "id": "minedu-5458445",
      "title": "Obtener duplicado de certificado de estudios hasta el año 1985",
      "url": "https://www.gob.pe/11740-obtener-duplicado-de-certificado-de-estudios-hasta-el-ano-1985",
      "actionUrl": "https://enlinea.minedu.gob.pe/",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png"
    },
    {
      "id": "minedu-5732127",
      "title": "Acceder a Edutalentos del Minedu",
      "url": "https://www.gob.pe/76918-acceder-a-edutalentos-del-minedu",
      "actionUrl": "https://edutalentos.pe",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png"
    },
    {
      "id": "minedu-5480685",
      "title": "Legalizar certificados de estudios, diplomas, títulos y otros documentos para estudios en el extranjero",
      "url": "https://www.gob.pe/71592-legalizar-certificados-de-estudios-diplomas-titulos-y-otros-documentos-para-estudios-en-el-extranjero",
      "actionUrl": "https://www.gob.pe/71592-legalizar-certificados-de-estudios-diplomas-titulos-y-otros-documentos-para-estudios-en-el-extranjero",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png"
    },
    {
      "id": "minedu-4626001",
      "title": "Matrícula general",
      "url": "https://www.gob.pe/20776-matricula-general",
      "actionUrl": "https://www.gob.pe/12485-acceder-a-materiales-pedagogicos-bilingues-del-ministerio-de-educacion",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png"
    },
    {
      "id": "minedu-5485847",
      "title": "Revalidar o convalidar estudios primarios y secundarios del extranjero",
      "url": "https://www.gob.pe/477-revalidar-o-convalidar-estudios-primarios-y-secundarios-del-extranjero",
      "actionUrl": "https://www.gob.pe/477-revalidar-o-convalidar-estudios-primarios-y-secundarios-del-extranjero",
      "category": "Pasaportes y Control Migratorio",
      "costo": "S/ 66.50",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/669/campaign_Banner_web_campana_686x424.png"
    }
  ],
  "PRONABEC": [
    {
      "id": "pronabec-3973771",
      "title": "Beca 18 - Modalidad ordinaria",
      "url": "https://www.gob.pe/41355-beca-18-modalidad-ordinaria",
      "actionUrl": "https://www.gob.pe/41355-beca-18-modalidad-ordinaria",
      "category": "Educación, Becas y Títulos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg"
    },
    {
      "id": "pronabec-3775223",
      "title": "Beca 18 - Concurso",
      "url": "https://www.gob.pe/474-beca-18-concurso",
      "actionUrl": "https://www.gob.pe/474-beca-18-concurso",
      "category": "Educación, Becas y Títulos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg"
    },
    {
      "id": "pronabec-3779904",
      "title": "Requisitos para postular al concurso Beca 18",
      "url": "https://www.gob.pe/41547-requisitos-para-postular-al-concurso-beca-18",
      "actionUrl": "https://www.gob.pe/41547-requisitos-para-postular-al-concurso-beca-18",
      "category": "Educación, Becas y Títulos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg"
    },
    {
      "id": "pronabec-4171261",
      "title": "Beca Perú",
      "url": "https://www.gob.pe/48037-beca-peru",
      "actionUrl": "https://www.gob.pe/institucion/pronabec/campa%C3%B1as/72051-beca-peru-2024",
      "category": "Educación, Becas y Títulos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg"
    },
    {
      "id": "pronabec-448308",
      "title": "Becas de cooperación internacional",
      "url": "https://www.gob.pe/665-becas-de-cooperacion-internacional",
      "actionUrl": "https://www.pronabec.gob.pe/becas-de-cooperacion-internacional/",
      "category": "Educación, Becas y Títulos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg"
    },
    {
      "id": "pronabec-3973776",
      "title": "Beca 18 - Modalidad Repared",
      "url": "https://www.gob.pe/41478-beca-18-modalidad-repared",
      "actionUrl": "https://www.gob.pe/41478-beca-18-modalidad-repared",
      "category": "Educación, Becas y Títulos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg"
    },
    {
      "id": "pronabec-3973749",
      "title": "Beca 18 - Modalidad FF.AA",
      "url": "https://www.gob.pe/41507-beca-18-modalidad-ff-aa",
      "actionUrl": "https://www.gob.pe/41507-beca-18-modalidad-ff-aa",
      "category": "Educación, Becas y Títulos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg"
    },
    {
      "id": "pronabec-2253106",
      "title": "Beca Generación del Bicentenario",
      "url": "https://www.gob.pe/1037-beca-generacion-del-bicentenario",
      "actionUrl": "https://www.gob.pe/institucion/pronabec/campa%C3%B1as/106711-beca-generacion-del-bicentenario-2025",
      "category": "Educación, Becas y Títulos",
      "costo": "S/ 7175",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg"
    },
    {
      "id": "pronabec-1628721",
      "title": "Acceder a la intranet para beneficiarios del Pronabec",
      "url": "https://www.gob.pe/14116-acceder-a-la-intranet-para-beneficiarios-del-pronabec",
      "actionUrl": "http://intranet.pronabec.edu.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg"
    },
    {
      "id": "pronabec-4334159",
      "title": "Beca Alianza del Pacífico",
      "url": "https://www.gob.pe/50469-beca-alianza-del-pacifico",
      "actionUrl": "https://www.gob.pe/institucion/pronabec/campa%C3%B1as/64651-beca-alianza-del-pacifico-2024",
      "category": "Educación, Becas y Títulos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg"
    },
    {
      "id": "pronabec-3974067",
      "title": "Beca 18 - Modalidad Huallaga",
      "url": "https://www.gob.pe/41503-beca-18-modalidad-huallaga",
      "actionUrl": "https://www.gob.pe/41503-beca-18-modalidad-huallaga",
      "category": "Educación, Becas y Títulos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg"
    },
    {
      "id": "pronabec-2639951",
      "title": "Crear cuenta para ingresar a la Plataforma de Mesa de Partes Digital de Pronabec",
      "url": "https://www.gob.pe/23515-crear-cuenta-para-ingresar-a-la-plataforma-de-mesa-de-partes-digital-de-pronabec",
      "actionUrl": "https://mesadepartes.pronabec.gob.pe/Registro/validar",
      "category": "Pagos de Tasas y Servicios",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg"
    },
    {
      "id": "pronabec-5152738",
      "title": "Acceder a la aplicación móvil de Pronabec",
      "url": "https://www.gob.pe/66294-acceder-a-la-aplicacion-movil-de-pronabec",
      "actionUrl": "https://www.gob.pe/66294-acceder-a-la-aplicacion-movil-de-pronabec",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg"
    },
    {
      "id": "pronabec-3906238",
      "title": "Beca inclusión carreras profesionales",
      "url": "https://www.gob.pe/44161-beca-inclusion-carreras-profesionales",
      "actionUrl": "https://www.gob.pe/institucion/pronabec/campa%C3%B1as/63982-beca-inclusion-carreras-profesionales-2024",
      "category": "Educación, Becas y Títulos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg"
    },
    {
      "id": "pronabec-3973732",
      "title": "Beca 18 - Modalidad Protección",
      "url": "https://www.gob.pe/41504-beca-18-modalidad-proteccion",
      "actionUrl": "https://www.gob.pe/41504-beca-18-modalidad-proteccion",
      "category": "Educación, Becas y Títulos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg"
    },
    {
      "id": "pronabec-3974132",
      "title": "Beca 18 - Modalidad CNA Y PA",
      "url": "https://www.gob.pe/41505-beca-18-modalidad-cna-y-pa",
      "actionUrl": "https://www.gob.pe/41505-beca-18-modalidad-cna-y-pa",
      "category": "Educación, Becas y Títulos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg"
    },
    {
      "id": "pronabec-4170197",
      "title": "Beca Técnico Productiva Comunidad Nativa Amazónica",
      "url": "https://www.gob.pe/48020-beca-tecnico-productiva-comunidad-nativa-amazonica",
      "actionUrl": "https://www.gob.pe/institucion/pronabec/campa%C3%B1as/61514-beca-tecnico-productiva-comunidad-nativa-amazonica-2024",
      "category": "Educación, Becas y Títulos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg"
    },
    {
      "id": "pronabec-448250",
      "title": "Concursos por créditos educativos del Pronabec",
      "url": "https://www.gob.pe/558-concursos-por-creditos-educativos-del-pronabec",
      "actionUrl": "https://www.gob.pe/institucion/pronabec/tema/becas",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg"
    },
    {
      "id": "pronabec-4193294",
      "title": "Beca Inclusión Técnico Productiva",
      "url": "https://www.gob.pe/48545-beca-inclusion-tecnico-productiva",
      "actionUrl": "https://www.gob.pe/institucion/pronabec/campa%C3%B1as/63978-beca-inclusion-tecnico-productiva-2024",
      "category": "Educación, Becas y Títulos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg"
    },
    {
      "id": "pronabec-1420657",
      "title": "Realizar una consulta en línea al Pronabec",
      "url": "https://www.gob.pe/10321-realizar-una-consulta-en-linea-al-pronabec",
      "actionUrl": "https://tramitepublico.pronabec.gob.pe/Consultas",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/205/campaign_BGB-GOB.jpg.jpeg"
    }
  ],
  "SINEACE": [
    {
      "id": "sineace-997243",
      "title": "Consultar si una institución educativa o programa de estudios está acreditado",
      "url": "https://www.gob.pe/8955-consultar-si-una-institucion-educativa-o-programa-de-estudios-esta-acreditado",
      "actionUrl": "https://app.sineace.gob.pe/Reportes/Acreditacion.aspx",
      "category": "Educación, Becas y Títulos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png"
    },
    {
      "id": "sineace-1026591",
      "title": "Consultar si una persona ha certificado sus competencias",
      "url": "https://www.gob.pe/8954-consultar-si-una-persona-ha-certificado-sus-competencias",
      "actionUrl": "https://app.sineace.gob.pe/sigice/padrones/frmInicio.aspx",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png"
    },
    {
      "id": "sineace-3500151",
      "title": "Sineace en línea",
      "url": "https://www.gob.pe/38058-sineace-en-linea",
      "actionUrl": "https://enlinea.sineace.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png"
    },
    {
      "id": "sineace-7139167",
      "title": "Entidades evaluadoras externas para universidades, institutos y escuelas de educación superior - 2025",
      "url": "https://www.gob.pe/83849-entidades-evaluadoras-externas-para-universidades-institutos-y-escuelas-de-educacion-superior-2025",
      "actionUrl": "https://www.gob.pe/83849-entidades-evaluadoras-externas-para-universidades-institutos-y-escuelas-de-educacion-superior-2025",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png"
    },
    {
      "id": "sineace-3038117",
      "title": "Acceder a estadísticas de acreditación de calidad educativa a nivel nacional y regional",
      "url": "https://www.gob.pe/29960-acceder-a-estadisticas-de-acreditacion-de-calidad-educativa-a-nivel-nacional-y-regional",
      "actionUrl": "https://app.sineace.gob.pe/Reportes/Acreditacion-Coneau.aspx",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png"
    },
    {
      "id": "sineace-1041663",
      "title": "Solicitar la acreditación de mi institución educativa o programa de estudios",
      "url": "https://www.gob.pe/9543-solicitar-la-acreditacion-de-mi-institucion-educativa-o-programa-de-estudios",
      "actionUrl": "https://tramite.sineace.gob.pe/registrar-solicitud",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 2",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png"
    },
    {
      "id": "sineace-7465959",
      "title": "¿Cómo iniciar el proceso de autorización como Entidad Certificadora?",
      "url": "https://www.gob.pe/112777-como-iniciar-el-proceso-de-autorizacion-como-entidad-certificadora",
      "actionUrl": "https://www.gob.pe/112777-como-iniciar-el-proceso-de-autorizacion-como-entidad-certificadora",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png"
    },
    {
      "id": "sineace-997251",
      "title": "Solicitar reconocimiento de acreditación otorgada por agencias acreditadoras extranjeras",
      "url": "https://www.gob.pe/9547-solicitar-reconocimiento-de-acreditacion-otorgada-por-agencias-acreditadoras-extranjeras",
      "actionUrl": "https://www.gob.pe/9547-solicitar-reconocimiento-de-acreditacion-otorgada-por-agencias-acreditadoras-extranjeras",
      "category": "Pasaportes y Control Migratorio",
      "costo": "S/ 1925.30",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png"
    },
    {
      "id": "sineace-7185702",
      "title": "CONOCE LAS AGENCIAS ACREDITADORAS EXTRANJERAS DE INSTITUCIONES Y PROGRAMAS UNIVERSITARIOS, CUYAS ACREDITACIONES SON RECONOCIDAS POR EL SINEACE",
      "url": "https://www.gob.pe/108169-conoce-las-agencias-acreditadoras-extranjeras-de-instituciones-y-programas-universitarios-cuyas-acreditaciones-son-reconocidas-por-el-sineace",
      "actionUrl": "https://www.gob.pe/108169-conoce-las-agencias-acreditadoras-extranjeras-de-instituciones-y-programas-universitarios-cuyas-acreditaciones-son-reconocidas-por-el-sineace",
      "category": "Pasaportes y Control Migratorio",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png"
    },
    {
      "id": "sineace-3040496",
      "title": "Solicitar autorización como entidad evaluadora externa",
      "url": "https://www.gob.pe/9557-solicitar-autorizacion-como-entidad-evaluadora-externa",
      "actionUrl": "https://www.gob.pe/9557-solicitar-autorizacion-como-entidad-evaluadora-externa",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 1",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png"
    },
    {
      "id": "sineace-2989984",
      "title": "Acceder al Portal de Atención al Ciudadano del Sineace",
      "url": "https://www.gob.pe/8937-acceder-al-portal-de-atencion-al-ciudadano-del-sineace",
      "actionUrl": "https://app.sineace.gob.pe/portal-ciudadano/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png"
    },
    {
      "id": "sineace-3026224",
      "title": "Solicitar renovación como entidad evaluadora externa",
      "url": "https://www.gob.pe/30032-solicitar-renovacion-como-entidad-evaluadora-externa",
      "actionUrl": "https://www.gob.pe/30032-solicitar-renovacion-como-entidad-evaluadora-externa",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 1",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png"
    },
    {
      "id": "sineace-889216",
      "title": "Realizar consultas al Sineace",
      "url": "https://www.gob.pe/9386-realizar-consultas-al-sineace",
      "actionUrl": "https://app.sineace.gob.pe/portal-ciudadano/consultas",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png"
    },
    {
      "id": "sineace-1080101",
      "title": "Reportar avances en la autoevaluación de instituciones educativas o programas de estudios",
      "url": "https://www.gob.pe/9027-reportar-avances-en-la-autoevaluacion-de-instituciones-educativas-o-programas-de-estudios",
      "actionUrl": "https://www.gob.pe/9027-reportar-avances-en-la-autoevaluacion-de-instituciones-educativas-o-programas-de-estudios",
      "category": "Educación, Becas y Títulos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png"
    },
    {
      "id": "sineace-889238",
      "title": "Presentar un reclamo ante una entidad pública",
      "url": "https://www.gob.pe/9389-sistema-nacional-de-evaluacion-acreditacion-y-certificacion-de-la-calidad-educativa-presentar-un-reclamo-ante-el-sineace",
      "actionUrl": "https://reclamos.servicios.gob.pe/?institution_id=207",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png"
    },
    {
      "id": "sineace-2299067",
      "title": "Solicitar acceso a la información pública",
      "url": "https://www.gob.pe/9388-sistema-nacional-de-evaluacion-acreditacion-y-certificacion-de-la-calidad-educativa-acceder-a-informacion-publica-del-sineace",
      "actionUrl": "https://app.sineace.gob.pe/portal-ciudadano/acceso-informacion",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png"
    },
    {
      "id": "sineace-889211",
      "title": "Acceder a mesa de partes",
      "url": "https://www.gob.pe/9385-sistema-nacional-de-evaluacion-acreditacion-y-certificacion-de-la-calidad-educativa-ingresar-a-la-mesa-de-partes-virtual-del-sineace",
      "actionUrl": "https://app.sineace.gob.pe/portal-ciudadano/mesa-partes",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png"
    },
    {
      "id": "sineace-889718",
      "title": "Denunciar un presunto acto de corrupción",
      "url": "https://www.gob.pe/9391-sistema-nacional-de-evaluacion-acreditacion-y-certificacion-de-la-calidad-educativa-denunciar-un-acto-de-corrupcion-en-el-sineace",
      "actionUrl": "https://denuncias.servicios.gob.pe/?gobpe_id=441",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png"
    },
    {
      "id": "sineace-3040525",
      "title": "Consultar estado de trámite",
      "url": "https://www.gob.pe/30336-sistema-nacional-de-evaluacion-acreditacion-y-certificacion-de-la-calidad-educativa-consultar-estado-de-tramite",
      "actionUrl": "https://app.sineace.gob.pe/consultaexp/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png"
    },
    {
      "id": "sineace-5149892",
      "title": "Acceder a información de instituciones educativas licenciadas en Sineace Móvil",
      "url": "https://www.gob.pe/66178-acceder-a-informacion-de-instituciones-educativas-licenciadas-en-sineace-movil",
      "actionUrl": "https://www.gob.pe/66178-acceder-a-informacion-de-instituciones-educativas-licenciadas-en-sineace-movil",
      "category": "Licencias y Tránsito",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/657/campaign_Mesa_de_trabajo_1.png"
    }
  ],
  "INDECOPI": [
    {
      "id": "indecopi-4542684",
      "title": "Registrar la marca de producto o servicio de tu negocio en Indecopi",
      "url": "https://www.gob.pe/333-registrar-la-marca-de-producto-o-servicio-de-tu-negocio-en-indecopi",
      "actionUrl": "https://www.gob.pe/institucion/indecopi/campa%C3%B1as/6164-protege-tu-sueno-registra-tu-marca",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 534.90",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg"
    },
    {
      "id": "indecopi-2034884",
      "title": "Buscar una marca o servicio registrado - Busca tu marca",
      "url": "https://www.gob.pe/16475-buscar-una-marca-o-servicio-registrado-busca-tu-marca",
      "actionUrl": "https://enlinea.indecopi.gob.pe/buscatumarca/#/inicio",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg"
    },
    {
      "id": "indecopi-1364873",
      "title": "Buscar resoluciones del Indecopi",
      "url": "https://www.gob.pe/10720-buscar-resoluciones-del-indecopi",
      "actionUrl": "http://servicio.indecopi.gob.pe/buscadorResoluciones",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg"
    },
    {
      "id": "indecopi-1660522",
      "title": "Hacer seguimiento a un expediente en el Indecopi",
      "url": "https://www.gob.pe/14324-hacer-seguimiento-a-un-expediente-en-el-indecopi",
      "actionUrl": "https://servicio.indecopi.gob.pe/portalSAE/index.html",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg"
    },
    {
      "id": "indecopi-448236",
      "title": "Presentar reclamos en Indecopi",
      "url": "https://www.gob.pe/532-presentar-reclamos-en-indecopi",
      "actionUrl": "https://www.gob.pe/532-presentar-reclamos-en-indecopi",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg"
    },
    {
      "id": "indecopi-1565870",
      "title": "Buscar empresas sancionadas por Indecopi",
      "url": "https://www.gob.pe/10285-buscar-empresas-sancionadas-por-indecopi",
      "actionUrl": "https://enlinea.indecopi.gob.pe/miraaquienlecompras/#/inicio",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg"
    },
    {
      "id": "indecopi-6043184",
      "title": "Registrar una obra en el Indecopi",
      "url": "https://www.gob.pe/83358-registrar-una-obra-en-el-indecopi",
      "actionUrl": "https://enlinea.indecopi.gob.pe/serviciosenlinea/#/",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 90.10",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg"
    },
    {
      "id": "indecopi-2139248",
      "title": "Acceder a la plataforma de asesoría virtual de marcas",
      "url": "https://www.gob.pe/17215-acceder-a-la-plataforma-de-asesoria-virtual-de-marcas",
      "actionUrl": "https://www.gob.pe/17215-acceder-a-la-plataforma-de-asesoria-virtual-de-marcas",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 534.99",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg"
    },
    {
      "id": "indecopi-5158785",
      "title": "Plataforma de Servicios en Línea de Indecopi",
      "url": "https://www.gob.pe/66428-plataforma-de-servicios-en-linea-de-indecopi",
      "actionUrl": "https://enlinea.indecopi.gob.pe/serviciosenlinea/#/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg"
    },
    {
      "id": "indecopi-1800137",
      "title": "Denuncias de protección al consumidor",
      "url": "https://www.gob.pe/14888-denuncias-de-proteccion-al-consumidor",
      "actionUrl": "https://www.gob.pe/14888-denuncias-de-proteccion-al-consumidor",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg"
    },
    {
      "id": "indecopi-1598987",
      "title": "Obtener información de deudores acogidos a los procedimientos concursales - IFCO",
      "url": "https://www.gob.pe/10366-obtener-informacion-de-deudores-acogidos-a-los-procedimientos-concursales-ifco",
      "actionUrl": "https://servicio.indecopi.gob.pe/e-value/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg"
    },
    {
      "id": "indecopi-1919432",
      "title": "Buscar productos y servicios para registrar tu marca - Buscador peruanizado",
      "url": "https://www.gob.pe/15455-buscar-productos-y-servicios-para-registrar-tu-marca-buscador-peruanizado",
      "actionUrl": "https://servicio.indecopi.gob.pe/appNIZAWeb/index.seam",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg"
    },
    {
      "id": "indecopi-448160",
      "title": "Registrar una marca",
      "url": "https://www.gob.pe/332-registrar-una-marca",
      "actionUrl": "https://www.gob.pe/332-registrar-una-marca",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg"
    },
    {
      "id": "indecopi-4895077",
      "title": "Registro Oficial de Prestadores de Servicios de Certificación Digital (ROPS)",
      "url": "https://www.gob.pe/59924-registro-oficial-de-prestadores-de-servicios-de-certificacion-digital-rops",
      "actionUrl": "https://www.gob.pe/institucion/indecopi/informes-publicaciones/5447866-registro-oficial-de-prestadores-de-servicios-de-certificacion-digital-rops",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg"
    },
    {
      "id": "indecopi-448159",
      "title": "Buscar antecedentes de una marca",
      "url": "https://www.gob.pe/328-buscar-antecedentes-de-una-marca",
      "actionUrl": "https://www.gob.pe/328-buscar-antecedentes-de-una-marca",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg"
    },
    {
      "id": "indecopi-4601544",
      "title": "Registrar nombre comercial de tu negocio en Indecopi",
      "url": "https://www.gob.pe/334-registrar-nombre-comercial-de-tu-negocio-en-indecopi",
      "actionUrl": "https://www.gob.pe/334-registrar-nombre-comercial-de-tu-negocio-en-indecopi",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 534.90",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg"
    },
    {
      "id": "indecopi-1446102",
      "title": "Consulta el estado de tus reclamos en el Indecopi",
      "url": "https://www.gob.pe/10304-consulta-el-estado-de-tus-reclamos-en-el-indecopi",
      "actionUrl": "https://servicio.indecopi.gob.pe/consultareclamos/index.seam",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg"
    },
    {
      "id": "indecopi-1916776",
      "title": "Registrar una patente de invención en el Perú",
      "url": "https://www.gob.pe/14993-registrar-una-patente-de-invencion-en-el-peru",
      "actionUrl": "https://www.gob.pe/10513",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg"
    },
    {
      "id": "indecopi-3496628",
      "title": "Consultar registro de visitas de las entidades del Estado peruano",
      "url": "https://www.gob.pe/29460-instituto-nacional-de-defensa-de-la-competencia-y-de-la-proteccion-de-la-propiedad-intelectual-consultar-registro-de-visitas-de-las-entidades-del-estado-peruano",
      "actionUrl": "https://visitas.servicios.gob.pe/consultas/index.php?ruc_enti=20133840533",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg"
    },
    {
      "id": "indecopi-2123109",
      "title": "Renovar el registro de marca",
      "url": "https://www.gob.pe/17064-renovar-el-registro-de-marca",
      "actionUrl": "https://servicio.indecopi.gob.pe/sel/login.jsf",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/622/campaign_alrertas_de_consumo.jpg"
    }
  ],
  "OSIPTEL": [
    {
      "id": "osiptel-896375",
      "title": "Conocer cuántas líneas celulares tienes a tu nombre - Checa tus líneas",
      "url": "https://www.gob.pe/9162-conocer-cuantas-lineas-celulares-tienes-a-tu-nombre-checa-tus-lineas",
      "actionUrl": "https://checatuslineas.osiptel.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png"
    },
    {
      "id": "osiptel-448506",
      "title": "Consultar si el IMEI de tu teléfono celular se encuentra registrado como robado, perdido o desbloqueado - Checa tu IMEI",
      "url": "https://www.gob.pe/1170-consultar-si-el-imei-de-tu-telefono-celular-se-encuentra-registrado-como-robado-perdido-o-desbloqueado-checa-tu-imei",
      "actionUrl": "https://checatuimei.osiptel.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png"
    },
    {
      "id": "osiptel-4393060",
      "title": "Consulta de portabilidad numérica",
      "url": "https://www.gob.pe/51046-consulta-de-portabilidad-numerica",
      "actionUrl": "https://consulta.portabilidad.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png"
    },
    {
      "id": "osiptel-890003",
      "title": "Dar de baja a líneas móviles registradas a tu nombre que no reconoces",
      "url": "https://www.gob.pe/9819-dar-de-baja-a-lineas-moviles-registradas-a-tu-nombre-que-no-reconoces",
      "actionUrl": "https://www.gob.pe/9819-dar-de-baja-a-lineas-moviles-registradas-a-tu-nombre-que-no-reconoces",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png"
    },
    {
      "id": "osiptel-5791070",
      "title": "Portal del RENTESEG",
      "url": "https://www.gob.pe/77887-portal-del-renteseg",
      "actionUrl": "https://app.powerbi.com/view?r=eyJrIjoiNGM1NTUwNjktYWU1YS00NmNjLWI4NGItNWM5MDIyYzA2ZDEwIiwidCI6ImI1MDA2NWZjLWVjYjgtNDMxZC05MGZlLTJlMzA4ZDBkNjM3OCIsImMiOjR9",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png"
    },
    {
      "id": "osiptel-883559",
      "title": "Presentar un cuestionamiento de bloqueo IMEI",
      "url": "https://www.gob.pe/1174-presentar-un-cuestionamiento-de-bloqueo-imei",
      "actionUrl": "https://www.gob.pe/1174-presentar-un-cuestionamiento-de-bloqueo-imei",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png"
    },
    {
      "id": "osiptel-911432",
      "title": "Presentar un reclamo por cobro de una línea móvil no contratada",
      "url": "https://www.gob.pe/9820-presentar-un-reclamo-por-cobro-de-una-linea-movil-no-contratada",
      "actionUrl": "https://www.gob.pe/9820-presentar-un-reclamo-por-cobro-de-una-linea-movil-no-contratada",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png"
    },
    {
      "id": "osiptel-896376",
      "title": "Conocer la cobertura del servicio de Internet por empresa operadora - Checa tu Señal",
      "url": "https://www.gob.pe/9161-conocer-la-cobertura-del-servicio-de-internet-por-empresa-operadora-checa-tu-senal",
      "actionUrl": "https://checatusenal.osiptel.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png"
    },
    {
      "id": "osiptel-5478076",
      "title": "Bloqueo de celulares",
      "url": "https://www.gob.pe/71771-bloqueo-de-celulares",
      "actionUrl": "https://sociedadtelecom.pe/landing/bloqueodecelulares/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png"
    },
    {
      "id": "osiptel-7339005",
      "title": "Solicitar acceso a la información pública",
      "url": "https://www.gob.pe/110687-organismo-supervisor-de-inversion-privada-en-telecomunicaciones-solicitar-acceso-a-la-informacion-publica",
      "actionUrl": "https://www.osiptel.gob.pe/solicitud-de-acceso-a-la-informacion-publica/",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png"
    },
    {
      "id": "osiptel-3263864",
      "title": "Aporte por Regulación al OSIPTEL",
      "url": "https://www.gob.pe/9177-aporte-por-regulacion-al-osiptel",
      "actionUrl": "https://serviciosweb.osiptel.gob.pe/DJAportes/FrmLogin.aspx#no-back-button",
      "category": "Pensiones y Retiro",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png"
    },
    {
      "id": "osiptel-896423",
      "title": "Consultar tu expediente virtual del Tribunal Administrativo de Solución de Reclamos de Usuarios (TRASU)",
      "url": "https://www.gob.pe/9166-consultar-tu-expediente-virtual-del-tribunal-administrativo-de-solucion-de-reclamos-de-usuarios-trasu",
      "actionUrl": "https://serviciosweb.osiptel.gob.pe/ConsultaTRASU/",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png"
    },
    {
      "id": "osiptel-3168442",
      "title": "Consultar contratos de abonados de telefonía, cable e internet",
      "url": "https://www.gob.pe/9168-consultar-contratos-de-abonados-de-telefonia-cable-e-internet",
      "actionUrl": "https://serviciosweb.osiptel.gob.pe/SICAB/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png"
    },
    {
      "id": "osiptel-4524576",
      "title": "Acceder al Portal de Información de Usuarios de Osiptel",
      "url": "https://www.gob.pe/52996-acceder-al-portal-de-informacion-de-usuarios-de-osiptel",
      "actionUrl": "https://app.powerbi.com/view?r=eyJrIjoiZDAyZTQ4NmMtYjE2NS00ZTMwLTkzYmItZTJhY2Y1NjU3ZmZiIiwidCI6ImI1MDA2NWZjLWVjYjgtNDMxZC05MGZlLTJlMzA4ZDBkNjM3OCIsImMiOjR9",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png"
    },
    {
      "id": "osiptel-4438355",
      "title": "Organización para la Cooperación y el Desarrollo Económicos (OCDE)",
      "url": "https://www.gob.pe/52013-organizacion-para-la-cooperacion-y-el-desarrollo-economicos-ocde",
      "actionUrl": "https://www.gob.pe/52013-organizacion-para-la-cooperacion-y-el-desarrollo-economicos-ocde",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png"
    },
    {
      "id": "osiptel-3168315",
      "title": "Consultar tarifas de operadoras – SIRT Consulta de tarifas",
      "url": "https://www.gob.pe/9165-consultar-tarifas-de-operadoras-sirt-consulta-de-tarifas",
      "actionUrl": "https://serviciosweb.osiptel.gob.pe/ConsultaSIRT/Buscar/frmConsultaTar.aspx",
      "category": "Pagos de Tasas y Servicios",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png"
    },
    {
      "id": "osiptel-5160977",
      "title": "Lista de Centros Poblados con cobertura en la Web del OSIPTEL",
      "url": "https://www.gob.pe/66457-lista-de-centros-poblados-con-cobertura-en-la-web-del-osiptel",
      "actionUrl": "https://www.gob.pe/institucion/osiptel/informes-publicaciones/5683634-lista-de-centros-poblados-con-cobertura-en-la-web-del-osiptel",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png"
    },
    {
      "id": "osiptel-2115603",
      "title": "Comparar planes y tarifas de los servicios de telecomunicaciones - Checa tu plan",
      "url": "https://www.gob.pe/9163-comparar-planes-y-tarifas-de-los-servicios-de-telecomunicaciones-checa-tu-plan",
      "actionUrl": "https://www.checatuplan.pe/",
      "category": "Pagos de Tasas y Servicios",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png"
    },
    {
      "id": "osiptel-896406",
      "title": "Compara los precios de equipos del mercado de empresas operadoras, tiendas minoristas y marketplace online – Checa tu equipo móvil",
      "url": "https://www.gob.pe/9164-compara-los-precios-de-equipos-del-mercado-de-empresas-operadoras-tiendas-minoristas-y-marketplace-online-checa-tu-equipo-movil",
      "actionUrl": "https://checatuequipomovil.osiptel.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png"
    },
    {
      "id": "osiptel-5312570",
      "title": "Consultar la ubicación de puntos de venta y centros de atención de operadoras telefónicas",
      "url": "https://www.gob.pe/69064-consultar-la-ubicacion-de-puntos-de-venta-y-centros-de-atencion-de-operadoras-telefonicas",
      "actionUrl": "https://serviciosanaliticos.osiptel.gob.pe/portal/portal.jsp",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/112/campaign___C2_BANNER-WEB_PEU-2027.png"
    }
  ],
  "OSINERGMIN": [
    {
      "id": "osinergmin-5526871",
      "title": "Acceder a mesa de partes",
      "url": "https://www.gob.pe/65429-organismo-supervisor-de-la-inversion-en-energia-y-mineria-acceder-a-mesa-de-partes",
      "actionUrl": "https://ventanillavirtual.osinergmin.gob.pe/ventanilla-virtual/pages/inicio",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg"
    },
    {
      "id": "osinergmin-5084813",
      "title": "Consultar los precios de combustibles",
      "url": "https://www.gob.pe/553-consultar-los-precios-de-combustibles",
      "actionUrl": "http://www.facilito.gob.pe",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg"
    },
    {
      "id": "osinergmin-3683196",
      "title": "Acceder al Sistema de Registro y Contratación de Empresas Supervisoras (SICOES)",
      "url": "https://www.gob.pe/41294-acceder-al-sistema-de-registro-y-contratacion-de-empresas-supervisoras-sicoes",
      "actionUrl": "https://sicoes.osinergmin.gob.pe",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg"
    },
    {
      "id": "osinergmin-703400",
      "title": "Recibir notificaciones electrónicas sobre tus trámites en Osinergmin",
      "url": "https://www.gob.pe/9071-recibir-notificaciones-electronicas-sobre-tus-tramites-en-osinergmin",
      "actionUrl": "https://notificaciones.osinergmin.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg"
    },
    {
      "id": "osinergmin-1500188",
      "title": "Consultar vehículos que pueden transportar hidrocarburos",
      "url": "https://www.gob.pe/11007-consultar-vehiculos-que-pueden-transportar-hidrocarburos",
      "actionUrl": "https://pvo.osinergmin.gob.pe/msfh5/registroHidrocarburos.xhtml?method=buscar",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg"
    },
    {
      "id": "osinergmin-5644698",
      "title": "Registro de Instaladores de Gas Natural",
      "url": "https://www.gob.pe/73465-registro-de-instaladores-de-gas-natural",
      "actionUrl": "https://www.gob.pe/73465-registro-de-instaladores-de-gas-natural",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg"
    },
    {
      "id": "osinergmin-896420",
      "title": "Conocer información de Regulación Tarifaria",
      "url": "https://www.gob.pe/9959-conocer-informacion-de-regulacion-tarifaria",
      "actionUrl": "https://www.gob.pe/9959-conocer-informacion-de-regulacion-tarifaria",
      "category": "Pagos de Tasas y Servicios",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg"
    },
    {
      "id": "osinergmin-3449611",
      "title": "Conoce información sobre el Registro de Hidrocarburos del Osinergmin",
      "url": "https://www.gob.pe/37362-conoce-informacion-sobre-el-registro-de-hidrocarburos-del-osinergmin",
      "actionUrl": "https://www.osinergmin.gob.pe/empresas/hidrocarburos/Paginas/RegistroHidrocarburos/RegistrosHidrocarburos.htm",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg"
    },
    {
      "id": "osinergmin-861137",
      "title": "Consultar los precios de los balones de gas",
      "url": "https://www.gob.pe/9303-consultar-los-precios-de-los-balones-de-gas",
      "actionUrl": "https://www.facilito.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg"
    },
    {
      "id": "osinergmin-896599",
      "title": "Conoce información técnica sectorial para empresas supervisadas por el Osinergmin",
      "url": "https://www.gob.pe/9937-conoce-informacion-tecnica-sectorial-para-empresas-supervisadas-por-el-osinergmin",
      "actionUrl": "https://www.gob.pe/37189",
      "category": "Pasaportes y Control Migratorio",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg"
    },
    {
      "id": "osinergmin-1356338",
      "title": "Consultar el estado de tu solicitud en Registro de Hidrocarburos",
      "url": "https://www.gob.pe/12712-consultar-el-estado-de-tu-solicitud-en-registro-de-hidrocarburos",
      "actionUrl": "http://srvtest03.osinerg.gob.pe:23314/msfh5/registroHidrocarburos.xhtml?method=searchExp",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg"
    },
    {
      "id": "osinergmin-5527168",
      "title": "Realizar reportes y consultas a Osinergmin vía Internet",
      "url": "https://www.gob.pe/65500-realizar-reportes-y-consultas-a-osinergmin-via-internet",
      "actionUrl": "https://www.osinergmin.gob.pe/chat",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg"
    },
    {
      "id": "osinergmin-896395",
      "title": "Consultar procesos de selección para empresas supervisoras de sectores energéticos y mineros",
      "url": "https://www.gob.pe/9960-consultar-procesos-de-seleccion-para-empresas-supervisoras-de-sectores-energeticos-y-mineros",
      "actionUrl": "https://www.osinergmin.gob.pe/seccion/institucional/institucional/procesos-seleccion/presentacion",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg"
    },
    {
      "id": "osinergmin-858639",
      "title": "Reportar inconformidades con el servicio eléctrico",
      "url": "https://www.gob.pe/9304-reportar-inconformidades-con-el-servicio-electrico",
      "actionUrl": "https://www.gob.pe/9304-reportar-inconformidades-con-el-servicio-electrico",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg"
    },
    {
      "id": "osinergmin-858632",
      "title": "Solicitar el uso de gas natural en tu hogar",
      "url": "https://www.gob.pe/9305-solicitar-el-uso-de-gas-natural-en-tu-hogar",
      "actionUrl": "https://www.gob.pe/9305-solicitar-el-uso-de-gas-natural-en-tu-hogar",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg"
    },
    {
      "id": "osinergmin-3439960",
      "title": "Acceder al portal especializado para empresas",
      "url": "https://www.gob.pe/37189-acceder-al-portal-especializado-para-empresas",
      "actionUrl": "https://empresas.osinergmin.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg"
    },
    {
      "id": "osinergmin-448187",
      "title": "Tengo problemas con mi servicio de Energía o Gas Natural",
      "url": "https://www.gob.pe/403-tengo-problemas-con-mi-servicio-de-energia-o-gas-natural",
      "actionUrl": "https://www.gob.pe/403-tengo-problemas-con-mi-servicio-de-energia-o-gas-natural",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg"
    },
    {
      "id": "osinergmin-5890570",
      "title": "Análisis de Calidad Regulatoria",
      "url": "https://www.gob.pe/80357-analisis-de-calidad-regulatoria",
      "actionUrl": "https://www.gob.pe/80357-analisis-de-calidad-regulatoria",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg"
    },
    {
      "id": "osinergmin-3180734",
      "title": "Acceder al Sistema de Fiscalización del Aporte por Regulación - SIFAR",
      "url": "https://www.gob.pe/33665-acceder-al-sistema-de-fiscalizacion-del-aporte-por-regulacion-sifar",
      "actionUrl": "https://api-seguridad.sunat.gob.pe/v1/clientessol/dcdb35ac-3e61-4a90-aa82-58191e49af2a/oauth2/login?originalUrl=https://osiservicioslinea.osinergmin.gob.pe/osiservicioslinea/pages/login.jsp&state=s",
      "category": "Pensiones y Retiro",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg"
    },
    {
      "id": "osinergmin-1211441",
      "title": "Identificar vehículos informales que transportan combustibles con la aplicación Verifica con Osinergmin",
      "url": "https://www.gob.pe/12238-identificar-vehiculos-informales-que-transportan-combustibles-con-la-aplicacion-verifica-con-osinergmin",
      "actionUrl": "https://www.gob.pe/12238-identificar-vehiculos-informales-que-transportan-combustibles-con-la-aplicacion-verifica-con-osinergmin",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/570/campaign_evento.jpg"
    }
  ],
  "SUNASS": [
    {
      "id": "sunass-4896439",
      "title": "Consultar información de transparencia",
      "url": "https://www.gob.pe/61379-superintendencia-nacional-de-servicios-de-saneamiento-consultar-informacion-de-transparencia",
      "actionUrl": "https://www.transparencia.gob.pe/enlaces/pte_transparencia_enlaces.aspx?id_entidad=8",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png"
    },
    {
      "id": "sunass-3595693",
      "title": "Calcular facturación mensual de agua potable y alcantarillado - Yakúmetro",
      "url": "https://www.gob.pe/39636-calcular-facturacion-mensual-de-agua-potable-y-alcantarillado-yakumetro",
      "actionUrl": "https://apps.sunass.gob.pe/simulador-tarifario/#/home",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png"
    },
    {
      "id": "sunass-7882841",
      "title": "Herramientas CAMI YAKU",
      "url": "https://www.gob.pe/114546-herramientas-cami-yaku",
      "actionUrl": "https://camiyaku.vercel.app/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png"
    },
    {
      "id": "sunass-4438405",
      "title": "Consultar información sobre las Plantas de Tratamiento de Aguas Residuales (PTAR)",
      "url": "https://www.gob.pe/51584-consultar-informacion-sobre-las-plantas-de-tratamiento-de-aguas-residuales-ptar",
      "actionUrl": "https://aplicaciones.sunass.gob.pe/adm-ptar/ptar/listado",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png"
    },
    {
      "id": "sunass-5183968",
      "title": "Consultar información sobre los resultados del Benchmarking Regulatorio de Empresas Prestadoras de Servicios de Saneamiento",
      "url": "https://www.gob.pe/66787-consultar-informacion-sobre-los-resultados-del-benchmarking-regulatorio-de-empresas-prestadoras-de-servicios-de-saneamiento",
      "actionUrl": "https://app.powerbi.com/view?r=eyJrIjoiNTI1YzY2NGMtYzA1NS00ZjIyLTkwOWQtM2NlZjgzNjZkYjhmIiwidCI6ImZlM2RmNThlLWY4NjctNGJmMy1iYzZjLTY3NDkwMWIxYWI5OCIsImMiOjR9",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png"
    },
    {
      "id": "sunass-8227027",
      "title": "Elección de miembros del Consejo de Usuarios Lima para el periodo 2026-2028",
      "url": "https://www.gob.pe/116677-eleccion-de-miembros-del-consejo-de-usuarios-lima-para-el-periodo-2026-2028",
      "actionUrl": "https://servicio.sunass.gob.pe/consejo-de-usuarios/bandeja-de-mensajes/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png"
    },
    {
      "id": "sunass-4496687",
      "title": "Sistemas de registro de información de indicadores de servicios de saneamiento",
      "url": "https://www.gob.pe/52743-sistemas-de-registro-de-informacion-de-indicadores-de-servicios-de-saneamiento",
      "actionUrl": "https://www.gob.pe/52743-sistemas-de-registro-de-informacion-de-indicadores-de-servicios-de-saneamiento",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png"
    },
    {
      "id": "sunass-4438732",
      "title": "Consultar información sobre las organizaciones comunales monitoreadas por Sunass",
      "url": "https://www.gob.pe/51585-consultar-informacion-sobre-las-organizaciones-comunales-monitoreadas-por-sunass",
      "actionUrl": "https://app.powerbi.com/view?r=eyJrIjoiMTc1M2NmYWYtYzg5MS00OWE4LTk1YTUtZTFmZDcxNDVjNGM3IiwidCI6ImZlM2RmNThlLWY4NjctNGJmMy1iYzZjLTY3NDkwMWIxYWI5OCIsImMiOjR9",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png"
    },
    {
      "id": "sunass-998645",
      "title": "Solicitar información sobre servicios de agua potable y alcantarillado a Sunass",
      "url": "https://www.gob.pe/10486-solicitar-informacion-sobre-servicios-de-agua-potable-y-alcantarillado-a-sunass",
      "actionUrl": "https://www.gob.pe/10486-solicitar-informacion-sobre-servicios-de-agua-potable-y-alcantarillado-a-sunass",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png"
    },
    {
      "id": "sunass-4467479",
      "title": "Consultar información sobre las Áreas Técnicas Municipales (ATM)",
      "url": "https://www.gob.pe/51485-consultar-informacion-sobre-las-areas-tecnicas-municipales-atm",
      "actionUrl": "https://aplicaciones.sunass.gob.pe/RegistroATM/indicadoresATM.html",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png"
    },
    {
      "id": "sunass-6275991",
      "title": "Integridad institucional en Sunass",
      "url": "https://www.gob.pe/50166-integridad-institucional-en-sunass",
      "actionUrl": "https://www.gob.pe/50166-integridad-institucional-en-sunass",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png"
    },
    {
      "id": "sunass-3375906",
      "title": "Programa de Extensión Universitaria (PEU) en Regulación de Servicios de Agua Potable y Saneamiento",
      "url": "https://www.gob.pe/35480-programa-de-extension-universitaria-peu-en-regulacion-de-servicios-de-agua-potable-y-saneamiento",
      "actionUrl": "https://www.gob.pe/35480-programa-de-extension-universitaria-peu-en-regulacion-de-servicios-de-agua-potable-y-saneamiento",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png"
    },
    {
      "id": "sunass-5401407",
      "title": "Dirección de sanciones",
      "url": "https://www.gob.pe/70073-direccion-de-sanciones",
      "actionUrl": "https://www.gob.pe/70073-direccion-de-sanciones",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png"
    },
    {
      "id": "sunass-8223328",
      "title": "Aplicativo del Índice de Seguridad del Abastecimiento de Agua Potable de las Empresas Prestadoras (APP ISAA).",
      "url": "https://www.gob.pe/116690-aplicativo-del-indice-de-seguridad-del-abastecimiento-de-agua-potable-de-las-empresas-prestadoras-app-isaa",
      "actionUrl": "https://apps.sunass.gob.pe/isaa/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png"
    },
    {
      "id": "sunass-3836420",
      "title": "Acceder al programa ¡Participa vecino! de la Sunass",
      "url": "https://www.gob.pe/13883-acceder-al-programa-participa-vecino-de-la-sunass",
      "actionUrl": "https://www.gob.pe/13883-acceder-al-programa-participa-vecino-de-la-sunass",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png"
    },
    {
      "id": "sunass-5349494",
      "title": "Consultar las interrupciones de los servicios de saneamiento a nivel nacional",
      "url": "https://www.gob.pe/69565-consultar-las-interrupciones-de-los-servicios-de-saneamiento-a-nivel-nacional",
      "actionUrl": "https://geosunass.sunass.gob.pe/gisportal/apps/dashboards/8fae917344be47028b78bc808ee41893",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png"
    },
    {
      "id": "sunass-1636112",
      "title": "Consultar reporte de fiscalización en prestadores del ámbito rural y de pequeñas ciudades",
      "url": "https://www.gob.pe/13884-consultar-reporte-de-fiscalizacion-en-prestadores-del-ambito-rural-y-de-pequenas-ciudades",
      "actionUrl": "https://apps.sunass.gob.pe/monitoreo-rural/monitoreoPublico.html",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png"
    },
    {
      "id": "sunass-4039331",
      "title": "Verificar autenticidad de documentos emitidos por las entidades del Estado",
      "url": "https://www.gob.pe/45750-superintendencia-nacional-de-servicios-de-saneamiento-verificar-documentos-de-sunass-en-el-siged",
      "actionUrl": "https://apps.sunass.gob.pe/mpv/#/tramite/verificar",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png"
    },
    {
      "id": "sunass-3448655",
      "title": "Consultar el reporte de insumos químicos por EPS para la potabilización del agua",
      "url": "https://www.gob.pe/35483-consultar-el-reporte-de-insumos-quimicos-por-eps-para-la-potabilizacion-del-agua",
      "actionUrl": "https://app.powerbi.com/view?r=eyJrIjoiZDRjNGM1ZTEtYzkwZi00N2UwLWIyNjgtYWUwNjM4ZjZlZjExIiwidCI6ImZlM2RmNThlLWY4NjctNGJmMy1iYzZjLTY3NDkwMWIxYWI5OCIsImMiOjR9",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png"
    },
    {
      "id": "sunass-992541",
      "title": "Solicitar acceso a la información pública",
      "url": "https://www.gob.pe/10493-superintendencia-nacional-de-servicios-de-saneamiento-acceso-a-la-informacion-publica-de-la-superintendencia-nacional-de-servicios-de-saneamiento-sunass",
      "actionUrl": "https://apps.sunass.gob.pe/mpv/#/tramite/acceso-info",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/145/547/campaign_logo-SNAP.png"
    }
  ],
  "OSITRAN": [
    {
      "id": "ositran-7100977",
      "title": "Proceso de admisión 2027",
      "url": "https://www.gob.pe/106658-proceso-de-admision-2027",
      "actionUrl": "https://www.gob.pe/106658-proceso-de-admision-2027",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png"
    },
    {
      "id": "ositran-6710292",
      "title": "Temario del examen del Curso de Extensión Universitaria del Ositrán 2027",
      "url": "https://www.gob.pe/98806-temario-del-examen-del-curso-de-extension-universitaria-del-ositran-2027",
      "actionUrl": "https://www.gob.pe/98806-temario-del-examen-del-curso-de-extension-universitaria-del-ositran-2027",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png"
    },
    {
      "id": "ositran-6709632",
      "title": "Cronograma del Curso de Extensión Universitaria del Ositrán 2027",
      "url": "https://www.gob.pe/98802-cronograma-del-curso-de-extension-universitaria-del-ositran-2027",
      "actionUrl": "https://www.gob.pe/98802-cronograma-del-curso-de-extension-universitaria-del-ositran-2027",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png"
    },
    {
      "id": "ositran-7133030",
      "title": "Contrataciones de la entidad",
      "url": "https://www.gob.pe/107213-contrataciones-de-la-entidad",
      "actionUrl": "https://www.gob.pe/107213-contrataciones-de-la-entidad",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png"
    },
    {
      "id": "ositran-6709766",
      "title": "Requisitos del Curso de Extensión Universitaria del Ositrán 2027",
      "url": "https://www.gob.pe/98804-requisitos-del-curso-de-extension-universitaria-del-ositran-2027",
      "actionUrl": "https://www.gob.pe/98804-requisitos-del-curso-de-extension-universitaria-del-ositran-2027",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png"
    },
    {
      "id": "ositran-6713607",
      "title": "Preguntas frecuentes sobre el Curso de Extensión Universitaria del Ositrán 2027",
      "url": "https://www.gob.pe/98999-preguntas-frecuentes-sobre-el-curso-de-extension-universitaria-del-ositran-2027",
      "actionUrl": "https://www.gob.pe/98999-preguntas-frecuentes-sobre-el-curso-de-extension-universitaria-del-ositran-2027",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png"
    },
    {
      "id": "ositran-6709452",
      "title": "Vacantes y beneficios del Curso de Extensión Universitaria del Ositrán 2027",
      "url": "https://www.gob.pe/98799-vacantes-y-beneficios-del-curso-de-extension-universitaria-del-ositran-2027",
      "actionUrl": "https://www.gob.pe/98799-vacantes-y-beneficios-del-curso-de-extension-universitaria-del-ositran-2027",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png"
    },
    {
      "id": "ositran-6912511",
      "title": "Consultar información sobre peajes de las carreteras del Perú",
      "url": "https://www.gob.pe/102229-consultar-informacion-sobre-peajes-de-las-carreteras-del-peru",
      "actionUrl": "https://www.ositran.gob.pe/anterior/tarifas-de-peajes-en-carreteras-concesionadas/?departamento=AMAZONAS+&provincia=BONGARA+&distrito=JAZAN&peaje=&concesionaria=#mapa",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png"
    },
    {
      "id": "ositran-6883394",
      "title": "Sistema de Gestión de la Calidad-Norma ISO 9001:2015",
      "url": "https://www.gob.pe/101404-sistema-de-gestion-de-la-calidad-norma-iso-9001-2015",
      "actionUrl": "https://www.gob.pe/101404-sistema-de-gestion-de-la-calidad-norma-iso-9001-2015",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png"
    },
    {
      "id": "ositran-6987011",
      "title": "Consultas tarifarias de aeropuertos",
      "url": "https://www.gob.pe/103945-consultas-tarifarias-de-aeropuertos",
      "actionUrl": "https://www.gob.pe/103945-consultas-tarifarias-de-aeropuertos",
      "category": "Pagos de Tasas y Servicios",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png"
    },
    {
      "id": "ositran-6993364",
      "title": "Consultas tarifarias de puertos",
      "url": "https://www.gob.pe/103978-consultas-tarifarias-de-puertos",
      "actionUrl": "https://www.gob.pe/103978-consultas-tarifarias-de-puertos",
      "category": "Pagos de Tasas y Servicios",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png"
    },
    {
      "id": "ositran-6986369",
      "title": "Solicitar atención de derechos ARCO",
      "url": "https://www.gob.pe/103859-solicitar-atencion-de-derechos-arco",
      "actionUrl": "https://serviciosdigitales.ositran.gob.pe:8443/formulario-arco/#/",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png"
    },
    {
      "id": "ositran-8126678",
      "title": "Convocatorias de miembros para el Tribunal en Asuntos Administrativos del Ositrán",
      "url": "https://www.gob.pe/116189-convocatorias-de-miembros-para-el-tribunal-en-asuntos-administrativos-del-ositran",
      "actionUrl": "https://www.gob.pe/116189-convocatorias-de-miembros-para-el-tribunal-en-asuntos-administrativos-del-ositran",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png"
    },
    {
      "id": "ositran-7707136",
      "title": "Consultar el panel Puentes en Alerta",
      "url": "https://www.gob.pe/114098-consultar-el-panel-puentes-en-alerta",
      "actionUrl": "https://serviciosdigitales.ositran.gob.pe:8443/PortalDatosOsitran/#section2",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png"
    },
    {
      "id": "ositran-1227856",
      "title": "Acceder a la Casilla Electrónica del Ositrán",
      "url": "https://www.gob.pe/12123-acceder-a-la-casilla-electronica-del-ositran",
      "actionUrl": "https://serviciosositran.ositran.gob.pe/centro-servicios-digitales/#/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png"
    },
    {
      "id": "ositran-7062925",
      "title": "Consultas tarifarias",
      "url": "https://www.gob.pe/105629-consultas-tarifarias",
      "actionUrl": "https://www.gob.pe/105629-consultas-tarifarias",
      "category": "Pagos de Tasas y Servicios",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png"
    },
    {
      "id": "ositran-7052320",
      "title": "Acceder a datos abiertos de carreteras del Ositrán en la Plataforma Nacional de Datos Abiertos (PNDA)",
      "url": "https://www.gob.pe/105412-acceder-a-datos-abiertos-de-carreteras-del-ositran-en-la-plataforma-nacional-de-datos-abiertos-pnda",
      "actionUrl": "https://www.datosabiertos.gob.pe/search/field_tags/carreteras-640/type/dataset?query=OSITRAN&sort_by=changed&sort_order=DESC",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png"
    },
    {
      "id": "ositran-6890455",
      "title": "Sistema de Gestión Antisoborno-Norma ISO 37001:2025",
      "url": "https://www.gob.pe/101539-sistema-de-gestion-antisoborno-norma-iso-37001-2025",
      "actionUrl": "https://www.gob.pe/101539-sistema-de-gestion-antisoborno-norma-iso-37001-2025",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png"
    },
    {
      "id": "ositran-6912540",
      "title": "Acceder al Sistema de Aporte de Regulación (SAR)",
      "url": "https://www.gob.pe/102231-acceder-al-sistema-de-aporte-de-regulacion-sar",
      "actionUrl": "https://serviciosdigitales.ositran.gob.pe:8443/pyAportes/login.html",
      "category": "Pensiones y Retiro",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png"
    },
    {
      "id": "ositran-6986987",
      "title": "Convocatorias de miembros para el Tribunal de Solución de Controversias y Atención de Reclamos del Ositrán",
      "url": "https://www.gob.pe/103912-convocatorias-de-miembros-para-el-tribunal-de-solucion-de-controversias-y-atencion-de-reclamos-del-ositran",
      "actionUrl": "https://www.gob.pe/103912-convocatorias-de-miembros-para-el-tribunal-de-solucion-de-controversias-y-atencion-de-reclamos-del-ositran",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/117/271/campaign_Banner_CEU-gob.png"
    }
  ],
  "SEDAPAL": [
    {
      "id": "sedapal-1464468",
      "title": "Llamar a Sedapal - Aquafono",
      "url": "https://www.gob.pe/12786-llamar-a-sedapal-aquafono",
      "actionUrl": "https://www.gob.pe/12766-acceder-a-la-oficina-virtual-de-sedapal-aquanet",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg"
    },
    {
      "id": "sedapal-3280683",
      "title": "Solicitar financiamiento de deuda en Sedapal",
      "url": "https://www.gob.pe/34881-solicitar-financiamiento-de-deuda-en-sedapal",
      "actionUrl": "https://reclamovirtual.sedapal.com.pe/financiado/#/",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg"
    },
    {
      "id": "sedapal-1363217",
      "title": "Afiliarse al recibo digital de Sedapal",
      "url": "https://www.gob.pe/12767-afiliarse-al-recibo-digital-de-sedapal",
      "actionUrl": "https://reclamovirtual.sedapal.com.pe/ard/#//",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg"
    },
    {
      "id": "sedapal-1369660",
      "title": "Conocer proyectos de Sedapal en tu distrito",
      "url": "https://www.gob.pe/1068-conocer-proyectos-de-sedapal-en-tu-distrito",
      "actionUrl": "https://webapp16.sedapal.com.pe/SGPO-WEB/consultaObras%20",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg"
    },
    {
      "id": "sedapal-4283990",
      "title": "Acceder a la Sede Electrónica de Sedapal",
      "url": "https://www.gob.pe/49350-acceder-a-la-sede-electronica-de-sedapal",
      "actionUrl": "https://sedapal.administracionelectronica.net/SedeElectronica/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg"
    },
    {
      "id": "sedapal-3281982",
      "title": "Acceder al Sistema de Integración Municipios y Sedapal",
      "url": "https://www.gob.pe/35042-acceder-al-sistema-de-integracion-municipios-y-sedapal",
      "actionUrl": "http://www2.sedapal.com.pe:8080/DSIM/login.jsf",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg"
    },
    {
      "id": "sedapal-1363031",
      "title": "Acceder a la oficina virtual de Sedapal - Aquanet",
      "url": "https://www.gob.pe/12766-acceder-a-la-oficina-virtual-de-sedapal-aquanet",
      "actionUrl": "https://webapp16.sedapal.com.pe/socv/#/iniciar-sesion",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg"
    },
    {
      "id": "sedapal-3334743",
      "title": "Acceder al sistema de empresas fontaneras de Sedapal",
      "url": "https://www.gob.pe/36034-acceder-al-sistema-de-empresas-fontaneras-de-sedapal",
      "actionUrl": "https://appsedapal.sedapal.com.pe/fontanerosweb/login.xhtml",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg"
    },
    {
      "id": "sedapal-1466750",
      "title": "Solicitar el servicio de gasfitería a domicilio de Sedapal",
      "url": "https://www.gob.pe/12811-solicitar-el-servicio-de-gasfiteria-a-domicilio-de-sedapal",
      "actionUrl": "https://www.gob.pe/12766-acceder-a-la-oficina-virtual-de-sedapal-aquanet",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg"
    },
    {
      "id": "sedapal-1458775",
      "title": "Realizar pagos de mi servicio de agua con Sedapal Móvil",
      "url": "https://www.gob.pe/12788-realizar-pagos-de-mi-servicio-de-agua-con-sedapal-movil",
      "actionUrl": "https://www.gob.pe/12766-acceder-a-la-oficina-virtual-de-sedapal-aquanet",
      "category": "Pagos de Tasas y Servicios",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg"
    },
    {
      "id": "sedapal-1500111",
      "title": "Productos ahorradores de Sedapal",
      "url": "https://www.gob.pe/12810-productos-ahorradores-de-sedapal",
      "actionUrl": "https://www.gob.pe/12810-productos-ahorradores-de-sedapal",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg"
    },
    {
      "id": "sedapal-4095736",
      "title": "Hacer consultas sobre mi servicio de agua - Chatbot Clarita de Sedapal",
      "url": "https://www.gob.pe/47196-hacer-consultas-sobre-mi-servicio-de-agua-chatbot-clarita-de-sedapal",
      "actionUrl": "https://clarita.sedapalteinforma.com.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg"
    },
    {
      "id": "sedapal-5652465",
      "title": "Solicitar la suspensión temporal, cancelación o baja del servicio de Sedapal",
      "url": "https://www.gob.pe/74876-solicitar-la-suspension-temporal-cancelacion-o-baja-del-servicio-de-sedapal",
      "actionUrl": "https://webapp16.sedapal.com.pe/socv/#/iniciar-sesion",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg"
    },
    {
      "id": "sedapal-3671053",
      "title": "Modelo de Integridad de SEDAPAL",
      "url": "https://www.gob.pe/40716-modelo-de-integridad-de-sedapal",
      "actionUrl": "https://www.gob.pe/40716-modelo-de-integridad-de-sedapal",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg"
    },
    {
      "id": "sedapal-3443412",
      "title": "Pagar servicios de Sedapal a través del cargo en cuenta de tu tarjeta",
      "url": "https://www.gob.pe/37219-pagar-servicios-de-sedapal-a-traves-del-cargo-en-cuenta-de-tu-tarjeta",
      "actionUrl": "https://www.gob.pe/12766-acceder-a-la-oficina-virtual-de-sedapal-aquanet",
      "category": "Pagos de Tasas y Servicios",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg"
    },
    {
      "id": "sedapal-3450232",
      "title": "Expedientes técnicos de proyectos y obras de Sedapal",
      "url": "https://www.gob.pe/37365-expedientes-tecnicos-de-proyectos-y-obras-de-sedapal",
      "actionUrl": "https://www.gob.pe/37365-expedientes-tecnicos-de-proyectos-y-obras-de-sedapal",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg"
    },
    {
      "id": "sedapal-1544113",
      "title": "Programa de Educación Sanitaria y Ambiental de Sedapal",
      "url": "https://www.gob.pe/12809-programa-de-educacion-sanitaria-y-ambiental-de-sedapal",
      "actionUrl": "https://www.gob.pe/12766-acceder-a-la-oficina-virtual-de-sedapal-aquanet",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg"
    },
    {
      "id": "sedapal-6294622",
      "title": "Laboratorio de Innovación y Transformación Digital de Sedapal",
      "url": "https://www.gob.pe/88805-laboratorio-de-innovacion-y-transformacion-digital-de-sedapal",
      "actionUrl": "https://www.gob.pe/88805-laboratorio-de-innovacion-y-transformacion-digital-de-sedapal",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg"
    },
    {
      "id": "sedapal-4272294",
      "title": "Acceder a la Lista de Declarantes de SEDAPAL",
      "url": "https://www.gob.pe/49471-acceder-a-la-lista-de-declarantes-de-sedapal",
      "actionUrl": "https://www.gob.pe/49471-acceder-a-la-lista-de-declarantes-de-sedapal",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg"
    },
    {
      "id": "sedapal-3837835",
      "title": "Acceder a la Oficina Virtual de Sedapar SA",
      "url": "https://www.gob.pe/43004-acceder-a-la-oficina-virtual-de-sedapar-sa",
      "actionUrl": "https://ov.sedapar.com.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/118/599/campaign_ASI_CUIDAMOS..._PARA_WEB__1_.jpg"
    }
  ],
  "ONPE": [
    {
      "id": "onpe-5079920",
      "title": "Obtener constancia de Locación de Servicios en ONPE",
      "url": "https://www.gob.pe/64681-obtener-constancia-de-locacion-de-servicios-en-onpe",
      "actionUrl": "https://tuconstancia.onpe.gob.pe/",
      "category": "Pensiones y Retiro",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg"
    },
    {
      "id": "onpe-1434596",
      "title": "Presentar excusa para no ser miembro de mesa",
      "url": "https://www.gob.pe/8227-presentar-excusa-para-no-ser-miembro-de-mesa",
      "actionUrl": "https://www.gob.pe/8227-presentar-excusa-para-no-ser-miembro-de-mesa",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 15.80",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg"
    },
    {
      "id": "onpe-549403",
      "title": "Histórico de resultados electorales",
      "url": "https://www.gob.pe/8359-historico-de-resultados-electorales",
      "actionUrl": "https://www.onpe.gob.pe/elecciones/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg"
    },
    {
      "id": "onpe-1434597",
      "title": "Presentar justificación de salud para no ser miembro de mesa",
      "url": "https://www.gob.pe/12771-presentar-justificacion-de-salud-para-no-ser-miembro-de-mesa",
      "actionUrl": "https://www.gob.pe/12771-presentar-justificacion-de-salud-para-no-ser-miembro-de-mesa",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 15.80",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg"
    },
    {
      "id": "onpe-5531470",
      "title": "Capacitación",
      "url": "https://www.gob.pe/72580-capacitacion",
      "actionUrl": "https://www.gob.pe/72580-capacitacion",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg"
    },
    {
      "id": "onpe-4270462",
      "title": "Solicitar la verificación en documentos electorales",
      "url": "https://www.gob.pe/49469-solicitar-la-verificacion-en-documentos-electorales",
      "actionUrl": "https://www.gob.pe/49469-solicitar-la-verificacion-en-documentos-electorales",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 12.00",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg"
    },
    {
      "id": "onpe-503161",
      "title": "Solicitar tacha de un miembro de mesa",
      "url": "https://www.gob.pe/8203-solicitar-tacha-de-un-miembro-de-mesa",
      "actionUrl": "https://www.gob.pe/8203-solicitar-tacha-de-un-miembro-de-mesa",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg"
    },
    {
      "id": "onpe-2514732",
      "title": "Votar en elecciones del Perú desde el extranjero",
      "url": "https://www.gob.pe/8162-votar-en-elecciones-del-peru-desde-el-extranjero",
      "actionUrl": "https://www.gob.pe/8162-votar-en-elecciones-del-peru-desde-el-extranjero",
      "category": "Pasaportes y Control Migratorio",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg"
    },
    {
      "id": "onpe-5211192",
      "title": "Revocatoria",
      "url": "https://www.gob.pe/67274-revocatoria",
      "actionUrl": "https://www.gob.pe/67274-revocatoria",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg"
    },
    {
      "id": "onpe-3736257",
      "title": "Declarar información financiera como candidato - EG 2026",
      "url": "https://www.gob.pe/41957-declarar-informacion-financiera-como-candidato-eg-2026",
      "actionUrl": "https://www.onpe.gob.pe/modMarco-Legal/casilla-electronica-onpe.pdf",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg"
    },
    {
      "id": "onpe-964404",
      "title": "Acceder a la rendición de cuentas de las organizaciones políticas - Claridad",
      "url": "https://www.gob.pe/10261-acceder-a-la-rendicion-de-cuentas-de-las-organizaciones-politicas-claridad",
      "actionUrl": "https://claridadportal.onpe.gob.pe/",
      "category": "Pagos de Tasas y Servicios",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg"
    },
    {
      "id": "onpe-6393283",
      "title": "ECEP ONPE",
      "url": "https://www.gob.pe/90944-ecep-onpe",
      "actionUrl": "http://pki.onpe.gob.pe/eceponpe.html",
      "category": "Pensiones y Retiro",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg"
    },
    {
      "id": "onpe-7798768",
      "title": "Declarar información financiera como candidato - ERM 2026",
      "url": "https://www.gob.pe/114398-declarar-informacion-financiera-como-candidato-erm-2026",
      "actionUrl": "https://www.onpe.gob.pe/modMarco-Legal/casilla-electronica-onpe.pdf",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg"
    },
    {
      "id": "onpe-1174816",
      "title": "Instalar mesas de sufragio en localidades alejadas de la capital de su distrito",
      "url": "https://www.gob.pe/10258-instalar-mesas-de-sufragio-en-localidades-alejadas-de-la-capital-de-su-distrito",
      "actionUrl": "https://www.web.onpe.gob.pe/mpve/#/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg"
    },
    {
      "id": "onpe-5165545",
      "title": "Sistemas de Gestión en la ONPE",
      "url": "https://www.gob.pe/66556-sistemas-de-gestion-en-la-onpe",
      "actionUrl": "https://www.gob.pe/66556-sistemas-de-gestion-en-la-onpe",
      "category": "Pensiones y Retiro",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg"
    },
    {
      "id": "onpe-4924542",
      "title": "Acceder a datos abiertos",
      "url": "https://www.gob.pe/61986-acceder-a-datos-abiertos",
      "actionUrl": "https://www.datosabiertos.gob.pe/group/oficina-nacional-de-procesos-electorales-onpe",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg"
    },
    {
      "id": "onpe-3016595",
      "title": "Derechos de participación y control ciudadanos",
      "url": "https://www.gob.pe/29845-derechos-de-participacion-y-control-ciudadanos",
      "actionUrl": "https://www.gob.pe/29845-derechos-de-participacion-y-control-ciudadanos",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg"
    },
    {
      "id": "onpe-1179659",
      "title": "Solicitar asistencia técnica en procesos electorales",
      "url": "https://www.gob.pe/10263-solicitar-asistencia-tecnica-en-procesos-electorales",
      "actionUrl": "https://www.web.onpe.gob.pe/mpve/#/",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg"
    },
    {
      "id": "onpe-5218712",
      "title": "Acceder a tus certificados digitales asociados a tu DNIe con la aplicación Onpeid",
      "url": "https://www.gob.pe/67439-acceder-a-tus-certificados-digitales-asociados-a-tu-dnie-con-la-aplicacion-onpeid",
      "actionUrl": "https://www.gob.pe/67439-acceder-a-tus-certificados-digitales-asociados-a-tu-dnie-con-la-aplicacion-onpeid",
      "category": "Identidad y Certificados",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg"
    },
    {
      "id": "onpe-3741209",
      "title": "Financiamiento Público Directo",
      "url": "https://www.gob.pe/42096-financiamiento-publico-directo",
      "actionUrl": "https://www.gob.pe/42096-financiamiento-publico-directo",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/134/846/campaign_53358628317_17646946af_k.jpg"
    }
  ],
  "JNE": [
    {
      "id": "jne-448177",
      "title": "Consultar si tienes multas electorales",
      "url": "https://www.gob.pe/382-consultar-si-tienes-multas-electorales",
      "actionUrl": "https://multas.jne.gob.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg"
    },
    {
      "id": "jne-7666686",
      "title": "Solicitar dispensa o justificación de multa electoral",
      "url": "https://www.gob.pe/113905-solicitar-dispensa-o-justificacion-de-multa-electoral",
      "actionUrl": "https://www.gob.pe/113905-solicitar-dispensa-o-justificacion-de-multa-electoral",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 25.90",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg"
    },
    {
      "id": "jne-448178",
      "title": "Pagar mi multa electoral",
      "url": "https://www.gob.pe/383-pagar-mi-multa-electoral",
      "actionUrl": "https://www.pagalo.pe/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg"
    },
    {
      "id": "jne-6728028",
      "title": "Desafiliación a una organización política",
      "url": "https://www.gob.pe/99307-desafiliacion-a-una-organizacion-politica",
      "actionUrl": "https://www.gob.pe/99307-desafiliacion-a-una-organizacion-politica",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg"
    },
    {
      "id": "jne-448216",
      "title": "Excusa o justificación al cargo de miembro de mesa y dispensa por no votar",
      "url": "https://www.gob.pe/473-excusa-o-justificacion-al-cargo-de-miembro-de-mesa-y-dispensa-por-no-votar",
      "actionUrl": "https://www.gob.pe/473-excusa-o-justificacion-al-cargo-de-miembro-de-mesa-y-dispensa-por-no-votar",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg"
    },
    {
      "id": "jne-448180",
      "title": "Prescripción de la Multa Electoral",
      "url": "https://www.gob.pe/385-prescripcion-de-la-multa-electoral",
      "actionUrl": "https://www.gob.pe/385-prescripcion-de-la-multa-electoral",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg"
    },
    {
      "id": "jne-6717190",
      "title": "Conoce a tus autoridades vigentes",
      "url": "https://www.gob.pe/99071-conoce-a-tus-autoridades-vigentes",
      "actionUrl": "https://www.gob.pe/99071-conoce-a-tus-autoridades-vigentes",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg"
    },
    {
      "id": "jne-448179",
      "title": "Proceso de cobranza de una multa electoral",
      "url": "https://www.gob.pe/384-proceso-de-cobranza-de-una-multa-electoral",
      "actionUrl": "https://www.gob.pe/384-proceso-de-cobranza-de-una-multa-electoral",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg"
    },
    {
      "id": "jne-6717311",
      "title": "Multas Electorales",
      "url": "https://www.gob.pe/99072-multas-electorales",
      "actionUrl": "https://www.gob.pe/99072-multas-electorales",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg"
    },
    {
      "id": "jne-6747302",
      "title": "Denunciar un presunto acto de corrupción",
      "url": "https://www.gob.pe/99787-jurado-nacional-de-elecciones-denunciar-un-presunto-acto-de-corrupcion",
      "actionUrl": "https://denuncias.servicios.gob.pe/",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg"
    },
    {
      "id": "jne-6718612",
      "title": "Registro de Organizaciones Políticas (ROP)",
      "url": "https://www.gob.pe/99079-registro-de-organizaciones-politicas-rop",
      "actionUrl": "https://www.gob.pe/99079-registro-de-organizaciones-politicas-rop",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg"
    },
    {
      "id": "jne-6719119",
      "title": "Declaración Jurada de Hoja de Vida",
      "url": "https://www.gob.pe/99085-declaracion-jurada-de-hoja-de-vida",
      "actionUrl": "https://www.gob.pe/99085-declaracion-jurada-de-hoja-de-vida",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg"
    },
    {
      "id": "jne-6716928",
      "title": "Infogob",
      "url": "https://www.gob.pe/99067-infogob",
      "actionUrl": "https://www.gob.pe/99067-infogob",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg"
    },
    {
      "id": "jne-7747029",
      "title": "Consulta de expedientes",
      "url": "https://www.gob.pe/114218-consulta-de-expedientes",
      "actionUrl": "https://www.gob.pe/114218-consulta-de-expedientes",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg"
    },
    {
      "id": "jne-7959480",
      "title": "Consultar normas sobre integridad y lucha contra la corrupción",
      "url": "https://www.gob.pe/115140-consultar-normas-sobre-integridad-y-lucha-contra-la-corrupcion",
      "actionUrl": "https://www.gob.pe/115140-consultar-normas-sobre-integridad-y-lucha-contra-la-corrupcion",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg"
    },
    {
      "id": "jne-6716777",
      "title": "Contratación de bienes y servicios mayores a 8 UIT",
      "url": "https://www.gob.pe/99062-contratacion-de-bienes-y-servicios-mayores-a-8-uit",
      "actionUrl": "https://www.gob.pe/99062-contratacion-de-bienes-y-servicios-mayores-a-8-uit",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 5",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg"
    },
    {
      "id": "jne-6716998",
      "title": "Mesa de Partes Virtual",
      "url": "https://www.gob.pe/99069-mesa-de-partes-virtual",
      "actionUrl": "https://www.gob.pe/99069-mesa-de-partes-virtual",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg"
    },
    {
      "id": "jne-6718949",
      "title": "Casilla Electrónica",
      "url": "https://www.gob.pe/99081-casilla-electronica",
      "actionUrl": "https://www.gob.pe/99081-casilla-electronica",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg"
    },
    {
      "id": "jne-497393",
      "title": "Infórmate sobre los candidatos a la Segunda Elección Regional 2022 - Voto Informado",
      "url": "https://www.gob.pe/7902-informate-sobre-los-candidatos-a-la-segunda-eleccion-regional-2022-voto-informado",
      "actionUrl": "https://votoinformado.jne.gob.pe/voto",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg"
    },
    {
      "id": "jne-6716880",
      "title": "Voto Informado",
      "url": "https://www.gob.pe/99065-voto-informado",
      "actionUrl": "https://www.gob.pe/99065-voto-informado",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/139/996/campaign_VotoInformado.jpg"
    }
  ],
  "INDECI": [
    {
      "id": "indeci-4101215",
      "title": "Denunciar un presunto acto de corrupción",
      "url": "https://www.gob.pe/47204-instituto-nacional-de-defensa-civil-denunciar-un-presunto-acto-de-corrupcion",
      "actionUrl": "https://denuncias.servicios.gob.pe/",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg"
    },
    {
      "id": "indeci-448475",
      "title": "¿Qué hacer en caso de sismo?",
      "url": "https://www.gob.pe/1053-que-hacer-en-caso-de-sismo",
      "actionUrl": "https://www.gob.pe/1053-que-hacer-en-caso-de-sismo",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg"
    },
    {
      "id": "indeci-923663",
      "title": "Cómo elaborar tu Plan Familiar de Emergencia",
      "url": "https://www.gob.pe/10165-como-elaborar-tu-plan-familiar-de-emergencia",
      "actionUrl": "https://www.gob.pe/10165-como-elaborar-tu-plan-familiar-de-emergencia",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg"
    },
    {
      "id": "indeci-964427",
      "title": "Recibir capacitación en Gestión Reactiva del Riesgo de Desastres - INDECI Educ@",
      "url": "https://www.gob.pe/10181-recibir-capacitacion-en-gestion-reactiva-del-riesgo-de-desastres-indeci-educ",
      "actionUrl": "https://portal.indeci.gob.pe/indeci-educa/cursos-virtuales.html",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg"
    },
    {
      "id": "indeci-920251",
      "title": "Recibir información u orientación sobre preparación ante emergencias y desastres",
      "url": "https://www.gob.pe/10148-recibir-informacion-u-orientacion-sobre-preparacion-ante-emergencias-y-desastres",
      "actionUrl": "https://www.gob.pe/10148-recibir-informacion-u-orientacion-sobre-preparacion-ante-emergencias-y-desastres",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg"
    },
    {
      "id": "indeci-952024",
      "title": "Acceder a información y reportes de emergencias en tiempo real",
      "url": "https://www.gob.pe/10081-acceder-a-informacion-y-reportes-de-emergencias-en-tiempo-real",
      "actionUrl": "https://portal.indeci.gob.pe/emergencias/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg"
    },
    {
      "id": "indeci-939449",
      "title": "Acceder a la Biblioteca Virtual del Indeci",
      "url": "https://www.gob.pe/10182-acceder-a-la-biblioteca-virtual-del-indeci",
      "actionUrl": "http://bvpad.indeci.gob.pe/html/es/home.html",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg"
    },
    {
      "id": "indeci-921302",
      "title": "Acceder a información estadística del INDECI",
      "url": "https://www.gob.pe/10157-acceder-a-informacion-estadistica-del-indeci",
      "actionUrl": "https://app.powerbi.com/view?r=eyJrIjoiNTFkOWRhYWQtYmMwMS00OWNmLTg4ZTctNjZjYTc1OTIyN2M0IiwidCI6IjNlZWNkMjZlLTlhNTUtNDg4MC04ODEyLWEzMGZjZGU3OGEyZCJ9&pageName=ReportSectioncd99edcca07a5ff10551",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg"
    },
    {
      "id": "indeci-924057",
      "title": "Comprobar si estás preparado para un sismo",
      "url": "https://www.gob.pe/10169-comprobar-si-estas-preparado-para-un-sismo",
      "actionUrl": "http://sinpad.indeci.gob.pe/mochila-emergencia/mochila.html",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg"
    },
    {
      "id": "indeci-5154803",
      "title": "Prepararse ante una emergencia o desastre con la aplicación Familia Preparada de Indeci",
      "url": "https://www.gob.pe/66386-prepararse-ante-una-emergencia-o-desastre-con-la-aplicacion-familia-preparada-de-indeci",
      "actionUrl": "https://www.gob.pe/66386-prepararse-ante-una-emergencia-o-desastre-con-la-aplicacion-familia-preparada-de-indeci",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg"
    },
    {
      "id": "indeci-1043452",
      "title": "Presentar proyectos de investigación en Gestión Reactiva del Riesgo de Desastres",
      "url": "https://www.gob.pe/10765-presentar-proyectos-de-investigacion-en-gestion-reactiva-del-riesgo-de-desastres",
      "actionUrl": "http://mesapartesvirtual.indeci.gob.pe/TradocVirtual/Views/Registro_Tramite.aspx",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg"
    },
    {
      "id": "indeci-924053",
      "title": "¿Qué debes hacer después de una emergencia?",
      "url": "https://www.gob.pe/10250-que-debes-hacer-despues-de-una-emergencia",
      "actionUrl": "https://www.gob.pe/10250-que-debes-hacer-despues-de-una-emergencia",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg"
    },
    {
      "id": "indeci-4101330",
      "title": "Modelo de Integridad del Instituto Nacional de Defensa Civil",
      "url": "https://www.gob.pe/47261-modelo-de-integridad-del-instituto-nacional-de-defensa-civil",
      "actionUrl": "https://www.gob.pe/47261-modelo-de-integridad-del-instituto-nacional-de-defensa-civil",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg"
    },
    {
      "id": "indeci-5154874",
      "title": "Reportar daños por desastres naturales en la aplicación EDAN",
      "url": "https://www.gob.pe/66388-reportar-danos-por-desastres-naturales-en-la-aplicacion-edan",
      "actionUrl": "https://www.gob.pe/66388-reportar-danos-por-desastres-naturales-en-la-aplicacion-edan",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg"
    },
    {
      "id": "indeci-924052",
      "title": "¿Cómo organizar un simulacro familiar?",
      "url": "https://www.gob.pe/10249-como-organizar-un-simulacro-familiar",
      "actionUrl": "https://www.gob.pe/10249-como-organizar-un-simulacro-familiar",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/143/492/campaign_WhatsApp_Image_2026-07-08_at_3.25.39_PM.jpeg"
    }
  ],
  "OEFA": [
    {
      "id": "oefa-5893105",
      "title": "Servicio Nacional de Denuncias Ambientales",
      "url": "https://www.gob.pe/913-servicio-nacional-de-denuncias-ambientales",
      "actionUrl": "https://sistemas.oefa.gob.pe/sifa/frontend/mf-registro-denuncias/#/bienvenida",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg"
    },
    {
      "id": "oefa-1912258",
      "title": "Plataforma Única de Servicios Digitales – PLUSD",
      "url": "https://www.gob.pe/15170-plataforma-unica-de-servicios-digitales-plusd",
      "actionUrl": "https://sistemas.oefa.gob.pe/plusd/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg"
    },
    {
      "id": "oefa-2785861",
      "title": "Inventarios de residuos sólidos del OEFA",
      "url": "https://www.gob.pe/25416-inventarios-de-residuos-solidos-del-oefa",
      "actionUrl": "https://www.oefa.gob.pe/wp-content/uploads/2026/03/Ficha-para-brindar-informacion-sobre-Area-Degradada-por-Residuos-Solidos-Municipales.docx",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg"
    },
    {
      "id": "oefa-2798432",
      "title": "Acceder al visor de áreas degradadas por residuos sólidos a nivel nacional",
      "url": "https://www.gob.pe/25543-acceder-al-visor-de-areas-degradadas-por-residuos-solidos-a-nivel-nacional",
      "actionUrl": "https://pifa.oefa.gob.pe/AppResiduos/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg"
    },
    {
      "id": "oefa-6176981",
      "title": "Canales de pago de multas ambientales",
      "url": "https://www.gob.pe/84379-canales-de-pago-de-multas-ambientales",
      "actionUrl": "https://www.gob.pe/84379-canales-de-pago-de-multas-ambientales",
      "category": "Pagos de Tasas y Servicios",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg"
    },
    {
      "id": "oefa-448444",
      "title": "Reportar emergencias ambientales al OEFA",
      "url": "https://www.gob.pe/923-reportar-emergencias-ambientales-al-oefa",
      "actionUrl": "https://www.gob.pe/923-reportar-emergencias-ambientales-al-oefa",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg"
    },
    {
      "id": "oefa-2204760",
      "title": "Consultar el Registro Único de Infractores Ambientales Sancionados por el OEFA",
      "url": "https://www.gob.pe/17355-consultar-el-registro-unico-de-infractores-ambientales-sancionados-por-el-oefa",
      "actionUrl": "https://sistemas.oefa.gob.pe/Portalpifa/infractoresAmbientales.do",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg"
    },
    {
      "id": "oefa-1964675",
      "title": "Acceder a los datos abiertos del OEFA",
      "url": "https://www.gob.pe/15555-acceder-a-los-datos-abiertos-del-oefa",
      "actionUrl": "https://datosabiertos.oefa.gob.pe/home",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg"
    },
    {
      "id": "oefa-1788694",
      "title": "Registro de terceros evaluadores, supervisores y fiscalizadores del OEFA",
      "url": "https://www.gob.pe/14853-registro-de-terceros-evaluadores-supervisores-y-fiscalizadores-del-oefa",
      "actionUrl": "https://www.gob.pe/14853-registro-de-terceros-evaluadores-supervisores-y-fiscalizadores-del-oefa",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg"
    },
    {
      "id": "oefa-1858019",
      "title": "Cronograma de obligaciones ambientales",
      "url": "https://www.gob.pe/13651-cronograma-de-obligaciones-ambientales",
      "actionUrl": "https://www.gob.pe/13651-cronograma-de-obligaciones-ambientales",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg"
    },
    {
      "id": "oefa-2918290",
      "title": "Consultar el Portal Interactivo de Fiscalización Ambiental (PIFA)",
      "url": "https://www.gob.pe/27431-consultar-el-portal-interactivo-de-fiscalizacion-ambiental-pifa",
      "actionUrl": "https://sistemas.oefa.gob.pe/pifa/mfe/#/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg"
    },
    {
      "id": "oefa-2125475",
      "title": "Supervisión a Entidades de Fiscalización Ambiental (EFA)",
      "url": "https://www.gob.pe/16651-supervision-a-entidades-de-fiscalizacion-ambiental-efa",
      "actionUrl": "https://www.gob.pe/16651-supervision-a-entidades-de-fiscalizacion-ambiental-efa",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg"
    },
    {
      "id": "oefa-5248916",
      "title": "Estimar el grado de riesgo ambiental de una emergencia a través de la aplicación ERA emergencias",
      "url": "https://www.gob.pe/67752-estimar-el-grado-de-riesgo-ambiental-de-una-emergencia-a-traves-de-la-aplicacion-era-emergencias",
      "actionUrl": "https://www.gob.pe/67752-estimar-el-grado-de-riesgo-ambiental-de-una-emergencia-a-traves-de-la-aplicacion-era-emergencias",
      "category": "Educación, Becas y Títulos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg"
    },
    {
      "id": "oefa-448446",
      "title": "Aporte por Regulación",
      "url": "https://www.gob.pe/934-aporte-por-regulacion",
      "actionUrl": "https://www.gob.pe/934-aporte-por-regulacion",
      "category": "Pensiones y Retiro",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg"
    },
    {
      "id": "oefa-1789480",
      "title": "Portal Interactivo para las Fiscalías Especializadas en Materia Ambiental - FEMA",
      "url": "https://www.gob.pe/14063-portal-interactivo-para-las-fiscalias-especializadas-en-materia-ambiental-fema",
      "actionUrl": "https://lookerstudio.google.com/embed/reporting/832ef93c-85e1-4fff-8419-508afeb1d11a/page/53tDC",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg"
    },
    {
      "id": "oefa-2801096",
      "title": "Conocer las intervenciones ambientales realizadas por el OEFA",
      "url": "https://www.gob.pe/25606-conocer-las-intervenciones-ambientales-realizadas-por-el-oefa",
      "actionUrl": "https://sistemas.oefa.gob.pe/Portalpifa/Intervenciones.do",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg"
    },
    {
      "id": "oefa-2125485",
      "title": "Monitoreo Ambiental",
      "url": "https://www.gob.pe/16650-monitoreo-ambiental",
      "actionUrl": "https://www.gob.pe/15555-acceder-al-portal-interactivo-de-fiscalizacion-ambiental-del-oefa",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg"
    },
    {
      "id": "oefa-2801098",
      "title": "Conocer el reporte estadístico del OEFA",
      "url": "https://www.gob.pe/25605-conocer-el-reporte-estadistico-del-oefa",
      "actionUrl": "https://sistemas.oefa.gob.pe/Portalpifa/OEFAenCifras.do",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg"
    },
    {
      "id": "oefa-1790151",
      "title": "Inscribirse en el Registro de terceros evaluadores, supervisores y fiscalizadores del OEFA",
      "url": "https://www.gob.pe/14152-inscribirse-en-el-registro-de-terceros-evaluadores-supervisores-y-fiscalizadores-del-oefa",
      "actionUrl": "https://sistemas.oefa.gob.pe/sirte/#/inicio",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg"
    },
    {
      "id": "oefa-2801097",
      "title": "Ver los mapas y registros de denuncias recibidos por el OEFA",
      "url": "https://www.gob.pe/25607-ver-los-mapas-y-registros-de-denuncias-recibidos-por-el-oefa",
      "actionUrl": "https://oefa.maps.arcgis.com/apps/dashboards/9d24b76e3b6c4c7cb4035ff36d93902c",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/120/073/campaign_portada.jpg"
    }
  ],
  "SERFOR": [
    {
      "id": "serfor-2907454",
      "title": "Registrarme en la mesa de partes virtual de Serfor",
      "url": "https://www.gob.pe/27571-registrarme-en-la-mesa-de-partes-virtual-de-serfor",
      "actionUrl": "https://apps.serfor.gob.pe/mesadepartesvirtual/#/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg"
    },
    {
      "id": "serfor-6237190",
      "title": "WhatsApp ALERTA SERFOR",
      "url": "https://www.gob.pe/87537-whatsapp-alerta-serfor",
      "actionUrl": "https://www.gob.pe/87537-whatsapp-alerta-serfor",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg"
    },
    {
      "id": "serfor-1055179",
      "title": "Acceder al Sistema Nacional de Información Forestal y de Fauna Silvestre (SNIFFS)",
      "url": "https://www.gob.pe/10303-acceder-al-sistema-nacional-de-informacion-forestal-y-de-fauna-silvestre-sniffs",
      "actionUrl": "https://sniffs.serfor.gob.pe/inicio/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg"
    },
    {
      "id": "serfor-1313000",
      "title": "Solicitar licencia de caza deportiva",
      "url": "https://www.gob.pe/9348-solicitar-licencia-de-caza-deportiva",
      "actionUrl": "https://apps.serfor.gob.pe/mesadepartesvirtual/#/",
      "category": "Licencias y Tránsito",
      "costo": "S/ 53.20",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg"
    },
    {
      "id": "serfor-5958286",
      "title": "Acceder al TUPA de Serfor",
      "url": "https://www.gob.pe/81972-acceder-al-tupa-de-serfor",
      "actionUrl": "https://apps.serfor.gob.pe/tupaserfor/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg"
    },
    {
      "id": "serfor-2829336",
      "title": "Sistema Nacional de Gestión Forestal y de Fauna Silvestre (Sinafor)",
      "url": "https://www.gob.pe/26065-sistema-nacional-de-gestion-forestal-y-de-fauna-silvestre-sinafor",
      "actionUrl": "https://www.gob.pe/26065-sistema-nacional-de-gestion-forestal-y-de-fauna-silvestre-sinafor",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg"
    },
    {
      "id": "serfor-6173125",
      "title": "Autorización para investigar flora o fauna silvestre fuera de áreas naturales protegidas",
      "url": "https://www.gob.pe/85797-autorizacion-para-investigar-flora-o-fauna-silvestre-fuera-de-areas-naturales-protegidas",
      "actionUrl": "https://apps.serfor.gob.pe/mesadepartesvirtual/#/",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg"
    },
    {
      "id": "serfor-1361038",
      "title": "Solicitar inscripción en el Registro Nacional de Plantaciones Forestales",
      "url": "https://www.gob.pe/9344-solicitar-inscripcion-en-el-registro-nacional-de-plantaciones-forestales",
      "actionUrl": "https://apps.serfor.gob.pe/mesadepartesvirtual/#/",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg"
    },
    {
      "id": "serfor-6190001",
      "title": "Autorización de Desbosque",
      "url": "https://www.gob.pe/86458-autorizacion-de-desbosque",
      "actionUrl": "https://apps.serfor.gob.pe/mesadepartesvirtual/#/",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 4392.10",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg"
    },
    {
      "id": "serfor-1041147",
      "title": "Denunciar un delito o infracción en materia forestal o de fauna silvestre",
      "url": "https://www.gob.pe/10305-denunciar-un-delito-o-infraccion-en-materia-forestal-o-de-fauna-silvestre",
      "actionUrl": "http://appweb.serfor.gob.pe/alertaserfor/",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg"
    },
    {
      "id": "serfor-4768360",
      "title": "Sobre la Opinión al Documento Técnico para el Estudio del Patrimonio, en el marco de instrumento de gestión ambiental",
      "url": "https://www.gob.pe/57475-sobre-la-opinion-al-documento-tecnico-para-el-estudio-del-patrimonio-en-el-marco-de-instrumento-de-gestion-ambiental",
      "actionUrl": "https://www.gob.pe/57475-sobre-la-opinion-al-documento-tecnico-para-el-estudio-del-patrimonio-en-el-marco-de-instrumento-de-gestion-ambiental",
      "category": "Educación, Becas y Títulos",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg"
    },
    {
      "id": "serfor-1385200",
      "title": "Solicitar la licencia para el ejercicio de la regencia forestal y de fauna silvestre",
      "url": "https://www.gob.pe/9345-solicitar-la-licencia-para-el-ejercicio-de-la-regencia-forestal-y-de-fauna-silvestre",
      "actionUrl": "https://apps.serfor.gob.pe/mesadepartesvirtual/#/",
      "category": "Licencias y Tránsito",
      "costo": "S/ 311.30",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg"
    },
    {
      "id": "serfor-1498166",
      "title": "Solicitar licencia para la captura comercial y práctica de cetrería",
      "url": "https://www.gob.pe/9347-solicitar-licencia-para-la-captura-comercial-y-practica-de-cetreria",
      "actionUrl": "https://apps.serfor.gob.pe/mesadepartesvirtual/#/",
      "category": "Licencias y Tránsito",
      "costo": "S/ 76.70",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg"
    },
    {
      "id": "serfor-1153829",
      "title": "Realizar consultas relacionadas al Serfor",
      "url": "https://www.gob.pe/9368-realizar-consultas-relacionadas-al-serfor",
      "actionUrl": "https://www.gob.pe/9368-realizar-consultas-relacionadas-al-serfor",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg"
    },
    {
      "id": "serfor-1171724",
      "title": "Solicitar autorización para establecimiento de centros de transformación primaria, lugares de acopio, depósitos y centros de comercialización de productos en estado natural o con transformación primaria",
      "url": "https://www.gob.pe/9307-solicitar-autorizacion-para-establecimiento-de-centros-de-transformacion-primaria-lugares-de-acopio-depositos-y-centros-de-comercializacion-de-productos-en-estado-natural-o-con-transformacion-primaria",
      "actionUrl": "https://apps.serfor.gob.pe/mesadepartesvirtual/#/",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 51.50",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg"
    },
    {
      "id": "serfor-1152922",
      "title": "Presentar declaración de manejo para el aprovechamiento sostenible de camélidos sudamericanos silvestres",
      "url": "https://www.gob.pe/9349-presentar-declaracion-de-manejo-para-el-aprovechamiento-sostenible-de-camelidos-sudamericanos-silvestres",
      "actionUrl": "https://apps.serfor.gob.pe/mesadepartesvirtual/#/",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 400.10",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg"
    },
    {
      "id": "serfor-4815382",
      "title": "Carta de Servicios para el procedimiento denominado “Permiso para la importación o reexportación de flora y fauna silvestres”",
      "url": "https://www.gob.pe/58133-carta-de-servicios-para-el-procedimiento-denominado-permiso-para-la-importacion-o-reexportacion-de-flora-y-fauna-silvestres",
      "actionUrl": "https://www.gob.pe/58133-carta-de-servicios-para-el-procedimiento-denominado-permiso-para-la-importacion-o-reexportacion-de-flora-y-fauna-silvestres",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg"
    },
    {
      "id": "serfor-1361019",
      "title": "Solicitar la licencia de uso de la Marca Vicuña Perú o Vicuña Perú Artesanía",
      "url": "https://www.gob.pe/9351-solicitar-la-licencia-de-uso-de-la-marca-vicuna-peru-o-vicuna-peru-artesania",
      "actionUrl": "https://apps.serfor.gob.pe/mesadepartesvirtual/#/",
      "category": "Licencias y Tránsito",
      "costo": "S/ 405.00",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg"
    },
    {
      "id": "serfor-1511777",
      "title": "Obtener permiso de exportación Cites para fibra de vicuña",
      "url": "https://www.gob.pe/9357-obtener-permiso-de-exportacion-cites-para-fibra-de-vicuna",
      "actionUrl": "https://apps.serfor.gob.pe/mesadepartesvirtual/#/",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 405.90",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg"
    },
    {
      "id": "serfor-1388196",
      "title": "Permisos de exportación Cites para fibra de vicuña y sus productos",
      "url": "https://www.gob.pe/9355-permisos-de-exportacion-cites-para-fibra-de-vicuna-y-sus-productos",
      "actionUrl": "https://www.gob.pe/9355-permisos-de-exportacion-cites-para-fibra-de-vicuna-y-sus-productos",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/077/417/campaign_WhatsApp_Image_2024-09-12_at_12.38.43__1_.jpeg"
    }
  ],
  "SENASA": [
    {
      "id": "senasa-1079064",
      "title": "Consultar los requisitos sanitarios y fitosanitarios para el comercio exterior",
      "url": "https://www.gob.pe/10950-consultar-los-requisitos-sanitarios-y-fitosanitarios-para-el-comercio-exterior",
      "actionUrl": "https://servicios.senasa.gob.pe/consultaRequisitos/consultarRequisitos.action",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg"
    },
    {
      "id": "senasa-1095335",
      "title": "Obtener certificado fitosanitario de exportación o reexportación de plantas, productos vegetales y otros artículos reglamentados",
      "url": "https://www.gob.pe/10093-obtener-certificado-fitosanitario-de-exportacion-o-reexportacion-de-plantas-productos-vegetales-y-otros-articulos-reglamentados",
      "actionUrl": "https://authorize.vuce.gob.pe/public/login-options/mercancias-restringidas",
      "category": "Identidad y Certificados",
      "costo": "S/ 43.20",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg"
    },
    {
      "id": "senasa-1271700",
      "title": "Acceder al sistema de trámites de plaguicidas en línea (Sitpel) del Senasa",
      "url": "https://www.gob.pe/12383-acceder-al-sistema-de-tramites-de-plaguicidas-en-linea-sitpel-del-senasa",
      "actionUrl": "https://servicios.senasa.gob.pe/sig/sigia.html",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg"
    },
    {
      "id": "senasa-1079060",
      "title": "Obtener certificación fitosanitaria de lugares de producción",
      "url": "https://www.gob.pe/10095-obtener-certificacion-fitosanitaria-de-lugares-de-produccion",
      "actionUrl": "https://authorize.vuce.gob.pe/public/login-options/mercancias-restringidas",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 20.20",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg"
    },
    {
      "id": "senasa-1161923",
      "title": "Obtener Permiso Fitosanitario de Importación (PFI) de productos vegetales",
      "url": "https://www.gob.pe/10078-obtener-permiso-fitosanitario-de-importacion-pfi-de-productos-vegetales",
      "actionUrl": "https://authorize.vuce.gob.pe/public/login-options/mercancias-restringidas",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 61.20",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg"
    },
    {
      "id": "senasa-1079063",
      "title": "Obtener autorización para trasladar frutas y hortalizas dentro del Perú",
      "url": "https://www.gob.pe/10097-obtener-autorizacion-para-trasladar-frutas-y-hortalizas-dentro-del-peru",
      "actionUrl": "https://www.gob.pe/10097-obtener-autorizacion-para-trasladar-frutas-y-hortalizas-dentro-del-peru",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 29.90",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg"
    },
    {
      "id": "senasa-1079058",
      "title": "Obtener certificación de plantas de tratamiento y/o empaque de productos vegetales",
      "url": "https://www.gob.pe/10096-obtener-certificacion-de-plantas-de-tratamiento-y-o-empaque-de-productos-vegetales",
      "actionUrl": "https://authorize.vuce.gob.pe/public/login-options/mercancias-restringidas",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg"
    },
    {
      "id": "senasa-1195557",
      "title": "Obtener Reporte de Inspección y Verificación (RIV) para importar plantas, productos vegetales y otros artículos",
      "url": "https://www.gob.pe/10079-obtener-reporte-de-inspeccion-y-verificacion-riv-para-importar-plantas-productos-vegetales-y-otros-articulos",
      "actionUrl": "https://authorize.vuce.gob.pe/public/login-options/mercancias-restringidas",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 26.60",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg"
    },
    {
      "id": "senasa-1204210",
      "title": "Acceder al Sistema informático de control la producción orgánica - Sicpo",
      "url": "https://www.gob.pe/12243-acceder-al-sistema-informatico-de-control-la-produccion-organica-sicpo",
      "actionUrl": "https://servicios.senasa.gob.pe/sig/sicpo.html",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg"
    },
    {
      "id": "senasa-1184696",
      "title": "Obtener registro de importadores, lugares de producción y responsables técnicos de material sujeto a cuarentena posentrada",
      "url": "https://www.gob.pe/10082-obtener-registro-de-importadores-lugares-de-produccion-y-responsables-tecnicos-de-material-sujeto-a-cuarentena-posentrada",
      "actionUrl": "https://authorize.vuce.gob.pe/public/login-options/mercancias-restringidas",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 216.00",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg"
    },
    {
      "id": "senasa-1075963",
      "title": "Solicitar autorización sanitaria de almacén para guarda custodia",
      "url": "https://www.gob.pe/10080-solicitar-autorizacion-sanitaria-de-almacen-para-guarda-custodia",
      "actionUrl": "https://authorize.vuce.gob.pe/public/login-options/mercancias-restringidas",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg"
    },
    {
      "id": "senasa-7952820",
      "title": "Alertas AMBER - Registro de Personas Desaparecidas en el Perú para ayudar a encontrarlas",
      "url": "https://www.gob.pe/115084-alertas-amber-registro-de-personas-desaparecidas-en-el-peru-para-ayudar-a-encontrarlas",
      "actionUrl": "https://www.gob.pe/115084-alertas-amber-registro-de-personas-desaparecidas-en-el-peru-para-ayudar-a-encontrarlas",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg"
    },
    {
      "id": "senasa-1195048",
      "title": "Solicitar prueba de Inmunofluorescencia Directa para descarte de rabia",
      "url": "https://www.gob.pe/12079-solicitar-prueba-de-inmunofluorescencia-directa-para-descarte-de-rabia",
      "actionUrl": "https://www.gob.pe/12079-solicitar-prueba-de-inmunofluorescencia-directa-para-descarte-de-rabia",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 32.80",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg"
    },
    {
      "id": "senasa-1185676",
      "title": "Cuarentena posentrada",
      "url": "https://www.gob.pe/11739-cuarentena-posentrada",
      "actionUrl": "https://www.gob.pe/11739-cuarentena-posentrada",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg"
    },
    {
      "id": "senasa-1185673",
      "title": "Obtener Reporte de Inspección y Verificación (RIV) para tránsito internacional de plantas, productos vegetales y otros artículos",
      "url": "https://www.gob.pe/10084-obtener-reporte-de-inspeccion-y-verificacion-riv-para-transito-internacional-de-plantas-productos-vegetales-y-otros-articulos",
      "actionUrl": "https://authorize.vuce.gob.pe/public/login-options/mercancias-restringidas",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 26.60",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg"
    },
    {
      "id": "senasa-1161892",
      "title": "Obtener Permiso Fitosanitario de Tránsito Internacional (PFTI) de productos vegetales",
      "url": "https://www.gob.pe/11453-obtener-permiso-fitosanitario-de-transito-internacional-pfti-de-productos-vegetales",
      "actionUrl": "https://authorize.vuce.gob.pe/public/login-options/mercancias-restringidas",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 61.20",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg"
    },
    {
      "id": "senasa-1176403",
      "title": "Obtener registro de importadores de germoplasma de semilla sexual con fines de investigación",
      "url": "https://www.gob.pe/10083-obtener-registro-de-importadores-de-germoplasma-de-semilla-sexual-con-fines-de-investigacion",
      "actionUrl": "https://authorize.vuce.gob.pe/public/login-options/mercancias-restringidas",
      "category": "Trámites y Servicios Principales",
      "costo": "S/ 72.00",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg"
    },
    {
      "id": "senasa-1196156",
      "title": "Solicitar prueba de ELISA para descarte de leucosis enzootica bovina",
      "url": "https://www.gob.pe/12086-solicitar-prueba-de-elisa-para-descarte-de-leucosis-enzootica-bovina",
      "actionUrl": "https://www.gob.pe/12086-solicitar-prueba-de-elisa-para-descarte-de-leucosis-enzootica-bovina",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 18.20",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg"
    },
    {
      "id": "senasa-1186012",
      "title": "Solicitar descarte de infección por tuberculosis bovina al Senasa",
      "url": "https://www.gob.pe/11504-solicitar-descarte-de-infeccion-por-tuberculosis-bovina-al-senasa",
      "actionUrl": "https://www.gob.pe/11504-solicitar-descarte-de-infeccion-por-tuberculosis-bovina-al-senasa",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 119.00",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg"
    },
    {
      "id": "senasa-1186008",
      "title": "Solicitar cultivo e identificación de bacterias anaerobias y microaerófilas",
      "url": "https://www.gob.pe/11510-solicitar-cultivo-e-identificacion-de-bacterias-anaerobias-y-microaerofilas",
      "actionUrl": "https://www.gob.pe/11510-solicitar-cultivo-e-identificacion-de-bacterias-anaerobias-y-microaerofilas",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "S/ 33.90",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/005/864/campaign_revisando_tomate_en_campo_Mesa_de_trabajo_1.jpg"
    }
  ],
  "SUSALUD": [
    {
      "id": "susalud-924291",
      "title": "Conocer si cuentas con un seguro de salud - Resuelve",
      "url": "https://www.gob.pe/10192-conocer-si-cuentas-con-un-seguro-de-salud-resuelve",
      "actionUrl": "https://app1.susalud.gob.pe/registro/",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg"
    },
    {
      "id": "susalud-448215",
      "title": "Presentar una consulta o denuncia sobre un servicio de salud",
      "url": "https://www.gob.pe/469-presentar-una-consulta-o-denuncia-sobre-un-servicio-de-salud",
      "actionUrl": "http://app17.susalud.gob.pe:8081/webservices/formulario_consulta/index.html",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg"
    },
    {
      "id": "susalud-927241",
      "title": "Obtener información de las Instituciones Prestadoras de Servicios de Salud - Renipress",
      "url": "https://www.gob.pe/10202-obtener-informacion-de-las-instituciones-prestadoras-de-servicios-de-salud-renipress",
      "actionUrl": "http://app20.susalud.gob.pe:8080/registro-renipress-webapp/listadoEstablecimientosRegistrados.htm?action=mostrarBuscar#no-back-button",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg"
    },
    {
      "id": "susalud-448141",
      "title": "Seguros de salud del Perú",
      "url": "https://www.gob.pe/281-seguros-de-salud-del-peru",
      "actionUrl": "https://www.gob.pe/281-seguros-de-salud-del-peru",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg"
    },
    {
      "id": "susalud-921297",
      "title": "Inscribir tu Institución Prestadora de Servicios de Salud en el Renipress",
      "url": "https://www.gob.pe/10194-inscribir-tu-institucion-prestadora-de-servicios-de-salud-en-el-renipress",
      "actionUrl": "http://app20.susalud.gob.pe:8080/registro-renipress-webapp/login.htm#no-back-button",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg"
    },
    {
      "id": "susalud-5153079",
      "title": "Hacer consultas o reclamos sobre establecimientos de salud en la aplicación Susalud Contigo",
      "url": "https://www.gob.pe/66363-hacer-consultas-o-reclamos-sobre-establecimientos-de-salud-en-la-aplicacion-susalud-contigo",
      "actionUrl": "https://play.google.com/store/apps/details?id=pe.gob.susalud.servicio",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg"
    },
    {
      "id": "susalud-921304",
      "title": "Actualizar la información de tu Institución Prestadora de Servicios de Salud en el Renipress",
      "url": "https://www.gob.pe/10225-actualizar-la-informacion-de-tu-institucion-prestadora-de-servicios-de-salud-en-el-renipress",
      "actionUrl": "http://app20.susalud.gob.pe:8080/registro-renipress-webapp/login.htm#no-back-button",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg"
    },
    {
      "id": "susalud-5159699",
      "title": "Ayudar a proteger los derechos del ciudadano en servicios de salud a través de la app BPM PAC Móvil de Susalud",
      "url": "https://www.gob.pe/66429-ayudar-a-proteger-los-derechos-del-ciudadano-en-servicios-de-salud-a-traves-de-la-app-bpm-pac-movil-de-susalud",
      "actionUrl": "https://play.google.com/store/apps/details?id=pe.gob.susalud.bpm",
      "category": "Atención en Salud y Aseguramiento",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg"
    },
    {
      "id": "susalud-1448023",
      "title": "Acceder a actividades virtuales para pensionistas - Yuyaq",
      "url": "https://www.gob.pe/10300-acceder-a-actividades-virtuales-para-pensionistas-yuyaq",
      "actionUrl": "https://www.facebook.com/YuyaqCasaPensionista",
      "category": "Pensiones y Retiro",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg"
    },
    {
      "id": "susalud-915671",
      "title": "Presentar un reclamo ante una entidad pública",
      "url": "https://www.gob.pe/10174-superintendencia-nacional-de-salud-acceder-al-libro-de-reclamaciones-de-susalud",
      "actionUrl": "https://reclamos.servicios.gob.pe/",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg"
    },
    {
      "id": "susalud-2433222",
      "title": "Acceder a mesa de partes",
      "url": "https://www.gob.pe/21931-superintendencia-nacional-de-salud-acceder-a-mesa-de-partes",
      "actionUrl": "https://app15.susalud.gob.pe:8082/registro",
      "category": "Trámites y Servicios Principales",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg"
    },
    {
      "id": "susalud-1369663",
      "title": "Denunciar un presunto acto de corrupción",
      "url": "https://www.gob.pe/12828-superintendencia-nacional-de-salud-denunciar-presuntos-actos-de-corrupcion-en-susalud",
      "actionUrl": "https://denuncias.servicios.gob.pe/",
      "category": "Reclamos y Fiscalización",
      "costo": "Gratuito",
      "imageUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg",
      "bannerUrl": "https://cdn.www.gob.pe/uploads/campaign/photo/000/008/430/campaign_TV_banner.jpg"
    }
  ]
};

/**
 * Obtiene la lista de trámites oficiales curados para una entidad.
 */
export function getEntityOfficialProcedures(acronym: string): DirectProcedureItem[] {
  const upper = acronym.toUpperCase().trim();
  if (OFFICIAL_PROCEDURES_BY_ENTITY[upper]) {
    return OFFICIAL_PROCEDURES_BY_ENTITY[upper];
  }
  // Búsqueda por coincidencia parcial
  const key = Object.keys(OFFICIAL_PROCEDURES_BY_ENTITY).find(k => upper.includes(k) || k.includes(upper));
  if (key) {
    return OFFICIAL_PROCEDURES_BY_ENTITY[key];
  }
  return [];
}

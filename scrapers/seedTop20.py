# -*- coding: utf-8 -*-
import firebase_admin
from firebase_admin import credentials, firestore
import hashlib
from datetime import datetime

cred = credentials.Certificate('firebase_credentials.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

data = [
  {"title": "Emitir recibo por honorarios electrónico", "url": "https://ww1.sunat.gob.pe/ol-ti-itrheopciones/RHESunat.htm", "cat": "emprender"},
  {"title": "Consultar estado de tu trámite para la entrega de tu DNI", "url": "https://serviciosportal.reniec.gob.pe/cetdnipi/inicio.htm", "cat": "identificacion-ciudadana"},
  {"title": "Verificar si estás afiliado al SIS", "url": "https://cel.sis.gob.pe/SisConsultaEnLinea", "cat": "salud"},
  {"title": "Consultar los datos de un vehículo - Consulta Vehicular", "url": "https://consultavehicular.sunarp.gob.pe/", "cat": "conducir"},
  {"title": "Obtener tu Certificado Único Laboral (CUL)", "url": "https://www.empleosperu.gob.pe/CertificadoUnicoLaboral/", "cat": "trabajo"},
  {"title": "Consultar el estado del RUC", "url": "https://e-consultaruc.sunat.gob.pe/", "cat": "emprender"},
  {"title": "Emitir factura electrónica - Sistema de Emisión Electrónica", "url": "https://ww1.sunat.gob.pe/ol-ti-itfesimpopciones/FESimpSunat.htm", "cat": "emprender"},
  {"title": "Imprimir constancia de inscripción en el RNP", "url": "https://www.rnp.gob.pe/constancia/rnp_constancia/validacertificadotodos.asp", "cat": "emprender"},
  {"title": "Antecedentes Penales", "url": "https://cape.pj.gob.pe/cape/", "cat": "denunciar-o-reclamar"},
  {"title": "Solicitar copia certificada de acta o partida en Reniec", "url": "https://apps.reniec.gob.pe/actascertificadas", "cat": "identificacion-ciudadana"},
  {"title": "Acceder a la oficina virtual de Sedapal Aquanet", "url": "https://www.gob.pe/institucion/sedapal/tramites-y-servicios", "cat": "informacion-de-entidades"},
  {"title": "Obtener ficha RUC electrónica", "url": "https://orientacion.sunat.gob.pe/sites/default/files/inline-files/ficha_ruc_0.pdf", "cat": "emprender"},
  {"title": "Consultar si tu seguro EsSalud está activo", "url": "https://dondemeatiendo.essalud.gob.pe/", "cat": "salud"},
  {"title": "Conocer cuántas líneas celulares tienes a tu nombre - Checa", "url": "https://checatuslineas.osiptel.gob.pe/", "cat": "informacion-de-entidades"},
  {"title": "Buscar procedimientos de selección de entidades públicas", "url": "https://prodapp2.seace.gob.pe/seacebus-uiwd-pub/buscadorPublico/buscadorPublico.xhtml", "cat": "informacion-de-entidades"},
  {"title": "Solicitar la suspensión de retenciones de cuarta categoría", "url": "https://www.sunat.gob.pe/accesosDirectos/suspensionCuarta.html", "cat": "emprender"},
  {"title": "Obtener Certificado de Antecedentes Policiales para uso nacional", "url": "https://www.gob.pe/324-certificado-de-antecedentes-policiales-para-viaje-o-uso-en-el-extranjero", "cat": "identificacion-ciudadana"},
  {"title": "Obtener pasaporte electrónico para mayores de edad", "url": "https://www.gob.pe/208-obtener-pasaporte-electronico-para-menores-de-edad", "cat": "viajar-a-otro-pais"},
  {"title": "Solicitar Certificado de Inscripción (C4)", "url": "https://apps.reniec.gob.pe/certins", "cat": "identificacion-ciudadana"},
  {"title": "Solicitar duplicado de DNI azul, DNIe y DNI de menor", "url": "https://identidad.reniec.gob.pe/preguntas-frecuentes-dni", "cat": "identificacion-ciudadana"}
]

count = 0
for item in data:
    hash_id = hashlib.md5(item['url'].encode('utf-8')).hexdigest()[:10]
    doc_id = 'top_' + hash_id
    
    db.collection('tramites').document(doc_id).set({
        'name': item['title'],
        'desc': "Trámite altamente consultado por la ciudadanía.",
        'category_id': item['cat'],
        'url': item['url'],
        'is_external': True,
        'is_top': True,
        'views': 999999,
        'updated_at': datetime.now().isoformat()
    }, merge=True)
    
    print(f"Seeded: {item['title']} -> {item['cat']}")
    count += 1

print(f"Completado: {count} tramites")

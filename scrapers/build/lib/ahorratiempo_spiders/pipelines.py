import os
import json
import firebase_admin
from firebase_admin import credentials, firestore
from itemadapter import ItemAdapter
import logging

class FirestorePipeline:
    def __init__(self):
        self.db = None
        self.collection_name = "tramites_descubiertos"

    def open_spider(self, spider):
        # En Zyte, podemos pasar las credenciales como un setting de Scrapy o variable de entorno
        creds_json_str = spider.settings.get("FIREBASE_CREDS_JSON") or os.environ.get("FIREBASE_CREDS_JSON")
        
        if not firebase_admin._apps:
            if creds_json_str:
                logging.info("Inicializando Firebase usando FIREBASE_CREDS_JSON env var.")
                creds_dict = json.loads(creds_json_str)
                cred = credentials.Certificate(creds_dict)
                firebase_admin.initialize_app(cred)
            elif os.path.exists("firebase_credentials.json"):
                logging.info("Inicializando Firebase usando firebase_credentials.json.")
                cred = credentials.Certificate("firebase_credentials.json")
                firebase_admin.initialize_app(cred)
            else:
                logging.warning("No se encontraron credenciales de Firebase. Los datos no se guardarán en Firestore.")
                return
        
        try:
            self.db = firestore.client()
        except Exception as e:
            logging.error(f"Error conectando a Firestore: {e}")

    def close_spider(self, spider):
        pass

    def process_item(self, item, spider):
        if not self.db:
            return item
            
        adapter = ItemAdapter(item)
        doc_id = adapter.get('id')
        
        try:
            doc_ref = self.db.collection(self.collection_name).document(doc_id)
            doc_ref.set(adapter.asdict(), merge=True)
            logging.info(f"Trámite guardado en Firestore: {doc_id}")
        except Exception as e:
            logging.error(f"Error guardando {doc_id} en Firestore: {e}")
            
        return item

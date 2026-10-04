import os
import json
from pathlib import Path
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore

env_path = Path("d:/proyecto_abril/portal-tramites/.env")
load_dotenv(dotenv_path=env_path)
creds_json = os.environ.get("FIREBASE_CREDS_JSON")

if creds_json:
    creds_dict = json.loads(creds_json)
    if not firebase_admin._apps:
        cred = credentials.Certificate(creds_dict)
        firebase_admin.initialize_app(cred)
else:
    print("No FIREBASE_CREDS_JSON found")
    exit(1)

db = firestore.client()
docs = db.collection('tramites').stream()
titles = [doc.to_dict().get('title', '') for doc in docs]
print(f"Total tramites: {len(titles)}")
dni_tramites = [t for t in titles if 'dni' in t.lower()]
print(f"Tramites con DNI: {dni_tramites}")

import os
import firebase_admin
from firebase_admin import credentials, firestore

# Setup Firebase
cred_path = os.getenv("FIREBASE_CREDS_JSON", "d:/proyecto_abril/portal-tramites/.env")
# Wait, let's use the exact same initialization as the spider
import json
from pathlib import Path
from dotenv import load_dotenv

env_path = Path("d:/proyecto_abril/portal-tramites/.env")
load_dotenv(dotenv_path=env_path)
creds_json = os.environ.get("FIREBASE_CREDS_JSON")

if creds_json:
    creds_dict = json.loads(creds_json)
    cred = credentials.Certificate(creds_dict)
    firebase_admin.initialize_app(cred)
else:
    print("No FIREBASE_CREDS_JSON found in .env")
    exit(1)

db = firestore.client()

def delete_collection(coll_ref, batch_size):
    docs = coll_ref.limit(batch_size).stream()
    deleted = 0

    for doc in docs:
        print(f'Deleting doc {doc.id} => {doc.to_dict()}')
        doc.reference.delete()
        deleted = deleted + 1

    if deleted >= batch_size:
        return delete_collection(coll_ref, batch_size)

print("Borrando todos los documentos en tramites_descubiertos...")
delete_collection(db.collection('tramites_descubiertos'), 100)
print("¡Colección borrada exitosamente!")

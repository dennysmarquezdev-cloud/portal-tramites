import json
import sqlite3
import os
import glob
import sys

json_file = "d:/proyecto_abril/portal-tramites/scrapers/sunat_completo.json"
if not os.path.exists(json_file):
    print("El archivo json no existe aún.")
    sys.exit(0)

# El archivo puede tener ][ por append de scrapy, lo arreglamos en memoria
with open(json_file, 'r', encoding='utf-8') as f:
    raw_json = f.read().replace('][', ',')
    data = json.loads(raw_json)

print(f"Loaded {len(data)} items from JSON.")

sql_commands = []
sql_commands.append("DELETE FROM tramites WHERE entidad = 'SUNAT';")
sql_commands.append("DELETE FROM tramites_fts WHERE rowid IN (SELECT id FROM tramites WHERE entidad = 'SUNAT');")

import re

for i, item in enumerate(data):
    # Escapar comillas simples
    titulo = item.get('name', '').replace("'", "''")
    url = item.get('url_fuente', '').replace("'", "''")
    entidad = item.get('entity', '').replace("'", "''")
    content = item.get('raw_content', '')
    
    # Extraer costo con Regex si est vaco
    costo = item.get('costo', '')
    if not costo:
        if re.search(r'costo[\s:]*gratuito', content, re.IGNORECASE) or re.search(r'trmite[\s:]*gratuito', content, re.IGNORECASE):
            costo = "Gratuito"
        else:
            match_soles = re.search(r'(?:costo:|pagar)[\s\w]*(S/\s*\d+(?:\.\d+)?)', content, re.IGNORECASE)
            if match_soles:
                costo = match_soles.group(1).strip()
    
    content = content.replace("'", "''")
    costo = costo.replace("'", "''")
    action_url = (item.get('action_url') or '').replace("'", "''")
    
    current_id = 2000 + i  # Piloto empieza en 2000
    
    sql_commands.append(f"INSERT OR REPLACE INTO tramites (id, titulo_oficial, url, entidad, texto_completo, raw_content, costo, action_url, url_fuente) VALUES ({current_id}, '{titulo}', '{url}', '{entidad}', '{content}', '{content}', '{costo}', '{action_url}', '{url}');")
    sql_commands.append(f"INSERT OR REPLACE INTO tramites_fts (rowid, titulo_oficial, texto_completo) VALUES ({current_id}, '{titulo}', '{content}');")

sql_script = "inject_piloto.sql"
with open(sql_script, 'w', encoding='utf-8') as f:
    f.write("\n".join(sql_commands))

print(f"Generated {sql_script} con {len(sql_commands)} comandos.")

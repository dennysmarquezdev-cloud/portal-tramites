import json

with open('../scrapers/sunat_completo.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

sql = "ALTER TABLE tramites ADD COLUMN action_url TEXT;\n"
sql += "ALTER TABLE tramites ADD COLUMN costo TEXT;\n"
sql += "ALTER TABLE tramites ADD COLUMN url_fuente TEXT;\n"
sql += "ALTER TABLE tramites ADD COLUMN texto_completo TEXT;\n"

import re

for item in data:
    action_url = (item.get('action_url') or '').replace("'", "''")
    url_fuente = item.get('url_fuente', '').replace("'", "''")
    content = item.get('raw_content', '')
    
    costo = item.get('costo', '')
    if not costo:
        if re.search(r'costo[\s:]*gratuito', content, re.IGNORECASE) or re.search(r'trmite[\s:]*gratuito', content, re.IGNORECASE):
            costo = "Gratuito"
        else:
            match_soles = re.search(r'(?:costo:|pagar)[\s\w]*(S/\s*\d+(?:\.\d+)?)', content, re.IGNORECASE)
            if match_soles:
                costo = match_soles.group(1).strip()
    costo = costo.replace("'", "''")
    
    # Just update action_url and costo
    sql += f"UPDATE tramites SET action_url = '{action_url}', costo = '{costo}' WHERE url = '{url_fuente}';\n"

with open('update_db.sql', 'w', encoding='utf-8') as f:
    f.write(sql)

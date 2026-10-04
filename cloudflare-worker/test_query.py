import sqlite3
import os
import glob

# Find the local D1 db
d1_dir = "d:/proyecto_abril/portal-tramites/cloudflare-worker/.wrangler/state/v3/d1/miniflare-D1DatabaseObject"
db_files = glob.glob(os.path.join(d1_dir, "*.sqlite"))
if not db_files:
    print("DB not found")
else:
    db_path = db_files[0]
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    cur.execute("SELECT titulo_oficial FROM tramites_fts WHERE tramites_fts MATCH '\"emitir\"* AND \"recibo\"*'")
    print(cur.fetchall())
    conn.close()

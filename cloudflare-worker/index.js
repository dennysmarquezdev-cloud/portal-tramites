// Helper robusto para ejecutar modelos activos en Cloudflare Workers AI
async function runAINonStream(env, messages, maxTokens = 1500) {
  const models = [
    "@cf/meta/llama-3.2-3b-instruct",
    "@cf/meta/llama-3.1-8b-instruct-fp8",
    "@cf/meta/llama-3.1-8b-instruct-awq",
    "@cf/meta/llama-3-8b-instruct",
    "@cf/qwen/qwen2.5-7b-instruct"
  ];
  let lastErr = null;
  for (const model of models) {
    try {
      const aiRes = await env.AI.run(model, {
        messages,
        max_tokens: maxTokens
      });
      return { aiRes, modelUsed: model };
    } catch (err) {
      console.warn(`[Workers AI] Model ${model} failed:`, err.message);
      lastErr = err;
    }
  }
  throw lastErr || new Error("Todos los modelos de Workers AI fallaron.");
}

async function runAIWithStream(env, messages, options = {}) {
  const models = [
    "@cf/meta/llama-3.2-3b-instruct",
    "@cf/meta/llama-3.1-8b-instruct-fp8",
    "@cf/meta/llama-3.1-8b-instruct-awq",
    "@cf/meta/llama-3-8b-instruct",
    "@cf/qwen/qwen2.5-7b-instruct",
    "@cf/meta/llama-3.2-1b-instruct"
  ];
  let lastErr = null;
  for (const model of models) {
    try {
      const stream = await env.AI.run(model, {
        messages,
        max_tokens: options.max_tokens || 1200,
        temperature: options.temperature || 0.2,
        repetition_penalty: options.repetition_penalty || 1.15,
        stream: true
      });
      return { stream, modelUsed: model };
    } catch (err) {
      console.warn(`[Workers AI Stream] Model ${model} failed:`, err.message);
      lastErr = err;
    }
  }
  throw lastErr || new Error("Todos los modelos de Workers AI con streaming fallaron.");
}

const ALLOWED_GOV_DOMAINS = [
  "gob.pe",
  "sunat.gob.pe",
  "reniec.gob.pe",
  "mtc.gob.pe",
  "sunarp.gob.pe",
  "sat.gob.pe",
  "pj.gob.pe",
  "policia.gob.pe",
  "onp.gob.pe",
  "essalud.gob.pe",
  "sis.gob.pe",
  "sbs.gob.pe",
  "pagalo.pe",
  "empleosperu.gob.pe",
  "apeseg.org.pe",
  "asociacionafp.pe",
  "indecopi.gob.pe",
  "osiptel.gob.pe",
  "osinergmin.gob.pe",
  "sunass.gob.pe",
  "ositran.gob.pe",
  "onpe.gob.pe",
  "jne.gob.pe",
  "oefa.gob.pe",
  "senasa.gob.pe",
  "serfor.gob.pe",
  "indeci.gob.pe",
  "minedu.gob.pe",
  "sunedu.gob.pe",
  "sineace.gob.pe",
  "pronabec.gob.pe",
  "sedapal.com.pe",
  "sedapar.com.pe",
  "mpfn.gob.pe",
  "inpe.gob.pe",
  "defensoria.gob.pe",
  "minjus.gob.pe",
  "bn.com.pe",
  "smv.gob.pe",
  "atu.gob.pe",
  "sutran.gob.pe",
  "sunafil.gob.pe",
  "susalud.gob.pe"
];

function sanitizeAndValidateOfficialUrl(rawUrl, defaultEntidad) {
  if (!rawUrl || typeof rawUrl !== "string") {
    return { valid: false, url: "" };
  }

  const trimmed = rawUrl.trim();
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    return { valid: false, url: "" };
  }

  try {
    const parsed = new URL(trimmed);
    const hostname = parsed.hostname.toLowerCase();

    // 1. Verificación de dominio contra lista blanca oficial
    const isAllowed = ALLOWED_GOV_DOMAINS.some(domain => 
      hostname === domain || hostname.endsWith(`.${domain}`)
    );

    if (!isAllowed) {
      return { valid: false, url: "" };
    }

    // 2. Canonicalización de SUNAT SOL (Elimina deep-links rotos con ?exe=)
    if (hostname.includes("sunat.gob.pe")) {
      if (hostname.includes("e-menu.sunat.gob.pe")) {
        return {
          valid: true,
          url: "https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm",
          entidad: "SUNAT"
        };
      }
      if (hostname.includes("e-consultaruc.sunat.gob.pe")) {
        return {
          valid: true,
          url: "https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias",
          entidad: "SUNAT"
        };
      }
    }

    // 3. Sanitización de parámetros volátiles
    if (parsed.searchParams.has("exe") || parsed.search.includes("exe=") || parsed.search.includes("pestana=")) {
      parsed.search = "";
      parsed.hash = "";
    }

    return {
      valid: true,
      url: parsed.toString(),
      entidad: defaultEntidad || "Gobierno del Perú"
    };
  } catch {
    return { valid: false, url: "" };
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    
    // Configuración de CORS dinámica
    const allowedOrigins = [
      "https://ahorratiempo.pe",
      "https://www.ahorratiempo.pe",
      "https://portal-tramites-29f31.web.app",
      "https://portal-tramites-29f31.firebaseapp.com"
    ];
    
    const isAllowed = allowedOrigins.includes(origin) || origin.startsWith("http://localhost:");
    const corsHeaders = {
      "Access-Control-Allow-Origin": isAllowed ? origin : allowedOrigins[0],
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Expose-Headers": "X-Frutilota-Debug"
    };

    // Manejar preflight OPTIONS
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // ═══════════════════════════════════════════════════════════════
    // POST /api/admin/clear-db — Limpiar base de datos D1
    // ═══════════════════════════════════════════════════════════════
    if (url.pathname === "/api/admin/clear-db") {
      if (request.method !== "POST") {
        return new Response("Method not allowed", { status: 405, headers: corsHeaders });
      }
      try {
        await env.ahorratiempo_db.prepare("DELETE FROM tramites").run();
        await env.ahorratiempo_db.prepare("DELETE FROM sqlite_sequence WHERE name='tramites'").run();
        return new Response(JSON.stringify({ success: true, message: "Base de datos D1 limpiada exitosamente." }), {
          headers: { "Content-Type": "application/json", ...corsHeaders }
        });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders }
        });
      }
    }

    // ═══════════════════════════════════════════════════════════════
    // POST /api/admin/import-batch — Carga masiva de trámites por lotes
    // ═══════════════════════════════════════════════════════════════
    if (url.pathname === "/api/admin/import-batch") {
      if (request.method !== "POST") {
        return new Response("Method not allowed", { status: 405, headers: corsHeaders });
      }

      try {
        const bodyData = await request.json();
        const { tramites, rebuildFTS } = bodyData;

        if (Array.isArray(tramites) && tramites.length > 0) {
          const insertStmt = env.ahorratiempo_db.prepare(`
            INSERT INTO tramites (
              hash_id, titulo_oficial, entidad, category_id, url, action_url, 
              costo, modalidad, url_fuente, is_external, is_top, texto_completo, raw_content
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `);

          const statements = tramites.map(t => insertStmt.bind(
            t.hash_id || `${t.entidad?.toLowerCase() || 'entidad'}_${t.id || Date.now()}`,
            t.titulo_oficial || t.title || "",
            t.entidad || "PERU",
            t.category || "General",
            t.url || t.url_guia || "",
            t.action_url || t.url || "",
            t.costo || "Gratuito",
            t.modalidad || "En línea (Virtual)",
            t.url || "",
            t.action_url && !t.action_url.includes("gob.pe") ? 1 : 0,
            0,
            t.embedding_text || `${t.titulo_oficial}. ${t.descripcion}`,
            t.raw_content || `# ${t.titulo_oficial}\n${t.descripcion}`
          ));

          await env.ahorratiempo_db.batch(statements);
        }

        if (rebuildFTS) {
          await env.ahorratiempo_db.prepare("INSERT INTO tramites_fts(tramites_fts) VALUES('rebuild')").run();
        }

        return new Response(JSON.stringify({ 
          success: true, 
          imported: tramites ? tramites.length : 0,
          ftsRebuilt: !!rebuildFTS 
        }), {
          headers: { "Content-Type": "application/json", ...corsHeaders }
        });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders }
        });
      }
    }

    // ═══════════════════════════════════════════════════════════════
    // POST /api/admin/reindex-vectors — Sincronizador de Embeddings en Vectorize
    // ═══════════════════════════════════════════════════════════════
    if (url.pathname === "/api/admin/reindex-vectors") {
      if (request.method !== "POST") {
        return new Response("Method not allowed", { status: 405, headers: corsHeaders });
      }

      try {
        const bodyData = await request.json().catch(() => ({}));
        const offset = parseInt(bodyData.offset || 0, 10);
        const limit = parseInt(bodyData.limit || 25, 10);

        const { results: rows } = await env.ahorratiempo_db
          .prepare("SELECT id, titulo_oficial, texto_completo, entidad FROM tramites ORDER BY id ASC LIMIT ? OFFSET ?")
          .bind(limit, offset)
          .all();

        if (!rows || rows.length === 0) {
          return new Response(JSON.stringify({ success: true, processed: 0, finished: true }), {
            headers: { "Content-Type": "application/json", ...corsHeaders }
          });
        }

        const texts = rows.map(r => r.texto_completo || r.titulo_oficial);
        const embeddingsRes = await env.AI.run("@cf/baai/bge-base-en-v1.5", { text: texts });

        const vectors = rows.map((r, idx) => ({
          id: String(r.id),
          values: embeddingsRes.data[idx],
          metadata: {
            titulo: r.titulo_oficial,
            entidad: r.entidad || "PERU"
          }
        }));

        await env.ahorratiempo_vectors.upsert(vectors);

        return new Response(JSON.stringify({
          success: true,
          processed: vectors.length,
          nextOffset: offset + limit,
          finished: rows.length < limit
        }), {
          headers: { "Content-Type": "application/json", ...corsHeaders }
        });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders }
        });
      }
    }

    // ═══════════════════════════════════════════════════════════════
    // POST /api/ai/tramite-guide — Generador de Checklist de Requisitos
    // ═══════════════════════════════════════════════════════════════
    if (url.pathname === "/api/ai/tramite-guide" || url.pathname === "/ai/tramite-guide") {
      if (request.method !== "POST") {
        return new Response("Method not allowed", { status: 405, headers: corsHeaders });
      }

      try {
        const bodyData = await request.json();
        const { tramiteTitle, requirements } = bodyData;

        const systemPrompt = `You are a strict data-generator API. 
Your ONLY purpose is to generate a checklist of requirements for procedures in Peru.
You MUST output ONLY a valid JSON object. DO NOT wrap the output in markdown code blocks (no \`\`\`json).
DO NOT output any conversational text.
CRITICAL: You MUST include a comma between every object in the "items" array.
Format required:
{
  "items": [
    {
      "id": "1",
      "texto": "string",
      "detalle": "string",
      "obligatorio": true,
      "donde": "string"
    }
  ]
}`;

        const { aiRes } = await runAINonStream(env, [
          { role: "system", content: systemPrompt },
          { role: "user", content: `User request: Trámite: ${tramiteTitle}. Requisitos previos: ${requirements || 'Ninguno'}. Output valid JSON only:` }
        ], 1500);

        let parsed;
        if (typeof aiRes.response === "object" && aiRes.response !== null) {
          parsed = aiRes.response;
        } else {
          let jsonStr = String(aiRes.response || "");
          jsonStr = jsonStr.replace(/```json/gi, '').replace(/```/g, '').trim();
          const firstBrace = jsonStr.indexOf('{');
          const lastBrace = jsonStr.lastIndexOf('}');
          if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
            jsonStr = jsonStr.substring(firstBrace, lastBrace + 1);
          }
          jsonStr = jsonStr.replace(/}\s*\{/g, '},{');
          jsonStr = jsonStr.replace(/,\s*\]/g, ']');
          jsonStr = jsonStr.replace(/,\s*\}/g, '}');
          try {
            parsed = JSON.parse(jsonStr);
          } catch (parseErr) {
            throw new Error("Invalid JSON: " + parseErr.message + " | Full String: " + jsonStr);
          }
        }

        if (parsed.items && Array.isArray(parsed.items)) {
          parsed.items = parsed.items.map((item, idx) => ({
            ...item,
            id: String(item.id || (idx + 1))
          }));
        }

        return new Response(JSON.stringify(parsed), {
          headers: { "Content-Type": "application/json", ...corsHeaders }
        });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders }
        });
      }
    }

    // ═══════════════════════════════════════════════════════════════
    // POST /api/ai/chat — Frutilota IA (Chat RAG Híbrido)
    // ═══════════════════════════════════════════════════════════════
    if (url.pathname === "/api/ai/chat" || url.pathname === "/ai/chat") {
      if (request.method !== "POST") {
        return new Response("Method not allowed", { status: 405, headers: corsHeaders });
      }

      try {
        const bodyData = await request.json();
        const { messages, selectedEntity } = bodyData;

        if (!Array.isArray(messages) || messages.length === 0) {
          return new Response(JSON.stringify({ success: false, error: "Messages array required" }), { status: 400, headers: corsHeaders });
        }

        const lastUserMsg = messages.filter(m => m.role === 'user').pop();
        let searchContext = "";
        let debugInfo = {};
        let finalResults = [];
        let isGreeting = false;
        
        if (lastUserMsg) {
           try {
             const userContent = (lastUserMsg.text || lastUserMsg.content || "").trim();
             
             // 1. Clasificación Instantánea de Intención (Zero Latency JS)
             const greetingRegex = /^(hola|hola!|buenas|buenos\s*días|buenos\s*dias|buenas\s*tardes|buenas\s*noches|qué\s*tal|que\s*tal|cómo\s*estás|como\s*estas|quién\s*eres|quien\s*eres|gracias|muchas\s*gracias|adiós|adios|chao|chau|saludos)[\s!.?]*$/i;
             isGreeting = greetingRegex.test(userContent);
             const isTramite = !isGreeting;
             
             debugInfo.intent = isGreeting ? "SALUDO" : "TRAMITE";

             // 2. RAG Híbrido solo si es un trámite
             if (isTramite) {
               // Normalizador Ultrarrápido de Jerga y Términos Peruanos
               let optimizedQuery = userContent
                 .toLowerCase()
                 .replace(/^(quiero|cómo hago para|como hago para|cómo puedo|como puedo|cómo|como|dónde|donde|puedo|necesito|quisiera|qué necesito para|que necesito para|pasos para|dame|busca)\s+/gi, '')
                 .replace(/\b(sacar|obtener|consultar|tramitar|hacer|crear|pedir|generar|ver|pagar|saber|estado de mi|estado del)\b/gi, '')
                 .replace(/[¿?¡!.,:;"]/g, '')
                 .trim();

                // Mapeo contextual inteligente de intenciones frecuentes
                const lower = userContent.toLowerCase();
                if (lower.includes("clave sol")) {
                  optimizedQuery = "obtener clave sol";
                } else if (
                  lower.includes("recibo") || 
                  lower.includes("honorario") || 
                  (lower.includes("freelance") && (lower.includes("retenci") || lower.includes("emitir") || lower.includes("factur") || lower.includes("cobrar"))) ||
                  (lower.includes("independiente") && (lower.includes("retenci") || lower.includes("emitir") || lower.includes("cobrar")))
                ) {
                  optimizedQuery = "emitir recibo por honorarios electronico";
                } else if (lower.includes("suspens") && (lower.includes("cuarta") || lower.includes("1609") || lower.includes("retencion") || lower.includes("retención"))) {
                  optimizedQuery = "solicitar la suspension de retenciones de cuarta categoria formulario n 1609";
                } else if (lower.includes("sacar ruc") || lower.includes("obtener ruc") || lower.includes("inscribirme al ruc") || lower.includes("inscripcion al ruc")) {
                  optimizedQuery = "inscribirse en el ruc";
                } else if ((lower.includes("consultar") || lower.includes("consulta") || lower.includes("buscar") || lower.includes("verificar")) && lower.includes("ruc")) {
                  optimizedQuery = "consultar ruc";
                } else if (lower.includes("brevete") || lower.includes("licencia")) {
                  optimizedQuery = "obtener licencia de conducir";
                } else if (lower.includes("papeleta")) {
                  optimizedQuery = "consultar papeletas transito";
                }
               
                if (!optimizedQuery) optimizedQuery = userContent;

               const stopWords = ['el','la','los','las','un','una','unos','unas','de','del','para','por','en','con','que','como','yo','mi','su','tengo','quiero','ago','hago','hacer','recomiendas','recomendaciones','sacar','obtener','tramitar','solicitar','crear','generar'];
               const terms = optimizedQuery.toLowerCase().split(/\s+/).filter(t => t.length > 2 && !stopWords.includes(t));
               
               const ftsQueryAnd = terms.length > 0 ? terms.map(t => `"${t}"*`).join(' AND ') : optimizedQuery;
               const ftsQueryOr = terms.length > 0 ? terms.map(t => `"${t}"*`).join(' OR ') : optimizedQuery;
               
               debugInfo.optimizedQuery = optimizedQuery;
               debugInfo.ftsQueryAnd = ftsQueryAnd;
               
               let hasLocalResults = false;

                if (env.ahorratiempo_db) {
                  // 1. Coincidencia Directa por Título Exacto (Prioridad Máxima - Latencia ~10ms)
                  let exactTitleResults = [];
                  try {
                    let directQuery = `SELECT id, titulo_oficial, url, entidad, raw_content, action_url, costo 
                                       FROM tramites 
                                       WHERE LOWER(titulo_oficial) = LOWER(?) OR INSTR(LOWER(titulo_oficial), LOWER(?)) > 0 
                                       LIMIT 2`;
                    const { results: directRows } = await env.ahorratiempo_db.prepare(directQuery)
                      .bind(optimizedQuery, optimizedQuery)
                      .all();
                    if (directRows && directRows.length > 0) {
                      exactTitleResults = directRows;
                    }
                  } catch(de) {
                    debugInfo.directError = de.message;
                  }

                  // 2. Búsqueda Léxica Rápida (D1 BM25 FTS5 - Latencia ~15ms)
                  let ftsResults = [];
                  if (exactTitleResults.length === 0) {
                    const executeSearch = async (queryToUse) => {
                      let d1Query = `SELECT t.id, t.titulo_oficial, t.url, t.entidad, t.raw_content, t.action_url, t.costo, rank 
                                     FROM tramites_fts fts 
                                     JOIN tramites t ON t.id = fts.rowid 
                                     WHERE tramites_fts MATCH ?`;
                      let bindParams = [queryToUse];
                      if (selectedEntity) {
                        d1Query += ` AND t.entidad LIKE ?`;
                        bindParams.push(`%${selectedEntity}%`);
                      }
                      d1Query += ` ORDER BY rank LIMIT 3`;
                      return await env.ahorratiempo_db.prepare(d1Query).bind(...bindParams).all();
                    };

                    try {
                      let { results } = await executeSearch(ftsQueryAnd);
                      if (!results || results.length === 0) {
                        debugInfo.fallbackToOr = true;
                        const orRes = await executeSearch(ftsQueryOr);
                        results = orRes.results;
                      }
                      if (results && results.length > 0) {
                        ftsResults = results;
                      }
                    } catch (ftse) {
                      debugInfo.ftsError = ftse.message;
                    }
                  }

                  // 3. Short-Circuit: Si ya hay resultados en D1 (Exacto o FTS), NO llamamos a la GPU de Embeddings (Ahorra ~700ms)
                  let vResults = [];
                  if (exactTitleResults.length === 0 && ftsResults.length === 0) {
                    try {
                      if (env.ahorratiempo_vectors && env.AI) {
                        debugInfo.vectorizeEnabled = true;
                        const queryVectorRes = await env.AI.run("@cf/baai/bge-base-en-v1.5", { text: [optimizedQuery] });
                        const queryVector = queryVectorRes.data[0];
                        const vectorMatches = await env.ahorratiempo_vectors.query(queryVector, { topK: 5 });
                        if (vectorMatches.matches && vectorMatches.matches.length > 0) {
                          const vectorIds = vectorMatches.matches.map(m => m.id);
                          debugInfo.vectorIds = vectorIds;
                          let vQuery = `SELECT id, titulo_oficial, url, entidad, raw_content, action_url, costo FROM tramites WHERE id IN (${vectorIds.map(() => '?').join(',')})`;
                          let bindParams = [...vectorIds];
                          if (selectedEntity) {
                            vQuery += ` AND entidad LIKE ?`;
                            bindParams.push(`%${selectedEntity}%`);
                          }
                          const { results: vRows } = await env.ahorratiempo_db.prepare(vQuery).bind(...bindParams).all();
                          vResults = vectorIds.map(vid => vRows.find(r => String(r.id) === String(vid))).filter(Boolean);
                        }
                      }
                    } catch(ve) {
                      debugInfo.vectorizeError = ve.message;
                    }
                  }

                  // Fusión Híbrida Inteligente
                  let mergedResults = [...exactTitleResults, ...ftsResults, ...vResults];
                  let uniqueMerged = [];
                  let seenIds = new Set();
                  for (let row of mergedResults) {
                    if (row && !seenIds.has(String(row.id))) {
                      seenIds.add(String(row.id));
                      uniqueMerged.push(row);
                    }
                  }
                 
                  let results = uniqueMerged.slice(0, 2);
                  debugInfo.d1ResultsCount = results.length;
                 
                  if (results.length > 0) {
                    finalResults = results;
                    hasLocalResults = true;
                    const formattedResults = results.map(row => `TITULO: ${row.titulo_oficial}\nENTIDAD: ${row.entidad}\nCOSTO: ${row.costo || 'Gratuito'}\nCONTENIDO_GUIA:\n${row.raw_content}`);
                    searchContext = `\n\n[INFORMACION D1 LOCAL (DOCUMENTOS OFICIALES)]:\n${formattedResults.join('\n\n---\n\n')}`;
                  }
                }

                // FALLBACK: EXA AI solo si D1 devuelve 0 resultados
                try {
                  if (env.EXA_API_KEY && !hasLocalResults) {
                    debugInfo.usedExa = true;
                    const exaRes = await fetch("https://api.exa.ai/search", {
                      method: "POST",
                      headers: { "x-api-key": env.EXA_API_KEY, "Content-Type": "application/json" },
                      body: JSON.stringify({
                        query: selectedEntity ? `${optimizedQuery} ${selectedEntity} sitio:gob.pe` : optimizedQuery,
                        type: "neural",
                        includeDomains: ["gob.pe"],
                        contents: { text: { maxCharacters: 1500 } }
                      })
                    });
                    if (exaRes.ok) {
                      const exaData = await exaRes.json();
                      if (exaData.results && exaData.results.length > 0) {
                        debugInfo.exaResultsUrls = exaData.results.map(r => r.url);
                        const exaFormatted = exaData.results.map(r => `TÍTULO: ${r.title}\nCONTENIDO: ${r.text}`).join('\n\n---\n\n');
                        searchContext += `\n\n[INFORMACIÓN EXA AI (EN VIVO GOB.PE)]:\n${exaFormatted}`;
                      }
                    }
                  } else {
                    debugInfo.usedExa = false;
                  }
                } catch (exaErr) {
                  debugInfo.exaError = exaErr.message;
                }
              }
            } catch(e) {
              debugInfo.error = e.message;
            }
          }

const systemPrompt = `# Prompt del Sistema - LOTA AI (Guía y Orientadora Ciudadana de AhorraTiempo.pe)

Eres **LOTA** (acrónimo de **Localizadora y Orientadora de Trámites Ágiles**), la asistente de inteligencia y orientación ciudadana de **ahorratiempo.pe**. Tu misión es responder al ciudadano con máxima precisión técnica, seriedad, sobriedad institucional y concisión directa.

## 🏛️ Identidad y Rol de AhorraTiempo.pe y LOTA:
1. **Rol de Orientación y Guía (No Tramitador Directo):** AhorraTiempo.pe y tú (LOTA) son un **buscador y asistente inteligente de orientación ciudadana**. Centralizas la información y trámites de más de 30 entidades del Estado peruano (SUNAT, RENIEC, Migraciones, SUNARP, MTC, EsSalud, SIS, SUSALUD, SUNAFIL, OSINERGMIN, etc.) en una sola plataforma para evitar que el ciudadano pierda tiempo en páginas confusas.
2. **Claridad sobre Trámites y Pagos:** Si el usuario pregunta si tú realizas el trámite directamente por él o si puede pagar su DNI/tasa aquí, aclárale con amabilidad y precisión que eres su **guía y orientadora inteligente** que le explica los requisitos, costos y pasos, y que el trámite y pago final se realiza de forma directa y segura en los portales oficiales del Estado (o agencias oficiales del Banco de la Nación / Págalo.pe).
3. **Descubrimiento de Entidades Públicas:** Cuando corresponda, orienta al usuario hacia la entidad oficial adecuada, incluyendo entidades especializadas de protección ciudadana que el público suele desconocer (como SUSALUD para quejas médicas, SUNAFIL para derechos laborales, OSINERGMIN para electricidad/gas, INDECOPI para consumo, OSIPTEL para telefonía, etc.).
4. **Presentación Breve:** Cuando el usuario te salude (ej. "hola", "buenos días") o te pregunte quién eres, preséntate siempre de forma breve diciendo que eres **LOTA**, tu asistente de orientación ciudadana de ahorratiempo.pe. NUNCA uses el nombre Frutilota.

## 🎯 Directrices de Calidad, Seriedad y Redacción Directa:
1. **Obligación de Orientar (Prohibido Rechazar o Evasivas):** NUNCA digas frases como "Lo siento, no puedo proporcionarte una respuesta específica", "No puedo ayudarte con esto" o "Consulta la web de SUNAT". Como asistente de trámites, es tu deber brindar la información normativa y oficial de los procedimientos del Estado peruano (requisitos, pasos, porcentajes de retención y portales de acceso).
2. **Respuesta Directa y Cero Relleno:** PROHIBIDO iniciar con saludos extensos, frases coloquiales o introducciones mecánicas como "Este es un servicio oficial de modalidad Virtual y costo Gratuito brindado por...". Ve directamente a la solución técnica y normativa de la consulta.
3. **Cero Emoticons:** PROHIBIDO terminantemente el uso de emoticons o emojis en tus respuestas. Mantén siempre un estilo ejecutivo, sobrio y gubernamental de alta seriedad.
4. **Precisión Tributaria y Legal Estricta (Perú):**
   - **Renta de 4ta Categoría / Recibos por Honorarios (Freelancers / Independientes):**
     * La retención de impuesto a la renta es del **8%** y se aplica ÚNICAMENTE cuando el importe del recibo supera los **S/ 1,500**.
     * Si el monto es igual o menor a S/ 1,500, la retención es del **0%** (no aplica retención).
     * Si el trabajador proyecta que sus ingresos anuales totales no superarán el tope fijado por SUNAT (aprox. S/ 45,063 al año), puede tramitar la **Suspensión de Retenciones** mediante el **Formulario Virtual 1609** en SUNAT Operaciones en Línea para que no le retengan el 8%.
     * Para emitir el recibo se requiere RUC activo y Clave SOL desde **SUNAT Operaciones en Línea (SOL)**. Es un trámite 100% gratuito.
     * NUNCA indiques porcentajes incorrectos como 15% o 18% para honorarios profesionales.
   - **Clave SOL y RUC de SUNAT:** Son trámites 100% GRATUITOS y se realizan EXCLUSIVAMENTE a través de SUNAT (web www.sunat.gob.pe, portal SOL o apps oficiales App Personas / App Emprender). **PROHIBIDO TERMINANTEMENTE** decir que la Clave SOL o trámites de SUNAT se solicitan o pagan en pagalo.pe. Págalo.pe es únicamente del Banco de la Nación para pagar tasas de RENIEC, MTC, Migraciones, Poder Judicial o PNP.
   - **Ficha RUC Electrónica:** Es la constancia informativa de estar inscrito en el RUC. Se descarga gratuitamente desde SUNAT Operaciones en Línea (SOL) ingresando con RUC y Clave SOL en la ruta "Mis datos del RUC" -> "Ficha RUC". NO la confundas con la inscripción inicial de RUC ni con Mesa de Partes Virtual.
   - **RENIEC:** DNI Azul (S/ 30.00), DNI Electrónico DNIe (S/ 41.00), pagos oficiales en pagalo.pe o Banco de la Nación.
   - **MTC:** Licencias de conducir físicas o digitales con examen médico y de reglas aprobado.
5. **Estructura Limpia, Directa y Escaneable:**
   - **Título Claro:** Escribe únicamente el título principal una sola vez en formato H1 (ej. "# Emisión de Recibo por Honorarios Electrónico").
   - **Descripción Oficial:** 1 párrafo conciso explicando directamente en qué consiste el trámite. **NUNCA repitas el título** al inicio de la descripción (ni en negrita `**Título**`, ni como subtítulo, ni en texto plano). Pasa inmediatamente a la explicación.
   - **Requisitos Obligatorios:** Viñetas breves con lo indispensable (RUC, DNI, Clave SOL, etc.).
   - **Procedimiento Paso a Paso:** Pasos numerados con verbos de acción (1. Ingresa a..., 2. Selecciona..., 3. Completa...).
   - **Canales Oficiales:** Breve mención indicando que los accesos directos validados se encuentran en los botones al pie.
6. **CERO Enlaces o URLs en el Texto:** NUNCA escribas URLs, links o dominios en tu texto; los botones oficiales se generan automáticamente al pie de tu respuesta.
7. **PROHIBICIÓN ABSOLUTA DE FICHAS TÉCNICAS O METADATOS Y TÍTULOS DUPLICADOS:** NUNCA escribas listas ni líneas mecánicas de metadatos como "TÍTULO:", "ENTIDAD:", "CATEGORÍA:", "MODALIDAD:", "DIRIGIDO A:", "COSTO:", "TIPO DE ACCESO:". Tampoco repitas el título en negrita al iniciar la descripción. Comienza con el título "# Nombre del Trámite" y continúa directamente con la explicación.


`;

        const finalPrompt = `${systemPrompt}
${searchContext ? `[CONTEXTO RECUPERADO (RAG) DE D1 Y EXA AI - OBLIGATORIO USAR PARA SINTETIZAR Y CITAR]:\n` + searchContext : ''}`;

        const aiMessages = [
          { role: "system", content: finalPrompt },
          ...messages.map(m => ({
            role: m.role === 'bot' || m.role === 'assistant' ? 'assistant' : 'user',
            content: m.text || m.content
          }))
        ];

        // Generación Inteligente de Botones Oficiales (Acceso Directo + Guía Gob.pe del Trámite Principal)
        let links = [];
        const seenUrls = new Set();

        if (!isGreeting && finalResults.length > 0) {
          const primary = finalResults[0];

          // 1. Botón de Acción Directa (App SUNAT / Formulario / Consulta)
          if (primary.action_url) {
            const sanitizedAction = sanitizeAndValidateOfficialUrl(primary.action_url, primary.entidad);
            if (sanitizedAction.valid && sanitizedAction.url && !seenUrls.has(sanitizedAction.url)) {
              seenUrls.add(sanitizedAction.url);
              links.push({
                title: `${primary.titulo_oficial} (Acceso Directo)`,
                entidad: sanitizedAction.entidad || primary.entidad,
                url_tramite: sanitizedAction.url,
                url_referencia: sanitizedAction.url,
                costo: primary.costo || 'Gratuito'
              });
            }
          }

          // 2. Botón de la Guía Oficial en Gob.pe
          if (primary.url) {
            const sanitizedGuide = sanitizeAndValidateOfficialUrl(primary.url, primary.entidad);
            if (sanitizedGuide.valid && sanitizedGuide.url && !seenUrls.has(sanitizedGuide.url)) {
              seenUrls.add(sanitizedGuide.url);
              links.push({
                title: `Guía Oficial Gob.pe: ${primary.titulo_oficial}`,
                entidad: sanitizedGuide.entidad || primary.entidad,
                url_tramite: sanitizedGuide.url,
                url_referencia: sanitizedGuide.url,
                costo: primary.costo || 'Gratuito'
              });
            }
          }
        }
        
        const officialLinks = links.slice(0, 2);

        // Ejecutar Modelo de Texto Rápido con Streaming Real (Time to First Token ~350ms)
        const { stream: aiStream, modelUsed } = await runAIWithStream(env, aiMessages, {
          max_tokens: 1200,
          temperature: 0.2,
          repetition_penalty: 1.15
        });
        debugInfo.modelUsed = modelUsed;

        const encoder = new TextEncoder();
        const clientStream = new ReadableStream({
          async start(controller) {
            // 1. Enviar primero los enlaces oficiales verificados para que el frontend prepare la interfaz
            if (officialLinks && officialLinks.length > 0) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ officialLinks })}\n\n`));
            }

            // 2. Transmitir en tiempo real cada token generado por Workers AI
            try {
              const reader = aiStream.getReader();
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                controller.enqueue(value);
              }
            } catch (streamErr) {
              console.error("Stream reading error:", streamErr);
            } finally {
              controller.close();
            }
          }
        });

        return new Response(clientStream, {
          headers: { 
            "Content-Type": "text/event-stream; charset=utf-8", 
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Frutilota-Debug": btoa(JSON.stringify(debugInfo)),
            ...corsHeaders 
          }
        });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders }
        });
      }
    }

    // Ruta por defecto
    return new Response("AhorraTiempo API - Frutilota IA", { status: 200, headers: corsHeaders });
  }
};

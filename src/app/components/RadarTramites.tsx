import React, { useState, useEffect } from "react";
import { collection, onSnapshot, doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { 
  SearchRegular, 
  CheckmarkRegular, 
  EditRegular, 
  DeleteRegular,
  OpenRegular,
  DataLineRegular,
  CopyRegular,
  DismissRegular
} from '@fluentui/react-icons';
import { Button } from "@fluentui/react-components";

export interface TramiteDescubierto {
  id: string;
  name: string;
  entity: string;
  theme: string;
  subtheme: string;
  url: string;
  action_url?: string;
  raw_content: string;
  scraped_at: string;
}

export function RadarTramites() {
  const [drafts, setDrafts] = useState<TramiteDescubierto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modals state
  const [jsonModal, setJsonModal] = useState<{ open: boolean; tramite: TramiteDescubierto | null }>({ open: false, tramite: null });
  const [editModal, setEditModal] = useState<{ open: boolean; tramite: TramiteDescubierto | null }>({ open: false, tramite: null });

  useEffect(() => {
    try {
      const q = collection(db, "tramites_descubiertos");
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as TramiteDescubierto));
        // Sort by scraped_at descending
        docs.sort((a, b) => new Date(b.scraped_at).getTime() - new Date(a.scraped_at).getTime());
        setDrafts(docs);
        setLoading(false);
      }, (err) => {
        console.error("Error fetching tramites_descubiertos:", err);
        setError("Error al cargar el radar de trámites. Verifique permisos o conexión.");
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error(err);
      setError("Error iniciando el listener de Firestore.");
      setLoading(false);
    }
  }, []);

  const handleDiscard = async (id: string) => {
    if (!window.confirm("¿Seguro que deseas descartar este trámite descubierto permanentemente?")) return;
    try {
      await deleteDoc(doc(db, "tramites_descubiertos", id));
    } catch (err) {
      console.error("Error deleting doc", err);
      alert("Error al descartar el trámite.");
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm("⚠️ ADVERTENCIA: ¿Estás 100% seguro de que deseas ELIMINAR TODOS los trámites del Radar? Esto vaciará la base de datos de trámites descubiertos.")) return;
    try {
      for (const t of drafts) {
        await deleteDoc(doc(db, "tramites_descubiertos", t.id));
      }
      alert("Todos los trámites han sido eliminados del Radar.");
    } catch (err) {
      console.error("Error clearing docs", err);
      alert("Error al limpiar los trámites.");
    }
  };

  const approveToFirebase = async (t: TramiteDescubierto) => {
    try {
      const formatted = {
        id: t.id || t.name.toLowerCase().replace(/\s+/g, '-'),
        title: t.name,
        theme: t.theme || "",
        subtheme: t.subtheme || "",
        entity: t.entity || "",
        url: t.url || "",
        action_url: t.action_url || "",
        raw_content: t.raw_content || "",
        active: true,
        featured: false,
        views: 0
      };
      await setDoc(doc(db, "tramites", formatted.id), formatted);
      await deleteDoc(doc(db, "tramites_descubiertos", t.id));
    } catch (err) {
      console.error("Error approving", err);
      alert("Error al aprobar el trámite.");
    }
  };

  const handleApprove = (tramite: TramiteDescubierto) => {
    approveToFirebase(tramite);
  };

  const handleApproveAll = async () => {
    if (!window.confirm("¿Aprobar todos los trámites descubiertos y pasarlos al catálogo oficial?")) return;
    try {
      for (const t of drafts) {
        await approveToFirebase(t);
      }
      alert("Todos los trámites han sido aprobados y publicados.");
    } catch (err) {
      console.error("Error", err);
      alert("Error aprobando todos.");
    }
  };

  if (loading) {
    return <div style={{ padding: 40, textAlign: "center", color: "var(--colorNeutralForeground2)" }}>Cargando radar...</div>;
  }

  if (error) {
    return <div style={{ padding: 40, textAlign: "center", color: "var(--colorPaletteRedForeground1)" }}>{error}</div>;
  }

  return (
    <div style={{ padding: "24px", maxWidth: 1200, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--colorBrandBackground2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--colorBrandForeground1)" }}>
          <DataLineRegular fontSize={24} />
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 24, fontWeight: "bold", color: "var(--colorNeutralForeground1)" }}>Radar de Trámites</h2>
            <p style={{ margin: "4px 0 0", color: "var(--colorNeutralForeground2)", fontSize: 14 }}>
              Revisa, edita y aprueba los trámites extraídos automáticamente por el Web Scraper (Zyte).
            </p>
          </div>
          {drafts.length > 0 && (
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <Button appearance="secondary" icon={<CheckmarkRegular />} onClick={handleApproveAll}>
                Aprobar Todos ({drafts.length})
              </Button>
              <Button appearance="primary" style={{ backgroundColor: "#ef4444", color: "white" }} icon={<DeleteRegular />} onClick={handleClearAll}>
                Eliminar Todos ({drafts.length})
              </Button>
            </div>
          )}
        </div>
      </div>

      {drafts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "64px 24px", background: "var(--colorNeutralBackground2)", borderRadius: 16, border: "1px dashed var(--colorNeutralStroke1)" }}>
          <SearchRegular fontSize={64} style={{ color: "var(--colorNeutralForeground3)", marginBottom: 16 }} />
          <h3 style={{ margin: "0 0 8px", fontSize: 18, color: "var(--colorNeutralForeground1)" }}>El Radar está limpio</h3>
          <p style={{ margin: 0, color: "var(--colorNeutralForeground2)", maxWidth: 400, marginInline: "auto" }}>
            No hay trámites nuevos descubiertos hoy. ¡Ejecuta tus Spiders en Zyte para encontrar más!
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {drafts.map(t => (
            <div key={t.id} style={{ background: "var(--colorNeutralBackground1)", padding: "16px", borderRadius: 16, border: "1px solid var(--colorNeutralStroke1)", display: "flex", gap: 16, flexDirection: "column", boxShadow: "0 2px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
                <div style={{ flex: "1 1 100%", minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 10px", background: "var(--colorBrandBackground2)", color: "var(--colorBrandForeground1)", borderRadius: 16 }}>
                      {t.entity || "Desconocido"}
                    </span>
                    <span style={{ fontSize: 12, color: "var(--colorNeutralForeground3)" }}>
                      Extraído el {new Date(t.scraped_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 style={{ margin: "0 0 8px", fontSize: 18, color: "var(--colorNeutralForeground1)", wordWrap: "break-word" }}>{t.name}</h3>
                  <p style={{ margin: 0, fontSize: 14, color: "var(--colorNeutralForeground2)", wordWrap: "break-word", maxHeight: "60px", overflow: "hidden", textOverflow: "ellipsis" }}>{t.raw_content ? t.raw_content.substring(0, 150) + "..." : "Sin contenido"}</p>
                </div>
                
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", flexShrink: 0 }}>
                  <Button appearance="secondary" icon={<DeleteRegular />} onClick={() => handleDiscard(t.id)}>Descartar</Button>
                  <Button appearance="secondary" icon={<EditRegular />} onClick={() => setEditModal({ open: true, tramite: t })}>Editar</Button>
                  <Button appearance="primary" icon={<CheckmarkRegular />} onClick={() => handleApprove(t)}>Aprobar</Button>
                </div>
              </div>
              
              <div style={{ display: "flex", gap: 16, fontSize: 13, padding: "12px 16px", background: "var(--colorNeutralBackground2)", borderRadius: 12, flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ flexShrink: 0 }}><strong>Subtema:</strong> {t.subtheme}</div>
                <div style={{ flex: "1 1 100%", minWidth: 0 }}>
                  <strong style={{ marginRight: 4 }}>URL:</strong> 
                  <a href={t.url} target="_blank" rel="noreferrer" style={{ color: "var(--colorBrandForeground1)", textDecoration: "none", wordBreak: "break-all" }}>
                    {t.url} <OpenRegular fontSize={12} style={{ verticalAlign: "middle", marginLeft: 4 }}/>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editModal.open && editModal.tramite && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 24 }}>
          <div style={{ background: "var(--colorNeutralBackground1)", padding: 24, borderRadius: 16, width: "100%", maxWidth: 600, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 20 }}>Editar Borrador</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <label>
                <span style={{ display: "block", fontSize: 13, marginBottom: 4, fontWeight: 600 }}>Título</span>
                <input 
                  type="text" 
                  value={editModal.tramite.name} 
                  onChange={e => setEditModal({ ...editModal, tramite: { ...editModal.tramite!, name: e.target.value } })}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--colorNeutralStroke1)", background: "var(--colorNeutralBackground2)", color: "var(--colorNeutralForeground1)" }} 
                />
              </label>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label>
                  <span style={{ display: "block", fontSize: 13, marginBottom: 4, fontWeight: 600 }}>Entidad</span>
                  <input 
                    type="text" 
                    value={editModal.tramite.entity} 
                    onChange={e => setEditModal({ ...editModal, tramite: { ...editModal.tramite!, entity: e.target.value } })}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--colorNeutralStroke1)", background: "var(--colorNeutralBackground2)", color: "var(--colorNeutralForeground1)" }} 
                  />
                </label>
                <label>
                  <span style={{ display: "block", fontSize: 13, marginBottom: 4, fontWeight: 600 }}>Categoría (Theme)</span>
                  <input 
                    type="text" 
                    value={editModal.tramite.theme} 
                    onChange={e => setEditModal({ ...editModal, tramite: { ...editModal.tramite!, theme: e.target.value } })}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--colorNeutralStroke1)", background: "var(--colorNeutralBackground2)", color: "var(--colorNeutralForeground1)" }} 
                  />
                </label>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label>
                  <span style={{ display: "block", fontSize: 13, marginBottom: 4, fontWeight: 600 }}>Subtema</span>
                  <input 
                    type="text" 
                    value={editModal.tramite.subtheme} 
                    onChange={e => setEditModal({ ...editModal, tramite: { ...editModal.tramite!, subtheme: e.target.value } })}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--colorNeutralStroke1)", background: "var(--colorNeutralBackground2)", color: "var(--colorNeutralForeground1)" }} 
                  />
                </label>
                <label>
                  <span style={{ display: "block", fontSize: 13, marginBottom: 4, fontWeight: 600 }}>URL de Origen</span>
                  <input 
                    type="text" 
                    value={editModal.tramite.url} 
                    onChange={e => setEditModal({ ...editModal, tramite: { ...editModal.tramite!, url: e.target.value } })}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--colorNeutralStroke1)", background: "var(--colorNeutralBackground2)", color: "var(--colorNeutralForeground1)" }} 
                  />
                </label>
              </div>

              <label>
                <span style={{ display: "block", fontSize: 13, marginBottom: 4, fontWeight: 600 }}>URL de Acción (Ej: iniciar trámite)</span>
                <input 
                  type="text" 
                  value={editModal.tramite.action_url || ""} 
                  onChange={e => setEditModal({ ...editModal, tramite: { ...editModal.tramite!, action_url: e.target.value } })}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--colorNeutralStroke1)", background: "var(--colorNeutralBackground2)", color: "var(--colorNeutralForeground1)" }} 
                />
              </label>

              <label>
                <span style={{ display: "block", fontSize: 13, marginBottom: 4, fontWeight: 600 }}>Contenido en Bruto (raw_content)</span>
                <textarea 
                  rows={6}
                  value={editModal.tramite.raw_content} 
                  onChange={e => setEditModal({ ...editModal, tramite: { ...editModal.tramite!, raw_content: e.target.value } })}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--colorNeutralStroke1)", background: "var(--colorNeutralBackground2)", color: "var(--colorNeutralForeground1)" }} 
                />
              </label>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>
              <Button appearance="secondary" onClick={() => setEditModal({ open: false, tramite: null })}>Cancelar</Button>
              <Button appearance="primary" onClick={() => {
                import("firebase/firestore").then(({ updateDoc }) => {
                  updateDoc(doc(db, "tramites_descubiertos", editModal.tramite!.id), {
                    name: editModal.tramite!.name,
                    entity: editModal.tramite!.entity,
                    theme: editModal.tramite!.theme,
                    subtheme: editModal.tramite!.subtheme,
                    url: editModal.tramite!.url,
                    action_url: editModal.tramite!.action_url || "",
                    raw_content: editModal.tramite!.raw_content
                  }).then(() => {
                    setEditModal({ open: false, tramite: null });
                  }).catch(e => {
                    console.error(e);
                    alert("Error al actualizar");
                  });
                });
              }}>Guardar Cambios</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

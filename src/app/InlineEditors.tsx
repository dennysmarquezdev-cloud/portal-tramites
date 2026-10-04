import React, { useState, useEffect } from "react";
import { DismissRegular, SaveRegular, AddRegular, SpinnerIos20Regular, DeleteRegular, SettingsRegular, SearchRegular } from '@fluentui/react-icons';
import { toast } from "sonner";
import { db, storage } from "../firebase";
import { doc, setDoc, addDoc, collection, deleteDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { searchPexels, PexelsPhoto } from "../services/pexels";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// ── Color tokens (Shared from AdminDashboard) ─────────────────────
const C = {
  bg: "#030712",
  sidebar: "#0a0f1e",
  card: "#111827",
  cardBorder: "rgba(59,130,246,.12)",
  primary: "#3b82f6",
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
  textPrimary: "#f1f5f9",
  textMuted: "#64748b",
  border: "rgba(255,255,255,.07)",
};

const inputStyle: React.CSSProperties = {
  background: "var(--colorNeutralBackground1)", border: `1px solid ${C.border}`, borderRadius: 6,
  color: C.textPrimary, padding: "8px 10px", fontSize: 13, width: "100%", outline: "none", marginBottom: 12
};

const labelStyle: React.CSSProperties = { display: "block", color: C.textMuted, fontSize: 12, marginBottom: 4 };

// ── SiteConfigEditorModal ──────────────────────────────────────
export function SiteConfigEditorModal({ config, onClose }: { config: any; onClose: () => void }) {
  const [siteData, setSiteData] = useState({ title:"", subtitle:"", heroTitle:"", phone:"", email:"", whatsapp:"" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (config) setSiteData({ ...siteData, ...config });
  }, [config]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, "config", "site"), siteData, { merge: true });
      toast.success("Textos guardados ✓");
      onClose();
    } catch (err) { toast.error("Error al guardar"); }
    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "var(--colorNeutralBackground1)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 12, width: 600, padding: 24 }} onClick={e => e.stopPropagation()}>
        <h3 style={{ color: C.textPrimary, fontSize: 18, fontWeight: 700, margin: "0 0 16px" }}>Editar Textos Globales</h3>
        
        <label style={labelStyle}>Títítulo principal del Banner (Hero Title - HTML permitido)</label>
        <textarea value={siteData.heroTitle} onChange={e => setSiteData(s => ({ ...s, heroTitle: e.target.value }))} style={{ ...inputStyle, height:80, resize:"vertical" }} />
        
        <label style={labelStyle}>Teléfono de contacto</label>
        <input value={siteData.phone} onChange={e => setSiteData(s => ({ ...s, phone: e.target.value }))} style={inputStyle} />
        
        <label style={labelStyle}>Correo de soporte</label>
        <input value={siteData.email} onChange={e => setSiteData(s => ({ ...s, email: e.target.value }))} style={inputStyle} />
        
        <label style={labelStyle}>Enlace de WhatsApp</label>
        <input value={siteData.whatsapp} onChange={e => setSiteData(s => ({ ...s, whatsapp: e.target.value }))} style={inputStyle} />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
          <button type="button" onClick={onClose} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 6, color: C.textMuted, cursor: "pointer", padding: "8px 16px", fontSize: 13 }}>Cancelar</button>
          <button type="button" onClick={handleSave} disabled={loading} style={{ background: C.primary, border: "none", borderRadius: 6, color: "#fff", cursor: "pointer", padding: "8px 16px", fontSize: 13, fontWeight: 600, display:"flex",alignItems:"center",gap:6 }}>
            {loading && <SpinnerIos20Regular fontSize={14}  />} Guardar
          </button>
        </div>
      </div>
    </div>
  );
}



// ── CategoryEditorModal ────────────────────────────────────────
export function CategoryEditorModal({ category, onClose }: { category: any; onClose: () => void }) {
  const isNew = !category || !category.id;
  const [name, setName] = useState(category?.name || "");
  const [description, setDescription] = useState(category?.description || "");
  const [colorA, setColorA] = useState(category?.colorA || "#1e3a8a");
  const [colorB, setColorB] = useState(category?.colorB || "#3b82f6");
  const [orden, setOrden] = useState(category?.orden || 0);
  const [photoUrl, setPhotoUrl] = useState(category?.bgImg || category?.photo || "");
  const [logo1Url, setLogo1Url] = useState(category?.logos?.[0] || "");
  const [logo2Url, setLogo2Url] = useState(category?.logos?.[1] || "");

  const [file, setFile] = useState<File | null>(null);
  const [fileLogo1, setFileLogo1] = useState<File | null>(null);
  const [fileLogo2, setFileLogo2] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) { toast.error("El nombre es obligatorio"); return; }
    setLoading(true);
    try {
      const catId = isNew ? name.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-") : category.id;
      
      let uploadedUrl = photoUrl;
      if (file) {
        const fileRef = ref(storage, `categorias/${catId}_bg`);
        const snapshot = await uploadBytes(fileRef, file);
        uploadedUrl = await getDownloadURL(snapshot.ref);
      }

      let uploadedLogo1 = logo1Url;
      if (fileLogo1) {
        const fileRef = ref(storage, `categorias/${catId}_logo1`);
        const snapshot = await uploadBytes(fileRef, fileLogo1);
        uploadedLogo1 = await getDownloadURL(snapshot.ref);
      }

      let uploadedLogo2 = logo2Url;
      if (fileLogo2) {
        const fileRef = ref(storage, `categorias/${catId}_logo2`);
        const snapshot = await uploadBytes(fileRef, fileLogo2);
        uploadedLogo2 = await getDownloadURL(snapshot.ref);
      }

      const finalLogos = [uploadedLogo1, uploadedLogo2].filter(l => l && l.trim());

      await setDoc(doc(db, "categorias", catId), {
        name, titulo: name, description, descripcion: description,
        colorA, colorB, orden: Number(orden), photo: uploadedUrl,
        logos: finalLogos,
        active: isNew ? true : (category.active ?? true)
      }, { merge: true });

      toast.success(isNew ? "Categoría creada ✓" : "Categoría guardada ✓");
      onClose();
    } catch (err) { toast.error("Error al guardar categoría"); }
    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "var(--colorNeutralBackground1)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 12, width: 480, padding: 24, maxHeight: "90vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
        <h3 style={{ color: C.textPrimary, fontSize: 18, fontWeight: 700, margin: "0 0 16px" }}>{isNew ? "Nueva Categoría" : `Editar — ${name}`}</h3>
        <label style={labelStyle}>Nombre de Categoría</label>
        <input value={name} onChange={e => setName(e.target.value)} style={inputStyle} placeholder="Ej: Salud, Identidad" />
        <label style={labelStyle}>Descripción</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} style={{ ...inputStyle, height: 60, resize: "vertical" }} />
        
        {/* Background Image Preview & Upload */}
        <label style={{ ...labelStyle, borderTop: `1px solid ${C.border}`, paddingTop: 12, marginTop: 12, fontWeight: 600, color: C.primary }}>Imagen de Fondo (Tarjeta)</label>
        {photoUrl && (
          <div style={{ marginBottom: 12, position: "relative", borderRadius: 8, overflow: "hidden", height: 80, border: `1px solid ${C.border}` }}>
            <img src={photoUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />
            <span style={{ position: "absolute", bottom: 4, left: 4, background: "var(--colorNeutralBackground1)", padding: "2px 6px", fontSize: 10, borderRadius: 4, color: "#fff" }}>Vista previa de fondo</span>
          </div>
        )}
        <input value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} style={inputStyle} placeholder="URL de la imagen de fondo" />
        <input type="file" accept="image/*" onChange={e => {
          if (e.target.files && e.target.files[0]) {
            const f = e.target.files[0];
            setFile(f);
            setPhotoUrl(URL.createObjectURL(f));
          }
        }} style={{ ...inputStyle, padding: "5px" }} />

        {/* Logo 1 Preview & Upload */}
        <label style={{ ...labelStyle, borderTop: `1px solid ${C.border}`, paddingTop: 12, marginTop: 12, fontWeight: 600, color: C.primary }}>Logo Portada Principal (Recuadro Blanco)</label>
        {logo1Url && (
          <div style={{ marginBottom: 12, display: "flex", justifyContent: "center", background: "#fff", padding: 10, borderRadius: 8, border: `1px solid ${C.border}` }}>
            <img src={logo1Url} alt="Logo 1 Preview" style={{ height: 30, maxWidth: 100, objectFit: "contain" }} />
          </div>
        )}
        <input value={logo1Url} onChange={e => setLogo1Url(e.target.value)} style={inputStyle} placeholder="URL del logo principal" />
        <input type="file" accept="image/*" onChange={e => {
          if (e.target.files && e.target.files[0]) {
            const f = e.target.files[0];
            setFileLogo1(f);
            setLogo1Url(URL.createObjectURL(f));
          }
        }} style={{ ...inputStyle, padding: "5px" }} />

        {/* Logo 2 Preview & Upload */}
        <label style={{ ...labelStyle, borderTop: `1px solid ${C.border}`, paddingTop: 12, marginTop: 12, fontWeight: 600, color: C.primary }}>Logo Portada Secundario (Opcional)</label>
        {logo2Url && (
          <div style={{ marginBottom: 12, display: "flex", justifyContent: "center", background: "#fff", padding: 10, borderRadius: 8, border: `1px solid ${C.border}` }}>
            <img src={logo2Url} alt="Logo 2 Preview" style={{ height: 30, maxWidth: 100, objectFit: "contain" }} />
          </div>
        )}
        <input value={logo2Url} onChange={e => setLogo2Url(e.target.value)} style={inputStyle} placeholder="URL del logo secundario" />
        <input type="file" accept="image/*" onChange={e => {
          if (e.target.files && e.target.files[0]) {
            const f = e.target.files[0];
            setFileLogo2(f);
            setLogo2Url(URL.createObjectURL(f));
          }
        }} style={{ ...inputStyle, padding: "5px" }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12, borderTop: `1px solid ${C.border}`, paddingTop: 12, marginTop: 12 }}>
          <div><label style={labelStyle}>Fondo (Gradiente A)</label><input type="color" value={colorA} onChange={e => setColorA(e.target.value)} style={{ ...inputStyle, padding: 2, height: 36, marginBottom: 0 }} /></div>
          <div><label style={labelStyle}>Acento (Brillo B)</label><input type="color" value={colorB} onChange={e => setColorB(e.target.value)} style={{ ...inputStyle, padding: 2, height: 36, marginBottom: 0 }} /></div>
        </div>
        <label style={labelStyle}>Orden de visualización</label>
        <input type="number" value={orden} onChange={e => setOrden(Number(e.target.value))} style={inputStyle} />
        
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
          <button type="button" onClick={onClose} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 6, color: C.textMuted, cursor: "pointer", padding: "8px 16px", fontSize: 13 }}>Cancelar</button>
          <button type="button" onClick={handleSave} disabled={loading} style={{ background: C.primary, border: "none", borderRadius: 6, color: "#fff", cursor: "pointer", padding: "8px 16px", fontSize: 13, fontWeight: 600 }}>{loading ? "Guardando..." : "Guardar"}</button>
        </div>
      </div>
    </div>
  );
}

// ── PexelsImagePicker ──────────────────────────────────────────────────────────
export function PexelsImagePicker({ onSelect, currentUrl }: { onSelect: (url: string) => void, currentUrl?: string }) {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [searching, setSearching] = useState(false);

  const quickTags = ["Perú", "Lima sunset", "Machu Picchu", "Arquitectura", "Oficina"];

  const search = async (searchQuery?: string) => {
    const q = searchQuery || query;
    if (!q || !q.trim()) return;
    setSearching(true);
    try {
      const results = await searchPexels(q.trim(), "landscape", 8);
      setPhotos(results || []);
    } catch (e) {
      toast.error("No se pudieron cargar imágenes");
    }
    setSearching(false);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <div style={{ marginBottom: 10 }}>
        <label style={{ display: "block", color: "var(--colorNeutralForeground1)", fontSize: 13.5, fontWeight: 750, marginBottom: 3 }}>
          Buscar Imagen de Portada
        </label>
        <span style={{ display: "block", color: "var(--colorNeutralForeground3)", fontSize: 12 }}>
          Escribe términos descriptivos o usa las etiquetas rápidas para personalizar tu cabecera.
        </span>
      </div>

      {/* Input de búsqueda de alto contraste */}
      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <div style={{ flex: 1, position: "relative" }}>
          <input 
            value={query} 
            onChange={e => setQuery(e.target.value)} 
            placeholder="Ej. Lima, arquitectura, cordillera, oficinas..." 
            onKeyDown={e => e.key === 'Enter' && search()}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "10px 14px",
              borderRadius: 10,
              background: "var(--colorNeutralBackground1)",
              border: "1.5px solid var(--colorNeutralStroke1)",
              color: "var(--colorNeutralForeground1)",
              fontSize: 14,
              fontWeight: 550,
              outline: "none",
              fontFamily: "'Inter', sans-serif",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)"
            }} 
          />
        </div>

        <button 
          type="button" 
          onClick={() => search()} 
          disabled={searching || !query.trim()} 
          style={{ 
            background: "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)", 
            border: "none", 
            color: "#FFFFFF", 
            padding: "0 18px", 
            borderRadius: 10, 
            cursor: searching || !query.trim() ? "not-allowed" : "pointer", 
            opacity: searching || !query.trim() ? 0.7 : 1,
            display: "inline-flex", 
            alignItems: "center", 
            gap: 7,
            fontSize: 13,
            fontWeight: 700,
            boxShadow: "0 2px 8px rgba(2, 132, 199, 0.25)",
            flexShrink: 0
          }}
        >
          {searching ? <SpinnerIos20Regular fontSize={16} /> : <SearchRegular fontSize={16} />}
          <span>{searching ? "Buscando..." : "Buscar"}</span>
        </button>
      </div>

      {/* Etiquetas Rápidas */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--colorNeutralForeground3)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          Sugerencias:
        </span>
        {quickTags.map(tag => (
          <button
            key={tag}
            type="button"
            onClick={() => {
              setQuery(tag);
              search(tag);
            }}
            style={{
              background: "var(--colorNeutralBackground1)",
              border: "1px solid var(--colorNeutralStroke1)",
              borderRadius: 20,
              padding: "3px 10px",
              fontSize: 12,
              fontWeight: 600,
              color: "var(--colorNeutralForeground2)",
              cursor: "pointer",
              transition: "all 0.15s ease"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "#0284C7";
              e.currentTarget.style.color = "#0284C7";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--colorNeutralStroke1)";
              e.currentTarget.style.color = "var(--colorNeutralForeground2)";
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Galería de resultados */}
      {photos.length > 0 && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--colorNeutralForeground2)", marginBottom: 8 }}>
            Selecciona una imagen para aplicarla de inmediato:
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 10, maxHeight: 220, overflowY: "auto", padding: 4, background: "var(--colorNeutralBackground1)", borderRadius: 12, border: "1px solid var(--colorNeutralStroke1)" }}>
            {photos.map(p => {
              const isSelected = currentUrl === p.src.large;
              return (
                <div 
                  key={p.id}
                  onClick={() => onSelect(p.src.large)}
                  style={{
                    position: "relative",
                    borderRadius: 8,
                    overflow: "hidden",
                    cursor: "pointer",
                    height: 80,
                    border: isSelected ? "2.5px solid #0284C7" : "1px solid var(--colorNeutralStroke2)",
                    boxShadow: isSelected ? "0 0 0 2px rgba(2, 132, 199, 0.3)" : "none",
                    transition: "transform 0.15s ease"
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  <img 
                    src={p.src.medium} 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    alt={p.alt || "Opción de fondo"} 
                  />
                  {isSelected && (
                    <div style={{ position: "absolute", inset: 0, background: "rgba(2, 132, 199, 0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ background: "#0284C7", color: "#fff", padding: "2px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700 }}>
                        Activo
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── TramiteEditorModal ─────────────────────────────────────────────────────────
export function TramiteEditorModal({ tramite, dynamicCats, onClose }: { tramite: any; dynamicCats: any[]; onClose: () => void }) {
  const isNew = !tramite || !tramite.id;
  const [title, setTitle] = useState(tramite?.title || "");
  const [categoryId, setCategoryId] = useState(tramite?.categoryId || dynamicCats[0]?.id || "identidad");
  const [entity, setEntity] = useState(tramite?.entity || "");
  const [description, setDescription] = useState(tramite?.description || "");
  const [url, setUrl] = useState(tramite?.url || "");
  const [bgImg, setBgImg] = useState(tramite?.bgImg || "");
  const [featured, setFeatured] = useState(!!tramite?.featured);
  const [active, setActive] = useState(tramite?.active !== false);

  const [reqs, setReqs] = useState<string[]>(Array.isArray(tramite?.requirements) ? tramite.requirements : []);
  const [cons, setCons] = useState<string[]>(Array.isArray(tramite?.considerations) ? tramite.considerations : []);
  const [tips, setTips] = useState<string[]>(Array.isArray(tramite?.tips) ? tramite.tips : []);

  const [loading, setLoading] = useState(false);

  const updateReqs = (i: number, val: string) => { setReqs(prev => { const n = [...prev]; n[i] = val; return n; }); };
  const addReq = () => setReqs(prev => [...prev, ""]);
  const delReq = (i: number) => setReqs(prev => prev.filter((_, idx) => idx !== i));

  const updateCons = (i: number, val: string) => { setCons(prev => { const n = [...prev]; n[i] = val; return n; }); };
  const addCon = () => setCons(prev => [...prev, ""]);
  const delCon = (i: number) => setCons(prev => prev.filter((_, idx) => idx !== i));

  const updateTips = (i: number, val: string) => { setTips(prev => { const n = [...prev]; n[i] = val; return n; }); };
  const addTip = () => setTips(prev => [...prev, ""]);
  const delTip = (i: number) => setTips(prev => prev.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    if (!title.trim() || !entity.trim()) { toast.error("Títítulo y Entidad son obligatorios"); return; }
    setLoading(true);
    try {
      const docId = isNew ? doc(collection(db, "tramites")).id : tramite.id;
      const payload = {
        id: docId,
        title,
        category: categoryId, // Write category!
        entity,
        description,
        url,
        bgImg: bgImg || "",
        featured,
        active,
        cost: "Gratuito",
        price: "Gratuito",
        duration: "Inmediato",
        time: "Inmediato",
        isPaid: false,
        isImmediate: true,
        requirements: reqs.filter(r => r.trim()),
        considerations: cons.filter(r => r.trim()),
        tips: tips.filter(r => r.trim()),
        views: tramite?.views || Math.floor(Math.random() * 5000),
      };

      await setDoc(doc(db, "tramites", docId), payload, { merge: true });
      toast.success(isNew ? "Trámite creado ✓" : "Trámite actualizado ✓");
      onClose();
    } catch (err) { toast.error("Error al guardar trámite"); }
    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "var(--colorNeutralBackground1)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 12, width: 800, maxHeight: "90vh", display: "flex", flexDirection: "column" }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ color: C.textPrimary, fontSize: 18, fontWeight: 700, margin: 0 }}>{isNew ? "Nuevo Trámite" : "Editar Trámite"}</h3>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", display: "flex" }}><DismissRegular fontSize={20} /></button>
        </div>
        <div style={{ padding: 24, overflowY: "auto", flex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 12 }}>
            <div><label style={labelStyle}>Títítulo del Trámite</label><input value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>Entidad (Siglas)</label><input value={entity} onChange={e => setEntity(e.target.value)} style={inputStyle} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, marginBottom: 12 }}>
            <div><label style={labelStyle}>Categoría</label>
              <select value={categoryId} onChange={e => setCategoryId(e.target.value)} style={{ ...inputStyle, padding: "7.5px 10px" }}>
                {dynamicCats.map((c:any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <PexelsImagePicker onSelect={setBgImg} currentUrl={bgImg} />
          <label style={labelStyle}>Descripción breve</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} style={{ ...inputStyle, height: 60, resize: "vertical" }} />
          <label style={labelStyle}>Enlace oficial (gob.pe)</label>
          <input value={url} onChange={e => setUrl(e.target.value)} style={inputStyle} />
          
          <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, color: C.textPrimary, fontSize: 13, cursor: "pointer" }}>
              <input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} /> Destacado en Inicio
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 8, color: C.textPrimary, fontSize: 13, cursor: "pointer" }}>
              <input type="checkbox" checked={active} onChange={e => setActive(e.target.checked)} /> Trámite Activo
            </label>
          </div>

          {[
            { lbl: "Requisitos", arr: reqs, add: addReq, update: updateReqs, del: delReq },
            { lbl: "Consideraciones", arr: cons, add: addCon, update: updateCons, del: delCon },
            { lbl: "Consejos IA", arr: tips, add: addTip, update: updateTips, del: delTip }
          ].map(grp => (
            <div key={grp.lbl} style={{ marginBottom: 20 }}>
              <label style={{ ...labelStyle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {grp.lbl}
                <button type="button" onClick={grp.add} style={{ background: "none", border: "none", color: C.primary, fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><AddRegular fontSize={11}/> Añadir</button>
              </label>
              {grp.arr.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <input value={item} onChange={e => grp.update(i, e.target.value)} style={{ ...inputStyle, marginBottom: 0 }} />
                  <button type="button" onClick={() => grp.del(i)} style={{ background: "none", border: `1px solid ${C.danger}44`, color: C.danger, borderRadius: 6, width: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><DeleteRegular fontSize={14}/></button>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ padding: "16px 24px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <button type="button" onClick={onClose} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, color: C.textMuted, padding: "8px 20px", cursor: "pointer", fontWeight: 600 }}>Cancelar</button>
          <button type="button" onClick={handleSave} disabled={loading} style={{ background: C.primary, border: "none", borderRadius: 8, color: "#fff", padding: "8px 20px", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
            {loading ? <SpinnerIos20Regular fontSize={16}  /> : <SaveRegular fontSize={16} />} Guardar Trámite
          </button>
        </div>
      </div>
    </div>
  );
}

// ── ExpressManagerModal ───────────────────────────────────────
export function ExpressManagerModal({ onClose, tramites }: { onClose: () => void; tramites: any[] }) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#3b82f6");
  const [iconName, setIconName] = useState("FileText");
  const [targetType, setTargetType] = useState<"tramite" | "page">("tramite");
  const [tramiteId, setTramiteId] = useState("");
  const [pageName, setPageName] = useState("placa");
  const [orden, setOrden] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "express"), orderBy("orden", "asc"));
    return onSnapshot(q, (snap) => {
      const list: any[] = [];
      snap.forEach(d => {
        list.push({ id: d.id, ...d.data() });
      });
      setItems(list);
      setLoading(false);
    });
  }, []);

  const startEdit = (item: any) => {
    setEditingItem(item);
    setIsAdding(false);
    setTitle(item.title || "");
    setColor(item.color || "#3b82f6");
    setIconName(item.iconName || "FileText");
    setTargetType(item.page ? "page" : "tramite");
    setTramiteId(item.tramiteId || "");
    setPageName(item.page || "placa");
    setOrden(item.orden || 0);
  };

  const startAdd = () => {
    setEditingItem(null);
    setIsAdding(true);
    setTitle("");
    setColor("#3b82f6");
    setIconName("FileText");
    setTargetType("tramite");
    setTramiteId(tramites[0]?.id || "");
    setPageName("placa");
    setOrden(items.length + 1);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Ests seguro de eliminar este acceso express?")) {
      try {
        await deleteDoc(doc(db, "express", id));
        toast.success("Acceso eliminado ✓");
        if (editingItem?.id === id) {
          setEditingItem(null);
        }
      } catch (err) {
        toast.error("Error al eliminar");
      }
    }
  };

  const handleSaveItem = async () => {
    if (!title.trim()) { toast.error("El títítulo es obligatorio"); return; }
    setSubmitting(true);
    try {
      const payload: any = {
        title,
        color,
        iconName,
        orden: Number(orden)
      };
      if (targetType === "tramite") {
        payload.tramiteId = tramiteId;
        payload.page = "";
      } else {
        payload.page = pageName;
        payload.tramiteId = "";
      }

      if (editingItem) {
        await setDoc(doc(db, "express", editingItem.id), payload, { merge: true });
        toast.success("Acceso actualizado ✓");
      } else {
        await addDoc(collection(db, "express"), payload);
        toast.success("Acceso creado ✓");
      }
      setEditingItem(null);
      setIsAdding(false);
    } catch (err) {
      toast.error("Error al guardar");
    }
    setSubmitting(false);
  };

  const availableIcons = ["FileText", "Calculator", "Car", "Activity", "Plane", "Landmark", "PiggyBank", "Shield", "Scale", "GraduationCap", "Wifi", "HelpCircle"];

  return (
    <div style={{ position: "fixed", inset: 0, background: "var(--colorNeutralBackground1)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 12, width: 700, maxHeight: "85vh", display: "flex", flexDirection: "column" }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ color: C.textPrimary, fontSize: 16, fontWeight: 700, margin: 0 }}>Gestionar Acceso Express</h3>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", display: "flex" }}><DismissRegular fontSize={18} /></button>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, padding: 20, overflowY: "auto", flex: 1 }}>
          {/* Left panel: list of items */}
          <div style={{ borderRight: `1px solid ${C.border}`, paddingRight: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ color: C.textMuted, fontSize: 13 }}>Accesos Actuales</span>
              <button type="button" onClick={startAdd} style={{ background: C.primary, border: "none", borderRadius: 6, color: "#fff", cursor: "pointer", padding: "4px 10px", fontSize: 11, fontWeight: 600 }}>+ Agregar</button>
            </div>
            
            {loading ? (
              <div style={{ color: C.textMuted, fontSize: 13 }}>Cargando...</div>
            ) : items.length === 0 ? (
              <div style={{ color: C.textMuted, fontSize: 13 }}>No hay accesos configurados.</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {items.map(item => (
                  <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--colorNeutralBackground1)", border: `1px solid ${C.border}`, padding: 8, borderRadius: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 24, height: 24, borderRadius: 6, background: `${item.color}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ color: item.color, fontSize: 12, fontWeight: 700 }}>⚡</span>
                      </div>
                      <span style={{ color: C.textPrimary, fontSize: 13, fontWeight: 600 }}>{item.title}</span>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button type="button" onClick={() => startEdit(item)} style={{ background: "none", border: "none", color: C.primary, cursor: "pointer", fontSize: 11 }}>Editar</button>
                      <button type="button" onClick={() => handleDelete(item.id)} style={{ background: "none", border: "none", color: C.danger, cursor: "pointer", fontSize: 11 }}>Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Right panel: add/edit form */}
          <div>
            {(editingItem || isAdding) ? (
              <div>
                <h4 style={{ color: C.textPrimary, fontSize: 14, margin: "0 0 12px" }}>{editingItem ? `Editar: ${title}` : "Nuevo Acceso"}</h4>
                
                <label style={labelStyle}>Títítulo del botón</label>
                <input value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} placeholder="Ej: Renovar DNI" />
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={labelStyle}>Color Acento</label>
                    <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ ...inputStyle, padding: 2, height: 36 }} />
                  </div>
                  <div>
                    <label style={labelStyle}>Icono Fluent UI</label>
                    <select value={iconName} onChange={e => setIconName(e.target.value)} style={{ ...inputStyle, padding: "7.5px 10px" }}>
                      {availableIcons.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                    </select>
                  </div>
                </div>

                <label style={labelStyle}>Tipo de Destino</label>
                <select value={targetType} onChange={e => setTargetType(e.target.value as any)} style={{ ...inputStyle, padding: "7.5px 10px" }}>
                  <option value="tramite">Abrir Trámite</option>
                  <option value="page">Ir a Pantalla</option>
                </select>

                {targetType === "tramite" ? (
                  <div>
                    <label style={labelStyle}>Seleccionar Trámite</label>
                    <select value={tramiteId} onChange={e => setTramiteId(e.target.value)} style={{ ...inputStyle, padding: "7.5px 10px" }}>
                      {tramites.map(t => <option key={t.id} value={t.id}>{t.title} ({t.entity})</option>)}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label style={labelStyle}>Seleccionar Pantalla</label>
                    <select value={pageName} onChange={e => setPageName(e.target.value)} style={{ ...inputStyle, padding: "7.5px 10px" }}>
                      <option value="placa">Consulta Placa</option>
                      <option value="cursos">Cursos Digitales</option>
                      <option value="help">Ayuda / Soporte</option>
                      <option value="home">Inicio</option>
                    </select>
                  </div>
                )}

                <label style={labelStyle}>Orden</label>
                <input type="number" value={orden} onChange={e => setOrden(Number(e.target.value))} style={inputStyle} />

                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 10 }}>
                  <button type="button" onClick={() => { setEditingItem(null); setIsAdding(false); }} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 6, color: C.textMuted, cursor: "pointer", padding: "6px 12px", fontSize: 12 }}>Cancelar</button>
                  <button type="button" onClick={handleSaveItem} disabled={submitting} style={{ background: C.primary, border: "none", borderRadius: 6, color: "#fff", cursor: "pointer", padding: "6px 12px", fontSize: 12, fontWeight: 600 }}>{submitting ? "Guardando..." : "Guardar botón"}</button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: C.textMuted, padding: 40, textAlign: "center" }}>
                <span>Selecciona un botón de la izquierda para editarlo o agrega uno nuevo.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

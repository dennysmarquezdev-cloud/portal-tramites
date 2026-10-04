import React, { useState } from "react";
import { AdminTramite, AdminCategoria } from "../types";
import { db } from "../../../firebase";
import { setDoc, doc, deleteDoc } from "firebase/firestore";
import { toast } from "sonner";
import { 
  FolderKanban, 
  Plus, 
  Edit3, 
  Trash2, 
  FileText, 
  CheckCircle2, 
  Sparkles,
  Palette,
  ArrowUpDown
} from "lucide-react";
import {
  Button,
  Card,
  Text,
  Badge,
  Input,
  Textarea,
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Field,
  Switch,
  makeStyles,
  tokens
} from "@fluentui/react-components";
import { ConfirmDialog } from "../components/ConfirmDialog";

const useStyles = makeStyles({
  container: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxWidth: "1400px",
    margin: "0 auto",
    width: "100%",
    boxSizing: "border-box"
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  kpiRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "14px",
  },
  kpiCard: {
    padding: "14px 18px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "18px",
  },
  catCard: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    position: "relative",
    overflow: "hidden",
    justifyContent: "space-between",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "10px",
  },
  cardContent: {
    color: tokens.colorNeutralForeground3,
    fontSize: "13px",
    lineHeight: "1.4",
    marginBottom: "16px",
    minHeight: "36px",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "14px",
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
  }
});

interface CategoriasPageProps {
  tramites: AdminTramite[];
  categories: AdminCategoria[];
}

export function CategoriasPage({ tramites, categories }: CategoriasPageProps) {
  const styles = useStyles();
  const [editingCat, setEditingCat] = useState<AdminCategoria | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const blank: AdminCategoria = {
    id: "",
    name: "",
    description: "",
    colorA: "#0f172a",
    colorB: "#2563EB",
    orden: categories.length,
    active: true
  };

  const [form, setForm] = useState<AdminCategoria>(blank);
  const set = (k: keyof AdminCategoria, v: any) => setForm(f => ({ ...f, [k]: v }));

  const startEdit = (cat: AdminCategoria) => {
    setForm(cat);
    setEditingCat(cat);
  };

  const startCreate = () => {
    setForm(blank);
    setShowCreateModal(true);
  };

  const handleClose = () => {
    setEditingCat(null);
    setShowCreateModal(false);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("El nombre de la categoría es obligatorio");
      return;
    }
    try {
      const isNew = showCreateModal;
      const catId = isNew ? form.name.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-") : form.id;
      
      const data = {
        ...form,
        id: catId,
        name: form.name.trim(),
        titulo: form.name.trim(),
        descripcion: form.description
      };
      
      await setDoc(doc(db, "categorias", catId), data, { merge: true });
      toast.success(isNew ? "Categoría creada correctamente ✓" : "Categoría actualizada ✓");
      handleClose();
    } catch (err) {
      console.error(err);
      toast.error("Error al guardar categoría");
    }
  };

  const handleToggleActive = async (cat: AdminCategoria) => {
    try {
      await setDoc(doc(db, "categorias", cat.id), { active: !cat.active }, { merge: true });
      toast.success(`Categoría ${!cat.active ? "activada" : "desactivada"}`);
    } catch (err) {
      console.error(err);
      toast.error("Error al cambiar estado");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "categorias", id));
      setConfirmDelete(null);
      toast.success("Categoría eliminada del sistema");
    } catch (err) {
      console.error(err);
      toast.error("Error al eliminar categoría");
    }
  };

  const totalCats = categories.length;
  const activeCats = categories.filter(c => c.active).length;
  const totalAssociatedTramites = tramites.length;

  return (
    <div className={styles.container}>
      {/* ── 1. Header ── */}
      <div className={styles.headerRow}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: tokens.colorNeutralForeground1, letterSpacing: "-0.02em" }}>
            Gestión de Categorías y Temáticas
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: 13.5, color: tokens.colorNeutralForeground3 }}>
            Organiza las ramas de trámites cívicos, colores de identidad y orden en el portal público.
          </p>
        </div>

        <Button 
          appearance="primary" 
          icon={<Plus size={16} />} 
          onClick={startCreate}
          style={{ fontWeight: 700, borderRadius: 10, background: "#2563EB", padding: "8px 18px" }}
        >
          Nueva Categoría
        </Button>
      </div>

      {/* ── 2. Mini KPIs ── */}
      <div className={styles.kpiRow}>
        <Card className={styles.kpiCard} style={{ borderLeft: "4px solid #2563EB" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(37, 99, 235, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563EB" }}>
            <FolderKanban size={18} />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 850, color: tokens.colorNeutralForeground1 }}>{totalCats}</div>
            <div style={{ fontSize: 11.5, color: tokens.colorNeutralForeground3, fontWeight: 600 }}>Categorías Totales</div>
          </div>
        </Card>

        <Card className={styles.kpiCard} style={{ borderLeft: "4px solid #10B981" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#10B981" }}>
            <CheckCircle2 size={18} />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 850, color: tokens.colorNeutralForeground1 }}>{activeCats}</div>
            <div style={{ fontSize: 11.5, color: tokens.colorNeutralForeground3, fontWeight: 600 }}>Activas en Portal</div>
          </div>
        </Card>

        <Card className={styles.kpiCard} style={{ borderLeft: "4px solid #D97706" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(245, 158, 11, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#D97706" }}>
            <FileText size={18} />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 850, color: tokens.colorNeutralForeground1 }}>{totalAssociatedTramites}</div>
            <div style={{ fontSize: 11.5, color: tokens.colorNeutralForeground3, fontWeight: 600 }}>Trámites Asignados</div>
          </div>
        </Card>
      </div>

      {/* ── 3. Grid de Tarjetas de Categorías ── */}
      <div className={styles.grid}>
        {categories.map(cat => {
          const count = tramites.filter(t => t.theme === cat.id).length;
          const accentColor = cat.colorB || "#2563EB";
          return (
            <Card key={cat.id} className={styles.catCard}>
              {/* Barra superior con gradiente de color de la categoría */}
              <div 
                style={{ 
                  position: "absolute", 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  height: 5, 
                  background: `linear-gradient(90deg, ${cat.colorA || '#1e3a8a'}, ${accentColor})` 
                }} 
              />

              <div>
                <div className={styles.cardHeader}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div 
                      style={{ 
                        width: 14, 
                        height: 14, 
                        borderRadius: "50%", 
                        backgroundColor: accentColor, 
                        boxShadow: `0 0 8px ${accentColor}80` 
                      }} 
                    />
                    <Text weight="bold" size={400} style={{ color: tokens.colorNeutralForeground1 }}>
                      {cat.name}
                    </Text>
                  </div>

                  <Badge 
                    appearance="tint" 
                    color={cat.active ? "success" : "danger"} 
                    onClick={() => handleToggleActive(cat)}
                    style={{ cursor: "pointer", fontWeight: 700 }}
                  >
                    {cat.active ? "Activa" : "Inactiva"}
                  </Badge>
                </div>

                <div className={styles.cardContent}>
                  {cat.description || "Sin descripción asignada para esta categoría."}
                </div>
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <Badge 
                    appearance="filled" 
                    style={{ backgroundColor: accentColor, color: "#FFFFFF", fontWeight: 700, padding: "2px 8px" }}
                  >
                    {count} {count === 1 ? "trámite" : "trámites"}
                  </Badge>
                  <span style={{ fontSize: 11.5, color: tokens.colorNeutralForeground3, marginLeft: "auto", fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                    <ArrowUpDown size={12} /> Orden: {cat.orden}
                  </span>
                </div>

                <div className={styles.cardFooter}>
                  <Button 
                    appearance="subtle" 
                    icon={<Edit3 size={14} />} 
                    onClick={() => startEdit(cat)}
                    style={{ borderRadius: 8, fontWeight: 600, fontSize: 12.5 }}
                  >
                    Editar
                  </Button>
                  <Button 
                    appearance="subtle" 
                    icon={<Trash2 size={14} />} 
                    onClick={() => setConfirmDelete(cat.id)} 
                    style={{ color: tokens.colorPaletteRedForeground1, borderRadius: 8, fontWeight: 600, fontSize: 12.5 }}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Modal Crear / Editar */}
      {(editingCat || showCreateModal) && (
        <Dialog open={true} onOpenChange={(_, d) => { if (!d.open) handleClose(); }}>
          <DialogSurface style={{ borderRadius: 16 }}>
            <DialogBody>
              <DialogTitle style={{ fontWeight: 800 }}>
                {showCreateModal ? "Nueva Categoría de Trámites" : `Editar Categoría: ${form.name}`}
              </DialogTitle>
              <DialogContent style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px 0" }}>
                
                <Field label="Nombre de Categoría" required>
                  <Input 
                    value={form.name} 
                    onChange={(e, d) => set("name", d.value)} 
                    placeholder="Ej: Tributos & Impuestos" 
                    style={{ borderRadius: 8 }}
                  />
                </Field>

                <Field label="Descripción Breve">
                  <Textarea 
                    value={form.description} 
                    onChange={(e, d) => set("description", d.value)} 
                    placeholder="Resumen descriptivo de los trámites comprendidos..." 
                    rows={3}
                    style={{ borderRadius: 8 }}
                  />
                </Field>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <Field label="Color A (Fondo / Primario)">
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <input 
                        type="color" 
                        value={form.colorA} 
                        onChange={(e) => set("colorA", e.target.value)} 
                        style={{ width: 42, height: 36, padding: 0, border: `1px solid ${tokens.colorNeutralStroke1}`, borderRadius: 8, cursor: "pointer" }} 
                      />
                      <Input value={form.colorA} onChange={(e, d) => set("colorA", d.value)} style={{ width: "100%", borderRadius: 8 }} />
                    </div>
                  </Field>
                  <Field label="Color B (Acento / Botones)">
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <input 
                        type="color" 
                        value={form.colorB} 
                        onChange={(e) => set("colorB", e.target.value)} 
                        style={{ width: 42, height: 36, padding: 0, border: `1px solid ${tokens.colorNeutralStroke1}`, borderRadius: 8, cursor: "pointer" }} 
                      />
                      <Input value={form.colorB} onChange={(e, d) => set("colorB", d.value)} style={{ width: "100%", borderRadius: 8 }} />
                    </div>
                  </Field>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", alignItems: "center" }}>
                  <Field label="Orden de visualización">
                    <Input 
                      type="number" 
                      value={form.orden.toString()} 
                      onChange={(e, d) => set("orden", Number(d.value))} 
                      style={{ borderRadius: 8 }}
                    />
                  </Field>
                  <div style={{ paddingTop: 24 }}>
                    <Switch 
                      checked={form.active} 
                      onChange={(e, d) => set("active", d.checked)} 
                      label="Categoría Activa en Portal" 
                    />
                  </div>
                </div>

              </DialogContent>
              <DialogActions>
                <Button appearance="secondary" onClick={handleClose} style={{ borderRadius: 8 }}>Cancelar</Button>
                <Button appearance="primary" onClick={handleSave} style={{ borderRadius: 8, background: "#2563EB", fontWeight: 700 }}>Guardar Categoría</Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      )}

      {confirmDelete && (
        <ConfirmDialog 
          title="Eliminar Categoría"
          message="¿Estás seguro de que deseas eliminar esta categoría?"
          warning="Los trámites asociados a esta categoría quedarán sin tema principal."
          onConfirm={() => handleDelete(confirmDelete)} 
          onClose={() => setConfirmDelete(null)} 
        />
      )}
    </div>
  );
}

import React, { useState } from "react";
import { AdminTramite, AdminCategoria } from "../types";
import { db } from "../../../firebase";
import { setDoc, doc, deleteDoc, collection } from "firebase/firestore";
import { toast } from "sonner";
import { 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  FileText, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  ExternalLink,
  Filter,
  X
} from "lucide-react";
import {
  Button,
  Input,
  Select,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
  Switch,
  Card,
  makeStyles,
  tokens
} from "@fluentui/react-components";
import { TramiteFormModal } from "../components/TramiteFormModal";
import { ConfirmDialog } from "../components/ConfirmDialog";

const PAGE_SIZE = 12;

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
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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
  controlsCard: {
    padding: "16px 20px",
    borderRadius: "14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "14px",
    flexWrap: "wrap",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
  },
  filters: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  tableWrapper: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "14px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
  },
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 20px",
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: tokens.colorNeutralBackground2,
  }
});

interface TramitesPageProps {
  tramites: AdminTramite[];
  categories: AdminCategoria[];
}

export function TramitesPage({ tramites, categories }: TramitesPageProps) {
  const styles = useStyles();
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [filterEntity, setFilterEntity] = useState<"all" | "sunat" | "others">("all");
  const [page, setPage] = useState(1);
  const [editingTramite, setEditingTramite] = useState<AdminTramite | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  // Estadísticas clave
  const totalCount = tramites.length;
  const sunatCount = tramites.filter(t => (t.entity || "").toUpperCase().includes("SUNAT") || (t.theme || "").toLowerCase().includes("sunat") || (t.theme || "").toLowerCase().includes("tributos")).length;
  const featuredCount = tramites.filter(t => t.featured).length;
  const activeCount = tramites.filter(t => t.active).length;
  const maxViews = Math.max(...tramites.map(t => t.views || 0), 1);

  const filtered = tramites.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
      t.entity.toLowerCase().includes(search.toLowerCase()) ||
      (t.subtheme || "").toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "all" || t.theme === filterCat;
    const isSunat = (t.entity || "").toUpperCase().includes("SUNAT") || (t.theme || "").toLowerCase().includes("sunat") || (t.theme || "").toLowerCase().includes("tributos");
    const matchEntity = filterEntity === "all" ? true : filterEntity === "sunat" ? isSunat : !isSunat;
    return matchSearch && matchCat && matchEntity;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleUpdate = async (id: string, changes: Partial<AdminTramite>, label: string) => {
    try {
      await setDoc(doc(db, "tramites", id), changes, { merge: true });
      toast.success(`Trámite actualizado: ${label}`);
    } catch (err) {
      console.error(err);
      toast.error("Error al actualizar trámite");
    }
  };

  const handleSave = async (t: AdminTramite) => {
    try {
      const dbData = {
        ...t,
        id: t.id || doc(collection(db, "tramites")).id,
      };
      await setDoc(doc(db, "tramites", dbData.id), dbData);
      setEditingTramite(null);
      setShowCreateModal(false);
      toast.success("Trámite guardado en Firestore ✓");
    } catch (err) {
      console.error(err);
      toast.error("Error al guardar trámite");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "tramites", id));
      setConfirmDelete(null);
      toast.success("Trámite eliminado correctamente");
    } catch (err) {
      console.error(err);
      toast.error("Error al eliminar trámite");
    }
  };

  const getCatLabel = (id: string) => categories.find(c => c.id === id)?.name || id;

  return (
    <div className={styles.container}>
      {/* ── 1. Header con Título & Botón Principal ── */}
      <div className={styles.headerRow}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: tokens.colorNeutralForeground1, letterSpacing: "-0.02em" }}>
            Catálogo Oficial de Trámites
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: 13.5, color: tokens.colorNeutralForeground3 }}>
            Gestiona la información tributaria, enlaces oficiales y base de conocimiento para LOTA AI.
          </p>
        </div>

        <Button 
          appearance="primary" 
          icon={<Plus size={16} />} 
          onClick={() => { setEditingTramite(null); setShowCreateModal(true); }}
          style={{ fontWeight: 700, borderRadius: 10, background: "#2563EB", padding: "8px 18px" }}
        >
          Nuevo Trámite
        </Button>
      </div>

      {/* ── 2. Mini KPIs del Catálogo ── */}
      <div className={styles.kpiRow}>
        <Card className={styles.kpiCard} style={{ borderLeft: "4px solid #2563EB" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(37, 99, 235, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563EB" }}>
            <FileText size={18} />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 850, color: tokens.colorNeutralForeground1 }}>{totalCount}</div>
            <div style={{ fontSize: 11.5, color: tokens.colorNeutralForeground3, fontWeight: 600 }}>Total en Catálogo</div>
          </div>
        </Card>

        <Card className={styles.kpiCard} style={{ borderLeft: "4px solid #D97706" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(245, 158, 11, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#D97706" }}>
            <ShieldCheck size={18} />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 850, color: tokens.colorNeutralForeground1 }}>{sunatCount}</div>
            <div style={{ fontSize: 11.5, color: tokens.colorNeutralForeground3, fontWeight: 600 }}>Trámites SUNAT RAG</div>
          </div>
        </Card>

        <Card className={styles.kpiCard} style={{ borderLeft: "4px solid #8B5CF6" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(139, 92, 246, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#8B5CF6" }}>
            <Star size={18} />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 850, color: tokens.colorNeutralForeground1 }}>{featuredCount}</div>
            <div style={{ fontSize: 11.5, color: tokens.colorNeutralForeground3, fontWeight: 600 }}>Destacados Home</div>
          </div>
        </Card>

        <Card className={styles.kpiCard} style={{ borderLeft: "4px solid #10B981" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#10B981" }}>
            <CheckCircle2 size={18} />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 850, color: tokens.colorNeutralForeground1 }}>{activeCount}</div>
            <div style={{ fontSize: 11.5, color: tokens.colorNeutralForeground3, fontWeight: 600 }}>Públicos & Activos</div>
          </div>
        </Card>
      </div>

      {/* ── 3. Barra de Controles y Filtros ── */}
      <Card className={styles.controlsCard}>
        <div className={styles.filters}>
          <div style={{ position: "relative", width: 280 }}>
            <Input 
              contentBefore={<Search size={16} color="#64748B" />}
              placeholder="Buscar trámite, entidad o palabra..." 
              value={search} 
              onChange={(e, d) => { setSearch(d.value); setPage(1); }} 
              style={{ width: "100%", borderRadius: 10 }}
            />
            {search && (
              <button 
                onClick={() => { setSearch(""); setPage(1); }}
                style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          <Select 
            value={filterCat} 
            onChange={(e, d) => { setFilterCat(d.value); setPage(1); }}
            style={{ borderRadius: 10 }}
          >
            <option value="all">Todas las categorías</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>

          <Select 
            value={filterEntity} 
            onChange={(e, d) => { setFilterEntity(d.value as any); setPage(1); }}
            style={{ borderRadius: 10 }}
          >
            <option value="all">Todas las entidades</option>
            <option value="sunat">Solo SUNAT (Oficial)</option>
            <option value="others">Otras Entidades</option>
          </Select>
        </div>

        <div style={{ fontSize: 12.5, color: tokens.colorNeutralForeground3, fontWeight: 600 }}>
          Mostrando <strong style={{ color: tokens.colorNeutralForeground1 }}>{filtered.length}</strong> de {totalCount} trámites
        </div>
      </Card>

      {/* ── 4. Tabla de Trámites Moderna ── */}
      <div className={styles.tableWrapper}>
        <Table aria-label="Lista de trámites oficial">
          <TableHeader>
            <TableRow style={{ background: tokens.colorNeutralBackground2 }}>
              <TableHeaderCell style={{ fontWeight: 750, color: tokens.colorNeutralForeground2, padding: "12px 16px" }}>Categoría</TableHeaderCell>
              <TableHeaderCell style={{ fontWeight: 750, color: tokens.colorNeutralForeground2, padding: "12px 16px" }}>Trámite Oficial</TableHeaderCell>
              <TableHeaderCell style={{ fontWeight: 750, color: tokens.colorNeutralForeground2, padding: "12px 16px" }}>Entidad</TableHeaderCell>
              <TableHeaderCell style={{ fontWeight: 750, color: tokens.colorNeutralForeground2, padding: "12px 16px", textAlign: "center" }}>Destacado</TableHeaderCell>
              <TableHeaderCell style={{ fontWeight: 750, color: tokens.colorNeutralForeground2, padding: "12px 16px", textAlign: "center" }}>Activo</TableHeaderCell>
              <TableHeaderCell style={{ fontWeight: 750, color: tokens.colorNeutralForeground2, padding: "12px 16px" }}>Consultas</TableHeaderCell>
              <TableHeaderCell style={{ fontWeight: 750, color: tokens.colorNeutralForeground2, padding: "12px 16px", textAlign: "right" }}>Acciones</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} style={{ textAlign: "center", padding: "48px 16px", color: tokens.colorNeutralForeground3 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <FileText size={32} color="#94A3B8" />
                    <span style={{ fontSize: 14, fontWeight: 650 }}>No se encontraron trámites con los filtros actuales</span>
                    <Button appearance="subtle" size="small" onClick={() => { setSearch(""); setFilterCat("all"); setFilterEntity("all"); }}>
                      Limpiar filtros
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : paged.map((t) => {
              const isSunat = (t.entity || "").toUpperCase().includes("SUNAT") || (t.theme || "").toLowerCase().includes("sunat") || (t.theme || "").toLowerCase().includes("tributos");
              return (
                <TableRow key={t.id} style={{ borderBottom: `1px solid ${tokens.colorNeutralStroke1}` }}>
                  {/* Categoría */}
                  <TableCell style={{ padding: "14px 16px" }}>
                    <Badge appearance="tint" color="brand" style={{ fontWeight: 650 }}>
                      {getCatLabel(t.theme)}
                    </Badge>
                  </TableCell>

                  {/* Título & Subtema */}
                  <TableCell style={{ padding: "14px 16px", maxWidth: 360 }}>
                    <div style={{ fontWeight: 700, color: tokens.colorNeutralForeground1, lineHeight: 1.35, marginBottom: 2 }}>
                      {t.title}
                    </div>
                    {t.subtheme && (
                      <span style={{ fontSize: 11.5, color: tokens.colorNeutralForeground3 }}>
                        {t.subtheme}
                      </span>
                    )}
                  </TableCell>

                  {/* Entidad */}
                  <TableCell style={{ padding: "14px 16px" }}>
                    <span style={{
                      fontSize: 11.5,
                      fontWeight: 750,
                      padding: "4px 9px",
                      borderRadius: 6,
                      background: isSunat ? "rgba(245, 158, 11, 0.12)" : "rgba(37, 99, 235, 0.1)",
                      color: isSunat ? "#D97706" : "#2563EB",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4
                    }}>
                      {isSunat && <ShieldCheck size={12} />}
                      {t.entity || "SUNAT"}
                    </span>
                  </TableCell>

                  {/* Destacado Switch */}
                  <TableCell style={{ padding: "14px 16px", textAlign: "center" }}>
                    <Switch 
                      checked={t.featured} 
                      onChange={(e, d) => handleUpdate(t.id, { featured: d.checked }, d.checked ? "Destacado en Home" : "Removido de Destacados")} 
                      aria-label="Alternar destacado"
                    />
                  </TableCell>

                  {/* Activo Switch */}
                  <TableCell style={{ padding: "14px 16px", textAlign: "center" }}>
                    <Switch 
                      checked={t.active} 
                      onChange={(e, d) => handleUpdate(t.id, { active: d.checked }, d.checked ? "Trámite Activado" : "Trámite Oculto")} 
                      aria-label="Alternar activo"
                    />
                  </TableCell>

                  {/* Vistas / Popularidad */}
                  <TableCell style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 60, height: 6, borderRadius: 3, background: tokens.colorNeutralBackground3, overflow: "hidden" }}>
                        <div 
                          style={{ 
                            width: `${Math.max(Math.round((t.views / maxViews) * 100), 10)}%`, 
                            height: "100%", 
                            background: "#2563EB",
                            borderRadius: 3
                          }} 
                        />
                      </div>
                      <span style={{ fontSize: 11.5, color: tokens.colorNeutralForeground3, fontWeight: 650 }}>
                        {t.views || 0}
                      </span>
                    </div>
                  </TableCell>

                  {/* Acciones */}
                  <TableCell style={{ padding: "14px 16px", textAlign: "right" }}>
                    <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                      {t.url && (
                        <a 
                          href={t.url} 
                          target="_blank" 
                          rel="noreferrer"
                          style={{ 
                            padding: 6, 
                            borderRadius: 8, 
                            color: tokens.colorNeutralForeground3, 
                            display: "inline-flex", 
                            alignItems: "center" 
                          }}
                          title="Abrir enlace oficial"
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}
                      <Button 
                        icon={<Edit3 size={15} />} 
                        appearance="subtle" 
                        onClick={() => { setEditingTramite(t); setShowCreateModal(false); }} 
                        aria-label="Editar trámite" 
                        title="Editar trámite"
                        style={{ borderRadius: 8 }}
                      />
                      <Button 
                        icon={<Trash2 size={15} />} 
                        appearance="subtle" 
                        onClick={() => setConfirmDelete(t.id)} 
                        aria-label="Eliminar trámite" 
                        title="Eliminar trámite"
                        style={{ color: tokens.colorPaletteRedForeground1, borderRadius: 8 }} 
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* ── 5. Paginación ── */}
        <div className={styles.pagination}>
          <span style={{ fontSize: 12.5, color: tokens.colorNeutralForeground3, fontWeight: 600 }}>
            Página <strong>{page}</strong> de <strong>{totalPages}</strong> ({filtered.length} resultados)
          </span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Button 
              size="small"
              appearance="secondary" 
              disabled={page === 1} 
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              style={{ borderRadius: 8, fontWeight: 650 }}
            >
              Anterior
            </Button>
            <Button 
              size="small"
              appearance="secondary" 
              disabled={page === totalPages} 
              onClick={() => setPage(p => Math.min(p + 1, totalPages))}
              style={{ borderRadius: 8, fontWeight: 650 }}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>

      {/* Modales */}
      {(showCreateModal || editingTramite) && (
        <TramiteFormModal 
          initial={editingTramite} 
          categories={categories}
          onSave={handleSave} 
          onClose={() => { setEditingTramite(null); setShowCreateModal(false); }} 
        />
      )}

      {confirmDelete && (
        <ConfirmDialog 
          title="Eliminar Trámite Oficial"
          message="¿Estás seguro de que deseas eliminar este trámite de forma permanente del catálogo?"
          warning="Esta acción afectará en tiempo real las respuestas de LOTA AI y la base de datos Firestore."
          onConfirm={() => handleDelete(confirmDelete)} 
          onClose={() => setConfirmDelete(null)} 
        />
      )}
    </div>
  );
}

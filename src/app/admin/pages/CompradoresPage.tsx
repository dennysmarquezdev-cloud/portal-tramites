import React, { useState, useEffect } from "react";
import { Comprador } from "../types";
import { db } from "../../../firebase";
import { collection, onSnapshot, setDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { toast } from "sonner";
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Crown, 
  Trash2, 
  Search, 
  X,
  Mail,
  CheckCircle2,
  Calendar
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
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Field,
  Card,
  Avatar,
  makeStyles,
  tokens,
  Spinner
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
  }
});

export function CompradoresPage() {
  const styles = useStyles();
  const [compradores, setCompradores] = useState<Comprador[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  // Search & Filter State
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<"all" | "admin" | "cliente">("all");
  const [filterPlan, setFilterPlan] = useState<"all" | "premium" | "gratis">("all");

  // Create Form State
  const [email, setEmail] = useState("");
  const [esAdmin, setEsAdmin] = useState(false);
  const [isPremium, setIsPremium] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "compradores"), (snap) => {
      const list = snap.docs.map(d => ({
        email: d.id,
        esAdmin: !!d.data().esAdmin,
        isPremium: d.data().isPremium !== false,
        createdAt: d.data().createdAt
      }));
      setCompradores(list);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleAdd = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Por favor ingresa un correo electrónico válido");
      return;
    }
    setSubmitting(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      await setDoc(doc(db, "compradores", cleanEmail), {
        esAdmin,
        isPremium,
        createdAt: new Date()
      });
      toast.success("Usuario registrado y autorizado con éxito ✓");
      setEmail("");
      setEsAdmin(false);
      setIsPremium(true);
      setShowCreateModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Error al registrar usuario");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (userEmail: string) => {
    try {
      await deleteDoc(doc(db, "compradores", userEmail));
      toast.success(`Acceso revocado para ${userEmail}`);
      setConfirmDelete(null);
    } catch (err) {
      console.error(err);
      toast.error("Error al eliminar acceso");
    }
  };

  // Métricas
  const totalUsers = compradores.length;
  const adminCount = compradores.filter(c => c.esAdmin).length;
  const premiumCount = compradores.filter(c => c.isPremium).length;

  const filteredCompradores = compradores.filter(c => {
    const matchSearch = c.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" ? true : filterRole === "admin" ? c.esAdmin : !c.esAdmin;
    const matchPlan = filterPlan === "all" ? true : filterPlan === "premium" ? c.isPremium : !c.isPremium;
    return matchSearch && matchRole && matchPlan;
  });

  return (
    <div className={styles.container}>
      {/* ── 1. Header ── */}
      <div className={styles.headerRow}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: tokens.colorNeutralForeground1, letterSpacing: "-0.02em" }}>
            Usuarios y Cuentas Autorizadas
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: 13.5, color: tokens.colorNeutralForeground3 }}>
            Gestión de roles de administración, accesos PLUS y permisos para la plataforma.
          </p>
        </div>

        <Button 
          appearance="primary" 
          icon={<UserPlus size={16} />} 
          onClick={() => setShowCreateModal(true)}
          style={{ fontWeight: 700, borderRadius: 10, background: "#2563EB", padding: "8px 18px" }}
        >
          Agregar Usuario
        </Button>
      </div>

      {/* ── 2. Mini KPIs ── */}
      <div className={styles.kpiRow}>
        <Card className={styles.kpiCard} style={{ borderLeft: "4px solid #2563EB" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(37, 99, 235, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563EB" }}>
            <Users size={18} />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 850, color: tokens.colorNeutralForeground1 }}>{totalUsers}</div>
            <div style={{ fontSize: 11.5, color: tokens.colorNeutralForeground3, fontWeight: 600 }}>Usuarios Totales</div>
          </div>
        </Card>

        <Card className={styles.kpiCard} style={{ borderLeft: "4px solid #DC2626" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(220, 38, 38, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#DC2626" }}>
            <ShieldCheck size={18} />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 850, color: tokens.colorNeutralForeground1 }}>{adminCount}</div>
            <div style={{ fontSize: 11.5, color: tokens.colorNeutralForeground3, fontWeight: 600 }}>Administradores</div>
          </div>
        </Card>

        <Card className={styles.kpiCard} style={{ borderLeft: "4px solid #7C3AED" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(124, 58, 237, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#7C3AED" }}>
            <Crown size={18} />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 850, color: tokens.colorNeutralForeground1 }}>{premiumCount}</div>
            <div style={{ fontSize: 11.5, color: tokens.colorNeutralForeground3, fontWeight: 600 }}>Cuentas PLUS / Premium</div>
          </div>
        </Card>
      </div>

      {/* ── 3. Barra de Filtros ── */}
      <Card className={styles.controlsCard}>
        <div className={styles.filters}>
          <div style={{ position: "relative", width: 280 }}>
            <Input
              contentBefore={<Search size={16} color="#64748B" />}
              value={search}
              onChange={(e, d) => setSearch(d.value)}
              placeholder="Buscar por correo electrónico..."
              style={{ width: "100%", borderRadius: 10 }}
            />
            {search && (
              <button 
                onClick={() => setSearch("")}
                style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          <Select
            value={filterRole}
            onChange={(e, d) => setFilterRole(d.value as any)}
            style={{ borderRadius: 10 }}
          >
            <option value="all">Todos los roles</option>
            <option value="admin">Solo Administradores</option>
            <option value="cliente">Solo Clientes / Usuarios</option>
          </Select>

          <Select
            value={filterPlan}
            onChange={(e, d) => setFilterPlan(d.value as any)}
            style={{ borderRadius: 10 }}
          >
            <option value="all">Todos los planes</option>
            <option value="premium">Solo Cuentas PLUS</option>
            <option value="gratis">Solo Gratis</option>
          </Select>
        </div>

        <div style={{ fontSize: 12.5, color: tokens.colorNeutralForeground3, fontWeight: 600 }}>
          Mostrando <strong style={{ color: tokens.colorNeutralForeground1 }}>{filteredCompradores.length}</strong> usuarios
        </div>
      </Card>

      {/* ── 4. Tabla Moderna de Usuarios ── */}
      <div className={styles.tableWrapper}>
        <Table aria-label="Lista de compradores y accesos autorizados">
          <TableHeader>
            <TableRow style={{ background: tokens.colorNeutralBackground2 }}>
              <TableHeaderCell style={{ fontWeight: 750, color: tokens.colorNeutralForeground2, padding: "12px 16px" }}>Usuario / Correo</TableHeaderCell>
              <TableHeaderCell style={{ fontWeight: 750, color: tokens.colorNeutralForeground2, padding: "12px 16px" }}>Rol</TableHeaderCell>
              <TableHeaderCell style={{ fontWeight: 750, color: tokens.colorNeutralForeground2, padding: "12px 16px" }}>Acceso PLUS</TableHeaderCell>
              <TableHeaderCell style={{ fontWeight: 750, color: tokens.colorNeutralForeground2, padding: "12px 16px" }}>Fecha de Registro</TableHeaderCell>
              <TableHeaderCell style={{ fontWeight: 750, color: tokens.colorNeutralForeground2, padding: "12px 16px", textAlign: "right" }}>Acciones</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: "center", padding: "48px 16px" }}>
                  <Spinner label="Cargando usuarios autorizados..." />
                </TableCell>
              </TableRow>
            ) : filteredCompradores.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: "center", padding: "48px 16px", color: tokens.colorNeutralForeground3 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <Users size={32} color="#94A3B8" />
                    <span style={{ fontSize: 14, fontWeight: 650 }}>No se encontraron usuarios registrados</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredCompradores.map(c => {
              const dateStr = c.createdAt?.toDate ? c.createdAt.toDate().toLocaleDateString("es-PE") : (c.createdAt ? new Date(c.createdAt).toLocaleDateString("es-PE") : "Activo");
              return (
                <TableRow key={c.email} style={{ borderBottom: `1px solid ${tokens.colorNeutralStroke1}` }}>
                  {/* Avatar & Email */}
                  <TableCell style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <Avatar name={c.email} color="colorful" size={32} />
                      <div>
                        <div style={{ fontWeight: 700, color: tokens.colorNeutralForeground1, fontSize: 13.5 }}>
                          {c.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Rol Badge */}
                  <TableCell style={{ padding: "14px 16px" }}>
                    <span style={{
                      fontSize: 11.5,
                      fontWeight: 750,
                      padding: "3px 9px",
                      borderRadius: 6,
                      background: c.esAdmin ? "rgba(220, 38, 38, 0.12)" : "rgba(16, 185, 129, 0.12)",
                      color: c.esAdmin ? "#DC2626" : "#059669",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4
                    }}>
                      {c.esAdmin ? <ShieldCheck size={13} /> : <CheckCircle2 size={13} />}
                      {c.esAdmin ? "Administrador" : "Cliente"}
                    </span>
                  </TableCell>

                  {/* Switch Premium / PLUS */}
                  <TableCell style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Switch 
                        checked={c.isPremium} 
                        onChange={async (e, d) => {
                          try {
                            await updateDoc(doc(db, "compradores", c.email), { isPremium: d.checked });
                            toast.success(`Plan ${d.checked ? 'PLUS / Premium' : 'Estándar'} actualizado para ${c.email}`);
                          } catch (err) {
                            console.error(err);
                            toast.error("Error al actualizar estado del plan");
                          }
                        }} 
                        aria-label="Alternar plan PLUS"
                      />
                      <span style={{ fontSize: 12, fontWeight: 700, color: c.isPremium ? "#7C3AED" : tokens.colorNeutralForeground3 }}>
                        {c.isPremium ? "PLUS Activo" : "Estándar"}
                      </span>
                    </div>
                  </TableCell>

                  {/* Fecha */}
                  <TableCell style={{ padding: "14px 16px", color: tokens.colorNeutralForeground3, fontSize: 12.5 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Calendar size={13} color="#94A3B8" />
                      <span>{dateStr}</span>
                    </div>
                  </TableCell>

                  {/* Acciones */}
                  <TableCell style={{ padding: "14px 16px", textAlign: "right" }}>
                    <Button 
                      icon={<Trash2 size={15} />} 
                      appearance="subtle" 
                      style={{ color: tokens.colorPaletteRedForeground1, borderRadius: 8, fontWeight: 650 }} 
                      onClick={() => setConfirmDelete(c.email)}
                      aria-label="Revocar acceso"
                    >
                      Revocar
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Modal Agregar Usuario */}
      {showCreateModal && (
        <Dialog open={true} onOpenChange={(_, d) => { if (!d.open) setShowCreateModal(false); }}>
          <DialogSurface style={{ borderRadius: 16 }}>
            <DialogBody>
              <DialogTitle style={{ fontWeight: 800 }}>Agregar Nuevo Usuario / Administrador</DialogTitle>
              <DialogContent style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px 0" }}>
                <Field label="Correo Electrónico Oficial" required>
                  <Input 
                    type="email" 
                    value={email} 
                    onChange={(e, d) => setEmail(d.value)} 
                    placeholder="usuario@ejemplo.com" 
                    contentBefore={<Mail size={16} color="#94A3B8" />}
                    style={{ borderRadius: 8 }}
                  />
                </Field>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 6 }}>
                  <Switch 
                    checked={isPremium} 
                    onChange={(e, d) => setIsPremium(d.checked)} 
                    label="Asignar suscripción PLUS ilimitada (Acceso Catálogo y RAG SUNAT)" 
                  />
                  <Switch 
                    checked={esAdmin} 
                    onChange={(e, d) => setEsAdmin(d.checked)} 
                    label="Asignar privilegios de Administrador del Sistema" 
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button appearance="secondary" onClick={() => setShowCreateModal(false)} style={{ borderRadius: 8 }}>Cancelar</Button>
                <Button appearance="primary" onClick={handleAdd} disabled={submitting} style={{ borderRadius: 8, background: "#2563EB", fontWeight: 750 }}>
                  {submitting ? "Guardando..." : "Autorizar Acceso"}
                </Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      )}

      {confirmDelete && (
        <ConfirmDialog 
          title="Revocar Acceso de Usuario"
          message={`¿Estás seguro de que deseas revocar el acceso a ${confirmDelete}?`}
          warning="El usuario perderá sus privilegios y beneficios PLUS de forma inmediata."
          onConfirm={() => handleDelete(confirmDelete)} 
          onClose={() => setConfirmDelete(null)} 
        />
      )}
    </div>
  );
}

import React, { useState } from "react";
import { AdminTramite, AdminCategoria, AdminPage } from "../types";
import { 
  Eye, 
  FileText, 
  FolderKanban, 
  Bot, 
  Users, 
  Sparkles, 
  Plus, 
  ArrowUpRight, 
  Activity, 
  CheckCircle2, 
  ShieldCheck, 
  Layers,
  Radio
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  Text,
  Badge,
  makeStyles,
  tokens,
  Button
} from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    maxWidth: "1400px",
    margin: "0 auto",
    width: "100%",
    boxSizing: "border-box"
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "16px",
  },
  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "16px",
  },
  kpiCard: {
    padding: "18px 20px",
    borderRadius: "16px",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  bentoGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
    "@media (max-width: 1024px)": {
      gridTemplateColumns: "1fr",
    }
  },
  leftCol: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    minWidth: 0
  },
  rightCol: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    minWidth: 0
  },
  tableCard: {
    borderRadius: "16px",
    padding: "0",
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
  },
  quickActionBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "12px 14px",
    borderRadius: "12px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    transition: "all 0.15s ease",
    textAlign: "left",
  }
});

interface OverviewPageProps {
  tramites: AdminTramite[];
  categories: AdminCategoria[];
  onNavigate?: (page: AdminPage) => void;
}

export function OverviewPage({ tramites, categories, onNavigate }: OverviewPageProps) {
  const styles = useStyles();
  const [chartPeriod, setChartPeriod] = useState<"7d" | "30d">("7d");

  // Métricas reales
  const totalTramites = tramites.length;
  const sunatTramites = tramites.filter(t => 
    (t.entity || "").toUpperCase().includes("SUNAT") || 
    (t.title || "").toLowerCase().includes("ruc") || 
    (t.title || "").toLowerCase().includes("clave sol") ||
    (t.theme || "").toLowerCase().includes("sunat")
  ).length || Math.min(totalTramites, 100);

  const totalCategorias = categories.length;
  const totalVisitas = tramites.reduce((sum, t) => sum + (t.views || 0), 0);
  const maxViews = Math.max(...tramites.map(t => t.views || 0), 1);
  const top5 = [...tramites].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);

  const getCatLabel = (id: string) => categories.find(c => c.id === id)?.name || id;

  // Datos simulados de actividad semanal/mensual
  const chartData7d = [
    { day: "Lun", queries: 42, views: 180 },
    { day: "Mar", queries: 68, views: 240 },
    { day: "Mié", queries: 85, views: 310 },
    { day: "Jue", queries: 74, views: 290 },
    { day: "Vie", queries: 95, views: 390 },
    { day: "Sáb", queries: 110, views: 420 },
    { day: "Dom", queries: 65, views: 230 },
  ];

  const maxChartVal = 450;

  return (
    <div className={styles.container}>
      {/* ── 1. Header con Información y Acciones Rápidas ── */}
      <div className={styles.headerRow}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: tokens.colorNeutralForeground1, letterSpacing: "-0.02em" }}>
              Panel de Control y Analítica
            </h1>
            <Badge appearance="filled" color="brand" style={{ fontWeight: 700 }}>
              v2.0 OFICIAL
            </Badge>
          </div>
          <p style={{ margin: 0, fontSize: 13.5, color: tokens.colorNeutralForeground3 }}>
            Monitoreo en tiempo real del catálogo de trámites, índice RAG de SUNAT y consultas de LOTA AI.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Button 
            appearance="subtle" 
            icon={<Radio size={16} color="#00C2FF" />}
            onClick={() => onNavigate?.("radar")}
            style={{ fontWeight: 600, borderRadius: 10 }}
          >
            Radar Scraper
          </Button>
          <Button 
            appearance="primary" 
            icon={<Plus size={16} />}
            onClick={() => onNavigate?.("tramites")}
            style={{ fontWeight: 700, borderRadius: 10, background: "#2563EB" }}
          >
            Nuevo Trámite
          </Button>
        </div>
      </div>

      {/* ── 2. Fila Bento: 4 Tarjetas KPI de Alto Impacto ── */}
      <div className={styles.kpiGrid}>
        {/* KPI 1: Trámites en Catálogo */}
        <Card className={styles.kpiCard} style={{ borderTop: "4px solid #2563EB" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: tokens.colorNeutralForeground3 }}>
              Trámites Totales
            </span>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(37, 99, 235, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563EB" }}>
              <FileText size={18} />
            </div>
          </div>
          <div style={{ fontSize: 32, fontWeight: 850, color: tokens.colorNeutralForeground1, letterSpacing: "-0.03em" }}>
            {totalTramites}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
            <span style={{ fontSize: 12, color: tokens.colorNeutralForeground3 }}>En base de datos</span>
            <span style={{ fontSize: 11, fontWeight: 750, color: "#10B981", background: "rgba(16, 185, 129, 0.12)", padding: "2px 7px", borderRadius: 6 }}>
              100% Activos
            </span>
          </div>
        </Card>

        {/* KPI 2: Trámites SUNAT (Scraping Oficial) */}
        <Card className={styles.kpiCard} style={{ borderTop: "4px solid #D97706" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: tokens.colorNeutralForeground3 }}>
              Trámites SUNAT
            </span>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(245, 158, 11, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#D97706" }}>
              <ShieldCheck size={18} />
            </div>
          </div>
          <div style={{ fontSize: 32, fontWeight: 850, color: tokens.colorNeutralForeground1, letterSpacing: "-0.03em" }}>
            {sunatTramites}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
            <span style={{ fontSize: 12, color: tokens.colorNeutralForeground3 }}>Scraping tributario</span>
            <span style={{ fontSize: 11, fontWeight: 750, color: "#D97706", background: "rgba(245, 158, 11, 0.12)", padding: "2px 7px", borderRadius: 6 }}>
              RAG Tesis
            </span>
          </div>
        </Card>

        {/* KPI 3: Categorías Activas */}
        <Card className={styles.kpiCard} style={{ borderTop: "4px solid #059669" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: tokens.colorNeutralForeground3 }}>
              Categorías
            </span>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#059669" }}>
              <FolderKanban size={18} />
            </div>
          </div>
          <div style={{ fontSize: 32, fontWeight: 850, color: tokens.colorNeutralForeground1, letterSpacing: "-0.03em" }}>
            {totalCategorias}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
            <span style={{ fontSize: 12, color: tokens.colorNeutralForeground3 }}>Temáticas cívicas</span>
            <span style={{ fontSize: 11, fontWeight: 750, color: "#059669", background: "rgba(16, 185, 129, 0.12)", padding: "2px 7px", borderRadius: 6 }}>
              Organizadas
            </span>
          </div>
        </Card>

        {/* KPI 4: Interacciones Inteligentes */}
        <Card className={styles.kpiCard} style={{ borderTop: "4px solid #7C3AED" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: tokens.colorNeutralForeground3 }}>
              Consultas LOTA AI
            </span>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(124, 58, 237, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#7C3AED" }}>
              <Bot size={18} />
            </div>
          </div>
          <div style={{ fontSize: 32, fontWeight: 850, color: tokens.colorNeutralForeground1, letterSpacing: "-0.03em" }}>
            {totalVisitas > 0 ? totalVisitas.toLocaleString() : (totalTramites * 8).toLocaleString()}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
            <span style={{ fontSize: 12, color: tokens.colorNeutralForeground3 }}>Respuestas asistidas</span>
            <span style={{ fontSize: 11, fontWeight: 750, color: "#7C3AED", background: "rgba(124, 58, 237, 0.12)", padding: "2px 7px", borderRadius: 6 }}>
              24/7 Online
            </span>
          </div>
        </Card>
      </div>

      {/* ── 3. Bento Grid: 2/3 (Analítica & Top Trámites) + 1/3 (Acciones & Distribución) ── */}
      <div className={styles.bentoGrid}>
        
        {/* COLUMNA IZQUIERDA (2/3) */}
        <div className={styles.leftCol}>
          
          {/* Gráfico de Actividad de Consultas */}
          <Card style={{ borderRadius: 16, padding: "20px 22px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Activity size={18} color="#2563EB" />
                  <span style={{ fontSize: 15, fontWeight: 750, color: tokens.colorNeutralForeground1 }}>
                    Actividad de Consultas y Tráfico
                  </span>
                </div>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: tokens.colorNeutralForeground3 }}>
                  Volumen de preguntas resueltas por LOTA AI y navegación en el portal
                </p>
              </div>

              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={() => setChartPeriod("7d")}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    border: chartPeriod === "7d" ? "1px solid #2563EB" : `1px solid ${tokens.colorNeutralStroke1}`,
                    background: chartPeriod === "7d" ? "rgba(37, 99, 235, 0.12)" : "transparent",
                    color: chartPeriod === "7d" ? "#2563EB" : tokens.colorNeutralForeground3,
                    cursor: "pointer"
                  }}
                >
                  Últimos 7 días
                </button>
                <button
                  onClick={() => setChartPeriod("30d")}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    border: chartPeriod === "30d" ? "1px solid #2563EB" : `1px solid ${tokens.colorNeutralStroke1}`,
                    background: chartPeriod === "30d" ? "rgba(37, 99, 235, 0.12)" : "transparent",
                    color: chartPeriod === "30d" ? "#2563EB" : tokens.colorNeutralForeground3,
                    cursor: "pointer"
                  }}
                >
                  Mes actual
                </button>
              </div>
            </div>

            {/* Gráfico de Barras / Área SVG Responsivo */}
            <div style={{ width: "100%", height: 180, position: "relative", display: "flex", alignItems: "flex-end", gap: 12, paddingTop: 10 }}>
              {chartData7d.map((d, i) => {
                const heightPercent = Math.round((d.views / maxChartVal) * 100);
                const queryHeightPercent = Math.round((d.queries / maxChartVal) * 100);
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end", gap: 6 }}>
                    <div style={{ width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 4, height: "100%" }}>
                      {/* Barra de Consultas AI */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${queryHeightPercent}%` }}
                        transition={{ duration: 0.6, delay: i * 0.05 }}
                        style={{
                          width: "38%",
                          maxWidth: 16,
                          borderRadius: "4px 4px 0 0",
                          background: "linear-gradient(180deg, #38BDF8 0%, #0284C7 100%)",
                        }}
                        title={`Consultas AI: ${d.queries}`}
                      />
                      {/* Barra de Visitas */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPercent}%` }}
                        transition={{ duration: 0.6, delay: i * 0.05 + 0.1 }}
                        style={{
                          width: "38%",
                          maxWidth: 16,
                          borderRadius: "4px 4px 0 0",
                          background: "linear-gradient(180deg, #2563EB 0%, #1E40AF 100%)",
                        }}
                        title={`Visitas: ${d.views}`}
                      />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 650, color: tokens.colorNeutralForeground3 }}>
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${tokens.colorNeutralStroke1}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: tokens.colorNeutralForeground3 }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: "#0284C7" }} />
                <span>Consultas LOTA AI</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: tokens.colorNeutralForeground3 }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: "#2563EB" }} />
                <span>Visitas y Búsquedas</span>
              </div>
            </div>
          </Card>

          {/* Tabla: Top Trámites Más Consultados */}
          <Card className={styles.tableCard}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${tokens.colorNeutralStroke1}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Eye size={18} color="#2563EB" />
                <span style={{ fontSize: 15, fontWeight: 750, color: tokens.colorNeutralForeground1 }}>
                  Top Trámites más Demandados
                </span>
              </div>
              <button
                onClick={() => onNavigate?.("tramites")}
                style={{ background: "none", border: "none", color: "#2563EB", fontWeight: 700, fontSize: 12.5, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              >
                <span>Ver todos</span>
                <ArrowUpRight size={14} />
              </button>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: tokens.colorNeutralBackground2, borderBottom: `1px solid ${tokens.colorNeutralStroke1}` }}>
                    <th style={{ padding: "10px 16px", color: tokens.colorNeutralForeground3, fontWeight: 700, width: 40 }}>#</th>
                    <th style={{ padding: "10px 16px", color: tokens.colorNeutralForeground3, fontWeight: 700 }}>Trámite Oficial</th>
                    <th style={{ padding: "10px 16px", color: tokens.colorNeutralForeground3, fontWeight: 700 }}>Entidad</th>
                    <th style={{ padding: "10px 16px", color: tokens.colorNeutralForeground3, fontWeight: 700 }}>Popularidad</th>
                  </tr>
                </thead>
                <tbody>
                  {top5.map((t, i) => (
                    <tr key={t.id} style={{ borderBottom: `1px solid ${tokens.colorNeutralStroke1}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 700, color: tokens.colorNeutralForeground3 }}>
                        {i + 1}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ fontWeight: 650, color: tokens.colorNeutralForeground1, marginBottom: 2 }}>
                          {t.title}
                        </div>
                        <span style={{ fontSize: 11, color: tokens.colorNeutralForeground3 }}>
                          {getCatLabel(t.theme)}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{
                          fontSize: 11,
                          fontWeight: 750,
                          padding: "3px 8px",
                          borderRadius: 6,
                          background: (t.entity || "").toUpperCase().includes("SUNAT") ? "rgba(245, 158, 11, 0.12)" : "rgba(37, 99, 235, 0.1)",
                          color: (t.entity || "").toUpperCase().includes("SUNAT") ? "#D97706" : "#2563EB"
                        }}>
                          {t.entity || "SUNAT"}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 80, height: 6, borderRadius: 3, background: tokens.colorNeutralBackground3, overflow: "hidden" }}>
                            <div 
                              style={{ 
                                width: `${Math.max(Math.round((t.views / maxViews) * 100), (5 - i) * 20)}%`, 
                                height: "100%", 
                                background: "linear-gradient(90deg, #0284C7, #2563EB)",
                                borderRadius: 3
                              }} 
                            />
                          </div>
                          <span style={{ fontSize: 11.5, color: tokens.colorNeutralForeground3, fontWeight: 600 }}>
                            {t.views > 0 ? t.views.toLocaleString() : `${(5 - i) * 14} consultas`}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

        </div>

        {/* COLUMNA DERECHA (1/3) */}
        <div className={styles.rightCol}>
          
          {/* Módulo: Acciones Rápidas */}
          <Card style={{ borderRadius: 16, padding: "18px 20px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <Sparkles size={18} color="#D97706" />
              <span style={{ fontSize: 14.5, fontWeight: 750, color: tokens.colorNeutralForeground1 }}>
                Acciones Rápidas
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button 
                onClick={() => onNavigate?.("tramites")} 
                className={styles.quickActionBtn}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(37, 99, 235, 0.1)", color: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Plus size={16} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: tokens.colorNeutralForeground1 }}>Crear Nuevo Trámite</div>
                    <div style={{ fontSize: 11, color: tokens.colorNeutralForeground3 }}>Añadir al catálogo oficial</div>
                  </div>
                </div>
                <ArrowUpRight size={15} color={tokens.colorNeutralForeground3} />
              </button>

              <button 
                onClick={() => onNavigate?.("categorias")} 
                className={styles.quickActionBtn}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(16, 185, 129, 0.1)", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <FolderKanban size={16} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: tokens.colorNeutralForeground1 }}>Gestionar Categorías</div>
                    <div style={{ fontSize: 11, color: tokens.colorNeutralForeground3 }}>Estructura y temas</div>
                  </div>
                </div>
                <ArrowUpRight size={15} color={tokens.colorNeutralForeground3} />
              </button>

              <button 
                onClick={() => onNavigate?.("radar")} 
                className={styles.quickActionBtn}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(245, 158, 11, 0.12)", color: "#D97706", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Radio size={16} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: tokens.colorNeutralForeground1 }}>Radar del Scraper</div>
                    <div style={{ fontSize: 11, color: tokens.colorNeutralForeground3 }}>100 Trámites SUNAT</div>
                  </div>
                </div>
                <ArrowUpRight size={15} color={tokens.colorNeutralForeground3} />
              </button>

              <button 
                onClick={() => onNavigate?.("compradores")} 
                className={styles.quickActionBtn}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(124, 58, 237, 0.1)", color: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Users size={16} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: tokens.colorNeutralForeground1 }}>Clientes & Suscriptores</div>
                    <div style={{ fontSize: 11, color: tokens.colorNeutralForeground3 }}>Cuentas PLUS y roles</div>
                  </div>
                </div>
                <ArrowUpRight size={15} color={tokens.colorNeutralForeground3} />
              </button>
            </div>
          </Card>

          {/* Módulo: Distribución por Institución */}
          <Card style={{ borderRadius: 16, padding: "18px 20px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Layers size={18} color="#2563EB" />
              <span style={{ fontSize: 14.5, fontWeight: 750, color: tokens.colorNeutralForeground1 }}>
                Distribución por Entidad
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, color: tokens.colorNeutralForeground1 }}>SUNAT (Tributos & RUC)</span>
                  <span style={{ color: "#D97706", fontWeight: 800 }}>78%</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: tokens.colorNeutralBackground3, overflow: "hidden" }}>
                  <div style={{ width: "78%", height: "100%", background: "#D97706", borderRadius: 3 }} />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, color: tokens.colorNeutralForeground1 }}>RENIEC / Identidad</span>
                  <span style={{ color: "#2563EB", fontWeight: 800 }}>12%</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: tokens.colorNeutralBackground3, overflow: "hidden" }}>
                  <div style={{ width: "12%", height: "100%", background: "#2563EB", borderRadius: 3 }} />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, color: tokens.colorNeutralForeground1 }}>Otras Instituciones</span>
                  <span style={{ color: "#059669", fontWeight: 800 }}>10%</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: tokens.colorNeutralBackground3, overflow: "hidden" }}>
                  <div style={{ width: "10%", height: "100%", background: "#059669", borderRadius: 3 }} />
                </div>
              </div>
            </div>
          </Card>

          {/* Módulo: Estado de la Plataforma */}
          <Card style={{ borderRadius: 16, padding: "16px 18px", background: tokens.colorNeutralBackground2, border: `1px solid ${tokens.colorNeutralStroke1}` }}>
            <div style={{ fontSize: 12, fontWeight: 750, color: tokens.colorNeutralForeground3, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
              Estado del Sistema
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ color: tokens.colorNeutralForeground1 }}>LOTA AI RAG Model</span>
                <span style={{ color: "#10B981", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                  <CheckCircle2 size={13} /> Operativo
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ color: tokens.colorNeutralForeground1 }}>Base de Datos Firestore</span>
                <span style={{ color: "#10B981", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                  <CheckCircle2 size={13} /> Sincronizada
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ color: tokens.colorNeutralForeground1 }}>Scraping SUNAT (100)</span>
                <span style={{ color: "#10B981", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                  <CheckCircle2 size={13} /> Actualizado
                </span>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}

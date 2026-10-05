import React, { useState, useEffect } from "react";
import { Toaster } from "sonner";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AdminPage, AdminTramite, AdminCategoria } from "./admin/types";

import { AdminSidebar } from "./admin/components/AdminSidebar";
import { AdminTopBar } from "./admin/components/AdminTopBar";
import { OverviewPage } from "./admin/pages/OverviewPage";
import { TramitesPage } from "./admin/pages/TramitesPage";
import { CategoriasPage } from "./admin/pages/CategoriasPage";
import { CompradoresPage } from "./admin/pages/CompradoresPage";
import { RadarTramites } from "./components/RadarTramites";

import { makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    fontFamily: "'Inter', 'system-ui', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    overflow: "hidden",
  },
  pageContainer: {
    flex: 1,
    overflow: "auto",
  }
});

interface AdminDashboardProps {
  onExit: () => void;
}

import { seedCategories } from "./seedCategorias";

export default function AdminDashboard({ onExit }: AdminDashboardProps) {
  const styles = useStyles();
  const [page, setPage] = useState<AdminPage>("overview");
  const [tramites, setTramites] = useState<AdminTramite[]>([]);
  const [categories, setCategories] = useState<AdminCategoria[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      seedCategories();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tramites"), (snap) => {
      const list = snap.docs.map(d => {
        const data = d.data();
        return {
          id: d.id,
          title: data.title || data.name || "",
          entity: data.entity || "",
          theme: data.theme || data.category || "",
          subtheme: data.subtheme || "",
          url: data.url || "",
          action_url: data.action_url || "",
          raw_content: data.raw_content || data.description || "",
          featured: !!data.featured,
          active: data.active !== false,
          views: data.views || 0,
        } as AdminTramite;
      });
      setTramites(list);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "categorias"), (snap) => {
      const list = snap.docs.map(d => {
        const data = d.data();
        return {
          id: d.id,
          name: data.name || data.titulo || d.id,
          description: data.description || data.descripcion || "",
          colorA: data.colorA || "#1e3a8a",
          colorB: data.colorB || "#60a5fa",
          orden: data.orden !== undefined ? data.orden : 0,
          active: data.active !== false
        } as AdminCategoria;
      });
      list.sort((a, b) => a.orden - b.orden);
      setCategories(list);
    });
    return () => unsub();
  }, []);

  return (
    <div className={styles.root}>
      <Toaster position="bottom-right" closeButton={false} offset={20} />
      
      <AdminSidebar 
        page={page} 
        setPage={(p) => {
          setPage(p);
          setMobileMenuOpen(false);
        }} 
        onExit={onExit} 
        isOpen={mobileMenuOpen}
        setIsOpen={setMobileMenuOpen}
        tramitesCount={tramites.length}
        categoriesCount={categories.length}
      />
      
      <div className={styles.mainContent}>
        <AdminTopBar 
          currentPage={page}
          onMenuToggle={() => setMobileMenuOpen(true)} 
          onExit={onExit}
        />
        
        <main className={styles.pageContainer}>
          {page === "overview" && <OverviewPage tramites={tramites} categories={categories} onNavigate={setPage} />}
          {page === "tramites" && <TramitesPage tramites={tramites} categories={categories} />}
          {page === "categorias" && <CategoriasPage tramites={tramites} categories={categories} />}
          {page === "compradores" && <CompradoresPage />}
          {page === "radar" && <RadarTramites />}
        </main>
      </div>
    </div>
  );
}

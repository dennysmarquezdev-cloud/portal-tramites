import React from "react";
import { LogOut } from "lucide-react";
import {
  NavDrawer,
  NavDrawerBody,
  NavItem,
  NavDrawerHeader,
  Button,
  Avatar,
  Badge,
  makeStyles,
  tokens
} from "@fluentui/react-components";
import {
  BoardRegular,
  BoardFilled,
  DocumentCopyRegular,
  DocumentCopyFilled,
  GridRegular,
  GridFilled,
  PeopleRegular,
  PeopleFilled,
  bundleIcon
} from "@fluentui/react-icons";
import { LogoIcon } from "../../components/LogoIcon";
import { AdminPage } from "../types";

const DashboardIcon = bundleIcon(BoardFilled, BoardRegular);
const TramitesIcon = bundleIcon(DocumentCopyFilled, DocumentCopyRegular);
const CategoriasIcon = bundleIcon(GridFilled, GridRegular);
const UsersIcon = bundleIcon(PeopleFilled, PeopleRegular);

const useStyles = makeStyles({
  root: {
    height: "100%",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    width: "250px",
    flexShrink: 0,
  },
  header: {
    padding: "18px 16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  title: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: "1.2",
    color: tokens.colorNeutralForeground1,
  },
  subtitle: {
    fontSize: "11px",
    fontWeight: 750,
    color: "#059669",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    letterSpacing: "0.05em",
    marginTop: "2px",
  },
  dot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#10B981",
    boxShadow: "0 0 5px #10B981",
  },
  footer: {
    padding: "16px",
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  navItem: {
    borderRadius: "8px",
    marginBottom: "4px",
    fontWeight: 550,
    fontSize: "13.5px",
    transition: "all 0.15s ease",
  }
});

interface AdminSidebarProps {
  page: AdminPage;
  setPage: (p: AdminPage) => void;
  onExit: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  tramitesCount?: number;
  categoriesCount?: number;
}

export function AdminSidebar({ 
  page, 
  setPage, 
  onExit, 
  isOpen, 
  setIsOpen,
  tramitesCount = 0,
  categoriesCount = 0
}: AdminSidebarProps) {
  const styles = useStyles();

  return (
    <NavDrawer
      open={isOpen}
      type="inline"
      onOpenChange={(_, { open }) => setIsOpen(open)}
      className={styles.root}
    >
      <NavDrawerHeader className={styles.header}>
        <LogoIcon size={34} />
        <div>
          <div className={styles.title}>ahorratiempo</div>
          <div className={styles.subtitle}>
            <span className={styles.dot} />
            ADMIN PANEL v2.0
          </div>
        </div>
      </NavDrawerHeader>

      <NavDrawerBody style={{ padding: "14px 10px" }}>
        <NavItem
          icon={<DashboardIcon />}
          value="overview"
          onClick={() => setPage("overview")}
          className={styles.navItem}
          style={{ 
            backgroundColor: page === "overview" ? "rgba(37, 99, 235, 0.08)" : "transparent",
            color: page === "overview" ? "#2563EB" : tokens.colorNeutralForeground1,
            fontWeight: page === "overview" ? 700 : 550
          }}
        >
          Resumen
        </NavItem>
        
        <NavItem
          icon={<TramitesIcon />}
          value="tramites"
          onClick={() => setPage("tramites")}
          className={styles.navItem}
          style={{ 
            backgroundColor: page === "tramites" ? "rgba(37, 99, 235, 0.08)" : "transparent",
            color: page === "tramites" ? "#2563EB" : tokens.colorNeutralForeground1,
            fontWeight: page === "tramites" ? 700 : 550
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <span>Trámites</span>
            {tramitesCount > 0 && (
              <Badge appearance="tint" color="brand" size="small" style={{ fontWeight: 700 }}>
                {tramitesCount}
              </Badge>
            )}
          </div>
        </NavItem>

        <NavItem
          icon={<BoardRegular />}
          value="radar"
          onClick={() => setPage("radar")}
          className={styles.navItem}
          style={{ 
            backgroundColor: page === "radar" ? "rgba(37, 99, 235, 0.08)" : "transparent",
            color: page === "radar" ? "#2563EB" : tokens.colorNeutralForeground1,
            fontWeight: page === "radar" ? 700 : 550
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <span>Radar Scraper</span>
            <Badge appearance="filled" color="warning" size="small" style={{ fontWeight: 750, background: "#D97706" }}>
              SUNAT
            </Badge>
          </div>
        </NavItem>

        <NavItem
          icon={<CategoriasIcon />}
          value="categorias"
          onClick={() => setPage("categorias")}
          className={styles.navItem}
          style={{ 
            backgroundColor: page === "categorias" ? "rgba(37, 99, 235, 0.08)" : "transparent",
            color: page === "categorias" ? "#2563EB" : tokens.colorNeutralForeground1,
            fontWeight: page === "categorias" ? 700 : 550
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <span>Categorías</span>
            {categoriesCount > 0 && (
              <Badge appearance="tint" color="informative" size="small" style={{ fontWeight: 700 }}>
                {categoriesCount}
              </Badge>
            )}
          </div>
        </NavItem>

        <NavItem
          icon={<UsersIcon />}
          value="compradores"
          onClick={() => setPage("compradores")}
          className={styles.navItem}
          style={{ 
            backgroundColor: page === "compradores" ? "rgba(37, 99, 235, 0.08)" : "transparent",
            color: page === "compradores" ? "#2563EB" : tokens.colorNeutralForeground1,
            fontWeight: page === "compradores" ? 700 : 550
          }}
        >
          Usuarios / Clientes
        </NavItem>
      </NavDrawerBody>

      <div className={styles.footer}>
        <div className={styles.userInfo}>
          <Avatar size={36} name="Super Admin" color="colorful" />
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: tokens.colorNeutralForeground1, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
              admin@ahorratiempo.pe
            </div>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#2563EB" }}>
              Administrador Principal
            </div>
          </div>
        </div>
        <Button
          appearance="subtle"
          icon={<LogOut size={16} />}
          onClick={onExit}
          style={{ justifyContent: "flex-start", color: tokens.colorPaletteRedForeground1, fontWeight: 650, borderRadius: "8px" }}
        >
          Cerrar Sesión Admin
        </Button>
      </div>
    </NavDrawer>
  );
}

import React from "react";
import { Page } from "../types";
import { 
  HomeRegular, 
  GridRegular, 
  SparkleRegular,
  SparkleFilled, 
  BookmarkRegular, 
  PersonRegular,
  HomeFilled,
  GridFilled,
  BookmarkFilled,
  PersonFilled
} from '@fluentui/react-icons';
import { haptic } from "../utils/haptics";

interface MobileBottomNavProps {
  page: Page;
  setPage: (p: Page) => void;
  favCount?: number;
  user?: any;
  onLogin?: () => void;
  onOpenPaywall?: () => void;
  isAdmin?: boolean;
}

export function MobileBottomNav({ 
  page, 
  setPage, 
  favCount = 0,
  user,
  onLogin,
  onOpenPaywall,
  isAdmin
}: MobileBottomNavProps) {
  const handleLotaClick = () => {
    haptic.medium();
    if (!user) {
      onLogin?.();
      return;
    }
    const emailLower = (user.email || "").toLowerCase();
    const isPrem = user.isPremium === true || emailLower === "plaeis260@gmail.com" || isAdmin;
    if (!isPrem) {
      onOpenPaywall?.();
      return;
    }
    setPage("frutilota");
  };

  const navItems: Array<{
    id: Page;
    label: string;
    special?: boolean;
    badge?: number;
    onClick?: () => void;
    renderIcon: (active: boolean) => React.ReactNode;
  }> = [
    {
      id: "home",
      label: "Inicio",
      renderIcon: (active) => active ? <HomeFilled fontSize={22} /> : <HomeRegular fontSize={22} />
    },
    {
      id: "categories",
      label: "Catálogo",
      renderIcon: (active) => active ? <GridFilled fontSize={22} /> : <GridRegular fontSize={22} />
    },
    {
      id: "frutilota",
      label: "LOTA AI",
      special: true,
      onClick: handleLotaClick,
      renderIcon: () => (
        <span className="mob-nav-icon">
          <SparkleFilled fontSize={24} color="#FFFFFF" />
        </span>
      )
    },
    {
      id: "favorites",
      label: "Guardados",
      badge: favCount > 0 ? favCount : undefined,
      renderIcon: (active) => active ? <BookmarkFilled fontSize={22} /> : <BookmarkRegular fontSize={22} />
    },
    {
      id: "perfil",
      label: "Perfil",
      renderIcon: (active) => active ? <PersonFilled fontSize={22} /> : <PersonRegular fontSize={22} />
    }
  ];

  return (
    <nav className="mob-bottom-nav" aria-label="Navegación principal móvil">
      {navItems.map((item) => {
        const isActive = page === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              if (item.onClick) {
                item.onClick();
              } else {
                haptic.selection();
                setPage(item.id);
              }
            }}
            className={`mob-nav-btn ${item.special ? "mob-nav-btn--special" : ""} ${isActive && !item.special ? "mob-nav-btn--active" : ""}`}
            aria-label={item.label}
          >
            {item.renderIcon(isActive)}
            <span className="mob-nav-label">{item.label}</span>
            {item.badge !== undefined && (
              <span className="mob-nav-badge">{item.badge}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

import React, { useState, useContext, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HomeRegular, GridRegular, StarRegular, QuestionCircleRegular, PersonRegular, SettingsRegular, SignOutRegular, NavigationRegular, DismissRegular, SearchRegular, ChevronRightRegular, ClockRegular, BookmarkRegular, BookmarkAddRegular, DocumentTextRegular, ArrowUpRegular, BuildingRegular, AlertRegular, ChatMultipleRegular, BookOpenRegular, SendRegular, SpinnerIos20Regular, PlayRegular, RibbonStarRegular, ChevronDownRegular, CheckmarkCircleRegular, BotRegular, OpenRegular, ShieldRegular, InfoRegular, PhoneRegular, MailRegular, GlobeRegular, LocationRegular, FlashRegular, DesktopRegular, DocumentCheckmarkRegular } from '@fluentui/react-icons';
import { TramiteCard, TramiteCardLg, QuickAccessCard, ScrollRow } from "../components/Cards";
import { ErrorView } from "../components/ErrorView";
import { Page, Tramite, Category, ThemeKey, ExpressItem, Notif } from "../types";
import { THEMES, EXPRESS_ICONS, AI_FLOWS } from "../data";
import { CATS, T } from "../App";
import { AdminCMSContext } from "../context";
import { getCat, getLogosForCategory, getIconForCategory } from "../App";
import ReactMarkdown from "react-markdown";

export function SearchResults({ query, onSelect, favorites, onFav }: { query: string; onSelect: (t: Tramite) => void; favorites: Set<string>; onFav: (id: string) => void }) {
  const results = T.filter(t => `${t.title} ${t.entity} ${t.categoryId}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <div>
      <p style={{ color:"#7a9abf",fontSize:14,margin:"0 0 20px" }}>{results.length} resultados para "<span style={{ color:"#48cae4" }}>{query}</span>"</p>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:12 }}>
        {results.map(t => <TramiteCardLg key={t.id} t={t} onClick={() => onSelect(t)} faved={favorites.has(t.id)} onFav={e => { e.stopPropagation(); onFav(t.id); }} />)}
      </div>
      {results.length === 0 && (
        <div style={{ textAlign:"center",padding:"60px 0",color:"#3a5a7a" }}>
          <SearchRegular fontSize={40} style={{ marginBottom:12,opacity:.3 }} />
          <p style={{ fontSize:15,fontWeight:600,color:"#7a9abf" }}>Sin resultados</p>
          <p style={{ fontSize:13,marginTop:4 }}>Intenta con otro nombre o entidad.</p>
        </div>
      )}
    </div>
  );
}

import React from "react";

export type Page = "home" | "categories" | "favorites" | "help" | "perfil" | "ajustes" | "frutilota" | "privacidad" | "terminos" | "cookies" | "marketing-kit";
export type ThemeKey = "oceano" | "aurora" | "bosque" | "fuego" | "noche" | "cielo" | "desierto" | "andes" | "sunset";

export interface Tramite { id: string; title: string; categoryId: string; entity: string; price: string; isPaid: boolean; time: string; isImmediate: boolean; description: string; raw_content?: string; requirements: string[]; considerations: string[]; tips: string[]; featured?: boolean; url?: string; bgImg?: string; order?: number; }
export interface Category { id: string; name: string; description: string; count: number; colorA: string; colorB: string; Icon: React.ElementType; logos?: string[]; bgImg?: string; orden?: number; }
export interface Notif { id: string; entity: string; categoryId: string; title: string; desc: string; time: string; isNew: boolean; logo?: string; }
export interface ChatMsg { role: "user" | "bot"; text: string; steps?: string[]; chips?: string[]; time?: string; }
export interface ExpressItem { id: string; title: string; color: string; iconName: string; tramiteId?: string; page?: string; orden?: number; }
export interface UserProfile { uid: string; email: string; displayName?: string; photoURL?: string; isPremium?: boolean; }
export interface ActivityItem { text: string; time: string; timestamp: number; }

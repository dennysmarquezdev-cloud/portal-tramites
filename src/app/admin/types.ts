export type AdminPage = "overview" | "tramites" | "categorias" | "compradores" | "radar";

export interface AdminTramite {
  id: string;
  title: string;
  entity: string;
  theme: string;
  subtheme: string;
  featured: boolean;
  active: boolean;
  views: number;
  url?: string;
  action_url?: string;
  raw_content?: string;
}

export interface AdminCategoria {
  id: string;
  name: string;
  description: string;
  colorA: string;
  colorB: string;
  orden: number;
  active: boolean;
}

export interface Comprador {
  email: string;
  esAdmin: boolean;
  isPremium: boolean;
  createdAt?: any;
}

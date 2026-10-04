import { createContext } from "react";
export const AdminCMSContext = createContext<{ isAdmin: boolean; onEditCms: (type: "tramite"|"categoria"|"curso"|"site"|"express-list", data?: any) => void }>({ isAdmin: false, onEditCms: () => {} });

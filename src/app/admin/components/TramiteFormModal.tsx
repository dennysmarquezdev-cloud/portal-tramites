import React, { useState } from "react";
import { AdminTramite, AdminCategoria } from "../types";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  Field,
  Input,
  Select,
  Textarea,
  Switch,
} from "@fluentui/react-components";
import { toast } from "sonner";

interface TramiteFormModalProps {
  initial: AdminTramite | null;
  categories: AdminCategoria[];
  onSave: (t: AdminTramite) => void;
  onClose: () => void;
}

export function TramiteFormModal({ initial, categories, onSave, onClose }: TramiteFormModalProps) {
  const blank: AdminTramite = {
    id: "",
    title: "",
    entity: "",
    theme: categories[0]?.id || "identidad",
    subtheme: "",
    url: "",
    action_url: "",
    raw_content: "",
    featured: false,
    active: true,
    views: 0
  };
  
  const [form, setForm] = useState<AdminTramite>(initial ?? blank);
  const set = (k: keyof AdminTramite, v: any) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.title.trim()) {
      toast.error("El título es obligatorio");
      return;
    }
    onSave({ ...form, id: form.id || crypto.randomUUID() });
  };

  return (
    <Dialog open={true} onOpenChange={(_, d) => { if (!d.open) onClose(); }}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{initial ? "Editar Trámite" : "Nuevo Trámite"}</DialogTitle>
          <DialogContent style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "12px 0", maxHeight: "65vh" }}>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <Field label="Tema / Categoría">
                <Select value={form.theme} onChange={(e, d) => set("theme", d.value)}>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </Select>
              </Field>
              <Field label="Subtema">
                <Input value={form.subtheme} onChange={(e, d) => set("subtheme", d.value)} placeholder="Ej: Pasaportes" />
              </Field>
            </div>

            <Field label="Título">
              <Input value={form.title} onChange={(e, d) => set("title", d.value)} placeholder="Nombre del trámite" />
            </Field>

            <Field label="Entidad">
              <Input value={form.entity} onChange={(e, d) => set("entity", d.value)} placeholder="Ej: RENIEC" />
            </Field>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <Field label="URL Informativa">
                <Input value={form.url} onChange={(e, d) => set("url", d.value)} placeholder="https://..." />
              </Field>
              <Field label="URL de Acción">
                <Input value={form.action_url} onChange={(e, d) => set("action_url", d.value)} placeholder="https://..." />
              </Field>
            </div>

            <Field label="Contenido (Extraído)">
              <Textarea 
                value={form.raw_content} 
                onChange={(e, d) => set("raw_content", d.value)} 
                placeholder="Pegar o editar el contenido detallado del trámite aquí..." 
                resize="vertical"
                style={{ minHeight: "120px" }}
              />
            </Field>

            <div style={{ display: "flex", gap: "24px", marginTop: "8px" }}>
              <Switch checked={form.featured} onChange={(e, d) => set("featured", d.checked)} label="Destacado (Home)" />
              <Switch checked={form.active} onChange={(e, d) => set("active", d.checked)} label="Activo" />
            </div>

          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={onClose}>Cancelar</Button>
            <Button appearance="primary" onClick={handleSave}>Guardar Trámite</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}

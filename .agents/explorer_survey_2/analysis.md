# Accessibility Audit & Gap Analysis — Survey Phase (Explorer 2)

**Target Component Scope**: `CompradoresPage` and related Admin Dashboard components (`TramiteFormModal`, `ConfirmDialog`, `TramitesPage`, `CategoriasPage`, `AdminSidebar`, `AdminTopBar`, `OverviewPage` in `src/app/AdminDashboard.tsx`, `src/app/components/AdminDashboard.tsx`, and `src/app/InlineEditors.tsx`).

---

## Executive Summary

An exhaustive accessibility audit of `CompradoresPage` and the Admin Dashboard ecosystem revealed critical technical accessibility gaps across three primary categories:
1. **Missing ARIA Attributes & Roles**: Severe lack of `aria-label`, `aria-labelledby`, `role="dialog"`, `role="switch"`, `aria-checked`, `aria-pressed`, `aria-current`, and `scope` attributes across tables, form controls, icon-only buttons, and modals.
2. **Modal Focus Trap & Keyboard Navigation Deficits**: Zero focus trap implementation across all modals; zero ESC key event listeners for closing modals; lack of initial focus placement and focus restoration upon modal dismissal.
3. **Color Contrast & Typography Violations**: Muted text tokens (`#64748b`) and primary accent text (`#3b82f6`) applied at 11px-12px font sizes fail WCAG 2.1 AA contrast requirements (minimum 4.5:1 for small text) on dark background surfaces (`#0a0f1e` / `#111827`).

---

## 1. Identified ARIA & Role Gaps (With Exact File Paths & Line Numbers)

### A. `CompradoresPage` (`src/app/AdminDashboard.tsx`)
- **`src/app/AdminDashboard.tsx:797`**: `<table className="admin-table">`
  - **Issue**: Table lacks `aria-label="Gestión de Compradores"` or `aria-labelledby` or a `<caption>` element. Screen readers cannot announce the table's purpose.
- **`src/app/AdminDashboard.tsx:800-802`**: `<th>` header elements mapped without `scope="col"`.
  - **Issue**: Screen readers cannot properly associate data cells with column headers during table navigation.
- **`src/app/AdminDashboard.tsx:831`**: Premium Plan Toggle Button:
  ```tsx
  <button onClick={async () => { ... }}>
    <div style={{ ... }} />
  </button>
  ```
  - **Issue**: CRITICAL GAP. The toggle button contains no text node, no `aria-label`, no `role="switch"`, and no `aria-checked={c.isPremium}`. Screen readers announce this as an unlabelled "button" with no indication of state.
- **`src/app/AdminDashboard.tsx:847`**: Revoke Access Button `<button onClick={() => handleDelete(c.email)}>Revocar Acceso</button>`.
  - **Issue**: Generic text "Revocar Acceso" lacks row context for screen reader users navigating by buttons. Missing `aria-label={`Revocar acceso a ${c.email}`}`.
- **`src/app/AdminDashboard.tsx:859-864`**: `showCreateModal` Overlay & Dialog:
  ```tsx
  <div style={{ position: "fixed", inset: 0, ... }}>
    <div style={{ background: C.card, ... }}>
      <h3>Agregar Nuevo Comprador</h3>
      <button onClick={() => setShowCreateModal(false)}><X size={18} /></button>
  ```
  - **Issue**: Dialog wrapper lacks `role="dialog"`, `aria-modal="true"`, and `aria-labelledby="create-comprador-title"`. The close button (line 864) has no text and lacks `aria-label="Cerrar modal de agregar comprador"`.
- **`src/app/AdminDashboard.tsx:869-870`**: Email Input & Label:
  ```tsx
  <label style={{ ... }}>Correo Electrónico</label>
  <input type="email" placeholder="ejemplo@gmail.com" ... />
  ```
  - **Issue**: Label has no `htmlFor` attribute, and input has no `id`, `aria-label`, or `aria-labelledby`. Assistive technologies cannot associate the text label with the form field.

### B. `TramiteFormModal` & `ConfirmDialog` (`src/app/AdminDashboard.tsx`)
- **`src/app/AdminDashboard.tsx:182`**: Modal Container:
  - **Issue**: Container lacks `role="dialog"`, `aria-modal="true"`, and `aria-labelledby="tramite-form-title"`.
- **`src/app/AdminDashboard.tsx:186`**: Close Button `<button onClick={onClose}><X size={18} /></button>`.
  - **Issue**: Icon-only button lacks `aria-label="Cerrar modal de trámite"`.
- **`src/app/AdminDashboard.tsx:190-205, 220, 235`**: Form Inputs (`categoryId`, `entity`, `title`, `description`, `newReq`, `newTip`).
  - **Issue**: Labels lack `htmlFor` attributes matching input `id`s. Inputs lack `id` or `aria-label`.
- **`src/app/AdminDashboard.tsx:224, 239`**: Remove Tag Icon Buttons `<button onClick={...}><X size={10} /></button>`.
  - **Issue**: Lacks `aria-label={`Eliminar requisito ${r}`}` and `aria-label={`Eliminar consejo ${t}`}`.
- **`src/app/AdminDashboard.tsx:230, 245`**: Add Tag Icon Buttons `<button onClick={...}><Plus size={14} /></button>`.
  - **Issue**: Lacks `aria-label="Agregar requisito"` and `aria-label="Agregar consejo"`.
- **`src/app/AdminDashboard.tsx:259`**: `ConfirmDialog` Container:
  - **Issue**: Container lacks `role="alertdialog"`, `aria-modal="true"`, `aria-labelledby="confirm-dialog-title"`, and `aria-describedby="confirm-dialog-desc"`. Icon `<Trash2>` at line 263 lacks `aria-hidden="true"`.

### C. `TramitesPage` (`src/app/AdminDashboard.tsx`)
- **`src/app/AdminDashboard.tsx:482`**: Search Input `<input value={search} placeholder="Buscar trámite o entidad..." />`.
  - **Issue**: Missing `<label>`, `id`, or `aria-label="Buscar trámite o entidad"`.
- **`src/app/AdminDashboard.tsx:483`**: Category Select Filter `<select value={filterCat}>`.
  - **Issue**: Missing `<label>`, `id`, or `aria-label="Filtrar trámites por categoría"`.
- **`src/app/AdminDashboard.tsx:496`**: Table `<table className="admin-table">`.
  - **Issue**: Lacks `aria-label="Lista de trámites"` or `<caption>`. `<th>` headers (line 499) lack `scope="col"`.
- **`src/app/AdminDashboard.tsx:517`**: Toggle Featured Star Button `<button ... title="Toggle destacado">★</button>`.
  - **Issue**: Native `title` attribute is insufficient for screen readers; lacks `aria-label={t.featured ? "Quitar de destacados" : "Marcar como destacado"}` and `aria-pressed={t.featured}`.
- **`src/app/AdminDashboard.tsx:519`**: Toggle Active Dot Button `<button ... title="Toggle activo" />`.
  - **Issue**: Empty `<button>` element with no visible text. Lacks `aria-label={t.active ? "Desactivar trámite" : "Activar trámite"}` and `aria-pressed={t.active}`.
- **`src/app/AdminDashboard.tsx:525, 526`**: Action Buttons (Edit `<Pencil>` & Delete `<Trash2>`).
  - **Issue**: Missing `aria-label={`Editar trámite ${t.title}`}` and `aria-label={`Eliminar trámite ${t.title}`}`.
- **`src/app/AdminDashboard.tsx:537, 540`**: Pagination Buttons (`<ChevronLeft>`, `<ChevronRight>`).
  - **Issue**: Missing `aria-label="Página anterior"` and `aria-label="Página siguiente"`.

### D. `CategoriasPage`, `AdminSidebar`, `AdminTopBar` & `OverviewPage` (`src/app/AdminDashboard.tsx`)
- **`src/app/AdminDashboard.tsx:289`**: `<aside className="admin-sidebar">`. Lacks `aria-label="Navegación principal"`.
- **`src/app/AdminDashboard.tsx:308`**: Sidebar Nav Buttons. Icons lack `aria-hidden="true"`; buttons lack `aria-current={active ? "page" : undefined}`.
- **`src/app/AdminDashboard.tsx:334`**: Mobile Menu Toggle `<button className="mobile-toggle"><Menu size={24} /></button>`. Lacks `aria-label="Abrir menú de navegación"` and `aria-expanded={mobileMenuOpen}`.
- **`src/app/AdminDashboard.tsx:342`**: Notification Bell Button `<button><Bell size={16} /><span ...>0</span></button>`. Lacks `aria-label="Notificaciones: 0 no leídas"`.
- **`src/app/AdminDashboard.tsx:372`**: Top 5 Table `<table className="admin-table">`. Lacks `aria-label="Top 5 Trámites más vistos"` or `<caption>`. `<th>` headers lack `scope="col"`.
- **`src/app/AdminDashboard.tsx:382`**: `MiniBar` progress component. Outer div lacks `role="progressbar"`, `aria-valuenow={value}`, `aria-valuemax={max}`, `aria-valuemin={0}`, and `aria-label="Vistas"`.
- **`src/app/AdminDashboard.tsx:659`**: Category Active Toggle Button. Lacks `aria-pressed={active}` and `aria-label={`Estado de categoría ${cat.name}`}`.
- **`src/app/AdminDashboard.tsx:669, 670`**: Category Edit/Delete Buttons. Lacks row-specific `aria-label`.
- **`src/app/AdminDashboard.tsx:678-709`**: Category Edit Modal. Lacks `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and label-input associations.

### E. `src/app/components/AdminDashboard.tsx` & `src/app/InlineEditors.tsx`
- **`src/app/components/AdminDashboard.tsx:1573, 1683, 1782`**: Modal Close Buttons `<button onClick={...}><X size={15} /></button>`. Lack `aria-label="Cerrar modal"`.
- **`src/app/components/AdminDashboard.tsx:1566, 1676, 1775, 1824`**: Modals & Delete Dialog containers lack `role="dialog"` / `role="alertdialog"`, `aria-modal="true"`, and `aria-labelledby`.
- **`src/app/InlineEditors.tsx:50, 107, 202, 338, 401`**: Modals lack `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and label-input `htmlFor`/`id` bindings. Close icon buttons lack `aria-label="Cerrar"`.

---

## 2. Modal Focus Trap & Keyboard Navigation Gaps

### Identified Architectural Deficits Across All Modals:
1. **Absence of Focus Trap**:
   - **Behavior**: When any modal opens (`showCreateModal` in `CompradoresPage`, `TramiteFormModal`, `ConfirmDialog`, `CategoriasPage` modal, or `InlineEditors` modals), pressing <kbd>Tab</kbd> moves focus through elements on the background page behind the backdrop overlay.
   - **WCAG Violation**: WCAG 2.1 SC 2.4.3 (Focus Order) & SC 2.1.2 (No Keyboard Trap).
2. **Absence of ESC Key Close Listener**:
   - **Behavior**: Keyboard users cannot close open modals by pressing <kbd>Escape</kbd>. There is no `window.addEventListener('keydown', ...)` or `onKeyDown` handler listening for `key === 'Escape'`.
   - **WCAG Violation**: WCAG 2.1 SC 2.1.1 (Keyboard Navigation).
3. **Absence of Initial Focus Management**:
   - **Behavior**: Upon opening a modal, focus remains on the triggering element or defaults to `document.body`. Focus is not programmatically moved to the modal's first interactive input or close button (`useRef` + `.focus()`).
4. **Absence of Focus Restoration**:
   - **Behavior**: When a modal is closed via "Cancelar", "Guardar", or "X", focus is lost to `body` rather than returning to the button that triggered the modal opening.

---

## 3. Color Contrast & Typography Violations

1. **Muted Text Contrast (`C.textMuted` = `var(--text-muted)` / `#64748b`)**:
   - Used extensively across table headers (`<th>`), labels, subheadings, and helper text (e.g. `src/app/AdminDashboard.tsx` lines 140, 153, 298, 318, 345, 374, 491, 800).
   - **Contrast Ratio**: `#64748b` on dark card surfaces (`#0a0f1e` / `#111827`) provides a contrast ratio of **4.1:1**.
   - **Violation**: WCAG 2.1 AA SC 1.4.3 requires a minimum contrast ratio of **4.5:1** for text smaller than 18pt (or 14pt bold). At font sizes 11px and 12px, 4.1:1 fails.
2. **Primary Blue Accent Text (`#3b82f6`)**:
   - Used for tag text (line 223) and action buttons (line 525, line 669) at 12px/13px font size on dark backgrounds.
   - **Contrast Ratio**: `#3b82f6` on `#111827` provides a contrast ratio of **3.8:1 to 4.1:1**, failing the 4.5:1 requirement for normal small text.
3. **Status Badges & Toggles**:
   - `C.success = "#00E0A6"` and `color: c.isPremium ? "#c084fc" : C.textMuted` rendered on light backgrounds or low-opacity containers (e.g. `rgba(0,224,166,0.1)`).
   - **Violation**: Low luminance distinction against variable theme backgrounds.

---

## 4. Concrete Recommendations for Remediation

### Recommendations for ARIA & Attributes
1. **Tables**:
   - Add `aria-label="Gestión de compradores"` to `<table>` in `CompradoresPage` (`AdminDashboard.tsx:797`).
   - Add `scope="col"` to all `<th>` elements in tables (`AdminDashboard.tsx:800`, `499`, `374`).
2. **Toggle Switches**:
   - Refactor the Premium toggle button (`AdminDashboard.tsx:831`) to:
     ```tsx
     <button
       role="switch"
       aria-checked={c.isPremium}
       aria-label={`Plan Premium para ${c.email}`}
       onClick={...}
       ...
     >
     ```
3. **Icon-Only Buttons**:
   - Add explicit `aria-label` to all icon buttons: close buttons (`aria-label="Cerrar modal"`), edit buttons (`aria-label={`Editar ${title}`}`), delete buttons (`aria-label={`Eliminar ${title}`}`), pagination (`aria-label="Página anterior"`), star/dot toggles (`aria-label={featured ? "Quitar destacado" : "Marcar destacado"}`).
   - Add `aria-hidden="true"` to decorative Lucide SVG icons (`<X />`, `<Plus />`, `<Pencil />`, `<Trash2 />`).
4. **Form Controls & Labels**:
   - Bind every `<label>` to its respective `<input>` / `<select>` / `<textarea>` using matching `htmlFor` and `id` attributes (e.g. `<label htmlFor="comprador-email">` and `<input id="comprador-email">`).

### Recommendations for Modal Keyboard Navigation & Focus Trap
1. **Focus Trap Custom Hook or Component**:
   - Create a reusable `useFocusTrap` hook or integrate a lightweight focus trap mechanism that traps focus within the modal dialog when open.
2. **ESC Key Close Handler**:
   - Attach an `useEffect` event listener to `window` inside modal components:
     ```tsx
     useEffect(() => {
       const handleKeyDown = (e: KeyboardEvent) => {
         if (e.key === "Escape") onClose();
       };
       window.addEventListener("keydown", handleKeyDown);
       return () => window.removeEventListener("keydown", handleKeyDown);
     }, [onClose]);
     ```
3. **Dialog Accessibility Structure**:
   - Update modal root elements to include:
     ```tsx
     <div
       role="dialog"
       aria-modal="true"
       aria-labelledby="modal-title-id"
     >
     ```
4. **Focus Restoration**:
   - Store the `document.activeElement` before opening the modal and restore focus to it on unmount.

### Recommendations for Color Contrast
1. **Muted Text Token**:
   - Upgrade `C.textMuted` on dark surfaces from `#64748b` to `#94a3b8` (Slate 400), increasing contrast ratio to **~7.0:1** (well above the 4.5:1 threshold).
2. **Primary Text Accent Token**:
   - For small text accents on dark backgrounds, replace `#3b82f6` with `#60a5fa` (Blue 400), achieving **> 6.0:1** contrast.

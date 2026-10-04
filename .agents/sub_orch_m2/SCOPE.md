# Scope: M2_Accessibility_ARIA

## Objective
Implement deep technical accessibility (WCAG 2.1 AA compliance) in `src/app/AdminDashboard.tsx` with focus on `CompradoresPage`, modals, tables, focus trap, ESC listener, and color contrast remediation.

## Feature Inventory Assignment
| # | Feature | Description | Scope |
|---|---------|-------------|-------|
| 5 | ARIA Labels & Roles | Add `role="dialog"`, `role="switch"`, `scope="col"`, `aria-modal`, `aria-labelledby`, and `aria-label` to buttons, tables, switches, and inputs | M2_Accessibility_ARIA |
| 6 | Keyboard Navigation & Focus Trap | Implement focus trap inside modals, autofocus initial elements, restore focus on unmount, and add `ESC` key press handler | M2_Accessibility_ARIA |
| 7 | Color Contrast Remediation | Update muted text (`#64748b` -> `#94a3b8`) and primary accent text (`#3b82f6` -> `#60a5fa`) for small text on dark backgrounds | M2_Accessibility_ARIA |

## Technical Directives

### 1. ARIA Roles & Attributes (`src/app/AdminDashboard.tsx`)
- **Compradores Table**:
  - `<table>`: Add `aria-label="Lista de compradores y accesos"`.
  - `<th>` elements: Add `scope="col"` to all table header cells.
- **Premium Toggle Switch**:
  - Add `role="switch"`, `aria-checked={c.isPremium}`, and `aria-label={`Asignar plan premium a ${c.email}`}`.
- **Revoke Access Button**:
  - Add `aria-label={`Revocar acceso a ${c.email}`}`.
- **Create Comprador Modal**:
  - Dialog container: Add `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title-comprador"`.
  - Modal title (`<h3>`): Add `id="modal-title-comprador"`.
  - Close icon button (`<X>`): Add `aria-label="Cerrar modal"`.
- **Form Binding**:
  - Label: Add `htmlFor="comprador-email-input"`.
  - Input: Add `id="comprador-email-input"`.
- **Search & Filters**:
  - Search input: Add `aria-label="Buscar comprador por email"`.
  - Role select filter: Add `aria-label="Filtrar por rol"`.
  - Plan select filter: Add `aria-label="Filtrar por plan"`.
- **Icon Buttons**:
  - Add discernible `aria-label` to all icon buttons across modals and tables in `AdminDashboard.tsx`.

### 2. Modal Focus Trap & Keyboard Navigation
- Implement focus trap inside modals trapping <kbd>Tab</kbd> key cycle between first and last focusable element.
- Implement <kbd>Escape</kbd> key event listener on window/modal to dismiss active modals on ESC key press.
- Auto-focus initial input on modal open, restore focus on modal unmount.

### 3. Color Contrast Remediation
- Update muted text color token from `#64748b` to `#94a3b8`.
- Update primary text token from `#3b82f6` to `#60a5fa` for small text elements on dark backgrounds (`#111827`) to guarantee > 4.5:1 WCAG AA contrast ratio.

### 4. Build & Type Safety
- Worker MUST execute `npx tsc --noEmit` and `npm run build` from `d:\proyecto_abril\portal-tramites` and document 0 errors in handoff report.

## Verification Gate Criteria
1. `npx tsc --noEmit` and `npm run build` pass with 0 errors.
2. 2 Reviewers approve (`teamwork_preview_reviewer`).
3. 2 Challengers confirm empirical verification (`teamwork_preview_challenger`).
4. 1 Forensic Auditor (`teamwork_preview_auditor`) returns CLEAN verdict.

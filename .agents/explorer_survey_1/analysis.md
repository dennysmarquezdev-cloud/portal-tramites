# Survey Analysis: Admin Dashboard & `CompradoresPage` Visual & Technical Audit

**Author**: Explorer 1 (`teamwork_preview_explorer`)  
**Date**: 2026-08-06  
**Target Codebase**: `d:\proyecto_abril\portal-tramites`  
**Primary File Inspected**: `d:\proyecto_abril\portal-tramites\src\app\AdminDashboard.tsx`

---

## 1. Executive Summary

During the survey phase investigation, we performed a thorough visual layout, responsive design, alignment, padding, margin, container max-width, header/toolbar, and accessibility audit of `CompradoresPage` (Usuarios / Clientes tab) in comparison with `OverviewPage` (Resumen tab), `TramitesPage` (Trámites tab), and `CategoriasPage` (Categorías tab) within the Admin Dashboard.

### Primary Findings
1. **Container Alignment Decoupling**: `CompradoresPage` artificially constrains its outer container width to `maxWidth: 900`, whereas `OverviewPage`, `TramitesPage`, and `CategoriasPage` fill 100% of the available width fluidly. On desktop viewports (1440px+), switching to `CompradoresPage` results in an abrupt visual shrink and horizontal misalignment.
2. **Table Density & Spacing Inconsistency**: Table cells (`th` and `td`) in `CompradoresPage` use `14px 16px` padding (yielding ~48px row height) compared to compact `9px 10px` padding (yielding ~36px row height) in `TramitesPage`. Table container uses `borderRadius: 12` in `CompradoresPage` vs `borderRadius: 10` in `TramitesPage` and `OverviewPage`.
3. **Header & Toolbar Discrepancies**: Header title size is `20px` in `CompradoresPage` vs `18px` in `CategoriasPage`. Header margin is `24px` vs `20px`/`14px`. Button padding is `10px 16px` vs `8px 16px`. `CompradoresPage` lacks search input and role/plan filter dropdowns.
4. **Non-Standardized Badges**: `CompradoresPage` uses custom inline `<span>` styling with `borderRadius: 6` and `padding: "3px 8px"` for roles instead of the shared `<Badge>` component (`borderRadius: 4`, `padding: "1px 7px"`).
5. **Modal Overlay & Styling Discrepancies**: `CompradoresPage` create modal backdrop uses opaque `var(--colorNeutralBackground1)` covering the dashboard rather than a semi-transparent dark backdrop overlay (`rgba(0,0,0,0.6)` with backdrop blur). Modal container has `borderRadius: 16` (vs `12px`), and form inputs use `borderRadius: 8`, `padding: "10px 14px"` (vs `borderRadius: 6`, `padding: "7px 10px"`).
6. **Technical Accessibility (R2) Deficiencies**:
   - Modal lacks `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and ESC key handling.
   - Close icon button `<X>` lacks `aria-label`.
   - Form email input label lacks `htmlFor` linkage to input `id`.
   - Premium switch `<button>` lacks `role="switch"`, `aria-checked`, and `aria-label`.
   - Row delete button text "Revocar Acceso" lacks user-specific `aria-label={`Revocar acceso a ${c.email}`}`.

---

## 2. File Location Catalog

| Component / Module | File Path | Line Range | Description |
|---|---|---|---|
| **App Entry Point** | `src/app/App.tsx` | Line 21 | Dynamically loads `./AdminDashboard` via React lazy |
| **Admin Dashboard Main Layout** | `src/app/AdminDashboard.tsx` | Lines 899–1015 | Root layout containing sidebar, topbar, theme definitions, and page routing |
| **Admin Sidebar** | `src/app/AdminDashboard.tsx` | Lines 277–327 | Left navigation sidebar with tab selectors |
| **Admin TopBar** | `src/app/AdminDashboard.tsx` | Lines 330–350 | Header toolbar with online indicator, notifications, and clock |
| **OverviewPage** | `src/app/AdminDashboard.tsx` | Lines 353–390 | Resumen tab (KPI cards & Top 5 procedures table) |
| **TramitesPage** | `src/app/AdminDashboard.tsx` | Lines 393–551 | Trámites tab (Filter toolbar, sticky table, pagination, modals) |
| **CategoriasPage** | `src/app/AdminDashboard.tsx` | Lines 555–712 | Categorías tab (Grid of category cards, create/edit modal) |
| **CompradoresPage** | `src/app/AdminDashboard.tsx` | Lines 723–896 | **Target Component**: Usuarios / Clientes tab |
| **TramiteFormModal** | `src/app/AdminDashboard.tsx` | Lines 159–255 | Modal for creating/editing procedures |
| **ConfirmDialog** | `src/app/AdminDashboard.tsx` | Lines 258–275 | Confirmation dialog for deletion |
| **Global Theme CSS** | `src/styles/theme.css` | Lines 1–509 | CSS tokens (`--background`, `--card`, `--card-bg`, `--card-item-bg`, `--border`, `--primary`) |

---

## 3. Comprehensive Comparison Matrix

| Visual / Structural Property | `OverviewPage` | `TramitesPage` | `CategoriasPage` | `CompradoresPage` (Current) | Variance / Status |
|---|---|---|---|---|---|
| **Outer Container** | `<div className="admin-main-padding" style={{ padding: 28 }}>` | `<div className="admin-main-padding" style={{ padding: 28 }}>` | `<div className="admin-main-padding" style={{ padding: 28 }}>` | `<div className="admin-main-padding" style={{ padding: 28, maxWidth: 900 }}>` | **MISALIGNED**: `maxWidth: 900` restricts width artificially. |
| **Max-Width Constraint** | None (Fluid 100%) | None (Fluid 100%) | None (Fluid 100%) | `maxWidth: 900` | **BREAK**: Causes jarring visual size shift between tabs. |
| **Header Title Size** | N/A | N/A (Toolbar filters) | `fontSize: 18, fontWeight: 700` | `fontSize: 20, fontWeight: 700` | **INCONSISTENT**: 20px vs 18px. |
| **Header Margin Bottom** | N/A | `marginBottom: 14` | `marginBottom: 20` | `marginBottom: 24` | **INCONSISTENT**: 24px vs 20px / 14px. |
| **Search & Filter Controls** | None | Search input (`width: 260`, padding `8px 12px`, border radius `6`) + Category dropdown | None | **None** | **MISSING**: Lacks search bar and filter controls. |
| **Action Button Padding** | N/A | `padding: "8px 16px"` | `padding: "8px 16px"` | `padding: "10px 16px"` | **INCONSISTENT**: 10px vertical vs 8px vertical. |
| **Action Button Radius** | N/A | `borderRadius: 6` | `borderRadius: 8` | `borderRadius: 8` | **INCONSISTENT**: 8px vs 6px. |
| **Table Container Radius** | `borderRadius: 10` | `borderRadius: 10` | N/A | `borderRadius: 12` | **INCONSISTENT**: 12px vs 10px. |
| **Table Header Sticky** | No | Yes (`position: "sticky", top: 0, zIndex: 1`) | N/A | **No** | **MISSING**: Header scrolls out of view on long lists. |
| **Table Header Padding** | `padding: "6px 10px"` | `padding: "9px 10px"` | N/A | `padding: "14px 16px"` | **INCONSISTENT**: Bloated 14px vs compact 9px. |
| **Table Header Font Size** | `11px` | `11px` | N/A | `12px` | **INCONSISTENT**: 12px vs 11px. |
| **Table Data Padding** | `padding: "10px 10px"` | `padding: "9px 10px"` | N/A | `padding: "14px 16px"` | **INCONSISTENT**: Row height ~48px vs ~36px. |
| **Table Row Hover Effect** | None | `background: "rgba(59,130,246,.04)"` | N/A | **None** | **MISSING**: No hover feedback. |
| **Badge Component** | Shared `<Badge>` (`borderRadius: 4`, `padding: "1px 7px"`) | Shared `<Badge>` | Shared `<Badge>` | Custom inline `<span>` (`borderRadius: 6`, `padding: "3px 8px"`) | **NON-STANDARD**: Does not use shared `<Badge>`. |
| **Switch Toggle Control** | N/A | Active dot button / Star toggle | Status text badge | Custom pill switch (`width: 36, height: 20, borderRadius: 20`) | Custom element; needs ARIA `role="switch"`. |
| **Row Action Buttons** | N/A | Icon buttons inside small badges (`padding: "4px 8px"`) | Text buttons with icons | Text button "Revocar Acceso" (`padding: "6px 10px"`) | Lacks individual `aria-label`. |
| **Modal Overlay Backdrop** | Solid `var(--colorNeutralBackground1)` | Solid `var(--colorNeutralBackground1)` | Solid `var(--colorNeutralBackground1)` | Solid `var(--colorNeutralBackground1)` | All modals use solid opaque background instead of semi-transparent overlay backdrop. |
| **Modal Container Radius** | N/A | `borderRadius: 12` | `borderRadius: 12` | `borderRadius: 16` | **INCONSISTENT**: 16px vs 12px. |
| **Modal Input Styling** | N/A | `background: "var(--colorNeutralBackground1)"`, `borderRadius: 6`, `padding: "7px 10px"` | `background: "var(--colorNeutralBackground1)"`, `borderRadius: 6`, `padding: "8px 10px"` | `background: "var(--colorNeutralBackgroundHover)"`, `borderRadius: 8`, `padding: "10px 14px"` | **INCONSISTENT**: 8px radius & 10px padding vs 6px radius & 7/8px padding. |
| **Pagination** | N/A | Yes (15 per page) | N/A | **None** | **MISSING**: Table displays all records without paging. |

---

## 4. Accessibility (R2) Vulnerability Audit of `CompradoresPage`

1. **Modal Overlay ARIA & Keyboard Trap**:
   - `showCreateModal` renders a modal overlay (`<div style={{ position: "fixed", inset: 0, ... }}>`) without `role="dialog"`, `aria-modal="true"`, or `aria-labelledby="create-comprador-title"`.
   - Pressing the `Escape` key does not close the modal.
   - Tab focus is not trapped inside the modal, allowing focus to escape into background elements.

2. **Modal Close Button**:
   - `<button onClick={() => setShowCreateModal(false)}><X size={18} /></button>` lacks `aria-label="Cerrar modal"`. Screen readers announce only "button".

3. **Form Labels & Inputs**:
   - `<label style={{ ... }}>Correo Electrónico</label>` is not linked via `htmlFor` to the `<input type="email">`.
   - Input lacks `id="comprador-email"`.

4. **Premium Plan Switch**:
   - Premium toggle `<button>` has no `role="switch"`, no `aria-checked={c.isPremium}`, and no `aria-label`.

5. **Row Action Buttons**:
   - "Revocar Acceso" button lacks `aria-label={`Revocar acceso a ${c.email}`}`.

---

## 5. Specific Recommendations for Implementers

To standardize `CompradoresPage` and resolve all identified decoupling and accessibility issues:

1. **Container Width**: Remove `maxWidth: 900` from `<div className="admin-main-padding" style={{ padding: 28 }}>`.
2. **Toolbar & Header**:
   - Add Search input (`value={search}`, `placeholder="Buscar por email..."`, `width: 260`, padding `8px 12px`, borderRadius `6`).
   - Add Select dropdown for role filter (`all`, `admin`, `client`).
   - Add Select dropdown for plan filter (`all`, `premium`, `gratis`).
   - Update header button padding to `8px 16px`, borderRadius to `6px`, matching `TramitesPage`.
   - Add counter text row below toolbar (`{filtered.length} compradores · {admins.length} administradores · {premium.length} premium`).
3. **Table Styling**:
   - Change container `borderRadius` from `12px` to `10px`.
   - Make table header sticky (`position: "sticky", top: 0, background: C.card, zIndex: 1`).
   - Change header padding to `9px 10px` and font size to `11px`.
   - Change data cell padding to `9px 10px` and font size to `12px`.
   - Add row hover effect (`background: "rgba(59,130,246,.04)"`).
   - Add email truncation with `title` for long strings.
4. **Badges & Switches**:
   - Use standard `<Badge color={c.esAdmin ? C.danger : C.success}>{c.esAdmin ? "Administrador" : "Cliente"}</Badge>`.
   - Add `role="switch"`, `aria-checked={c.isPremium}`, and `aria-label={`Plan premium para ${c.email}`}` to the toggle button.
5. **Modal Overhauls**:
   - Change backdrop overlay to `background: "rgba(0, 0, 0, 0.6)"` with `backdropFilter: "blur(4px)"`.
   - Set container `borderRadius: 12`.
   - Add `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-comprador-title"`.
   - Add `id="modal-comprador-title"` to `<h3>Agregar Nuevo Comprador</h3>`.
   - Add `aria-label="Cerrar modal"` to the close `<button>`.
   - Link `<label htmlFor="email-input">` to `<input id="email-input">`.
   - Implement `keydown` event listener for `Escape` key to close the modal.
6. **Pagination**:
   - Add pagination (`PAGE_SIZE = 15`) with `ChevronLeft` and `ChevronRight` buttons, consistent with `TramitesPage`.

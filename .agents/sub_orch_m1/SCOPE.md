# Scope: Milestone 1 - M1_Layout_Refactor

## Architecture
- Target file: `src/app/AdminDashboard.tsx` (specifically `CompradoresPage` component, table elements, header toolbar, badges, modal container & inputs).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Container & Layout Alignment | Remove `maxWidth: 900` constraint on `CompradoresPage`, align padding & margins with `OverviewPage` & `TramitesPage` | M1_Layout_Refactor | R1 |
| 2 | Table Styling & Responsiveness | Standardize table cell padding (`9px 10px`), container border radius (`10px`), sticky header, and hover states | M1_Layout_Refactor | R1 |
| 3 | Shared Components & Badges | Replace inline role badge styling with shared `<Badge>` component; unify modal overlay backdrop (`rgba(0,0,0,0.6)` with blur `blur(4px)`), container radius `12px`, input radius `6px` | M1_Layout_Refactor | R1 |
| 4 | Header & Search Toolbar | Standardize header bar, responsive flex wrapping (`admin-flex-wrap`), search input, and role/plan filter controls | M1_Layout_Refactor | R1 |

## Refactoring Requirements & Specifications
1. **Container Width**:
   - `src/app/AdminDashboard.tsx` line 785: Remove `maxWidth: 900` from `<div className="admin-main-padding" style={{ padding: 28, maxWidth: 900 }}>` so it matches fluid layout of `OverviewPage` and `TramitesPage`.
2. **Table Styling**:
   - Change table container border radius from `12px` to `10px`.
   - Change table header (`th`) and cell (`td`) padding from `14px 16px` to `9px 10px`.
   - Make table header `<thead style={{ position: "sticky", top: 0, background: C.card, zIndex: 1 }}>` sticky.
3. **Role Badges**:
   - Replace custom inline `<span>` role badges (lines 825-827) with the shared `<Badge color={...}>{...}</Badge>` component (`color={c.esAdmin ? C.danger : C.success}`).
4. **Modal Overlay & Input Styling**:
   - Update Create Comprador Modal overlay background from opaque `var(--colorNeutralBackground1)` to translucent dark backdrop `rgba(0,0,0,0.6)` with `backdropFilter: "blur(4px)"`.
   - Change modal container border radius from `16px` to `12px`.
   - Change modal input border radius from `8px` to `6px`.
5. **Header Bar & Filter Toolbar**:
   - Standardize header bar with responsive flex wrapping class `admin-flex-wrap`.
   - Add search input field and role/plan filter buttons to allow filtering buyers by search term or role/plan status.
6. **Type Safety & Build Verification**:
   - Must run `npx tsc --noEmit` and `npm run build` and verify 0 errors / clean build.

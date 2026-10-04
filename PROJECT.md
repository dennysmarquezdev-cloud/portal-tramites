# Project: Admin Dashboard Compradores Refactoring & Accessibility

## Architecture
- Target file: `src/app/AdminDashboard.tsx` (specifically `CompradoresPage` component, modal components, table components, header/toolbar controls, and theme constants).
- Secondary components: `src/app/App.tsx` (lazy loader entry point), shared styles, and accessibility helper hooks/utilities.
- Automated Test Suite & Auditing: `scripts/verify-a11y.cjs` Node/DOM automated test runner utilizing axe-core / JSDOM checks.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Container & Layout Alignment | Remove `maxWidth: 900` constraint on `CompradoresPage`, align padding & margins with `OverviewPage` & `TramitesPage` | M1_Layout_Refactor | R1 |
| 2 | Table Styling & Responsiveness | Standardize table cell padding (`9px 10px`), container border radius (`10px`), sticky header, and hover states | M1_Layout_Refactor | R1 |
| 3 | Shared Components & Badges | Replace inline role badge styling with shared `<Badge>` component; unify modal overlay backdrop (`rgba(0,0,0,0.6)` with blur) | M1_Layout_Refactor | R1 |
| 4 | Header & Search Toolbar | Standardize header bar, responsive flex wrapping (`admin-flex-wrap`), search input, and role/plan filter controls | M1_Layout_Refactor | R1 |
| 5 | ARIA Labels & Roles | Add `role="dialog"`, `role="switch"`, `scope="col"`, `aria-modal`, `aria-labelledby`, and `aria-label` to buttons, tables, switches, and inputs | M2_Accessibility_ARIA | R2 |
| 6 | Keyboard Navigation & Focus Trap | Implement focus trap inside modals, autofocus initial elements, restore focus on unmount, and add `ESC` key press handler | M2_Accessibility_ARIA | R2 |
| 7 | Color Contrast Remediation | Update muted text (`#64748b` -> `#94a3b8`) and primary accent text (`#3b82f6` -> `#60a5fa`) for small text on dark backgrounds | M2_Accessibility_ARIA | R2 |
| 8 | Automated Accessibility Test Harness | Create `scripts/verify-a11y.cjs` using DOM/axe-core checks for color contrast, ARIA labels, focus trap, and ESC key handling | M3_Final_Verification_E2E | Acceptance Criteria |
| 9 | Manual Judge Verification | Verify visual alignment, paddings, margins, max-width consistency across `CompradoresPage`, `OverviewPage`, `TramitesPage` | M3_Final_Verification_E2E | Acceptance Criteria |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1_Layout_Refactor | Refactor `CompradoresPage` container width, table padding, shared Badges, modal overlay, responsive toolbar | none | DONE |
| 2 | M2_Accessibility_ARIA | Implement ARIA roles/labels, switch roles, label-input bindings, focus trap, ESC listener, contrast fix | M1_Layout_Refactor | DONE |
| 3 | M3_Final_Verification_E2E | Automated test suite execution (axe-core/DOM script), build verification, type check, Manual Judge verification | M2_Accessibility_ARIA | DONE |

## Interface Contracts
### `CompradoresPage` ↔ `AdminDashboard`
- Props: `compradores: Comprador[]`, `cargandoCompradores: boolean`, `setCompradores: React.Dispatch<React.SetStateAction<Comprador[]>>`
- Shared Theme Object `C`: `C.card`, `C.cardBorder`, `C.textPrimary`, `C.textMuted` (contrast updated to `#94a3b8`), `C.primary` (contrast updated to `#60a5fa`).
- Accessibility Modal State & Handlers: Modal containers attach `role="dialog"`, `aria-modal="true"`, `aria-labelledby="title-id"`, traps keyboard tab navigation, and responds to window `KeyDown` event for key `'Escape'`.

## Code Layout
- `src/app/AdminDashboard.tsx`: Primary Admin Dashboard layout, `CompradoresPage`, `OverviewPage`, `TramitesPage`, modals, shared Badges, and theme constants.
- `scripts/verify-a11y.cjs`: Automated accessibility verification runner script for axe-core / DOM checks.

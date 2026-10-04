# E2E Test Infra: Portal Tramites Accessibility & Responsive Testing

## Test Philosophy
- Automated static & structural DOM/AST inspection + programmatic accessibility check (`scripts/verify-a11y.cjs`).
- Requirement-driven from `ORIGINAL_REQUEST.md` (Acceptance Criteria & Requirements R1 & R2).

## Feature Inventory & Test Matrix
| Tier | Description | Specific Test Checks | Target Component |
|------|-------------|----------------------|------------------|
| 1 | Feature Coverage | `maxWidth` constraint removal on `CompradoresPage`, `aria-label` / `aria-labelledby` on buttons, inputs, switches, tables | `src/app/AdminDashboard.tsx` (`CompradoresPage`) |
| 2 | Boundary & Corner Cases | Modal ARIA attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`), focus trap logic, ESC key handler | `src/app/AdminDashboard.tsx` (Modals) |
| 3 | Cross-Feature Combinations | Color contrast standards compliance (`#64748b` -> `#94a3b8`, `#3b82f6` -> `#60a5fa`) on dark background | `src/app/AdminDashboard.tsx` (Theme & styles) |
| 4 | Real-World Application Scenarios | DOM node structure integrity & accessibility tree validity across `AdminDashboard.tsx` | `src/app/AdminDashboard.tsx` |

## Test Architecture
- Script: `scripts/verify-a11y.cjs`
- Command: `npm run test:a11y`
- Exit Code: 0 = PASS, 1 = FAIL

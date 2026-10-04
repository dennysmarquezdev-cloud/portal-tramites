# Detailed Technical Infrastructure & Accessibility Analysis — Portal Trámites

## Executive Summary
This report presents the findings of the infrastructure and test harness investigation conducted by Explorer 3 for `portal-tramites`. The primary focus is the survey of package dependencies, scripts, linting/type-checking mechanisms, existing test suite state, automated accessibility test execution strategies, and structural analysis of `CompradoresPage` in `AdminDashboard.tsx`.

---

## 1. Project Infrastructure & Tech Stack Overview

### Framework & Core Libraries
- **Build Tool**: Vite `^8.0.4` with `@vitejs/plugin-react` `^4.3.4`
- **Frontend Framework**: React `^18.3.1` (React DOM `^18.3.1`)
- **Language**: TypeScript `^5.6.3`
- **CSS Engine**: Tailwind CSS v4 (`@tailwindcss/vite` `^4.2.2`) with custom tokens in `src/styles/theme.css` and `src/styles/at-design-system.css`
- **UI Component Libraries**:
  - `@radix-ui/react-*` (dialog, accordion, avatar, dropdown-menu, select, tabs, tooltip, etc.)
  - `@fluentui/react-components` `^9.74.5`
  - `lucide-react` `^0.487.0` (Icons)
  - `motion` `^12.23.24` (Framer Motion animations)
  - `sonner` `^2.0.3` (Toast notifications)
  - `clsx` `^2.1.1` & `tailwind-merge` `^3.2.0` & `class-variance-authority` `^0.7.1`
- **Backend / Database**: Firebase JS SDK `^12.12.1` (Firestore & Authentication)

### Configuration Files Inspected
- `package.json`: Main project manifest and scripts.
- `vite.config.ts`: Configures `@vitejs/plugin-react`, `@tailwindcss/vite`, `@/` alias pointing to `./src`, asset inclusion (`svg`, `csv`).
- `tsconfig.json`: Target `ES2022`, module resolution `bundler`, `strict: true`, path alias `@/* -> ./src/*`.
- `postcss.config.mjs`: Empty file (`{}`).

---

## 2. Scripts and Commands Assessment

### Defined Scripts (`package.json`)
```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "deploy": "npm run build && firebase deploy --only hosting"
}
```

### Script Execution & Verification Findings
1. **Development Server**: `npm run dev` starts Vite server.
2. **Production Build**: `npm run build` runs `tsc` (TypeScript compiler) and `vite build`.
3. **Linting Setup**:
   - No `.eslintrc`, `eslint.config.js`, or `stylelint` config exists in project root.
   - Type verification and basic lint checks are performed by `tsc` via `tsconfig.json` (`strict: true`, `noFallthroughCasesInSwitch: true`).
4. **Test Harness & Test Scripts**:
   - **Current State**: 0 test scripts defined in `package.json`.
   - **Runner Installed**: Neither `vitest`, `jest`, `playwright`, `cypress`, nor `@testing-library/*` are present in `node_modules` or `package.json`.

---

## 3. Existing Test Suites & Test File Mapping

- **Unit / Integration Test Files**: 0 test files (`*.test.tsx`, `*.spec.ts`, etc.) found in `src/`.
- **Test Runner Commands**: None existing in current repository state.
- **Conclusion**: Test harness must be initialized or an automated verification runner script must be provided to fulfill acceptance criteria.

---

## 4. Automated Accessibility Testing Strategy (axe-core / DOM Checks)

The project requirement specifies automated verification of accessibility rules (axe-core / DOM checks):
1. **Critical Color Contrast**: Ensure foreground/background color ratios meet WCAG AA standards.
2. **Form Inputs & Icon Buttons**: Ensure `aria-label`, `aria-labelledby`, or explicit `<label htmlFor="...">` attributes on all interactives (especially creation modals and table actions).
3. **Modal Focus Management & Keyboard Support**: Verify modals contain `role="dialog"`, `aria-modal="true"`, trapping keyboard focus on open and handling `ESC` key to close.

### Recommended Execution Options:

#### Option A: Lightweight Node-based DOM / AST Accessibility Evaluator
A custom Node script (e.g. `scripts/verify-a11y.cjs` or `scripts/verify-a11y.ts`) using Node's standard modules and/or `jsdom` + `axe-core`:
- Parses and checks component DOM trees or rendered markup against WCAG AA standards.
- Checks `CompradoresPage` modal and table button elements specifically for `aria-label`, `role`, `tabIndex`, and `onKeyDown` event handlers.
- Advantage: Fast, standalone execution without needing large external test setup changes if package additions are restricted.

#### Option B: Vitest + jsdom + axe-core Test Suite
- Add `vitest`, `jsdom`, `@testing-library/react`, and `axe-core` (or `jest-axe`) to `devDependencies`.
- Add `"test": "vitest run"` to `package.json`.
- Create `src/app/__tests__/CompradoresPage.test.tsx` to mount `CompradoresPage` and run `axe(container)` as well as keyboard events (`fireEvent.keyDown(modal, { key: 'Escape' })`).

---

## 5. Structural & Accessibility Audit of `CompradoresPage`

### File Location
`src/app/AdminDashboard.tsx` (Lines 715–896)

### Visual & Layout Decoupling (R1 Findings)
1. **Container Width**:
   - `CompradoresPage` has `maxWidth: 900` applied to its root container (`<div className="admin-main-padding" style={{ padding: 28, maxWidth: 900 }}>`).
   - `OverviewPage`, `TramitesPage`, and `CategoriasPage` use `style={{ padding: 28 }}` without `maxWidth` restrictions, allowing full fluid utilization of space across modern displays.
2. **Header Bar & Responsiveness**:
   - `CompradoresPage` header uses fixed inline styles (`display: "flex", justifyContent: "space-between"`) without the `admin-flex-wrap` helper class used in `TramitesPage`.
3. **Table & Card Styling Consistency**:
   - Table cell paddings in `CompradoresPage` are `padding: "14px 16px"`, whereas `TramitesPage` uses `padding: "9px 10px"`.
   - KPI metrics row is missing in `CompradoresPage` (unlike `OverviewPage` which presents key user/activity KPIs).

### Accessibility Deficiencies (R2 Findings)
1. **Create Comprador Modal Overlay** (`showCreateModal`, lines 859–894):
   - Missing `role="dialog"` and `aria-modal="true"`.
   - Missing `aria-labelledby` linking to modal title (`h3`).
   - Missing keyboard focus trap (focus does not move automatically into the first input).
   - Missing `ESC` key listener (`onKeyDown` handling `e.key === 'Escape'`).
   - Modal Close Icon Button (`<button onClick={() => setShowCreateModal(false)}><X size={18} /></button>`): Missing `aria-label="Cerrar modal"`.
   - Email Input Label: `<label>` text is rendered above the `<input type="email">`, but lacks `htmlFor` association or `id` matching.
2. **Table Interactive Controls**:
   - **Premium Toggle Button** (lines 831–839): Rendered as a custom `<button>` with no `aria-label`, no `role="switch"`, and no `aria-checked` / `aria-pressed` state.
   - **Revoke Access Button** (lines 846–848): Text is "Revocar Acceso", but lacks dynamic contextual label for assistive technology (e.g. `aria-label={`Revocar acceso a ${c.email}`}`).

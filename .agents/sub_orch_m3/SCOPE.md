# Scope: Milestone 3 - M3_Final_Verification_E2E

## Objective
Perform complete end-to-end automated and manual verification of the accessibility and layout refactoring for the Admin Dashboard `CompradoresPage` module, ensuring type safety, build integrity, accessibility standard compliance, and implementation authenticity.

## Verification Directives

### 1. Automated Test Suite Execution
- **`npm run test:a11y` / `node scripts/verify-a11y.cjs`**: Verify all 14 assertions pass with exit code 0.
- **`npx tsc --noEmit`**: Verify TypeScript compilation passes with 0 errors (exit code 0).
- **`npm run build`**: Verify production Vite build succeeds with 0 errors (exit code 0).

### 2. Manual Judge Inspection (Reviewers)
- **Acceptance Criteria 1 (Automated axe-core/DOM)**:
  - Color contrast ratio (>4.5:1 for normal text).
  - `aria-label` / `aria-labelledby` on icon buttons, form inputs, modal close buttons, switch roles.
  - Keyboard navigation (modal focus trap, ESC key closing).
- **Acceptance Criteria 2 (Manual Judge Inspection)**:
  - `CompradoresPage` container `maxWidth` (removed hardcoded `maxWidth: 900`).
  - Container padding (`28px`), table cell padding (`9px 10px`).
  - Container margins and border radius (`10px`).
  - Shared Badges and responsive flex wrapping (`admin-flex-wrap`).
  - Visual consistency with `OverviewPage` and `TramitesPage`.

### 3. Stress-testing & Validation (Challengers)
- Visual responsiveness across breakpoints.
- Color contrast mathematical precision.
- Keyboard navigation focus trap boundary edge cases.

### 4. Forensic Audit (Auditor)
- Verify zero hardcoded test returns.
- Verify zero facade/dummy components or mocks bypassing actual logic.
- Verify 100% authentic implementation in `src/app/AdminDashboard.tsx`.

## Pass Criteria
Gate passes ONLY if:
1. Automated suite passes 14/14 tests.
2. TypeScript check passes with 0 errors.
3. Build completes with 0 errors.
4. Reviewer 1 & Reviewer 2 both return APPROVE.
5. Challenger 1 & Challenger 2 both return APPROVE.
6. Forensic Auditor returns CLEAN.

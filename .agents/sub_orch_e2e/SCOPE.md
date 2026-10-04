# Scope: E2E Accessibility Testing Track Infrastructure

## Architecture
- Script entry point: `scripts/verify-a11y.cjs`
- Package script: `"test:a11y": "node scripts/verify-a11y.cjs"`
- Target component file analyzed/verified: `src/app/AdminDashboard.tsx`

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Tier 1 (Feature Coverage) | `maxWidth` removal on `CompradoresPage`, `aria-label`/`aria-labelledby` on all buttons/inputs/switches/tables | M3_E2E_Testing | ORIGINAL_REQUEST |
| 2 | Tier 2 (Boundary & Corner Cases) | Modal dialog ARIA (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`), focus trap logic presence, ESC key handler | M3_E2E_Testing | ORIGINAL_REQUEST |
| 3 | Tier 3 (Cross-Feature Combinations) | Color contrast thresholds (checking text colors vs dark backgrounds like `#64748b` vs `#94a3b8`) | M3_E2E_Testing | ORIGINAL_REQUEST |
| 4 | Tier 4 (Real-World Scenarios) | DOM node structure integrity & accessibility tree validity across `src/app/AdminDashboard.tsx` | M3_E2E_Testing | ORIGINAL_REQUEST |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M3_E2E_Test_Harness | Implement `scripts/verify-a11y.cjs`, add `"test:a11y"` to `package.json`, verify execution and typecheck | none | DONE |

## Interface Contracts
### Test Execution Contract
- Runner command: `npm run test:a11y` or `node scripts/verify-a11y.cjs`
- Expected exit code: 0 on complete pass, non-zero on accessibility violation failure.
- Output artifact: `TEST_READY.md` published at project root upon passing gate check.

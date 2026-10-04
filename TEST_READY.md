# E2E Test Suite Ready

## Test Runner
- Command: `npm run test:a11y` or `node scripts/verify-a11y.cjs`
- Typecheck Command: `npx tsc --noEmit`
- Expected: All 14 assertions pass with exit code 0 once Milestone 1 & 2 implementation is complete.

## Coverage Summary
| Tier | Count | Description |
|------|------:|-------------|
| 1. Feature Coverage | 5 | `maxWidth` removal on `CompradoresPage`, `aria-label` / `aria-labelledby` on buttons, inputs, switches, tables |
| 2. Boundary & Corner Cases | 3 | Modal dialog ARIA attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`), focus trap logic, ESC key handler |
| 3. Cross-Feature Combinations | 3 | Color contrast thresholds (`#64748b` -> `#94a3b8`, `#3b82f6` -> `#60a5fa`), theme token `C` consistency |
| 4. Real-World Application Scenarios | 3 | DOM node structure integrity (`htmlFor`/`id` matching), clickable element semantics, structural landmarks (`main`, `aside`, `nav`) |
| **Total** | **14** | **Complete 4-Tier Automated Verification Harness** |

## Feature Checklist
| Feature | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|---------|:------:|:------:|:------:|:------:|
| Container & Layout (`maxWidth: 900` removal) | ✓ | - | - | ✓ |
| ARIA Labels & Roles (buttons, inputs, switches, tables) | ✓ | ✓ | - | ✓ |
| Keyboard Navigation & Focus Trap (modals, ESC key) | - | ✓ | - | - |
| Color Contrast Remediation (`#64748b` & `#3b82f6`) | - | - | ✓ | - |

## Invocation Instructions
1. Run automated accessibility test harness:
   ```bash
   npm run test:a11y
   ```
2. Run TypeScript compilation check:
   ```bash
   npx tsc --noEmit
   ```

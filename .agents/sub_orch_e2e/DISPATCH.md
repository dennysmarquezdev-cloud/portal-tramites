## 2026-08-06T20:36:49Z
Task Assignment from Parent Orchestrator (8b700d03-d0eb-405b-9794-9e6bcf47b22f / 6d976ac0-66cf-4adc-80e5-9976bab99239):

You are E2E Testing Track Sub-orchestrator (self) responsible for creating the automated test suite infrastructure.
Your working directory is: d:\proyecto_abril\portal-tramites\.agents\sub_orch_e2e

Tasks & Directives:
1. Read `d:\proyecto_abril\portal-tramites\.agents\ORIGINAL_REQUEST.md` and `d:\proyecto_abril\portal-tramites\PROJECT.md`.
2. Read Explorer 3 survey report at `d:\proyecto_abril\portal-tramites\.agents\explorer_survey_3\handoff.md`.
3. Create `TEST_INFRA.md` in `d:\proyecto_abril\portal-tramites\TEST_INFRA.md` and `SCOPE.md` in `d:\proyecto_abril\portal-tramites\.agents\sub_orch_e2e\SCOPE.md`.
4. Run the Iteration Loop to build the automated accessibility test suite:
   - Spawn Worker / Test Writer (`teamwork_preview_test_writer` or `teamwork_preview_worker`) to write `scripts/verify-a11y.cjs` that programmatically verifies:
     * Tier 1 (Feature Coverage): `maxWidth` removal on `CompradoresPage`, `aria-label` / `aria-labelledby` on all buttons/inputs/switches/tables.
     * Tier 2 (Boundary & Corner Cases): Modal dialog ARIA attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`), focus trap logic presence, ESC key event handling.
     * Tier 3 (Cross-Feature Combinations): Color contrast thresholds (checking text colors vs dark backgrounds like `#64748b` vs `#94a3b8`).
     * Tier 4 (Real-World Scenarios): DOM node structure integrity & accessibility tree validity across `src/app/AdminDashboard.tsx`.
   - Update `package.json` to include `"test:a11y": "node scripts/verify-a11y.cjs"`.
   - Require Worker to execute `npm run test:a11y` or `node scripts/verify-a11y.cjs` and `npx tsc --noEmit`.
   - Spawn Reviewer (`teamwork_preview_reviewer`) and Forensic Auditor (`teamwork_preview_auditor`) to verify test suite robustness and integrity.
   - When gate passes, publish `TEST_READY.md` at project root (`d:\proyecto_abril\portal-tramites\TEST_READY.md`) with coverage summary and invocation instructions.
5. Report completion back to parent orchestrator (`8b700d03-d0eb-405b-9794-9e6bcf47b22f`).

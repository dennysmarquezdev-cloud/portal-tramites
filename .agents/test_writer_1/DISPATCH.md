## 2026-08-06T20:37:34Z
<USER_REQUEST>
You are worker agent `test_writer_1` (`teamwork_preview_test_writer`).
Your working directory is: `d:\proyecto_abril\portal-tramites\.agents\test_writer_1`

Read these files before starting work:
- `d:\proyecto_abril\portal-tramites\.agents\ORIGINAL_REQUEST.md`
- `d:\proyecto_abril\portal-tramites\PROJECT.md`
- `d:\proyecto_abril\portal-tramites\TEST_INFRA.md`
- `d:\proyecto_abril\portal-tramites\.agents\explorer_survey_3\handoff.md`

Tasks:
1. Write `d:\proyecto_abril\portal-tramites\scripts\verify-a11y.cjs`.
   This standalone Node.js script must programmatically inspect and verify the accessibility and layout compliance of `src/app/AdminDashboard.tsx` (and project files) across 4 tiers:
   - **Tier 1 (Feature Coverage)**:
     * Removal of `maxWidth` constraint (`maxWidth: 900`) on `CompradoresPage`.
     * Presence of `aria-label` or `aria-labelledby` on all buttons, input elements, switch toggles, and table containers.
   - **Tier 2 (Boundary & Corner Cases)**:
     * Modal dialog ARIA attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`).
     * Modal focus trap logic presence (`autoFocus`, focus trap container or logic).
     * ESC key event handler presence (`Escape`, `KeyDown`, `onKeyDown`).
   - **Tier 3 (Cross-Feature Combinations)**:
     * Color contrast thresholds (verifying `#64748b` is updated to `#94a3b8` or higher contrast, `#3b82f6` updated to `#60a5fa`).
   - **Tier 4 (Real-World Scenarios)**:
     * DOM node structure integrity & accessibility tree validity across `src/app/AdminDashboard.tsx` (proper label-input bindings `htmlFor`/`id`, button roles, container semantics).

   The script must print detailed pass/fail assertions for each check, summarize results per tier, and exit with code 0 if all tests pass, or non-zero (1) if any fail.

2. Update `d:\proyecto_abril\portal-tramites\package.json` to add:
   `"test:a11y": "node scripts/verify-a11y.cjs"` under `"scripts"`.

3. Execute verification commands:
   Run `node scripts/verify-a11y.cjs` (or `npm run test:a11y`)
   Run `npx tsc --noEmit`
   Record the full command execution output and results in `d:\proyecto_abril\portal-tramites\.agents\test_writer_1\handoff.md`.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Create `progress.md` and `handoff.md` in `d:\proyecto_abril\portal-tramites\.agents\test_writer_1`. Send a message when finished.
</USER_REQUEST>

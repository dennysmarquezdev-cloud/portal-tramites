## 2026-08-06T20:41:40Z
<USER_REQUEST>
You are Sub-orchestrator M2 (self) responsible for Milestone 2: M2_Accessibility_ARIA.
Your working directory is: d:\proyecto_abril\portal-tramites\.agents\sub_orch_m2

Tasks & Directives:
1. Read `d:\proyecto_abril\portal-tramites\.agents\ORIGINAL_REQUEST.md` and `d:\proyecto_abril\portal-tramites\PROJECT.md`.
2. Read Explorer 2 survey report at `d:\proyecto_abril\portal-tramites\.agents\explorer_survey_2\handoff.md` and Explorer 3 report at `d:\proyecto_abril\portal-tramites\.agents\explorer_survey_3\handoff.md`.
3. Create your `SCOPE.md` in `d:\proyecto_abril\portal-tramites\.agents\sub_orch_m2\SCOPE.md`.
4. Run the full Iteration Loop for Milestone 2:
   - Spawn 3 Explorers (`teamwork_preview_explorer`) to map exact line-by-line accessibility edits in `src/app/AdminDashboard.tsx`.
   - Spawn 1 Worker (`teamwork_preview_worker`) with Explorer findings to implement:
     * ARIA Roles & Attributes:
       - `CompradoresPage` table: `aria-label="Lista de compradores y accesos"`, `scope="col"` on all `<th>` elements.
       - Premium toggle switch button: `role="switch"`, `aria-checked={c.isPremium}`, `aria-label={`Asignar plan premium a ${c.email}`}`.
       - Revoke access button: `aria-label={`Revocar acceso a ${c.email}`}`.
       - Create Comprador Modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title-comprador"`. Close icon button `<X>`: `aria-label="Cerrar modal"`.
       - Form label/input: add `id="comprador-email-input"` to input and `htmlFor="comprador-email-input"` to label.
       - Search input and filter controls: `aria-label="Buscar comprador por email"`, `aria-label="Filtrar por rol"`, `aria-label="Filtrar por plan"`.
       - Add discernible `aria-label` to all icon buttons across modals and tables in `AdminDashboard.tsx`.
     * Modal Focus Trap & Keyboard Navigation:
       - Implement focus trap inside modals (trapping Tab key cycle between first and last focusable element).
       - Implement `Escape` key event listener on window/modal to dismiss active modals on ESC key press.
       - Auto-focus initial input on modal open, restore focus on modal unmount.
     * Color Contrast Remediation:
       - Update muted text color token from `#64748b` to `#94a3b8` and primary text token from `#3b82f6` to `#60a5fa` for small text elements on dark backgrounds (`#111827`) to guarantee > 4.5:1 WCAG AA contrast ratio.
     * Require Worker to run `npx tsc --noEmit` and `npm run build` and document 0 errors in handoff.
   - Spawn 2 Reviewers (`teamwork_preview_reviewer`) to independently inspect ARIA, focus trap, ESC handling, contrast compliance, and build/type safety.
   - Spawn 2 Challengers (`teamwork_preview_challenger`) to stress-test accessibility, keyboard focus trap, and ESC key dismissal.
   - Spawn 1 Forensic Auditor (`teamwork_preview_auditor`) to verify zero cheating or facade implementations.
   - Perform Gate check in `GATE_STATUS.md`. Gate passes ONLY if build succeeds, all reviewers approve, challengers confirm, and auditor is clean.
5. When gate passes, update `PROJECT.md` M2 status to `DONE` and report completion back to parent orchestrator (`8b700d03-d0eb-405b-9794-9e6bcf47b22f`).
</USER_REQUEST>

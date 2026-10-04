## 2026-08-07T01:42:51Z
You are Worker 1 for Milestone 2 (M2_Accessibility_ARIA).
Your working directory is: d:\proyecto_abril\portal-tramites\.agents\worker_m2_1

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Tasks & Specifications:
1. Read d:\proyecto_abril\portal-tramites\.agents\ORIGINAL_REQUEST.md and d:\proyecto_abril\portal-tramites\.agents\sub_orch_m2\SCOPE.md.
2. Read Explorer handoff reports:
   - d:\proyecto_abril\portal-tramites\.agents\explorer_m2_1\handoff.md
   - d:\proyecto_abril\portal-tramites\.agents\explorer_m2_2\handoff.md
   - d:\proyecto_abril\portal-tramites\.agents\explorer_m2_3\handoff.md
3. Apply accessibility refactoring in `d:\proyecto_abril\portal-tramites\src\app\AdminDashboard.tsx` and `d:\proyecto_abril\portal-tramites\src\styles\theme.css`:

   a. ARIA Roles & Attributes:
      - `CompradoresPage` table: `aria-label="Lista de compradores y accesos"`, `scope="col"` on all <th> headers.
      - Premium toggle button: `role="switch"`, `aria-checked={c.isPremium}`, `aria-label={`Asignar plan premium a ${c.email}`}`.
      - Revoke access button: `aria-label={`Revocar acceso a ${c.email}`}`.
      - Create Comprador modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title-comprador"`. Title <h3>: `id="modal-title-comprador"`. Close icon button <X>: `aria-label="Cerrar modal"`.
      - Form label/input binding: `<input id="comprador-email-input" ...>` and `<label htmlFor="comprador-email-input" ...>`.
      - Search input: `aria-label="Buscar comprador por email"`.
      - Role filter select: `aria-label="Filtrar por rol"`.
      - Plan filter select: `aria-label="Filtrar por plan"`.
      - Add discernible `aria-label` to all icon buttons across modals and tables in `AdminDashboard.tsx` (all 16 mapped by Explorer 3).

   b. Focus Trap & Keyboard Navigation:
      - Implement a reusable `useFocusTrap` custom hook in `AdminDashboard.tsx` (or `src/app/hooks/useFocusTrap.ts`).
      - Attach focus trap refs to `TramiteFormModal`, `ConfirmDialog`, `CategoriasPage` edit modal, and `CompradoresPage` modal.
      - Intercept Tab key cycling between first and last focusable element in open modals.
      - Intercept Escape key on window/modal to dismiss active modal on ESC key press.
      - Auto-focus initial input on modal open, and restore focus to trigger element on unmount.

   c. Color Contrast Remediation:
      - Update muted text token in `src/styles/theme.css` (`#64748b` -> `#94a3b8`) for `--text-muted` and `--muted-foreground`.
      - Update primary accent text token in `src/app/AdminDashboard.tsx` (`#3b82f6` -> `#60a5fa`) and corresponding inline RGB opacity styles (`rgba(59,130,246,...)` -> `rgba(96,165,250,...)`).

4. Build & Type Verification:
   - Run `npx tsc --noEmit` from `d:\proyecto_abril\portal-tramites` and verify exit code 0.
   - Run `npm run build` from `d:\proyecto_abril\portal-tramites` and verify exit code 0.
   - Document commands executed and 0 errors result in your handoff report.

5. Write detailed handoff report to `d:\proyecto_abril\portal-tramites\.agents\worker_m2_1\handoff.md`.
6. Send a message to parent sub-orchestrator with brief summary and path to handoff.md.

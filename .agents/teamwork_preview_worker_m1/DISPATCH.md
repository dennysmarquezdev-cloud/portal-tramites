## 2026-08-07T01:37:50Z
<USER_REQUEST>
You are Worker 1 for Milestone 1 (M1_Layout_Refactor).
Your working directory is: d:\proyecto_abril\portal-tramites\.agents\teamwork_preview_worker_m1

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Context & Instructions:
1. Read ORIGINAL_REQUEST.md at `d:\proyecto_abril\portal-tramites\.agents\ORIGINAL_REQUEST.md`.
2. Read Explorer 3 refactoring blueprint at `d:\proyecto_abril\portal-tramites\.agents\teamwork_preview_explorer_m1_3\handoff.md`.
3. Target file to modify: `src/app/AdminDashboard.tsx` (specifically `CompradoresPage` component, lines ~715-896).

Required Tasks:
- Remove `maxWidth: 900` from container `style` at line 785 (make it fluid matching `OverviewPage` & `TramitesPage`).
- Standardize table padding to `padding: "9px 10px"`, container border radius to `10px`, and make table header `thead` sticky.
- Replace custom inline role badge `<span>` (lines 825-827) with shared `<Badge color={c.esAdmin ? C.danger : C.success}>{c.esAdmin ? "Administrador" : "Cliente"}</Badge>`.
- Standardize Create Comprador Modal overlay backdrop to translucent dark backdrop (`rgba(0,0,0,0.6)` with backdrop filter `blur(4px)`), container border radius to `12px`, and input/button border radius to `6px`.
- Standardize header bar flex wrapping (`admin-flex-wrap`), add search input field and role/plan filter dropdowns (`filterRole`, `filterPlan`) to filter `compradores` in real time.
- Verify TypeScript types by running `npx tsc --noEmit` and build by running `npm run build`.
- Document zero errors and full build/type pass in `d:\proyecto_abril\portal-tramites\.agents\teamwork_preview_worker_m1\handoff.md`.

Write your handoff report to `d:\proyecto_abril\portal-tramites\.agents\teamwork_preview_worker_m1\handoff.md` and send a message when done.
</USER_REQUEST>

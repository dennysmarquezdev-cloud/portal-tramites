## 2026-08-06T20:36:49Z

You are Sub-orchestrator M1 (self) responsible for Milestone 1: M1_Layout_Refactor.
Your working directory is: d:\proyecto_abril\portal-tramites\.agents\sub_orch_m1

Tasks & Directives:
1. Read `d:\proyecto_abril\portal-tramites\.agents\ORIGINAL_REQUEST.md` and `d:\proyecto_abril\portal-tramites\PROJECT.md`.
2. Read Explorer 1 survey report at `d:\proyecto_abril\portal-tramites\.agents\explorer_survey_1\handoff.md` and Explorer 3 report at `d:\proyecto_abril\portal-tramites\.agents\explorer_survey_3\handoff.md`.
3. Create your `SCOPE.md` in `d:\proyecto_abril\portal-tramites\.agents\sub_orch_m1\SCOPE.md`.
4. Run the full Iteration Loop for Milestone 1:
   - Spawn 3 Explorers (`teamwork_preview_explorer`) to map exact line-by-line refactoring edits in `src/app/AdminDashboard.tsx`.
   - Spawn 1 Worker (`teamwork_preview_worker`) with Explorer findings to refactor `CompradoresPage`:
     * Remove `maxWidth: 900` from container `style` at line 785 (make it fluid matching `OverviewPage` & `TramitesPage`).
     * Standardize table padding to `padding: "9px 10px"`, container border radius to `10px`, and make table header `thead` sticky.
     * Replace custom inline role badge `<span>` (lines 825-827) with shared `<Badge>` component.
     * Standardize modal overlay backdrop to translucent dark backdrop (`rgba(0,0,0,0.6)` with backdrop blur `blur(4px)`), container border radius to `12px`, and input border radius to `6px`.
     * Standardize header bar flex wrapping (`admin-flex-wrap`), add search input and role/plan filter buttons.
     * Require Worker to run `npx tsc --noEmit` and `npm run build` and document zero errors in handoff.
   - Spawn 2 Reviewers (`teamwork_preview_reviewer`) to independently inspect and verify layout consistency, responsive design, and build/type safety.
   - Spawn 2 Challengers (`teamwork_preview_challenger`) to stress-test visual layout and responsive breakpoints.
   - Spawn 1 Forensic Auditor (`teamwork_preview_auditor`) to verify zero cheating or facade implementations.
   - Perform Gate check in `GATE_STATUS.md`. Gate passes ONLY if build succeeds, all reviewers approve, challengers confirm, and auditor is clean.
5. When gate passes, update `PROJECT.md` M1 status to `DONE` and report completion back to parent orchestrator (`8b700d03-d0eb-405b-9794-9e6bcf47b22f`).

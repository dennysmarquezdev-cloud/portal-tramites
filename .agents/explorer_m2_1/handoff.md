# Handoff Report: ARIA & Accessibility Analysis for CompradoresPage

**Agent**: Explorer 1 (M2_Accessibility_ARIA)  
**Date**: 2026-08-07  
**Target File**: `d:\proyecto_abril\portal-tramites\src\app\AdminDashboard.tsx`  

---

## 1. Observation

Direct code inspection of `d:\proyecto_abril\portal-tramites\src\app\AdminDashboard.tsx` revealed the following exact locations and current implementations lacking ARIA accessibility attributes:

### Observation 1.1: Table `<table>` and Header `<th>` elements in `CompradoresPage`
- **File**: `src/app/AdminDashboard.tsx`
- **Line 836**:
  ```tsx
  <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse" }}>
  ```
- **Line 840**:
  ```tsx
  <th key={h} style={{ color: C.textMuted, fontSize: 11, fontWeight: 600, textAlign: "left", padding: "9px 10px", borderBottom: `1px solid ${C.border}`, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
  ```
- **Finding**: Table lacks `aria-label="Lista de compradores y accesos"`. Table header cells (`<th>`) lack the `scope="col"` attribute for screen readers.

### Observation 1.2: Premium Toggle Switch Button in `CompradoresPage`
- **File**: `src/app/AdminDashboard.tsx`
- **Lines 870–880**:
  ```tsx
  <button onClick={async () => {
    try {
      await updateDoc(doc(db, "compradores", c.email), { isPremium: !c.isPremium });
      toast.success(`Plan ${!c.isPremium ? 'Premium' : 'Gratuito'} asignado a ${c.email}`);
    } catch (err) {
      console.error(err);
      toast.error("Error al actualizar plan");
    }
  }} style={{ background: c.isPremium ? "rgba(139,92,246,.15)" : "var(--colorNeutralBackgroundHover)", border: `1px solid ${c.isPremium ? "rgba(139,92,246,.4)" : C.border}`, borderRadius: 20, width: 36, height: 20, position: "relative", cursor: "pointer", transition: "all .3s" }}>
    <div style={{ width: 14, height: 14, background: c.isPremium ? "#a78bfa" : C.textMuted, borderRadius: "50%", position: "absolute", top: 2, left: c.isPremium ? 18 : 2, transition: "all .3s" }} />
  </button>
  ```
- **Finding**: The toggle button behaves as a switch but lacks `role="switch"`, `aria-checked={c.isPremium}`, and `aria-label={`Asignar plan premium a ${c.email}`}`.

### Observation 1.3: Revoke Access Button in `CompradoresPage`
- **File**: `src/app/AdminDashboard.tsx`
- **Lines 886–888**:
  ```tsx
  <button onClick={() => handleDelete(c.email)} style={{ background: "rgba(239,68,68,.08)", border: `1px solid rgba(239,68,68,.2)`, borderRadius: 6, color: C.danger, cursor: "pointer", padding: "6px 10px", fontSize: 12, fontWeight: 600, transition: "background .2s" }}>
    Revocar Acceso
  </button>
  ```
- **Finding**: Button lacks contextual screen reader label `aria-label={`Revocar acceso a ${c.email}`}`.

### Observation 1.4: Create Comprador Modal Container, Title, and Close Button
- **File**: `src/app/AdminDashboard.tsx`
- **Line 900**:
  ```tsx
  <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 12, width: "100%", maxWidth: 440, padding: 24, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.5)" }}>
  ```
- **Line 902**:
  ```tsx
  <h3 style={{ color: C.textPrimary, fontSize: 16, fontWeight: 700, margin: 0 }}>Agregar Nuevo Comprador</h3>
  ```
- **Line 903**:
  ```tsx
  <button onClick={() => setShowCreateModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted }}><X size={18} /></button>
  ```
- **Finding**: Modal container lacks `role="dialog"`, `aria-modal="true"`, and `aria-labelledby="modal-title-comprador"`. Title `<h3>` lacks `id="modal-title-comprador"`. Icon close button `<X>` lacks `aria-label="Cerrar modal"`.

### Observation 1.5: Form Label and Input Binding in Create Comprador Modal
- **File**: `src/app/AdminDashboard.tsx`
- **Lines 908–910**:
  ```tsx
  <label style={{ display: "block", color: C.textMuted, fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: "uppercase" }}>Correo Electrónico</label>
  <input type="email" placeholder="ejemplo@gmail.com" value={email} onChange={e => setEmail(e.target.value)} required
    style={{ width: "100%", background: "var(--colorNeutralBackgroundHover)", border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 14px", color: C.textPrimary, fontSize: 13, outline: "none" }} />
  ```
- **Finding**: `<label>` lacks `htmlFor="comprador-email-input"` and `<input>` lacks `id="comprador-email-input"`.

### Observation 1.6: Search and Filter Inputs in `CompradoresPage`
- **File**: `src/app/AdminDashboard.tsx`
- **Lines 809–814**:
  ```tsx
  <input
    value={search}
    onChange={e => setSearch(e.target.value)}
    placeholder="Buscar por email..."
    style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, color: C.textPrimary, padding: "8px 12px", fontSize: 13, width: 260, outline: "none" }}
  />
  ```
- **Lines 815–823**:
  ```tsx
  <select
    value={filterRole}
    onChange={e => setFilterRole(e.target.value as any)}
    style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, color: C.textMuted, padding: "8px 12px", fontSize: 13, outline: "none" }}
  >
  ```
- **Lines 824–832**:
  ```tsx
  <select
    value={filterPlan}
    onChange={e => setFilterPlan(e.target.value as any)}
    style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, color: C.textMuted, padding: "8px 12px", fontSize: 13, outline: "none" }}
  >
  ```
- **Finding**: Search input lacks `aria-label="Buscar comprador por email"`. Role select lacks `aria-label="Filtrar por rol"`. Plan select lacks `aria-label="Filtrar por plan"`.

---

## 2. Logic Chain

1. **Requirement Mapping**: WCAG 2.1 AA and SCOPE.md dictate that data tables, custom controls (switches), interactive buttons, modal dialogs, form controls, and search/filter inputs must expose accessible names and roles to assistive technology.
2. **Identification of Gaps**:
   - `<table>` elements without accessible labels or column headers without `scope="col"` hinder screen reader navigation across tabular data (Observations 1.1).
   - Custom toggle controls rendered as styled `<button>` elements without `role="switch"` and `aria-checked` fail accessibility tree checks for state awareness (Observation 1.2).
   - Dynamic table row buttons (revoke access) without item-specific accessible names create ambiguous voice control and screen reader contexts (Observation 1.3).
   - Floating overlays without `role="dialog"`, `aria-modal="true"`, and header binding (`aria-labelledby`) fail standard DOM accessibility audits (Observation 1.4).
   - Inputs without explicitly linked labels (`htmlFor` / `id`) prevent assistive tools from announcing label context on focus (Observation 1.5).
   - Standalone search inputs and filter selects without visual `<label>` elements require explicit `aria-label` attributes to pass automated DOM contrast and accessibility validation (Observation 1.6).

3. **Proposed Exact Refactoring**:

```tsx
// 1. Table & Headers (Lines 836 & 840)
// Replace line 836 with:
<table className="admin-table" aria-label="Lista de compradores y accesos" style={{ width: "100%", borderCollapse: "collapse" }}>

// Replace line 840 with:
<th key={h} scope="col" style={{ color: C.textMuted, fontSize: 11, fontWeight: 600, textAlign: "left", padding: "9px 10px", borderBottom: `1px solid ${C.border}`, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>

// 2. Premium Toggle Switch Button (Lines 870–880)
// Replace button opening tag with:
<button
  role="switch"
  aria-checked={c.isPremium}
  aria-label={`Asignar plan premium a ${c.email}`}
  onClick={async () => { ... }}
  style={{ ... }}
>

// 3. Revoke Access Button (Lines 886–888)
// Replace button opening tag with:
<button
  aria-label={`Revocar acceso a ${c.email}`}
  onClick={() => handleDelete(c.email)}
  style={{ ... }}
>

// 4. Modal Container, Title, and Close Button (Lines 900, 902, 903)
// Replace line 900 with:
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title-comprador"
  style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 12, width: "100%", maxWidth: 440, padding: 24, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.5)" }}
>

// Replace line 902 with:
<h3 id="modal-title-comprador" style={{ color: C.textPrimary, fontSize: 16, fontWeight: 700, margin: 0 }}>Agregar Nuevo Comprador</h3>

// Replace line 903 with:
<button aria-label="Cerrar modal" onClick={() => setShowCreateModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted }}><X size={18} /></button>

// 5. Form Binding (Lines 908–909)
// Replace line 908 with:
<label htmlFor="comprador-email-input" style={{ display: "block", color: C.textMuted, fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: "uppercase" }}>Correo Electrónico</label>

// Replace line 909-910 with:
<input
  id="comprador-email-input"
  type="email"
  placeholder="ejemplo@gmail.com"
  value={email}
  onChange={e => setEmail(e.target.value)}
  required
  style={{ width: "100%", background: "var(--colorNeutralBackgroundHover)", border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 14px", color: C.textPrimary, fontSize: 13, outline: "none" }}
/>

// 6. Search and Filter Inputs (Lines 809–832)
// Replace search input (line 809) with:
<input
  aria-label="Buscar comprador por email"
  value={search}
  onChange={e => setSearch(e.target.value)}
  placeholder="Buscar por email..."
  style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, color: C.textPrimary, padding: "8px 12px", fontSize: 13, width: 260, outline: "none" }}
/>

// Replace role filter select (line 815) with:
<select
  aria-label="Filtrar por rol"
  value={filterRole}
  onChange={e => setFilterRole(e.target.value as any)}
  style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, color: C.textMuted, padding: "8px 12px", fontSize: 13, outline: "none" }}
>

// Replace plan filter select (line 824) with:
<select
  aria-label="Filtrar por plan"
  value={filterPlan}
  onChange={e => setFilterPlan(e.target.value as any)}
  style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, color: C.textMuted, padding: "8px 12px", fontSize: 13, outline: "none" }}
>
```

---

## 3. Caveats

- **Scope boundary**: This investigation focuses strictly on ARIA accessibility attributes and structural markup mapping within `src/app/AdminDashboard.tsx`. Modal focus trapping, keyboard event listeners (ESC key), and color contrast remediation are assigned to separate sub-tasks/components as per `SCOPE.md`.
- **Additional icon buttons**: Other components in `AdminDashboard.tsx` (e.g. `TramiteFormModal`, `TramitesPage`, `CategoriasPage`) also feature icon buttons (`<X>`, `<Pencil>`, `<Trash2>`) that should ideally be audited for `aria-label` attributes to ensure comprehensive site-wide compliance.

---

## 4. Conclusion

All 6 required ARIA & accessibility updates for `CompradoresPage` in `src/app/AdminDashboard.tsx` have been precisely mapped to exact line numbers with drop-in JSX solutions ready for implementation by the Implementer agent.

---

## 5. Verification Method

1. **Source Code Inspection**:
   - Inspect `src/app/AdminDashboard.tsx` around lines 800–935 to confirm all 6 ARIA attribute additions (`aria-label`, `role="switch"`, `aria-checked`, `scope="col"`, `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `htmlFor`/`id`).
2. **Type Check and Build Verification**:
   - Run `npx tsc --noEmit` from project root `d:\proyecto_abril\portal-tramites` to ensure 0 TypeScript errors.
   - Run `npm run build` from project root to ensure clean build output.

# Handoff Report — Explorer 3 (M1_Layout_Refactor Blueprint)

## 1. Observation

Direct examination of `src/app/AdminDashboard.tsx` (lines 723–896) revealed five specific layout and styling inconsistencies in `CompradoresPage` when compared to `OverviewPage` (lines 352–390) and `TramitesPage` (lines 392–505):

1. **Main Container Width** (Line 785):
   - Current: `<div className="admin-main-padding" style={{ padding: 28, maxWidth: 900 }}>`
   - Contrast: `OverviewPage` (line 361) and `TramitesPage` (line 479) use `<div className="admin-main-padding" style={{ padding: 28 }}>` with no `maxWidth` cap, causing `CompradoresPage` to look artificially narrow and misaligned on wide screens.

2. **Table Styling & Sticky Header** (Lines 796–853):
   - Outer container border radius: Currently `borderRadius: 12` (line 796). `TramitesPage` (line 495) and `OverviewPage` (line 370) use `borderRadius: 10`.
   - Table header (`thead`): Currently non-sticky `<thead>` (line 798). `TramitesPage` (line 497) uses `<thead style={{ position: "sticky", top: 0, background: C.card, zIndex: 1 }}>`.
   - Table cells (`th` and `td`): Currently use `padding: "14px 16px"` (lines 801, 823, 824, 829, 845, 846). `TramitesPage` (lines 475–476, 499) uses standardized `padding: "9px 10px"`.
   - Table colSpan: Empty & loading state table cells (lines 808, 814) currently set `colSpan={4}`, despite the table having 5 header columns.

3. **Role Badges** (Lines 825–827):
   - Current: Custom inline `<span>` element with hardcoded styling:
     ```tsx
     <span style={{ background: c.esAdmin ? `${C.danger}18` : `${C.success}18`, border: `1px solid ${c.esAdmin ? C.danger + "40" : C.success + "40"}`, color: c.esAdmin ? C.danger : C.success, fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6 }}>
       {c.esAdmin ? "Administrador" : "Cliente"}
     </span>
     ```
   - Contrast: Shared `<Badge color={...}>{...}</Badge>` component (defined at line 128) is used throughout `OverviewPage`, `TramitesPage`, and `CategoriasPage`.

4. **Create Comprador Modal Overlay & Inputs** (Lines 860–885):
   - Backdrop overlay (line 860): Currently `background: "var(--colorNeutralBackground1)"` (opaque white/light grey).
   - Modal container (line 861): Currently `borderRadius: 16`.
   - Form controls & buttons (lines 871, 874, 882, 885): Currently `borderRadius: 8`.

5. **Header Bar & Filter Toolbar** (Lines 786–794):
   - Current header bar lacks search capability, role filter, or plan filter.
   - Missing responsive toolbar wrapping class `admin-flex-wrap`.

---

## 2. Logic Chain

1. **Layout Consistency**: Removing `maxWidth: 900` at line 785 restores full-width fluid grid behavior matching all other tabs in the Admin Panel.
2. **Table Uniformity**: Updating `borderRadius` to `10px`, cell paddings to `"9px 10px"`, adding `position: "sticky"` to `thead`, and correcting `colSpan={5}` aligns table rendering perfectly with `TramitesPage`.
3. **Component Reusability**: Replacing custom `<span>` inline styles with `<Badge color={c.esAdmin ? C.danger : C.success}>` enforces system-wide design token usage.
4. **Modal Visual Quality**: Replacing `var(--colorNeutralBackground1)` with translucent dark overlay `rgba(0,0,0,0.6)` + `backdropFilter: "blur(4px)"` and standardizing radii to `12px` (container) and `6px` (inputs/buttons) ensures modal design consistency across the application.
5. **Toolbar Functionality**: Adding `search`, `filterRole`, and `filterPlan` state variables along with an `admin-flex-wrap` container allows instant filtering of buyer rows by email keyword, role type (Admin/Cliente), and plan type (Premium/Gratis).

---

## 3. Caveats

- **Scope boundary**: This blueprint addresses only M1 visual layout and refactoring specifications. Accessibility ARIA attributes, keyboard focus trapping, ESC key handlers, and color contrast enhancements are part of Milestone 2 (M2_Accessibility_ARIA).
- **Firestore Schema**: `filteredCompradores` operates entirely on client-side state obtained from the active Firestore `onSnapshot` listener. No additional Firestore queries or indexes are required.

---

## 4. Conclusion

`CompradoresPage` in `src/app/AdminDashboard.tsx` can be completely refactored by making exact line-by-line edits without breaking existing state contracts or component props.

### Detailed Refactoring Blueprint

#### Edit 1: State Declarations in `CompradoresPage` (around line 726)
Add search and filter state:
```tsx
  // Search & Filter State
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<"all" | "admin" | "cliente">("all");
  const [filterPlan, setFilterPlan] = useState<"all" | "premium" | "gratis">("all");
```

#### Edit 2: Filter Logic (around line 783)
Insert filtered list computation:
```tsx
  const filteredCompradores = compradores.filter(c => {
    const matchSearch = c.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" ? true : filterRole === "admin" ? c.esAdmin : !c.esAdmin;
    const matchPlan = filterPlan === "all" ? true : filterPlan === "premium" ? c.isPremium : !c.isPremium;
    return matchSearch && matchRole && matchPlan;
  });
```

#### Edit 3: Container Width & Filter Toolbar (lines 785–794)
Replace line 785 container and add `admin-flex-wrap` toolbar:
```tsx
  return (
    <div className="admin-main-padding" style={{ padding: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ color: C.textPrimary, fontSize: 20, fontWeight: 700, margin: 0 }}>Gestión de Compradores</h2>
          <p style={{ color: C.textMuted, fontSize: 13, marginTop: 4 }}>Controla el acceso autorizado a la plataforma y asigna roles de administración.</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} style={{ display: "flex", alignItems: "center", gap: 6, background: C.primary, color: "#fff", border: "none", borderRadius: 8, padding: "10px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
          <Plus size={15} /> Agregar Comprador
        </button>
      </div>

      <div className="admin-flex-wrap" style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center" }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por email..."
          style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, color: C.textPrimary, padding: "8px 12px", fontSize: 13, width: 260, outline: "none" }}
        />
        <select
          value={filterRole}
          onChange={e => setFilterRole(e.target.value as any)}
          style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, color: C.textMuted, padding: "8px 12px", fontSize: 13, outline: "none" }}
        >
          <option value="all">Todos los roles</option>
          <option value="admin">Administrador</option>
          <option value="cliente">Cliente</option>
        </select>
        <select
          value={filterPlan}
          onChange={e => setFilterPlan(e.target.value as any)}
          style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, color: C.textMuted, padding: "8px 12px", fontSize: 13, outline: "none" }}
        >
          <option value="all">Todos los planes</option>
          <option value="premium">Premium</option>
          <option value="gratis">Gratis</option>
        </select>
      </div>
```

#### Edit 4: Table Container & Sticky Header (lines 796–804)
Update border radius, sticky header, cell padding, and header font size:
```tsx
      <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 10, overflow: "auto" }}>
        <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ position: "sticky", top: 0, background: C.card, zIndex: 1 }}>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {["Email", "Rol", "Premium", "Creado el", "Acciones"].map(h => (
                <th key={h} style={{ color: C.textMuted, fontSize: 11, fontWeight: 600, textAlign: "left", padding: "9px 10px", borderBottom: `1px solid ${C.border}`, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
```

#### Edit 5: Table Rows, Cell Padding & Shared Badge (lines 808–853)
Update `colSpan` to 5, cell paddings to `"9px 10px"`, map over `filteredCompradores`, and replace custom role span with `<Badge>`:
```tsx
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "40px 0", color: C.textMuted }}>
                  <div style={{ display: "inline-block", width: 24, height: 24, borderRadius: "50%", border: `2px solid ${C.primary}33`, borderTopColor: C.primary, animation: "spin .8s linear infinite" }} />
                  <div style={{ marginTop: 8, fontSize: 13 }}>Cargando compradores…</div>
                </td>
              </tr>
            ) : filteredCompradores.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "40px 0", color: C.textMuted, fontSize: 13 }}>
                  No hay compradores registrados en el sistema.
                </td>
              </tr>
            ) : filteredCompradores.map(c => {
              const dateStr = c.createdAt?.toDate ? c.createdAt.toDate().toLocaleString() : (c.createdAt ? new Date(c.createdAt).toLocaleString() : "N/A");
              return (
                <tr key={c.email} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "9px 10px", color: C.textPrimary, fontSize: 13, fontWeight: 600 }}>{c.email}</td>
                  <td style={{ padding: "9px 10px" }}>
                    <Badge color={c.esAdmin ? C.danger : C.success}>
                      {c.esAdmin ? "Administrador" : "Cliente"}
                    </Badge>
                  </td>
                  <td style={{ padding: "9px 10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
                      <span style={{ fontSize: 12, color: c.isPremium ? "#c084fc" : C.textMuted, fontWeight: 600 }}>{c.isPremium ? 'Premium' : 'Gratis'}</span>
                    </div>
                  </td>
                  <td style={{ padding: "9px 10px", color: C.textMuted, fontSize: 12 }}>{dateStr}</td>
                  <td style={{ padding: "9px 10px", display: "flex", gap: 6 }}>
                    <button onClick={() => handleDelete(c.email)} style={{ background: "rgba(239,68,68,.08)", border: `1px solid rgba(239,68,68,.2)`, borderRadius: 6, color: C.danger, cursor: "pointer", padding: "6px 10px", fontSize: 12, fontWeight: 600, transition: "background .2s" }}>
                      Revocar Acceso
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
```

#### Edit 6: Modal Overlay & Inputs (lines 860–890)
Update overlay background, backdrop filter, and radii:
```tsx
      {/* Create Modal overlay */}
      {showCreateModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 12, width: "100%", maxWidth: 440, padding: 24, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.5)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h3 style={{ color: C.textPrimary, fontSize: 16, fontWeight: 700, margin: 0 }}>Agregar Nuevo Comprador</h3>
              <button onClick={() => setShowCreateModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted }}><X size={18} /></button>
            </div>

            <form onSubmit={handleAdd} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", color: C.textMuted, fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: "uppercase" }}>Correo Electrónico</label>
                <input type="email" placeholder="ejemplo@gmail.com" value={email} onChange={e => setEmail(e.target.value)} required
                  style={{ width: "100%", background: "var(--colorNeutralBackgroundHover)", border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 14px", color: C.textPrimary, fontSize: 13, outline: "none" }} />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: "var(--colorNeutralBackgroundHover)", border: `1px solid ${C.border}`, borderRadius: 6 }}>
                <input type="checkbox" id="chkAdmin" checked={esAdmin} onChange={e => setEsAdmin(e.target.checked)} style={{ cursor: "pointer", width: 16, height: 16 }} />
                <label htmlFor="chkAdmin" style={{ color: C.textPrimary, fontSize: 13, cursor: "pointer", userSelect: "none" }}>
                  Asignar permisos de Administrador
                </label>
              </div>

              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
                <button type="button" onClick={() => setShowCreateModal(false)} style={{ background: "var(--colorNeutralBackgroundHover)", border: `1px solid ${C.border}`, borderRadius: 6, color: C.textMuted, padding: "10px 18px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                  Cancelar
                </button>
                <button type="submit" disabled={submitting} style={{ background: C.primary, color: "#fff", border: "none", borderRadius: 6, padding: "10px 18px", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                  {submitting && <Loader2 size={14} className="animate-spin" />}
                  Autorizar Acceso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
```

---

## 5. Verification Method

To verify these changes after implementation:

1. **TypeScript Type Check**:
   ```bash
   npx tsc --noEmit
   ```
   Must compile cleanly without errors.

2. **Vite Application Build**:
   ```bash
   npm run build
   ```
   Must output build artifacts in `dist/` with 0 errors.

3. **Visual Verification**:
   - Inspect `CompradoresPage` container width: verify it spans full available width matching `OverviewPage`.
   - Inspect table: verify sticky header on scrolling, `padding: 9px 10px`, and container `borderRadius: 10px`.
   - Inspect role badges: verify rendered using `<Badge>` component.
   - Open Create Comprador modal: verify dark translucent backdrop `rgba(0,0,0,0.6)` with blur, `12px` container radius, and `6px` input/button radius.
   - Test toolbar: type in search input and toggle role/plan filters to confirm real-time filtering of buyer rows.

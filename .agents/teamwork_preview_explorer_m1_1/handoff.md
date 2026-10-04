# Refactoring Blueprint & Investigation Handoff Report: Milestone 1 (M1_Layout_Refactor)

## 1. Observation
Direct codebase inspection of `src/app/AdminDashboard.tsx` revealed the following exact current states:

- **Observation 1 (Container Width Constraint)**:
  Line 785 in `src/app/AdminDashboard.tsx`:
  ```tsx
  <div className="admin-main-padding" style={{ padding: 28, maxWidth: 900 }}>
  ```
  In contrast, `OverviewPage` (line 361) and `TramitesPage` (line 479) use `<div className="admin-main-padding" style={{ padding: 28 }}>` without `maxWidth: 900`.

- **Observation 2 (Table Container, Cell Padding & Sticky Header)**:
  Line 796: `<div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 12, overflow: "auto" }}>` uses `borderRadius: 12`.
  Line 798: `<thead>` is currently non-sticky (`<thead style={{ ... }}>` is missing `position: "sticky", top: 0, zIndex: 1`).
  Line 801: Header cell `<th>` uses `padding: "14px 16px"`.
  Lines 808 & 814: Loading and empty row state use `colSpan={4}` (should be `colSpan={5}`).
  Lines 823, 824, 829, 845, 846: Data cells `<td>` use `padding: "14px 16px"`.

- **Observation 3 (Inline Role Badge vs Shared Badge Component)**:
  Lines 824-828 in `src/app/AdminDashboard.tsx`:
  ```tsx
  <td style={{ padding: "14px 16px" }}>
    <span style={{ background: c.esAdmin ? `${C.danger}18` : `${C.success}18`, border: `1px solid ${c.esAdmin ? C.danger + "40" : C.success + "40"}`, color: c.esAdmin ? C.danger : C.success, fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6 }}>
      {c.esAdmin ? "Administrador" : "Cliente"}
    </span>
  </td>
  ```
  Line 128 defines the shared `Badge` component:
  ```tsx
  function Badge({ color, children }: { color: string; children: React.ReactNode })
  ```

- **Observation 4 (Modal Overlay Backdrop & Input Border Radius)**:
  Line 860 in `src/app/AdminDashboard.tsx`:
  ```tsx
  <div style={{ position: "fixed", inset: 0, background: "var(--colorNeutralBackground1)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", }}>
  ```
  Line 861: `<div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 16, width: "100%", maxWidth: 440, padding: 24, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.5)" }}>` uses `borderRadius: 16`.
  Line 871: Email `<input>` uses `borderRadius: 8`.
  Line 874: Checkbox container `<div>` uses `borderRadius: 8`.
  Lines 882 & 885: Action buttons use `borderRadius: 8`.

- **Observation 5 (Header Bar Flex Wrap & Filter Controls)**:
  Lines 786-794 in `src/app/AdminDashboard.tsx`: Header title container `<div style={{ display: "flex", ... }}>` lacks `admin-flex-wrap` class.
  Lines 723-732: `CompradoresPage` component lacks state for `search`, `roleFilter`, and `planFilter`.
  There is currently no search input field or role/plan filter dropdown toolbar in `CompradoresPage`.

---

## 2. Logic Chain

1. **Item 1 Reasoning**: Removing `maxWidth: 900` at line 785 directly resolves layout misalignment between `CompradoresPage` and fluid sibling tabs (`OverviewPage` and `TramitesPage`), fulfilling Requirement R1 / Feature 1.
2. **Item 2 Reasoning**: Standardizing table cell padding to `9px 10px`, container border radius to `10px`, and adding sticky position styling (`position: "sticky", top: 0, background: C.card, zIndex: 1`) aligns table structure with `TramitesPage` (lines 495-508), fulfilling Requirement R1 / Feature 2.
3. **Item 3 Reasoning**: Replacing the inline `<span>` style (lines 825-827) with `<Badge color={c.esAdmin ? C.danger : C.success}>{c.esAdmin ? "Administrador" : "Cliente"}</Badge>` reuses the shared component declared at line 128, eliminating code duplication and ensuring visual consistency (Requirement R1 / Feature 3).
4. **Item 4 Reasoning**: Replacing opaque `var(--colorNeutralBackground1)` modal overlay background (line 860) with `background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)"`, updating container border radius to `12px` (line 861), and input border radius to `6px` (line 871) unifies modal overlay design across the system (Requirement R1 / Feature 3).
5. **Item 5 Reasoning**: Adding `admin-flex-wrap` class to header containers and introducing `search`, `roleFilter`, and `planFilter` states along with an interactive search & filter toolbar standardizes the responsive header bar with `TramitesPage`, fulfilling Requirement R1 / Feature 4.

---

## 3. Caveats
- **Firebase Realtime Sync**: `CompradoresPage` uses real-time Firestore listeners (`onSnapshot(collection(db, "compradores"))`). The client-side filtering logic (`filteredCompradores`) should be performed on the snapshot data in memory without altering the Firestore subscription.
- **Accessibility Attributes**: M1 focuses strictly on visual layout, table styling, badge reuse, modal overlay, and toolbar responsiveness. Full ARIA roles and keyboard focus trap implementation belong to Milestone 2 (M2_Accessibility_ARIA).

---

## 4. Conclusion & Line-by-Line Refactoring Blueprint

### Line-by-Line Refactoring Blueprint for `src/app/AdminDashboard.tsx`:

#### Edit 1: State & Filter Calculation in `CompradoresPage` (Lines 728–746)
Add state hooks and client-side filtering logic:
```tsx
// Insert after line 731:
const [search, setSearch] = useState("");
const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "cliente">("all");
const [planFilter, setPlanFilter] = useState<"all" | "premium" | "gratis">("all");

// Insert after line 783 (before return statement):
const filteredCompradores = compradores.filter(c => {
  const matchSearch = c.email.toLowerCase().includes(search.toLowerCase());
  const matchRole = roleFilter === "all" || (roleFilter === "admin" ? c.esAdmin : !c.esAdmin);
  const matchPlan = planFilter === "all" || (planFilter === "premium" ? c.isPremium : !c.isPremium);
  return matchSearch && matchRole && matchPlan;
});
```

#### Edit 2: Outer Container & Header Bar (Lines 785–794)
Replace lines 785–794 to remove `maxWidth: 900`, add `admin-flex-wrap`, and add Search & Filter Toolbar:
```tsx
return (
  <div className="admin-main-padding" style={{ padding: 28 }}>
    <div className="admin-flex-wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
      <div>
        <h2 style={{ color: C.textPrimary, fontSize: 20, fontWeight: 700, margin: 0 }}>Gestión de Compradores</h2>
        <p style={{ color: C.textMuted, fontSize: 13, marginTop: 4 }}>Controla el acceso autorizado a la plataforma y asigna roles de administración.</p>
      </div>
    </div>

    {/* Header Toolbar / Filters */}
    <div className="admin-flex-wrap" style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center" }}>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Buscar por email..."
        style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, color: C.textPrimary, padding: "8px 12px", fontSize: 13, width: 260, outline: "none" }}
      />
      <select
        value={roleFilter}
        onChange={e => setRoleFilter(e.target.value as any)}
        style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, color: C.textMuted, padding: "8px 12px", fontSize: 13, outline: "none" }}
      >
        <option value="all">Todos los roles</option>
        <option value="admin">Administradores</option>
        <option value="cliente">Clientes</option>
      </select>
      <select
        value={planFilter}
        onChange={e => setPlanFilter(e.target.value as any)}
        style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, color: C.textMuted, padding: "8px 12px", fontSize: 13, outline: "none" }}
      >
        <option value="all">Todos los planes</option>
        <option value="premium">Premium</option>
        <option value="gratis">Gratis</option>
      </select>
      <button onClick={() => setShowCreateModal(true)} style={{ display: "flex", alignItems: "center", gap: 6, background: C.primary, color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600, marginLeft: "auto" }}>
        <Plus size={15} /> Agregar Comprador
      </button>
    </div>
```

#### Edit 3: Table Container & Sticky Header (Lines 796–804)
Replace table container and table header:
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

#### Edit 4: Table Body, Cell Padding & Shared Badge Component (Lines 806–854)
Replace `compradores.map` with `filteredCompradores.map`, update cell paddings to `9px 10px`, colSpans to `5`, and use `<Badge>`:
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

#### Edit 5: Create Comprador Modal Overlay & Inputs (Lines 858–893)
Replace modal overlay background, container border radius, input border radius, and button border radius:
```tsx
    {/* Create Modal overlay */}
    {showCreateModal && (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
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

To independently verify the blueprint:

1. **TypeScript Typecheck**:
   ```powershell
   npx tsc --noEmit
   ```
   *Expected result*: Exit code 0 with 0 errors.

2. **Vite Production Build**:
   ```powershell
   npm run build
   ```
   *Expected result*: Exit code 0 with successful bundle generation.

3. **Visual Alignment Verification**:
   - Open Admin Dashboard in browser on `CompradoresPage`.
   - Verify top header bar spans full available width without 900px constraint.
   - Verify table cell padding measures `9px 10px` and header `<thead>` stays fixed at top upon vertical scroll.
   - Verify Role column uses `<Badge>` pill styling.
   - Click "Agregar Comprador": verify dark translucent backdrop `rgba(0,0,0,0.6)` with background blur `4px`, modal container radius `12px`, and input radius `6px`.
   - Test search input and role/plan select filters.

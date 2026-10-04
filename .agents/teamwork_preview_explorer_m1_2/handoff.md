# Handoff Report: Explorer 2 - CompradoresPage Layout & Styling Blueprint (Milestone 1)

## 1. Observation
Direct analysis of `src/app/AdminDashboard.tsx` (specifically `CompradoresPage`, lines 715–896) and system styles revealed five layout and styling inconsistencies:

- **Obs 1 (Container Max-Width)**: At line 785, `CompradoresPage` renders:
  ```tsx
  <div className="admin-main-padding" style={{ padding: 28, maxWidth: 900 }}>
  ```
  `maxWidth: 900` restricts the container width, causing visual misalignment with fluid pages like `OverviewPage` (line 361) and `TramitesPage` (line 479) which use `<div className="admin-main-padding" style={{ padding: 28 }}>`.

- **Obs 2 (Table Styling & Sticky Header)**:
  - Container at line 796 uses `borderRadius: 12`:
    ```tsx
    <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 12, overflow: "auto" }}>
    ```
  - Header `thead` at lines 798–804 is unstyled without `position: "sticky"`:
    ```tsx
    <thead>
      <tr style={{ borderBottom: `1px solid ${C.border}` }}>
        {["Email", "Rol", "Premium", "Creado el", "Acciones"].map(h => (
          <th key={h} style={{ color: C.textMuted, fontSize: 12, fontWeight: 600, textAlign: "left", padding: "14px 16px", textTransform: "uppercase" }}>{h}</th>
        ))}
      </tr>
    </thead>
    ```
  - Cells at lines 801 and 823–850 use padding `"14px 16px"`, whereas standard table cells in `TramitesPage` (lines 475–476) use padding `"9px 10px"` and `borderRadius: 10`.

- **Obs 3 (Custom Inline Role Badge)**: At lines 825–827, roles are rendered with an inline `<span>`:
  ```tsx
  <span style={{ background: c.esAdmin ? `${C.danger}18` : `${C.success}18`, border: `1px solid ${c.esAdmin ? C.danger + "40" : C.success + "40"}`, color: c.esAdmin ? C.danger : C.success, fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6 }}>
    {c.esAdmin ? "Administrador" : "Cliente"}
  </span>
  ```
  The rest of the dashboard uses the shared `<Badge>` component (defined at line 128):
  ```tsx
  function Badge({ color, children }: { color: string; children: React.ReactNode })
  ```

- **Obs 4 (Create Comprador Modal Overlay & Input Styling)**:
  - Overlay backdrop at line 860 uses opaque background:
    ```tsx
    <div style={{ position: "fixed", inset: 0, background: "var(--colorNeutralBackground1)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
    ```
  - Modal card container at line 861 uses `borderRadius: 16`:
    ```tsx
    <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 16, width: "100%", maxWidth: 440, padding: 24, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.5)" }}>
    ```
  - Input field at line 872 uses `borderRadius: 8`:
    ```tsx
    <input type="email" ... style={{ width: "100%", background: "var(--colorNeutralBackgroundHover)", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.textPrimary, fontSize: 13, outline: "none" }} />
    ```

- **Obs 5 (Header Toolbar & Responsive Wrapping)**:
  - Lines 786–794 render a rigid title/button flex row without `admin-flex-wrap` and lacking search or role/plan filter controls:
    ```tsx
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
      ...
      <button onClick={() => setShowCreateModal(true)} ...>Agregar Comprador</button>
    </div>
    ```
  - Class `admin-flex-wrap` is already defined in global dashboard CSS (lines 993–994):
    ```css
    .admin-flex-wrap { flex-wrap: wrap !important; }
    .admin-flex-wrap > * { flex: 1 1 auto; }
    ```

---

## 2. Logic Chain
1. **Container Alignment**: Removing `maxWidth: 900` at line 785 allows `CompradoresPage` to expand fluidly across screen widths, achieving 100% visual alignment with `OverviewPage` and `TramitesPage`.
2. **Table Uniformity**:
   - Changing container border radius from `12px` to `10px` matches `OverviewPage` (line 370) and `TramitesPage` (line 495).
   - Making `thead` sticky (`position: "sticky", top: 0, background: C.card, zIndex: 1`) ensures table headers remain visible when scrolling large buyer lists.
   - Reducing cell padding from `"14px 16px"` to `"9px 10px"` increases data density and unifies cell dimensions across all dashboard tables.
   - Adding row hover state (`onMouseEnter`/`onMouseLeave` with `rgba(59,130,246,.04)`) matches `TramitesPage` row interaction.
3. **Badge Standardization**: Replacing the inline `<span>` with `<Badge color={c.esAdmin ? C.danger : C.success}>` reuses the central badge utility, ensuring consistent opacity, font size, border, and padding.
4. **Modal Backdrop & Input Radii**:
   - Replacing opaque `var(--colorNeutralBackground1)` with `background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)"` aligns modal overlays across the platform.
   - Adjusting modal container border radius to `12px` and input border radius to `6px` aligns input elements with system design standards.
5. **Toolbar & Filter Functionality**:
   - Introducing state variables (`search`, `roleFilter`, `planFilter`) and wrapping controls in `<div className="admin-flex-wrap">` allows real-time filtering of buyers by email, role, or subscription plan while ensuring responsive wrapping on mobile devices.

---

## 3. Caveats
- **Read-Only Constraint**: Explorer 2 performed read-only static analysis and layout mapping without modifying application source files directly.
- **State Filtering**: Filtering is client-side over the `compradores` state fetched via Firebase `onSnapshot`. No additional database indexes or queries are required.
- **ColSpan Correction**: Updated `colSpan` from 4 to 5 for loading and empty state rows to match the 5 header columns (`Email`, `Rol`, `Premium`, `Creado el`, `Acciones`).

---

## 4. Conclusion & Line-by-Line Refactoring Blueprint

### Target File: `src/app/AdminDashboard.tsx`

#### Chunk 1: State Variables & Filter Logic (`CompradoresPage`)
**Lines 723–732**:
*Replace:*
```tsx
function CompradoresPage() {
  const [compradores, setCompradores] = useState<Comprador[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Create Form State
  const [email, setEmail] = useState("");
  const [esAdmin, setEsAdmin] = useState(false);
  const [submitting, setSubmitting] = useState(false);
```

*With:*
```tsx
function CompradoresPage() {
  const [compradores, setCompradores] = useState<Comprador[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Filter States
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "cliente">("all");
  const [planFilter, setPlanFilter] = useState<"all" | "premium" | "gratis">("all");

  // Create Form State
  const [email, setEmail] = useState("");
  const [esAdmin, setEsAdmin] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const filteredCompradores = compradores.filter(c => {
    const matchSearch = c.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || (roleFilter === "admin" ? c.esAdmin : !c.esAdmin);
    const matchPlan = planFilter === "all" || (planFilter === "premium" ? c.isPremium : !c.isPremium);
    return matchSearch && matchRole && matchPlan;
  });
```

---

#### Chunk 2: Container, Header Toolbar, Table, Badges & Modal Overlay
**Lines 784–894**:
*Replace:*
```tsx
  return (
    <div className="admin-main-padding" style={{ padding: 28, maxWidth: 900 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ color: C.textPrimary, fontSize: 20, fontWeight: 700, margin: 0 }}>Gestión de Compradores</h2>
          <p style={{ color: C.textMuted, fontSize: 13, marginTop: 4 }}>Controla el acceso autorizado a la plataforma y asigna roles de administración.</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} style={{ display: "flex", alignItems: "center", gap: 6, background: C.primary, color: "#fff", border: "none", borderRadius: 8, padding: "10px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
          <Plus size={15} /> Agregar Comprador
        </button>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 12, overflow: "auto" }}>
        <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {["Email", "Rol", "Premium", "Creado el", "Acciones"].map(h => (
                <th key={h} style={{ color: C.textMuted, fontSize: 12, fontWeight: 600, textAlign: "left", padding: "14px 16px", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "40px 0", color: C.textMuted }}>
                  <div style={{ display: "inline-block", width: 24, height: 24, borderRadius: "50%", border: `2px solid ${C.primary}33`, borderTopColor: C.primary, animation: "spin .8s linear infinite" }} />
                  <div style={{ marginTop: 8, fontSize: 13 }}>Cargando compradores…</div>
                </td>
              </tr>
            ) : compradores.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "40px 0", color: C.textMuted, fontSize: 13 }}>
                  No hay compradores registrados en el sistema.
                </td>
              </tr>
            ) : compradores.map(c => {
              const dateStr = c.createdAt?.toDate ? c.createdAt.toDate().toLocaleString() : (c.createdAt ? new Date(c.createdAt).toLocaleString() : "N/A");
              return (
                <tr key={c.email} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "14px 16px", color: C.textPrimary, fontSize: 13, fontWeight: 600 }}>{c.email}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ background: c.esAdmin ? `${C.danger}18` : `${C.success}18`, border: `1px solid ${c.esAdmin ? C.danger + "40" : C.success + "40"}`, color: c.esAdmin ? C.danger : C.success, fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6 }}>
                      {c.esAdmin ? "Administrador" : "Cliente"}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
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
                  <td style={{ padding: "14px 16px", color: C.textMuted, fontSize: 12 }}>{dateStr}</td>
                  <td style={{ padding: "14px 16px", display: "flex", gap: 6 }}>
                    <button onClick={() => handleDelete(c.email)} style={{ background: "rgba(239,68,68,.08)", border: `1px solid rgba(239,68,68,.2)`, borderRadius: 6, color: C.danger, cursor: "pointer", padding: "6px 10px", fontSize: 12, fontWeight: 600, transition: "background .2s" }}>
                      Revocar Acceso
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Create Modal overlay */}
      {showCreateModal && (
        <div style={{ position: "fixed", inset: 0, background: "var(--colorNeutralBackground1)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",  }}>
          <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 16, width: "100%", maxWidth: 440, padding: 24, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.5)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h3 style={{ color: C.textPrimary, fontSize: 16, fontWeight: 700, margin: 0 }}>Agregar Nuevo Comprador</h3>
              <button onClick={() => setShowCreateModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted }}><X size={18} /></button>
            </div>

            <form onSubmit={handleAdd} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", color: C.textMuted, fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: "uppercase" }}>Correo Electrónico</label>
                <input type="email" placeholder="ejemplo@gmail.com" value={email} onChange={e => setEmail(e.target.value)} required
                  style={{ width: "100%", background: "var(--colorNeutralBackgroundHover)", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.textPrimary, fontSize: 13, outline: "none" }} />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: "var(--colorNeutralBackgroundHover)", border: `1px solid ${C.border}`, borderRadius: 8 }}>
                <input type="checkbox" id="chkAdmin" checked={esAdmin} onChange={e => setEsAdmin(e.target.checked)} style={{ cursor: "pointer", width: 16, height: 16 }} />
                <label htmlFor="chkAdmin" style={{ color: C.textPrimary, fontSize: 13, cursor: "pointer", userSelect: "none" }}>
                  Asignar permisos de Administrador
                </label>
              </div>

              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
                <button type="button" onClick={() => setShowCreateModal(false)} style={{ background: "var(--colorNeutralBackgroundHover)", border: `1px solid ${C.border}`, borderRadius: 8, color: C.textMuted, padding: "10px 18px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                  Cancelar
                </button>
                <button type="submit" disabled={submitting} style={{ background: C.primary, color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                  {submitting && <Loader2 size={14} className="animate-spin" />}
                  Autorizar Acceso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
```

*With:*
```tsx
  return (
    <div className="admin-main-padding" style={{ padding: 28 }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ color: C.textPrimary, fontSize: 20, fontWeight: 700, margin: 0 }}>Gestión de Compradores</h2>
        <p style={{ color: C.textMuted, fontSize: 13, marginTop: 4 }}>Controla el acceso autorizado a la plataforma y asigna roles de administración.</p>
      </div>

      <div className="admin-flex-wrap" style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center" }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por email..."
          style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, color: C.textPrimary, padding: "8px 12px", fontSize: 13, width: 240, outline: "none" }}
        />
        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value as any)}
          style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, color: C.textMuted, padding: "8px 12px", fontSize: 13, outline: "none" }}
        >
          <option value="all">Todos los roles</option>
          <option value="admin">Administrador</option>
          <option value="cliente">Cliente</option>
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
        <button
          onClick={() => setShowCreateModal(true)}
          style={{ display: "flex", alignItems: "center", gap: 6, background: C.primary, color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600, marginLeft: "auto" }}
        >
          <Plus size={15} /> Agregar Comprador
        </button>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 10, overflow: "auto" }}>
        <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ position: "sticky", top: 0, background: C.card, zIndex: 1 }}>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {["Email", "Rol", "Premium", "Creado el", "Acciones"].map(h => (
                <th key={h} style={{ color: C.textMuted, fontSize: 11, fontWeight: 600, textAlign: "left", padding: "9px 10px", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
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
                <tr key={c.email} style={{ borderBottom: `1px solid ${C.border}`, transition: "background .1s" }} onMouseEnter={e => (e.currentTarget.style.background = "rgba(59,130,246,.04)")} onMouseLeave={e => (e.currentTarget.style.background = "none")}>
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
        </table>
      </div>

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
    </div>
  );
```

---

## 5. Verification Method

### Automated Commands
1. **Typecheck Verification**:
   Run `npx tsc --noEmit` from workspace root `d:\proyecto_abril\portal-tramites` to verify zero TypeScript errors.
2. **Build Verification**:
   Run `npm run build` from workspace root `d:\proyecto_abril\portal-tramites` to ensure production bundle compiles cleanly.

### Structural DOM Inspection
1. **Container Width**: Inspect top div of `CompradoresPage` and confirm `maxWidth: 900` inline style is absent.
2. **Table Layout**: Inspect `table` element and verify `thead` has `position: sticky; top: 0px`. Inspect `th` and `td` elements and verify padding is `9px 10px` and table wrapper container has `border-radius: 10px`.
3. **Role Badges**: Verify role badges use `<Badge>` component instead of inline `<span>`.
4. **Modal Backdrop & Input**: Open "Agregar Comprador" modal, verify overlay style includes `background: rgba(0,0,0,0.6)` and `backdrop-filter: blur(4px)`, container `border-radius: 12px`, input `border-radius: 6px`.
5. **Toolbar & Filters**: Verify search field and role/plan select filters work as expected and wrapper div has class `admin-flex-wrap`.

### Invalidation Conditions
- Any TypeScript errors on `Comprador` state or filter types.
- Misaligned padding or header non-stickiness in DOM inspector.

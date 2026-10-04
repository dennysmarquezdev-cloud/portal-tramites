# Handoff Report — Explorer 2 (Keyboard Navigation, Focus Trap & ESC Listener)

## 1. Observation
Direct inspection of `d:\proyecto_abril\portal-tramites\src\app\AdminDashboard.tsx` revealed four (4) distinct modal implementations across different sections:

1. **`TramiteFormModal` Component**:
   - **Location**: `src/app/AdminDashboard.tsx` (Lines 159–255).
   - **Render Trigger**: `src/app/AdminDashboard.tsx` (Lines 543–545).
   - **Container Element**: Line 182 (`<div style={{ background: C.card, border: ... }}>`).
   - **Observed Behavior**: Lacks keyboard focus trapping (Tab cycles out of modal), lacks `ESC` key dismiss listener, lacks initial autofocus on modal mount, lacks focus restoration to trigger button on unmount, and lacks `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.

2. **`ConfirmDialog` Component**:
   - **Location**: `src/app/AdminDashboard.tsx` (Lines 257–275).
   - **Render Trigger**: `src/app/AdminDashboard.tsx` (Lines 546–548).
   - **Container Element**: Line 260 (`<div style={{ background: C.card, border: ... }}>`).
   - **Observed Behavior**: Lacks focus trapping, `ESC` key handler, auto-focus on safety action ("Cancelar" button), and focus restoration.

3. **Categorías Edit / Create Modal**:
   - **Location**: `src/app/AdminDashboard.tsx` (Lines 678–709).
   - **Render Trigger**: Line 678 (`{(editingCat || showCreateModal) && ...}`).
   - **Container Element**: Line 680 (`<div style={{ background: C.card, ... }}>`).
   - **Observed Behavior**: Lacks focus trapping, `ESC` key handler, autofocus on name input (`line 684`), and focus restoration.

4. **Compradores Create Modal**:
   - **Location**: `src/app/AdminDashboard.tsx` (Lines 898–932).
   - **Render Trigger**: Line 898 (`{showCreateModal && ...}`).
   - **Container Element**: Line 900 (`<div style={{ background: C.card, ... }}>`).
   - **Observed Behavior**: Lacks backdrop click dismiss on line 899 overlay, lacks focus trapping, `ESC` key listener, autofocus on email input (`line 909`), and focus restoration.

---

## 2. Logic Chain

1. **Observation**: All 4 modals in `AdminDashboard.tsx` are built with standard CSS fixed overlays (`position: "fixed", inset: 0`) and inner dialog divs, but none trap keyboard focus or handle `ESC` key events.
2. **Inference**: Screen reader users and keyboard-only users pressing <kbd>Tab</kbd> will navigate out of the modal into hidden/background UI components. Pressing <kbd>Escape</kbd> currently has no effect, violating WCAG 2.1 AA (2.1.1 Keyboard Navigation, 2.1.2 No Keyboard Trap, 2.4.3 Focus Order).
3. **Design Solution**: A custom React hook `useFocusTrap` encapsulates:
   - Storing `document.activeElement` on mount to restore focus on unmount.
   - Setting initial focus on mount (e.g. first input, select, or explicitly targeted element like the "Cancelar" button in confirmation dialogs).
   - Listening to `keydown` events on `window` to intercept <kbd>Escape</kbd> (triggering `onClose()`) and <kbd>Tab</kbd> / <kbd>Shift + Tab</kbd> (cycling focus strictly between the modal's first and last focusable elements).
   - Cleaning up event listeners and restoring focus to the trigger element when the modal closes.
4. **Integration Strategy**:
   - Placing `useFocusTrap` at the top of `AdminDashboard.tsx` (around line 125) or in `src/app/hooks/useFocusTrap.ts`.
   - Attaching `ref={modalRef}` to line 182 (`TramiteFormModal`), line 260 (`ConfirmDialog`), line 680 (`CategoriasPage` modal), and line 900 (`CompradoresPage` modal).

### Proposed `useFocusTrap` Hook Implementation
```typescript
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface UseFocusTrapOptions {
  isOpen: boolean;
  onClose?: () => void;
  autoFocusSelector?: string;
}

function useFocusTrap<T extends HTMLElement = HTMLDivElement>({
  isOpen,
  onClose,
  autoFocusSelector,
}: UseFocusTrapOptions) {
  const containerRef = useRef<T>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // 1. Save trigger element focus
    previousActiveElement.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    if (!container) return;

    // 2. Set initial autofocus
    const timer = setTimeout(() => {
      if (autoFocusSelector) {
        const initialEl = container.querySelector<HTMLElement>(autoFocusSelector);
        if (initialEl) {
          initialEl.focus();
          return;
        }
      }
      const focusables = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter(el => el.offsetWidth > 0 || el.offsetHeight > 0);
      if (focusables.length > 0) {
        focusables[0].focus();
      } else {
        container.focus();
      }
    }, 50);

    // 3. Handle Keydown (ESC & Tab)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const focusables = Array.from(
          container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        ).filter(el => el.offsetWidth > 0 || el.offsetHeight > 0);

        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first || !container.contains(document.activeElement)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last || !container.contains(document.activeElement)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // 4. Restore focus on cleanup
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === "function") {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose, autoFocusSelector]);

  return containerRef;
}
```

---

## 3. Caveats
- **Dynamic Content**: In `TramiteFormModal`, users can dynamically add/remove requirement and tip tags. The hook handles this by querying DOM nodes dynamically on each keypress rather than caching elements.
- **Nested Modals**: Modals in `AdminDashboard.tsx` are conditionally rendered independently (mutually exclusive in current flows). The hook's focus restoration handles stack unmounting cleanly.

---

## 4. Conclusion
Integrating the `useFocusTrap` custom hook across all 4 modals in `AdminDashboard.tsx` completes Feature 6 of Milestone 2 (M2_Accessibility_ARIA).

### Line Integration Reference in `AdminDashboard.tsx`:
1. **`TramiteFormModal`**:
   - Ref target: Line 182 (`<div ref={modalRef} ...>`).
   - Init call: `const modalRef = useFocusTrap({ isOpen: true, onClose });`.
2. **`ConfirmDialog`**:
   - Ref target: Line 260 (`<div ref={modalRef} ...>`).
   - Init call: `const modalRef = useFocusTrap({ isOpen: true, onClose, autoFocusSelector: "button:first-of-type" });`.
3. **`CategoriasPage` Modal**:
   - Ref target: Line 680 (`<div ref={modalRef} ...>`).
   - Init call: `const modalRef = useFocusTrap({ isOpen: !!(editingCat || showCreateModal), onClose: handleCloseModal });`.
4. **`CompradoresPage` Modal**:
   - Ref target: Line 900 (`<div ref={modalRef} ...>`).
   - Init call: `const modalRef = useFocusTrap({ isOpen: showCreateModal, onClose: handleCloseModal });`.

---

## 5. Verification Method
1. **TypeScript Typecheck**:
   ```bash
   npx tsc --noEmit
   ```
2. **Vite Application Build**:
   ```bash
   npm run build
   ```
3. **Manual / DOM Keyboard Verification**:
   - Open each modal in `AdminDashboard`.
   - Verify initial focus is automatically placed inside the modal container.
   - Press <kbd>Tab</kbd> repeatedly; verify focus wraps from the last interactive element back to the first.
   - Press <kbd>Shift + Tab</kbd> repeatedly; verify focus wraps from the first interactive element back to the last.
   - Press <kbd>Escape</kbd>; verify modal immediately dismisses.
   - Verify focus returns to the button that triggered the modal.

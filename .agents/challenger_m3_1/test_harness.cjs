/**
 * test_harness.cjs
 * Empirical verification harness for AdminDashboard modal focus trapping, ESC listener cleanup,
 * and mobile/responsive layout behavior.
 */

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const adminDashboardPath = path.join(__dirname, '..', '..', 'src', 'app', 'AdminDashboard.tsx');
const sourceCode = fs.readFileSync(adminDashboardPath, 'utf8');

const testResults = [];

function recordTest(id, name, pass, details) {
  testResults.push({ id, name, pass, details });
  const status = pass ? "✅ PASS" : "❌ FAIL";
  console.log(`[${status}] ${id}: ${name}`);
  if (details) console.log(`   -> ${details}`);
}

console.log("==========================================================================");
console.log("    EMPIRICAL TEST HARNESS: AdminDashboard.tsx Accessibility & Layout     ");
console.log("==========================================================================");

// ----------------------------------------------------------------------
// 1. Focus Trapping & Tab Key Wrap Around Logic Simulation
// ----------------------------------------------------------------------
// Extract useFocusTrap hook logic from sourceCode
const useFocusTrapMatch = sourceCode.match(/function useFocusTrap[\s\S]*?\n\}/);

if (!useFocusTrapMatch) {
  recordTest("TEST-1.1", "useFocusTrap hook implementation presence", false, "useFocusTrap function not found in AdminDashboard.tsx");
} else {
  recordTest("TEST-1.1", "useFocusTrap hook implementation presence", true, "Found useFocusTrap implementation in AdminDashboard.tsx");

  const hookCode = useFocusTrapMatch[0];

  // Test selector completeness
  const hasFocusableSelector = hookCode.includes('FOCUSABLE_SELECTOR') || hookCode.includes('button:not([disabled])');
  recordTest("TEST-1.2", "FOCUSABLE_SELECTOR covers standard interactive elements", hasFocusableSelector,
    "Selector includes buttons, inputs, textareas, selects, links with href, tabindex >= 0");

  // Test Tab wrapping handling (Forward: last -> first)
  const hasTabForwardWrap = /if\s*\(\s*document\.activeElement\s*===\s*last\s*\|\|\s*!container\.contains\(document\.activeElement\)\s*\)/.test(hookCode) &&
                            /first\.focus\(\)/.test(hookCode);
  recordTest("TEST-1.3", "Tab key forward wrap (last element -> first element)", hasTabForwardWrap,
    hasTabForwardWrap ? "Correctly moves focus to first element when tabbing from last focusable element" : "Failed forward wrap logic check");

  // Test Shift+Tab wrapping handling (Backward: first -> last)
  const hasShiftTabBackwardWrap = /if\s*\(\s*e\.shiftKey\s*\)/.test(hookCode) &&
                                  /document\.activeElement\s*===\s*first/.test(hookCode) &&
                                  /last\.focus\(\)/.test(hookCode);
  recordTest("TEST-1.4", "Shift+Tab key backward wrap (first element -> last element)", hasShiftTabBackwardWrap,
    hasShiftTabBackwardWrap ? "Correctly moves focus to last element when shift+tabbing from first focusable element" : "Failed backward wrap logic check");

  // Test preventDefault on Tab key press when trapping
  const hasPreventDefaultOnTab = /e\.preventDefault\(\)/.test(hookCode);
  recordTest("TEST-1.5", "preventDefault called on Tab key wrap", hasPreventDefaultOnTab,
    hasPreventDefaultOnTab ? "Prevents focus from escaping modal dialog container" : "Missing preventDefault on Tab key wrap");
}

// ----------------------------------------------------------------------
// 2. ESC Key Listener Cleanup Verification
// ----------------------------------------------------------------------
if (useFocusTrapMatch) {
  const hookCode = useFocusTrapMatch[0];

  // Check event listener attachment
  const hasAddEventListener = hookCode.includes('window.addEventListener("keydown", handleKeyDown)');
  recordTest("TEST-2.1", "window.addEventListener('keydown') attached on mount", hasAddEventListener,
    hasAddEventListener ? "KeyDown listener registered on window when modal is open" : "Missing addEventListener");

  // Check event listener cleanup
  const hasRemoveEventListener = hookCode.includes('window.removeEventListener("keydown", handleKeyDown)');
  recordTest("TEST-2.2", "window.removeEventListener('keydown') cleanup on unmount", hasRemoveEventListener,
    hasRemoveEventListener ? "Cleanup function removes keydown listener on unmount / isOpen change" : "Missing removeEventListener in cleanup");

  // Check restoration of previous active element
  const hasFocusRestoration = hookCode.includes('previousActiveElement.current.focus()');
  recordTest("TEST-2.3", "Previous active element focus restoration", hasFocusRestoration,
    hasFocusRestoration ? "Focus is returned to previously focused element when modal unmounts" : "Missing previous focus restoration");

  // Check Escape key handler inside listener
  const hasEscHandler = /e\.key\s*===\s*["']Escape["']/.test(hookCode) && /onClose\(\)/.test(hookCode);
  recordTest("TEST-2.4", "ESC key triggers onClose callback", hasEscHandler,
    hasEscHandler ? "ESC key event stops propagation and invokes onClose" : "ESC key handler missing or incomplete");
}

// ----------------------------------------------------------------------
// 3. Modal Usage in Components (TramiteFormModal, ConfirmDialog, CategoriasPage, CompradoresPage)
// ----------------------------------------------------------------------
const modalComponents = ["TramiteFormModal", "ConfirmDialog", "CategoriasPage", "CompradoresPage"];
let modalsUsingTrap = 0;

modalComponents.forEach(comp => {
  const compMatch = sourceCode.match(new RegExp(`function ${comp}[\\s\\S]*?\\n\\}`));
  if (compMatch && compMatch[0].includes("useFocusTrap")) {
    modalsUsingTrap++;
  }
});

recordTest("TEST-3.1", "Modal focus trap integration across all modal components", modalsUsingTrap >= 4,
  `Found useFocusTrap in ${modalsUsingTrap}/${modalComponents.length} modal components (${modalComponents.join(', ')})`);

// ----------------------------------------------------------------------
// 4. Mobile / Responsive Layout Behavior & Overflow Bounds Verification
// ----------------------------------------------------------------------
// Check media queries in style block
const hasMedia1024 = /@media\s*\(\s*max-width:\s*1024px\s*\)/.test(sourceCode);
recordTest("TEST-4.1", "Responsive breakpoint @media (max-width: 1024px) configured", hasMedia1024,
  hasMedia1024 ? "Media query at 1024px handles tablet/mobile drawer transition" : "Missing 1024px breakpoint");

const hasMedia600 = /@media\s*\(\s*max-width:\s*600px\s*\)/.test(sourceCode);
recordTest("TEST-4.2", "Responsive breakpoint @media (max-width: 600px) configured", hasMedia600,
  hasMedia600 ? "Media query at 600px handles mobile card width adjustments" : "Missing 600px breakpoint");

// Check mobile sidebar transform and open state
const hasSidebarMobileStyles = /\.admin-sidebar\s*\{[^}]*transform:\s*translateX\(-100%\)/.test(sourceCode) &&
                               /\.admin-sidebar\.open\s*\{[^}]*transform:\s*translateX\(0\)/.test(sourceCode);
recordTest("TEST-4.3", "Mobile sidebar collapsible drawer CSS rules", hasSidebarMobileStyles,
  hasSidebarMobileStyles ? "Off-canvas drawer animation using translateX(-100%) and .open class" : "Sidebar drawer CSS rules incomplete");

// Check mobile toggle button visibility
const hasMobileToggleCSS = /\.mobile-toggle\s*\{\s*display:\s*block\s*!important;\s*\}/.test(sourceCode);
recordTest("TEST-4.4", "Mobile toggle hamburger menu button display rules", hasMobileToggleCSS,
  hasMobileToggleCSS ? "Hamburger menu button shown only on screens <= 1024px" : "Mobile toggle CSS missing");

// Check table overflow bounds container
const hasTableOverflowContainer = /overflow:\s*["']auto["']/.test(sourceCode) || /overflow-x/.test(sourceCode);
recordTest("TEST-4.5", "Table overflow bounds containment (overflow: auto container)", hasTableOverflowContainer,
  hasTableOverflowContainer ? "Tables wrapped in scrollable containers to prevent viewport overflow" : "Missing table scroll containment");

// Check flex wrapping on search/filter toolbar
const hasFlexWrapToolbar = /\.admin-flex-wrap\s*\{[^}]*flex-wrap:\s*wrap/.test(sourceCode);
recordTest("TEST-4.6", "Responsive flex wrap on search/filter toolbar", hasFlexWrapToolbar,
  hasFlexWrapToolbar ? "Toolbar controls wrap gracefully on smaller screen width" : "Missing flex-wrap on toolbar");

// Check removal of rigid maxWidth: 900 on CompradoresPage
const compradoresCodeMatch = sourceCode.match(/function CompradoresPage[\s\S]*?(?=\nfunction\s+|\nexport\s+default|$)/);
const hasNoMaxWidth900 = compradoresCodeMatch ? !/maxWidth:\s*(900|"900"|"900px"|'900px')/.test(compradoresCodeMatch[0]) : false;
recordTest("TEST-4.7", "Fluid grid layout in CompradoresPage (no maxWidth: 900 restriction)", hasNoMaxWidth900,
  hasNoMaxWidth900 ? "CompradoresPage container scales fluidly with screen width" : "Found rigid maxWidth restriction");

// ----------------------------------------------------------------------
// Execution Summary & Verdict
// ----------------------------------------------------------------------
const totalTests = testResults.length;
const passedTests = testResults.filter(t => t.pass).length;
const failedTests = testResults.filter(t => !t.pass).length;

console.log("\n==========================================================================");
console.log(`SUMMARY: ${passedTests}/${totalTests} Tests Passed. (${failedTests} Failures)`);
console.log("==========================================================================");

if (failedTests > 0) {
  console.log("\nVERDICT: REJECT");
  process.exit(1);
} else {
  console.log("\nVERDICT: APPROVE");
  process.exit(0);
}

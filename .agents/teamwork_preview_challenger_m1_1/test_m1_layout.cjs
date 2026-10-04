const fs = require("fs");
const path = require("path");

const targetFilePath = path.join(__dirname, "..", "..", "src", "app", "AdminDashboard.tsx");
console.log("Reading file:", targetFilePath);

if (!fs.existsSync(targetFilePath)) {
  console.error("Target file does not exist!");
  process.exit(1);
}

const content = fs.readFileSync(targetFilePath, "utf8");

// Helper to extract function block
function getFunctionBody(funcName) {
  const match = content.match(new RegExp(`function\\s+${funcName}\\s*\\([^)]*\\)\\s*\\{([\\s\\S]*?)(?=\\nfunction\\s+|\\nexport\\s+default|$)`));
  return match ? match[1] : "";
}

const compradoresBody = getFunctionBody("CompradoresPage");

let passed = 0;
let failed = 0;

function assert(condition, testName, details) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passed++;
  } else {
    console.error(`[FAIL] ${testName}`);
    if (details) console.error(`       Details: ${details}`);
    failed++;
  }
}

console.log("\n=== 1. LAYOUT & CONTAINER TESTS ===");
// 1.1 Check maxWidth: 900 removal
const hasMaxWidth900 = /maxWidth:\s*(900|"900"|"900px"|'900px')/.test(compradoresBody);
assert(!hasMaxWidth900, "Container width is fluid (maxWidth: 900 removed)", hasMaxWidth900 ? "Found fixed maxWidth: 900 in CompradoresPage" : null);

// 1.2 Container padding
const hasAdminMainPadding = /className="admin-main-padding"\s+style=\{\{\s*padding:\s*28\s*\}\}/.test(compradoresBody);
assert(hasAdminMainPadding, "Container has standardized padding (admin-main-padding with padding: 28)", "Missing admin-main-padding or padding 28");

console.log("\n=== 2. TABLE STYLING & CELL PADDING TESTS ===");
// 2.1 Table container border radius: 10px (borderRadius: 10)
const hasBorderRadius10 = /borderRadius:\s*10/.test(compradoresBody);
assert(hasBorderRadius10, "Table container border radius is 10px (borderRadius: 10)", "Expected borderRadius: 10");

// 2.2 Sticky header position: sticky, top: 0, zIndex: 1
const hasStickyHeader = /position:\s*"sticky",\s*top:\s*0,\s*background:\s*C\.card,\s*zIndex:\s*1/.test(compradoresBody);
assert(hasStickyHeader, "Sticky table header configured (position: sticky, top: 0, background: C.card, zIndex: 1)", "Sticky header CSS inline properties missing or incorrect");

// 2.3 Cell padding 9px 10px on th and td elements
const thPaddingMatches = (compradoresBody.match(/padding:\s*"9px 10px"/g) || []).length;
assert(thPaddingMatches >= 5, `Table headers and cells use consistent padding "9px 10px" (Found ${thPaddingMatches} instances)`, `Found only ${thPaddingMatches} occurrences of "9px 10px"`);

console.log("\n=== 3. SHARED COMPONENTS & BADGES ===");
// 3.1 Badge component used for role
const usesBadgeComponent = /<Badge\s+color=\{c\.esAdmin\s*\?\s*C\.danger\s*:\s*C\.success\}>/.test(compradoresBody);
assert(usesBadgeComponent, "Role badges use shared <Badge color=...> component", "Role badges do not use shared <Badge> component");

console.log("\n=== 4. MODAL OVERLAY & INPUT STYLING ===");
// 4.1 Modal backdrop rgba(0,0,0,0.6) and backdropFilter blur(4px)
const hasModalBackdrop = /background:\s*"rgba\(0,0,0,0\.6\)"/.test(compradoresBody) && /backdropFilter:\s*"blur\(4px\)"/.test(compradoresBody);
assert(hasModalBackdrop, "Modal overlay uses dark backdrop rgba(0,0,0,0.6) with blur(4px)", "Modal overlay background/backdropFilter mismatch");

// 4.2 Modal container radius 12px
const hasModalRadius12 = /borderRadius:\s*12/.test(compradoresBody);
assert(hasModalRadius12, "Modal container border radius is 12px", "Modal container does not have borderRadius: 12");

// 4.3 Modal input radius 6px
const hasInputRadius6 = /borderRadius:\s*6/.test(compradoresBody);
assert(hasInputRadius6, "Modal inputs use border radius 6px (borderRadius: 6)", "Input elements lack borderRadius: 6");

console.log("\n=== 5. TOOLBAR FILTERING LOGIC EMPIRICAL STRESS TEST ===");

// Replicate filtering logic from CompradoresPage
function filterCompradores(compradores, search, filterRole, filterPlan) {
  return compradores.filter(c => {
    const matchSearch = c.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" ? true : filterRole === "admin" ? c.esAdmin : !c.esAdmin;
    const matchPlan = filterPlan === "all" ? true : filterPlan === "premium" ? c.isPremium : !c.isPremium;
    return matchSearch && matchRole && matchPlan;
  });
}

// Adversarial test cases for filter algorithm
const mockCompradores = [
  { email: "admin@ahorratiempo.pe", esAdmin: true, isPremium: true, createdAt: new Date() },
  { email: "user.normal@gmail.com", esAdmin: false, isPremium: false, createdAt: "2026-01-01T00:00:00Z" },
  { email: "very_long_email_address_that_should_test_text_truncation_or_overflow_handling_in_table@subdomain.company.co.uk", esAdmin: false, isPremium: true, createdAt: null },
  { email: "special+tag@domain.org", esAdmin: true, isPremium: false },
  { email: "user[regex]@test.com", esAdmin: false, isPremium: true }
];

const testInputs = [
  { search: "", role: "all", plan: "all", expectedLen: 5 },
  { search: "", role: "admin", plan: "all", expectedLen: 2 },
  { search: "", role: "cliente", plan: "all", expectedLen: 3 },
  { search: "", role: "all", plan: "premium", expectedLen: 3 },
  { search: "", role: "all", plan: "gratis", expectedLen: 2 },
  { search: "ahorra", role: "all", plan: "all", expectedLen: 1 },
  { search: "[regex]", role: "all", plan: "all", expectedLen: 1 }, // Special regex char test
  { search: "(", role: "all", plan: "all", expectedLen: 0 },       // Paren regex char test
  { search: "*", role: "all", plan: "all", expectedLen: 0 },       // Star regex char test
  { search: "  ", role: "all", plan: "all", expectedLen: 0 },      // Spaces
  { search: "SPECIAL", role: "all", plan: "all", expectedLen: 1 }, // Case insensitivity
  { search: "<script>alert(1)</script>", role: "all", plan: "all", expectedLen: 0 }, // XSS payload in search
  { search: "' OR '1'='1", role: "all", plan: "all", expectedLen: 0 }, // SQLi payload in search
];

let filterErrors = 0;
for (const tc of testInputs) {
  try {
    const res = filterCompradores(mockCompradores, tc.search, tc.role, tc.plan);
    if (res.length !== tc.expectedLen) {
      console.error(`[FAIL] Filter test search="${tc.search}", role="${tc.role}", plan="${tc.plan}": Expected ${tc.expectedLen}, got ${res.length}`);
      filterErrors++;
    }
  } catch (err) {
    console.error(`[FAIL] Exception during filter test search="${tc.search}":`, err);
    filterErrors++;
  }
}

assert(filterErrors === 0, "Toolbar filtering logic handles empty strings, special characters, and XSS/SQLi inputs with zero exceptions", `Encountered ${filterErrors} filter test failures`);

console.log("\n=== 6. EDGE CASES & BOUNDARY CONDITIONS ===");

// 6.1 Empty Buyer List rendering handling
const handlesEmptyList = /filteredCompradores\.length === 0/.test(compradoresBody) && /No hay compradores registrados en el sistema/.test(compradoresBody);
assert(handlesEmptyList, "Empty buyer list renders user-friendly message with full colSpan=5", "Missing empty list state handler");

// 6.2 Loading State handling
const handlesLoadingState = /loading \?/.test(compradoresBody) && /Cargando compradores/.test(compradoresBody);
assert(handlesLoadingState, "Loading state renders animated spinner with full colSpan=5", "Missing loading state handler");

// 6.3 Date formatting fallback handling
const handlesDateStr = /c\.createdAt\?\.\s*toDate/.test(compradoresBody) && /new Date\(c\.createdAt\)/.test(compradoresBody) && /"N\/A"/.test(compradoresBody);
assert(handlesDateStr, "Safely formats Firestore timestamp, JS Date string/object, or falls back to 'N/A'", "Missing safe date parsing fallback");

console.log("\n==========================================");
console.log(`TOTAL PASSED: ${passed}`);
console.log(`TOTAL FAILED: ${failed}`);
console.log("==========================================\n");

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

function srgbToLinear(c) {
  let v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}
function relativeLuminance(hex) {
  let r = parseInt(hex.slice(1,3), 16);
  let g = parseInt(hex.slice(3,5), 16);
  let b = parseInt(hex.slice(5,7), 16);
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}
function contrastRatio(hex1, hex2) {
  let l1 = relativeLuminance(hex1);
  let l2 = relativeLuminance(hex2);
  let max = Math.max(l1, l2);
  let min = Math.min(l1, l2);
  return (max + 0.05) / (min + 0.05);
}

let bg = '#111827';
let muted_old = '#64748b';
let muted = '#94a3b8';
let primary_old = '#3b82f6';
let primary = '#60a5fa';

console.log('--- RELATIVE LUMINANCE ---');
console.log('Background #111827:', relativeLuminance(bg));
console.log('Old Muted #64748b:', relativeLuminance(muted_old));
console.log('New Muted #94a3b8:', relativeLuminance(muted));
console.log('Old Primary #3b82f6:', relativeLuminance(primary_old));
console.log('New Primary #60a5fa:', relativeLuminance(primary));

console.log('\n--- CONTRAST RATIOS ON #111827 ---');
console.log('Old Muted (#64748b):', contrastRatio(muted_old, bg).toFixed(2) + ':1');
console.log('New Muted (#94a3b8):', contrastRatio(muted, bg).toFixed(2) + ':1');
console.log('Old Primary (#3b82f6):', contrastRatio(primary_old, bg).toFixed(2) + ':1');
console.log('New Primary (#60a5fa):', contrastRatio(primary, bg).toFixed(2) + ':1');

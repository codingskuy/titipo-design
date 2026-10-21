#!/usr/bin/env node
// Verifikasi kontras WCAG 2.x (rasio luminans relatif) untuk pasangan di tokens.json.
// Pakai: node tokens/verify-kontras.mjs   (keluar kode 1 bila ada pasangan < minimum)
// Alat verifikasi desain saja, bukan kode produk. Tanpa dependensi.
import { readFileSync } from 'node:fs';

const t = JSON.parse(readFileSync(new URL('./tokens.json', import.meta.url), 'utf8'));

const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
export function luminans(hex) {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => lin(parseInt(h.slice(i, i + 2), 16) / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function rasio(a, b) {
  const [hi, lo] = [luminans(a), luminans(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  let gagal = 0;
  for (const p of t.kontras.pasangan) {
    const d = t.warna[p.depan]?.nilai, b = t.warna[p.belakang]?.nilai;
    if (!d || !b) { console.log(`GALAT token tidak ada: ${p.nama}`); gagal++; continue; }
    const r = rasio(d, b);
    const ok = r >= t.kontras.minimum;
    if (!ok) gagal++;
    console.log(`${ok ? 'LULUS' : 'GAGAL'}  ${r.toFixed(2)}:1  ${p.nama}  (${d} / ${b})`);
  }
  console.log(`\n${t.kontras.pasangan.length - gagal}/${t.kontras.pasangan.length} lulus (minimum ${t.kontras.minimum}:1)`);
  process.exit(gagal ? 1 : 0);
}

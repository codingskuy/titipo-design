# Komponen: Rincian harga jujur

Tiket TTP-DSG-002; dipakai layar keranjang dan bayar (TTP-DSG-003). Acuan: `produk/10-ux-pesan-titip.md` §1 butir 2, AGENTS.md ("ongkir Rp5.000 selalu tampil di rincian"), `PRD/30-kriteria.md` US-001.

## Aturan

1. Format wajib: `Total item + Ongkir Rp5.000 = Total bayar`, tiap baris terpisah. Tidak ada biaya yang muncul belakangan.
2. Ongkir Rp5.000 selalu tampil, termasuk saat radius diperluas ke 10 km (ongkir tetap).
3. Total bayar = jumlah subtotal item + 5.000. Uang integer rupiah, tanpa desimal, pemisah titik.
4. Angka di mobile hanya pratinjau; hitungan sah milik server (`PRD/20-alur.md` Matriks Platform).

## Anatomi

| Baris | Gaya |
|---|---|
| Subtotal per item: "Bayam 2 kg" ... "Rp18.000" | `isi` 14/20, `teks-utama` |
| "Total item" ... "Rp47.000" | `isi`, `teks-utama` |
| "Ongkir" ... "Rp5.000" | `isi`, `teks-utama` |
| Garis pemisah | 1 dp, `teks-sekunder` |
| "Total bayar" ... "Rp52.000" | `judul` 20/28 bold, `teks-utama` |

## Contoh baku (mengikat)

Bayam 2 kg (Rp9.000/kg) = Rp18.000; Telur 1 kg (Rp29.000/kg) = Rp29.000; Total item Rp47.000; Ongkir Rp5.000; Total bayar Rp52.000.

Teks layar bayar (dari `produk/10-ux-pesan-titip.md` §2):
"Pindai QRIS Rp52.000 — Bayam 2 kg (Rp18.000) + Telur 1 kg (Rp29.000) + Ongkir Rp5.000. Berlaku 14:32."

Verifikasi hitung: 18.000 + 29.000 = 47.000; 47.000 + 5.000 = 52.000.

Catatan: "Berlaku 14:32" pada contoh dokumen produk berarti sisa timer 14:32 dari 15:00 (asumsi tafsiran; bukan jam dinding).

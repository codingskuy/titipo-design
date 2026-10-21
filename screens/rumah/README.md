# 5 layar rumah tangga (v1.0.0)

Tiket TTP-DSG-003. Acuan: `FSD/10-alur.md` §6, `produk/10-ux-pesan-titip.md` §2, `PRD/30-kriteria.md` US-001. Selaras dengan TTP-KMP-003 (implementasi). Token: [`../../tokens/`](../../tokens/README.md); flow: [`../../flows/flow-rumah-8-langkah.md`](../../flows/flow-rumah-8-langkah.md).

Urutan: 1 daftar vendor → 2 katalog vendor → 3 keranjang → 4 bayar QRIS → 5 lacak. Navigasi: Navigation3, graf `GrafRumah` dipilih dari klaim JWT peran (AGENTS.md app-kmp). Tidak ada layar admin di mobile.

Aturan umum semua layar: target sentuh >= 48 dp; kontras >= 4,5:1; tipografi dan warna dari token; uang `Rp` + titik ribuan, integer; bahasa Indonesia kalimat pendek.

## 1. Daftar vendor — `rumah/daftar-vendor`

| Elemen | Spesifikasi |
|---|---|
| Isi | Daftar kartu vendor radius 5 km, diurut jarak terdekat; kolom pencarian; filter Prioritas |
| Kartu | Nama, rating (mis. "4,9★"), estimasi serah "Besok 06.00–08.00", sisa kuota ("Sisa 12 titipan") |
| Memuat | Skeleton 3 kartu |
| Kosong | Ilustrasi + tombol "Coba radius 10 km" (ongkir tetap Rp5.000) |
| Aksi | Ketuk kartu → katalog vendor |
| Tag uji | `daftar-vendor`, `kartu-vendor-{id}` |

## 2. Katalog vendor — `rumah/katalog/{idVendor}`

| Elemen | Spesifikasi |
|---|---|
| Stempel | "Diperbarui 04.30" (waktu snapshot katalog) |
| Item | Nama, harga per kg, contoh subtotal 1 kg, stepper kg (target 48 dp) |
| Stok 0 | Tombol mati berlabel "Habis" |
| Kedaluwarsa (> 24 jam) | Banner `status-batal` "Katalog kedaluwarsa — tarik untuk muat ulang"; tombol pesan mati (maks tarik ulang 5 MB) |
| Aksi | "Ke keranjang" |
| Tag uji | `katalog`, `stepper-kg-{sku}`, `stempel-diperbarui` |

## 3. Keranjang — `rumah/keranjang`

| Elemen | Spesifikasi |
|---|---|
| Isi | Item + ubah jumlah; satu pesanan satu vendor |
| Jendela serah | Selalu tampil "Serah besok 06.00–08.00", terkunci (Varian 1) |
| Batas | Maks 20 kg dan 50 baris; validasi inline "Kelebihan 2 kg, kurangi"; tombol lanjut mati selama melebihi |
| Pesan di luar 05.00–20.00 | Tombol lanjut mati + keterangan jam pesan |
| Rincian | Komponen [rincian harga](../../tokens/komponen/rincian-harga.md) |
| Contoh | Bayam 2 kg Rp18.000 + Telur 1 kg Rp29.000; Total item Rp47.000; Ongkir Rp5.000; Total bayar **Rp52.000** |
| Aksi | "Bayar" → buat pesanan (checkout wajib online, `Idempotency-Key` ULID) |
| Tag uji | `keranjang`, `jendela-serah`, `total-bayar` |

## 4. Bayar QRIS — `rumah/bayar`

| Elemen | Spesifikasi |
|---|---|
| QRIS | Gambar QR + teks "Pindai QRIS Rp52.000 — Bayam 2 kg (Rp18.000) + Telur 1 kg (Rp29.000) + Ongkir Rp5.000. Berlaku 14:32." |
| Timer | Mundur dari 15:00 (`mm:ss`), tampil jelas di atas QR |
| Rincian | Komponen rincian harga; total bayar = total item + Ongkir Rp5.000 |
| Aksi | "Saya sudah bayar" |
| Timer habis | Layar kedaluwarsa + tombol "Buat ulang" (pesanan/ID baru) |
| Gagal bayar | Snackbar "Pembayaran gagal (kode G-102). Coba lagi." + tombol ulangi; maks 3 kali lalu buat QR baru |
| Luring | Galat jaringan biasa; checkout tidak masuk antrean |
| Tag uji | `bayar`, `timer-qris`, `tombol-sudah-bayar` |

## 5. Lacak — `rumah/lacak/{kode}`

| Elemen | Spesifikasi |
|---|---|
| Kode | Format `T-YYYY-NNNNNN` (mis. `T-2026-000112`); tampil di judul |
| Timeline | 8 langkah sesuai [flow](../../flows/flow-rumah-8-langkah.md), titik berwarna token `status-*` |
| Status awal | "Menunggu konfirmasi Sari (28 menit)" setelah lunas |
| Foto serah | Tampil di titik serah setelah vendor mengunggah |
| Rating | Tombol bintang 1–5; "Selesai" aktif hanya setelah rating dipilih |
| Tag uji | `lacak`, `timeline`, `rating-{1..5}`, `tombol-selesai` |

## Catatan ketidakselarasan dan asumsi

1. Batas berat: PRD/20-alur dan TTP-KMP-003 menetapkan keranjang maks 20 kg; KONTEKS-LINTAS-DIVISI dan AGENTS.md repo ini menyebut maks 50 kg per transaksi (di atasnya grosir). Spesifikasi layar mengikuti 20 kg (dokumen beku PRD); 50 kg kemungkinan batas event `transaksi.dibuat`. Belum diputuskan sepihak; perlu klarifikasi manusia.
2. README layar lama memuat `HomeList/HomeDetail/HomeSubscription/HomeTracking` (4 layar, ada Langganan). v1.0.0 mengunci 5 layar (tanpa Langganan; AGENTS.md melarang layar di luar 5+3). Nama route baru mengikuti `produk/10-ux-pesan-titip.md`; layar langganan dikeluarkan dan layar keranjang serta bayar ditambahkan. Nama komposable `Home*` di app-kmp perlu dipetakan oleh pemilik KMP.
3. Pemetaan warna timeline ke 8 titik (lihat flow) adalah asumsi.
4. Tautan Figma belum ada (lihat README repo).

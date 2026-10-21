# 3 layar vendor (v1.0.0)

Tiket TTP-DSG-004. Acuan: `FSD/10-alur.md` §6, `PRD/30-kriteria.md` (US-002, US-003), `produk/10-ux-pesan-titip.md` §3, `vendor/10-sla-vendor.md`. Selaras dengan TTP-KMP-004 (implementasi). Token: [`../../tokens/`](../../tokens/README.md); interaksi: [`../../flows/flow-vendor-2-ketukan.md`](../../flows/flow-vendor-2-ketukan.md).

Urutan: 1 masuk (daftar titip) → 2 kemas (checklist titik Lumbung) → 3 serah (kamera). Graf Navigation3 `GrafVendor`. Di SEMUA layar vendor terpasang [banner luring + badge antrean](../../tokens/komponen/banner-luring.md) pada bilah saat luring.

Aturan umum: target sentuh >= 48 dp; kontras >= 4,5:1; tipografi dan warna dari token.

## 1. Masuk daftar titip — `vendor/masuk`

| Elemen | Spesifikasi |
|---|---|
| Isi | Daftar titip hari ini, satu kartu per pesanan |
| Kartu | Kode `T-2026-NNNNNN`, item ringkas ("Bayam 2 kg, Telur 1 kg"), total (mis. Rp52.000), timer sisa menit konfirmasi |
| Timer | Mundur dari 30 menit sejak pesanan lunas, tampil "sisa 12 menit"; <= 5 menit berwarna `status-batal` (asumsi ambang) |
| Geser kanan | Terima |
| Geser kiri | Tolak + pilih alasan: "Stok habis" atau "Tutup" |
| Luring | Terima/Tolak tetap bisa; masuk antrean; toast "Tersimpan — terkirim otomatis saat online (antrean 2)." |
| Timeout | Lewat 30 menit: kartu hilang dari daftar, pesanan dialihkan sistem (job tiap 1 menit, maks 2 kali); kartu tampil "Dialihkan" |
| Kosong | "Belum ada titipan baru" |
| Tag uji | `vendor-masuk`, `kartu-titip-{kode}`, `timer-konfirmasi-{kode}`, `aksi-terima-{kode}`, `aksi-tolak-{kode}` |

## 2. Kemas — `vendor/kemas`

| Elemen | Spesifikasi |
|---|---|
| Isi | Checklist ambil di titik serah Lumbung (mis. "Lumbung Blok A") per item pesanan terkonfirmasi, dengan berat |
| Jendela | Ambil dan kemas 04.00-06.00 besok; tampil di atas |
| Aksi | Tombol "Siap serah" mati sampai SEMUA item dicentang |
| Luring | Centang disimpan lokal; "Siap serah" tidak masuk daftar aksi antre (hanya konfirmasi, tolak, tutup jadwal, foto serah boleh antre; TTP-KMP-004) |
| Tag uji | `vendor-kemas`, `centang-item-{sku}`, `tombol-siap-serah` |

## 3. Serah kamera — `vendor/serah/{kode}`

| Elemen | Spesifikasi |
|---|---|
| Jendela | Serah 06.00-08.00, toleransi 15 menit; selalu tampil |
| Kamera | Tombol kamera; foto 1280 px sisi panjang, dikompres <= 800 KB; pratinjau foto + "Ulangi" |
| Aksi | "Selesai serah" mati tanpa foto (fee ditahan; pesan "Foto wajib agar fee cair") |
| Foto ganda | Foto terakhir menang; foto lama diarsipkan |
| Luring | Foto tersimpan lokal dan masuk antrean (maks 20 foto/24 jam; lewat itu tombol dikunci + "Sambungkan internet") |
| Tag uji | `vendor-serah`, `tombol-kamera`, `pratinjau-foto`, `tombol-selesai-serah` |

## Catatan ketidakselarasan dan asumsi

1. `produk/10-ux-pesan-titip.md` §1 butir 3 menggambarkan 2 ketukan sebagai "push → layar detail → Terima/Tolak", sedangkan tabel layar §3 dan US-002 memakai geser kartu. Spesifikasi ini mengikuti US-002 (geser) dan menghitung ketukan dari push; tombol Terima/Tolak (48 dp) disediakan sebagai alternatif aksesibilitas pada layar detail. Perlu konfirmasi pemilik produk.
2. Tolak beralasan butuh pilihan alasan; agar tetap 2 ketukan dari daftar, alasan "Stok habis" menjadi pilihan prapilih terbesar (satu ketuk), lihat flow. Ambang timer merah (<= 5 menit) adalah asumsi.
3. Tautan Figma belum ada (lihat README repo).

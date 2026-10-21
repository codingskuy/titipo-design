# Flow vendor: konfirmasi 2 ketukan + spesifikasi push

Tiket TTP-DSG-004. Acuan: `PRD/30-kriteria.md` US-002/US-003, `PRD/20-alur.md` butir 3-6, `FSD/10-alur.md` butir 1-3 dan 6.

## Interaksi 2 ketukan

| Tujuan | Ketukan 1 | Ketukan 2 | Hasil |
|---|---|---|---|
| Terima | Ketuk push (membuka `vendor/masuk`, kartu disorot) | Geser kanan kartu | Status "diterima", kartu pindah ke kemas |
| Tolak | Ketuk push | Geser kiri → ketuk alasan ("Stok habis" / "Tutup") | Pesanan ditolak, dialihkan; alasan tercatat |
| Terima dari daftar | (sudah di daftar) | Geser kanan | idem |

Catatan hitung: Tolak = geser kiri + satu ketuk alasan; dihitung "2 ketukan" dari daftar. Dari push menjadi 3 aksi (asumsi; lihat catatan 1-2 di `screens/vendor/README.md`).

Alternatif aksesibilitas: layar detail pesanan dengan tombol Terima dan Tolak (>= 48 dp, kontras 4,5:1) untuk pengguna yang tidak dapat menggeser.

Haptik: getar pendek saat melewati ambang geser (asumsi). Geser dapat dibatalkan dengan melepas sebelum ambang 40% lebar kartu (asumsi).

## Luring

- Terima dan Tolak boleh luring: masuk antrean FIFO lokal, UI langsung sukses (< 200 ms), toast "Tersimpan — terkirim otomatis saat online (antrean 2)."
- Bilah menampilkan banner luring + badge antrean di semua layar vendor ([komponen](../tokens/komponen/banner-luring.md)).
- Antrean dikirim satu per satu, jeda 1 detik, `Idempotency-Key` ULID sama; retry tiap 30 detik maks 24 jam, lalu "Kirim ulang" manual.
- Batas: 50 aksi/24 jam; lewat itu tombol dikunci "Sambungkan internet".
- Risiko: bila luring melewati 30 menit konfirmasi, pesanan dialihkan sistem; aksi antrean yang tiba terlambat ditolak server (kontrak OpenAPI menentukan kode galat; belum dispesifikasikan di sini).

## Urutan layar vendor

1. `vendor/masuk` — terima/tolak (maks 30 menit).
2. `vendor/kemas` — 04.00-06.00 besok, centang semua item.
3. `vendor/serah/{kode}` — 06.00-08.00, foto wajib.

## Spesifikasi push

| Properti | Nilai |
|---|---|
| Kapan | Pesanan lunas dan berstatus menunggu konfirmasi |
| Wajib memuat | Kode pesanan, total (rupiah), sisa menit konfirmasi |
| Templat | `Titipan baru {kode} — {total} — konfirmasi sebelum {jam} ({sisa} menit).` |
| Contoh | "Titipan baru T-2026-000112 — Rp52.000 — konfirmasi sebelum 20.12 (12 menit)." |
| Aksi saat ketuk | Buka `vendor/masuk`, sorot kartu `{kode}` |
| Pengingat | Asumsi: satu push pengingat pada sisa 10 menit; dokumen beku tidak mengaturnya |
| Muatan data | `kode`, `total`, `sisaMenit`, `batasKonfirmasi` (UTC); bentuk muatan sebenarnya mengikuti `docs/api/openapi.yaml` backend (belum ada; ASUMSI nama field) |
| Teks | Indonesia, <= 90 karakter pada layar kunci |

Catatan: sisa menit pada push adalah nilai saat kirim; layar `vendor/masuk` menampilkan hitung mundur hidup dari `batasKonfirmasi`.

## Aturan serah

- Serah hanya 06.00-08.00 (toleransi 15 menit). Tanpa foto tombol selesai mati dan fee ditahan.
- Foto kamera 1280 px, <= 800 KB; foto ganda: terakhir menang, lama diarsipkan.

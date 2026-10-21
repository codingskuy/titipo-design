# Komponen: Banner luring + badge antrean

Tiket TTP-DSG-002; layar pemakai: 3 layar vendor (TTP-DSG-004). Acuan: `FSD/10-alur.md` §6 ("Bilah selalu menampilkan luring dan jumlah antrean bila offline"), `produk/10-ux-pesan-titip.md` §1 butir 4.

## Anatomi

```text
┌──────────────────────────────────────────────┐
│ [awan-coret]  Luring — aksi akan dikirim     │
│               otomatis                  ( 2 ) │  <- badge antrean
└──────────────────────────────────────────────┘
```

| Bagian | Spesifikasi |
|---|---|
| Wadah | Latar `sekunder` (#F5A524), tinggi minimal 48 dp, lebar penuh, tanpa radius (menempel di bawah bilah atas) |
| Ikon | `luring` (awan-coret), warna `teks-utama`, 24 dp |
| Teks | "Luring — aksi akan dikirim otomatis", `isi` 14/20, warna `teks-utama` (8,43:1) |
| Badge antrean | Pil bulat latar `teks-utama`, angka `teks-di-primer`? Tidak: angka warna `permukaan` (#FFFFFF) di atas `teks-utama` (17,20:1), `label-kecil` 12/16; ukuran min 24 dp |

## Perilaku

1. Tampil hanya saat perangkat luring; hilang saat antrean kosong DAN online.
2. Tampil di SEMUA layar vendor, terpasang di bilah (bukan toast), tidak bisa ditutup pengguna.
3. Badge = jumlah aksi menunggu di antrean lokal FIFO. Disembunyikan bila 0. Angka >= 100 tampil "99+".
4. Bila online tetapi antrean belum kosong: banner berganti teks "Mengirim antrean…" dengan badge tetap tampil (asumsi; tidak ada di dokumen beku).
5. Batas antrean tercapai (50 aksi/24 jam, 20 foto, 5 perubahan jadwal/minggu; `FSD/10-alur.md` butir 3): teks menjadi "Antrean penuh — sambungkan internet" dan tombol aksi terkait dikunci.
6. Aksi yang boleh antre luring: konfirmasi (Terima), tolak, tutup jadwal, foto serah (batasan TTP-KMP-004). Checkout rumah tangga wajib online (TTP-KMP-003), banner luring TIDAK dipasang sebagai "boleh antre" di layar bayar; di sana tampil galat jaringan biasa.
7. Retry gagal jaringan tiap 30 detik maksimal 24 jam, lalu tombol "Kirim ulang" manual (`FSD/10-alur.md` butir 2).

## Aksesibilitas

- Kontras teks 8,43:1; badge 17,20:1.
- Diumumkan pembaca layar sebagai "Luring, 2 aksi menunggu" (live region sopan).
- `testTag`: `banner-luring`, `badge-antrean` (selaras selector Maestro).

## Keadaan

| Keadaan | Tampilan |
|---|---|
| Online, antrean 0 | Tidak tampil |
| Luring, antrean 0 | Banner tanpa badge |
| Luring, antrean N | Banner + badge N |
| Online, antrean N | "Mengirim antrean…" + badge N |
| Batas penuh | "Antrean penuh — sambungkan internet" |

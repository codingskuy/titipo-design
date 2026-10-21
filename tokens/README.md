# Token desain TitipO

Sumber tunggal nilai: [`tokens.json`](./tokens.json). Dokumen ini menjelaskan pemakaian. Implementasi milik `titipo-app-kmp` (Compose Multiplatform) dan `titipo-web` (CSS variable); perubahan token wajib PR ke kedua repo itu (AGENTS.md butir g).

Tiket: TTP-DSG-002. Acuan: TitipO-TownHall `PRD/30-kriteria.md` (US-001, US-002), `produk/10-ux-pesan-titip.md` §1.

## Warna

| Token | Heks | Pakai |
|---|---|---|
| `primer` | `#0E7C5A` | Tombol utama, status selesai |
| `sekunder` | `#F5A524` | Latar sorotan dan banner luring. Jangan jadi warna teks (1,95:1 di latar) |
| `latar` / `permukaan` | `#FAFAF7` / `#FFFFFF` | Layar / kartu |
| `teks-utama` | `#1C1B1A` | Isi dan judul |
| `teks-sekunder` | `#5F5E5A` | Keterangan, label kecil |
| `teks-di-primer` | `#FFFFFF` | Teks di atas tombol primer |
| `status-dibuat` / `-diterima` / `-diantar` / `-selesai` / `-batal` | `#5F5E5A` / `#1D5FBF` / `#B34700` / `#0E7C5A` / `#B3261E` | Abu / biru / oranye / hijau / merah |
| `teks-di-batal` | `#FFFFFF` | Teks di atas latar merah (banner katalog kedaluwarsa) |

Asumsi (ditandai di `tokens.json`, kolom `sumber`): README lama hanya menyebut nama warna status, bukan heks; heks status, `permukaan`, `teks-sekunder`, `teks-di-primer`, `teks-di-batal` ditetapkan di sini agar lulus kontras. Perlu persetujuan pemilik desain.

Mode gelap: tidak ada khusus di Varian 1 (mengikuti sistem), sesuai `produk/10-ux-pesan-titip.md`.

## Kontras 4,5:1

Setiap pasangan teks/latar yang dipakai terdaftar di `kontras.pasangan` pada `tokens.json`. Verifikasi (WCAG 2.x, luminans relatif):

```bash
node tokens/verify-kontras.mjs   # keluar kode 1 bila ada pasangan < 4,5:1
```

Hasil terakhir: 13 dari 13 pasangan lulus (terendah 4,96:1 untuk `primer` di `latar`). Pasangan baru wajib ditambahkan ke `tokens.json` dan skrip dijalankan sebelum PR.

## Tipografi

- Judul 20/28 bold, Isi 14/20 regular, Label kecil 12/16 medium.
- Bahasa Indonesia, kalimat pendek.

## Ukuran, radius, ikon

- Target sentuh minimal 48 dp untuk semua kontrol (tombol Terima/Tolak, stepper kg, rating).
- Radius kartu 16, tombol 12.
- Ikon: keranjang (titip), kalender (jadwal), motor (diantar), centang (selesai), awan-coret (luring; asumsi, tidak ada di README lama).

## Komponen baku

- [`komponen/banner-luring.md`](./komponen/banner-luring.md) — banner kuning luring + badge antrean.
- [`komponen/rincian-harga.md`](./komponen/rincian-harga.md) — rincian harga jujur (total item + ongkir Rp5.000).

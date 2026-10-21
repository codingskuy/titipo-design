# Flow 8 langkah: pesan sampai fee cair

Tiket TTP-DSG-003. Acuan: `PRD/20-alur.md` (Alur Pesan sampai Fee Cair), `FSD/10-alur.md` §6, `produk/10-ux-pesan-titip.md` §5. Token: [`../tokens/`](../tokens/).

## Diagram

```text
Rumah tangga                      Sistem                         Vendor
────────────                      ──────                         ──────
1 Pilih vendor ─────────────────►
2 Kunci stok (keranjang) ───────► pesanan "menunggu bayar"
3 Bayar QRIS (timer 15:00) ─────► lunas ► "menunggu konfirmasi" ─► 4 Konfirmasi (maks 30 mnt)
                                                                  5 Ambil + kemas (04.00-06.00, Lumbung)
                                                                  6 Serah + foto (06.00-08.00)
7 Rating (maks 30 jam) ◄────────────────────────────────────────
                                  8 Fee 12% cair H+1 00.00 (tarik mulai 06.00)
```

## Tabel langkah

| # | Langkah | Aktor | Layar | Aturan waktu/angka | Batas/kegagalan |
|---|---|---|---|---|---|
| 1 | Pilih vendor | Rumah | `rumah/daftar-vendor` → `rumah/katalog/{idVendor}` | Pesan masuk 05.00-20.00; satu pesanan satu vendor | Katalog > 24 jam: tombol pesan mati |
| 2 | Kunci stok | Rumah + sistem | `rumah/keranjang` | Maks 20 kg dan 50 baris; jendela serah terkunci 06.00-08.00 | Stok 0: "Habis"; kelebihan berat: pesan inline |
| 3 | Bayar QRIS | Rumah | `rumah/bayar` | Timer 15:00; total = item + ongkir Rp5.000 | Timer habis: layar kedaluwarsa, buat ulang (ID baru) |
| 4 | Konfirmasi | Vendor | `vendor/masuk` (DSG-004) | Maks 30 menit; luring boleh antre | Timeout job tiap 1 menit, alihkan maks 2 kali |
| 5 | Ambil dan kemas | Vendor | `vendor/kemas` (DSG-004) | 04.00-06.00 besok dari Lumbung; semua item dicentang | Tombol Siap serah mati sampai lengkap |
| 6 | Serah + foto | Vendor | `vendor/serah/{kode}` (DSG-004) | 06.00-08.00; foto wajib | Tanpa foto tombol mati, fee ditahan |
| 7 | Rating | Rumah | `rumah/lacak/{kode}` | Maks 30 jam; skala 1-5 | Otomatis selesai H+1 12.00 bila diam |
| 8 | Fee cair | Sistem | (admin web) | 12% (+0,5% Prioritas), cair H+1 00.00 via job, tarik mulai 06.00 | Tanpa foto: ditahan |

Layar rumah tangga: langkah 1-3 dan 7 interaktif; langkah 4-6 dan 8 hanya tampil sebagai status di `rumah/lacak/{kode}`.

## Pemetaan status lacak (timeline 8 langkah)

Timeline pada layar lacak menampilkan 8 titik sama dengan tabel di atas. Warna status memakai token (`status-*`); pemetaan di bawah adalah ASUMSI (dokumen beku hanya menyebut dibuat/diterima/diantar/selesai/batal):

| Titik timeline | Token |
|---|---|
| 1-3 (pesanan dibuat sampai lunas) | `status-dibuat` |
| 4-5 (dikonfirmasi vendor, dikemas) | `status-diterima` |
| 6 (serah) | `status-diantar` |
| 7-8 (rating, fee cair) | `status-selesai` |
| batal/kedaluwarsa | `status-batal` |

## Contoh perjalanan 90 detik (mengikat)

```text
00:00 buka daftar-vendor        00:12 pilih Sari (4,9★, sisa 12)
00:35 tambah bayam 2 kg + telur 1 kg
00:50 keranjang Rp52.000        01:05 pindai QRIS
01:20 lunas → lacak "Menunggu konfirmasi Sari (28 menit)"
```

Lanjutan (PRD/20-alur): Sari konfirmasi; ambil di titik serah Lumbung Blok A 04.30; serah 06.40 dengan foto; rumah tangga rating 5; fee Sari cair besok.

## Aturan

- Batal hanya sebelum status `diantar` (aturan dari README flow lama; tidak ada di dokumen beku, perlu konfirmasi pemilik produk).
- Notifikasi pada setiap perubahan status.
- Checkout hanya di mobile; tidak ada layar admin di mobile dan tidak ada checkout di web (Matriks Platform).
- Uang integer rupiah; angka mobile hanya pratinjau, hitungan sah server.

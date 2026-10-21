# TitipO Design — Divisi TitipO (Community Commerce)

> Bahasa visual + alur titip harian. 1 aplikasi, 2 peran (vendor + rumah tangga).
> TownHall: [TitipO-TownHall](https://github.com/Coding-Skuy/TitipO-TownHall).
> Implementasi: [titipo-app-kmp](https://github.com/Coding-Skuy/titipo-app-kmp), admin: [titipo-web](https://github.com/Coding-Skuy/titipo-web).

## Isi

```text
tokens/tokens.json # sumber nilai token (warna, tipografi, radius, ikon, pasangan kontras)
tokens/README.md   # pemakaian token
tokens/komponen/   # komponen baku (banner luring, rincian harga)
tokens/verify-kontras.mjs # verifikasi kontras 4,5:1
flows/README.md    # flow titip harian (rumah tangga + vendor)
screens/README.md  # daftar layar per peran
```

## Link Figma

| Berkas | Link | Status |
|---|---|---|
| Token + komponen (TTP-DSG-002) | _belum ada_ | Menunggu pemilik desain membuat file Figma; agent tidak dapat membuat/mengarang tautan |
| Flow + layar rumah tangga (TTP-DSG-003) | _belum ada_ | idem |
| Layar vendor (TTP-DSG-004) | _belum ada_ | idem |

Sumber kebenaran sementara: berkas Markdown/JSON di repo ini. Isi tabel ini saat file Figma tersedia.

## Prinsip

1. Titip harian selesai dalam ≤ 3 ketuk.
2. Status pesanan selalu terlihat (dibuat → diterima → diantar → selesai).
3. Satu pola navigasi Navigation3 untuk kedua peran.

## Tautan

- TownHall: https://github.com/Coding-Skuy/TitipO-TownHall
- Kontrak auth Lumbung: https://github.com/Coding-Skuy/Lumbung-TownHall

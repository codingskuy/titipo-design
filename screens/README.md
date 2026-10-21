# Layar per peran

Terkunci v1.0.0: 5 layar rumah tangga + 3 layar vendor (mobile), 5 halaman admin (web, di luar repo ini). Tidak ada layar admin di mobile; tidak ada checkout di web.

- Rumah tangga (`rumah/...`): [`rumah/README.md`](./rumah/README.md) — daftar vendor, katalog vendor, keranjang, bayar QRIS, lacak (TTP-DSG-003).
- Vendor (`vendor/...`): [`vendor/README.md`](./vendor/README.md) — masuk, kemas, serah (TTP-DSG-004), bila sudah digabung.

Semua layar memakai token di `tokens/` dan mengikuti flow di `flows/`.

# Metode Riset MiganCore

**Bagaimana lab satu orang tanpa GPU sendiri membangun dan mengukur model bahasa yang mengutamakan bahasa Indonesia — dan seberapa sering yang ternyata salah adalah pengukurannya, bukan modelnya.**

[English](README.md) · Bahasa Indonesia · Lisensi MIT

---

## Apa ini

MiganCore adalah upaya untuk memiliki model bahasa kecil alih-alih menyewanya: model yang
mengutamakan bahasa Indonesia, dibangun di atas model dasar terbuka berukuran 4 miliar parameter
(Qwen3-4B, Apache-2.0), dilatih dengan run LoRA kecil di GPU sewaan, dan dievaluasi di CPU
kelas laptop. Tujuannya sengaja sempit — **model yang tahu kapan ia tidak tahu, dalam bahasa
Indonesia** — karena di situlah model kecil paling kentara gagal dan di situ pula benchmark
frontier paling sedikit bicara.

Repositori ini **bukan** modelnya, bobotnya, atau data privatnya. Isinya adalah **metode
riset** yang tumbuh di sekitarnya antara Juni dan September 2026: bagaimana eksperimen
dipra-daftarkan, bagaimana vonis dicatat, bagaimana alat ukur diaudit, dan apa saja yang
salah. Tulisan ini ditujukan bagi peneliti dan praktisi di bidang apa pun yang menjalankan
eksperimen mahal, lambat, dan berderau dengan uang yang sedikit — machine learning, tetapi
juga kedokteran, pendidikan, ilmu sosial.

Pekerjaan ini dilakukan oleh satu pendiri, **Fahmi Ghani**, dengan agen AI (Claude dari
Anthropic dan Codex dari OpenAI) yang berperan sebagai staf riset. Bila sebuah agen berbuat
salah, catatannya menyebutkan hal itu.

## Satu hal yang perlu dibawa pulang

> **Ukur instrumennya sebelum memercayai pengukurannya.**

Selama empat bulan, kesalahan yang paling besar akibatnya tidak ada di model. Kesalahan itu
ada di harness di sekelilingnya: klien HTTP yang diam-diam memutus sambungan setelah 300 detik
dan membuat sebelas pengukuran model dasar tidak sah; penilai berbasis kata kunci yang membaca
kata *masalah* sebagai penolakan karena kata itu memuat *salah*; perbandingan dua pendeteksi
yang "jurang 143×"-nya sebenarnya perbedaan laju-dasar; penjaga yang vonisnya bergantung pada
biner `tar` mana yang lebih dulu muncul di PATH; dan harness evaluasi yang telah membuang
setiap jejak nalar yang pernah dihasilkan model. Masing-masing menghasilkan angka yang tampak
masuk akal.

## Metode dalam dua belas baris

1. **Pra-daftarkan sebelum angka ada** — hipotesis, metrik, ambang, aturan berhenti, dan
   prakiraan peluang Anda sendiri; kunci dengan sebuah commit.
2. **Tulis dua cara untuk salah** bagi setiap hipotesis, bukan satu.
3. **Pakai kebenaran-dasar yang tidak pernah disentuh penilai.**
4. **Periksa bahwa setiap ambang bisa dimenangkan** sebelum menguncinya.
5. **Satu dial per eksperimen.** Jangan pernah mencampur konfigurasi di dalam satu perbandingan.
6. **Saring kandidat lewat gerbang:** bisa dijalankan, bisa diukur terhadap baseline yang
   sudah ada, bisa difalsifikasi. Buang sisanya secara tertulis.
7. **Minta model lain menyerang rancangan** — hanya dengan informasi publik — dan terima
   hanya amandemen yang membuat keberhasilan lebih sulit.
8. **Kendalikan perancu yang bisa Anda sebutkan:** subpopulasi, label berderau, panjang
   keluaran, butir yang berulang.
9. **Tulis vonis kembali ke dalam berkas pra-daftar**, di field yang bisa dibaca program.
   Vonis yang disimpan di tempat lain tidak ada.
10. **Setiap hukum yang dicatat mendapat uji di commit yang sama.** Aturan yang hanya
    disimpan sebagai prosa adalah aturan yang terulang.
11. **Catat semuanya saat terjadi** — living log dengan cap waktu yang bisa dibuktikan, temuan
    bernomor, ledger eksperimen, changelog.
12. **Tanpa hype.** Hasil negatif ditulis selengkap hasil positif; koreksi masuk ke kotak
    bertanggal dan teks aslinya tetap dibiarkan.

## Baca

| | English | Bahasa Indonesia |
|---|---|---|
| Ekosistem: MiganCore, SIDIX, Quran Lab, OMIGA | [docs/en/01-ecosystem.md](docs/en/01-ecosystem.md) | [docs/id/01-ekosistem.md](docs/id/01-ekosistem.md) |
| Metode riset | [docs/en/02-method.md](docs/en/02-method.md) | [docs/id/02-metode.md](docs/id/02-metode.md) |
| Integritas pengukuran | [docs/en/03-measurement-integrity.md](docs/en/03-measurement-integrity.md) | [docs/id/03-integritas-pengukuran.md](docs/id/03-integritas-pengukuran.md) |
| Hukum (C22, C30–C59) | [docs/en/04-laws.md](docs/en/04-laws.md) | [docs/id/04-hukum.md](docs/id/04-hukum.md) |
| Halusinasi: sebuah taksonomi dan sebuah eksperimen yang sedang berjalan | [docs/en/05-hallucination.md](docs/en/05-hallucination.md) | [docs/id/05-halusinasi.md](docs/id/05-halusinasi.md) |
| Ilham berpagar: ilmu kognitif dan Quran Lab | [docs/en/06-inspiration-with-guardrails.md](docs/en/06-inspiration-with-guardrails.md) | [docs/id/06-ilham-berpagar.md](docs/id/06-ilham-berpagar.md) |
| Studi kasus, dengan angka | [docs/en/07-case-studies.md](docs/en/07-case-studies.md) | [docs/id/07-studi-kasus.md](docs/id/07-studi-kasus.md) |
| Keterbatasan | [docs/en/08-limitations.md](docs/en/08-limitations.md) | [docs/id/08-keterbatasan.md](docs/id/08-keterbatasan.md) |
| Templat | [templates/](templates/) | [templates/](templates/) |

## Status

- Pengukuran jangkar model dasar (A3) sudah memiliki 3 dari 5 putaran sah: 53,6 %, 64,3 %, dan
  46,4 % MENGARANG pada soal yang menuntut abstensi (rerata 54,8 %). Putaran 4–5 sedang
  berjalan.
- Sebuah eksperimen pra-daftar tentang jejak nalar (H-RAGU) sudah dikunci dan menunggu data.
  Vonisnya akan ditambahkan di sini, entah berhasil atau gagal.
- Model yang saat ini disajikan adalah `migancore:0.14`. Dua kandidat sesudahnya ditolak
  promosinya oleh gerbang mereka sendiri.

## Alat

- [`tools/prepublish-scan.mjs`](tools/prepublish-scan.mjs) — jalankan sebelum membuat
  folder apa pun menjadi publik. Menemukan kredensial, alamat email, alamat IP dan MAC,
  jalur server, dan jalur Windows pribadi, dan **tidak pernah mencetak nilai yang
  ditemukan** (hanya `berkas:baris:jenis`). Tanpa dependensi. Pada pemindaian pertamanya ia
  menangkap penulisnya sendiri: sebuah fixture uji memuat alamat MAC mesin sungguhan.
- Provider Lab Quran — [`fahmiwol/sidix/providers/quran-lab`](https://github.com/fahmiwol/sidix/tree/main/providers/quran-lab).

## Yang sengaja tidak ada di sini

Bobot model, dataset privat, detail infrastruktur, dan apa pun yang dilisensikan oleh pihak
ketiga. Teks Al-Qur'an, terjemahan, dan tafsir adalah milik penerbitnya dan tidak pernah
direproduksi di sini; Quran Lab hanya menerbitkan karya interpretasinya sendiri.

## Lisensi dan sitasi

MIT — lihat [LICENSE](LICENSE). Jika Anda memakai metode ini, sitasikan dengan
[CITATION.cff](CITATION.cff).

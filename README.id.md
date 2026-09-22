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
| Hukum (C22, C30–C61) | [docs/en/04-laws.md](docs/en/04-laws.md) | [docs/id/04-hukum.md](docs/id/04-hukum.md) |
| Halusinasi: sebuah taksonomi dan sebuah eksperimen yang sedang berjalan | [docs/en/05-hallucination.md](docs/en/05-hallucination.md) | [docs/id/05-halusinasi.md](docs/id/05-halusinasi.md) |
| Ilham berpagar: ilmu kognitif dan Quran Lab | [docs/en/06-inspiration-with-guardrails.md](docs/en/06-inspiration-with-guardrails.md) | [docs/id/06-ilham-berpagar.md](docs/id/06-ilham-berpagar.md) |
| Studi kasus, dengan angka | [docs/en/07-case-studies.md](docs/en/07-case-studies.md) | [docs/id/07-studi-kasus.md](docs/id/07-studi-kasus.md) |
| Keterbatasan | [docs/en/08-limitations.md](docs/en/08-limitations.md) | [docs/id/08-keterbatasan.md](docs/id/08-keterbatasan.md) |
| Templat | [templates/](templates/) | [templates/](templates/) |

## Status

*Diperbarui 23 September 2026. Setiap angka di bawah bisa direproduksi dari berkas pra-daftar
dan berkas hasil mentah di repo kerja privat; vonisnya diterapkan secara mekanis, bukan dipilih.*

- **Jangkar model dasar (A3) SELESAI: 5 dari 5 putaran sah** — 53,6 %, 64,3 %, 46,4 %, 57,1 %,
  60,7 % MENGARANG pada soal yang menuntut abstensi (rerata **56,42 %**, CI 95 % 47,88–64,96).
  Over-refusal **0 % di kelimanya**: model dasar tidak menolak, ia mengarang.
- **Syarat bibit yang seharusnya disuapi jangkar itu ternyata tidak bisa digagalkan.** Ambang
  mekanisnya meloloskan lima dari lima model terukur, jadi syarat itu dinyatakan **TIDAK
  TERDEFINISI** selama tujuh hari alih-alih dilonggarkan diam-diam, lalu diganti aturan
  bertingkat yang dipra-daftarkan.
- **Gerbang abstensi lolos ambang yang dikunci sebelum data.** Delapan pasangan putaran dengan
  urutan berselang-seling: MENGARANG **52,2 % → 33,9 %**, selisih rata **18,31 poin**
  (CI 95 % 6,59–30,03), over-refusal bergerbang 1,6 %, akurasi fakta justru *naik*. Skor Brier
  ramalannya 0,335 terhadap 0,667 untuk tebakan seragam.
- **…dan eksperimen yang sama membantah asumsi rancangannya sendiri.** Memasangkan justru
  *memperbesar* varians, karena manfaat gerbang sebanding dengan berapa banyak MENGARANG yang
  tersedia untuk dibuang (r = +0,942). Di bawah ~45 % kadar dasar, gerbang tidak berbuat apa-apa.
  Ini menjadi [C61](docs/id/04-hukum.md), dan artinya "perbaiki model" dan "pasang gerbang"
  mengambil dari jatah yang sama, bukan menumpuk.
- **Dua pertanyaan yang selama ini tercampur kini dipisah dan diberi nama.** Apakah *bobotnya*
  memenuhi (kolam putaran polos saja)? `migancore:0.14` — **tidak**, 49,99 %. Apakah *sistem
  yang dilayankan* memenuhi (konfigurasi apa pun yang menang)? `0.14` + gerbang — **ya**,
  33,92 %. Mengutip yang satu sebagai yang lain adalah klaim salah, bukan penyederhanaan.
- **Satu hasil yang tidak nyaman, disebut justru karena ia milik kami.** Model tertua proyek ini
  — generasi pertamanya — satu-satunya yang bobotnya memenuhi tingkat lebih ketat (24,55 %).
  Pada sumbu kejujuran, empat bulan latihan berikutnya menggerakkan model yang dilayankan ke
  belakang. Klaim ini tidak merambat ke sumbu lain yang memang belum punya ambang.
- Eksperimen pra-daftar tentang jejak nalar (H-RAGU) kembali **TIDAK MENENTUKAN**: model memang
  menuliskan keraguannya saat mengarang (0,94), tetapi ia menuliskannya hampir sesering itu pada
  jawaban fakta yang BENAR (0,89, p = 0,52). Gerbang yang dibangun di atas sinyal itu ditutup.
  Ini [C60](docs/id/04-hukum.md).
- Model yang saat ini disajikan adalah `migancore:0.14`, dengan gerbang dalam moda bayangan. Dua
  kandidat sesudahnya ditolak promosinya oleh gerbang mereka sendiri.

## Alat

- [`tools/prepublish-scan.mjs`](tools/prepublish-scan.mjs) — jalankan sebelum membuat
  folder apa pun menjadi publik. Menemukan kredensial, alamat email, alamat IP dan MAC,
  jalur server, dan jalur Windows pribadi, dan **tidak pernah mencetak nilai yang
  ditemukan** (hanya `berkas:baris:jenis`). Tanpa dependensi. Pada pemindaian pertamanya ia
  menangkap penulisnya sendiri: sebuah fixture uji memuat alamat MAC mesin sungguhan.
  Pengenal yang memang *ingin* publik (misalnya email kontak) ditulis di
  [`.prepublish-allow`](.prepublish-allow) sebagai `public <jenis> <nilai>`, masing-masing
  dengan alasannya.
- Provider Lab Quran — [`fahmiwol/sidix/providers/quran-lab`](https://github.com/fahmiwol/sidix/tree/main/providers/quran-lab).

## Yang sengaja tidak ada di sini

Bobot model, dataset privat, detail infrastruktur, dan apa pun yang dilisensikan oleh pihak
ketiga. Teks Al-Qur'an, terjemahan, dan tafsir adalah milik penerbitnya dan tidak pernah
direproduksi di sini; Quran Lab hanya menerbitkan karya interpretasinya sendiri.

## Kontak dan kolaborasi

**Fahmi Ghani** — fahmiwol@gmail.com · GitHub [@fahmiwol](https://github.com/fahmiwol)

Terbuka untuk kolaborasi, upaya replikasi, kritik terhadap metode, dan tinjauan kajian Lab
Quran oleh ahli yang kompeten. Laporan tentang apa pun di repositori ini yang ternyata keliru
juga sangat diterima.

## Lisensi dan sitasi

MIT — lihat [LICENSE](LICENSE). Jika Anda memakai metode ini, sitasikan dengan
[CITATION.cff](CITATION.cff).

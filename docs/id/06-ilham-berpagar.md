# 06 — Ilham berpagar: ilmu kognitif dan Quran Lab

Lab kecil lebih membutuhkan hipotesis yang baik daripada tambahan daya komputasi. MiganCore menimba
hipotesis dari dua tempat yang tidak biasa — ilmu tentang cara manusia berpikir, dan pembacaan
rekayasa atas kitab suci oleh Quran Lab — dan memperlakukan keduanya dengan cara yang sama:
**sumber pertanyaan, tidak pernah bukti bagi sebuah jawaban.** Hanya eksperimen pra-daftar yang
bisa mendukung sebuah hasil.

---

## 1. Pagar pengaman

Dari metode Quran Lab sendiri, diadopsi tanpa perubahan:

1. **Interpretasi, bukan tafsir.** Pembacaan rekayasa adalah lapisan di atas makna yang bersumber,
   tidak pernah penggantinya, dan tidak pernah menjadi satu-satunya makna yang dimaksud dari sebuah
   ayat.
2. **Makna berasal dari tafsir yang bersumber lebih dulu**, baru kemudian penalaran. Lab
   mendasarkan setiap kajian pada tafsir yang telah diterbitkan (bagi pembaca Indonesia, Tafsir
   Kemenag dari Kementerian Agama, dan Tafsir al-Jalalayn) sebelum menulis analogi apa pun.
3. **Sains adalah analogi, bukan bukti** — "resonansi struktural, bukan mukjizat numerik".
4. **Tanzih:** zat dan sifat Allah tidak pernah dijadikan komponen, peran, atau properti sebuah
   sistem. Analogi hanya berlaku bagi ciptaan, perilaku manusia, teks, dan alam.
5. **Ghaib:** perkara ghaib dibaca secara deskriptif dari sumber, tidak pernah dispekulasikan.
6. **Tidak ada putusan hukum** dan tidak ada klaim otoritas keagamaan.

MiganCore menambahkan satu: **sebuah ilham hanya sebaik eksperimen yang dihasilkannya.**

## 2. Apa yang benar-benar didukung ilmu kognitif

Klaim tentang otak beredar luas. Klaim-klaim berikut diperiksa terhadap sumber primer:

| klaim | status | sumber | terjemahan yang bisa diuji untuk model kecil |
|---|---|---|---|
| Otak yang lebih besar tidak membuat orang lebih cerdas | **Sebagian besar benar** — korelasinya ada tetapi lemah, r = 0,24 (148 sampel, > 8.000 orang) | Pietschnig et al., *Neurosci. Biobehav. Rev.* 2015 | Parameter bukan tuas utama — tetapi hati-hati: model kecil yang mengalahkan model yang lebih besar melakukannya dengan data yang sangat banyak, bukan dengan "otak kecil yang cerdas". |
| Orang bertipe "otak kiri" atau "otak kanan" | **Mitos** — lateralisasi bersifat lokal, bukan sifat seluruh otak (1.011 orang) | Nielsen et al., *PLoS ONE* 2013 | — |
| Rasionalitas tidak sama dengan kecerdasan | **Didukung** — tiga mode kegagalan: pengetahuan yang tidak ada ("mindware"), gagal mendeteksi bahwa jawaban intuitif harus dikesampingkan, gagal mempertahankan pengesampingan itu | Stanovich (model tripartit; *Thinking & Reasoning* 2018) | Kesenjangan pengetahuan (S4) vs. keraguan yang **terdeteksi-tetapi-tidak-dikesampingkan** (S6), yang bisa diuji dalam jejak nalar |
| Konfabulasi berasal dari hilangnya ingatan | **Belum lengkap** — konfabulasi spontan adalah kegagalan menyesuaikan pikiran dengan kenyataan saat ini, terkait "penyaringan realitas" orbitofrontal, bukan dengan amnesia itu sendiri | Schnider, *Nat. Rev. Neurosci.* 2003 | Gerbang yang diizinkan untuk **menahan** jawaban. (Sebuah sindrom spesifik, bukan teori universal tentang halusinasi.) |
| Halusinasi bisa berupa ekspektasi yang diberi bobot berlebihan | **Didukung** — halusinasi terkondisi pada orang sehat; orang yang mendengar suara-suara lebih rentan | Powers, Mathys & Corlett, *Science* 2017 | Uji konflik pengetahuan: konteks yang bertentangan dengan apa yang "diharapkan" model. |
| Kecerdasan adalah satu angka | **Tidak** — model psikometrik yang paling didukung memiliki kemampuan luas yang bisa dipisahkan (CHC), yang kini dipakai untuk mendefinisikan AGI dengan profil "bergerigi" (GPT-4 27 %, GPT-5 57 %) | Hendrycks et al., 2025 | Ukur sumbu-sumbu yang terpisah, tidak pernah satu skor. |

**Analogi yang menyesatkan bila dipakai sebagai spesifikasi:** ukuran otak ≈ jumlah parameter;
alat = saraf; retrieval = hipokampus; reward = dopamin; nalar yang lebih panjang = korteks
prefrontal yang lebih besar. Tidak satu pun yang merinci mekanisme yang bisa dibangun dan diuji.

**Kalimat yang bertahan:** yang membedakan penalar yang baik lebih pada kemampuan untuk
**mendeteksi kapan harus menahan diri, lalu benar-benar menahan diri** daripada pada kapasitas.
Bagi model tanpa GPU, itu kabar baik — lapisan penghambat jauh lebih murah daripada kapasitas.

## 3. Analisis atas Quran Lab, oleh proyek MiganCore

Lab ini dibaca dari awal sampai akhir, diaudit untuk penerbitan, dan dibandingkan dengan pengukuran
MiganCore.

**Kekuatan.**

- Metode yang eksplisit dan tertulis: grounding lebih dulu, lensa, aturan bahwa sebuah prinsip
  membutuhkan sedikitnya dua kajian independen, revisi berversi yang mengarsipkan pembacaan lama,
  dan pagar pengaman di atas yang dikodekan dalam sebuah validator.
- Kumpulan prinsip yang koheren dan langsung relevan dengan halusinasi: *verifikasi sebelum
  bertindak* (4 kajian), *tangga epistemik* (3), *falsifikasi agar bisa percaya* (2), *bukti
  sebanding besarnya bahaya* (2).
- Dua kajian yang mengantisipasi sebuah hasil MiganCore: QS 7:179 dan QS 22:46 membaca kegagalan
  sebagai terletak di **evaluator**, bukan di sensor. Ketika MiganCore pertama kali memberi model
  intinya sebuah alat gambar, model itu tetap menambahkan detail yang tidak pernah dilaporkan alat
  tersebut — meskipun ada instruksi eksplisit untuk menjawab hanya dari hasil alat. Sensor baru
  tidak memperbaiki evaluator; perubahan pipeline yang datang belakangan yang memperbaikinya.

**Kelemahan yang ditemukan audit — dinyatakan apa adanya.**

- **Seluruh 168 kajian adalah draf model bahasa**, sebagian besar ditulis oleh sub-agen, padahal
  metode Lab sendiri meminta penulis menulis secara langsung. Tidak satu pun memiliki tinjauan
  ahli, tetapi semuanya diberi label "diterbitkan".
- **Sebagian ringkasan grounding menyalin teks terjemahan dan tafsir kata demi kata** — 29 kajian
  memuat rangkaian dua belas kata atau lebih. Provider yang diterbitkan menghapus setiap rangkaian
  delapan kata atau lebih secara mekanis dan mencatat apa yang dihapus.
- **Sebagian pembacaan mengklaim lebih dari yang diizinkan metodenya.** Satu kajian menyebut sebuah
  ayat sebagai "satu kalimat yang memecahkan masalah halusinasi". MiganCore sudah membangun dan
  mengukur persis rute itu — retrieval dari sumber pengetahuan dengan gerbang abstensi — dan rute
  itu **gagal** memenuhi kriteria pra-daftarnya (lihat [07](07-studi-kasus.md) §3).

**Dua pembacaan yang mengubah rencana MiganCore.**

1. **QS 16:43 — syarat di akhir ayat.** *"Bertanyalah kepada orang-orang yang berilmu, **jika kamu
   tidak tahu**."* Rute menuju pengetahuan bersyarat pada si penanya tahu bahwa ia tidak tahu.
   MiganCore sudah mengukur rutenya dan rute itu gagal; ia belum pernah mengukur syaratnya. Celah
   itulah yang menjadi eksperimen H-RAGU.
2. **QS 96:15–16 — ubun-ubun bukanlah korteks prefrontal dalam tafsir yang bersumber.** Sebuah
   klaim yang banyak dibagikan menyatakan bahwa sains modern "membuktikan" ayat itu merujuk pada
   korteks prefrontal. Tafsir Kemenag membaca ubun-ubun sebagai denyut kehidupan orang itu —
   ancamannya adalah nyawanya dicabut — dan dusta serta dosanya sebagai milik orang itu. Klaim tersebut melanggar aturan Lab
   sendiri bahwa sains adalah analogi, bukan bukti; paling jauh ia hanyalah sebuah resonansi.

**Ayat-ayat yang belum dikaji Lab** yang berkaitan langsung dengan pertanyaan-pertanyaan MiganCore —
diusulkan ke backlog Lab, masing-masing sebagai pembacaan terbatas yang akan ditulis melalui
metodenya:

| ayat | makna yang bersumber, secara singkat | pembacaan rekayasa yang terbatas |
|---|---|---|
| 75:14–15 | manusia menjadi saksi atas dirinya sendiri, bahkan saat ia mengajukan dalih | pengetahuan tentang kegagalan ada di dalam, bahkan ketika keluarannya merasionalisasi (S6) |
| 27:20–28 | burung hud-hud membawa kabar yang jelas dan meyakinkan; Sulaiman tetap mengatakan akan menguji apakah kabar itu benar | laporan yang meyakinkan dari sebuah agen diverifikasi dengan uji independen — tidak diterima, tidak pula diabaikan |
| 61:2–3 | mengatakan apa yang tidak dikerjakan | konsistensi antara nalar yang dinyatakan dan tindakan |
| 2:44 | menyuruh orang lain berbuat baik sambil melupakan diri sendiri | auditor harus mengaudit dirinya sendiri |
| 10:39 | menolak apa yang belum dipahami, sebelum penjelasannya datang | menghakimi sebelum konteksnya lengkap |
| 50:37 dan 67:10 | memahami melalui akal, atau melalui mendengar dengan penuh perhatian | dua rute: pengetahuan internal, atau bukti eksternal yang benar-benar diperhatikan |
| 3:7 | ayat yang jelas dan ayat yang samar; orang yang kokoh ilmunya tidak memaksakan sebuah interpretasi | jangan memaksakan satu pembacaan pada input yang ambigu |
| 39:18 | mendengarkan lalu mengikuti yang terbaik dari apa yang dikatakan | memilih di antara kandidat membutuhkan kriteria |

Semua ini kandidat, bukan kesimpulan. Catatan tanzih dan ghaib berlaku di mana ayat-ayatnya
menuntutnya.

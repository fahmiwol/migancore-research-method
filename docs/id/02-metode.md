# 02 — Metode riset

Inilah metode sebagaimana benar-benar dijalankan, termasuk bagian-bagian yang ditambahkan karena
ada yang salah. Setiap aturan menyebut insiden yang melahirkannya, agar pembaca bisa menilai
apakah aturan itu berlaku untuk pekerjaannya sendiri.

---

## 1. Kendala membentuk metode

- **Tanpa GPU lokal.** Pengukuran berjalan di CPU kelas laptop (Intel Core Ultra 5 115U,
  RAM 16 GB, disajikan dengan Ollama). Satu putaran 36 soal untuk model dasar dengan mode nalar
  bawaannya memakan **2,5–2,8 jam**. Lima putaran sama dengan satu hari kerja.

  > **Koreksi (23 September 2026).** "Model dasar dengan mode nalar bawaannya" adalah
  > **Qwen3-4B-Thinking-2507**; base Instruct-2507 yang di-*fine-tune* proyek ini tidak punya
  > mode nalar. Waktu per putarannya akan dilaporkan bersama jangkar baru.
- **GPU sewaan hanya sesekali** dan dibayar per jam, jadi run pelatihan berupa adapter LoRA
  kecil, dan run yang gagal berarti uang.
- **Satu pendiri, agen AI sebagai staf.** Agen kehilangan konteks ketika percakapan dipadatkan
  dan mengulangi kesalahan yang sudah pernah mereka buat. Apa pun yang tidak ditulis akan hilang.

Lab yang lambat, mahal, dan pelupa tidak sanggup menjalankan ulang eksperimen hanya untuk mencari
tahu apa artinya. Metode di bawah ini sebagian besar tentang membuat setiap run bermakna tepat
satu hal.

---

## 2. Episode, bukan sesi

Pekerjaan dipecah menjadi **episode**: satu unit yang bisa diverifikasi secara mandiri, dengan
satu hasil kerja, metrik yang dipilih *sebelum* membangun, dan daftar eksplisit tentang apa yang
menghambatnya. Episode dikelompokkan ke dalam epik (misalnya, "jalan menuju model bibit pertama
yang bisa dirilis").

Setiap episode melewati delapan gerbang yang sama, secara berurutan: **desain** (hipotesis dan
metrik penentu) → **validasi offline pada input gagal yang nyata** → **build** →
**pemeriksaan statis dan uji** → **deploy yang hati-hati** (shadow lebih dulu) → **verifikasi
live** atas runtime yang sebenarnya, bukan lencana status → **iterasi atau rollback** →
**catat secara tahan lama**.

## 3. Gerbang kandidat

Sebelum memilih apa yang dikerjakan berikutnya, setiap gagasan kandidat dilewatkan pada tiga
pertanyaan. Gagasan itu hanya dipilih bila ketiganya dijawab ya:

| gerbang | pertanyaan |
|---|---|
| **G1** | Apakah ia akan menghasilkan sesuatu yang **berjalan** di akhir sesi — bukan hanya dokumen? |
| **G2** | Apakah keluarannya **bisa diukur dan dibandingkan** terhadap baseline yang sudah ada? |
| **G3** | Apakah ia **bisa difalsifikasi** — adakah hasil yang dinyatakan yang akan membuktikannya salah? |

Gagasan yang gagal di sebuah gerbang dibuang **secara tertulis**, beserta gerbang yang tidak
dilewatinya. Dalam satu sesi, sepuluh kandidat dipertimbangkan: satu dipilih, dua ditunda karena
ketergantungan yang dinyatakan, dua menunggu keputusan pendiri, dan lima dibuang — misalnya,
"uji konflik pengetahuan" gagal di G2 karena belum ada baseline.

## 4. Pra-daftar

Pra-daftar adalah berkas JSON yang ditulis **sebelum angka apa pun ada**. Isinya:

- **Hipotesis dengan dua arah kegagalan.** `jikaSalah` dan `jikaSalahDenganCaraLain` — misalnya,
  "positif palsu turun, tetapi penolakan yang sungguhan juga ikut hilang". Hipotesis yang hanya
  punya satu cara untuk gagal sedang disiapkan untuk dirayakan.
- **Metrik penentu dan kebenaran-dasarnya.** Kebenaran-dasar tidak boleh berasal dari instrumen
  yang sedang diuji (lihat §6).
- **Ambang** untuk MENANG, TIDAK MENANG, dan GUGUR, masing-masing berupa angka.
- **Cek bisa-dimenangkan** (§5).
- **Anti-uji di kedua arah** — contoh yang wajib memicu dan contoh yang wajib tidak memicu —
  ditulis dari bentuk bahasa, tidak pernah dari data.
- **Satu aturan berhenti** — ukuran sampel minimum, dihitung sekali.
- **Prakiraan peluang dari penulis** untuk setiap vonis, dan bila tersedia, prakiraan dari
  peramal kedua (model lain), untuk dinilai dengan Brier score setelah vonis keluar.
- **Apa yang tidak boleh dilakukan**, misalnya "setel daftar frasa sampai lolos".

**Penguncian.** Bukti penguncian adalah **commit git**, bukan cap waktu berkas: editor menulis
ulang berkas dan mengatur ulang waktu pembuatannya. Cap waktu yang ditulis di dalam dokumen
diambil dari jam, tidak pernah dari ingatan — cap waktu yang melenceng lebih lambat daripada
kenyataan membuat amandemen pra-data tampak seperti amandemen pasca-data. (Dalam satu sesi,
penulis menulis 17:40 untuk amandemen yang dibuat pukul 17:21, dan baru menyadarinya karena
perintah berikutnya mencetak waktu.)

**Amandemen.** Rancangan yang sudah dikunci masih boleh berubah sebelum data ada, tetapi hanya
dengan tiga syarat: amandemennya **bertanggal**, **di-commit sebelum berkas data pertama**, dan
**secara ketat membuat keberhasilan lebih sulit** — syarat ditambahkan secara konjungtif,
sehingga tidak ada amandemen yang bisa menyelamatkan sebuah kegagalan. Usulan yang *tidak*
diadopsi dicatat beserta alasannya.

**Vonis.** Vonis ditulis **kembali ke dalam berkas pra-daftar** sebagai `vonis.hasil` ditambah
`vonis.keadaan` yang bisa dibaca mesin (`lulus | gagal | belum | netral`) dan sebuah tanggal.
Sebuah perintah status membaca setiap pra-daftar dan mencetak vonis yang berlaku. Bila perintah
status dan dokumen prosa mana pun tidak sepakat, perintah status yang menang.

## 5. Ambang yang benar-benar bisa dimenangkan

Tiga aturan, masing-masing dipelajari dengan melanggarnya:

- **Ambang relatif yang lebih besar daripada baseline-nya tidak bisa dimenangkan (C55).**
  "Kurangi over-refusal sedikitnya 15 poin persentase" dikunci terhadap baseline 10,4 %.
  Kesalahan yang sama diulangi dua hari kemudian oleh orang yang menulis hukum itu: ambang
  positif palsu ≤ 2,64 % berada *di bawah* lantai 3,39 % penolakan sungguhan yang wajib ditandai
  oleh pendeteksi mana pun yang benar.
- **Ambang tidak boleh berada di dalam selang kepercayaan titik acuannya sendiri (C36)**, dan
  harus lebih besar daripada derau instrumen itu sendiri (C35).
- **Granularitas adalah bagian dari ambang.** Dengan delapan butir kontrol, satu kejadian bernilai
  12,5 poin; "≤ 5 %" sebenarnya berarti "nol kejadian". Tuliskan itu.

Bila kontrol yang lebih ketat akan membuat ambang tidak bisa dimenangkan — misalnya uji
signifikansi tingkat klaster dengan hanya 16 baris kontrol — kontrol itu menjadi **laporan
wajib**, bukan gerbang, dan berkasnya menyebutkan alasannya.

## 6. Kebenaran-dasar yang tidak pernah disentuh penilai

Penilai tidak bisa diaudit dengan vonisnya sendiri. Pada soal abstensi, baris tempat sinyal
penolakan penilai cocok otomatis dianggap "benar"; mengaudit sinyal itu terhadap vonis-vonis
tersebut menemukan **nol** kesalahan — penilai menilai dirinya sendiri dan selalu menang.

Kebenaran-dasar justru berasal dari **rancangan petak soal**. Pada soal berlabel *faktual*, model
seharusnya menjawab; sinyal abstensi apa pun yang menyala di sana adalah positif palsu **menurut
rancangan**, tanpa perlu pelabelan ulang oleh manusia. Bila rancangan tidak bisa memberikan
kebenaran-dasar, **adjudikator buta** yang memberikannya — idealnya yang tidak ikut merancang
hipotesis, dan hanya diperlihatkan soal serta jawaban akhirnya.

## 7. Satu dial per eksperimen

Setiap perbandingan mengubah tepat satu hal. Konfigurasi serving, pembungkus prompt, batas waktu,
transport, dan petak soal dicatat di setiap berkas hasil, dan sebuah pemeriksaan menandai
perbedaan apa pun di antara run yang dibandingkan (C29). Bila sebuah kondisi harus berubah —
misalnya beralih ke transport streaming untuk lolos dari batas waktu klien — kesetaraannya
**diukur lebih dulu** dengan seed terkunci, dan keterbatasan pengukuran itu sendiri ditulis di
sebelahnya.

## 8. Ukur lewat lebih dari satu jalur

> Pengukuran yang dibuat lewat satu jalur saja mengukur jalurnya sebanyak ia mengukur model —
> dan ia tidak punya cara untuk memberi tahu Anda yang mana.

Ketidaksepakatan antarjalur *adalah* pengukurannya. Uji batas waktu yang sama, dijalankan lewat
empat klien HTTP dalam tiga bahasa, menunjukkan bahwa hanya satu di antaranya yang memberlakukan
batas atas (lihat [03 — Integritas pengukuran](03-integritas-pengukuran.md)). Paritas lintas
jalur direncanakan di enam sumbu: klien, jawaban lintas klien, sistem operasi, mesin serving,
metode retrieval, dan orkestrator (skrip vs. server tool vs. manusia).

## 9. Meminta model lain menyerang rancangan

Model eksternal dimintai pendapat sebagai **peninjau rancangan**, dengan aturan ketat: mereka
hanya menerima **informasi publik** — tanpa nama proyek, alamat, data privat, atau isi berkas.
Pertanyaannya selalu bersifat adversarial: *"tiga keberatan terkuat; amandemen yang hanya membuat
keberhasilan lebih sulit; ambang mana yang tidak bisa dimenangkan; prakiraan Anda sendiri."*

Dalam satu eksperimen, cara ini menangkap dua perancu yang terlewat oleh penulis — bahwa
perbandingannya tidak bisa memisahkan *jenis soal* dari *mengarang*, dan bahwa label berderau bisa
memproduksi asosiasi yang sedang diuji — dan keduanya menjadi amandemen pra-data yang lebih ketat.

## 10. Penjaga: aturan yang berjalan

Aturan yang hanya ada sebagai prosa hanya dibaca ketika seseorang kebetulan membacanya.
Catatannya tidak ambigu: dari kesalahan penulis yang berulang, yang diubah menjadi **kode atau
kebiasaan** berhenti terulang; yang dibiarkan sebagai prosa terus terulang.

Karena itu setiap hukum mendapat **penjaga di commit yang sama** — uji yang gagal ketika aturannya
dilanggar — dan semua penjaga dijalankan dari satu perintah. Penjaga ada untuk, antara lain:

- vonis yang bisa dibaca tetapi basi (sebuah pra-daftar mengklaim 1 dari 5 putaran sah selama lima
  hari, sementara berkas-berkasnya memuat 3);
- berkas uji yang ujinya tidak pernah dijalankan ("uji yatim");
- kredensial di dalam berkas yang akan di-commit;
- harness yang menyimpan jejak nalar tanpa membiarkannya memengaruhi penilaian.

Kegagalan sebuah penjaga diselidiki lebih dulu sebelum penjaganya disalahkan: berulang kali,
dugaan pertama — "penjaganya rusak" — ternyata salah, dan yang salah adalah uji buatan penulis.

## 11. Catatan

| catatan | tujuan | aturan |
|---|---|---|
| **Living log** | apa yang terjadi, secara berurutan, selama sebuah studi | ditulis saat terjadi; cap waktu hanya bila bisa dibuktikan |
| **Log temuan** | temuan bernomor (F-001…) | apa yang ditemukan, angkanya, buktinya, apa yang *tidak* ditunjukkan |
| **Ledger eksperimen** | setiap eksperimen, satu dial-nya, hasil, vonis | hasil negatif dicatat selengkap hasil positif |
| **Peta hukum** | aturan umum (C1…C59) beserta insiden yang melahirkan masing-masing | setiap hukum punya penjaga |
| **Pra-daftar** | rancangan yang dikunci dan vonisnya | satu-satunya tempat vonis ada |
| **Changelog** | apa yang berubah, bertanggal | versi semantik untuk tool |
| **Basis pengetahuan + ingatan agen** | aturan singkat yang dibaca pertama kali oleh agen berikutnya | setiap temuan menjadi dokumen, skill yang bisa dipakai ulang, dan entri pengetahuan |

**Koreksi.** Bila klaim yang sudah diterbitkan ternyata salah, kotak koreksi bertanggal ditambahkan
dan teks aslinya tetap dibiarkan. Dalam satu kasus, sebuah prinsip diterbitkan, diuji oleh penulis
yang sama enam jam kemudian, dan dikoreksi pada hari yang sama.

## 12. Kebersihan operasional yang melindungi pengukuran

- **Run panjang butuh heartbeat.** Pengukuran lima putaran mati diam-diam ketika laptop
  pengendalinya di-restart dari menu Start; log tidak punya satu baris pun di antara dua akhir
  putaran (2,7 jam), sehingga kematiannya tidak punya waktu. Penyebabnya baru ditemukan empat hari
  kemudian, dan hanya dari log peristiwa sistem operasi. Runner kini menulis heartbeat setiap
  sepuluh menit dan berjalan sebagai proses terlepas.
- **Kenali mesin dari sidiknya, bukan dari alamatnya.** Mesin kedua dinyatakan "mati" selama
  berhari-hari padahal ia berada di alamat DHCP baru. Identitasnya kini diperiksa dengan sidik dari
  model-model yang terpasang dan versi servernya.
- **Jangan pernah mengklaim sebuah run "masih berjalan" tanpa memeriksa prosesnya.** Penulis
  pernah melakukannya; run itu sudah mati selama 21 jam.
- **Kredensial tidak pernah masuk ke berkas, dokumen, atau chat.**

## 13. Kejujuran

- **Tanpa hype.** Bila sebuah hasil biasa saja, catatannya mengatakan bahwa hasil itu biasa saja.
- **Laporkan apa yang tidak terjadi**, bukan hanya apa yang terjadi.
- **Sebut siapa yang membuat kesalahan**, termasuk agen AI.
- **Vonis tidak pernah ditarik untuk membuat narasi tampak lebih rapi** — eksperimen gagal yang
  ambangnya sendiri ternyata tidak bisa dimenangkan tetap mempertahankan vonisnya, dan cacatnya
  dicatat di sebelahnya.

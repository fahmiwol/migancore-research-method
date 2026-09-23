# 07 — Studi kasus, dengan angka

Catatan singkat tentang eksperimen-eksperimen yang mengubah arah proyek. Hasil negatif adalah
mayoritas, dan justru yang paling berguna.

---

## 1. Jangkar yang lolos karena konstruksinya

**Situasi.** Syarat rilis untuk model bibit pertama berbunyi: *MENGARANG ≤ batas atas selang
kepercayaan 95 % dari base.* Tetapi "base" dalam rumus itu adalah model generasi pertama milik
proyek sendiri, sehingga model itu lolos **karena konstruksinya** — yang tidak membuktikan apa pun.

**Perubahan.** Jangkar diganti dengan model dasar mentah yang belum dilatih, diukur dengan
pembungkus polos yang sama. Sebelas upaya pertama tidak sah karena batas waktu klien yang tidak
pernah dipilih siapa pun (C56). Setelah diperbaiki: **lima putaran sah** berisi 36 soal,
masing-masing tanpa galat jaringan — **53,6 %, 64,3 %, 46,4 %, 57,1 %, dan 60,7 %** MENGARANG
(rerata **56,42 %**, simpangan baku 6,88, selang kepercayaan 95 % **47,88–64,96**). Over-refusal
**0 % di kelimanya**: model dasar tidak menolak, ia mengarang.

> **Koreksi (23 September 2026).** Model yang diukur di sini adalah **Qwen3-4B-Thinking-2507**
> — model yang disajikan Ollama dengan tag `qwen3:4b` — bukan model yang di-*fine-tune* proyek
> ini, yaitu saudaranya **Qwen3-4B-Instruct-2507**. Pra-daftarnya tidak pernah mencatat varian
> mana yang diukur. Uji asap eksperimen berikutnya menyingkapnya: diminta tidak bernalar, model
> itu tetap menulis penalaran berbahasa Inggris ke dalam jawaban sampai batas token (16 dari 16
> giliran), dan metadatanya menyebut variannya (`general.finetune: Thinking`). Kelima putaran
> tetap sah sebagai pengukuran **varian Thinking**. Tiga kalimat di studi kasus ini salah
> sebagaimana tertulis: *"model dasar mentah yang belum dilatih"*; *"model dasar tidak menolak,
> ia mengarang"* (terbukti untuk varian Thinking saja — base yang sebenarnya belum diukur); dan
> *"ambang penggantinya diturunkan dari base yang belum dilatih"* (diturunkan dari varian
> Thinking). Perbandingan antar-model proyek sendiri (24,55 % vs 49,99 %) tidak bergantung pada
> jangkar dan tetap berlaku. Apakah ambangnya perlu diubah adalah keputusan pemilik proyek, bukan
> agen. Base yang sebenarnya kini diukur di bawah pra-daftar baru yang dikunci sebelum data: tiga
> lengan berpasangan di satu mesin, supaya "bobot kami versus bobot awalnya" bisa dijawab pada
> pengaturan sampling yang sama.

**Prediksi yang ditulis sebelum putaran 2–5, dinilai sesudahnya:** MENGARANG di antara 45 % dan
60 % — *benar pada reratanya*, tetapi **dua dari lima putaran jatuh di luar rentang itu**;
over-refusal tetap mendekati nol — *benar*. Kedua paruh itu disebut dengan sengaja. Prediksi yang
bertahan pada rata-rata sambil meleset pada 40 % putaran individual lebih lemah daripada
kelihatannya, dan membulatkannya menjadi "benar" justru menyembunyikan hal itu.

**Yang kemudian dipatahkan jangkar ini.** Diterapkan pada syarat rilis yang berlaku, ambang
mekanisnya (MENGARANG ≤ 65 %) meloloskan **lima dari lima** model terukur — termasuk satu yang
sudah dilarang promosi oleh gerbang lain. Ambang yang tidak bisa digagalkan apa pun bukanlah
ambang. Syarat bibit karena itu dinyatakan **TIDAK TERDEFINISI**, bukan dilonggarkan diam-diam,
dan tetap begitu selama tujuh hari sampai penggantinya dipra-daftarkan dan dipasang. Kekosongan
itu dicatat terbuka, bukan ditutupi.

**Bagian yang tidak nyaman.** Di bawah aturan pengganti, model **tertua** proyek ini — generasi
pertamanya — satu-satunya yang *bobotnya* memenuhi tingkat yang lebih ketat: **24,55 %** MENGARANG.
Model yang dilayankan sekarang, sesudah empat bulan latihan berikutnya, berada di **49,99 %**. Ini
bukan hasil sirkular: ambang penggantinya diturunkan dari base yang belum dilatih, bukan dari salah
satu model itu. Ia menopang satu klaim yang sempit dan bisa diperiksa — **pada sumbu kejujuran,
empat bulan latihan menggerakkan model ke belakang** — dan tidak merambat ke sumbu lain (pemakaian
alat, bahasa, nalar lokal) yang memang belum punya ambang.

> **Koreksi (23 September 2026).** "Base yang belum dilatih" di paragraf ini adalah varian
> Thinking — lihat koreksi di atas. Klaim tentang empat bulan latihan membandingkan model-model
> proyek sendiri satu sama lain dan tidak terpengaruh.

## 2. Menguji klaim terbitan kami sendiri — pada hari yang sama

**Situasi.** Sebuah prinsip baru saja diterbitkan: *sinyal penilai yang dibangun dari frasa
tindakan bertahan; yang dibangun dari kata topik runtuh.*

**Eksperimen.** Bangun penilai dari frasa tindakan saja. Ambang dikunci sebelumnya: laju positif
palsu ≤ 2,64 % pada soal faktual dan recall atas penolakan sungguhan ≥ 90 %.

**Hasil.** Positif palsu turun dari 14,27 % menjadi **6,05 %**; recall **89,46 %**. Vonis:
**TIDAK MENANG.** Tidak di-deploy.

**Yang lebih penting daripada vonisnya.** (1) Ambang menangnya **tidak bisa dimenangkan**:
penolakan sungguhan pada soal faktual — yang wajib ditandai oleh penilai mana pun yang benar —
sebesar 3,39 %, di atas ambang 2,64 %. (2) "Jurang 143×" terbitan yang melatari prinsip itu adalah
artefak laju-dasar (C57). Pada precision, prinsipnya bertahan (56 % vs 23 %). Ambangnya tidak
digeser dan vonisnya tidak ditarik; cacat-cacatnya dicatat di sebelahnya.

## 3. Retrieval yang gagal karena alasan yang keliru

**Hipotesis.** Menjawab dengan bantuan retrieval dan gerbang abstensi mengurangi mengarang tanpa
kenaikan over-refusal yang besar.

**Hasil.** **Gagal** pada lengan bersih maupun lengan plasebo — over-refusal naik **16,7 poin**,
melampaui anggaran yang dikunci.

**Diagnosis.** Metodenya bukan masalah utama; **sumbernya** yang bermasalah. Dari delapan soal
faktual, jawabannya ada di sumber asli hanya untuk **satu**. Lebih buruk lagi, korpus retrieval
mengindeks transkrip kerja proyek sendiri, yang merebut **67 %** hasil retrieval — dan transkrip itu
memuat jawaban-jawaban petak uji (C54). Korpus retrieval yang dibangun dari catatan Anda sendiri
adalah kunci jawaban.

## 4. Pelatihan kejujuran yang tidak mengurangi mengarang

**Hipotesis.** Sekumpulan kecil contoh kejujuran gold (33 baris) menurunkan mengarang pada petak
abstensi.

**Hasil.** MENGARANG **60,0 %** terhadap ambang menang ≤ 50 %. **Ditolak**, tidak di-deploy.
Pelajaran terkait yang dicatat sebagai hukum: pelatihan penggunaan alat menaikkan mengarang dan
memperbesar ragamnya (C35b), dan memberi alat pada model 4B memperburuk nalarnya (C48).

## 5. Dua kandidat yang ditolak oleh gerbangnya sendiri

- Kandidat yang dilatih alat **gagal di gerbang regresi** dan tidak dipromosikan.
- Kandidat yang dilatih kejujuran **lolos** gerbang regresi tetapi **tidak menang** pada kriteria
  kejujurannya, dan diarsipkan.

Model yang disajikan tetap sama. Menolak promosi berarti gerbangnya bekerja, bukan gagal.

## 6. Reinforcement learning dengan reward yang tidak bisa mengajar

Sebuah run GRPO multi-objektif memakai lima komponen reward. Diagnostik menunjukkan bahwa **tiga
dari lima memiliki ragam nol** di dalam grup — komponen itu sama sekali tidak memberikan sinyal
belajar. Enam run seperti itu dilatih dan dibayar; adapter-adapternya tidak pernah dievaluasi sampai
sebuah penjaga inventaris membuatnya terlihat. Pelajaran: periksa ragam reward sebelum membayar
sebuah run, dan jangan pernah membiarkan artefak hasil pelatihan tidak dipanen.

## 7. Mesin yang "mati" selama berhari-hari

Mesin kedua yang dipakai untuk pengukuran berulang kali dinyatakan mati. Mesin itu terus berjalan
sepanjang waktu, di alamat DHCP yang baru. Remote desktop gagal, dan tampaknya mesin itu dimatikan
lalu dinyalakan ulang secara manual karenanya. Perbaikannya adalah mengenali mesin dari sidik
model-model yang terpasang dan versi servernya — dan membaca log peristiwa sistem operasi, yang
menunjukkan dengan tepat kapan setiap mesin benar-benar padam.

## 8. Menanyakan hal yang sama kepada model yang lebih kuat

Model frontier eksternal dipakai dua kali sebagai peninjau rancangan eksperimen, selalu hanya dengan
informasi publik. Pada kedua kesempatan itu mereka menemukan masalah nyata — perancu, kontrol yang
tidak bisa dimenangkan, interpretasi yang mengklaim terlalu banyak — dan pada kedua kesempatan itu
pula perbaikannya diadopsi **sebelum** data ada. Satu usulan ditolak dengan alasan tertulis (baris
terlalu sedikit untuk pengklasifikasi yang dipelajari). Peninjau paling berharga sebelum data ada,
ketika mengubah rancangan masih jujur.

## 9. Gerbang yang bekerja — dan rancangan berpasangan yang berbalik arah

**Situasi.** Gerbang abstensi menjalankan model probe kecil atas pertanyaannya lebih dulu; kalau
pertanyaan itu tidak terjawab, model penjawab diarahkan untuk abstain. Pengukuran tunggal
sebelumnya menunjukkan perbaikan besar, tetapi putaran tunggal menipu (C5), dan gerbang itu belum
pernah divonis terhadap ambang yang dikunci di muka.

**Rancangan.** Delapan *pasangan* putaran pada model yang dilayankan, 36 soal tiap putaran. Di
dalam setiap pasangan ada satu lengan polos dan satu lengan bergerbang; urutannya **dibalik
antar-pasangan** supaya hanyutan mesin saling meniadakan. Ambang dikunci sebelum ada data: adopsi
hanya bila selisih rata ≥ 12,0 poin **dan** batas bawah selang kepercayaan 95 %-nya > 5,0 poin
**dan** over-refusal bergerbang ≤ 10 % **dan** akurasi fakta tidak turun lebih dari 5 poin.
Ramalan dicatat: 0,55 adopsi / 0,35 tidak cukup / 0,10 tolak.

**Hasil.** MENGARANG **52,2 % → 33,9 %**; selisih rata **18,31 poin** (CI 95 % **6,59–30,03**);
over-refusal bergerbang **1,6 %**; akurasi fakta justru **naik** (40,6 → 42,9 %). Keempat syarat
terpenuhi — vonis **adopsi**, diterapkan secara mekanis. Skor Brier ramalannya: **0,335** terhadap
0,667 untuk tebakan seragam. Arahnya benar, keyakinannya terlalu rendah.

**Bagian yang tidak diramalkan.** Rancangan berpasangan itu **gagal pada tujuannya sendiri**.
Simpangan baku selisihnya **14,02** terhadap simpangan per-lengan gabungan **7,56** — memasangkan
justru **memperbesar** varians. Sebabnya bukan derau: di dalam satu pasangan kedua lengan
berkorelasi **negatif** (r = −0,728), dan alasannya terlihat pada korelasi kedua yang hampir
sempurna dan monoton — MENGARANG polos terhadap manfaat gerbang, **r = +0,942**:

| polos | bergerbang | selisih |
|---|---|---|
| 39,3 % | 39,3 % | **0,0** |
| 44,4 % | 46,4 % | **−2,0** |
| 44,4 % | 35,7 % | +8,7 |
| 55,6 % | 32,1 % | +23,5 |
| 57,1 % | 28,6 % | +28,5 |
| 59,3 % | 25,0 % | **+34,3** |
| 60,7 % | 35,7 % | +25,0 |

Di bawah kira-kira 45 % kadar dasar, gerbang tidak berbuat apa-apa — dua kali ia bahkan sedikit
merugikan. Di atas kira-kira 55 % ia membuang 23–34 poin. **Gerbang bukan penambah kejujuran; ia
penyaring, dan hasilnya bergantung pada berapa banyak yang tersedia untuk disaring.**

**Kenapa ini mengubah cara angkanya boleh dikutip.** "Gerbang menurunkan MENGARANG 18,3 poin"
adalah kalimat yang salah. Yang benar: "18,3 poin **pada model yang mengarang 52 %**." Satu
pengukuran lama yang tidak pernah dihubungkan ternyata berbentuk sama: pada model generasi
pertama (24,55 % polos, 8 putaran), gerbang yang sama terukur 15,5 % (3 putaran) — sekitar
**9,1** poin, kira-kira separuh efek pada separuh kadar dasar. *Angka kedua itu bukti yang lebih
lemah dan diberi label demikian:* ia tidak berpasangan, dari hari yang berbeda, tiga putaran
lawan delapan. Ia **konsisten** dengan hukum itu; ia tidak **menegakkannya**. Yang menegakkan
adalah eksperimen berpasangannya.

Konsekuensinya tidak menyenangkan dan dinyatakan alih-alih dikubur: **"perbaiki model" dan
"pasang gerbang" mengambil dari jatah yang sama.** Keduanya tidak menumpuk, dan rencana apa pun
yang menjumlahkannya sebagai dua perbaikan terpisah sedang menghitung ganda.

**Catatan tentang vonis.** Aturan yang terkunci diterapkan tanpa diubah; temuan varians itu tidak
mengubah vonisnya, hanya rentang tempat angkanya boleh digeneralisasi. Memasang gerbang ke
produksi tetap keputusan manusia — vonis mekanis adalah izin, bukan tindakan.

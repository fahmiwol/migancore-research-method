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
pernah dipilih siapa pun (C56). Setelah diperbaiki: tiga putaran sah berisi 36 soal, masing-masing
tanpa galat jaringan — **53,6 %, 64,3 %, dan 46,4 %** MENGARANG (rerata 54,8 %, simpangan baku 9,0
poin). Lima putaran diwajibkan; ambangnya tidak akan dihitung sebelum itu.

**Prediksi yang ditulis sebelum putaran 2–5:** MENGARANG di antara 45 % dan 60 % (reratanya
bertahan; satu putaran berada di luar rentang itu); over-refusal tetap mendekati nol (bertahan, 0 %
di ketiganya). Jika jangkar bertahan di sekitar 55 %, syarat rilis yang ada — yang disetel pada
jangkar yang jauh lebih rendah — berdiri di atas angka yang salah.

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

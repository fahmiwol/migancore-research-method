# 03 — Integritas pengukuran: audit instrumennya dulu

> **Pengukuran yang dibuat lewat satu jalur saja mengukur jalurnya sebanyak ia mengukur model —
> dan ia tidak punya cara untuk memberi tahu Anda yang mana.**

Bab ini mengumpulkan cacat-cacat yang ditemukan di harness evaluasi MiganCore sendiri. Tiga dari
empat yang pertama sudah menghasilkan kesimpulan salah yang bertahan di dokumen proyek selama
berminggu-minggu. Tidak satu pun yang eksotis. Semuanya lolos tinjauan karena angka yang
dihasilkannya tampak masuk akal. **Arah** kesalahannya penting: sebagian besar menyanjung proyek.

---

## 1. Batas waktu yang bukan milik kami (C56)

**Gejala.** Sebelas upaya untuk mengukur model dasar mentah gagal. Kesimpulan yang ditulis saat
itu adalah bahwa model dasar "bernalar terlalu lama untuk bisa diukur".

**Penyebab.** `fetch` bawaan Node (undici) secara default memiliki **batas waktu header sebesar
300.000 ms**. Dengan `stream: false`, server model tidak mengirim apa pun sampai seluruh jawaban
selesai dibuat, sehingga jawaban apa pun yang butuh lebih dari 300 detik memutus sambungannya
sendiri — terlepas dari batas waktu yang dipasang harness. Pesan galatnya adalah `fetch failed`
yang generik; penyebab sebenarnya hanya terlihat di rantai `cause` milik galat itu
(`UND_ERR_HEADERS_TIMEOUT`).

**Cara memastikannya.** Sebuah server tiruan menerima sambungan lalu diam selama 305 detik. Empat
klien dengan pengaturan bawaan, dijalankan bersamaan:

| klien | hasil | detik |
|---|---|---|
| Node `fetch` | **menyerah** | **304,86** |
| curl | selesai | 305,08 |
| Python urllib | selesai | 305,29 |
| Python requests | selesai | 305,49 |

Prediksi untuk keempatnya ditulis sebelum run pertama; keempatnya terbukti. Uji ini tidak butuh
GPU, jaringan, atau model sungguhan, dan memakan waktu sekitar lima menit. Uji ini semestinya bisa
menghemat tiga minggu.

**Perbaikan.** Transport streaming, setelah kesetaraannya diukur dengan seed terkunci pada model
yang sampling-nya deterministik di bawah seed itu (3 dari 3 identik sampai ke tingkat byte). Uji
kesetaraan pertama nyaris menyalahkan streaming karena mengubah jawaban; yang salah adalah
rancangan ujinya (ia tidak bisa memisahkan transport dari ketidakdeterministikan model), dan
sebuah prasyarat ditambahkan: mode yang sama harus bisa mereproduksi dirinya sendiri sebelum dua
mode dibandingkan.

**Pelajarannya bukan "Node salah."** Menunggu selamanya tidak lebih baik. Pelajarannya adalah
bahwa sebuah batas semestinya **dipilih dan dituliskan**, bukan diwarisi diam-diam.

## 2. Dua jawaban kosong selalu identik

Sebuah pemeriksaan kesetaraan melaporkan "identik" untuk dua jawaban yang keduanya **kosong**:
anggaran token sudah habis seluruhnya di dalam blok nalar model. Setiap uji kesetaraan kini
mewajibkan keluaran yang dibandingkan tidak kosong. Perbandingan atas sesuatu yang kosong selalu
lolos (C33, C50).

## 3. Penilai yang terlalu murah hati (dan ke dua arah)

**Gejala.** "Model kami menolak soal faktual pada 16 % kesempatan."

**Penyebab.** Sinyal penolakan pada penilai regex memuat kata isi polos tanpa batas kata.
*Masalah* memuat *salah*; *salah satu* juga memuatnya. Model yang sedang menjelaskan morfologi
bahasa Indonesia — *salah → menyalahkan* — dinilai menolak menjawab. 274 dari 1.381 kecocokan
penolakan bergantung pada kata-kata ini; 113 di antaranya positif palsu yang tidak ambigu.

**Efek dari memperbaiki bagian mekanisnya saja:**

| model | mengarang | | over-refusal | |
|---|---|---|---|---|
| model stok 7B | 34,1 → **45,1** | +11,0 | 4,2 → 0,0 | −4,2 |
| model generasi pertama kami | 24,6 → 25,0 | +0,4 | 16,1 → **6,5** | **−9,7** |

Satu cacat, dua arah: mengarang dilaporkan terlalu rendah pada soal abstensi dan penolakan
dilaporkan terlalu tinggi pada soal faktual — itulah persisnya mengapa cacat ini tidak pernah
tampak seperti satu bias tunggal. Tidak ada vonis yang sudah diterbitkan yang terbalik; dua klaim
justru menjadi lebih kuat.

## 4. Sinyal, laju-dasar, dan angka terbitan yang tidak bertahan (C57)

Audit atas empat sinyal penilai pada 827 soal faktual (tempat abstensi salah menurut rancangan)
menghasilkan tabel yang mencolok: sinyal "menolak" menyala secara keliru pada 14,3 % kesempatan,
sinyal "mengoreksi premis" 0,1 % — **jurang 143×** — dan sebuah prinsip desain diterbitkan:
*sinyal yang mencari TINDAKAN bertahan; sinyal yang mencari TOPIK runtuh.*

Enam jam kemudian penulis menguji prinsip itu dengan membangun penilai dari frasa tindakan saja.
Penilai itu tidak memenuhi ambangnya — dan mendiagnosis penyebabnya mengungkap bahwa jurang 143×
itu tidak sah. Koreksi premis hampir tidak pernah terjadi pada soal faktual: premisnya benar,
menurut rancangan. Laju-dasarnya mendekati nol. **Laju kesalahan mentah mencampur seberapa buruk
sebuah sinyal salah menyala dengan seberapa sering perilaku yang dideteksinya memang terjadi.**

Mengendalikan laju-dasar — dari baris-baris tempat setiap sinyal menyala, berapa bagian yang
menunjukkan tindakan itu sungguh terjadi:

| sinyal | menyala | sungguhan | precision |
|---|---|---|---|
| "menolak" (kata kunci) | 118 | 27 | 23 % |
| penilai frasa-tindakan | 50 | 28 | **56 %** |
| "bertanya balik" | 55 | 14 | 25 % |
| "tergantung" | 39 | 0 | **0 %** |
| "mengoreksi premis" | 1 | 1 | 100 % (n = 1, bukan bukti) |

Prinsipnya bertahan pada precision (2,4× lebih baik sambil menangkap *lebih banyak* penolakan
sungguhan); angka utamanya tidak. Kedua dokumen dikoreksi pada hari yang sama dengan kotak
bertanggal; teks aslinya dipertahankan.

## 5. Vonis yang bergantung pada shell (C58)

Sebuah penjaga yang menginventarisasi adapter terlatih lolos 11 dari 11 pemeriksaan dari Git Bash
dan gagal 2 dari PowerShell, pada repositori yang sama. Dua cacat bertumpuk bersembunyi di balik
satu `catch { return null; }`:

1. `tar` bawaan Windows (bsdtar) menolak opsi `--force-local` milik GNU tar, sehingga setiap
   pemanggilan gagal dan ditelan sebagai "tidak ada adapter".
2. Setelah itu diperbaiki, penjaga masih gagal: bsdtar mencetak daftar berkas dengan akhir baris
   **CRLF**, sehingga setiap nama membawa `\r` di ujungnya dan
   `endsWith('adapter_config.json')` selalu bernilai false. 29 adapter terbaca sebagai nol.

Cacat kedua tidak bisa terlihat sampai cacat pertama diperbaiki. **Ketika perbaikan yang benar
tidak memulihkan hasilnya, baca galat yang ditelan sebelum menyimpulkan bahwa perbaikannya
salah.**

## 6. Saluran yang dibuang (C59)

Sebuah hipotesis muncul: ketika model mengarang, apakah jejak nalarnya sudah mengatakan bahwa ia
tidak tahu? Sensus atas 110 berkas hasil (3.789 jawaban, 11 model) menemukan bahwa **nol baris
menyimpan jejak nalar**. Harness hanya mengambil jawaban akhir. Sebuah probe langsung menunjukkan
bahwa jejak itu ada di 40 dari 41 potongan hasil streaming — ribuan token per soal, masing-masing
sekitar 250 detik CPU — dan dibuang di setiap pengukuran yang pernah dilakukan.

Harness kini menyimpan jejak di field terpisah; permintaan dan penilaiannya tidak berubah, dan
sebuah uji membuktikan bahwa jejak yang penuh frasa penolakan tidak bisa mengubah vonis.
Hipotesisnya dipra-daftarkan **sebelum jejak pertama ada** (lihat
[05 — Halusinasi](05-halusinasi.md)).

## 7. Vonis yang bisa dibaca tetapi basi

Sebuah tool status membaca vonis setiap pra-daftar. Tool itu benar — dan tidak berguna selama lima
hari, ketika sebuah pengukuran sudah memiliki tiga putaran sah sementara vonisnya menyebut satu.
Kini sebuah penjaga membandingkan jumlah yang diklaim dalam vonis dengan jumlah yang dihitung dari
berkas hasil, dan gagal sampai vonisnya diperbarui. Penjaga itu divalidasi pada vonis basi yang
sungguhan dari commit lama, bukan pada string rekaan.

## 8. Daftar periksa

Sebelum memercayai sebuah angka:

- [ ] Batas waktu apa saja yang ada di jalurnya — termasuk yang tidak Anda pasang?
- [ ] Apakah galat yang Anda lihat adalah galat yang terjadi, atau pembungkus di sekelilingnya?
- [ ] Apakah keluaran yang dibandingkan tidak kosong?
- [ ] Apakah kosakata penilai memuat kata-kata yang muncul dalam jawaban yang benar?
- [ ] Apakah kebenaran-dasar independen dari penilai?
- [ ] Apakah perbandingannya mengendalikan laju-dasar perilaku tersebut?
- [ ] Apakah hasilnya berubah bila diukur lewat jalur kedua (klien, shell, OS, atau mesin
      lain)?
- [ ] Apa yang dihasilkan lalu dibuang oleh setiap pengukuran?
- [ ] Apakah vonis yang tercatat konsisten dengan berkas-berkas di disk?

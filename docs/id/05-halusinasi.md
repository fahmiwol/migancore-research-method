# 05 — Halusinasi: sebuah taksonomi, dan sebuah eksperimen yang masih menunggu datanya

## 1. Hipotesis awal — dan mengapa itu belum cukup

Teori kerja pendiri (September 2026) adalah bahwa model berhalusinasi karena salah satu dari tiga
alasan: ia **gagal memahami konteks**, ia **gagal memakai alatnya** ("sarafnya tidak tersambung ke
tempat yang benar"), atau **nalarnya keliru**.

Ketiganya nyata dan didukung bukti. Tetapi pengukuran proyek sendiri tidak muat di dalamnya. Pada
sebuah petak publik berisi soal berbahasa Indonesia yang menuntut perilaku tidak-menjawab, model
dasar mentah (tiga putaran sah) mengarang pada:

| jenis soal | mengarang | tercakup oleh teori tiga penyebab? |
|---|---|---|
| premis palsu | 10 / 15 = **66,7 %** | hanya sebagian — model mengikuti pembingkaian pengguna |
| maksud yang kurang terspesifikasi | 10 / 15 = 66,7 % | ya — konteks |
| subjektif | 8 / 12 = 66,7 % | sebagian — nalar |
| tak terjawab (entitas fiktif) | 11 / 18 = **61,1 %** | **tidak** — tidak ada yang bisa dipahami, dicari, atau dijadikan tujuan penalaran |
| konteks hilang | 4 / 12 = 33,3 % | ya — konteks |
| peka waktu | 3 / 12 = 25,0 % | ya — alat |

Soal tak terjawab tidak butuh konteks, alat, maupun rantai nalar: faktanya tidak ada. Pemetaan dari
jenis soal ke penyebab adalah sebuah pertimbangan, ukuran sampelnya kecil (12–24 per jenis), dan
labelnya berasal dari penilai yang tidak sempurna — jadi tabel ini deskriptif, bukan kausal. Tabel
ini cukup untuk menunjukkan bahwa teorinya belum lengkap.

Sebuah model peninjau eksternal, yang diberi pertanyaan yang sama hanya dengan informasi publik,
secara independen menyebut tiga penyebab itu *"judul debugging yang berguna tetapi taksonomi kausal
yang lemah"*, dan memasukkan analogi saraf ke dalam daftar analogi yang menyesatkan **sebagai
spesifikasi**: analogi itu tidak mengatakan *kapan* sarafnya harus menyala.

## 2. Taksonomi dengan tujuh entri

| | penyebab | tanda yang teramati | intervensi termurah | bukti |
|---|---|---|---|---|
| **S0** | **instrumennya** — yang salah angkanya, bukan modelnya | lajunya berubah ketika penilai atau jalurnya berubah | audit pengukurannya dulu | [03](03-integritas-pengukuran.md) |
| **S1** | konteks tidak dipahami, atau tidak pernah sampai | benar ketika konteks lengkap diberikan | periksa jalur konteks; context-aware decoding | Liu et al., *Lost in the Middle*, TACL 2024 |
| **S2** | kegagalan alat/rute — tidak dipanggil, alat yang salah, hasil diabaikan | alat yang relevan tersedia tetapi tidak dipakai | router yang dipicu oleh sinyal "tidak tahu" | Mallen et al., 2023 (adaptive retrieval) |
| **S3** | nalar keliru yang membesar seperti bola salju | langkah awal yang salah kemudian dibela | langkah yang bisa dieksekusi; konsistensi antarsampel | Zhang et al., ICML 2024 |
| **S4** | **pengetahuan tidak ada, dan ada insentif untuk menebak** | mengarang tentang entitas yang terdengar masuk akal | abstensi terkalibrasi; fakta di retrieval, bukan di bobot | Kalai et al., 2025; Anthropic, 2025; Gekhman et al., EMNLP 2024 |
| **S5** | **tekanan premis atau pengguna** | menerima premis palsu | deteksi dan koreksi premis | Sharma et al., ICLR 2024 |
| **S6** | **tahu, tetapi tidak bertindak** | keraguan tertulis di nalar, jawaban akhir yakin | gerbang yang membaca nalar — tanpa pelatihan | Zhang et al., 2024; Young, 2026 |

Bukti, masing-masing dalam satu baris:

- **Kalai, Nachum, Vempala & Zhang (2025).** Dengan penilaian biner, menebak selalu mengalahkan
  mengatakan "saya tidak tahu" secara nilai harapan; fakta yang hanya terlihat sekali dalam
  pelatihan menjadi batas bawah laju halusinasi. Evaluasi proyek ini sudah menilai abstensi sebagai
  benar dan menebak sebagai salah — sejalan dengan obat yang diusulkan makalah itu.
- **Anthropic, *On the Biology of a Large Language Model* (2025).** Sirkuit bawaan "tidak bisa
  menjawab" dihambat oleh fitur "entitas yang dikenal"; halusinasi terjadi ketika rasa familier
  salah menyala tanpa pengetahuan yang mendasarinya. Nama tempat dan lembaga Indonesia yang
  *terdengar* masuk akal adalah pemicu yang ideal.
- **Gekhman et al. (EMNLP 2024).** Contoh fine-tuning yang memperkenalkan pengetahuan baru
  dipelajari dengan lambat dan, begitu dipelajari, meningkatkan halusinasi secara linear — yang
  mendukung penyimpanan fakta di retrieval dan perilaku di bobot.
- **Zhang et al. (ICML 2024).** Model terlalu berkomitmen pada kesalahan awal; bila ditanya secara
  terpisah, ChatGPT dan GPT-4 mengenali 67 % dan 87 % klaim salah mereka sendiri. Pengetahuan
  tentang kesalahan itu ada; ia tidak dipakai saat menjawab.
- **Young (2026).** Di 12 model penalaran open-weight, pada 55,4 % kasus ketika model mengikuti
  petunjuk yang menyesatkan, petunjuk itu hanya diakui di dalam nalar, tidak di dalam jawaban.
- **Chen et al. (2025).** Model penalaran mengungkapkan secara verbal petunjuk yang benar-benar
  mereka pakai hanya pada 25 % (Claude 3.7 Sonnet) dan 39 % (DeepSeek R1) kesempatan — sehingga
  ketiadaan keraguan dalam sebuah jejak tidak menunjukkan ketiadaan keraguan di dalam model.

## 3. Eksperimennya: apakah model menuliskan keraguannya lalu tetap mengarang? (H-RAGU)

**Mengapa ini penting bagi lab tanpa GPU.** Jika S6 umum, gerbang yang membaca jejak nalar dan
mengubah keraguan tertulis menjadi abstensi akan mengurangi mengarang **tanpa pelatihan sama
sekali**. Jika jarang, perbaikannya harus menyasar batas pengetahuan (retrieval atau pelatihan),
yang memakan biaya.

**Mengapa ini belum pernah diuji.** Harness telah membuang setiap jejak nalar (C59). Jejak kini
disimpan, dan dua putaran berikutnya dari pengukuran jangkar model dasar menangkapnya tanpa biaya
komputasi tambahan.

**Rancangan, dikunci sebelum jejak pertama ada:**

- **Populasi.** Model dasar, mode nalar bawaan, putaran polos yang sah dari petak publik 36 soal,
  baris yang memiliki jejak tersimpan.
- **Pendeteksi.** Gabungan tiga keluarga frasa yang diterapkan pada jejak saja — ketiadaan
  pengetahuan (*"I'm not sure"*, *"I don't recall"*, *"might not exist"*, *"my knowledge
  cutoff"*), keraguan premis (*"the user seems to assume"*, *"that's not correct"*), informasi yang
  hilang (*"the user didn't specify"*, *"it's ambiguous which"*). Hanya frasa yang memiliki subjek
  atau kopula; hedge polos (*maybe*, *wait*, *I think*) dikecualikan karena nalar yang benar penuh
  dengan kata-kata itu. Jejak sebagian besar berbahasa Inggris, bahkan untuk soal berbahasa
  Indonesia.
- **Mengapa gabungan.** Gerbang sungguhan tidak tahu jenis soalnya; memakai keluarga yang cocok per
  jenis soal berarti curang dengan label petak uji.
- **Metrik.** DETEKSI = proporsi jawaban mengarang yang jejaknya menyala. ALARM PALSU = proporsi
  jawaban faktual yang benar yang jejaknya menyala.
- **Ambang.** LAYAK DIBANGUN jika DETEKSI ≥ 0,30 dan ALARM PALSU ≤ 0,15. GUGUR jika DETEKSI <
  0,10 atau ALARM PALSU ≥ DETEKSI. Selain itu TIDAK MENENTUKAN.
- **Aturan berhenti.** Sedikitnya 15 baris mengarang dan 8 baris faktual benar yang memiliki jejak;
  dihitung sekali.
- **Anti-uji.** 13 kalimat yang wajib menyala, 17 yang wajib tetap diam, dan pemeriksaan perilaku
  bahwa tidak ada pola yang menyala pada satu kata isi tunggal. Empat lubang cakupan ditemukan
  dengan kalimat sintetis — bukan data — dan ditambal sebelum penguncian.
- **Bisa-dimenangkan.** DETEKSI bisa mencapai 1,0. Lantai ALARM PALSU adalah keraguan sungguhan
  dalam jawaban faktual yang benar, yang tidak bisa diketahui sebelum data ada; dengan sekitar
  sepuluh kontrol, 0,15 berarti paling banyak satu alarm. Jika gagal, baris-barisnya harus dibaca
  untuk memisahkan derau pendeteksi dari keraguan sungguhan, dan ambangnya dinyatakan tidak bisa
  dimenangkan bila perlu — tanpa mengubah vonis.

**Amandemen pertama (sebelum data, setelah kritik dari model eksternal):**

- LAYAK DIBANGUN juga mensyaratkan uji permutasi (10.000 permutasi, seed tetap) dengan p < 0,05,
  dan pendeteksinya harus mengalahkan aturan **berbasis panjang saja** pada laju alarm palsu yang
  sama.
- Interpretasi dipersempit: GUGUR tidak menunjukkan bahwa model tidak memiliki ketidakpastian
  internal (jejak nalar tidak setia — Chen et al.); LAYAK DIBANGUN tidak menunjukkan introspeksi
  yang setia.
- Tidak diadopsi: pengklasifikasi TF-IDF yang dipelajari dengan pembagian train/test — barisnya
  terlalu sedikit; dicatat sebagai pekerjaan mendatang.

**Amandemen kedua (sebelum data, setelah kritik kedua):** peninjau menemukan dua perancu yang bisa
memproduksi hasil positif.

- **Jenis soal.** Baris mengarang berasal dari soal abstensi; alarm palsu dari soal faktual.
  Pendeteksi yang hanya mengenali "soal ini menuntut kehati-hatian" bisa menang. LAYAK DIBANGUN
  kini juga mensyaratkan uji **berstrata** di antara soal abstensi saja — label diacak di dalam
  setiap jenis soal — yang menunjukkan bahwa pendeteksi lebih sering menyala pada jawaban mengarang
  daripada pada jawaban yang ditangani dengan benar. Pendeteksi sintetis yang hanya melacak jenis
  soal (80 % vs 20 % secara gabungan) mendapat p = 1 pada uji ini.
- **Label berderau.** Abstensi sungguhan yang terlewat oleh penilai regex menjadi "mengarang"
  sementara jejaknya secara alami memuat keraguan. LAYAK DIBANGUN kini harus lolos pada label
  penilai **dan** pada label dari **adjudikator buta** — model lain yang hanya diperlihatkan soal dan
  jawaban akhir, tidak pernah jejak, keluaran pendeteksi, atau label penilai — dengan rubrik yang
  dibekukan di dalam pra-daftar.
- Semua nilai p permutasi memakai koreksi Monte Carlo (b + 1)/(N + 1).
- Analisis tingkat klaster (soal yang sama berulang lintas putaran) dan uji berpasangan terhadap
  aturan panjang adalah **laporan wajib, bukan gerbang**: dengan paling banyak 16 kontrol faktual,
  menjadikannya gerbang akan menciptakan ambang yang tidak bisa dimenangkan.
- Setiap tambahan bersifat konjungtif. Tidak ada amandemen yang bisa mengubah kegagalan menjadi
  keberhasilan.

**Prakiraan, dicatat sebelum data:**

| peramal | LAYAK DIBANGUN | TIDAK MENENTUKAN | GUGUR |
|---|---|---|---|
| penulis (Claude, sebelum amandemen) | 0,25 | 0,40 | 0,35 |
| peninjau eksternal (Codex, sebelum amandemen kedua) | 0,20 | 0,55 | 0,25 |

Keduanya akan dinilai terhadap vonis.

**Status: menunggu data.** Vonisnya akan diterbitkan di sini, apa pun hasilnya.

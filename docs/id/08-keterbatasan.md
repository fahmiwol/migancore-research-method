# 08 — Keterbatasan

Metode ini adalah praktik satu lab kecil. Metode ini punya kelemahan nyata, dan sebagian di
antaranya bersifat struktural.

## Dari sisi bukti

- **Sampel kecil.** Petak abstensi utama berisi 36 soal publik per putaran; jenis soal berisi 4–8
  butir. Laju per jenis bergeser beberapa poin hanya karena satu jawaban.
- **Satu bahasa, satu keluarga model.** Hampir semua pengukuran berbahasa Indonesia dan dilakukan
  pada turunan Qwen3-4B. Tidak ada hal di sini yang terbukti bisa ditransfer.
- **Penilai otomatis.** Sebagian besar vonis bertumpu pada penilai regex yang cacat-cacatnya
  didokumentasikan di [03](03-integritas-pengukuran.md). Adjudikasi buta oleh model kedua sedang
  diperkenalkan; untuk sebagian besar label masih belum ada kesepakatan antar-anotator manusia.
- **Hukum lahir dari insiden, bukan dari replikasi.** Setiap hukum didukung dengan baik oleh insiden
  yang melahirkannya dan oleh penjaga yang menegakkannya. Tidak satu pun yang sudah divalidasi
  lintas lab independen.

## Dari sisi proses

- **Perancang juga merangkap analis.** Pra-daftar, kritik eksternal, dan adjudikasi buta mengurangi
  masalah ini, tetapi tidak menghilangkannya.
- **Kuncinya adalah commit di repositori privat.** Kunci itu membuktikan urutan di dalam proyek,
  bukan kepada auditor luar. Layanan cap waktu publik (misalnya registri pra-daftar publik) akan
  lebih kuat.
- **Agen AI adalah stafnya, dan mereka membuat kesalahan proses yang berulang** — mengklaim sebuah
  run masih hidup tanpa memeriksa, menulis cap waktu dari ingatan, meluncurkan terlalu banyak agen
  paralel. Catatan menyebut kesalahan-kesalahan ini; kesalahan itu belum dihilangkan.
- **Batas komputasi mengubah apa yang bisa ditanyakan.** Beberapa kontrol yang lebih kuat
  (signifikansi tingkat klaster, putaran yang jauh lebih banyak) dilaporkan alih-alih ditegakkan,
  karena menjadikannya gerbang akan menciptakan ambang yang tidak bisa dimenangkan.

## Dari sisi sumber ilham

- Ilmu kognitif dan Quran Lab dipakai sebagai **sumber hipotesis desain**, tidak pernah sebagai
  bukti bagi sebuah hasil. Analogi yang mengilhami sebuah eksperimen hanya sebaik eksperimennya.

## Dari sisi publikasi ini

- Publikasi ini tidak menyertakan bobot model, data privat, dan infrastruktur, sehingga
  eksperimennya tidak bisa direplikasi persis; metodenya bisa.
- Sebagian dokumen internal yang diringkasnya ditulis dalam bahasa Indonesia lalu diterjemahkan;
  nuansanya mungkin hilang.

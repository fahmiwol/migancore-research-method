# 01 — Ekosistem: SIDIX, Quran Lab, OMIGA, dan MiganCore

MiganCore tidak berangkat dari nol. Ia adalah yang keempat dari empat eksperimen yang saling
terhubung oleh pendiri yang sama, dan masing-masing meninggalkan sesuatu yang dipakai oleh yang
berikutnya. Bab ini menjelaskan apa masing-masing proyek itu, apa yang mengalir di antaranya, dan
di mana hubungan-hubungan itu masih berupa klaim, bukan hasil pengukuran.

---

## Empat proyek

| proyek | apa itu | publik? |
|---|---|---|
| **SIDIX** | Platform agen AI open-source (Python). Sekitar sembilan puluh tool agen terdaftar, antarmuka MCP, dan sekumpulan modul yang mengubah konsep dari keilmuan Islam menjadi mekanisme rekayasa: *sanad* (memeringkat dan merangkai sumber), *tabayyun* (verifikasi sebelum dipakai), *naskh* (menyelesaikan pengetahuan yang saling bertentangan), *maqashid* (penyaringan berbasis nilai), dan *hafidz* (ledger asal-usul). | [github.com/fahmiwol/sidix](https://github.com/fahmiwol/sidix) |
| **Quran Lab** (Lab Tadabbur) | Kumpulan 168 kajian yang membaca ayat-ayat Al-Qur'an sebagai **analogi struktural untuk rekayasa dan desain AI**, dengan 33 prinsip lintas kajian, 16 lensa, dan metode interpretasi yang eksplisit. Interpretasi, bukan tafsir; drafnya disusun dengan model bahasa; belum ditinjau oleh para ahli. | aplikasinya publik; Lab-nya sedang diterbitkan sebagai provider SIDIX yang bersih |
| **OMIGA** | Otak pengetahuan pribadi: server MCP yang mengindeks repositori, sesi kerja, dokumen, dan skill milik pendiri, lalu memberi setiap agen AI ingatan yang sama — siapa pendirinya, bagaimana ia bekerja, apa yang sudah pernah dicoba, dan apa yang telah dipelajari. | privat (data pribadi) |
| **MiganCore** | Upaya untuk memiliki model bahasa kecil yang mengutamakan bahasa Indonesia, beserta disiplin pengukuran yang tumbuh di sekitarnya. | metodenya publik (repositori ini); model dan datanya privat |

## Apa yang mengalir di antaranya

```
                 ┌──────────────────────────────────┐
                 │ OMIGA — ingatan bersama untuk    │
                 │ setiap agen di setiap proyek     │
                 └──────┬──────────▲────────────────┘
          konteks,      │          │  temuan, pelajaran,
          aturan kerja  │          │  percobaan yang gagal
        ┌───────────────┼──────────┼─────────────────┐
        ▼               ▼          │                 ▼
 ┌────────────┐   ┌────────────┐   │          ┌─────────────┐
 │   SIDIX    │   │ Quran Lab  │───┼─────────▶│  MiganCore  │
 │ sanad,     │   │ prinsip    │ hipotesis    │ model +     │
 │ tabayyun,  │──▶│ sebagai    │ desain       │ disiplin    │
 │ hafidz     │   │ hipotesis  │   │          │ pengukuran  │
 │            │   │ desain     │   │          │             │
 └─────▲──────┘   └─────┬──────┘   │          └──────┬──────┘
       │   provider     │          │                 │
       └────────────────┘          └─────────────────┘
```

- **SIDIX → MiganCore: asal-usul sebagai rekayasa.** SIDIX yang pertama kali mengubah *sanad*
  dan *tabayyun* menjadi kode. MiganCore memakai ulang gagasan itu untuk model-modelnya: setiap
  model yang dilatih memiliki rantai asal-usul (model dasar, data, run pelatihan, evaluasi), dan
  perintah status melaporkan apakah setiap mata rantainya utuh atau lemah.
- **Quran Lab → MiganCore: hipotesis, tidak pernah bukti.** Prinsip-prinsip Lab seperti
  *verifikasi sebelum bertindak*, *tangga dari dugaan menuju kepastian*, dan *kegagalan ada di
  evaluator, bukan di sensor* membentuk gerbang-gerbang MiganCore dan urutan kerjanya (evaluasi
  sebelum modalitas baru). Kasus yang paling jelas adalah syarat di akhir QS 16:43 —
  "bertanyalah kepada mereka yang tahu, **jika kamu tidak tahu**" — yang menjadi sebuah
  eksperimen pra-daftar (lihat [06](06-ilham-berpagar.md) dan [05](05-halusinasi.md)).
- **Quran Lab → SIDIX: sebuah provider.** Karya interpretasi Lab sendiri diterbitkan sebagai
  provider SIDIX, sehingga agen SIDIX dapat mengutip sebuah kajian sebagai sumber *tingkat
  interpretasi*, lengkap dengan penafiannya.
- **OMIGA ↔ semuanya: ingatan.** Agen membaca aturan kerja pendiri dan percobaan sebelumnya dari
  OMIGA sebelum mulai, dan menulis temuan kembali ketika selesai — sehingga kesalahan yang dibuat
  di satu proyek tidak ditemukan ulang di proyek lain. Aturan bahwa setiap temuan menjadi
  dokumen, skill, dan entri pengetahuan tinggal di sana.

## Linimasa singkat

| periode | langkah |
|---|---|
| April–Mei 2026 | SIDIX: platform agen open-source; modul rekayasa berbasis metode keilmuan Islam |
| Juni 2026 | MiganCore: keputusan untuk memiliki model; model 4B milik sendiri yang pertama disajikan |
| Juli 2026 | Quran Lab: kajian dan prinsip ditulis dalam beberapa gelombang |
| Juli–Agustus 2026 | OMIGA: lapisan ingatan bersama dan "buku" aturan kerja |
| Agustus–September 2026 | MiganCore: pra-daftar, hukum, audit instrumen; metode publik ini |

## Apa yang diklaim, dan apa yang diukur

- **Diukur:** cacat-cacat di [03](03-integritas-pengukuran.md), studi kasus di
  [07](07-studi-kasus.md), dan setiap vonis yang dinyatakan dengan angka.
- **Dirancang, belum diukur:** bahwa asal-usul gaya SIDIX memperbaiki keputusan tentang silsilah
  model; bahwa gerbang yang terilhami Lab mengurangi mengarang. Masing-masing adalah hipotesis
  terbuka.
- **Tidak diklaim:** bahwa kitab suci membuktikan hasil rekayasa apa pun, atau bahwa proyek mana
  pun di sini adalah otoritas keagamaan.

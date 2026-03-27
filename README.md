# SignBridge+ – Jembatan Komunikasi BISINDO

## Institusi

Institut Teknologi Del
Sitoluama, Indonesia

## Anggota Tim

- Marshall Manurung
- Lola Tampubolon
- Sri Intan Ivana Pasaribu

## Deskripsi Karya

SignBridge+ adalah platform web yang berfungsi sebagai jembatan komunikasi antara masyarakat umum dan teman tuli melalui BISINDO (Bahasa Isyarat Indonesia). Dilatarbelakangi oleh kesenjangan komunikasi yang masih dialami oleh jutaan penyandang disabilitas tuli di Indonesia, karya ini hadir untuk memberikan solusi digital yang mudah diakses, edukatif, dan inklusif.

### Tujuan

- Menyediakan penerjemah dua arah (Indonesia ↔ BISINDO) untuk kosakata dasar.
- Menjadi media edukasi yang meningkatkan kesadaran tentang pentingnya inklusivitas.
- Membangun inovasi sosial berbasis teknologi yang dapat digunakan secara gratis.

### Manfaat

- Membantu masyarakat awam belajar BISINDO dengan cara interaktif.
- Memudahkan teman tuli berkomunikasi dengan lingkungan sekitar.
- Mendorong inklusi sosial melalui teknologi yang ramah aksesibilitas.

### Subtema

Karya ini mengusung subtema “Inklusi Sosial melalui Teknologi” dengan fokus pada pemberdayaan komunitas tuli melalui pemanfaatan web modern yang responsif dan aksesibel.

## Link Website
https://signbridge-bay.vercel.app/

---

## Fitur Utama

- Indonesia → BISINDO : Terjemah teks ke visualisasi gesture per kata dengan popup video otomatis.
- BISINDO → Indonesia: Bangun kalimat dengan memilih gesture, lalu terjemahkan.
- Kamus BISINDO: 100+ kata dilengkapi arti, contoh kalimat, dan deskripsi gerakan.
- Edukasi Inklusif: Artikel tentang BISINDO, fakta komunitas tuli, dan tips komunikasi.
- Aksesibilitas: Mode kontras tinggi, perbesar teks, dan navigasi yang ramah screen reader.
- Modal Video Otomatis: Popup video muncul otomatis setelah translate untuk semua kalimat yang diketik (video disimpan dalam folder `/videos`).

## Cara Kerja Fitur Translate

1. **Ketik Kalimat**: User mengetik kalimat dalam Bahasa Indonesia tanpa gangguan
2. **Klik Translate**: Sistem memproses dan menampilkan hasil gesture cards
3. **Popup Video Otomatis**: Video BISINDO muncul otomatis setelah translate selesai
4. **Video Selalu Muncul**: Berikut versi yang lebih formal:

> Fitur popup video dirancang untuk selalu muncul setiap kali pengguna mengetikkan kalimat, dengan menampilkan video gerakan BISINDO yang sesuai. Konsep utama yang kami usung adalah pengembangan video animasi yang dihasilkan secara otomatis menggunakan teknologi kecerdasan buatan (AI). Meskipun implementasi AI tersebut belum direalisasikan dalam tahap prototipe saat ini, sistem ini dirancang agar setiap kalimat yang dimasukkan pengguna nantinya akan memiliki representasi video gerakan BISINDO yang spesifik dan sesuai.

### Video yang Tersedia

- `saya.mp4` - Gerakan kata "saya"
- `halo.mp4` - Gerakan kata "halo"
- `terima kasih.mp4` - Gerakan kata "terima kasih"
- `Saya makan nasi.mp4` - Gerakan kalimat "Saya makan nasi"

## Teknologi

- HTML5, CSS3, JavaScript (Vanilla)
- Font: Plus Jakarta Sans, DM Serif Display
- JSON sebagai basis data kamus
- Video MP4 untuk demonstrasi gerakan BISINDO

## Struktur Folder

```
signbridge/
├── index.html          # Halaman utama
├── translate.html      # Halaman translate dengan popup video otomatis
├── kamus.html          # Kamus BISINDO
├── edukasi.html        # Halaman edukasi inklusif
├── about.html          # Tentang SignBridge+
├── contact.html        # Halaman kontak
├── css/
│   ├── style.css       # CSS utama
│   ├── Home.css        # CSS halaman home
│   └── pages.css       # CSS halaman spesifik
├── js/
│   └── script.js       # JavaScript utama
├── data/
│   └── dictionary.json # Basis data kamus BISINDO
├── videos/             # Video demonstrasi gerakan BISINDO
│   ├── saya.mp4
│   ├── halo.mp4
│   ├── terima kasih.mp4
│   └── Saya makan nasi.mp4
└── README.md
```

<<<<<<< HEAD
## Cara Menjalankan Lokal

1. Clone repositori:

   ```bash
   git clone https://github.com/Marshallmanurung12345/signbridge.git
   cd signbridge
   ```

2. Jalankan server lokal:

   ```bash
   # Menggunakan Python 3
   python -m http.server 8000

   # Atau menggunakan Node.js
   npx serve .
   ```

3. Buka browser dan akses:

   ```
   http://localhost:8000
   ```

4. Navigasi ke halaman translate untuk mencoba fitur popup video otomatis.

5. Atau akses hasil deploy: https://signbridge-bay.vercel.app/
=======
>>>>>>> bc33208548a66d8f8601764e6d54c368cc6d886a

# Enblossom International - Landing Page
> **日本と世界をつなぎ、ご縁を未来へ。**  
> *Blossoming Connections — ご縁を咲かせる*  
> Japan × Indonesia Business, Tourism, Halal, & Import-Export Services

---

Website landing page responsif, modern, dan elegan untuk **Enblossom International**. Dirancang khusus dengan perpaduan estetika Jepang dan Indonesia, tipografi mewah bernuansa emas dan hijau zamrud, serta struktur kode bersih yang siap di-deploy ke **GitHub Pages**, **Vercel**, **Netlify**, atau server mandiri.

---

## 🚀 Fitur Unggulan

- **Responsive Design**: Tampilan optimal di smartphone (iOS/Android), tablet, laptop, dan monitor desktop (4K/Retina).
- **Vektor Logo Resmi**: Logo Enblossom International berbasis SVG presisi tinggi dengan gradasi emas metalik dan teratai zamrud (*emerald lotus*).
- **4 Pilar Layanan Bisnis**:
  - ✈️ ツーリズム事業 (Tourism Services)
  - 🍱 ハラール事業 (Halal Business)
  - 🚢 輸出入・食品事業 (Import, Export & Food Business)
  - 🤝 ビジネスマッチング・事業開発 (Business Development & Matching)
  - Dilengkapi modal interaktif rincian layanan untuk konsultasi langsung.
- **Profil Tim Co-CEO**: Panggilan langsung (*click-to-call*) dan email langsung (*click-to-email*) untuk Teguh Wahyudi & Kiyo Miyazawa.
- **Formulir Kontak Interaktif**: Modal formulir konsultasi terintegrasi dengan validasi input dan kategori topik.
- **Panel Admin CMS Terintegrasi (Password: `12345`)**:
  - Tombol masuk admin dengan ikon gerigi/seting di bagian paling bawah website (footer).
  - Fitur upload logo header format PNG/JPG dengan pratinjau langsung.
  - Fitur ganti poster/banner hero atas.
  - Fitur edit seluruh teks judul, subjudul, dan deskripsi.
  - Fitur ganti foto dan teks untuk 4 layanan bisnis, tentang kami, profil tim, dan kontak.
  - Fitur tambah, edit, dan hapus pengumuman/berita.
  - Tersedia fitur Export/Import data cadangan JSON dan tombol Reset ke Pengaturan Awal.
- **Single Source of Truth**: Semua teks, nomor kontak, alamat, dan data layanan terpusat di `src/data/content.ts` serta tersimpan otomatis di browser (`localStorage`).
- **GitHub Ready**: Dilengkapi konfigurasi path relatif (`base: './'`) dan otomatisasi build **GitHub Actions** untuk deployment instan ke GitHub Pages.

---

## 🛠️ Teknologi yang Digunakan

- **React 19**
- **Vite 6 / 8** (Build tool ultra-cepat)
- **TypeScript**
- **Tailwind CSS v4**
- **Lucide React** (Ikon modern & ringan)
- **Google Fonts** (*Noto Serif JP*, *Cinzel*, *Cormorant Garamond*, *Noto Sans JP*)

---

## 💻 Panduan Menjalankan Secara Lokal

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) (versi 18 atau 20+ disarankan).

1. **Clone repository ini:**
   ```bash
   git clone https://github.com/USERNAME-ANDA/enblossom-international.git
   cd enblossom-international
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Buka browser Anda di `http://localhost:3000` (atau port yang tertera di terminal).

4. **Build untuk produksi:**
   ```bash
   npm run build
   ```
   File hasil build yang siap dipublikasikan akan tersimpan di folder `dist/`.

---

## 📤 Panduan Upload ke GitHub

Jika Anda ingin mengunggah proyek ini ke repository baru di akun GitHub Anda:

1. Buat repository baru di [GitHub](https://github.com/new) (misal bernama `enblossom-landing-page`). Biarkan repositori kosong (jangan centang Add README atau gitignore).

2. Di komputer lokal Anda, buka terminal di folder proyek ini dan jalankan perintah berikut:
   ```bash
   # Inisialisasi git (jika belum ada)
   git init

   # Tambahkan semua file
   git add .

   # Buat commit pertama
   git commit -m "Initial commit: Enblossom International landing page"

   # Ubah nama branch utama menjadi main
   git branch -M main

   # Hubungkan dengan remote repository GitHub Anda (ganti URL sesuai repository Anda)
   git remote add origin https://github.com/USERNAME-ANDA/enblossom-landing-page.git

   # Push ke GitHub
   git push -u origin main
   ```

---

## 🌐 Cara Mengaktifkan Hosting Gratis di GitHub Pages

Repository ini sudah dilengkapi workflow otomatis di `.github/workflows/deploy.yml`.

1. Buka repository Anda di GitHub.
2. Masuk ke menu **Settings** > **Pages** (di sidebar kiri).
3. Pada bagian **Build and deployment** > **Source**, pilih **GitHub Actions**.
4. Selesai! Setiap kali Anda melakukan `git push` ke branch `main`, GitHub akan otomatis mem-build dan mempublikasikan website Anda. URL website Anda akan muncul di tab **Pages** (contoh: `https://USERNAME-ANDA.github.io/enblossom-landing-page/`).

### Alternatif Hosting Lainnya (1-Click Deploy)
- **Vercel**: Cukup import repository dari GitHub di [vercel.com](https://vercel.com). Vercel akan otomatis mengenali proyek Vite dan langsung deploy.
- **Netlify**: Cukup import repository di [netlify.com](https://netlify.com) dengan build command `npm run build` dan publish directory `dist`.

---

## 📁 Struktur Folder Proyek

```text
├── .github/workflows/
│   └── deploy.yml          # Otomatisasi GitHub Actions untuk deployment
├── src/
│   ├── assets/
│   │   ├── images/         # Foto beresolusi tinggi (hero, services, earth, team strip)
│   │   └── images.ts       # Export terpusat untuk semua aset gambar
│   ├── components/
│   │   ├── Logo.tsx        # Komponen logo vektor resmi Enblossom (SVG + teks emas)
│   │   ├── Navbar.tsx      # Navigasi responsif dengan menu mobile & tombol kontak
│   │   ├── Hero.tsx        # Hero banner Jepang x Indonesia dengan lintasan pesawat
│   │   ├── OurBusiness.tsx # 4 kartu layanan bisnis dengan lencana ikon
│   │   ├── AboutUs.tsx     # Cerita perusahaan, bola dunia tunas, dan 3 keunggulan
│   │   ├── OurTeam.tsx     # Profil Co-CEO & strip 5 galeri foto tematik
│   │   ├── NewsSection.tsx # Bagian pengumuman & berita terkini
│   │   ├── ContactSection.tsx # Bagian footer kontak resmi
│   │   ├── ContactModal.tsx   # Modal formulir konsultasi interaktif
│   │   └── ServiceDetailModal.tsx # Modal rincian lengkap setiap layanan
│   ├── data/
│   │   └── content.ts      # 🌟 FILE UTAMA: Semua teks, nomor kontak, & info layanan
│   ├── types/
│   │   └── index.ts        # Definisi antarmuka TypeScript
│   ├── App.tsx             # Komponen utama aplikasi
│   ├── index.css           # Styling Tailwind CSS & utilitas gradasi emas
│   └── main.tsx            # Entry point React
├── index.html              # Entry HTML dengan metadata & font Google
├── package.json            # Daftar dependensi & script
├── tsconfig.json           # Konfigurasi TypeScript
└── vite.config.ts          # Konfigurasi Vite (base: './')
```

---

## ✏️ Cara Mengubah Konten di Masa Depan

Untuk mengganti nomor telepon, email, alamat, nama layanan, atau teks kalimat di website:
1. Buka file **`src/data/content.ts`**.
2. Ubah data sesuai kebutuhan Anda.
3. Jalankan `npm run build` atau langsung `git commit` dan `git push` ke GitHub. Perubahan akan langsung aktif secara otomatis!

---

## 📄 Lisensi
© 2026 Enblossom International. All Rights Reserved.

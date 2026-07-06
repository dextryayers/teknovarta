# TeknoVarta Intelligence Portal

[![Framework: Next.js](https://img.shields.io/badge/Framework-Next.js-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![UI: TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-06B6D4?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![AI: Google Gemini](https://img.shields.io/badge/AI-Google_Gemini-4285F4?style=flat-square&logo=google-gemini)](https://ai.google.dev/)
[![Language: TypeScript](https://img.shields.io/badge/Language-TypeScript-007ACC?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Motion: Framer Motion](https://img.shields.io/badge/Animation-Framer_Motion-FF00C1?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![SEO: Hardened](https://img.shields.io/badge/SEO-Hardened-00C853?style=flat-square)](https://search.google.com/search-console)

![TeknoVarta Banner](/public/images/image.png)

**TeknoVarta** adalah portal cerdas yang menggabungkan database spesifikasi teknologi mendalam dengan asisten AI mutakhir. Dirancang untuk memberikan pengalaman eksplorasi teknologi yang elegan, cepat, dan akurat.

---

## ✨ Fitur Unggulan

- **🧠 TeknoVarta Intelligence (AI Chat)**: Asisten cerdas berbasis Gemini Flash yang memberikan riset teknologi mendalam secara step-by-step.
- **📱 Phone Specification Database**: Data teknis lengkap (Chipset, Kamera, Baterai) dengan skema **JSON-LD Product** untuk SEO maksimal.
- **🔧 Techno-Hacks & Tips**: Panduan teknis prosedural untuk perbaikan dan optimasi perangkat.
- **🚀 SEO Hardened**: Optimasi metadata dinamis, Canonical links, BreadcrumbList, dan Sitemap otomatis untuk visibilitas tinggi di mesin pencari.
- **🎨 Glassmorphism UI**: Desain premium dengan efek blur, mesh gradients, dan animasi mikro yang sangat halus.
- **⚙️ Standalone cPanel Ready**: Teroptimasi khusus untuk deployment di server cPanel menggunakan mode *Next.js Standalone*.

---

## 🛠️ Stack Teknologi

| Komponen | Teknologi |
| :--- | :--- |
| **Core** | [Next.js 15+](https://nextjs.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **AI Engine** | [Google Gemini Flash v1.5 API](https://ai.google.dev/) |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Deployment** | Standalone Node.js (cPanel/VPS Ready) |

---

## 📂 Struktur Project

```bash
├── app/                  # Route Next.js App Router (Artikel, Spek, AI Chat)
├── components/           # UI Components (ArticleCard, Navbar, Footer, dll)
├── lib/                  # Data Statis & Utility (Articles, Phone Specs)
├── public/               # Aset Statis (Logo, ads.txt, robots.txt, ilm.txt)
├── server.js             # Custom wrapper untuk deployment cPanel
├── next.config.ts        # Konfigurasi standalone build
└── package.json          # Dependency & Scripts
```

---

## 🚀 Setup & Instalasi Lokal

1. **Clone Repository**:
   ```bash
   git clone https://github.com/dextryayers/teknovarta.git
   cd teknovarta
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Konfigurasi Environment**: Buat file `.env` di root folder dan tambahkan Gemini API Key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Jalankan Aplikasi**:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

---

## 🌐 Panduan Deployment (cPanel)

Project ini dikonfigurasi menggunakan **Next.js Standalone Mode** agar bisa berjalan di Node.js Selector cPanel.

1. Jalankan `npm run build` di lokal.
2. Zip folder `.next/standalone`, `.next/static`, `public`, dan `server.js`.
3. Upload ke cPanel dan arahkan **Application Startup File** ke `server.js`.
4. Pastikan folder `static` berada di di path `.next/static`.

---

## 👤 Developer

**Hanif Abdurrohim (@hanipLabs)**
*   Website: [haniplabs.com](https://haniplabs.com)
*   Portal: [artikel.haniplabs.com](https://artikel.haniplabs.com)

---

## 📄 Lisensi

Proyek ini dibuat untuk tujuan edukasi dan portal berita teknologi cerdas. Harap mencantumkan atribusi jika ingin dikembangkan lebih lanjut.

---
<p align="center">Made with ❤️ for the Tech Enthusiast Community.</p>

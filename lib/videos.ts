export interface Video {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  tags: string[];
  duration: string;
  views: number;
  date: string;
  author: string;
  aiSummary: string;
}

export const VIDEO_CATEGORIES = [
  { id: 'rakit-pc', name: 'Rakit PC', description: 'Panduan merakit PC dari nol sampai jadi.' },
  { id: 'saran-pc-gaming', name: 'Saran PC Gaming', description: 'Rekomendasi build PC untuk performa gaming maksimal.' },
  { id: 'pc-kantoran', name: 'PC Kantoran', description: 'Solusi PC efisien untuk produktivitas kerja.' },
  { id: 'tutorial-web-dev', name: 'Tutorial Web Dev', description: 'Belajar HTML, CSS, JavaScript, hingga Framework modern.' },
  { id: 'backend-fullstack', name: 'Back End & Fullstack', description: 'Mendalami server-side, database, dan arsitektur aplikasi.' },
  { id: 'service-hp', name: 'Service HP', description: 'Tips perbaikan dan perawatan smartphone.' },
  { id: 'hp-budget-pelajar', name: 'Saran HP Budget Pelajar', description: 'Rekomendasi HP terbaik dengan harga terjangkau.' },
  { id: 'unboxing-hp', name: 'Unboxing HP', description: 'Review jujur gadget terbaru dan legendaris.' },
];

const createYTVideo = (id: string, title: string, slug: string, ytId: string, category: string, tags: string[], duration: string, views: number, date: string): Video => {
  const catName = category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const tagsList = tags.map(t => `  ✅ ${t.charAt(0).toUpperCase() + t.slice(1)}`).join('\n');
  
  const aiSummary = `[ANALISIS OTOMATIS TEKNOVARTA AI]\n\nTayangan bertajuk "${title}" ini merupakan literatur visual esensial dalam kategori ${catName}. Berdasarkan pemindaian transkrip dan sentimen materi, video ini didesain untuk menjembatani kesenjangan teknis antara teori dasar dan implementasi industri nyata.\n\n📌 RINCIAN DESKRIPSI & TOPIK BAHASAN:\n- Pendahuluan Komprehensif: Mengupas definisi dan peta konsep ekosistem ${catName} secara terstruktur.\n- Metodologi Praktis: Menjelaskan workflow (alur kerja) teknis step-by-step yang biasa diadopsi oleh profesional.\n- Evaluasi & Studi Kasus: Menganalisis kelebihan, batasan, efisiensi waktu, serta perbandingan solusi alternatif secara objektif.\n\n🔑 FOKUS MATERI (KEY TAKEAWAYS):\n${tagsList}\n\n💡 INSIGHT REDAKSI:\nDalam rentang waktu ${duration}, materi ini secara padat merangkum ratusan halaman dokumentasi teknis menjadi panduan visual interaktif. Sangat direkomendasikan bagi penonton yang membutuhkan asupan informasi teknologi berbobot tingkat tinggi (high-level insight). Author mengemasnya tanpa basa-basi, langsung pada akar masalah, sehingga pengetahuan yang Anda peroleh dapat seketika diuji-coba pada proyek atau rutinitas digital Anda hari ini.`;

  return {
    id,
    title,
    slug,
    thumbnail: `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`,
    videoUrl: `https://www.youtube.com/embed/${ytId}?cc_load_policy=1&hl=id&cc_lang_pref=id`,
    category,
    tags,
    duration,
    views,
    date,
    author: 'Hanif Abdurrohim',
    aiSummary
  };
};

export const VIDEOS: Video[] = [
  // === Rakit PC (10 Videos) ===
  createYTVideo('v1', 'Cara Rakit PC Gaming 2026: Full Guide untuk Pemula', 'cara-rakit-pc-gaming-2026', 'hSyAey42eXU', 'rakit-pc', ['rakit pc', 'gaming', 'pemula'], '25:40', 145000, '2026-04-10'),
  createYTVideo('v2', 'PC Gaming 5 Juta: Bisa Main Apa Aja?', 'pc-gaming-5-juta', '8z1PaCq-v24', 'rakit-pc', ['rakit pc', 'budget', '5 juta'], '18:20', 89000, '2026-04-05'),
  createYTVideo('v3', 'Rakit PC High End Tanpa Kabel (Zero Cable Build)', 'rakit-pc-zero-cable-build', 'k-mRa63vIk4', 'rakit-pc', ['rakit pc', 'high end', 'aesthetic'], '15:10', 53000, '2026-03-28'),
  createYTVideo('v4', 'Kesalahan Rakit PC yang Sering Dilakukan Pemula', 'kesalahan-rakit-pc-pemula', '_YTGowgx4ZA', 'rakit-pc', ['rakit pc', 'tips', 'pemula'], '12:45', 67000, '2026-03-20'),
  createYTVideo('v5', 'Review Komponen PC Gaming Paling Worth It Tahun Ini', 'review-komponen-pc-gaming-2026', 'RHQ90LzpoNU', 'rakit-pc', ['rakit pc', 'komponen', 'review'], '22:15', 34000, '2026-03-15'),
  createYTVideo('v6', 'PC Gaming Bekas vs Baru: Mana yang Lebih Baik?', 'pc-gaming-bekas-vs-baru', 'D_ILGHK4zHM', 'rakit-pc', ['rakit pc', 'bekas', 'perbandingan'], '16:50', 52000, '2026-03-01'),
  createYTVideo('v7', 'Panduan Memilih Motherboard untuk RTX 60 Series', 'panduan-memilih-motherboard-rtx-60', 'kNpS6VVFjfw', 'rakit-pc', ['rakit pc', 'motherboard', 'rtx 60'], '11:20', 12000, '2026-02-15'),
  createYTVideo('v8', 'Rakit PC Gaming Sultan 100 Juta: Overkill!', 'rakit-pc-gaming-sultan-100-juta', 'hSyAey42eXU', 'rakit-pc', ['rakit pc', 'sultan', '100 juta'], '30:00', 125000, '2026-02-01'),
  createYTVideo('v9', 'PC Gaming Lipat Pertama: Teknologi Masa Depan?', 'pc-gaming-lipat-pertama', '8z1PaCq-v24', 'rakit-pc', ['rakit pc', 'inovasi', 'lipat'], '14:35', 18000, '2026-01-20'),
  createYTVideo('v10', 'Bersih-Bersih PC: Cara Melindungi Komponen dari Debu', 'bersih-bersih-pc-guide', 'k-mRa63vIk4', 'rakit-pc', ['rakit pc', 'maintenance', 'tips'], '09:50', 31000, '2026-01-05'),

  // === Tutorial Web Dev (10 Videos) ===
  createYTVideo('v11', 'Belajar HTML Dasar untuk Pemula (Full Tutorial)', 'belajar-html-dasar-pemula', '3U1AhjEf7DM', 'tutorial-web-dev', ['html', 'dasar', 'pemula'], '45:00', 156000, '2026-04-15'),
  createYTVideo('v12', 'CSS Grid & Flexbox: Layout Modern dengan Mudah', 'css-grid-flexbox-tutorial', 'G3e-cpL7ofc', 'tutorial-web-dev', ['css', 'flexbox', 'grid'], '32:20', 84000, '2026-04-10'),
  createYTVideo('v13', 'JavaScript Modern (ES6+): Menuju Web Dev Master', 'javascript-modern-es6-tutorial', '3Jgju76gS2g', 'tutorial-web-dev', ['js', 'es6', 'javascript'], '55:10', 92000, '2026-04-01'),
  createYTVideo('v14', 'Next.js 15 Full Tutorial: Dari Project Pertama ke Deployment', 'nextjs-15-full-tutorial', '5JwWqjd4e9o', 'tutorial-web-dev', ['nextjs', 'react', 'deployment'], '1:20:00', 65000, '2026-03-25'),
  createYTVideo('v15', 'Tailwind CSS v4: Slicing UI Berita dalam 30 Menit', 'tailwind-css-v4-slicing-tutorial', 'WyTIjLegirE', 'tutorial-web-dev', ['tailwind', 'css', 'slicing'], '35:45', 42000, '2026-03-15'),
  createYTVideo('v16', 'React Hooks Lengkap: UseState, UseEffect, Context & Ref', 'react-hooks-lengkap-tutorial', '9LhW_3TEx0A', 'tutorial-web-dev', ['react', 'hooks', 'frontend'], '48:15', 37000, '2026-03-01'),
  createYTVideo('v17', 'TypeScript Dasar: Mengapa Developer Harus Pindah dari JS?', 'typescript-dasar-tutorial', 'kcnwI_5nKyA', 'tutorial-web-dev', ['typescript', 'ts', 'js'], '40:30', 28000, '2026-02-15'),
  createYTVideo('v18', 'Membuat Website Portfolio Profesional dengan Framer Motion', 'website-portfolio-framer-motion-tutorial', 'C_59FfN7TGo', 'tutorial-web-dev', ['framer motion', 'portfolio', 'animation'], '52:00', 19000, '2026-02-01'),
  createYTVideo('v19', 'Aura UI & Shadcn: Cara Cepat Bikin UI Keren!', 'aura-ui-shadcn-tutorial', '3U1AhjEf7DM', 'tutorial-web-dev', ['shadcn', 'ui', 'components'], '28:10', 25000, '2026-01-20'),
  createYTVideo('v20', 'Deploy Website ke Vercel & Netlify (Step by Step)', 'deploy-website-tutorial', '3Jgju76gS2g', 'tutorial-web-dev', ['deploy', 'vercel', 'host'], '18:40', 14000, '2026-01-05'),

  // === Service HP (10 Videos) ===
  createYTVideo('v21', 'Ganti LCD Samsung S24 Tanpa Bongkar Mesin (Fast Service)', 'ganti-lcd-samsung-s24-tutorial', 'oZ4K1mO_hSg', 'service-hp', ['service', 'lcd', 'samsung'], '22:15', 54000, '2026-04-12'),
  createYTVideo('v22', 'Baterai iPhone Boros? Cek Kondisi & Cara Gantinya Sendiri', 'ganti-baterai-iphone-boros-tutorial', 'w74-x8t5K1k', 'service-hp', ['service', 'battery', 'iphone'], '18:50', 112000, '2026-04-05'),
  createYTVideo('v23', 'HP Kena Air? Jangan Dimasukkan Beras! Lakukan Ini!', 'hp-kena-air-tips-penyelamatan', 'eX_P-F_N9_o', 'service-hp', ['service', 'air', 'tips'], '10:10', 245000, '2026-03-25'),
  createYTVideo('v24', 'Service Port Charger HP yang Longgar (Hanya 10 Menit)', 'service-port-charger-hp-tutorial', '4yW4X-hS-X4', 'service-hp', ['service', 'charger', 'gadget'], '12:30', 38000, '2026-03-15'),
  createYTVideo('v25', 'Root & Pasang Custom ROM di Tahun 2026: Masih Berhargakah?', 'root-custom-rom-2026-diskusi', 'U9P-Lz7A8_E', 'service-hp', ['service', 'root', 'custom rom'], '35:20', 19000, '2026-03-01'),
  createYTVideo('v26', 'Cara Mengatasi HP Overheat saat Main Game Berat', 'mengatasi-hp-overheat-tips', '6_tU-bA-yE0', 'service-hp', ['service', 'overheat', 'gaming'], '14:45', 67000, '2026-02-20'),
  createYTVideo('v27', 'Layar HP Burn-In? Bisakah Diperbaiki Lewat Software?', 'service-hp-burn-in-diskusi', 'W2S2uBfC6_U', 'service-hp', ['service', 'burn-in', 'display'], '11:55', 29000, '2026-02-05'),
  createYTVideo('v28', 'Review Alat Service HP Profesional untuk Pemula', 'alat-service-hp-review', 'NBZ7LHU6fT8', 'service-hp', ['service', 'tools', 'review'], '26:10', 15000, '2026-01-25'),
  createYTVideo('v29', 'HP Mati Total? Cek IC Power Dahulu Sebelum Buang Mesin', 'hp-mati-total-ic-power-guide', 'Mlk_N0D_J2I', 'service-hp', ['service', 'ic power', 'mati total'], '42:00', 31000, '2026-01-10'),
  createYTVideo('v30', 'Cara Aman Membuka Backdoor HP Tanpa Merusak Lem Waterproof', 'membuka-backdoor-hp-tutorial', 'XgSC9V69K14', 'service-hp', ['service', 'backdoor', 'waterproof'], '15:30', 22000, '2026-01-01'),

  // === Saran PC Gaming (10 Videos) ===
  createYTVideo('v31', 'Saran PC Gaming 10 Juta: Spek Paling Optimal di 2026', 'saran-pc-gaming-10-juta-2026', '-WRAphCZb8o', 'saran-pc-gaming', ['saran pc', 'gaming', '10 juta'], '18:45', 65400, '2026-04-18'),
  createYTVideo('v32', 'PC Gaming vs Konsol: Mana yang Layak Dibeli Tahun Ini?', 'pc-gaming-vs-konsol-perbandingan', '4sIu86EpiS8', 'saran-pc-gaming', ['saran pc', 'konsol', 'gaming'], '22:10', 43200, '2026-04-10'),
  createYTVideo('v33', 'Saran Build PC Gaming Mini-ITX: Kecil Tapi Sadis!', 'saran-build-pc-mini-itx', 'y-qw2te4-Mo', 'saran-pc-gaming', ['saran pc', 'mini itx', 'gaming'], '15:30', 29800, '2026-04-01'),
  createYTVideo('v34', 'PC Gaming 20 Juta: Siap Libas Game AAA 4K Ultra', 'pc-gaming-20-juta-4k', 'ky50yK0VgH0', 'saran-pc-gaming', ['saran pc', '20 juta', '4k gaming'], '25:50', 87600, '2026-03-25'),
  createYTVideo('v35', 'Build PC Gaming Streamer: Performa Gahar Tanpa Lag', 'build-pc-gaming-streamer', 'oNgiEnZbY8A', 'saran-pc-gaming', ['saran pc', 'streaming', 'streamer'], '19:15', 34500, '2026-03-15'),
  createYTVideo('v36', 'Upgrade PC Gaming Lama Agar Ngebut Lagi di 2026', 'upgrade-pc-gaming-lama-tips', 'F2zFzgvZLUc', 'saran-pc-gaming', ['saran pc', 'upgrade', 'tips'], '14:20', 56700, '2026-03-01'),
  createYTVideo('v37', 'Saran PC Gaming Hemat Listrik: Peforma Tetap Terjaga', 'pc-gaming-hemat-listrik-saran', 'kNpS6VVFjfw', 'saran-pc-gaming', ['saran pc', 'hemat listrik', 'gaming'], '11:40', 12300, '2026-02-15'),
  createYTVideo('v38', 'Top 5 VGA Paling Worth It di 2026 untuk Gaming', 'top-5-vga-worth-it-2026', '-WRAphCZb8o', 'saran-pc-gaming', ['saran pc', 'vga', 'gaming'], '30:15', 98100, '2026-02-01'),
  createYTVideo('v39', 'PC Gaming Tanpa GPU? Cek APU Terbaik Tahun 2026', 'pc-gaming-apu-terbaik-2026', '4sIu86EpiS8', 'saran-pc-gaming', ['saran pc', 'apu', 'gaming'], '16:00', 24500, '2026-01-15'),
  createYTVideo('v40', 'Build PC Gaming Putih (Full White): Sangat Clean!', 'build-pc-gaming-putih-clean', 'y-qw2te4-Mo', 'saran-pc-gaming', ['saran pc', 'white build', 'aesthetic'], '20:30', 45600, '2026-01-01'),

  // === PC Kantoran (10 Videos) ===
  createYTVideo('v41', 'Saran PC Kantoran 3 Juta: Lancar Jaya Buat Office', 'pc-kantoran-3-juta-saran', '-RsUt_3hgTI', 'pc-kantoran', ['pc kantor', 'budget', 'office'], '12:15', 34200, '2026-04-15'),
  createYTVideo('v42', 'Monitor PC Kantor Terbaik: Mata Gak Capek Lagi!', 'monitor-pc-kantor-terbaik', 'lcjh4723BuI', 'pc-kantoran', ['pc kantor', 'monitor', 'eye care'], '15:40', 12500, '2026-04-05'),
  createYTVideo('v43', 'Mini PC Kantor yang Powerful: Hemat Meja Kerja!', 'mini-pc-kantor-powerful', 'zhnTSP8rK_4', 'pc-kantoran', ['pc kantor', 'mini pc', 'produktivitas'], '18:10', 29800, '2026-03-25'),
  createYTVideo('v44', 'Laptop vs PC Kantor: Mana yang Lebih Worth It untuk Redaksi?', 'laptop-vs-pc-kantor-perbandingan', 'wVD2rsuqrg4', 'pc-kantoran', ['pc kantor', 'laptop', 'comparison'], '22:30', 18700, '2026-03-15'),
  createYTVideo('v45', 'Setup PC Kantor Minimalis untuk Meningkatkan Fokus', 'setup-pc-kantor-minimalis', 'D-bbPnZxSUA', 'pc-kantoran', ['pc kantor', 'setup', 'minimalis'], '14:20', 56200, '2026-03-05'),
  createYTVideo('v46', 'PC Kantor Editing Video Harga Mahasiswa', 'pc-kantor-editing-video-murah', 'fgO3QEGO8kc', 'pc-kantoran', ['pc kantor', 'editing', 'budget'], '25:15', 87100, '2026-02-20'),
  createYTVideo('v47', 'Rekomendasi Keyboard & Mouse Silent untuk Kantor', 'keyboard-mouse-silent-kantor', '_0LN2UNS0yI', 'pc-kantoran', ['pc kantor', 'peripherals', 'silent'], '11:45', 24300, '2026-02-10'),
  createYTVideo('v48', 'Mengatasi PC Kantor Lemot Tanpa Instal Ulang', 'mengatasi-pc-kantor-lemot-tips', '-RsUt_3hgTI', 'pc-kantoran', ['pc kantor', 'lemot', 'optimization'], '19:30', 65400, '2026-02-01'),
  createYTVideo('v49', 'PC Server Kantor Sederhana untuk Small Business', 'pc-server-kantor-sederhana', 'lcjh4723BuI', 'pc-kantoran', ['pc kantor', 'server', 'business'], '32:10', 12800, '2026-01-20'),
  createYTVideo('v50', 'Upgrade SSD untuk PC Kantor Lama: Efeknya Gila!', 'upgrade-ssd-pc-kantor-lama', 'zhnTSP8rK_4', 'pc-kantoran', ['pc kantor', 'ssd', 'upgrade'], '13:00', 92400, '2026-01-05'),

  // === Back End & Fullstack (10 Videos) ===
  createYTVideo('v51', 'Back End Roadmap 2026: Bahasa Mana yang Paling Cuan?', 'backend-roadmap-2026', 'bl93K8d1ZF4', 'backend-fullstack', ['backend', 'roadmap', 'fullstack'], '42:15', 54200, '2026-04-18'),
  createYTVideo('v52', 'Belajar Node.js + Express: Bikin REST API Pertama Anda', 'belajar-nodejs-express-api', '1oTuMPIwHmk', 'backend-fullstack', ['backend', 'nodejs', 'api'], '55:40', 87400, '2026-04-05'),
  createYTVideo('v53', 'Database SQL vs NoSQL: Mana yang Terbaik untuk Project Anda?', 'database-sql-vs-nosql-perbandingan', '4r6WdaY3SOA', 'backend-fullstack', ['backend', 'database', 'sql'], '28:10', 29500, '2026-03-22'),
  createYTVideo('v54', 'Fullstack Next.js + Supabase: Tutorial Aplikasi E-Commerce', 'fullstack-nextjs-supabase-ecommerce', 'skXQdq_BMkI', 'backend-fullstack', ['fullstack', 'nextjs', 'supabase'], '2:15:00', 12400, '2026-03-10'),
  createYTVideo('v55', 'Keamanan Backend: Cara Mencegah SQL Injection & XSS', 'keamanan-backend-tips-security', 'p4CtkBFrPrs', 'backend-fullstack', ['backend', 'security', 'cyber'], '35:20', 45600, '2026-02-28'),
  createYTVideo('v56', 'Microservices vs Monolith: Kapan Harus Pindah Arsitektur?', 'microservices-vs-monolith-arsitektur', 'VcwN0nms30I', 'backend-fullstack', ['backend', 'microservices', 'architecture'], '32:45', 18200, '2026-02-15'),
  createYTVideo('v57', 'Belajar Python Flask: Bikin Blog Engine Sederhana', 'belajar-python-flask-blog', '33nGS4mfFhY', 'backend-fullstack', ['backend', 'python', 'flask'], '48:30', 67100, '2026-02-01'),
  createYTVideo('v58', 'Deploy Backend Anda ke AWS & Docker: Full Guide', 'deploy-backend-aws-docker', 'bl93K8d1ZF4', 'backend-fullstack', ['backend', 'docker', 'aws'], '1:05:00', 31200, '2026-01-20'),
  createYTVideo('v59', 'Fullstack Laravel + Livewire: Realtime Chat Application', 'fullstack-laravel-livewire-chat', '1oTuMPIwHmk', 'backend-fullstack', ['fullstack', 'laravel', 'php'], '1:40:00', 56900, '2026-01-10'),
  createYTVideo('v60', 'Tips Lulus Interview Fullstack Developer di Tahun 2026', 'interview-fullstack-developer-tips-2026', '4r6WdaY3SOA', 'backend-fullstack', ['fullstack', 'career', 'interview'], '22:00', 92400, '2026-01-01'),

  // === Saran HP Budget Pelajar (10 Videos) ===
  createYTVideo('v61', 'Top 5 HP 2 Jutaan Terbaik untuk Pelajar (Edisi 2026)', 'hp-2-jutaan-terbaik-pelajar-2026', 'V-_O7nl0Ii0', 'hp-budget-pelajar', ['saran hp', 'pelajar', '2 juta'], '12:35', 125400, '2026-04-15'),
  createYTVideo('v62', 'HP Sejutaan Udah Bisa Main Genshin? Cek Review-nya!', 'hp-sejutaan-gaming-review', 'tVlcKp3bWH8', 'hp-budget-pelajar', ['saran hp', 'budget', 'gaming'], '15:20', 89700, '2026-04-05'),
  createYTVideo('v63', 'Beli HP Bekas Flagship vs Baru Entry Level? Jawaban Pasti!', 'hp-bekas-flagship-vs-baru-entry-level', 'PT2_F-1esPk', 'hp-budget-pelajar', ['saran hp', 'bekas', 'perbandingan'], '18:50', 43200, '2026-03-25'),
  createYTVideo('v64', 'HP Samsung Paling Murah yang Layak Dibeli Pelajar', 'hp-samsung-murah-pelajar-saran', '3JZ_D3ELwOQ', 'hp-budget-pelajar', ['saran hp', 'samsung', 'pelajar'], '22:10', 56700, '2026-03-12'),
  createYTVideo('v65', 'Review Xiaomi Redmi K Series: Monster Performa Harga Pelajar', 'xiaomi-redmi-k-series-review', 'kffacxfA7G4', 'hp-budget-pelajar', ['saran hp', 'xiaomi', 'review'], '25:35', 128000, '2026-03-01'),
  createYTVideo('v66', 'HP 3 Jutaan Kamera Mirip iPhone? Ada Kok!', 'hp-3-jutaan-kamera-bagus-saran', 'd-diB65scQU', 'hp-budget-pelajar', ['saran hp', 'kamera', 'pelajar'], '14:20', 65400, '2026-02-20'),
  createYTVideo('v67', 'Alasan Gak Boleh Beli HP Spek Dewa Tapi Harga Ghoib', 'hindari-hp-spek-dewa-harga-ghoib', 'YvkperweK8w', 'hp-budget-pelajar', ['saran hp', 'tips', 'shopping'], '10:55', 34100, '2026-02-10'),
  createYTVideo('v68', 'HP Google Pixel Bekas: Worth It Banget di 2026!', 'hp-google-pixel-bekas-review-2026', 'JGwWNGJdvx8', 'hp-budget-pelajar', ['saran hp', 'pixel', 'bekas'], '21:10', 87600, '2026-02-01'),
  createYTVideo('v69', 'Rekomendasi HP RAM 12GB Murah untuk Multitasking Tugas', 'hp-ram-12gb-murah-pelajar-saran', 'fLexgOxsZu0', 'hp-budget-pelajar', ['saran hp', 'ram', 'pelajar'], '16:00', 29500, '2026-01-20'),
  createYTVideo('v70', 'HP Jadul Spek Gahar yang Masih Layak Pakai 2026', 'hp-jadul-masih-layak-pakai-2026', 'CevxZvSJLk8', 'hp-budget-pelajar', ['saran hp', 'jadul', 'review'], '32:30', 54100, '2026-01-05'),

  // === Unboxing HP (10 Videos) ===
  createYTVideo('v71', 'Unboxing iPhone 17 Pro Max: Titan Gold-nya Gila Banget!', 'unboxing-iphone-17-pro-max', 'VPRjCeoBqrI', 'unboxing-hp', ['unboxing', 'iphone 17', 'terbaru'], '15:20', 456000, '2026-04-20'),
  createYTVideo('v72', 'Unboxing HP Nokia Paling Legendaris: Masih Bisa Nyala Gak?', 'unboxing-nokia-legendaris-terlama', 'YQHsXMglC9A', 'unboxing-hp', ['unboxing', 'nokia', 'terlama'], '18:45', 125400, '2026-04-10'),
  createYTVideo('v73', 'Unboxing Samsung Galaxy Z Fold 8: Lipatan Hilang Total!', 'unboxing-samsung-z-fold-8', 'L_jWHffIx5E', 'unboxing-hp', ['unboxing', 'samsung', 'foldable'], '22:10', 342100, '2026-04-01'),
  createYTVideo('v74', 'Unboxing HP Cina 1 Jutaan: Spek-nya Gak Masuk Akal!', 'unboxing-hp-cina-murah-review', '09R8_2nJtjg', 'unboxing-hp', ['unboxing', 'budget', 'gadget'], '12:55', 187600, '2026-03-20'),
  createYTVideo('v75', 'Unboxing Nothing Phone (3): Glyph Interface Generasi Baru', 'unboxing-nothing-phone-3', 'hTWKbfoikeg', 'unboxing-hp', ['unboxing', 'nothing phone', 'review'], '16:40', 298000, '2026-03-05'),
  createYTVideo('v76', 'Unboxing HP Pertama di Dunia (Motorola DynaTAC) - Gede Banget!', 'unboxing-hp-pertama-dunia-motorola', 'V-_O7nl0Ii0', 'unboxing-hp', ['unboxing', 'motorola', 'sejarah'], '35:20', 128700, '2026-02-25'),
  createYTVideo('v77', 'Unboxing Laptop Gaming Predator Helios 2026: RGB-nya Silau!', 'unboxing-predator-helios-laptop-gaming', 'tVlcKp3bWH8', 'unboxing-hp', ['unboxing', 'laptop', 'gaming'], '21:15', 92400, '2026-02-15'),
  createYTVideo('v78', 'Unboxing HP Gaming ROG Phone 10: Paket Penjualan Termewah', 'unboxing-rog-phone-10-ultimate', 'PT2_F-1esPk', 'unboxing-hp', ['unboxing', 'rog phone', 'gaming'], '30:45', 567100, '2026-02-01'),
  createYTVideo('v79', 'Unboxing Google Pixel 10: HP AI Terbaik Tahun Ini', 'unboxing-google-pixel-10-ai', '3JZ_D3ELwOQ', 'unboxing-hp', ['unboxing', 'google', 'pixel'], '20:10', 231400, '2026-01-20'),
  createYTVideo('v80', 'Unboxing BlackBerry Masa Depan: Konsep Tahun 2026', 'unboxing-blackberry-konsep-2026', 'kffacxfA7G4', 'unboxing-hp', ['unboxing', 'blackberry', 'konsep'], '15:30', 45600, '2026-01-05'),
];

import { 
  ShieldCheck, 
  Smartphone, 
  Laptop, 
  HardDrive, 
  Cpu, 
  Settings, 
  Key, 
  Lock, 
  MousePointer2, 
  Hammer,
  Wind
} from 'lucide-react';

export interface TipStep {
  title: string;
  description: string;
}

export interface Tip {
  id: string;
  slug: string;
  categorySlug: 'perawatan-hp' | 'laptop' | 'pc' | 'mengamankan';
  title: string;
  description: string;
  category: string;
  icon: any;
  difficulty: 'Mudah' | 'Menengah' | 'Sulit';
  toolsNeeded?: string[];
  steps: TipStep[];
  warning?: string;
}

export const TIPS_DATA: Tip[] = [
  // PERAWATAN HP
  {
    id: "ganti-lcd-smartphone-mandiri",
    slug: "ganti-lcd-smartphone-mandiri",
    categorySlug: "perawatan-hp",
    title: "Panduan Ganti LCD Smartphone Mandiri",
    description: "Cara mengganti layar HP yang pecah dengan peralatan mandiri di rumah tanpa harus ke tukang servis.",
    category: "Perawatan HP",
    icon: Smartphone,
    difficulty: "Sulit",
    toolsNeeded: ["Set Obeng Presisi", "Suction Cup", "Spudger/Prying Tool", "Heat Gun/Hair Dryer", "Lem B-7000/T-7000"],
    steps: [
      { title: "Persiapan & Matikan Perangkat", description: "Pastikan HP dalam kondisi mati total dan lepaskan SIM Tray untuk menghindari kerusakan pada slot saat pembukaan casing." },
      { title: "Panaskan Perekat Layar", description: "Gunakan heat gun atau hair dryer di sekeliling pinggiran layar selama 2-3 menit untuk melunakkan lem perekat." },
      { title: "Gunakan Suction Cup", description: "Pasang suction cup di bagian bawah layar, tarik perlahan hingga muncul celah tipis di antara layar dan frame." },
      { title: "Sisipkan Spudger", description: "Masukkan prying tool atau kartu tipis ke dalam celah, lalu geser perlahan memutari frame untuk melepas sisa lem." },
      { title: "Buka & Lepas Konektor Baterai", description: "Setelah layar terangkat sedikit, jangan ditarik paksa. Lepas baut pelindung dan cabut konektor baterai TERLEBIH DAHULU untuk keamanan kelistrikan." },
      { title: "Pasang LCD Baru & Testing", description: "Hubungkan kabel fleksibel LCD baru, pasang baterai kembali, lalu nyalakan HP untuk tes sentuh dan warna sebelum di-lem permanen." }
    ],
    warning: "Kesalahan pada pelepasan konektor baterai dapat menyebabkan korsleting pada motherboard (IC Power)."
  },
  {
    id: "bersihkan-speaker-hp-sember",
    slug: "bersihkan-speaker-hp-sember",
    categorySlug: "perawatan-hp",
    title: "Mengatasi Speaker HP Sember & Kecil",
    description: "Tips membersihkan grill speaker yang tertutup debu atau terkena air tanpa membongkar mesin.",
    category: "Perawatan HP",
    icon: Wind,
    difficulty: "Mudah",
    steps: [
      { title: "Gunakan Sikat Gigi Halus", description: "Gunakan sikat gigi bekas yang benar-benar kering. Sikat grill speaker dengan gerakan memutar perlahan." },
      { title: "Gunakan Blue Tack / Pembersih Perekat", description: "Tekan-tekankan Blue Tack ke lubang speaker agar debu halus menempel dan terangkat keluar." },
      { title: "Aplikasi Sonic Cleaner", description: "Cari video 'Speaker Cleaner Sound' di YouTube. Putar dengan volume maksimal untuk menggetarkan debu keluar melalui gelombang suara frekuensi tinggi." }
    ]
  },

  // LAPTOP
  {
    id: "upgrade-ssd-nvme-laptop",
    slug: "upgrade-ssd-nvme-laptop",
    categorySlug: "laptop",
    title: "Upgrade SSD NVMe untuk Performa Maksimal",
    description: "Cara mengganti SSD bawaan atau HDD lama ke SSD NVMe yang jauh lebih cepat.",
    category: "Laptop",
    icon: HardDrive,
    difficulty: "Menengah",
    toolsNeeded: ["Obeng Philips (+)", "Prying Tool", "SSD NVMe M.2"],
    steps: [
      { title: "Cek Kompatibilitas", description: "Pastikan laptop Anda memiliki slot M.2 NVMe. Beberapa laptop lama hanya mendukung M.2 SATA." },
      { title: "Buka Casing Bawah", description: "Lepas semua baut casing belakang laptop. Simpan baut sesuai urutan letaknya karena seringkali memiliki panjang berbeda." },
      { title: "Wajib Lepas Konektor Baterai", description: "Cabut kabel baterai yang terhubung ke motherboard untuk menghindari percikan api saat memasang SSD." },
      { title: "Pasang & Kencangkan", description: "Masukkan SSD ke slot dengan kemiringan 30 derajat, tekan ke bawah, lalu kencangkan baut pengunci SSD (Screw M2)." }
    ],
    warning: "Memegang komponen Motherboard tanpa grounding (membuang listrik statis) bisa merusak chipset sensitif."
  },
  {
    id: "cara-ganti-keyboard-laptop-internal",
    slug: "cara-ganti-keyboard-laptop-internal",
    categorySlug: "laptop",
    title: "Ganti Keyboard Laptop Internal Sendiri",
    description: "Panduan melepas keyboard yang macet atau sering mengetik sendiri (ghost typing).",
    category: "Laptop",
    icon: Hammer,
    difficulty: "Sulit",
    steps: [
      { title: "Identifikasi Tipe Keyboard", description: "Apakah keyboard laptop Anda tipe 'Top Mount' (bisa dicungkil dari atas) atau 'Back Mount' (harus bongkar total dari bawah)." },
      { title: "Bongkar Komponen Penghalang", description: "Untuk tipe Back Mount, Anda harus melepas motherboard dan baterai terlebih dahulu karena keyboard berada di lapisan paling bawah." },
      { title: "Lepas Keling Plastik", description: "Banyak laptop modern menggunakan keling plastik yang dilelehkan. Anda harus memotongnya secara hati-hati agar bisa melepas keyboard lama." },
      { title: "Kunci Keyboard Baru", description: "Pasang keyboard baru dan gunakan lem tembak atau solder plastik untuk mengunci kembali posisi keyboard agar tidak goyang saat diketik." }
    ]
  },

  // PC
  {
    id: "manajemen-kabel-pc-gaming",
    slug: "manajemen-kabel-pc-gaming",
    categorySlug: "pc",
    title: "Manajemen Kabel PC Agar Airflow Optimal",
    description: "Trik merapikan kabel di dalam casing agar suhu tetap dingin dan tampilan estetik.",
    category: "PC",
    icon: Settings,
    difficulty: "Menengah",
    toolsNeeded: ["Cable Ties / Velcro", "Gunting potong"],
    steps: [
      { title: "Gunakan Ruang Belakang Casing", description: "Tarik semua kabel dari PSU ke bagian panel belakang casing (cable management area)." },
      { title: "Kelompokkan Kabel Berdekatan", description: "Ikat kabel power motherboard (24-pin), CPU, dan GPU menjadi satu jalur utama menggunakan Velcro." },
      { title: "Hindari Tumpukan di Depan Fan", description: "Pastikan tidak ada kabel yang melintang langsung di depan kipas intake agar aliran udara masuk tidak terhambat." }
    ]
  },
  {
    id: "panduan-rakit-pc-pemula",
    slug: "panduan-rakit-pc-pemula",
    categorySlug: "pc",
    title: "Panduan Dasar Rakit PC untuk Pemula",
    description: "Langkah aman merakit komputer dari Nol sampai menyala (POST).",
    category: "PC",
    icon: Cpu,
    difficulty: "Sulit",
    steps: [
      { title: "Pasang Prosedor di Motherboard", description: "Buka pengunci socket, letakkan CPU sesuai tanda segitiga di pojok. Jangan pernah menekan CPU, biarkan ia jatuh dengan pas." },
      { title: "Pasang RAM & SSD M.2", description: "Pasang komponen kecil ini di motherboard SEBELUM motherboard dimasukkan ke dalam casing agar lebih leluasa." },
      { title: "Pasang Stand-off Casing", description: "Pastikan posisi baut stand-off di casing sudah sesuai dengan lubang di motherboard Anda." },
      { title: "Tes Nyala (POST Test)", description: "Nyalakan PC sebelum merapikan semua kabel untuk memastikan semua komponen terbaca di BIOS." }
    ]
  },

  // MENGAMANKAN (CYBER)
  {
    id: "mengamankan-akun-sosmed-phishing",
    slug: "mengamankan-akun-sosmed-phishing",
    categorySlug: "mengamankan",
    title: "Proteksi Akun dari Serangan Phishing",
    description: "Cara jitu mengamankan Instagram, Facebook, dan WhatsApp dari hacker.",
    category: "Mengamankan",
    icon: Lock,
    difficulty: "Mudah",
    steps: [
      { title: "Cek Aktivitas Login", description: "Buka menu keamanan akun Anda dan cek 'Where You're Logged In'. Logout dari perangkat yang tidak dikenal segera." },
      { title: "Gunakan Password Manager", description: "Jangan gunakan satu password untuk semua akun. Gunakan Bitwarden atau 1Password untuk membuat password unik yang rumit." },
      { title: "Ubah Setelan Privasi", description: "Pastikan nomor HP dan email Anda tidak terlihat oleh publik (Set ke 'Only Me') untuk mencegah social engineering." }
    ]
  },
  {
    id: "aktifkan-2fa-authenticator",
    slug: "aktifkan-2fa-authenticator",
    categorySlug: "mengamankan",
    title: "WAJIB: Aktifkan 2FA dengan Aplikasi",
    description: "Mengapa Anda harus berhenti menggunakan SMS OTP dan beralih ke App Authenticator.",
    category: "Mengamankan",
    icon: Key,
    difficulty: "Mudah",
    steps: [
      { title: "Hapus Verifikasi SMS", description: "SMS OTP sangat rawan dibajak melalui 'SIM Swap'. Matikan fitur ini di setelan Gmail/Sosmed Anda." },
      { title: "Instal Google/Microsoft Authenticator", description: "Gunakan aplikasi ini untuk men-generate kode login. Kode ini tidak butuh sinyal seluler dan lebih aman." },
      { title: "Simpan Backup Code", description: "Setelah mengaktifkan 2FA, simpan 8-10 digit 'Backup Codes' di tempat aman (fisik) agar Anda tidak terkunci jika HP hilang." }
    ]
  }
];

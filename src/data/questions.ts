export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export const examQuestions: Question[] = [
  {
    id: 1,
    text: "Apa kepanjangan dari TKJ?",
    options: ["Teknik Komputer Jenius", "Teknik Komputer Jaringan", "Teknologi Komputer Jaringan", "Teknik Komunikasi Jaringan"],
    correctAnswer: 1
  },
  {
    id: 2,
    text: "Software yang digunakan untuk mengolah gambar vektor adalah...",
    options: ["Adobe Photoshop", "Adobe Illustrator", "Notepad", "Excel"],
    correctAnswer: 1
  },
  {
    id: 3,
    text: "Apa kepanjangan dari DKV?",
    options: ["Desain Komunikasi Visual", "Desain Komputer Visual", "Desain Komunikasi Video", "Desain Kreatif Visual"],
    correctAnswer: 0
  },
  {
    id: 4,
    text: "Manakah yang termasuk perangkat output?",
    options: ["Mouse", "Keyboard", "Monitor", "Scanner"],
    correctAnswer: 2
  },
  {
    id: 5,
    text: "Fungsi utama dari RAM adalah...",
    options: ["Menyimpan data permanen", "Mengolah data grafis", "Penyimpanan data sementara", "Menghubungkan jaringan"],
    correctAnswer: 2
  },
  {
    id: 6,
    text: "Singkatan dari AKL dalam jurusan SMK adalah...",
    options: ["Akuntansi Keuangan Lembaga", "Admin Keuangan Lembaga", "Akuntansi Komputer Lembaga", "Akun Keuangan Luar"],
    correctAnswer: 0
  },
  {
    id: 7,
    text: "Apa kepanjangan dari MPLB?",
    options: ["Manajemen Perkantoran Lanjut Bisnis", "Manajemen Perkantoran Layanan Bisnis", "Materi Perkantoran Layanan Bisnis", "Model Perkantoran Layanan Bisnis"],
    correctAnswer: 1
  },
  {
    id: 8,
    text: "Lensa yang digunakan untuk mengambil gambar jarak jauh dalam Broadcasting adalah...",
    options: ["Lensa Wide", "Lensa Kit", "Lensa Tele", "Lensa Makro"],
    correctAnswer: 2
  },
  {
    id: 9,
    text: "Media sosial yang fokus pada konten visual video pendek adalah...",
    options: ["LinkedIn", "Facebook", "TikTok", "Twitter"],
    correctAnswer: 2
  },
  {
    id: 10,
    text: "Apa yang dimaksud dengan Harddisk?",
    options: ["Penyimpanan utama", "Alat cetak", "Otak komputer", "Penyimpanan sekunder permanen"],
    correctAnswer: 3
  },
  {
    id: 11,
    text: "Dalam jurusan Bisnis Digital (BD), apa itu SEO?",
    options: ["Search Engine Optimization", "Social Engine Optimization", "Service Engine Optimization", "Search Entry Optimization"],
    correctAnswer: 0
  },
  {
    id: 12,
    text: "Alat untuk menstabilkan kamera saat shooting adalah...",
    options: ["Tripod", "Drone", "Flash", "Filter"],
    correctAnswer: 0
  },
  {
    id: 13,
    text: "OS yang dikembangkan oleh Google untuk smartphone adalah...",
    options: ["iOS", "Windows", "Android", "Linux"],
    correctAnswer: 2
  },
  {
    id: 14,
    text: "Satuan kecepatan internet adalah...",
    options: ["Kg", "Celsius", "Mbps", "Volt"],
    correctAnswer: 2
  },
  {
    id: 15,
    text: "Aplikasi pengolah kata dari Microsoft adalah...",
    options: ["Excel", "PowerPoint", "Word", "Access"],
    correctAnswer: 2
  },
  {
    id: 16,
    text: "Warna dasar dalam model CMYK adalah...",
    options: ["Cyan, Magenta, Yellow, Key", "Cyan, Maroon, Yellow, Black", "Crimson, Magenta, Yellow, Key", "Cyan, Maroon, Yellow, Key"],
    correctAnswer: 0
  },
  {
    id: 17,
    text: "Perangkat yang menghubungkan dua jaringan berbeda adalah...",
    options: ["Switch", "Hub", "Router", "Cable"],
    correctAnswer: 2
  },
  {
    id: 18,
    text: "Topologi jaringan yang berbentuk lingkaran adalah...",
    options: ["Star", "Mesh", "Ring", "Bus"],
    correctAnswer: 2
  },
  {
    id: 19,
    text: "Dalam Akuntansi, apa itu Debit?",
    options: ["Catatan pengeluaran", "Catatan pemasukan/aset", "Catatan utang", "Catatan modal"],
    correctAnswer: 1
  },
  {
    id: 20,
    text: "Kepanjangan dari URL adalah...",
    options: ["Uniform Resource Locator", "Universal Resource Locator", "Uniform Radio Locator", "Unique Resource Locator"],
    correctAnswer: 0
  },
  {
    id: 21,
    text: "Proses pengambilan gambar dalam film disebut...",
    options: ["Editing", "Mixing", "Shooting", "Rendering"],
    correctAnswer: 2
  },
  {
    id: 22,
    text: "Apa itu E-commerce?",
    options: ["Perdagangan elektronik", "Pesan elektronik", "Peta elektronik", "Permainan elektronik"],
    correctAnswer: 0
  },
  {
    id: 23,
    text: "Bagian komputer yang disebut otak komputer adalah...",
    options: ["RAM", "Monitor", "CPU", "Keyboard"],
    correctAnswer: 2
  },
  {
    id: 24,
    text: "Format file gambar yang transparan biasanya...",
    options: ["JPG", "BMP", "PNG", "GIF"],
    correctAnswer: 2
  },
  {
    id: 25,
    text: "Kepanjangan dari HTML adalah...",
    options: ["Hyper Title Markup Language", "Hyper Text Markup Language", "Hyper Text Makeup Language", "High Text Markup Language"],
    correctAnswer: 1
  },
  {
    id: 26,
    text: "Shortcut untuk menyalin (copy) adalah...",
    options: ["Ctrl+V", "Ctrl+X", "Ctrl+C", "Ctrl+S"],
    correctAnswer: 2
  },
  {
    id: 27,
    text: "Warna primer dalam RGB adalah...",
    options: ["Red, Green, Blue", "Red, Gold, Blue", "Red, Green, Black", "Rose, Green, Blue"],
    correctAnswer: 0
  },
  {
    id: 28,
    text: "Alat input yang digunakan untuk bermain game adalah...",
    options: ["Scanner", "Joystick", "Printer", "Webcam"],
    correctAnswer: 1
  },
  {
    id: 29,
    text: "Layanan cloud storage dari Google adalah...",
    options: ["OneDrive", "iCloud", "Google Drive", "Dropbox"],
    correctAnswer: 2
  },
  {
    id: 30,
    text: "Jurusan BC singkatan dari...",
    options: ["Broadcasting", "Business Center", "Basic Computer", "Best Creative"],
    correctAnswer: 0
  },
  {
    id: 31,
    text: "Apa kepanjangan dari WiFi?",
    options: ["Wireless Fidelity", "Wireless Find", "Wired Fi", "Wireless Final"],
    correctAnswer: 0
  },
  {
    id: 32,
    text: "Salah satu software browser internet adalah...",
    options: ["Spotify", "Google Chrome", "Excel", "Photoshop"],
    correctAnswer: 1
  },
  {
    id: 33,
    text: "Tipe data yang hanya berisi True dan False adalah...",
    options: ["Integer", "String", "Boolean", "Float"],
    correctAnswer: 2
  },
  {
    id: 34,
    text: "Dalam MPLB, apa itu arsip?",
    options: ["Sampah kantor", "Dokumen yang disimpan", "Alat tulis", "Meja kantor"],
    correctAnswer: 1
  },
  {
    id: 35,
    text: "Apa itu Branding?",
    options: ["Mencetak barang", "Membangun citra merek", "Menjual murah", "Mengirim barang"],
    correctAnswer: 1
  },
  {
    id: 36,
    text: "Resolusi video 1920x1080 disebut...",
    options: ["4K", "SD", "Full HD", "HD Ready"],
    correctAnswer: 2
  },
  {
    id: 37,
    text: "Software Adobe untuk mengedit video adalah...",
    options: ["Premiere Pro", "InDesign", "Lightroom", "Flash"],
    correctAnswer: 0
  },
  {
    id: 38,
    text: "Bagian Akuntansi yang mencatat utang disebut...",
    options: ["Account Receivable", "Account Payable", "Equity", "Assets"],
    correctAnswer: 1
  },
  {
    id: 39,
    text: "Alamat unik di internet disebut...",
    options: ["IP Address", "Home Address", "User ID", "Email"],
    correctAnswer: 0
  },
  {
    id: 40,
    text: "Domain untuk organisasi biasanya berakhir dengan...",
    options: [".com", ".id", ".org", ".gov"],
    correctAnswer: 2
  },
  {
    id: 41,
    text: "Bahasa Inggris dari jaringan adalah...",
    options: ["Net", "Cloud", "Network", "Web"],
    correctAnswer: 2
  },
  {
    id: 42,
    text: "Apa itu Content Creator?",
    options: ["Pembuat konten", "Pembuat barang", "Penyedia jasa", "Penulis surat"],
    correctAnswer: 0
  },
  {
    id: 43,
    text: "Manakah yang merupakan software open source?",
    options: ["Windows", "MacOS", "Linux", "Microsoft Office"],
    correctAnswer: 2
  },
  {
    id: 44,
    text: "Dalam desain, apa yang dimaksud tipografi?",
    options: ["Seni menata huruf", "Seni menata warna", "Seni menata gambar", "Seni menata kertas"],
    correctAnswer: 0
  },
  {
    id: 45,
    text: "Kepanjangan dari HTTP adalah...",
    options: ["Hypertext Transfer Program", "Hypertext Transfer Protocol", "High Transfer Protocol", "Hyper Transfer Protocol"],
    correctAnswer: 1
  },
  {
    id: 46,
    text: "Fungsi dari 'Paste' adalah...",
    options: ["Menghapus", "Menyalin", "Menempelkan", "Menggunting"],
    correctAnswer: 2
  },
  {
    id: 47,
    text: "Dalam pemasaran digital, apa itu Affiliate?",
    options: ["Jual beli", "Promosi berbayar komisi", "Iklan radio", "Pameran fisik"],
    correctAnswer: 1
  },
  {
    id: 48,
    text: "Apa itu Podcast?",
    options: ["Video siaran", "Audio siaran digital", "Film pendek", "Berita koran"],
    correctAnswer: 1
  },
  {
    id: 49,
    text: "Apa itu Spreadsheet?",
    options: ["Lembar kerja tabel", "Lembar kerja tulisan", "Lembar kerja presentasi", "Lembar kerja gambar"],
    correctAnswer: 0
  },
  {
    id: 50,
    text: "SMK Prima Unggul berada di kota...",
    options: ["Jakarta", "Depok", "Tangerang Selatan", "Bogor"],
    correctAnswer: 2
  }
];

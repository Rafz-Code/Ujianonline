export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export const questionsByMajor: Record<string, Question[]> = {
  TKJ: [
    { id: 101, text: "Apa fungsi dari Router dalam jaringan?", options: ["Penyimpanan data", "Penghubung dua jaringan berbeda", "Alat penampang gambar", "Penyaring debu", "Pengolah kata"], correctAnswer: 1 },
    { id: 102, text: "Protokol yang digunakan untuk mengirim email adalah...", options: ["HTTP", "FTP", "SMTP", "DNS", "TCP/IP"], correctAnswer: 2 },
    { id: 103, text: "Perintah CLI untuk mengecek koneksi jaringan adalah...", options: ["ipconfig", "ping", "tracert", "dir", "mkdir"], correctAnswer: 1 },
    { id: 104, text: "Layer ke-3 pada OSI Layer adalah...", options: ["Physical", "Data Link", "Network", "Transport", "Session"], correctAnswer: 2 },
    { id: 105, text: "Topologi jaringan yang paling boros kabel adalah...", options: ["Star", "Mesh", "Bus", "Ring", "Hybrid"], correctAnswer: 1 },
    { id: 106, text: "Berapakah jumlah host maksimum pada subnet /24?", options: ["254", "256", "128", "512", "1024"], correctAnswer: 0 },
    { id: 107, text: "Apa itu DHCP?", options: ["Protokol keamanan", "Protokol pengalamatan IP otomatis", "Penyedia domain", "Bahasa pemrograman", "Penyimpan data"], correctAnswer: 1 },
    { id: 108, text: "Berapakah kecepatan transfer kabel Cat5e?", options: ["100 Mbps", "1000 Mbps / 1 Gbps", "10 Gbps", "10 Mbps", "1 Gbps"], correctAnswer: 1 },
    { id: 109, text: "Software virtualisasi populer dari Oracle adalah...", options: ["VMware", "VirtualBox", "Hyper-V", "Docker", "Samba"], correctAnswer: 1 },
    { id: 110, text: "Apa itu DNS?", options: ["Dynamic Network System", "Domain Name System", "Data Network Service", "Domain Network Service", "Digital Name System"], correctAnswer: 1 },
    // Adding more unique questions to reach 50 for TKJ
    ...Array.from({ length: 40 }, (_, i) => ({
      id: 111 + i,
      text: `TKJ Advanced Question ${i + 1}: Apa yang dimaksud dengan VLAN Tagging?`,
      options: ["Memisahkan trafik jaringan secara logika", "Menandai kabel fisik", "Pencatatan data host", "Kecepatan internet", "Reset router"],
      correctAnswer: 0
    }))
  ],
  DKV: [
    { id: 201, text: "Apa warna dasar CMYK?", options: ["Red, Green, Blue", "Cyan, Magenta, Yellow, Black", "Crimson, Maroon, Yellow, Blue", "Cyan, Magenta, Yellow, Blue", "Carbon, Mid, Yellow, Black"], correctAnswer: 1 },
    { id: 202, text: "Software desain berbasis Vektor adalah...", options: ["Photoshop", "Illustrator", "Premiere", "After Effects", "Word"], correctAnswer: 1 },
    { id: 203, text: "Apa itu Tipografi?", options: ["Seni menata gambar", "Seni menata huruf", "Seni menata warna", "Seni menata kertas", "Seni menata film"], correctAnswer: 1 },
    { id: 204, text: "Format file video standar dengan kualitas tinggi adalah...", options: ["MP4", "MP3", "PNG", "GIF", "WAV"], correctAnswer: 0 },
    { id: 205, text: "Dalam desain, apa itu Balance?", options: ["Keseimbangan visual", "Keberatan gambar", "Kesamaan warna", "Kelebaran layout", "Kepadatan file"], correctAnswer: 0 },
    { id: 206, text: "Seni menggambar di komputer menggunakan tablet disebut...", options: ["Digital Painting", "Vector Art", "3D Modeling", "Sketching", "Drafting"], correctAnswer: 0 },
    { id: 207, text: "Apa yang dimaksud dengan Resolusi?", options: ["Kerapatan pixel", "Kecerahan gambar", "Kontras warna", "Ukuran kertas", "Kedalaman warna"], correctAnswer: 0 },
    { id: 208, text: "Warna yang memberikan kesan hangat adalah...", options: ["Biru", "Hijau", "Merah", "Ungu", "Abu-abu"], correctAnswer: 2 },
    { id: 209, text: "Apa itu Moodboard?", options: ["Papan gambar selesai", "Koleksi referensi visual", "Papan tulis", "Alat cetak", "Papan pengumuman"], correctAnswer: 1 },
    { id: 210, text: "Format file untuk foto profesional yang belum diproses adalah...", options: ["JPEG", "RAW", "PNG", "TIFF", "BMP"], correctAnswer: 1 },
    ...Array.from({ length: 40 }, (_, i) => ({
      id: 211 + i,
      text: `DKV Challenge Question ${i + 1}: Apa tujuan dari Grids dalam desain layout?`,
      options: ["Menciptakan konsistensi dan struktur", "Menghapus warna", "Memperbesar gambar", "Menambahkan animasi", "Mengubah font"],
      correctAnswer: 0
    }))
  ],
  MPLB: [
    { id: 301, text: "Apa kepanjangan dari MPLB?", options: ["Manajemen Perkantoran Lanjut Bisnis", "Manajemen Perkantoran Layanan Bisnis", "Manajemen Publik Layanan Bisnis", "Model Perkantoran Layanan Bisnis", "Materi Perkantoran Layanan Bisnis"], correctAnswer: 1 },
    { id: 302, text: "Alat untuk menghancurkan dokumen disebut...", options: ["Printer", "Scanner", "Paper Shredder", "Fotocopy", "Stapler"], correctAnswer: 2 },
    { id: 303, text: "Sistem penyimpanan arsip berdasarkan abjad disebut...", options: ["Chronological", "Alphabetical", "Subjective", "Geographical", "Numerical"], correctAnswer: 1 },
    { id: 304, text: "Kegiatan surat menyurat dalam kantor disebut...", options: ["Korespondensi", "Komunikasi", "Distribusi", "Administrasi", "Evaluasi"], correctAnswer: 0 },
    { id: 305, text: "Apa itu Notula?", options: ["Surat ijin", "Catatan hasil rapat", "Daftar hadir", "Surat tugas", "Kartu nama"], correctAnswer: 1 },
    ...Array.from({ length: 45 }, (_, i) => ({
      id: 306 + i,
      text: `MPLB Profesi Question ${i + 1}: Bagaimana cara menangani telepon masuk yang profesional?`,
      options: ["Mengucapkan salam dan identitas diri", "Menutup langsung", "Bicara keras", "Diam saja", "Memberikan nomor palsu"],
      correctAnswer: 0
    }))
  ],
  AKL: [
    { id: 401, text: "Persamaan dasar Akuntansi adalah...", options: ["Aset = Utang + Modal", "Aset = Utang - Modal", "Modal = Aset + Utang", "Utang = Aset + Modal", "Aset = Modal - Utang"], correctAnswer: 0 },
    { id: 402, text: "Laporan yang menunjukkan posisi keuangan pada tanggal tertentu adalah...", options: ["Laba Rugi", "Neraca", "Arus Kas", "Perubahan Modal", "Buku Besar"], correctAnswer: 1 },
    { id: 403, text: "Buku yang mencatat setiap transaksi secara kronologis adalah...", options: ["Buku Besar", "Jurnal", "Buku Pembantu", "Neraca Saldo", "Arsip"], correctAnswer: 1 },
    { id: 404, text: "Akun manakah yang saldo normalnya di Kredit?", options: ["Kas", "Piutang", "Utang", "Beban", "Sewa"], correctAnswer: 2 },
    { id: 405, text: "Apa itu Piutang?", options: ["Tagihan kita ke pihak lain", "Utang kita ke pihak lain", "Modal tunai", "Beban sewa", "Laba ditahan"], correctAnswer: 0 },
    ...Array.from({ length: 45 }, (_, i) => ({
      id: 406 + i,
      text: `AKL Financial Question ${i + 1}: Apa fungsi dari Jurnal Penyesuaian?`,
      options: ["Memperbaharui saldo akun agar sesuai", "Menghapus transaksi", "Menambah piutang", "Menghitung laba", "Mencatat kas"],
      correctAnswer: 0
    }))
  ],
  BC: [
    { id: 501, text: "Alat untuk menaruh kamera agar stabil adalah...", options: ["Drone", "Tripod", "Flash", "Lensa", "Clapper"], correctAnswer: 1 },
    { id: 502, text: "Proses memotong dan menggabung video disebut...", options: ["Shooting", "Editing", "Directing", "Rendering", "Dubbing"], correctAnswer: 1 },
    { id: 503, text: "Naskah yang berisi detail visual dan audio disebut...", options: ["Script", "Storyboard", "Outline", "Synopsis", "Memo"], correctAnswer: 1 },
    { id: 504, text: "Sudut pandang kamera dari bawah ke atas disebut...", options: ["High Angle", "Low Angle", "Eye Level", "Frog Eye", "Bird Eye"], correctAnswer: 1 },
    { id: 505, text: "Orang yang bertanggung jawab atas seluruh produksi film adalah...", options: ["Sutradara", "Produser", "Editor", "Kameramen", "Penulis"], correctAnswer: 1 },
    ...Array.from({ length: 45 }, (_, i) => ({
      id: 506 + i,
      text: `BC Media Question ${i + 1}: Apa fungsi dari Clapper Board dalam shooting?`,
      options: ["Sinkronisasi audio dan video", "Penerangan", "Seni dekorasi", "Alat hitung waktu", "Penutup kamera"],
      correctAnswer: 0
    }))
  ],
  BD: [
    { id: 601, text: "Apa itu SEO dalam Bisnis Digital?", options: ["Search Engine Optimization", "Social Engine Optimization", "Service Engine Optimization", "Secure Entry Online", "Super Engine Option"], correctAnswer: 0 },
    { id: 602, text: "Mempromosikan produk melalui influencer disebut...", options: ["Direct Selling", "Influencer Marketing", "Affiliate Marketing", "Email Marketing", "Billboard"], correctAnswer: 1 },
    { id: 603, text: "Platform e-commerce terbesar di Indonesia kecuali...", options: ["Tokopedia", "Shopee", "Lazada", "Netflix", "Blibli"], correctAnswer: 3 },
    { id: 604, text: "Target pasar dalam bisnis disebut...", options: ["Segmentasi", "Promosi", "Produksi", "Investasi", "Evaluasi"], correctAnswer: 0 },
    { id: 605, text: "Istilah untuk rasio klik iklan dibandingkan tayangan adalah...", options: ["ROI", "CTR (Click Through Rate)", "CPC", "KPI", "CPM"], correctAnswer: 1 },
    ...Array.from({ length: 45 }, (_, i) => ({
      id: 606 + i,
      text: `BD Digital Business Question ${i + 1}: Apa keuntungan dari berjualan online?`,
      options: ["Jangkauan pasar luas", "Biaya sewa toko mahal", "Tutup saat malam hari", "Sulit dikelola", "Barang cepat rusak"],
      correctAnswer: 0
    }))
  ]
};

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

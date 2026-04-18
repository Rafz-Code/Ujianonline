import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Network, 
  Palette, 
  Briefcase, 
  Calculator, 
  Video, 
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  MapPin,
  GraduationCap,
  UserCheck,
  Trophy,
  X
} from "lucide-react";

interface PageProps {
  navigate: (path: string) => void;
}

const LandingPage: React.FC<PageProps> = ({ navigate }) => {
  const [welcomeAnnounced, setWelcomeAnnounced] = useState(false);

  const announceWelcome = () => {
    if (!welcomeAnnounced) {
      const utterance = new SpeechSynthesisUtterance("Selamat datang di SMK Prima Unggul Kota Tangerang Selatan");
      utterance.lang = "id-ID";
      window.speechSynthesis.speak(utterance);
      setWelcomeAnnounced(true);
    }
  };

  const majors = [
    { 
      name: "TKJ", 
      full: "Teknik Komputer dan Jaringan", 
      icon: Network, 
      color: "bg-blue-600",
      desc: "Jurusan Teknik Komputer dan Jaringan (TKJ) merupakan program keahlian yang mempelajari berbagai aspek teknologi informasi, khususnya yang berkaitan dengan komputer dan jaringan. Siswa akan dibekali pengetahuan tentang perakitan komputer, instalasi sistem operasi, konfigurasi jaringan LAN dan WAN, administrasi server, hingga keamanan jaringan (network security). Lulusan TKJ memiliki peluang kerja sebagai teknisi komputer, administrator jaringan, IT support, hingga peluang berwirausaha di bidang teknologi."
    },
    { 
      name: "DKV", 
      full: "Desain Komunikasi Visual", 
      icon: Palette, 
      color: "bg-purple-600",
      desc: "Desain Komunikasi Visual (DKV) adalah jurusan yang berfokus pada penyampaian pesan melalui media visual. Siswa akan mempelajari dasar-dasar desain grafis, tipografi, ilustrasi, fotografi, videografi, animasi, serta penggunaan berbagai software desain seperti Adobe Photoshop, Illustrator, dan lainnya. Lulusan DKV dapat bekerja sebagai desainer grafis, ilustrator, content creator, animator, hingga bekerja di industri kreatif maupun membuka usaha sendiri."
    },
    { 
      name: "MPLB", 
      full: "Manajemen Perkantoran dan Layanan Bisnis", 
      icon: Briefcase, 
      color: "bg-amber-600",
      desc: "Jurusan Manajemen Perkantoran dan Layanan Bisnis (MPL) mempersiapkan siswa untuk menjadi tenaga profesional di bidang administrasi dan pelayanan bisnis. Materi yang dipelajari meliputi pengelolaan administrasi perkantoran, pengarsipan dokumen, korespondensi (surat-menyurat), pengoperasian aplikasi perkantoran, serta pelayanan pelanggan (customer service). Lulusan MPL dapat bekerja sebagai staf administrasi, sekretaris, resepsionis, atau tenaga layanan di berbagai instansi."
    },
    { 
      name: "BC", 
      full: "Broadcasting", 
      icon: Video, 
      color: "bg-red-600",
      desc: "Jurusan Broadcasting adalah bidang keahlian yang mempelajari tentang proses produksi, pengolahan, dan penyiaran informasi atau hiburan melalui media elektronik seperti televisi, radio, dan platform digital. Siswa dibekali keterampilan teknis dan kreatif dalam membuat konten audiovisual yang menarik dan informatif. Dalam jurusan ini, siswa mempelajari teknik pengambilan gambar, pengolahan audio dan video, penulisan naskah, serta kemampuan berbicara di depan umum. Selain itu, siswa juga diajarkan bagaimana mengelola produksi sebuah program siaran dari tahap perencanaan hingga penayangan. Lulusan jurusan Broadcasting diharapkan mampu bekerja di industri media sebagai presenter, reporter, kameramen, editor, content creator, maupun profesi lain yang berkaitan dengan dunia penyiaran dan produksi konten digital."
    },
    { 
      name: "AKL", 
      full: "Akuntansi dan Keuangan Lembaga", 
      icon: Calculator, 
      color: "bg-emerald-600",
      desc: "Akuntansi dan Keuangan Lembaga (AKL) adalah jurusan yang berfokus pada pengelolaan keuangan dan pencatatan akuntansi. Siswa akan mempelajari dasar-dasar akuntansi, penyusunan laporan keuangan, pengelolaan kas, perpajakan, serta penggunaan aplikasi akuntansi. Lulusan AKL dapat bekerja sebagai staf akuntansi, kasir, administrasi keuangan, hingga melanjutkan karier di bidang keuangan dan perbankan."
    },
    { 
      name: "BD", 
      full: "Bisnis Daring dan Pemasaran", 
      icon: ShoppingBag, 
      color: "bg-orange-600",
      desc: "Bisnis Daring dan Pemasaran (BD) adalah jurusan yang mempelajari strategi pemasaran produk baik secara online maupun offline. Siswa akan belajar tentang teknik penjualan, pelayanan konsumen, penataan produk (display), serta pemasaran melalui marketplace dan media sosial. Lulusan jurusan ini dapat bekerja sebagai sales, marketing, admin toko online, atau membuka usaha sendiri di bidang perdagangan."
    },
  ];

  const [selectedMajor, setSelectedMajor] = useState<typeof majors[0] | null>(null);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-primary/20" onClick={announceWelcome}>
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">S</div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900 uppercase italic">SMK Prima <span className="text-primary">Unggul</span></span>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
          className="bg-primary text-white px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
        >
          Masuk Aplikasi <ArrowRight size={16} />
        </motion.button>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-red-50 text-primary px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
              <ShieldCheck size={16} className="text-primary" /> Terakreditasi Unggul
            </div>
            <h1 className="text-6xl lg:text-8xl font-black leading-[0.95] mb-10 tracking-tighter text-slate-900 uppercase italic drop-shadow-sm">
              PUSAT <br/>
              <span className="text-primary">KEUNGGULAN</span> <br/>
              <span className="text-4xl lg:text-5xl text-slate-400 opacity-50 block mt-4">MASA DEPAN DIGITAL</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-12 max-w-xl font-medium">
              SMK Prima Unggul Kota Tangerang Selatan berkomitmen mencetak generasi kompeten, berakhlak mulia, dan siap bersaing di era industri global.
            </p>
            <div className="flex flex-wrap gap-6">
              <motion.button 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => navigate("/login")}
                className="bg-slate-900 text-white px-10 py-5 rounded-[2.2rem] font-black text-sm uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl shadow-slate-200 flex items-center gap-4"
              >
                Mulai Absensi Sekarang <Zap size={18} className="text-primary animate-pulse" />
              </motion.button>
              <motion.a 
                whileHover={{ x: 5 }}
                href="https://maps.app.goo.gl/m2WhDZ62FqRJ5VHr8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-5 text-gray-400 hover:text-primary transition-all group cursor-pointer font-black text-[10px] uppercase tracking-widest bg-slate-50 rounded-full"
              >
                <MapPin size={18} className="group-hover:animate-bounce text-primary" /> Tangsel, Indonesia
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] rotate-3 border-[12px] border-white transform hover:rotate-0 transition-all duration-700">
              <img 
                src="https://picsum.photos/seed/smkpu/1000/1000" 
                alt="SMK PU Student" 
                className="w-full aspect-[4/5] object-cover scale-110 hover:scale-100 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary/5 rounded-full blur-[80px] -z-10 opacity-60"></div>
          </motion.div>
        </div>
      </section>

      {/* Majors Section */}
      <section className="py-32 bg-slate-50/50 px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-5xl lg:text-7xl font-black mb-6 tracking-tighter uppercase italic text-slate-900">Program Keahlian</h2>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full mb-8"></div>
          <p className="text-gray-500 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs opacity-60">Kurikulum berbasis industri masa depan</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {majors.map((major, idx) => (
            <motion.div
              key={major.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.98 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedMajor(major)}
              className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all group cursor-pointer relative overflow-hidden"
            >
              <div className={`${major.color} w-16 h-16 rounded-[1.8rem] flex items-center justify-center text-white mb-8 transform group-hover:rotate-12 transition-transform shadow-xl`}>
                <major.icon size={32} />
              </div>
              <h3 className="text-3xl font-black mb-3 tracking-tight">{major.name}</h3>
              <p className="text-gray-400 font-bold mb-6 text-sm italic">{major.full}</p>
              <div className="flex items-center gap-3 text-primary font-black text-[10px] uppercase tracking-[0.3em] group-hover:gap-5 transition-all">
                Detail Jurusan <ArrowRight size={16} />
              </div>
              
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-slate-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>

        {/* Major Detail Modal */}
        <AnimatePresence>
          {selectedMajor && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedMajor(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              ></motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                className="relative bg-white w-full max-w-2xl rounded-[4rem] shadow-[0_80px_150px_rgba(0,0,0,0.4)] p-12 lg:p-16 overflow-hidden perspective-[1000px]"
              >
                <div className={`${selectedMajor.color} w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-white mb-10 shadow-2xl transform rotate-6`}>
                  <selectedMajor.icon size={48} />
                </div>
                <h3 className="text-5xl font-black mb-4 tracking-tighter uppercase italic">{selectedMajor.name}</h3>
                <p className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-10 opacity-70">{selectedMajor.full}</p>
                <div className="h-0.5 bg-slate-50 w-full mb-10"></div>
                <p className="text-gray-500 text-lg leading-relaxed font-bold italic mb-12">
                  {selectedMajor.desc}
                </p>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMajor(null)}
                  className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black text-sm hover:bg-black transition-all uppercase tracking-[0.4em] shadow-xl"
                >
                  Selesai Membaca
                </motion.button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-[5rem] p-16 lg:p-32 text-white relative overflow-hidden shadow-[0_50px_150px_rgba(0,0,0,0.4)] group">
          <div className="relative z-10">
            <h2 className="text-5xl lg:text-8xl font-black mb-10 italic uppercase leading-none tracking-tighter drop-shadow-2xl">
              SIAP <span className="text-primary">MENGUKIR</span> PRESTASI?
            </h2>
            <p className="text-xl text-white/40 mb-16 max-w-2xl mx-auto font-black uppercase tracking-widest text-xs leading-loose">
              Sistem Dashboard terintegrasi SMK Prima Unggul memfasilitasi kebutuhan akademik siswa dan guru dalam satu platform modern.
            </p>
            <motion.button 
              whileHover={{ scale: 1.1, y: -10 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/login")}
              className="bg-primary text-white px-16 py-8 rounded-[3rem] font-black text-3xl transition-all shadow-[0_40px_80px_rgba(244,63,94,0.5)] italic uppercase tracking-tighter"
            >
              Mulai Sekarang <ArrowRight size={32} className="inline ml-4 group-hover:translate-x-4 transition-transform duration-500" />
            </motion.button>
          </div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-500/10 rounded-full blur-[100px]"></div>
        </div>
      </section>

      {/* Stats Section - 3D/HD Style at the bottom */}
      <section className="bg-primary py-24 px-6 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px] bg-white/5 rounded-full blur-3xl"
          ></motion.div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {[
              { label: "Siswa Aktif", value: "1500+", icon: GraduationCap },
              { label: "Guru Ahli", value: "100+", icon: UserCheck },
              { label: "Mitra Industri", value: "500+", icon: Briefcase },
              { label: "Lulusan Bekerja", value: "95%", icon: Trophy }
            ].map((stat, idx) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-white/20 transform group-hover:rotate-12 transition-transform shadow-2xl">
                  {React.createElement(stat.icon, { size: 40, className: "text-white" })}
                </div>
                <h3 className="text-5xl lg:text-6xl font-black text-white mb-2 italic tracking-tighter drop-shadow-lg">{stat.value}</h3>
                <p className="text-white/70 font-black uppercase tracking-[0.2em] text-xs leading-tight">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-gray-100 text-center text-gray-400 font-bold uppercase tracking-[0.5em] text-xs">
        <p>Smart School Hub</p>
      </footer>
    </div>
  );
};

export default LandingPage;

import React from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "motion/react";
import { Zap, LayoutDashboard, ArrowRight, ShieldCheck, User, LogOut, GraduationCap } from "lucide-react";
import { auth, signOut } from "../lib/firebase";
import { cn } from "../lib/utils";

interface PageProps {
  navigate: (path: string) => void;
}

const HubPage: React.FC<PageProps> = ({ navigate }) => {
  const { profile } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const menuOptions = [
    {
      title: "Absensi Siswa",
      desc: "Lakukan absensi harian Anda di sini",
      path: "/app/student-attendance",
      icon: GraduationCap,
      color: "bg-emerald-600",
      shadow: "shadow-emerald-200",
      featured: false,
      show: profile?.role === 'siswa'
    },
    {
      title: "Ujian Online",
      desc: "Ujian, Absensi, Nilai, & Status Kelulusan",
      path: "/app/ujian-online",
      icon: Zap,
      color: "bg-primary",
      shadow: "shadow-primary/30",
      featured: true,
      show: true
    },
    {
      title: "Sistem Administrasi",
      desc: "Manajemen Data & Dashboard Sekolah",
      path: "/app/dashboard",
      icon: LayoutDashboard,
      color: "bg-slate-900",
      shadow: "shadow-slate-300",
      featured: false,
      show: profile?.role !== 'siswa'
    }
  ].filter(opt => opt.show);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Moving Background Elements */}
      <motion.div 
        animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"
      ></motion.div>
      <motion.div 
        animate={{ scale: [1.3, 1, 1.3], rotate: [180, 0, 180] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute -bottom-20 -left-20 w-96 h-96 bg-red-800/5 rounded-full blur-3xl -z-10"
      ></motion.div>

      <div className="max-w-4xl w-full">
        {/* User Profile Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white p-6 rounded-[2.5rem] shadow-xl border border-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-4 border-gray-100 shadow-sm">
              <img src={profile?.photoURL} alt="" />
            </div>
            <div>
              <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest px-1">Terautentikasi</p>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">{profile?.displayName}</h2>
              <p className="text-xs font-bold text-primary italic uppercase tracking-wider">
                {profile?.role} • {profile?.department || "Umum"}
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-2xl font-black text-sm hover:bg-red-100 transition-all"
          >
            <LogOut size={18} /> KELUAR SISTEM
          </button>
        </div>

        <div className="text-center mb-16">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h1 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter mb-4 leading-none uppercase italic">
              Pilih <span className="text-primary italic">Layanan Hub</span>
            </h1>
            <p className="text-gray-500 font-medium max-w-xl mx-auto">Silakan pilih destinasi layanan digital Anda untuk melanjutkan operasional akademik SMK Prima Unggul.</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {menuOptions.map((opt, idx) => (
            <motion.div
              key={opt.path}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => navigate(opt.path)}
              className="group cursor-pointer"
            >
              <div className={cn(
                "h-full p-10 rounded-[3rem] text-white flex flex-col justify-between transition-all hover:scale-[1.02] active:scale-95 shadow-2xl relative overflow-hidden",
                opt.color,
                opt.shadow
              )}>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform">
                    <opt.icon size={32} />
                  </div>
                  <h3 className="text-3xl font-black mb-3">{opt.title}</h3>
                  <p className="text-white/60 font-bold leading-relaxed">{opt.desc}</p>
                </div>

                <div className="mt-12 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full">
                    {opt.featured ? <ShieldCheck size={16} fill="white" /> : <User size={16} />}
                    {opt.featured ? "Akses Akademik" : "Akses Utama"}
                  </div>
                  <div className="w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform">
                    <ArrowRight size={24} />
                  </div>
                </div>

                {/* Aesthetic Detail */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 -mr-16 -mt-16 rounded-full blur-3xl"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Stats Section */}
        <div className="mt-16 bg-primary rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-black italic mb-1">1500+</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/70">Siswa Aktif</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black italic mb-1">100+</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/70">Guru Ahli</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black italic mb-1">500+</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/70">Mitra Industri</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black italic mb-1">95%</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/70">Lulusan Bekerja</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 -mr-20 -mt-20 rounded-full blur-2xl"></div>
        </div>

        <p className="mt-16 text-center text-gray-300 font-black text-[10px] uppercase tracking-[0.3em]">
          Smart School Hub • SMK Prima Unggul Kota Tangerang Selatan
        </p>
      </div>
    </div>
  );
};

export default HubPage;

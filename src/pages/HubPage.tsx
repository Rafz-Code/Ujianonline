import React from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "motion/react";
import { Zap, LayoutDashboard, ArrowRight, ShieldCheck, User, LogOut, GraduationCap } from "lucide-react";
import { supabase } from "../lib/supabase";
import { cn } from "../lib/utils";

interface PageProps {
  navigate: (path: string) => void;
}

const HubPage: React.FC<PageProps> = ({ navigate }) => {
  const { profile } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden perspective-[2000px]">
      {/* High Detail Moving Background Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1], 
          rotate: [0, 180, 0],
          x: [0, 50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10"
      ></motion.div>
      <motion.div 
        animate={{ 
          scale: [1.3, 1, 1.3], 
          rotate: [180, 0, 180],
          x: [0, -50, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-red-800/5 rounded-full blur-[140px] -z-10"
      ></motion.div>

      <div className="max-w-5xl w-full relative z-10" style={{ transformStyle: "preserve-3d" }}>
        {/* User Profile Header - Elevated 3D Glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, y: -30, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 bg-white/70 backdrop-blur-3xl p-8 rounded-[3.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.1)] border border-white relative overflow-hidden"
          style={{ transform: "translateZ(80px)" }}
        >
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-20 h-20 rounded-[1.8rem] overflow-hidden border-4 border-white shadow-xl transform hover:scale-110 transition-transform cursor-pointer">
              <img src={profile?.photo_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=school"} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 px-1">
                <ShieldCheck size={14} className="text-primary" />
                <p className="text-gray-400 font-black text-[10px] uppercase tracking-[0.4em]">Sesi Aktiv</p>
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{profile?.display_name}</h2>
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-white bg-slate-900 px-3 py-1 rounded-full uppercase italic tracking-wider">
                  {profile?.role}
                </span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {profile?.department || "Umum"}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-8 py-4 bg-red-50 text-red-600 rounded-[1.8rem] font-black text-sm hover:bg-red-600 hover:text-white hover:shadow-2xl hover:shadow-red-200 transition-all active:scale-95 group relative z-10"
          >
            <LogOut size={20} className="group-hover:rotate-12 transition-transform" /> KELUAR SISTEM
          </button>
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
        </motion.div>

        <div className="text-center mb-20" style={{ transform: "translateZ(120px)" }}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h1 className="text-5xl lg:text-8xl font-black text-slate-900 tracking-tighter mb-6 leading-none uppercase italic drop-shadow-sm">
              LAYANAN <span className="text-primary italic">HUB PUSAT</span>
            </h1>
            <div className="h-2 w-32 bg-primary mx-auto rounded-full mb-8 shadow-xl shadow-primary/20"></div>
            <p className="text-gray-500 font-black uppercase tracking-[0.4em] text-xs max-w-xl mx-auto opacity-60">SMK Prima Unggul Integrated Academic System</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {menuOptions.map((opt, idx) => (
            <motion.div
              key={opt.path}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
              onClick={() => navigate(opt.path)}
              className="group cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className={cn(
                "h-full p-12 rounded-[4rem] text-white flex flex-col justify-between transition-all hover:scale-[1.05] active:scale-95 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] relative overflow-hidden border border-white/20",
                opt.color,
                opt.shadow
              )} style={{ transform: "translateZ(50px)" }}>
                <div className="relative z-10" style={{ transform: "translateZ(80px)" }}>
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-[2.2rem] flex items-center justify-center mb-12 group-hover:rotate-12 transition-transform shadow-xl">
                    <opt.icon size={36} />
                  </div>
                  <h3 className="text-4xl font-black mb-4 tracking-tight drop-shadow-md">{opt.title}</h3>
                  <p className="text-white/80 font-bold leading-relaxed italic text-sm">{opt.desc}</p>
                </div>

                <div className="mt-16 flex items-center justify-between relative z-10" style={{ transform: "translateZ(100px)" }}>
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/10">
                    {opt.featured ? <ShieldCheck size={18} fill="white" /> : <User size={18} />}
                    {opt.featured ? "Sistem Verifikasi" : "Akses Utama"}
                  </div>
                  <div className="w-14 h-14 bg-white text-slate-900 rounded-[1.5rem] shadow-2xl flex items-center justify-center -rotate-45 group-hover:rotate-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <ArrowRight size={28} />
                  </div>
                </div>

                {/* Aesthetic Detail - HD Orbs */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 -mr-24 -mt-24 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 -ml-16 -mb-16 rounded-full blur-[60px] pointer-events-none"></div>
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

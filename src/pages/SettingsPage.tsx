import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { motion } from "motion/react";
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Lock, 
  ShieldCheck, 
  Bell, 
  User, 
  Smartphone,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Zap
} from "lucide-react";
import { cn } from "../lib/utils";

const SettingsPage = () => {
  const { profile } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  
  const [activeTab, setActiveTab] = useState("account");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const tabs = [
    { id: "account", label: "Akun", icon: User },
    { id: "security", label: "Keamanan", icon: Lock },
    { id: "appearance", label: "Tampilan", icon: Sun },
    { id: "notifications", label: "Notifikasi", icon: Bell },
    { id: "language", label: "Bahasa", icon: Zap },
    { id: "help", label: "Bantuan", icon: ShieldCheck },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shadow-inner">
          <SettingsIcon size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white uppercase italic tracking-tight leading-none">Pengaturan</h1>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">Konfigurasi Sistem & Profil</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-4 shadow-xl border border-gray-100 dark:border-slate-800 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-sm transition-all text-left uppercase tracking-widest italic",
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800"
                )}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-gray-100 dark:border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gray-50 dark:bg-slate-800 -mr-16 -mt-16 rounded-full -z-10"></div>
            
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 p-4 rounded-2xl flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-widest"
              >
                <CheckCircle2 size={18} /> Perubahan berhasil disimpan!
              </motion.div>
            )}

            {activeTab === "account" && (
              <form onSubmit={handleSave} className="space-y-8">
                <div className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-gray-50 dark:border-slate-800">
                  <div className="relative group">
                    <img 
                      src={profile?.photo_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=school"} 
                      alt="Avatar" 
                      className="w-24 h-24 rounded-3xl border-4 border-gray-100 dark:border-slate-700 shadow-xl group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg">
                      <Smartphone size={16} />
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-tight">{profile?.display_name}</h3>
                    <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-1">{profile?.role} • {profile?.department || "General"}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Nama Lengkap</label>
                    <input 
                      type="text" 
                      defaultValue={profile?.display_name}
                      className="w-full bg-gray-50 dark:bg-slate-800 border-2 border-transparent rounded-[1.5rem] px-6 py-4 font-bold text-slate-800 dark:text-white outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-primary/20 transition-all shadow-inner"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Email Institusi</label>
                    <input 
                      type="email" 
                      disabled
                      value={profile?.email}
                      className="w-full bg-gray-100 dark:bg-slate-800 border-2 border-transparent rounded-[1.5rem] px-6 py-4 font-bold text-gray-400 outline-none cursor-not-allowed shadow-inner"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-10 py-5 rounded-[2rem] font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-3 w-full uppercase italic tracking-widest"
                >
                  SIMPAN PROFIL <ShieldCheck size={20} />
                </button>
              </form>
            )}

            {activeTab === "security" && (
              <form onSubmit={handleSave} className="space-y-8">
                <div>
                  <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-tight mb-2">Keamanan Akun</h3>
                  <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Kelola autentikasi dan integritas data profil Anda.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Password Saat Ini</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full bg-gray-50 dark:bg-slate-800 border-2 border-transparent rounded-[1.5rem] px-6 py-4 font-bold outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-primary/20 transition-all shadow-inner"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Password Baru</label>
                    <input 
                      type="password" 
                      placeholder="Minimal 8 karakter"
                      className="w-full bg-gray-50 dark:bg-slate-800 border-2 border-transparent rounded-[1.5rem] px-6 py-4 font-bold outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-primary/20 transition-all shadow-inner"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="bg-primary text-white px-10 py-5 rounded-[2rem] font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-3 w-full uppercase italic tracking-widest"
                >
                  UPDATE PASSWORD <Lock size={20} />
                </button>
              </form>
            )}

            {activeTab === "appearance" && (
              <div className="space-y-10">
                <div>
                  <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-tight mb-2">Mode Tampilan</h3>
                  <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Atur tema aplikasi sesuai preferensi Anda.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => darkMode && toggleDarkMode()}
                    className={cn(
                      "p-8 rounded-[2.5rem] border-2 flex flex-col items-center gap-4 transition-all group",
                      !darkMode 
                        ? "border-primary bg-red-50 text-primary shadow-xl shadow-primary/10" 
                        : "border-gray-100 dark:border-slate-800 text-gray-400 dark:hover:bg-slate-800"
                    )}
                  >
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center transition-all",
                      !darkMode ? "bg-primary text-white rotate-12" : "bg-gray-100 dark:bg-slate-700 text-gray-400 group-hover:rotate-12"
                    )}>
                      <Sun size={32} />
                    </div>
                    <span className="font-black uppercase tracking-widest text-sm italic">Mode Terang</span>
                  </button>

                  <button
                    onClick={() => !darkMode && toggleDarkMode()}
                    className={cn(
                      "p-8 rounded-[2.5rem] border-2 flex flex-col items-center gap-4 transition-all group",
                      darkMode 
                        ? "border-amber-500 bg-amber-50 dark:bg-amber-900/10 text-amber-600 shadow-xl shadow-amber-500/10" 
                        : "border-gray-100 dark:border-slate-800 text-gray-400 dark:hover:bg-slate-800"
                    )}
                  >
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center transition-all",
                      darkMode ? "bg-amber-500 text-white -rotate-12" : "bg-gray-100 dark:bg-slate-700 text-gray-400 group-hover:-rotate-12"
                    )}>
                      <Moon size={32} />
                    </div>
                    <span className="font-black uppercase tracking-widest text-sm italic">Mode Gelap</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-tight mb-2">Notifikasi Sistem</h3>
                  <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Aktivasi pemberitahuan akademik real-time.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { title: "Pengumuman Sekolah", desc: "Informasi terbaru dari pihak sekolah" },
                    { title: "Notifikasi Ujian", desc: "Peringatan jadwal dan hasil nilai" },
                    { title: "Status Presensi", desc: "Konfirmasi kehadiran harian" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center justify-between p-6 bg-gray-50 dark:bg-slate-800/50 rounded-3xl border border-transparent hover:border-gray-200 dark:hover:border-slate-700 transition-all cursor-pointer">
                      <div className="flex-1">
                        <h4 className="font-black text-slate-800 dark:text-white uppercase italic tracking-tight text-sm">{item.title}</h4>
                        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1">{item.desc}</p>
                      </div>
                      <div className="w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded-full relative">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "language" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-tight mb-2">Pilihan Bahasa</h3>
                  <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Atur bahasa pengantar yang digunakan di Hub.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Bahasa Indonesia", "English"].map((lang) => (
                    <button key={lang} className={cn(
                      "p-6 rounded-2xl border-2 font-black text-left flex items-center justify-between",
                      lang === "Bahasa Indonesia" ? "border-primary bg-red-50 text-primary" : "border-gray-100 dark:border-slate-800 text-gray-400"
                    )}>
                      {lang}
                      {lang === "Bahasa Indonesia" && <CheckCircle2 size={18} />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "help" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-tight mb-2">Pusat Bantuan</h3>
                  <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Butuh bantuan? Kami selalu siap membantu Anda.</p>
                </div>

                <div className="grid gap-4">
                  {[
                    "Panduan Penggunaan Hub",
                    "Cara Mengikuti Ujian Online",
                    "Masalah Login & Akun",
                    "Hubungi IT Support SMK PU"
                  ].map((item) => (
                    <button key={item} className="p-6 bg-gray-50 dark:bg-slate-800/50 rounded-2xl text-left font-bold text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all flex items-center justify-between">
                      {item}
                      <ArrowRight size={18} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

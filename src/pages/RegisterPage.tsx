import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "motion/react";
import { UserPlus, ShieldAlert, ArrowLeft, GraduationCap, UserCog, User, Lock, Hash } from "lucide-react";
import { cn } from "../lib/utils";

interface PageProps {
  navigate: (path: string) => void;
}

const RegisterPage: React.FC<PageProps> = ({ navigate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<'siswa' | 'guru'>('siswa');
  const [major, setMajor] = useState("TKJ");
  const [nisn, setNisn] = useState("");
  const [displayName, setDisplayName] = useState("");

  const majors = ["TKJ", "DKV", "MPLB", "AKL", "BC", "BD"];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return setError("Konfirmasi password tidak sesuai.");
    if (password.length < 6) return setError("Password minimal 6 karakter.");
    
    setLoading(true);
    setError("");
    
    try {
      const email = username.includes("@") ? username : `${username.toLowerCase()}@smkpu.id`;
      
      // Special logic for the requested admin account
      const finalRole = username.toLowerCase() === 'smkprimaunggul' ? 'admin' : role;
      
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName || username,
            role: finalRole,
            department: finalRole === 'siswa' ? major : 'General',
            nisn: finalRole === 'siswa' ? nisn : null,
          }
        }
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        // Successful signup, Supabase trigger will handle profile creation
        navigate("/login");
        alert("Pendaftaran berhasil! Silakan masuk ke akun Anda.");
      }
    } catch (err: any) {
      console.error(err);
      setError("Gagal membuat akun: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden perspective-[2000px]">
      {/* Background Orbs - HD 3D Style */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10"
      ></motion.div>
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, -100, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[140px] -z-10"
      ></motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        className="w-full max-w-2xl relative z-10"
        style={{ transformStyle: "preserve-3d" }}
      >
        <button 
          onClick={() => navigate("/login")}
          className="mb-8 text-white/40 hover:text-white transition-all flex items-center gap-3 font-black uppercase tracking-[0.4em] text-[10px] transform hover:-translate-x-2"
          style={{ transform: "translateZ(50px)" }}
        >
          <ArrowLeft size={16} /> Kembali ke Login
        </button>

        <div 
          className="bg-white rounded-[4rem] p-10 lg:p-14 shadow-[0_50px_100px_rgba(0,0,0,0.6)] border border-white/20 relative"
          style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
        >
          {/* Decorative Logo */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/5 rounded-full flex items-center justify-center text-primary/10 font-black text-[10rem] -rotate-12 pointer-events-none select-none">
            R
          </div>

          <div className="flex items-center gap-6 mb-12 relative z-10" style={{ transform: "translateZ(60px)" }}>
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center shadow-inner">
              <UserPlus size={40} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Buat Akun Baru</h1>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs opacity-60">Lengkapi data profil akademik anda</p>
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-red-50 border-l-8 border-primary text-red-700 p-6 rounded-[1.5rem] flex items-center gap-4 mb-10 font-black text-xs shadow-lg"
              style={{ transform: "translateZ(70px)" }}
            >
              <ShieldAlert size={24} className="flex-shrink-0" /> {error}
            </motion.div>
          )}

          <form onSubmit={handleRegister} className="space-y-8 relative z-10" style={{ transform: "translateZ(40px)" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 px-2">
                  <User size={14} /> Username
                </label>
                <input
                  required
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 font-black text-slate-900 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 focus:bg-white transition-all shadow-inner"
                  placeholder="smkprimaunggul"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 px-2">
                  <User size={14} /> Nama Lengkap
                </label>
                <input
                  required
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 font-black text-slate-900 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 focus:bg-white transition-all shadow-inner"
                  placeholder="Nama Lengkap Anda"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 px-2">
                  <Lock size={14} /> Password
                </label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 font-black text-slate-900 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 focus:bg-white transition-all shadow-inner"
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 px-2">
                  <Lock size={14} /> Konfirmasi Password
                </label>
                <input
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 font-black text-slate-900 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 focus:bg-white transition-all shadow-inner"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] px-2 text-center block w-full">
                Sistem Identifikasi Peran
              </label>
              <div className="grid grid-cols-2 gap-6">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setRole('siswa')}
                  className={cn(
                    "p-8 rounded-[2.5rem] border-2 flex flex-col items-center gap-4 transition-all shadow-sm transform",
                    role === 'siswa' ? "border-primary bg-red-50 text-primary shadow-xl shadow-primary/10" : "border-gray-50 bg-gray-50/50 hover:border-gray-100 text-gray-400"
                  )}
                >
                  <GraduationCap size={40} />
                  <span className="font-black text-xs uppercase italic tracking-widest">Siswa Siswi</span>
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setRole('guru')}
                  className={cn(
                    "p-8 rounded-[2.5rem] border-2 flex flex-col items-center gap-4 transition-all shadow-sm transform",
                    role === 'guru' ? "border-primary bg-red-50 text-primary shadow-xl shadow-primary/10" : "border-gray-50 bg-gray-50/50 hover:border-gray-100 text-gray-400"
                  )}
                >
                  <UserCog size={40} />
                  <span className="font-black text-xs uppercase italic tracking-widest">Guru Karyawan</span>
                </motion.button>
              </div>
            </div>

            {role === 'siswa' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8 pt-8 border-t-2 border-slate-50"
              >
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 px-2">
                    <Hash size={16} /> Nomor Induk Siswa Nasional (NISN)
                  </label>
                  <input
                    required
                    type="text"
                    value={nisn}
                    onChange={(e) => setNisn(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-transparent rounded-[1.8rem] px-8 py-5 font-black text-slate-900 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 focus:bg-white shadow-inner italic"
                    placeholder="10 digit NISN resmi"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-2">
                    Program Keahlian (Kluster Kompetensi)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {majors.map(m => (
                      <motion.button
                        key={m}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setMajor(m)}
                        className={cn(
                          "py-4 rounded-xl text-[10px] font-black transition-all",
                          major === m ? "bg-slate-900 text-white shadow-xl" : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                        )}
                      >
                        {m}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <motion.button
              disabled={loading}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-primary text-white py-8 rounded-[3rem] font-black text-2xl shadow-[0_30px_60px_rgba(244,63,94,0.3)] hover:opacity-95 transition-all disabled:opacity-50 mt-10 uppercase italic tracking-tighter"
              style={{ transform: "translateZ(80px)" }}
            >
              {loading ? "MEMPROSES DATA..." : "DAFTAR SEKARANG JUGA"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;

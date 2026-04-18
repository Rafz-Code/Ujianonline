import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "motion/react";
import { LogIn, ShieldAlert, Zap, Clock, Calendar, User, Lock, ArrowRight, Chrome } from "lucide-react";
import { format } from "date-fns";

interface PageProps {
  navigate: (path: string) => void;
}

const LoginPage: React.FC<PageProps> = ({ navigate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currTime, setCurrTime] = useState(new Date());
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Throttled calculation to prevent lag
    requestAnimationFrame(() => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 15;
      const y = (clientY / innerHeight - 0.5) * -15;
      setMousePos({ x, y });
    });
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/hub'
        }
      });
      if (error) throw error;
    } catch (err: any) {
      console.error(err);
      setError("Gagal masuk dengan Google. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Map username to a format Supabase Auth understands
      const email = username.includes("@") ? username : `${username.toLowerCase()}@smkpu.id`;
      
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (data.user) {
        navigate("/hub");
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      if (err.message === "Invalid login credentials") {
        setError("Username atau password salah. Silakan cek kembali.");
      } else {
        setError(err.message || "Terjadi kesalahan saat masuk. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden perspective-[2000px]"
    >
      {/* Optimized Background Elements - Simplified Blurs for performance */}
      <motion.div 
        animate={{ 
          x: [0, 40, 0, -40, 0],
          y: [0, -30, 0, 30, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px] -z-10"
      ></motion.div>
      
      <motion.div 
        animate={{ 
          x: [0, -60, 0, 60, 0],
          y: [0, 40, 0, -40, 0],
          scale: [1.05, 1, 1.05]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-red-900/10 rounded-full blur-[100px] -z-10"
      ></motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-xl relative z-10"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Header Info - Elevated 3D */}
        <div className="text-center mb-12" style={{ transform: "translateZ(100px)" }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-primary font-black tracking-[0.4em] uppercase text-xs mb-4 flex items-center justify-center gap-3">
              <Zap size={16} fill="currentColor" className="animate-pulse" /> PORTAL AKADEMIK DIGITAL
            </h2>
            <h1 className="text-white text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]">
              SMK Prima <span className="text-primary">Unggul</span> <br/>
              <span className="text-3xl text-white/40 italic font-medium block mt-2">Intelligence & Integrity</span>
            </h1>
          </motion.div>
          
          <div className="flex items-center justify-center gap-8 text-white font-black text-sm bg-black/40 backdrop-blur-3xl rounded-[2.5rem] py-5 px-10 inline-flex mx-auto border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] transform rotate-x-6">
            <span className="flex items-center gap-3"><Calendar size={20} className="text-primary" /> {format(currTime, "d MMM yyyy")}</span>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="flex items-center gap-3"><Clock size={20} className="text-primary" /> {format(currTime, "HH:mm:ss")}</span>
          </div>
        </div>

        {/* Login Card with INTENSE 3D Effect */}
        <motion.div 
          animate={{ rotateY: mousePos.x, rotateX: mousePos.y }}
          transition={{ type: "spring", stiffness: 150, damping: 25 }}
          className="rounded-[4.5rem] p-1.5 bg-gradient-to-br from-white/20 via-white/10 to-transparent backdrop-blur-[30px] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.8)] overflow-hidden relative border border-white/15 transition-all duration-300 ease-out"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="bg-white rounded-[4rem] p-12 lg:p-16 relative overflow-hidden ring-1 ring-black/5" style={{ transform: "translateZ(50px)" }}>
            {/* Decorative HD Elements */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/5 rounded-full flex items-center justify-center text-primary/5 font-black text-[15rem] -rotate-12 pointer-events-none select-none">
              PU
            </div>

            <div className="flex justify-center mb-10 relative z-10" style={{ transform: "translateZ(80px)" }}>
              <motion.div 
                whileHover={{ rotateY: 180, scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.6 }}
                className="w-28 h-28 bg-slate-900 rounded-[2.2rem] flex items-center justify-center text-white font-black text-5xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] border-4 border-primary/20 cursor-pointer"
              >
                S
              </motion.div>
            </div>

            <div className="text-center mb-10 relative z-10" style={{ transform: "translateZ(60px)" }}>
              <h3 className="text-slate-900 text-4xl font-black mb-3 tracking-tighter uppercase italic drop-shadow-sm">Masuk Akun</h3>
              <p className="text-slate-600 font-black text-sm tracking-[0.3em] uppercase opacity-90">Verifikasi Kredensial Akademik</p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border-l-8 border-primary text-red-700 p-6 rounded-[1.8rem] flex flex-col gap-3 mb-8 shadow-xl"
                style={{ transform: "translateZ(70px)" }}
              >
                <div className="flex items-center gap-5 font-black text-sm">
                  <ShieldAlert size={28} className="flex-shrink-0" />
                  {error}
                </div>
                {error.includes("Invalid login credentials") && (
                  <p className="text-[10px] font-bold uppercase tracking-wider bg-white/50 p-3 rounded-xl border border-primary/10">
                    Pastikan Anda sudah daftar dengan username ini. Jika baru pertama kali, gunakan menu Registrasi.
                  </p>
                )}
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-8 relative z-10" style={{ transform: "translateZ(90px)" }}>
              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-600 uppercase tracking-[0.3em] flex items-center gap-2 px-4 italic">
                  <User size={16} className="text-primary" /> Identitas Pengguna
                </label>
                <input
                  required
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-[2rem] px-10 py-6 font-black text-slate-900 outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all placeholder:text-slate-400 text-xl shadow-inner italic"
                  placeholder="smkprimaunggul"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-600 uppercase tracking-[0.3em] flex items-center gap-2 px-4 italic">
                  <Lock size={16} className="text-primary" /> Kunci Akses Portal
                </label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-[2rem] px-10 py-6 font-black text-slate-900 outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all placeholder:text-slate-400 text-xl shadow-inner pr-20 italic"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-all p-2 rounded-xl hover:bg-red-50"
                  >
                    {showPassword ? <Zap size={24} fill="currentColor" /> : <Clock size={24} />}
                  </button>
                </div>
              </div>

              <motion.button
                disabled={loading}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-slate-900 text-white px-10 py-7 rounded-[3rem] font-black text-xl tracking-[0.2em] flex items-center justify-center gap-5 hover:bg-black hover:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.5)] transition-all disabled:opacity-50 mt-10 group shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                style={{ transform: "translateZ(120px)" }}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-white/20 border-t-white"></div>
                ) : (
                  <>
                    OTENTIKASI DATA <ArrowRight size={28} className="group-hover:translate-x-3 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-10 relative z-10 flex flex-col gap-6" style={{ transform: "translateZ(60px)" }}>
              <div className="flex items-center gap-6 py-2">
                <div className="h-px flex-1 bg-slate-100"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Alternative Entry</span>
                <div className="h-px flex-1 bg-slate-100"></div>
              </div>

              <motion.button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white border-2 border-slate-100 text-slate-900 px-10 py-6 rounded-[2.5rem] font-black text-base flex items-center justify-center gap-4 hover:bg-slate-50 hover:border-primary/40 transition-all active:scale-95 disabled:opacity-50 shadow-xl"
              >
                <div className="w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center border border-gray-50 flex-shrink-0">
                  <Chrome size={24} className="text-primary" />
                </div>
                SIGN IN WITH GOOGLE CLOUD
              </motion.button>
            </div>

            <div className="mt-12 pt-10 border-t-2 border-slate-100 flex flex-col items-center gap-6 relative z-10" style={{ transform: "translateZ(40px)" }}>
              <p className="text-slate-900 text-sm font-black tracking-widest uppercase italic drop-shadow-sm">Akses Terbatas: SMK Prima Unggul</p>
              <motion.button 
                onClick={() => navigate("/register")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white font-black text-base px-16 py-5 bg-slate-900 rounded-[2rem] hover:bg-primary transition-all uppercase tracking-[0.3em] shadow-2xl"
              >
                Registrasi Akun Baru
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.button 
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="mt-16 text-white/30 hover:text-white transition-all flex items-center gap-4 mx-auto font-black text-xs tracking-[0.5em] uppercase"
        >
          Bersama Mengukir <span className="text-primary">Prestasi Unggul</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LoginPage;

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
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * -20;
    setMousePos({ x, y });
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
      className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden perspective-1000"
    >
      {/* Moving HD 3D Background Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, 90, 180, 270, 360],
          x: [0, 150, 0, -150, 0],
          y: [0, -100, 0, 100, 0]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[150px] -z-10"
      ></motion.div>
      
      <motion.div 
        animate={{ 
          scale: [1.3, 1, 1.3],
          rotate: [360, 270, 180, 90, 0],
          x: [0, -200, 0, 200, 0],
          y: [0, 150, 0, -150, 0]
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-red-900/30 rounded-full blur-[180px] -z-10"
      ></motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Header Info */}
        <div className="text-center mb-10" style={{ transform: "translateZ(50px)" }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-primary font-black tracking-widest uppercase text-xs mb-3 flex items-center justify-center gap-2">
              <Zap size={14} /> Hub Akademik Digital
            </h2>
            <h1 className="text-white text-4xl lg:text-5xl font-black mb-6 leading-tight tracking-tighter drop-shadow-2xl">
              SMK Prima <span className="text-primary">Unggul</span> <br/>
              <span className="text-2xl text-white/60 italic font-medium">Kota Tangerang Selatan</span>
            </h1>
          </motion.div>
          
          <div className="flex items-center justify-center gap-6 text-white/90 font-black text-xs bg-white/10 backdrop-blur-2xl rounded-3xl py-4 px-8 inline-flex mx-auto border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform rotate-x-12">
            <span className="flex items-center gap-2"><Calendar size={18} className="text-primary" /> {format(currTime, "d MMM yyyy")}</span>
            <div className="w-1.5 h-1.5 bg-white/30 rounded-full"></div>
            <span className="flex items-center gap-2 text-white"><Clock size={18} className="text-primary" /> {format(currTime, "HH:mm:ss")}</span>
          </div>
        </div>

        {/* Login Card with 3D Effect */}
        <motion.div 
          animate={{ rotateY: mousePos.x, rotateX: mousePos.y }}
          className="rounded-[4rem] p-1 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden relative border border-white/10 transition-all duration-300 ease-out"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="bg-white rounded-[3.8rem] p-10 lg:p-12 relative overflow-hidden" style={{ transform: "translateZ(30px)" }}>
            {/* Decorative Logo Background */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/5 rounded-full flex items-center justify-center text-primary/10 font-black text-[12rem] -rotate-12 pointer-events-none">
              S
            </div>

            <div className="flex justify-center mb-8 relative z-10">
              <motion.div 
                whileHover={{ rotate: 12, scale: 1.15 }}
                className="w-24 h-24 bg-primary rounded-[2rem] flex items-center justify-center text-white font-black text-4xl shadow-[0_20px_40px_rgba(244,63,94,0.4)]"
              >
                S
              </motion.div>
            </div>

            <div className="text-center mb-8 relative z-10">
              <h3 className="text-slate-900 text-3xl font-black mb-2 tracking-tight">Selamat Datang</h3>
              <p className="text-slate-500 font-bold text-sm tracking-wide">Masuk ke akun Anda</p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 border-l-4 border-primary text-red-600 p-5 rounded-2xl flex items-center gap-4 mb-6 font-black text-xs shadow-sm"
              >
                <ShieldAlert size={20} />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-6 relative z-10" style={{ transform: "translateZ(20px)" }}>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 px-2">
                  <User size={14} /> Username
                </label>
                <input
                  required
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-100 border-2 border-transparent rounded-[1.5rem] px-8 py-5 font-black text-slate-800 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/20 focus:bg-white transition-all placeholder:text-slate-300 text-lg shadow-inner"
                  placeholder="smkprimaunggul"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 px-2">
                  <Lock size={14} /> Password
                </label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-100 border-2 border-transparent rounded-[1.5rem] px-8 py-5 font-black text-slate-800 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/20 focus:bg-white transition-all placeholder:text-slate-300 text-lg shadow-inner pr-16"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                  >
                    {showPassword ? <Zap size={20} fill="currentColor" /> : <Clock size={20} />}
                  </button>
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full bg-slate-900 text-white px-8 py-6 rounded-[2.5rem] font-black text-lg tracking-widest flex items-center justify-center gap-4 hover:bg-black hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 shadow-[0_20px_40px_rgba(0,0,0,0.2)] mt-6 group"
                style={{ transform: "translateZ(40px)" }}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  <>
                    MASUK SEKARANG <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>
            </form>

          <div className="mt-6 relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-4 py-2">
              <div className="h-px flex-1 bg-slate-100"></div>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Atau Masuk Dengan</span>
              <div className="h-px flex-1 bg-slate-100"></div>
            </div>

            <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full bg-white border-2 border-slate-100 text-slate-800 px-8 py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 hover:bg-slate-50 hover:border-primary/30 transition-all active:scale-95 disabled:opacity-50 shadow-md transform hover:-translate-y-1"
              >
                <Chrome size={24} className="text-primary" />
                MASUK DENGAN GOOGLE
              </button>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col items-center gap-5 relative z-10">
              <p className="text-slate-400 text-sm font-bold">Belum memiliki akun?</p>
              <button 
                onClick={() => navigate("/register")}
                className="text-primary font-black text-sm px-10 py-4 bg-red-50 rounded-[1.5rem] hover:bg-primary hover:text-white transition-all uppercase tracking-widest shadow-sm"
              >
                Buat Akun Sekarang
              </button>
            </div>
          </div>
        </motion.div>

        <button 
          onClick={() => navigate("/")}
          className="mt-12 text-white/40 hover:text-white transition-colors flex items-center gap-3 mx-auto font-black text-xs tracking-[0.4em] uppercase"
        >
          Bersama Mengukir Prestasi
        </button>
      </motion.div>
    </div>
  );
};

export default LoginPage;

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
      className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden perspective-[2000px]"
    >
      {/* Moving Background Elements - Optimized for Stability & Depth */}
      <motion.div 
        animate={{ 
          x: [0, 80, 0, -80, 0],
          y: [0, -50, 0, 50, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10"
      ></motion.div>
      
      <motion.div 
        animate={{ 
          x: [0, -100, 0, 100, 0],
          y: [0, 70, 0, -70, 0],
          scale: [1.1, 1, 1.1]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-red-900/20 rounded-full blur-[140px] -z-10"
      ></motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
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
              <Zap size={16} fill="currentColor" /> PORTAL AKADEMIK DIGITAL
            </h2>
            <h1 className="text-white text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              SMK Prima <span className="text-primary">Unggul</span> <br/>
              <span className="text-3xl text-white/40 italic font-medium block mt-2">Intelligence & Integrity</span>
            </h1>
          </motion.div>
          
          <div className="flex items-center justify-center gap-8 text-white font-black text-sm bg-black/40 backdrop-blur-3xl rounded-[2.5rem] py-5 px-10 inline-flex mx-auto border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] transform rotate-x-6">
            <span className="flex items-center gap-3"><Calendar size={20} className="text-primary" /> {format(currTime, "d MMM yyyy")}</span>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="flex items-center gap-3"><Clock size={20} className="text-primary" /> {format(currTime, "HH:mm:ss")}</span>
          </div>
        </div>

        {/* Login Card with INTENSE 3D Effect */}
        <motion.div 
          animate={{ rotateY: mousePos.x, rotateX: mousePos.y }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
          className="rounded-[4.5rem] p-1.5 bg-gradient-to-br from-white/30 via-white/10 to-transparent backdrop-blur-[40px] shadow-[0_80px_150px_-20px_rgba(0,0,0,1)] overflow-hidden relative border border-white/20 transition-all duration-500 ease-out"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="bg-white rounded-[4rem] p-12 lg:p-16 relative overflow-hidden ring-1 ring-black/5" style={{ transform: "translateZ(50px)" }}>
            {/* Decorative HD Elements */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/5 rounded-full flex items-center justify-center text-primary/5 font-black text-[15rem] -rotate-12 pointer-events-none select-none">
              PU
            </div>

            <div className="flex justify-center mb-10 relative z-10" style={{ transform: "translateZ(80px)" }}>
              <motion.div 
                whileHover={{ rotateY: 180, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="w-28 h-28 bg-slate-900 rounded-[2.2rem] flex items-center justify-center text-white font-black text-5xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-4 border-primary/20"
              >
                S
              </motion.div>
            </div>

            <div className="text-center mb-10 relative z-10" style={{ transform: "translateZ(60px)" }}>
              <h3 className="text-slate-900 text-4xl font-black mb-3 tracking-tight">Akun Hub</h3>
              <p className="text-slate-400 font-bold text-base tracking-widest uppercase opacity-60">Security Verification Required</p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-l-8 border-primary text-red-700 p-6 rounded-[1.8rem] flex items-center gap-5 mb-8 font-black text-sm shadow-xl"
                style={{ transform: "translateZ(70px)" }}
              >
                <ShieldAlert size={28} className="flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-8 relative z-10" style={{ transform: "translateZ(90px)" }}>
              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 px-4">
                  <User size={16} /> Identitas Pangguna
                </label>
                <input
                  required
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-100 border-2 border-transparent rounded-[2rem] px-10 py-6 font-black text-slate-900 outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary/20 focus:bg-white transition-all placeholder:text-slate-300 text-xl shadow-inner italic"
                  placeholder="smkprimaunggul"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 px-4">
                  <Lock size={16} /> Kunci Akses
                </label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-100 border-2 border-transparent rounded-[2rem] px-10 py-6 font-black text-slate-900 outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary/20 focus:bg-white transition-all placeholder:text-slate-300 text-xl shadow-inner pr-20 italic"
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

              <button
                disabled={loading}
                className="w-full bg-slate-900 text-white px-10 py-7 rounded-[3rem] font-black text-xl tracking-[0.2em] flex items-center justify-center gap-5 hover:bg-black hover:shadow-[0_40px_80px_-10px_rgba(0,0,0,0.5)] transform hover:-translate-y-2 active:scale-95 transition-all disabled:opacity-50 mt-10 group shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
                style={{ transform: "translateZ(120px)" }}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-white/20 border-t-white"></div>
                ) : (
                  <>
                    OTENTIKASI DATA <ArrowRight size={28} className="group-hover:translate-x-3 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 relative z-10 flex flex-col gap-6" style={{ transform: "translateZ(60px)" }}>
              <div className="flex items-center gap-6 py-2">
                <div className="h-px flex-1 bg-slate-100"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Alternative Entry</span>
                <div className="h-px flex-1 bg-slate-100"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full bg-white border-2 border-slate-100 text-slate-900 px-10 py-6 rounded-[2.5rem] font-black text-base flex items-center justify-center gap-4 hover:bg-slate-50 hover:border-primary/40 transition-all active:scale-95 disabled:opacity-50 shadow-xl transform hover:-translate-y-1"
              >
                <div className="w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center border border-gray-50 flex-shrink-0">
                  <Chrome size={24} className="text-primary" />
                </div>
                SIGN IN WITH GOOGLE CLOUD
              </button>
            </div>

            <div className="mt-12 pt-10 border-t-2 border-slate-50 flex flex-col items-center gap-6 relative z-10" style={{ transform: "translateZ(40px)" }}>
              <p className="text-slate-400 text-sm font-bold tracking-widest uppercase opacity-40">Unauthorized Entry Prohibited</p>
              <button 
                onClick={() => navigate("/register")}
                className="text-primary font-black text-base px-16 py-5 bg-red-50 rounded-[2rem] hover:bg-primary hover:text-white transition-all uppercase tracking-[0.3em] shadow-lg hover:shadow-primary/20 active:scale-95"
              >
                Registrasi Akun Baru
              </button>
            </div>
          </div>
        </motion.div>

        <button 
          onClick={() => navigate("/")}
          className="mt-16 text-white/30 hover:text-white transition-all flex items-center gap-4 mx-auto font-black text-xs tracking-[0.5em] uppercase hover:scale-105"
        >
          Bersama Mengukir <span className="text-primary">Prestasi Unggul</span>
        </button>
      </motion.div>
    </div>
  );
};

export default LoginPage;

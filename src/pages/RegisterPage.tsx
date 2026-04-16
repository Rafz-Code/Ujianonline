import React, { useState } from "react";
import { auth, db, createUserWithEmailAndPassword, doc, setDoc, serverTimestamp } from "../lib/firebase";
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
      const email = `${username.toLowerCase()}@smkpu.id`;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create profile
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: email,
        username: username,
        displayName: displayName || username,
        photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`,
        role: role,
        department: role === 'siswa' ? major : 'General',
        nisn: role === 'siswa' ? nisn : null,
        passingStatus: 'Proses',
        createdAt: serverTimestamp()
      });

      navigate("/portal");
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("Username sudah digunakan. Silakan pilih yang lain.");
      } else {
        setError("Gagal membuat akun: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl relative z-10"
      >
        <button 
          onClick={() => navigate("/login")}
          className="mb-8 text-white/40 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs"
        >
          <ArrowLeft size={16} /> Kembali ke Login
        </button>

        <div className="bg-white rounded-[3rem] p-10 lg:p-14 shadow-3xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-[1.5rem] flex items-center justify-center">
              <UserPlus size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Buat Akun Baru</h1>
              <p className="text-slate-500 font-medium">Lengkapi data untuk mendaftar di Hub Akademik</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl flex items-center gap-3 mb-8 font-bold text-xs animate-shake">
              <ShieldAlert size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                  <User size={14} /> Username
                </label>
                <input
                  required
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-100 border-none rounded-2xl px-6 py-4 font-bold outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Contoh: budi_tkj"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                  <User size={14} /> Nama Lengkap
                </label>
                <input
                  required
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-slate-100 border-none rounded-2xl px-6 py-4 font-bold outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Nama Lengkap Anda"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                  <Lock size={14} /> Password
                </label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-100 border-none rounded-2xl px-6 py-4 font-bold outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                  <Lock size={14} /> Konfirmasi Password
                </label>
                <input
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-100 border-none rounded-2xl px-6 py-4 font-bold outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                Pilih Peran User
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('siswa')}
                  className={cn(
                    "p-6 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all",
                    role === 'siswa' ? "border-primary bg-red-50 text-primary" : "border-gray-100 hover:border-gray-200 text-gray-400"
                  )}
                >
                  <GraduationCap size={32} />
                  <span className="font-black text-sm uppercase italic">Siswa Siswi</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('guru')}
                  className={cn(
                    "p-6 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all",
                    role === 'guru' ? "border-primary bg-red-50 text-primary" : "border-gray-100 hover:border-gray-200 text-gray-400"
                  )}
                >
                  <UserCog size={32} />
                  <span className="font-black text-sm uppercase italic">Guru Karyawan</span>
                </button>
              </div>
            </div>

            {role === 'siswa' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-6 pt-4 border-t border-slate-50"
              >
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                    <Hash size={14} /> Nomor Induk Siswa Nasional (NISN)
                  </label>
                  <input
                    required
                    type="text"
                    value={nisn}
                    onChange={(e) => setNisn(e.target.value)}
                    className="w-full bg-slate-100 border-none rounded-2xl px-6 py-4 font-bold outline-none"
                    placeholder="10 digit NISN"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                    Program Keahlian (Jurusan)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {majors.map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMajor(m)}
                        className={cn(
                          "py-3 rounded-xl text-xs font-black transition-all",
                          major === m ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                        )}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <button
              disabled={loading}
              className="w-full bg-primary text-white py-6 rounded-3xl font-black text-xl shadow-2xl shadow-primary/20 hover:opacity-95 transition-all active:scale-95 disabled:opacity-50 mt-8"
            >
              {loading ? "Mendaftarkan..." : "BUAT AKUN SEKARANG"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;

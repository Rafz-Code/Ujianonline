import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { 
  Zap, 
  UserCheck, 
  Trophy, 
  GraduationCap, 
  MapPin, 
  Hash, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  Play,
  User,
  Lock,
  ArrowRight,
  ArrowLeft,
  Timer,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { examQuestions, Question } from "../data/questions";
import { supabase } from "../lib/supabase";
import { db, serverTimestamp, setDoc, doc, collection, addDoc } from "../lib/firebase";

const UjianOnline = ({ navigate }: { navigate: (path: string) => void }) => {
  const { profile } = useAuth();
  const { darkMode } = useTheme();
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [hasPresensi, setHasPresensi] = useState(false);
  const [presensiData, setPresensiData] = useState({
    name: profile?.displayName || "",
    nisn: profile?.nisn || "",
    jurusan: profile?.department || ""
  });
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [loading, setLoading] = useState(false);

  // Sync profile data if it loads later
  useEffect(() => {
    if (profile) {
      setPresensiData({
        name: profile.displayName || "",
        nisn: profile.nisn || "",
        jurusan: profile.department || ""
      });
    }
  }, [profile]);
  
  // Daily Question Shuffling
  const activeQuestions = React.useMemo(() => {
    const dateStr = new Date().toISOString().split('T')[0];
    let seed = 0;
    for (let i = 0; i < dateStr.length; i++) {
      seed += dateStr.charCodeAt(i);
    }
    
    const shuffled = [...examQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor((seed * (i + 1)) % (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    }
    return shuffled;
  }, []);

  useEffect(() => {
    let timer: any;
    if (isExamStarted && !isExamFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      finishExam();
    }
    return () => clearInterval(timer);
  }, [isExamStarted, isExamFinished, timeLeft]);

  const startExam = () => {
    setIsExamStarted(true);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsExamFinished(false);
    setTimeLeft(3600);
  };

  const handlePresensi = (e: React.FormEvent) => {
    e.preventDefault();
    if (presensiData.nisn && presensiData.name && presensiData.jurusan) {
      setHasPresensi(true);
    }
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setUserAnswers({
      ...userAnswers,
      [activeQuestions[currentQuestionIndex].id]: optionIndex
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const finishExam = async () => {
    setLoading(true);
    let correctCount = 0;
    activeQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const finalScore = (correctCount / activeQuestions.length) * 100;
    setScore(finalScore);

    try {
      if (profile?.uid) {
        // Save to Firebase (Legacy/Backup)
        await addDoc(collection(db, "exam_results"), {
          userId: profile.uid,
          userName: presensiData.name,
          userMajor: presensiData.jurusan,
          nisn: presensiData.nisn,
          score: finalScore,
          isPassed: finalScore >= 75,
          timestamp: serverTimestamp()
        });

        // Save to Supabase (Official)
        await supabase.from('exam_results').insert([
          {
            user_id: profile.uid,
            user_name: presensiData.name,
            user_major: presensiData.jurusan,
            nisn: presensiData.nisn,
            score: finalScore,
            is_passed: finalScore >= 75
          }
        ]);
      }
      setIsExamFinished(true);
    } catch (err) {
      console.error("Error saving exam results:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isExamFinished) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 w-full max-w-full overflow-x-hidden">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={cn(
            "rounded-[3rem] p-12 shadow-3xl max-w-2xl w-full text-center border transition-colors",
            darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-100"
          )}
        >
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <Trophy size={48} />
          </div>
          <h2 className={cn("text-4xl font-black mb-4 uppercase italic tracking-tight", darkMode ? "text-white" : "text-slate-900")}>Ujian Selesai!</h2>
          <p className="text-gray-400 font-medium mb-10 text-lg">Terima kasih {presensiData.name} telah menyelesaikan ujian online. Hasil Anda telah tersimpan.</p>
          
          <div className={cn("rounded-[2rem] p-10 mb-10", darkMode ? "bg-slate-800" : "bg-gray-50")}>
            <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-4">Skor Akhir Anda</p>
            <h3 className="text-8xl font-black text-primary italic leading-none">{score.toFixed(1)}</h3>
            <div className="h-px bg-gray-200 dark:bg-slate-700 my-8 mx-auto w-24"></div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-center items-center gap-10">
                <div className="text-center">
                  <p className={cn("text-2xl font-black italic", darkMode ? "text-white" : "text-slate-800")}>{activeQuestions.length}</p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Soal</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-emerald-500 italic">{(score / 100 * activeQuestions.length).toFixed(0)}</p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Benar</p>
                </div>
              </div>
              <div className={cn(
                "py-3 px-6 rounded-full inline-block mx-auto font-black uppercase italic tracking-widest",
                score >= 75 ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
              )}>
                {score >= 75 ? "LULUS" : "TIDAK LULUS"}
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate("/")}
            className={cn(
              "px-10 py-5 rounded-[2rem] font-black text-lg transition-all flex items-center justify-center gap-3 w-full",
              darkMode ? "bg-white text-slate-900 hover:bg-gray-200" : "bg-slate-900 text-white hover:bg-slate-800"
            )}
          >
            KEMBALI KE BERANDA <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    );
  }

  if (isExamStarted) {
    const currentQ = activeQuestions[currentQuestionIndex];
    return (
      <div className="w-full relative min-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className={cn(
            "flex items-center justify-between mb-8 sticky top-0 backdrop-blur-md py-6 z-[60] transition-all border-b",
            darkMode ? "bg-slate-950/90 border-slate-800" : "bg-gray-50/90 border-gray-200"
          )}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">Q</div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Soal Ke</p>
                <h3 className={cn("text-xl font-black", darkMode ? "text-white" : "text-slate-800")}>{currentQuestionIndex + 1} <span className="text-slate-400">/ {activeQuestions.length}</span></h3>
              </div>
            </div>
            
            <div className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-full font-black text-lg border-2 transition-all",
              timeLeft < 300 ? "border-red-500 text-red-500 animate-pulse" : 
              darkMode ? "border-slate-700 text-white bg-slate-900" : "border-slate-200 text-slate-700 bg-white"
            )}>
              <Timer size={24} /> {formatTime(timeLeft)}
            </div>
          </div>

          <div className={cn(
            "rounded-[3rem] p-8 lg:p-14 border shadow-2xl relative overflow-hidden transition-colors z-10 mx-auto",
            darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-100"
          )}>
          <div className={cn("absolute top-0 right-0 w-40 h-40 -mr-10 -mt-10 rounded-full -z-10", darkMode ? "bg-slate-800" : "bg-gray-50")}></div>
          
          <motion.div
            key={currentQuestionIndex}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-10"
          >
            <h2 className={cn("text-2xl lg:text-3xl font-black leading-tight", darkMode ? "text-white" : "text-slate-900")}>
              {currentQ.text}
            </h2>

            <div className="grid gap-4">
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(idx)}
                  className={cn(
                    "flex items-center gap-6 p-6 rounded-[2rem] border-2 text-left font-bold transition-all group relative z-10",
                    userAnswers[currentQ.id] === idx 
                      ? "border-primary bg-red-50 dark:bg-red-900/10 text-primary shadow-xl shadow-primary/10" 
                      : darkMode ? "border-slate-800 hover:border-slate-600 text-slate-300 bg-slate-800/50" : "border-gray-100 hover:border-gray-200 text-slate-600 hover:bg-gray-50"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center font-black transition-all",
                    userAnswers[currentQ.id] === idx ? "bg-primary text-white" : darkMode ? "bg-slate-700 text-slate-400 group-hover:bg-slate-600" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                  )}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-lg flex-1">{option}</span>
                </button>
              ))}
            </div>
          </motion.div>

          <div className={cn("flex items-center justify-between mt-12 pt-10 border-t", darkMode ? "border-slate-800" : "border-gray-50")}>
            <button
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-slate-400 hover:text-slate-600 transition-all disabled:opacity-30 uppercase tracking-widest text-sm"
            >
              <ArrowLeft size={18} /> Sebelumnya
            </button>
            
            {currentQuestionIndex === activeQuestions.length - 1 ? (
              <button
                onClick={finishExam}
                disabled={loading}
                className="bg-primary text-white px-12 py-5 rounded-[2rem] font-black text-lg hover:scale-105 transition-all shadow-2xl flex items-center gap-3 shadow-primary/30 uppercase italic"
              >
                {loading ? "Menyimpan..." : (
                  <>Selesaikan Ujian <Zap size={20} fill="white" /></>
                )}
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className={cn(
                  "px-10 py-5 rounded-[2rem] font-black text-lg hover:scale-105 transition-all shadow-2xl flex items-center gap-3 uppercase",
                  darkMode ? "bg-white text-slate-900 hover:bg-gray-100 shadow-white/5" : "bg-slate-900 text-white hover:bg-black shadow-slate-200"
                )}
              >
                Berikutnya <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Question Navigator */}
        <div className={cn(
          "mt-10 p-8 rounded-[2.5rem] border shadow-xl overflow-hidden transition-colors",
          darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-100"
        )}>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 px-1">Navigasi Soal</p>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
            {activeQuestions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={cn(
                  "h-12 w-full rounded-xl font-black text-sm flex items-center justify-center transition-all",
                  currentQuestionIndex === idx ? "ring-2 ring-primary ring-offset-4" : "",
                  userAnswers[q.id] !== undefined 
                    ? "bg-emerald-500 text-white" 
                    : darkMode ? "bg-slate-800 text-slate-500 hover:bg-slate-700 hover:text-slate-300" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                )}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className={cn(
      "w-full space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20 relative z-0 min-h-full",
      darkMode ? "bg-slate-950" : "bg-gray-50/50"
    )}>
      {/* Header */}
      {!hasPresensi ? (
        <div className="max-w-2xl mx-auto py-12 px-6">
          <div className={cn(
            "rounded-[3rem] p-10 lg:p-14 border shadow-3xl text-center transition-colors",
            darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-100"
          )}>
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
              <UserCheck size={40} />
            </div>
            <h1 className={cn("text-3xl font-black mb-2 uppercase italic tracking-tight leading-none", darkMode ? "text-white" : "text-slate-900")}>Presensi Ujian</h1>
            <p className="text-gray-400 font-bold mb-10">Lengkapi data diri sebelum memulai ujian online.</p>

            <form onSubmit={handlePresensi} className="space-y-6 text-left">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Nama Lengkap</label>
                <input 
                  required
                  type="text" 
                  value={presensiData.name}
                  onChange={(e) => setPresensiData({...presensiData, name: e.target.value})}
                  className={cn(
                    "w-full border-2 border-transparent rounded-2xl px-6 py-4 font-bold outline-none transition-all shadow-inner",
                    darkMode ? "bg-slate-800 text-white focus:bg-slate-950 focus:border-primary/20" : "bg-gray-50 text-slate-800 focus:bg-white focus:border-primary/20"
                  )}
                  placeholder="Nama Lengkap Siswa"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">NISN</label>
                <input 
                  required
                  type="text" 
                  value={presensiData.nisn}
                  onChange={(e) => setPresensiData({...presensiData, nisn: e.target.value})}
                  className={cn(
                    "w-full border-2 border-transparent rounded-2xl px-6 py-4 font-bold outline-none transition-all shadow-inner",
                    darkMode ? "bg-slate-800 text-white focus:bg-slate-950 focus:border-primary/20" : "bg-gray-50 text-slate-800 focus:bg-white focus:border-primary/20"
                  )}
                  placeholder="Nomor Induk Siswa Nasional"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Program Keahlian</label>
                <select 
                  required
                  value={presensiData.jurusan}
                  onChange={(e) => setPresensiData({...presensiData, jurusan: e.target.value})}
                  className={cn(
                    "w-full border-2 border-transparent rounded-2xl px-6 py-4 font-bold outline-none transition-all shadow-inner appearance-none",
                    darkMode ? "bg-slate-800 text-white focus:bg-slate-950 focus:border-primary/20" : "bg-gray-50 text-slate-800 focus:bg-white focus:border-primary/20"
                  )}
                >
                  <option value="">Pilih Jurusan</option>
                  <option value="TKJ">TKJ (Teknik Komputer Jaringan)</option>
                  <option value="DKV">DKV (Desain Komunikasi Visual)</option>
                  <option value="MPLB">MPLB (Manajemen Perkantoran)</option>
                  <option value="AKL">AKL (Akuntansi)</option>
                  <option value="BC">BC (Broadcasting)</option>
                  <option value="BD">BD (Bisnis Digital)</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-white py-6 rounded-[2rem] font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(244,63,94,0.3)] uppercase italic"
              >
                SUBMIT DATA PRESENSI
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-primary rounded-[3rem] p-10 lg:p-14 text-white relative overflow-hidden shadow-2xl shadow-primary/20 mx-6">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
              <div className="flex-1">
                <h1 className="text-3xl lg:text-5xl font-black mb-4 flex flex-wrap items-center justify-center md:justify-start gap-4 uppercase italic">
                  <div className="bg-white/20 p-3 rounded-2xl rotate-12 flex-shrink-0"><Zap size={40} fill="white" /></div> 
                  Ujian Online <span className="text-white/60 text-2xl lg:text-4xl">SMK PU</span>
                </h1>
                <p className="text-white/70 font-bold max-w-lg italic md:mx-0 mx-auto">Platform ujian terintegrasi SMK Prima Unggul Kota Tangerang Selatan.</p>
              </div>
              <div className="flex-shrink-0 flex justify-center w-full md:w-auto">
                <button 
                  onClick={startExam}
                  className="bg-white text-primary px-12 py-6 rounded-[2.5rem] font-black text-2xl hover:scale-110 active:scale-95 transition-all shadow-3xl flex items-center justify-center gap-4 italic group relative"
                >
                  MULAI UJIAN <Play size={32} fill="currentColor" className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 -mr-20 -mt-20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-red-800/20 -ml-10 -mb-10 rounded-full blur-2xl"></div>
          </div>

          <div className="px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-center gap-4">
              <div className="p-3 bg-blue-500 text-white rounded-2xl shadow-lg shadow-blue-200">
                <Timer size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">Durasi</p>
                <p className="font-black text-blue-900 uppercase italic">60 Menit</p>
              </div>
            </div>
            <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100 flex items-center gap-4">
              <div className="p-3 bg-purple-500 text-white rounded-2xl shadow-lg shadow-purple-200">
                <Zap size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest leading-none mb-1">Materi</p>
                <p className="font-black text-purple-900 uppercase italic">50 Butir Soal</p>
              </div>
            </div>
            <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-center gap-4">
              <div className="p-3 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-200">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest leading-none mb-1">Integritas</p>
                <p className="font-black text-emerald-900 uppercase italic">Anti-Cheat</p>
              </div>
            </div>
            <div className="bg-red-50 p-6 rounded-3xl border border-red-100 flex items-center gap-4">
              <div className="p-3 bg-primary text-white rounded-2xl shadow-lg shadow-red-200">
                <AlertCircle size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-red-300 uppercase tracking-widest leading-none mb-1">Atensi</p>
                <p className="font-black text-red-900 uppercase italic">Tertutup</p>
              </div>
            </div>
          </div>

          <div className="px-6 grid lg:grid-cols-3 gap-8 pb-10">
            {/* User Profile Card */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 -mr-16 -mt-16 rounded-full -z-10"></div>
                <h2 className="text-xl font-black text-slate-800 mb-8 uppercase tracking-widest italic flex items-center gap-3">
                  <div className="w-2 h-6 bg-primary rounded-full"></div> Peserta Ujian
                </h2>
                <div className="space-y-6">
                  {[
                    { label: "Nama Lengkap", value: presensiData.name, icon: User },
                    { label: "NISN", value: presensiData.nisn || "Belum Terdaftar", icon: Hash },
                    { label: "Program Keahlian", value: presensiData.jurusan || "General", icon: GraduationCap },
                    { label: "Status Akademik", value: profile?.passingStatus || "Proses", icon: CheckCircle2 },
                  ].map((info) => (
                    <div key={info.label} className="border-b border-gray-50 pb-4 last:border-none">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{info.label}</p>
                      <p className={cn("font-black text-slate-800 flex items-center gap-2 italic uppercase", {
                        "text-emerald-500": info.value === "Lulus",
                        "text-red-500": info.value === "Tidak Lulus",
                        "text-amber-500": info.value === "Proses"
                      })}>
                        {info.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-xl overflow-hidden group">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-slate-900 italic uppercase tracking-tight">Status Presensi Siswa</h2>
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={24} />
                  </div>
                </div>
                <div className="bg-emerald-50 p-10 rounded-[2.5rem] flex items-center justify-between gap-4 border border-emerald-100 group-hover:scale-[1.01] transition-all">
                  <div>
                    <p className="text-[10px] font-black uppercase text-emerald-600 tracking-[0.3em] mb-3">Sistem Konfirmasi</p>
                    <h4 className="text-4xl font-black text-emerald-900 italic leading-none uppercase">TERABSEN <span className="text-emerald-500/50">OK</span></h4>
                    <p className="mt-4 text-emerald-600/70 font-bold text-sm">Data presensi telah diverifikasi untuk sesi ujian hari ini.</p>
                  </div>
                  <div className="w-16 h-16 bg-emerald-500 text-white rounded-3xl flex items-center justify-center rotate-12 shadow-xl shadow-emerald-200">
                    <ShieldCheck size={32} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UjianOnline;

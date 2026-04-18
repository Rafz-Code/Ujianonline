import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db, collection, addDoc, serverTimestamp, query, where, getDocs, Timestamp } from "../lib/firebase";
import { supabase } from "../lib/supabase";
import { motion } from "motion/react";
import { UserCheck, Clock, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import { format } from "date-fns";

const StaffAttendance = () => {
  const { user, profile } = useAuth();
  const [attendedToday, setAttendedToday] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const checkAttendance = async () => {
      if (!user) return;
      const today = format(new Date(), "yyyy-MM-dd");
      try {
        const { data, error } = await supabase
          .from('staff_attendance')
          .select('id')
          .eq('uid', user.id)
          .eq('date', today);
        
        if (error) throw error;
        setAttendedToday(data && data.length > 0);
      } catch (err) {
        console.error("Error checking attendance:", err);
      } finally {
        setLoading(false);
      }
    };
    checkAttendance();
  }, [user]);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    window.speechSynthesis.speak(utterance);
  };

  const handleAttendance = async () => {
    if (!user) return;
    setSubmitting(true);
    try {
      const today = format(new Date(), "yyyy-MM-dd");
      
      // Supabase (Official)
      const { error } = await supabase.from('staff_attendance').insert([
        {
          uid: user.id,
          date: today,
          status: "hadir",
          display_name: profile?.display_name,
          role: profile?.role
        }
      ]);

      if (error) throw error;

      setAttendedToday(true);
      speak(`Selamat datang ${profile?.display_name || 'Staff'}. Absensi Anda hari ini berhasil disimpan ke sistem pusat.`);
    } catch (error) {
      console.error("Attendance Error:", error);
      alert("Gagal melakukan absensi. Pastikan koneksi internet stabil.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="animate-pulse flex items-center justify-center min-h-[400px]">Checking state...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
          <UserCheck size={40} />
        </div>
        <h1 className="text-4xl font-black text-slate-800 mb-2">Presensi Mandiri</h1>
        <p className="text-gray-500 font-medium">Silakan lakukan presensi harian Anda sebagai staff SMK Prima Unggul.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] p-10 lg:p-16 border border-gray-100 shadow-xl flex flex-col items-center">
        <div className="mb-12 text-center">
          <h2 className="text-6xl font-black text-slate-900 mb-2">{format(new Date(), "HH:mm")}</h2>
          <p className="text-primary font-bold tracking-widest uppercase">{format(new Date(), "EEEE, d MMMM yyyy")}</p>
        </div>

        {attendedToday ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">Presensi Berhasil!</h3>
            <p className="text-gray-400 font-medium">Anda sudah terdaftar hadir hari ini. Selamat bekerja!</p>
          </motion.div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <div className="flex items-center gap-2 text-gray-400 font-bold mb-10 bg-gray-50 px-4 py-2 rounded-full">
              <MapPin size={16} /> SMK Prima Unggul Area
            </div>
            
            <button
              onClick={handleAttendance}
              disabled={submitting}
              className="group relative w-full max-w-sm bg-primary text-white py-6 rounded-3xl font-black text-2xl shadow-2xl shadow-primary/30 hover:bg-primary/95 transition-all disabled:opacity-50 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">{submitting ? "Memproses..." : "PRESENSI SEKARANG"}</span>
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-full transition-all duration-1000"></div>
            </button>

            <div className="mt-8 flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-xl text-sm font-bold">
              <AlertCircle size={16} /> Pastikan Anda berada di lingkungan sekolah.
            </div>
          </div>
        )}
      </div>

      <div className="bg-slate-900 rounded-[2rem] p-8 text-white grid grid-cols-2 gap-8">
        <div>
          <p className="text-white/40 text-xs font-black uppercase mb-2">Jam Masuk</p>
          <p className="text-2xl font-black italic">07:00 <span className="text-sm font-medium not-italic text-white/60">WIB</span></p>
        </div>
        <div>
          <p className="text-white/40 text-xs font-black uppercase mb-2">Jam Keluar</p>
          <p className="text-2xl font-black italic">16:00 <span className="text-sm font-medium not-italic text-white/60">WIB</span></p>
        </div>
      </div>
    </div>
  );
};

export default StaffAttendance;

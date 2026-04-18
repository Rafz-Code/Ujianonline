import React, { useState, useEffect } from "react";
import { db, collection, query, orderBy, getDocs, where } from "../lib/firebase";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { motion } from "motion/react";
import { Trophy, Search, FileText, User, GraduationCap, Calendar, Download } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../lib/utils";

interface ExamResult {
  id: string;
  userId: string;
  userName: string;
  userMajor: string;
  nisn: string;
  score: number;
  timestamp: any;
}

const ExamResultsRecap = () => {
  const { isGuru, isAdmin } = useAuth();
  const [results, setResults] = useState<ExamResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        // Supabase fetch (Official)
        const { data, error } = await supabase
          .from('exam_results')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        const formatted = (data || []).map(item => ({
          id: item.id.toString(),
          userId: item.user_id,
          userName: item.user_name,
          userMajor: item.user_major,
          nisn: item.nisn,
          score: Number(item.score),
          timestamp: item.created_at ? new Date(item.created_at) : null
        }));
        
        setResults(formatted as any);
      } catch (err) {
        console.error("Error fetching exam results:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isGuru || isAdmin) {
      fetchResults();
    }
  }, [isGuru, isAdmin]);

  const filteredResults = results.filter(r => 
    r.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.nisn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.userMajor?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isGuru && !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
           <Search size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 uppercase italic">Akses Terbatas</h2>
        <p className="text-gray-500 font-medium">Hanya Guru dan Administrator yang dapat melihat rekapitulasi nilai ujian.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="bg-slate-900 rounded-[3rem] p-10 lg:p-14 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h1 className="text-3xl lg:text-5xl font-black mb-4 flex items-center gap-4 uppercase italic">
            <div className="bg-primary p-3 rounded-2xl rotate-12"><Trophy size={40} fill="white" /></div> 
            Rekap Nilai <span className="text-white/40">Ujian Siswa</span>
          </h1>
          <p className="text-white/60 font-medium max-w-xl">Sistem monitoring hasil ujian SMK Prima Unggul Kota Tangerang Selatan secara real-time.</p>
        </div>
        
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 -mr-20 -mt-20 rounded-full blur-3xl"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari Nama, NISN, atau Jurusan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border-none rounded-[1.5rem] pl-16 pr-6 py-4 font-bold text-slate-800 shadow-xl focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        
        <button className="flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-[1.5rem] font-black text-sm shadow-xl hover:bg-gray-50 transition-all uppercase tracking-widest whitespace-nowrap">
           <Download size={18} /> Export Laporan
        </button>
      </div>

      <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Peserta</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">NISN / Jurusan</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Waktu Selesai</th>
                <th className="px-8 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Skor Akhir</th>
                <th className="px-8 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-8 py-6 h-20 bg-gray-50/20"></td>
                  </tr>
                ))
              ) : filteredResults.length > 0 ? (
                filteredResults.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                          <User size={20} />
                        </div>
                        <span className="font-black text-slate-800 italic uppercase">{result.userName}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <p className="font-bold text-slate-600 flex items-center gap-2"><FileText size={14} className="text-gray-300" /> {result.nisn || "-"}</p>
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">< GraduationCap size={14} /> {result.userMajor}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <span className="text-xs font-bold text-gray-500 flex items-center gap-2"><Calendar size={14} /> {result.timestamp ? format(result.timestamp, "dd/MM/yyyy HH:mm") : "-"}</span>
                    </td>
                    <td className="px-8 py-6 text-center">
                       <span className={cn(
                         "text-2xl font-black italic",
                         result.score >= 55 ? "text-emerald-500" : "text-primary"
                       )}>{result.score.toFixed(1)}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <span className={cn(
                         "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                         result.score >= 55 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                       )}>
                         {result.score >= 55 ? "LULUS" : "REMIDIAL"}
                       </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="text-gray-300 font-black uppercase italic tracking-widest">Data Tidak Ditemukan</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExamResultsRecap;

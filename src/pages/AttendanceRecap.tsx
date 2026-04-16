import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { FileBox, Search, ChevronRight, Hash, User, Calendar, Clock, Filter } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../lib/utils";

const AttendanceRecap = () => {
  const [activeTab, setActiveTab] = useState<"staff" | "student">("staff");
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const table = activeTab === "staff" ? "staff_attendance" : "student_attendance";
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Map Supabase fields to the component expectations
      const mappedData = (data || []).map(item => ({
        id: item.id,
        status: item.status,
        date: item.date,
        // Map staff fields
        displayName: item.display_name,
        role: item.role,
        // Map student fields
        studentName: item.student_name,
        nis: item.nis,
        major: item.major_name,
        class: item.class_name,
        // Common
        created_at: item.created_at
      }));

      setRecords(mappedData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRecords(); }, [activeTab]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <FileBox className="text-primary" /> Rekapitulasi Presensi
          </h1>
          <p className="text-gray-500 font-medium">Laporan historis kehadiran seluruh civitas SMK Prima Unggul.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex p-1.5 bg-gray-100 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab("staff")}
          className={cn(
            "px-6 py-2.5 rounded-xl font-black text-sm transition-all",
            activeTab === "staff" ? "bg-white text-slate-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
          )}
        >
          Karyawan & Guru
        </button>
        <button
          onClick={() => setActiveTab("student")}
          className={cn(
            "px-6 py-2.5 rounded-xl font-black text-sm transition-all",
            activeTab === "student" ? "bg-white text-slate-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
          )}
        >
          Siswa
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
        {loading ? (
          <div className="p-20 text-center">Loading...</div>
        ) : records.length === 0 ? (
          <div className="p-20 text-center text-gray-400 font-bold italic">Belum ada data terekam.</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {records.map((record) => (
              <div key={record.id} className="p-6 md:px-10 hover:bg-gray-50/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center font-black", {
                    "bg-emerald-100 text-emerald-600": record.status === "hadir",
                    "bg-amber-100 text-amber-600": record.status === "sakit",
                    "bg-blue-100 text-blue-600": record.status === "izin",
                    "bg-red-100 text-red-600": record.status === "alpha",
                  })}>
                    {record.status === "hadir" ? "H" : record.status.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 tracking-tight">
                      {activeTab === "staff" ? record.displayName : record.studentName}
                    </h4>
                    <div className="flex items-center gap-3 text-xs font-bold text-gray-400 mt-0.5">
                      <span className="flex items-center gap-1 uppercase tracking-wider">
                        {activeTab === "staff" ? <Hash size={12}/> : <User size={12} />}
                        {activeTab === "staff" ? record.role : `${record.nis} • ${record.major}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 md:gap-8">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5 text-slate-800 font-bold text-sm">
                      <Calendar size={14} className="text-gray-300" />
                      {format(new Date(record.date), "dd MMM yyyy")}
                    </div>
                    <div className="flex items-center gap-1.5 text-primary font-black text-xs italic">
                      <Clock size={14} />
                      {record.created_at ? format(new Date(record.created_at), "HH:mm") : "..."}
                    </div>
                  </div>
                  <div className={cn("px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest", {
                    "bg-emerald-500 text-white": record.status === "hadir",
                    "bg-amber-500 text-white": record.status === "sakit",
                    "bg-blue-500 text-white": record.status === "izin",
                    "bg-red-500 text-white": record.status === "alpha",
                  })}>
                    {record.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceRecap;

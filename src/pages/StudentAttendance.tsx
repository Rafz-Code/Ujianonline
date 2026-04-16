import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db, collection, getDocs, query, where, addDoc, serverTimestamp } from "../lib/firebase";
import { supabase } from "../lib/supabase";
import { GraduationCap, Search, Check, X, Users, Filter, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../lib/utils";

interface Student {
  id: string;
  nis: string;
  name: string;
  class: string;
  major: string;
}

const StudentAttendance = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMajor, setSelectedMajor] = useState("TKJ");
  const [selectedClass, setSelectedClass] = useState("X");
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('students')
          .select('*')
          .eq('major', selectedMajor)
          .eq('class', selectedClass);

        if (error) throw error;
        
        const list = (data || []).map(item => ({
          id: item.id.toString(),
          nis: item.nis,
          name: item.name,
          class: item.class,
          major: item.major
        } as Student));

        setStudents(list);
        
        // Initialize attendance state
        const initial: Record<string, string> = {};
        list.forEach(s => initial[s.id] = "hadir");
        setAttendance(initial);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [selectedMajor, selectedClass]);

  const handleStatusChange = (studentId: string, status: string) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSaveAttendance = async () => {
    if (students.length === 0) return;
    setSubmitting(true);
    try {
      const today = format(new Date(), "yyyy-MM-dd");
      const batch = students.map(async (student) => {
        // Supabase (Official)
        const { error } = await supabase.from('student_attendance').insert([
          {
            student_id: student.id,
            teacher_id: user?.id,
            date: today,
            status: attendance[student.id],
            class_name: student.class,
            major_name: student.major,
            nis: student.nis,
            student_name: student.name
          }
        ]);
        if (error) throw error;
      });
      await Promise.all(batch);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Gagal simpan absensi.");
    } finally {
      setSubmitting(false);
    }
  };

  const statusOptions = [
    { label: "Hadir", value: "hadir", color: "bg-emerald-100 text-emerald-700", active: "bg-emerald-600 text-white" },
    { label: "Sakit", value: "sakit", color: "bg-amber-100 text-amber-700", active: "bg-amber-600 text-white" },
    { label: "Izin", value: "izin", color: "bg-blue-100 text-blue-700", active: "bg-blue-600 text-white" },
    { label: "Alpha", value: "alpha", color: "bg-red-100 text-red-700", active: "bg-red-600 text-white" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <GraduationCap className="text-primary" /> Absensi Siswa
          </h1>
          <p className="text-gray-500 font-medium">Lakukan pencatatan kehadiran siswa untuk hari ini.</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-slate-900">{format(new Date(), "d MMMM yyyy")}</p>
          <p className="text-primary font-bold uppercase tracking-widest text-xs">Periode Harian</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 text-primary bg-red-50 px-4 py-2 rounded-xl font-bold text-sm">
          <Filter size={18} /> Filter Kelas
        </div>
        
        <select 
          value={selectedClass} 
          onChange={(e) => setSelectedClass(e.target.value)}
          className="bg-gray-50 border-none rounded-xl px-4 py-2 font-bold focus:ring-2 focus:ring-primary/20 outline-none"
        >
          <option value="X">Kelas X</option>
          <option value="XI">Kelas XI</option>
          <option value="XII">Kelas XII</option>
        </select>

        <select 
          value={selectedMajor} 
          onChange={(e) => setSelectedMajor(e.target.value)}
          className="bg-gray-50 border-none rounded-xl px-4 py-2 font-bold focus:ring-2 focus:ring-primary/20 outline-none"
        >
          <option value="TKJ">TKJ</option>
          <option value="DKV">DKV</option>
          <option value="MPLB">MPLB</option>
          <option value="AKL">AKL</option>
          <option value="BC">BC</option>
          <option value="BD">BD</option>
        </select>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
        {loading ? (
          <div className="p-20 text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-gray-400 font-bold">Memuat data siswa...</p>
          </div>
        ) : students.length === 0 ? (
          <div className="p-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-300">
              <Users size={32} />
            </div>
            <p className="text-gray-400 font-bold">Tidak ada data siswa ditemukan.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            <div className="grid grid-cols-12 bg-gray-50/50 px-8 py-4 text-xs font-black uppercase text-gray-400 tracking-wider">
              <div className="col-span-5 md:col-span-1">No</div>
              <div className="col-span-11 md:col-span-5">Data Siswa</div>
              <div className="col-span-12 md:col-span-6 text-center md:text-left">Status Kehadiran</div>
            </div>
            
            {students.map((student, idx) => (
              <div key={student.id} className="grid grid-cols-12 px-8 py-5 items-center hover:bg-gray-50/50 transition-all">
                <div className="col-span-12 md:col-span-1 font-black text-gray-300 mb-2 md:mb-0">
                  {(idx + 1).toString().padStart(2, '0')}
                </div>
                <div className="col-span-12 md:col-span-5 flex items-center gap-4 mb-4 md:mb-0">
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary font-bold">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 tracking-tight">{student.name}</h4>
                    <p className="text-xs font-bold text-gray-400 uppercase">{student.nis} • {student.major}</p>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 flex flex-wrap gap-2 justify-center md:justify-start">
                  {statusOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleStatusChange(student.id, option.value)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-xs font-black transition-all active:scale-95",
                        attendance[student.id] === option.value ? option.active : option.color
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {students.length > 0 && !loading && (
        <div className="flex justify-end p-4">
          <button
            onClick={handleSaveAttendance}
            disabled={submitting || submitted}
            className={cn(
              "px-10 py-4 rounded-2xl font-black text-lg flex items-center gap-3 shadow-xl transition-all active:scale-95",
              submitted 
                ? "bg-emerald-100 text-emerald-600 shadow-none cursor-not-allowed" 
                : "bg-primary text-white shadow-primary/20 hover:opacity-90"
            )}
          >
            {submitting ? "Menyimpan..." : submitted ? <><Check size={20} /> Tersimpan</> : <><Check size={20} /> Simpan Absensi</>}
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentAttendance;

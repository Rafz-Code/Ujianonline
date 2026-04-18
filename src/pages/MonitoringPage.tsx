import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { motion } from "motion/react";
import { 
  Users, 
  Search, 
  Filter, 
  ShieldCheck, 
  Monitor, 
  UserCheck, 
  GraduationCap, 
  UserCog,
  ArrowLeft
} from "lucide-react";
import { cn } from "../lib/utils";

const MonitoringPage: React.FC = () => {
  const { profile } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");

  useEffect(() => {
    fetchUsers();
  }, [profile]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      let query = supabase.from("profiles").select("*");

      // Role-based filtering logic
      if (profile?.role === "guru") {
        query = query.eq("role", "siswa");
      } else if (profile?.role === "staff") {
        query = query.in("role", ["siswa", "guru"]);
      } else if (profile?.role === "admin") {
        // Full view
      } else {
        setData([]);
        setLoading(false);
        return;
      }

      const { data: users, error } = await query;
      if (error) throw error;
      setData(users || []);
    } catch (err) {
      console.error("Monitoring Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      // 1. Update Master Profile
      const { data: userData, error: fetchError } = await supabase.from('profiles').select('*').eq('id', userId).single();
      if (fetchError) throw fetchError;

      const oldRole = userData.role;
      const { error: profileError } = await supabase.from('profiles').update({ role: newRole }).eq('id', userId);
      if (profileError) throw profileError;

      // 2. Synchronize Role-Specific Tables (Move or duplicate record for partitioning)
      const oldTable = (oldRole === 'siswa') ? 'siswa' : (oldRole === 'guru' ? 'guru' : (oldRole === 'staff' ? 'staff' : null));
      const newTable = (newRole === 'siswa') ? 'siswa' : (newRole === 'guru' ? 'guru' : (newRole === 'staff' ? 'staff' : null));

      // Add to new table if applicable
      if (newTable) {
        await supabase.from(newTable).upsert({
          id: userId,
          display_name: userData.display_name,
          username: userData.username,
          department: (newRole === 'siswa') ? 'TKJ' : (newRole === 'guru' ? 'Guru' : 'Staff')
        });
      }

      await fetchUsers();
      alert(`Role berhasil diperbarui ke ${newRole}!`);
    } catch (err: any) {
      console.error("Update Role Error:", err);
      alert("Gagal update role: " + err.message);
    }
  };

  const filteredData = data.filter(user => {
    const matchesSearch = user.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.department?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-8 lg:p-12 space-y-12 bg-white/50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-4 italic uppercase">
            Monitoring <span className="text-primary italic">Sistem Akademik</span>
          </h1>
          <p className="text-gray-400 font-black text-xs uppercase tracking-[0.4em] px-1">
            Pengawasan Data Real-Time SMK Prima Unggul
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Cari Identitas..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border-2 border-slate-100 rounded-2xl pl-14 pr-8 py-4 font-black text-sm outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-sm w-full md:w-80"
            />
          </div>

          {(profile?.role === 'admin' || profile?.role === 'staff') && (
            <div className="flex bg-slate-100 p-1.5 rounded-2xl shadow-inner uppercase font-black text-[10px] tracking-widest">
              {["all", "siswa", "guru", "staff"].filter(r => {
                if (profile?.role === 'staff' && r === 'staff') return false;
                return true;
              }).map(r => (
                <button
                  key={r}
                  onClick={() => setFilterRole(r)}
                  className={cn(
                    "px-6 py-2.5 rounded-xl transition-all",
                    filterRole === r ? "bg-white text-slate-900 shadow-md" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  {r === "all" ? "Semua" : r}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="h-96 flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredData.map((user, idx) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-[0_20px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all group relative overflow-hidden"
            >
              <div className="flex items-center gap-6 mb-8 relative z-10">
                <div className="w-20 h-20 rounded-[1.8rem] bg-slate-50 flex items-center justify-center shadow-inner relative overflow-hidden">
                  {user.photo_url ? (
                    <img src={user.photo_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <UserCog size={32} className="text-slate-200" />
                  )}
                  <div className={cn(
                    "absolute bottom-0 right-0 w-6 h-6 border-4 border-white rounded-full translate-x-1 translate-y-1 shadow-sm",
                    user.role === 'siswa' ? 'bg-emerald-500' : 'bg-primary'
                  )}></div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black text-white bg-slate-900 px-3 py-1 rounded-full uppercase italic tracking-wider">
                      {user.role}
                    </span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                      {user.department || "Umum"}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{user.display_name}</h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-slate-50 p-4 rounded-2xl shadow-inner border border-slate-100 group-hover:bg-white group-hover:border-slate-200 transition-all">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Status Sistem</p>
                  <p className="text-xs font-black text-emerald-600 flex items-center gap-2 uppercase tracking-tighter">
                    <ShieldCheck size={14} fill="currentColor" className="opacity-20" /> Terverifikasi
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl shadow-inner border border-slate-100 group-hover:bg-white group-hover:border-slate-200 transition-all">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">
                    {user.role === 'siswa' ? 'Progres Ujian' : 'Akses Terakhir'}
                  </p>
                  <p className="text-xs font-black text-primary uppercase tracking-tighter italic">
                    {user.role === 'siswa' ? 'Sedang Mengerjakan' : 'Aktif'}
                  </p>
                </div>
              </div>

              {/* HD Decorative Orb */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors"></div>
              
                  <div className="flex flex-col gap-3 mt-8">
                {profile?.role === 'admin' && (
                  <div className="flex gap-2">
                    {['siswa', 'guru', 'staff', 'admin'].filter(r => r !== user.role).map(roleOption => (
                      <button
                        key={roleOption}
                        onClick={() => updateUserRole(user.id, roleOption)}
                        className="flex-1 bg-slate-100 hover:bg-slate-900 hover:text-white transition-all py-2 rounded-xl text-[8px] font-black uppercase tracking-tighter"
                      >
                        Set to {roleOption}
                      </button>
                    ))}
                  </div>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl shadow-slate-200"
                >
                  <Monitor size={16} /> Pantau Aktivitas
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {filteredData.length === 0 && !loading && (
        <div className="h-96 flex flex-col items-center justify-center gap-6 opacity-30 italic font-black uppercase tracking-[0.4em] text-slate-300">
           <Monitor size={80} strokeWidth={1} />
           <p>Tidak ada data akses</p>
        </div>
      )}
    </div>
  );
};

export default MonitoringPage;

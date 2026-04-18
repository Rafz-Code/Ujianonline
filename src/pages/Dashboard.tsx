import React from "react";
import { useAuth } from "../context/AuthContext";
import { 
  Users, 
  UserCheck, 
  GraduationCap, 
  Zap, 
  ArrowUpRight,
  TrendingUp,
  BookOpen
} from "lucide-react";
import { motion } from "motion/react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const data = [
  { name: 'Sen', attendance: 85 },
  { name: 'Sel', attendance: 88 },
  { name: 'Rab', attendance: 92 },
  { name: 'Kam', attendance: 90 },
  { name: 'Jum', attendance: 95 },
];

const Dashboard = () => {
  const { profile } = useAuth();
  const [counts, setCounts] = useState({ siswa: 0, staff: 0, guru: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const { count: siswaCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'siswa');
        const { count: guruCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'guru');
        const { count: staffCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'staff');
        
        setCounts({
          siswa: siswaCount || 0,
          guru: guruCount || 0,
          staff: staffCount || 0,
          total: (siswaCount || 0) + (guruCount || 0) + (staffCount || 0)
        });
      } catch (err) {
        console.error("Dashboard Stats Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const stats = [
    { name: "Staff & Guru", value: (counts.staff + counts.guru).toString(), icon: UserCheck, color: "text-blue-600", bg: "bg-blue-100" },
    { name: "Total Siswa", value: counts.siswa.toString(), icon: Users, icon2: GraduationCap, color: "text-red-600", bg: "bg-red-100" },
    { name: "Total Pengguna", value: counts.total.toString(), icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-100" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Banner */}
      <section className="bg-slate-900 rounded-[2rem] p-8 lg:p-12 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl lg:text-4xl font-black mb-4">
            Halo, {profile?.display_name}! 👋
          </h1>
          <p className="text-white/60 font-medium max-w-lg mb-8">
            Selamat datang di sistem manajemen SMK Prima Unggul. Semua layanan akademik Anda sudah terintegrasi dan siap digunakan.
          </p>
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold border border-white/10">
              Role: <span className="text-primary uppercase">{profile?.role}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold border border-white/10">
              Dept: <span className="text-primary italic">{profile?.department || "General"}</span>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]"></div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">Realtime</span>
            </div>
            <p className="text-gray-500 font-bold text-sm mb-1">{stat.name}</p>
            <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Exam Card */}
        <div className="lg:col-span-1">
          <div className="bg-primary rounded-[2.5rem] p-8 text-white h-full flex flex-col justify-between group cursor-pointer relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Zap size={30} fill="white" />
              </div>
              <h2 className="text-3xl font-black mb-4">Ujian Online SMK PU</h2>
              <p className="text-white/70 font-medium mb-8">Akses platform Ujian Online untuk pelaksanaan ujian tengah dan akhir semester secara aman.</p>
            </div>
            <button className="relative z-10 w-full bg-white text-primary py-4 rounded-2xl font-bold flex items-center justify-center gap-2 group-hover:scale-105 transition-transform">
              Buka Aplikasi Ujian <ArrowUpRight size={20} />
            </button>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 -mr-12 -mt-12 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
          </div>
        </div>

        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <BookOpen size={20} className="text-primary" /> Statistik Kehadiran
            </h2>
            <select className="bg-gray-50 border-none rounded-xl text-sm font-bold px-4 py-2 outline-none">
              <option>7 Hari Terakhir</option>
              <option>30 Hari Terakhir</option>
            </select>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorAttend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="attendance" stroke="#dc2626" strokeWidth={3} fillOpacity={1} fill="url(#colorAttend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

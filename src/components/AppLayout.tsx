import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { auth, signOut } from "../lib/firebase";
import { 
  LayoutDashboard, 
  UserCheck, 
  Users, 
  GraduationCap, 
  Settings, 
  FileBox, 
  LogOut,
  Menu,
  X,
  Clock,
  Calendar,
  Zap,
  Trophy
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { format } from "date-fns";

interface AppLayoutProps {
  children: React.ReactNode;
  navigate: (path: string) => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, navigate }) => {
  const { user, profile, isAdmin, isGuru, isStaff } = useAuth();
  const { darkMode } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/app/dashboard", show: !profile?.role || profile.role !== 'siswa' },
    { name: "Ujian Online", icon: Zap, path: "/app/ujian-online", show: true },
    { name: "Hasil Ujian", icon: Trophy, path: "/app/exam-results", show: isGuru || isAdmin },
    { name: "Absensi Guru/Karyawan", icon: UserCheck, path: "/app/staff-attendance", show: isStaff || isAdmin },
    { name: "Absensi Siswa", icon: GraduationCap, path: "/app/student-attendance", show: true },
    { name: "Rekap Absensi", icon: FileBox, path: "/app/recap", show: isGuru || isAdmin },
    { name: "Data Siswa", icon: Users, path: "/app/students", show: isAdmin },
    { name: "User Management", icon: Settings, path: "/app/users", show: isAdmin },
    { name: "Pengaturan", icon: Settings, path: "/app/settings", show: true },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <div className={cn(
      "flex h-screen w-full overflow-hidden transition-colors duration-300 relative perspective-[2000px]",
      darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
    )}>
      {/* Sidebar Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Elevated 3D Sidepanel */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -260, rotateY: -10 }}
            animate={{ x: 0, rotateY: 0 }}
            exit={{ x: -260, rotateY: -10 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "w-72 border-r flex flex-col z-50 fixed lg:relative h-full transition-colors duration-300",
              darkMode ? "bg-slate-900/80 border-slate-800 backdrop-blur-3xl" : "bg-white/80 border-gray-200 backdrop-blur-3xl"
            )}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="p-8 flex items-center gap-4" style={{ transform: "translateZ(30px)" }}>
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-primary/30">
                S
              </div>
              <div className={cn("font-black text-xl leading-none italic", darkMode ? "text-white" : "text-slate-900")}>
                SMK Prima<br/>
                <span className="text-primary tracking-tighter">Unggul</span>
              </div>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-8 overflow-y-auto scroll-none" style={{ transform: "translateZ(40px)" }}>
              {menuItems.filter(item => item.show).map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-sm uppercase tracking-widest",
                    window.location.pathname === item.path
                      ? "bg-primary text-white shadow-2xl shadow-primary/40 transform -translate-y-1"
                      : darkMode ? "text-slate-400 hover:bg-white/5 hover:text-white" : "text-gray-500 hover:bg-slate-100/50 hover:text-slate-900"
                  )}
                >
                  <item.icon size={20} className={window.location.pathname === item.path ? "animate-pulse" : ""} />
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>

            <div className={cn("p-6 border-t", darkMode ? "border-slate-800" : "border-slate-100")} style={{ transform: "translateZ(20px)" }}>
              <div className={cn("rounded-3xl p-5 flex items-center gap-4 shadow-inner", darkMode ? "bg-black/20" : "bg-slate-100/50")}>
                <img 
                  src={profile?.photo_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=school"} 
                  alt="Avatar" 
                  className={cn("w-12 h-12 rounded-2xl border-2 shadow-lg", darkMode ? "border-slate-700" : "border-white")}
                />
                <div className="flex-1 overflow-hidden">
                  <p className={cn("text-sm font-black truncate uppercase tracking-tight", darkMode ? "text-white" : "text-slate-900")}>{profile?.display_name}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest opacity-60">{profile?.role}</p>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative" style={{ transformStyle: "preserve-3d" }}>
        {/* Header - HD 3D Glassmorphism */}
        <header className={cn(
          "h-24 border-b px-8 flex items-center justify-between shrink-0 transition-all duration-300 z-30",
          darkMode ? "bg-slate-950/80 border-slate-800 backdrop-blur-xl" : "bg-white/80 border-slate-100 backdrop-blur-xl"
        )} style={{ transform: "translateZ(60px)" }}>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={cn("p-3 rounded-2xl transition-all shadow-sm active:scale-95", darkMode ? "bg-slate-900 hover:bg-slate-800 text-slate-400" : "bg-slate-50 hover:bg-slate-100 text-slate-600")}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden md:flex flex-col">
              <h2 className={cn("font-black text-lg tracking-tight", darkMode ? "text-white" : "text-slate-800")}>SMK Prima Unggul Kota Tangerang Selatan</h2>
              <div className={cn("flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em]", darkMode ? "text-slate-500" : "text-slate-400")}>
                <span className="flex items-center gap-2 px-3 py-1 bg-slate-100/50 rounded-full"><Calendar size={14} className="text-primary" /> {format(currentTime, "EEEE, d MMM yyyy")}</span>
                <span className="flex items-center gap-2 text-primary italic"><Clock size={14} /> {format(currentTime, "HH:mm:ss")}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className={cn(
                "flex items-center gap-3 px-6 py-3 text-xs font-black uppercase tracking-widest transition-all rounded-2xl shadow-sm hover:shadow-xl",
                darkMode ? "text-slate-400 hover:text-white hover:bg-red-900/40" : "text-slate-600 hover:text-white hover:bg-red-600 shadow-red-50"
              )}
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Portal Logout</span>
            </button>
          </div>
        </header>

        {/* Main Content - High Depth Viewport */}
        <main className={cn(
          "flex-1 overflow-y-auto scroll-smooth transition-colors duration-300 relative bg-fixed",
          darkMode ? "bg-slate-950" : "bg-slate-50"
        )} style={{ transformStyle: "preserve-3d" }}>
          {/* HD Decorative Orbs for internal pages */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-800/5 rounded-full blur-[120px] -z-10"></div>

          <div className="max-w-[1400px] mx-auto p-6 md:p-10 lg:p-14 min-h-full flex flex-col relative z-10" style={{ transformStyle: "preserve-3d" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={window.location.pathname}
                initial={{ opacity: 0, scale: 0.95, rotateY: 5 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotateY: -5 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

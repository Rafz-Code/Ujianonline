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
      "flex h-screen w-full overflow-hidden transition-colors duration-300 relative",
      darkMode ? "bg-slate-950 text-white" : "bg-gray-50 text-slate-900"
    )}>
      {/* Sidebar Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "w-64 border-r flex flex-col z-50 fixed lg:relative h-full transition-colors duration-300",
              darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"
            )}
          >
            <div className="p-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
                S
              </div>
              <div className={cn("font-bold text-lg leading-tight", darkMode ? "text-white" : "text-slate-800")}>
                SMK Prima<br/>
                <span className="text-primary">Unggul</span>
              </div>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
              {menuItems.filter(item => item.show).map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                    window.location.pathname === item.path
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : darkMode ? "text-slate-400 hover:bg-slate-800 hover:text-white" : "text-gray-500 hover:bg-gray-100"
                  )}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>

            <div className={cn("p-4 border-t", darkMode ? "border-slate-800" : "border-gray-100")}>
              <div className={cn("rounded-2xl p-4 flex items-center gap-3", darkMode ? "bg-slate-800/50" : "bg-gray-50")}>
                <img 
                  src={profile?.photo_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=school"} 
                  alt="Avatar" 
                  className={cn("w-10 h-10 rounded-full border-2", darkMode ? "border-slate-700" : "border-white")}
                />
                <div className="flex-1 overflow-hidden">
                  <p className={cn("text-sm font-bold truncate", darkMode ? "text-white" : "text-slate-900")}>{profile?.display_name}</p>
                  <p className="text-xs text-gray-400 capitalize">{profile?.role}</p>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className={cn(
          "h-20 border-b px-6 flex items-center justify-between shrink-0 transition-colors duration-300",
          darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-100"
        )}>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={cn("p-2 rounded-lg transition-colors", darkMode ? "hover:bg-slate-800 text-slate-400" : "hover:bg-gray-100 text-gray-500")}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden md:flex flex-col">
              <h2 className={cn("font-bold", darkMode ? "text-white" : "text-gray-800")}>SMK Prima Unggul Kota Tangerang Selatan</h2>
              <div className={cn("flex items-center gap-4 text-xs font-medium", darkMode ? "text-slate-500" : "text-gray-500")}>
                <span className="flex items-center gap-1"><Calendar size={14} /> {format(currentTime, "EEEE, d MMMM yyyy")}</span>
                <span className="flex items-center gap-1 text-primary italic"><Clock size={14} /> {format(currentTime, "HH:mm:ss")}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors rounded-lg",
                darkMode ? "text-slate-400 hover:text-primary hover:bg-slate-800" : "text-gray-600 hover:text-primary hover:bg-red-50"
              )}
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className={cn(
          "flex-1 overflow-y-auto scroll-smooth transition-colors duration-300 relative",
          darkMode ? "bg-slate-950" : "bg-gray-50/50"
        )}>
          <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-10 min-h-full flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={window.location.pathname}
                initial={{ opacity: 0, scale: 0.98, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -5 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="flex-1 w-full"
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

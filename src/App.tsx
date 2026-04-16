import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import StaffAttendance from "./pages/StaffAttendance";
import StudentAttendance from "./pages/StudentAttendance";
import StudentData from "./pages/StudentData";
import UserManagement from "./pages/UserManagement";
import AttendanceRecap from "./pages/AttendanceRecap";
import RegisterPage from "./pages/RegisterPage";
import HubPage from "./pages/HubPage";
import UjianOnline from "./pages/UjianOnline";
import ExamResultsRecap from "./pages/ExamResultsRecap";
import SettingsPage from "./pages/SettingsPage";
import { ThemeProvider } from "./context/ThemeContext";

const Router = () => {
  const { user, profile, loading } = useAuth();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  if (loading) return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  // Protected routes check
  if (currentPath.startsWith("/app") && !user) {
    navigate("/login");
    return <LoginPage navigate={navigate} />;
  }

  if (currentPath === "/login" && user) {
    navigate("/hub");
    return <HubPage navigate={navigate} />;
  }

  // Routing logic
  switch (currentPath) {
    case "/":
      return <LandingPage navigate={navigate} />;
    case "/login":
      return <LoginPage navigate={navigate} />;
    case "/register":
      return <RegisterPage navigate={navigate} />;
    case "/portal":
    case "/hub":
      return user ? <HubPage navigate={navigate} /> : <LoginPage navigate={navigate} />;
    case "/app":
    case "/app/dashboard":
      return <AppLayout navigate={navigate}><Dashboard /></AppLayout>;
    case "/app/staff-attendance":
      return <AppLayout navigate={navigate}><StaffAttendance /></AppLayout>;
    case "/app/student-attendance":
      return <AppLayout navigate={navigate}><StudentAttendance /></AppLayout>;
    case "/app/students":
      return <AppLayout navigate={navigate}><StudentData /></AppLayout>;
    case "/app/users":
      return <AppLayout navigate={navigate}><UserManagement /></AppLayout>;
    case "/app/recap":
      return <AppLayout navigate={navigate}><AttendanceRecap /></AppLayout>;
    case "/app/ujian-online":
      return <AppLayout navigate={navigate}><UjianOnline navigate={navigate} /></AppLayout>;
    case "/app/exam-results":
      return <AppLayout navigate={navigate}><ExamResultsRecap /></AppLayout>;
    case "/app/settings":
      return <AppLayout navigate={navigate}><SettingsPage /></AppLayout>;
    default:
      if (currentPath.startsWith("/app/")) {
        return <AppLayout navigate={navigate}><Dashboard /></AppLayout>;
      }
      return <LandingPage navigate={navigate} />;
  }
};

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </AuthProvider>
  );
}

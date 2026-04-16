import React, { useState, useEffect } from "react";
import { db, collection, getDocs, doc, updateDoc, deleteDoc } from "../lib/firebase";
import { Settings, Shield, User, Edit3, Trash2, Mail, Briefcase } from "lucide-react";
import { cn } from "../lib/utils";

interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  department: string;
  photoURL: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<AppUser | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "users"));
      setUsers(snapshot.docs.map(doc => doc.data() as AppUser));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleUpdateRole = async (uid: string, newRole: string) => {
    try {
      await updateDoc(doc(db, "users", uid), { role: newRole });
      fetchUsers();
      setEditingUser(null);
    } catch (err) {
      alert("Gagal update role");
    }
  };

  const handleDeleteUser = async (uid: string) => {
    if (confirm("Hapus akses user ini?")) {
      await deleteDoc(doc(db, "users", uid));
      fetchUsers();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
          <Settings className="text-primary" /> User Management
        </h1>
        <p className="text-gray-500 font-medium">Kelola hak akses dan peran seluruh personalia sekolah.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {loading ? (
          <div className="lg:col-span-2 text-center p-20">Loading...</div>
        ) : (
          users.map((user) => (
            <div key={user.uid} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-start gap-4">
              <img src={user.photoURL} alt="" className="w-16 h-16 rounded-2xl border-4 border-gray-50 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-black text-slate-800 truncate">{user.displayName}</h3>
                  <div className={cn("px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest", {
                    "bg-red-100 text-red-600": user.role === "admin",
                    "bg-blue-100 text-blue-600": user.role === "guru",
                    "bg-gray-100 text-gray-600": user.role === "staff",
                  })}>{user.role}</div>
                </div>
                <div className="space-y-1">
                  <p className="flex items-center gap-2 text-xs font-bold text-gray-400">
                    <Mail size={12} /> {user.email}
                  </p>
                  <p className="flex items-center gap-2 text-xs font-bold text-gray-400">
                    <Briefcase size={12} /> {user.department || "General"}
                  </p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-50 flex gap-2">
                  <select 
                    value={user.role}
                    onChange={(e) => handleUpdateRole(user.uid, e.target.value)}
                    className="bg-gray-50 border-none rounded-lg text-xs font-black px-3 py-2 outline-none"
                  >
                    <option value="admin">Admin</option>
                    <option value="guru">Guru</option>
                    <option value="staff">Staff</option>
                  </select>
                  <button 
                    onClick={() => handleDeleteUser(user.uid)}
                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg ml-auto"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserManagement;

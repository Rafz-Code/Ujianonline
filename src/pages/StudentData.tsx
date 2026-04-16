import React, { useState, useEffect } from "react";
import { db, collection, getDocs, addDoc, serverTimestamp, deleteDoc, doc, updateDoc } from "../lib/firebase";
import { Users, Plus, Trash2, Edit2, X, Check, Search, Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

interface Student {
  id: string;
  nis: string;
  name: string;
  class: string;
  major: string;
}

const StudentData = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    nis: "",
    name: "",
    class: "X",
    major: "TKJ"
  });

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "students"));
      setStudents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Student)));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateDoc(doc(db, "students", editId), { ...formData });
      } else {
        await addDoc(collection(db, "students"), {
          ...formData,
          createdAt: serverTimestamp()
        });
      }
      setIsModalOpen(false);
      setFormData({ nis: "", name: "", class: "X", major: "TKJ" });
      setEditId(null);
      fetchStudents();
    } catch (err) {
      alert("Gagal simpan data");
    }
  };

  const handleEdit = (student: Student) => {
    setFormData({ nis: student.nis, name: student.name, class: student.class, major: student.major });
    setEditId(student.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Hapus data siswa ini?")) {
      await deleteDoc(doc(db, "students", id));
      fetchStudents();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <Users className="text-primary" /> Master Data Siswa
          </h1>
          <p className="text-gray-500 font-medium">Kelola data seluruh siswa SMK Prima Unggul.</p>
        </div>
        <button
          onClick={() => { setIsModalOpen(true); setEditId(null); setFormData({ nis: "", name: "", class: "X", major: "TKJ" }); }}
          className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-primary/20 hover:scale-105 transition-all"
        >
          <Plus size={20} /> Tambah Siswa
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
        {loading ? (
          <div className="p-20 text-center">Loading...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs font-black uppercase text-gray-400">
              <tr>
                <th className="px-8 py-4">NIS</th>
                <th className="px-8 py-4">Nama Lengkap</th>
                <th className="px-8 py-4">Kelas</th>
                <th className="px-8 py-4">Jurusan</th>
                <th className="px-8 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5 font-bold text-gray-400">{student.nis}</td>
                  <td className="px-8 py-5 font-bold text-slate-800">{student.name}</td>
                  <td className="px-8 py-5"><span className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-black">{student.class}</span></td>
                  <td className="px-8 py-5">
                    <span className={cn("px-3 py-1 rounded-lg text-xs font-black text-white", {
                      "bg-blue-500": student.major === "TKJ",
                      "bg-purple-500": student.major === "DKV",
                      "bg-amber-500": student.major === "MPLB",
                      "bg-emerald-500": student.major === "AKL",
                      "bg-red-500": student.major === "BC",
                      "bg-orange-500": student.major === "BD",
                    })}>{student.major}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => handleEdit(student)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg"><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(student.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-3xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black">{editId ? "Edit Data" : "Tambah Siswa"}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">NIS</label>
                  <input
                    required
                    type="text"
                    value={formData.nis}
                    onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Contoh: 2024001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">Nama Lengkap</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Nama lengkap siswa"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Kelas</label>
                    <select
                      value={formData.class}
                      onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                      className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold outline-none"
                    >
                      <option value="X">X</option>
                      <option value="XI">XI</option>
                      <option value="XII">XII</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Jurusan</label>
                    <select
                      value={formData.major}
                      onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                      className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold outline-none"
                    >
                      <option value="TKJ">TKJ</option>
                      <option value="DKV">DKV</option>
                      <option value="MPLB">MPLB</option>
                      <option value="AKL">AKL</option>
                      <option value="BC">BC</option>
                      <option value="BD">BD</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-black shadow-xl shadow-primary/20">
                  {editId ? "Update Data Siswa" : "Simpan Data Siswa"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentData;

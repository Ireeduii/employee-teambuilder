"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Sidebar } from "@/components/main/Sidebar";
import { Header } from "@/components/main/Header";
import {
  User,
  Mail,
  Shield,
  Building2,
  Phone,
  MapPin,
  FileText,
  Save,
  Code2,
} from "lucide-react";

export default function ProfilePage() {
  const params = useParams();
  const id = params?.id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    phone: "",
    bio: "",
    github: "",
    location: "",
    skills: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    async function fetchMember() {
      try {
        const res = await fetch(`/api/team/${id}`);
        const json = await res.json();
        if (res.ok && json.data) {
          const data = json.data;
          setFormData({
            name: data.name || "",
            email: data.email || "",
            role: data.role || "",
            department: data.department || "",
            phone: data.phone || "",
            bio: data.bio || "",
            github: data.github || "",
            location: data.location || "",
            skills: Array.isArray(data.skills)
              ? data.skills.join(", ")
              : data.skills || "",
          });
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMember();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const payload = {
        ...formData,
        skills: formData.skills
          ? formData.skills
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : [],
      };

      const res = await fetch(`/api/team/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      console.log("API-с ирсэн data:", json);
      if (res.ok) {
        setMessage("Амжилттай хадгалагдлаа! ");
      } else {
        setMessage(json.error || "Алдаа гарлаа ");
      }
    } catch (err) {
      console.error("Save error:", err);
      setMessage("Серверийн алдаа гарлаа ");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500">
        Профайлыг ачаалж байна...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <User className="w-6 h-6 text-cyan-500" />
                Миний профайл
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Өөрийн хувийн болон холбоо барих мэдээллээ шинэчлэх.
              </p>
            </div>

            {message && (
              <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-900 text-cyan-700 dark:text-cyan-300 text-sm font-medium">
                {message}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" /> Нэр
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" /> Имэйл хаяг
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/50 text-slate-400 text-sm cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-slate-400" /> Албан тушаал
                    (Role)
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" /> Хэлтэс
                    (Department)
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" /> Утасны дугаар
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    placeholder="Жишээ: +976 9911..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" /> Байршил
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location || ""}
                    onChange={handleChange}
                    placeholder="Улаанбаатар, Монгол"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-slate-400" /> Ур чадварууд
                    (Skills)
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills || ""}
                    onChange={handleChange}
                    placeholder="Жишээ: React, Node.js, Python (таслалаар тусгаарлана уу)"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    URL / GitHub
                  </label>
                  <input
                    type="text"
                    name="github"
                    value={formData.github || ""}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" /> Товч намтар
                    (Bio)
                  </label>
                  <textarea
                    name="bio"
                    rows={3}
                    value={formData.bio || ""}
                    onChange={handleChange}
                    placeholder="Өөрийнхөө тухай товч бичнэ үү..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-medium text-sm transition-all shadow-sm disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Хадгалж байна..." : "Өөрчлөлтийг хадгалах"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Sidebar } from "@/components/main/Sidebar";
import { Header } from "@/components/main/Header";

export default function MyProfilePage() {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dbId, setDbId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    phone: "",
    skills: "",
    bio: "",
  });

  useEffect(() => {
    async function fetchMyProfileData() {
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      if (!userEmail) return;

      try {
        const res = await fetch(`/api/team/me?email=${userEmail}`);
        const result = await res.json();

        if (res.ok && result.data) {
          setDbId(result.data.id);
          setFormData({
            name: result.data.name || "",
            email: result.data.email || "",
            role: result.data.role || "",
            department: result.data.department || "",
            phone: result.data.phone || "",
            skills: Array.isArray(result.data.skills)
              ? result.data.skills.join(", ")
              : "",
            bio: result.data.bio || "",
          });
        }
      } catch (err) {
        console.error("Дата татахад алдаа гарлаа:", err);
      } finally {
        setLoading(false);
      }
    }

    if (isLoaded && user) {
      fetchMyProfileData();
    }
  }, [user, isLoaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dbId) return;

    setSaving(true);
    try {
      await fetch(`/api/team/${dbId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          skills: formData.skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        }),
      });
      alert("Мэдээлэл амжилттай хадгалагдлаа!");
    } catch (_err) {
      alert("Алдаа гарлаа.");
    } finally {
      setSaving(false);
    }
  };

  if (!isLoaded || loading) {
    return <div className="p-8 text-center">Ачаалж байна...</div>;
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="p-8 overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <div>
              <p>Нэр: {formData.name}</p>
              <p>Имэйл: {formData.email}</p>
              <p>Албан тушаал: {formData.role}</p>
            </div>

            <button type="submit" disabled={saving}>
              Хадгалах
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}

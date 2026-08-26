"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Mail, Building2, UserCheck, Shield } from "lucide-react";
import { Sidebar } from "@/components/main/Sidebar";
import { Header } from "@/components/main/Header";

interface Member {
  id: string;
  name: string;
  role: string;
  department?: string;
  email?: string;
}

export default function TeamMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        // Миний/Үүссэн багийн гишүүдийг авах API
        const res = await fetch("/api/team/me");
        const data = await res.json();

        if (res.ok && data.data) {
          // Багийн гишүүд эсвэл нэгтгэсэн дата
          setMembers(
            Array.isArray(data.data) ? data.data : data.data.members || [],
          );
        } else {
          setError(data.error || "Багийн мэдээлэл олдсонгүй");
        }
      } catch (_err) {
        setError("Дата татахад алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    }

    fetchTeamMembers();
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        {/* Үндсэн контент */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Гарчиг ба хэсэг */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Users className="w-6 h-6 text-cyan-500" />
                  Багийн гишүүд (Team Members)
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Бүрдүүлсэн багийн гишүүдийн дэлгэрэнгүй жагсаалт болон үүрэг.
                </p>
              </div>
            </div>

            {/* Нөхцөлт харагдац */}
            {loading ? (
              <div className="p-12 text-center text-slate-500">
                Багийн гишүүдийн мэдээллийг ачаалж байна...
              </div>
            ) : error ? (
              <div className="p-8 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-2xl text-center max-w-md mx-auto">
                <p className="text-rose-500 font-medium">{error}</p>
              </div>
            ) : members.length === 0 ? (
              <div className="p-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-center space-y-4">
                <Users className="w-12 h-12 text-slate-400 mx-auto" />
                <p className="text-slate-600 dark:text-slate-400 font-medium">
                  Одоогоор сонгогдсон багийн гишүүд байхгүй байна.
                </p>
                <Link
                  href="/team-builder"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition-all shadow-sm"
                >
                  Team Builder руу очих
                </Link>
              </div>
            ) : (
              /* Багийн гишүүдийн карт хэлбэртэй grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {members.map((member) => (
                  <Link
                    key={member.id}
                    href={`/profile/${member.id}`}
                    className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-cyan-500/50 hover:shadow-md transition-all space-y-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold text-lg flex-shrink-0 group-hover:scale-105 transition-transform">
                        {member.name
                          ? member.name.charAt(0).toUpperCase()
                          : "U"}
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="font-bold text-slate-900 dark:text-white truncate group-hover:text-cyan-500 transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-xs font-medium text-cyan-600 dark:text-cyan-400 flex items-center gap-1 mt-0.5">
                          <Shield className="w-3 h-3" />
                          {member.role || "Гишүүн"}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>Хэлтэс: {member.department || "Байхгүй"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">
                          {member.email || "Имэйлгүй"}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

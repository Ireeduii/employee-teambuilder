"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/main/Sidebar";
import { Header } from "@/components/main/Header";

import { StatCard } from "@/components/main/StatCard";
import { TeamTable } from "@/components/main/TeamTable";
import { AddMemberModal } from "@/components/main/AddMemberModal";
import { TeamMember } from "@/types/dashboard";
import { getDynamicMetrics } from "@/utils/metrics"; // 1. Функцээ импортлох

export default function Home() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // buh ajilchdin haruulah state
  const [showAll, setShowAll] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      // Зөвхөн гишүүдийн датагаа л татаж авна (/api/metrics ашиглахгүй)
      const teamRes = await fetch("/api/team");

      if (teamRes.ok) {
        const teamJson = await teamRes.json();
        setMembers(teamJson.data || []);
      }
    } catch (err) {
      console.error("Data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Гишүүдийн дата дээрээ тулгуурлан метрикүүдийг шууд бодож гаргана
  const metrics = getDynamicMetrics(members);

  const displayedMembers = showAll ? members : members.slice(0, 4);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Тавтай морил, Админ
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Системийн өнөөдрийн тойм ба статистик
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-medium text-sm transition-all shadow-sm"
            >
              + Шинэ гишүүн нэмэх
            </button>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400 font-medium">
              Мэдээллийг ачаалж байна...
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, index: number) => (
                  <StatCard key={index} metric={metric} />
                ))}
              </div>

              <div className="space-y-4">
                <TeamTable members={displayedMembers} />

                {/* ajilchdin too 4s ih bval huraah */}
                {members.length > 4 && (
                  <div className="flex justify-center pt-2">
                    <button
                      onClick={() => setShowAll(!showAll)}
                      className="px-6 py-2.5 text-white bg-cyan-400 hover:bg-cyan-500 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium transition-all shadow-sm"
                    >
                      {showAll
                        ? "Хурааж харах"
                        : `See More (${members.length - 4} гишүүн үлдсэн)`}
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>

      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchData}
      />
    </div>
  );
}

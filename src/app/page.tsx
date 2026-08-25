"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { StatCard } from "../components/StatCard";
import { TeamTable } from "../components/TeamTable";
import { AddMemberModal } from "../components/AddMemberModal";
import { StatMetric, TeamMember } from "../types/dashboard";

export default function Home() {
  const [metrics, setMetrics] = useState<StatMetric[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const [metricsRes, teamRes] = await Promise.all([
        fetch("/api/metrics"),
        fetch("/api/team"),
      ]);

      if (metricsRes.ok) {
        const metricsJson = await metricsRes.json();
        setMetrics(metricsJson.data || []);
      }

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

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-8 space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Тавтай морил, Админ 👋
              </h1>
              <p className="text-sm text-slate-500">
                Системийн өнөөдрийн тойм ба статистик
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-cyan-500 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
            >
              + Шинэ гишүүн нэмэх
            </button>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-500 font-medium">
              Мэдээллийг ачаалж байна...
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric: StatMetric, index: number) => (
                  <StatCard key={index} metric={metric} />
                ))}
              </div>

              <TeamTable members={members} />
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

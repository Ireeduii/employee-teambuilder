"use client";

import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { StatCard } from "../components/StatCard";
import { TeamTable } from "../components/TeamTable";
import { mockMetrics, mockTeamMembers } from "../mock/mockData";
import { StatMetric } from "../types/dashboard";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Хажуугийн цэс */}
      <Sidebar />

      {/* Үндсэн контент хэсэг */}
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-8 space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Тавтай морил, Админ 👋
            </h1>
            <p className="text-sm text-slate-500">
              Системийн өнөөдрийн тойм ба статистик
            </p>
          </div>

          {/* Статистик картууд - Metric болон index-д тип зааж өгсөн */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockMetrics.map((metric: StatMetric, index: number) => (
              <StatCard key={index} metric={metric} />
            ))}
          </div>

          {/* Багийн хүснэгт */}
          <TeamTable members={mockTeamMembers} />
        </main>
      </div>
    </div>
  );
}

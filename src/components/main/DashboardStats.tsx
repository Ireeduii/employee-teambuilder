"use client";

import React from "react";
import { Users, FolderKanban, Award, CheckSquare } from "lucide-react";

export const DashboardStats = () => {
  const stats = [
    {
      title: "Нийт Инженерүүд",
      value: "42",
      change: "+12%",
      isPositive: true,
      icon: Users,
      color: "cyan",
    },
    {
      title: "Идэвхтэй Төслүүд",
      value: "8",
      change: "+2",
      isPositive: true,
      icon: FolderKanban,
      color: "teal",
    },
    {
      title: "Дундаж Skill Score",
      value: "88%",
      change: "+5.4%",
      isPositive: true,
      icon: Award,
      color: "indigo",
    },
    {
      title: "Нээлттэй Таскууд",
      value: "15",
      change: "-3",
      isPositive: false,
      icon: CheckSquare,
      color: "sky",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-semibold text-slate-400 mb-1">
                {stat.title}
              </p>
              <h3 className="text-2xl font-bold text-slate-800">
                {stat.value}
              </h3>
              <span
                className={`inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-md ${
                  stat.isPositive
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-rose-50 text-rose-600"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

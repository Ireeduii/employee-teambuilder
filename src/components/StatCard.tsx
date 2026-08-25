// dvtan ashiglagdah statistic card
"use client";

import React from "react";
import { StatMetric } from "../types/dashboard";

interface StatCardProps {
  metric: StatMetric;
}

export const StatCard: React.FC<StatCardProps> = ({ metric }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <p className="text-sm text-slate-500 font-medium">{metric.title}</p>
      <div className="flex items-baseline justify-between mt-2">
        <h3 className="text-2xl font-bold text-slate-800">{metric.value}</h3>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            metric.isPositive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-rose-50 text-rose-600"
          }`}
        >
          {metric.change}
        </span>
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { LayoutDashboard, Users, Layers, Settings, LogOut } from "lucide-react";

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-stale-900 text-stale-300 h-screen flex flex-col justify-between p-4 border-slate-800">
      <div>
        {/* logo section */}
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white">
            E
          </div>
          <span className="font-semibold text-lg text-white">
            Enterprise Hub
          </span>
        </div>

        <nav className="space-y-1">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-md bg-indigo-600 text-white font-medium"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-600 transition-colors"
          >
            <Users className="w-5 h-5" />
            Team Members
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-600 transition-colors"
          >
            <Users className="w-5 h-5" />
            Skills Matrix
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-600 transition-colors"
          >
            <Users className="w-5 h-5" />
            Settings
          </a>
        </nav>
      </div>

      {/* system-s garah button */}
      <button className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-600 text-rose-400 transition-colors w-full">
        <LogOut className="w-5 h-5" />
        Log Out
      </button>
    </aside>
  );
};

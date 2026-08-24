"use client";

import React from "react";
import { Search, Bell } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="h-16 border-b border-slate-2-- bg-white px-6 flex items-center justify-between">
      <div className="relative w-96">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Хайх утга аа оруулна уу"
          className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-indigo-500 text-slate-800"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-slate-100 rounded-full text-slate-600 relative">
          <Bell className="w-5 h-5" />
          <span className="w-2 h-2 bg-indigo-600 rounded-full absolute top-2 right-2" />
        </button>
        <div className="flex items-center gap-3 border-l pl-4 border-slate-200">
          <img
            src="https://i.pravatar.cc/150?u=admin"
            alt="Admin Avatar"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-slate-800">Admin</p>
            <p className="text-xs text-slate-500">Tech Lead</p>
          </div>
        </div>
      </div>
    </header>
  );
};

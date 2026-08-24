"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Layers, Settings, LogOut } from "lucide-react";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Team Members", href: "/", icon: Users },
    { name: "Team Builder", href: "/team-builder", icon: Layers },
    { name: "Skills Matrix", href: "/skills", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 h-screen flex flex-col justify-between p-4 border-r border-slate-800 shrink-0">
      <div>
        {/* Logo Section */}
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white">
            E
          </div>
          <span className="font-semibold text-lg text-white">
            Enterprise Hub
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Log Out */}
      <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 text-rose-400 transition-colors w-full text-sm font-medium">
        <LogOut className="w-5 h-5" />
        Log Out
      </button>
    </aside>
  );
};

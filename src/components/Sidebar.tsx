// "use client";

// import React from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { LayoutDashboard, Users, Layers, Settings, LogOut } from "lucide-react";

// export const Sidebar: React.FC = () => {
//   const pathname = usePathname();

//   const navItems = [
//     { name: "Dashboard", href: "/", icon: LayoutDashboard },
//     { name: "Team Members", href: "/", icon: Users },
//     { name: "Team Builder", href: "/team-builder", icon: Layers },
//     { name: "Skills Matrix", href: "/skills", icon: Settings },
//   ];

//   return (
//     <aside className="w-64 bg-slate-900 text-slate-300 h-screen flex flex-col justify-between p-4 border-r border-slate-800 shrink-0">
//       <div>
//         {/* Logo Section */}
//         <div className="flex items-center gap-2 mb-8 px-2">
//           <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white">
//             E
//           </div>
//           <span className="font-semibold text-lg text-white">
//             Enterprise Hub
//           </span>
//         </div>

//         {/* Navigation */}
//         <nav className="space-y-1">
//           {navItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = pathname === item.href;

//             return (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
//                   isActive
//                     ? "bg-indigo-600 text-white"
//                     : "text-slate-400 hover:bg-slate-800 hover:text-white"
//                 }`}
//               >
//                 <Icon className="w-5 h-5" />
//                 {item.name}
//               </Link>
//             );
//           })}
//         </nav>
//       </div>

//       {/* Log Out */}
//       <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 text-rose-400 transition-colors w-full text-sm font-medium">
//         <LogOut className="w-5 h-5" />
//         Log Out
//       </button>
//     </aside>
//   );
// };

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Layers,
  BrainCircuit,
  LogOut,
  Sparkles,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Team Members", href: "/team", icon: Users },
  { name: "Team Builder", href: "/team-builder", icon: Layers },
  { name: "Skills Matrix", href: "/skills", icon: BrainCircuit },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col justify-between h-screen sticky top-0">
      {/* Upper Section */}
      <div className="p-5">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-cyan-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-slate-800 text-base leading-tight">
              Enterprise<span className="text-cyan-600">Hub</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium">
              TEAM MANAGEMENT
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-cyan-50 text-cyan-700 shadow-sm border border-cyan-100/60"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-cyan-600" : "text-slate-400"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Profile or Log Out */}
      <div className="p-4 border-t border-slate-100">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all">
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

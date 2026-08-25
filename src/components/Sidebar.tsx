// "use client";

// import React from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   Users,
//   Layers,
//   BrainCircuit,
//   LogOut,
//   Sparkles,
// } from "lucide-react";

// const navigation = [
//   { name: "Dashboard", href: "/", icon: LayoutDashboard },
//   { name: "Team Members", href: "/team", icon: Users },
//   { name: "Team Builder", href: "/team-builder", icon: Layers },
//   { name: "Skills Matrix", href: "/skills", icon: BrainCircuit },
// ];

// export const Sidebar = () => {
//   const pathname = usePathname();

//   return (
//     <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 dark:text-slate-100 flex flex-col justify-between h-screen sticky top-0">
//       <div className="p-5">
//         <div className="flex items-center gap-3 px-2 mb-8">
//           <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-cyan-500/20">
//             <Sparkles className="w-5 h-5 text-white" />
//           </div>
//           <div>
//             <h1 className="font-bold text-slate-800 text-base leading-tight">
//               Enterprise<span className="text-cyan-600">Hub</span>
//             </h1>
//             <p className="text-[10px] text-slate-400 font-medium">
//               TEAM MANAGEMENT
//             </p>
//           </div>
//         </div>

//         <nav className="space-y-1.5">
//           {navigation.map((item) => {
//             const isActive = pathname === item.href;
//             const Icon = item.icon;

//             return (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
//                   isActive
//                     ? "bg-cyan-50 text-cyan-700 shadow-sm border border-cyan-100/60"
//                     : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
//                 }`}
//               >
//                 <Icon
//                   className={`w-4 h-4 ${
//                     isActive ? "text-cyan-600" : "text-slate-400"
//                   }`}
//                 />
//                 {item.name}
//               </Link>
//             );
//           })}
//         </nav>
//       </div>

//       <div className="p-4 border-t border-slate-100">
//         <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all">
//           <LogOut className="w-4 h-4" />
//           <span>Log Out</span>
//         </button>
//       </div>
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
  { name: "Team Members", href: "/team-members", icon: Users },
  { name: "Team Builder", href: "/team-builder", icon: Layers },
  { name: "Skills Matrix", href: "/skills", icon: BrainCircuit },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 dark:text-slate-100 flex flex-col justify-between h-screen sticky top-0">
      <div className="p-5">
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-cyan-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-slate-800 dark:text-white text-base leading-tight">
              Enterprise
              <span className="text-cyan-600 dark:text-cyan-400">Hub</span>
            </h1>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
              TEAM MANAGEMENT
            </p>
          </div>
        </div>

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
                    ? "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-400 shadow-sm border border-cyan-100/60 dark:border-cyan-900/50"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? "text-cyan-600 dark:text-cyan-400"
                      : "text-slate-400"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all">
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

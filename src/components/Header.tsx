// "use client";

// import React from "react";
// import { Search, Bell } from "lucide-react";

// export const Header: React.FC = () => {
//   return (
//     <header className="h-16 border-b border-slate-2-- bg-white px-6 flex items-center justify-between">
//       <div className="relative w-96">
//         <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//         <input
//           type="text"
//           placeholder="Хайх утга аа оруулна уу"
//           className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-indigo-500 text-slate-800"
//         />
//       </div>

//       <div className="flex items-center gap-4">
//         <button className="p-2 hover:bg-slate-100 rounded-full text-slate-600 relative">
//           <Bell className="w-5 h-5" />
//           <span className="w-2 h-2 bg-indigo-600 rounded-full absolute top-2 right-2" />
//         </button>
//         <div className="flex items-center gap-3 border-l pl-4 border-slate-200">
//           <img
//             src="https://i.pravatar.cc/150?u=admin"
//             alt="Admin Avatar"
//             className="w-9 h-9 rounded-full object-cover"
//           />
//           <div>
//             <p className="text-sm font-medium text-slate-800">Admin</p>
//             <p className="text-xs text-slate-500">Tech Lead</p>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

"use client";

import React from "react";
import { Search, Bell } from "lucide-react";

export const Header = () => {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-40">
      {/* Search Bar */}
      <div className="relative w-80">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="Хайх утгаа оруулна уу..."
          className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200/60 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-slate-700 placeholder-slate-400"
        />
      </div>

      {/* Profile & Notifications */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full ring-2 ring-white" />
        </button>

        <div className="h-6 w-px bg-slate-200" />

        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
            alt="User Avatar"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-cyan-500/20"
          />
          <div className="text-left hidden sm:block">
            <p className="text-sm font-semibold text-slate-800 leading-tight">
              Admin
            </p>
            <p className="text-xs text-slate-400">Tech Lead</p>
          </div>
        </div>
      </div>
    </header>
  );
};

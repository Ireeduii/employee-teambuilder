// "use client";

// import React from "react";
// import { TeamMember } from "../types/dashboard";
// import Link from "next/link";

// // Component Props-ийн тип зааж өгнө
// interface TeamTableProps {
//   members: TeamMember[];
// }

// export const TeamTable: React.FC<TeamTableProps> = ({ members }) => {
//   return (
//     <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
//       <div className="p-5 border-b border-slate-200">
//         <h2 className="text-lg font-bold text-slate-800">
//           Багийн Гишүүд & Ур Чадвар
//         </h2>
//         <p className="text-sm text-slate-500">
//           Нийт бүртгэлтэй инженерүүдийн статус
//         </p>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-left border-collapse text-sm">
//           <thead>
//             <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
//               <th className="p-4 font-semibold">Нэр / Имэйл</th>
//               <th className="p-4 font-semibold">Албан тушаал</th>
//               <th className="p-4 font-semibold">Ур чадварууд</th>
//               <th className="p-4 font-semibold">Төлөв</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-100">
//             {members.map((member: TeamMember) => (
//               <tr
//                 key={member.id}
//                 className="hover:bg-slate-50 transition-colors"
//               >
//                 <td className="p-4 flex items-center gap-3">
//                   <img
//                     src={member.avatarUrl}
//                     alt={member.name}
//                     className="w-8 h-8 rounded-full"
//                   />
//                   <div>
//                     <p className="font-medium text-slate-800">{member.name}</p>
//                     <p className="text-xs text-slate-400">{member.email}</p>
//                   </div>
//                 </td>
//                 <td className="p-4 text-slate-600">{member.role}</td>
//                 <td className="p-4">
//                   <div className="flex gap-1.5 flex-wrap">
//                     {member.skills.map((skill: string, index: number) => (
//                       <span
//                         key={index}
//                         className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md border border-slate-200"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </td>
//                 <td className="p-4">
//                   <span
//                     className={`inline-block px-2.5 py-1 text-xs rounded-full font-medium ${
//                       member.status === "Active"
//                         ? "bg-emerald-50 text-emerald-600"
//                         : "bg-amber-50 text-amber-600"
//                     }`}
//                   >
//                     {member.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

"use client";

import React from "react";
import { TeamMember } from "../types/dashboard";
import Link from "next/link";

interface TeamTableProps {
  members: TeamMember[];
}

export const TeamTable: React.FC<TeamTableProps> = ({ members }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-800">
          Багийн Гишүүд & Ур Чадвар
        </h2>
        <p className="text-sm text-slate-500">
          Нийт бүртгэлтэй инженерүүдийн статус
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <th className="p-4 font-semibold">Нэр / Имэйл</th>
              <th className="p-4 font-semibold">Албан тушаал</th>
              <th className="p-4 font-semibold">Ур чадварууд</th>
              <th className="p-4 font-semibold">Төлөв</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.map((member: TeamMember) => (
              <tr
                key={member.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="p-4 flex items-center gap-3">
                  {/* Профайл руу үсрэх Link */}
                  <Link
                    href={`/profile/${member.id}`}
                    className="flex items-center gap-3 group"
                  >
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="w-8 h-8 rounded-full group-hover:opacity-80 transition-opacity"
                    />
                    <div>
                      <p className="font-medium text-slate-800 group-hover:text-indigo-600 group-hover:underline">
                        {member.name}
                      </p>
                      <p className="text-xs text-slate-400">{member.email}</p>
                    </div>
                  </Link>
                </td>
                <td className="p-4 text-slate-600">{member.role}</td>
                <td className="p-4">
                  <div className="flex gap-1.5 flex-wrap">
                    {member.skills.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`inline-block px-2.5 py-1 text-xs rounded-full font-medium ${
                      member.status === "Active"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

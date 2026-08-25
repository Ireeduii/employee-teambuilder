// "use client";

// import React, { useEffect, useState } from "react";
// import { Sidebar } from "@/components/Sidebar";
// import { Header } from "@/components/Header";
// import { TeamMember } from "@/types/dashboard";
// import { Code2, Users, Award, TrendingUp } from "lucide-react";

// interface SkillCount {
//   name: string;
//   count: number;
//   members: TeamMember[];
// }

// export default function SkillsMatrixPage() {
//   const [members, setMembers] = useState<TeamMember[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchMembers() {
//       try {
//         const res = await fetch("/api/team");
//         if (res.ok) {
//           const json = await res.json();
//           setMembers(json.data || []);
//         }
//       } catch (err) {
//         console.error("Failed to fetch skills data", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchMembers();
//   }, []);

//   // ur chdvarin dvtamjiig toocooloh
//   const skillCounts: SkillCount[] = React.useMemo(() => {
//     const map = new Map<string, TeamMember[]>();

//     members.forEach((m) => {
//       m.skills?.forEach((skill) => {
//         const normalized = skill.trim();
//         if (!map.has(normalized)) {
//           map.set(normalized, []);
//         }
//         map.get(normalized)?.push(m);
//       });
//     });

//     const result: SkillCount[] = [];
//     map.forEach((memberList, skillName) => {
//       result.push({
//         name: skillName,
//         count: memberList.length,
//         members: memberList,
//       });
//     });

//     return result.sort((a, b) => b.count - a.count);
//   }, [members]);

//   return (
//     <div className="flex min-h-screen bg-slate-50">
//       <Sidebar />

//       <div className="flex-1 flex flex-col">
//         <Header />

//         <main className="p-8 max-w-7xl mx-auto w-full space-y-6">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900">
//               Skills Matrix (Ур Чадварын Атлас)
//             </h1>
//             <p className="text-sm text-slate-500">
//               Компанийн инженерүүдийн эзэмшсэн ур чадваруудын нэгдсэн тойм
//             </p>
//           </div>

//           {/* Метрикүүд */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
//               <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
//                 <Code2 className="w-6 h-6" />
//               </div>
//               <div>
//                 <p className="text-xs font-semibold text-slate-500">
//                   Нийт Ур Чадвар
//                 </p>
//                 <p className="text-xl font-bold text-slate-900">
//                   {skillCounts.length}
//                 </p>
//               </div>
//             </div>

//             <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
//               <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
//                 <Users className="w-6 h-6" />
//               </div>
//               <div>
//                 <p className="text-xs font-semibold text-slate-500">
//                   Бүртгэлтэй Инженерүүд
//                 </p>
//                 <p className="text-xl font-bold text-slate-900">
//                   {members.length}
//                 </p>
//               </div>
//             </div>

//             <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
//               <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
//                 <Award className="w-6 h-6" />
//               </div>
//               <div>
//                 <p className="text-xs font-semibold text-slate-500">
//                   Түгээмэл Скилл
//                 </p>
//                 <p className="text-xl font-bold text-slate-900">
//                   {skillCounts[0]?.name || "-"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
//             <h2 className="text-base font-bold text-slate-800">
//               Ур Чадварын Тархалт
//             </h2>

//             {loading ? (
//               <p className="text-sm text-slate-400 py-4">Уншиж байна...</p>
//             ) : skillCounts.length === 0 ? (
//               <p className="text-sm text-slate-400 py-4">
//                 Одоогоор бүртгэгдсэн ур чадвар байхгүй байна.
//               </p>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {skillCounts.map((item) => (
//                   <div
//                     key={item.name}
//                     className="p-4 border border-slate-200 rounded-xl hover:border-indigo-300 transition-all space-y-3"
//                   >
//                     <div className="flex items-center justify-between">
//                       <span className="font-semibold text-slate-900 text-sm">
//                         {item.name}
//                       </span>
//                       <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-full font-semibold border border-indigo-100">
//                         {item.count} инженер
//                       </span>
//                     </div>

//                     {/* Progress Bar */}
//                     <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
//                       <div
//                         className="bg-indigo-600 h-full rounded-full transition-all"
//                         style={{
//                           width: `${Math.min(
//                             (item.count / (members.length || 1)) * 100,
//                             100,
//                           )}%`,
//                         }}
//                       />
//                     </div>

//                     <div className="flex items-center gap-1.5 pt-1">
//                       {item.members.map((m) => (
//                         <img
//                           key={m.id}
//                           src={m.avatarUrl || "https://via.placeholder.com/150"}
//                           alt={m.name}
//                           title={m.name}
//                           className="w-6 h-6 rounded-full border border-white shadow-sm object-cover"
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { TeamMember } from "@/types/dashboard";
import { Code2, Users, Award } from "lucide-react";

interface SkillCount {
  name: string;
  count: number;
  members: TeamMember[];
}

export default function SkillsMatrixPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await fetch("/api/team");
        if (res.ok) {
          const json = await res.json();
          setMembers(json.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch skills data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMembers();
  }, []);

  // Ур чадварын давтамжийг тооцоолох
  const skillCounts: SkillCount[] = React.useMemo(() => {
    const map = new Map<string, TeamMember[]>();

    members.forEach((m) => {
      m.skills?.forEach((skill) => {
        const normalized = skill.trim();
        if (!map.has(normalized)) {
          map.set(normalized, []);
        }
        map.get(normalized)?.push(m);
      });
    });

    const result: SkillCount[] = [];
    map.forEach((memberList, skillName) => {
      result.push({
        name: skillName,
        count: memberList.length,
        members: memberList,
      });
    });

    return result.sort((a, b) => b.count - a.count);
  }, [members]);

  return (
    <div className="flex min-h-screen bg-slate-50/60 font-sans text-slate-800">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="p-8 max-w-7xl mx-auto w-full space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Skills Matrix (Ур Чадварын Атлас)
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Компанийн инженерүүдийн эзэмшсэн ур чадваруудын нэгдсэн тойм
            </p>
          </div>

          {/* Метрикүүд */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-cyan-50 text-cyan-600 rounded-xl">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  Нийт Ур Чадвар
                </p>
                <p className="text-xl font-bold text-slate-900 mt-0.5">
                  {skillCounts.length}
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  Бүртгэлтэй Инженерүүд
                </p>
                <p className="text-xl font-bold text-slate-900 mt-0.5">
                  {members.length}
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  Түгээмэл Скилл
                </p>
                <p className="text-xl font-bold text-slate-900 mt-0.5">
                  {skillCounts[0]?.name || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Ур чадварын жагсаалт */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-slate-800">
              Ур Чадварын Тархалт
            </h2>

            {loading ? (
              <div className="py-8 text-center text-sm text-slate-400">
                Уншиж байна...
              </div>
            ) : skillCounts.length === 0 ? (
              <div className="py-8 text-center text-sm text-slate-400">
                Одоогоор бүртгэгдсэн ур чадвар байхгүй байна.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skillCounts.map((item) => (
                  <div
                    key={item.name}
                    className="p-4 border border-slate-200/80 rounded-xl hover:border-cyan-300 transition-all bg-white hover:shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900 text-sm">
                        {item.name}
                      </span>
                      <span className="px-2.5 py-0.5 bg-cyan-50 text-cyan-700 text-xs rounded-full font-semibold border border-cyan-100/80">
                        {item.count} инженер
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-teal-500 h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            (item.count / (members.length || 1)) * 100,
                            100,
                          )}%`,
                        }}
                      />
                    </div>

                    <div className="flex items-center gap-1.5 pt-1 overflow-x-auto">
                      {item.members.map((m) => (
                        <img
                          key={m.id}
                          src={m.avatarUrl || "https://via.placeholder.com/150"}
                          alt={m.name}
                          title={m.name}
                          className="w-6 h-6 rounded-full border border-white shadow-sm object-cover shrink-0"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

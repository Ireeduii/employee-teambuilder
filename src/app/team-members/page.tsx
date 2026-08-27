// // "use client";

// // import React, { useEffect, useState } from "react";
// // import Link from "next/link";
// // import { Users, Mail, Building2, UserCheck, Shield } from "lucide-react";
// // import { Sidebar } from "@/components/main/Sidebar";
// // import { Header } from "@/components/main/Header";

// // interface Member {
// //   id: string;
// //   name: string;
// //   role: string;
// //   department?: string;
// //   email?: string;
// // }

// // export default function TeamMembersPage() {
// //   const [members, setMembers] = useState<Member[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     async function fetchTeamMembers() {
// //       try {
// //         // Миний/Үүссэн багийн гишүүдийг авах API
// //         const res = await fetch("/api/team/me");
// //         const data = await res.json();

// //         if (res.ok && data.data) {
// //           setMembers(
// //             Array.isArray(data.data) ? data.data : data.data.members || [],
// //           );
// //         } else {
// //           setError(data.error || "Багийн мэдээлэл олдсонгүй");
// //         }
// //       } catch (_err) {
// //         setError("Дата татахад алдаа гарлаа");
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchTeamMembers();
// //   }, []);

// //   return (
// //     <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
// //       <Sidebar />

// //       <div className="flex-1 flex flex-col overflow-hidden">
// //         <Header />

// //         {/* Үндсэн контент */}
// //         <main className="flex-1 overflow-y-auto p-6">
// //           <div className="max-w-6xl mx-auto space-y-6">
// //             {/* Гарчиг ба хэсэг */}
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
// //                   <Users className="w-6 h-6 text-cyan-500" />
// //                   Багийн гишүүд (Team Members)
// //                 </h1>
// //                 <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
// //                   Бүрдүүлсэн багийн гишүүдийн дэлгэрэнгүй жагсаалт болон үүрэг.
// //                 </p>
// //               </div>
// //             </div>

// //             {/* Нөхцөлт харагдац */}
// //             {loading ? (
// //               <div className="p-12 text-center text-slate-500">
// //                 Багийн гишүүдийн мэдээллийг ачаалж байна...
// //               </div>
// //             ) : error ? (
// //               <div className="p-8 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-2xl text-center max-w-md mx-auto">
// //                 <p className="text-rose-500 font-medium">{error}</p>
// //               </div>
// //             ) : members.length === 0 ? (
// //               <div className="p-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-center space-y-4">
// //                 <Users className="w-12 h-12 text-slate-400 mx-auto" />
// //                 <p className="text-slate-600 dark:text-slate-400 font-medium">
// //                   Одоогоор сонгогдсон багийн гишүүд байхгүй байна.
// //                 </p>
// //                 <Link
// //                   href="/team-builder"
// //                   className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition-all shadow-sm"
// //                 >
// //                   Team Builder руу очих
// //                 </Link>
// //               </div>
// //             ) : (
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //                 {members.map((member) => (
// //                   <Link
// //                     key={member.id}
// //                     href={`/profile/${member.id}`}
// //                     className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-cyan-500/50 hover:shadow-md transition-all space-y-4"
// //                   >
// //                     <div className="flex items-center gap-4">
// //                       <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold text-lg flex-shrink-0 group-hover:scale-105 transition-transform">
// //                         {member.name
// //                           ? member.name.charAt(0).toUpperCase()
// //                           : "U"}
// //                       </div>
// //                       <div className="overflow-hidden">
// //                         <h3 className="font-bold text-slate-900 dark:text-white truncate group-hover:text-cyan-500 transition-colors">
// //                           {member.name}
// //                         </h3>
// //                         <p className="text-xs font-medium text-cyan-600 dark:text-cyan-400 flex items-center gap-1 mt-0.5">
// //                           <Shield className="w-3 h-3" />
// //                           {member.role || "Гишүүн"}
// //                         </p>
// //                       </div>
// //                     </div>

// //                     <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
// //                       <div className="flex items-center gap-2">
// //                         <Building2 className="w-3.5 h-3.5 text-slate-400" />
// //                         <span>Хэлтэс: {member.department || "Байхгүй"}</span>
// //                       </div>
// //                       <div className="flex items-center gap-2">
// //                         <Mail className="w-3.5 h-3.5 text-slate-400" />
// //                         <span className="truncate">
// //                           {member.email || "Имэйлгүй"}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   </Link>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { Users, Mail, Building2, Shield } from "lucide-react";
// import { Sidebar } from "@/components/main/Sidebar";
// import { Header } from "@/components/main/Header";

// interface Member {
//   id: string;
//   name: string;
//   role: string;
//   department?: string;
//   email?: string;
// }

// interface Team {
//   id: string;
//   name?: string; // Багийн нэр (DB schema дээр name эсвэл teamName байж магадгүй)
//   teamName?: string;
//   members: Member[];
// }

// export default function TeamMembersPage() {
//   const [team, setTeam] = useState<Team | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function fetchTeamMembers() {
//       try {
//         const res = await fetch("/api/team/me");
//         const data = await res.json();

//         if (res.ok) {
//           setTeam(data.data); // Team объектоо бүтнээр нь хадгална
//         } else {
//           setError(data.error || "Багийн мэдээлэл олдсонгүй");
//         }
//       } catch (_err) {
//         setError("Дата татахад алдаа гарлаа");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchTeamMembers();
//   }, []);

//   const members = team?.members || [];
//   const displayName = team?.name || team?.teamName || "Миний баг";

//   return (
//     <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
//       <Sidebar />

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header />

//         {/* Үндсэн контент */}
//         <main className="flex-1 overflow-y-auto p-6">
//           <div className="max-w-6xl mx-auto space-y-6">
//             {/* Гарчиг ба багийн нэр */}
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
//                   <Users className="w-6 h-6 text-cyan-500" />
//                   {team
//                     ? `Баг: ${displayName}`
//                     : "Багийн гишүүд (Team Members)"}
//                 </h1>
//                 <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
//                   Бүрдүүлсэн багийн гишүүдийн дэлгэрэнгүй жагсаалт болон үүрэг.
//                 </p>
//               </div>
//             </div>

//             {/* Нөхцөлт харагдац */}
//             {loading ? (
//               <div className="p-12 text-center text-slate-500">
//                 Багийн гишүүдийн мэдээллийг ачаалж байна...
//               </div>
//             ) : error ? (
//               <div className="p-8 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-2xl text-center max-w-md mx-auto">
//                 <p className="text-rose-500 font-medium">{error}</p>
//               </div>
//             ) : members.length === 0 ? (
//               <div className="p-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-center space-y-4">
//                 <Users className="w-12 h-12 text-slate-400 mx-auto" />
//                 <p className="text-slate-600 dark:text-slate-400 font-medium">
//                   Одоогоор сонгогдсон багийн гишүүд байхгүй байна.
//                 </p>
//                 <Link
//                   href="/team-builder"
//                   className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition-all shadow-sm"
//                 >
//                   Team Builder руу очих
//                 </Link>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {members.map((member) => (
//                   <Link
//                     key={member.id}
//                     href={`/profile/${member.id}`}
//                     className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-cyan-500/50 hover:shadow-md transition-all space-y-4"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold text-lg flex-shrink-0 group-hover:scale-105 transition-transform">
//                         {member.name
//                           ? member.name.charAt(0).toUpperCase()
//                           : "U"}
//                       </div>
//                       <div className="overflow-hidden">
//                         <h3 className="font-bold text-slate-900 dark:text-white truncate group-hover:text-cyan-500 transition-colors">
//                           {member.name}
//                         </h3>
//                         <p className="text-xs font-medium text-cyan-600 dark:text-cyan-400 flex items-center gap-1 mt-0.5">
//                           <Shield className="w-3 h-3" />
//                           {member.role || "Гишүүн"}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
//                       <div className="flex items-center gap-2">
//                         <Building2 className="w-3.5 h-3.5 text-slate-400" />
//                         <span>Хэлтэс: {member.department || "Байхгүй"}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Mail className="w-3.5 h-3.5 text-slate-400" />
//                         <span className="truncate">
//                           {member.email || "Имэйлгүй"}
//                         </span>
//                       </div>
//                     </div>
//                   </Link>
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
import Link from "next/link";
import {
  Users,
  Mail,
  Building2,
  Shield,
  Trash2,
  PlusCircle,
} from "lucide-react";
import { Sidebar } from "@/components/main/Sidebar";
import { Header } from "@/components/main/Header";

interface Member {
  id: string;
  name: string;
  role: string;
  department?: string;
  email?: string;
}

interface Team {
  id: string;
  name?: string;
  teamName?: string;
  members: Member[];
}

export default function TeamMembersPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTeams = async () => {
    try {
      const res = await fetch("/api/team/me");
      const data = await res.json();

      if (res.ok) {
        setTeams(Array.isArray(data.data) ? data.data : []);
      } else {
        setError(data.error || "Багийн мэдээлэл олдсонгүй");
      }
    } catch (_err) {
      setError("Дата татахад алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // Багийг бүхлээр нь устгах функц
  const handleDeleteTeam = async (teamId: string) => {
    if (!confirm("Та энэ багийг устгахдаа итгэлтэй байна уу?")) return;

    try {
      const res = await fetch(`/api/team/${teamId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Устгасны дараа State-ээ шинэчлэх
        setTeams((prev) => prev.filter((t) => t.id !== teamId));
      } else {
        alert("Багийг устгахад алдаа гарлаа");
      }
    } catch (_err) {
      alert("Серверийн алдаа гарлаа");
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        {/* Үндсэн контент */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Гарчиг */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Users className="w-6 h-6 text-cyan-500" />
                  Миний үүсгэсэн багууд (Teams Stack)
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Таны үүсгэсэн бүх багууд болон гишүүдийн жагсаалт.
                </p>
              </div>
              <Link
                href="/team-builder"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition-all shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                Шинэ баг үүсгэх
              </Link>
            </div>

            {loading ? (
              <div className="p-12 text-center text-slate-500">
                Багуудын мэдээллийг ачаалж байна...
              </div>
            ) : error ? (
              <div className="p-8 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-2xl text-center max-w-md mx-auto">
                <p className="text-rose-500 font-medium">{error}</p>
              </div>
            ) : teams.length === 0 ? (
              <div className="p-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-center space-y-4">
                <Users className="w-12 h-12 text-slate-400 mx-auto" />
                <p className="text-slate-600 dark:text-slate-400 font-medium">
                  Одоогоор ямар нэгэн баг үүсгээгүй байна.
                </p>
                <Link
                  href="/team-builder"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition-all shadow-sm"
                >
                  Team Builder руу очих
                </Link>
              </div>
            ) : (
              /* Багуудын Stack жагсаалт (Хамгийн сүүлд үүсгэсэн нь дээрээ гарна) */
              <div className="space-y-8">
                {teams.map((team, index) => {
                  const teamName =
                    team.name || team.teamName || `Баг #${index + 1}`;
                  return (
                    <div
                      key={team.id}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4"
                    >
                      {/* Багийн толгой хэсэг (Нэр болон устгах товч) */}
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-cyan-500"></span>
                            {teamName}
                          </h2>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Нийт гишүүн: {team.members.length}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {/* Гишүүн нэмэх хуудас руу үсрэх боломжтой */}
                          <Link
                            href={`/team-builder?edit=${team.id}`}
                            className="px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors"
                          >
                            Гишүүн нэмэх/хасах
                          </Link>
                          {/* Багийг бүтнээр нь устгах */}
                          <button
                            onClick={() => handleDeleteTeam(team.id)}
                            className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                            title="Багийг устгах"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Тухайн багийн гишүүдийн grid */}
                      {team.members.length === 0 ? (
                        <p className="text-sm text-slate-400 py-4 text-center">
                          Энэ багт гишүүн байхгүй байна.
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {team.members.map((member) => (
                            <div
                              key={member.id}
                              className="group bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold text-base flex-shrink-0">
                                  {member.name
                                    ? member.name.charAt(0).toUpperCase()
                                    : "U"}
                                </div>
                                <div className="overflow-hidden">
                                  <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                                    {member.name}
                                  </h3>
                                  <p className="text-xs font-medium text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                                    <Shield className="w-3 h-3" />
                                    {member.role || "Гишүүн"}
                                  </p>
                                </div>
                              </div>

                              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-2">
                                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                                  <span>
                                    {member.department || "Хэлтэсгүй"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                                  <span className="truncate">
                                    {member.email || "Имэйлгүй"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

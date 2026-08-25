// "use client";

// import React, { use, useEffect, useState } from "react";
// import Link from "next/link";
// import { ArrowLeft, Mail, Building2, User } from "lucide-react";
// import { Sidebar } from "@/components/Sidebar";
// import { Header } from "@/components/Header";

// export default function ProfilePage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const resolvedParams = use(params);
//   const id = resolvedParams.id;

//   const [member, setMember] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function fetchMember() {
//       try {
//         const res = await fetch(`/api/team/${id}`);
//         const data = await res.json();

//         if (res.ok && data.data) {
//           setMember(data.data);
//         } else {
//           setError(data.error || "Ажилтны мэдээлэл олдсонгүй");
//         }
//       } catch (_err) {
//         setError("Дата татахад алдаа гарлаа");
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (id) fetchMember();
//   }, [id]);

//   return (
//     <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
//       <Sidebar />

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header />

//         {/* Үндсэн контент */}
//         <main className="flex-1 overflow-y-auto p-6">
//           {loading ? (
//             <div className="p-8 text-center text-slate-500">
//               Ажилтны мэдээллийг ачаалж байна...
//             </div>
//           ) : error || !member ? (
//             <div className="p-8 space-y-4 max-w-md mx-auto text-center">
//               <p className="text-rose-500 font-medium">
//                 {error || "Ажилтан олдсонгүй"}
//               </p>
//               <Link
//                 href="/"
//                 className="inline-flex items-center gap-2 text-sm text-cyan-600 hover:underline"
//               >
//                 <ArrowLeft className="w-4 h-4" /> Нүүр хуудас руу буцах
//               </Link>
//             </div>
//           ) : (
//             <div className="max-w-3xl mx-auto space-y-6">
//               <Link
//                 href="/"
//                 className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
//               >
//                 <ArrowLeft className="w-4 h-4" /> Буцах
//               </Link>

//               <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex items-start gap-6">
//                 <div className="w-20 h-20 rounded-full bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center text-cyan-600 dark:text-cyan-400 text-2xl font-bold flex-shrink-0">
//                   {member.name ? member.name.charAt(0).toUpperCase() : <User />}
//                 </div>

//                 <div className="space-y-3 flex-1">
//                   <div>
//                     <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
//                       {member.name}
//                     </h1>
//                     <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
//                       {member.role}
//                     </p>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
//                     <div className="flex items-center gap-2">
//                       <Building2 className="w-4 h-4 text-slate-400" />
//                       <span>
//                         Хэлтэс: <b>{member.department || "Байхгүй"}</b>
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Mail className="w-4 h-4 text-slate-400" />
//                       <span>
//                         Имэйл: <b>{member.email || "Имэйлгүй"}</b>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Building2, User } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

// Member-ийн тип зааж өгөх интерфейс
interface Member {
  id: string;
  name: string;
  role: string;
  department?: string;
  email?: string;
}

export default function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  // any-ийн оронд Member | null ашиглав
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMember() {
      try {
        const res = await fetch(`/api/team/${id}`);
        const data = await res.json();

        if (res.ok && data.data) {
          setMember(data.data);
        } else {
          setError(data.error || "Ажилтны мэдээлэл олдсонгүй");
        }
      } catch (_err) {
        // err ашиглагдахгүй байгаа тул өмнө нь underline '_' тавьж засав
        setError("Дата татахад алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchMember();
  }, [id]);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        {/* Үндсэн контент */}
        <main className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="p-8 text-center text-slate-500">
              Ажилтны мэдээллийг ачаалж байна...
            </div>
          ) : error || !member ? (
            <div className="p-8 space-y-4 max-w-md mx-auto text-center">
              <p className="text-rose-500 font-medium">
                {error || "Ажилтан олдсонгүй"}
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-cyan-600 hover:underline"
              >
                <ArrowLeft className="w-4 h-4" /> Нүүр хуудас руу буцах
              </Link>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Буцах
              </Link>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center text-cyan-600 dark:text-cyan-400 text-2xl font-bold flex-shrink-0">
                  {member.name ? member.name.charAt(0).toUpperCase() : <User />}
                </div>

                <div className="space-y-3 flex-1">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {member.name}
                    </h1>
                    <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
                      {member.role}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      <span>
                        Хэлтэс: <b>{member.department || "Байхгүй"}</b>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span>
                        Имэйл: <b>{member.email || "Имэйлгүй"}</b>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

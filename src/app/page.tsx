// // // "use client";

// // // import React from "react";
// // // import { Sidebar } from "../components/Sidebar";
// // // import { Header } from "../components/Header";
// // // import { StatCard } from "../components/StatCard";
// // // import { TeamTable } from "../components/TeamTable";
// // // import { mockMetrics, mockTeamMembers } from "../mock/mockData";
// // // import { StatMetric } from "../types/dashboard";

// // // export default function Home() {
// // //   return (
// // //     <div className="flex min-h-screen bg-slate-50">
// // //       {/* Хажуугийн цэс */}
// // //       <Sidebar />

// // //       {/* Үндсэн контент хэсэг */}
// // //       <div className="flex-1 flex flex-col">
// // //         <Header />

// // //         <main className="p-8 space-y-8">
// // //           <div>
// // //             <h1 className="text-2xl font-bold text-slate-900">
// // //               Тавтай морил, Админ 👋
// // //             </h1>
// // //             <p className="text-sm text-slate-500">
// // //               Системийн өнөөдрийн тойм ба статистик
// // //             </p>
// // //           </div>

// // //           {/* Статистик картууд - Metric болон index-д тип зааж өгсөн */}
// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
// // //             {mockMetrics.map((metric: StatMetric, index: number) => (
// // //               <StatCard key={index} metric={metric} />
// // //             ))}
// // //           </div>

// // //           {/* Багийн хүснэгт */}
// // //           <TeamTable members={mockTeamMembers} />
// // //         </main>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import React, { useEffect, useState } from "react";
// // import { Sidebar } from "../components/Sidebar";
// // import { Header } from "../components/Header";
// // import { StatCard } from "../components/StatCard";
// // import { TeamTable } from "../components/TeamTable";
// // import { StatMetric, TeamMember } from "../types/dashboard";

// // export default function Home() {
// //   const [metrics, setMetrics] = useState<StatMetric[]>([]);
// //   const [members, setMembers] = useState<TeamMember[]>([]);

// //   // Backend API-уудаас дата fetch хийж авах
// //   useEffect(() => {
// //     async function fetchData() {
// //       try {
// //         // Статистик API дуудах (200 OK)
// //         const metricsRes = await fetch("/api/metrics");
// //         const metricsJson = await metricsRes.json();
// //         setMetrics(metricsJson.data);

// //         // Багийн гишүүд API дуудах (200 OK)
// //         const teamRes = await fetch("/api/team");
// //         const teamJson = await teamRes.json();
// //         setMembers(teamJson.data);
// //       } catch (error) {
// //         console.error("Data fetch error:", error);
// //       }
// //     }

// //     fetchData();
// //   }, []);

// //   return (
// //     <div className="flex min-h-screen bg-slate-50">
// //       <Sidebar />

// //       <div className="flex-1 flex flex-col">
// //         <Header />

// //         <main className="p-8 space-y-8">
// //           <div>
// //             <h1 className="text-2xl font-bold text-slate-900">
// //               Тавтай морил, Админ 👋
// //             </h1>
// //             <p className="text-sm text-slate-500">
// //               Системийн өнөөдрийн тойм ба статистик
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
// //             {metrics.map((metric: StatMetric, index: number) => (
// //               <StatCard key={index} metric={metric} />
// //             ))}
// //           </div>

// //           <TeamTable members={members} />
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useEffect, useState } from "react";
// import { Sidebar } from "../components/Sidebar";
// import { Header } from "../components/Header";
// import { StatCard } from "../components/StatCard";
// import { TeamTable } from "../components/TeamTable";
// import { StatMetric, TeamMember } from "../types/dashboard";
// import { mockMetrics, mockTeamMembers } from "../mock/mockData";

// export default function Home() {
//   const [metrics, setMetrics] = useState<StatMetric[]>([]);
//   const [members, setMembers] = useState<TeamMember[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         // 1. Metrics API дуудах
//         const metricsRes = await fetch("/api/metrics");
//         const contentType1 = metricsRes.headers.get("content-type");

//         // Хариу заавал JSON байвал л json() хийнэ (HTML байвал mock харуулна)
//         if (metricsRes.ok && contentType1?.includes("application/json")) {
//           const metricsJson = await metricsRes.json();
//           setMetrics(metricsJson.data || mockMetrics);
//         } else {
//           setMetrics(mockMetrics);
//         }

//         // 2. Team API дуудах
//         const teamRes = await fetch("/api/team");
//         const contentType2 = teamRes.headers.get("content-type");

//         if (teamRes.ok && contentType2?.includes("application/json")) {
//           const teamJson = await teamRes.json();
//           setMembers(teamJson.data || mockTeamMembers);
//         } else {
//           setMembers(mockTeamMembers);
//         }
//       } catch (error) {
//         console.error("Data fetch error:", error);
//         setMetrics(mockMetrics);
//         setMembers(mockTeamMembers);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-slate-50">
//       <Sidebar />

//       <div className="flex-1 flex flex-col">
//         <Header />

//         <main className="p-8 space-y-8">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900">
//               Тавтай морил, Админ 👋
//             </h1>
//             <p className="text-sm text-slate-500">
//               Системийн өнөөдрийн тойм ба статистик
//             </p>
//           </div>

//           {loading ? (
//             <div className="py-12 text-center text-slate-500 font-medium">
//               Мэдээллийг ачаалж байна...
//             </div>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {metrics.map((metric: StatMetric, index: number) => (
//                   <StatCard key={index} metric={metric} />
//                 ))}
//               </div>

//               <TeamTable members={members} />
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// src/app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { StatCard } from "../components/StatCard";
import { TeamTable } from "../components/TeamTable";
import { AddMemberModal } from "../components/AddMemberModal"; // Шинэ компонент
import { StatMetric, TeamMember } from "../types/dashboard";

export default function Home() {
  const [metrics, setMetrics] = useState<StatMetric[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal нээлттэй эсэх

  // Дата татаж авах функц
  const fetchData = async () => {
    try {
      const [metricsRes, teamRes] = await Promise.all([
        fetch("/api/metrics"),
        fetch("/api/team"),
      ]);

      if (metricsRes.ok) {
        const metricsJson = await metricsRes.json();
        setMetrics(metricsJson.data || []);
      }

      if (teamRes.ok) {
        const teamJson = await teamRes.json();
        setMembers(teamJson.data || []);
      }
    } catch (error) {
      console.error("Data fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-8 space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Тавтай морил, Админ 👋
              </h1>
              <p className="text-sm text-slate-500">
                Системийн өнөөдрийн тойм ба статистик
              </p>
            </div>

            {/* Шинэ гишүүн нэмэх товчлуур */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
            >
              + Шинэ гишүүн нэмэх
            </button>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-500 font-medium">
              Мэдээллийг ачаалж байна...
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric: StatMetric, index: number) => (
                  <StatCard key={index} metric={metric} />
                ))}
              </div>

              <TeamTable members={members} />
            </>
          )}
        </main>
      </div>

      {/* Шинэ гишүүн нэмэх Модал */}
      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchData} // Амжилттай болохоор датаг дахин татаж авна
      />
    </div>
  );
}

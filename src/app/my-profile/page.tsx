// "use client";

// import React, { useState, useEffect } from "react";
// import { Sidebar } from "@/components/Sidebar";
// import { Header } from "@/components/Header";

// import {
//   User,
//   Save,
//   Building2,
//   Mail,
//   Phone,
//   Briefcase,
//   Sparkles,
// } from "lucide-react";

// export default function MyProfilePage() {
//   const currentUserId = "66f1234567890abcdef12345";

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState("");

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     role: "",
//     department: "",
//     phone: "",
//     skills: "",
//     bio: "",
//   });

//   useEffect(() => {
//     async function fetchMyData() {
//       try {
//         const res = await fetch(`/api/team/${currentUserId}`);
//         const data = await res.json();
//         if (res.ok && data.data) {
//           setFormData({
//             name: data.data.name || "",
//             email: data.data.email || "",
//             role: data.data.role || "",
//             department: data.data.department || "",
//             phone: data.data.phone || "",
//             skills: Array.isArray(data.data.skills)
//               ? data.data.skills.join(", ")
//               : data.data.skills || "",
//             bio: data.data.bio || "",
//           });
//         }
//       } catch (err) {
//         console.error("Дата татахад алдаа гарлаа:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchMyData();
//   }, [currentUserId]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSaving(true);
//     setMessage("");

//     try {
//       const res = await fetch(`/api/team/${currentUserId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,

//           skills: formData.skills
//             .split(",")
//             .map((s) => s.trim())
//             .filter(Boolean),
//         }),
//       });

//       if (res.ok) {
//         setMessage("Мэдээлэл амжилттай хадгалагдлаа!");
//       } else {
//         setMessage("Хадгалахад алдаа гарлаа.");
//       }
//     } catch (err) {
//       setMessage("Сервертэй холбогдоход алдаа гарлаа.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
//         <Sidebar />
//         <div className="flex-1 flex flex-col overflow-hidden">
//           <Header />
//           <main className="flex-1 p-8 text-center text-slate-500">
//             Мэдээллийг ачаалж байна...
//           </main>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header />

//         <main className="flex-1 overflow-y-auto p-6 md:p-8">
//           <div className="max-w-3xl mx-auto space-y-6">
//             <div>
//               <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
//                 Миний Профайл Засах
//               </h1>
//               <p className="text-sm text-slate-500 dark:text-slate-400">
//                 Админы үүсгэсэн үндсэн мэдээлэл дээр нэмэлт мэдээллээ оруулж
//                 хадгална уу.
//               </p>
//             </div>

//             {message && (
//               <div
//                 className={`p-4 rounded-xl text-sm font-medium ${
//                   message.includes("амжилттай")
//                     ? "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300"
//                     : "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
//                 }`}
//               >
//                 {message}
//               </div>
//             )}

//             <form
//               onSubmit={handleSubmit}
//               className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6"
//             >
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
//                 <div>
//                   <label className="text-xs font-semibold text-slate-400 uppercase">
//                     Нэр (Админаас тохируулсан)
//                   </label>
//                   <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mt-1">
//                     {formData.name || "Хоосон"}
//                   </p>
//                 </div>
//                 <div>
//                   <label className="text-xs font-semibold text-slate-400 uppercase">
//                     Имэйл
//                   </label>
//                   <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mt-1">
//                     {formData.email || "Хоосон"}
//                   </p>
//                 </div>
//                 <div>
//                   <label className="text-xs font-semibold text-slate-400 uppercase">
//                     Албан тушаал
//                   </label>
//                   <p className="text-sm font-bold text-cyan-600 dark:text-cyan-400 mt-1">
//                     {formData.role || "Хоосон"}
//                   </p>
//                 </div>
//               </div>

//               {/* ajiltnii ooro tohiruulah heseg */}
//               <div className="space-y-4">
//                 <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2">
//                   Нэмэлт мэдээлэл оруулах
//                 </h3>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {/* Хэлтэс */}
//                   <div className="space-y-1.5">
//                     <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
//                       <Building2 className="w-3.5 h-3.5" /> Хэлтэс / Алба
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="ж: Инженерчлэлийн баг"
//                       value={formData.department}
//                       onChange={(e) =>
//                         setFormData({ ...formData, department: e.target.value })
//                       }
//                       className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-slate-800 dark:text-slate-200"
//                     />
//                   </div>

//                   <div className="space-y-1.5">
//                     <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
//                       <Phone className="w-3.5 h-3.5" /> Утасны дугаар
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="ж: 99112233"
//                       value={formData.phone}
//                       onChange={(e) =>
//                         setFormData({ ...formData, phone: e.target.value })
//                       }
//                       className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-slate-800 dark:text-slate-200"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-1.5">
//                   <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
//                     <Sparkles className="w-3.5 h-3.5 text-cyan-500" /> Ур
//                     чадварууд (Таслалаар зааглах)
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="React, Next.js, TypeScript, Tailwind"
//                     value={formData.skills}
//                     onChange={(e) =>
//                       setFormData({ ...formData, skills: e.target.value })
//                     }
//                     className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-slate-800 dark:text-slate-200"
//                   />
//                 </div>

//                 <div className="space-y-1.5">
//                   <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
//                     Өөрийн тухай товч
//                   </label>
//                   <textarea
//                     rows={3}
//                     placeholder="Өөрийн хийж байсан туршлага болон ажилладаг чиглэлээ товч бичнэ үү..."
//                     value={formData.bio}
//                     onChange={(e) =>
//                       setFormData({ ...formData, bio: e.target.value })
//                     }
//                     className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-slate-800 dark:text-slate-200"
//                   />
//                 </div>
//               </div>

//               <div className="flex justify-end pt-2">
//                 <button
//                   type="submit"
//                   disabled={saving}
//                   className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-sm rounded-xl transition-all shadow-sm disabled:opacity-50"
//                 >
//                   <Save className="w-4 h-4" />
//                   {saving ? "Хадгалж байна..." : "Өөрчлөлтийг хадгалах"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export default function MyProfilePage() {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dbId, setDbId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    phone: "",
    skills: "",
    bio: "",
  });

  useEffect(() => {
    async function fetchMyProfileData() {
      // Clerk-ээс нэвтэрсэн хэрэглэгчийн үндсэн имэйлийг авна
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      if (!userEmail) return;

      try {
        // Имэйлээр нь админы бэлдсэн датаг татна
        const res = await fetch(`/api/team/me?email=${userEmail}`);
        const result = await res.json();

        if (res.ok && result.data) {
          setDbId(result.data.id); // Бааз дээрх одоогийн ID-г нь хадгалж авна
          setFormData({
            name: result.data.name || "",
            email: result.data.email || "",
            role: result.data.role || "",
            department: result.data.department || "",
            phone: result.data.phone || "",
            skills: Array.isArray(result.data.skills)
              ? result.data.skills.join(", ")
              : "",
            bio: result.data.bio || "",
          });
        }
      } catch (err) {
        console.error("Дата татахад алдаа гарлаа:", err);
      } finally {
        setLoading(false);
      }
    }

    if (isLoaded && user) {
      fetchMyProfileData();
    }
  }, [user, isLoaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dbId) return;

    setSaving(true);
    try {
      // Энд бааз дээрх ID-гаар нь PUT/PATCH хүсэлт явуулж хадгална
      await fetch(`/api/team/${dbId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          skills: formData.skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        }),
      });
      alert("Мэдээлэл амжилттай хадгалагдлаа!");
    } catch (err) {
      alert("Алдаа гарлаа.");
    } finally {
      setSaving(false);
    }
  };

  if (!isLoaded || loading) {
    return <div className="p-8 text-center">Ачаалж байна...</div>;
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="p-8 overflow-y-auto">
          {/* Энд хуучин бичсэн form-оо ашиглана */}
          <form onSubmit={handleSubmit}>
            <div>
              <p>Нэр: {formData.name}</p>
              <p>Имэйл: {formData.email}</p>
              <p>Албан тушаал: {formData.role}</p>
            </div>
            {/* Нэмэлт засах input-үүд... */}
            <button type="submit" disabled={saving}>
              Хадгалах
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}

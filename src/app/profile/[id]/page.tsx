// "use client";

// import React, { useEffect, useState } from "react";
// import { Sidebar } from "@/components/Sidebar";
// import { Header } from "@/components/Header";

// interface ProfileData {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   department: string;
//   bio: string;
//   skills: string[];
//   avatarUrl: string;
// }

// export default function ProfilePage({ params }: { params: { id: string } }) {
//   const [profile, setProfile] = useState<ProfileData>({
//     id: "",
//     name: "",
//     email: "",
//     role: "",
//     department: "",
//     bio: "",
//     skills: [],
//     avatarUrl: "",
//   });

//   const [newSkill, setNewSkill] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   // Мэдээлэл татаж авах
//   useEffect(() => {
//     async function fetchProfile() {
//       try {
//         const res = await fetch(`/api/team/${params.id}`);
//         if (res.ok) {
//           const json = await res.json();
//           setProfile(json.data);
//         }
//       } catch (err) {
//         console.error("Failed to load profile", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (params.id) {
//       fetchProfile();
//     }
//   }, [params.id]);

//   // Скилл нэмэх
//   const handleAddSkill = () => {
//     if (!newSkill.trim()) return;
//     if (profile.skills.includes(newSkill.trim())) return;

//     setProfile({
//       ...profile,
//       skills: [...profile.skills, newSkill.trim()],
//     });
//     setNewSkill("");
//   };

//   // Скилл хасах
//   const handleRemoveSkill = (skillToRemove: string) => {
//     setProfile({
//       ...profile,
//       skills: profile.skills.filter((s) => s !== skillToRemove),
//     });
//   };

//   // Өөрчлөлтийг бааз руу хадгалах
//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSaving(true);

//     try {
//       const res = await fetch(`/api/team/${params.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(profile),
//       });

//       if (res.ok) {
//         alert("Профайл амжилттай шинэчлэгдлээ!");
//       } else {
//         alert("Хадгалахад алдаа гарлаа.");
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return <div className="p-8 text-center text-slate-500">Уншиж байна...</div>;
//   }

//   return (
//     <div className="flex min-h-screen bg-slate-50">
//       <Sidebar />

//       <div className="flex-1 flex flex-col">
//         <Header />

//         <main className="p-8 max-w-4xl space-y-6">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900">Миний Профайл</h1>
//             <p className="text-sm text-slate-500">
//               Хувийн мэдээлэл болон ур чадвараа удирдах
//             </p>
//           </div>

//           <form
//             onSubmit={handleSave}
//             className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6"
//           >
//             {/* Нүүр зураг болон Ерөнхий мэдээлэл */}
//             <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
//               <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xl overflow-hidden">
//                 {profile.avatarUrl ? (
//                   <img
//                     src={profile.avatarUrl}
//                     alt={profile.name}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   profile.name?.[0] || "U"
//                 )}
//               </div>
//               <div>
//                 <h2 className="text-lg font-semibold text-slate-900">
//                   {profile.name}
//                 </h2>
//                 <p className="text-sm text-slate-500">{profile.email}</p>
//               </div>
//             </div>

//             {/* Талбарууд */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700">
//                   Нэр
//                 </label>
//                 <input
//                   type="text"
//                   value={profile.name || ""}
//                   onChange={(e) =>
//                     setProfile({ ...profile, name: e.target.value })
//                   }
//                   className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700">
//                   Албан тушаал
//                 </label>
//                 <input
//                   type="text"
//                   value={profile.role || ""}
//                   onChange={(e) =>
//                     setProfile({ ...profile, role: e.target.value })
//                   }
//                   className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700">
//                   Хэлтэс
//                 </label>
//                 <input
//                   type="text"
//                   value={profile.department || ""}
//                   onChange={(e) =>
//                     setProfile({ ...profile, department: e.target.value })
//                   }
//                   className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700">
//                   Avatar URL
//                 </label>
//                 <input
//                   type="text"
//                   value={profile.avatarUrl || ""}
//                   onChange={(e) =>
//                     setProfile({ ...profile, avatarUrl: e.target.value })
//                   }
//                   className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="https://..."
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-slate-700">
//                 Товч танилцуулга (Bio)
//               </label>
//               <textarea
//                 rows={3}
//                 value={profile.bio || ""}
//                 onChange={(e) =>
//                   setProfile({ ...profile, bio: e.target.value })
//                 }
//                 className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Өөрийн тухай товч бичнэ үү..."
//               />
//             </div>

//             {/* Скилл Мап хэсэг */}
//             <div className="space-y-3 pt-4 border-t border-slate-100">
//               <label className="block text-sm font-medium text-slate-700">
//                 Ур чадварууд (Skills)
//               </label>

//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   value={newSkill}
//                   onChange={(e) => setNewSkill(e.target.value)}
//                   placeholder="ж нь: Next.js, React, TypeScript"
//                   className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleAddSkill}
//                   className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900"
//                 >
//                   Нэмэх
//                 </button>
//               </div>

//               <div className="flex flex-wrap gap-2 pt-2">
//                 {profile.skills?.map((skill, index) => (
//                   <span
//                     key={index}
//                     className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100"
//                   >
//                     {skill}
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveSkill(skill)}
//                       className="hover:text-red-500 font-bold text-sm"
//                     >
//                       ×
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Хадгалах товч */}
//             <div className="flex justify-end pt-4">
//               <button
//                 type="submit"
//                 disabled={saving}
//                 className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm disabled:opacity-50 transition-colors"
//               >
//                 {saving ? "Хадгалж байна..." : "Өөрчлөлтийг хадгалах"}
//               </button>
//             </div>
//           </form>
//         </main>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState, use } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

interface ProfileData {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  bio: string;
  skills: string[];
  avatarUrl: string;
}

export default function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const memberId = resolvedParams.id;

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`/api/team/${memberId}`);
        if (res.ok) {
          const json = await res.json();
          setProfile(json.data);
        }
      } catch (error) {
        console.error("Profile fetch failed:", error);
      } finally {
        setLoading(false);
      }
    }

    if (memberId) {
      fetchProfile();
    }
  }, [memberId]);

  const handleAddSkill = () => {
    if (!newSkill.trim() || !profile) return;
    if (profile.skills?.includes(newSkill.trim())) return;

    setProfile({
      ...profile,
      skills: [...(profile.skills || []), newSkill.trim()],
    });
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    if (!profile) return;
    setProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skillToRemove),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);

    try {
      const res = await fetch(`/api/team/${memberId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (res.ok) {
        alert("Профайлын мэдээлэл амжилттай хадгалагдлаа!");
      } else {
        alert("Хадгалахад алдаа гарлаа.");
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-50 justify-center items-center text-slate-500 font-medium">
        Ажилтны мэдээллийг ачаалж байна...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen bg-slate-50 justify-center items-center text-rose-500 font-medium">
        Ажилтан олдсонгүй!
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-8 max-w-4xl space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Ажилтны Профайл
            </h1>
            <p className="text-sm text-slate-500">
              Хувийн мэдээлэл болон Skill Map тохируулах
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6"
          >
            <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
              <img
                src={profile.avatarUrl || "https://via.placeholder.com/150"}
                alt={profile.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-indigo-100"
              />
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {profile.name}
                </h2>
                <p className="text-sm text-slate-500">{profile.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Нэр
                </label>
                <input
                  type="text"
                  value={profile.name || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Албан тушаал
                </label>
                <input
                  type="text"
                  value={profile.role || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, role: e.target.value })
                  }
                  className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Хэлтэс (Department)
                </label>
                <input
                  type="text"
                  value={profile.department || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, department: e.target.value })
                  }
                  className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  placeholder="Engineering, Design гэх мэт"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Аватар Зургийн URL
                </label>
                <input
                  type="text"
                  value={profile.avatarUrl || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, avatarUrl: e.target.value })
                  }
                  className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Товч танилцуулга (Bio)
              </label>
              <textarea
                rows={3}
                value={profile.bio || ""}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
                className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="Миний тухай..."
              />
            </div>

            {/* Skill Map Хэсэг */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="block text-sm font-semibold text-slate-800">
                Ур чадварууд (Skills)
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="ж нь: React, Node.js, TypeScript"
                  className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                  Нэмэх
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {profile.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-100"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-rose-600 font-bold text-sm"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm disabled:opacity-50 transition-colors"
              >
                {saving ? "Хадгалж байна..." : "Өөрчлөлтийг хадгалах"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

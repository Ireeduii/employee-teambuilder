// // "use client";

// // import React, { useState } from "react";

// // interface AddMemberModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onSuccess: () => void;
// // }

// // export function AddMemberModal({
// //   isOpen,
// //   onClose,
// //   onSuccess,
// // }: AddMemberModalProps) {
// //   const [name, setName] = useState("");
// //   const [role, setRole] = useState("");
// //   const [department, setDepartment] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   if (!isOpen) return null;

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       const res = await fetch("/api/team", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ name, role, department }),
// //       });

// //       if (res.ok) {
// //         setName("");
// //         setRole("");
// //         setDepartment("");
// //         onSuccess();
// //         onClose();
// //       } else {
// //         alert("Нэмэхэд алдаа гарлаа!");
// //       }
// //     } catch (err) {
// //       console.error("Error creating member:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
// //       <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
// //         <h2 className="text-xl font-bold text-slate-900">Шинэ гишүүн нэмэх</h2>

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium text-slate-700">
// //               Нэр
// //             </label>
// //             <input
// //               type="text"
// //               required
// //               value={name}
// //               onChange={(e) => setName(e.target.value)}
// //               className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
// //               placeholder="Баатар"
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-slate-700">
// //               Албан тушаал
// //             </label>
// //             <input
// //               type="text"
// //               required
// //               value={role}
// //               onChange={(e) => setRole(e.target.value)}
// //               className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
// //               placeholder="Software Engineer"
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-slate-700">
// //               Хэлтэс
// //             </label>
// //             <input
// //               type="text"
// //               required
// //               value={department}
// //               onChange={(e) => setDepartment(e.target.value)}
// //               className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
// //               placeholder="Engineering"
// //             />
// //           </div>

// //           <div className="flex justify-end gap-2 pt-2">
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg"
// //             >
// //               Цуцлах
// //             </button>
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
// //             >
// //               {loading ? "Хадгалж байна..." : "Хадгалах"}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState } from "react";
// import { X, User, Briefcase, Building2, PlusCircle } from "lucide-react";

// interface AddMemberModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// export function AddMemberModal({
//   isOpen,
//   onClose,
//   onSuccess,
// }: AddMemberModalProps) {
//   const [name, setName] = useState("");
//   const [role, setRole] = useState("");
//   const [department, setDepartment] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   if (!isOpen) return null;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch("/api/team", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, role, department }),
//       });

//       if (res.ok) {
//         setName("");
//         setRole("");
//         setDepartment("");
//         onSuccess();
//         onClose();
//       } else {
//         alert("Нэмэхэд алдаа гарлаа!");
//       }
//     } catch (err) {
//       console.error("Error creating member:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
//       <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-6 shadow-xl">
//         {/* Header */}
//         <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
//           <div className="flex items-center gap-2.5">
//             <div className="p-2 bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 rounded-xl">
//               <PlusCircle className="w-5 h-5" />
//             </div>
//             <div>
//               <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
//                 Шинэ гишүүн нэмэх
//               </h2>
//               <p className="text-xs text-slate-500 dark:text-slate-400">
//                 Багт шинээр ажилтан бүртгэх
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
//               Нэр
//             </label>
//             <div className="relative">
//               <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
//               <input
//                 type="text"
//                 required
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 transition-all"
//                 placeholder="Баатар"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
//               Албан тушаал
//             </label>
//             <div className="relative">
//               <Briefcase className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
//               <input
//                 type="text"
//                 required
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//                 className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 transition-all"
//                 placeholder="Software Engineer"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
//               Хэлтэс
//             </label>
//             <div className="relative">
//               <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
//               <input
//                 type="text"
//                 required
//                 value={department}
//                 onChange={(e) => setDepartment(e.target.value)}
//                 className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 transition-all"
//                 placeholder="Engineering"
//               />
//             </div>
//           </div>

//           <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
//             >
//               Цуцлах
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white rounded-xl disabled:opacity-50 shadow-sm shadow-cyan-500/20 transition-all active:scale-[0.98]"
//             >
//               {loading ? "Хадгалж байна..." : "Хадгалах"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { X, User, Briefcase, Building2, PlusCircle, Mail } from "lucide-react";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddMemberModal({
  isOpen,
  onClose,
  onSuccess,
}: AddMemberModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, role, department }), // email-ийг энд нэмэв
      });

      if (res.ok) {
        setName("");
        setEmail("");
        setRole("");
        setDepartment("");
        onSuccess();
        onClose();
      } else {
        alert("Нэмэхэд алдаа гарлаа!");
      }
    } catch (err) {
      console.error("Error creating member:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 rounded-xl">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Шинэ гишүүн нэмэх
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Багт шинээр ажилтан бүртгэх
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Нэр */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Нэр
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 transition-all"
                placeholder="Баатар"
              />
            </div>
          </div>

          {/* Имэйл (ШИНЭЭР НЭМСЭН) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Имэйл хаяг
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 transition-all"
                placeholder="ажилтан@gmail.com"
              />
            </div>
          </div>

          {/* Албан тушаал */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Албан тушаал
            </label>
            <div className="relative">
              <Briefcase className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 transition-all"
                placeholder="Software Engineer"
              />
            </div>
          </div>

          {/* Хэлтэс */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Хэлтэс
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 transition-all"
                placeholder="Engineering"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Цуцлах
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white rounded-xl disabled:opacity-50 shadow-sm shadow-cyan-500/20 transition-all active:scale-[0.98]"
            >
              {loading ? "Хадгалж байна..." : "Хадгалах"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

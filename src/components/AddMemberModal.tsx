// "use client";

// import React, { useState } from "react";

// interface AddMemberModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddMember: (member: {
//     name: string;
//     email: string;
//     role: string;
//     skills: string[];
//     status: "Active" | "On Leave" | "Busy";
//     avatarUrl: string;
//     department: string; // Added department property
//   }) => void;
// }

// export default function AddMemberModal({
//   isOpen,
//   onClose,
//   onAddMember,
//   onSuccess,
// }: AddMemberModalProps) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("");
//   const [skills, setSkills] = useState("");
//   const [status, setStatus] = useState<"Active" | "On Leave" | "Busy">("Active");
//   const [avatarUrl, setAvatarUrl] = useState("");
//   const [department, setDepartment] = useState(""); // Added department state

//   if (!isOpen) return null;
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const newMember = {
//       name,
//       email,
//       role,
//       skills: skills.split(",").map((skill) => skill.trim()),
//       status,
//       avatarUrl,
//       department, // Include department in the new member object
//     };
// }

// src/components/AddMemberModal.tsx
"use client";

import React, { useState } from "react";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Дата нэмэгдсэний дараа жагсаалтыг шинэчлэх функц
}

export function AddMemberModal({
  isOpen,
  onClose,
  onSuccess,
}: AddMemberModalProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Бэкэнд рүү POST хүсэлт илгээх
      const res = await fetch("/api/team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, role, department }),
      });

      if (res.ok) {
        // Амжилттай болбол формаа цэвэрлээд, модалаа хаана
        setName("");
        setRole("");
        setDepartment("");
        onSuccess(); // Үндсэн нүүрний датаг шинэчлэн уншина
        onClose();
      } else {
        alert("Нэмэхэд алдаа гарлаа!");
      }
    } catch (error) {
      console.error("Error creating member:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Шинэ гишүүн нэмэх</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Нэр
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Баатар"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Албан тушаал
            </label>
            <input
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Software Engineer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Хэлтэс
            </label>
            <input
              type="text"
              required
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Engineering"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Цуцлах
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Хадгалж байна..." : "Хадгалах"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

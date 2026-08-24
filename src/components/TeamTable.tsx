"use client";

import React, { useState, useEffect } from "react";
import { TeamMember } from "@/types/dashboard";
import { Search, Trash2 } from "lucide-react";

interface TeamTableProps {
  members: TeamMember[];
  onDeleteSuccess?: () => void;
}

export const TeamTable: React.FC<TeamTableProps> = ({
  members: initialMembers,
  onDeleteSuccess,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [memberList, setMemberList] = useState<TeamMember[]>(initialMembers);

  // Props өөрчлөгдөхөд local state-ийг шинэчилнэ
  useEffect(() => {
    setMemberList(initialMembers);
  }, [initialMembers]);

  // Хайлт болон шүүлтүүр
  const filteredMembers = memberList.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.skills?.some((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesStatus =
      statusFilter === "All" || member.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Устгах функц (Popup-гүй, Шууд state-ээс хасна)
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/team/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Refresh хийхгүйгээр state-ээс шууд устгана
        setMemberList((prev) => prev.filter((m) => m.id !== id));

        if (onDeleteSuccess) onDeleteSuccess();
      } else {
        console.error("Устгахад алдаа гарлаа");
      }
    } catch (err) {
      console.error("DELETE request error:", err);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Нэр, албан тушаал, ур чадвараар хайх..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-slate-700"
        >
          <option value="All">Бүх төлөв</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-slate-500 font-medium">
              <th className="py-3 px-2">Нэр / Имэйл</th>
              <th className="py-3 px-2">Албан тушаал</th>
              <th className="py-3 px-2">Ур чадварууд</th>
              <th className="py-3 px-2">Төлөв</th>
              <th className="py-3 px-2 text-right">Үйлдэл</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredMembers.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3 px-2 flex items-center gap-3">
                  <img
                    src={m.avatarUrl || "https://via.placeholder.com/150"}
                    alt={m.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">{m.name}</p>
                    <p className="text-xs text-slate-400">{m.email}</p>
                  </div>
                </td>
                <td className="py-3 px-2 text-slate-600">{m.role}</td>
                <td className="py-3 px-2">
                  <div className="flex flex-wrap gap-1">
                    {m.skills?.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-slate-100 text-xs rounded text-slate-600 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      m.status === "Active"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {m.status || "Active"}
                  </span>
                </td>
                <td className="py-3 px-2 text-right">
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
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

  useEffect(() => {
    setMemberList(initialMembers);
  }, [initialMembers]);

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

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMemberList((prev) => prev.filter((m) => m.id !== id));
        if (onDeleteSuccess) onDeleteSuccess();
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Нэр, албан тушаал, ур чадвараар хайх..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200/80 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-slate-800 placeholder-slate-400"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 text-sm bg-slate-50 border border-slate-200/80 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-slate-700 font-medium"
        >
          <option value="All">Бүх төлөв</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-100">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-500 font-semibold text-xs uppercase tracking-wider">
              <th className="py-3.5 px-4">Нэр / Имэйл</th>
              <th className="py-3.5 px-4">Албан тушаал</th>
              <th className="py-3.5 px-4">Ур чадварууд</th>
              <th className="py-3.5 px-4">Төлөв</th>
              <th className="py-3.5 px-4 text-right">Үйлдэл</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {filteredMembers.map((m) => (
              <tr
                key={m.id}
                className="hover:bg-cyan-50/30 transition-colors group"
              >
                <td className="py-3.5 px-4">
                  <Link
                    href={`/profile/${m.id}`}
                    className="flex items-center gap-3 group/item cursor-pointer"
                  >
                    {/* <img
                      src={m.avatarUrl || "https://via.placeholder.com/150"}
                      alt={m.name}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
                    /> */}
                    <Image
                      src={m.avatarUrl || "https://via.placeholder.com/150"}
                      alt={m.name}
                      width={36}
                      height={36}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
                    />
                    <div>
                      <p className="font-semibold text-slate-800 group-hover/item:text-cyan-600 transition-colors">
                        {m.name}
                      </p>
                      <p className="text-xs text-slate-400">{m.email}</p>
                    </div>
                  </Link>
                </td>
                <td className="py-3.5 px-4 text-slate-600 font-medium">
                  {m.role}
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex flex-wrap gap-1.5">
                    {m.skills?.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 bg-cyan-50 text-cyan-700 text-xs rounded-lg font-medium border border-cyan-100"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      m.status === "Active"
                        ? "bg-teal-50 text-teal-700 border border-teal-200/60"
                        : "bg-slate-100 text-slate-500 border border-slate-200/60"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        m.status === "Active" ? "bg-teal-500" : "bg-slate-400"
                      }`}
                    />
                    {m.status || "Active"}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
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

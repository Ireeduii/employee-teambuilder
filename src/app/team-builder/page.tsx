"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { TeamMember } from "@/types/dashboard";
import { Plus, X, Users, CheckCircle2, Search, UserPlus } from "lucide-react";

export default function TeamBuilderPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<TeamMember[]>([]);
  const [teamName, setTeamName] = useState("");
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
        console.error("Failed to fetch team members", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMembers();
  }, []);

  // Хайлтын Skill нэмэх/хасах
  const handleAddSkillFilter = () => {
    if (!skillInput.trim()) return;
    const skill = skillInput.trim();
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setSkillInput("");
  };

  const handleRemoveSkillFilter = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  // Сонгосон ур чадварт тохирч буй ажилтнуудыг шүүх
  const filteredMembers = members.filter((member) => {
    if (selectedSkills.length === 0) return true;
    return selectedSkills.every((skill) =>
      member.skills?.some((s) => s.toLowerCase() === skill.toLowerCase()),
    );
  });

  const toggleSelectMember = (member: TeamMember) => {
    if (selectedMembers.some((m) => m.id === member.id)) {
      setSelectedMembers(selectedMembers.filter((m) => m.id !== member.id));
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50/60 font-sans text-slate-800">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="p-8 max-w-7xl mx-auto w-full space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Team Builder (Баг Бүрдүүлэлт)
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Шинэ төсөлд шаардлагатай ур чадвараар инженерүүдийг хайж баг
              бүрдүүлэх
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Баруун тал: Шүүлтүүр & Нийт Инженерүүдийн жагсаалт */}
            <div className="lg:col-span-2 space-y-5">
              {/* Skill Filter Box */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <label className="block text-sm font-semibold text-slate-800">
                  Шаардлагатай Ур Чадвар (Skill) Нэмж Хайх
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleAddSkillFilter()
                      }
                      placeholder="ж нь: React, Node.js..."
                      className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-sm transition-all bg-slate-50/50"
                    />
                  </div>
                  <button
                    onClick={handleAddSkillFilter}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white rounded-xl text-sm font-medium transition-all shadow-sm shadow-cyan-500/20 flex items-center gap-1.5 active:scale-[0.98]"
                  >
                    <Plus className="w-4 h-4" /> Шүүх
                  </button>
                </div>

                {/* Tag-үүд */}
                {selectedSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-50 text-cyan-700 rounded-lg text-xs font-semibold border border-cyan-100"
                      >
                        {skill}
                        <button
                          onClick={() => handleRemoveSkillFilter(skill)}
                          className="hover:text-rose-600 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Members List */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-slate-800 text-sm">
                    Тохирох Ажилтнууд
                  </h2>
                  <span className="text-xs bg-slate-100 text-slate-600 font-medium px-2.5 py-0.5 rounded-full">
                    {filteredMembers.length}
                  </span>
                </div>

                {loading ? (
                  <div className="py-8 text-center text-sm text-slate-400">
                    Уншиж байна...
                  </div>
                ) : filteredMembers.length === 0 ? (
                  <div className="py-8 text-center text-sm text-slate-400">
                    Шүүлтүүрт тохирох ажилтан олдсонгүй.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {filteredMembers.map((member) => {
                      const isSelected = selectedMembers.some(
                        (m) => m.id === member.id,
                      );
                      return (
                        <div
                          key={member.id}
                          onClick={() => toggleSelectMember(member)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                            isSelected
                              ? "border-cyan-500 bg-cyan-50/30 ring-2 ring-cyan-500/20"
                              : "border-slate-200/80 hover:border-slate-300 bg-white hover:bg-slate-50/50"
                          }`}
                        >
                          <img
                            src={
                              member.avatarUrl ||
                              "https://via.placeholder.com/150"
                            }
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <h3 className="font-semibold text-sm text-slate-900 truncate">
                                {member.name}
                              </h3>
                              {isSelected && (
                                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-slate-500">
                              {member.role}
                            </p>

                            <div className="flex flex-wrap gap-1 mt-2">
                              {member.skills?.map((skill, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-medium"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Зүүн тал: Сонгогдсон Шинэ Баг */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm h-fit space-y-5">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
                <div className="p-2 bg-cyan-50 rounded-xl text-cyan-600">
                  <Users className="w-5 h-5" />
                </div>
                <h2 className="font-bold text-slate-800 text-base">
                  Бүрдүүлж буй Баг
                </h2>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Багийн Нэр
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="ж нь: Mobile App Team"
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-sm transition-all bg-slate-50/50"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Сонгогдсон гишүүд
                  </p>
                  <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-md">
                    {selectedMembers.length}
                  </span>
                </div>

                {selectedMembers.length === 0 ? (
                  <div className="p-6 border border-dashed border-slate-200 rounded-xl text-center space-y-2">
                    <UserPlus className="w-6 h-6 text-slate-300 mx-auto" />
                    <p className="text-xs text-slate-400">
                      Багт оруулах инженерүүдээ зүүн талын жагсаалтаас сонгоно
                      уу.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {selectedMembers.map((m) => (
                      <div
                        key={m.id}
                        className="flex items-center justify-between p-2.5 bg-slate-50/80 rounded-xl border border-slate-100 text-xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={
                              m.avatarUrl || "https://via.placeholder.com/150"
                            }
                            alt={m.name}
                            className="w-7 h-7 rounded-full object-cover shrink-0"
                          />
                          <span className="font-medium text-slate-800 truncate">
                            {m.name}
                          </span>
                        </div>
                        <button
                          onClick={() => toggleSelectMember(m)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                disabled={selectedMembers.length === 0 || !teamName.trim()}
                onClick={() => alert(`"${teamName}" баг амжилттай бүрдлээ!`)}
                className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white rounded-xl font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-cyan-500/20 transition-all active:scale-[0.98]"
              >
                Багийг Үүсгэх
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

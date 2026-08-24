"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { TeamMember } from "@/types/dashboard";
import { Plus, X, Users, CheckCircle2 } from "lucide-react";

export default function TeamBuilderPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<TeamMember[]>([]);
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. Бүх ажилтнуудыг татах
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

  // 2. Хайлтын сSkill нэмэх/хасах
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

  // 3. Сонгосон ур чадварт тохирч буй ажилтнуудыг шүүх
  const filteredMembers = members.filter((member) => {
    if (selectedSkills.length === 0) return true;
    return selectedSkills.every((skill) =>
      member.skills?.some((s) => s.toLowerCase() === skill.toLowerCase()),
    );
  });

  // 4. Багт ажилтан нэмэх/хасах
  const toggleSelectMember = (member: TeamMember) => {
    if (selectedMembers.some((m) => m.id === member.id)) {
      setSelectedMembers(selectedMembers.filter((m) => m.id !== member.id));
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-8 max-w-7xl mx-auto w-full space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Team Builder (Баг Бүрдүүлэлт)
            </h1>
            <p className="text-sm text-slate-500">
              Шинэ төсөлд шаардлагатай ур чадвараар инженерүүдийг хайж баг
              бүрдүүлэх
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Баруун тал: Шүүлтүүр & Нийт Инженерүүдийн жагсаалт */}
            <div className="lg:col-span-2 space-y-4">
              {/* Skill Filter Box */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <label className="block text-sm font-semibold text-slate-800">
                  Шаардлагатай Ур Чадвар (Skill) Нэмж Хайх
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleAddSkillFilter()
                    }
                    placeholder="ж нь: React, Node.js..."
                    className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                  <button
                    onClick={handleAddSkillFilter}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Шүүх
                  </button>
                </div>

                {/* Tag-үүд */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-100"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkillFilter(skill)}
                        className="hover:text-rose-600 font-bold"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Members List */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
                <h2 className="font-semibold text-slate-800 text-sm">
                  Тохирох Ажилтнууд ({filteredMembers.length})
                </h2>

                {loading ? (
                  <p className="text-sm text-slate-400 py-4">Уншиж байна...</p>
                ) : filteredMembers.length === 0 ? (
                  <p className="text-sm text-slate-400 py-4">
                    Шүүлтүүрт тохирох ажилтан олдсонгүй.
                  </p>
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
                              ? "border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          }`}
                        >
                          <img
                            src={
                              member.avatarUrl ||
                              "https://via.placeholder.com/150"
                            }
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-sm text-slate-900 truncate">
                                {member.name}
                              </h3>
                              {isSelected && (
                                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-slate-500">
                              {member.role}
                            </p>

                            <div className="flex flex-wrap gap-1 mt-2">
                              {member.skills?.map((skill, i) => (
                                <span
                                  key={i}
                                  className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px]"
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
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm h-fit space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Users className="w-5 h-5 text-indigo-600" />
                <h2 className="font-bold text-slate-800">Бүрдүүлж буй Баг</h2>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Багийн Нэр
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="ж нь: Mobile App Team"
                  className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-500">
                  Сонгогдсон гишүүд ({selectedMembers.length})
                </p>
                {selectedMembers.length === 0 ? (
                  <p className="text-xs text-slate-400 py-2">
                    Багт оруулах инженерүүдээ зүүн талын жагсаалтаас сонгоно уу.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {selectedMembers.map((m) => (
                      <div
                        key={m.id}
                        className="flex items-center justify-between p-2 bg-slate-50 rounded-lg text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={
                              m.avatarUrl || "https://via.placeholder.com/150"
                            }
                            alt={m.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="font-medium text-slate-800">
                            {m.name}
                          </span>
                        </div>
                        <button
                          onClick={() => toggleSelectMember(m)}
                          className="text-slate-400 hover:text-rose-500"
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
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-sm disabled:opacity-50 transition-colors"
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

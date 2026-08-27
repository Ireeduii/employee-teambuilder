import { TeamMember } from "@/types/dashboard";

export const getDynamicMetrics = (members: TeamMember[]) => {
  const totalMembers = members.length;

  const activeMembers = members.filter(
    (m) => m.status === "Active" || !m.status,
  ).length;

  const allSkills = members.flatMap((m) => m.skills || []);
  const uniqueSkillsCount = new Set(allSkills).size;

  const activePercentage =
    totalMembers > 0 ? Math.round((activeMembers / totalMembers) * 100) : 0;

  return [
    {
      title: "Нийт Инженерүүд",
      value: totalMembers.toString(),
      change: `Бүртгэлтэй: ${totalMembers}`,
      isPositive: true,
    },
    {
      title: "Идэвхтэй Гишүүд",
      value: activeMembers.toString(),
      change: `${activePercentage}% идэвхтэй`,
      isPositive: true,
    },
    {
      title: "Эзэмшсэн Ур Чадварууд",
      value: uniqueSkillsCount.toString(),
      change: "Нийт технологи",
      isPositive: true,
    },
    {
      title: "Хэлтэс/Ажилтнууд",
      value: members.filter((m) => m.department).length.toString(),
      change: "Хэлтэстэй ажилчид",
      isPositive: true,
    },
  ];
};

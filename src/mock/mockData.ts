// turshiltin mock data
// import { TeamMember, StatMetric } from '../types/dashboard';
import { TeamMember, StatMetric } from "@/types/dashboard";

// Дашбордын статистик туршилтын өгөгдөл
export const mockMetrics: StatMetric[] = [
  { title: "Нийт Инженерүүд", value: "42", change: "+12%", isPositive: true },
  { title: "Идэвхтэй Төслүүд", value: "8", change: "+2", isPositive: true },
  {
    title: "Дундаж Skill Score",
    value: "88%",
    change: "+5.4%",
    isPositive: true,
  },
  { title: "Нээлттэй Таскууд", value: "15", change: "-3", isPositive: false },
];

// Багийн гишүүдийн туршилтын өгөгдөл
export const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Баатар",
    email: "baatar@example.com",
    role: "Senior Frontend Engineer",
    skills: ["React", "TypeScript", "Tailwind"],
    status: "Active",
    avatarUrl: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: "2",
    name: "Болор",
    email: "bolor@example.com",
    role: "Backend Developer",
    skills: ["Node.js", "PostgreSQL", "Docker"],
    status: "Active",
    avatarUrl: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: "3",
    name: "Ану",
    email: "anu@example.com",
    role: "UI/UX Designer",
    skills: ["Figma", "Framer", "CSS Architecture"],
    status: "On Leave",
    avatarUrl: "https://i.pravatar.cc/150?u=3",
  },
];

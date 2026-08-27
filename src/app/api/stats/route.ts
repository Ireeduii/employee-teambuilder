import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await currentUser();
    const email = user?.emailAddresses[0]?.emailAddress;

    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Бодит датануудаа database-ээс тоолж олох
    // (Жишээ нь: TeamMember хүснэгтээс нийт гишүүдийн тоог авах)
    const totalMembers = await prisma.teamMember.count();

    // (Жишээ нь: Team хүснэгтээс нийт багийн тоог авах)
    const totalTeams = await prisma.team.count({
      where: { ownerEmail: email },
    });

    // Жишээ байдлаар бусад өгөгдлийг мөн нэмж болно
    return NextResponse.json({
      data: [
        {
          title: "Нийт Инженерүүд",
          value: totalMembers.toString(),
          change: "+1%", // Үүнийг мөн логикоор эсвэл өгөгдлөөс тооцож болно
          isPositive: true,
        },
        {
          title: "Идэвхтэй Төслүүд / Багууд",
          value: totalTeams.toString(),
          change: "+2",
          isPositive: true,
        },
        {
          title: "Дундаж Skill Score",
          value: "88%", // Хэрэв skill model байвал энд дундажыг нь бодож гаргана
          change: "+5.4%",
          isPositive: true,
        },
        {
          title: "Нээлттэй Таскууд",
          value: "15",
          change: "-3",
          isPositive: false,
        },
      ],
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// import { currentUser } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET() {
//   try {
//     //    nvtersen hereglegchiin medeellig Clerk-ees avah
//     const user = await currentUser();

//     // hereglegchin medeellig slgaj avah
//     const email = user?.emailAddresses[0]?.emailAddress;

//     if (!email) {
//       return NextResponse.json({ error: "Email олдсонгүй" }, { status: 400 });
//     }

//     const member = await prisma.teamMember.findFirst({
//       where: { email: email },
//     });

//     if (!member) {
//       return NextResponse.json(
//         { error: "Багийн мэдээлэл олдсонгүй" },
//         { status: 404 },
//       );
//     }

//     return NextResponse.json({ data: [member] });
//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json(
//       { error: "Серверийн алдаа гарлаа" },
//       { status: 500 },
//     );
//   }
// }

import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await currentUser();
    const email = user?.emailAddresses[0]?.emailAddress;

    if (!email) {
      return NextResponse.json(
        { error: "Email шаардлагатай" },
        { status: 400 },
      );
    }

    const db = prisma as Record<string, any>;

    // Хамгийн сүүлд үүсгэсэн багийг гишүүдийнх нь хамт татах
    const team = await db.team.findFirst({
      where: { ownerEmail: email },
      orderBy: { createdAt: "desc" },
      include: { members: true },
    });

    if (!team) {
      return NextResponse.json({ data: [] });
    }

    return NextResponse.json({ data: team.members });
  } catch (error) {
    console.error("GET team error:", error);
    return NextResponse.json(
      { error: "Серверийн алдаа гарлаа" },
      { status: 500 },
    );
  }
}

// import { currentUser } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET() {
//   try {
//     const user = await currentUser();
//     const email = user?.emailAddresses[0]?.emailAddress;

//     if (!email) {
//       return NextResponse.json(
//         { error: "Email шаардлагатай" },
//         { status: 400 },
//       );
//     }

//     const db = prisma as Record<string, any>;

//     const team = await db.team.findFirst({
//       where: { ownerEmail: email },
//       orderBy: { createdAt: "desc" },
//       include: { members: true },
//     });

//     if (!team) {
//       return NextResponse.json({ data: [] });
//     }

//     return NextResponse.json({ data: team.members });
//   } catch (error) {
//     console.error("GET team error:", error);
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

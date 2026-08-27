// // import { currentUser } from "@clerk/nextjs/server";
// // import { NextResponse } from "next/server";
// // import { prisma } from "@/lib/prisma";

// // export async function GET() {
// //   try {
// //     const user = await currentUser();
// //     const email = user?.emailAddresses[0]?.emailAddress;

// //     if (!email) {
// //       return NextResponse.json(
// //         { error: "Email шаардлагатай" },
// //         { status: 400 },
// //       );
// //     }

// //     const team = await prisma.team.findFirst({
// //       where: { ownerEmail: email },
// //       orderBy: { createdAt: "desc" },
// //       include: { members: true },
// //     });

// //     if (!team) {
// //       return NextResponse.json({ data: [] });
// //     }

// //     return NextResponse.json({ data: team.members });
// //   } catch (error: unknown) {
// //     console.error("GET team error:", error);
// //     return NextResponse.json(
// //       { error: "Серверийн алдаа гарлаа" },
// //       { status: 500 },
// //     );
// //   }
// // }
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

//     const team = await prisma.team.findFirst({
//       where: { ownerEmail: email },
//       orderBy: { createdAt: "desc" },
//       include: { members: true },
//     });

//     if (!team) {
//       return NextResponse.json({ data: null });
//     }

//     // Зөвхөн гишүүд биш багийн бүтэн объектоор нь буцаана
//     return NextResponse.json({ data: team });
//   } catch (error: unknown) {
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

    // Бүх багуудыг хамгийн сүүлд үүсгэсэн нь эхэндээ байхаар шүүнэ
    const teams = await prisma.team.findMany({
      where: { ownerEmail: email },
      orderBy: { createdAt: "desc" },
      include: { members: true },
    });

    return NextResponse.json({ data: teams });
  } catch (error: unknown) {
    console.error("GET teams error:", error);
    return NextResponse.json(
      { error: "Серверийн алдаа гарлаа" },
      { status: 500 },
    );
  }
}

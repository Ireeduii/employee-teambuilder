// // import { currentUser } from "@clerk/nextjs/server";
// // import { NextResponse } from "next/server";
// // import { prisma } from "@/lib/prisma";

// // export async function POST(request: Request) {
// //   try {
// //     const user = await currentUser();
// //     const ownerEmail = user?.emailAddresses[0]?.emailAddress;

// //     if (!ownerEmail) {
// //       return NextResponse.json(
// //         { error: "Нэвтрэх шаардлагатай" },
// //         { status: 401 },
// //       );
// //     }

// //     const { teamName, memberIds } = await request.json();

// //     if (!memberIds || memberIds.length === 0) {
// //       return NextResponse.json(
// //         { error: "Гишүүд сонгоогүй байна" },
// //         { status: 400 },
// //       );
// //     }

// //     const db = prisma as Record<string, any>;

// //     const newTeam = await db.team.create({
// //       data: {
// //         name: teamName || "Миний баг",
// //         ownerEmail: ownerEmail,
// //         members: {
// //           connect: memberIds.map((id: string) => ({ id })),
// //         },
// //       },
// //       include: {
// //         members: true,
// //       },
// //     });

// //     return NextResponse.json({ data: newTeam });
// //   } catch (error) {
// //     console.error("Team creation error:", error);
// //     return NextResponse.json(
// //       { error: "Баг үүсгэхэд алдаа гарлаа" },
// //       { status: 500 },
// //     );
// //   }
// // }

// import { currentUser } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function POST(request: Request) {
//   try {
//     const user = await currentUser();
//     const ownerEmail = user?.emailAddresses[0]?.emailAddress;

//     if (!ownerEmail) {
//       return NextResponse.json(
//         { error: "Нэвтрэх шаардлагатай" },
//         { status: 401 },
//       );
//     }

//     const body = (await request.json()) as {
//       teamName?: string;
//       memberIds?: string[];
//     };
//     const { teamName, memberIds } = body;

//     if (!memberIds || memberIds.length === 0) {
//       return NextResponse.json(
//         { error: "Гишүүд сонгоогүй байна" },
//         { status: 400 },
//       );
//     }

//     const newTeam = await prisma.team.create({
//       data: {
//         name: teamName || "Миний баг",
//         ownerEmail: ownerEmail,
//         members: {
//           connect: memberIds.map((id) => ({ id })),
//         },
//       },
//       include: {
//         members: true,
//       },
//     });

//     return NextResponse.json({ data: newTeam });
//   } catch (error: unknown) {
//     console.error("Team creation error:", error);
//     return NextResponse.json(
//       { error: "Баг үүсгэхэд алдаа гарлаа" },
//       { status: 500 },
//     );
//   }
// }

// import { currentUser } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function POST(request: Request) {
//   try {
//     const user = await currentUser();
//     const ownerEmail = user?.emailAddresses[0]?.emailAddress;

//     if (!ownerEmail) {
//       return NextResponse.json(
//         { error: "Нэвтрэх шаардлагатай" },
//         { status: 401 },
//       );
//     }

//     const { teamName, memberIds } = await request.json();

//     if (!memberIds || memberIds.length === 0) {
//       return NextResponse.json(
//         { error: "Гишүүд сонгоогүй байна" },
//         { status: 400 },
//       );
//     }

//     const db = prisma as Record<string, any>;

//     const newTeam = await db.team.create({
//       data: {
//         name: teamName || "Миний баг",
//         ownerEmail: ownerEmail,
//         members: {
//           connect: memberIds.map((id: string) => ({ id })),
//         },
//       },
//       include: {
//         members: true,
//       },
//     });

//     return NextResponse.json({ data: newTeam });
//   } catch (error) {
//     console.error("Team creation error:", error);
//     return NextResponse.json(
//       { error: "Баг үүсгэхэд алдаа гарлаа" },
//       { status: 500 },
//     );
//   }
// }

import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    const ownerEmail = user?.emailAddresses[0]?.emailAddress;

    if (!ownerEmail) {
      return NextResponse.json(
        { error: "Нэвтрэх шаардлагатай" },
        { status: 401 },
      );
    }

    const body = (await request.json()) as {
      teamName?: string;
      memberIds?: string[];
    };
    const { teamName, memberIds } = body;

    if (!memberIds || memberIds.length === 0) {
      return NextResponse.json(
        { error: "Гишүүд сонгоогүй байна" },
        { status: 400 },
      );
    }

    const newTeam = await prisma.team.create({
      data: {
        name: teamName || "Миний баг",
        ownerEmail: ownerEmail,
        members: {
          connect: memberIds.map((id) => ({ id })),
        },
      },
      include: {
        members: true,
      },
    });

    return NextResponse.json({ data: newTeam });
  } catch (error: unknown) {
    console.error("Team creation error:", error);
    return NextResponse.json(
      { error: "Баг үүсгэхэд алдаа гарлаа" },
      { status: 500 },
    );
  }
}

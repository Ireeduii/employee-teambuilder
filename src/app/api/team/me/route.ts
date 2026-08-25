// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const email = searchParams.get("email");

//   if (!email) {
//     return NextResponse.json({ error: "Email шаардлагатай" }, { status: 400 });
//   }

//   try {
//     // email-r admini uusgesen datag haina
//     const user = await prisma.teamMember.findUnique({
//       where: { email: email },
//     });

//     if (!user) {
//       return NextResponse.json({ error: "Ажилтан олдсонгүй" }, { status: 404 });
//     }

//     return NextResponse.json({ data: user });
//   } catch (error) {
//     return NextResponse.json({ error: "Серверийн алдаа" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email шаардлагатай" }, { status: 400 });
  }

  try {
    const user = await prisma.teamMember.findFirst({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json({ error: "Ажилтан олдсонгүй" }, { status: 404 });
    }

    return NextResponse.json({ data: user });
  } catch (_error) {
    return NextResponse.json({ error: "Серверийн алдаа" }, { status: 500 });
  }
}

// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { mockTeamMembers } from "@/mock/mockData";

// // buh gishuudin jagsaaltig butsaah api
// export async function GET() {
//   try {
//     const members = await prisma.teamMember.findMany();

//     const dataToSend = members.length > 0 ? members : mockTeamMembers;

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Bagiin medeelel amjilttai tatagdlaa",
//         data: dataToSend,
//       },
//       { status: 200 },
//     );
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: true,
//         message: "Mock data butsaaj bn",
//         data: mockTeamMembers,
//       },
//       { status: 200 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const teamMembers = await prisma.teamMember.findMany();
    return NextResponse.json({ success: true, data: teamMembers });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, role, skills, status, avatarUrl } = body;

    const formattedEmail =
      email ||
      `${(name || "user").toLowerCase().replace(/\s+/g, "")}_${Date.now()}@example.com`;

    const newMember = await prisma.teamMember.create({
      data: {
        name,
        email: formattedEmail,
        role,
        skills: skills || [],
        status: status || "Active",
        avatarUrl: avatarUrl || "",
      },
    });

    return NextResponse.json(
      { success: true, data: newMember },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create member" },
      { status: 500 },
    );
  }
}

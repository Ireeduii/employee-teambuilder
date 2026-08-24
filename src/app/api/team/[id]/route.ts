// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } },
// ) {
//   try {
//     const member = await prisma.teamMember.findUnique({
//       where: { id: params.id },
//     });

//     if (!member) {
//       return NextResponse.json(
//         { success: false, error: "Member not found" },
//         { status: 404 },
//       );
//     }

//     return NextResponse.json({ success: true, data: member });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: "Failed to fetch" },
//       { status: 500 },
//     );
//   }
// }

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } },
// ) {
//   try {
//     const body = await request.json();
//     const { name, role, department, bio, skills, avatarUrl } = body;

//     const updatedMember = await prisma.teamMember.update({
//       where: { id: params.id },
//       data: {
//         name,
//         role,
//         department,
//         bio,
//         skills,
//         avatarUrl,
//       },
//     });

//     return NextResponse.json({ success: true, data: updatedMember });
//   } catch (error) {
//     console.error("PUT error:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to update profile" },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 1. Ажилтны мэдээллийг ID-аар татах
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const member = await prisma.teamMember.findUnique({
      where: { id: params.id },
    });

    if (!member) {
      return NextResponse.json(
        { success: false, error: "Member not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: member });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch member" },
      { status: 500 },
    );
  }
}

// 2. Ажилтны мэдээллийг шинэчлэх
export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const { name, role, department, bio, skills, avatarUrl } = body;

    const updatedMember = await prisma.teamMember.update({
      where: { id: params.id },
      data: {
        name,
        role,
        department,
        bio,
        skills,
        avatarUrl,
      },
    });

    return NextResponse.json({ success: true, data: updatedMember });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update member" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const teamMembers = await prisma.teamMember.findMany();
    return NextResponse.json({ success: true, data: teamMembers });
  } catch (err) {
    console.error(err);
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
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to create member" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const member = await prisma.teamMember.findUnique({
      where: { id },
    });

    if (!member) {
      return NextResponse.json(
        { error: "Хэрэглэгч олдсонгүй" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: member });
  } catch (error) {
    console.error("Fetch profile error:", error);
    return NextResponse.json(
      { error: "Мэдээллийг таарахад алдаа гарлаа" },
      { status: 500 },
    );
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await prisma.teamMember.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Амжилттай устгагдлаа",
    });
  } catch (error) {
    console.error("Delete team member error:", error);
    return NextResponse.json(
      { error: "Мэдээллийг устгахад алдаа гарлаа" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, role, department, phone, bio, github, location } = body;

    const updatedMember = await prisma.teamMember.update({
      where: { id },
      data: {
        name,
        role,
        department,
        phone,
        bio,
        github,
        location,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedMember,
      message: "Мэдээлэл амжилттай шинэчлэгдлээ",
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { error: "Мэдээллийг шинэчлэхэд алдаа гарлаа" },
      { status: 500 },
    );
  }
}

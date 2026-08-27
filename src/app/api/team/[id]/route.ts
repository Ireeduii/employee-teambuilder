// // import { NextResponse } from "next/server";
// // import { prisma } from "@/lib/prisma";

// // // GET
// // export async function GET(
// //   request: Request,
// //   { params }: { params: Promise<{ id: string }> }, // <-- Promise болгоно
// // ) {
// //   try {
// //     const { id } = await params; // <-- await хийж авна

// //     const member = await prisma.teamMember.findUnique({
// //       where: { id },
// //     });

// //     if (!member) {
// //       return NextResponse.json(
// //         { success: false, error: "Member not found" },
// //         { status: 404 },
// //       );
// //     }

// //     return NextResponse.json({ success: true, data: member });
// //   } catch (err) {
// //     return NextResponse.json(
// //       { success: false, error: "Failed to fetch member" },
// //       { status: 500 },
// //     );
// //   }
// // }

// // // PUT (засах функц байгаа бол)
// // export async function PUT(
// //   request: Request,
// //   { params }: { params: Promise<{ id: string }> },
// // ) {
// //   try {
// //     const { id } = await params;
// //     const body = await request.json();

// //     const updatedMember = await prisma.teamMember.update({
// //       where: { id },
// //       data: body,
// //     });

// //     return NextResponse.json({ success: true, data: updatedMember });
// //   } catch (err) {
// //     return NextResponse.json(
// //       { success: false, error: "Failed to update member" },
// //       { status: 500 },
// //     );
// //   }
// // }

// // // DELETE
// // export async function DELETE(
// //   request: Request,
// //   { params }: { params: Promise<{ id: string }> }, // <-- Promise болгоно
// // ) {
// //   try {
// //     const { id } = await params; // <-- await хийж авна

// //     await prisma.teamMember.delete({
// //       where: { id },
// //     });

// //     return NextResponse.json({
// //       success: true,
// //       message: "Member deleted successfully",
// //     });
// //   } catch (err) {
// //     return NextResponse.json(
// //       { success: false, error: "Failed to delete member" },
// //       { status: 500 },
// //     );
// //   }
// // }

// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   try {
//     const { id } = await params;
//     const member = await prisma.teamMember.findUnique({
//       where: { id },
//     });

//     if (!member) {
//       return NextResponse.json(
//         { success: false, error: "Member not found" },
//         { status: 404 },
//       );
//     }

//     return NextResponse.json({ success: true, data: member });
//   } catch (err) {
//     console.error("GET error:", err);
//     return NextResponse.json(
//       { success: false, error: "Failed to fetch member" },
//       { status: 500 },
//     );
//   }
// }

// export async function DELETE(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   try {
//     const { id } = await params;
//     await prisma.teamMember.delete({
//       where: { id },
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Member deleted successfully",
//     });
//   } catch (err) {
//     console.error("DELETE error:", err);
//     return NextResponse.json(
//       { success: false, error: "Failed to delete member" },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Эхлээд Team дотор энэ ID-тай баг байгаа эсэхийг шалгах
    const team = await prisma.team.findUnique({
      where: { id },
    });

    if (team) {
      // Хэрэв баг олдвол тухайн баг болон түүний гишүүдийг устгах
      // (Prisma schema дээр onDelete: Cascade тохируулаагүй бол эхлээд гишүүдийг нь устгах шаардлагатай байж магадгүй)
      await prisma.teamMember.deleteMany({
        where: { teamId: id },
      });

      await prisma.team.delete({
        where: { id },
      });

      return NextResponse.json({
        success: true,
        message: "Баг амжилттай устлаа",
      });
    }

    // Хэрэв баг олдоогүй бол TeamMember эсэхийг шалгаад устгах
    const member = await prisma.teamMember.findUnique({
      where: { id },
    });

    if (member) {
      await prisma.teamMember.delete({
        where: { id },
      });

      return NextResponse.json({
        success: true,
        message: "Гишүүн амжилттай устлаа",
      });
    }

    return NextResponse.json(
      { error: "Устгах өгөгдөл олдсонгүй" },
      { status: 404 },
    );
  } catch (error: unknown) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Серверийн алдаа гарлаа" },
      { status: 500 },
    );
  }
}

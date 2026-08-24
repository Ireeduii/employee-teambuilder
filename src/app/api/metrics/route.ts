import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mockMetrics } from "@/mock/mockData";

export async function GET() {
  try {
    const metrics = await prisma.metric.findMany();

    // data bhgu bol mockdata bucaana

    const dataToSend = metrics.length > 0 ? metrics : mockMetrics;

    return NextResponse.json(
      {
        success: true,
        message: "Statistic medeelel amjilttai tatagdla",
        data: dataToSend,
      },
      { status: 200 },
    );
  } catch (error) {
    //  database holbogdoogu uyd c mockData 200 statustai butsaaj turshina
    return NextResponse.json(
      {
        success: true,
        message: "Mock data butsaaj bn",
        data: mockMetrics,
      },
      { status: 200 },
    );
  }
}

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { orderId, userId } = body;

    if (!orderId || !userId) {
      return NextResponse.json(
        { error: "orderId and userId required" },
        { status: 400 }
      );
    }

    // Fetch order + product
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        product: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Check user access
    if (order.user_id !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Check admin approval
    if (!order.download_allow || order.status !== "APPROVED") {
      return NextResponse.json(
        { error: "Download not approved yet" },
        { status: 403 }
      );
    }

    // File URL
    const fileUrl = order.product.file_path;

    if (!fileUrl) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    // Redirect to the file URL (browser will auto-download)
    return NextResponse.json({fileUrl});

  } catch (err) {
    console.error("Download error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

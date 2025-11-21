import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const body = await req.json();
        const { userId } = body;

        if (!userId) {
            return NextResponse.json(
                { error: "UserId is required!" },
                { status: 400 }
            );
        }

        const orders = await prisma.order.findMany({
            where: { user_id: userId },
            orderBy: { sr_no: "desc" },
            include: {
                product: {
                    select: {
                        title: true,
                        image: true,
                        file_path: true
                    }
                }
            }
        });

        return NextResponse.json(orders);
    } catch (err) {
        console.error("Error fetching orders:", err);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}

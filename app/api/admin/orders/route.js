export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { nanoid } from "nanoid"



// GET ALL ORDERS
export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            orderBy: { sr_no: "desc" },
        })
        return NextResponse.json(orders)
    } catch (err) {
        console.error("Error fetching orders:", err)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}



// APPROVED THE DOWNLOAD
export async function PUT(req) {
    try {
        const id = await req.json()


        if (!id) {
            return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
        }

        const existingOrder = await prisma.order.findUnique({ where: { id: id } })
        if (!existingOrder) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 })
        }


        const updatedOrder = await prisma.order.update({
            where: { id: id },
            data: {
               download_allow: true,
               status: "APPROVED",
            },
        })

        return NextResponse.json(updatedOrder)
    } catch (err) {
        console.error("Error approving download:", err)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}
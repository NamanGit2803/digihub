export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { created_at: "desc" },
        })
        return NextResponse.json(products)
    } catch (err) {
        console.error("Error fetching products:", err)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}